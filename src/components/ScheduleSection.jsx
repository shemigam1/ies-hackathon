const schedule = [
  { time: '10:00 AM', event: 'Welcome Address', speaker: 'IES Unilag Chair', type: 'ceremony' },
  { time: '10:20 AM', event: 'Address', speaker: 'IEEE IES Nigeria Chair', type: 'ceremony' },
  { time: '10:40 AM', event: 'Address', speaker: 'Council Lead', type: 'ceremony' },
  { time: '11:00 AM', event: 'Keynote Address', speaker: 'Industry Leader', type: 'keynote' },
  { time: '11:40 AM', event: 'Industry Talks', speaker: 'Hardware Practitioners', type: 'keynote' },
  { time: '12:30 PM', event: 'Student Project Showcases', speaker: 'Participant Teams', type: 'competition' },
  { time: '02:00 PM', event: 'Mini Hardware Competition', speaker: 'All Competing Teams', type: 'competition' },
  { time: '04:00 PM', event: 'Audience Q&A', speaker: 'Speakers & Distinguished Guests', type: 'panel' },
  { time: '05:00 PM', event: 'Student Panel Session', speaker: 'Hardware-Focused Students', type: 'panel' },
  { time: '06:30 PM', event: 'Prototype Presentations', speaker: 'Research Teams', type: 'competition' },
  { time: '00:00 AM', event: 'Midnight Movie Break', speaker: 'All Attendees', type: 'social' },
  { time: '10:00 AM', event: 'Awards & Certificate Ceremony', speaker: 'IES Unilag Committee', type: 'ceremony' },
]

const typeColors = {
  ceremony: '#00629B',
  keynote: '#E87722',
  competition: '#00A3E0',
  panel: '#7B5EA7',
  social: '#2E8B57',
}

const typeLabels = {
  ceremony: 'CEREMONY',
  keynote: 'KEYNOTE',
  competition: 'COMPETITION',
  panel: 'PANEL',
  social: 'SOCIAL',
}

export default function ScheduleSection() {
  return (
    <section id="schedule" style={{
      position: 'relative',
      padding: '100px 5%',
      zIndex: 2,
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{
            fontFamily: 'Share Tech Mono, monospace',
            fontSize: '0.72rem',
            letterSpacing: '0.3em',
            color: '#E87722',
            marginBottom: '12px',
          }}>
            // EVENT_SCHEDULE.log
          </div>
          <h2 style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            fontWeight: 700,
            color: '#fff',
          }}>
            Event{' '}
            <span style={{ color: '#00A3E0', textShadow: '0 0 30px rgba(0,163,224,0.5)' }}>
              Schedule
            </span>
          </h2>
          <p style={{
            fontFamily: 'Share Tech Mono, monospace',
            fontSize: '0.8rem',
            color: 'rgba(255,255,255,0.4)',
            marginTop: '12px',
            letterSpacing: '0.1em',
          }}>April 13–14, 2026 · University of Lagos</p>
        </div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {/* Vertical line */}
          <div style={{
            position: 'absolute',
            left: '140px',
            top: 0, bottom: 0,
            width: '1px',
            background: 'linear-gradient(to bottom, transparent, rgba(0,98,155,0.4) 10%, rgba(0,98,155,0.4) 90%, transparent)',
          }} />

          {schedule.map((item, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0',
              marginBottom: '20px',
              position: 'relative',
            }}>
              {/* Time */}
              <div style={{
                width: '130px',
                flexShrink: 0,
                textAlign: 'right',
                paddingRight: '20px',
                paddingTop: '14px',
              }}>
                <span style={{
                  fontFamily: 'Share Tech Mono, monospace',
                  fontSize: '0.78rem',
                  color: 'rgba(255,255,255,0.4)',
                  letterSpacing: '0.05em',
                }}>{item.time}</span>
              </div>

              {/* Dot */}
              <div style={{
                position: 'absolute',
                left: '134px',
                top: '18px',
                width: '13px',
                height: '13px',
                background: typeColors[item.type],
                borderRadius: '50%',
                border: '2px solid rgba(5,8,16,1)',
                boxShadow: `0 0 10px ${typeColors[item.type]}80`,
                flexShrink: 0,
                zIndex: 2,
              }} />

              {/* Card */}
              <div style={{
                marginLeft: '32px',
                flex: 1,
                background: 'rgba(10,14,26,0.6)',
                border: `1px solid ${typeColors[item.type]}25`,
                borderRadius: '6px',
                padding: '14px 20px',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = `${typeColors[item.type]}60`
                e.currentTarget.style.background = 'rgba(10,14,26,0.85)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = `${typeColors[item.type]}25`
                e.currentTarget.style.background = 'rgba(10,14,26,0.6)'
              }}
              >
                <div style={{
                  position: 'absolute',
                  left: 0, top: 0, bottom: 0,
                  width: '3px',
                  background: typeColors[item.type],
                }} />

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  <span style={{
                    fontFamily: 'Rajdhani, sans-serif',
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    color: '#fff',
                    letterSpacing: '0.03em',
                  }}>{item.event}</span>
                  <span style={{
                    fontFamily: 'Share Tech Mono, monospace',
                    fontSize: '0.58rem',
                    letterSpacing: '0.15em',
                    color: typeColors[item.type],
                    background: `${typeColors[item.type]}18`,
                    border: `1px solid ${typeColors[item.type]}30`,
                    padding: '2px 7px',
                    borderRadius: '3px',
                  }}>{typeLabels[item.type]}</span>
                </div>
                <div style={{
                  fontFamily: 'Share Tech Mono, monospace',
                  fontSize: '0.72rem',
                  color: 'rgba(255,255,255,0.4)',
                  marginTop: '4px',
                  letterSpacing: '0.05em',
                }}>{item.speaker}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile note */}
        <style>{`
          @media (max-width: 500px) {
            #schedule-timeline { padding-left: 0 !important; }
          }
        `}</style>
      </div>
    </section>
  )
}
