import { useEffect, useRef } from 'react'

export default function ArduinoCircuit() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    let t = 0

    // Pulses traveling along wires
    const pulses = []

    // Wire definitions: arrays of [x,y] waypoints
    // Horizontal layout (Arduino left, breadboard right)
    const WIRES_H = [
      // D13 -> LED anode
      { points: [[370, 178], [450, 178], [450, 310], [530, 310]], color: '#00FF88', addInterval: 90 },
      // GND -> LED cathode (via resistor)
      { points: [[370, 198], [510, 198], [510, 360], [530, 360]], color: '#FF4444', addInterval: 110 },
      // 5V -> breadboard power rail
      { points: [[370, 158], [600, 158], [600, 240]], color: '#FFD700', addInterval: 130 },
      // A0 -> sensor
      { points: [[370, 320], [700, 320], [700, 390]], color: '#00BFFF', addInterval: 150 },
      // D3 -> component
      { points: [[370, 218], [480, 218], [480, 420], [680, 420]], color: '#FF8C00', addInterval: 200 },
    ]
    // Portrait layout (Arduino top, breadboard bottom) — Arduino at (67,55), breadboard at (52,290)
    const WIRES_V = [
      // D13 -> LED anode on breadboard
      { points: [[270, 115], [298, 115], [298, 360], [200, 360]], color: '#00FF88', addInterval: 90 },
      // GND -> LED cathode
      { points: [[270, 135], [308, 135], [308, 395], [170, 395]], color: '#FF4444', addInterval: 110 },
      // 5V -> breadboard power rail
      { points: [[270, 95], [285, 95], [285, 310], [220, 310]], color: '#FFD700', addInterval: 130 },
      // A0 -> sensor
      { points: [[270, 195], [318, 195], [318, 430], [140, 430]], color: '#00BFFF', addInterval: 150 },
      // D3 -> component
      { points: [[270, 155], [293, 155], [293, 380], [230, 380]], color: '#FF8C00', addInterval: 200 },
    ]
    let WIRES = WIRES_H

    WIRE_TIMERS = WIRES.map(() => 0)

    function addPulse(wire) {
      pulses.push({ wire, progress: 0, speed: 0.004 + Math.random() * 0.003 })
    }

    function getPosOnWire(points, progress) {
      const totalLen = points.reduce((sum, pt, i) => {
        if (i === 0) return 0
        const dx = pt[0] - points[i - 1][0]
        const dy = pt[1] - points[i - 1][1]
        return sum + Math.sqrt(dx * dx + dy * dy)
      }, 0)

      const target = totalLen * progress
      let traveled = 0
      for (let i = 1; i < points.length; i++) {
        const dx = points[i][0] - points[i - 1][0]
        const dy = points[i][1] - points[i - 1][1]
        const segLen = Math.sqrt(dx * dx + dy * dy)
        if (traveled + segLen >= target) {
          const t2 = (target - traveled) / segLen
          return [points[i - 1][0] + dx * t2, points[i - 1][1] + dy * t2]
        }
        traveled += segLen
      }
      return points[points.length - 1]
    }

    // Draw Arduino Uno board
    function drawArduino(x, y) {
      const w = 200, h = 155

      // PCB body
      ctx.save()
      ctx.translate(x, y)

      // Board shape (with notch)
      ctx.beginPath()
      ctx.roundRect(0, 0, w, h, [6, 6, 6, 6])
      ctx.fillStyle = '#0F4C1E'
      ctx.fill()
      ctx.strokeStyle = '#1a7a32'
      ctx.lineWidth = 1.5
      ctx.stroke()

      // Solder mask texture (subtle grid)
      ctx.globalAlpha = 0.06
      ctx.strokeStyle = '#00FF88'
      ctx.lineWidth = 0.5
      for (let gx = 0; gx <= w; gx += 10) {
        ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, h); ctx.stroke()
      }
      for (let gy = 0; gy <= h; gy += 10) {
        ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(w, gy); ctx.stroke()
      }
      ctx.globalAlpha = 1

      // Silkscreen labels
      ctx.fillStyle = '#c8f7d0'
      ctx.font = '5px Share Tech Mono, monospace'
      ctx.fillText('ARDUINO', 60, 14)
      ctx.fillText('UNO R3', 65, 22)

      // ATmega328P chip (center)
      const chipX = 60, chipY = 50, chipW = 55, chipH = 45
      ctx.fillStyle = '#1a1a1a'
      ctx.strokeStyle = '#333'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.roundRect(chipX, chipY, chipW, chipH, 2)
      ctx.fill()
      ctx.stroke()
      // Chip notch
      ctx.beginPath()
      ctx.arc(chipX + chipW / 2, chipY, 4, 0, Math.PI)
      ctx.fillStyle = '#1a1a1a'
      ctx.fill()
      // Chip legs left
      ctx.strokeStyle = '#888'
      ctx.lineWidth = 1
      for (let i = 0; i < 7; i++) {
        const ly = chipY + 6 + i * 6
        ctx.beginPath(); ctx.moveTo(chipX - 6, ly); ctx.lineTo(chipX, ly); ctx.stroke()
      }
      // Chip legs right
      for (let i = 0; i < 7; i++) {
        const ly = chipY + 6 + i * 6
        ctx.beginPath(); ctx.moveTo(chipX + chipW, ly); ctx.lineTo(chipX + chipW + 6, ly); ctx.stroke()
      }
      // Chip text
      ctx.fillStyle = '#666'
      ctx.font = '5px Share Tech Mono, monospace'
      ctx.textAlign = 'center'
      ctx.fillText('ATmega', chipX + chipW / 2, chipY + chipH / 2 - 3)
      ctx.fillText('328P', chipX + chipW / 2, chipY + chipH / 2 + 5)
      ctx.textAlign = 'left'

      // Crystal oscillator (small can)
      ctx.fillStyle = '#c0a060'
      ctx.beginPath()
      ctx.roundRect(130, 55, 10, 20, 3)
      ctx.fill()
      ctx.strokeStyle = '#a08040'
      ctx.stroke()

      // USB port
      ctx.fillStyle = '#888'
      ctx.beginPath()
      ctx.roundRect(-8, 30, 14, 24, 2)
      ctx.fill()
      ctx.strokeStyle = '#aaa'
      ctx.lineWidth = 0.5
      ctx.stroke()
      ctx.fillStyle = '#222'
      ctx.fillRect(-6, 33, 10, 18)
      // USB label
      ctx.fillStyle = '#c8f7d0'
      ctx.font = '4px Share Tech Mono'
      ctx.fillText('USB', -3, 28)

      // Barrel jack
      ctx.fillStyle = '#444'
      ctx.beginPath()
      ctx.arc(-4, 90, 8, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = '#666'
      ctx.stroke()
      ctx.fillStyle = '#222'
      ctx.beginPath()
      ctx.arc(-4, 90, 4, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = '#c8f7d0'
      ctx.font = '4px Share Tech Mono'
      ctx.fillText('PWR', -7, 104)

      // Reset button
      ctx.fillStyle = '#CC0000'
      ctx.beginPath()
      ctx.roundRect(150, 8, 12, 10, 2)
      ctx.fill()
      ctx.fillStyle = '#c8f7d0'
      ctx.font = '4px Share Tech Mono'
      ctx.fillText('RST', 149, 7)

      // Voltage regulator
      ctx.fillStyle = '#333'
      ctx.fillRect(16, 115, 20, 14)
      ctx.strokeStyle = '#555'
      ctx.lineWidth = 0.5
      ctx.strokeRect(16, 115, 20, 14)
      ctx.fillStyle = '#c8f7d0'
      ctx.font = '3.5px Share Tech Mono'
      ctx.fillText('7805', 18, 126)

      // Capacitors (small blue cylinders)
      ;[[38, 112, '100µ'], [160, 112, '10µ']].forEach(([cx, cy, lbl]) => {
        ctx.fillStyle = '#1a3a8f'
        ctx.beginPath()
        ctx.roundRect(cx - 5, cy, 10, 18, 2)
        ctx.fill()
        ctx.strokeStyle = '#2244bb'
        ctx.stroke()
        // stripe
        ctx.fillStyle = '#c8c8c8'
        ctx.fillRect(cx - 5, cy, 2, 18)
        ctx.fillStyle = '#8888ff'
        ctx.font = '3.5px Share Tech Mono'
        ctx.fillText(lbl, cx - 7, cy - 2)
      })

      // Digital pin headers (right side, top)
      ctx.fillStyle = '#222'
      ctx.fillRect(w - 4, 0, 6, h * 0.5)
      const dPins = ['D13','D12','~11','~10','~9','D8','D7','~6','~5','D4','~3','D2','TX','RX']
      for (let i = 0; i < dPins.length; i++) {
        const py = 8 + i * 10
        // Pin hole
        ctx.fillStyle = '#ffd700'
        ctx.beginPath()
        ctx.arc(w + 1, py, 2, 0, Math.PI * 2)
        ctx.fill()
        // Label
        ctx.fillStyle = '#c8f7d0'
        ctx.font = '4px Share Tech Mono'
        ctx.textAlign = 'right'
        ctx.fillText(dPins[i], w - 6, py + 1.5)
        ctx.textAlign = 'left'
      }

      // Analog pin headers (right side, bottom)
      const aPins = ['AREF','GND','13','3.3V','5V','GND','GND','Vin','A0','A1','A2','A3','A4','A5']
      for (let i = 0; i < aPins.length; i++) {
        const py = h * 0.5 + 5 + i * 7.2
        ctx.fillStyle = '#ffd700'
        ctx.beginPath()
        ctx.arc(w + 1, py, 2, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = '#c8f7d0'
        ctx.font = '4px Share Tech Mono'
        ctx.textAlign = 'right'
        ctx.fillText(aPins[i], w - 6, py + 1.5)
        ctx.textAlign = 'left'
      }

      // PCB copper traces (visible gold lines)
      ctx.strokeStyle = 'rgba(200,168,75,0.4)'
      ctx.lineWidth = 1
      const traces = [
        [[chipX + chipW / 2, chipY + chipH], [chipX + chipW / 2, h - 5]],
        [[chipX, chipY + 10], [30, chipY + 10]],
        [[chipX + chipW + 6, chipY + 8], [w - 10, chipY + 8]],
        [[130, 65], [w - 10, 65]],
        [[38, 115], [25, 95], [16, 95], [16, h - 5]],
      ]
      for (const trace of traces) {
        ctx.beginPath()
        ctx.moveTo(trace[0][0], trace[0][1])
        for (let i = 1; i < trace.length; i++) ctx.lineTo(trace[i][0], trace[i][1])
        ctx.stroke()
      }

      // Onboard LED (D13 LED)
      const ledGlow = 0.5 + 0.5 * Math.sin(t * 0.08)
      ctx.save()
      ctx.shadowBlur = 12 * ledGlow
      ctx.shadowColor = '#ff6600'
      ctx.fillStyle = `rgba(255, ${80 + Math.floor(120 * ledGlow)}, 0, ${0.7 + 0.3 * ledGlow})`
      ctx.beginPath()
      ctx.arc(w - 15, 8, 3, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
      ctx.fillStyle = '#c8f7d0'
      ctx.font = '4px Share Tech Mono'
      ctx.fillText('L', w - 19, 6)

      // Power LED (green, steady)
      ctx.save()
      ctx.shadowBlur = 8
      ctx.shadowColor = '#00ff44'
      ctx.fillStyle = '#00ee44'
      ctx.beginPath()
      ctx.arc(w - 15, 20, 3, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
      ctx.fillStyle = '#c8f7d0'
      ctx.font = '4px Share Tech Mono'
      ctx.fillText('ON', w - 21, 18)

      ctx.restore()
    }

    // Draw breadboard
    function drawBreadboard(x, y) {
      const w = 230, h = 200
      ctx.save()
      ctx.translate(x, y)

      // Board
      ctx.fillStyle = '#f0e8d0'
      ctx.beginPath()
      ctx.roundRect(0, 0, w, h, 4)
      ctx.fill()
      ctx.strokeStyle = '#c8b888'
      ctx.lineWidth = 1
      ctx.stroke()

      // Label
      ctx.fillStyle = '#886644'
      ctx.font = '7px Share Tech Mono, monospace'
      ctx.fillText('BREADBOARD 830pt', 60, 12)

      // Power rails (left)
      // +  rail
      ctx.fillStyle = 'rgba(255,80,80,0.15)'
      ctx.fillRect(8, 18, 12, h - 36)
      ctx.strokeStyle = '#ff4444'
      ctx.lineWidth = 0.5
      ctx.setLineDash([3, 3])
      ctx.beginPath()
      ctx.moveTo(14, 20); ctx.lineTo(14, h - 20)
      ctx.stroke()
      ctx.setLineDash([])
      ctx.fillStyle = '#cc3333'
      ctx.font = '7px Arial'
      ctx.fillText('+', 11, 16)

      // - rail
      ctx.fillStyle = 'rgba(80,80,255,0.1)'
      ctx.fillRect(22, 18, 12, h - 36)
      ctx.strokeStyle = '#4444ff'
      ctx.lineWidth = 0.5
      ctx.setLineDash([3, 3])
      ctx.beginPath()
      ctx.moveTo(28, 20); ctx.lineTo(28, h - 20)
      ctx.stroke()
      ctx.setLineDash([])
      ctx.fillStyle = '#3333cc'
      ctx.font = '7px Arial'
      ctx.fillText('−', 24, 16)

      // Power rails (right)
      ctx.fillStyle = 'rgba(255,80,80,0.15)'
      ctx.fillRect(w - 20, 18, 12, h - 36)
      ctx.strokeStyle = '#ff4444'
      ctx.lineWidth = 0.5
      ctx.setLineDash([3, 3])
      ctx.beginPath()
      ctx.moveTo(w - 14, 20); ctx.lineTo(w - 14, h - 20)
      ctx.stroke()
      ctx.setLineDash([])

      ctx.fillStyle = 'rgba(80,80,255,0.1)'
      ctx.fillRect(w - 34, 18, 12, h - 36)
      ctx.strokeStyle = '#4444ff'
      ctx.lineWidth = 0.5
      ctx.setLineDash([3, 3])
      ctx.beginPath()
      ctx.moveTo(w - 28, 20); ctx.lineTo(w - 28, h - 20)
      ctx.stroke()
      ctx.setLineDash([])

      // Tie points grid
      const cols = 30, rows = 10
      const startX = 40, startY = 22
      const spacingX = (w - 70) / cols, spacingY = (h - 44) / rows
      for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows; row++) {
          const px = startX + col * spacingX
          // Gap in middle (breadboard divider)
          const py = row < 5
            ? startY + row * spacingY
            : startY + row * spacingY + 16
          ctx.fillStyle = '#c0a870'
          ctx.beginPath()
          ctx.roundRect(px - 2.5, py - 2.5, 5, 5, 1)
          ctx.fill()
          ctx.fillStyle = '#1a1a1a'
          ctx.beginPath()
          ctx.arc(px, py, 1.2, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // Center divider line
      ctx.strokeStyle = '#998866'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(36, h / 2)
      ctx.lineTo(w - 36, h / 2)
      ctx.stroke()

      // Draw LED component on breadboard
      const ledX = 120, ledY = 60
      const ledOn = 0.5 + 0.5 * Math.sin(t * 0.08)
      ctx.save()
      ctx.shadowBlur = 20 * ledOn
      ctx.shadowColor = '#00FF88'
      // LED body (dome)
      const ledGrad = ctx.createRadialGradient(ledX, ledY - 4, 1, ledX, ledY - 2, 8)
      ledGrad.addColorStop(0, `rgba(${Math.floor(100 + 155 * ledOn)}, 255, ${Math.floor(100 + 100 * ledOn)}, 1)`)
      ledGrad.addColorStop(1, `rgba(0, ${Math.floor(150 + 80 * ledOn)}, 60, 0.8)`)
      ctx.fillStyle = ledGrad
      ctx.beginPath()
      ctx.arc(ledX, ledY - 2, 8, Math.PI, 0)
      ctx.closePath()
      ctx.fill()
      // LED legs
      ctx.strokeStyle = '#888'
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.moveTo(ledX - 3, ledY - 2); ctx.lineTo(ledX - 3, ledY + 14) // cathode (short)
      ctx.moveTo(ledX + 3, ledY - 2); ctx.lineTo(ledX + 3, ledY + 18) // anode (long)
      ctx.stroke()
      ctx.restore()
      // LED label
      ctx.fillStyle = 'rgba(0,255,136,0.8)'
      ctx.font = '6px Share Tech Mono'
      ctx.fillText('LED', ledX - 7, ledY - 14)

      // Resistor
      const resX = 80, resY = 80
      ctx.fillStyle = '#d4a855'
      ctx.beginPath()
      ctx.roundRect(resX - 2, resY - 5, 28, 10, 2)
      ctx.fill()
      ctx.strokeStyle = '#a08030'
      ctx.lineWidth = 0.5
      ctx.stroke()
      // Resistor color bands
      const bands = ['#8B4513', '#000', '#f00', '#gold']
      const bandColors = ['#8B4513', '#111', '#ff2200', '#c8a84b']
      bandColors.forEach((c, i) => {
        ctx.fillStyle = c
        ctx.fillRect(resX + 2 + i * 6, resY - 5, 4, 10)
      })
      // Leads
      ctx.strokeStyle = '#888'
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.moveTo(resX - 2, resY); ctx.lineTo(resX - 12, resY)
      ctx.moveTo(resX + 26, resY); ctx.lineTo(resX + 36, resY)
      ctx.stroke()
      ctx.fillStyle = '#c8a84b'
      ctx.font = '5px Share Tech Mono'
      ctx.fillText('220Ω', resX + 4, resY - 8)

      // Capacitor on breadboard
      const capX = 165, capY = 70
      ctx.fillStyle = '#1a3a8f'
      ctx.beginPath()
      ctx.roundRect(capX - 4, capY - 12, 8, 20, 2)
      ctx.fill()
      ctx.fillStyle = '#c8c8c8'
      ctx.fillRect(capX - 4, capY - 12, 2, 20)
      ctx.strokeStyle = '#2244bb'
      ctx.lineWidth = 0.5
      ctx.stroke()
      ctx.fillStyle = '#8888ff'
      ctx.font = '5px Share Tech Mono'
      ctx.fillText('100µF', capX - 10, capY - 14)

      // ESP32 mini module
      const espX = 60, espY = 108
      ctx.fillStyle = '#1a3050'
      ctx.beginPath()
      ctx.roundRect(espX, espY, 55, 35, 3)
      ctx.fill()
      ctx.strokeStyle = '#2255aa'
      ctx.lineWidth = 1
      ctx.stroke()
      // Module chip
      ctx.fillStyle = '#111'
      ctx.beginPath()
      ctx.roundRect(espX + 10, espY + 6, 30, 22, 2)
      ctx.fill()
      // Antenna trace
      ctx.strokeStyle = '#c8a84b'
      ctx.lineWidth = 0.7
      ctx.beginPath()
      ctx.moveTo(espX + 42, espY + 8)
      ctx.lineTo(espX + 52, espY + 8)
      ctx.lineTo(espX + 52, espY + 12)
      ctx.lineTo(espX + 48, espY + 12)
      ctx.lineTo(espX + 48, espY + 16)
      ctx.lineTo(espX + 52, espY + 16)
      ctx.lineTo(espX + 52, espY + 20)
      ctx.lineTo(espX + 42, espY + 20)
      ctx.stroke()
      // Module pins
      for (let i = 0; i < 8; i++) {
        ctx.fillStyle = '#ffd700'
        ctx.beginPath()
        ctx.arc(espX + 3 + i * 7.2, espY, 1.8, 0, Math.PI * 2)
        ctx.fill()
        ctx.beginPath()
        ctx.arc(espX + 3 + i * 7.2, espY + 35, 1.8, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.fillStyle = '#5588ff'
      ctx.font = '5px Share Tech Mono'
      ctx.fillText('ESP32', espX + 14, espY + 18)

      // Connecting wires on breadboard (colorful jumpers)
      const jumpers = [
        { from: [ledX + 3, ledY + 18], to: [resX + 36, resY], color: '#00FF88' },
        { from: [resX - 12, resY], to: [28, resY], color: '#FF4444' },
        { from: [14, 60], to: [espX, espY + 8], color: '#FFD700' },
        { from: [espX + 28, espY + 35], to: [ledX - 3, ledY + 14], color: '#FF8C00' },
        { from: [espX + 35, espY + 35], to: [capX, capY + 8], color: '#00BFFF' },
      ]
      for (const j of jumpers) {
        ctx.strokeStyle = j.color
        ctx.lineWidth = 1.5
        ctx.globalAlpha = 0.8
        ctx.beginPath()
        ctx.moveTo(j.from[0], j.from[1])
        const midY = Math.min(j.from[1], j.to[1]) - 12
        ctx.bezierCurveTo(j.from[0], midY, j.to[0], midY, j.to[0], j.to[1])
        ctx.stroke()
        ctx.globalAlpha = 1
      }

      ctx.restore()
    }

    // Draw wire segments between arduino and breadboard
    function drawConnectionWires() {
      for (const wire of WIRES) {
        ctx.save()
        ctx.strokeStyle = wire.color
        ctx.lineWidth = 1.5
        ctx.globalAlpha = 0.35
        ctx.setLineDash([4, 4])
        ctx.beginPath()
        ctx.moveTo(wire.points[0][0], wire.points[0][1])
        for (let i = 1; i < wire.points.length; i++) {
          ctx.lineTo(wire.points[i][0], wire.points[i][1])
        }
        ctx.stroke()
        ctx.setLineDash([])
        ctx.restore()
      }
    }

    // Draw pulse particles
    function drawPulses() {
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i]
        p.progress += p.speed
        if (p.progress >= 1) { pulses.splice(i, 1); continue }

        const [px, py] = getPosOnWire(p.wire.points, p.progress)
        const glow = ctx.createRadialGradient(px, py, 0, px, py, 7)
        glow.addColorStop(0, p.wire.color + 'FF')
        glow.addColorStop(0.4, p.wire.color + '88')
        glow.addColorStop(1, p.wire.color + '00')
        ctx.beginPath()
        ctx.fillStyle = glow
        ctx.arc(px, py, 7, 0, Math.PI * 2)
        ctx.fill()

        ctx.beginPath()
        ctx.fillStyle = p.wire.color
        ctx.arc(px, py, 2.5, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Labels/annotations
    function drawAnnotations(ax, ay, bx, by, portrait) {
      ctx.save()
      ctx.font = '11px Share Tech Mono, monospace'

      // Voltage labels
      const annotations = portrait
        ? [
            { x: ax - 28, y: ay + 20, text: '5V', color: '#FFD700' },
            { x: ax - 32, y: ay + 110, text: 'GND', color: '#FF4444' },
            { x: bx + 240, y: by + 20, text: 'OUT', color: '#00FF88' },
            { x: bx - 40, y: by + 140, text: 'I²C', color: '#00BFFF' },
          ]
        : [
            { x: ax - 30, y: ay - 20, text: '5V', color: '#FFD700' },
            { x: ax - 30, y: ay + 80, text: 'GND', color: '#FF4444' },
            { x: bx + 90, y: by + 10, text: 'OUTPUT', color: '#00FF88' },
            { x: bx + 85, y: by + 120, text: 'I²C/SPI', color: '#00BFFF' },
          ]
      for (const a of annotations) {
        ctx.fillStyle = a.color
        ctx.globalAlpha = 0.6
        ctx.fillText(a.text, a.x, a.y)
      }

      // Pin voltage indicator (oscillating)
      const vLabel = `D13: ${(3.3 * (0.5 + 0.5 * Math.sin(t * 0.08))).toFixed(1)}V`
      ctx.fillStyle = '#00FF88'
      ctx.globalAlpha = 0.7
      if (portrait) {
        ctx.fillText(vLabel, ax + 10, ay + 175)
      } else {
        ctx.fillText(vLabel, ax + 210, ay - 10)
      }

      ctx.restore()
    }

    const draw = () => {
      const W = canvas.width, H = canvas.height
      ctx.clearRect(0, 0, W, H)
      t++

      // Detect portrait orientation from the container shape
      const portrait = canvas.offsetHeight > canvas.offsetWidth * 1.1
      WIRES = portrait ? WIRES_V : WIRES_H

      // Dark PCB background panel
      const panelX = 20, panelY = 20, panelW = W - 40, panelH = H - 40
      ctx.fillStyle = 'rgba(10,20,12,0.85)'
      ctx.beginPath()
      ctx.roundRect(panelX, panelY, panelW, panelH, 12)
      ctx.fill()
      ctx.strokeStyle = 'rgba(0,255,136,0.15)'
      ctx.lineWidth = 1
      ctx.stroke()

      // PCB grid
      ctx.strokeStyle = 'rgba(0,255,136,0.04)'
      ctx.lineWidth = 0.5
      for (let gx = panelX; gx <= panelX + panelW; gx += 20) {
        ctx.beginPath(); ctx.moveTo(gx, panelY); ctx.lineTo(gx, panelY + panelH); ctx.stroke()
      }
      for (let gy = panelY; gy <= panelY + panelH; gy += 20) {
        ctx.beginPath(); ctx.moveTo(panelX, gy); ctx.lineTo(panelX + panelW, gy); ctx.stroke()
      }

      // Position elements
      const arduinoX = portrait ? 67 : 55
      const arduinoY = portrait ? 55 : 80
      const bbX = portrait ? 52 : 310
      const bbY = portrait ? 290 : 65

      // Draw components
      drawConnectionWires()
      drawArduino(arduinoX, arduinoY)
      drawBreadboard(bbX, bbY)
      drawAnnotations(arduinoX, arduinoY, bbX, bbY, portrait)
      drawPulses()

      // Emit pulses on timers
      for (let i = 0; i < WIRES.length; i++) {
        WIRE_TIMERS[i]--
        if (WIRE_TIMERS[i] <= 0) {
          addPulse(WIRES[i])
          WIRE_TIMERS[i] = WIRES[i].addInterval + Math.floor(Math.random() * 40)
        }
      }

      // Corner markers
      ctx.strokeStyle = 'rgba(0,255,136,0.3)'
      ctx.lineWidth = 1.5
      const corners = [[panelX + 8, panelY + 8], [panelX + panelW - 8, panelY + 8], [panelX + 8, panelY + panelH - 8], [panelX + panelW - 8, panelY + panelH - 8]]
      for (const [cx, cy] of corners) {
        const sx = cx < W / 2 ? 1 : -1
        const sy = cy < H / 2 ? 1 : -1
        ctx.beginPath()
        ctx.moveTo(cx, cy + sy * 10); ctx.lineTo(cx, cy); ctx.lineTo(cx + sx * 10, cy)
        ctx.stroke()
      }

      animId = requestAnimationFrame(draw)
    }

    // Need to define WIRE_TIMERS as var to avoid scope issue
    var WIRE_TIMERS = WIRES.map(() => 0)

    const resize = () => {
      canvas.width = canvas.offsetWidth * Math.min(window.devicePixelRatio, 2)
      canvas.height = canvas.offsetHeight * Math.min(window.devicePixelRatio, 2)
      ctx.scale(Math.min(window.devicePixelRatio, 2), Math.min(window.devicePixelRatio, 2))
    }
    resize()
    window.addEventListener('resize', resize)

    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  )
}
