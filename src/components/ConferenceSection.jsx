import { useState, useEffect } from "react";

// ── Countdown Hook ────────────────────────────────────────────────────────
function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState(() => calcTimeLeft(targetDate));

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calcTimeLeft(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return timeLeft;
}

function calcTimeLeft(target) {
  const diff = new Date(target) - new Date();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

// ── Glassmorphism Panel ────────────────────────────────────────────────────
function Panel({ children, glow = "orange", style = {} }) {
  const shadow =
    glow === "orange"
      ? "0 0 24px rgba(232,119,34,0.14)"
      : glow === "blue"
        ? "0 0 24px rgba(0,98,155,0.16)"
        : "none";

  return (
    <div
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

// ── Data ───────────────────────────────────────────────────────────────────
const CONFERENCE_DETAILS = [
  { label: "Date", value: "April 20th, 2026" },
  {
    label: "Panel Speakers",
    value: "Real Industry Leaders in the Hardware space",
  },
];

const CONFERENCE_TIMELINE = [
  { time: "10:00 AM", title: "Welcome Address", tag: "CEREMONY" },
  {
    time: "10:20 AM",
    title: "Address — IEEE IES Nigeria Chair",
    tag: "CEREMONY",
  },
  { time: "10:40 AM", title: "Address — Council Lead", tag: "CEREMONY" },
  { time: "11:00 AM", title: "Keynote Address", tag: "KEYNOTE" },
  { time: "11:40 AM", title: "Industry Talks", tag: "KEYNOTE" },
  { time: "12:30 PM", title: "Student Project Showcases", tag: "COMPETITION" },
  { time: "02:00 PM", title: "Mini Hardware Competition", tag: "COMPETITION" },
  { time: "04:00 PM", title: "Audience Q&A", tag: "PANEL" },
  { time: "05:00 PM", title: "Student Panel Session", tag: "PANEL" },
  { time: "06:30 PM", title: "Prototype Presentations", tag: "COMPETITION" },
  {
    time: "10:00 AM+1",
    title: "Awards & Certificate Ceremony",
    tag: "CEREMONY",
  },
];

const TAG_COLORS = {
  CEREMONY: "#00629B",
  KEYNOTE: "#E87722",
  COMPETITION: "#00A3E0",
  PANEL: "#7B5EA7",
};

const COUNTDOWN_TARGET = "2026-04-20T10:00:00+01:00"; // WAT

function CountdownUnit({ value, label }) {
  return (
    <div style={{ textAlign: "center", minWidth: "72px" }}>
      <div
        style={{
          fontFamily: "Orbitron, sans-serif",
          fontSize: "clamp(1.8rem, 4vw, 3rem)",
          fontWeight: 700,
          color: "#fff",
          lineHeight: 1,
          textShadow: "0 0 20px rgba(0,163,224,0.4)",
        }}
      >
        {String(value).padStart(2, "0")}
      </div>
      <div
        style={{
          fontFamily: "Share Tech Mono, monospace",
          fontSize: "0.55rem",
          letterSpacing: "0.3em",
          color: "rgba(255,255,255,0.35)",
          textTransform: "uppercase",
          marginTop: "8px",
        }}
      >
        {label}
      </div>
    </div>
  );
}

function CountdownSeparator() {
  return (
    <span
      style={{
        fontFamily: "Orbitron, sans-serif",
        fontSize: "clamp(1.4rem, 3vw, 2.2rem)",
        color: "#E87722",
        alignSelf: "flex-start",
        marginTop: "4px",
      }}
    >
      :
    </span>
  );
}

export default function ConferenceSection() {
  const timeLeft = useCountdown(COUNTDOWN_TARGET);

  return (
    <section
      id="conference"
      style={{ position: "relative", padding: "100px 5%", zIndex: 2 }}
    >
      <style>{`
        @media (max-width: 640px) {
          #conference .panel-inner { padding: 20px !important; }
        }
      `}</style>
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
          ></div>
          <p
            style={{
              fontFamily: "Share Tech Mono, monospace",
              fontSize: "2.65rem",
              letterSpacing: "0.32em",
              color: "#00A3E0",
              textTransform: "uppercase",
              marginBottom: "10px",
            }}
          >
            The Conference
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: "16px",
            }}
          >
            <h2
              style={{
                fontFamily: "Orbitron, sans-serif",
                fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)",
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1.2,
                maxWidth: "680px",
              }}
            >
              Nigerian engineering talent need a stage to shine on.{" "}
              <span
                style={{
                  color: "#E87722",
                  textShadow: "0 0 24px rgba(232,119,34,0.4)",
                }}
              >
                IEEE IES is that stage!
              </span>
            </h2>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          {/* Detail cards row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
              gap: "16px",
            }}
          >
            {CONFERENCE_DETAILS.map((d) => (
              <Panel key={d.label} glow="blue" style={{ padding: "22px" }}>
                <p
                  style={{
                    fontFamily: "Share Tech Mono, monospace",
                    fontSize: "0.6rem",
                    letterSpacing: "0.32em",
                    color: "#00A3E0",
                    textTransform: "uppercase",
                    marginBottom: "14px",
                  }}
                >
                  {d.label}
                </p>
                <p
                  style={{
                    fontFamily: "Rajdhani, sans-serif",
                    fontSize: "1.1rem",
                    color: "rgba(255,255,255,0.88)",
                    lineHeight: 1.5,
                    fontWeight: 600,
                  }}
                >
                  {d.value}
                </p>
              </Panel>
            ))}
          </div>

          {/* Countdown timer */}
          <Panel glow="blue" style={{ padding: "32px" }}>
            <p
              style={{
                fontFamily: "Share Tech Mono, monospace",
                fontSize: "0.62rem",
                letterSpacing: "0.3em",
                color: "#00A3E0",
                textTransform: "uppercase",
                marginBottom: "24px",
                textAlign: "center",
              }}
            >
              // COUNTDOWN_TO_LAUNCH
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "clamp(12px, 3vw, 24px)",
                flexWrap: "wrap",
              }}
            >
              <CountdownUnit value={timeLeft.days} label="Days" />
              <CountdownSeparator />
              <CountdownUnit value={timeLeft.hours} label="Hours" />
              <CountdownSeparator />
              <CountdownUnit value={timeLeft.minutes} label="Minutes" />
              <CountdownSeparator />
              <CountdownUnit value={timeLeft.seconds} label="Seconds" />
            </div>
          </Panel>

          {/* Full conference timeline */}
          <Panel glow="none" style={{ padding: "32px" }}>
            <p
              style={{
                fontFamily: "Share Tech Mono, monospace",
                fontSize: "1.62rem",
                letterSpacing: "0.3em",
                color: "rgba(255,255,255,0.35)",
                textTransform: "uppercase",
                marginBottom: "28px",
              }}
            >
              SKETCH {"->"} UPLOAD
            </p>

            <style>{`
              .conf-timeline { position: relative; }
              .conf-vert-line {
                position: absolute; left: 90px; top: 0; bottom: 0; width: 1px;
                background: linear-gradient(to bottom, transparent, rgba(0,98,155,0.4) 10%, rgba(0,98,155,0.4) 90%, transparent);
              }
              .conf-row { display: flex; align-items: center; margin-bottom: 16px; position: relative; }
              .conf-time { width: 80px; flex-shrink: 0; text-align: right; padding-right: 16px; }
              .conf-dot {
                position: absolute; left: 86px; top: 50%; transform: translateY(-50%);
                width: 9px; height: 9px; border-radius: 50%;
                border: 2px solid rgba(5,8,16,1); z-index: 2;
              }
              .conf-card {
                margin-left: 28px; flex: 1; display: flex; align-items: center; gap: 12px;
                background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06);
                border-radius: 10px; padding: 10px 16px; transition: border-color 0.2s; position: relative;
              }
              .conf-card-bar {
                position: absolute; left: 0; top: 0; bottom: 0; width: 3px; border-radius: 2px;
              }
              @media (max-width: 600px) {
                .conf-vert-line { display: none; }
                .conf-dot { display: none; }
                .conf-time { width: auto; text-align: left; padding-right: 0; padding-bottom: 4px; }
                .conf-row { flex-direction: column; align-items: flex-start; gap: 4px; margin-bottom: 12px; }
                .conf-card { margin-left: 0; width: 100%; }
                .conf-card-bar { display: none; }
              }
            `}</style>

            <div className="conf-timeline">
              <div className="conf-vert-line" />

              {CONFERENCE_TIMELINE.map((item, i) => (
                <div key={i} className="conf-row">
                  <div className="conf-time">
                    <span
                      style={{
                        fontFamily: "Share Tech Mono, monospace",
                        fontSize: "0.7rem",
                        color: "rgba(255,255,255,0.35)",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {item.time}
                    </span>
                  </div>

                  <div
                    className="conf-dot"
                    style={{
                      background: TAG_COLORS[item.tag] || "#E87722",
                      boxShadow: `0 0 8px ${TAG_COLORS[item.tag] || "#E87722"}80`,
                    }}
                  />

                  <div
                    className="conf-card"
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.borderColor = `${TAG_COLORS[item.tag]}40`)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.borderColor =
                        "rgba(255,255,255,0.06)")
                    }
                  >
                    <div
                      className="conf-card-bar"
                      style={{ background: TAG_COLORS[item.tag] || "#E87722" }}
                    />
                    <span
                      style={{
                        fontFamily: "Rajdhani, sans-serif",
                        fontSize: "1rem",
                        fontWeight: 700,
                        color: "#fff",
                        flex: 1,
                      }}
                    >
                      {item.title}
                    </span>
                    <span
                      style={{
                        fontFamily: "Share Tech Mono, monospace",
                        fontSize: "0.55rem",
                        letterSpacing: "0.15em",
                        color: TAG_COLORS[item.tag] || "#E87722",
                        background: `${TAG_COLORS[item.tag] || "#E87722"}18`,
                        border: `1px solid ${TAG_COLORS[item.tag] || "#E87722"}30`,
                        padding: "2px 8px",
                        borderRadius: "4px",
                        flexShrink: 0,
                      }}
                    >
                      {item.tag}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </section>
  );
}
