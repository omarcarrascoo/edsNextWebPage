'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

const ACCENT = new THREE.Color('#2DE2C5')
const BLUE = new THREE.Color('#38BDF8')
const VIOLET = new THREE.Color('#9D8DF1')
const AMBER = new THREE.Color('#F5B544')
const WHITE = new THREE.Color('#F4F7FA')
const DIM = new THREE.Color('#1a242e')

// =============================================================================
// Build: distributed mesh network of nodes connected by particle "wires".
// Pulses (bright traveling sparks) ride along the wires from sender to receiver
// — visual metaphor for messages in transit.
// =============================================================================
function buildNetwork() {
  // 12 nodes positioned in a quasi-random distribution inside a cube
  const NODES = []
  const NODE_COUNT = 14
  // Deterministic positions — looks better than pure random and is hydration-stable.
  const seeds = [
    [-1.6, 0.95,  0.3], [-0.7,  1.4, -0.5], [ 1.0,  1.2,  0.4], [ 1.85, 0.65, -0.3],
    [-1.95, 0.05, -0.2], [-0.2,  0.4,  0.7], [ 1.5,  0.1,  0.5], [ 2.0, -0.8, -0.2],
    [-1.5, -1.0,  0.5], [-0.6, -1.4, -0.4], [ 0.8, -1.4,  0.2], [ 1.7, -1.2, -0.6],
    [-0.8,  0.0, -1.4], [ 0.4, -0.4,  1.4],
  ]
  for (let i = 0; i < NODE_COUNT; i++) {
    NODES.push(new THREE.Vector3(seeds[i][0], seeds[i][1], seeds[i][2]))
  }

  // Edges — each node connects to its k nearest neighbors (k=3) for a clean mesh
  const EDGES = []
  const k = 3
  for (let i = 0; i < NODES.length; i++) {
    const ds = NODES.map((p, j) => ({ j, d: i === j ? Infinity : NODES[i].distanceTo(p) }))
    ds.sort((a, b) => a.d - b.d)
    for (let n = 0; n < k; n++) {
      const j = ds[n].j
      // dedupe undirected edges
      const a = Math.min(i, j), b = Math.max(i, j)
      if (!EDGES.some((e) => e.a === a && e.b === b)) {
        EDGES.push({ a, b })
      }
    }
  }

  const positions = []
  const colors = []
  const kinds = [] // 0 = node, 1 = wire particle

  const push = (x, y, z, c, kind = 0) => {
    positions.push(x, y, z)
    colors.push(c.r, c.g, c.b)
    kinds.push(kind)
  }

  // ---- NODES — small dense spheres ----
  const NODE_TONES = [ACCENT, BLUE, VIOLET, ACCENT, BLUE, VIOLET, AMBER, ACCENT, BLUE, VIOLET, ACCENT, BLUE, AMBER, ACCENT]
  const POINTS_PER_NODE = 90
  for (let i = 0; i < NODES.length; i++) {
    const p = NODES[i]
    const tone = NODE_TONES[i % NODE_TONES.length]
    for (let j = 0; j < POINTS_PER_NODE; j++) {
      // sphere surface
      const u = Math.random()
      const v = Math.random()
      const phi = u * Math.PI * 2
      const cosTheta = 2 * v - 1
      const sinTheta = Math.sqrt(Math.max(0, 1 - cosTheta * cosTheta))
      const r = 0.13 + (Math.random() - 0.5) * 0.012
      const x = p.x + Math.cos(phi) * sinTheta * r
      const y = p.y + cosTheta * r
      const z = p.z + Math.sin(phi) * sinTheta * r
      const c = tone.clone().lerp(WHITE, Math.random() < 0.1 ? 0.5 : 0)
      push(x, y, z, c, 0)
    }
    // central dot — extra bright
    for (let j = 0; j < 14; j++) {
      const j2 = (Math.random() - 0.5) * 0.018
      push(p.x + j2, p.y + j2, p.z + j2, tone.clone().lerp(WHITE, 0.6), 0)
    }
  }

  // ---- WIRES — particles laid along each edge ----
  const POINTS_PER_EDGE = 56
  const wireMeta = [] // for each edge, store starting index and count for pulse animation
  for (const e of EDGES) {
    const a = NODES[e.a]
    const b = NODES[e.b]
    const startIdx = positions.length / 3
    for (let s = 0; s < POINTS_PER_EDGE; s++) {
      const t = s / (POINTS_PER_EDGE - 1)
      const x = a.x + (b.x - a.x) * t + (Math.random() - 0.5) * 0.012
      const y = a.y + (b.y - a.y) * t + (Math.random() - 0.5) * 0.012
      const z = a.z + (b.z - a.z) * t + (Math.random() - 0.5) * 0.012
      // wires sit dim — pulses light them up
      push(x, y, z, DIM, 1)
    }
    wireMeta.push({ a: e.a, b: e.b, startIdx, count: POINTS_PER_EDGE })
  }

  const positionArr = new Float32Array(positions)
  const colorArr = new Float32Array(colors)
  const homeArr = new Float32Array(positionArr)
  const kindArr = new Uint8Array(kinds)
  const count = positionArr.length / 3
  return {
    positions: positionArr,
    homes: homeArr,
    baseColors: colorArr,
    kinds: kindArr,
    count,
    nodes: NODES,
    edges: EDGES,
    wireMeta,
  }
}

// =============================================================================
// Particle field — physics + traveling pulses
// =============================================================================
function ParticleField({ autoSpinRef }) {
  const groupRef = useRef(null)
  const { camera } = useThree()

  const built = useMemo(() => buildNetwork(), [])
  const { positions, homes, baseColors, kinds, count, edges, wireMeta } = built
  const velocities = useMemo(() => new Float32Array(count * 3), [count])

  // displayColors: starts with baseColors (nodes lit, wires dim)
  const displayColors = useMemo(() => new Float32Array(baseColors), [baseColors])

  const cursorWorld = useRef(new THREE.Vector3())
  const tmpDir = useRef(new THREE.Vector3())

  // Pulse state — multiple pulses traveling through random edges concurrently.
  // Each pulse: { edgeIdx, t (0..1), tone, speed }
  const PULSE_COUNT = 8
  const pulses = useRef(
    Array.from({ length: PULSE_COUNT }, (_, i) => ({
      edgeIdx: Math.floor(Math.random() * edges.length),
      t: Math.random(),
      tone: i % 3 === 0 ? ACCENT : i % 3 === 1 ? BLUE : VIOLET,
      speed: 0.45 + Math.random() * 0.4,
      reverse: Math.random() < 0.5,
    })),
  )

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    g.setAttribute('color', new THREE.BufferAttribute(displayColors, 3))
    return g
  }, [positions, displayColors])

  useEffect(() => () => geometry.dispose(), [geometry])

  // physics — same vocabulary
  const RADIUS = 0.7
  const RADIUS_SQ = RADIUS * RADIUS
  const REPULSE = 0.32
  const SPRING = 0.014
  const DAMPING = 0.93

  // wire visuals
  const WIRE_DIM_R = DIM.r, WIRE_DIM_G = DIM.g, WIRE_DIM_B = DIM.b

  useFrame((state, dt) => {
    // 1) cursor projection
    const mouse = state.mouse
    if (mouse.x === 0 && mouse.y === 0) {
      cursorWorld.current.set(9999, 9999, 9999)
    } else {
      cursorWorld.current.set(mouse.x, mouse.y, 0.5)
      cursorWorld.current.unproject(camera)
      const dir = tmpDir.current.copy(cursorWorld.current).sub(camera.position).normalize()
      const dist = -camera.position.z / dir.z
      cursorWorld.current.copy(camera.position).add(dir.multiplyScalar(dist))
    }

    // 2) auto spin
    if (groupRef.current && autoSpinRef.current) {
      groupRef.current.rotation.y += 0.0014
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.18) * 0.08
    }

    const localCursor = tmpDir.current.copy(cursorWorld.current)
    if (groupRef.current) groupRef.current.worldToLocal(localCursor)
    const cx = localCursor.x, cy = localCursor.y, cz = localCursor.z

    const pos = geometry.attributes.position.array
    const col = geometry.attributes.color.array

    // ---- Decay all wire colors back toward DIM ----
    for (let i = 0; i < count; i++) {
      if (kinds[i] === 1) {
        const ix = i * 3, iy = i * 3 + 1, iz = i * 3 + 2
        col[ix] += (WIRE_DIM_R - col[ix]) * 0.07
        col[iy] += (WIRE_DIM_G - col[iy]) * 0.07
        col[iz] += (WIRE_DIM_B - col[iz]) * 0.07
      }
    }

    // ---- Advance pulses and light wire particles in their path ----
    for (const pulse of pulses.current) {
      pulse.t += dt * pulse.speed * (pulse.reverse ? -1 : 1)
      // wrap or pick a new edge
      if (pulse.t > 1.05 || pulse.t < -0.05) {
        pulse.edgeIdx = Math.floor(Math.random() * edges.length)
        pulse.reverse = Math.random() < 0.5
        pulse.t = pulse.reverse ? 1 : 0
        pulse.tone = [ACCENT, BLUE, VIOLET, AMBER][Math.floor(Math.random() * 4)]
        pulse.speed = 0.45 + Math.random() * 0.4
      }
      const meta = wireMeta[pulse.edgeIdx]
      if (!meta) continue
      // light up particles in a short band around pulse.t
      const center = pulse.t * (meta.count - 1)
      const BAND = 5
      for (let s = 0; s < meta.count; s++) {
        const dist = Math.abs(s - center)
        if (dist < BAND) {
          const intensity = 1 - dist / BAND
          const i = meta.startIdx + s
          const ix = i * 3, iy = i * 3 + 1, iz = i * 3 + 2
          col[ix] = Math.max(col[ix], pulse.tone.r * intensity * 1.4)
          col[iy] = Math.max(col[iy], pulse.tone.g * intensity * 1.4)
          col[iz] = Math.max(col[iz], pulse.tone.b * intensity * 1.4)
        }
      }
    }

    // ---- Physics (cursor scatter + spring back) ----
    for (let i = 0; i < count; i++) {
      const ix = i * 3, iy = i * 3 + 1, iz = i * 3 + 2

      const dx = pos[ix] - cx
      const dy = pos[iy] - cy
      const dz = pos[iz] - cz
      const dSq = dx * dx + dy * dy + dz * dz
      if (dSq < RADIUS_SQ) {
        const d = Math.sqrt(dSq) + 0.0001
        const falloff = 1 - d / RADIUS
        const f = REPULSE * falloff * falloff
        velocities[ix] += (dx / d) * f
        velocities[iy] += (dy / d) * f
        velocities[iz] += (dz / d) * f
        velocities[ix] += (Math.random() - 0.5) * 0.02 * falloff
        velocities[iz] += (Math.random() - 0.5) * 0.02 * falloff
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
    geometry.attributes.color.needsUpdate = true
  })

  return (
    <group ref={groupRef}>
      <points geometry={geometry}>
        <pointsMaterial
          size={0.026}
          vertexColors
          transparent
          opacity={0.96}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}

// =============================================================================
// Public component
// =============================================================================
export default function ParticleMessage() {
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

  return (
    <div className="w-full h-full select-none" style={{ touchAction: 'pan-y' }}>
      <Canvas
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0.3, 5.6], fov: 50 }}
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <ambientLight intensity={0.5} />
        <ParticleField autoSpinRef={autoSpinRef} />
      </Canvas>
    </div>
  )
}
