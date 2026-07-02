import Nav from '../components/Nav';
import Footer from '../components/Footer';

export const metadata = {
  title: "Programs | GenAIEducate",
  description: "Corporate AI training for engineering teams, the Applied GenAI Engineering Program cohort, and AI workshops for decision-makers.",
};

export default function Program() {
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

  const dotPattern = "bg-[radial-gradient(circle_at_1px_1px,rgba(255,248,240,0.09)_1px,transparent_0)] bg-[length:28px_28px]";

  return (
    <main className="bg-white min-h-screen">
      <Nav />

      {/* Header */}
      <section className={`relative bg-forest px-5 py-16 sm:px-14 sm:py-20 lg:py-24 overflow-hidden ${dotPattern}`}>
        <div className="relative max-w-[820px]">
          <div className="font-mono text-xs tracking-[2px] uppercase text-terracotta font-semibold mb-6 sm:mb-7">
            What we offer
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-[56px] leading-[1.1] tracking-tight text-cream font-bold m-0">
            Training built for engineers, and the teams they work on.
          </h1>
          <p className="font-body text-base sm:text-lg leading-7 sm:leading-[1.7] text-cream/80 mt-6 sm:mt-7 max-w-[600px]">
            Corporate training for engineering teams, our flagship cohort
            program for individual engineers, and workshops for the
            decision-makers around them.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-9 sm:mt-11">
            <a
              href="https://wa.me/919326392693?text=Hi%20Saurav%2C%20I%27d%20like%20to%20talk%20about%20AI%20training%20for%20our%20engineering%20team."
              className="w-full sm:w-auto text-center font-body text-sm font-semibold text-cream bg-terracotta px-7 py-3.5 rounded-sm no-underline"
            >
              Talk to us about your team
            </a>
            <a
              href="#cohort"
              className="w-full sm:w-auto text-center font-body text-sm font-semibold text-cream border-[1.5px] border-cream/60 px-7 py-3.5 rounded-sm no-underline"
            >
              See the flagship cohort
            </a>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-9 sm:mt-11 font-mono text-xs uppercase tracking-wide text-cream/60">
            <a href="#corporate" className="text-inherit hover:text-cream transition-colors">&darr; Corporate training</a>
            <a href="#cohort" className="text-inherit hover:text-cream transition-colors">&darr; Applied GenAI program</a>
            <a href="#workshops" className="text-inherit hover:text-cream transition-colors">&darr; Workshops</a>
          </div>
        </div>
      </section>

      {/* Corporate AI Training */}
      <section id="corporate" className="bg-white px-5 py-12 sm:px-14 sm:py-20 lg:py-24">
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

      {/* Program at a glance */}
      <section id="cohort" className="bg-lightgray px-5 py-12 sm:px-14 sm:py-20 lg:py-24">
        <div className="max-w-[1100px] mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-xs tracking-[2px] uppercase text-terracotta font-semibold whitespace-nowrap">
              Our flagship cohort
            </span>
            <span className="flex-1 h-px bg-[#DCDCDC]" />
          </div>
          <h2 className="font-heading text-3xl sm:text-[34px] text-forest font-bold mb-2 leading-tight">
            The Applied GenAI Engineering Program
          </h2>
          <p className="font-body text-base text-[#666] mb-10 sm:mb-12 max-w-[600px]">
            Four months. Sixteen weekends. Four deployed projects. Built for
            engineers who want to build, not just watch.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {facts.map((f) => (
              <div key={f.label} className="bg-white border border-[#E0E0E0] rounded p-6">
                <div className="font-mono text-3xl sm:text-4xl text-forest font-bold mb-2">
                  {f.n}
                </div>
                <div className="font-body text-sm text-dark leading-snug">
                  {f.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full curriculum breakdown */}
      <section className="bg-white px-5 py-12 sm:px-14 sm:py-20 lg:py-24">
        <div className="max-w-[1040px] mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-xs tracking-[2px] uppercase text-terracotta font-semibold whitespace-nowrap">
              Curriculum
            </span>
            <span className="flex-1 h-px bg-[#E2DCCE]" />
          </div>
          <h2 className="font-heading text-3xl sm:text-[34px] text-forest font-bold mb-10 sm:mb-14 leading-tight">
            Sixteen weeks, in order.
          </h2>

          <div className="border-t border-[#E2DCCE]">
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
        </div>
      </section>

      {/* Who this is for + how it works */}
      <section className="bg-lightgray px-5 py-12 sm:px-14 sm:py-20 lg:py-24">
        <div className="max-w-[1040px] mx-auto">
          <div className="flex items-center gap-4 mb-10 sm:mb-14">
            <span className="font-mono text-xs tracking-[2px] uppercase text-terracotta font-semibold whitespace-nowrap">
              Who this is for
            </span>
            <span className="flex-1 h-px bg-[#DCDCDC]" />
          </div>
          <div className="grid grid-cols-1 gap-4 mb-14 sm:mb-16">
            {cohortAudience.map((a) => (
              <div key={a} className="flex gap-4 items-start bg-white border border-[#E0E0E0] border-l-4 border-l-terracotta rounded p-6">
                <span className="text-forest font-bold shrink-0">&#10003;</span>
                <p className="font-body text-[15px] text-dark leading-relaxed m-0">
                  {a}
                </p>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4 mb-10 sm:mb-14">
            <span className="font-mono text-xs tracking-[2px] uppercase text-terracotta font-semibold whitespace-nowrap">
              How it works
            </span>
            <span className="flex-1 h-px bg-[#DCDCDC]" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cohortFormat.map((f) => (
              <div key={f.title} className="flex gap-5 bg-white border border-[#E0E0E0] border-l-4 border-l-forest rounded p-6">
                <div className="shrink-0 w-9 h-9 flex items-center justify-center border border-forest rounded-sm text-forest font-bold">
                  &#9670;
                </div>
                <div>
                  <h3 className="font-heading text-lg text-forest font-bold mb-2">
                    {f.title}
                  </h3>
                  <p className="font-body text-[15px] text-dark leading-relaxed">
                    {f.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <a
            href="https://wa.me/919326392693?text=Hi%20Saurav%2C%20I%27d%20like%20to%20know%20more%20about%20the%20next%20cohort%20of%20the%20Applied%20GenAI%20Engineering%20Program."
            className="inline-block mt-10 sm:mt-12 text-center font-body text-sm font-semibold text-cream bg-terracotta px-7 py-3.5 rounded-sm no-underline"
          >
            Apply for next cohort
          </a>
        </div>
      </section>

      {/* AI Workshops */}
      <section id="workshops" className="bg-white px-5 py-12 sm:px-14 sm:py-20 lg:py-24">
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

      {/* CTA */}
      <section className={`relative bg-forest px-5 py-16 sm:py-24 text-center overflow-hidden ${dotPattern}`}>
        <div className="relative">
          <h2 className="font-heading text-3xl sm:text-[34px] text-cream font-bold mb-4 leading-tight">
            Not sure which fits?
          </h2>
          <p className="font-body text-base text-cream/80 mb-9 max-w-[520px] mx-auto">
            Tell us what you or your team need, and we&apos;ll point you to
            the right program.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center sm:items-stretch max-w-xs sm:max-w-none mx-auto">
            <a
              href="https://wa.me/919326392693?text=Hi%20Saurav%2C%20I%27d%20like%20to%20know%20more%20about%20the%20next%20cohort%20of%20the%20Applied%20GenAI%20Engineering%20Program."
              className="w-full sm:w-auto text-center font-body text-sm font-semibold text-cream bg-terracotta px-7 py-3.5 rounded-sm no-underline"
            >
              WhatsApp
            </a>
            <a
              href="mailto:hello@genaieducate.com"
              className="w-full sm:w-auto text-center font-body text-sm font-semibold text-cream border-[1.5px] border-cream/60 px-7 py-3.5 rounded-sm no-underline"
            >
              Email us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
