'use client';

import { useState, useRef, useEffect } from 'react';

function IconBriefcase({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <rect x="3" y="7" width="18" height="13" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M3 12.5h18" />
    </svg>
  );
}

function IconGraduationCap({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <path d="M2 9l10-5 10 5-10 5-10-5z" />
      <path d="M6 11.5v4.5c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5" />
      <path d="M22 9v6" />
    </svg>
  );
}

function IconShieldCheck({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function IconPresentation({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <rect x="3" y="4" width="18" height="12" />
      <path d="M8 20l4-4 4 4" />
      <path d="M12 16v4" />
    </svg>
  );
}

export default function ProgramTiles() {
  const [active, setActive] = useState('corporate');
  const detailRef = useRef(null);
  const skipNextScroll = useRef(true);

  useEffect(() => {
    if (skipNextScroll.current) {
      skipNextScroll.current = false;
      return;
    }
    if (active && detailRef.current) {
      detailRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [active]);

  const tiles = [
    {
      id: "corporate",
      icon: IconBriefcase,
      tint: "forest",
      eyebrow: "For engineering teams",
      title: "Corporate AI Training",
      desc: "Customized training built around your team's existing stack and real use cases.",
    },
    {
      id: "cohort",
      icon: IconGraduationCap,
      tint: "terracotta",
      eyebrow: "Our flagship cohort",
      title: "Applied GenAI Engineering Program",
      desc: "Four months. Sixteen weekends. Four deployed projects.",
    },
    {
      id: "qa",
      icon: IconShieldCheck,
      tint: "forest",
      eyebrow: "Coming soon",
      title: "AI for QA",
      desc: "A dedicated program for the QA fraternity, led by our newest instructor.",
      disabled: true,
    },
    {
      id: "workshops",
      icon: IconPresentation,
      tint: "forest",
      eyebrow: "For decision-makers",
      title: "AI Workshops",
      desc: "Shorter sessions to help non-technical leaders make informed AI decisions.",
    },
  ];

  const facts = [
    { n: "4", label: "Months" },
    { n: "16", label: "Weekends" },
    { n: "04", label: "Deployed projects" },
    { n: "1", label: "Live cohort, not a recording" },
  ];

  const curriculum = [
    { month: "01", title: "Foundations", weeks: "Week 1-4", focus: "Python, LLM internals, prompt engineering", project: "Smart CLI Chatbot", detail: "Where the LLM ecosystem actually sits, how tokens and context windows work, and how to write prompts that hold up outside a demo." },
    { month: "02", title: "LangChain + RAG", weeks: "Week 5-9", focus: "Embeddings, vector search, retrieval pipelines", project: "Document Q&A App", detail: "Building retrieval pipelines that don't fall apart on real documents: chunking strategy, embedding choice, and evaluation." },
    { month: "03", title: "Agents + Orchestration", weeks: "Week 10-13", focus: "LangGraph, multi-agent systems, MCP", project: "AI Research Agent", detail: "Multi-agent orchestration, tool use, and the MCP protocol, applied to a research agent that plans and executes on its own." },
    { month: "04", title: "Production + Career", weeks: "Week 14-16", focus: "FastAPI, Docker, cloud deployment, security", project: "Capstone Deployment", detail: "Shipping what you built: APIs, containers, cloud deployment, security basics, and the capstone you'll defend in interviews." },
  ];

  const cohortAudience = [
    "Software engineers with 3-10 years of experience who feel the AI knowledge gap in interviews and at work",
    "Engineers who want structured, applied learning instead of scattered tutorials and half-finished side projects",
    "Anyone who wants to walk into an interview or a team meeting and speak about AI systems with confidence",
  ];

  const cohortFormat = [
    { title: "Weekend live sessions", body: "Sixteen weekends, delivered live. Not a video library." },
    { title: "One project per month", body: "Each month ends with a project you deploy and keep." },
    { title: "Direct instructor feedback", body: "Small cohort size. Your code gets reviewed, not just graded." },
    { title: "Interview preparation built in", body: "Every session ends with interview Q&A tied to that week's material." },
  ];

  const corporateSteps = [
    { n: "01", title: "We learn your stack", body: "We start by understanding your team's existing tools, codebase, and the AI use cases you're actually considering." },
    { n: "02", title: "We build a custom curriculum", body: "Sessions are built around your team's real problems, not a generic slide deck reused across clients." },
    { n: "03", title: "We deliver live", body: "On-site or remote, scheduled around your team's calendar. Not a pre-recorded course license." },
    { n: "04", title: "Your team ships something real", body: "Training ends with a deployed use case tied to your business, not a certificate of completion." },
  ];

  const corporateAudience = [
    "Engineering leaders rolling out AI adoption across their org",
    "Teams that need structured upskilling, not scattered YouTube tutorials",
    "Companies standardizing on AI tooling who want their engineers trained on it specifically",
    "L&D and engineering managers evaluating training partners for their team",
  ];

  const workshopTopics = [
    "What AI can and can't do today, without the hype",
    "How to evaluate build-vs-buy decisions for AI tooling",
    "Cost, risk, and vendor tradeoffs your team will actually face",
    "A shared vocabulary so technical and non-technical stakeholders can plan together",
  ];

  const workshopAudience = [
    "Product managers scoping AI features",
    "Business leaders sponsoring AI initiatives",
    "Non-technical stakeholders who sit in AI planning meetings",
    "Teams evaluating whether to build in-house or buy",
  ];

  function handleClick(tile) {
    if (tile.disabled) return;
    setActive(active === tile.id ? null : tile.id);
  }

  return (
    <>
      {/* Tile grid */}
      <section id="programs" className="bg-lightgray px-5 py-12 sm:px-14 sm:py-20 lg:py-24">
        <div className="max-w-[1100px] mx-auto">
          <div className="flex items-center gap-4 mb-10 sm:mb-14">
            <span className="font-mono text-xs tracking-[2px] uppercase text-terracotta font-semibold whitespace-nowrap">
              Choose a program
            </span>
            <span className="flex-1 h-px bg-[#DCDCDC]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tiles.map((t) => {
              const isActive = active === t.id;
              const Icon = t.icon;
              const tintColor = t.tint === "terracotta" ? "terracotta" : "forest";

              const chipClass = t.disabled
                ? "bg-[#E0E0E0] text-[#999]"
                : isActive
                ? tintColor === "terracotta"
                  ? "bg-terracotta text-cream"
                  : "bg-forest text-cream"
                : tintColor === "terracotta"
                ? "bg-terracotta/10 text-terracotta"
                : "bg-forest/10 text-forest";

              const cardClass = t.disabled
                ? "opacity-60 cursor-not-allowed bg-lightgray border-[#E0E0E0]"
                : isActive
                ? `bg-white shadow-lg -translate-y-0.5 ${tintColor === "terracotta" ? "border-terracotta" : "border-forest"}`
                : `bg-white border-[#E0E0E0] shadow-sm hover:shadow-lg hover:-translate-y-0.5 ${tintColor === "terracotta" ? "hover:border-terracotta/60" : "hover:border-forest/60"} cursor-pointer`;

              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => handleClick(t)}
                  aria-expanded={isActive}
                  disabled={t.disabled}
                  className={`text-left w-full flex flex-col rounded p-7 border-2 transition-all duration-200 ${cardClass}`}
                >
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <span className={`inline-flex items-center justify-center w-11 h-11 rounded-sm transition-colors ${chipClass}`}>
                      <Icon className="w-5 h-5" />
                    </span>
                    {!t.disabled && (
                      <span
                        className={`font-mono text-lg transition-transform ${isActive ? "rotate-45" : ""} ${tintColor === "terracotta" ? "text-terracotta" : "text-forest"}`}
                        aria-hidden="true"
                      >
                        +
                      </span>
                    )}
                    {t.disabled && (
                      <span className="font-mono text-[10px] tracking-wide uppercase text-[#999] bg-white border border-[#DCDCDC] rounded-full px-2.5 py-1">
                        Coming soon
                      </span>
                    )}
                  </div>
                  <div className="font-mono text-xs tracking-[1.5px] uppercase font-semibold mb-2 text-[#999]">
                    {t.eyebrow}
                  </div>
                  <h3 className="font-heading text-xl font-bold mb-3 text-forest">
                    {t.title}
                  </h3>
                  <p className="font-body text-[15px] leading-relaxed m-0 text-dark">
                    {t.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detail panel */}
      <div ref={detailRef} className="scroll-mt-24">
      {active === "corporate" && (
        <section className="bg-white px-5 py-12 sm:px-14 sm:py-20 lg:py-24">
          <div className="max-w-[1040px] mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <span className="font-mono text-xs tracking-[2px] uppercase text-terracotta font-semibold whitespace-nowrap">
                For engineering teams
              </span>
              <span className="flex-1 h-px bg-[#E2DCCE]" />
            </div>
            <h2 className="font-heading text-3xl sm:text-[34px] text-forest font-bold mb-4 leading-tight">
              Corporate AI Training
            </h2>
            <p className="font-body text-base sm:text-lg text-dark leading-relaxed max-w-[720px] mb-10 sm:mb-14">
              Customized training programs for engineering teams adopting AI.
              Companies adopting AI need structured upskilling, not YouTube
              tutorials. We work with your team's existing stack and build
              training around your actual use cases.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
              <div>
                <h3 className="font-heading text-lg text-forest font-bold mb-5">
                  How it works
                </h3>
                <div className="flex flex-col gap-5">
                  {corporateSteps.map((s) => (
                    <div key={s.n} className="flex gap-4 items-start">
                      <span className="font-mono text-sm text-terracotta font-bold shrink-0 pt-0.5">
                        {s.n}
                      </span>
                      <div>
                        <div className="font-body text-[15px] font-semibold text-dark mb-1">
                          {s.title}
                        </div>
                        <p className="font-body text-[15px] text-[#666] leading-relaxed m-0">
                          {s.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-heading text-lg text-forest font-bold mb-5">
                  Who this is for
                </h3>
                <div className="flex flex-col gap-4">
                  {corporateAudience.map((a) => (
                    <div key={a} className="flex gap-4 items-start bg-lightgray border border-[#E0E0E0] border-l-4 border-l-terracotta rounded p-5">
                      <span className="text-forest font-bold shrink-0">&#10003;</span>
                      <p className="font-body text-[15px] text-dark leading-relaxed m-0">
                        {a}
                      </p>
                    </div>
                  ))}
                </div>
                <a
                  href="https://wa.me/919326392693?text=Hi%20Saurav%2C%20I%27d%20like%20to%20talk%20about%20AI%20training%20for%20our%20engineering%20team."
                  className="inline-block mt-7 text-center font-body text-sm font-semibold text-cream bg-terracotta px-7 py-3.5 rounded-sm no-underline"
                >
                  Talk to us about your team
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {active === "cohort" && (
        <section className="bg-white px-5 py-12 sm:px-14 sm:py-20 lg:py-24">
          <div className="max-w-[1100px] mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <span className="font-mono text-xs tracking-[2px] uppercase text-terracotta font-semibold whitespace-nowrap">
                Our flagship cohort
              </span>
              <span className="flex-1 h-px bg-[#E2DCCE]" />
            </div>
            <h2 className="font-heading text-3xl sm:text-[34px] text-forest font-bold mb-2 leading-tight">
              The Applied GenAI Engineering Program
            </h2>
            <p className="font-body text-base text-[#666] mb-10 sm:mb-12 max-w-[600px]">
              Four months. Sixteen weekends. Four deployed projects. Built for
              engineers who want to build, not just watch.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-14 sm:mb-16">
              {facts.map((f) => (
                <div key={f.label} className="bg-lightgray border border-[#E0E0E0] rounded p-6">
                  <div className="font-mono text-3xl sm:text-4xl text-forest font-bold mb-2">
                    {f.n}
                  </div>
                  <div className="font-body text-sm text-dark leading-snug">
                    {f.label}
                  </div>
                </div>
              ))}
            </div>

            <h3 className="font-heading text-2xl text-forest font-bold mb-8 leading-tight">
              Sixteen weeks, in order.
            </h3>
            <div className="border-t border-[#E2DCCE] mb-14 sm:mb-16">
              {curriculum.map((w) => (
                <div key={w.month} className="py-8 border-b border-[#E2DCCE]">
                  <div className="flex flex-col md:grid md:grid-cols-[80px_1fr_1fr] md:gap-6">
                    <div className="font-mono text-3xl text-forest font-bold mb-3 md:mb-0">
                      {w.month}
                    </div>
                    <div className="mb-4 md:mb-0">
                      <div className="font-heading text-xl text-forest font-bold mb-2">
                        {w.title}
                      </div>
                      <div className="font-mono text-xs text-cream bg-forest inline-block rounded-full px-3 py-1 mb-2">
                        {w.weeks}
                      </div>
                      <div className="font-body text-sm text-forest font-semibold">
                        &#127942; {w.project}
                      </div>
                    </div>
                    <div>
                      <span className="font-mono text-xs uppercase tracking-wide text-[#999] block mb-1">
                        Focus
                      </span>
                      <span className="font-body text-[15px] text-dark leading-relaxed">
                        {w.focus}
                      </span>
                    </div>
                  </div>
                  <p className="font-body text-[15px] text-[#666] leading-relaxed mt-4 md:pl-[104px]">
                    {w.detail}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
              <div>
                <h3 className="font-heading text-lg text-forest font-bold mb-5">
                  Who this is for
                </h3>
                <div className="flex flex-col gap-4">
                  {cohortAudience.map((a) => (
                    <div key={a} className="flex gap-4 items-start bg-lightgray border border-[#E0E0E0] border-l-4 border-l-terracotta rounded p-5">
                      <span className="text-forest font-bold shrink-0">&#10003;</span>
                      <p className="font-body text-[15px] text-dark leading-relaxed m-0">
                        {a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-heading text-lg text-forest font-bold mb-5">
                  How it works
                </h3>
                <div className="flex flex-col gap-4">
                  {cohortFormat.map((f) => (
                    <div key={f.title} className="flex gap-4 items-start bg-lightgray border border-[#E0E0E0] border-l-4 border-l-forest rounded p-5">
                      <div className="shrink-0 w-8 h-8 flex items-center justify-center border border-forest rounded-sm text-forest font-bold text-sm">
                        &#9670;
                      </div>
                      <div>
                        <div className="font-body text-[15px] font-semibold text-dark mb-1">
                          {f.title}
                        </div>
                        <p className="font-body text-[15px] text-[#666] leading-relaxed m-0">
                          {f.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/919326392693?text=Hi%20Saurav%2C%20I%27d%20like%20to%20know%20more%20about%20the%20next%20cohort%20of%20the%20Applied%20GenAI%20Engineering%20Program."
              className="inline-block mt-10 sm:mt-12 text-center font-body text-sm font-semibold text-cream bg-terracotta px-7 py-3.5 rounded-sm no-underline"
            >
              Apply for next cohort
            </a>
          </div>
        </section>
      )}

      {active === "workshops" && (
        <section className="bg-white px-5 py-12 sm:px-14 sm:py-20 lg:py-24">
          <div className="max-w-[1040px] mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <span className="font-mono text-xs tracking-[2px] uppercase text-terracotta font-semibold whitespace-nowrap">
                For decision-makers
              </span>
              <span className="flex-1 h-px bg-[#E2DCCE]" />
            </div>
            <h2 className="font-heading text-3xl sm:text-[34px] text-forest font-bold mb-4 leading-tight">
              AI Workshops
            </h2>
            <p className="font-body text-base sm:text-lg text-dark leading-relaxed max-w-[720px] mb-10 sm:mb-14">
              Shorter-format sessions for product managers, business leaders,
              and other decision-makers. Understanding AI well enough to make
              informed decisions, without writing code. Delivered on-site or
              remote, in a half-day or full-day format.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
              <div>
                <h3 className="font-heading text-lg text-forest font-bold mb-5">
                  What we cover
                </h3>
                <div className="flex flex-col gap-4">
                  {workshopTopics.map((t) => (
                    <div key={t} className="flex gap-4 items-start">
                      <span className="text-terracotta font-bold shrink-0">&#9670;</span>
                      <p className="font-body text-[15px] text-dark leading-relaxed m-0">
                        {t}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-heading text-lg text-forest font-bold mb-5">
                  Who this is for
                </h3>
                <div className="flex flex-col gap-4">
                  {workshopAudience.map((a) => (
                    <div key={a} className="flex gap-4 items-start bg-lightgray border border-[#E0E0E0] border-l-4 border-l-forest rounded p-5">
                      <span className="text-forest font-bold shrink-0">&#10003;</span>
                      <p className="font-body text-[15px] text-dark leading-relaxed m-0">
                        {a}
                      </p>
                    </div>
                  ))}
                </div>
                <a
                  href="https://wa.me/919326392693?text=Hi%20Saurav%2C%20I%27d%20like%20to%20ask%20about%20AI%20workshops%20for%20our%20team."
                  className="inline-block mt-7 text-center font-body text-sm font-semibold text-cream border-[1.5px] border-forest text-forest px-7 py-3.5 rounded-sm no-underline"
                >
                  Ask about workshops
                </a>
              </div>
            </div>
          </div>
        </section>
      )}
      </div>
    </>
  );
}
