export default function Home() {
  const weeks = [
    { month: "01", title: "Foundations", weeks: "Week 1–4", focus: "Python, LLM internals, prompt engineering", project: "Smart CLI Chatbot" },
    { month: "02", title: "LangChain + RAG", weeks: "Week 5–9", focus: "Embeddings, vector search, retrieval pipelines", project: "Document Q&A App" },
    { month: "03", title: "Agents + Orchestration", weeks: "Week 10–13", focus: "LangGraph, multi-agent systems, MCP", project: "AI Research Agent" },
    { month: "04", title: "Production + Career", weeks: "Week 14–16", focus: "FastAPI, Docker, cloud deployment, security", project: "Capstone Deployment" },
  ];

  return (
    <main className="bg-cream min-h-screen">
      <nav className="flex justify-between items-center px-5 py-5 sm:px-14 sm:py-7 border-b border-black/[0.08]">
        <div className="font-heading text-xl font-bold text-forest tracking-[0.3px]">
          GenAI<span className="text-terracotta">Educate</span>
        </div>
        <div className="flex gap-5 sm:gap-9 font-body text-sm sm:text-[15px] text-[#2A2A2A]">
          <a href="#program" className="no-underline text-inherit">Program</a>
          <a href="#instructor" className="no-underline text-inherit">Instructor</a>
          <a href="#contact" className="no-underline text-inherit">Contact</a>
        </div>
      </nav>

      <section className="px-5 pt-16 pb-14 sm:px-14 sm:pt-24 sm:pb-20 max-w-[880px]">
        <div className="font-body text-xs tracking-[2px] uppercase text-terracotta font-semibold mb-6 sm:mb-7">
          A 4-month applied engineering program
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-[56px] leading-[1.15] text-forest font-bold max-w-[760px] m-0">
          AI engineering, taught the way it&apos;s actually practiced.
        </h1>
        <p className="font-body text-base sm:text-lg leading-7 sm:leading-[1.7] text-[#2A2A2A] mt-6 sm:mt-7 max-w-[620px]">
          Sixteen weekends. Four deployed projects. One instructor who built
          the entire curriculum from real engineering practice, not from a
          course template. For professionals who want to build, not just
          watch.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-9 sm:mt-11">
          <a
            href="#program"
            className="w-full sm:w-auto text-center font-body text-sm font-semibold text-cream bg-forest px-7 py-3.5 rounded no-underline"
          >
            See the curriculum
          </a>
          <a
            href="#contact"
            className="w-full sm:w-auto text-center font-body text-sm font-semibold text-forest border border-forest/30 px-7 py-3.5 rounded no-underline"
          >
            Ask a question
          </a>
        </div>
      </section>

      <section id="program" className="px-5 py-10 sm:px-14 sm:pb-24">
        <div className="max-w-[1040px] mx-auto">
          <h2 className="font-heading text-2xl sm:text-[28px] text-forest font-bold mb-2">
            Sixteen weeks, in order
          </h2>
          <p className="font-body text-base text-[#666] mb-10 sm:mb-12 max-w-[560px]">
            Every month ends with a real, deployed project. Nothing is taught
            in isolation.
          </p>

          <div className="border-t border-black/[0.12]">
            {weeks.map((w, i) => (
              <div
                key={i}
                className="flex flex-col gap-2 py-6 border-b border-black/[0.12] md:grid md:grid-cols-[60px_1fr_1fr_1fr] md:items-baseline md:gap-6 md:py-7"
              >
                <div className="font-heading text-sm text-terracotta font-bold">
                  {w.month}
                </div>
                <div>
                  <div className="font-heading text-xl text-forest font-bold">
                    {w.title}
                  </div>
                  <div className="font-body text-xs text-[#999] mt-1">
                    {w.weeks}
                  </div>
                </div>
                <div>
                  <span className="md:hidden font-body text-xs uppercase tracking-wide text-[#999] block mb-1">
                    Focus
                  </span>
                  <span className="font-body text-[15px] text-[#2A2A2A] leading-relaxed">
                    {w.focus}
                  </span>
                </div>
                <div>
                  <span className="md:hidden font-body text-xs uppercase tracking-wide text-[#999] block mb-1">
                    Project
                  </span>
                  <span className="font-body text-sm text-forest font-semibold">
                    🏆 {w.project}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="instructor" className="bg-forest px-5 py-16 sm:px-14 sm:py-[90px]">
        <div className="max-w-[680px] mx-auto">
          <div className="font-body text-xs tracking-[2px] uppercase text-terracotta font-semibold mb-6">
            Why this is different
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-[34px] text-cream font-bold leading-snug mb-7">
            One instructor. Built from scratch. Iterated live, every weekend.
          </h2>
          <p className="font-body text-base sm:text-[17px] text-cream/85 leading-7 sm:leading-[1.8]">
            This isn&apos;t a recorded library handed off to teaching assistants.
            The curriculum was built session by session, tested against real
            students, and rebuilt where it didn&apos;t land. Every project is
            something you deploy and can defend in an interview, not a
            notebook you run once and forget.
          </p>
        </div>
      </section>

      <section id="contact" className="px-5 py-16 sm:py-[90px] text-center">
        <h2 className="font-heading text-2xl sm:text-[30px] text-forest font-bold mb-4">
          Questions before the next cohort?
        </h2>
        <p className="font-body text-base text-[#666] mb-9">
          Reach out directly. No forms, no funnels.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center sm:items-stretch max-w-xs sm:max-w-none mx-auto">
          <a
            href="mailto:hello@genaieducate.com"
            className="w-full sm:w-auto text-center font-body text-sm font-semibold text-forest border border-forest/30 px-7 py-3.5 rounded no-underline"
          >
            Email us
          </a>
          <a
            href="https://wa.me/919326392693?text=Hi%20Saurav%2C%20I%20just%20visited%20the%20GenAIEducate%20website.%20Could%20you%20tell%20me%20more%20about%20the%20next%20cohort%3F"
            className="w-full sm:w-auto text-center font-body text-sm font-semibold text-cream bg-terracotta px-7 py-3.5 rounded no-underline"
          >
            WhatsApp
          </a>
        </div>
      </section>

      <footer className="border-t border-black/[0.08] px-5 py-8 sm:px-14 font-body text-xs text-[#999] text-center">
        GenAIEducate · Institute for Generative AI
      </footer>
    </main>
  );
}
