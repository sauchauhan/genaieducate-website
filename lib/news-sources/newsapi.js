// Swappable news source: NewsAPI (https://newsapi.org).
//
// Every news source must implement the same small contract so the generator
// can swap NewsAPI for an RSS-based source later (for automated server-side
// runs) WITHOUT any change to scripts/generate-brief.js:
//
//   module.exports = {
//     SOURCE_NAME: string,
//     fetchNews({ count, query, fromDaysAgo }): Promise<NormalizedArticle[]>
//   }
//
//   NormalizedArticle = {
//     title:       string,
//     url:         string,
//     source:      string,   // publication name, e.g. "TechCrunch"
//     description: string,    // short blurb used to ground the AI summary
//     publishedAt: string,   // ISO date
//   }
//
// The NewsAPI free "Developer" tier works on localhost only and delays
// articles by ~24h. That is fine here: this script runs on Saurav's laptop,
// never on the server. When we later want automated server-side runs, drop in
// lib/news-sources/rss.js implementing the same contract.

const SOURCE_NAME = 'NewsAPI';

// A focused query for the AI beat. Broad enough to catch the week's real
// stories, tight enough to avoid generic "tech" noise.
const DEFAULT_QUERY =
  '("artificial intelligence" OR "generative AI" OR LLM OR "large language model" ' +
  'OR OpenAI OR Anthropic OR "Claude" OR "ChatGPT" OR "GPT-5" OR Gemini OR "AI agent")';

// Publications whose AI coverage is signal, not press-release reprints. NewsAPI
// ranks within these when we pass sortBy=publishedAt, so this mostly filters junk.
const PREFERRED_DOMAINS = [
  'techcrunch.com',
  'theverge.com',
  'arstechnica.com',
  'wired.com',
  'venturebeat.com',
  'technologyreview.com',
  'reuters.com',
  'theinformation.com',
  'semafor.com',
];

function isoDaysAgo(days) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().slice(0, 10);
}

// NewsAPI marks pulled articles with "[Removed]" but still returns the row.
// Drop those, plus anything missing the fields we need to summarize/link.
function isUsable(article) {
  if (!article || !article.title || !article.url) return false;
  if (article.title === '[Removed]') return false;
  return true;
}

function normalize(article) {
  return {
    title: article.title.trim(),
    url: article.url,
    source: (article.source && article.source.name) || 'Unknown source',
    description: (article.description || article.content || '').trim(),
    publishedAt: article.publishedAt || '',
  };
}

// Words too common to help tell two headlines apart.
const STOPWORDS = new Set([
  'the', 'a', 'an', 'of', 'for', 'to', 'in', 'on', 'and', 'or', 'as', 'is', 'are',
  'was', 'were', 'with', 'over', 'into', 'its', 'it', 'new', 'at', 'by', 'from',
  'that', 'this', 'has', 'have', 'had', 'his', 'her', 'their', 'they', 'you',
  'your', 'our', 'be', 'been', 'will', 'would', 'after', 'amid', 'say', 'says',
  'said', 'how', 'why', 'what', 'who', 'more', 'than', 'about',
]);

// Lowercase content tokens with naive singularization, stopwords removed.
function contentTokens(title) {
  return new Set(
    title
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((w) => w.length > 2 && !STOPWORDS.has(w))
      .map((w) => (w.length > 3 && w.endsWith('s') ? w.slice(0, -1) : w))
  );
}

// Proper-noun-ish tokens: capitalized words / acronyms in the original title.
// These are the entities a story is "about" (Apple, OpenAI, Microsoft).
function entityTokens(title) {
  const out = new Set();
  for (const raw of title.split(/[^A-Za-z0-9]+/)) {
    if (raw.length > 1 && /^[A-Z]/.test(raw)) {
      const w = raw.toLowerCase();
      if (!STOPWORDS.has(w)) out.add(w.length > 3 && w.endsWith('s') ? w.slice(0, -1) : w);
    }
  }
  return out;
}

function jaccard(a, b) {
  if (a.size === 0 || b.size === 0) return 0;
  let inter = 0;
  for (const x of a) if (b.has(x)) inter += 1;
  return inter / (a.size + b.size - inter);
}

function sharedCount(a, b) {
  let n = 0;
  for (const x of a) if (b.has(x)) n += 1;
  return n;
}

// Two headlines are "the same story" if their wording overlaps a lot, OR they
// share at least two named entities and still overlap moderately. The second
// rule catches the same event reported by different outlets with different
// phrasing, e.g. "Apple sues OpenAI over hardware secrets" vs "Apple files
// trade secret suit against OpenAI", which title-only matching misses.
function isSameStory(a, b) {
  const sim = jaccard(a.words, b.words);
  if (sim >= 0.5) return true;
  if (sharedCount(a.entities, b.entities) >= 2 && sim >= 0.3) return true;
  return false;
}

// Collapse near-duplicate stories, keeping the first (freshest, since the feed
// is sorted by publishedAt) occurrence of each.
function dedupeStories(articles) {
  const kept = [];
  const keptTokens = [];
  for (const a of articles) {
    const tokens = { words: contentTokens(a.title), entities: entityTokens(a.title) };
    if (keptTokens.some((k) => isSameStory(k, tokens))) continue;
    kept.push(a);
    keptTokens.push(tokens);
  }
  return kept;
}

async function fetchNews({ count = 6, query = DEFAULT_QUERY, fromDaysAgo = 7 } = {}) {
  const apiKey = process.env.NEWSAPI_KEY;
  if (!apiKey) {
    throw new Error(
      'NEWSAPI_KEY is not set in .env.local. Get a free key at https://newsapi.org/register, ' +
        'or provide hand-picked items in this-week.json so no auto-fetch is needed.'
    );
  }

  const params = new URLSearchParams({
    q: query,
    language: 'en',
    sortBy: 'publishedAt',
    from: isoDaysAgo(fromDaysAgo),
    pageSize: '40', // over-fetch; we filter + dedupe down to `count`
    domains: PREFERRED_DOMAINS.join(','),
  });

  const res = await fetch(`https://newsapi.org/v2/everything?${params.toString()}`, {
    headers: { 'X-Api-Key': apiKey },
  });

  if (!res.ok) {
    let detail = '';
    try {
      const body = await res.json();
      detail = body && body.message ? ` (${body.message})` : '';
    } catch {
      /* ignore parse errors */
    }
    throw new Error(`NewsAPI request failed: ${res.status} ${res.statusText}${detail}`);
  }

  const body = await res.json();
  const articles = Array.isArray(body.articles) ? body.articles : [];

  return dedupeStories(articles.filter(isUsable).map(normalize)).slice(0, count);
}

module.exports = { SOURCE_NAME, fetchNews, DEFAULT_QUERY };
