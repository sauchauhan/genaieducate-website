import Nav from '../components/Nav';
import Footer from '../components/Footer';

export const metadata = {
  title: "Applied GenAI Engineering Program | GenAIEducate",
  description: "A structured four-month cohort: sixteen weekends, four deployed projects, interview preparation built in.",
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

  const audience = [
    "Software engineers with 3-10 years of experience who feel the AI knowledge gap in interviews and at work",
    "Engineers who want structured, applied learning instead of scattered tutorials and half-finished side projects",
    "Anyone who wants to walk into an interview or a team meeting and speak about AI systems with confidence",
  ];

  const format = [
    { title: "Weekend live sessions", body: "Sixteen weekends, delivered live. Not a video library." },
    { title: "One project per month", body: "Each month ends with a project you deploy and keep." },
    { title: "Direct instructor feedback", body: "Small cohort size. Your code gets reviewed, not just graded." },
    { title: "Interview preparation built in", body: "Every session ends with interview Q&A tied to that week's material." },
  ];

  const dotPattern = "bg-[radial-gradient(circle_at_1px_1px,rgba(255,248,240,0.09)_1px,transparent_0)] bg-[length:28px_28px]";

  return (
    <main className="bg-white min-h-screen">
      <Nav />

      {/* Header */}
      <section className={`relative bg-forest px-5 py-16 sm:px-14 sm:py-20 lg:py-24 overflow-hidden ${dotPattern}`}>
        <div className="relative max-w-[820px]">
          <div className="font-mono text-xs tracking-[2px] uppercase text-terracotta font-semibold mb-6 sm:mb-7">
            Our flagship cohort
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-[56px] leading-[1.1] tracking-tight text-cream font-bold m-0">
            The Applied GenAI Engineering Program
          </h1>
          <p className="font-body text-base sm:text-lg leading-7 sm:leading-[1.7] text-cream/80 mt-6 sm:mt-7 max-w-[600px]">
            Four months. Sixteen weekends. Four deployed projects. Built for
            engineers who want to build, not just watch.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-9 sm:mt-11">
            <a
              href="https://wa.me/919326392693?text=Hi%20Saurav%2C%20I%27d%20like%20to%20know%20more%20about%20the%20next%20cohort%20of%20the%20Applied%20GenAI%20Engineering%20Program."
              className="w-full sm:w-auto text-center font-body text-sm font-semibold text-cream bg-terracotta px-7 py-3.5 rounded-sm no-underline"
            >
              Apply for next cohort
            </a>
            <a
              href="/contact"
              className="w-full sm:w-auto text-center font-body text-sm font-semibold text-cream border-[1.5px] border-cream/60 px-7 py-3.5 rounded-sm no-underline"
            >
              Ask a question
            </a>
          </div>
        </div>
      </section>

      {/* Program at a glance */}
      <section className="bg-lightgray px-5 py-12 sm:px-14 sm:py-16">
        <div className="max-w-[1100px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
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

      {/* Who this is for */}
      <section className="bg-lightgray px-5 py-12 sm:px-14 sm:py-20 lg:py-24">
        <div className="max-w-[1040px] mx-auto">
          <div className="flex items-center gap-4 mb-10 sm:mb-14">
            <span className="font-mono text-xs tracking-[2px] uppercase text-terracotta font-semibold whitespace-nowrap">
              Who this is for
            </span>
            <span className="flex-1 h-px bg-[#DCDCDC]" />
          </div>
          <div className="grid grid-cols-1 gap-4">
            {audience.map((a) => (
              <div key={a} className="flex gap-4 items-start bg-white border border-[#E0E0E0] border-l-4 border-l-terracotta rounded p-6">
                <span className="text-forest font-bold shrink-0">&#10003;</span>
                <p className="font-body text-[15px] text-dark leading-relaxed m-0">
                  {a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white px-5 py-12 sm:px-14 sm:py-20 lg:py-24">
        <div className="max-w-[1040px] mx-auto">
          <div className="flex items-center gap-4 mb-10 sm:mb-14">
            <span className="font-mono text-xs tracking-[2px] uppercase text-terracotta font-semibold whitespace-nowrap">
              How it works
            </span>
            <span className="flex-1 h-px bg-[#E2DCCE]" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {format.map((f) => (
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
        </div>
      </section>

      {/* CTA */}
      <section className={`relative bg-forest px-5 py-16 sm:py-24 text-center overflow-hidden ${dotPattern}`}>
        <div className="relative">
          <h2 className="font-heading text-3xl sm:text-[34px] text-cream font-bold mb-4 leading-tight">
            Ready for the next cohort?
          </h2>
          <p className="font-body text-base text-cream/80 mb-9 max-w-[520px] mx-auto">
            Cohorts run in regular cycles. Reach out and we&apos;ll tell you
            when the next one starts.
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
