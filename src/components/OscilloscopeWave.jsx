import { useEffect, useRef } from 'react'

export default function OscilloscopeWave({ height = 120, color = '#E87722', style = {} }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    let t = 0

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resize()

    const draw = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)
      t += 0.03

      // Grid lines
      ctx.strokeStyle = 'rgba(0, 98, 155, 0.15)'
      ctx.lineWidth = 0.5
      for (let i = 0; i <= 4; i++) {
        const y = (h / 4) * i
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
        ctx.stroke()
      }
      for (let i = 0; i <= 8; i++) {
        const x = (w / 8) * i
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, h)
        ctx.stroke()
      }

      // Main wave
      const gradient = ctx.createLinearGradient(0, 0, w, 0)
      gradient.addColorStop(0, color + '00')
      gradient.addColorStop(0.1, color + 'FF')
      gradient.addColorStop(0.9, color + 'FF')
      gradient.addColorStop(1, color + '00')

      ctx.beginPath()
      ctx.strokeStyle = gradient
      ctx.lineWidth = 2
      ctx.shadowBlur = 8
      ctx.shadowColor = color

      for (let x = 0; x <= w; x++) {
        const nx = x / w
        const y =
          h / 2 +
          Math.sin(nx * Math.PI * 6 + t) * (h * 0.28) +
          Math.sin(nx * Math.PI * 12 + t * 1.7) * (h * 0.08) +
          Math.sin(nx * Math.PI * 3 + t * 0.5) * (h * 0.12)

        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()
      ctx.shadowBlur = 0

      // Fill under wave
      ctx.beginPath()
      for (let x = 0; x <= w; x++) {
        const nx = x / w
        const y =
          h / 2 +
          Math.sin(nx * Math.PI * 6 + t) * (h * 0.28) +
          Math.sin(nx * Math.PI * 12 + t * 1.7) * (h * 0.08) +
          Math.sin(nx * Math.PI * 3 + t * 0.5) * (h * 0.12)
        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.lineTo(w, h)
      ctx.lineTo(0, h)
      ctx.closePath()
      const fillGrad = ctx.createLinearGradient(0, 0, 0, h)
      fillGrad.addColorStop(0, color + '18')
      fillGrad.addColorStop(1, color + '00')
      ctx.fillStyle = fillGrad
      ctx.fill()

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => cancelAnimationFrame(animId)
  }, [color])

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: `${height}px`,
        display: 'block',
        ...style,
      }}
    />
  )
}
