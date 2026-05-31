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
// Build a server rack silhouette out of particles.
// Each rack has:
//   - vertical frame outline (4 corners)
//   - horizontal U-row dividers
//   - LED indicators on each row
//   - vent slots stripe pattern
// All particles share scatter physics with the rocket / bank.
// =============================================================================
function buildServer() {
  const positions = []
  const colors = []

  const push = (x, y, z, c) => {
    positions.push(x, y, z)
    colors.push(c.r, c.g, c.b)
  }

  // ---- Rack frame ----
  // box dimensions: w=1.6, h=2.8, d=0.4
  const W = 1.6
  const H = 2.8
  const D = 0.4

  // Frame: 4 vertical edges + 4 horizontal edges (front face only — back implied by depth)
  const FRAME_POINTS = 600
  for (let i = 0; i < FRAME_POINTS; i++) {
    const edge = Math.floor(Math.random() * 8)
    let x, y, z
    const t = Math.random()
    switch (edge) {
      case 0: // top-front (along x)
        x = -W / 2 + t * W; y = H / 2; z = D / 2
        break
      case 1: // bottom-front
        x = -W / 2 + t * W; y = -H / 2; z = D / 2
        break
      case 2: // left-front (along y)
        x = -W / 2; y = -H / 2 + t * H; z = D / 2
        break
      case 3: // right-front
        x = W / 2; y = -H / 2 + t * H; z = D / 2
        break
      case 4: // top-back
        x = -W / 2 + t * W; y = H / 2; z = -D / 2
        break
      case 5: // bottom-back
        x = -W / 2 + t * W; y = -H / 2; z = -D / 2
        break
      case 6: // left-back
        x = -W / 2; y = -H / 2 + t * H; z = -D / 2
        break
      default: // right-back
        x = W / 2; y = -H / 2 + t * H; z = -D / 2
    }
    const jitter = 0.008
    const c = ACCENT.clone().lerp(WHITE, Math.random() < 0.06 ? 0.4 : 0)
    push(
      x + (Math.random() - 0.5) * jitter,
      y + (Math.random() - 0.5) * jitter,
      z + (Math.random() - 0.5) * jitter,
      c,
    )
  }

  // ---- Depth edges (corners) — connect front to back ----
  const CORNER_POINTS = 200
  const corners = [
    [-W / 2, H / 2], [W / 2, H / 2], [-W / 2, -H / 2], [W / 2, -H / 2],
  ]
  for (const [cx, cy] of corners) {
    for (let i = 0; i < CORNER_POINTS; i++) {
      const z = -D / 2 + Math.random() * D
      const c = ACCENT.clone().multiplyScalar(0.7)
      push(cx, cy, z, c)
    }
  }

  // ---- U-rows: 8 horizontal trays inside the rack ----
  const U_COUNT = 8
  const U_HEIGHT = (H - 0.2) / U_COUNT
  for (let u = 0; u < U_COUNT; u++) {
    const yTop = H / 2 - 0.1 - u * U_HEIGHT

    // Top divider line — bright accent
    for (let i = 0; i < 90; i++) {
      const x = -W / 2 + 0.05 + Math.random() * (W - 0.1)
      const z = D / 2 + 0.005
      const c = ACCENT.clone().lerp(WHITE, 0.3)
      push(x, yTop, z, c)
    }

    // Vent slots — horizontal stripe pattern across the tray
    const ventY = yTop - U_HEIGHT * 0.6
    for (let s = 0; s < 14; s++) {
      const sx = -W / 2 + 0.12 + (s / 14) * (W - 0.4)
      for (let i = 0; i < 8; i++) {
        const x = sx + (Math.random() - 0.5) * 0.04
        const y = ventY + (Math.random() - 0.5) * 0.02
        const z = D / 2 + 0.003
        const c = ACCENT.clone().multiplyScalar(0.4)
        push(x, y, z, c)
      }
    }

    // LED indicators — 3 lights on the right side of each tray
    const ledX = W / 2 - 0.1
    const ledY = yTop - U_HEIGHT * 0.35
    const ledColors = [
      // first led: green (active), second: blue (network), third: amber (warning)
      ACCENT.clone(),
      BLUE.clone(),
      u === 2 || u === 5 ? AMBER.clone() : ACCENT.clone().multiplyScalar(0.3),
    ]
    for (let li = 0; li < 3; li++) {
      const lx = ledX - li * 0.06
      for (let i = 0; i < 14; i++) {
        const ang = Math.random() * Math.PI * 2
        const r = 0.018 * Math.sqrt(Math.random())
        const x = lx + Math.cos(ang) * r
        const y = ledY + Math.sin(ang) * r
        const z = D / 2 + 0.012
        push(x, y, z, ledColors[li])
      }
    }

    // Disk drives — small rectangles on the left
    const driveX = -W / 2 + 0.18
    const driveY = ledY
    for (let d = 0; d < 4; d++) {
      const dx = driveX + d * 0.13
      // outline of small drive block
      for (let i = 0; i < 30; i++) {
        const t = Math.random()
        const side = Math.floor(Math.random() * 4)
        let x, y
        const dw = 0.1, dh = 0.05
        if (side === 0) { x = dx + (t - 0.5) * dw; y = driveY + dh / 2 }
        else if (side === 1) { x = dx + (t - 0.5) * dw; y = driveY - dh / 2 }
        else if (side === 2) { x = dx - dw / 2; y = driveY + (t - 0.5) * dh }
        else { x = dx + dw / 2; y = driveY + (t - 0.5) * dh }
        const z = D / 2 + 0.008
        const c = ACCENT.clone().multiplyScalar(0.7)
        push(x, y, z, c)
      }
    }
  }

  // ---- Top header strip — bright row with logo-ish dots ----
  for (let i = 0; i < 80; i++) {
    const x = -W / 2 + 0.05 + Math.random() * (W - 0.1)
    const y = H / 2 - 0.05
    const z = D / 2 + 0.012
    const c = ACCENT.clone().lerp(WHITE, 0.3)
    push(x, y, z, c)
  }
  // small power LED top right
  for (let i = 0; i < 18; i++) {
    const ang = Math.random() * Math.PI * 2
    const r = 0.02 * Math.sqrt(Math.random())
    const x = W / 2 - 0.08 + Math.cos(ang) * r
    const y = H / 2 - 0.05 + Math.sin(ang) * r
    const z = D / 2 + 0.018
    push(x, y, z, AMBER.clone())
  }

  // ---- Bottom feet ----
  for (const fx of [-W / 2 + 0.1, W / 2 - 0.1]) {
    for (let i = 0; i < 30; i++) {
      const x = fx + (Math.random() - 0.5) * 0.12
      const y = -H / 2 - 0.05 + (Math.random() - 0.5) * 0.04
      const z = (Math.random() - 0.5) * D
      const c = ACCENT.clone().multiplyScalar(0.5)
      push(x, y, z, c)
    }
  }

  return {
    positions: new Float32Array(positions),
    colors: new Float32Array(colors),
    homes: new Float32Array(positions.slice()),
    count: positions.length / 3,
  }
}

// =============================================================================
// Particle field — same physics vocabulary as rocket / bank / phone
// =============================================================================
function ServerField({ mouseRef, autoSpinRef }) {
  const groupRef = useRef(null)
  const { camera } = useThree()
  const { positions, colors, homes, count } = useMemo(() => buildServer(), [])
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

  // physics — same numbers as the rest of the family
  const SCATTER_RADIUS = 0.7
  const SCATTER_RADIUS_SQ = SCATTER_RADIUS * SCATTER_RADIUS
  const REPULSE = 0.34
  const SPRING = 0.012
  const DAMPING = 0.93

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (groupRef.current && autoSpinRef.current) {
      // gentle yaw oscillation so depth reads as 3D
      groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.45
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
export default function ParticleServer() {
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
        camera={{ position: [0, 0, 4.4], fov: 38 }}
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <ambientLight intensity={0.5} />
        <ServerField mouseRef={mouseRef} autoSpinRef={autoSpinRef} />
      </Canvas>
    </div>
  )
}
