'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

const ACCENT = '#2DE2C5'
const BLUE = '#38BDF8'
const VIOLET = '#9D8DF1'
const AMBER = '#F5B544'

// 3-shell layout — story: customers in front (positive z), providers around the
// equator, infrastructure behind (negative z). Hub is the API gateway.
const NODE_LAYOUT = {
  gateway:    { pos: [ 0.0,  0.0,  0.0], color: ACCENT, kind: 'hub' },
  client:     { pos: [-1.7,  0.7,  1.4], color: ACCENT, kind: 'edge' },
  app:        { pos: [ 1.6,  0.6,  1.6], color: ACCENT, kind: 'edge' },
  i2c:        { pos: [-2.7, -0.2,  0.3], color: BLUE,   kind: 'provider' },
  salesforce: { pos: [ 2.7, -0.4,  0.4], color: VIOLET, kind: 'provider' },
  processor:  { pos: [ 0.4,  2.0,  0.6], color: AMBER,  kind: 'provider' },
  core:       { pos: [-1.8, -1.6, -1.7], color: BLUE,   kind: 'infra' },
  audit:      { pos: [ 1.6, -1.7, -1.8], color: VIOLET, kind: 'infra' },
}

const SATELLITE_KEYS = ['client', 'app', 'i2c', 'salesforce', 'processor', 'core', 'audit']

// Bezier curve from hub to satellite — arcs outward through midpoint pulled
// away from origin so connections don't all clump along straight lines.
function makeCurve(start, end, arcAmount = 0.45) {
  const mx = (start[0] + end[0]) / 2
  const my = (start[1] + end[1]) / 2
  const mz = (start[2] + end[2]) / 2
  const dist = Math.sqrt(mx * mx + my * my + mz * mz) || 0.1
  const cx = mx + (mx / dist) * arcAmount
  const cy = my + (my / dist) * arcAmount
  const cz = mz + (mz / dist) * arcAmount
  return new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(start[0], start[1], start[2]),
    new THREE.Vector3(cx, cy, cz),
    new THREE.Vector3(end[0], end[1], end[2]),
  )
}

// =============================================================================
// HUB — central gateway: dense glowing core + wireframe icosahedron + ring
// =============================================================================
function Hub() {
  const coreRef = useRef(null)
  const wireRef = useRef(null)
  const ringARef = useRef(null)
  const ringBRef = useRef(null)
  const haloRef = useRef(null)
  const colorObj = useMemo(() => new THREE.Color(ACCENT), [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (coreRef.current) {
      const s = 1 + Math.sin(t * 1.4) * 0.08
      coreRef.current.scale.set(s, s, s)
    }
    if (wireRef.current) {
      wireRef.current.rotation.y = t * 0.22
      wireRef.current.rotation.x = t * 0.14
    }
    if (ringARef.current) {
      ringARef.current.rotation.z = t * 0.3
    }
    if (ringBRef.current) {
      ringBRef.current.rotation.x = -t * 0.4
    }
    if (haloRef.current) {
      haloRef.current.material.opacity = 0.15 + Math.sin(t * 1.4) * 0.1
    }
  })

  return (
    <group>
      {/* outer halo */}
      <mesh ref={haloRef}>
        <sphereGeometry args={[0.78, 24, 16]} />
        <meshBasicMaterial color={colorObj} transparent opacity={0.18} toneMapped={false} />
      </mesh>
      {/* wireframe icosahedron */}
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[0.56, 1]} />
        <meshBasicMaterial color={colorObj} wireframe transparent opacity={0.55} toneMapped={false} />
      </mesh>
      {/* inner core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.22, 24, 18]} />
        <meshStandardMaterial
          color="#0c1620"
          emissive={colorObj}
          emissiveIntensity={1.6}
          roughness={0.4}
          metalness={0.2}
        />
      </mesh>
      {/* dual rings */}
      <mesh ref={ringARef} rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[0.46, 0.011, 8, 36]} />
        <meshBasicMaterial color={colorObj} transparent opacity={0.7} toneMapped={false} />
      </mesh>
      <mesh ref={ringBRef} rotation={[0, Math.PI / 2.6, Math.PI / 4]}>
        <torusGeometry args={[0.42, 0.008, 8, 36]} />
        <meshBasicMaterial color={colorObj} transparent opacity={0.5} toneMapped={false} />
      </mesh>

      {/* labels */}
      <Text
        position={[0, 1.0, 0]}
        fontSize={0.13}
        color="#F4F7FA"
        anchorX="center"
        anchorY="middle"
        letterSpacing={-0.005}
      >
        API GATEWAY
      </Text>
      <Text
        position={[0, 0.84, 0]}
        fontSize={0.07}
        color={ACCENT}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.18}
      >
        ERA · CORE
      </Text>
    </group>
  )
}

// =============================================================================
// SATELLITE — small glowing sphere + label, parented to a position
// =============================================================================
function Satellite({ id, layout, label, meta, idx, hovered, setHovered }) {
  const groupRef = useRef(null)
  const sphereRef = useRef(null)
  const ringRef = useRef(null)
  const haloRef = useRef(null)
  const colorObj = useMemo(() => new THREE.Color(layout.color), [layout.color])

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    // gentle bob
    groupRef.current.position.y = layout.pos[1] + Math.sin(t * 0.6 + idx) * 0.07

    const isHover = hovered === id
    if (sphereRef.current) {
      const m = sphereRef.current.material
      const target = isHover ? 2.4 : 1.1
      m.emissiveIntensity += (target - m.emissiveIntensity) * 0.18
    }
    if (haloRef.current) {
      const targetOp = isHover ? 0.45 : 0.2
      haloRef.current.material.opacity += (targetOp - haloRef.current.material.opacity) * 0.18
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.5 * (idx % 2 === 0 ? 1 : -1)
    }
  })

  return (
    <group
      ref={groupRef}
      position={layout.pos}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(id) }}
      onPointerOut={(e) => { e.stopPropagation(); setHovered((h) => (h === id ? null : h)) }}
    >
      {/* halo */}
      <mesh ref={haloRef}>
        <sphereGeometry args={[0.21, 18, 14]} />
        <meshBasicMaterial color={colorObj} transparent opacity={0.2} toneMapped={false} />
      </mesh>
      {/* core */}
      <mesh ref={sphereRef}>
        <sphereGeometry args={[0.11, 18, 14]} />
        <meshStandardMaterial
          color="#0c1620"
          emissive={colorObj}
          emissiveIntensity={1.1}
          roughness={0.4}
          metalness={0.2}
        />
      </mesh>
      {/* ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[0.14, 0.005, 8, 24]} />
        <meshBasicMaterial color={colorObj} transparent opacity={0.65} toneMapped={false} />
      </mesh>

      {/* label */}
      <Text
        position={[0, 0.34, 0]}
        fontSize={0.1}
        color="#E2E9F0"
        anchorX="center"
        anchorY="middle"
        letterSpacing={-0.005}
      >
        {label}
      </Text>
      <Text
        position={[0, 0.22, 0]}
        fontSize={0.06}
        color="#7C8A9C"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.16}
      >
        {meta}
      </Text>
    </group>
  )
}

// =============================================================================
// CONDUITS — TubeGeometry from each satellite to the hub.
// Glows with the satellite's color. Solid + emissive, not just lines.
// =============================================================================
function Conduits() {
  const tubes = useMemo(() => {
    return SATELLITE_KEYS.map((key) => {
      const sat = NODE_LAYOUT[key]
      const curve = makeCurve(NODE_LAYOUT.gateway.pos, sat.pos, 0.45)
      const geom = new THREE.TubeGeometry(curve, 36, 0.018, 8, false)
      return { geometry: geom, color: new THREE.Color(sat.color) }
    })
  }, [])

  useEffect(() => () => tubes.forEach((t) => t.geometry.dispose()), [tubes])

  return (
    <group>
      {tubes.map((tube, i) => (
        <mesh key={i} geometry={tube.geometry}>
          <meshStandardMaterial
            color="#0c1620"
            emissive={tube.color}
            emissiveIntensity={0.55}
            transparent
            opacity={0.45}
            roughness={0.4}
            metalness={0.3}
          />
        </mesh>
      ))}
    </group>
  )
}

// =============================================================================
// TRAFFIC — particles flowing inside the tubes, bidirectional, color-matched
// =============================================================================
function Traffic() {
  const PARTICLES_PER_LINE = 3
  const totalCount = SATELLITE_KEYS.length * PARTICLES_PER_LINE
  const meshRef = useRef(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const tmpPoint = useMemo(() => new THREE.Vector3(), [])

  const curves = useMemo(
    () => SATELLITE_KEYS.map((k) => makeCurve(NODE_LAYOUT.gateway.pos, NODE_LAYOUT[k].pos, 0.45)),
    [],
  )
  const colors = useMemo(
    () => SATELLITE_KEYS.map((k) => new THREE.Color(NODE_LAYOUT[k].color)),
    [],
  )

  // assign per-instance colors once
  useEffect(() => {
    const mesh = meshRef.current
    if (!mesh) return
    let i = 0
    SATELLITE_KEYS.forEach((_, satIdx) => {
      const c = colors[satIdx]
      for (let p = 0; p < PARTICLES_PER_LINE; p++) {
        mesh.setColorAt(i, c)
        i++
      }
    })
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
  }, [colors])

  useFrame((state) => {
    const mesh = meshRef.current
    if (!mesh) return
    const t = state.clock.elapsedTime

    let i = 0
    SATELLITE_KEYS.forEach((_, satIdx) => {
      const speed = 0.32 + (satIdx % 3) * 0.06
      const phaseBase = satIdx * 0.4

      for (let p = 0; p < PARTICLES_PER_LINE; p++) {
        const phaseOffset = p / PARTICLES_PER_LINE
        const raw = (t * speed + phaseBase + phaseOffset) % 1
        // Alternating direction per particle so traffic feels bidirectional
        const direction = (satIdx + p) % 2 === 0 ? raw : 1 - raw

        curves[satIdx].getPoint(direction, tmpPoint)

        const fade =
          direction < 0.06 ? direction / 0.06 :
          direction > 0.94 ? (1 - direction) / 0.06 : 1
        const s = 0.045 + fade * 0.05

        dummy.position.copy(tmpPoint)
        dummy.scale.set(s, s, s)
        dummy.updateMatrix()
        mesh.setMatrixAt(i, dummy.matrix)
        i++
      }
    })

    mesh.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[null, null, totalCount]}>
      <sphereGeometry args={[1, 10, 8]} />
      <meshBasicMaterial
        vertexColors
        transparent
        opacity={0.95}
        toneMapped={false}
        blending={THREE.AdditiveBlending}
      />
    </instancedMesh>
  )
}

// =============================================================================
// PULSE WAVES — periodic shockwave rings firing from hub toward random satellites
// Adds a sense of "the system is alive and dispatching"
// =============================================================================
function PulseWaves() {
  const NUM = 3
  const ringsRef = useRef([])
  const pulses = useMemo(
    () =>
      Array.from({ length: NUM }, (_, i) => ({
        target: SATELLITE_KEYS[i % SATELLITE_KEYS.length],
        progress: i / NUM,
      })),
    [],
  )

  useFrame((state, dt) => {
    pulses.forEach((pulse, i) => {
      pulse.progress += dt * 0.45
      if (pulse.progress >= 1) {
        pulse.progress = 0
        pulse.target = SATELLITE_KEYS[Math.floor(Math.random() * SATELLITE_KEYS.length)]
      }
      const ring = ringsRef.current[i]
      if (!ring) return
      const sat = NODE_LAYOUT[pulse.target]
      const hub = NODE_LAYOUT.gateway
      const t = pulse.progress

      ring.position.set(
        hub.pos[0] + (sat.pos[0] - hub.pos[0]) * t,
        hub.pos[1] + (sat.pos[1] - hub.pos[1]) * t,
        hub.pos[2] + (sat.pos[2] - hub.pos[2]) * t,
      )
      ring.lookAt(hub.pos[0], hub.pos[1], hub.pos[2])
      const scale = 0.12 + t * 0.55
      ring.scale.set(scale, scale, scale)

      const op = (1 - t) * 0.7
      const mesh = ring.children[0]
      if (mesh && mesh.material) mesh.material.opacity = op
    })
  })

  return (
    <group>
      {pulses.map((_, i) => (
        <group key={i} ref={(el) => (ringsRef.current[i] = el)}>
          <mesh>
            <ringGeometry args={[0.34, 0.4, 32]} />
            <meshBasicMaterial
              color={ACCENT}
              transparent
              opacity={0.5}
              side={THREE.DoubleSide}
              toneMapped={false}
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}

// =============================================================================
// AMBIENT DUST — sparse particles in deep space giving sense of scale + depth
// =============================================================================
function AmbientDust() {
  const COUNT = 220
  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      // distribute on a sphere shell at radius ~6 around origin
      const u = Math.random()
      const v = Math.random()
      const theta = u * Math.PI * 2
      const phi = Math.acos(2 * v - 1)
      const r = 4 + Math.random() * 2.5
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.cos(phi)
      arr[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)
    }
    return arr
  }, [])
  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return g
  }, [positions])
  useEffect(() => () => geometry.dispose(), [geometry])

  return (
    <points geometry={geometry}>
      <pointsMaterial
        size={0.025}
        color={ACCENT}
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// =============================================================================
// SCENE
// =============================================================================
function Scene({ nodes, dragRotation, autoSpin, interactedRef, parallaxRef }) {
  const groupRef = useRef(null)
  const [hovered, setHovered] = useState(null)

  const nodeMap = useMemo(() => {
    const m = {}
    nodes.forEach((n) => { m[n.id] = n })
    return m
  }, [nodes])

  useFrame(() => {
    if (!groupRef.current) return
    if (autoSpin && !interactedRef.current) {
      dragRotation.current.y += 0.0014
    }
    const px = parallaxRef.current.x
    const py = parallaxRef.current.y
    const ty = dragRotation.current.y + px * 0.32
    const tx = dragRotation.current.x + (-py) * 0.18
    groupRef.current.rotation.y += (ty - groupRef.current.rotation.y) * 0.08
    groupRef.current.rotation.x += (tx - groupRef.current.rotation.x) * 0.08
  })

  return (
    <group ref={groupRef}>
      <AmbientDust />
      <Conduits />
      <Traffic />
      <PulseWaves />
      <Hub />
      {SATELLITE_KEYS.map((key, idx) => {
        const layout = NODE_LAYOUT[key]
        const node = nodeMap[key]
        if (!node || !layout) return null
        return (
          <Satellite
            key={key}
            id={key}
            layout={layout}
            label={node.label}
            meta={node.meta}
            idx={idx}
            hovered={hovered}
            setHovered={setHovered}
          />
        )
      })}
    </group>
  )
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.45} />
      <pointLight position={[3, 3, 4]} intensity={1.5} color={ACCENT} distance={14} />
      <pointLight position={[-3, -2, 3]} intensity={0.9} color={BLUE} distance={14} />
      <pointLight position={[0, 4, -2]} intensity={0.55} color={VIOLET} distance={12} />
    </>
  )
}

// =============================================================================
// PUBLIC COMPONENT
// =============================================================================
export default function IntegrationConstellation({ nodes }) {
  const dragRotation = useRef({ x: 0, y: 0 })
  const containerRef = useRef(null)
  const interactedRef = useRef(false)
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

  // Parallax — fill from cursor relative to the SECTION (not the canvas)
  // so moving the mouse over the copy still tilts the constellation.
  useEffect(() => {
    const update = (e) => {
      const el = containerRef.current
      if (!el) return
      const section = el.closest('section')
      if (!section) return
      const r = section.getBoundingClientRect()
      const inside =
        e.clientX >= r.left && e.clientX <= r.right &&
        e.clientY >= r.top  && e.clientY <= r.bottom
      if (inside) {
        parallaxRef.current.x = ((e.clientX - r.left) / r.width) * 2 - 1
        parallaxRef.current.y = -(((e.clientY - r.top) / r.height) * 2 - 1)
      } else {
        parallaxRef.current.x *= 0.9
        parallaxRef.current.y *= 0.9
        if (Math.abs(parallaxRef.current.x) < 0.01) parallaxRef.current.x = 0
        if (Math.abs(parallaxRef.current.y) < 0.01) parallaxRef.current.y = 0
      }
    }
    window.addEventListener('pointermove', update, { passive: true })
    return () => window.removeEventListener('pointermove', update)
  }, [])

  // Drag rotation — same window-level pattern that survives overlays
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
      dragRotation.current.x = Math.max(-0.5, Math.min(0.5, dragRotation.current.x + dy * 0.005))
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
      className="w-full h-full select-none relative"
      style={{ touchAction: 'pan-y' }}
    >
      <Canvas
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0.2, 7.4], fov: 42 }}
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <fog attach="fog" args={['#05080C', 7, 14]} />
        <Lights />
        <Scene
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
