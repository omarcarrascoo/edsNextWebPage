'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

const ACCENT = new THREE.Color('#2DE2C5')
const SIGNAL_BLUE = new THREE.Color('#38BDF8')
const SIGNAL_GREEN = new THREE.Color('#22D39A')
const WARM = new THREE.Color('#F5B544')
const VIOLET = new THREE.Color('#9D8DF1')

function rng(seed) {
  let s = seed >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 0xffffffff
  }
}

// =============================================================================
// CORE OCTAHEDRON — the agent's reasoning core
// =============================================================================
function AgentCore() {
  const innerRef = useRef(null)
  const outerRef = useRef(null)
  const haloRef = useRef(null)
  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (innerRef.current) {
      innerRef.current.rotation.y = t * 0.6
      innerRef.current.rotation.x = t * 0.4
      const s = 1 + Math.sin(t * 2.4) * 0.06
      innerRef.current.scale.setScalar(s)
    }
    if (outerRef.current) {
      outerRef.current.rotation.y = -t * 0.35
      outerRef.current.rotation.z = t * 0.25
    }
    if (haloRef.current) {
      const m = haloRef.current.material
      m.opacity = 0.18 + Math.sin(t * 1.8) * 0.08
    }
  })
  return (
    <group>
      {/* halo */}
      <mesh ref={haloRef}>
        <sphereGeometry args={[1.05, 24, 18]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.18} />
      </mesh>
      {/* outer wireframe */}
      <mesh ref={outerRef}>
        <octahedronGeometry args={[0.9, 0]} />
        <meshBasicMaterial color={ACCENT} wireframe transparent opacity={0.45} />
      </mesh>
      {/* inner solid core */}
      <mesh ref={innerRef}>
        <octahedronGeometry args={[0.6, 0]} />
        <meshStandardMaterial
          color={'#0c1c22'}
          emissive={ACCENT}
          emissiveIntensity={0.55}
          metalness={0.5}
          roughness={0.3}
        />
      </mesh>
      {/* point at the very center */}
      <mesh>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshBasicMaterial color={ACCENT} toneMapped={false} />
      </mesh>
    </group>
  )
}

// =============================================================================
// TOOL RING — beads orbiting around the core (representing tools/APIs)
// =============================================================================
function ToolRing({ count = 14, radius = 1.8 }) {
  const groupRef = useRef(null)
  const positions = useMemo(() => {
    const pts = []
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2
      pts.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius))
    }
    return pts
  }, [count, radius])

  const arr = useMemo(() => {
    const f = new Float32Array(count * 3)
    positions.forEach((p, i) => {
      f[i * 3] = p.x
      f[i * 3 + 1] = p.y
      f[i * 3 + 2] = p.z
    })
    return f
  }, [count, positions])

  // ring line
  const ringGeom = useMemo(() => {
    const segs = 96
    const f = new Float32Array(segs * 2 * 3)
    for (let i = 0; i < segs; i++) {
      const a = (i / segs) * Math.PI * 2
      const b = ((i + 1) / segs) * Math.PI * 2
      f[i * 6] = Math.cos(a) * radius
      f[i * 6 + 1] = 0
      f[i * 6 + 2] = Math.sin(a) * radius
      f[i * 6 + 3] = Math.cos(b) * radius
      f[i * 6 + 4] = 0
      f[i * 6 + 5] = Math.sin(b) * radius
    }
    return f
  }, [radius])

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    groupRef.current.rotation.y = t * 0.18
    groupRef.current.rotation.x = 0.4 + Math.sin(t * 0.4) * 0.06
  })

  return (
    <group ref={groupRef}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[ringGeom, 3]}
            count={ringGeom.length / 3}
          />
        </bufferGeometry>
        <lineBasicMaterial color={SIGNAL_BLUE} transparent opacity={0.35} toneMapped={false} />
      </lineSegments>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[arr, 3]} count={count} />
        </bufferGeometry>
        <pointsMaterial color={SIGNAL_BLUE} size={0.13} sizeAttenuation transparent opacity={0.95} toneMapped={false} />
      </points>
    </group>
  )
}

// =============================================================================
// PILLAR LATTICE — a small node-and-line cluster anchored away from the core
// Used for MEMORY (left), CONTEXT (right), HUMAN-IN-LOOP (top)
// =============================================================================
function PillarLattice({ anchor, color, count = 11, scale = 0.7, seed = 1 }) {
  const groupRef = useRef(null)
  const data = useMemo(() => {
    const r = rng(seed)
    const pts = []
    for (let i = 0; i < count; i++) {
      const phi = r() * Math.PI * 2
      const u = r() * 2 - 1
      const rad = 0.25 + r() * 0.65
      pts.push(new THREE.Vector3(
        Math.sqrt(1 - u * u) * Math.cos(phi) * rad,
        Math.sqrt(1 - u * u) * Math.sin(phi) * rad,
        u * rad * 0.6,
      ))
    }
    // edges to nearest 2
    const edges = []
    for (let i = 0; i < pts.length; i++) {
      const ds = []
      for (let j = 0; j < pts.length; j++) {
        if (j === i) continue
        ds.push({ j, d: pts[i].distanceToSquared(pts[j]) })
      }
      ds.sort((a, b) => a.d - b.d)
      edges.push([i, ds[0].j])
      if (i % 2) edges.push([i, ds[1].j])
    }
    const positions = new Float32Array(pts.length * 3)
    pts.forEach((p, i) => {
      positions[i * 3] = p.x
      positions[i * 3 + 1] = p.y
      positions[i * 3 + 2] = p.z
    })
    const lines = new Float32Array(edges.length * 2 * 3)
    edges.forEach(([a, b], i) => {
      lines[i * 6] = pts[a].x
      lines[i * 6 + 1] = pts[a].y
      lines[i * 6 + 2] = pts[a].z
      lines[i * 6 + 3] = pts[b].x
      lines[i * 6 + 4] = pts[b].y
      lines[i * 6 + 5] = pts[b].z
    })
    return { pts, edges, positions, lines }
  }, [count, seed])

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    groupRef.current.rotation.y = Math.sin(t * 0.4 + seed) * 0.4
    groupRef.current.rotation.x = Math.cos(t * 0.3 + seed) * 0.2
    const s = scale * (1 + Math.sin(t * 1.2 + seed) * 0.05)
    groupRef.current.scale.setScalar(s)
  })

  return (
    <group ref={groupRef} position={[anchor.x, anchor.y, anchor.z]}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[data.lines, 3]}
            count={data.edges.length * 2}
          />
        </bufferGeometry>
        <lineBasicMaterial color={color} transparent opacity={0.45} toneMapped={false} />
      </lineSegments>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[data.positions, 3]}
            count={data.pts.length}
          />
        </bufferGeometry>
        <pointsMaterial color={color} size={0.1} sizeAttenuation transparent opacity={0.95} toneMapped={false} />
      </points>
      {/* halo */}
      <mesh>
        <sphereGeometry args={[0.95, 16, 12]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.07} />
      </mesh>
    </group>
  )
}

// =============================================================================
// PILLAR EDGES — straight lines from core to each pillar (the "thinking spokes")
// =============================================================================
function PillarSpokes({ anchors }) {
  const ref = useRef(null)
  const positions = useMemo(() => {
    const f = new Float32Array(anchors.length * 2 * 3)
    anchors.forEach((a, i) => {
      f[i * 6] = 0; f[i * 6 + 1] = 0; f[i * 6 + 2] = 0
      f[i * 6 + 3] = a.x; f[i * 6 + 4] = a.y; f[i * 6 + 5] = a.z
    })
    return f
  }, [anchors])
  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (ref.current) {
      ref.current.material.opacity = 0.18 + Math.sin(t * 1.8) * 0.07
    }
  })
  return (
    <lineSegments ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={anchors.length * 2}
        />
      </bufferGeometry>
      <lineBasicMaterial color={ACCENT} transparent opacity={0.22} toneMapped={false} />
    </lineSegments>
  )
}

// =============================================================================
// SIGNAL PULSES — directional packets traveling between core ↔ pillars
// Some packets carry "low confidence" amber color → they detour to the
// human-in-loop pillar before going to their final destination
// =============================================================================
function SignalPulses({ anchors, count = 22 }) {
  const linePosRef = useRef(null)
  const lineColRef = useRef(null)
  const headPosRef = useRef(null)
  const headColRef = useRef(null)

  const linePositions = useMemo(() => new Float32Array(count * 2 * 3), [count])
  const lineColors = useMemo(() => new Float32Array(count * 2 * 3), [count])
  const headPositions = useMemo(() => new Float32Array(count * 3), [count])
  const headColors = useMemo(() => new Float32Array(count * 3), [count])

  const HUMAN_IDX = 2 // anchors[2] is the human-in-loop pillar (top)

  const pulses = useRef(
    Array.from({ length: count }, () => initPulse(anchors, HUMAN_IDX))
  )

  useFrame((_, delta) => {
    for (let i = 0; i < count; i++) {
      const p = pulses.current[i]
      p.t += delta * p.speed
      if (p.t >= 1) {
        // advance leg
        if (p.leg === 0 && p.detour) {
          p.from = p.to.clone()
          p.to = anchors[p.target].clone()
          p.leg = 1
          p.t = 0
          p.color = SIGNAL_GREEN
        } else {
          // re-init
          Object.assign(p, initPulse(anchors, HUMAN_IDX))
        }
      }
      const head = Math.max(0, Math.min(1, p.t))
      const tail = Math.max(0, Math.min(1, p.t - 0.16))
      const ax = p.from.x + (p.to.x - p.from.x) * tail
      const ay = p.from.y + (p.to.y - p.from.y) * tail
      const az = p.from.z + (p.to.z - p.from.z) * tail
      const bx = p.from.x + (p.to.x - p.from.x) * head
      const by = p.from.y + (p.to.y - p.from.y) * head
      const bz = p.from.z + (p.to.z - p.from.z) * head

      const idx = i * 6
      linePositions[idx]     = ax
      linePositions[idx + 1] = ay
      linePositions[idx + 2] = az
      linePositions[idx + 3] = bx
      linePositions[idx + 4] = by
      linePositions[idx + 5] = bz

      const c = p.color
      lineColors[idx]     = c.r * 0.22
      lineColors[idx + 1] = c.g * 0.22
      lineColors[idx + 2] = c.b * 0.22
      lineColors[idx + 3] = c.r
      lineColors[idx + 4] = c.g
      lineColors[idx + 5] = c.b

      headPositions[i * 3]     = bx
      headPositions[i * 3 + 1] = by
      headPositions[i * 3 + 2] = bz
      headColors[i * 3]     = c.r
      headColors[i * 3 + 1] = c.g
      headColors[i * 3 + 2] = c.b
    }
    if (linePosRef.current) linePosRef.current.needsUpdate = true
    if (lineColRef.current) lineColRef.current.needsUpdate = true
    if (headPosRef.current) headPosRef.current.needsUpdate = true
    if (headColRef.current) headColRef.current.needsUpdate = true
  })

  return (
    <group>
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
        <lineBasicMaterial vertexColors transparent opacity={0.95} toneMapped={false} />
      </lineSegments>
      <points>
        <bufferGeometry>
          <bufferAttribute
            ref={headPosRef}
            attach="attributes-position"
            args={[headPositions, 3]}
            count={count}
          />
          <bufferAttribute
            ref={headColRef}
            attach="attributes-color"
            args={[headColors, 3]}
            count={count}
          />
        </bufferGeometry>
        <pointsMaterial vertexColors size={0.11} sizeAttenuation transparent opacity={0.98} toneMapped={false} />
      </points>
    </group>
  )
}

function initPulse(anchors, HUMAN_IDX) {
  // Random direction: source ↔ destination
  const direction = Math.random() < 0.55 ? 'in' : 'out'
  const target = (Math.random() * anchors.length) | 0
  const lowConfidence = Math.random() < 0.35 && target !== HUMAN_IDX
  let from, to
  if (direction === 'in') {
    from = anchors[target].clone()
    to = new THREE.Vector3(0, 0, 0)
  } else {
    from = new THREE.Vector3(0, 0, 0)
    to = anchors[target].clone()
  }
  let color = direction === 'in' ? SIGNAL_BLUE : ACCENT
  let detour = false
  if (lowConfidence && direction === 'out') {
    // Detour to human first
    to = anchors[HUMAN_IDX].clone()
    color = WARM
    detour = true
  }
  return {
    from,
    to,
    target,
    leg: 0,
    detour,
    t: Math.random() * 0.2,
    speed: 0.45 + Math.random() * 0.85,
    color,
  }
}

// =============================================================================
// AMBIENT DUST
// =============================================================================
function Dust({ count = 240 }) {
  const ref = useRef(null)
  const positions = useMemo(() => {
    const a = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      a[i * 3] = (Math.random() - 0.5) * 12
      a[i * 3 + 1] = (Math.random() - 0.5) * 7
      a[i * 3 + 2] = (Math.random() - 0.5) * 8
    }
    return a
  }, [count])
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.014
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
  const rootRef = useRef(null)

  // Pillar anchor points around the core
  const anchors = useMemo(() => [
    new THREE.Vector3(-3.4, -0.4, 0.2),  // 0 MEMORY (left)
    new THREE.Vector3( 3.4, -0.4, 0.2),  // 1 CONTEXT (right)
    new THREE.Vector3( 0.0,  2.4, 0.2),  // 2 HUMAN-IN-LOOP (top)
  ], [])

  useFrame(() => {
    if (!rootRef.current) return
    const mx = mouseRef?.current?.x ?? 0
    const my = mouseRef?.current?.y ?? 0
    rootRef.current.rotation.y += (mx * 0.16 - rootRef.current.rotation.y) * 0.04
    rootRef.current.rotation.x += (my * 0.08 - rootRef.current.rotation.x) * 0.04
  })

  return (
    <group ref={rootRef}>
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 0, 2]} intensity={2.5} color={ACCENT} distance={6} />
      <PillarSpokes anchors={anchors} />
      <AgentCore />
      <ToolRing count={reduced ? 8 : 16} radius={1.6} />
      <PillarLattice anchor={anchors[0]} color={SIGNAL_BLUE} count={11} scale={0.7} seed={1} />
      <PillarLattice anchor={anchors[1]} color={VIOLET}      count={11} scale={0.7} seed={2} />
      <PillarLattice anchor={anchors[2]} color={WARM}        count={9}  scale={0.6} seed={3} />
      <SignalPulses anchors={anchors} count={reduced ? 8 : 24} />
      <Dust count={reduced ? 80 : 220} />
    </group>
  )
}

export default function AgentLoop({ mouseRef }) {
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
      camera={{ position: [0, 0.4, 6.6], fov: 52 }}
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      <fog attach="fog" args={['#08121a', 5.5, 12]} />
      <Scene mouseRef={mouseRef} reduced={reduced} />
    </Canvas>
  )
}
