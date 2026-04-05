import { useEffect, useRef, useState, useMemo } from 'react'
import CountdownTimer from './CountdownTimer'
import OscilloscopeWave from './OscilloscopeWave'

// Replicates ieee-website SplitLine — each char animates up from a clipped overflow
function SplitLine({ text, color = '#ffffff', delay = 0 }) {
  const chars = useMemo(() => Array.from(text), [text])
  return (
    <div style={{ overflow: 'hidden', lineHeight: 0.95 }}>
      <div style={{ display: 'inline' }}>
        {chars.map((char, i) => (
          <span
            key={i}
            style={{
              display: 'inline-block',
              color,
              animation: `splitCharIn 0.7s cubic-bezier(0.16,1,0.3,1) both`,
              animationDelay: `${delay + i * 0.028}s`,
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes splitCharIn {
          from { transform: translateY(110%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
      `}</style>
    </div>
  )
}

function GlitchText({ text, style = {} }) {
  const [glitch, setGlitch] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true)
      setTimeout(() => setGlitch(false), 150)
    }, 4000 + Math.random() * 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <span style={{ position: 'relative', display: 'inline-block', ...style }}>
      {text}
      {glitch && (
        <>
          <span style={{
            position: 'absolute',
            top: 0, left: '2px',
            color: '#00A3E0',
            clipPath: 'polygon(0 30%, 100% 30%, 100% 50%, 0 50%)',
            opacity: 0.8,
          }}>{text}</span>
          <span style={{
            position: 'absolute',
            top: 0, left: '-2px',
            color: '#E87722',
            clipPath: 'polygon(0 60%, 100% 60%, 100% 75%, 0 75%)',
            opacity: 0.8,
          }}>{text}</span>
        </>
      )}
    </span>
  )
}

function TypingText({ text, speed = 60, delay = 0 }) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(timeout)
  }, [delay])

  useEffect(() => {
    if (!started) return
    let i = 0
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1))
      i++
      if (i >= text.length) clearInterval(interval)
    }, speed)
    return () => clearInterval(interval)
  }, [started, text, speed])

  return (
    <span style={{ fontFamily: 'Share Tech Mono, monospace' }}>
      {displayed}
      {displayed.length < text.length && (
        <span style={{ animation: 'blink 1s step-end infinite', color: '#E87722' }}>_</span>
      )}
      <style>{`@keyframes blink { 50% { opacity: 0 } }`}</style>
    </span>
  )
}

export default function HeroSection() {
  const scrollRef = useRef(null)

  const scrollToRegister = () => {
    document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '100px 5% 60px',
      overflow: 'hidden',
    }}>
      {/* Grid overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(0,98,155,0.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,98,155,0.06) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        zIndex: 1,
      }} />

      {/* Radial glow center */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '800px',
        height: '800px',
        background: 'radial-gradient(ellipse, rgba(232,119,34,0.08) 0%, rgba(0,98,155,0.05) 40%, transparent 70%)',
        zIndex: 1,
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: '900px', textAlign: 'center' }}>
        {/* Event badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(0,98,155,0.15)',
          border: '1px solid rgba(0,163,224,0.3)',
          borderRadius: '24px',
          padding: '6px 16px',
          marginBottom: '32px',
        }}>
          <div style={{
            width: '8px', height: '8px',
            borderRadius: '50%',
            background: '#E87722',
            boxShadow: '0 0 8px #E87722',
            animation: 'pulse-dot 2s ease-in-out infinite',
          }} />
          <style>{`@keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.6;transform:scale(1.3)} }`}</style>
          <span style={{
            fontFamily: 'Share Tech Mono, monospace',
            fontSize: '0.72rem',
            letterSpacing: '0.2em',
            color: 'rgba(0,163,224,0.9)',
          }}>
            IEEE IES UNILAG · APR 13–14, 2026
          </span>
        </div>

        {/* Main headline — SplitLine char animation */}
        <h1 style={{
          fontFamily: 'Orbitron, sans-serif',
          fontSize: 'clamp(3.5rem, 12vw, 8rem)',
          fontWeight: 900,
          letterSpacing: '-0.02em',
          marginBottom: '8px',
          textShadow: '0 0 60px rgba(232,119,34,0.2)',
        }}>
          <SplitLine text="BUILD" color="#ffffff" delay={0.1} />
        </h1>
        <h1 style={{
          fontFamily: 'Orbitron, sans-serif',
          fontSize: 'clamp(3.5rem, 12vw, 8rem)',
          fontWeight: 900,
          letterSpacing: '-0.02em',
          marginBottom: '24px',
          textShadow: '0 0 40px rgba(232,119,34,0.5), 0 0 80px rgba(232,119,34,0.2)',
        }}>
          <SplitLine text="A-THON" color="#E87722" delay={0.28} />
        </h1>

        {/* Subtitle */}
        <p style={{
          fontFamily: 'Share Tech Mono, monospace',
          fontSize: 'clamp(0.8rem, 2vw, 1rem)',
          color: 'rgba(0, 163, 224, 0.85)',
          letterSpacing: '0.15em',
          marginBottom: '16px',
          minHeight: '1.5em',
        }}>
          <TypingText text="> 24_HOURS · NO_CONSTRAINTS · JUST_BUILD" speed={40} delay={400} />
        </p>

        <p style={{
          fontFamily: 'Rajdhani, sans-serif',
          fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
          color: 'rgba(255,255,255,0.65)',
          maxWidth: '580px',
          margin: '0 auto 48px',
          lineHeight: 1.6,
          fontWeight: 400,
        }}>
          A time to just build. Let your mind run wild — no constraints, no pressure.
          What will you create?
        </p>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '64px' }}>
          <button
            onClick={scrollToRegister}
            style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '0.15em',
              color: '#0A0E1A',
              background: 'linear-gradient(135deg, #E87722, #d4651a)',
              border: 'none',
              borderRadius: '4px',
              padding: '14px 32px',
              cursor: 'pointer',
              textTransform: 'uppercase',
              boxShadow: '0 0 30px rgba(232,119,34,0.4)',
              transition: 'all 0.2s',
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = '0 0 50px rgba(232,119,34,0.7)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = '0 0 30px rgba(232,119,34,0.4)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            Register Now
          </button>
          <button
            onClick={scrollToAbout}
            style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '0.15em',
              color: 'rgba(255,255,255,0.8)',
              background: 'transparent',
              border: '1px solid rgba(0,163,224,0.4)',
              borderRadius: '4px',
              padding: '14px 32px',
              cursor: 'pointer',
              textTransform: 'uppercase',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(0,163,224,0.8)'
              e.currentTarget.style.color = '#00A3E0'
              e.currentTarget.style.boxShadow = '0 0 20px rgba(0,163,224,0.2)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(0,163,224,0.4)'
              e.currentTarget.style.color = 'rgba(255,255,255,0.8)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            Learn More
          </button>
        </div>

        {/* Countdown */}
        <CountdownTimer />
      </div>

      {/* Bottom oscilloscope wave */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        zIndex: 2,
        opacity: 0.4,
      }}>
        <OscilloscopeWave height={80} color="#00629B" />
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
        cursor: 'pointer',
        opacity: 0.5,
        animation: 'bounce 2s ease-in-out infinite',
      }}
      onClick={scrollToAbout}>
        <style>{`@keyframes bounce { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(8px)} }`}</style>
        <div style={{
          width: '20px', height: '30px',
          border: '1px solid rgba(255,255,255,0.3)',
          borderRadius: '10px',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute',
            top: '4px', left: '50%',
            width: '3px', height: '6px',
            background: '#E87722',
            borderRadius: '2px',
            transform: 'translateX(-50%)',
            animation: 'scroll-dot 1.5s ease-in-out infinite',
          }} />
          <style>{`@keyframes scroll-dot { 0%{top:4px;opacity:1} 100%{top:16px;opacity:0} }`}</style>
        </div>
      </div>
    </section>
  )
}
