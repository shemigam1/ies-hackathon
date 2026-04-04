export default function Footer() {
  return (
    <footer style={{
      position: 'relative',
      zIndex: 2,
      padding: '40px 5%',
      borderTop: '1px solid rgba(0,98,155,0.2)',
      background: 'rgba(5,8,16,0.9)',
    }}>
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '24px',
      }}>
        {/* Logo/Brand */}
        <div>
          <div style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: '0.85rem',
            fontWeight: 700,
            color: '#fff',
            letterSpacing: '0.1em',
            marginBottom: '4px',
          }}>IEEE IES UNILAG</div>
          <div style={{
            fontFamily: 'Share Tech Mono, monospace',
            fontSize: '0.65rem',
            color: 'rgba(0,163,224,0.5)',
            letterSpacing: '0.15em',
          }}>Industrial Electronics Society · University of Lagos</div>
        </div>

        {/* Center text */}
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontFamily: 'Share Tech Mono, monospace',
            fontSize: '0.65rem',
            color: 'rgba(255,255,255,0.25)',
            letterSpacing: '0.1em',
          }}>
            BUILD-A-THON 2026 · APR 13–14 · UNILAG
          </div>
          <div style={{
            fontFamily: 'Share Tech Mono, monospace',
            fontSize: '0.6rem',
            color: 'rgba(255,255,255,0.15)',
            marginTop: '4px',
            letterSpacing: '0.05em',
          }}>
            24H NON-STOP BUILDING
          </div>
        </div>

        {/* Social link */}
        <div>
          <a
            href="https://www.linkedin.com/company/ies-unilag"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: 'rgba(0,163,224,0.6)',
              textDecoration: 'none',
              fontFamily: 'Share Tech Mono, monospace',
              fontSize: '0.7rem',
              letterSpacing: '0.1em',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#00A3E0'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(0,163,224,0.6)'}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
              <rect x="2" y="9" width="4" height="12"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
            IES UNILAG
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        maxWidth: '1100px',
        margin: '24px auto 0',
        paddingTop: '20px',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        textAlign: 'center',
      }}>
        <div style={{
          fontFamily: 'Share Tech Mono, monospace',
          fontSize: '0.58rem',
          color: 'rgba(255,255,255,0.15)',
          letterSpacing: '0.1em',
        }}>
          © 2026 IEEE IES UNILAG · ALL RIGHTS RESERVED
        </div>
      </div>
    </footer>
  )
}
