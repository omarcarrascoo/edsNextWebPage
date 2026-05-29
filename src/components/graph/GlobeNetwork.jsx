'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

const ACCENT = new THREE.Color('#2DE2C5')
const BLUE = new THREE.Color('#38BDF8')
const VIOLET = new THREE.Color('#9D8DF1')
const AMBER = new THREE.Color('#F5B544')
const WHITE = new THREE.Color('#F4F7FA')

const RADIUS = 1.7

// =============================================================================
// LAND MASK — abstract approximation of continents using a few ellipses on
// a 2D lat/long grid. We sample tons of candidate points; only those inside
// the land regions get drawn. This avoids needing a texture file.
// =============================================================================
function isLand(longDeg, latDeg) {
  // North America (rough oval)
  if (insideOval(longDeg, latDeg, -100, 45, 38, 28)) return true
  if (insideOval(longDeg, latDeg, -95,  20, 18, 14)) return true // Mexico/Central
  // South America
  if (insideOval(longDeg, latDeg, -60, -15, 18, 30)) return true
  // Europe
  if (insideOval(longDeg, latDeg,  15,  50, 22, 14)) return true
  // Africa
  if (insideOval(longDeg, latDeg,  20,   5, 22, 32)) return true
  // Middle east + central asia
  if (insideOval(longDeg, latDeg,  55,  35, 18, 14)) return true
  // South Asia (India)
  if (insideOval(longDeg, latDeg,  78,  22, 12, 14)) return true
  // East Asia (China + Korea + Japan)
  if (insideOval(longDeg, latDeg, 110,  35, 22, 14)) return true
  if (insideOval(longDeg, latDeg, 138,  38,  6,  8)) return true // Japan
  // Southeast Asia (Indochina + Indonesia archipelago)
  if (insideOval(longDeg, latDeg, 105,  10, 14,  8)) return true
  if (insideOval(longDeg, latDeg, 118,  -5, 16,  6)) return true
  // Australia
  if (insideOval(longDeg, latDeg, 135, -25, 18,  9)) return true
  // British Isles
  if (insideOval(longDeg, latDeg,  -3,  53,   4,  5)) return true
  // Greenland (light)
  if (insideOval(longDeg, latDeg, -42,  72,  16,  9)) return true
  return false
}

function insideOval(x, y, cx, cy, rx, ry) {
  const dx = (x - cx) / rx
  const dy = (y - cy) / ry
  return dx * dx + dy * dy <= 1
}

// Major financial cities — used as endpoints for transaction arcs
const CITIES = [
  { name: 'NYC',     long: -74,   lat:  40.7 },
  { name: 'LON',     long:   0,   lat:  51.5 },
  { name: 'SGP',     long: 103.8, lat:   1.3 },
  { name: 'TYO',     long: 139.7, lat:  35.7 },
  { name: 'HKG',     long: 114.2, lat:  22.3 },
  { name: 'FRA',     long:   8.7, lat:  50.1 },
  { name: 'ZRH',     long:   8.5, lat:  47.4 },
  { name: 'DXB',     long:  55.3, lat:  25.3 },
  { name: 'MEX',     long: -99.1, lat:  19.4 },
  { name: 'SFO',     long: -122.4,lat:  37.8 },
  { name: 'SAO',     long: -46.6, lat: -23.5 },
  { name: 'SYD',     long: 151.2, lat: -33.9 },
  { name: 'MUM',     long:  72.9, lat:  19.1 },
  { name: 'JNB',     long:  28.0, lat: -26.2 },
]

// Lat/long → 3D unit vector on sphere
function latLongToXYZ(longDeg, latDeg, r = RADIUS) {
  const lat = (latDeg * Math.PI) / 180
  const lng = (longDeg * Math.PI) / 180
  const x = r * Math.cos(lat) * Math.cos(lng)
  const y = r * Math.sin(lat)
  const z = r * Math.cos(lat) * Math.sin(lng)
  return new THREE.Vector3(x, y, z)
}

// =============================================================================
// Build land particles + city markers + transaction arc curves
// =============================================================================
function buildGlobe() {
  const positions = []
  const colors = []

  const push = (x, y, z, c) => {
    positions.push(x, y, z)
    colors.push(c.r, c.g, c.b)
  }

  // ---- LAND DOTS — sample uniformly on the sphere, keep only those on land
  const TARGET_LAND_POINTS = 6500
  let attempts = 0
  let landCount = 0
  while (landCount < TARGET_LAND_POINTS && attempts < TARGET_LAND_POINTS * 8) {
    attempts++
    // uniform sampling on sphere via inverse CDF
    const u = Math.random()
    const v = Math.random()
    const theta = 2 * Math.PI * u // longitude angle
    const phi = Math.acos(2 * v - 1) // polar angle from north pole
    // convert to lat/long degrees
    const latDeg = 90 - (phi * 180) / Math.PI
    let longDeg = (theta * 180) / Math.PI - 180

    if (!isLand(longDeg, latDeg)) continue

    // jitter the radius slightly so land has some visual depth
    const r = RADIUS + (Math.random() - 0.5) * 0.012
    const x = r * Math.sin(phi) * Math.cos(theta)
    const y = r * Math.cos(phi)
    const z = r * Math.sin(phi) * Math.sin(theta)

    // Slightly vary color — most accent, occasional blue/white
    const roll = Math.random()
    const c = roll < 0.05 ? WHITE.clone().lerp(ACCENT, 0.4)
            : roll < 0.16 ? BLUE.clone()
            : ACCENT.clone()

    push(x, y, z, c)
    landCount++
  }

  // ---- OCEAN GHOST DOTS — very few sparse points to imply the sphere
  // exists between the continents (otherwise it looks like floating shapes)
  for (let i = 0; i < 800; i++) {
    const u = Math.random()
    const v = Math.random()
    const theta = 2 * Math.PI * u
    const phi = Math.acos(2 * v - 1)
    const latDeg = 90 - (phi * 180) / Math.PI
    let longDeg = (theta * 180) / Math.PI - 180
    if (isLand(longDeg, latDeg)) continue
    const r = RADIUS + (Math.random() - 0.5) * 0.005
    const x = r * Math.sin(phi) * Math.cos(theta)
    const y = r * Math.cos(phi)
    const z = r * Math.sin(phi) * Math.sin(theta)
    const c = ACCENT.clone().multiplyScalar(0.18) // very dim
    push(x, y, z, c)
  }

  // ---- LATITUDE LINES — 5 ghosted parallels for "globe" feel
  const PARALLELS = [-50, -25, 0, 25, 50]
  PARALLELS.forEach((latDeg) => {
    for (let i = 0; i < 130; i++) {
      const longDeg = -180 + (i / 130) * 360
      const v = latLongToXYZ(longDeg, latDeg, RADIUS - 0.005)
      const c = ACCENT.clone().multiplyScalar(0.25)
      push(v.x, v.y, v.z, c)
    }
  })

  // ---- MERIDIANS — 4 ghosted meridians
  const MERIDIANS = [-90, 0, 90, 180]
  MERIDIANS.forEach((longDeg) => {
    for (let i = 0; i < 120; i++) {
      const latDeg = -85 + (i / 120) * 170
      const v = latLongToXYZ(longDeg, latDeg, RADIUS - 0.005)
      const c = ACCENT.clone().multiplyScalar(0.22)
      push(v.x, v.y, v.z, c)
    }
  })

  // city markers — denser glow points where cities sit
  CITIES.forEach((city) => {
    const center = latLongToXYZ(city.long, city.lat, RADIUS + 0.012)
    for (let i = 0; i < 24; i++) {
      const offset = new THREE.Vector3(
        (Math.random() - 0.5) * 0.05,
        (Math.random() - 0.5) * 0.05,
        (Math.random() - 0.5) * 0.05,
      )
      const p = center.clone().add(offset)
      const c = WHITE.clone().lerp(ACCENT, 0.3)
      push(p.x, p.y, p.z, c)
    }
  })

  return {
    positions: new Float32Array(positions),
    colors: new Float32Array(colors),
    homes: new Float32Array(positions.slice()),
    count: positions.length / 3,
  }
}

// =============================================================================
// PARABOLIC ARCS between cities — tube-like glowing paths
// =============================================================================
function makeArcCurve(start, end, height = 0.6) {
  const mid = start.clone().add(end).multiplyScalar(0.5)
  const direction = mid.clone().normalize()
  mid.add(direction.multiplyScalar(height))
  return new THREE.QuadraticBezierCurve3(start, mid, end)
}

const ARC_PAIRS = [
  // a curated set of major intercontinental routes
  ['NYC', 'LON'],
  ['LON', 'SGP'],
  ['NYC', 'SFO'],
  ['SFO', 'TYO'],
  ['LON', 'DXB'],
  ['DXB', 'MUM'],
  ['HKG', 'SYD'],
  ['FRA', 'ZRH'],
  ['NYC', 'MEX'],
  ['SAO', 'NYC'],
  ['MUM', 'SGP'],
  ['JNB', 'LON'],
  ['TYO', 'HKG'],
]

// =============================================================================
// SCENE: globe + arcs + traffic particles
// =============================================================================
function GlobeScene({ mouseRef, autoSpinRef }) {
  const groupRef = useRef(null)
  const { camera } = useThree()

  const { positions, colors, homes, count } = useMemo(() => buildGlobe(), [])
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

  // Build the curves once
  const arcs = useMemo(() => {
    const cityMap = Object.fromEntries(
      CITIES.map((c) => [c.name, latLongToXYZ(c.long, c.lat, RADIUS + 0.005)]),
    )
    return ARC_PAIRS.map(([a, b]) => {
      const start = cityMap[a]
      const end = cityMap[b]
      const dist = start.distanceTo(end)
      const height = 0.25 + (dist / 4) * 0.55
      return {
        curve: makeArcCurve(start, end, height),
        speed: 0.18 + Math.random() * 0.15,
        phase: Math.random(),
      }
    })
  }, [])

  // Arc tube geometries — created once, always visible (dim)
  const arcGeometries = useMemo(() => {
    return arcs.map(({ curve }) => {
      // we render the arc as a thin line via a sampled buffer geometry
      const points = curve.getPoints(48)
      const g = new THREE.BufferGeometry().setFromPoints(points)
      return g
    })
  }, [arcs])

  useEffect(() => () => arcGeometries.forEach((g) => g.dispose()), [arcGeometries])

  // Traffic particles — one InstancedMesh shared across arcs
  const trafficCount = arcs.length * 2 // 2 particles per arc
  const trafficMeshRef = useRef(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const tmpPoint = useMemo(() => new THREE.Vector3(), [])

  // physics — same vocabulary as the rocket / bank
  const SCATTER_RADIUS = 0.7
  const SCATTER_RADIUS_SQ = SCATTER_RADIUS * SCATTER_RADIUS
  const REPULSE = 0.32
  const SPRING = 0.013
  const DAMPING = 0.93

  useFrame((state) => {
    const t = state.clock.elapsedTime

    // continuous rotation
    if (groupRef.current && autoSpinRef.current) {
      groupRef.current.rotation.y += 0.0014
      // subtle wobble
      groupRef.current.rotation.x = Math.sin(t * 0.15) * 0.06
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

    // ---- update sphere/land particles with scatter physics ----
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
        velocities[ix] += (Math.random() - 0.5) * 0.03 * falloff
        velocities[iy] += (Math.random() - 0.5) * 0.03 * falloff
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

    // ---- update traffic particles travelling along arcs ----
    const tMesh = trafficMeshRef.current
    if (tMesh) {
      let idx = 0
      arcs.forEach((arc, ai) => {
        for (let p = 0; p < 2; p++) {
          const phaseOffset = p / 2
          const param = ((t * arc.speed + arc.phase + phaseOffset) % 1)
          arc.curve.getPoint(param, tmpPoint)

          // fade in/out at endpoints
          const fade =
            param < 0.08 ? param / 0.08 :
            param > 0.92 ? (1 - param) / 0.08 : 1
          const s = (0.05 + fade * 0.06)
          dummy.position.copy(tmpPoint)
          dummy.scale.set(s, s, s)
          dummy.updateMatrix()
          tMesh.setMatrixAt(idx, dummy.matrix)
          idx++
        }
      })
      tMesh.instanceMatrix.needsUpdate = true
    }
  })

  return (
    <group ref={groupRef}>
      {/* land/ocean/cities/lat-long particles */}
      <points geometry={geometry}>
        <pointsMaterial
          size={0.022}
          vertexColors
          transparent
          opacity={0.95}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* arc lines — dim glow paths */}
      {arcGeometries.map((g, i) => (
        <line key={i} geometry={g}>
          <lineBasicMaterial
            color={ACCENT}
            transparent
            opacity={0.22}
            toneMapped={false}
          />
        </line>
      ))}

      {/* traffic particles */}
      <instancedMesh ref={trafficMeshRef} args={[null, null, trafficCount]}>
        <sphereGeometry args={[1, 8, 6]} />
        <meshBasicMaterial
          color={ACCENT}
          transparent
          opacity={0.95}
          toneMapped={false}
          blending={THREE.AdditiveBlending}
        />
      </instancedMesh>

      {/* atmosphere halo — soft outer glow */}
      <mesh>
        <sphereGeometry args={[RADIUS * 1.06, 32, 24]} />
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
// PUBLIC COMPONENT
// =============================================================================
export default function GlobeNetwork() {
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

  // Track cursor at section level so scatter survives copy overlays
  useEffect(() => {
    const update = (e) => {
      const el = containerRef.current
      if (!el) return
      const section = el.closest('section') || el
      const r = section.getBoundingClientRect()
      const inside =
        e.clientX >= r.left && e.clientX <= r.right &&
        e.clientY >= r.top  && e.clientY <= r.bottom
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
        camera={{ position: [0, 0, 5.0], fov: 38 }}
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <ambientLight intensity={0.5} />
        <GlobeScene mouseRef={mouseRef} autoSpinRef={autoSpinRef} />
      </Canvas>
    </div>
  )
}
