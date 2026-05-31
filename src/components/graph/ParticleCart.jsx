'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

const ACCENT = new THREE.Color('#2DE2C5')
const BLUE = new THREE.Color('#38BDF8')
const VIOLET = new THREE.Color('#9D8DF1')
const AMBER = new THREE.Color('#F5B544')
const WHITE = new THREE.Color('#F4F7FA')

// =============================================================================
// Build a shopping cart silhouette out of particles.
//   - basket: trapezoid outline (wider at top, narrower at bottom)
//   - vertical wires inside the basket (suggest mesh)
//   - handle (top-right tilt going up)
//   - 2 wheels at the bottom
//   - 3 glowing items inside the basket as small dot clusters
// =============================================================================
function buildCart() {
  const positions = []
  const colors = []

  const push = (x, y, z, c) => {
    positions.push(x, y, z)
    colors.push(c.r, c.g, c.b)
  }

  // ---- BASKET — trapezoid outline ----
  // top edge: wider (-1.0 → +1.0), bottom edge: narrower (-0.7 → +0.7)
  const TOP_Y = 0.35
  const BOT_Y = -0.55
  const TOP_W = 2.0
  const BOT_W = 1.4
  const TL = [-TOP_W / 2, TOP_Y]
  const TR = [ TOP_W / 2, TOP_Y]
  const BL = [-BOT_W / 2, BOT_Y]
  const BR = [ BOT_W / 2, BOT_Y]

  // sample each of the 4 edges
  const sampleEdge = (a, b, n) => {
    for (let i = 0; i < n; i++) {
      const t = i / (n - 1)
      const x = a[0] + (b[0] - a[0]) * t
      const y = a[1] + (b[1] - a[1]) * t
      const jitter = 0.012
      const c = ACCENT.clone().lerp(WHITE, Math.random() < 0.07 ? 0.4 : 0)
      push(
        x + (Math.random() - 0.5) * jitter,
        y + (Math.random() - 0.5) * jitter,
        (Math.random() - 0.5) * 0.05,
        c,
      )
    }
  }
  sampleEdge(TL, TR, 220)  // top rail
  sampleEdge(BL, BR, 200)  // bottom
  sampleEdge(TL, BL, 180)  // left
  sampleEdge(TR, BR, 180)  // right

  // ---- VERTICAL WIRES inside basket — 6 vertical lines for the mesh ----
  // each wire goes from top edge to bottom edge, interpolating x for the
  // trapezoidal shape so wires don't break the silhouette
  const WIRE_COUNT = 6
  for (let w = 0; w < WIRE_COUNT; w++) {
    const t = (w + 0.5) / WIRE_COUNT
    const xTop = TL[0] + (TR[0] - TL[0]) * t
    const xBot = BL[0] + (BR[0] - BL[0]) * t
    const N = 60
    for (let i = 0; i < N; i++) {
      const ti = i / (N - 1)
      const x = xTop + (xBot - xTop) * ti + (Math.random() - 0.5) * 0.012
      const y = TOP_Y + (BOT_Y - TOP_Y) * ti
      push(x, y, (Math.random() - 0.5) * 0.04, ACCENT.clone().multiplyScalar(0.55))
    }
  }

  // ---- HORIZONTAL CROSS-WIRE — the front rail across the basket ----
  for (let i = 0; i < 90; i++) {
    const t = i / 89
    const x = -0.85 + t * 1.7
    const y = -0.1
    push(x, y + (Math.random() - 0.5) * 0.012, (Math.random() - 0.5) * 0.04, ACCENT.clone().multiplyScalar(0.55))
  }

  // ---- HANDLE — angled bar going up-right from top-left of basket ----
  // start at TL going up and slightly out
  const handleStart = new THREE.Vector3(TL[0] - 0.06, TL[1] + 0.04, 0)
  const handleMid = new THREE.Vector3(TL[0] - 0.42, TL[1] + 0.55, 0)
  const handleEnd = new THREE.Vector3(TL[0] - 0.78, TL[1] + 0.85, 0)
  // use a quadratic bezier feel: sample along two segments
  const sampleSeg = (a, b, n) => {
    for (let i = 0; i < n; i++) {
      const t = i / (n - 1)
      const x = a.x + (b.x - a.x) * t
      const y = a.y + (b.y - a.y) * t
      push(
        x + (Math.random() - 0.5) * 0.01,
        y + (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.03,
        ACCENT.clone().lerp(WHITE, 0.15),
      )
    }
  }
  sampleSeg(handleStart, handleMid, 100)
  sampleSeg(handleMid, handleEnd, 100)

  // grip — small ellipse at the end of the handle
  for (let i = 0; i < 50; i++) {
    const ang = Math.random() * Math.PI * 2
    const r = 0.05 * Math.sqrt(Math.random())
    const x = handleEnd.x + Math.cos(ang) * r
    const y = handleEnd.y + Math.sin(ang) * r * 0.6
    push(x, y, (Math.random() - 0.5) * 0.04, AMBER.clone().lerp(WHITE, 0.3))
  }

  // ---- WHEELS — 2 circles below the basket ----
  const WHEEL_Y = -0.78
  const WHEEL_R = 0.12
  const WHEELS = [-0.5, 0.5]
  WHEELS.forEach((wx) => {
    // outer ring
    for (let i = 0; i < 70; i++) {
      const ang = (i / 70) * Math.PI * 2
      const r = WHEEL_R + (Math.random() - 0.5) * 0.012
      const x = wx + Math.cos(ang) * r
      const y = WHEEL_Y + Math.sin(ang) * r
      push(x, y, (Math.random() - 0.5) * 0.04, ACCENT.clone().lerp(WHITE, 0.2))
    }
    // hub fill
    for (let i = 0; i < 20; i++) {
      const ang = Math.random() * Math.PI * 2
      const r = 0.04 * Math.sqrt(Math.random())
      const x = wx + Math.cos(ang) * r
      const y = WHEEL_Y + Math.sin(ang) * r
      push(x, y, (Math.random() - 0.5) * 0.03, WHITE.clone().lerp(ACCENT, 0.4))
    }
  })

  // wheel struts — short lines connecting basket bottom to each wheel
  WHEELS.forEach((wx) => {
    for (let i = 0; i < 40; i++) {
      const t = i / 39
      const xBase = wx - 0.08 + t * 0.16
      const yBase = BOT_Y
      const x = xBase + (wx - xBase) * t
      const y = yBase + (WHEEL_Y + WHEEL_R - yBase) * t
      push(x, y, (Math.random() - 0.5) * 0.03, ACCENT.clone().multiplyScalar(0.6))
    }
  })

  // ---- ITEMS INSIDE the basket — 3 glowing colored dot clusters ----
  // each item is a small spherical cluster sitting just above the bottom rail
  const ITEMS = [
    { cx: -0.5, cy: 0.05, r: 0.16, color: BLUE,    pop: 0.3 },
    { cx:  0.0, cy: 0.12, r: 0.20, color: AMBER,   pop: 0.4 },
    { cx:  0.45, cy: 0.05, r: 0.14, color: VIOLET, pop: 0.3 },
  ]
  ITEMS.forEach((item) => {
    const N = 90
    for (let i = 0; i < N; i++) {
      const r = item.r * Math.pow(Math.random(), 0.6)  // bias toward center
      const ang = Math.random() * Math.PI * 2
      const x = item.cx + Math.cos(ang) * r
      const y = item.cy + Math.sin(ang) * r * 0.85
      const z = (Math.random() - 0.5) * 0.1
      // brighter at the center for a glowy product feel
      const tNorm = r / item.r
      const c = item.color.clone().lerp(WHITE, (1 - tNorm) * item.pop)
      push(x, y, z, c)
    }
  })

  return {
    positions: new Float32Array(positions),
    colors: new Float32Array(colors),
    homes: new Float32Array(positions),
    count: positions.length / 3,
  }
}

// =============================================================================
// Particle field — same physics vocabulary as the rest of the family
// =============================================================================
function CartField({ mouseRef, autoSpinRef }) {
  const groupRef = useRef(null)
  const { camera } = useThree()
  const { positions, colors, homes, count } = useMemo(() => buildCart(), [])
  const velocities = useMemo(() => new Float32Array(count * 3), [count])
  const cursorWorld = useRef(new THREE.Vector3())
  const tmp = useRef(new THREE.Vector3())

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions.slice(), 3))
    g.setAttribute('color', new THREE.BufferAttribute(colors.slice(), 3))
    return g
  }, [positions, colors])

  useEffect(() => () => geometry.dispose(), [geometry])

  // physics — same numbers as rocket / bank / phone
  const SCATTER_RADIUS = 0.7
  const SCATTER_RADIUS_SQ = SCATTER_RADIUS * SCATTER_RADIUS
  const REPULSE = 0.34
  const SPRING = 0.012
  const DAMPING = 0.93

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (groupRef.current && autoSpinRef.current) {
      // gentle yaw oscillation so 3D depth reads
      groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.35
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.04
    }

    const m = mouseRef.current
    const haveMouse = m && (m.x !== 0 || m.y !== 0)
    if (haveMouse) {
      cursorWorld.current.set(m.x, m.y, 0.5)
      cursorWorld.current.unproject(camera)
      const dir = tmp.current.copy(cursorWorld.current).sub(camera.position).normalize()
      const dist = -camera.position.z / dir.z
      cursorWorld.current.copy(camera.position).add(dir.multiplyScalar(dist))
    } else {
      cursorWorld.current.set(9999, 9999, 9999)
    }
    const local = tmp.current.copy(cursorWorld.current)
    if (groupRef.current) groupRef.current.worldToLocal(local)
    const cx = local.x, cy = local.y, cz = local.z

    const pos = geometry.attributes.position.array

    for (let i = 0; i < count; i++) {
      const ix = i * 3, iy = i * 3 + 1, iz = i * 3 + 2

      const dx = pos[ix] - cx
      const dy = pos[iy] - cy
      const dz = pos[iz] - cz
      const dSq = dx * dx + dy * dy + dz * dz

      if (dSq < SCATTER_RADIUS_SQ) {
        const d = Math.sqrt(dSq) + 0.0001
        const falloff = 1 - d / SCATTER_RADIUS
        const f = REPULSE * falloff * falloff
        velocities[ix] += (dx / d) * f
        velocities[iy] += (dy / d) * f
        velocities[iz] += (dz / d) * f
        velocities[ix] += (Math.random() - 0.5) * 0.04 * falloff
        velocities[iy] += (Math.random() - 0.5) * 0.04 * falloff
        velocities[iz] += (Math.random() - 0.5) * 0.03 * falloff
      }

      velocities[ix] += (homes[ix] - pos[ix]) * SPRING
      velocities[iy] += (homes[iy] - pos[iy]) * SPRING
      velocities[iz] += (homes[iz] - pos[iz]) * SPRING

      velocities[ix] *= DAMPING
      velocities[iy] *= DAMPING
      velocities[iz] *= DAMPING

      pos[ix] += velocities[ix]
      pos[iy] += velocities[iy]
      pos[iz] += velocities[iz]
    }

    geometry.attributes.position.needsUpdate = true
  })

  return (
    <group ref={groupRef}>
      <points geometry={geometry}>
        <pointsMaterial
          size={0.024}
          vertexColors
          transparent
          opacity={0.95}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}

// =============================================================================
// PUBLIC COMPONENT
// =============================================================================
export default function ParticleCart() {
  const containerRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const autoSpinRef = useRef(true)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = (e) => setReduced(e.matches)
    mq.addEventListener?.('change', onChange)
    return () => mq.removeEventListener?.('change', onChange)
  }, [])

  useEffect(() => {
    autoSpinRef.current = !reduced
  }, [reduced])

  useEffect(() => {
    const update = (e) => {
      const el = containerRef.current
      if (!el) return
      const section = el.closest('section') || el
      const r = section.getBoundingClientRect()
      const inside =
        e.clientX >= r.left && e.clientX <= r.right &&
        e.clientY >= r.top && e.clientY <= r.bottom
      if (inside) {
        mouseRef.current.x = ((e.clientX - r.left) / r.width) * 2 - 1
        mouseRef.current.y = -(((e.clientY - r.top) / r.height) * 2 - 1)
      } else {
        mouseRef.current.x *= 0.9
        mouseRef.current.y *= 0.9
        if (Math.abs(mouseRef.current.x) < 0.01) mouseRef.current.x = 0
        if (Math.abs(mouseRef.current.y) < 0.01) mouseRef.current.y = 0
      }
    }
    window.addEventListener('pointermove', update, { passive: true })
    return () => window.removeEventListener('pointermove', update)
  }, [])

  return (
    <div
      ref={containerRef}
      className="w-full h-full select-none"
      style={{ touchAction: 'pan-y' }}
    >
      <Canvas
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 4.0], fov: 38 }}
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <ambientLight intensity={0.5} />
        <CartField mouseRef={mouseRef} autoSpinRef={autoSpinRef} />
      </Canvas>
    </div>
  )
}
