const events = [
  {
    id: '01',
    title: 'Student Project Showcase',
    subtitle: 'Fun Projects',
    desc: 'Students and teams exhibit personal or experimental projects built for learning, creativity, or curiosity. Peer and audience voting for standout projects.',
    tags: ['OPEN BUILD', 'AUDIENCE VOTING', 'DEMOS'],
    color: '#E87722',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/>
        <circle cx="12" cy="13" r="2"/>
        <path d="M12 11V7M12 15v2"/>
      </svg>
    ),
  },
  {
    id: '02',
    title: 'Mini Hardware Competition',
    subtitle: 'Constrained Challenge',
    desc: 'Teams compete in a short, constraint-based engineering challenge. Engineering under limitations — one team wins, all teams receive recognition.',
    tags: ['TIMED CHALLENGE', 'TEAM BATTLE', 'PRIZES'],
    color: '#00A3E0',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
  },
  {
    id: '03',
    title: 'Prototype Presentations',
    subtitle: 'Faculty Problem Solving',
    desc: 'Selected teams present early-stage prototypes addressing specific problems within the faculty. Opening pathways for future collaborations and research.',
    tags: ['RESEARCH', 'PROTOTYPES', 'INNOVATION'],
    color: '#00629B',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
        <polyline points="14,2 14,8 20,8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <line x1="10" y1="9" x2="8" y2="9"/>
      </svg>
    ),
  },
  {
    id: '04',
    title: 'Industry & Career Sessions',
    subtitle: 'Expert Keynotes',
    desc: 'Industry professionals deliver addresses covering the state of hardware careers, expectations from industry, and pathways for hardware-focused engineers in Nigeria.',
    tags: ['KEYNOTE', 'NETWORKING', 'MENTORSHIP'],
    color: '#E87722',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <rect x="2" y="7" width="20" height="14" rx="2"/>
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
        <line x1="12" y1="12" x2="12" y2="16"/>
        <line x1="10" y1="14" x2="14" y2="14"/>
      </svg>
    ),
  },
  {
    id: '05',
    title: 'Student Panel Session',
    subtitle: 'Peer Learning',
    desc: 'A student-led panel discussing navigating hardware careers, challenges and realities of the field, and lessons learned from building, failing, and iterating.',
    tags: ['PANEL', 'PEER LEARNING', 'HONEST TALK'],
    color: '#00A3E0',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    id: '06',
    title: 'Awards & Recognition',
    subtitle: 'Ceremony',
    desc: 'Every participating team receives recognition. One team wins the mini-competition. One project wins the People\'s Choice award. Certificates for all contributors.',
    tags: ['CERTIFICATES', "PEOPLE'S CHOICE", 'TROPHIES'],
    color: '#00629B',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
        <path d="M4 22h16"/>
        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/>
      </svg>
    ),
  },
]

export default function EventsSection() {
  return (
    <section id="events" style={{
      position: 'relative',
      padding: '100px 5%',
      zIndex: 2,
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{
            fontFamily: 'Share Tech Mono, monospace',
            fontSize: '0.72rem',
            letterSpacing: '0.3em',
            color: '#E87722',
            marginBottom: '12px',
          }}>
            // EVENT_MODULES
          </div>
          <h2 style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            fontWeight: 700,
            color: '#fff',
          }}>
            What's{' '}
            <span style={{ color: '#E87722', textShadow: '0 0 30px rgba(232,119,34,0.5)' }}>
              Happening
            </span>
          </h2>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: '24px',
        }}>
          {events.map((e) => (
            <div key={e.id} style={{
              background: 'rgba(10,14,26,0.7)',
              border: `1px solid ${e.color}20`,
              borderRadius: '10px',
              padding: '32px 28px',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.25s',
              cursor: 'default',
            }}
            onMouseEnter={el => {
              el.currentTarget.style.transform = 'translateY(-6px)'
              el.currentTarget.style.boxShadow = `0 20px 60px ${e.color}18`
              el.currentTarget.style.borderColor = `${e.color}50`
            }}
            onMouseLeave={el => {
              el.currentTarget.style.transform = 'translateY(0)'
              el.currentTarget.style.boxShadow = 'none'
              el.currentTarget.style.borderColor = `${e.color}20`
            }}
            >
              {/* Background number */}
              <div style={{
                position: 'absolute',
                top: '-10px',
                right: '20px',
                fontFamily: 'Orbitron, sans-serif',
                fontSize: '5rem',
                fontWeight: 900,
                color: `${e.color}08`,
                lineHeight: 1,
                pointerEvents: 'none',
                userSelect: 'none',
              }}>{e.id}</div>

              {/* Top accent line */}
              <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0,
                height: '2px',
                background: `linear-gradient(90deg, ${e.color}, transparent)`,
              }} />

              {/* Icon */}
              <div style={{
                color: e.color,
                marginBottom: '20px',
                opacity: 0.9,
              }}>{e.icon}</div>

              {/* Title */}
              <h3 style={{
                fontFamily: 'Orbitron, sans-serif',
                fontSize: '1rem',
                fontWeight: 700,
                color: '#fff',
                letterSpacing: '0.03em',
                marginBottom: '4px',
                textTransform: 'uppercase',
              }}>{e.title}</h3>

              <div style={{
                fontFamily: 'Share Tech Mono, monospace',
                fontSize: '0.7rem',
                color: e.color,
                letterSpacing: '0.1em',
                marginBottom: '14px',
                opacity: 0.8,
              }}>{e.subtitle}</div>

              <p style={{
                fontFamily: 'Rajdhani, sans-serif',
                fontSize: '1rem',
                color: 'rgba(255,255,255,0.55)',
                lineHeight: 1.65,
                fontWeight: 400,
                marginBottom: '20px',
              }}>{e.desc}</p>

              {/* Tags */}
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {e.tags.map(tag => (
                  <span key={tag} style={{
                    fontFamily: 'Share Tech Mono, monospace',
                    fontSize: '0.58rem',
                    letterSpacing: '0.1em',
                    color: e.color,
                    background: `${e.color}10`,
                    border: `1px solid ${e.color}25`,
                    padding: '3px 8px',
                    borderRadius: '3px',
                  }}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
