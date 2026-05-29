'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

const ACCENT = new THREE.Color('#2DE2C5')

// 7 nodes in 3D space — connected graph, distinct topology (not a vertical line).
const NODE_POS = [
  { x: -3.0, y:  0.4, z:  0.5 }, // 0 Customers
  { x: -1.2, y:  0.7, z:  0.0 }, // 1 Application
  { x:  0.4, y:  0.2, z:  0.4 }, // 2 API Gateway
  { x:  2.0, y: -0.6, z:  0.2 }, // 3 Database
  { x:  1.5, y:  1.1, z: -0.4 }, // 4 AI Layer
  { x:  3.4, y:  0.6, z: -0.2 }, // 5 Dashboards
  { x:  0.7, y: -1.3, z: -0.5 }, // 6 Automation
]

const TRAFFIC = [
  { from: 0, to: 1, speed: 0.45, phase: 0.0 },
  { from: 1, to: 2, speed: 0.45, phase: 0.6 },
  { from: 2, to: 3, speed: 0.40, phase: 1.1 },
  { from: 2, to: 4, speed: 0.45, phase: 1.4 },
  { from: 4, to: 3, speed: 0.50, phase: 1.9 },
  { from: 3, to: 5, speed: 0.40, phase: 2.2 },
  { from: 6, to: 2, speed: 0.45, phase: 2.6 },
  { from: 5, to: 1, speed: 0.40, phase: 3.0 },
]

// =============================================================================
// Node — minimal: thin ring + small dot + label only. No halos, no emissive.
// =============================================================================
function NodeMesh({ pos, label, idx, hovered, setHovered }) {
  const groupRef = useRef(null)
  const ringRef = useRef(null)
  const dotRef = useRef(null)

  useFrame((state) => {
    if (!groupRef.current) return
    // very subtle bob to keep things alive
    const t = state.clock.elapsedTime
    groupRef.current.position.y = pos.y + Math.sin(t * 0.5 + idx) * 0.025

    const isHover = hovered === idx
    if (ringRef.current) {
      const m = ringRef.current.material
      const target = isHover ? 1.0 : 0.45
      m.opacity += (target - m.opacity) * 0.15
    }
    if (dotRef.current) {
      const target = isHover ? 1.5 : 1.0
      dotRef.current.scale.x += (target - dotRef.current.scale.x) * 0.18
      dotRef.current.scale.y += (target - dotRef.current.scale.y) * 0.18
      dotRef.current.scale.z += (target - dotRef.current.scale.z) * 0.18
    }
  })

  return (
    <group
      ref={groupRef}
      position={[pos.x, pos.y, pos.z]}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(idx) }}
      onPointerOut={(e) => { e.stopPropagation(); setHovered((h) => (h === idx ? null : h)) }}
    >
      {/* center dot */}
      <mesh ref={dotRef}>
        <sphereGeometry args={[0.04, 14, 10]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.95} toneMapped={false} />
      </mesh>

      {/* outer ring — thin, single color */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.16, 0.0035, 8, 36]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.45} toneMapped={false} />
      </mesh>

      {/* label — single, simple */}
      <Text
        position={[0, 0.36, 0]}
        fontSize={0.115}
        color="#E2E9F0"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0}
      >
        {label}
      </Text>
    </group>
  )
}

// =============================================================================
// Connection line — single thin neutral line
// =============================================================================
function ConnectionLine({ from, to }) {
  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(from.x, from.y, from.z),
      new THREE.Vector3(to.x, to.y, to.z),
    ])
    return g
  }, [from, to])

  useEffect(() => () => geometry.dispose(), [geometry])

  return (
    <line geometry={geometry}>
      <lineBasicMaterial color="#3a4a5a" transparent opacity={0.45} toneMapped={false} />
    </line>
  )
}

// =============================================================================
// Traffic — exactly one particle per connection. InstancedMesh.
// =============================================================================
function TrafficLayer() {
  const meshRef = useRef(null)
  const totalCount = TRAFFIC.length
  const dummy = useMemo(() => new THREE.Object3D(), [])

  useFrame((state) => {
    const mesh = meshRef.current
    if (!mesh) return
    const t = state.clock.elapsedTime

    TRAFFIC.forEach((tr, i) => {
      const fromPos = NODE_POS[tr.from]
      const toPos = NODE_POS[tr.to]
      const dx = toPos.x - fromPos.x
      const dy = toPos.y - fromPos.y
      const dz = toPos.z - fromPos.z

      const cycle = ((t * tr.speed + tr.phase) % 1)
      const x = fromPos.x + dx * cycle
      const y = fromPos.y + dy * cycle
      const z = fromPos.z + dz * cycle

      // fade in/out at endpoints so it reads as a pulse, not a hard dot
      const fade =
        cycle < 0.08 ? cycle / 0.08 :
        cycle > 0.92 ? (1 - cycle) / 0.08 : 1
      const s = (0.035 + fade * 0.015)

      dummy.position.set(x, y, z)
      dummy.scale.set(s, s, s)
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
    })

    mesh.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[null, null, totalCount]}>
      <sphereGeometry args={[1, 8, 6]} />
      <meshBasicMaterial color={ACCENT} transparent opacity={0.95} toneMapped={false} />
    </instancedMesh>
  )
}

// =============================================================================
// Whole scene
// =============================================================================
function FlowScene({ nodes, dragRotation, autoSpin, interactedRef }) {
  const groupRef = useRef(null)
  const [hovered, setHovered] = useState(null)

  useFrame(() => {
    if (!groupRef.current) return
    if (autoSpin && !interactedRef.current) {
      dragRotation.current.y += 0.0014
    }
    const ty = dragRotation.current.y
    const tx = dragRotation.current.x
    groupRef.current.rotation.y += (ty - groupRef.current.rotation.y) * 0.1
    groupRef.current.rotation.x += (tx - groupRef.current.rotation.x) * 0.1
  })

  return (
    <group ref={groupRef}>
      {TRAFFIC.map((tr, i) => (
        <ConnectionLine
          key={i}
          from={NODE_POS[tr.from]}
          to={NODE_POS[tr.to]}
        />
      ))}
      <TrafficLayer />
      {nodes.map((node, i) => (
        <NodeMesh
          key={node.label}
          pos={NODE_POS[i]}
          label={node.label}
          idx={i}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </group>
  )
}

// =============================================================================
// Public component
// =============================================================================
export default function SystemFlow3D({ nodes, compact = false }) {
  const dragRotation = useRef({ x: 0, y: 0 })
  const containerRef = useRef(null)
  const interactedRef = useRef(false)
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
    const el = containerRef.current
    if (!el) return
    let dragging = false
    let last = { x: 0, y: 0 }

    const onDown = (e) => {
      dragging = true
      interactedRef.current = true
      const p = 'touches' in e ? e.touches[0] : e
      last = { x: p.clientX, y: p.clientY }
      el.style.cursor = 'grabbing'
    }
    const onMove = (e) => {
      if (!dragging) return
      const p = 'touches' in e ? e.touches[0] : e
      const dx = p.clientX - last.x
      const dy = p.clientY - last.y
      last = { x: p.clientX, y: p.clientY }
      dragRotation.current.y += dx * 0.008
      dragRotation.current.x = Math.max(
        -0.5,
        Math.min(0.5, dragRotation.current.x + dy * 0.005),
      )
    }
    const onUp = () => {
      dragging = false
      el.style.cursor = 'grab'
    }

    el.addEventListener('mousedown', onDown)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    el.addEventListener('touchstart', onDown, { passive: true })
    window.addEventListener('touchmove', onMove, { passive: true })
    window.addEventListener('touchend', onUp)
    el.style.cursor = 'grab'

    return () => {
      el.removeEventListener('mousedown', onDown)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
      el.removeEventListener('touchstart', onDown)
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('touchend', onUp)
    }
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
        camera={{
          position: [0, 0.2, compact ? 5.6 : 7.4],
          fov: compact ? 50 : 42,
        }}
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <ambientLight intensity={0.6} />
        <FlowScene
          nodes={nodes}
          dragRotation={dragRotation}
          autoSpin={!reduced}
          interactedRef={interactedRef}
        />
      </Canvas>
    </div>
  )
}
