'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { buildRocket } from './RocketParticles'

const ACCENT = new THREE.Color('#2DE2C5')
const BLUE = new THREE.Color('#38BDF8')
const VIOLET = new THREE.Color('#9D8DF1')
const AMBER = new THREE.Color('#F5B544')
const ORANGE = new THREE.Color('#FF8B3D')
const WHITE = new THREE.Color('#F0F6FB')

const PIECE_EXHAUST = 13

// =============================================================================
// Digital planet — wireframe globe + glowing surface nodes + lat/long hairlines
// =============================================================================
function DigitalPlanet({ scrollRef, descentRef }) {
  const groupRef = useRef(null)
  const wireRef = useRef(null)
  const innerRef = useRef(null)

  const RADIUS = 2.4
  const PLANET_Y = -3.6 // planet sits below the rocket's docking position

  // Generate scattered surface nodes — concentrated in the upper hemisphere
  // (the half facing the rocket), thinning toward the poles
  const { nodePositions, nodeColors } = useMemo(() => {
    const NODE_COUNT = 220
    const pos = new Float32Array(NODE_COUNT * 3)
    const col = new Float32Array(NODE_COUNT * 3)
    const tones = [ACCENT, BLUE, VIOLET, AMBER]
    for (let i = 0; i < NODE_COUNT; i++) {
      // bias toward upper hemisphere via cube-rooted v in [0, 1]
      const v = Math.random()
      const phi = Math.acos(1 - v * 1.4) // 0 at top, ~PI at bottom-ish
      const theta = Math.random() * Math.PI * 2
      const r = RADIUS * (1 + (Math.random() - 0.5) * 0.005)
      const x = r * Math.sin(phi) * Math.cos(theta)
      const y = r * Math.cos(phi)
      const z = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3] = x
      pos[i * 3 + 1] = y
      pos[i * 3 + 2] = z
      const c = tones[Math.floor(Math.random() * tones.length)].clone()
        .lerp(WHITE, Math.random() < 0.15 ? 0.5 : 0)
      col[i * 3] = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b
    }
    return { nodePositions: pos, nodeColors: col }
  }, [])

  // node geometry — points
  const nodeGeometry = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3))
    g.setAttribute('color', new THREE.BufferAttribute(nodeColors, 3))
    return g
  }, [nodePositions, nodeColors])
  useEffect(() => () => nodeGeometry.dispose(), [nodeGeometry])

  // Connection lines — pick ~80 random pairs near each other, draw thin lines
  const linesGeometry = useMemo(() => {
    const LINE_COUNT = 80
    const verts = []
    const colors = []
    for (let i = 0; i < LINE_COUNT; i++) {
      const a = Math.floor(Math.random() * 220)
      // find a partner within angular distance
      let b = a
      let attempts = 0
      while (b === a && attempts < 8) {
        const candidate = Math.floor(Math.random() * 220)
        const ax = nodePositions[a * 3], ay = nodePositions[a * 3 + 1], az = nodePositions[a * 3 + 2]
        const bx = nodePositions[candidate * 3], by = nodePositions[candidate * 3 + 1], bz = nodePositions[candidate * 3 + 2]
        const dot = (ax * bx + ay * by + az * bz) / (RADIUS * RADIUS)
        if (dot > 0.7) { // close on the sphere
          b = candidate
          break
        }
        attempts++
      }
      if (a === b) continue
      verts.push(
        nodePositions[a * 3], nodePositions[a * 3 + 1], nodePositions[a * 3 + 2],
        nodePositions[b * 3], nodePositions[b * 3 + 1], nodePositions[b * 3 + 2],
      )
      // tint each line based on the average of its endpoint colors
      const cr = (nodeColors[a * 3] + nodeColors[b * 3]) / 2
      const cg = (nodeColors[a * 3 + 1] + nodeColors[b * 3 + 1]) / 2
      const cb = (nodeColors[a * 3 + 2] + nodeColors[b * 3 + 2]) / 2
      colors.push(cr, cg, cb, cr, cg, cb)
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(verts), 3))
    g.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3))
    return g
  }, [nodePositions, nodeColors])
  useEffect(() => () => linesGeometry.dispose(), [linesGeometry])

  // gentle planet rotation + descent-driven flare on the upper surface
  useFrame((state, dt) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0018 // slow yaw drift
    }
    // node + wireframe brightness pulses softly
    if (wireRef.current) {
      const m = wireRef.current.material
      const t = state.clock.elapsedTime
      const base = 0.16
      const pulse = Math.sin(t * 1.2) * 0.04
      const descent = descentRef.current ?? 0 // 0 high, 1 close
      m.opacity = base + pulse + descent * 0.18
    }
  })

  return (
    <group ref={groupRef} position={[0, PLANET_Y, 0]}>
      {/* solid dark inner shell — gives the planet a body */}
      <mesh ref={innerRef}>
        <sphereGeometry args={[RADIUS * 0.985, 32, 24]} />
        <meshStandardMaterial
          color="#0a131c"
          roughness={0.95}
          metalness={0.05}
        />
      </mesh>

      {/* wireframe skin — icosahedron for that low-poly digital look */}
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[RADIUS, 4]} />
        <meshBasicMaterial
          color={ACCENT}
          wireframe
          transparent
          opacity={0.16}
          toneMapped={false}
        />
      </mesh>

      {/* equator + meridian hairlines — quiet structure */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[RADIUS, 0.005, 8, 96]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.4} toneMapped={false} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[RADIUS, 0.004, 8, 96]} />
        <meshBasicMaterial color={BLUE} transparent opacity={0.25} toneMapped={false} />
      </mesh>

      {/* network connection lines */}
      <lineSegments geometry={linesGeometry}>
        <lineBasicMaterial vertexColors transparent opacity={0.35} toneMapped={false} />
      </lineSegments>

      {/* surface nodes — bright glow points */}
      <points geometry={nodeGeometry}>
        <pointsMaterial
          size={0.06}
          vertexColors
          transparent
          opacity={0.95}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* atmosphere glow — faint outer halo */}
      <mesh>
        <sphereGeometry args={[RADIUS * 1.06, 24, 16]} />
        <meshBasicMaterial
          color={ACCENT}
          transparent
          opacity={0.04}
          side={THREE.BackSide}
          toneMapped={false}
        />
      </mesh>
    </group>
  )
}

// =============================================================================
// Landing rocket — particles, fully lit (all stages on), descends with scroll.
// Cursor scatters; engine plume intensifies as it gets closer to the planet.
// =============================================================================
function LandingRocket({ scrollRef, descentRef, interactedRef, autoSpinRef }) {
  const groupRef = useRef(null)
  const { camera } = useThree()
  const { positions, homes, baseColors, pieces, count } = useMemo(() => buildRocket(), [])
  const velocities = useMemo(() => new Float32Array(count * 3), [count])

  // homeOffset shifts each particle's "rest position" by a Y descent
  // so spring physics still works correctly during descent.
  const cursorWorld = useRef(new THREE.Vector3())
  const tmpDir = useRef(new THREE.Vector3())

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    g.setAttribute('color', new THREE.BufferAttribute(baseColors.slice(), 3))
    return g
  }, [positions, baseColors])

  useEffect(() => () => geometry.dispose(), [geometry])

  // physics tunables
  const RADIUS = 0.7
  const RADIUS_SQ = RADIUS * RADIUS
  const REPULSE = 0.18
  const SPRING = 0.012
  const DAMPING = 0.93

  // descent path: ranges from y=+1.6 at scroll 0 (rocket high above) to y=0 at scroll 1 (touchdown above planet).
  // The rocket geometry is centered around y=0 in its own coordinates; the group y shifts.
  const Y_HIGH = 1.6
  const Y_LOW = -0.4

  useFrame((state, dt) => {
    // cursor projection
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

    // descent — driven by scroll progress
    const sp = THREE.MathUtils.clamp(scrollRef.current ?? 0, 0, 1)
    // ease the descent (slower start, quicker mid, settle near end)
    const easedDescent = sp * sp * (3 - 2 * sp) // smoothstep
    descentRef.current = easedDescent
    const targetY = Y_HIGH + (Y_LOW - Y_HIGH) * easedDescent

    if (groupRef.current) {
      groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.12
      // gentle yaw spin only when not interacted
      if (autoSpinRef.current && !interactedRef.current) {
        groupRef.current.rotation.y += 0.0024
      }
      // subtle wobble during descent (more noticeable as it nears ground)
      const wobble = Math.sin(state.clock.elapsedTime * 0.8) * 0.04 * easedDescent
      groupRef.current.rotation.z = wobble
    }

    const localCursor = tmpDir.current.copy(cursorWorld.current)
    if (groupRef.current) groupRef.current.worldToLocal(localCursor)

    const pos = geometry.attributes.position.array
    const cx = localCursor.x, cy = localCursor.y, cz = localCursor.z

    for (let i = 0; i < count; i++) {
      const ix = i * 3, iy = i * 3 + 1, iz = i * 3 + 2
      const piece = pieces[i]

      // cursor repulsion
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
      }

      // spring toward home
      velocities[ix] += (homes[ix] - pos[ix]) * SPRING
      velocities[iy] += (homes[iy] - pos[iy]) * SPRING
      velocities[iz] += (homes[iz] - pos[iz]) * SPRING

      velocities[ix] *= DAMPING
      velocities[iy] *= DAMPING
      velocities[iz] *= DAMPING

      // exhaust intensifies as descent progresses (more turbulent)
      if (piece === PIECE_EXHAUST) {
        const intensity = 0.012 + easedDescent * 0.02
        velocities[ix] += (Math.random() - 0.5) * intensity
        velocities[iy] -= 0.002 + easedDescent * 0.005 // stronger downdraft on landing
        velocities[iz] += (Math.random() - 0.5) * intensity
      }

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
          size={0.028}
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
// Public component — landing scene with rocket + digital planet
// =============================================================================
export default function RocketLanding({ scrollProgressRef }) {
  const interactedRef = useRef(false)
  const autoSpinRef = useRef(true)
  const containerRef = useRef(null)
  const fallbackScroll = useRef(0)
  const scrollRef = scrollProgressRef ?? fallbackScroll
  const descentRef = useRef(0)
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
    const el = containerRef.current
    if (!el) return
    const onEnter = () => { interactedRef.current = true }
    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('touchstart', onEnter, { passive: true })
    return () => {
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('touchstart', onEnter)
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
        camera={{ position: [0, 0, 7.2], fov: 44 }}
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <ambientLight intensity={0.45} />
        <pointLight position={[3, 4, 4]} intensity={1.2} color={ACCENT} distance={16} />
        <pointLight position={[-3, -2, 3]} intensity={0.7} color={BLUE} distance={14} />

        <DigitalPlanet scrollRef={scrollRef} descentRef={descentRef} />
        <LandingRocket
          scrollRef={scrollRef}
          descentRef={descentRef}
          interactedRef={interactedRef}
          autoSpinRef={autoSpinRef}
        />
      </Canvas>
    </div>
  )
}
