import { useEffect, useRef, useState } from "react";

// ── Glassmorphism Panel ────────────────────────────────────────────────────
function Panel({ children, glow = "orange", style = {}, className = "" }) {
  const shadow =
    glow === "orange"
      ? "0 0 24px rgba(232,119,34,0.14)"
      : glow === "blue"
        ? "0 0 24px rgba(0,98,155,0.16)"
        : "none";

  return (
    <div
      className={className}
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "28px",
        border: "1px solid rgba(255,255,255,0.1)",
        background:
          "linear-gradient(180deg, rgba(26,26,26,0.92), rgba(10,10,10,0.88))",
        backdropFilter: "blur(16px)",
        boxShadow: shadow,
        ...style,
      }}
    >
      <span
        style={{
          pointerEvents: "none",
          position: "absolute",
          inset: "0 0 auto 0",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
        }}
      />
      <span
        style={{
          pointerEvents: "none",
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "96px",
          height: "96px",
          borderRadius: "50%",
          background:
            glow === "orange" ? "rgba(232,119,34,0.1)" : "rgba(0,98,155,0.1)",
          filter: "blur(40px)",
        }}
      />
      {children}
    </div>
  );
}

// ── Animated counter ───────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix, triggered }) {
  const [display, setDisplay] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!triggered) return;
    const start = performance.now();
    const duration = 1600;

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [triggered, target]);

  return (
    <>
      {display}
      {suffix}
    </>
  );
}

// ── Data ───────────────────────────────────────────────────────────────────
const MISSION_PANELS = [
  // {
  //   kicker: "The Problem",
  //   title: "Nigerian engineers graduate. But do they know how to build?",
  //   body: "Too much of the journey stays theoretical. Students learn formulas, not enough fabrication, debugging, field failure, or prototype iteration.",
  //   items: ["Bench time", "Failure loops", "Prototype repetition"],
  //   itemLabel: "What students are missing",
  //   glow: "none",
  // },
  // {
  //   kicker: "The Cost",
  //   title: "The students who bridge that gap do it alone.",
  //   body: "They trade sleep for solder time, GPA stability for lab access, and peace of mind for the chance to touch real hardware before graduation.",
  //   items: ["Sleep", "GPA stability", "Personal funds"],
  //   itemLabel: "What it costs them",
  //   glow: "blue",
  // },
  {
    // kicker: "The Solution",
    title:
      "We put them in a room. Give them the tools. Feed them. Then we let them build.",
    body: "The buildathon is not extracurricular decoration. It is infrastructure for practical engineering discipline, confidence, and proof.",
    // items: ["Real hardware", "Open build freedom", "A room to just build"],
    // itemLabel: "What this event provides",
    // glow: "orange",
  },
];

const MISSION_METRICS = [
  {
    label: "Practical exposure in most student journeys",
    value: 28,
    suffix: "%",
  },
  { label: "Students self-funding hands-on practice", value: 73, suffix: "%" },
  { label: "Hours the room stays live for building", value: 24, suffix: "h" },
];

// ── Main component ─────────────────────────────────────────────────────────
export default function MissionSection() {
  const sectionRef = useRef(null);
  const [countersTriggered, setCountersTriggered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setCountersTriggered(true);
      },
      { threshold: 0.2 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="mission"
      ref={sectionRef}
      style={{ position: "relative", padding: "100px 5%", zIndex: 2 }}
    >
      {/* Top accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(232,119,34,0.6), transparent)",
        }}
      />

      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Section heading */}
        <div style={{ marginBottom: "56px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "16px",
            }}
          >
            <span
              style={{
                height: "1px",
                flex: 1,
                background:
                  "linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.18), rgba(255,255,255,0))",
              }}
            />
          </div>
          <p
            style={{
              fontFamily: "Share Tech Mono, monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.32em",
              color: "#00A3E0",
              textTransform: "uppercase",
              marginBottom: "10px",
            }}
          >
            Mission Control
          </p>
          <h2
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)",
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.2,
              maxWidth: "700px",
            }}
          >
            The curriculum teaches theory. This chapter is building the{" "}
            <span
              style={{
                color: "#E87722",
                textShadow: "0 0 24px rgba(232,119,34,0.4)",
              }}
            >
              missing practical culture.
            </span>
          </h2>
        </div>

        <div
          className="mission-grid"
          style={
            {
              // display: "grid",
              // gridTemplateColumns: "minmax(0, 320px) minmax(0, 1fr)",
              // gap: "32px",
              // alignItems: "start",
            }
          }
        >
          {/* ── Right: stacked panel cards ── */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              minWidth: 0,
            }}
          >
            {MISSION_PANELS.map((panel) => (
              <Panel
                key={panel.kicker}
                glow={panel.glow}
                style={{ padding: "40px" }}
                className="mission-panel"
              >
                {/* <p
                  style={{
                    fontFamily: "Share Tech Mono, monospace",
                    fontSize: "0.65rem",
                    letterSpacing: "0.32em",
                    color: "#E87722",
                    textTransform: "uppercase",
                    marginBottom: "20px",
                  }}
                >
                  {panel.kicker}
                </p> */}
                <h3
                  style={{
                    fontFamily: "Orbitron, sans-serif",
                    fontSize: "clamp(1.3rem, 2.2vw, 1.9rem)",
                    fontWeight: 700,
                    color: "#fff",
                    lineHeight: 1.25,
                    marginBottom: "20px",
                  }}
                >
                  {panel.title}
                </h3>
                <p
                  style={{
                    fontFamily: "Rajdhani, sans-serif",
                    fontSize: "1.1rem",
                    color: "rgba(255,255,255,0.5)",
                    lineHeight: 1.8,
                    fontWeight: 400,
                    marginBottom: "32px",
                  }}
                >
                  {panel.body}
                </p>

                {/* Item cards */}
                <div
                  className="mission-items-grid"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3,1fr)",
                    gap: "12px",
                  }}
                ></div>
              </Panel>
            ))}
          </div>
        </div>
      </div>

      {/* Responsive collapse */}
      <style>{`
        @media (max-width: 1023px) {
          .mission-grid {
            grid-template-columns: 1fr !important;
          }
          .mission-sticky {
            position: relative !important;
            top: auto !important;
          }
        }
        @media (max-width: 640px) {
          .mission-items-grid {
            grid-template-columns: 1fr !important;
          }
          .mission-panel {
            padding: 24px !important;
          }
        }
      `}</style>
    </section>
  );
}
