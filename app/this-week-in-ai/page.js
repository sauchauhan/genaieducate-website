import Link from 'next/link';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import BriefDocument from '../../lib/brief-template';
import { getLatestBrief } from '../../lib/briefs';

export const metadata = {
  title: 'The GenAI Brief | GenAIEducate',
  description:
    'A weekly, no-hype briefing on what actually happened in AI and what it means for engineers and teams building real systems.',
};

export default function LatestBriefPage() {
  const brief = getLatestBrief();

  return (
    <main className="bg-[#DDD6C9] min-h-screen flex flex-col">
      <Nav />
      <div className="flex-1 py-8 sm:py-10 px-3 sm:px-5">
        {brief ? (
          <>
            <BriefDocument brief={brief} />
            <div className="max-w-[860px] mx-auto w-full mt-5 text-center">
              <Link
                href="/this-week-in-ai/archive"
                className="font-brief-mono text-[11px] tracking-wide text-[#164438] hover:underline no-underline"
              >
                BROWSE PAST ISSUES →
              </Link>
            </div>
          </>
        ) : (
          <EmptyState />
        )}
      </div>
      <Footer />
    </main>
  );
}

function EmptyState() {
  return (
    <div className="max-w-[640px] mx-auto text-center px-6 py-20">
      <h1 className="font-heading text-3xl sm:text-4xl text-forest font-bold mb-4">
        The GenAI Brief
      </h1>
      <p className="font-body text-base text-dark/80">
        The first issue is on its way. Check back soon for a weekly briefing on
        what actually happened in AI, and what it means for builders.
      </p>
    </div>
  );
}
