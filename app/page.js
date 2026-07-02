import HeroAnimation from './components/HeroAnimation';
import Nav from './components/Nav';
import Footer from './components/Footer';

export default function Home() {
  const services = [
    {
      index: "01",
      label: "For engineering teams",
      title: "Corporate AI Training",
      body: "Customized training programs for engineering teams adopting AI. We work with your team's existing stack and build training around your actual use cases.",
      href: "/contact",
      cta: "Talk to us",
    },
    {
      index: "02",
      label: "Our flagship cohort",
      title: "Applied GenAI Engineering Program",
      body: "A structured four-month cohort: sixteen weekends, four deployed projects, interview preparation built in. Runs in regular cycles.",
      href: "/program",
      cta: "See the full program",
    },
    {
      index: "03",
      label: "For decision-makers",
      title: "AI Workshops",
      body: "Shorter-format sessions for product managers, business leaders, and other decision-makers. Understanding AI well enough to decide, without writing code.",
      href: "/contact",
      cta: "Ask about workshops",
    },
  ];

  const curriculum = [
    { month: "01", title: "Foundations", weeks: "Week 1-4", focus: "Python, LLM internals, prompt engineering", project: "Smart CLI Chatbot" },
    { month: "02", title: "LangChain + RAG", weeks: "Week 5-9", focus: "Embeddings, vector search, retrieval pipelines", project: "Document Q&A App" },
    { month: "03", title: "Agents + Orchestration", weeks: "Week 10-13", focus: "LangGraph, multi-agent systems, MCP", project: "AI Research Agent" },
    { month: "04", title: "Production + Career", weeks: "Week 14-16", focus: "FastAPI, Docker, cloud deployment, security", project: "Capstone Deployment" },
  ];

  const stats = [
    { n: "4.85/5", label: "Avg. instructor rating across 14+ subjects" },
    { n: "115+", label: "Professionals trained" },
    { n: "3+ years", label: "Consistent teaching track record" },
    { n: "100%", label: "Would recommend, from current cohort" },
  ];

  const proofPoints = [
    "100% rated the cost as a bargain",
    "100% said way ahead of free online content",
    "Rated 4.5+ across 14 different subjects",
  ];

  const quotes = [
    {
      text: "I was following lot of contents and stuck what is best or what is not so important. The way this class structured is what really guiding me to right path.",
    },
    {
      text: "It's little different from the online tutorials because it takes real time corporate scenarios in classroom.",
    },
  ];

  const differentiators = [
    {
      n: "01",
      title: "Practitioner-built curriculum",
      body: "Not theory from textbooks. Every session built from real engineering practice.",
    },
    {
      n: "02",
      title: "Tested live, rebuilt where it failed",
      body: "Iterated across multiple cohorts. What didn't land got rewritten.",
    },
    {
      n: "03",
      title: "Projects you deploy, not notebooks you run",
      body: "Every project gets a live URL. Every project is interview-defensible.",
    },
    {
      n: "04",
      title: "Interview preparation built in",
      body: "Every session ends with interview Q&A. Not a separate module, part of the fabric.",
    },
  ];

  const dotPattern = "bg-[radial-gradient(circle_at_1px_1px,rgba(255,248,240,0.09)_1px,transparent_0)] bg-[length:28px_28px]";

  return (
    <main className="bg-white min-h-screen">
      <HeroAnimation />

      <Nav />

      {/* Section 2: Problem statement + positioning */}
      <section className={`relative bg-forest px-5 py-12 sm:px-14 sm:py-20 lg:py-24 overflow-hidden ${dotPattern}`}>
        <div className="relative max-w-[820px]">
          <div className="font-mono text-xs tracking-[2px] uppercase text-terracotta font-semibold mb-6 sm:mb-7">
            The AI skills gap
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-[60px] leading-[1.08] tracking-tight text-cream font-bold m-0">
            AI is reshaping every engineering role. Most professionals are not ready for it.
          </h1>
          <p className="font-body text-base sm:text-lg leading-7 sm:leading-[1.7] text-cream/80 mt-6 sm:mt-7 max-w-[600px]">
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
              className="w-full sm:w-auto text-center font-body text-sm font-semibold text-cream border-[1.5px] border-cream/60 px-7 py-3.5 rounded-sm no-underline"
            >
              Start a conversation
            </a>
          </div>
        </div>
      </section>

      {/* Section 3: Services overview */}
      <section id="services" className="bg-lightgray px-5 py-12 sm:px-14 sm:py-20 lg:py-24">
        <div className="max-w-[1100px] mx-auto">
          <div className="flex items-center gap-4 mb-10 sm:mb-14">
            <span className="font-mono text-xs tracking-[2px] uppercase text-terracotta font-semibold whitespace-nowrap">
              What we offer
            </span>
            <span className="flex-1 h-px bg-[#DCDCDC]" />
          </div>
          <h2 className="font-heading text-3xl sm:text-[34px] text-forest font-bold mb-10 sm:mb-14 max-w-[560px] leading-tight">
            How we work with engineers and teams.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((s) => (
              <div
                key={s.index}
                className="flex flex-col bg-white border border-[#E0E0E0] border-l-4 border-l-terracotta rounded p-7 shadow-sm transition-shadow hover:shadow-md"
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
                <a
                  href={s.href}
                  className="font-body text-sm font-semibold text-terracotta no-underline pt-4 border-t border-[#E0E0E0]"
                >
                  {s.cta} &rarr;
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Curriculum spine */}
      <section id="curriculum" className="bg-white px-5 py-12 sm:px-14 sm:py-20 lg:py-24">
        <div className="max-w-[1040px] mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-xs tracking-[2px] uppercase text-terracotta font-semibold whitespace-nowrap">
              The flagship cohort
            </span>
            <span className="flex-1 h-px bg-[#E2DCCE]" />
          </div>
          <h2 className="font-heading text-3xl sm:text-[34px] text-forest font-bold mb-2 leading-tight">
            The Applied GenAI Engineering Program
          </h2>
          <p className="font-body text-base text-[#666] mb-10 sm:mb-12 max-w-[560px]">
            16 weekends. 4 deployed projects. Zero to production.
          </p>

          <div className="border-t border-[#E2DCCE]">
            {curriculum.map((w, i) => (
              <div
                key={i}
                className="flex flex-col gap-4 py-7 px-4 -mx-4 border-b border-[#E2DCCE] transition-colors hover:bg-lightgray md:grid md:grid-cols-[80px_1fr_1fr_1fr] md:items-center md:gap-6"
              >
                <div className="font-mono text-3xl text-forest font-bold">
                  {w.month}
                </div>
                <div>
                  <div className="font-heading text-xl text-forest font-bold mb-2">
                    {w.title}
                  </div>
                  <div className="font-mono text-xs text-cream bg-forest inline-block rounded-full px-3 py-1">
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
                    &#127942; {w.project}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Track Record (social proof) */}
      <section className="bg-lightgray px-5 py-12 sm:px-14 sm:py-20 lg:py-24">
        <div className="max-w-[1100px] mx-auto">
          <div className="flex items-center gap-4 mb-10 sm:mb-14">
            <span className="font-mono text-xs tracking-[2px] uppercase text-terracotta font-semibold whitespace-nowrap">
              Track record
            </span>
            <span className="flex-1 h-px bg-[#DCDCDC]" />
          </div>
          <h2 className="font-heading text-3xl sm:text-[34px] text-forest font-bold mb-12 sm:mb-16 max-w-[560px] leading-tight">
            Built on evidence, not claims.
          </h2>

          {/* Part A: Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-10 sm:mb-12">
            {stats.map((s) => (
              <div key={s.label} className="bg-white border border-[#E0E0E0] rounded p-6">
                <div className="font-mono text-3xl sm:text-4xl text-terracotta font-bold mb-2">
                  {s.n}
                </div>
                <div className="font-body text-sm text-dark leading-snug">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Part B: Proof point badges */}
          <div className="flex flex-wrap gap-x-3 gap-y-2 mb-12 sm:mb-16 font-body text-sm text-forest font-semibold">
            {proofPoints.map((p, i) => (
              <span key={p} className="flex items-center gap-3">
                <span>{p}</span>
                {i < proofPoints.length - 1 && <span className="text-terracotta">&#9670;</span>}
              </span>
            ))}
          </div>

          {/* Part C: Student quotes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 sm:mb-12">
            {quotes.map((q) => (
              <div key={q.text} className="bg-white border border-[#E0E0E0] rounded p-7 shadow-sm">
                <div className="font-heading text-4xl text-terracotta leading-none mb-3">&#8220;</div>
                <p className="font-body text-[15px] leading-relaxed text-dark mb-5">
                  {q.text}
                </p>
                <div className="font-mono text-xs uppercase tracking-wide text-[#999]">
                  &mdash; Program participant
                </div>
              </div>
            ))}
          </div>

          {/* Part D: Context line */}
          <p className="font-body text-sm text-[#666] max-w-[720px] leading-relaxed">
            Previously: 3+ years as Data Science instructor at a leading edtech platform, delivering live programs to working professionals across SQL, Python, Machine Learning, Statistics, and Generative AI.
          </p>
        </div>
      </section>

      {/* Section 6: Why GenAIEducate */}
      <section id="why" className="bg-white px-5 py-12 sm:px-14 sm:py-20 lg:py-24">
        <div className="max-w-[1040px] mx-auto">
          <div className="flex items-center gap-4 mb-10 sm:mb-14">
            <span className="font-mono text-xs tracking-[2px] uppercase text-terracotta font-semibold whitespace-nowrap">
              Why GenAIEducate
            </span>
            <span className="flex-1 h-px bg-[#E2DCCE]" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {differentiators.map((d) => (
              <div key={d.n} className="flex gap-5 bg-white border border-[#E0E0E0] border-l-4 border-l-forest rounded p-6">
                <div className="shrink-0 w-9 h-9 flex items-center justify-center border border-forest rounded-sm text-forest font-bold">
                  &#10003;
                </div>
                <div>
                  <h3 className="font-heading text-lg text-forest font-bold mb-2">
                    {d.title}
                  </h3>
                  <p className="font-body text-[15px] text-dark leading-relaxed">
                    {d.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: Contact */}
      <section id="contact" className={`relative bg-forest px-5 py-16 sm:py-24 text-center overflow-hidden ${dotPattern}`}>
        <div className="relative">
          <h2 className="font-heading text-3xl sm:text-[34px] text-cream font-bold mb-4 leading-tight">
            Start a conversation
          </h2>
          <p className="font-body text-base text-cream/80 mb-9 max-w-[520px] mx-auto">
            Whether you&apos;re exploring for yourself or evaluating for your
            team, we&apos;re happy to talk.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center sm:items-stretch max-w-xs sm:max-w-none mx-auto">
            <a
              href="https://wa.me/919326392693?text=Hi%20Saurav%2C%20I%20just%20visited%20the%20GenAIEducate%20website.%20Could%20you%20tell%20me%20more%20about%20the%20next%20cohort%3F"
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
