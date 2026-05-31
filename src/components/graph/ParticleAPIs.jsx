'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

const ACCENT = new THREE.Color('#2DE2C5')
const BLUE = new THREE.Color('#38BDF8')
const VIOLET = new THREE.Color('#9D8DF1')
const WHITE = new THREE.Color('#F4F7FA')

// =============================================================================
// DNA double helix parameters.
// Two strands wind around the y axis; rungs connect them at regular intervals.
// =============================================================================
const HELIX_RADIUS = 0.55
const Y_TOP = 1.85
const Y_BOT = -1.85
const PITCH = 1.5            // y distance per full turn (smaller = tighter helix)
const RUNG_COUNT = 22

function strandPos(y, phaseOffset) {
  const theta = (y / PITCH) * Math.PI * 2 + phaseOffset
  return new THREE.Vector3(
    Math.cos(theta) * HELIX_RADIUS,
    y,
    Math.sin(theta) * HELIX_RADIUS,
  )
}

// =============================================================================
// Build the helix: two strands + rungs. Each particle stores its "home"
// position so it springs back after cursor scatter.
// =============================================================================
function buildHelix() {
  const positions = []
  const colors = []
  // 0 = strand A, 1 = strand B, 2 = rung — used to color-pulse later
  const kinds = []

  const push = (x, y, z, c, kind) => {
    positions.push(x, y, z)
    colors.push(c.r, c.g, c.b)
    kinds.push(kind)
  }

  // ---- STRAND A — accent color, dense particles along the curve ----
  const STRAND_POINTS = 360
  for (let i = 0; i < STRAND_POINTS; i++) {
    const y = Y_BOT + (i / STRAND_POINTS) * (Y_TOP - Y_BOT)
    const p = strandPos(y, 0)
    // small thickness — jitter normal to the curve
    const jitter = (Math.random() - 0.5) * 0.04
    const c = Math.random() < 0.08
      ? WHITE.clone().lerp(ACCENT, 0.4)
      : ACCENT.clone()
    push(
      p.x + jitter,
      p.y + jitter * 0.3,
      p.z + (Math.random() - 0.5) * 0.04,
      c,
      0,
    )
  }

  // ---- STRAND B — blue, opposite phase (π shift) ----
  for (let i = 0; i < STRAND_POINTS; i++) {
    const y = Y_BOT + (i / STRAND_POINTS) * (Y_TOP - Y_BOT)
    const p = strandPos(y, Math.PI)
    const jitter = (Math.random() - 0.5) * 0.04
    const c = Math.random() < 0.08
      ? WHITE.clone().lerp(BLUE, 0.4)
      : BLUE.clone()
    push(
      p.x + jitter,
      p.y + jitter * 0.3,
      p.z + (Math.random() - 0.5) * 0.04,
      c,
      1,
    )
  }

  // ---- RUNGS — short particle bridges between the two strands ----
  // Each rung lives at a specific y, connecting strand A to strand B.
  // We sample particles along the line between the two strand positions.
  for (let r = 0; r < RUNG_COUNT; r++) {
    const t = r / (RUNG_COUNT - 1)
    const y = Y_BOT + 0.05 + t * (Y_TOP - Y_BOT - 0.1)
    const a = strandPos(y, 0)
    const b = strandPos(y, Math.PI)
    const RUNG_PARTICLES = 14
    for (let i = 0; i < RUNG_PARTICLES; i++) {
      const u = (i + 0.5) / RUNG_PARTICLES
      const x = a.x + (b.x - a.x) * u
      const py = y + (Math.random() - 0.5) * 0.025
      const z = a.z + (b.z - a.z) * u
      // alternate color along the rung for a "base pair" feel
      const c = u < 0.5
        ? ACCENT.clone().lerp(WHITE, 0.45)
        : BLUE.clone().lerp(WHITE, 0.45)
      push(
        x + (Math.random() - 0.5) * 0.02,
        py,
        z + (Math.random() - 0.5) * 0.02,
        c,
        2,
      )
    }
    // small "node" at each end of the rung (where it meets the strand)
    for (let p = 0; p < 6; p++) {
      const ang = Math.random() * Math.PI * 2
      const rad = 0.025 * Math.sqrt(Math.random())
      // node at strand A side
      push(
        a.x + Math.cos(ang) * rad,
        y + Math.sin(ang) * rad,
        a.z + (Math.random() - 0.5) * 0.025,
        WHITE.clone().lerp(ACCENT, 0.4),
        2,
      )
      // node at strand B side
      push(
        b.x + Math.cos(ang) * rad,
        y + Math.sin(ang) * rad,
        b.z + (Math.random() - 0.5) * 0.025,
        WHITE.clone().lerp(BLUE, 0.4),
        2,
      )
    }
  }

  return {
    positions: new Float32Array(positions),
    colors: new Float32Array(colors),
    homes: new Float32Array(positions),
    kinds: new Uint8Array(kinds),
    count: positions.length / 3,
  }
}

// =============================================================================
// Helix field — cursor scatter + spring back + traveling brightness pulse.
// =============================================================================
function HelixField({ mouseRef, autoSpinRef }) {
  const groupRef = useRef(null)
  const { camera } = useThree()
  const { positions, colors, homes, kinds, count } = useMemo(() => buildHelix(), [])
  const homeColors = useMemo(() => Float32Array.from(colors), [colors])
  const velocities = useMemo(() => new Float32Array(count * 3), [count])
  const cursorWorld = useRef(new THREE.Vector3())
  const tmp = useRef(new THREE.Vector3())

  // pulse moves bottom → top continuously; brightens particles near its y
  const pulseY = useRef(Y_BOT)

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions.slice(), 3))
    g.setAttribute('color', new THREE.BufferAttribute(colors.slice(), 3))
    return g
  }, [positions, colors])

  useEffect(() => () => geometry.dispose(), [geometry])

  // physics — same family vocabulary as rocket / bank / phone
  const SCATTER_RADIUS = 0.7
  const SCATTER_RADIUS_SQ = SCATTER_RADIUS * SCATTER_RADIUS
  const REPULSE = 0.32
  const SPRING = 0.014
  const DAMPING = 0.93
  const COLOR_LERP = 0.14
  const PULSE_BAND = 0.45
  const PULSE_SPEED = 1.4

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime
    if (groupRef.current && autoSpinRef.current) {
      // continuous yaw rotation so the 3D helix is fully visible
      groupRef.current.rotation.y += 0.004
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.025
    }

    // advance pulse, wrap from top back to bottom
    pulseY.current += dt * PULSE_SPEED
    if (pulseY.current > Y_TOP + PULSE_BAND) pulseY.current = Y_BOT - PULSE_BAND
    const py = pulseY.current

    // Cursor projection onto z=0 plane
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
    const col = geometry.attributes.color.array

    for (let i = 0; i < count; i++) {
      const ix = i * 3, iy = i * 3 + 1, iz = i * 3 + 2

      // ---- cursor scatter ----
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
      }

      // tiny shimmer so the helix never feels frozen
      velocities[ix] += (Math.random() - 0.5) * 0.0012
      velocities[iy] += (Math.random() - 0.5) * 0.0012

      // spring back to home
      velocities[ix] += (homes[ix] - pos[ix]) * SPRING
      velocities[iy] += (homes[iy] - pos[iy]) * SPRING
      velocities[iz] += (homes[iz] - pos[iz]) * SPRING

      velocities[ix] *= DAMPING
      velocities[iy] *= DAMPING
      velocities[iz] *= DAMPING

      pos[ix] += velocities[ix]
      pos[iy] += velocities[iy]
      pos[iz] += velocities[iz]

      // ---- color pulse: brightness scaled by proximity to pulseY ----
      // particles near the pulse glow; far ones return to home color
      const dy2 = homes[iy] - py
      const dist01 = Math.min(1, Math.abs(dy2) / PULSE_BAND)
      const boost = 1 - dist01           // 0 far, 1 at pulse center
      const mul = 1 + boost * 0.85       // up to 1.85× brightness
      const tr = homeColors[ix] * mul
      const tg = homeColors[iy] * mul
      const tb = homeColors[iz] * mul
      col[ix] += (tr - col[ix]) * COLOR_LERP
      col[iy] += (tg - col[iy]) * COLOR_LERP
      col[iz] += (tb - col[iz]) * COLOR_LERP
    }

    geometry.attributes.position.needsUpdate = true
    geometry.attributes.color.needsUpdate = true
  })

  return (
    <group ref={groupRef}>
      <points geometry={geometry}>
        <pointsMaterial
          size={0.026}
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
export default function ParticleAPIs() {
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
        camera={{ position: [0, 0, 4.6], fov: 42 }}
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <ambientLight intensity={0.5} />
        <HelixField mouseRef={mouseRef} autoSpinRef={autoSpinRef} />
      </Canvas>
    </div>
  )
}
