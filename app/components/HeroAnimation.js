'use client';
import { useState, useEffect, useRef } from 'react';

/* ── CONFIGURATION ─────────────────────────────────────── */

const INTERVIEW_QUESTIONS = [
  "What is an AI agent?",
  "LangChain vs LangGraph?",
  "What is RAG and when do you use it?",
];

const MEETING_QUESTIONS = [
  "How do we control AI costs?",
  "Which LLM should we pick?",
  "How do we test AI quality?",
];

const TYPING_SPEED = 60;
const PAUSE_BETWEEN_QUESTIONS = 700;
const STRUGGLE_FOCUS_DURATION = 2400;
const DOTS_DURATION = 800;
const COLLAPSE_DELAY = 1800;

/* ── TYPING DOTS ───────────────────────────────────────── */

function TypingDots() {
  return (
    <span style={{ display: "inline-flex", gap: 4, alignItems: "center", height: 20 }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "rgba(255,248,240,0.6)",
            animation: `dotBounce 1s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
    </span>
  );
}

/* ── STICK FIGURES (SVG) ───────────────────────────────── */

function InterviewerFigure() {
  return (
    <svg width="70" height="110" viewBox="0 0 70 110" fill="none">
      {/* Head */}
      <circle cx="35" cy="18" r="14" stroke="#1E5C4A" strokeWidth="2.5" strokeLinecap="round" />
      {/* Body */}
      <line x1="35" y1="32" x2="35" y2="68" stroke="#1E5C4A" strokeWidth="2.5" strokeLinecap="round" />
      {/* Arms */}
      <line x1="35" y1="42" x2="14" y2="56" stroke="#1E5C4A" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="35" y1="42" x2="56" y2="56" stroke="#1E5C4A" strokeWidth="2.5" strokeLinecap="round" />
      {/* Legs */}
      <line x1="35" y1="68" x2="18" y2="100" stroke="#1E5C4A" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="35" y1="68" x2="52" y2="100" stroke="#1E5C4A" strokeWidth="2.5" strokeLinecap="round" />
      {/* Tie */}
      <line x1="35" y1="32" x2="31" y2="48" stroke="#1E5C4A" strokeWidth="2" strokeLinecap="round" />
      <line x1="35" y1="32" x2="39" y2="48" stroke="#1E5C4A" strokeWidth="2" strokeLinecap="round" />
      <line x1="31" y1="48" x2="35" y2="54" stroke="#1E5C4A" strokeWidth="2" strokeLinecap="round" />
      <line x1="39" y1="48" x2="35" y2="54" stroke="#1E5C4A" strokeWidth="2" strokeLinecap="round" />
      {/* Desk */}
      <rect x="2" y="62" width="66" height="2" rx="1" fill="#1E5C4A" opacity="0.15" />
    </svg>
  );
}

function StrugglingFigure({ color }) {
  return (
    <svg width="70" height="110" viewBox="0 0 70 110" fill="none">
      {/* Head */}
      <circle cx="35" cy="18" r="14" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      {/* Worried eyebrows */}
      <line x1="26" y1="13" x2="30" y2="16" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="40" y1="16" x2="44" y2="13" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Worried mouth */}
      <path d="M 28 25 Q 35 21 42 25" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      {/* Body - slightly hunched */}
      <path d="M 35 32 Q 37 50 36 68" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Arms - hands near face, stressed pose */}
      <line x1="35" y1="42" x2="16" y2="52" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="35" y1="42" x2="54" y2="52" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      {/* Legs */}
      <line x1="36" y1="68" x2="20" y2="100" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="36" y1="68" x2="52" y2="100" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      {/* Chair hint */}
      <rect x="14" y="64" width="40" height="2" rx="1" fill={color} opacity="0.15" />
    </svg>
  );
}

function LeadershipFigure() {
  return (
    <svg width="70" height="110" viewBox="0 0 70 110" fill="none">
      {/* Head */}
      <circle cx="35" cy="18" r="14" stroke="#1E5C4A" strokeWidth="2.5" strokeLinecap="round" />
      {/* Body */}
      <line x1="35" y1="32" x2="35" y2="68" stroke="#1E5C4A" strokeWidth="2.5" strokeLinecap="round" />
      {/* Arms */}
      <line x1="35" y1="42" x2="14" y2="56" stroke="#1E5C4A" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="35" y1="42" x2="56" y2="56" stroke="#1E5C4A" strokeWidth="2.5" strokeLinecap="round" />
      {/* Legs */}
      <line x1="35" y1="68" x2="18" y2="100" stroke="#1E5C4A" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="35" y1="68" x2="52" y2="100" stroke="#1E5C4A" strokeWidth="2.5" strokeLinecap="round" />
      {/* Tie */}
      <line x1="35" y1="32" x2="31" y2="48" stroke="#1E5C4A" strokeWidth="2" strokeLinecap="round" />
      <line x1="35" y1="32" x2="39" y2="48" stroke="#1E5C4A" strokeWidth="2" strokeLinecap="round" />
      <line x1="31" y1="48" x2="35" y2="54" stroke="#1E5C4A" strokeWidth="2" strokeLinecap="round" />
      <line x1="39" y1="48" x2="35" y2="54" stroke="#1E5C4A" strokeWidth="2" strokeLinecap="round" />
      {/* Lanyard/Badge */}
      <line x1="35" y1="32" x2="42" y2="38" stroke="#C94F1E" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="39" y="38" width="8" height="11" rx="1.5" stroke="#C94F1E" strokeWidth="1.5" fill="none" />
      {/* Desk */}
      <rect x="2" y="62" width="66" height="2" rx="1" fill="#1E5C4A" opacity="0.15" />
      {/* Laptop on desk */}
      <rect x="42" y="56" width="16" height="6" rx="1" stroke="#1E5C4A" strokeWidth="1.5" fill="none" opacity="0.4" />
      <line x1="42" y1="56" x2="46" y2="50" stroke="#1E5C4A" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <line x1="58" y1="56" x2="62" y2="50" stroke="#1E5C4A" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}

/* ── QUESTION BUBBLE ───────────────────────────────────── */

function QuestionBubble({ questions, currentIndex, currentText, showDots, side }) {
  const isLeft = side === "left";

  return (
    <div
      style={{
        background: "#1E5C4A",
        borderRadius: 14,
        padding: "14px 18px",
        minWidth: 200,
        maxWidth: 240,
        position: "relative",
        boxShadow: "0 2px 12px rgba(30,92,74,0.15)",
        border: "1px solid rgba(255,248,240,0.08)",
      }}
    >
      {/* Already typed questions */}
      {questions.slice(0, currentIndex).map((q, i) => (
        <div
          key={i}
          style={{
            fontFamily: "'Consolas', 'Courier New', monospace",
            fontSize: 13,
            color: i < currentIndex - 1 ? "rgba(255,248,240,0.35)" : "rgba(255,248,240,0.7)",
            lineHeight: 1.6,
            marginBottom: 4,
            transition: "color 0.5s ease",
          }}
        >
          {q}
        </div>
      ))}

      {/* Currently typing question */}
      {currentIndex < questions.length && (
        <div
          style={{
            fontFamily: "'Consolas', 'Courier New', monospace",
            fontSize: 13,
            color: "#FFF8F0",
            lineHeight: 1.6,
            minHeight: 22,
          }}
        >
          {showDots ? <TypingDots /> : currentText}
          {!showDots && currentText && (
            <span
              style={{
                display: "inline-block",
                width: 2,
                height: 14,
                background: "#FFF8F0",
                marginLeft: 2,
                verticalAlign: "middle",
                animation: "cursorBlink 0.8s step-end infinite",
              }}
            />
          )}
        </div>
      )}

      {/* Triangle pointer */}
      <div
        style={{
          position: "absolute",
          bottom: -10,
          [isLeft ? "left" : "right"]: 28,
          width: 0,
          height: 0,
          borderLeft: "10px solid transparent",
          borderRight: "10px solid transparent",
          borderTop: "10px solid #1E5C4A",
        }}
      />
    </div>
  );
}

/* ── STRUGGLE BUBBLE ───────────────────────────────────── */

function StruggleBubble({ intensity, buzzing }) {
  const marks = "? ".repeat(Math.min(intensity + 1, 4)).trim();

  return (
    <div
      style={{
        background: "#C94F1E",
        borderRadius: 14,
        padding: "10px 18px",
        minWidth: 60,
        textAlign: "center",
        position: "relative",
        boxShadow: buzzing ? "0 4px 16px rgba(201,79,30,0.35)" : "0 2px 12px rgba(201,79,30,0.2)",
        border: "1px solid rgba(255,248,240,0.1)",
        transition: "box-shadow 0.3s ease, transform 0.3s ease",
        transform: intensity > 2 ? "scale(1.05)" : "scale(1)",
        animation: buzzing ? "struggleBuzz 0.5s ease-in-out infinite" : "none",
      }}
    >
      <div
        style={{
          fontSize: intensity > 2 ? 26 : 22,
          color: "#FFF8F0",
          letterSpacing: 6,
          fontWeight: 700,
          transition: "all 0.3s ease",
        }}
      >
        {marks}
      </div>
      {/* Triangle pointer */}
      <div
        style={{
          position: "absolute",
          bottom: -10,
          right: 24,
          width: 0,
          height: 0,
          borderLeft: "10px solid transparent",
          borderRight: "10px solid transparent",
          borderTop: "10px solid #C94F1E",
        }}
      />
    </div>
  );
}

/* ── SCENE ─────────────────────────────────────────────── */

function Scene({ title, askerLabel, strugglerLabel, questions, AskerFigure, side, currentIndex, currentText, showDots, isStruggling }) {
  return (
    <div style={{ flex: 1, padding: "36px 28px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* Scene label */}
      <div
        style={{
          fontSize: 11,
          letterSpacing: 2.5,
          textTransform: "uppercase",
          color: "#C94F1E",
          fontWeight: 600,
          fontFamily: "Calibri, sans-serif",
          marginBottom: 28,
          alignSelf: "flex-start",
        }}
      >
        {title}
      </div>

      {/* Characters */}
      <div style={{ display: "flex", gap: 36, alignItems: "flex-start", justifyContent: "center", width: "100%" }}>
        {/* Asker */}
        <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <QuestionBubble
            questions={questions}
            currentIndex={currentIndex}
            currentText={currentText}
            showDots={showDots}
            side="left"
          />
          <div style={{ marginTop: 14 }}>
            <AskerFigure />
          </div>
          <div style={{ fontSize: 11, color: "#1E5C4A", fontWeight: 600, marginTop: 6, fontFamily: "Calibri, sans-serif" }}>
            {askerLabel}
          </div>
        </div>

        {/* Struggler */}
        <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
          {currentIndex > 0 || currentText ? (
            <StruggleBubble intensity={currentIndex} buzzing={isStruggling} />
          ) : (
            <div style={{ height: 48 }} />
          )}
          <div style={{ marginTop: 14 }}>
            <StrugglingFigure color="#C94F1E" />
          </div>
          <div style={{ fontSize: 11, color: "#C94F1E", fontWeight: 600, marginTop: 6, fontFamily: "Calibri, sans-serif" }}>
            {strugglerLabel}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── COLLAPSED BAR ─────────────────────────────────────── */

function CollapsedBar() {
  const allQuestions = [...INTERVIEW_QUESTIONS, ...MEETING_QUESTIONS];

  return (
    <div
      style={{
        background: "#1E5C4A",
        borderRadius: 8,
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 16,
        margin: "0 24px",
        boxShadow: "0 2px 16px rgba(30,92,74,0.12)",
      }}
    >
      <div
        className="collapsed-bar-scroll"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "clamp(10px, 2vw, 20px)",
          fontSize: "clamp(9px, 1.6vw, 12px)",
          color: "rgba(255,248,240,0.55)",
          fontFamily: "'Consolas', monospace",
          whiteSpace: "nowrap",
          overflowX: "auto",
          flex: 1,
          minWidth: 0,
        }}
      >
        {allQuestions.map((q, i) => (
          <span key={i} style={{ display: "flex", alignItems: "center", gap: "clamp(10px, 2vw, 20px)" }}>
            <span>{q}</span>
            {i < allQuestions.length - 1 && <span style={{ color: "rgba(255,248,240,0.2)" }}>|</span>}
          </span>
        ))}
      </div>
      <span
        style={{
          fontSize: "clamp(10px, 1.8vw, 13px)",
          color: "#C94F1E",
          fontWeight: 600,
          fontFamily: "Calibri, sans-serif",
          whiteSpace: "nowrap",
          flexShrink: 0,
        }}
      >
        We teach the answers ↓
      </span>
    </div>
  );
}

/* ── MAIN COMPONENT ────────────────────────────────────── */

export default function HeroAnimation() {
  const [phase, setPhase] = useState("playing");
  // Scene 1 state
  const [s1Index, setS1Index] = useState(0);
  const [s1Text, setS1Text] = useState("");
  const [s1Dots, setS1Dots] = useState(true);
  const [s1Struggling, setS1Struggling] = useState(false);
  // Scene 2 state
  const [s2Index, setS2Index] = useState(0);
  const [s2Text, setS2Text] = useState("");
  const [s2Dots, setS2Dots] = useState(true);
  const [s2Struggling, setS2Struggling] = useState(false);
  // Which scene is active
  const [activeScene, setActiveScene] = useState(1);

  const timeoutRef = useRef(null);

  useEffect(() => {
    startAnimation();
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, []);

  function wait(ms) {
    return new Promise((resolve) => {
      timeoutRef.current = setTimeout(resolve, ms);
    });
  }

  async function typeQuestion(text, setTextFn) {
    const words = text.split(" ");
    let current = "";
    for (let i = 0; i < words.length; i++) {
      current += (i > 0 ? " " : "") + words[i];
      setTextFn(current);
      await wait(TYPING_SPEED + Math.random() * 40);
    }
  }

  async function animateScene(questions, setIndex, setText, setDots, setStruggling) {
    for (let i = 0; i < questions.length; i++) {
      setIndex(i);
      setDots(true);
      setText("");
      await wait(DOTS_DURATION);
      setDots(false);
      await typeQuestion(questions[i], setText);
      const isLastQuestion = i === questions.length - 1;
      if (isLastQuestion) {
        // All questions asked — hold and buzz on the struggler's reaction before leaving the scene.
        setStruggling(true);
        await wait(STRUGGLE_FOCUS_DURATION);
        setStruggling(false);
      } else {
        await wait(PAUSE_BETWEEN_QUESTIONS);
      }
      setText("");
      setIndex(i + 1);
    }
  }

  async function startAnimation() {
    // Scene 1: Interview
    setActiveScene(1);
    await animateScene(INTERVIEW_QUESTIONS, setS1Index, setS1Text, setS1Dots, setS1Struggling);
    await wait(400);

    // Scene 2: Meeting
    setActiveScene(2);
    await animateScene(MEETING_QUESTIONS, setS2Index, setS2Text, setS2Dots, setS2Struggling);

    // Collapse
    await wait(COLLAPSE_DELAY);
    setPhase("collapsing");
    await wait(800);
    setPhase("collapsed");
  }

  return (
    <>
      {/* Keyframe animations */}
      <style>{`
        @keyframes dotBounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes fadeInScene {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes struggleBuzz {
          0%, 100% { transform: translateX(0) scale(1.05); }
          20% { transform: translateX(-3px) scale(1.07); }
          40% { transform: translateX(3px) scale(1.09); }
          60% { transform: translateX(-3px) scale(1.07); }
          80% { transform: translateX(2px) scale(1.05); }
        }
        .collapsed-bar-scroll {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .collapsed-bar-scroll::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <div
        style={{
          background: "#FFF8F0",
          overflow: "hidden",
          transition: "height 0.8s cubic-bezier(0.4, 0, 0.2, 1), padding 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
          height: phase === "collapsed" || phase === "collapsing" ? 80 : 520,
          padding: phase === "collapsed" || phase === "collapsing" ? "12px 0" : "20px 0",
        }}
      >
        {phase === "collapsed" || phase === "collapsing" ? (
          <CollapsedBar />
        ) : (
          <div
            style={{
              display: "flex",
              width: "100%",
              boxSizing: "border-box",
              padding: "0 24px",
            }}
          >
            {/* Scene 1: Interview */}
            <div
              style={{
                flex: 1,
                opacity: activeScene === 1 ? 1 : 0.3,
                transition: "opacity 0.5s ease",
                borderRight: "1px solid rgba(42,42,42,0.06)",
              }}
            >
              <Scene
                title="The interview"
                askerLabel="Interviewer"
                strugglerLabel="Candidate"
                questions={INTERVIEW_QUESTIONS}
                AskerFigure={InterviewerFigure}
                side="left"
                currentIndex={s1Index}
                currentText={s1Text}
                showDots={s1Dots && activeScene === 1}
                isStruggling={s1Struggling && activeScene === 1}
              />
            </div>

            {/* Scene 2: Meeting */}
            <div
              style={{
                flex: 1,
                opacity: activeScene === 2 ? 1 : 0.3,
                transition: "opacity 0.5s ease",
              }}
            >
              <Scene
                title="The meeting"
                askerLabel="Leadership"
                strugglerLabel="Manager"
                questions={MEETING_QUESTIONS}
                AskerFigure={LeadershipFigure}
                side="right"
                currentIndex={s2Index}
                currentText={s2Text}
                showDots={s2Dots && activeScene === 2}
                isStruggling={s2Struggling && activeScene === 2}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
