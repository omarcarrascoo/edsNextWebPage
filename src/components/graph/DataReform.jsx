'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

const ACCENT = new THREE.Color('#2DE2C5')
const BLUE = new THREE.Color('#38BDF8')
const VIOLET = new THREE.Color('#9D8DF1')
const AMBER = new THREE.Color('#F5B544')
const WHITE = new THREE.Color('#F4F7FA')

const PARTICLE_COUNT = 1800

// =============================================================================
// FORMATIONS — each formation maps a particle index to a target (x, y, z)
// position. Particles spring toward whichever formation is currently active,
// so the field continuously reshapes without re-spawning.
//
// All formations live in the rectangle x ∈ [-2.4, 2.4], y ∈ [-1.4, 1.4],
// with mostly small z (the wall is roughly flat to camera).
// =============================================================================

// 0 — CHAOS: scattered randomly in a wide area with depth
function chaosTarget(i, target, seedOffset) {
  // deterministic pseudo-random by index → stable target across re-runs
  const r1 = pseudo(i + seedOffset * 17)
  const r2 = pseudo(i * 3 + seedOffset * 41)
  const r3 = pseudo(i * 7 + seedOffset * 113)
  target.x = (r1 - 0.5) * 5.2
  target.y = (r2 - 0.5) * 3.0
  target.z = (r3 - 0.5) * 2.0
}

// 1 — BAR CHART: 12 vertical bars, each ~150 particles
function barChartTarget(i, target, seedOffset) {
  const BARS = 12
  const bar = i % BARS
  const inBar = Math.floor(i / BARS) // 0..(N/12 - 1)
  const heights = [0.32, 0.55, 0.42, 0.78, 0.65, 0.92, 0.81, 1.05, 0.74, 1.18, 0.95, 1.32]
  const h = heights[bar]
  const xSpan = 4.6
  const x = -xSpan / 2 + (bar / (BARS - 1)) * xSpan
  // distribute "inBar" along the bar height + small horizontal jitter
  const ratio = (inBar % 150) / 150
  target.x = x + (pseudo(i * 5 + seedOffset) - 0.5) * 0.16
  target.y = -1.2 + ratio * h * 2.2
  target.z = (pseudo(i * 11 + seedOffset) - 0.5) * 0.2
}

// 2 — LINE CHART (sparkline): single curved line drawn left to right
function lineChartTarget(i, target, seedOffset) {
  const t = i / PARTICLE_COUNT // 0..1
  const x = -2.4 + t * 4.8
  // smooth wavy line — multi-frequency
  const y =
    Math.sin(t * Math.PI * 2.4) * 0.6 +
    Math.sin(t * Math.PI * 7) * 0.18 +
    Math.cos(t * Math.PI * 4 + 1.2) * 0.3 -
    0.1
  target.x = x + (pseudo(i * 13 + seedOffset) - 0.5) * 0.05
  target.y = y + (pseudo(i * 17 + seedOffset) - 0.5) * 0.08
  target.z = (pseudo(i * 23 + seedOffset) - 0.5) * 0.15
}

// 3 — RING / GAUGE: filled arc going 270° clockwise (KPI gauge feel)
function gaugeTarget(i, target, seedOffset) {
  const t = i / PARTICLE_COUNT
  // 270° arc starting at 135° going clockwise to -135° (= 225°)
  const startAngle = (135 * Math.PI) / 180
  const endAngle = (-135 * Math.PI) / 180
  // smooth angle from start → end via lerp
  const ang = startAngle + (endAngle - startAngle) * t
  const r = 1.05 + (pseudo(i * 19 + seedOffset) - 0.5) * 0.08
  target.x = Math.cos(ang) * r
  target.y = Math.sin(ang) * r
  target.z = (pseudo(i * 29 + seedOffset) - 0.5) * 0.12
}

// 4 — GRID / DASHBOARD: 6×4 grid of dot clusters, each cluster ~75 particles
function gridTarget(i, target, seedOffset) {
  const COLS = 6
  const ROWS = 4
  const TOTAL_TILES = COLS * ROWS // 24
  const tile = i % TOTAL_TILES
  const inTile = Math.floor(i / TOTAL_TILES)
  const col = tile % COLS
  const row = Math.floor(tile / COLS)
  const xSpan = 4.4
  const ySpan = 2.4
  const cx = -xSpan / 2 + (col / (COLS - 1)) * xSpan
  const cy = -ySpan / 2 + (row / (ROWS - 1)) * ySpan
  // small disc around tile center — distribute via spiral so it looks intentional
  const a = inTile * 0.45 + seedOffset
  const r = 0.04 + (inTile % 12) * 0.012
  target.x = cx + Math.cos(a) * r
  target.y = cy + Math.sin(a) * r
  target.z = (pseudo(i * 31 + seedOffset) - 0.5) * 0.15
}

const FORMATIONS = [chaosTarget, gridTarget, barChartTarget, lineChartTarget, gaugeTarget]
const FORMATION_LABELS = ['raw', 'dashboard', 'volume', 'trend', 'kpi']

function pseudo(n) {
  // simple deterministic hash → [0, 1)
  const x = Math.sin(n * 12.9898) * 43758.5453
  return x - Math.floor(x)
}

// =============================================================================
// PARTICLE FIELD — particles spring toward the active formation's target.
// Cursor scatter overrides briefly, then spring continues.
// =============================================================================
function ReformField({ mouseRef, formationRef, onFormationChange }) {
  const groupRef = useRef(null)
  const { camera } = useThree()

  // Initial positions = chaos (matches initial formation index 0)
  const initialPositions = useMemo(() => {
    const arr = new Float32Array(PARTICLE_COUNT * 3)
    const t = new THREE.Vector3()
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      chaosTarget(i, t, 0)
      arr[i * 3] = t.x
      arr[i * 3 + 1] = t.y
      arr[i * 3 + 2] = t.z
    }
    return arr
  }, [])

  // Per-particle colors — assigned once
  const colors = useMemo(() => {
    const arr = new Float32Array(PARTICLE_COUNT * 3)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const r = pseudo(i * 47)
      const c =
        r < 0.05 ? WHITE.clone().lerp(ACCENT, 0.4) :
        r < 0.20 ? BLUE.clone() :
        r < 0.28 ? VIOLET.clone() :
        r < 0.34 ? AMBER.clone() :
        ACCENT.clone()
      arr[i * 3] = c.r
      arr[i * 3 + 1] = c.g
      arr[i * 3 + 2] = c.b
    }
    return arr
  }, [])

  const velocities = useMemo(() => new Float32Array(PARTICLE_COUNT * 3), [])

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(initialPositions.slice(), 3))
    g.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return g
  }, [initialPositions, colors])

  useEffect(() => () => geometry.dispose(), [geometry])

  // physics tunables
  const SCATTER_RADIUS = 0.7
  const SCATTER_RADIUS_SQ = SCATTER_RADIUS * SCATTER_RADIUS
  const REPULSE = 0.3
  // Spring is stronger when targets are stable (formation locked) so transitions feel snappy
  const FORM_SPRING = 0.045
  const DAMPING = 0.86

  const cursorWorld = useRef(new THREE.Vector3())
  const tmp = useRef(new THREE.Vector3())
  const tmpTarget = useRef(new THREE.Vector3())

  // Auto-cycle formations
  useEffect(() => {
    const id = setInterval(() => {
      const next = (formationRef.current + 1) % FORMATIONS.length
      formationRef.current = next
      onFormationChange?.(next)
    }, 3500)
    return () => clearInterval(id)
  }, [formationRef, onFormationChange])

  useFrame((state) => {
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
    const local = tmp.current.copy(cursorWorld.current)
    if (groupRef.current) groupRef.current.worldToLocal(local)
    const cx = local.x, cy = local.y, cz = local.z

    const pos = geometry.attributes.position.array
    const formation = FORMATIONS[formationRef.current]
    const seed = formationRef.current

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const ix = i * 3, iy = i * 3 + 1, iz = i * 3 + 2

      // compute target for this formation
      formation(i, tmpTarget.current, seed)

      // cursor scatter
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
        velocities[ix] += (Math.random() - 0.5) * 0.03 * falloff
        velocities[iy] += (Math.random() - 0.5) * 0.03 * falloff
      }

      // spring toward formation target
      velocities[ix] += (tmpTarget.current.x - pos[ix]) * FORM_SPRING
      velocities[iy] += (tmpTarget.current.y - pos[iy]) * FORM_SPRING
      velocities[iz] += (tmpTarget.current.z - pos[iz]) * FORM_SPRING

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
          size={0.022}
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
export default function DataReform() {
  const containerRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const formationRef = useRef(0)
  const [activeIdx, setActiveIdx] = useState(0)

  // Section-level pointer tracking — survives copy overlays
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
      className="w-full h-full select-none relative"
      style={{ touchAction: 'pan-y' }}
    >
      <Canvas
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 5.4], fov: 38 }}
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <ambientLight intensity={0.5} />
        <ReformField
          mouseRef={mouseRef}
          formationRef={formationRef}
          onFormationChange={setActiveIdx}
        />
      </Canvas>

      {/* HUD overlay — current formation label + tabs */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
        <div className="flex items-center gap-2">
          <span className="status-dot run" />
          <p className="mono-label text-fog-400 text-[10px] tracking-[0.22em]">
            data.reform
          </p>
        </div>
        <p className="mono-label text-accent text-[10px] tracking-[0.22em]">
          {FORMATION_LABELS[activeIdx]}
        </p>
      </div>

      {/* progress dots — bottom center */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 pointer-events-none z-10">
        {FORMATIONS.map((_, i) => (
          <span
            key={i}
            className={`h-px transition-all duration-500 ${
              i === activeIdx ? 'w-6 bg-accent' : 'w-3 bg-fog-500/30'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
