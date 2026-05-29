'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

const ACCENT = new THREE.Color('#2DE2C5')
const BLUE = new THREE.Color('#38BDF8')
const WHITE = new THREE.Color('#F4F7FA')

// =============================================================================
// Build a simple round head: sphere of particles, two eyes, a smile.
// kind: 0 = head/smile (gets scatter physics), 1 = left eye, 2 = right eye
// =============================================================================
function buildHead() {
  const positions = []
  const colors = []
  const kinds = []

  const push = (x, y, z, c, kind) => {
    positions.push(x, y, z)
    colors.push(c.r, c.g, c.b)
    kinds.push(kind)
  }

  const EYE_CENTERS = [
    { x: -0.3, y: 0.18, z: 0.85 },
    { x:  0.3, y: 0.18, z: 0.85 },
  ]
  const EYE_RADIUS = 0.13

  // ---- Round head — particles distributed on a sphere surface ----
  const HEAD_POINTS = 5500
  const RADIUS = 1.0
  for (let i = 0; i < HEAD_POINTS; i++) {
    // uniform distribution on a sphere
    const u = Math.random()
    const v = Math.random()
    const theta = 2 * Math.PI * u
    const phi = Math.acos(2 * v - 1)

    const x = Math.sin(phi) * Math.cos(theta) * RADIUS
    const y = Math.cos(phi) * RADIUS
    const z = Math.sin(phi) * Math.sin(theta) * RADIUS

    // skip eye sockets — only on the front (z > 0.6)
    if (z > 0.6) {
      let inEye = false
      for (const e of EYE_CENTERS) {
        const dx = x - e.x, dy = y - e.y
        if (dx * dx + dy * dy < EYE_RADIUS * EYE_RADIUS) {
          inEye = true
          break
        }
      }
      if (inEye) continue

      // skip the smile slit — we'll draw it as its own particles
      const smileBaseline = -0.3 + (x * x) * 0.5 // upward parabola (corners up)
      if (Math.abs(y - smileBaseline) < 0.025 && Math.abs(x) < 0.32) continue
    }

    // Color — accent dominant, occasional blue/white sparkle
    const roll = Math.random()
    const c =
      roll < 0.06 ? WHITE.clone().lerp(ACCENT, 0.3) :
      roll < 0.18 ? BLUE.clone() :
      ACCENT.clone()

    push(x, y, z, c, 0)
  }

  // ---- Smile — bright particles forming an upward arc ----
  const SMILE_POINTS = 140
  for (let i = 0; i < SMILE_POINTS; i++) {
    const t = (i / (SMILE_POINTS - 1)) - 0.5 // -0.5 .. 0.5
    const x = t * 0.6
    // upward arc — corners higher than center (smile)
    const y = -0.3 + (t * t) * 0.5 + (Math.random() - 0.5) * 0.012
    // map to sphere surface (z follows curvature)
    const r2 = x * x + y * y
    const z = Math.sqrt(Math.max(0.01, RADIUS * RADIUS - r2)) + 0.005
    const c = WHITE.clone().lerp(ACCENT, 0.4)
    push(x, y, z, c, 0)
  }

  // ---- Eyes — small dense clusters at each socket center ----
  EYE_CENTERS.forEach((e, eyeIdx) => {
    const kind = eyeIdx === 0 ? 1 : 2
    const EYE_POINTS = 130
    for (let i = 0; i < EYE_POINTS; i++) {
      const r = 0.085 * Math.sqrt(Math.random())
      const ang = Math.random() * Math.PI * 2
      const dx = Math.cos(ang) * r
      const dy = Math.sin(ang) * r
      const dz = (Math.random() - 0.5) * 0.03 + 0.015

      // brighter pupil at center
      const isPupil = r < 0.03
      const c = isPupil
        ? WHITE.clone()
        : ACCENT.clone().lerp(WHITE, 0.4)
      push(e.x + dx, e.y + dy, e.z + dz, c, kind)
    }
  })

  const count = positions.length / 3
  return {
    positions: new Float32Array(positions),
    colors: new Float32Array(colors),
    homes: new Float32Array(positions.slice()),
    kinds: new Uint8Array(kinds),
    count,
    eyeCenters: EYE_CENTERS,
  }
}

// =============================================================================
// Particle field — physics + eye tracking
// =============================================================================
function HeadField({ mouseRef }) {
  const groupRef = useRef(null)
  const eyeGroupL = useRef(null)
  const eyeGroupR = useRef(null)
  const { camera } = useThree()

  const { positions, colors, homes, kinds, count, eyeCenters } = useMemo(() => buildHead(), [])
  const velocities = useMemo(() => new Float32Array(count * 3), [count])

  const eyeLookCursor = useRef(new THREE.Vector3())
  const scatterCursor = useRef(new THREE.Vector3())
  const tmp = useRef(new THREE.Vector3())

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions.slice(), 3))
    g.setAttribute('color', new THREE.BufferAttribute(colors.slice(), 3))
    return g
  }, [positions, colors])

  useEffect(() => () => geometry.dispose(), [geometry])

  // tunables — strong dissolve, fast eye tracking
  const SCATTER_RADIUS = 0.7
  const SCATTER_RADIUS_SQ = SCATTER_RADIUS * SCATTER_RADIUS
  const REPULSE = 0.4
  const SPRING = 0.013
  const DAMPING = 0.92
  const EYE_YAW_MAX = 0.55
  const EYE_PITCH_MAX = 0.34
  const EYE_LERP = 0.32

  useFrame((state) => {
    const m = mouseRef.current
    const haveMouse = m && (m.x !== 0 || m.y !== 0)

    if (haveMouse) {
      // Eye look — project to plane in front of head (z=+2 world)
      eyeLookCursor.current.set(m.x, m.y, 0.5)
      eyeLookCursor.current.unproject(camera)
      const d1 = tmp.current.copy(eyeLookCursor.current).sub(camera.position).normalize()
      const distEye = (2.0 - camera.position.z) / d1.z
      eyeLookCursor.current.copy(camera.position).add(d1.multiplyScalar(distEye))

      // Scatter — project to plane where particles live (z≈0.85 world for the front)
      scatterCursor.current.set(m.x, m.y, 0.5)
      scatterCursor.current.unproject(camera)
      const d2 = tmp.current.copy(scatterCursor.current).sub(camera.position).normalize()
      const distSc = (0.85 - camera.position.z) / d2.z
      scatterCursor.current.copy(camera.position).add(d2.multiplyScalar(distSc))
    } else {
      eyeLookCursor.current.set(0, 0.18, 8)
      scatterCursor.current.set(9999, 9999, 9999)
    }

    // Subtle head tilt + breathing
    if (groupRef.current) {
      const targetYaw = haveMouse ? m.x * 0.22 : 0
      const targetPitch = haveMouse ? -m.y * 0.14 : 0
      groupRef.current.rotation.y += (targetYaw - groupRef.current.rotation.y) * 0.05
      groupRef.current.rotation.x += (targetPitch - groupRef.current.rotation.x) * 0.05
      const t = state.clock.elapsedTime
      groupRef.current.position.y = Math.sin(t * 0.6) * 0.025
    }

    // Eye look — yaw/pitch in head-local
    const localEye = tmp.current.copy(eyeLookCursor.current)
    if (groupRef.current) groupRef.current.worldToLocal(localEye)
    const dx = localEye.x
    const dy = localEye.y - 0.18
    const dz = Math.max(0.4, localEye.z - 0.85)
    const desiredYaw = Math.atan2(dx, dz)
    const desiredPitch = Math.atan2(dy, dz)
    const yaw = THREE.MathUtils.clamp(desiredYaw, -EYE_YAW_MAX, EYE_YAW_MAX)
    const pitch = THREE.MathUtils.clamp(desiredPitch, -EYE_PITCH_MAX, EYE_PITCH_MAX)

    if (eyeGroupL.current) {
      eyeGroupL.current.rotation.y += (yaw - eyeGroupL.current.rotation.y) * EYE_LERP
      eyeGroupL.current.rotation.x += (-pitch - eyeGroupL.current.rotation.x) * EYE_LERP
    }
    if (eyeGroupR.current) {
      eyeGroupR.current.rotation.y += (yaw - eyeGroupR.current.rotation.y) * EYE_LERP
      eyeGroupR.current.rotation.x += (-pitch - eyeGroupR.current.rotation.x) * EYE_LERP
    }

    // Scatter physics on head particles only
    const localSc = tmp.current.copy(scatterCursor.current)
    if (groupRef.current) groupRef.current.worldToLocal(localSc)
    const cx = localSc.x, cy = localSc.y, cz = localSc.z

    const pos = geometry.attributes.position.array
    for (let i = 0; i < count; i++) {
      if (kinds[i] !== 0) continue

      const ix = i * 3, iy = i * 3 + 1, iz = i * 3 + 2

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
        // chaotic kick — sells the dissolve
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

  // Eye buffers — separate <points> for each eye, parented to a rotation group
  const eyeBuffers = useMemo(() => {
    const left = { pos: [], col: [] }
    const right = { pos: [], col: [] }
    for (let i = 0; i < count; i++) {
      if (kinds[i] === 1 || kinds[i] === 2) {
        const ix = i * 3, iy = i * 3 + 1, iz = i * 3 + 2
        const e = eyeCenters[kinds[i] - 1]
        const target = kinds[i] === 1 ? left : right
        target.pos.push(positions[ix] - e.x, positions[iy] - e.y, positions[iz] - e.z)
        target.col.push(colors[ix], colors[iy], colors[iz])
      }
    }
    const mkGeo = (b) => {
      const g = new THREE.BufferGeometry()
      g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(b.pos), 3))
      g.setAttribute('color', new THREE.BufferAttribute(new Float32Array(b.col), 3))
      return g
    }
    return { left: mkGeo(left), right: mkGeo(right) }
  }, [positions, colors, kinds, count, eyeCenters])

  useEffect(() => () => {
    eyeBuffers.left.dispose()
    eyeBuffers.right.dispose()
  }, [eyeBuffers])

  return (
    <group ref={groupRef}>
      <points geometry={geometry}>
        <pointsMaterial
          size={0.02}
          vertexColors
          transparent
          opacity={0.95}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <group position={[eyeCenters[0].x, eyeCenters[0].y, eyeCenters[0].z]}>
        <group ref={eyeGroupL}>
          <points geometry={eyeBuffers.left}>
            <pointsMaterial
              size={0.026}
              vertexColors
              transparent
              opacity={1.0}
              sizeAttenuation
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </points>
        </group>
      </group>

      <group position={[eyeCenters[1].x, eyeCenters[1].y, eyeCenters[1].z]}>
        <group ref={eyeGroupR}>
          <points geometry={eyeBuffers.right}>
            <pointsMaterial
              size={0.026}
              vertexColors
              transparent
              opacity={1.0}
              sizeAttenuation
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </points>
        </group>
      </group>
    </group>
  )
}

// =============================================================================
// Public component — owns window-level pointer ref so eye tracking + scatter
// keep working even when overlay copy blocks canvas events.
// =============================================================================
export default function HumanoidHead() {
  const containerRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const update = (e) => {
      const el = containerRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
      mouseRef.current.x = Math.max(-1.5, Math.min(1.5, x))
      mouseRef.current.y = Math.max(-1.5, Math.min(1.5, y))
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
        camera={{ position: [0, 0, 4.4], fov: 32 }}
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <ambientLight intensity={0.5} />
        <HeadField mouseRef={mouseRef} />
      </Canvas>
    </div>
  )
}
