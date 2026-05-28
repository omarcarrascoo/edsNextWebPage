'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

const ACCENT = new THREE.Color('#2DE2C5')
const SIGNAL_BLUE = new THREE.Color('#38BDF8')
const SIGNAL_GREEN = new THREE.Color('#22D39A')
const WARM = new THREE.Color('#F5B544')
const DANGER = new THREE.Color('#EF6B6B')
const DIM = new THREE.Color('#A8B3C1')

function rng(seed) {
  let s = seed >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 0xffffffff
  }
}

// =============================================================================
// LEFT — five disconnected clusters drifting on their own islands
// =============================================================================
function buildIslands(seed = 11) {
  const r = rng(seed)
  // 5 island centers on the LEFT half of the field (-x is left in world)
  const centers = [
    new THREE.Vector3(-3.6,  1.4,  0.4),
    new THREE.Vector3(-2.8, -1.2, -0.3),
    new THREE.Vector3(-4.2, -0.4,  0.8),
    new THREE.Vector3(-3.2,  0.2, -0.6),
    new THREE.Vector3(-2.4,  1.6,  0.0),
  ]
  const colors = [WARM, DANGER, WARM, DIM, DANGER]
  const islands = centers.map((c, idx) => {
    const count = 5 + Math.floor(r() * 3)
    const pts = []
    for (let i = 0; i < count; i++) {
      const phi = r() * Math.PI * 2
      const u = r() * 2 - 1
      const rad = 0.35 + r() * 0.45
      const x = c.x + Math.sqrt(1 - u * u) * Math.cos(phi) * rad
      const y = c.y + Math.sqrt(1 - u * u) * Math.sin(phi) * rad
      const z = c.z + u * rad * 0.7
      pts.push(new THREE.Vector3(x, y, z))
    }
    // internal edges only — every node connects to 1-2 nearest within cluster
    const edges = []
    for (let i = 0; i < pts.length; i++) {
      const ds = []
      for (let j = 0; j < pts.length; j++) {
        if (j === i) continue
        ds.push({ j, d: pts[i].distanceToSquared(pts[j]) })
      }
      ds.sort((a, b) => a.d - b.d)
      const links = 1 + (i % 2)
      for (let k = 0; k < Math.min(links, ds.length); k++) {
        if (i < ds[k].j) edges.push([i, ds[k].j])
      }
    }
    return {
      center: c,
      points: pts,
      edges,
      color: colors[idx % colors.length],
      driftPhase: r() * Math.PI * 2,
      driftAmp: 0.18 + r() * 0.16,
    }
  })
  return islands
}

function Islands({ islands }) {
  const groupRef = useRef(null)
  // Per-island groups so each can drift independently
  const groupRefs = useRef([])

  // dot mesh per island
  const meshes = useMemo(() => islands.map((isl) => {
    const positions = new Float32Array(isl.points.length * 3)
    isl.points.forEach((p, i) => {
      positions[i * 3] = p.x - isl.center.x
      positions[i * 3 + 1] = p.y - isl.center.y
      positions[i * 3 + 2] = p.z - isl.center.z
    })
    return positions
  }), [islands])

  const lines = useMemo(() => islands.map((isl) => {
    const arr = new Float32Array(isl.edges.length * 2 * 3)
    isl.edges.forEach(([a, b], i) => {
      const pa = isl.points[a]
      const pb = isl.points[b]
      arr[i * 6]     = pa.x - isl.center.x
      arr[i * 6 + 1] = pa.y - isl.center.y
      arr[i * 6 + 2] = pa.z - isl.center.z
      arr[i * 6 + 3] = pb.x - isl.center.x
      arr[i * 6 + 4] = pb.y - isl.center.y
      arr[i * 6 + 5] = pb.z - isl.center.z
    })
    return arr
  }), [islands])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    islands.forEach((isl, i) => {
      const g = groupRefs.current[i]
      if (!g) return
      const dx = Math.sin(t * 0.4 + isl.driftPhase) * isl.driftAmp
      const dy = Math.cos(t * 0.35 + isl.driftPhase * 1.3) * isl.driftAmp * 0.7
      const dz = Math.sin(t * 0.3 + isl.driftPhase * 0.7) * isl.driftAmp * 0.5
      g.position.set(isl.center.x + dx, isl.center.y + dy, isl.center.z + dz)
      g.rotation.y = Math.sin(t * 0.2 + isl.driftPhase) * 0.15
      g.rotation.x = Math.cos(t * 0.18 + isl.driftPhase) * 0.08
    })
  })

  return (
    <group ref={groupRef}>
      {islands.map((isl, i) => (
        <group
          key={i}
          ref={(el) => (groupRefs.current[i] = el)}
        >
          {/* edges */}
          <lineSegments>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[lines[i], 3]}
                count={isl.edges.length * 2}
              />
            </bufferGeometry>
            <lineBasicMaterial
              color={isl.color}
              transparent
              opacity={0.4}
              toneMapped={false}
            />
          </lineSegments>
          {/* nodes */}
          <points>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[meshes[i], 3]}
                count={isl.points.length}
              />
            </bufferGeometry>
            <pointsMaterial
              color={isl.color}
              size={0.09}
              sizeAttenuation
              transparent
              opacity={0.9}
              toneMapped={false}
            />
          </points>
          {/* halo */}
          <mesh>
            <sphereGeometry args={[0.62, 18, 14]} />
            <meshBasicMaterial
              color={isl.color}
              wireframe
              transparent
              opacity={0.07}
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}

// =============================================================================
// FAILED CONNECTIONS — pulses that try to cross toward the mesh and fade out
// =============================================================================
function FailedAttempts({ islands, meshAnchor, count = 14 }) {
  const posRef = useRef(null)
  const colRef = useRef(null)
  const positions = useMemo(() => new Float32Array(count * 2 * 3), [count])
  const colors = useMemo(() => new Float32Array(count * 2 * 3), [count])

  const attemptsRef = useRef(
    Array.from({ length: count }, () => ({
      from: null,
      to: null,
      t: Math.random(),
      speed: 0.3 + Math.random() * 0.5,
      reach: 0.4 + Math.random() * 0.4, // never reaches 1
    }))
  )

  useFrame((state, delta) => {
    const attempts = attemptsRef.current
    for (let i = 0; i < count; i++) {
      const a = attempts[i]
      if (!a.from) {
        const isl = islands[(Math.random() * islands.length) | 0]
        a.from = isl.points[(Math.random() * isl.points.length) | 0].clone()
        // Target is somewhere in the mesh region (right side)
        a.to = new THREE.Vector3(
          meshAnchor.x + (Math.random() - 0.5) * 1.2,
          meshAnchor.y + (Math.random() - 0.5) * 1.6,
          meshAnchor.z + (Math.random() - 0.5) * 1.2,
        )
        a.t = 0
        a.speed = 0.3 + Math.random() * 0.5
        a.reach = 0.35 + Math.random() * 0.45
      }
      a.t += delta * a.speed
      if (a.t > 1) {
        a.from = null
        continue
      }
      // Head travels from from -> midpoint scaled by reach
      const head = a.t * a.reach
      const tail = Math.max(0, head - 0.12)
      const ax = a.from.x + (a.to.x - a.from.x) * tail
      const ay = a.from.y + (a.to.y - a.from.y) * tail
      const az = a.from.z + (a.to.z - a.from.z) * tail
      const bx = a.from.x + (a.to.x - a.from.x) * head
      const by = a.from.y + (a.to.y - a.from.y) * head
      const bz = a.from.z + (a.to.z - a.from.z) * head

      const idx = i * 6
      positions[idx]     = ax
      positions[idx + 1] = ay
      positions[idx + 2] = az
      positions[idx + 3] = bx
      positions[idx + 4] = by
      positions[idx + 5] = bz

      // amber → fade to red toward end (failed)
      const fade = 1 - a.t
      colors[idx]     = WARM.r * 0.4 * fade
      colors[idx + 1] = WARM.g * 0.4 * fade
      colors[idx + 2] = WARM.b * 0.4 * fade
      colors[idx + 3] = DANGER.r * fade
      colors[idx + 4] = DANGER.g * 0.4 * fade
      colors[idx + 5] = DANGER.b * 0.4 * fade
    }
    if (posRef.current) posRef.current.needsUpdate = true
    if (colRef.current) colRef.current.needsUpdate = true
  })

  return (
    <lineSegments>
      <bufferGeometry>
        <bufferAttribute
          ref={posRef}
          attach="attributes-position"
          args={[positions, 3]}
          count={count * 2}
        />
        <bufferAttribute
          ref={colRef}
          attach="attributes-color"
          args={[colors, 3]}
          count={count * 2}
        />
      </bufferGeometry>
      <lineBasicMaterial vertexColors transparent opacity={0.7} toneMapped={false} />
    </lineSegments>
  )
}

// =============================================================================
// RIGHT — connected mesh (tight kNN graph + traveling pulses)
// =============================================================================
function buildMesh(seed = 23, count = 60, anchor) {
  const r = rng(seed)
  const positions = []
  for (let i = 0; i < count; i++) {
    // Distribute in a slightly squished sphere on the right
    const phi = r() * Math.PI * 2
    const u = r() * 2 - 1
    const rad = 0.3 + r() * 1.6
    const x = anchor.x + Math.sqrt(1 - u * u) * Math.cos(phi) * rad * 1.05
    const y = anchor.y + Math.sqrt(1 - u * u) * Math.sin(phi) * rad * 1.0
    const z = anchor.z + u * rad * 0.9
    positions.push(new THREE.Vector3(x, y, z))
  }
  // kNN edges
  const k = 3
  const neighbors = positions.map((p, i) => {
    const ds = []
    for (let j = 0; j < positions.length; j++) {
      if (j === i) continue
      ds.push({ j, d: p.distanceToSquared(positions[j]) })
    }
    ds.sort((a, b) => a.d - b.d)
    return ds.slice(0, k).map((x) => x.j)
  })
  const edges = []
  positions.forEach((_, i) => {
    neighbors[i].forEach((j) => {
      if (i < j) edges.push([i, j])
    })
  })
  return { positions, neighbors, edges }
}

function Mesh({ mesh, anchor }) {
  const groupRef = useRef(null)
  const positions = useMemo(() => {
    const arr = new Float32Array(mesh.positions.length * 3)
    mesh.positions.forEach((p, i) => {
      arr[i * 3] = p.x
      arr[i * 3 + 1] = p.y
      arr[i * 3 + 2] = p.z
    })
    return arr
  }, [mesh])

  const lines = useMemo(() => {
    const arr = new Float32Array(mesh.edges.length * 2 * 3)
    mesh.edges.forEach(([a, b], i) => {
      const pa = mesh.positions[a]
      const pb = mesh.positions[b]
      arr[i * 6]     = pa.x
      arr[i * 6 + 1] = pa.y
      arr[i * 6 + 2] = pa.z
      arr[i * 6 + 3] = pb.x
      arr[i * 6 + 4] = pb.y
      arr[i * 6 + 5] = pb.z
    })
    return arr
  }, [mesh])

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    groupRef.current.rotation.y = t * 0.06
    groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.05
  })

  return (
    <group ref={groupRef} position={[anchor.x, anchor.y, anchor.z]}>
      <group position={[-anchor.x, -anchor.y, -anchor.z]}>
        {/* edges */}
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[lines, 3]}
              count={mesh.edges.length * 2}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color={ACCENT}
            transparent
            opacity={0.45}
            toneMapped={false}
          />
        </lineSegments>
        {/* nodes */}
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[positions, 3]}
              count={mesh.positions.length}
            />
          </bufferGeometry>
          <pointsMaterial
            color={ACCENT}
            size={0.085}
            sizeAttenuation
            transparent
            opacity={0.95}
            toneMapped={false}
          />
        </points>
      </group>
    </group>
  )
}

function MeshSynapses({ mesh, count = 18 }) {
  const linePosRef = useRef(null)
  const lineColRef = useRef(null)
  const linePositions = useMemo(() => new Float32Array(count * 2 * 3), [count])
  const lineColors = useMemo(() => new Float32Array(count * 2 * 3), [count])
  const poolRef = useRef(
    Array.from({ length: count }, () => ({
      from: 0,
      to: 0,
      t: Math.random(),
      speed: 0.5 + Math.random() * 1.0,
      color: pickMeshColor(),
      born: false,
    }))
  )

  useFrame((state, delta) => {
    const pool = poolRef.current
    for (let i = 0; i < count; i++) {
      const s = pool[i]
      if (!s.born) {
        s.from = (Math.random() * mesh.positions.length) | 0
        const ns = mesh.neighbors[s.from]
        s.to = ns[(Math.random() * ns.length) | 0]
        s.t = Math.random() * 0.2
        s.speed = 0.5 + Math.random() * 1.2
        s.color = pickMeshColor()
        s.born = true
      }
      s.t += delta * s.speed
      if (s.t >= 1) {
        const next = mesh.neighbors[s.to]
        s.from = s.to
        s.to = next[(Math.random() * next.length) | 0]
        s.t = 0
        s.speed = 0.5 + Math.random() * 1.2
      }
      const a = mesh.positions[s.from]
      const b = mesh.positions[s.to]
      const head = Math.max(0, Math.min(1, s.t))
      const tail = Math.max(0, Math.min(1, s.t - 0.18))

      const ax = a.x + (b.x - a.x) * tail
      const ay = a.y + (b.y - a.y) * tail
      const az = a.z + (b.z - a.z) * tail
      const bx = a.x + (b.x - a.x) * head
      const by = a.y + (b.y - a.y) * head
      const bz = a.z + (b.z - a.z) * head

      const idx = i * 6
      linePositions[idx]     = ax
      linePositions[idx + 1] = ay
      linePositions[idx + 2] = az
      linePositions[idx + 3] = bx
      linePositions[idx + 4] = by
      linePositions[idx + 5] = bz

      const c = s.color
      lineColors[idx]     = c.r * 0.25
      lineColors[idx + 1] = c.g * 0.25
      lineColors[idx + 2] = c.b * 0.25
      lineColors[idx + 3] = c.r
      lineColors[idx + 4] = c.g
      lineColors[idx + 5] = c.b
    }
    if (linePosRef.current) linePosRef.current.needsUpdate = true
    if (lineColRef.current) lineColRef.current.needsUpdate = true
  })

  return (
    <lineSegments>
      <bufferGeometry>
        <bufferAttribute
          ref={linePosRef}
          attach="attributes-position"
          args={[linePositions, 3]}
          count={count * 2}
        />
        <bufferAttribute
          ref={lineColRef}
          attach="attributes-color"
          args={[lineColors, 3]}
          count={count * 2}
        />
      </bufferGeometry>
      <lineBasicMaterial vertexColors transparent opacity={0.9} toneMapped={false} />
    </lineSegments>
  )
}

function pickMeshColor() {
  const r = Math.random()
  if (r < 0.6) return ACCENT
  if (r < 0.85) return SIGNAL_BLUE
  return SIGNAL_GREEN
}

// =============================================================================
// AMBIENT DUST
// =============================================================================
function Dust({ count = 240 }) {
  const ref = useRef(null)
  const positions = useMemo(() => {
    const a = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      a[i * 3] = (Math.random() - 0.5) * 14
      a[i * 3 + 1] = (Math.random() - 0.5) * 7
      a[i * 3 + 2] = (Math.random() - 0.5) * 8
    }
    return a
  }, [count])
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.015
  })
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} />
      </bufferGeometry>
      <pointsMaterial color={'#2DE2C5'} size={0.012} sizeAttenuation transparent opacity={0.3} toneMapped={false} />
    </points>
  )
}

// =============================================================================
// SCENE
// =============================================================================
function Scene({ mouseRef, reduced }) {
  const islands = useMemo(() => buildIslands(11), [])
  const meshAnchor = useMemo(() => new THREE.Vector3(3.6, 0, 0), [])
  const mesh = useMemo(() => buildMesh(23, reduced ? 36 : 64, meshAnchor), [meshAnchor, reduced])
  const rootRef = useRef(null)

  useFrame(() => {
    if (!rootRef.current) return
    const mx = mouseRef?.current?.x ?? 0
    const my = mouseRef?.current?.y ?? 0
    rootRef.current.rotation.y += (mx * 0.18 - rootRef.current.rotation.y) * 0.04
    rootRef.current.rotation.x += (my * 0.08 - rootRef.current.rotation.x) * 0.04
  })

  return (
    <group ref={rootRef}>
      <Islands islands={islands} />
      <FailedAttempts islands={islands} meshAnchor={meshAnchor} count={reduced ? 6 : 16} />
      <Mesh mesh={mesh} anchor={meshAnchor} />
      <MeshSynapses mesh={mesh} count={reduced ? 6 : 20} />
      <Dust count={reduced ? 80 : 260} />
    </group>
  )
}

export default function FragmentationField({ mouseRef }) {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = (e) => setReduced(e.matches)
    mq.addEventListener?.('change', onChange)
    return () => mq.removeEventListener?.('change', onChange)
  }, [])

  return (
    <Canvas
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 6.6], fov: 55 }}
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      <fog attach="fog" args={['#08121a', 6, 13]} />
      <ambientLight intensity={0.4} />
      <Scene mouseRef={mouseRef} reduced={reduced} />
    </Canvas>
  )
}
