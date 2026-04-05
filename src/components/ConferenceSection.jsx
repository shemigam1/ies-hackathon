// Port of ieee-website ConferenceSection.tsx
// ── Glassmorphism Panel ────────────────────────────────────────────────────
function Panel({ children, glow = 'orange', style = {} }) {
  const shadow =
    glow === 'orange' ? '0 0 24px rgba(232,119,34,0.14)'
    : glow === 'blue'  ? '0 0 24px rgba(0,98,155,0.16)'
    : 'none'

  return (
    <div style={{
      position: 'relative', overflow: 'hidden',
      borderRadius: '28px',
      border: '1px solid rgba(255,255,255,0.1)',
      background: 'linear-gradient(180deg, rgba(26,26,26,0.92), rgba(10,10,10,0.88))',
      backdropFilter: 'blur(16px)',
      boxShadow: shadow,
      ...style,
    }}>
      <span style={{
        pointerEvents: 'none', position: 'absolute',
        inset: '0 0 auto 0', height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)',
      }} />
      <span style={{
        pointerEvents: 'none', position: 'absolute',
        bottom: 0, left: 0, width: '96px', height: '96px', borderRadius: '50%',
        background: glow === 'orange' ? 'rgba(232,119,34,0.1)' : 'rgba(0,98,155,0.1)',
        filter: 'blur(40px)',
      }} />
      {children}
    </div>
  )
}

// ── Data ───────────────────────────────────────────────────────────────────
const CONFERENCE_DETAILS = [
  { label: 'Date', value: 'April 13–14, 2026' },
  { label: 'Format', value: 'Keynotes · Panels · Demo Showcase' },
  { label: 'Audience', value: 'Students · Industry · Partners · Media' },
  { label: 'Signal', value: "Nigeria's engineering talent deserves infrastructure" },
]

const HIGHLIGHTS = [
  {
    title: 'Ceremony & Addresses',
    body: 'Welcome address, chapter leadership, and institutional framing for the day.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0 0 12 0V2z"/>
      </svg>
    ),
    glow: 'orange',
  },
  {
    title: 'Panels & Audience Q&A',
    body: 'Conversation-driven moments with guests, students, and hardware-focused voices.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    glow: 'blue',
  },
  {
    title: 'Showcases & Competition',
    body: 'Student project demonstrations, mini competition rounds, and awards.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
    glow: 'orange',
  },
]

const CONFERENCE_TIMELINE = [
  { time: '10:00 AM', title: 'Welcome Address', tag: 'CEREMONY' },
  { time: '10:20 AM', title: 'Address — IEEE IES Nigeria Chair', tag: 'CEREMONY' },
  { time: '10:40 AM', title: 'Address — Council Lead', tag: 'CEREMONY' },
  { time: '11:00 AM', title: 'Keynote Address', tag: 'KEYNOTE' },
  { time: '11:40 AM', title: 'Industry Talks', tag: 'KEYNOTE' },
  { time: '12:30 PM', title: 'Student Project Showcases', tag: 'COMPETITION' },
  { time: '02:00 PM', title: 'Mini Hardware Competition', tag: 'COMPETITION' },
  { time: '04:00 PM', title: 'Audience Q&A', tag: 'PANEL' },
  { time: '05:00 PM', title: 'Student Panel Session', tag: 'PANEL' },
  { time: '06:30 PM', title: 'Prototype Presentations', tag: 'COMPETITION' },
  { time: '10:00 AM+1', title: 'Awards & Certificate Ceremony', tag: 'CEREMONY' },
]

const TAG_COLORS = {
  CEREMONY: '#00629B',
  KEYNOTE: '#E87722',
  COMPETITION: '#00A3E0',
  PANEL: '#7B5EA7',
}

export default function ConferenceSection() {
  return (
    <section id="conference" style={{ position: 'relative', padding: '100px 5%', zIndex: 2 }}>
      <style>{`
        @media (max-width: 640px) {
          #conference .panel-inner { padding: 20px !important; }
        }
      `}</style>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Section heading */}
        <div style={{ marginBottom: '56px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.75rem', letterSpacing: '0.5em', color: '#00A3E0' }}>05</span>
            <span style={{ height: '1px', flex: 1, background: 'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.18), rgba(255,255,255,0))' }} />
          </div>
          <p style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.32em', color: '#00A3E0', textTransform: 'uppercase', marginBottom: '10px' }}>
            The Conference
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '16px' }}>
            <h2 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)', fontWeight: 700, color: '#fff', lineHeight: 1.2, maxWidth: '680px' }}>
              Nigerian engineering talent does not need charity.{' '}
              <span style={{ color: '#E87722', textShadow: '0 0 24px rgba(232,119,34,0.4)' }}>It needs a stage, a room, and serious backing.</span>
            </h2>
            <p style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '1rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, maxWidth: '360px', fontWeight: 400 }}>
              A stage for student prototypes, sponsor conviction, and the message that the talent already exists.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

          {/* Detail cards row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '16px' }}>
            {CONFERENCE_DETAILS.map(d => (
              <Panel key={d.label} glow="blue" style={{ padding: '22px' }}>
                <p style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.32em', color: '#00A3E0', textTransform: 'uppercase', marginBottom: '14px' }}>
                  {d.label}
                </p>
                <p style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '1.1rem', color: 'rgba(255,255,255,0.88)', lineHeight: 1.5, fontWeight: 600 }}>
                  {d.value}
                </p>
              </Panel>
            ))}
          </div>

          {/* Highlight cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '16px' }}>
            {HIGHLIGHTS.map(h => (
              <Panel key={h.title} glow={h.glow} style={{ padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div style={{
                    flexShrink: 0,
                    borderRadius: '16px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    background: 'rgba(255,255,255,0.03)',
                    padding: '12px',
                    color: '#E87722',
                  }}>
                    {h.icon}
                  </div>
                  <div>
                    <p style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '10px' }}>
                      {h.title}
                    </p>
                    <p style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '1rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.65, fontWeight: 400 }}>
                      {h.body}
                    </p>
                  </div>
                </div>
              </Panel>
            ))}
          </div>

          {/* Full conference timeline */}
          <Panel glow="none" style={{ padding: '32px' }}>
            <p style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.62rem', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', marginBottom: '28px' }}>
              // RUN_OF_SHOW
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
                    <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.05em' }}>
                      {item.time}
                    </span>
                  </div>

                  <div className="conf-dot" style={{
                    background: TAG_COLORS[item.tag] || '#E87722',
                    boxShadow: `0 0 8px ${TAG_COLORS[item.tag] || '#E87722'}80`,
                  }} />

                  <div className="conf-card"
                    onMouseEnter={e => e.currentTarget.style.borderColor = `${TAG_COLORS[item.tag]}40`}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'}
                  >
                    <div className="conf-card-bar" style={{ background: TAG_COLORS[item.tag] || '#E87722' }} />
                    <span style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '1rem', fontWeight: 700, color: '#fff', flex: 1 }}>
                      {item.title}
                    </span>
                    <span style={{
                      fontFamily: 'Share Tech Mono, monospace', fontSize: '0.55rem',
                      letterSpacing: '0.15em', color: TAG_COLORS[item.tag] || '#E87722',
                      background: `${TAG_COLORS[item.tag] || '#E87722'}18`,
                      border: `1px solid ${TAG_COLORS[item.tag] || '#E87722'}30`,
                      padding: '2px 8px', borderRadius: '4px', flexShrink: 0,
                    }}>
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
  )
}
