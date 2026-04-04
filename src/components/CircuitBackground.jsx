import { useEffect, useRef } from 'react'

export default function CircuitBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationId
    let time = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Circuit nodes
    const nodes = []
    const pulses = []

    const initNodes = () => {
      nodes.length = 0
      const cols = Math.floor(canvas.width / 80)
      const rows = Math.floor(canvas.height / 80)
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          if (Math.random() > 0.65) {
            nodes.push({
              x: i * 80 + Math.random() * 40,
              y: j * 80 + Math.random() * 40,
              size: Math.random() * 3 + 1,
              connections: [],
              pulseTimer: Math.random() * 200,
            })
          }
        }
      }

      // Connect nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 160 && Math.random() > 0.5) {
            nodes[i].connections.push(j)
          }
        }
      }
    }
    initNodes()
    window.addEventListener('resize', initNodes)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time++

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]
        for (const j of node.connections) {
          const other = nodes[j]
          const gradient = ctx.createLinearGradient(node.x, node.y, other.x, other.y)
          gradient.addColorStop(0, 'rgba(0, 120, 50, 0.13)')
          gradient.addColorStop(0.5, 'rgba(0, 255, 136, 0.07)')
          gradient.addColorStop(1, 'rgba(0, 98, 155, 0.10)')
          ctx.beginPath()
          ctx.strokeStyle = gradient
          ctx.lineWidth = 0.5
          ctx.moveTo(node.x, node.y)

          // Right-angle routing
          const midX = (node.x + other.x) / 2
          ctx.lineTo(midX, node.y)
          ctx.lineTo(midX, other.y)
          ctx.lineTo(other.x, other.y)
          ctx.stroke()
        }

        // Pulse emitters
        node.pulseTimer--
        if (node.pulseTimer <= 0 && node.connections.length > 0) {
          node.pulseTimer = 120 + Math.random() * 300
          const targetIdx = node.connections[Math.floor(Math.random() * node.connections.length)]
          pulses.push({
            fromX: node.x, fromY: node.y,
            toX: nodes[targetIdx].x, toY: nodes[targetIdx].y,
            progress: 0,
            speed: 0.008 + Math.random() * 0.012,
            color: Math.random() > 0.6 ? '#E87722' : Math.random() > 0.5 ? '#00FF88' : '#00A3E0',
          })
        }
      }

      // Draw pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i]
        p.progress += p.speed
        if (p.progress >= 1) {
          pulses.splice(i, 1)
          continue
        }

        const midX = (p.fromX + p.toX) / 2
        let x, y
        if (p.progress < 0.5) {
          const t = p.progress * 2
          x = p.fromX + (midX - p.fromX) * t
          y = p.fromY
        } else {
          const t = (p.progress - 0.5) * 2
          x = midX + (p.toX - midX) * t
          y = p.fromY + (p.toY - p.fromY) * t
        }

        // Pulse glow
        const glowRadius = 6
        const glow = ctx.createRadialGradient(x, y, 0, x, y, glowRadius)
        glow.addColorStop(0, p.color + 'FF')
        glow.addColorStop(0.4, p.color + '88')
        glow.addColorStop(1, p.color + '00')
        ctx.beginPath()
        ctx.fillStyle = glow
        ctx.arc(x, y, glowRadius, 0, Math.PI * 2)
        ctx.fill()

        // Pulse dot
        ctx.beginPath()
        ctx.fillStyle = p.color
        ctx.arc(x, y, 2.5, 0, Math.PI * 2)
        ctx.fill()
      }

      // Draw nodes
      for (const node of nodes) {
        const pulse = 0.5 + 0.5 * Math.sin(time * 0.02 + node.x * 0.01)
        const alpha = 0.3 + 0.4 * pulse

        ctx.beginPath()
        ctx.fillStyle = `rgba(0, 255, 136, ${alpha * 0.7})`
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2)
        ctx.fill()

        // Node cross marker
        ctx.strokeStyle = `rgba(0, 255, 136, ${alpha * 0.4})`
        ctx.lineWidth = 0.5
        ctx.beginPath()
        ctx.moveTo(node.x - 5, node.y)
        ctx.lineTo(node.x + 5, node.y)
        ctx.moveTo(node.x, node.y - 5)
        ctx.lineTo(node.x, node.y + 5)
        ctx.stroke()
      }

      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('resize', initNodes)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        opacity: 0.7,
        pointerEvents: 'none',
      }}
    />
  )
}
