// OpenAI summarizer for The GenAI Brief.
//
// Synthesizes the week's fetched/curated articles into ONE brief in a single
// call: the two bullet panels (What Happened / Why You Should Care), an optional
// comparison table, an optional "also this week" list, an optional "by the
// numbers" grid, and the editorial takeaway, all in GenAIEducate's brand voice.
//
// Per Saurav's choice, the model MAY draft the table and the numbers; those are
// then reviewed by hand before publishing (Level 2). The generator prints a
// loud review reminder, and the whyItMatters/numbers are easy to hand-edit in
// the brief JSON.
//
// Uses the OpenAI REST API via global fetch (Node 18+), so no `openai` npm
// dependency is added.
//
// COST GUARDRAIL (mandatory, see CLAUDE.md):
//   - The generator caps input at 10 items per run.
//   - Every call caps max_tokens so a bug can never run away.
//   - A hard ceiling on total API calls (SAFETY_MAX_CALLS) stops any runaway.
//   - Token usage is accumulated and reported in Rs after the run.
// A normal weekly run makes ONE call and costs a fraction of a rupee.

const MODEL = 'gpt-4o-mini';
const DEFAULT_MAX_TOKENS = 1100; // one synthesis call needs room for the whole brief
const SAFETY_MAX_CALLS = 4; // one call in the normal path; a few for retries at most.

// gpt-4o-mini list price (USD per 1M tokens). Used only for the cost estimate log.
const PRICE_PER_1M_INPUT_USD = 0.15;
const PRICE_PER_1M_OUTPUT_USD = 0.6;
const USD_TO_INR = 88; // rough, for the logged estimate only

const BRAND_VOICE = [
  'You write The GenAI Brief for GenAIEducate, a technical AI-engineering training firm.',
  'Audience: working software engineers and engineering leaders who build with AI.',
  'Voice: specific, concrete, opinionated for builders. Never vague marketing fluff.',
  'Every point should help a builder or a decision-maker understand the "so what".',
  'Hard rules: no em dashes (use commas, colons, or pipes), no exclamation marks,',
  'no hype words ("game-changer", "revolutionary", "unlock", "empower", "seamless",',
  '"cutting-edge", "world-class").',
].join(' ');

function estimateInrCost(usage) {
  const inputUsd = (usage.inputTokens / 1_000_000) * PRICE_PER_1M_INPUT_USD;
  const outputUsd = (usage.outputTokens / 1_000_000) * PRICE_PER_1M_OUTPUT_USD;
  return (inputUsd + outputUsd) * USD_TO_INR;
}

function createSummarizer({ apiKey, maxTokens = DEFAULT_MAX_TOKENS, model = MODEL } = {}) {
  if (!apiKey) {
    throw new Error(
      'OPENAI_API_KEY is not set in .env.local. Add it before running the brief generator.'
    );
  }

  const usage = { inputTokens: 0, outputTokens: 0, calls: 0 };

  async function callOpenAI(messages) {
    if (usage.calls >= SAFETY_MAX_CALLS) {
      throw new Error(
        `Cost guardrail: refused to make more than ${SAFETY_MAX_CALLS} OpenAI calls in one run.`
      );
    }
    usage.calls += 1;

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        max_tokens: maxTokens, // hard per-call cap: the core guardrail
        temperature: 0.5,
        response_format: { type: 'json_object' },
      }),
    });

    if (!res.ok) {
      let detail = '';
      try {
        const body = await res.json();
        detail = body && body.error && body.error.message ? ` (${body.error.message})` : '';
      } catch {
        /* ignore */
      }
      throw new Error(`OpenAI request failed: ${res.status} ${res.statusText}${detail}`);
    }

    const body = await res.json();
    if (body.usage) {
      usage.inputTokens += body.usage.prompt_tokens || 0;
      usage.outputTokens += body.usage.completion_tokens || 0;
    }

    const content = body.choices && body.choices[0] && body.choices[0].message.content;
    if (!content) throw new Error('OpenAI returned an empty response.');
    try {
      return JSON.parse(content);
    } catch {
      throw new Error(`OpenAI returned non-JSON content: ${content.slice(0, 200)}`);
    }
  }

  function coerceBullets(value, max) {
    if (!Array.isArray(value)) return [];
    return value
      .map((b) => {
        if (typeof b === 'string') return { term: '', text: b.trim() };
        return { term: (b.term || '').trim(), text: (b.text || '').trim() };
      })
      .filter((b) => b.text)
      .slice(0, max);
  }

  function coerceTable(table) {
    if (
      !table ||
      !Array.isArray(table.columns) ||
      !Array.isArray(table.rows) ||
      table.rows.length === 0
    ) {
      return null;
    }
    return {
      title: (table.title || '').trim() || 'By comparison',
      columns: table.columns.map((c) => String(c)),
      rows: table.rows
        .filter((r) => Array.isArray(r) && r.length)
        .map((r) => r.map((cell) => String(cell))),
    };
  }

  function coerceStats(stats) {
    if (!Array.isArray(stats)) return null;
    const out = stats
      .map((s) => ({ value: String(s.value || '').trim(), label: String(s.label || '').trim() }))
      .filter((s) => s.value && s.label)
      .slice(0, 4);
    return out.length ? out : null;
  }

  // Synthesize the whole week into one brief object.
  //   items: array of { title, description, url, source, note, category }
  async function synthesizeBrief(items) {
    const articleBlock = items
      .map((it, i) => {
        const parts = [`${i + 1}. ${it.title}`];
        if (it.source) parts.push(`   source: ${it.source}`);
        if (it.description) parts.push(`   blurb: ${it.description}`);
        if (it.note) parts.push(`   editor note (use this angle): ${it.note}`);
        return parts.join('\n');
      })
      .join('\n\n');

    const result = await callOpenAI([
      {
        role: 'system',
        content:
          `${BRAND_VOICE}\n\n` +
          'Synthesize the week into ONE brief. Respond with a JSON object ONLY, with these keys:\n' +
          '- "whatHappened": array of 3 to 4 factual bullets. Each bullet is an object ' +
          '{ "term": "<short bold lead, e.g. a model or company, or empty>", "text": "<the rest, under ~16 words>" }.\n' +
          '- "whyYouShouldCare": array of 3 to 4 bullets (same object shape) on what it means for builders.\n' +
          '- "comparisonTable": include ONLY if the week genuinely has comparable tabular data ' +
          '(pricing, benchmarks, specs) that you can fill with real, current figures. Shape: ' +
          '{ "title": "...", "columns": ["..."], "rows": [["..."]] }. First column should be the ' +
          'company or item name. If nothing tabular fits this week, set it to null. Never invent fake numbers.\n' +
          '- "byTheNumbers": array of up to 4 objects { "value": "6x", "label": "short label" } for the ' +
          'most striking real figures of the week, or null if there are none worth pulling out.\n' +
          '- "radar": array of up to 4 short { "term", "text" } bullets for smaller stories that did not ' +
          'make the two panels, or null.\n' +
          '- "whyItMatters": ONE editorial paragraph (45 to 75 words) connecting the dots into a concrete ' +
          'takeaway for a builder. Do NOT start it with "The takeaway for builders" (that label is added ' +
          'automatically). Interpretation, not a recap.\n' +
          'Base everything on the articles provided. Prefer figures that appear in the blurbs.',
      },
      { role: 'user', content: articleBlock },
    ]);

    return {
      whatHappened: coerceBullets(result.whatHappened, 4),
      whyYouShouldCare: coerceBullets(result.whyYouShouldCare, 4),
      comparisonTable: coerceTable(result.comparisonTable),
      byTheNumbers: coerceStats(result.byTheNumbers),
      radar: coerceBullets(result.radar, 4).length ? coerceBullets(result.radar, 4) : null,
      whyItMatters: (result.whyItMatters && String(result.whyItMatters).trim()) || '',
    };
  }

  function report() {
    const inr = estimateInrCost(usage);
    return {
      ...usage,
      estimatedInr: inr,
      line:
        `OpenAI usage: ${usage.calls} call(s), ` +
        `${usage.inputTokens} in + ${usage.outputTokens} out tokens, ` +
        `estimated cost ~ INR ${inr.toFixed(2)} (${MODEL}).`,
    };
  }

  return { synthesizeBrief, report };
}

module.exports = { createSummarizer, MODEL, SAFETY_MAX_CALLS };
