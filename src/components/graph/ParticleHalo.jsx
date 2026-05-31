'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

const ACCENT = new THREE.Color('#2DE2C5')
const BLUE = new THREE.Color('#38BDF8')
const VIOLET = new THREE.Color('#9D8DF1')
const AMBER = new THREE.Color('#F5B544')
const WHITE = new THREE.Color('#F4F7FA')

// =============================================================================
// Build: Iconic flying saucer (clear silhouette: top dome + disc + underside)
// surrounded by 3 concentric glowing halos at different tilts.
// =============================================================================
function buildSaucerWithHalo() {
  const positions = []
  const colors = []
  const orbits = [] // [radius, baseAngle, height] — used by halo particles for orbital motion

  const push = (x, y, z, c, orbit = [-1, 0, 0]) => {
    positions.push(x, y, z)
    colors.push(c.r, c.g, c.b)
    orbits.push(orbit[0], orbit[1], orbit[2])
  }

  // ---------------------------------------------------------------------------
  // SAUCER — clear disc silhouette
  //   • top dome (hemisphere)
  //   • main disc (flat ellipsoid)
  //   • equator ring of bright lights
  //   • underside cone
  // ---------------------------------------------------------------------------
  const DISC_R = 0.95           // saucer radius
  const DISC_H = 0.18           // disc thickness
  const DOME_R = 0.42           // top cockpit dome
  const DOME_H = 0.32           // dome height
  const UNDER_R = 0.55          // underside cone base
  const UNDER_H = 0.28          // underside cone depth

  // Main disc — dense ring forming the saucer body
  const DISC_POINTS = 1100
  for (let i = 0; i < DISC_POINTS; i++) {
    const u = Math.random()
    const v = Math.random()
    // Bias toward outer radius so the rim feels solid
    const r = DISC_R * Math.sqrt(0.45 + u * 0.55)
    const theta = v * Math.PI * 2
    // Lens-shape: thicker in the middle, thin at the rim
    const rimFactor = 1 - Math.pow(r / DISC_R, 2.2)
    const y = (Math.random() - 0.5) * DISC_H * rimFactor
    const tone = ACCENT.clone().lerp(BLUE, r / DISC_R)
    const c = tone.lerp(WHITE, Math.random() < 0.06 ? 0.4 : 0)
    push(Math.cos(theta) * r, y, Math.sin(theta) * r, c)
  }

  // Equator ring — bright accent lights around the rim
  const EQUATOR = 240
  for (let i = 0; i < EQUATOR; i++) {
    const theta = (i / EQUATOR) * Math.PI * 2
    const r = DISC_R + (Math.random() - 0.5) * 0.012
    const y = (Math.random() - 0.5) * 0.012
    const tone = ACCENT.clone().lerp(WHITE, 0.55)
    push(Math.cos(theta) * r, y, Math.sin(theta) * r, tone)
  }

  // Discrete pulse-light dots — 12 evenly spaced, brighter
  const DOTS = 12
  for (let i = 0; i < DOTS; i++) {
    const theta = (i / DOTS) * Math.PI * 2
    const r = DISC_R + 0.005
    // small cluster per dot
    for (let j = 0; j < 6; j++) {
      const jitter = (Math.random() - 0.5) * 0.025
      const yy = (Math.random() - 0.5) * 0.02
      push(
        Math.cos(theta) * (r + jitter),
        yy,
        Math.sin(theta) * (r + jitter),
        WHITE.clone(),
      )
    }
  }

  // Top dome (cockpit) — hemisphere above center
  const DOME_POINTS = 480
  for (let i = 0; i < DOME_POINTS; i++) {
    const phi = Math.random() * Math.PI * 2
    const v = Math.random()
    const theta = v * (Math.PI / 2) // 0..π/2 → north hemisphere
    const r = DOME_R + (Math.random() - 0.5) * 0.008
    const x = Math.cos(phi) * Math.sin(theta) * r
    const z = Math.sin(phi) * Math.sin(theta) * r
    const y = DISC_H * 0.45 + Math.cos(theta) * DOME_H
    const tone = BLUE.clone().lerp(WHITE, 0.35 + (Math.cos(theta) * 0.4))
    push(x, y, z, tone)
  }

  // Dome seam — bright ring where dome meets disc
  const DOME_SEAM = 120
  for (let i = 0; i < DOME_SEAM; i++) {
    const theta = (i / DOME_SEAM) * Math.PI * 2
    const r = DOME_R + (Math.random() - 0.5) * 0.01
    push(
      Math.cos(theta) * r,
      DISC_H * 0.45 + (Math.random() - 0.5) * 0.012,
      Math.sin(theta) * r,
      ACCENT.clone().lerp(WHITE, 0.7),
    )
  }

  // Underside cone — narrowing downward
  const UNDER_POINTS = 280
  for (let i = 0; i < UNDER_POINTS; i++) {
    const t = Math.random()
    const r = UNDER_R * (1 - t * 0.8)
    const y = -DISC_H * 0.45 - t * UNDER_H
    const theta = Math.random() * Math.PI * 2
    const tone = VIOLET.clone().lerp(BLUE, t).lerp(WHITE, Math.random() < 0.05 ? 0.4 : 0)
    push(Math.cos(theta) * r, y, Math.sin(theta) * r, tone)
  }

  // Tractor beam — soft amber glow trailing down from underside center
  const BEAM_POINTS = 180
  for (let i = 0; i < BEAM_POINTS; i++) {
    const t = Math.random()
    const y = -DISC_H * 0.45 - UNDER_H - t * 0.7
    const r = 0.05 + t * 0.35 + (Math.random() - 0.5) * 0.06
    const theta = Math.random() * Math.PI * 2
    const tone = AMBER.clone().lerp(ACCENT, t * 0.4).multiplyScalar(0.6 + (1 - t) * 0.4)
    push(Math.cos(theta) * r, y, Math.sin(theta) * r, tone)
  }

  // ---------------------------------------------------------------------------
  // HALO — 3 concentric rings at slightly different tilts (not the whole scene
  // tilted; each ring lives in its own plane so the saucer reads flat and the
  // halos read independent — like a sci-fi shield aura).
  // ---------------------------------------------------------------------------
  const RINGS = [
    { r: 1.55, thickness: 0.06, tilt: 0.0,  twist: 0.0,           tone: ACCENT, count: 900,  density: 'thick' },
    { r: 1.95, thickness: 0.02, tilt: 0.32, twist: 0.6,           tone: BLUE,   count: 700,  density: 'thin'  },
    { r: 2.45, thickness: 0.02, tilt: -0.42, twist: -0.5,         tone: VIOLET, count: 600,  density: 'thin'  },
  ]

  for (const ring of RINGS) {
    for (let i = 0; i < ring.count; i++) {
      const angle = Math.random() * Math.PI * 2
      const radialJitter = (Math.random() - 0.5) * ring.thickness * 0.6
      const r = ring.r + radialJitter
      const heightJitter = (Math.random() - 0.5) * ring.thickness
      // Place the particle in its tilted ring plane.
      // Start with circle in XZ plane, then rotate around X by tilt and around Y by twist.
      let x = Math.cos(angle) * r
      let y = heightJitter
      let z = Math.sin(angle) * r
      // rotate around X (tilt)
      const cosT = Math.cos(ring.tilt), sinT = Math.sin(ring.tilt)
      const y1 = y * cosT - z * sinT
      const z1 = y * sinT + z * cosT
      y = y1
      z = z1
      // rotate around Y (twist)
      const cosY = Math.cos(ring.twist), sinY = Math.sin(ring.twist)
      const x2 = x * cosY + z * sinY
      const z2 = -x * sinY + z * cosY
      x = x2
      z = z2
      const tone = ring.tone.clone().lerp(WHITE, Math.random() < 0.08 ? 0.5 : 0)
      // store orbit metadata so halo particles can spin around the ring
      push(x, y, z, tone, [r, angle, ring.tilt + ring.twist * 100])
    }
  }

  // Sparse stars — far background dust to give depth
  const STARS = 220
  for (let i = 0; i < STARS; i++) {
    const r = 3.2 + Math.random() * 1.8
    const phi = Math.random() * Math.PI * 2
    const costh = (Math.random() - 0.5) * 1.6
    const sinth = Math.sqrt(Math.max(0, 1 - costh * costh))
    const x = r * sinth * Math.cos(phi)
    const y = r * costh
    const z = r * sinth * Math.sin(phi)
    const tone = WHITE.clone().multiplyScalar(0.3 + Math.random() * 0.5)
    push(x, y, z, tone)
  }

  const positionArr = new Float32Array(positions)
  const colorArr = new Float32Array(colors)
  const homeArr = new Float32Array(positionArr)
  const orbitArr = new Float32Array(orbits)
  const count = positionArr.length / 3
  return {
    positions: positionArr,
    homes: homeArr,
    baseColors: colorArr,
    orbits: orbitArr,
    count,
  }
}

// =============================================================================
// Particle field — orbital animation + scatter physics
// =============================================================================
function ParticleField({ autoSpinRef }) {
  const groupRef = useRef(null)
  const shipRef = useRef(null)
  const { camera } = useThree()

  const built = useMemo(() => buildSaucerWithHalo(), [])
  const { positions, homes, baseColors, orbits, count } = built
  const velocities = useMemo(() => new Float32Array(count * 3), [count])

  const cursorWorld = useRef(new THREE.Vector3())
  const tmpDir = useRef(new THREE.Vector3())

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    g.setAttribute('color', new THREE.BufferAttribute(baseColors, 3))
    return g
  }, [positions, baseColors])

  useEffect(() => () => geometry.dispose(), [geometry])

  // physics — same vocabulary as rest of the system
  const RADIUS = 0.7
  const RADIUS_SQ = RADIUS * RADIUS
  const REPULSE = 0.32
  const SPRING = 0.014
  const DAMPING = 0.93

  // Saucer scene tilt — fixed, looks like a UFO seen from slightly above
  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x = 0.28
      groupRef.current.rotation.z = 0
    }
  }, [])

  const orbitElapsed = useRef(0)
  const bobElapsed = useRef(0)

  useFrame((state, dt) => {
    orbitElapsed.current += dt
    bobElapsed.current += dt

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

    // 2) gentle scene auto-spin around Y
    if (groupRef.current && autoSpinRef.current) {
      groupRef.current.rotation.y += 0.0014
      // subtle vertical bob — saucer levitating
      groupRef.current.position.y = Math.sin(bobElapsed.current * 0.6) * 0.08
    }

    const localCursor = tmpDir.current.copy(cursorWorld.current)
    if (groupRef.current) groupRef.current.worldToLocal(localCursor)
    const cx = localCursor.x, cy = localCursor.y, cz = localCursor.z

    const pos = geometry.attributes.position.array

    // Halo particles drift around their ring (radius stored in orbits[ix])
    const t = orbitElapsed.current

    for (let i = 0; i < count; i++) {
      const ix = i * 3, iy = i * 3 + 1, iz = i * 3 + 2
      const orbitR = orbits[ix]

      // Update orbital home for halo particles (orbitR > 0)
      if (orbitR > 0) {
        const baseAngle = orbits[iy]
        const tiltCode = orbits[iz] // tilt + twist*100, encoding which ring
        // Decode: tilt is fractional part scale, twist is integer scale
        // We just use it as a per-ring phase offset to keep rings in sync internally.
        const speed = 0.14 * (1.6 / Math.max(orbitR, 0.5))
        const angle = baseAngle + t * speed
        // Recreate ring transform — to keep this fast, we approximate by spinning around Y
        // in the original ring frame, then re-apply tilt/twist via the original home offset.
        // Simpler: just spin the home around Y in the global frame.
        const r2 = Math.sqrt(homes[ix] * homes[ix] + homes[iz] * homes[iz])
        const baseGlobalAngle = Math.atan2(homes[iz], homes[ix])
        const newGlobalAngle = baseGlobalAngle + dt * speed * 1.0
        homes[ix] = Math.cos(newGlobalAngle) * r2
        homes[iz] = Math.sin(newGlobalAngle) * r2
        // homes[iy] stays — preserves tilt height
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
export default function ParticleHalo() {
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
        camera={{ position: [0, 0.5, 4.6], fov: 50 }}
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <ambientLight intensity={0.5} />
        <ParticleField autoSpinRef={autoSpinRef} />
      </Canvas>
    </div>
  )
}
