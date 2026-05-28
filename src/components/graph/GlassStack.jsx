'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

const ACCENT = '#2DE2C5'
const BLUE = '#38BDF8'
const VIOLET = '#9D8DF1'
const AMBER = '#F5B544'

const TONES = [ACCENT, BLUE, VIOLET, AMBER, ACCENT, BLUE, VIOLET, AMBER, ACCENT, BLUE]

const PLATE_W = 3.6
const PLATE_H = 0.55
const PLATE_D = 0.06

function GlassPlate({ layer, index, total, separation, hovered, setHovered, onPointerCenter }) {
  const groupRef = useRef(null)
  const meshRef = useRef(null)
  const edgeRef = useRef(null)
  const tone = TONES[index % TONES.length]

  // base Y when collapsed: tight spacing. expanded: spread along the column.
  const collapsedGap = 0.12
  const expandedGap = 0.62
  const center = (total - 1) / 2

  useFrame(() => {
    if (!groupRef.current) return
    const gap = THREE.MathUtils.lerp(collapsedGap, expandedGap, separation.current)
    const targetY = (center - index) * gap
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.12

    const isHover = hovered === index
    const targetZ = isHover ? 0.35 : 0
    groupRef.current.position.z += (targetZ - groupRef.current.position.z) * 0.18

    if (meshRef.current) {
      const m = meshRef.current.material
      const targetOp = isHover ? 0.36 : 0.18
      m.opacity += (targetOp - m.opacity) * 0.15
    }
    if (edgeRef.current) {
      const m = edgeRef.current.material
      const targetOp = isHover ? 1.0 : 0.55
      m.opacity += (targetOp - m.opacity) * 0.15
    }
  })

  return (
    <group
      ref={groupRef}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(index)
      }}
      onPointerOut={(e) => {
        e.stopPropagation()
        setHovered((h) => (h === index ? null : h))
      }}
      onPointerDown={(e) => {
        e.stopPropagation()
        onPointerCenter?.()
      }}
    >
      {/* glass body */}
      <mesh ref={meshRef}>
        <boxGeometry args={[PLATE_W, PLATE_H, PLATE_D]} />
        <meshPhysicalMaterial
          color="#0e1620"
          transparent
          opacity={0.18}
          roughness={0.15}
          metalness={0.1}
          transmission={0.6}
          thickness={0.4}
          ior={1.4}
          clearcoat={0.9}
          clearcoatRoughness={0.2}
        />
      </mesh>

      {/* edge line — subtle accent border, brighter on hover */}
      <mesh ref={edgeRef}>
        <boxGeometry args={[PLATE_W + 0.005, PLATE_H + 0.005, PLATE_D + 0.005]} />
        <meshBasicMaterial color={tone} transparent opacity={0.55} wireframe />
      </mesh>

      {/* etched label — code · tag · title · meta */}
      <group position={[0, 0, PLATE_D / 2 + 0.001]}>
        {/* left: code */}
        <Text
          position={[-PLATE_W / 2 + 0.18, 0.08, 0]}
          fontSize={0.11}
          color="#7C8A9C"
          anchorX="left"
          anchorY="middle"
          letterSpacing={0.18}
        >
          {layer.code}
        </Text>
        {/* tag */}
        <Text
          position={[-PLATE_W / 2 + 0.5, 0.08, 0]}
          fontSize={0.1}
          color={tone}
          anchorX="left"
          anchorY="middle"
          letterSpacing={0.22}
        >
          {layer.tag}
        </Text>
        {/* title — main */}
        <Text
          position={[-PLATE_W / 2 + 0.18, -0.1, 0]}
          fontSize={0.14}
          color="#F4F7FA"
          anchorX="left"
          anchorY="middle"
          letterSpacing={-0.01}
          maxWidth={PLATE_W - 0.4}
          font={undefined}
        >
          {layer.title}
        </Text>
      </group>

      {/* right side bar — accent strip */}
      <mesh position={[PLATE_W / 2 - 0.06, 0, PLATE_D / 2 + 0.002]}>
        <planeGeometry args={[0.04, PLATE_H * 0.7]} />
        <meshBasicMaterial color={tone} transparent opacity={0.85} toneMapped={false} />
      </mesh>
    </group>
  )
}

function StackGroup({ layers, separation, dragRotation, autoSpin }) {
  const groupRef = useRef(null)
  const [hovered, setHovered] = useState(null)
  const interactedRef = useRef(false)

  useFrame(() => {
    if (!groupRef.current) return
    // spring toward drag rotation
    const ty = dragRotation.current.y
    const tx = dragRotation.current.x
    if (autoSpin && !interactedRef.current) {
      dragRotation.current.y += 0.0025
    }
    groupRef.current.rotation.y += (ty - groupRef.current.rotation.y) * 0.12
    groupRef.current.rotation.x += (tx - groupRef.current.rotation.x) * 0.12
  })

  return (
    <group ref={groupRef}>
      {layers.map((layer, i) => (
        <GlassPlate
          key={layer.code}
          layer={layer}
          index={i}
          total={layers.length}
          separation={separation}
          hovered={hovered}
          setHovered={setHovered}
          onPointerCenter={() => { interactedRef.current = true }}
        />
      ))}
    </group>
  )
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.55} />
      <pointLight position={[3, 2, 4]} intensity={1.4} color={ACCENT} distance={14} />
      <pointLight position={[-3, -1, 4]} intensity={0.9} color={BLUE} distance={14} />
      <directionalLight position={[2, 4, 3]} intensity={0.4} />
    </>
  )
}

function ScrollSeparation({ scrollProgressRef, separation, reduced }) {
  useFrame(() => {
    const p = scrollProgressRef.current ?? 0
    const target = reduced ? 1 : THREE.MathUtils.clamp((p - 0.15) / 0.45, 0, 1)
    separation.current += (target - separation.current) * 0.08
  })
  return null
}

export default function GlassStack({ layers, scrollProgressRef }) {
  const dragRotation = useRef({ x: 0, y: 0 })
  const separation = useRef(0)
  const interactedRef = useRef(false)
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

  // pointer drag handlers
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    let dragging = false
    let last = { x: 0, y: 0 }

    const onDown = (e) => {
      dragging = true
      interactedRef.current = true
      const p = 'touches' in e ? e.touches[0] : e
      last = { x: p.clientX, y: p.clientY }
      el.style.cursor = 'grabbing'
    }
    const onMove = (e) => {
      if (!dragging) return
      const p = 'touches' in e ? e.touches[0] : e
      const dx = p.clientX - last.x
      const dy = p.clientY - last.y
      last = { x: p.clientX, y: p.clientY }
      dragRotation.current.y += dx * 0.008
      dragRotation.current.x = Math.max(
        -0.6,
        Math.min(0.6, dragRotation.current.x + dy * 0.005),
      )
    }
    const onUp = () => {
      dragging = false
      el.style.cursor = 'grab'
    }

    el.addEventListener('mousedown', onDown)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    el.addEventListener('touchstart', onDown, { passive: true })
    window.addEventListener('touchmove', onMove, { passive: true })
    window.addEventListener('touchend', onUp)
    el.style.cursor = 'grab'

    return () => {
      el.removeEventListener('mousedown', onDown)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
      el.removeEventListener('touchstart', onDown)
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('touchend', onUp)
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
        camera={{ position: [0, 0, 6.4], fov: 42 }}
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <Lights />
        <ScrollSeparation
          scrollProgressRef={scrollProgressRef}
          separation={separation}
          reduced={reduced}
        />
        <StackGroup
          layers={layers}
          separation={separation}
          dragRotation={dragRotation}
          autoSpin={!reduced}
        />
      </Canvas>
    </div>
  )
}
