import ArduinoCircuit from './ArduinoCircuit'

const specs = [
  { label: 'Microcontroller', value: 'ATmega328P / ESP32', icon: '🔲' },
  { label: 'Clock Speed', value: '16 MHz / 240 MHz', icon: '⚡' },
  { label: 'Flash Memory', value: '32 KB / 4 MB', icon: '💾' },
  { label: 'I/O Pins', value: '14 Digital + 6 Analog', icon: '🔌' },
  { label: 'Connectivity', value: 'WiFi + Bluetooth (ESP32)', icon: '📡' },
  { label: 'Voltage', value: '3.3V / 5V Logic', icon: '🔋' },
]

export default function ArduinoSection() {
  return (
    <section style={{
      position: 'relative',
      padding: '80px 5%',
      zIndex: 2,
      overflow: 'hidden',
    }}>
      {/* Green PCB tint overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 50% 50%, rgba(15,76,30,0.18) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div style={{
            fontFamily: 'Share Tech Mono, monospace',
            fontSize: '0.72rem',
            letterSpacing: '0.3em',
            color: '#00FF88',
            marginBottom: '12px',
          }}>
            // HARDWARE_BENCH.ino
          </div>
          <h2 style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            fontWeight: 700,
            color: '#fff',
            marginBottom: '16px',
          }}>
            Build with{' '}
            <span style={{ color: '#00FF88', textShadow: '0 0 30px rgba(0,255,136,0.5)' }}>
              Real Hardware
            </span>
          </h2>
          <p style={{
            fontFamily: 'Rajdhani, sans-serif',
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            color: 'rgba(255,255,255,0.55)',
            maxWidth: '560px',
            margin: '0 auto',
            lineHeight: 1.7,
            fontWeight: 400,
          }}>
            You'll get real components — Arduinos, ESP32s, sensors, resistors, capacitors, LEDs,
            and more. What you build with them is entirely up to you.
          </p>
        </div>

        {/* Main layout: circuit left, specs right */}
        <div id="arduino-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)',
          gap: '40px',
          alignItems: 'center',
        }}>
          {/* Circuit animation */}
          <div id="arduino-circuit-box" style={{
            position: 'relative',
            background: 'rgba(5,14,8,0.7)',
            border: '1px solid rgba(0,255,136,0.15)',
            borderRadius: '12px',
            overflow: 'hidden',
            height: '320px',
            boxShadow: '0 0 40px rgba(0,255,136,0.06), inset 0 0 60px rgba(0,20,10,0.5)',
          }}>
            <ArduinoCircuit />

            {/* Scanline overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px)',
              pointerEvents: 'none',
              zIndex: 2,
            }} />

            {/* Corner label */}
            <div style={{
              position: 'absolute',
              top: '12px',
              right: '16px',
              fontFamily: 'Share Tech Mono, monospace',
              fontSize: '0.6rem',
              color: 'rgba(0,255,136,0.5)',
              letterSpacing: '0.15em',
              zIndex: 3,
            }}>
              LIVE_SIM
            </div>

            {/* Status indicator */}
            <div style={{
              position: 'absolute',
              bottom: '12px',
              left: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              zIndex: 3,
            }}>
              <div style={{
                width: '6px', height: '6px',
                borderRadius: '50%',
                background: '#00FF88',
                boxShadow: '0 0 8px #00FF88',
                animation: 'pulse-dot 2s ease-in-out infinite',
              }} />
              <span style={{
                fontFamily: 'Share Tech Mono, monospace',
                fontSize: '0.6rem',
                color: 'rgba(0,255,136,0.6)',
                letterSpacing: '0.1em',
              }}>CIRCUIT RUNNING</span>
            </div>
          </div>

          {/* Specs / component list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Chip label */}
            <div style={{
              fontFamily: 'Share Tech Mono, monospace',
              fontSize: '0.65rem',
              letterSpacing: '0.2em',
              color: 'rgba(0,255,136,0.5)',
              marginBottom: '4px',
            }}>
              &gt; COMPONENTS_AVAILABLE
            </div>

            {specs.map(s => (
              <div key={s.label} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                background: 'rgba(0,255,136,0.04)',
                border: '1px solid rgba(0,255,136,0.1)',
                borderRadius: '6px',
                padding: '12px 16px',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(0,255,136,0.35)'
                e.currentTarget.style.background = 'rgba(0,255,136,0.08)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(0,255,136,0.1)'
                e.currentTarget.style.background = 'rgba(0,255,136,0.04)'
              }}
              >
                <span style={{ fontSize: '1.1rem' }}>{s.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontFamily: 'Share Tech Mono, monospace',
                    fontSize: '0.62rem',
                    color: 'rgba(0,255,136,0.5)',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    marginBottom: '2px',
                  }}>{s.label}</div>
                  <div style={{
                    fontFamily: 'Rajdhani, sans-serif',
                    fontWeight: 700,
                    fontSize: '1rem',
                    color: '#fff',
                    letterSpacing: '0.02em',
                  }}>{s.value}</div>
                </div>
              </div>
            ))}

            {/* Code snippet teaser */}
            <div style={{
              background: 'rgba(10,20,12,0.8)',
              border: '1px solid rgba(0,255,136,0.12)',
              borderRadius: '6px',
              padding: '14px 16px',
              marginTop: '4px',
            }}>
              <div style={{
                fontFamily: 'Share Tech Mono, monospace',
                fontSize: '0.68rem',
                color: 'rgba(0,255,136,0.4)',
                marginBottom: '8px',
                letterSpacing: '0.1em',
              }}>sketch.ino</div>
              <pre style={{
                fontFamily: 'Share Tech Mono, monospace',
                fontSize: '0.68rem',
                margin: 0,
                color: 'rgba(255,255,255,0.7)',
                lineHeight: 1.7,
              }}>
{`void setup() {
  `}<span style={{ color: '#FFD700' }}>pinMode</span>{`(13, OUTPUT);
}

void loop() {
  `}<span style={{ color: '#FFD700' }}>digitalWrite</span>{`(13, HIGH);
  `}<span style={{ color: '#00BFFF' }}>delay</span>{`(1000);
  `}<span style={{ color: '#FFD700' }}>digitalWrite</span>{`(13, LOW);
  `}<span style={{ color: '#00BFFF' }}>delay</span>{`(1000);
}`}
              </pre>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #arduino-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          #arduino-circuit-box { height: 540px !important; }
        }
      `}</style>
    </section>
  )
}
