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
// Build a phone silhouette out of particles + UI elements inside.
// Phone is at z=0, frame in the X/Y plane. UI elements live at z = +0.04..+0.06
// so they read in front of the body when rotated.
// =============================================================================
function buildPhone() {
  const positions = []
  const colors = []

  const push = (x, y, z, c) => {
    positions.push(x, y, z)
    colors.push(c.r, c.g, c.b)
  }

  // ---- PHONE FRAME — rounded rectangle outline (perimeter) ----
  // Phone aspect ~ 9:19.5 (modern iPhone). Use w=1.5, h=3.0, r=0.18 corner radius.
  const W = 1.5
  const H = 3.0
  const R = 0.18

  // We sample evenly around the perimeter — straight edges + 4 quarter-arcs.
  // Edge lengths:
  //   straight horizontal: W - 2R = 1.14   ×2 (top + bottom)
  //   straight vertical:   H - 2R = 2.64   ×2 (left + right)
  //   quarter-arc:         (π/2)R = 0.283  ×4
  // Total perimeter ≈ 1.14*2 + 2.64*2 + 0.283*4 ≈ 8.69
  const PERIMETER_POINTS = 1100
  const segLengths = [
    W - 2 * R,                  // top
    (Math.PI / 2) * R,          // top-right corner
    H - 2 * R,                  // right
    (Math.PI / 2) * R,          // bottom-right
    W - 2 * R,                  // bottom
    (Math.PI / 2) * R,          // bottom-left
    H - 2 * R,                  // left
    (Math.PI / 2) * R,          // top-left
  ]
  const totalPerim = segLengths.reduce((a, b) => a + b, 0)

  for (let i = 0; i < PERIMETER_POINTS; i++) {
    let s = (i / PERIMETER_POINTS) * totalPerim
    let seg = 0
    while (s > segLengths[seg]) {
      s -= segLengths[seg]
      seg++
    }
    const t = s / segLengths[seg]
    let x, y
    switch (seg) {
      case 0: // top edge: from (-W/2 + R, +H/2) to (+W/2 - R, +H/2)
        x = -W / 2 + R + t * (W - 2 * R)
        y = H / 2
        break
      case 1: { // top-right arc
        const a = (Math.PI / 2) - t * (Math.PI / 2) // π/2 → 0
        x = (W / 2 - R) + Math.cos(a) * R
        y = (H / 2 - R) + Math.sin(a) * R
        break
      }
      case 2: // right edge
        x = W / 2
        y = (H / 2 - R) - t * (H - 2 * R)
        break
      case 3: { // bottom-right arc
        const a = 0 - t * (Math.PI / 2) // 0 → -π/2
        x = (W / 2 - R) + Math.cos(a) * R
        y = (-H / 2 + R) + Math.sin(a) * R
        break
      }
      case 4: // bottom edge
        x = (W / 2 - R) - t * (W - 2 * R)
        y = -H / 2
        break
      case 5: { // bottom-left arc
        const a = -Math.PI / 2 - t * (Math.PI / 2) // -π/2 → -π
        x = (-W / 2 + R) + Math.cos(a) * R
        y = (-H / 2 + R) + Math.sin(a) * R
        break
      }
      case 6: // left edge
        x = -W / 2
        y = (-H / 2 + R) + t * (H - 2 * R)
        break
      case 7: { // top-left arc
        const a = Math.PI - t * (Math.PI / 2) // π → π/2
        x = (-W / 2 + R) + Math.cos(a) * R
        y = (H / 2 - R) + Math.sin(a) * R
        break
      }
      default:
        x = 0; y = 0
    }
    // jitter perpendicular to the curve direction (subtle)
    const jitter = (Math.random() - 0.5) * 0.012
    const c = ACCENT.clone().lerp(WHITE, Math.random() < 0.07 ? 0.4 : 0)
    push(x + jitter, y + jitter, (Math.random() - 0.5) * 0.015, c)
  }

  // ---- NOTCH — small bar at the top center ----
  for (let i = 0; i < 60; i++) {
    const x = (Math.random() - 0.5) * 0.42
    const y = H / 2 - 0.05 + (Math.random() - 0.5) * 0.02
    push(x, y, 0.005, ACCENT.clone().lerp(WHITE, 0.5))
  }

  // ---- HOME INDICATOR — small bar at the bottom ----
  for (let i = 0; i < 60; i++) {
    const x = (Math.random() - 0.5) * 0.5
    const y = -H / 2 + 0.06 + (Math.random() - 0.5) * 0.012
    push(x, y, 0.005, ACCENT.clone().lerp(WHITE, 0.4))
  }

  // ====== UI ELEMENTS INSIDE THE PHONE ======
  // Treat the screen area as W' × H' (slightly inset from frame).
  const SW = W - 0.18
  const SH = H - 0.34
  const SY_TOP = H / 2 - 0.32   // top of the screen content
  const SY_BOT = -H / 2 + 0.22  // bottom of the screen content

  // ---- 1. Top app bar (status bar) — line of small dots ----
  for (let i = 0; i < 18; i++) {
    const x = -SW / 2 + 0.06 + (i / 18) * (SW - 0.12)
    const y = SY_TOP - 0.04
    push(x, y, 0.045, ACCENT.clone().lerp(WHITE, 0.5))
  }

  // ---- 2. Hero card — outlined rounded rectangle near the top ----
  {
    const cx = 0
    const cy = SY_TOP - 0.34
    const cw = SW - 0.22
    const ch = 0.42
    const corner = 0.06
    const N = 220
    const totalCard =
      (cw - 2 * corner) * 2 + (ch - 2 * corner) * 2 + (Math.PI / 2) * corner * 4
    for (let i = 0; i < N; i++) {
      const t = (i / N) * totalCard
      let acc = 0
      let x, y
      // top edge
      if (t < (acc += cw - 2 * corner)) {
        const k = (t - (acc - (cw - 2 * corner))) / (cw - 2 * corner)
        x = cx - cw / 2 + corner + k * (cw - 2 * corner)
        y = cy + ch / 2
      } else if (t < (acc += (Math.PI / 2) * corner)) {
        const k = (t - (acc - (Math.PI / 2) * corner)) / ((Math.PI / 2) * corner)
        const a = Math.PI / 2 - k * (Math.PI / 2)
        x = cx + cw / 2 - corner + Math.cos(a) * corner
        y = cy + ch / 2 - corner + Math.sin(a) * corner
      } else if (t < (acc += ch - 2 * corner)) {
        const k = (t - (acc - (ch - 2 * corner))) / (ch - 2 * corner)
        x = cx + cw / 2
        y = cy + ch / 2 - corner - k * (ch - 2 * corner)
      } else if (t < (acc += (Math.PI / 2) * corner)) {
        const k = (t - (acc - (Math.PI / 2) * corner)) / ((Math.PI / 2) * corner)
        const a = -k * (Math.PI / 2)
        x = cx + cw / 2 - corner + Math.cos(a) * corner
        y = cy - ch / 2 + corner + Math.sin(a) * corner
      } else if (t < (acc += cw - 2 * corner)) {
        const k = (t - (acc - (cw - 2 * corner))) / (cw - 2 * corner)
        x = cx + cw / 2 - corner - k * (cw - 2 * corner)
        y = cy - ch / 2
      } else if (t < (acc += (Math.PI / 2) * corner)) {
        const k = (t - (acc - (Math.PI / 2) * corner)) / ((Math.PI / 2) * corner)
        const a = -Math.PI / 2 - k * (Math.PI / 2)
        x = cx - cw / 2 + corner + Math.cos(a) * corner
        y = cy - ch / 2 + corner + Math.sin(a) * corner
      } else if (t < (acc += ch - 2 * corner)) {
        const k = (t - (acc - (ch - 2 * corner))) / (ch - 2 * corner)
        x = cx - cw / 2
        y = cy - ch / 2 + corner + k * (ch - 2 * corner)
      } else {
        const k = (t - (totalCard - (Math.PI / 2) * corner)) / ((Math.PI / 2) * corner)
        const a = Math.PI - k * (Math.PI / 2)
        x = cx - cw / 2 + corner + Math.cos(a) * corner
        y = cy + ch / 2 - corner + Math.sin(a) * corner
      }
      const c = BLUE.clone().lerp(WHITE, Math.random() < 0.1 ? 0.4 : 0)
      push(x, y, 0.05, c)
    }
    // fill — a few sparse dots inside the card
    for (let i = 0; i < 70; i++) {
      const x = cx + (Math.random() - 0.5) * (cw - 0.1)
      const y = cy + (Math.random() - 0.5) * (ch - 0.1)
      push(x, y, 0.045, BLUE.clone().multiplyScalar(0.5))
    }
  }

  // ---- 3. List rows — 3 horizontal lines below the hero card ----
  const ROW_Y = [SY_TOP - 0.92, SY_TOP - 1.16, SY_TOP - 1.40]
  ROW_Y.forEach((y) => {
    // dot avatar on the left
    for (let i = 0; i < 30; i++) {
      const ang = Math.random() * Math.PI * 2
      const r = 0.06 * Math.sqrt(Math.random())
      const x = -SW / 2 + 0.14 + Math.cos(ang) * r
      const yp = y + Math.sin(ang) * r
      push(x, yp, 0.045, VIOLET.clone().lerp(WHITE, 0.3))
    }
    // text bar 1 (longer)
    for (let i = 0; i < 28; i++) {
      const t = i / 28
      const x = -SW / 2 + 0.26 + t * (SW * 0.55)
      const yp = y + 0.04
      push(x, yp, 0.045, ACCENT.clone().lerp(WHITE, 0.2))
    }
    // text bar 2 (shorter, dimmer)
    for (let i = 0; i < 18; i++) {
      const t = i / 18
      const x = -SW / 2 + 0.26 + t * (SW * 0.35)
      const yp = y - 0.04
      push(x, yp, 0.045, ACCENT.clone().multiplyScalar(0.45))
    }
  })

  // ---- 4. Three action buttons — circles row near the bottom ----
  const BTN_Y = SY_BOT + 0.30
  const BTN_CENTERS = [-SW / 3, 0, SW / 3]
  BTN_CENTERS.forEach((cx, i) => {
    // ring
    const N = 50
    for (let k = 0; k < N; k++) {
      const a = (k / N) * Math.PI * 2
      const x = cx + Math.cos(a) * 0.13
      const y = BTN_Y + Math.sin(a) * 0.13
      const c = i === 1 ? AMBER.clone() : ACCENT.clone().lerp(WHITE, 0.2)
      push(x, y, 0.05, c)
    }
    // center dot
    for (let k = 0; k < 10; k++) {
      const ang = Math.random() * Math.PI * 2
      const r = 0.025 * Math.sqrt(Math.random())
      const x = cx + Math.cos(ang) * r
      const y = BTN_Y + Math.sin(ang) * r
      push(x, y, 0.05, WHITE.clone())
    }
  })

  // ---- 5. Bottom tab bar — 4 small icons ----
  for (let i = 0; i < 4; i++) {
    const cx = -SW / 2 + 0.18 + (i / 3) * (SW - 0.36)
    const cy = SY_BOT - 0.06
    // small square per tab
    for (let k = 0; k < 16; k++) {
      const ang = Math.random() * Math.PI * 2
      const r = 0.04 * Math.sqrt(Math.random())
      const x = cx + Math.cos(ang) * r
      const y = cy + Math.sin(ang) * r * 0.7
      const c = i === 0
        ? ACCENT.clone()
        : ACCENT.clone().multiplyScalar(0.45)
      push(x, y, 0.045, c)
    }
  }

  return {
    positions: new Float32Array(positions),
    colors: new Float32Array(colors),
    homes: new Float32Array(positions.slice()),
    count: positions.length / 3,
  }
}

// =============================================================================
// Particle field — same physics vocabulary as rocket / bank
// =============================================================================
function PhoneField({ mouseRef, autoSpinRef }) {
  const groupRef = useRef(null)
  const { camera } = useThree()
  const { positions, colors, homes, count } = useMemo(() => buildPhone(), [])
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

  // physics — same numbers as the rocket
  const SCATTER_RADIUS = 0.7
  const SCATTER_RADIUS_SQ = SCATTER_RADIUS * SCATTER_RADIUS
  const REPULSE = 0.34
  const SPRING = 0.012
  const DAMPING = 0.93

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (groupRef.current && autoSpinRef.current) {
      // gentle yaw spin so it reads as 3D
      groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.45
      // subtle bob
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.05
    }

    // cursor world projection
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
        velocities[ix] += (Math.random() - 0.5) * 0.04 * falloff
        velocities[iy] += (Math.random() - 0.5) * 0.04 * falloff
        velocities[iz] += (Math.random() - 0.5) * 0.03 * falloff
      }

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
export default function ParticlePhone() {
  const containerRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })
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

  // section-level cursor tracking
  useEffect(() => {
    const update = (e) => {
      const el = containerRef.current
      if (!el) return
      const section = el.closest('section') || el
      const r = section.getBoundingClientRect()
      const inside =
        e.clientX >= r.left && e.clientX <= r.right &&
        e.clientY >= r.top && e.clientY <= r.bottom
      if (inside) {
        mouseRef.current.x = ((e.clientX - r.left) / r.width) * 2 - 1
        mouseRef.current.y = -(((e.clientY - r.top) / r.height) * 2 - 1)
      } else {
        mouseRef.current.x *= 0.9
        mouseRef.current.y *= 0.9
        if (Math.abs(mouseRef.current.x) < 0.01) mouseRef.current.x = 0
        if (Math.abs(mouseRef.current.y) < 0.01) mouseRef.current.y = 0
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
        camera={{ position: [0, 0, 4.6], fov: 38 }}
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <ambientLight intensity={0.5} />
        <PhoneField mouseRef={mouseRef} autoSpinRef={autoSpinRef} />
      </Canvas>
    </div>
  )
}
