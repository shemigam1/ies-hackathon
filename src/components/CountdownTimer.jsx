import { useState, useEffect } from 'react'

const TARGET = new Date('2026-04-13T10:00:00+01:00')

function pad(n) {
  return String(Math.max(0, n)).padStart(2, '0')
}

function getTimeLeft() {
  const diff = TARGET - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  const days = Math.floor(diff / 86400000)
  const hours = Math.floor((diff % 86400000) / 3600000)
  const minutes = Math.floor((diff % 3600000) / 60000)
  const seconds = Math.floor((diff % 60000) / 1000)
  return { days, hours, minutes, seconds }
}

function Digit({ value, label }) {
  return (
    <div style={{ textAlign: 'center', position: 'relative' }}>
      {/* Outer card */}
      <div className="countdown-digit" style={{
        position: 'relative',
        background: 'linear-gradient(145deg, rgba(10,14,26,0.95) 0%, rgba(5,8,16,0.98) 100%)',
        border: '1px solid rgba(232, 119, 34, 0.3)',
        borderRadius: '8px',
        padding: '16px 8px',
        minWidth: '80px',
        overflow: 'hidden',
        boxShadow: '0 0 20px rgba(232,119,34,0.15), inset 0 1px 0 rgba(255,255,255,0.05)',
      }}>
        {/* Top reflection */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(232,119,34,0.5), transparent)',
        }} />

        {/* Separator line (flip-clock style) */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: 0, right: 0,
          height: '1px',
          background: 'rgba(0,0,0,0.8)',
          zIndex: 2,
        }} />

        {/* Number */}
        <span style={{
          fontFamily: 'Orbitron, sans-serif',
          fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
          fontWeight: 900,
          color: '#E87722',
          lineHeight: 1,
          display: 'block',
          textShadow: '0 0 20px rgba(232,119,34,0.8), 0 0 40px rgba(232,119,34,0.4)',
          letterSpacing: '0.05em',
        }}>
          {pad(value)}
        </span>

        {/* Corner accents */}
        <div style={{
          position: 'absolute', top: '4px', left: '4px',
          width: '8px', height: '8px',
          borderTop: '1px solid rgba(232,119,34,0.5)',
          borderLeft: '1px solid rgba(232,119,34,0.5)',
        }} />
        <div style={{
          position: 'absolute', top: '4px', right: '4px',
          width: '8px', height: '8px',
          borderTop: '1px solid rgba(232,119,34,0.5)',
          borderRight: '1px solid rgba(232,119,34,0.5)',
        }} />
        <div style={{
          position: 'absolute', bottom: '4px', left: '4px',
          width: '8px', height: '8px',
          borderBottom: '1px solid rgba(232,119,34,0.5)',
          borderLeft: '1px solid rgba(232,119,34,0.5)',
        }} />
        <div style={{
          position: 'absolute', bottom: '4px', right: '4px',
          width: '8px', height: '8px',
          borderBottom: '1px solid rgba(232,119,34,0.5)',
          borderRight: '1px solid rgba(232,119,34,0.5)',
        }} />
      </div>

      {/* Label */}
      <div style={{
        marginTop: '10px',
        fontFamily: 'Share Tech Mono, monospace',
        fontSize: '0.7rem',
        letterSpacing: '0.2em',
        color: 'rgba(0, 163, 224, 0.8)',
        textTransform: 'uppercase',
      }}>
        {label}
      </div>
    </div>
  )
}

export default function CountdownTimer() {
  const [time, setTime] = useState(getTimeLeft())

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{ width: '100%' }}>
      {/* Label */}
      <div style={{
        textAlign: 'center',
        fontFamily: 'Share Tech Mono, monospace',
        fontSize: '0.75rem',
        letterSpacing: '0.3em',
        color: 'rgba(0, 163, 224, 0.7)',
        marginBottom: '24px',
      }}>
        &gt; INITIATING_IN
      </div>

      {/* Digits row */}
      <style>{`
        @media (max-width: 480px) {
          .countdown-digit { min-width: 58px !important; padding: 10px 4px !important; }
          .countdown-colon { font-size: 1.2rem !important; margin-bottom: 16px !important; }
          .countdown-row { gap: 6px !important; }
        }
      `}</style>
      <div className="countdown-row" style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '12px',
        flexWrap: 'nowrap',
      }}>
        <Digit value={time.days} label="DAYS" />

        <span className="countdown-colon" style={{
          fontFamily: 'Orbitron, sans-serif',
          fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
          color: 'rgba(232,119,34,0.5)',
          marginBottom: '24px',
          fontWeight: 700,
        }}>:</span>

        <Digit value={time.hours} label="HOURS" />

        <span className="countdown-colon" style={{
          fontFamily: 'Orbitron, sans-serif',
          fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
          color: 'rgba(232,119,34,0.5)',
          marginBottom: '24px',
          fontWeight: 700,
        }}>:</span>

        <Digit value={time.minutes} label="MINUTES" />

        <span className="countdown-colon" style={{
          fontFamily: 'Orbitron, sans-serif',
          fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
          color: 'rgba(232,119,34,0.5)',
          marginBottom: '24px',
          fontWeight: 700,
        }}>:</span>

        <Digit value={time.seconds} label="SECONDS" />
      </div>
    </div>
  )
}
