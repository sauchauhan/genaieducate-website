// The GenAI Brief — web page block assembly (React).
//
// A dense, bounded "intelligence tabloid": a fixed paper sheet on a warm-gray
// backdrop, small type, hard field boundaries, and an obvious start (dark green
// header + gold rule) and end (CTA + footer). Designed to be read in roughly
// one screen with minimal scrolling, like a Bloomberg one-pager.
//
// Modular + flexible: the two-panel synthesis, the takeaway, the CTA and the
// footer are always present; the comparison table, the "also this week" strip,
// and the "by the numbers" grid render only when the week's data includes them,
// and the layout stays tight when they are absent.
//
// Fonts (Lora / IBM Plex Sans / IBM Plex Mono) come from CSS variables set by
// app/this-week-in-ai/layout.js and mapped in tailwind.config.js to
// font-brief-serif / font-brief-sans / font-brief-mono.

import Link from 'next/link';

const COMPANY_COLORS = {
  anthropic: '#7C3AED',
  openai: '#0F766E',
  google: '#B45309',
  'google deepmind': '#B45309',
  deepmind: '#B45309',
  xai: '#15803D',
  meta: '#C2410C',
  microsoft: '#1D4ED8',
  apple: '#B91C1C',
  nvidia: '#15803D',
  mistral: '#C2410C',
};

function companyColor(text) {
  if (typeof text !== 'string') return null;
  return COMPANY_COLORS[text.trim().toLowerCase()] || null;
}

function hostOf(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

// Accept bullets as plain strings or { term, text } objects.
function coerceBullet(b) {
  if (typeof b === 'string') return { term: '', text: b };
  return { term: b.term || '', text: b.text || '' };
}

// Section label: rust square marker, forest mono caps, thin trailing rule.
function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-2 mb-2.5 font-brief-mono text-[10px] font-semibold tracking-[0.14em] uppercase text-[#1E5C4A]">
      <span className="w-2.5 h-2.5 bg-[#C94F1E] shrink-0" aria-hidden />
      <span className="whitespace-nowrap">{children}</span>
      <span className="flex-1 h-px bg-[#E4DED3]" aria-hidden />
    </div>
  );
}

function BulletList({ bullets }) {
  return (
    <ul className="list-none p-0 m-0">
      {bullets.map(coerceBullet).map((b, i) => (
        <li
          key={i}
          className="flex gap-2 py-[5px] border-b border-[#E4DED3] last:border-b-0 font-brief-sans text-[12px] leading-[1.45] text-[#444]"
        >
          <span className="text-[#C94F1E] font-semibold shrink-0" aria-hidden>
            →
          </span>
          <span>
            {b.term && <strong className="text-[#1E5C4A] font-semibold">{b.term}</strong>}
            {b.term ? ' ' : ''}
            {b.text}
          </span>
        </li>
      ))}
    </ul>
  );
}

function BulletPanel({ label, bullets, rustEdge }) {
  return (
    <div
      className={`bg-[#FFF8F0] border border-[#E4DED3] px-4 py-3.5 ${
        rustEdge ? 'border-l-[3px] border-l-[#C94F1E]' : 'border-l-[3px] border-l-[#1E5C4A]'
      }`}
    >
      <SectionLabel>{label}</SectionLabel>
      <BulletList bullets={bullets} />
    </div>
  );
}

// ---- Header (always) --------------------------------------------------------
function Header({ brief }) {
  const issue = String(brief.issueNumber).padStart(2, '0');
  return (
    <header className="bg-[#1E5C4A] border-b-[3px] border-[#B8860B] flex justify-between items-start gap-4 px-6 py-5 sm:px-8">
      <div className="flex-1 min-w-0">
        <div className="font-brief-mono text-[10px] tracking-[0.2em] uppercase text-[#F5EAD0] mb-1.5">
          GenAIEducate&nbsp;&nbsp;·&nbsp;&nbsp;Weekly Intelligence
        </div>
        <h1 className="font-brief-serif text-2xl sm:text-[30px] font-bold text-[#FFF8F0] leading-[1.05] m-0">
          The GenAI <span className="text-[#C94F1E]">Brief</span>
        </h1>
      </div>
      <div className="font-brief-mono text-[9.5px] text-[#FFF8F0]/65 text-right leading-[1.9] whitespace-nowrap shrink-0">
        {brief.dateRange}
        <br />
        Issue #{issue}
        <br />
        genaieducate.com
      </div>
    </header>
  );
}

// ---- Two-panel synthesis (always) ------------------------------------------
function Panels({ brief }) {
  const whatHappened = brief.whatHappened || [];
  const whyYouShouldCare = brief.whyYouShouldCare || [];
  if (whatHappened.length === 0 && whyYouShouldCare.length === 0) return null;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <BulletPanel label="What Happened" bullets={whatHappened} />
      <BulletPanel label="Why You Should Care" bullets={whyYouShouldCare} rustEdge />
    </div>
  );
}

// ---- Comparison table (optional) -------------------------------------------
function TableCell({ cell, first }) {
  const value = typeof cell === 'object' && cell !== null ? cell.text : cell;
  const color =
    (typeof cell === 'object' && cell !== null && cell.color) || companyColor(value);
  return (
    <td
      className={`px-2.5 py-[7px] border-b border-[#E4DED3] whitespace-nowrap ${
        first ? 'font-semibold' : ''
      }`}
      style={color ? { color } : { color: '#1A1A1A' }}
    >
      {value}
    </td>
  );
}

function ComparisonTable({ table }) {
  if (!table || !Array.isArray(table.rows) || table.rows.length === 0) return null;
  return (
    <div className="mb-6">
      <SectionLabel>{table.title || 'By comparison'}</SectionLabel>
      <div className="overflow-x-auto border border-[#E4DED3]">
        <table className="w-full border-collapse font-brief-mono text-[11px]">
          <thead>
            <tr className="bg-[#1E5C4A]">
              {table.columns.map((col, i) => (
                <th
                  key={i}
                  className="text-left text-[#FFF8F0] text-[9px] tracking-[0.08em] uppercase font-medium px-2.5 py-2 whitespace-nowrap"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, r) => (
              <tr key={r} className={r % 2 === 1 ? 'bg-[#FFF8F0]' : 'bg-white'}>
                {row.map((cell, c) => (
                  <TableCell key={c} cell={cell} first={c === 0} />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ---- Also this week (optional): scattered short items ----------------------
function Radar({ radar }) {
  if (!radar || radar.length === 0) return null;
  return (
    <div className="mb-6">
      <SectionLabel>Also This Week</SectionLabel>
      <div className="border border-[#E4DED3] border-l-[3px] border-l-[#1E5C4A] px-4 py-3 bg-[#FFF8F0]">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
          <BulletList bullets={radar.slice(0, Math.ceil(radar.length / 2))} />
          {radar.length > 1 && (
            <BulletList bullets={radar.slice(Math.ceil(radar.length / 2))} />
          )}
        </div>
      </div>
    </div>
  );
}

// ---- Why it matters (always) -----------------------------------------------
function WhyItMatters({ text }) {
  if (!text) return null;
  return (
    <div className="bg-[#F5EAD0] border-l-[3px] border-[#B8860B] px-4 py-3 font-brief-sans text-[12px] leading-[1.55] text-[#444] mb-6">
      <b className="text-[#1E5C4A]">The takeaway for builders: </b>
      {text}
    </div>
  );
}

// ---- By the numbers (optional) ---------------------------------------------
function ByTheNumbers({ stats }) {
  if (!stats || stats.length === 0) return null;
  return (
    <div className="mb-1">
      <SectionLabel>By the Numbers</SectionLabel>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.slice(0, 4).map((s, i) => (
          <div key={i} className="bg-[#FFF8F0] border border-[#E4DED3] px-2.5 py-3.5 text-center">
            <div className="font-brief-mono text-2xl sm:text-[26px] font-semibold text-[#1E5C4A] leading-none">
              {s.value}
            </div>
            <div className="font-brief-sans text-[10px] text-[#6B6B6B] mt-1.5 leading-[1.3]">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---- CTA (always) -----------------------------------------------------------
function Cta() {
  return (
    <div className="bg-[#1E5C4A] px-6 py-5 sm:px-8 text-center">
      <div className="font-brief-sans text-[14px] text-[#FFF8F0] mb-3">
        Want to actually build and deploy these systems?
      </div>
      <Link
        href="/program"
        className="inline-block bg-[#C94F1E] text-[#FFF8F0] px-6 py-2.5 font-brief-mono text-[12px] font-semibold tracking-[0.05em] no-underline"
      >
        SEE OUR APPLIED GENAI PROGRAM →
      </Link>
    </div>
  );
}

// ---- Footer (always) --------------------------------------------------------
function BriefFooter({ brief }) {
  const issue = String(brief.issueNumber).padStart(2, '0');
  const hosts = (brief.sources || []).map(hostOf);
  const uniqueHosts = [...new Set(hosts)].slice(0, 5);
  const sourceText =
    uniqueHosts.length > 0 ? uniqueHosts.join(', ') : 'provider docs, industry press';
  return (
    <div className="px-6 py-3 sm:px-8 flex flex-col sm:flex-row gap-1 justify-between items-center border-t border-[#E4DED3] bg-[#FDFBF7]">
      <div className="font-brief-mono text-[9px] text-[#6B6B6B] text-center sm:text-left">
        Sources: {sourceText} · {brief.dateRange}
      </div>
      <div className="font-brief-mono text-[9px] text-[#1E5C4A] font-semibold tracking-[0.1em]">
        THE GENAI BRIEF · #{issue}
      </div>
    </div>
  );
}

// ---- Full sheet -------------------------------------------------------------
export default function BriefDocument({ brief }) {
  return (
    <article className="max-w-[860px] mx-auto w-full bg-[#FDFBF7] shadow-[0_4px_30px_rgba(0,0,0,0.15)]">
      <Header brief={brief} />
      <div className="px-6 py-6 sm:px-8">
        <Panels brief={brief} />
        <ComparisonTable table={brief.comparisonTable} />
        <Radar radar={brief.radar} />
        <WhyItMatters text={brief.whyItMatters} />
        <ByTheNumbers stats={brief.byTheNumbers} />
      </div>
      <Cta />
      <BriefFooter brief={brief} />
    </article>
  );
}

// Teaser text for the archive index, derived from the synthesis.
export function briefTeaser(brief) {
  const first = (brief.whatHappened || [])[0];
  if (first) {
    const b = coerceBullet(first);
    return b.term ? `${b.term} ${b.text}` : b.text;
  }
  return brief.whyItMatters || '';
}
