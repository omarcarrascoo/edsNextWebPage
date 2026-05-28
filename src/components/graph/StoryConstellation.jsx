'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Html, Line } from '@react-three/drei'
import { useEffect, useMemo, useRef, useState, createContext, useContext } from 'react'
import * as THREE from 'three'

const STATE_COLORS = {
  active: '#2DE2C5',
  live:   '#22D39A',
  run:    '#38BDF8',
  warn:   '#F5B544',
  idle:   '#A8B3C1',
  ghost:  '#5C6B7C',
}

// =============================================================================
// SCROLL CONTEXT — every section anchor reports its viewport progress
// =============================================================================
const ScrollContext = createContext({ progress: 0, sectionProgress: () => 0 })

export function ScrollProvider({ children }) {
  const progressRef = useRef(0)
  const sectionsRef = useRef(new Map())
  const tickersRef = useRef(new Set())

  useEffect(() => {
    let raf = 0
    const loop = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      progressRef.current = max > 0 ? window.scrollY / max : 0

      sectionsRef.current.forEach((entry, id) => {
        const el = entry.el
        if (!el) return
        const rect = el.getBoundingClientRect()
        const vh = window.innerHeight
        // 0 when section is below screen, 1 when above.
        // 0.5 when section center is at viewport center.
        const center = rect.top + rect.height / 2
        const norm = 1 - (center / vh)
        entry.progress = Math.max(0, Math.min(1, norm))
      })

      tickersRef.current.forEach(fn => fn())
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  const value = useMemo(() => ({
    register: (id, el) => {
      sectionsRef.current.set(id, { el, progress: 0 })
    },
    unregister: (id) => {
      sectionsRef.current.delete(id)
    },
    sectionProgress: (id) => sectionsRef.current.get(id)?.progress ?? 0,
    getProgress: () => progressRef.current,
    subscribe: (fn) => {
      tickersRef.current.add(fn)
      return () => tickersRef.current.delete(fn)
    },
  }), [])

  return <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>
}

export function useScrollStory() {
  return useContext(ScrollContext)
}

export function SceneAnchor({ id, children, className = '' }) {
  const ref = useRef(null)
  const { register, unregister } = useScrollStory()
  useEffect(() => {
    if (!ref.current) return
    register(id, ref.current)
    return () => unregister(id)
  }, [id, register, unregister])
  return (
    <div ref={ref} data-anchor={id} className={className}>
      {children}
    </div>
  )
}

// =============================================================================
// STORY DEFINITION — 5 acts distributed along Z axis
//   Act 1 — Genesis (z=  0) ........... Hero: ERA·OS core + 8 satellites
//   Act 2 — Fragmentation (z=-22) .... Problem: 5 disconnected islands
//   Act 3 — Convergence (z=-44) ...... Value: 4 hubs + satellites + bridges
//   Act 4 — Intelligence (z=-66) ..... AI flow: directional swarm
//   Act 5 — Horizon (z=-88) .......... Final: explosion + outward pulse
// =============================================================================

const CAM_PATH = [
  { z:   8, y: 0,   look: { x: 0, y: 0, z:   0 } },  // act 1
  { z: -14, y: 0.6, look: { x: 0, y: 0, z: -22 } },  // act 2
  { z: -36, y: -0.4, look: { x: 0, y: 0, z: -44 } }, // act 3
  { z: -58, y: 0.2, look: { x: 0, y: 0, z: -66 } },  // act 4
  { z: -80, y: 0,   look: { x: 0, y: 0, z: -92 } },  // act 5
]

function buildStoryNodes(modules) {
  const nodes = []
  const edges = []
  const flows = []

  // ---------- ACT 1: Genesis (Hero) — center core + satellites + halo ----------
  const heroZ = 0
  nodes.push({
    id: 'core',
    type: 'core',
    pos: [0, 0, heroZ],
    label: 'ERA · OS',
    meta: 'v2026.1',
    state: 'active',
    fixed: true,
    actStart: 0,
    actEnd: 0.25,
  })

  const heroSats = (modules || []).slice(0, 8)
  heroSats.forEach((m, i) => {
    const angle = (-Math.PI / 2) + (i * (2 * Math.PI / 8))
    const r = 5.4
    const x = Math.cos(angle) * r
    const y = Math.sin(angle) * r * 0.78
    const z = heroZ + Math.sin(angle * 2) * 0.6
    const id = `hero-sat-${i}`
    const placement = Math.abs(Math.cos(angle)) > Math.abs(Math.sin(angle))
      ? (Math.cos(angle) > 0 ? 'right' : 'left')
      : (Math.sin(angle) > 0 ? 'bottom' : 'top')
    nodes.push({
      id,
      type: 'node',
      pos: [x, y, z],
      label: m.name,
      meta: m.tag,
      state: ['active','run','live','live','warn','active','run','live'][i] || 'active',
      labelPlacement: placement,
      actStart: 0.05,
      actEnd: 0.22,
    })
    edges.push({ from: 'core', to: id, opacity: 0.55, strong: true })
    flows.push({ from: 'core', to: id, color: i % 3 === 0 ? '#38BDF8' : '#2DE2C5', delay: i * 0.4 })
  })

  // micros around hero
  for (let i = 0; i < 14; i++) {
    const angle = (i * (2 * Math.PI / 14)) + 0.3
    const r = 2.4 + (i % 3) * 0.5
    nodes.push({
      id: `hero-m-${i}`,
      type: 'micro',
      pos: [Math.cos(angle) * r, Math.sin(angle) * r * 0.8, heroZ + Math.cos(angle * 3) * 0.7],
      state: i % 3 === 0 ? 'run' : i % 3 === 1 ? 'active' : 'live',
      actStart: 0.02,
      actEnd: 0.25,
    })
  }

  // ---------- TRANSITION: Hero → Problem (filaments stretching forward) ----------
  for (let i = 0; i < 6; i++) {
    const angle = (i * (Math.PI / 3))
    nodes.push({
      id: `t1-m-${i}`,
      type: 'micro',
      pos: [Math.cos(angle) * 4, Math.sin(angle) * 2, -8 - i * 1.5],
      state: 'idle',
      actStart: 0.1,
      actEnd: 0.35,
    })
  }

  // ---------- ACT 2: Fragmentation (Problem) — 5 island clusters ----------
  const problemZ = -22
  const islands = [
    { label: 'WhatsApp',  meta: 'Pedidos sueltos',   pos: [-6.5,  2.4, problemZ],  state: 'warn'   },
    { label: 'Excel',     meta: 'Inventario manual', pos: [ 6.5,  2.8, problemZ - 1], state: 'warn' },
    { label: 'Reportes',  meta: 'A mano',            pos: [-5.2, -2.6, problemZ - 0.4], state: 'idle' },
    { label: 'Pagos',     meta: 'Sin trazabilidad',  pos: [ 5.8, -2.2, problemZ + 0.6], state: 'warn' },
    { label: 'Equipo',    meta: 'En islas',          pos: [ 0,    0,   problemZ - 1.2], state: 'idle' },
  ]
  islands.forEach((it, i) => {
    const id = `prob-${i}`
    const placement = it.pos[0] > 0 ? 'right' : it.pos[0] < 0 ? 'left' : 'top'
    nodes.push({
      id, type: 'node', pos: it.pos, label: it.label, meta: it.meta, state: it.state,
      labelPlacement: placement,
      actStart: 0.18,
      actEnd: 0.42,
    })
    // each island has 2-3 micro satellites — visual density of chaos
    for (let k = 0; k < 3; k++) {
      const a = (k * 2.1) + i
      nodes.push({
        id: `prob-${i}-m-${k}`,
        type: 'micro',
        pos: [it.pos[0] + Math.cos(a) * 1.2, it.pos[1] + Math.sin(a) * 1.2, it.pos[2] + Math.sin(a*2) * 0.6],
        state: 'idle',
        actStart: 0.18,
        actEnd: 0.42,
      })
    }
  })
  // dashed weak edges between islands — the broken state
  edges.push({ from: 'prob-0', to: 'prob-1', dashed: true, opacity: 0.18, color: '#F5B544' })
  edges.push({ from: 'prob-1', to: 'prob-3', dashed: true, opacity: 0.18, color: '#F5B544' })
  edges.push({ from: 'prob-2', to: 'prob-4', dashed: true, opacity: 0.18, color: '#F5B544' })
  edges.push({ from: 'prob-0', to: 'prob-2', dashed: true, opacity: 0.18, color: '#F5B544' })

  // ---------- TRANSITION 2 → 3: arrows of light pulling the islands together ----------
  for (let i = 0; i < 8; i++) {
    nodes.push({
      id: `t2-m-${i}`,
      type: 'micro',
      pos: [(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 4, -28 - i * 1.6],
      state: i % 2 === 0 ? 'run' : 'active',
      actStart: 0.32,
      actEnd: 0.55,
    })
  }

  // ---------- ACT 3: Convergence (Value) — 4 hubs + satellites + mesh ----------
  const valueZ = -44
  const hubs = [
    { id: 'hub-product',  label: 'PRODUCT',      pos: [-5,  3, valueZ],     state: 'active' },
    { id: 'hub-intel',    label: 'INTELLIGENCE', pos: [ 5,  3, valueZ - 0.6], state: 'run' },
    { id: 'hub-infra',    label: 'INFRA',        pos: [-5, -3, valueZ - 0.2], state: 'live' },
    { id: 'hub-ops',      label: 'OPS',          pos: [ 5, -3, valueZ + 0.4], state: 'live' },
  ]
  hubs.forEach((h) => {
    nodes.push({
      ...h,
      type: 'node',
      meta: 'cluster.hub',
      tag: h.label,
      labelPlacement: h.pos[1] > 0 ? 'top' : 'bottom',
      sonar: true,
      actStart: 0.42,
      actEnd: 0.62,
    })
  })

  const valueSats = [
    { hub: 'hub-product', label: 'Web',       meta: 'SaaS · Portales',      pos: [-7.5,  4.8, valueZ + 0.5],  state: 'active', placement: 'left' },
    { hub: 'hub-product', label: 'Móvil',     meta: 'iOS · Android',        pos: [-7.6,  1.5, valueZ - 0.3],  state: 'live',   placement: 'left' },
    { hub: 'hub-product', label: 'Dash',      meta: 'BI · KPIs',            pos: [-2.8,  5.0, valueZ + 0.4],  state: 'live',   placement: 'top' },
    { hub: 'hub-intel',   label: 'AI',        meta: 'Workflows',            pos: [ 2.6,  5.0, valueZ - 0.5],  state: 'run',    placement: 'top' },
    { hub: 'hub-intel',   label: 'Agents',    meta: 'Reglas · memoria',     pos: [ 7.6,  4.4, valueZ + 0.4],  state: 'run',    placement: 'right' },
    { hub: 'hub-infra',   label: 'Backend',   meta: 'Postgres · Redis',     pos: [-2.6, -5.2, valueZ - 0.4],  state: 'live',   placement: 'bottom' },
    { hub: 'hub-infra',   label: 'Fintech',   meta: 'Pagos · Auth',         pos: [-7.6, -1.6, valueZ + 0.3],  state: 'active', placement: 'left' },
    { hub: 'hub-infra',   label: 'Security',  meta: 'Hardening',            pos: [-2.4, -2.0, valueZ + 0.6],  state: 'warn',   placement: 'bottom' },
    { hub: 'hub-ops',     label: 'Messaging', meta: 'Realtime',             pos: [ 7.6, -1.5, valueZ - 0.4],  state: 'run',    placement: 'right' },
    { hub: 'hub-ops',     label: 'Ecommerce', meta: 'Ventas · Stock',       pos: [ 2.6, -5.2, valueZ + 0.4],  state: 'live',   placement: 'bottom' },
  ]
  valueSats.forEach((s, i) => {
    const id = `value-sat-${i}`
    nodes.push({
      id, type: 'node', pos: s.pos, label: s.label, meta: s.meta, state: s.state,
      labelPlacement: s.placement,
      actStart: 0.45,
      actEnd: 0.62,
    })
    edges.push({ from: s.hub, to: id, opacity: 0.45, strong: true })
  })
  // hub mesh
  edges.push({ from: 'hub-product', to: 'hub-intel', opacity: 0.5, strong: true })
  edges.push({ from: 'hub-intel',   to: 'hub-ops',   opacity: 0.5, strong: true })
  edges.push({ from: 'hub-ops',     to: 'hub-infra', opacity: 0.5, strong: true })
  edges.push({ from: 'hub-infra',   to: 'hub-product', opacity: 0.5, strong: true })
  edges.push({ from: 'hub-product', to: 'hub-ops',   opacity: 0.18 })
  edges.push({ from: 'hub-intel',   to: 'hub-infra', opacity: 0.18 })

  flows.push({ from: 'hub-product', to: 'hub-intel', color: '#38BDF8', delay: 0.3, duration: 3.2 })
  flows.push({ from: 'hub-intel',   to: 'hub-ops',   color: '#2DE2C5', delay: 1.0, duration: 3.0 })
  flows.push({ from: 'hub-ops',     to: 'hub-infra', color: '#22D39A', delay: 1.7, duration: 3.0 })
  flows.push({ from: 'hub-infra',   to: 'hub-product', color: '#2DE2C5', delay: 2.4, duration: 3.2 })

  // micros filling space between value hubs
  for (let i = 0; i < 14; i++) {
    nodes.push({
      id: `value-m-${i}`,
      type: 'micro',
      pos: [(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 6, valueZ + (Math.random() - 0.5) * 1.5],
      state: i % 3 === 0 ? 'run' : i % 3 === 1 ? 'active' : 'live',
      actStart: 0.42,
      actEnd: 0.62,
    })
  }

  // ---------- TRANSITION 3 → 4: tight beam pulling toward AI core ----------
  for (let i = 0; i < 10; i++) {
    nodes.push({
      id: `t3-m-${i}`,
      type: 'micro',
      pos: [Math.sin(i * 0.7) * 2, Math.cos(i * 0.7) * 2, -52 - i * 1.4],
      state: i % 2 === 0 ? 'run' : 'active',
      actStart: 0.55,
      actEnd: 0.75,
    })
  }

  // ---------- ACT 4: Intelligence (AI flow) — directional swarm ----------
  const aiZ = -66
  nodes.push({
    id: 'ai-core',
    type: 'core',
    pos: [0, 0, aiZ],
    label: 'AI · CORE',
    meta: 'agent loop',
    state: 'active',
    fixed: true,
    actStart: 0.62,
    actEnd: 0.85,
  })
  const aiNodes = [
    { id: 'ai-input',   label: 'Input',    meta: 'docs · APIs',         pos: [-7,   0,   aiZ],       state: 'active', placement: 'left' },
    { id: 'ai-memory',  label: 'Memory',   meta: 'contexto',            pos: [ 0,   3.4, aiZ - 0.5], state: 'run',    placement: 'top' },
    { id: 'ai-tools',   label: 'Tools',    meta: 'APIs · funciones',    pos: [ 0,  -3.4, aiZ + 0.5], state: 'run',    placement: 'bottom' },
    { id: 'ai-context', label: 'Context',  meta: 'reglas',              pos: [-3.6, 2.6, aiZ + 0.6], state: 'idle',   placement: 'top' },
    { id: 'ai-human',   label: 'Human',    meta: 'aprobación',          pos: [ 4,   2.8, aiZ - 0.4], state: 'warn',   placement: 'top' },
    { id: 'ai-auto',    label: 'Auto',     meta: 'confianza > 0.9',     pos: [ 4,  -2.8, aiZ + 0.4], state: 'run',    placement: 'bottom' },
    { id: 'ai-report',  label: 'Report',   meta: 'slack · email',       pos: [ 7.5, 2.8, aiZ - 0.6], state: 'live',   placement: 'right' },
    { id: 'ai-trigger', label: 'Trigger',  meta: 'API · webhook',       pos: [ 7.5,-2.8, aiZ + 0.6], state: 'live',   placement: 'right' },
  ]
  aiNodes.forEach((n) => {
    nodes.push({
      type: 'node',
      pos: n.pos,
      label: n.label,
      meta: n.meta,
      state: n.state,
      labelPlacement: n.placement,
      id: n.id,
      actStart: 0.65,
      actEnd: 0.85,
    })
  })
  edges.push({ from: 'ai-input',   to: 'ai-core',   strong: true,  opacity: 0.7 })
  edges.push({ from: 'ai-core',    to: 'ai-human',  opacity: 0.55 })
  edges.push({ from: 'ai-core',    to: 'ai-auto',   opacity: 0.55 })
  edges.push({ from: 'ai-human',   to: 'ai-report', strong: true, opacity: 0.6 })
  edges.push({ from: 'ai-auto',    to: 'ai-trigger',strong: true, opacity: 0.6 })
  edges.push({ from: 'ai-memory',  to: 'ai-core',   opacity: 0.4, color: '#38BDF8', dashed: true })
  edges.push({ from: 'ai-tools',   to: 'ai-core',   opacity: 0.4, color: '#38BDF8', dashed: true })
  edges.push({ from: 'ai-context', to: 'ai-core',   opacity: 0.32, color: '#A8B3C1', dashed: true })

  flows.push({ from: 'ai-input', to: 'ai-core',     duration: 2.2 })
  flows.push({ from: 'ai-core',  to: 'ai-human',    delay: 1.0, duration: 2.4, color: '#38BDF8' })
  flows.push({ from: 'ai-core',  to: 'ai-auto',     delay: 1.8, duration: 2.4 })
  flows.push({ from: 'ai-human', to: 'ai-report',   delay: 3.2, duration: 2.0, color: '#22D39A' })
  flows.push({ from: 'ai-auto',  to: 'ai-trigger',  delay: 3.8, duration: 2.0, color: '#22D39A' })
  flows.push({ from: 'ai-memory',to: 'ai-core',     delay: 1.4, duration: 2.6, color: '#38BDF8' })

  for (let i = 0; i < 10; i++) {
    const a = i * 0.628
    nodes.push({
      id: `ai-m-${i}`,
      type: 'micro',
      pos: [Math.cos(a) * 2.4, Math.sin(a) * 2, aiZ + Math.sin(a*2) * 0.8],
      state: i % 3 === 0 ? 'active' : i % 3 === 1 ? 'run' : 'live',
      actStart: 0.62,
      actEnd: 0.85,
    })
  }

  // ---------- ACT 5: Horizon — outward expanding ring of micros ----------
  const finalZ = -90
  for (let i = 0; i < 28; i++) {
    const a = i * (2 * Math.PI / 28)
    const r = 8 + (i % 4) * 0.6
    nodes.push({
      id: `final-m-${i}`,
      type: 'micro',
      pos: [Math.cos(a) * r, Math.sin(a) * r * 0.7, finalZ + Math.sin(a * 3) * 1.8],
      state: i % 3 === 0 ? 'active' : i % 3 === 1 ? 'run' : 'live',
      actStart: 0.85,
      actEnd: 1,
    })
  }
  // central beacon
  nodes.push({
    id: 'final-beacon',
    type: 'node',
    pos: [0, 0, finalZ],
    label: 'NEXT · STEP',
    meta: 'agenda · contacto',
    state: 'active',
    fixed: true,
    actStart: 0.88,
    actEnd: 1,
    labelPlacement: 'bottom',
    sonar: true,
  })

  return { nodes, edges, flows }
}

// =============================================================================
// MESH PRIMITIVES
// =============================================================================

function NodeMesh({ node, color, opacityRef }) {
  const { type = 'node', label, meta, tag, labelPlacement = 'right', sonar = true } = node
  const isCore  = type === 'core'
  const isMicro = type === 'micro'
  const size = isCore ? 1.4 : isMicro ? 0.18 : 0.55
  const segments = isCore ? 1 : 0

  const innerRef = useRef()
  const sonarRef = useRef()
  const dotRef   = useRef()
  const meshRef  = useRef()
  const outerRef = useRef()
  const torusARef = useRef()
  const torusBRef = useRef()
  const lightRef = useRef()
  const labelRef = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const op = opacityRef.current
    if (innerRef.current) {
      innerRef.current.rotation.x = t * 0.18
      innerRef.current.rotation.y = t * 0.24
    }
    if (sonarRef.current && !isMicro) {
      const cycle = (t * 0.42) % 1
      sonarRef.current.scale.setScalar(1 + cycle * 2.4)
      sonarRef.current.material.opacity = 0.5 * (1 - cycle) * op
    }
    if (dotRef.current) {
      const pulse = 0.65 + Math.sin(t * 2.8) * 0.35
      dotRef.current.material.opacity = pulse * op
    }
    if (meshRef.current) meshRef.current.material.opacity = (isMicro ? 0.45 : 0.85) * op
    if (outerRef.current) outerRef.current.material.opacity = 0.55 * op
    if (torusARef.current) torusARef.current.material.opacity = 0.35 * op
    if (torusBRef.current) torusBRef.current.material.opacity = 0.22 * op
    if (lightRef.current) lightRef.current.intensity = (isCore ? 1.4 : 0.45) * op
    if (labelRef.current) labelRef.current.style.opacity = String(op)
  })

  const labelOffset = useMemo(() => {
    const r = size + 0.5
    if (labelPlacement === 'right')  return { x: r, y: 0,    a: 'left' }
    if (labelPlacement === 'left')   return { x: -r, y: 0,   a: 'right' }
    if (labelPlacement === 'top')    return { x: 0,  y: r,   a: 'center' }
    if (labelPlacement === 'bottom') return { x: 0,  y: -r,  a: 'center' }
    return { x: r, y: 0, a: 'left' }
  }, [labelPlacement, size])

  return (
    <group>
      {!isMicro && (
        <pointLight ref={lightRef} color={color} intensity={0} distance={isCore ? 8 : 3.5} decay={2} />
      )}

      <mesh ref={(el) => { innerRef.current = el; meshRef.current = el }}>
        <octahedronGeometry args={[size, segments]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0} />
      </mesh>

      {!isMicro && (
        <mesh ref={outerRef}>
          <octahedronGeometry args={[size * 0.55, 0]} />
          <meshBasicMaterial color={color} wireframe transparent opacity={0} />
        </mesh>
      )}

      <mesh ref={dotRef}>
        <sphereGeometry args={[isMicro ? 0.06 : isCore ? 0.18 : 0.11, 12, 12]} />
        <meshBasicMaterial color={color} transparent opacity={0} />
      </mesh>

      {sonar && !isMicro && (
        <mesh ref={sonarRef} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[size + 0.05, size + 0.1, 48]} />
          <meshBasicMaterial color={color} transparent opacity={0} side={THREE.DoubleSide} />
        </mesh>
      )}

      {isCore && (
        <>
          <mesh ref={torusARef} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[size + 0.6, 0.012, 8, 96]} />
            <meshBasicMaterial color="#2DE2C5" transparent opacity={0} />
          </mesh>
          <mesh ref={torusBRef} rotation={[Math.PI / 2, Math.PI / 4, Math.PI / 6]}>
            <torusGeometry args={[size + 1.0, 0.008, 8, 96]} />
            <meshBasicMaterial color="#38BDF8" transparent opacity={0} />
          </mesh>
        </>
      )}

      {(label || meta || tag) && !isMicro && (
        <Html
          position={[labelOffset.x, labelOffset.y, 0]}
          center={labelOffset.a === 'center'}
          style={{
            pointerEvents: 'none',
            transform:
              labelOffset.a === 'left'  ? 'translateX(0)' :
              labelOffset.a === 'right' ? 'translateX(-100%)' :
              'translateX(-50%)',
            whiteSpace: 'nowrap',
            textAlign: labelOffset.a === 'right' ? 'right' :
                       labelOffset.a === 'center' ? 'center' : 'left',
            opacity: 0,
            transition: 'none',
          }}
          distanceFactor={isCore ? 22 : 18}
          zIndexRange={[10, 0]}
        >
          <div ref={labelRef} style={{ lineHeight: 1.15 }}>
            {tag && (
              <div style={{
                color, fontSize: 10, fontFamily: 'var(--font-mono), monospace',
                letterSpacing: '0.18em', opacity: 0.85, marginBottom: 2,
              }}>{tag}</div>
            )}
            {label && (
              <div style={{
                color: '#F4F7FA', fontSize: isCore ? 13 : 12, fontWeight: 600,
                fontFamily: 'var(--font-display), system-ui',
                letterSpacing: isCore ? '0.18em' : '0.02em',
                textShadow: '0 0 12px rgba(0,0,0,0.6)',
              }}>{label}</div>
            )}
            {meta && (
              <div style={{
                color: '#7C8A9C', fontSize: 10, fontFamily: 'var(--font-mono), monospace',
                letterSpacing: '0.06em', marginTop: 2,
              }}>{meta}</div>
            )}
          </div>
        </Html>
      )}
    </group>
  )
}

// =============================================================================
// SCENE
// =============================================================================

function Scene({ modules }) {
  const { nodes, edges, flows } = useMemo(() => buildStoryNodes(modules), [modules])

  const { camera, size } = useThree()
  const cursor = useRef(new THREE.Vector3(9999, 9999, 0))
  const cursorActive = useRef(false)
  const mouseTarget = useRef({ x: 0, y: 0 })
  const cursorPlaneZ = useRef(0)

  // States: positions, velocities, opacity (per-node)
  const stateRef = useRef(null)
  const idIdxRef = useRef(null)
  if (!stateRef.current || stateRef.current.length !== nodes.length) {
    stateRef.current = nodes.map((n) => ({
      base: new THREE.Vector3(...n.pos),
      pos:  new THREE.Vector3(...n.pos),
      vel:  new THREE.Vector3(0, 0, 0),
      seed: Math.random() * 1000,
      fixed: n.fixed === true || n.type === 'core',
      type: n.type || 'node',
      actStart: n.actStart ?? 0,
      actEnd: n.actEnd ?? 1,
      opacity: { current: 0 },
    }))
    idIdxRef.current = new Map(nodes.map((n, i) => [n.id ?? `n${i}`, i]))
  }
  const states = stateRef.current
  const idIdx = idIdxRef.current

  const groupRefs = useRef([])
  const edgeRefs = useRef([])

  const story = useScrollStory()

  // pointer plane intersection at camera's focus z
  const handlePointerMove = (e) => {
    if (!e || !e.target) return
    const rect = e.target.getBoundingClientRect ? e.target.getBoundingClientRect() : { left: 0, top: 0, width: size.width, height: size.height }
    const ndcX = ((e.clientX - rect.left) / rect.width)  * 2 - 1
    const ndcY = -((e.clientY - rect.top) / rect.height) * 2 + 1
    mouseTarget.current = { x: ndcX, y: ndcY }
    cursorActive.current = true
  }

  const handlePointerLeave = () => {
    cursorActive.current = false
  }

  useEffect(() => {
    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerleave', handlePointerLeave)
    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerleave', handlePointerLeave)
    }
  }, [])

  useFrame((state, dtRaw) => {
    const dt = Math.min(0.05, dtRaw)
    const t = state.clock.elapsedTime

    // ===== Camera path driven by scroll progress =====
    const p = story.getProgress ? story.getProgress() : 0  // 0..1
    const segs = CAM_PATH.length - 1
    const scaled = p * segs
    const i0 = Math.min(segs - 1, Math.floor(scaled))
    const f = scaled - i0
    const ease = f < 0.5 ? 2 * f * f : 1 - Math.pow(-2 * f + 2, 2) / 2
    const a = CAM_PATH[i0]
    const b = CAM_PATH[i0 + 1]
    const camZ = a.z + (b.z - a.z) * ease
    const camY = a.y + (b.y - a.y) * ease
    const lookZ = a.look.z + (b.look.z - a.look.z) * ease

    camera.position.x += (mouseTarget.current.x * 1.5 - camera.position.x) * 0.06
    camera.position.y += (camY + mouseTarget.current.y * 0.6 - camera.position.y) * 0.08
    camera.position.z += (camZ - camera.position.z) * 0.08
    camera.lookAt(0, 0, lookZ)

    cursorPlaneZ.current = lookZ

    // unproject the mouse to a plane at lookZ, then store world point as cursor
    if (cursorActive.current) {
      const v = new THREE.Vector3(mouseTarget.current.x, mouseTarget.current.y, 0.5).unproject(camera)
      const dir = v.sub(camera.position).normalize()
      const distance = (lookZ - camera.position.z) / dir.z
      const world = camera.position.clone().add(dir.multiplyScalar(distance))
      cursor.current.copy(world)
    }

    // ===== Per-node update =====
    for (let i = 0; i < states.length; i++) {
      const s = states[i]
      const isMicro = s.type === 'micro'

      // opacity by "act window" — ease in/out around node lifetime
      const span = s.actEnd - s.actStart
      const local = span > 0 ? (p - s.actStart) / span : 0
      let visible = 1
      if (local < 0 || local > 1) visible = 0
      else if (local < 0.15) visible = local / 0.15
      else if (local > 0.85) visible = (1 - local) / 0.15
      else visible = 1
      s.opacity.current += (visible - s.opacity.current) * 0.12

      // Wander (idle) motion
      const wAmp = s.fixed ? 0.04 : isMicro ? 0.55 : 0.28
      const wSpd = s.fixed ? 0.25 : isMicro ? 0.7  : 0.5
      const wx = Math.sin(t * wSpd + s.seed * 0.013) * wAmp
      const wy = Math.cos(t * wSpd * 1.07 + s.seed * 0.011) * wAmp
      const wz = Math.sin(t * wSpd * 0.83 + s.seed * 0.017) * wAmp * 0.6

      const tx = s.base.x + wx
      const ty = s.base.y + wy
      const tz = s.base.z + wz

      const stiffness = s.fixed ? 18 : isMicro ? 6 : 8
      const damping   = s.fixed ? 7  : 4

      let fx = (tx - s.pos.x) * stiffness
      let fy = (ty - s.pos.y) * stiffness
      let fz = (tz - s.pos.z) * stiffness

      // Cursor repulsion (only if node is near current focus plane)
      if (cursorActive.current && !s.fixed) {
        const zNear = Math.abs(s.pos.z - cursorPlaneZ.current) < 6
        if (zNear) {
          const ddx = s.pos.x - cursor.current.x
          const ddy = s.pos.y - cursor.current.y
          const d2 = ddx * ddx + ddy * ddy
          const R = isMicro ? 2.4 : 3.6
          if (d2 < R * R && d2 > 0.04) {
            const d = Math.sqrt(d2)
            const k = 1 - d / R
            const power = isMicro ? 28 : 42
            fx += (ddx / d) * k * power
            fy += (ddy / d) * k * power
            fz += k * (isMicro ? 4 : 7)
          }
        }
      }

      fx -= s.vel.x * damping
      fy -= s.vel.y * damping
      fz -= s.vel.z * damping

      s.vel.x += fx * dt
      s.vel.y += fy * dt
      s.vel.z += fz * dt
      s.pos.x += s.vel.x * dt
      s.pos.y += s.vel.y * dt
      s.pos.z += s.vel.z * dt

      const ref = groupRefs.current[i]
      if (ref) ref.position.copy(s.pos)
    }

    // ===== Edges =====
    for (let i = 0; i < edges.length; i++) {
      const e = edges[i]
      const ai = idIdx.get(e.from)
      const bi = idIdx.get(e.to)
      if (ai == null || bi == null) continue
      const ref = edgeRefs.current[i]
      if (!ref || !ref.geometry) continue
      const a = states[ai].pos
      const b = states[bi].pos
      const positions = ref.geometry.attributes.position
      if (positions) {
        positions.array[0] = a.x; positions.array[1] = a.y; positions.array[2] = a.z
        positions.array[3] = b.x; positions.array[4] = b.y; positions.array[5] = b.z
        positions.needsUpdate = true
      }
      const visible = Math.min(states[ai].opacity.current, states[bi].opacity.current)
      ref.material.opacity = (e.opacity ?? 0.4) * visible
    }
  })

  return (
    <>
      <ambientLight intensity={0.35} />
      <fog attach="fog" args={['#070A0F', 14, 42]} />

      {/* Edges */}
      {edges.map((e, i) => {
        const ai = idIdx.get(e.from)
        const bi = idIdx.get(e.to)
        if (ai == null || bi == null) return null
        const a = states[ai].pos
        const b = states[bi].pos
        return (
          <line
            key={`e-${i}`}
            ref={(el) => (edgeRefs.current[i] = el)}
          >
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([a.x, a.y, a.z, b.x, b.y, b.z])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial
              color={e.color || '#2DE2C5'}
              transparent
              opacity={0}
            />
          </line>
        )
      })}

      {/* Flow particles */}
      {flows.map((p, i) => (
        <FlowParticle key={`f-${i}`} flow={p} states={states} idIdx={idIdx} />
      ))}

      {/* Nodes */}
      {nodes.map((n, i) => {
        const color = STATE_COLORS[n.state] || STATE_COLORS.active
        return (
          <group
            key={n.id ?? i}
            ref={(el) => (groupRefs.current[i] = el)}
            position={n.pos}
          >
            <NodeMesh node={n} color={color} opacityRef={states[i].opacity} />
          </group>
        )
      })}
    </>
  )
}

function FlowParticle({ flow, states, idIdx }) {
  const ref = useRef()
  const ai = idIdx.get(flow.from)
  const bi = idIdx.get(flow.to)
  const phaseRef = useRef(-(flow.delay || 0))

  useFrame((state, dt) => {
    if (!ref.current || ai == null || bi == null) return
    phaseRef.current += dt / (flow.duration || 2.4)
    if (phaseRef.current > 1) phaseRef.current -= 1.2
    const p = phaseRef.current
    const a = states[ai].pos
    const b = states[bi].pos
    const visibility = Math.min(states[ai].opacity.current, states[bi].opacity.current)
    if (p < 0 || p > 1 || visibility < 0.1) {
      ref.current.material.opacity = 0
      return
    }
    ref.current.position.set(
      a.x + (b.x - a.x) * p,
      a.y + (b.y - a.y) * p,
      a.z + (b.z - a.z) * p,
    )
    const fade = p < 0.1 ? p / 0.1 : p > 0.85 ? (1 - p) / 0.15 : 1
    ref.current.material.opacity = 0.95 * fade * visibility
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.07, 10, 10]} />
      <meshBasicMaterial color={flow.color || '#2DE2C5'} transparent opacity={0} />
    </mesh>
  )
}

// =============================================================================
// EXPORT — fixed full-screen canvas
// =============================================================================

export default function StoryConstellation({ modules }) {
  const [reduce, setReduce] = useState(false)
  useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduce(m.matches)
    const onChange = () => setReduce(m.matches)
    m.addEventListener?.('change', onChange)
    return () => m.removeEventListener?.('change', onChange)
  }, [])

  if (reduce) return null

  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ background: 'transparent' }}
    >
      <Canvas
        camera={{ position: [0, 0, 12], fov: 52, near: 0.1, far: 200 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.6]}
        style={{ pointerEvents: 'auto' }}
      >
        <Scene modules={modules} />
      </Canvas>
    </div>
  )
}
