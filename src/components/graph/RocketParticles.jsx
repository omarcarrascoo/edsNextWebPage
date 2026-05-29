'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

const ACCENT = new THREE.Color('#2DE2C5')
const BLUE = new THREE.Color('#38BDF8')
const VIOLET = new THREE.Color('#9D8DF1')
const AMBER = new THREE.Color('#F5B544')
const WHITE = new THREE.Color('#F0F6FB')
const ORANGE = new THREE.Color('#FF8B3D')

const TONES = [ACCENT, BLUE, VIOLET, AMBER, ACCENT, BLUE, VIOLET, AMBER, ACCENT, BLUE]

// Rocket geometry constants — designed so the whole craft fits roughly in y ∈ [-2, 2.4]
const STAGE_COUNT = 10
const STAGE_H = 0.32
const BODY_R = 0.45
const BODY_BOTTOM = -1.6 // y where stage 9 (bottom) ends
const BODY_TOP = BODY_BOTTOM + STAGE_COUNT * STAGE_H // = 1.6
const NOSE_H = 0.7
const NOSE_TOP = BODY_TOP + NOSE_H
const FIN_W = 0.55
const FIN_H = 0.55
const ENGINE_R = 0.35
const ENGINE_DEPTH = 0.18

// =============================================================================
// Sample N points uniformly on the rocket surface, return positions+colors+homes
// =============================================================================
function buildRocket() {
  const positions = []
  const colors = []

  // helper: push a point
  const push = (x, y, z, c) => {
    positions.push(x, y, z)
    colors.push(c.r, c.g, c.b)
  }

  // BODY — 10 stages, each a thin cylindrical band, sampled densely
  // stage 0 is on top, stage 9 at the bottom (matches layer order)
  const POINTS_PER_STAGE = 320
  for (let s = 0; s < STAGE_COUNT; s++) {
    const yTop = BODY_TOP - s * STAGE_H
    const yBot = yTop - STAGE_H
    const tone = TONES[s]
    for (let i = 0; i < POINTS_PER_STAGE; i++) {
      const theta = Math.random() * Math.PI * 2
      const y = yBot + Math.random() * STAGE_H
      // small radial jitter for soft cloud look
      const r = BODY_R + (Math.random() - 0.5) * 0.02
      const x = Math.cos(theta) * r
      const z = Math.sin(theta) * r
      // slight color variance — mix in a bit of white at random
      const mix = Math.random() < 0.06 ? 1 : 0
      const c = tone.clone().lerp(WHITE, mix * 0.4)
      push(x, y, z, c)
    }
    // ring at stage boundary — brighter, to mark the seam
    const RING_POINTS = 80
    for (let i = 0; i < RING_POINTS; i++) {
      const theta = (i / RING_POINTS) * Math.PI * 2
      const y = yBot
      const r = BODY_R + 0.012
      push(Math.cos(theta) * r, y, Math.sin(theta) * r, tone.clone().lerp(WHITE, 0.5))
    }
  }

  // PORTHOLE — small bright ring on the second-from-top stage, front-facing
  {
    const cy = BODY_TOP - 1.5 * STAGE_H
    const tone = TONES[1].clone().lerp(WHITE, 0.6)
    const RING = 60
    for (let i = 0; i < RING; i++) {
      const ang = (i / RING) * Math.PI * 2
      const localY = Math.sin(ang) * 0.07
      const localX = Math.cos(ang) * 0.07
      // place on the front of the body (z ≈ +R), curved onto the cylinder
      const theta = Math.atan2(localX, BODY_R)
      const x = Math.cos(theta) * (BODY_R + 0.018)
      const z = Math.sin(theta) * (BODY_R + 0.018)
      push(x, cy + localY, z, tone)
    }
  }

  // NOSE CONE — radius linearly tapers from BODY_R to 0 over NOSE_H
  const NOSE_POINTS = 600
  for (let i = 0; i < NOSE_POINTS; i++) {
    const t = Math.random() // 0 at base, 1 at tip
    const y = BODY_TOP + t * NOSE_H
    const r = BODY_R * (1 - t) + (Math.random() - 0.5) * 0.015
    const theta = Math.random() * Math.PI * 2
    const x = Math.cos(theta) * r
    const z = Math.sin(theta) * r
    // color: top-stage tone fading toward white at the tip
    const c = TONES[0].clone().lerp(WHITE, t * 0.7)
    push(x, y, z, c)
  }

  // FINS — 4 triangular fins at the bottom, around the body
  const FIN_POINTS = 220
  for (let f = 0; f < 4; f++) {
    const finTheta = (f / 4) * Math.PI * 2
    const cosT = Math.cos(finTheta)
    const sinT = Math.sin(finTheta)
    const tone = TONES[STAGE_COUNT - 1] // bottom-stage color
    for (let i = 0; i < FIN_POINTS; i++) {
      // triangle in the (radial, y) plane, rotated to finTheta
      // vertices: (R, y0), (R, y0+FIN_H), (R+FIN_W, y0)
      // pick uniform point in triangle via sqrt trick
      const u = Math.random()
      const v = Math.random()
      const s = Math.sqrt(u)
      const t = v * s
      const localR = BODY_R + (1 - s) * FIN_W
      const localY = BODY_BOTTOM + (s - t) * FIN_H
      const x = cosT * localR
      const z = sinT * localR
      // small thickness — tiny perpendicular offset
      const perp = (Math.random() - 0.5) * 0.04
      const px = x + (-sinT) * perp
      const pz = z + cosT * perp
      const c = tone.clone().lerp(WHITE, Math.random() < 0.05 ? 0.4 : 0)
      push(px, localY, pz, c)
    }
  }

  // ENGINE BELL — flared cylinder under the body
  const ENGINE_POINTS = 220
  for (let i = 0; i < ENGINE_POINTS; i++) {
    const t = Math.random()
    const y = BODY_BOTTOM - t * ENGINE_DEPTH
    const r = ENGINE_R + t * 0.08
    const theta = Math.random() * Math.PI * 2
    push(
      Math.cos(theta) * r,
      y,
      Math.sin(theta) * r,
      TONES[STAGE_COUNT - 1].clone().lerp(WHITE, 0.3),
    )
  }

  // EXHAUST GLOW — small cluster below the engine, hot colors
  const EXHAUST_POINTS = 240
  for (let i = 0; i < EXHAUST_POINTS; i++) {
    const t = Math.random()
    const y = BODY_BOTTOM - ENGINE_DEPTH - t * 0.55
    const r = ENGINE_R * (1 - t * 0.6) + (Math.random() - 0.5) * 0.08
    const theta = Math.random() * Math.PI * 2
    // hotter at top of plume, fades to amber/orange at tail
    const c = AMBER.clone().lerp(ORANGE, t).lerp(WHITE, 1 - t * 0.5)
    push(Math.cos(theta) * r, y, Math.sin(theta) * r, c)
  }

  const count = positions.length / 3
  const positionArr = new Float32Array(positions)
  const colorArr = new Float32Array(colors)
  const homeArr = new Float32Array(positionArr) // copy
  // mark which ones are exhaust (last EXHAUST_POINTS) — they idle-flicker
  const flagArr = new Uint8Array(count) // 0=body, 1=exhaust
  for (let i = count - EXHAUST_POINTS; i < count; i++) flagArr[i] = 1

  return { positions: positionArr, homes: homeArr, colors: colorArr, flags: flagArr, count }
}

// =============================================================================
// Particle field — physics loop driven by cursor proximity
// =============================================================================
function ParticleField({ cursorRef, interactedRef, autoSpinRef }) {
  const pointsRef = useRef(null)
  const groupRef = useRef(null)
  const { camera } = useThree()

  const { positions, homes, colors, flags, count } = useMemo(() => buildRocket(), [])
  const velocities = useMemo(() => new Float32Array(count * 3), [count])
  const cursorWorld = useRef(new THREE.Vector3())
  const tmpDir = useRef(new THREE.Vector3())

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    g.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return g
  }, [positions, colors])

  useEffect(() => () => geometry.dispose(), [geometry])

  // tunables — punchy explosion, slow reform
  const RADIUS = 0.7
  const RADIUS_SQ = RADIUS * RADIUS
  const REPULSE = 0.18
  const SPRING = 0.012
  const DAMPING = 0.93
  const EXHAUST_NOISE = 0.012

  useFrame((state, dt) => {
    // 1) project cursor (NDC) to a plane at z=0 in WORLD space (after group rotation)
    // To make cursor interact properly with the rotated rocket, we'll convert cursor
    // to world space, then transform into the group's local space before scattering.
    const mouse = state.mouse
    if (mouse.x === 0 && mouse.y === 0) {
      // mouse not yet over canvas — keep cursorWorld far away
      cursorWorld.current.set(9999, 9999, 9999)
    } else {
      cursorWorld.current.set(mouse.x, mouse.y, 0.5)
      cursorWorld.current.unproject(camera)
      const dir = tmpDir.current.copy(cursorWorld.current).sub(camera.position).normalize()
      const dist = -camera.position.z / dir.z
      cursorWorld.current.copy(camera.position).add(dir.multiplyScalar(dist))
    }

    // group auto-spin (gentle yaw drift) — only if not interacted
    if (groupRef.current) {
      if (autoSpinRef.current && !interactedRef.current) {
        groupRef.current.rotation.y += 0.0028
      }
      // smooth toward target rotation set externally (drag handler)
    }

    // transform cursor world → group's local space (so the explosion follows the cursor
    // visually even when the rocket is rotated)
    const localCursor = tmpDir.current.copy(cursorWorld.current)
    if (groupRef.current) {
      groupRef.current.worldToLocal(localCursor)
    }

    const pos = geometry.attributes.position.array
    const cx = localCursor.x, cy = localCursor.y, cz = localCursor.z

    for (let i = 0; i < count; i++) {
      const ix = i * 3, iy = i * 3 + 1, iz = i * 3 + 2

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
        // small tangential kick for swirl
        velocities[ix] += (Math.random() - 0.5) * 0.02 * falloff
        velocities[iz] += (Math.random() - 0.5) * 0.02 * falloff
      }

      // spring toward home
      velocities[ix] += (homes[ix] - pos[ix]) * SPRING
      velocities[iy] += (homes[iy] - pos[iy]) * SPRING
      velocities[iz] += (homes[iz] - pos[iz]) * SPRING

      // damping
      velocities[ix] *= DAMPING
      velocities[iy] *= DAMPING
      velocities[iz] *= DAMPING

      // exhaust idle flicker — small random jitter
      if (flags[i] === 1) {
        velocities[ix] += (Math.random() - 0.5) * EXHAUST_NOISE
        velocities[iy] -= 0.002 // slight downward drift
        velocities[iz] += (Math.random() - 0.5) * EXHAUST_NOISE
      }

      // integrate
      pos[ix] += velocities[ix]
      pos[iy] += velocities[iy]
      pos[iz] += velocities[iz]
    }

    geometry.attributes.position.needsUpdate = true
  })

  return (
    <group ref={groupRef}>
      <points ref={pointsRef} geometry={geometry}>
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
// Public component
// =============================================================================
export default function RocketParticles({ scrollProgressRef }) {
  const interactedRef = useRef(false)
  const autoSpinRef = useRef(true)
  const containerRef = useRef(null)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = (e) => setReduced(e.matches)
    mq.addEventListener?.('change', onChange)
    return () => mq.removeEventListener?.('change', onChange)
  }, [])

  // mark "interacted" the moment the cursor enters the canvas (any movement counts
  // as user contact for the destruction interaction)
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
        camera={{ position: [0, 0, 6.0], fov: 42 }}
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <ambientLight intensity={0.5} />
        <ParticleField
          interactedRef={interactedRef}
          autoSpinRef={{ current: !reduced }}
        />
      </Canvas>
    </div>
  )
}
