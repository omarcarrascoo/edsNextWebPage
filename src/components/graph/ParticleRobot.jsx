'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

const ACCENT = new THREE.Color('#2DE2C5')
const BLUE = new THREE.Color('#38BDF8')
const VIOLET = new THREE.Color('#9D8DF1')
const AMBER = new THREE.Color('#F5B544')
const WHITE = new THREE.Color('#F4F7FA')
const DIM = new THREE.Color('#1a242e')

// =============================================================================
// Build: minimalist robot head + chat bubbles floating around it.
// kinds:
//   0 = head outline (rounded square front face)
//   1 = eyes (2 small clusters)
//   2 = mouth (line)
//   3 = antenna line + dot
//   4 = chat bubbles (each bubble has its own orbit metadata)
// orbits[] for kind=4: [bubbleIdx, baseAngle, baseDist]
// =============================================================================
function buildRobot() {
  const positions = []
  const colors = []
  const kinds = []
  const orbits = []
  const bubbleIndices = [] // for each particle, which bubble it belongs to (-1 if none)

  const push = (x, y, z, c, kind = 0, orbit = [-1, 0, 0]) => {
    positions.push(x, y, z)
    colors.push(c.r, c.g, c.b)
    kinds.push(kind)
    orbits.push(orbit[0], orbit[1], orbit[2])
  }

  // ---------------------------------------------------------------------------
  // HEAD — rounded square front face (slightly extruded for thickness)
  // ---------------------------------------------------------------------------
  const HEAD_W = 1.1
  const HEAD_H = 1.1
  const HEAD_R = 0.18 // corner radius
  const HEAD_DEPTH = 0.18

  // Outline: 4 straight sides + 4 rounded corners
  const SIDE_POINTS = 90
  const CORNER_POINTS = 50

  // Top side
  for (let i = 0; i < SIDE_POINTS; i++) {
    const t = i / (SIDE_POINTS - 1)
    const x = -HEAD_W / 2 + HEAD_R + t * (HEAD_W - 2 * HEAD_R)
    const y = HEAD_H / 2
    const z = (Math.random() - 0.5) * HEAD_DEPTH
    push(x, y, z, ACCENT.clone().lerp(WHITE, Math.random() < 0.06 ? 0.4 : 0), 0)
  }
  // Bottom side
  for (let i = 0; i < SIDE_POINTS; i++) {
    const t = i / (SIDE_POINTS - 1)
    const x = -HEAD_W / 2 + HEAD_R + t * (HEAD_W - 2 * HEAD_R)
    const y = -HEAD_H / 2
    const z = (Math.random() - 0.5) * HEAD_DEPTH
    push(x, y, z, ACCENT.clone().lerp(WHITE, Math.random() < 0.06 ? 0.4 : 0), 0)
  }
  // Left side
  for (let i = 0; i < SIDE_POINTS; i++) {
    const t = i / (SIDE_POINTS - 1)
    const x = -HEAD_W / 2
    const y = -HEAD_H / 2 + HEAD_R + t * (HEAD_H - 2 * HEAD_R)
    const z = (Math.random() - 0.5) * HEAD_DEPTH
    push(x, y, z, ACCENT.clone().lerp(WHITE, Math.random() < 0.06 ? 0.4 : 0), 0)
  }
  // Right side
  for (let i = 0; i < SIDE_POINTS; i++) {
    const t = i / (SIDE_POINTS - 1)
    const x = HEAD_W / 2
    const y = -HEAD_H / 2 + HEAD_R + t * (HEAD_H - 2 * HEAD_R)
    const z = (Math.random() - 0.5) * HEAD_DEPTH
    push(x, y, z, ACCENT.clone().lerp(WHITE, Math.random() < 0.06 ? 0.4 : 0), 0)
  }
  // 4 rounded corners — quarter-circle arcs
  const corners = [
    [-HEAD_W / 2 + HEAD_R,  HEAD_H / 2 - HEAD_R, Math.PI / 2,     Math.PI],          // top-left
    [ HEAD_W / 2 - HEAD_R,  HEAD_H / 2 - HEAD_R, 0,               Math.PI / 2],      // top-right
    [-HEAD_W / 2 + HEAD_R, -HEAD_H / 2 + HEAD_R, Math.PI,         Math.PI * 1.5],    // bottom-left
    [ HEAD_W / 2 - HEAD_R, -HEAD_H / 2 + HEAD_R, Math.PI * 1.5,   Math.PI * 2],      // bottom-right
  ]
  for (const [cx, cy, a0, a1] of corners) {
    for (let i = 0; i < CORNER_POINTS; i++) {
      const t = i / (CORNER_POINTS - 1)
      const a = a0 + t * (a1 - a0)
      const x = cx + Math.cos(a) * HEAD_R
      const y = cy + Math.sin(a) * HEAD_R
      const z = (Math.random() - 0.5) * HEAD_DEPTH
      push(x, y, z, ACCENT.clone().lerp(WHITE, 0.3), 0)
    }
  }

  // Inner faint fill — subtle dot grid for "screen face" feel
  const FILL_POINTS = 200
  for (let i = 0; i < FILL_POINTS; i++) {
    const x = (Math.random() - 0.5) * (HEAD_W - 0.16)
    const y = (Math.random() - 0.5) * (HEAD_H - 0.16)
    const z = (Math.random() - 0.5) * 0.06
    push(x, y, z, ACCENT.clone().lerp(DIM, 0.65), 0)
  }

  // ---------------------------------------------------------------------------
  // EYES — 2 round clusters
  // ---------------------------------------------------------------------------
  const EYE_R = 0.085
  const EYE_Y = 0.18
  const EYE_X = 0.27
  const EYE_POINTS = 90
  const eyePositions = [
    [-EYE_X, EYE_Y],
    [ EYE_X, EYE_Y],
  ]
  for (const [ex, ey] of eyePositions) {
    for (let i = 0; i < EYE_POINTS; i++) {
      const phi = Math.random() * Math.PI * 2
      const r = EYE_R * Math.sqrt(Math.random())
      const x = ex + Math.cos(phi) * r
      const y = ey + Math.sin(phi) * r
      const z = 0.05 + (Math.random() - 0.5) * 0.012
      push(x, y, z, ACCENT.clone().lerp(WHITE, 0.7), 1)
    }
    // bright pupil
    for (let i = 0; i < 16; i++) {
      const j = (Math.random() - 0.5) * 0.022
      push(ex + j, ey + j, 0.06, WHITE.clone(), 1)
    }
  }

  // ---------------------------------------------------------------------------
  // MOUTH — short horizontal line, slight curve down (smile-neutral)
  // ---------------------------------------------------------------------------
  const MOUTH_W = 0.34
  const MOUTH_Y = -0.22
  const MOUTH_POINTS = 100
  for (let i = 0; i < MOUTH_POINTS; i++) {
    const t = i / (MOUTH_POINTS - 1)
    const x = -MOUTH_W / 2 + t * MOUTH_W
    // subtle curve — slightly up at the ends
    const y = MOUTH_Y + Math.sin(t * Math.PI) * -0.012
    const z = 0.05 + (Math.random() - 0.5) * 0.01
    push(x, y, z, BLUE.clone().lerp(WHITE, 0.4), 2)
  }

  // ---------------------------------------------------------------------------
  // ANTENNA — vertical line + glowing dot
  // ---------------------------------------------------------------------------
  const ANT_BASE_Y = HEAD_H / 2
  const ANT_TIP_Y = HEAD_H / 2 + 0.34
  const ANT_LINE = 36
  for (let i = 0; i < ANT_LINE; i++) {
    const t = i / (ANT_LINE - 1)
    const x = (Math.random() - 0.5) * 0.012
    const y = ANT_BASE_Y + t * (ANT_TIP_Y - ANT_BASE_Y - 0.05)
    const z = (Math.random() - 0.5) * 0.012
    push(x, y, z, ACCENT.clone().lerp(WHITE, 0.5), 3)
  }
  // antenna dot — glowing tip
  const ANT_DOT_POINTS = 60
  for (let i = 0; i < ANT_DOT_POINTS; i++) {
    const phi = Math.random() * Math.PI * 2
    const v = Math.random()
    const cosT = 2 * v - 1
    const sinT = Math.sqrt(Math.max(0, 1 - cosT * cosT))
    const r = 0.05
    const x = Math.cos(phi) * sinT * r
    const y = ANT_TIP_Y + cosT * r
    const z = Math.sin(phi) * sinT * r
    push(x, y, z, ACCENT.clone().lerp(WHITE, 0.5), 3)
  }

  // ---------------------------------------------------------------------------
  // CHAT BUBBLES — 4 bubbles floating around the robot.
  // Each is a small rounded-rect outline with a tiny tail toward the robot.
  // Stored with bubbleIdx so they animate as a group.
  // ---------------------------------------------------------------------------
  const bubbleSpecs = [
    { idx: 0, baseAngle:  0.55,  baseDist: 1.55, w: 0.55, h: 0.30, tone: BLUE   },
    { idx: 1, baseAngle: -0.65,  baseDist: 1.45, w: 0.48, h: 0.28, tone: ACCENT },
    { idx: 2, baseAngle:  Math.PI - 0.5, baseDist: 1.55, w: 0.58, h: 0.32, tone: VIOLET },
    { idx: 3, baseAngle: -Math.PI + 0.55, baseDist: 1.45, w: 0.50, h: 0.28, tone: AMBER  },
  ]

  for (const spec of bubbleSpecs) {
    // Compute initial center for the bubble — placed around the robot
    const cx = Math.cos(spec.baseAngle) * spec.baseDist
    const cy = Math.sin(spec.baseAngle) * spec.baseDist
    const cz = 0

    // Bubble rounded-rect outline
    const BUB_R = 0.08 // corner radius
    const sw = spec.w, sh = spec.h
    const SIDE = 30
    const ARC = 18
    // Top
    for (let i = 0; i < SIDE; i++) {
      const t = i / (SIDE - 1)
      const x = -sw / 2 + BUB_R + t * (sw - 2 * BUB_R)
      const y = sh / 2
      push(cx + x, cy + y, cz, spec.tone.clone().lerp(WHITE, 0.3), 4, [spec.idx, spec.baseAngle, spec.baseDist])
    }
    // Bottom (excluding tail area on bottom-left)
    for (let i = 0; i < SIDE; i++) {
      const t = i / (SIDE - 1)
      const x = -sw / 2 + BUB_R + t * (sw - 2 * BUB_R)
      const y = -sh / 2
      push(cx + x, cy + y, cz, spec.tone.clone().lerp(WHITE, 0.3), 4, [spec.idx, spec.baseAngle, spec.baseDist])
    }
    // Left
    for (let i = 0; i < SIDE; i++) {
      const t = i / (SIDE - 1)
      const x = -sw / 2
      const y = -sh / 2 + BUB_R + t * (sh - 2 * BUB_R)
      push(cx + x, cy + y, cz, spec.tone.clone().lerp(WHITE, 0.3), 4, [spec.idx, spec.baseAngle, spec.baseDist])
    }
    // Right
    for (let i = 0; i < SIDE; i++) {
      const t = i / (SIDE - 1)
      const x = sw / 2
      const y = -sh / 2 + BUB_R + t * (sh - 2 * BUB_R)
      push(cx + x, cy + y, cz, spec.tone.clone().lerp(WHITE, 0.3), 4, [spec.idx, spec.baseAngle, spec.baseDist])
    }
    // 4 rounded corners
    const bubCorners = [
      [-sw / 2 + BUB_R,  sh / 2 - BUB_R, Math.PI / 2,     Math.PI],
      [ sw / 2 - BUB_R,  sh / 2 - BUB_R, 0,               Math.PI / 2],
      [-sw / 2 + BUB_R, -sh / 2 + BUB_R, Math.PI,         Math.PI * 1.5],
      [ sw / 2 - BUB_R, -sh / 2 + BUB_R, Math.PI * 1.5,   Math.PI * 2],
    ]
    for (const [bcx, bcy, a0, a1] of bubCorners) {
      for (let i = 0; i < ARC; i++) {
        const t = i / (ARC - 1)
        const a = a0 + t * (a1 - a0)
        const x = bcx + Math.cos(a) * BUB_R
        const y = bcy + Math.sin(a) * BUB_R
        push(cx + x, cy + y, cz, spec.tone.clone().lerp(WHITE, 0.4), 4, [spec.idx, spec.baseAngle, spec.baseDist])
      }
    }
    // Tail — small triangle pointing toward robot center (origin)
    const TAIL_POINTS = 18
    const tailDir = Math.atan2(-cy, -cx)
    const tx0 = -sw / 2 + 0.06 // start of tail along bubble bottom
    for (let i = 0; i < TAIL_POINTS; i++) {
      const t = i / (TAIL_POINTS - 1)
      const x = tx0 + t * 0.08
      const y = -sh / 2 - t * 0.14
      // rotate around bubble center to point toward robot
      const rx = x * Math.cos(tailDir) - y * Math.sin(tailDir)
      const ry = x * Math.sin(tailDir) + y * Math.cos(tailDir)
      push(cx + rx, cy + ry, cz, spec.tone.clone().lerp(WHITE, 0.5), 4, [spec.idx, spec.baseAngle, spec.baseDist])
    }
    // 3 dots inside (typing indicator)
    const DOTS = [-0.1, 0, 0.1]
    for (const dx of DOTS) {
      for (let j = 0; j < 8; j++) {
        const jx = (Math.random() - 0.5) * 0.025
        const jy = (Math.random() - 0.5) * 0.025
        push(cx + dx + jx, cy + jy, cz, spec.tone.clone().lerp(WHITE, 0.6), 4, [spec.idx, spec.baseAngle, spec.baseDist])
      }
    }
  }

  const positionArr = new Float32Array(positions)
  const colorArr = new Float32Array(colors)
  const homeArr = new Float32Array(positionArr)
  const originalHomeArr = new Float32Array(positionArr)
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
// Particle field — physics + bubble drift + eye/mouth pulse
// =============================================================================
function ParticleField({ autoSpinRef }) {
  const groupRef = useRef(null)
  const { camera } = useThree()

  const built = useMemo(() => buildRobot(), [])
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

  // physics
  const RADIUS = 0.7
  const RADIUS_SQ = RADIUS * RADIUS
  const REPULSE = 0.3
  const SPRING = 0.014
  const DAMPING = 0.93

  useFrame((state) => {
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

    // 2) gentle floating motion — group bobs slightly
    if (groupRef.current && autoSpinRef.current) {
      groupRef.current.position.y = Math.sin(elapsed * 0.7) * 0.04
      groupRef.current.rotation.y = Math.sin(elapsed * 0.4) * 0.06
    }

    const localCursor = tmpDir.current.copy(cursorWorld.current)
    if (groupRef.current) groupRef.current.worldToLocal(localCursor)
    const cx = localCursor.x, cy = localCursor.y, cz = localCursor.z

    const pos = geometry.attributes.position.array
    const col = geometry.attributes.color.array

    // Eye blink — quick dim every ~3.2s for ~150ms
    const blinkPhase = (elapsed % 3.2) / 3.2
    const blinking = blinkPhase > 0.95 ? Math.sin((blinkPhase - 0.95) / 0.05 * Math.PI) : 0

    // Mouth speak — small horizontal scale wobble
    const mouthScale = 1 + Math.sin(elapsed * 5.5) * 0.18

    // Bubble drift — each bubble has its own phase
    const bubbleStates = [0, 1, 2, 3].map((idx) => {
      const phase = (elapsed * 0.3 + idx * 0.25) % 1
      // floats up + outward, then fades
      const driftR = phase * 0.45      // distance offset from baseDist
      const driftY = phase * 0.55      // upward drift
      const opacity = phase < 0.15
        ? phase / 0.15                  // fade in
        : phase > 0.7
          ? Math.max(0, 1 - (phase - 0.7) / 0.3)  // fade out
          : 1
      return { driftR, driftY, opacity }
    })

    for (let i = 0; i < count; i++) {
      const ix = i * 3, iy = i * 3 + 1, iz = i * 3 + 2
      const kind = kinds[i]

      // ---- Animate special parts ----
      if (kind === 1) {
        // eyes — dim during blink
        const intensity = 1 - blinking * 0.85
        col[ix] = baseColors[ix] * intensity
        col[iy] = baseColors[iy] * intensity
        col[iz] = baseColors[iz] * intensity
      } else if (kind === 2) {
        // mouth — scale around center
        const ox = originalHomes[ix]
        homes[ix] = ox * mouthScale
      } else if (kind === 3) {
        // antenna dot — pulse glow on top of antenna line/dot
        // brightness pulse sin wave
        const pulse = 0.6 + Math.sin(elapsed * 3.2) * 0.4
        col[ix] = baseColors[ix] * pulse
        col[iy] = baseColors[iy] * pulse
        col[iz] = baseColors[iz] * pulse
      } else if (kind === 4) {
        // bubble — animate group: drift outward + up, fade in/out
        const bubbleIdx = Math.round(orbits[ix])
        const baseAngle = orbits[iy]
        const baseDist = orbits[iz]
        const state = bubbleStates[bubbleIdx] || { driftR: 0, driftY: 0, opacity: 0 }

        // recover offset from original home center vs centerless
        const ox = originalHomes[ix]
        const oy = originalHomes[iy]
        const oz = originalHomes[iz]

        // Original bubble center (at build time):
        const origCx = Math.cos(baseAngle) * baseDist
        const origCy = Math.sin(baseAngle) * baseDist

        // Local offset of this particle inside its bubble
        const localX = ox - origCx
        const localY = oy - origCy

        // New bubble center = base + drift outward along angle + up
        const newCx = Math.cos(baseAngle) * (baseDist + state.driftR)
        const newCy = Math.sin(baseAngle) * (baseDist + state.driftR) + state.driftY

        homes[ix] = newCx + localX
        homes[iy] = newCy + localY
        homes[iz] = oz

        // Fade color by opacity
        col[ix] = baseColors[ix] * state.opacity
        col[iy] = baseColors[iy] * state.opacity
        col[iz] = baseColors[iz] * state.opacity
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
          size={0.024}
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
export default function ParticleRobot() {
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
        camera={{ position: [0, 0.1, 5.0], fov: 46 }}
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <ambientLight intensity={0.5} />
        <ParticleField autoSpinRef={autoSpinRef} />
      </Canvas>
    </div>
  )
}
