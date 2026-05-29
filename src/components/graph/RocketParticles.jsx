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
const DIM = new THREE.Color('#1a242e')

const TONES = [ACCENT, BLUE, VIOLET, AMBER, ACCENT, BLUE, VIOLET, AMBER, ACCENT, BLUE]

// Rocket geometry constants
const STAGE_COUNT = 10
const STAGE_H = 0.32
const BODY_R = 0.45
const BODY_BOTTOM = -1.6
const BODY_TOP = BODY_BOTTOM + STAGE_COUNT * STAGE_H
const NOSE_H = 0.7
const FIN_W = 0.55
const FIN_H = 0.55
const ENGINE_R = 0.35
const ENGINE_DEPTH = 0.18

// stage tags for each particle — used to look up activation
// 0..9 = body stages (0 = top, 9 = bottom)
// 10 = nose, 11 = fins, 12 = engine bell, 13 = exhaust, 14 = porthole
const PIECE_NOSE = 10
const PIECE_FINS = 11
const PIECE_BELL = 12
const PIECE_EXHAUST = 13
const PIECE_PORTHOLE = 14

// =============================================================================
// Sample particles. Each gets a (home, color, piece) so we can fade by activation.
// Exported so other rocket scenes (e.g. landing) can share the geometry.
// =============================================================================
export function buildRocket() {
  const positions = []
  const colors = []
  const pieces = []

  const push = (x, y, z, c, piece) => {
    positions.push(x, y, z)
    colors.push(c.r, c.g, c.b)
    pieces.push(piece)
  }

  // BODY — 10 stages. piece = stage index (0=top, 9=bottom)
  const POINTS_PER_STAGE = 320
  for (let s = 0; s < STAGE_COUNT; s++) {
    const yTop = BODY_TOP - s * STAGE_H
    const yBot = yTop - STAGE_H
    const tone = TONES[s]
    for (let i = 0; i < POINTS_PER_STAGE; i++) {
      const theta = Math.random() * Math.PI * 2
      const y = yBot + Math.random() * STAGE_H
      const r = BODY_R + (Math.random() - 0.5) * 0.02
      const c = tone.clone().lerp(WHITE, Math.random() < 0.06 ? 0.4 : 0)
      push(Math.cos(theta) * r, y, Math.sin(theta) * r, c, s)
    }
    // ring at stage seam
    const RING = 80
    for (let i = 0; i < RING; i++) {
      const theta = (i / RING) * Math.PI * 2
      const r = BODY_R + 0.012
      push(Math.cos(theta) * r, yBot, Math.sin(theta) * r, tone.clone().lerp(WHITE, 0.5), s)
    }
  }

  // PORTHOLE — front of stage 1 (second from top)
  {
    const cy = BODY_TOP - 1.5 * STAGE_H
    const tone = TONES[1].clone().lerp(WHITE, 0.6)
    const RING = 60
    for (let i = 0; i < RING; i++) {
      const ang = (i / RING) * Math.PI * 2
      const localY = Math.sin(ang) * 0.07
      const localX = Math.cos(ang) * 0.07
      const theta = Math.atan2(localX, BODY_R)
      const x = Math.cos(theta) * (BODY_R + 0.018)
      const z = Math.sin(theta) * (BODY_R + 0.018)
      push(x, cy + localY, z, tone, PIECE_PORTHOLE)
    }
  }

  // NOSE
  const NOSE_POINTS = 600
  for (let i = 0; i < NOSE_POINTS; i++) {
    const t = Math.random()
    const y = BODY_TOP + t * NOSE_H
    const r = BODY_R * (1 - t) + (Math.random() - 0.5) * 0.015
    const theta = Math.random() * Math.PI * 2
    const c = TONES[0].clone().lerp(WHITE, t * 0.7)
    push(Math.cos(theta) * r, y, Math.sin(theta) * r, c, PIECE_NOSE)
  }

  // FINS
  const FIN_POINTS = 220
  const finTone = TONES[STAGE_COUNT - 1]
  for (let f = 0; f < 4; f++) {
    const finTheta = (f / 4) * Math.PI * 2
    const cosT = Math.cos(finTheta)
    const sinT = Math.sin(finTheta)
    for (let i = 0; i < FIN_POINTS; i++) {
      const u = Math.random()
      const v = Math.random()
      const s = Math.sqrt(u)
      const t = v * s
      const localR = BODY_R + (1 - s) * FIN_W
      const localY = BODY_BOTTOM + (s - t) * FIN_H
      const x = cosT * localR
      const z = sinT * localR
      const perp = (Math.random() - 0.5) * 0.04
      const px = x + (-sinT) * perp
      const pz = z + cosT * perp
      const c = finTone.clone().lerp(WHITE, Math.random() < 0.05 ? 0.4 : 0)
      push(px, localY, pz, c, PIECE_FINS)
    }
  }

  // ENGINE BELL
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
      PIECE_BELL,
    )
  }

  // EXHAUST
  const EXHAUST_POINTS = 240
  for (let i = 0; i < EXHAUST_POINTS; i++) {
    const t = Math.random()
    const y = BODY_BOTTOM - ENGINE_DEPTH - t * 0.55
    const r = ENGINE_R * (1 - t * 0.6) + (Math.random() - 0.5) * 0.08
    const theta = Math.random() * Math.PI * 2
    const c = AMBER.clone().lerp(ORANGE, t).lerp(WHITE, 1 - t * 0.5)
    push(Math.cos(theta) * r, y, Math.sin(theta) * r, c, PIECE_EXHAUST)
  }

  const count = positions.length / 3
  const positionArr = new Float32Array(positions)
  const colorArr = new Float32Array(colors)        // base "lit" colors
  const homeArr = new Float32Array(positionArr)
  const pieceArr = new Uint8Array(pieces)
  return { positions: positionArr, homes: homeArr, baseColors: colorArr, pieces: pieceArr, count }
}

// Determines whether a piece is currently "lit" given activeStages (0..10).
// Returns 0..1 — partial values for smooth transitions during the activation animation.
function pieceLitTarget(piece, activeStages) {
  // Body stages: stage s lit iff (STAGE_COUNT - s) <= activeStages
  // i.e., bottom stage (9) lights up when activeStages >= 1
  if (piece <= 9) {
    const minActivation = STAGE_COUNT - piece // stage 9 needs 1, stage 0 needs 10
    return activeStages >= minActivation ? 1 : 0
  }
  if (piece === PIECE_BELL || piece === PIECE_EXHAUST) {
    // bell + exhaust come with the foundation (pair I, activeStages >= 2)
    return activeStages >= 1 ? 1 : 0
  }
  if (piece === PIECE_FINS) {
    // fins arrive with pair II
    return activeStages >= 4 ? 1 : 0
  }
  if (piece === PIECE_PORTHOLE) {
    // porthole with pair III
    return activeStages >= 6 ? 1 : 0
  }
  if (piece === PIECE_NOSE) {
    // nose comes last, with pair V
    return activeStages >= 10 ? 1 : 0
  }
  return 1
}

// =============================================================================
// Particle field — physics + activation tween
// =============================================================================
function ParticleField({ activeStagesRef, interactedRef, autoSpinRef }) {
  const groupRef = useRef(null)
  const { camera } = useThree()

  const { positions, homes, baseColors, pieces, count } = useMemo(() => buildRocket(), [])
  const velocities = useMemo(() => new Float32Array(count * 3), [count])

  // pulse tracking — when a stage crosses to lit, fire a shockwave at its Y
  const lastLitRef = useRef(0)
  const pulseRef = useRef({ y: 0, t: 0 }) // t = remaining seconds, 0 = inactive
  // current display color (what's actually drawn) — interpolated between DIM and baseColors
  const displayColors = useMemo(() => {
    // start fully dim
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = DIM.r
      arr[i * 3 + 1] = DIM.g
      arr[i * 3 + 2] = DIM.b
    }
    return arr
  }, [count])
  // per-particle activation level (0=dim, 1=lit) — animated toward target
  const activations = useMemo(() => new Float32Array(count), [count])

  const cursorWorld = useRef(new THREE.Vector3())
  const tmpDir = useRef(new THREE.Vector3())

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    g.setAttribute('color', new THREE.BufferAttribute(displayColors, 3))
    return g
  }, [positions, displayColors])

  useEffect(() => () => geometry.dispose(), [geometry])

  // physics tunables
  const RADIUS = 0.7
  const RADIUS_SQ = RADIUS * RADIUS
  const REPULSE = 0.18
  const SPRING = 0.012
  const DAMPING = 0.93
  const EXHAUST_NOISE = 0.012
  const ACTIVATION_LERP = 0.04 // ~0.5s ease for stage assembly fade-in

  useFrame((state, dt) => {
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

    // 2) auto spin
    if (groupRef.current) {
      if (autoSpinRef.current && !interactedRef.current) {
        groupRef.current.rotation.y += 0.0028
      }
    }

    // local cursor for this group's space
    const localCursor = tmpDir.current.copy(cursorWorld.current)
    if (groupRef.current) groupRef.current.worldToLocal(localCursor)

    const pos = geometry.attributes.position.array
    const col = geometry.attributes.color.array
    const cx = localCursor.x, cy = localCursor.y, cz = localCursor.z

    const activeStages = activeStagesRef.current ?? 0

    // ---- PULSE DETECTION ----
    // Trigger a shockwave when a new stage just got lit (integer crossing).
    const litFloor = Math.floor(activeStages)
    if (litFloor > lastLitRef.current && litFloor <= STAGE_COUNT) {
      // The newly-lit body stage index = STAGE_COUNT - litFloor (since stage 9 lights at activeStages=1)
      const newStageIdx = STAGE_COUNT - litFloor
      const yTop = BODY_TOP - newStageIdx * STAGE_H
      const yCenter = yTop - STAGE_H / 2
      pulseRef.current = { y: yCenter, t: 0.6 }
      lastLitRef.current = litFloor
    } else if (litFloor < lastLitRef.current) {
      // user scrolled back — just sync without triggering
      lastLitRef.current = litFloor
    }

    // decay pulse timer
    if (pulseRef.current.t > 0) {
      pulseRef.current.t = Math.max(0, pulseRef.current.t - dt)
    }
    const pulseT = pulseRef.current.t
    const pulseY = pulseRef.current.y
    const pulseStrength = pulseT > 0 ? pulseT / 0.6 : 0 // 1 → 0 over 0.6s
    const pulseRadius = 1.2 - pulseStrength * 0.7        // grows outward 0.5 → 1.2
    const pulseRadiusSq = pulseRadius * pulseRadius
    const pulseBandSq = 0.18 * 0.18                      // band thickness around the wavefront

    for (let i = 0; i < count; i++) {
      const ix = i * 3, iy = i * 3 + 1, iz = i * 3 + 2
      const piece = pieces[i]

      // ---- ACTIVATION ANIMATION ----
      const target = pieceLitTarget(piece, activeStages)
      activations[i] += (target - activations[i]) * ACTIVATION_LERP
      const a = activations[i]
      // lerp color: DIM at a=0 → baseColor at a=1
      col[ix] = DIM.r + (baseColors[ix] - DIM.r) * a
      col[iy] = DIM.g + (baseColors[iy] - DIM.g) * a
      col[iz] = DIM.b + (baseColors[iz] - DIM.b) * a

      // ---- PHYSICS ----
      // cursor repulsion (always active — even dim particles can be scattered)
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

      // ---- STAGE PULSE — radial shockwave from a stage's center ----
      if (pulseStrength > 0) {
        const pdx = pos[ix] - 0          // pulse origin X = 0 (center axis)
        const pdy = pos[iy] - pulseY
        const pdz = pos[iz] - 0
        const pdSq = pdx * pdx + pdy * pdy + pdz * pdz
        const dFromWavefront = pdSq - pulseRadiusSq
        if (dFromWavefront * dFromWavefront < pulseBandSq * 1000) {
          // particle is in the wavefront band → push radially outward
          const pd = Math.sqrt(pdSq) + 0.0001
          const k = pulseStrength * 0.06
          velocities[ix] += (pdx / pd) * k
          velocities[iy] += (pdy / pd) * k * 0.4    // dampen vertical kick
          velocities[iz] += (pdz / pd) * k
        }
      }

      // spring toward home
      velocities[ix] += (homes[ix] - pos[ix]) * SPRING
      velocities[iy] += (homes[iy] - pos[iy]) * SPRING
      velocities[iz] += (homes[iz] - pos[iz]) * SPRING

      velocities[ix] *= DAMPING
      velocities[iy] *= DAMPING
      velocities[iz] *= DAMPING

      // exhaust idle flicker — only when lit
      if (piece === PIECE_EXHAUST && a > 0.6) {
        velocities[ix] += (Math.random() - 0.5) * EXHAUST_NOISE
        velocities[iy] -= 0.002
        velocities[iz] += (Math.random() - 0.5) * EXHAUST_NOISE
      }

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
export default function RocketParticles({ activeStagesRef }) {
  const interactedRef = useRef(false)
  const autoSpinRef = useRef(true)
  const containerRef = useRef(null)
  // fallback ref if parent didn't pass one — defaults to 10 (fully assembled)
  const fallbackRef = useRef(10)
  const stagesRef = activeStagesRef ?? fallbackRef
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
        camera={{ position: [0, 0, 6.0], fov: 42 }}
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <ambientLight intensity={0.5} />
        <ParticleField
          activeStagesRef={stagesRef}
          interactedRef={interactedRef}
          autoSpinRef={autoSpinRef}
        />
      </Canvas>
    </div>
  )
}
