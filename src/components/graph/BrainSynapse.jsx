'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

const ACCENT = new THREE.Color('#2DE2C5')
const SIGNAL_BLUE = new THREE.Color('#38BDF8')
const SIGNAL_GREEN = new THREE.Color('#22D39A')
const WARM = new THREE.Color('#F5B544')

// --- BRAIN SHAPE -------------------------------------------------------------
// Two ellipsoidal hemispheres + a cerebellum stub. We sample points biased
// toward the cortex (outer shell) so the silhouette reads as a brain, then
// add an inner low-density swarm so synapses can fire across depth too.

function brainPoint(rng) {
  // Choose hemisphere with a cleft along x = 0
  const hemi = rng() < 0.5 ? -1 : 1
  // 75% surface-biased, 25% volumetric for inner thoughts
  const onSurface = rng() < 0.75
  const r = onSurface ? 1.0 - rng() * 0.08 : rng() * 0.85
  // spherical
  const u = rng() * 2 - 1
  const phi = rng() * Math.PI * 2
  const sin = Math.sqrt(1 - u * u)
  const sx = sin * Math.cos(phi)
  const sy = sin * Math.sin(phi)
  const sz = u
  // squash into brain proportions and split hemispheres
  const lobeR = { x: 1.05, y: 0.9, z: 1.25 }
  let x = sx * lobeR.x * r
  let y = sy * lobeR.y * r
  let z = sz * lobeR.z * r
  // shift hemisphere on the x axis
  x = x * 0.78 + hemi * 0.36
  // gyrification — gentle wave on the surface
  if (onSurface) {
    const w = 0.06 * Math.sin(phi * 6 + u * 5)
    x += w * lobeR.x * 0.4
    y += 0.03 * Math.sin(u * 8 + phi * 3)
  }
  // tilt the brain slightly forward
  const tilt = 0.16
  const yt = y * Math.cos(tilt) - z * Math.sin(tilt)
  const zt = y * Math.sin(tilt) + z * Math.cos(tilt)
  return new THREE.Vector3(x, yt, zt)
}

function makeRng(seed) {
  let s = seed >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 0xffffffff
  }
}

// --- NODE DATA ---------------------------------------------------------------
function buildBrain(count = 140, seed = 7) {
  const rng = makeRng(seed)
  const positions = []
  for (let i = 0; i < count; i++) positions.push(brainPoint(rng))

  // Pre-compute neighbors (k nearest) for synaptic firing
  const k = 4
  const neighbors = positions.map((p, i) => {
    const ds = []
    for (let j = 0; j < positions.length; j++) {
      if (j === i) continue
      ds.push({ j, d: p.distanceToSquared(positions[j]) })
    }
    ds.sort((a, b) => a.d - b.d)
    return ds.slice(0, k).map((d) => d.j)
  })

  // Sparkle phases
  const phases = positions.map(() => rng() * Math.PI * 2)
  const sizes = positions.map(() => 0.04 + rng() * 0.06)

  return { positions, neighbors, phases, sizes }
}

// --- SYNAPSES ----------------------------------------------------------------
// Pool of N concurrent synapse pulses. Each pulse picks a (from, to) pair from
// the precomputed neighbor map, animates a bright dot along the edge, leaves
// a fading trail. When the pulse ends, the slot is recycled with a new pair.

function createSynapsePool(brain, size = 22) {
  return Array.from({ length: size }, () => ({
    from: 0,
    to: 0,
    t: Math.random(),
    speed: 0.6 + Math.random() * 1.0,
    color: pickColor(),
    born: false,
  }))
}

function pickColor() {
  const r = Math.random()
  if (r < 0.55) return ACCENT
  if (r < 0.8) return SIGNAL_BLUE
  if (r < 0.94) return SIGNAL_GREEN
  return WARM
}

// --- NODES MESH --------------------------------------------------------------
function NodesField({ brain }) {
  const meshRef = useRef(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const colors = useMemo(() => {
    const arr = new Float32Array(brain.positions.length * 3)
    brain.positions.forEach((_, i) => {
      const c = i % 7 === 0 ? SIGNAL_BLUE : i % 11 === 0 ? SIGNAL_GREEN : ACCENT
      arr[i * 3] = c.r
      arr[i * 3 + 1] = c.g
      arr[i * 3 + 2] = c.b
    })
    return arr
  }, [brain])

  useEffect(() => {
    const m = meshRef.current
    if (!m) return
    brain.positions.forEach((p, i) => {
      dummy.position.copy(p)
      dummy.scale.setScalar(brain.sizes[i])
      dummy.updateMatrix()
      m.setMatrixAt(i, dummy.matrix)
      m.setColorAt(i, i % 7 === 0 ? SIGNAL_BLUE : i % 11 === 0 ? SIGNAL_GREEN : ACCENT)
    })
    m.instanceMatrix.needsUpdate = true
    if (m.instanceColor) m.instanceColor.needsUpdate = true
  }, [brain, dummy])

  useFrame((state) => {
    const m = meshRef.current
    if (!m) return
    const t = state.clock.elapsedTime
    brain.positions.forEach((p, i) => {
      const phase = brain.phases[i]
      const breath = 1 + Math.sin(t * 1.4 + phase) * 0.18
      dummy.position.copy(p)
      dummy.scale.setScalar(brain.sizes[i] * breath)
      dummy.updateMatrix()
      m.setMatrixAt(i, dummy.matrix)
    })
    m.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh
      ref={meshRef}
      args={[null, null, brain.positions.length]}
      frustumCulled={false}
    >
      <sphereGeometry args={[1, 10, 10]} />
      <meshBasicMaterial vertexColors transparent opacity={0.95} toneMapped={false} />
    </instancedMesh>
  )
}

// --- BRAIN HULL --------------------------------------------------------------
function BrainHull() {
  // Two thin wireframe hemispheres for the silhouette
  const left = useRef(null)
  const right = useRef(null)
  useFrame((state) => {
    const t = state.clock.elapsedTime
    const wob = 1 + Math.sin(t * 0.6) * 0.01
    if (left.current) left.current.scale.set(0.78 * wob, 0.92, 1.28)
    if (right.current) right.current.scale.set(0.78 * wob, 0.92, 1.28)
  })
  return (
    <group rotation={[0.16, 0, 0]}>
      <mesh ref={left} position={[-0.36, 0, 0]}>
        <sphereGeometry args={[1, 28, 18]} />
        <meshBasicMaterial color={'#2DE2C5'} wireframe transparent opacity={0.06} />
      </mesh>
      <mesh ref={right} position={[0.36, 0, 0]}>
        <sphereGeometry args={[1, 28, 18]} />
        <meshBasicMaterial color={'#2DE2C5'} wireframe transparent opacity={0.06} />
      </mesh>
      {/* gentle inner glow shell */}
      <mesh>
        <sphereGeometry args={[1.32, 28, 18]} />
        <meshBasicMaterial color={'#0f1d24'} transparent opacity={0.0} />
      </mesh>
    </group>
  )
}

// --- SYNAPSE LINES -----------------------------------------------------------
// A single BufferGeometry holds 2 vertices per pulse (line segments). We move
// the segment along the (from,to) edge each frame to suggest a charged signal
// traveling, plus a head dot via separate Points geometry.

function Synapses({ brain, pool }) {
  const linePosRef = useRef(null)
  const lineColRef = useRef(null)
  const headPosRef = useRef(null)
  const headColRef = useRef(null)

  const POOL = pool.length
  const linePositions = useMemo(() => new Float32Array(POOL * 2 * 3), [POOL])
  const lineColors = useMemo(() => new Float32Array(POOL * 2 * 3), [POOL])
  const headPositions = useMemo(() => new Float32Array(POOL * 3), [POOL])
  const headColors = useMemo(() => new Float32Array(POOL * 3), [POOL])

  useFrame((state, delta) => {
    for (let i = 0; i < POOL; i++) {
      const s = pool[i]
      if (!s.born) {
        s.from = (Math.random() * brain.positions.length) | 0
        const ns = brain.neighbors[s.from]
        s.to = ns[(Math.random() * ns.length) | 0]
        s.t = Math.random() * 0.2
        s.speed = 0.5 + Math.random() * 1.4
        s.color = pickColor()
        s.born = true
      }
      s.t += delta * s.speed
      if (s.t >= 1) {
        const next = brain.neighbors[s.to]
        s.from = s.to
        s.to = next[(Math.random() * next.length) | 0]
        s.t = 0
        s.speed = 0.5 + Math.random() * 1.4
        if (Math.random() < 0.25) s.color = pickColor()
      }

      const a = brain.positions[s.from]
      const b = brain.positions[s.to]
      const head = Math.max(0, Math.min(1, s.t))
      const tail = Math.max(0, Math.min(1, s.t - 0.18))

      const ax = a.x + (b.x - a.x) * tail
      const ay = a.y + (b.y - a.y) * tail
      const az = a.z + (b.z - a.z) * tail
      const bx = a.x + (b.x - a.x) * head
      const by = a.y + (b.y - a.y) * head
      const bz = a.z + (b.z - a.z) * head

      const idx = i * 6
      linePositions[idx] = ax
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
            count={POOL * 2}
          />
          <bufferAttribute
            ref={lineColRef}
            attach="attributes-color"
            args={[lineColors, 3]}
            count={POOL * 2}
          />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={0.85} toneMapped={false} />
      </lineSegments>
      <points>
        <bufferGeometry>
          <bufferAttribute
            ref={headPosRef}
            attach="attributes-position"
            args={[headPositions, 3]}
            count={POOL}
          />
          <bufferAttribute
            ref={headColRef}
            attach="attributes-color"
            args={[headColors, 3]}
            count={POOL}
          />
        </bufferGeometry>
        <pointsMaterial
          vertexColors
          size={0.09}
          sizeAttenuation
          transparent
          opacity={0.95}
          toneMapped={false}
        />
      </points>
    </group>
  )
}

// --- DUST / AMBIENT ----------------------------------------------------------
function NeuralDust({ count = 220 }) {
  const ref = useRef(null)
  const positions = useMemo(() => {
    const a = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      a[i * 3] = (Math.random() - 0.5) * 6
      a[i * 3 + 1] = (Math.random() - 0.5) * 4
      a[i * 3 + 2] = (Math.random() - 0.5) * 6
    }
    return a
  }, [count])
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.rotation.y = t * 0.02
    ref.current.rotation.x = Math.sin(t * 0.05) * 0.05
  })
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={'#2DE2C5'} size={0.012} sizeAttenuation transparent opacity={0.35} toneMapped={false} />
    </points>
  )
}

// --- ROOT SCENE --------------------------------------------------------------
function Scene({ reduced, mouseRef }) {
  const groupRef = useRef(null)
  const brain = useMemo(() => buildBrain(160, 7), [])
  const pool = useMemo(() => createSynapsePool(brain, reduced ? 10 : 30), [brain, reduced])

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    const mx = mouseRef?.current?.x ?? 0
    const my = mouseRef?.current?.y ?? 0
    if (reduced) {
      groupRef.current.rotation.y = mx * 0.2
      groupRef.current.rotation.x = my * 0.1
    } else {
      const targetY = Math.sin(t * 0.16) * 0.55 + mx * 0.45
      const targetX = Math.sin(t * 0.11) * 0.08 + my * 0.22
      groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.04
      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.04
    }
  })

  return (
    <group ref={groupRef} scale={1.1}>
      <BrainHull />
      <NodesField brain={brain} />
      <Synapses brain={brain} pool={pool} />
      <NeuralDust count={reduced ? 80 : 280} />
    </group>
  )
}

export default function BrainSynapse({ mouseRef }) {
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
      camera={{ position: [0, 0, 3.4], fov: 46 }}
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      <fog attach="fog" args={['#08121a', 4.4, 9.5]} />
      <ambientLight intensity={0.35} />
      <Scene reduced={reduced} mouseRef={mouseRef} />
    </Canvas>
  )
}
