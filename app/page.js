import HeroAnimation from './components/HeroAnimation';

export default function Home() {
  const curriculum = [
    { month: "01", title: "Foundations", weeks: "Week 1–4", focus: "Python, LLM internals, prompt engineering", project: "Smart CLI Chatbot" },
    { month: "02", title: "LangChain + RAG", weeks: "Week 5–9", focus: "Embeddings, vector search, retrieval pipelines", project: "Document Q&A App" },
    { month: "03", title: "Agents + Orchestration", weeks: "Week 10–13", focus: "LangGraph, multi-agent systems, MCP", project: "AI Research Agent" },
    { month: "04", title: "Production + Career", weeks: "Week 14–16", focus: "FastAPI, Docker, cloud deployment, security", project: "Capstone Deployment" },
  ];

  const services = [
    {
      index: "01",
      label: "For engineering teams",
      title: "Corporate AI Training",
      body: "Customized training programs for engineering teams adopting AI. We work with your team's existing stack and build training around your actual use cases, not generic material pulled off a shelf.",
      tag: "Structured upskilling, not YouTube tutorials",
    },
    {
      index: "02",
      label: "Our flagship cohort",
      title: "Applied GenAI Engineering Program",
      body: "A structured four-month cohort: sixteen weekends, four deployed projects, and interview preparation built into every module. Runs in regular cycles, with the next cohort starting soon.",
      tag: "16 weekends · 4 deployed projects",
      href: "#curriculum",
      cta: "See the curriculum",
    },
    {
      index: "03",
      label: "For decision-makers",
      title: "AI Workshops",
      body: "Shorter-format sessions for product managers, business leaders, and other decision-makers. Understanding AI well enough to make informed decisions, without writing code.",
      tag: "No code required",
    },
  ];

  const differentiators = [
    {
      n: "01",
      title: "Practitioner-built curriculum",
      body: "Built from real engineering practice, not theory lifted from a textbook.",
    },
    {
      n: "02",
      title: "Tested against real students",
      body: "Every session is rebuilt where it did not land in the room.",
    },
    {
      n: "03",
      title: "Projects you can defend",
      body: "Not notebooks you run once. Systems you deploy and can explain in an interview.",
    },
  ];

  return (
    <main className="bg-white min-h-screen">
      <HeroAnimation />

      <nav className="sticky top-0 z-50 flex justify-between items-center px-5 py-5 sm:px-14 sm:py-6 bg-forest">
        <div className="font-heading text-xl font-bold text-cream tracking-[0.3px]">
          GenAI<span className="text-terracotta">Educate</span>
        </div>
        <div className="flex items-center gap-5 sm:gap-9">
          <div className="hidden sm:flex gap-9 font-body text-[15px] text-cream/85">
            <a href="#services" className="no-underline text-inherit hover:text-cream transition-colors">Services</a>
            <a href="#curriculum" className="no-underline text-inherit hover:text-cream transition-colors">Curriculum</a>
            <a href="#why" className="no-underline text-inherit hover:text-cream transition-colors">Why us</a>
          </div>
          <a
            href="#contact"
            className="font-body text-xs sm:text-sm font-semibold text-cream bg-terracotta px-4 py-2 sm:px-5 sm:py-2.5 rounded-sm no-underline whitespace-nowrap"
          >
            Start a conversation
          </a>
        </div>
      </nav>

      {/* Problem statement + positioning */}
      <section className="px-5 pt-16 pb-14 sm:px-14 sm:pt-24 sm:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 lg:gap-16 items-start">
          <div className="max-w-[720px]">
            <div className="font-mono text-xs tracking-[2px] uppercase text-terracotta font-semibold mb-6 sm:mb-7">
              The AI skills gap
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-[64px] leading-[1.05] tracking-tight text-forest font-bold m-0">
              AI is reshaping every engineering role. Most professionals are not ready for it.
            </h1>
            <p className="font-body text-base sm:text-lg leading-7 sm:leading-[1.7] text-dark mt-6 sm:mt-7 max-w-[560px]">
              We train engineers and engineering teams to build, deploy, and manage
              AI systems. Structured programs built from real engineering
              practice, not workshops that skim the surface.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-9 sm:mt-11">
              <a
                href="#services"
                className="w-full sm:w-auto text-center font-body text-sm font-semibold text-cream bg-terracotta px-7 py-3.5 rounded-sm no-underline"
              >
                See our programs
              </a>
              <a
                href="#contact"
                className="w-full sm:w-auto text-center font-body text-sm font-semibold text-forest border-[1.5px] border-forest px-7 py-3.5 rounded-sm no-underline"
              >
                Start a conversation
              </a>
            </div>
          </div>

          <div className="border-[1.5px] border-forest rounded p-7 bg-cream w-full">
            <div className="font-mono text-xs tracking-[2px] uppercase text-forest font-semibold mb-6 pb-5 border-b border-forest/20">
              The program at a glance
            </div>
            <div className="flex flex-col gap-5">
              {[
                { n: "16", label: "Weekends of live, applied instruction" },
                { n: "04", label: "Projects deployed, not just prototyped" },
                { n: "100%", label: "Practitioner-led, zero filler" },
              ].map((s) => (
                <div key={s.label} className="flex items-baseline gap-4">
                  <div className="font-mono text-2xl text-terracotta font-bold w-16 shrink-0">
                    {s.n}
                  </div>
                  <div className="font-body text-sm text-dark leading-snug">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services overview */}
      <section id="services" className="px-5 py-10 sm:px-14 sm:pb-24 border-t-2 border-forest">
        <div className="max-w-[1100px] mx-auto pt-14 sm:pt-20">
          <div className="flex items-center gap-4 mb-10 sm:mb-14">
            <span className="font-mono text-xs tracking-[2px] uppercase text-terracotta font-semibold whitespace-nowrap">
              What we offer
            </span>
            <span className="flex-1 h-px bg-[#E2DCCE]" />
          </div>
          <h2 className="font-heading text-3xl sm:text-[34px] text-forest font-bold mb-10 sm:mb-14 max-w-[560px] leading-tight">
            A training firm, not a single course.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((s) => (
              <div
                key={s.index}
                className="flex flex-col border border-[#E2DCCE] rounded p-7 bg-white transition-all hover:border-forest hover:shadow-[0_4px_20px_rgba(30,92,74,0.1)] hover:-translate-y-0.5"
              >
                <div className="font-mono text-sm text-terracotta font-bold mb-5">
                  {s.index}
                </div>
                <div className="font-mono text-xs tracking-[1.5px] uppercase text-[#999] font-semibold mb-2">
                  {s.label}
                </div>
                <h3 className="font-heading text-xl text-forest font-bold mb-3">
                  {s.title}
                </h3>
                <p className="font-body text-[15px] leading-relaxed text-dark mb-5 flex-1">
                  {s.body}
                </p>
                <div className="font-mono text-xs text-forest font-semibold border-t border-[#E2DCCE] pt-4">
                  {s.tag}
                </div>
                {s.href && (
                  <a
                    href={s.href}
                    className="mt-4 font-body text-sm font-semibold text-terracotta no-underline"
                  >
                    {s.cta} &rarr;
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum spine */}
      <section id="curriculum" className="px-5 py-10 sm:px-14 sm:pb-24 border-t-2 border-forest">
        <div className="max-w-[1040px] mx-auto pt-14 sm:pt-20">
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-xs tracking-[2px] uppercase text-terracotta font-semibold whitespace-nowrap">
              Applied GenAI Engineering Program
            </span>
            <span className="flex-1 h-px bg-[#E2DCCE]" />
          </div>
          <h2 className="font-heading text-3xl sm:text-[34px] text-forest font-bold mb-2 leading-tight">
            Sixteen weeks, in order
          </h2>
          <p className="font-body text-base text-[#666] mb-10 sm:mb-12 max-w-[560px]">
            Every month ends with a real, deployed project. Nothing is taught
            in isolation.
          </p>

          <div className="border-t border-[#E2DCCE]">
            {curriculum.map((w, i) => (
              <div
                key={i}
                className="flex flex-col gap-3 py-6 px-4 -mx-4 border-b border-[#E2DCCE] transition-colors hover:bg-cream md:grid md:grid-cols-[60px_1fr_1fr_1fr] md:items-center md:gap-6 md:py-7"
              >
                <div className="font-mono text-sm text-cream font-bold bg-forest rounded-sm w-11 h-11 flex items-center justify-center">
                  {w.month}
                </div>
                <div>
                  <div className="font-heading text-xl text-forest font-bold">
                    {w.title}
                  </div>
                  <div className="font-mono text-xs text-[#999] mt-1 inline-block border border-[#E2DCCE] rounded-sm px-2 py-0.5">
                    {w.weeks}
                  </div>
                </div>
                <div>
                  <span className="md:hidden font-mono text-xs uppercase tracking-wide text-[#999] block mb-1">
                    Focus
                  </span>
                  <span className="font-body text-[15px] text-dark leading-relaxed">
                    {w.focus}
                  </span>
                </div>
                <div>
                  <span className="md:hidden font-mono text-xs uppercase tracking-wide text-[#999] block mb-1">
                    Project
                  </span>
                  <span className="font-body text-sm text-forest font-semibold">
                    {w.project}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why GenAIEducate */}
      <section id="why" className="bg-forest px-5 py-16 sm:px-14 sm:py-[90px] border-t-2 border-forest">
        <div className="max-w-[1040px] mx-auto">
          <div className="flex items-center gap-4 mb-10 sm:mb-14">
            <span className="font-mono text-xs tracking-[2px] uppercase text-terracotta font-semibold whitespace-nowrap">
              Why GenAIEducate
            </span>
            <span className="flex-1 h-px bg-cream/20" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {differentiators.map((d) => (
              <div key={d.n} className="border-l-[3px] border-terracotta pl-5">
                <div className="font-mono text-sm text-terracotta font-bold mb-3">
                  {d.n}
                </div>
                <h3 className="font-heading text-lg text-cream font-bold mb-2">
                  {d.title}
                </h3>
                <p className="font-body text-[15px] text-cream/80 leading-relaxed">
                  {d.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="px-5 py-16 sm:py-[90px] text-center border-t-2 border-forest">
        <h2 className="font-heading text-3xl sm:text-[34px] text-forest font-bold mb-4 leading-tight">
          Start a conversation
        </h2>
        <p className="font-body text-base text-[#666] mb-9 max-w-[520px] mx-auto">
          Whether you&apos;re exploring for yourself or evaluating for your
          team, we&apos;re happy to talk.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center sm:items-stretch max-w-xs sm:max-w-none mx-auto">
          <a
            href="mailto:hello@genaieducate.com"
            className="w-full sm:w-auto text-center font-body text-sm font-semibold text-forest border-[1.5px] border-forest px-7 py-3.5 rounded-sm no-underline"
          >
            Email us
          </a>
          <a
            href="https://wa.me/919326392963?text=Hi%20Saurav%2C%20I%20just%20visited%20the%20GenAIEducate%20website.%20Could%20you%20tell%20me%20more%20about%20the%20next%20cohort%3F"
            className="w-full sm:w-auto text-center font-body text-sm font-semibold text-cream bg-terracotta px-7 py-3.5 rounded-sm no-underline"
          >
            WhatsApp
          </a>
        </div>
      </section>

      <footer className="border-t-2 border-forest px-5 py-8 sm:px-14 font-body text-xs text-[#999] text-center">
        GenAIEducate &middot; Institute for Generative AI
      </footer>
    </main>
  );
}
