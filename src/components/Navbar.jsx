import { useState, useEffect } from 'react'

const links = ['About', 'Mission', 'Conference', 'Gallery', 'Events', 'Register']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    setMenuOpen(false)
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 1000,
      padding: '0 5%',
      height: '64px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: scrolled
        ? 'rgba(5, 8, 16, 0.92)'
        : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(232,119,34,0.15)' : '1px solid transparent',
      transition: 'all 0.3s ease',
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
           onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <div style={{
          width: '32px',
          height: '32px',
          background: 'linear-gradient(135deg, #E87722, #00629B)',
          borderRadius: '4px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Orbitron, sans-serif',
          fontSize: '10px',
          fontWeight: 900,
          color: '#fff',
          letterSpacing: '-0.5px',
          flexShrink: 0,
        }}>IES</div>
        <div>
          <div style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: '0.85rem',
            fontWeight: 700,
            color: '#fff',
            letterSpacing: '0.1em',
            lineHeight: 1,
          }}>BUILD-A-THON</div>
          <div style={{
            fontFamily: 'Share Tech Mono, monospace',
            fontSize: '0.6rem',
            color: 'rgba(0,163,224,0.7)',
            letterSpacing: '0.15em',
          }}>IEEE IES UNILAG · 2026</div>
        </div>
      </div>

      {/* Desktop links */}
      <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}
           className="desktop-nav">
        {links.map(link => (
          <button key={link}
            onClick={() => scrollTo(link)}
            style={{
              background: 'none',
              border: 'none',
              color: link === 'Register' ? '#E87722' : 'rgba(255,255,255,0.75)',
              fontFamily: 'Rajdhani, sans-serif',
              fontSize: '0.95rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              cursor: 'pointer',
              textTransform: 'uppercase',
              padding: link === 'Register' ? '8px 18px' : '8px 0',
              border: link === 'Register' ? '1px solid rgba(232,119,34,0.6)' : 'none',
              borderRadius: link === 'Register' ? '4px' : '0',
              background: link === 'Register' ? 'rgba(232,119,34,0.1)' : 'none',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              if (link !== 'Register') e.target.style.color = '#E87722'
            }}
            onMouseLeave={e => {
              if (link !== 'Register') e.target.style.color = 'rgba(255,255,255,0.75)'
            }}
          >
            {link}
          </button>
        ))}
      </div>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          display: 'none',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '4px',
          color: '#E87722',
        }}
        className="hamburger"
      >
        <div style={{ width: '24px', height: '2px', background: menuOpen ? 'transparent' : '#E87722', marginBottom: '5px', transition: 'all 0.2s' }} />
        <div style={{ width: '24px', height: '2px', background: '#E87722', marginBottom: '5px', transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none', transition: 'all 0.2s' }} />
        <div style={{ width: '24px', height: '2px', background: '#E87722', transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none', transition: 'all 0.2s' }} />
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'absolute',
          top: '64px', left: 0, right: 0,
          background: 'rgba(5,8,16,0.97)',
          borderBottom: '1px solid rgba(232,119,34,0.2)',
          padding: '20px 5%',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}>
          {links.map(link => (
            <button key={link}
              onClick={() => scrollTo(link)}
              style={{
                background: 'none',
                border: 'none',
                color: link === 'Register' ? '#E87722' : 'rgba(255,255,255,0.8)',
                fontFamily: 'Rajdhani, sans-serif',
                fontSize: '1.1rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                cursor: 'pointer',
                textTransform: 'uppercase',
                textAlign: 'left',
                padding: '4px 0',
              }}
            >{link}</button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: block !important; }
        }
      `}</style>
    </nav>
  )
}
