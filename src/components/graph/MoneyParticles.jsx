'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

const ACCENT = new THREE.Color('#2DE2C5')
const BLUE = new THREE.Color('#38BDF8')
const WHITE = new THREE.Color('#F4F7FA')

// =============================================================================
// Build a giant "$" out of particles.
// Approach: parametric definition of the glyph (vertical bar + S-curve) in 3D
// space. Each piece samples points uniformly so the form reads instantly.
// =============================================================================
function buildDollar() {
  const positions = []
  const colors = []

  const push = (x, y, z, c) => {
    positions.push(x, y, z)
    colors.push(c.r, c.g, c.b)
  }

  // ---- Vertical bar through the center of the S ----
  const BAR_TOP = 1.45
  const BAR_BOT = -1.45
  const BAR_W = 0.05
  const BAR_D = 0.03
  for (let i = 0; i < 600; i++) {
    const y = BAR_BOT + Math.random() * (BAR_TOP - BAR_BOT)
    const x = (Math.random() - 0.5) * BAR_W
    const z = (Math.random() - 0.5) * BAR_D
    const c = ACCENT.clone().lerp(WHITE, Math.random() < 0.06 ? 0.5 : 0)
    push(x, y, z, c)
  }

  // ---- The S-curve ----
  // Two semicircles stacked: top one is a partial semi opening to the right,
  // bottom one is a partial semi opening to the left. Together they form an S.
  // We sample by parameterizing a continuous curve.
  const STROKE_THICKNESS = 0.06
  const TOP_R = 0.55
  const BOT_R = 0.55
  const TOP_CY = 0.55
  const BOT_CY = -0.55

  // top arc: from (0, top_cy + R) to (-R, top_cy) to (0, top_cy - R) sweeping LEFT
  // expressed as angle from PI/2 (top) → 3*PI/2 (bottom) on the LEFT side
  // continuing into bottom arc on the RIGHT side: angle 3*PI/2 → PI/2
  // We sample S as one continuous arc-length parameter

  const S_POINTS = 2400
  for (let i = 0; i < S_POINTS; i++) {
    // pick which half of the S
    const half = Math.random() < 0.5 ? 'top' : 'bottom'
    let cx_curve, cy_curve, r_curve, angStart, angEnd
    if (half === 'top') {
      // top arc opens rightward (so curve goes LEFT from top to middle)
      // angle range: from -PI/4 (top-right) → PI (left) → 3PI/4 (bottom-right)
      cx_curve = 0
      cy_curve = TOP_CY
      r_curve = TOP_R
      angStart = -Math.PI / 4
      angEnd = Math.PI + Math.PI / 4 // sweep ~5*PI/4
    } else {
      // bottom arc opens leftward
      cx_curve = 0
      cy_curve = BOT_CY
      r_curve = BOT_R
      angStart = Math.PI - Math.PI / 4
      angEnd = 2 * Math.PI + Math.PI / 4 // sweep ~5*PI/4
    }
    const t = Math.random()
    const ang = angStart + (angEnd - angStart) * t
    const r = r_curve + (Math.random() - 0.5) * STROKE_THICKNESS
    const x = cx_curve + Math.cos(ang) * r
    const y = cy_curve + Math.sin(ang) * r
    const z = (Math.random() - 0.5) * STROKE_THICKNESS

    const c = ACCENT.clone().lerp(WHITE, Math.random() < 0.06 ? 0.5 : 0)
    push(x, y, z, c)
  }

  // Connect the two arcs through the middle so the S reads continuously.
  // A small diagonal stroke from end of top arc → start of bottom arc.
  // Top arc ends near (R*cos(3PI/4), TOP_CY + R*sin(3PI/4)) ≈ (-0.39, 0.16)
  // Bottom arc starts near (R*cos(-PI/4), BOT_CY + R*sin(-PI/4)) ≈ (0.39, -0.94)
  // We add a soft connector arc through the middle to smooth.
  const CONNECTOR_POINTS = 280
  for (let i = 0; i < CONNECTOR_POINTS; i++) {
    const t = Math.random()
    // bezier-like: from (-0.4, 0.05) → (0, 0) → (0.4, -0.05)
    const x = -0.4 + t * 0.8
    const y = 0.05 - t * 0.1 + Math.sin(t * Math.PI) * 0.02
    const r = (Math.random() - 0.5) * STROKE_THICKNESS
    const z = (Math.random() - 0.5) * STROKE_THICKNESS
    const c = ACCENT.clone().lerp(WHITE, 0.05)
    push(x + r * 0.5, y, z, c)
  }

  // ---- A few sparse blue accents distributed along the whole glyph ----
  // Adds chromatic interest without breaking the monochrome read
  for (let i = 0; i < 220; i++) {
    const half = Math.random() < 0.5 ? 'top' : 'bottom'
    const cx_curve = 0
    const cy_curve = half === 'top' ? TOP_CY : BOT_CY
    const r_curve = half === 'top' ? TOP_R : BOT_R
    const angStart = half === 'top' ? -Math.PI / 4 : Math.PI - Math.PI / 4
    const sweep = Math.PI + Math.PI / 2
    const t = Math.random()
    const ang = angStart + sweep * t
    const r = r_curve + (Math.random() - 0.5) * STROKE_THICKNESS * 0.8
    const x = cx_curve + Math.cos(ang) * r
    const y = cy_curve + Math.sin(ang) * r
    const z = (Math.random() - 0.5) * STROKE_THICKNESS
    push(x, y, z, BLUE.clone())
  }

  const count = positions.length / 3
  return {
    positions: new Float32Array(positions),
    colors: new Float32Array(colors),
    homes: new Float32Array(positions.slice()),
    count,
  }
}

// =============================================================================
// PARTICLE FIELD — one giant $ symbol with cursor scatter physics.
// Same vocabulary as the rocket / bank.
// =============================================================================
function DollarField({ mouseRef, autoSpinRef }) {
  const groupRef = useRef(null)
  const { camera } = useThree()
  const { positions, colors, homes, count } = useMemo(() => buildDollar(), [])
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

  // physics — same tunables as the bank for a consistent feel
  const SCATTER_RADIUS = 0.85
  const SCATTER_RADIUS_SQ = SCATTER_RADIUS * SCATTER_RADIUS
  const REPULSE = 0.36
  const SPRING = 0.011
  const DAMPING = 0.93

  useFrame((state) => {
    // continuous slow yaw spin (pauses only on prefers-reduced-motion)
    if (groupRef.current && autoSpinRef.current) {
      groupRef.current.rotation.y += 0.0014
      // gentle vertical bob for life
      const t = state.clock.elapsedTime
      groupRef.current.position.y = Math.sin(t * 0.35) * 0.06
    }

    // cursor projection to world plane z=0
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

    // local cursor (so scatter follows the rotated $)
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
        // chaotic kicks — sells the destruction
        velocities[ix] += (Math.random() - 0.5) * 0.04 * falloff
        velocities[iy] += (Math.random() - 0.5) * 0.04 * falloff
        velocities[iz] += (Math.random() - 0.5) * 0.03 * falloff
      }

      // spring back home
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
export default function MoneyParticles() {
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

  // Track cursor at the section level so scatter works even when copy overlay
  // blocks the canvas.
  useEffect(() => {
    const update = (e) => {
      const el = containerRef.current
      if (!el) return
      const section = el.closest('section') || el
      const r = section.getBoundingClientRect()
      const inside =
        e.clientX >= r.left && e.clientX <= r.right &&
        e.clientY >= r.top  && e.clientY <= r.bottom
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
        camera={{ position: [0, 0, 5.4], fov: 38 }}
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <ambientLight intensity={0.5} />
        <DollarField mouseRef={mouseRef} autoSpinRef={autoSpinRef} />
      </Canvas>
    </div>
  )
}
