import Link from 'next/link';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import { getAllBriefs } from '../../../lib/briefs';
import { briefTeaser } from '../../../lib/brief-template';

export const metadata = {
  title: 'The GenAI Brief · Archive | GenAIEducate',
  description: 'Every past issue of The GenAI Brief, our weekly AI briefing for builders.',
};

export default function ArchivePage() {
  const briefs = getAllBriefs();

  return (
    <main className="bg-white min-h-screen flex flex-col">
      <Nav />

      <section className="bg-forest border-b-[3px] border-[#B8860B] px-5 py-16 sm:px-14 sm:py-20">
        <div className="max-w-[820px] mx-auto">
          <div className="font-mono text-xs tracking-[3px] uppercase text-[#F5EAD0] font-semibold mb-5">
            The GenAI Brief
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl text-cream font-bold leading-tight m-0">
            Every issue, in one place
          </h1>
          <p className="font-body text-base sm:text-lg text-cream/80 mt-5 max-w-[560px]">
            A weekly briefing on what actually happened in AI and what it means
            for engineers and teams building real systems. No hype, no reprints.
          </p>
        </div>
      </section>

      <section className="flex-1 px-5 py-14 sm:px-14 sm:py-20">
        <div className="max-w-[820px] mx-auto">
          {briefs.length === 0 ? (
            <p className="font-body text-base text-dark/70 text-center py-10">
              The first issue is on its way. Check back soon.
            </p>
          ) : (
            <ul className="flex flex-col gap-4 list-none p-0 m-0">
              {briefs.map((brief) => (
                <li key={brief.date}>
                  <Link
                    href={`/this-week-in-ai/${brief.date}`}
                    className="group block bg-white border border-[#E4DED3] border-l-[4px] border-l-forest rounded-[4px] p-5 sm:p-6 no-underline hover:shadow-sm transition-shadow"
                  >
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-[#6B6B6B] mb-2.5">
                      <span className="font-semibold text-forest">
                        Issue {String(brief.issueNumber).padStart(2, '0')}
                      </span>
                      <span className="w-1.5 h-1.5 bg-terracotta inline-block" aria-hidden />
                      <span>{brief.dateRange}</span>
                    </div>
                    <h2 className="font-heading text-lg sm:text-xl text-dark font-bold leading-snug m-0 group-hover:text-forest transition-colors">
                      {briefTeaser(brief)}
                    </h2>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
