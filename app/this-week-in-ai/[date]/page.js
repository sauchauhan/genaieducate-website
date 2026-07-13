import Link from 'next/link';
import { notFound } from 'next/navigation';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import BriefDocument from '../../../lib/brief-template';
import { getBriefByDate, getBriefDates } from '../../../lib/briefs';

// Pre-render every archived brief at build time. `archive` is a static segment
// and takes precedence over this dynamic one, so it never collides here.
export function generateStaticParams() {
  return getBriefDates().map((date) => ({ date }));
}

export async function generateMetadata({ params }) {
  const { date } = await params;
  const brief = getBriefByDate(date);
  if (!brief) return { title: 'The GenAI Brief | GenAIEducate' };
  return {
    title: `The GenAI Brief · ${brief.dateRange} | GenAIEducate`,
    description: brief.whyItMatters
      ? brief.whyItMatters.slice(0, 155)
      : 'A weekly briefing on what happened in AI and what it means for builders.',
  };
}

export default async function DatedBriefPage({ params }) {
  const { date } = await params;
  const brief = getBriefByDate(date);
  if (!brief) notFound();

  return (
    <main className="bg-[#DDD6C9] min-h-screen flex flex-col">
      <Nav />
      <div className="flex-1 py-8 sm:py-10 px-3 sm:px-5">
        <BriefDocument brief={brief} />
        <div className="max-w-[860px] mx-auto w-full mt-5 flex justify-between font-brief-mono text-[11px] tracking-wide">
          <Link href="/this-week-in-ai" className="text-[#164438] hover:underline no-underline">
            ← LATEST ISSUE
          </Link>
          <Link
            href="/this-week-in-ai/archive"
            className="text-[#164438] hover:underline no-underline"
          >
            ALL ISSUES →
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
