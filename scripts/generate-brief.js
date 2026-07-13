// The GenAI Brief — weekly generator (Level 2 automation: fetch + curate +
// human review). Runs on Saurav's laptop, NEVER on the server, and NEVER
// auto-publishes: it writes the brief data + a LinkedIn teaser image, then
// stops. Saurav reviews the output and pushes to GitHub to publish.
//
// Usage:
//   node scripts/generate-brief.js
//
// Workflow (see SETUP_BRIEF.md):
//   - Lazy week:   empty this-week.json items -> fully auto-fetched.
//   - Curated week: hand-pick items in this-week.json (autoFetchCount: 0).
//   - Hybrid week:  a few picks + autoFetchCount more auto-fetched.
//
// Outputs:
//   - briefs-data/YYYY-MM-DD.json   (committed; this IS the archive)
//   - briefs-output/YYYY-MM-DD-linkedin.png  (gitignored; upload to LinkedIn)

const fs = require('fs');
const path = require('path');
const os = require('os');
const { execFile } = require('child_process');

const newsSource = require('../lib/news-sources/newsapi');
const { createSummarizer } = require('../lib/brief-summarizer');
const { renderLinkedInHTML } = require('../lib/brief-linkedin-template');

const ROOT = path.join(__dirname, '..');
const CONFIG_PATH = path.join(ROOT, 'this-week.json');
const DATA_DIR = path.join(ROOT, 'briefs-data');
const IMAGE_DIR = path.join(ROOT, 'briefs-output');

// Cost guardrail: never summarize more than 10 items in a run (see CLAUDE.md).
const MAX_ITEMS = 10;

const BROWSER_CANDIDATES = [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
];

// --- env loading (standalone node scripts don't get Next's automatic loading) ---
function loadEnvLocal() {
  const envPath = path.join(ROOT, '.env.local');
  if (!fs.existsSync(envPath)) return;
  const content = fs.readFileSync(envPath, 'utf8');
  content.split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const eq = trimmed.indexOf('=');
    if (eq === -1) return;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    const quoted =
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"));
    if (quoted) value = value.slice(1, -1);
    if (!(key in process.env)) process.env[key] = value;
  });
}

function readConfig() {
  if (!fs.existsSync(CONFIG_PATH)) {
    return { items: [], autoFetchCount: 6 };
  }
  try {
    return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
  } catch (err) {
    throw new Error(`Could not parse this-week.json: ${err.message}`);
  }
}

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

// "July 07 — July 13, 2026" for a 7-day window ending today (fallback only).
function defaultDateRange() {
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - 6);
  const fmt = (d) => d.toLocaleDateString('en-US', { month: 'long', day: '2-digit' });
  return `${fmt(start)} — ${fmt(end)}, ${end.getFullYear()}`;
}

function nextIssueNumber() {
  if (!fs.existsSync(DATA_DIR)) return 1;
  const count = fs
    .readdirSync(DATA_DIR)
    .filter((f) => /^\d{4}-\d{2}-\d{2}\.json$/.test(f)).length;
  return count + 1;
}

// Merge curated picks (first, they lead) with auto-fetched items, dedupe by
// URL, and cap at MAX_ITEMS. Curated items keep their note/category.
function buildRawItemList(curated, fetched) {
  const seen = new Set();
  const out = [];
  const add = (item) => {
    const key = (item.url || item.title || '').toLowerCase();
    if (!key || seen.has(key)) return;
    seen.add(key);
    out.push(item);
  };
  curated.forEach(add);
  fetched.forEach(add);
  return out.slice(0, MAX_ITEMS);
}

function findBrowser() {
  return BROWSER_CANDIDATES.find((c) => fs.existsSync(c)) || null;
}

// Render the LinkedIn HTML teaser to a 1080x1350 PNG via headless Edge/Chrome
// (same no-Puppeteer approach as the certificate generator). Non-fatal: if no
// browser is found we warn and skip, since the web JSON is the primary output.
async function renderLinkedInImage(brief, outPath) {
  const browser = findBrowser();
  if (!browser) {
    console.warn(
      'Warning: no Edge/Chrome found for the LinkedIn image. Skipping PNG. ' +
        '(Edit BROWSER_CANDIDATES in this script if your browser is installed elsewhere.)'
    );
    return false;
  }

  const html = renderLinkedInHTML(brief);
  const tmpHtml = path.join(os.tmpdir(), `genai-brief-${brief.date}-${Date.now()}.html`);
  fs.writeFileSync(tmpHtml, html, 'utf8');

  try {
    await new Promise((resolve, reject) => {
      execFile(
        browser,
        [
          '--headless',
          '--disable-gpu',
          '--no-sandbox',
          '--hide-scrollbars',
          '--force-device-scale-factor=1',
          '--window-size=1080,1350',
          `--screenshot=${outPath}`,
          `file:///${tmpHtml.replace(/\\/g, '/')}`,
        ],
        (error) => (error ? reject(error) : resolve())
      );
    });
    return true;
  } finally {
    fs.unlinkSync(tmpHtml);
  }
}

async function main() {
  loadEnvLocal();

  const config = readConfig();
  const curatedRaw = Array.isArray(config.items) ? config.items : [];
  const autoFetchCount =
    typeof config.autoFetchCount === 'number'
      ? config.autoFetchCount
      : curatedRaw.length > 0
        ? 0
        : 6;

  const date = config.date || todayIso();
  const dateRange = config.dateRange || defaultDateRange();
  const issueNumber = config.issueNumber || nextIssueNumber();

  console.log(`\nThe GenAI Brief — generating issue ${issueNumber} (${dateRange})`);
  console.log(`Curated picks: ${curatedRaw.length}, auto-fetch: ${autoFetchCount}\n`);

  // 1. Gather raw items.
  const curated = curatedRaw.map((it) => ({
    title: it.title || '',
    url: it.url || '',
    source: it.source || sourceFromUrl(it.url),
    description: it.description || '',
    note: it.note || '',
    category: it.category || '',
  }));

  let fetched = [];
  if (autoFetchCount > 0) {
    console.log(`Fetching top AI news from ${newsSource.SOURCE_NAME}...`);
    fetched = await newsSource.fetchNews({ count: autoFetchCount + 3 });
    console.log(`  got ${fetched.length} candidate articles.`);
  }

  const rawItems = buildRawItemList(curated, fetched).slice(
    0,
    Math.min(MAX_ITEMS, Math.max(curated.length + autoFetchCount, curated.length))
  );

  if (rawItems.length === 0) {
    throw new Error(
      'No items to summarize. Add picks to this-week.json or set autoFetchCount > 0 with a NEWSAPI_KEY.'
    );
  }

  // 2. Synthesize the whole week into one brief (single cost-capped call).
  const summarizer = createSummarizer({ apiKey: process.env.OPENAI_API_KEY });
  console.log(`\nSynthesizing ${rawItems.length} items into one brief with OpenAI...`);
  rawItems.forEach((raw) => process.stdout.write(`  - ${raw.title.slice(0, 66)}\n`));
  const synth = await summarizer.synthesizeBrief(rawItems);

  // 3. Assemble the brief. The two panels + takeaway are the always-on spine;
  //    the table, "also this week" list and "by the numbers" appear only when
  //    the week supports them. The AI may draft the table and numbers (you
  //    review them); anything you hand-set in this-week.json wins.
  const brief = {
    date,
    dateRange,
    issueNumber,
    generatedAt: new Date().toISOString(),
    whatHappened: synth.whatHappened,
    whyYouShouldCare: synth.whyYouShouldCare,
    comparisonTable: config.comparisonTable || synth.comparisonTable || null,
    radar: config.radar || synth.radar || null,
    whyItMatters: synth.whyItMatters,
    byTheNumbers: config.byTheNumbers || synth.byTheNumbers || null,
    sources: rawItems.map((it) => it.url).filter(Boolean),
  };

  // 5. Write the archive JSON (committed) — this is the source of truth.
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  const dataPath = path.join(DATA_DIR, `${date}.json`);
  fs.writeFileSync(dataPath, `${JSON.stringify(brief, null, 2)}\n`, 'utf8');
  console.log(`\nWrote ${path.relative(ROOT, dataPath)}`);

  // 6. Render the LinkedIn teaser PNG (gitignored).
  if (!fs.existsSync(IMAGE_DIR)) fs.mkdirSync(IMAGE_DIR, { recursive: true });
  const imgPath = path.join(IMAGE_DIR, `${date}-linkedin.png`);
  const rendered = await renderLinkedInImage(brief, imgPath);
  if (rendered) console.log(`Wrote ${path.relative(ROOT, imgPath)}`);

  // 7. Cost report (mandatory).
  const cost = summarizer.report();
  console.log(`\n${cost.line}`);

  if (brief.comparisonTable || brief.byTheNumbers) {
    console.log(
      '\n  ! REVIEW THE NUMBERS: the AI drafted the ' +
        [brief.comparisonTable ? 'comparison table' : null, brief.byTheNumbers ? '"by the numbers" stats' : null]
          .filter(Boolean)
          .join(' and ') +
        '. Fact-check every figure before publishing.'
    );
  }

  console.log('\nNext steps (nothing is published yet):');
  console.log('  1. Run `npm run dev` and open http://localhost:3000/this-week-in-ai to review.');
  console.log('  2. Edit briefs-data/' + date + '.json by hand to fix any take, number, or table cell.');
  console.log('  3. Upload briefs-output/' + date + '-linkedin.png to LinkedIn.');
  console.log('  4. `git add briefs-data this-week.json && git commit && git push` to publish.\n');
}

function sourceFromUrl(url) {
  if (!url) return '';
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
}

main().catch((err) => {
  console.error('\nFailed to generate the brief:', err.message);
  process.exit(1);
});
