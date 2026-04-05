import OscilloscopeWave from './OscilloscopeWave'

const REGISTER_URL = 'https://forms.gle/4huXnFbS8ZMHSmDx8'

export default function RegisterSection() {
  return (
    <section id="register" style={{
      position: 'relative',
      zIndex: 2,
      overflow: 'hidden',
    }}>
      {/* Top wave */}
      <div style={{ opacity: 0.3 }}>
        <OscilloscopeWave height={60} color="#00629B" />
      </div>

      <div style={{
        background: 'rgba(10,14,26,0.85)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(0,98,155,0.2)',
        padding: '100px 5%',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Radial glow */}
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '700px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(232,119,34,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}>
          {/* Label */}
          <div style={{
            fontFamily: 'Share Tech Mono, monospace',
            fontSize: '0.72rem',
            letterSpacing: '0.3em',
            color: '#E87722',
            marginBottom: '16px',
          }}>
            // REGISTER_NOW.exe
          </div>

          <h2 style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 900,
            color: '#fff',
            lineHeight: 1.1,
            marginBottom: '20px',
          }}>
            Ready to{' '}
            <span style={{
              color: '#E87722',
              textShadow: '0 0 40px rgba(232,119,34,0.6), 0 0 80px rgba(232,119,34,0.3)',
            }}>Build?</span>
          </h2>

          <p style={{
            fontFamily: 'Rajdhani, sans-serif',
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: 'rgba(255,255,255,0.6)',
            lineHeight: 1.7,
            maxWidth: '560px',
            margin: '0 auto 48px',
            fontWeight: 400,
          }}>
            Spots are limited for builders. Spectators can walk in — no registration needed.
            Secure your builder spot now.
          </p>

          {/* Info cards */}
          <style>{`
            .reg-cards { display: flex; flex-wrap: wrap; gap: 20px; justify-content: center; margin-bottom: 48px; }
            .reg-card { flex: 1 1 140px; max-width: 200px; }
            @media (max-width: 480px) {
              .reg-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
              .reg-card { max-width: none; }
            }
          `}</style>
          <div className="reg-cards">
            {[
              { label: 'Date', value: 'April 13–14, 2026', icon: '📅' },
              { label: 'Time', value: '10:00 AM Kickoff', icon: '⏰' },
              { label: 'Venue', value: 'University of Lagos', icon: '📍' },
              { label: 'Entry', value: 'Free for Spectators', icon: '🎟️' },
            ].map(item => (
              <div key={item.label} className="reg-card" style={{
                background: 'rgba(0,98,155,0.08)',
                border: '1px solid rgba(0,163,224,0.15)',
                borderRadius: '8px',
                padding: '16px 20px',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '1.3rem', marginBottom: '6px' }}>{item.icon}</div>
                <div style={{
                  fontFamily: 'Share Tech Mono, monospace',
                  fontSize: '0.62rem',
                  letterSpacing: '0.15em',
                  color: 'rgba(0,163,224,0.6)',
                  marginBottom: '4px',
                  textTransform: 'uppercase',
                }}>{item.label}</div>
                <div style={{
                  fontFamily: 'Rajdhani, sans-serif',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  color: '#fff',
                  letterSpacing: '0.03em',
                }}>{item.value}</div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <style>{`.reg-cta { display: inline-block; } @media (max-width: 480px) { .reg-cta { display: block !important; text-align: center; } }`}</style>
          <a
            href={REGISTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="reg-cta"
            style={{
              display: 'inline-block',
              fontFamily: 'Orbitron, sans-serif',
              fontSize: '0.9rem',
              fontWeight: 700,
              letterSpacing: '0.15em',
              color: '#0A0E1A',
              background: 'linear-gradient(135deg, #E87722 0%, #d4651a 100%)',
              textDecoration: 'none',
              border: 'none',
              borderRadius: '4px',
              padding: '18px 48px',
              cursor: 'pointer',
              textTransform: 'uppercase',
              boxShadow: '0 0 40px rgba(232,119,34,0.5), 0 8px 20px rgba(232,119,34,0.2)',
              transition: 'all 0.25s',
              position: 'relative',
              overflow: 'hidden',
              marginBottom: '20px',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = '0 0 70px rgba(232,119,34,0.8), 0 12px 30px rgba(232,119,34,0.4)'
              e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = '0 0 40px rgba(232,119,34,0.5), 0 8px 20px rgba(232,119,34,0.2)'
              e.currentTarget.style.transform = 'translateY(0) scale(1)'
            }}
          >
            Register Now →
          </a>

          <p style={{
            fontFamily: 'Share Tech Mono, monospace',
            fontSize: '0.65rem',
            color: 'rgba(255,255,255,0.3)',
            letterSpacing: '0.1em',
            marginTop: '16px',
          }}>
            SPECTATORS_WELCOME · NO_TICKET_REQUIRED · OPEN_VIEWING
          </p>
        </div>
      </div>
    </section>
  )
}
