# The GenAI Brief — setup and weekly workflow

The GenAI Brief is a weekly AI news digest published at
`genaieducate.com/this-week-in-ai`. It is **Level 2 automation**: the generator
fetches and summarizes the week's AI news on your laptop, you review and edit,
then you push to GitHub to publish. **It never auto-publishes and never runs on
the server.**

- Latest issue: `/this-week-in-ai`
- Dated permalink: `/this-week-in-ai/2026-07-12`
- Browsable archive: `/this-week-in-ai/archive`

---

## One-time setup

### 1. Get a free NewsAPI key
1. Go to <https://newsapi.org/register> and sign up (free "Developer" tier).
2. Copy your API key.
3. The free tier only works on `localhost` and delays articles by ~24h. That is
   fine, because this script only ever runs on your laptop.

### 2. Confirm your OpenAI key
Summarization uses OpenAI `gpt-4o-mini` (cheap). You likely already have an
`OPENAI_API_KEY`. If not, create one at <https://platform.openai.com/api-keys>.

### 3. Add both keys to `.env.local`
Open `.env.local` in the project root (copy from `.env.local.example` if it does
not exist yet) and add:

```
NEWSAPI_KEY=your_newsapi_key_here
OPENAI_API_KEY=your_openai_key_here
```

`.env.local` is gitignored and is never committed.

### 4. That is it
No new npm packages are needed. The generator uses your installed Edge or Chrome
(headless) to render the LinkedIn image, the same way the certificate generator
works.

---

## Cost: you cannot accidentally spend much

The summarizer has hard guardrails baked in (see `lib/brief-summarizer.js`):

- **Max 10 news items** summarized per run.
- **Capped `max_tokens` (400) per API call**, so a single call can never run away.
- **Hard ceiling on total API calls** per run.
- After every run it prints an **estimated cost in ₹**.

A normal weekly run costs **well under ₹5**.

---

## Weekly workflow

You edit `this-week.json`, run one command, review, then push. There are three
ways to run each week.

### Option A — Lazy week (zero curation)
Leave `items` empty in `this-week.json` (this is the default). Then:

```
node scripts/generate-brief.js
```

The script auto-fetches the top AI stories, summarizes each, assembles the page,
and writes the LinkedIn image. Review, then push.

### Option B — Curated week (you have picks)
Edit `this-week.json`: add your hand-picked stories to `items` and set
`autoFetchCount` to `0`.

```json
{
  "autoFetchCount": 0,
  "items": [
    {
      "title": "Anthropic ships X",
      "url": "https://www.anthropic.com/news/x",
      "category": "PRODUCT",
      "note": "Your own angle here, or leave blank for the AI to summarize."
    }
  ]
}
```

The **first item becomes the lead story** (the two-panel "What Happened / Why You
Should Care" grid). The rest become news cards.

### Option C — Hybrid week
Add a few picks to `items` and set `autoFetchCount` to how many *more* stories to
auto-fetch and fill in.

### Optional blocks: comparison table and "by the numbers"
The AI **drafts** these when the week's news supports them (a pricing table,
benchmark numbers, standout stats). **You must fact-check every figure on
review** before publishing, and the generator prints a reminder when it drafted
any. To override the AI, or to add data it missed, set them by hand in
`this-week.json` (anything you set there wins over the AI draft):

```json
{
  "comparisonTable": {
    "title": "Frontier model pricing, per 1M tokens",
    "columns": ["Model", "Input", "Output", "Context"],
    "rows": [
      ["Claude Opus 4.8", "$5", "$25", "200K"],
      ["GPT-5", "$4", "$20", "256K"]
    ]
  },
  "byTheNumbers": [
    { "value": "$3B", "label": "Raised across AI startups this week" }
  ]
}
```

Leave them as `null` when you have nothing tabular that week. The layout does not
render empty blocks, so it never looks half-finished.

### Overriding date and issue number (optional)
By default the script uses today's date, a 7-day date range, and the next issue
number automatically. Override any of them in `this-week.json` with `date`
(`"YYYY-MM-DD"`), `dateRange` (`"July 06 — July 12, 2026"`), or `issueNumber`.

---

## Review and publish

After running the script:

1. **Review the page.** Run `npm run dev` and open
   <http://localhost:3000/this-week-in-ai>. Read every "why it matters" take.
2. **Fix any take by hand.** The brief is just JSON: edit
   `briefs-data/YYYY-MM-DD.json` directly and refresh.
3. **Post to LinkedIn.** Upload `briefs-output/YYYY-MM-DD-linkedin.png` (a portrait
   teaser that drives readers to the site). This image is gitignored.
4. **Publish.** Commit and push:
   ```
   git add briefs-data/ this-week.json
   git commit -m "The GenAI Brief: issue N"
   git push
   ```
   Vercel auto-deploys. The new issue becomes the latest and is added to the
   archive automatically.

**`briefs-data/` is committed. That directory IS the archive.**
`briefs-output/` (the PNGs) is gitignored.

---

## What gets created each week

| Path | Committed? | What it is |
|------|-----------|------------|
| `briefs-data/YYYY-MM-DD.json` | Yes | The brief content. Source of truth for the web page and the image. |
| `briefs-output/YYYY-MM-DD-linkedin.png` | No (gitignored) | 1080x1350 LinkedIn teaser. You upload it manually. |

---

## Files in this system

- `scripts/generate-brief.js` — the generator (fetch → summarize → assemble → write page + image).
- `lib/news-sources/newsapi.js` — swappable NewsAPI fetcher. Later, drop in an RSS
  module implementing the same `fetchNews()` contract for automated server runs.
- `lib/brief-summarizer.js` — OpenAI summarization with the cost guardrail.
- `lib/brief-template.js` — the web page block assembly (the approved design).
- `lib/brief-linkedin-template.js` — the LinkedIn teaser image template.
- `lib/briefs.js` — reads `briefs-data/` for the web pages.
- `app/this-week-in-ai/page.js` — the latest issue.
- `app/this-week-in-ai/[date]/page.js` — dated permalinks.
- `app/this-week-in-ai/archive/page.js` — the archive index.
- `this-week.json` — your weekly curation file.

---

## Swapping the news source later

`lib/news-sources/newsapi.js` is intentionally isolated. To move to RSS (so runs
can be automated server-side without NewsAPI's localhost limit), create
`lib/news-sources/rss.js` exporting the same shape:

```js
module.exports = {
  SOURCE_NAME: 'RSS',
  fetchNews({ count, query }) { /* return NormalizedArticle[] */ },
};
```

Then change the one `require(...)` line at the top of `scripts/generate-brief.js`.
Nothing else changes.

---

## Note: the seed "launch issue"

`briefs-data/2026-07-12.json` is a hand-written launch issue (marked
`"sample": true`) so the pages render before your first real run. Once you
generate and publish a real issue, you can delete or keep it.
