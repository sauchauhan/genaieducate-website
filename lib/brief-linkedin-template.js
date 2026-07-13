// LinkedIn teaser image template for The GenAI Brief.
//
// Produces a standalone HTML document at exactly 1080x1350 (portrait) that the
// generator renders to PNG with headless Edge/Chrome (--screenshot), matching
// the same no-Puppeteer approach used by the certificate generator.
//
// This is a TEASER, not the full brief: header + top 3 highlights + a line
// driving readers to genaieducate.com/this-week-in-ai. Single source of truth:
// it is built from the same brief data object as the web page.

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function bulletText(b) {
  if (typeof b === 'string') return b;
  return `${b.term ? b.term + ' ' : ''}${b.text || ''}`.trim();
}

// Pull up to 3 teaser highlights from the week's "What Happened" bullets.
function topHighlights(brief) {
  return (brief.whatHappened || []).slice(0, 3).map(bulletText).filter(Boolean);
}

function renderLinkedInHTML(brief) {
  const highlights = topHighlights(brief);

  const highlightRows = highlights
    .map((headline, i) => {
      return `
        <div class="hl">
          <div class="hl-num">${String(i + 1).padStart(2, '0')}</div>
          <div class="hl-body">
            <div class="hl-headline">${escapeHtml(headline)}</div>
          </div>
        </div>`;
    })
    .join('\n');

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Lora:wght@600;700&family=IBM+Plex+Sans:wght@400;600&family=IBM+Plex+Mono:wght@500;600&display=swap" rel="stylesheet">
<style>
  :root {
    --cream:#FFF8F0; --paper:#FDFBF7; --forest:#1E5C4A; --forest-dark:#164438;
    --rust:#C94F1E; --gold:#B8860B; --gold-soft:#F5EAD0;
    --ink:#1A1A1A; --ink-soft:#444; --muted:#6B6B6B; --line:#E4DED3;
  }
  * { margin:0; padding:0; box-sizing:border-box; }
  html, body { width:1080px; height:1350px; overflow:hidden; }
  body {
    background: var(--paper);
    font-family: 'IBM Plex Sans', system-ui, sans-serif;
    color: var(--ink);
    display:flex; flex-direction:column;
  }
  .header {
    background: var(--forest);
    color: var(--cream);
    border-bottom: 6px solid var(--gold);
    padding: 64px 72px 52px;
  }
  .kicker {
    font-family:'IBM Plex Mono', monospace;
    font-size: 22px; letter-spacing: 6px; text-transform: uppercase;
    color: var(--gold-soft); margin-bottom: 22px;
  }
  .title {
    font-family:'Lora', Georgia, serif; font-weight:700;
    font-size: 92px; line-height: 1.02; letter-spacing:-1px;
  }
  .meta {
    font-family:'IBM Plex Mono', monospace;
    font-size: 24px; color: var(--cream); opacity:.9; margin-top: 26px;
    display:flex; gap: 22px; align-items:center;
  }
  .meta .dot { width:8px; height:8px; background:var(--rust); display:inline-block; }
  .body { flex:1; padding: 56px 72px 0; display:flex; flex-direction:column; }
  .section-label {
    font-family:'IBM Plex Mono', monospace; font-weight:600;
    font-size: 22px; letter-spacing: 3px; text-transform: uppercase;
    color: var(--forest); display:flex; align-items:center; gap:14px; margin-bottom: 40px;
  }
  .section-label .sq { width:14px; height:14px; background:var(--rust); }
  .section-label .rule { flex:1; height:2px; background:var(--line); }
  .hl { display:flex; gap:28px; padding: 30px 0; border-bottom:1px solid var(--line); }
  .hl:first-of-type { border-top:1px solid var(--line); }
  .hl-num {
    font-family:'IBM Plex Mono', monospace; font-weight:600;
    font-size: 44px; color: var(--gold); line-height:1; min-width: 70px;
  }
  .hl-cat {
    font-family:'IBM Plex Mono', monospace; font-weight:600;
    font-size: 20px; letter-spacing:2px; text-transform:uppercase;
    display:flex; align-items:center; gap:10px; margin-bottom: 14px;
  }
  .hl-cat .sq { width:12px; height:12px; display:inline-block; }
  .hl-headline {
    font-family:'Lora', Georgia, serif; font-weight:600;
    font-size: 40px; line-height:1.22; color: var(--ink);
  }
  .footer {
    background: var(--forest);
    color: var(--cream);
    padding: 46px 72px;
    display:flex; justify-content:space-between; align-items:center;
  }
  .cta { max-width: 640px; }
  .cta-lead {
    font-family:'IBM Plex Sans', sans-serif; font-size: 26px; color: var(--gold-soft);
    margin-bottom: 10px;
  }
  .cta-url {
    font-family:'IBM Plex Mono', monospace; font-weight:600;
    font-size: 34px; color: var(--cream); letter-spacing:-.5px;
  }
  .brand {
    text-align:right; font-family:'Lora', Georgia, serif; font-weight:700;
    font-size: 30px; color: var(--cream);
  }
  .brand span { color: var(--rust); }
  .brand .tag {
    display:block; font-family:'IBM Plex Mono', monospace; font-weight:500;
    font-size: 16px; letter-spacing:2px; color: var(--gold-soft); margin-top:8px;
    text-transform:uppercase;
  }
</style>
</head>
<body>
  <div class="header">
    <div class="kicker">GenAIEducate &nbsp;·&nbsp; Weekly Intelligence</div>
    <div class="title">The GenAI <span style="color:var(--rust)">Brief</span></div>
    <div class="meta">
      <span>${escapeHtml(brief.dateRange || '')}</span>
      <span class="dot"></span>
      <span>Issue #${escapeHtml(String(brief.issueNumber || 1).padStart(2, '0'))}</span>
    </div>
  </div>

  <div class="body">
    <div class="section-label"><span class="sq"></span>Top of the brief<span class="rule"></span></div>
    ${highlightRows}
  </div>

  <div class="footer">
    <div class="cta">
      <div class="cta-lead">Full breakdown, tables and takeaways at</div>
      <div class="cta-url">genaieducate.com/this-week-in-ai</div>
    </div>
    <div class="brand">
      GenAI<span>Educate</span>
      <span class="tag">Institute for Generative AI</span>
    </div>
  </div>
</body>
</html>`;
}

module.exports = { renderLinkedInHTML };
