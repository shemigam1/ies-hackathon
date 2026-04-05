import { useEffect, useRef, useState } from 'react'

// ── Canvas: microcontroller assembly animation ────────────────────────────
function MCUCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const W = canvas.width
    const H = canvas.height
    let frame = 0
    let animId

    // MCU board dimensions (centred)
    const bx = W / 2 - 60
    const by = H / 2 - 40
    const bw = 120
    const bh = 80

    // Pin definitions: { side, idx, total, label }
    const PINS = [
      ...[...Array(10)].map((_, i) => ({ side: 'left',   idx: i, total: 10, label: i < 5 ? `D${i}` : `A${i-5}` })),
      ...[...Array(10)].map((_, i) => ({ side: 'right',  idx: i, total: 10, label: i < 5 ? `D${i+5}` : `A${i-5}` })),
      ...[...Array(6)].map((_,  i) => ({ side: 'top',    idx: i, total: 6,  label: ['VCC','GND','RST','TX','RX','SCL'][i] })),
      ...[...Array(4)].map((_,  i) => ({ side: 'bottom', idx: i, total: 4,  label: ['SDA','3V3','5V','GND'][i] })),
    ]

    const pinPos = (p) => {
      const pad = 12
      if (p.side === 'left')   return { x: bx,      y: by + pad + (bh - 2*pad) * p.idx / (p.total - 1) }
      if (p.side === 'right')  return { x: bx + bw, y: by + pad + (bh - 2*pad) * p.idx / (p.total - 1) }
      if (p.side === 'top')    return { x: bx + pad + (bw - 2*pad) * p.idx / (p.total - 1), y: by }
      return                          { x: bx + pad + (bw - 2*pad) * p.idx / (p.total - 1), y: by + bh }
    }

    const pinDir = (p) => {
      if (p.side === 'left')   return { dx: -1, dy: 0 }
      if (p.side === 'right')  return { dx:  1, dy: 0 }
      if (p.side === 'top')    return { dx:  0, dy: -1 }
      return                          { dx:  0, dy:  1 }
    }

    // Traces: random wires from pins outward
    const TRACES = PINS.slice(0, 14).map((p, i) => {
      const pos = pinPos(p)
      const dir = pinDir(p)
      const len = 20 + (i % 5) * 8
      return {
        x1: pos.x, y1: pos.y,
        x2: pos.x + dir.dx * len,
        y2: pos.y + dir.dy * len,
        delay: i * 4,
        color: i % 3 === 0 ? '#E87722' : i % 3 === 1 ? '#00A3E0' : '#00FF88',
      }
    })

    // Pulse particles on traces
    const pulses = TRACES.map(t => ({ t: Math.random(), trace: t, speed: 0.004 + Math.random() * 0.003 }))

    function draw() {
      ctx.clearRect(0, 0, W, H)

      // ── PCB board body ──
      ctx.save()
      ctx.shadowColor = 'rgba(0,163,224,0.3)'
      ctx.shadowBlur = 18
      ctx.fillStyle = '#0F2918'
      ctx.strokeStyle = 'rgba(0,255,136,0.4)'
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.roundRect(bx, by, bw, bh, 6)
      ctx.fill()
      ctx.stroke()
      ctx.restore()

      // ── Chip label ──
      ctx.font = '600 7px "Share Tech Mono", monospace'
      ctx.fillStyle = 'rgba(0,255,136,0.7)'
      ctx.textAlign = 'center'
      ctx.fillText('ATmega328P', W / 2, H / 2 - 6)
      ctx.fillStyle = 'rgba(255,255,255,0.25)'
      ctx.fillText('IES · BUILD', W / 2, H / 2 + 6)

      // ── Traces ──
      TRACES.forEach(t => {
        const drawProgress = Math.min(1, (frame - t.delay) / 30)
        if (drawProgress <= 0) return
        const ex = t.x1 + (t.x2 - t.x1) * drawProgress
        const ey = t.y1 + (t.y2 - t.y1) * drawProgress
        ctx.save()
        ctx.shadowColor = t.color
        ctx.shadowBlur = 4
        ctx.strokeStyle = t.color + '60'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(t.x1, t.y1)
        ctx.lineTo(ex, ey)
        ctx.stroke()
        ctx.restore()
      })

      // ── Pins ──
      PINS.forEach(p => {
        const pos = pinPos(p)
        ctx.fillStyle = 'rgba(0,255,136,0.6)'
        ctx.fillRect(pos.x - 1.5, pos.y - 1.5, 3, 3)
      })

      // ── Pulse particles ──
      pulses.forEach(pu => {
        const t = pu.trace
        const drawProgress = Math.min(1, (frame - t.delay) / 30)
        if (drawProgress <= 0) return
        const px = t.x1 + (t.x2 - t.x1) * pu.t
        const py = t.y1 + (t.y2 - t.y1) * pu.t
        ctx.save()
        ctx.shadowColor = t.color
        ctx.shadowBlur = 8
        ctx.fillStyle = t.color
        ctx.beginPath()
        ctx.arc(px, py, 2, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
        pu.t = (pu.t + pu.speed) % 1
      })

      // ── LED blink (top-right of board) ──
      const ledOn = Math.sin(frame * 0.12) > 0
      ctx.save()
      ctx.shadowColor = ledOn ? '#00FF88' : 'transparent'
      ctx.shadowBlur = ledOn ? 12 : 0
      ctx.fillStyle = ledOn ? '#00FF88' : '#003322'
      ctx.beginPath()
      ctx.arc(bx + bw - 10, by + 10, 3.5, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()

      frame++
      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      width={260}
      height={180}
      style={{ display: 'block' }}
    />
  )
}

// ── Loading screen ─────────────────────────────────────────────────────────
export default function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    // Simulate assembly progress
    const steps = [
      { target: 15,  delay: 0   },
      { target: 35,  delay: 400 },
      { target: 60,  delay: 900 },
      { target: 80,  delay: 1400 },
      { target: 95,  delay: 1900 },
      { target: 100, delay: 2400 },
    ]

    const timers = steps.map(s =>
      setTimeout(() => setProgress(s.target), s.delay)
    )

    const doneTimer = setTimeout(() => {
      setLeaving(true)
      setTimeout(onDone, 600)
    }, 3200)

    return () => { timers.forEach(clearTimeout); clearTimeout(doneTimer) }
  }, [onDone])

  const STEPS = [
    'Initialising board...',
    'Flashing firmware...',
    'Mounting components...',
    'Calibrating sensors...',
    'System ready.',
  ]
  const stepIndex = Math.min(STEPS.length - 1, Math.floor(progress / 20))

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      opacity: leaving ? 0 : 1,
      transition: 'opacity 0.6s ease',
      pointerEvents: leaving ? 'none' : 'all',
    }}>

      {/* Background photo */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url(/loading-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
        filter: 'brightness(0.22) saturate(0.6)',
      }} />

      {/* Dark gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(5,8,16,0.5) 0%, rgba(5,8,16,0.15) 40%, rgba(5,8,16,0.7) 100%)',
      }} />

      {/* Content */}
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '28px' }}>

        {/* MCU canvas */}
        <div style={{
          borderRadius: '16px',
          border: '1px solid rgba(0,255,136,0.15)',
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(8px)',
          padding: '20px',
          boxShadow: '0 0 40px rgba(0,163,224,0.12)',
        }}>
          <MCUCanvas />
        </div>

        {/* Logo + title */}
        <div style={{ textAlign: 'center' }}>
          <p style={{
            fontFamily: 'Share Tech Mono, monospace',
            fontSize: '0.6rem',
            letterSpacing: '0.4em',
            color: '#00A3E0',
            textTransform: 'uppercase',
            marginBottom: '8px',
          }}>IEEE IES UNILAG</p>
          <p style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: 'clamp(1.4rem, 3vw, 2rem)',
            fontWeight: 900,
            color: '#fff',
            letterSpacing: '0.12em',
          }}>BUILD-A-THON</p>
          <p style={{
            fontFamily: 'Share Tech Mono, monospace',
            fontSize: '0.62rem',
            letterSpacing: '0.25em',
            color: 'rgba(255,255,255,0.3)',
            marginTop: '6px',
          }}>APRIL 13–14, 2026</p>
        </div>

        {/* Progress bar */}
        <div style={{ width: '260px' }}>
          <div style={{ height: '2px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #00629B, #E87722)',
              borderRadius: '2px',
              transition: 'width 0.5s cubic-bezier(0.16,1,0.3,1)',
              boxShadow: '0 0 8px rgba(232,119,34,0.6)',
            }} />
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '8px',
          }}>
            <span style={{
              fontFamily: 'Share Tech Mono, monospace',
              fontSize: '0.58rem',
              color: 'rgba(255,255,255,0.4)',
              letterSpacing: '0.05em',
            }}>{STEPS[stepIndex]}</span>
            <span style={{
              fontFamily: 'Share Tech Mono, monospace',
              fontSize: '0.58rem',
              color: '#E87722',
              letterSpacing: '0.05em',
            }}>{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
