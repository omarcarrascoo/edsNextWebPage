'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

const ACCENT = new THREE.Color('#2DE2C5')
const BLUE = new THREE.Color('#38BDF8')
const VIOLET = new THREE.Color('#9D8DF1')
const AMBER = new THREE.Color('#F5B544')
const RED = new THREE.Color('#F25C5C')
const WHITE = new THREE.Color('#F4F7FA')
const DIM = new THREE.Color('#1a242e')

// =============================================================================
// Build: notification bell — body + cap + handle + rim + clapper + dot + waves
// kinds:
//   0 = bell body (animated by group sway only)
//   1 = clapper + string (animated extra by group sway, hangs)
//   2 = handle / cap
//   3 = notification dot (animated by pulse)
//   4 = sound wave ring particles (radius animated outward)
// orbits[]: for kind=4, [baseRadius, angle, waveIdx]; otherwise [-1, 0, 0]
// =============================================================================
function buildBell() {
  const positions = []
  const colors = []
  const kinds = []
  const orbits = []

  const push = (x, y, z, c, kind = 0, orbit = [-1, 0, 0]) => {
    positions.push(x, y, z)
    colors.push(c.r, c.g, c.b)
    kinds.push(kind)
    orbits.push(orbit[0], orbit[1], orbit[2])
  }

  // ---------------------------------------------------------------------------
  // BELL BODY — surface of revolution
  // y goes from +0.05 (top) to -1.4 (bottom rim)
  // r curves from 0.22 to 1.0 with bell-shape exponent
  // ---------------------------------------------------------------------------
  const BODY_POINTS = 1600
  for (let i = 0; i < BODY_POINTS; i++) {
    const t = Math.random() // 0..1, top to bottom
    const y = 0.05 - t * 1.45
    // bell flare: small near top, expands toward rim
    const r = 0.22 + Math.pow(t, 1.5) * 0.78
    const theta = Math.random() * Math.PI * 2
    const wallJitter = (Math.random() - 0.5) * 0.012
    const x = Math.cos(theta) * (r + wallJitter)
    const z = Math.sin(theta) * (r + wallJitter)
    const tone = ACCENT.clone().lerp(BLUE, t * 0.6).lerp(WHITE, Math.random() < 0.07 ? 0.45 : 0)
    push(x, y, z, tone, 0)
  }

  // ---------------------------------------------------------------------------
  // TOP CAP — dome at top of bell
  // ---------------------------------------------------------------------------
  const CAP_POINTS = 240
  for (let i = 0; i < CAP_POINTS; i++) {
    const phi = Math.random() * Math.PI * 2
    const v = Math.random()
    const theta = v * (Math.PI / 2)
    const r = 0.22
    const x = Math.cos(phi) * Math.sin(theta) * r
    const y = 0.05 + Math.cos(theta) * 0.1
    const z = Math.sin(phi) * Math.sin(theta) * r
    push(x, y, z, ACCENT.clone().lerp(WHITE, 0.4 + Math.cos(theta) * 0.3), 2)
  }

  // ---------------------------------------------------------------------------
  // HANDLE — small loop above the cap (a torus-like ring)
  // ---------------------------------------------------------------------------
  const HANDLE_POINTS = 180
  for (let i = 0; i < HANDLE_POINTS; i++) {
    const u = Math.random() * Math.PI * 2 // around the loop
    const v = Math.random() * Math.PI * 2 // around the tube
    const R = 0.12 // loop radius
    const r2 = 0.022 // tube radius
    const x = (R + r2 * Math.cos(v)) * Math.cos(u) * 0.0001 + Math.cos(u) * R + Math.cos(v) * r2 * Math.sin(u) * 0
    // simpler: vertical loop in XY plane
    const lx = Math.cos(u) * R
    const ly = 0.22 + Math.sin(u) * R
    const lz = Math.cos(v) * r2
    push(lx + Math.sin(u) * 0, ly, lz, ACCENT.clone().lerp(WHITE, 0.55), 2)
  }

  // ---------------------------------------------------------------------------
  // BOTTOM RIM — bright ring at y = -1.4
  // ---------------------------------------------------------------------------
  const RIM_POINTS = 240
  for (let i = 0; i < RIM_POINTS; i++) {
    const ang = (i / RIM_POINTS) * Math.PI * 2 + (Math.random() - 0.5) * 0.012
    const r = 1.0 + (Math.random() - 0.5) * 0.014
    const x = Math.cos(ang) * r
    const y = -1.4 + (Math.random() - 0.5) * 0.014
    const z = Math.sin(ang) * r
    push(x, y, z, ACCENT.clone().lerp(WHITE, 0.65), 0)
  }

  // ---------------------------------------------------------------------------
  // CLAPPER STRING — vertical string from inside cap to clapper
  // ---------------------------------------------------------------------------
  const STRING_POINTS = 50
  for (let i = 0; i < STRING_POINTS; i++) {
    const t = Math.random()
    const y = 0.0 - t * 1.55
    const x = (Math.random() - 0.5) * 0.012
    const z = (Math.random() - 0.5) * 0.012
    push(x, y, z, ACCENT.clone().lerp(DIM, 0.5), 1)
  }

  // ---------------------------------------------------------------------------
  // CLAPPER — small sphere hanging just below the rim
  // ---------------------------------------------------------------------------
  const CLAPPER_POINTS = 120
  const CLAPPER_Y = -1.6
  for (let i = 0; i < CLAPPER_POINTS; i++) {
    const phi = Math.random() * Math.PI * 2
    const v = Math.random()
    const cosT = 2 * v - 1
    const sinT = Math.sqrt(Math.max(0, 1 - cosT * cosT))
    const r = 0.14
    const x = Math.cos(phi) * sinT * r
    const y = CLAPPER_Y + cosT * r
    const z = Math.sin(phi) * sinT * r
    push(x, y, z, AMBER.clone().lerp(WHITE, 0.35), 1)
  }

  // ---------------------------------------------------------------------------
  // NOTIFICATION DOT — bright red cluster top-right corner of bell
  // ---------------------------------------------------------------------------
  const DOT_POINTS = 220
  const DOT_X = 0.95
  const DOT_Y = -0.05
  const DOT_Z = 0.55
  for (let i = 0; i < DOT_POINTS; i++) {
    const phi = Math.random() * Math.PI * 2
    const v = Math.random()
    const cosT = 2 * v - 1
    const sinT = Math.sqrt(Math.max(0, 1 - cosT * cosT))
    const r = 0.2
    const x = DOT_X + Math.cos(phi) * sinT * r
    const y = DOT_Y + cosT * r
    const z = DOT_Z + Math.sin(phi) * sinT * r
    // Mix red with white for highlight at center
    const tone = RED.clone().lerp(WHITE, Math.random() < 0.15 ? 0.55 : 0.1)
    push(x, y, z, tone, 3)
  }
  // Bright center pip
  for (let i = 0; i < 30; i++) {
    push(
      DOT_X + (Math.random() - 0.5) * 0.05,
      DOT_Y + (Math.random() - 0.5) * 0.05,
      DOT_Z + (Math.random() - 0.5) * 0.05,
      WHITE.clone(),
      3,
    )
  }

  // ---------------------------------------------------------------------------
  // SOUND WAVES — 3 horizontal arcs emanating from the bell.
  // Store [baseR, angle, waveIdx] in orbits — animated outward in useFrame.
  // ---------------------------------------------------------------------------
  const WAVE_RINGS = 3
  const POINTS_PER_WAVE = 200
  for (let w = 0; w < WAVE_RINGS; w++) {
    const baseR = 1.25 + w * 0.45
    for (let i = 0; i < POINTS_PER_WAVE; i++) {
      const ang = (i / POINTS_PER_WAVE) * Math.PI * 2 + (Math.random() - 0.5) * 0.01
      const x = Math.cos(ang) * baseR
      const y = -1.45 + (Math.random() - 0.5) * 0.025
      const z = Math.sin(ang) * baseR
      const tone = BLUE.clone().lerp(WHITE, 0.3)
      push(x, y, z, tone, 4, [baseR, ang, w])
    }
  }

  const positionArr = new Float32Array(positions)
  const colorArr = new Float32Array(colors)
  const homeArr = new Float32Array(positionArr)
  const originalHomeArr = new Float32Array(positionArr) // immutable reference
  const baseColorArr = new Float32Array(colors)
  const kindArr = new Uint8Array(kinds)
  const orbitArr = new Float32Array(orbits)
  const count = positionArr.length / 3
  return {
    positions: positionArr,
    homes: homeArr,
    originalHomes: originalHomeArr,
    baseColors: baseColorArr,
    displayColors: colorArr,
    kinds: kindArr,
    orbits: orbitArr,
    count,
  }
}

// =============================================================================
// Particle field — physics + bell sway + notification pulse + sound waves
// =============================================================================
function ParticleField({ autoSpinRef }) {
  const groupRef = useRef(null)
  const { camera } = useThree()

  const built = useMemo(() => buildBell(), [])
  const { positions, homes, originalHomes, baseColors, displayColors, kinds, orbits, count } = built
  const velocities = useMemo(() => new Float32Array(count * 3), [count])

  const cursorWorld = useRef(new THREE.Vector3())
  const tmpDir = useRef(new THREE.Vector3())

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
  const REPULSE = 0.3
  const SPRING = 0.014
  const DAMPING = 0.93

  // notification dot center for pulse animation
  const DOT_CX = 0.95
  const DOT_CY = -0.05
  const DOT_CZ = 0.55

  useFrame((state, dt) => {
    const elapsed = state.clock.elapsedTime

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

    // 2) bell sway — gentle pendulum motion + slight tilt
    if (groupRef.current && autoSpinRef.current) {
      groupRef.current.rotation.z = Math.sin(elapsed * 1.7) * 0.075
      groupRef.current.rotation.x = 0.2 + Math.sin(elapsed * 0.5) * 0.04
      // slow Y rotation so dot moves around for variety
      groupRef.current.rotation.y = elapsed * 0.18
    }

    const localCursor = tmpDir.current.copy(cursorWorld.current)
    if (groupRef.current) groupRef.current.worldToLocal(localCursor)
    const cx = localCursor.x, cy = localCursor.y, cz = localCursor.z

    const pos = geometry.attributes.position.array
    const col = geometry.attributes.color.array

    // notification dot pulse — scale homes around DOT center
    const dotPulse = 1 + Math.sin(elapsed * 4.0) * 0.18

    // sound wave timing — each wave does a 1.6s cycle staggered
    const WAVE_PERIOD = 1.6
    const WAVE_GROWTH = 0.85 // how far the wave grows
    const WAVE_FADE_START = 0.3 // start of fade
    const wavePhases = [
      ((elapsed) % WAVE_PERIOD) / WAVE_PERIOD,
      ((elapsed + WAVE_PERIOD * 0.33) % WAVE_PERIOD) / WAVE_PERIOD,
      ((elapsed + WAVE_PERIOD * 0.66) % WAVE_PERIOD) / WAVE_PERIOD,
    ]

    for (let i = 0; i < count; i++) {
      const ix = i * 3, iy = i * 3 + 1, iz = i * 3 + 2
      const kind = kinds[i]

      // ---- Animate homes for special kinds ----
      if (kind === 3) {
        // notification dot — scale around dot center
        const dx = originalHomes[ix] - DOT_CX
        const dy = originalHomes[iy] - DOT_CY
        const dz = originalHomes[iz] - DOT_CZ
        homes[ix] = DOT_CX + dx * dotPulse
        homes[iy] = DOT_CY + dy * dotPulse
        homes[iz] = DOT_CZ + dz * dotPulse
        // boost color when pulsing
        const intensity = 1 + (dotPulse - 1) * 1.2
        col[ix] = Math.min(2, baseColors[ix] * intensity)
        col[iy] = Math.min(2, baseColors[iy] * intensity)
        col[iz] = Math.min(2, baseColors[iz] * intensity)
      } else if (kind === 4) {
        // sound wave — animate radius outward and fade
        const baseR = orbits[ix]
        const angle = orbits[iy]
        const waveIdx = Math.round(orbits[iz])
        const phase = wavePhases[waveIdx] || 0
        const animR = baseR + phase * WAVE_GROWTH
        homes[ix] = Math.cos(angle) * animR
        // homes[iy] stays — set at build
        homes[iz] = Math.sin(angle) * animR
        // fade out as wave expands
        const fade = phase < WAVE_FADE_START
          ? phase / WAVE_FADE_START
          : Math.max(0, 1 - (phase - WAVE_FADE_START) / (1 - WAVE_FADE_START))
        col[ix] = baseColors[ix] * fade
        col[iy] = baseColors[iy] * fade
        col[iz] = baseColors[iz] * fade
      }

      // ---- PHYSICS — cursor repulsion ----
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

      // spring toward home
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
// Public component
// =============================================================================
export default function ParticleBell() {
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
        camera={{ position: [0, 0.3, 5.0], fov: 46 }}
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <ambientLight intensity={0.5} />
        <ParticleField autoSpinRef={autoSpinRef} />
      </Canvas>
    </div>
  )
}
