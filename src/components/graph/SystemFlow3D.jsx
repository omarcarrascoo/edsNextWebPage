'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

const ACCENT = new THREE.Color('#2DE2C5')
const WHITE = new THREE.Color('#F4F7FA')
const NEUTRAL = new THREE.Color('#3a4a5a')

// 7 nodes in 3D space — connected graph, distinct topology.
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

const PARTICLES_PER_NODE = 90
const PARTICLES_PER_LINE = 30
const NODE_RADIUS = 0.16

// =============================================================================
// Build static particles: nodes (dense clusters) + line trails (chains)
// Returns positions, colors, homes, and an index telling which "kind" each is.
// =============================================================================
function buildField() {
  const positions = []
  const colors = []
  const homes = []

  const push = (x, y, z, c) => {
    positions.push(x, y, z)
    homes.push(x, y, z)
    colors.push(c.r, c.g, c.b)
  }

  // NODE CLUSTERS — small dense sphere around each node center
  NODE_POS.forEach((p) => {
    for (let i = 0; i < PARTICLES_PER_NODE; i++) {
      // bias toward center for a "pulsing dot" feel
      const r = NODE_RADIUS * Math.pow(Math.random(), 0.6)
      const u = Math.random()
      const v = Math.random()
      const theta = 2 * Math.PI * u
      const phi = Math.acos(2 * v - 1)
      const dx = r * Math.sin(phi) * Math.cos(theta)
      const dy = r * Math.cos(phi)
      const dz = r * Math.sin(phi) * Math.sin(theta)
      // brighter near center
      const t = r / NODE_RADIUS
      const c = ACCENT.clone().lerp(WHITE, (1 - t) * 0.55)
      push(p.x + dx, p.y + dy, p.z + dz, c)
    }
  })

  // LINE TRAILS — particles spread along each connection with small jitter
  TRAFFIC.forEach((tr) => {
    const a = NODE_POS[tr.from]
    const b = NODE_POS[tr.to]
    for (let i = 0; i < PARTICLES_PER_LINE; i++) {
      const t = (i + 0.5) / PARTICLES_PER_LINE
      const x = a.x + (b.x - a.x) * t + (Math.random() - 0.5) * 0.04
      const y = a.y + (b.y - a.y) * t + (Math.random() - 0.5) * 0.04
      const z = a.z + (b.z - a.z) * t + (Math.random() - 0.5) * 0.04
      // dim neutral so lines read as background structure, not as feature
      const c = NEUTRAL.clone().lerp(ACCENT, 0.15)
      push(x, y, z, c)
    }
  })

  return {
    positions: new Float32Array(positions),
    colors: new Float32Array(colors),
    homes: new Float32Array(homes),
    count: positions.length / 3,
  }
}

// =============================================================================
// Static + scatter field
// =============================================================================
function FieldParticles({ mouseRef, dragRotation, autoSpin, interactedRef, parallaxRef }) {
  const groupRef = useRef(null)
  const { camera } = useThree()

  const { positions, colors, homes, count } = useMemo(() => buildField(), [])
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

  // physics tunables
  const SCATTER_RADIUS = 0.7
  const SCATTER_RADIUS_SQ = SCATTER_RADIUS * SCATTER_RADIUS
  const REPULSE = 0.32
  const SPRING = 0.013
  const DAMPING = 0.92

  useFrame((state) => {
    // Group rotation = drag + auto-spin + cursor-driven parallax tilt
    if (groupRef.current) {
      if (autoSpin && !interactedRef.current) {
        dragRotation.current.y += 0.0014
      }
      // parallax: gentle yaw/pitch follow of the mouse, layered ON TOP of drag
      const px = parallaxRef.current.x
      const py = parallaxRef.current.y
      const ty = dragRotation.current.y + px * 0.35
      const tx = dragRotation.current.x + (-py) * 0.22
      groupRef.current.rotation.y += (ty - groupRef.current.rotation.y) * 0.08
      groupRef.current.rotation.x += (tx - groupRef.current.rotation.x) * 0.08
    }

    // Project cursor to world plane at z=0 (rough plane of nodes)
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

    // Transform cursor into the group's local space so scatter follows rotation
    const localCursor = tmp.current.copy(cursorWorld.current)
    if (groupRef.current) groupRef.current.worldToLocal(localCursor)
    const cx = localCursor.x, cy = localCursor.y, cz = localCursor.z

    const pos = geometry.attributes.position.array

    for (let i = 0; i < count; i++) {
      const ix = i * 3, iy = i * 3 + 1, iz = i * 3 + 2

      // cursor repulsion
      const ex = pos[ix] - cx
      const ey = pos[iy] - cy
      const ez = pos[iz] - cz
      const dSq = ex * ex + ey * ey + ez * ez

      if (dSq < SCATTER_RADIUS_SQ) {
        const d = Math.sqrt(dSq) + 0.0001
        const falloff = 1 - d / SCATTER_RADIUS
        const f = REPULSE * falloff * falloff
        velocities[ix] += (ex / d) * f
        velocities[iy] += (ey / d) * f
        velocities[iz] += (ez / d) * f
        velocities[ix] += (Math.random() - 0.5) * 0.025 * falloff
        velocities[iy] += (Math.random() - 0.5) * 0.025 * falloff
      }

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
    }

    geometry.attributes.position.needsUpdate = true
  })

  return (
    <group ref={groupRef}>
      <points geometry={geometry}>
        <pointsMaterial
          size={0.03}
          vertexColors
          transparent
          opacity={0.95}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Traveling traffic particles — instanced, on top */}
      <TrafficLayer />

      {/* Floating labels — outside the field so they stay readable */}
      <NodeLabels />
    </group>
  )
}

function NodeLabels({ nodes }) {
  // labels live as children of the rotating group so they orbit with the field
  return null
}

// =============================================================================
// Traffic — exactly one traveling particle per connection. InstancedMesh.
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

      const fade =
        cycle < 0.08 ? cycle / 0.08 :
        cycle > 0.92 ? (1 - cycle) / 0.08 : 1
      const s = (0.045 + fade * 0.02)

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
// Labels rendered as a separate layer so they stay legible even when the
// field is being scattered.
// =============================================================================
function LabelLayer({ nodes, dragRotation, autoSpin, interactedRef, parallaxRef }) {
  const groupRef = useRef(null)
  useFrame(() => {
    if (!groupRef.current) return
    const px = parallaxRef.current.x
    const py = parallaxRef.current.y
    const ty = dragRotation.current.y + px * 0.35
    const tx = dragRotation.current.x + (-py) * 0.22
    groupRef.current.rotation.y += (ty - groupRef.current.rotation.y) * 0.08
    groupRef.current.rotation.x += (tx - groupRef.current.rotation.x) * 0.08
  })

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => {
        const p = NODE_POS[i]
        return (
          <Text
            key={node.label}
            position={[p.x, p.y + 0.36, p.z]}
            fontSize={0.115}
            color="#E2E9F0"
            anchorX="center"
            anchorY="middle"
            letterSpacing={0}
          >
            {node.label}
          </Text>
        )
      })}
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
  const mouseRef = useRef({ x: 0, y: 0 })
  // parallax position — normalized to [-1, 1] within the section.
  // Used to tilt the field gently as the user moves the mouse around the page,
  // even when their cursor isn't directly over the canvas.
  const parallaxRef = useRef({ x: 0, y: 0 })
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = (e) => setReduced(e.matches)
    mq.addEventListener?.('change', onChange)
    return () => mq.removeEventListener?.('change', onChange)
  }, [])

  // Track pointer position. We need TWO normalizations:
  //   1) mouseRef — relative to the canvas. Used for the cursor-scatter
  //      physics (only active when the cursor is actually over the canvas).
  //   2) parallaxRef — relative to the whole section. Used for the gentle
  //      tilt-with-mouse parallax, so even hovering over the copy column
  //      moves the field.
  useEffect(() => {
    const update = (e) => {
      const el = containerRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const cx = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const cy = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
      if (cx >= -1 && cx <= 1 && cy >= -1 && cy <= 1) {
        mouseRef.current.x = cx
        mouseRef.current.y = cy
      } else {
        mouseRef.current.x = 0
        mouseRef.current.y = 0
      }

      // section-level parallax
      const section = el.closest('section')
      if (section) {
        const r = section.getBoundingClientRect()
        const inside =
          e.clientX >= r.left && e.clientX <= r.right &&
          e.clientY >= r.top  && e.clientY <= r.bottom
        if (inside) {
          parallaxRef.current.x = ((e.clientX - r.left) / r.width) * 2 - 1
          parallaxRef.current.y = -(((e.clientY - r.top) / r.height) * 2 - 1)
        } else {
          // ease back to neutral when the cursor leaves the section
          parallaxRef.current.x *= 0.9
          parallaxRef.current.y *= 0.9
          if (Math.abs(parallaxRef.current.x) < 0.01) parallaxRef.current.x = 0
          if (Math.abs(parallaxRef.current.y) < 0.01) parallaxRef.current.y = 0
        }
      }
    }
    window.addEventListener('pointermove', update, { passive: true })
    return () => window.removeEventListener('pointermove', update)
  }, [])

  // Drag rotation
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const section = el.closest('section') || el
    let dragging = false
    let last = { x: 0, y: 0 }

    const onDown = (e) => {
      if (!section.contains(e.target)) return
      dragging = true
      interactedRef.current = true
      last = { x: e.clientX, y: e.clientY }
      el.style.cursor = 'grabbing'
    }
    const onMove = (e) => {
      if (!dragging) return
      const dx = e.clientX - last.x
      const dy = e.clientY - last.y
      last = { x: e.clientX, y: e.clientY }
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

    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)
    el.style.cursor = 'grab'

    return () => {
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
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
        <FieldParticles
          mouseRef={mouseRef}
          dragRotation={dragRotation}
          autoSpin={!reduced}
          interactedRef={interactedRef}
          parallaxRef={parallaxRef}
        />
        <LabelLayer
          nodes={nodes}
          dragRotation={dragRotation}
          autoSpin={!reduced}
          interactedRef={interactedRef}
          parallaxRef={parallaxRef}
        />
      </Canvas>
    </div>
  )
}
