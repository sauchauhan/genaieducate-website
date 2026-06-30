export default function Home() {
  const weeks = [
    { month: "01", title: "Foundations", weeks: "Week 1–4", focus: "Python, LLM internals, prompt engineering", project: "Smart CLI Chatbot" },
    { month: "02", title: "LangChain + RAG", weeks: "Week 5–9", focus: "Embeddings, vector search, retrieval pipelines", project: "Document Q&A App" },
    { month: "03", title: "Agents + Orchestration", weeks: "Week 10–13", focus: "LangGraph, multi-agent systems, MCP", project: "AI Research Agent" },
    { month: "04", title: "Production + Career", weeks: "Week 14–16", focus: "FastAPI, Docker, cloud deployment, security", project: "Capstone Deployment" },
  ];

  return (
    <main style={{ background: "#FFF8F0", minHeight: "100vh" }}>
      {/* ── NAV ───────────────────────────────────────────── */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "28px 56px",
          borderBottom: "1px solid rgba(42,42,42,0.08)",
        }}
      >
        <div style={{ fontFamily: "Georgia, serif", fontSize: 20, fontWeight: 700, color: "#1E5C4A", letterSpacing: 0.3 }}>
          GenAI<span style={{ color: "#C94F1E" }}>Educate</span>
        </div>
        <div style={{ display: "flex", gap: 36, fontFamily: "Calibri, sans-serif", fontSize: 15, color: "#2A2A2A" }}>
          <a href="#program" style={{ textDecoration: "none", color: "inherit" }}>Program</a>
          <a href="#instructor" style={{ textDecoration: "none", color: "inherit" }}>Instructor</a>
          <a href="#contact" style={{ textDecoration: "none", color: "inherit" }}>Contact</a>
        </div>
      </nav>

      {/* ── HERO ──────────────────────────────────────────── */}
      <section style={{ padding: "100px 56px 80px", maxWidth: 880 }}>
        <div
          style={{
            fontFamily: "Calibri, sans-serif",
            fontSize: 13,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "#C94F1E",
            fontWeight: 600,
            marginBottom: 28,
          }}
        >
          A 4-month applied engineering program
        </div>
        <h1
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 56,
            lineHeight: 1.15,
            color: "#1E5C4A",
            fontWeight: 700,
            margin: 0,
            maxWidth: 760,
          }}
        >
          AI engineering, taught the way it's actually practiced.
        </h1>
        <p
          style={{
            fontFamily: "Calibri, sans-serif",
            fontSize: 19,
            lineHeight: 1.7,
            color: "#2A2A2A",
            marginTop: 28,
            maxWidth: 620,
          }}
        >
          Sixteen weekends. Four deployed projects. One instructor who built
          the entire curriculum from real engineering practice, not from a
          course template. For professionals who want to build, not just
          watch.
        </p>
        <div style={{ display: "flex", gap: 16, marginTop: 44 }}>
          <a
            href="#program"
            style={{
              fontFamily: "Calibri, sans-serif",
              fontSize: 15,
              fontWeight: 600,
              color: "#FFF8F0",
              background: "#1E5C4A",
              padding: "14px 28px",
              borderRadius: 4,
              textDecoration: "none",
            }}
          >
            See the curriculum
          </a>
          <a
            href="#contact"
            style={{
              fontFamily: "Calibri, sans-serif",
              fontSize: 15,
              fontWeight: 600,
              color: "#1E5C4A",
              padding: "14px 28px",
              borderRadius: 4,
              textDecoration: "none",
              border: "1px solid rgba(30,92,74,0.3)",
            }}
          >
            Ask a question
          </a>
        </div>
      </section>

      {/* ── SIGNATURE ELEMENT: the curriculum spine ──────────── */}
      <section id="program" style={{ padding: "40px 56px 100px" }}>
        <div style={{ maxWidth: 1040, margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 28,
              color: "#1E5C4A",
              fontWeight: 700,
              marginBottom: 8,
            }}
          >
            Sixteen weeks, in order
          </h2>
          <p
            style={{
              fontFamily: "Calibri, sans-serif",
              fontSize: 16,
              color: "#666",
              marginBottom: 48,
              maxWidth: 560,
            }}
          >
            Every month ends with a real, deployed project. Nothing is taught
            in isolation.
          </p>

          <div style={{ borderTop: "1px solid rgba(42,42,42,0.12)" }}>
            {weeks.map((w, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "60px 1fr 1fr 1fr",
                  gap: 24,
                  alignItems: "baseline",
                  padding: "28px 0",
                  borderBottom: "1px solid rgba(42,42,42,0.12)",
                }}
              >
                <div
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: 15,
                    color: "#C94F1E",
                    fontWeight: 700,
                  }}
                >
                  {w.month}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "Georgia, serif",
                      fontSize: 20,
                      color: "#1E5C4A",
                      fontWeight: 700,
                    }}
                  >
                    {w.title}
                  </div>
                  <div
                    style={{
                      fontFamily: "Calibri, sans-serif",
                      fontSize: 13,
                      color: "#999",
                      marginTop: 4,
                    }}
                  >
                    {w.weeks}
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: "Calibri, sans-serif",
                    fontSize: 15,
                    color: "#2A2A2A",
                    lineHeight: 1.5,
                  }}
                >
                  {w.focus}
                </div>
                <div
                  style={{
                    fontFamily: "Calibri, sans-serif",
                    fontSize: 14,
                    color: "#1E5C4A",
                    fontWeight: 600,
                  }}
                >
                  🏆 {w.project}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INSTRUCTOR ───────────────────────────────────────── */}
      <section
        id="instructor"
        style={{
          background: "#1E5C4A",
          padding: "90px 56px",
        }}
      >
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div
            style={{
              fontFamily: "Calibri, sans-serif",
              fontSize: 13,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "#C94F1E",
              fontWeight: 600,
              marginBottom: 24,
            }}
          >
            Why this is different
          </div>
          <h2
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 34,
              color: "#FFF8F0",
              fontWeight: 700,
              lineHeight: 1.3,
              marginBottom: 28,
            }}
          >
            One instructor. Built from scratch. Iterated live, every weekend.
          </h2>
          <p
            style={{
              fontFamily: "Calibri, sans-serif",
              fontSize: 17,
              color: "rgba(255,248,240,0.85)",
              lineHeight: 1.8,
            }}
          >
            This isn't a recorded library handed off to teaching assistants.
            The curriculum was built session by session, tested against real
            students, and rebuilt where it didn't land. Every project is
            something you deploy and can defend in an interview, not a
            notebook you run once and forget.
          </p>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────── */}
      <section id="contact" style={{ padding: "90px 56px", textAlign: "center" }}>
        <h2
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 30,
            color: "#1E5C4A",
            fontWeight: 700,
            marginBottom: 16,
          }}
        >
          Questions before the next cohort?
        </h2>
        <p
          style={{
            fontFamily: "Calibri, sans-serif",
            fontSize: 16,
            color: "#666",
            marginBottom: 36,
          }}
        >
          Reach out directly. No forms, no funnels.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
          <a
            href="mailto:hello@genaieducate.com"
            style={{
              fontFamily: "Calibri, sans-serif",
              fontSize: 15,
              fontWeight: 600,
              color: "#1E5C4A",
              border: "1px solid rgba(30,92,74,0.3)",
              padding: "14px 28px",
              borderRadius: 4,
              textDecoration: "none",
            }}
          >
            Email us
          </a>
          <a
            href="https://wa.me/91XXXXXXXXXX"
            style={{
              fontFamily: "Calibri, sans-serif",
              fontSize: 15,
              fontWeight: 600,
              color: "#FFF8F0",
              background: "#C94F1E",
              padding: "14px 28px",
              borderRadius: 4,
              textDecoration: "none",
            }}
          >
            WhatsApp
          </a>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer
        style={{
          borderTop: "1px solid rgba(42,42,42,0.08)",
          padding: "32px 56px",
          fontFamily: "Calibri, sans-serif",
          fontSize: 13,
          color: "#999",
          textAlign: "center",
        }}
      >
        GenAIEducate · Institute for Generative AI
      </footer>
    </main>
  );
}
