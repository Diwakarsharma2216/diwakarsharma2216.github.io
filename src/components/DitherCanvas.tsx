import { useEffect, useRef } from 'react'

export default function DitherCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const mouseRef = useRef({
    x: -1000,
    y: -1000,
    targetX: -1000,
    targetY: -1000,
    vx: 0,
    vy: 0,
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = 0
    let height = 0

    // Fast Permutation Table for Simplex/Perlin Noise
    const p = new Uint8Array(512)
    const permutation = [
      151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30,
      69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94,
      252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136,
      171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229,
      122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25,
      63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116,
      188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202,
      38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28,
      42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167,
      43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104,
      218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51,
      145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176,
      115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243,
      141, 128, 195, 78, 66, 215, 61, 156, 180,
    ]
    for (let i = 0; i < 256; i++) {
      p[256 + i] = p[i] = permutation[i]
    }

    function fade(t: number) {
      return t * t * t * (t * (t * 6 - 15) + 10)
    }

    function lerp(t: number, a: number, b: number) {
      return a + t * (b - a)
    }

    function grad(hash: number, x: number, y: number, z: number) {
      const h = hash & 15
      const u = h < 8 ? x : y
      const v = h < 4 ? y : h === 12 || h === 14 ? x : z
      return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v)
    }

    function noise3D(x: number, y: number, z: number) {
      const X = Math.floor(x) & 255
      const Y = Math.floor(y) & 255
      const Z = Math.floor(z) & 255

      x -= Math.floor(x)
      y -= Math.floor(y)
      z -= Math.floor(z)

      const u = fade(x)
      const v = fade(y)
      const w = fade(z)

      const A = p[X] + Y
      const AA = p[A] + Z
      const AB = p[A + 1] + Z
      const B = p[X + 1] + Y
      const BA = p[B] + Z
      const BB = p[B + 1] + Z

      return lerp(
        w,
        lerp(
          v,
          lerp(u, grad(p[AA], x, y, z), grad(p[BA], x - 1, y, z)),
          lerp(u, grad(p[AB], x, y - 1, z), grad(p[BB], x - 1, y - 1, z))
        ),
        lerp(
          v,
          lerp(u, grad(p[AA + 1], x, y, z - 1), grad(p[BA + 1], x - 1, y, z - 1)),
          lerp(u, grad(p[AB + 1], x, y - 1, z - 1), grad(p[BB + 1], x - 1, y - 1, z - 1))
        )
      )
    }

    // High-octave FBM for intricate smoke ripples
    function fbm(x: number, y: number, z: number) {
      let total = 0
      let amplitude = 1
      let frequency = 1
      for (let i = 0; i < 4; i++) {
        total += noise3D(x * frequency, y * frequency, z * frequency) * amplitude
        amplitude *= 0.52
        frequency *= 1.95
      }
      return total
    }

    // Resize observer
    const handleResize = () => {
      if (!containerRef.current || !canvas) return
      const rect = containerRef.current.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    let time = 0
    const dotSpacing = 4.8 // High density dot matrix grid

    const render = () => {
      time += 0.007

      // Smooth mouse lerp & velocity tracking
      const prevX = mouseRef.current.x
      const prevY = mouseRef.current.y
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.09
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.09
      mouseRef.current.vx = mouseRef.current.x - prevX
      mouseRef.current.vy = mouseRef.current.y - prevY

      const isDark = document.documentElement.classList.contains('dark')

      // Fill canvas background
      ctx.fillStyle = isDark ? '#080808' : '#fafaf9'
      ctx.fillRect(0, 0, width, height)

      const cols = Math.ceil(width / dotSpacing)
      const rows = Math.ceil(height / dotSpacing)
      const maxRadius = dotSpacing * 0.52

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const px = i * dotSpacing + dotSpacing / 2
          const py = j * dotSpacing + dotSpacing / 2

          // Mouse fluid swirl interaction
          const dx = px - mouseRef.current.x
          const dy = py - mouseRef.current.y
          const distSq = dx * dx + dy * dy
          const mouseDist = Math.sqrt(distSq)
          const mouseField = Math.max(0, 1 - mouseDist / 140)

          // Coordinates with double domain warping (creates turbulent volcanic fluid flow)
          let nx = px * 0.0055
          let ny = py * 0.0055

          if (mouseField > 0) {
            // Swirl coordinates around mouse movement
            const angle = Math.atan2(dy, dx)
            const swirl = mouseField * 0.8
            nx += Math.cos(angle + Math.PI / 2) * swirl * 0.08
            ny += Math.sin(angle + Math.PI / 2) * swirl * 0.08
          }

          // First level warp
          const qx = fbm(nx, ny, time * 0.22)
          const qy = fbm(nx + 5.2, ny + 1.3, time * 0.22)

          // Second level warp (produces rich organic smoke fissures and vortices)
          const rx = fbm(nx + 3.0 * qx + 1.7, ny + 3.0 * qy + 9.2, time * 0.18)
          const ry = fbm(nx + 3.0 * qx + 8.3, ny + 3.0 * qy + 2.8, time * 0.18)

          const val = fbm(nx + 3.5 * rx, ny + 3.5 * ry, time * 0.15) + mouseField * 0.35
          // Normalize to [0, 1]
          const intensity = Math.max(0, Math.min(1, (val + 0.62) * 0.72))

          if (intensity <= 0.06) continue

          const radius = Math.max(0.5, intensity * maxRadius)

          ctx.beginPath()
          ctx.arc(px, py, radius, 0, Math.PI * 2)

          if (isDark) {
            // Glowing Lava / Fire Plasma Palette matching the user's reference GIF
            if (intensity > 0.82) {
              // Radiant core highlight (blazing safety amber / gold)
              ctx.fillStyle = `rgba(255, 140, 40, ${0.95 + intensity * 0.05})`
            } else if (intensity > 0.6) {
              // Vibrant Bauhaus safety orange
              ctx.fillStyle = `rgba(255, 60, 5, ${0.85 + intensity * 0.15})`
            } else if (intensity > 0.35) {
              // Fiery deep red-orange
              ctx.fillStyle = `rgba(210, 30, 0, ${0.7 + intensity * 0.2})`
            } else {
              // Deep volcanic ember shadow
              ctx.fillStyle = `rgba(125, 15, 0, ${intensity * 1.3})`
            }
          } else {
            // Light Mode: Fine Terracotta, Bauhaus Orange, and Charcoal Ink
            if (intensity > 0.75) {
              ctx.fillStyle = `rgba(234, 88, 12, ${0.9 + intensity * 0.1})`
            } else if (intensity > 0.45) {
              ctx.fillStyle = `rgba(194, 65, 12, ${0.7 + intensity * 0.2})`
            } else {
              ctx.fillStyle = `rgba(30, 30, 30, ${intensity * 0.6})`
            }
          }

          ctx.fill()
        }
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    mouseRef.current.targetX = e.clientX - rect.left
    mouseRef.current.targetY = e.clientY - rect.top
  }

  const handleMouseLeave = () => {
    mouseRef.current.targetX = -1000
    mouseRef.current.targetY = -1000
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-square max-w-[320px] sm:max-w-[380px] lg:max-w-[420px] mx-auto rounded-[14px] border border-[var(--border-subtle)] overflow-hidden transition-colors duration-300 hover:border-[var(--border-strong)]"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-crosshair"
      />
    </div>
  )
}
