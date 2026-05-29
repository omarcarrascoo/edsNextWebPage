'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

const ACCENT = new THREE.Color('#2DE2C5')
const BLUE = new THREE.Color('#38BDF8')
const VIOLET = new THREE.Color('#9D8DF1')
const AMBER = new THREE.Color('#F5B544')
const WHITE = new THREE.Color('#F0F6FB')

// =============================================================================
// Build a classic neoclassical bank façade as a particle cloud:
//   - 3 stepped base platforms (steps)
//   - 6 fluted Doric columns
//   - 6 capitals on top of columns
//   - Architrave (horizontal beam)
//   - Triangular pediment with relief sampling
//   - Round clock in the pediment center
//   - "BANK" letters etched into the entablature
// All shapes share the accent palette so the building reads as ONE object.
// =============================================================================
function buildBank() {
  const positions = []
  const colors = []
  const flags = []

  const push = (x, y, z, c, flag = 0) => {
    positions.push(x, y, z)
    colors.push(c.r, c.g, c.b)
    flags.push(flag)
  }

  // ---- BASE STEPS — 3 rectangular slabs of decreasing width ----
  const STEPS = [
    { w: 4.6, h: 0.18, d: 1.6, y: -1.95, points: 600 },
    { w: 4.3, h: 0.14, d: 1.45, y: -1.78, points: 500 },
    { w: 4.0, h: 0.14, d: 1.30, y: -1.64, points: 400 },
  ]
  STEPS.forEach((step) => {
    for (let i = 0; i < step.points; i++) {
      // sample on the SURFACE of the box (so the form reads, not a soup)
      const face = Math.floor(Math.random() * 5) // skip bottom face
      let x, y, z
      if (face === 0) { // top
        x = (Math.random() - 0.5) * step.w
        y = step.y + step.h / 2
        z = (Math.random() - 0.5) * step.d
      } else if (face === 1) { // front
        x = (Math.random() - 0.5) * step.w
        y = step.y + (Math.random() - 0.5) * step.h
        z = step.d / 2
      } else if (face === 2) { // back
        x = (Math.random() - 0.5) * step.w
        y = step.y + (Math.random() - 0.5) * step.h
        z = -step.d / 2
      } else if (face === 3) { // left
        x = -step.w / 2
        y = step.y + (Math.random() - 0.5) * step.h
        z = (Math.random() - 0.5) * step.d
      } else { // right
        x = step.w / 2
        y = step.y + (Math.random() - 0.5) * step.h
        z = (Math.random() - 0.5) * step.d
      }
      const roll = Math.random()
      const c = roll < 0.06 ? WHITE.clone().lerp(ACCENT, 0.4)
              : roll < 0.18 ? BLUE.clone()
              : ACCENT.clone()
      push(x, y, z, c, 0)
    }
  })

  // ---- COLUMNS — 6 fluted Doric columns ----
  const COLUMN_X_POSITIONS = [-1.85, -1.10, -0.36, 0.36, 1.10, 1.85]
  const COL_BOT = -1.50
  const COL_TOP = 0.85
  const COL_R = 0.20
  const COL_FLUTES = 14 // vertical concave channels
  const POINTS_PER_COLUMN = 480
  COLUMN_X_POSITIONS.forEach((cx) => {
    for (let i = 0; i < POINTS_PER_COLUMN; i++) {
      const t = Math.random()
      const y = COL_BOT + t * (COL_TOP - COL_BOT)
      const theta = Math.random() * Math.PI * 2
      // entasis — slight bulge toward middle (classical column)
      const entasis = 1 + Math.sin(t * Math.PI) * 0.04
      // flute modulation — the radius dips at flute angles
      const fluteWave = Math.cos(theta * COL_FLUTES) * 0.012
      const r = (COL_R - fluteWave) * entasis + (Math.random() - 0.5) * 0.005
      const x = cx + Math.cos(theta) * r
      const z = Math.sin(theta) * r
      const roll = Math.random()
      const c = roll < 0.05 ? WHITE.clone().lerp(ACCENT, 0.35)
              : roll < 0.15 ? BLUE.clone()
              : ACCENT.clone()
      push(x, y, z, c, 1) // flag=1 → COLUMN (slight idle wobble can be applied)
    }
  })

  // ---- CAPITALS — small flared squares on top of columns (Doric style) ----
  COLUMN_X_POSITIONS.forEach((cx) => {
    const baseY = 0.85
    // abacus (top square slab)
    for (let i = 0; i < 90; i++) {
      const x = cx + (Math.random() - 0.5) * 0.56
      const y = baseY + 0.13 + (Math.random() - 0.5) * 0.05
      const z = (Math.random() - 0.5) * 0.56
      const c = ACCENT.clone().lerp(WHITE, 0.2)
      push(x, y, z, c, 0)
    }
    // echinus (rounded cushion below abacus)
    for (let i = 0; i < 80; i++) {
      const t = Math.random()
      const theta = Math.random() * Math.PI * 2
      const r = 0.22 + (1 - t) * 0.06
      const y = baseY + t * 0.08
      const x = cx + Math.cos(theta) * r
      const z = Math.sin(theta) * r
      const c = ACCENT.clone().lerp(WHITE, 0.25)
      push(x, y, z, c, 0)
    }
  })

  // ---- ARCHITRAVE — long horizontal beam atop the columns ----
  const ARCH_Y = 1.04
  const ARCH_H = 0.32
  const ARCH_W = 4.5
  const ARCH_D = 0.55
  for (let i = 0; i < 700; i++) {
    const face = Math.floor(Math.random() * 5)
    let x, y, z
    if (face === 0) { // top
      x = (Math.random() - 0.5) * ARCH_W
      y = ARCH_Y + ARCH_H / 2
      z = (Math.random() - 0.5) * ARCH_D
    } else if (face === 1) { // front
      x = (Math.random() - 0.5) * ARCH_W
      y = ARCH_Y + (Math.random() - 0.5) * ARCH_H
      z = ARCH_D / 2
    } else if (face === 2) { // back
      x = (Math.random() - 0.5) * ARCH_W
      y = ARCH_Y + (Math.random() - 0.5) * ARCH_H
      z = -ARCH_D / 2
    } else if (face === 3) {
      x = -ARCH_W / 2
      y = ARCH_Y + (Math.random() - 0.5) * ARCH_H
      z = (Math.random() - 0.5) * ARCH_D
    } else {
      x = ARCH_W / 2
      y = ARCH_Y + (Math.random() - 0.5) * ARCH_H
      z = (Math.random() - 0.5) * ARCH_D
    }
    const c = ACCENT.clone().lerp(WHITE, Math.random() < 0.08 ? 0.4 : 0)
    push(x, y, z, c, 0)
  }

  // ---- "BANK" letters etched into the architrave front face ----
  // Use a simple bitmap font via stamped points. 4 letters × ~5×7 bitmap.
  const LETTERS = {
    B: [
      '11110',
      '10001',
      '10001',
      '11110',
      '10001',
      '10001',
      '11110',
    ],
    A: [
      '01110',
      '10001',
      '10001',
      '11111',
      '10001',
      '10001',
      '10001',
    ],
    N: [
      '10001',
      '11001',
      '10101',
      '10101',
      '10101',
      '10011',
      '10001',
    ],
    K: [
      '10010',
      '10100',
      '11000',
      '10000',
      '11000',
      '10100',
      '10010',
    ],
  }
  const bankLetters = ['B', 'A', 'N', 'K']
  const GLYPH_W = 0.34
  const GLYPH_H = 0.36
  const GLYPH_GAP = 0.12
  const totalW = bankLetters.length * GLYPH_W + (bankLetters.length - 1) * GLYPH_GAP
  let cursorX = -totalW / 2
  bankLetters.forEach((letter) => {
    const bitmap = LETTERS[letter]
    bitmap.forEach((row, ry) => {
      for (let cx = 0; cx < row.length; cx++) {
        if (row[cx] === '1') {
          // sample a few points per pixel
          for (let p = 0; p < 5; p++) {
            const px = cursorX + (cx / row.length) * GLYPH_W + (Math.random() / row.length) * GLYPH_W
            const py = ARCH_Y + GLYPH_H / 2 - (ry / bitmap.length) * GLYPH_H - (Math.random() / bitmap.length) * GLYPH_H
            const pz = ARCH_D / 2 + 0.012 + (Math.random() - 0.5) * 0.005
            push(px, py, pz, WHITE.clone().lerp(ACCENT, 0.35), 0)
          }
        }
      }
    })
    cursorX += GLYPH_W + GLYPH_GAP
  })

  // ---- PEDIMENT — triangular roof above architrave ----
  // Triangle vertices: (-W/2, top of arch), (W/2, top of arch), (0, peak)
  const PED_BASE_Y = ARCH_Y + ARCH_H / 2
  const PED_W = 4.5
  const PED_PEAK_Y = PED_BASE_Y + 0.95
  const PED_D = 0.55
  // sample points on the FRONT face (a triangle) and back face
  for (let i = 0; i < 720; i++) {
    // pick uniform point in triangle via barycentric
    let u = Math.random(), v = Math.random()
    if (u + v > 1) { u = 1 - u; v = 1 - v }
    const w = 1 - u - v
    const px = u * (-PED_W / 2) + v * (PED_W / 2) + w * 0
    const py = u * PED_BASE_Y + v * PED_BASE_Y + w * PED_PEAK_Y
    const pz = (Math.random() < 0.5 ? 1 : -1) * PED_D / 2
    const c = ACCENT.clone().lerp(WHITE, Math.random() < 0.06 ? 0.45 : 0)
    push(px, py, pz, c, 0)
  }
  // edges of the pediment — extra dense for sharp silhouette
  const PED_EDGE_POINTS = 240
  for (let i = 0; i < PED_EDGE_POINTS; i++) {
    const t = Math.random()
    // left slope (-W/2, base) → (0, peak)
    if (Math.random() < 0.5) {
      const x = -PED_W / 2 + t * (PED_W / 2)
      const y = PED_BASE_Y + t * (PED_PEAK_Y - PED_BASE_Y)
      const z = (Math.random() - 0.5) * PED_D
      push(x, y, z, ACCENT.clone(), 0)
    } else {
      // right slope
      const x = PED_W / 2 - t * (PED_W / 2)
      const y = PED_BASE_Y + t * (PED_PEAK_Y - PED_BASE_Y)
      const z = (Math.random() - 0.5) * PED_D
      push(x, y, z, ACCENT.clone(), 0)
    }
  }
  // top edges — connect peak through depth
  for (let i = 0; i < 100; i++) {
    const z = (Math.random() - 0.5) * PED_D
    push(0, PED_PEAK_Y + (Math.random() - 0.5) * 0.02, z, WHITE.clone().lerp(ACCENT, 0.3), 0)
  }

  // ---- CLOCK — round face on the pediment center ----
  const CLOCK_CY = (PED_BASE_Y + PED_PEAK_Y) / 2 - 0.05
  const CLOCK_CZ = PED_D / 2 + 0.012
  // clock outer ring
  for (let i = 0; i < 200; i++) {
    const ang = Math.random() * Math.PI * 2
    const r = 0.32 + (Math.random() - 0.5) * 0.012
    const x = Math.cos(ang) * r
    const y = CLOCK_CY + Math.sin(ang) * r
    const z = CLOCK_CZ + (Math.random() - 0.5) * 0.005
    push(x, y, z, AMBER.clone().lerp(WHITE, 0.3), 0)
  }
  // 12 hour ticks
  for (let h = 0; h < 12; h++) {
    const ang = (h / 12) * Math.PI * 2 - Math.PI / 2
    for (let p = 0; p < 6; p++) {
      const r = 0.26 + Math.random() * 0.04
      const x = Math.cos(ang) * r
      const y = CLOCK_CY + Math.sin(ang) * r
      const z = CLOCK_CZ + (Math.random() - 0.5) * 0.005
      push(x, y, z, WHITE.clone(), 0)
    }
  }
  // clock hands — hour at 10, minute at 2 (a la classic ad shot)
  // hour hand
  for (let i = 0; i < 70; i++) {
    const t = Math.random()
    const ang = -Math.PI * 1.0 // pointing toward 9-10
    const len = 0.16
    const x = Math.cos(ang + 0.4) * t * len
    const y = CLOCK_CY + Math.sin(ang + 0.4) * t * len
    const z = CLOCK_CZ + 0.005
    push(x, y, z, AMBER.clone().lerp(WHITE, 0.4), 0)
  }
  // minute hand
  for (let i = 0; i < 90; i++) {
    const t = Math.random()
    const ang = -Math.PI * 0.4
    const len = 0.22
    const x = Math.cos(ang) * t * len
    const y = CLOCK_CY + Math.sin(ang) * t * len
    const z = CLOCK_CZ + 0.005
    push(x, y, z, AMBER.clone().lerp(WHITE, 0.4), 0)
  }
  // center dot
  for (let i = 0; i < 30; i++) {
    const ang = Math.random() * Math.PI * 2
    const r = 0.018 * Math.sqrt(Math.random())
    push(Math.cos(ang) * r, CLOCK_CY + Math.sin(ang) * r, CLOCK_CZ + 0.006, WHITE.clone(), 0)
  }

  // ---- DOOR — implied door arch behind the columns (back wall) ----
  // gives sense that it's a building, not just a façade
  const DOOR_Y_BOT = -1.5
  const DOOR_Y_TOP = 0.4
  const DOOR_W = 0.7
  for (let i = 0; i < 220; i++) {
    const u = Math.random()
    const v = Math.random()
    // doorway shape — rectangle with rounded top
    const x = (u - 0.5) * DOOR_W
    let y
    if (v > 0.7) {
      // arch top — use sin curve
      const arcU = (v - 0.7) / 0.3
      const arcRadius = DOOR_W / 2
      const localX = (u - 0.5) * DOOR_W
      const archY = Math.sqrt(Math.max(0, arcRadius * arcRadius - localX * localX))
      y = DOOR_Y_TOP - 0.35 + arcU * archY
    } else {
      y = DOOR_Y_BOT + v * (DOOR_Y_TOP - 0.35 - DOOR_Y_BOT)
    }
    const z = -0.4 + (Math.random() - 0.5) * 0.04
    push(x, y, z, BLUE.clone().lerp(VIOLET, 0.4).multiplyScalar(0.7), 0)
  }
  // door frame edges
  for (let i = 0; i < 120; i++) {
    const t = Math.random()
    const which = Math.random()
    let x, y
    if (which < 0.4) {
      // left edge
      x = -DOOR_W / 2
      y = DOOR_Y_BOT + t * (DOOR_Y_TOP - DOOR_Y_BOT - 0.35)
    } else if (which < 0.8) {
      // right edge
      x = DOOR_W / 2
      y = DOOR_Y_BOT + t * (DOOR_Y_TOP - DOOR_Y_BOT - 0.35)
    } else {
      // top arch
      const ang = (Math.random()) * Math.PI
      x = Math.cos(ang) * DOOR_W / 2
      y = DOOR_Y_TOP - 0.35 + Math.sin(ang) * DOOR_W / 2
    }
    const z = -0.39 + (Math.random() - 0.5) * 0.02
    push(x, y, z, BLUE.clone().lerp(WHITE, 0.3), 0)
  }

  const count = positions.length / 3
  return {
    positions: new Float32Array(positions),
    colors: new Float32Array(colors),
    homes: new Float32Array(positions.slice()),
    flags: new Uint8Array(flags),
    count,
  }
}

// =============================================================================
// Particle field with cursor scatter physics — same vocabulary as the rocket
// =============================================================================
function BankField({ mouseRef, autoSpinRef, interactedRef }) {
  const groupRef = useRef(null)
  const { camera } = useThree()
  const { positions, colors, homes, flags, count } = useMemo(() => buildBank(), [])
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

  // physics — strong scatter, slow reform (sells the destruction)
  const SCATTER_RADIUS = 0.85
  const SCATTER_RADIUS_SQ = SCATTER_RADIUS * SCATTER_RADIUS
  const REPULSE = 0.36
  const SPRING = 0.011
  const DAMPING = 0.93

  useFrame((state) => {
    // Continuous auto-spin — keeps spinning even while the user scatters.
    // Only paused when the user prefers reduced motion.
    if (groupRef.current && autoSpinRef.current) {
      groupRef.current.rotation.y += 0.0018
    }

    // project cursor to world plane at z=0 (front face of the bank lives there)
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

    // local cursor (so scatter follows the rotated bank)
    const local = tmp.current.copy(cursorWorld.current)
    if (groupRef.current) groupRef.current.worldToLocal(local)
    const cx = local.x, cy = local.y, cz = local.z

    const pos = geometry.attributes.position.array

    for (let i = 0; i < count; i++) {
      const ix = i * 3, iy = i * 3 + 1, iz = i * 3 + 2

      const dx = pos[ix] - cx
      const dy = pos[iy] - cy
      const dz = pos[iz] - cz
      const dSq = dx * dx + dy * dy + dz * dz

      if (dSq < SCATTER_RADIUS_SQ) {
        const d = Math.sqrt(dSq) + 0.0001
        const falloff = 1 - d / SCATTER_RADIUS
        const f = REPULSE * falloff * falloff
        velocities[ix] += (dx / d) * f
        velocities[iy] += (dy / d) * f
        velocities[iz] += (dz / d) * f
        // chaotic kick for "bricks crumbling" feel
        velocities[ix] += (Math.random() - 0.5) * 0.04 * falloff
        velocities[iy] += (Math.random() - 0.5) * 0.04 * falloff
        velocities[iz] += (Math.random() - 0.5) * 0.03 * falloff
      }

      // spring back toward home
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
// PUBLIC COMPONENT
// =============================================================================
export default function BankParticles() {
  const containerRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const interactedRef = useRef(false)
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

  // Track cursor at window level relative to canvas so overlay copy doesn't
  // block scatter physics.
  useEffect(() => {
    const update = (e) => {
      const el = containerRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
      // only register hover INSIDE the canvas, otherwise particles return home
      if (x >= -1 && x <= 1 && y >= -1 && y <= 1) {
        mouseRef.current.x = x
        mouseRef.current.y = y
        interactedRef.current = true
      } else {
        mouseRef.current.x = 0
        mouseRef.current.y = 0
      }
    }
    window.addEventListener('pointermove', update, { passive: true })
    return () => window.removeEventListener('pointermove', update)
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
        camera={{ position: [0, 0.0, 7.6], fov: 38 }}
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <ambientLight intensity={0.5} />
        <BankField
          mouseRef={mouseRef}
          autoSpinRef={autoSpinRef}
          interactedRef={interactedRef}
        />
      </Canvas>
    </div>
  )
}
