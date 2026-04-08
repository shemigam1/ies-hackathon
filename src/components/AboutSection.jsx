import OscilloscopeWave from "./OscilloscopeWave";

const stats = [
  { value: "24H", label: "Non-Stop Building", icon: "⚡" },
  { value: "200+", label: "Attendees Expected", icon: "👥" },
  { value: "40", label: "Competition Builders", icon: "🔧" },
  { value: "12+", label: "Teams Competing", icon: "🏆" },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      style={{
        position: "relative",
        padding: "100px 5%",
        zIndex: 2,
      }}
    >
      {/* Top wave */}
      <div style={{ marginBottom: "-2px", opacity: 0.3 }}>
        <OscilloscopeWave height={60} color="#E87722" />
      </div>

      <div
        style={{
          background: "rgba(10, 14, 26, 0.7)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(232,119,34,0.1)",
          borderBottom: "1px solid rgba(0,98,155,0.15)",
          padding: "80px 0",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 5%" }}>
          {/* Section header */}
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <div
              style={{
                fontFamily: "Share Tech Mono, monospace",
                fontSize: "0.72rem",
                letterSpacing: "0.3em",
                color: "#E87722",
                marginBottom: "12px",
              }}
            >
              // SYSTEM_BRIEF
            </div>
            <h2
              style={{
                fontFamily: "Orbitron, sans-serif",
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1.2,
                marginBottom: "20px",
              }}
            >
              What is{" "}
              <span
                style={{
                  color: "#E87722",
                  textShadow: "0 0 30px rgba(232,119,34,0.5)",
                }}
              >
                Build-A-Thon?
              </span>
            </h2>
            <p
              style={{
                fontFamily: "Rajdhani, sans-serif",
                fontSize: "clamp(1rem, 2vw, 1.15rem)",
                color: "rgba(255,255,255,0.6)",
                maxWidth: "640px",
                margin: "0 auto",
                lineHeight: 1.7,
                fontWeight: 400,
              }}
            >
              A 24-hour non-stop hardware engineering event by IEEE Industrial
              Electronics Society, University of Lagos. A time to just build —
              no pressure, no constraints. Let your mind run wild and prove
              Nigerian student engineers can build, prototype, and innovate.
            </p>
          </div>

          {/* Stats */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 160px), 1fr))",
              gap: "20px",
              marginBottom: "80px",
            }}
          >
            {stats.map((s) => (
              <div
                key={s.label}
                style={{
                  background: "rgba(0,98,155,0.06)",
                  border: "1px solid rgba(0,163,224,0.15)",
                  borderRadius: "8px",
                  padding: "28px 20px",
                  textAlign: "center",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "2px",
                    background:
                      "linear-gradient(90deg, transparent, rgba(232,119,34,0.6), transparent)",
                  }}
                />
                <div style={{ fontSize: "1.4rem", marginBottom: "8px" }}>
                  {s.icon}
                </div>
                <div
                  style={{
                    fontFamily: "Orbitron, sans-serif",
                    fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                    fontWeight: 900,
                    color: "#E87722",
                    textShadow: "0 0 20px rgba(232,119,34,0.4)",
                    lineHeight: 1,
                    marginBottom: "8px",
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontFamily: "Rajdhani, sans-serif",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    color: "rgba(0,163,224,0.7)",
                    textTransform: "uppercase",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Features grid */}
        </div>
      </div>
    </section>
  );
}
