'use client'

/**
 * Reusable visual primitives for the fintech service page.
 * All animations are CSS/canvas-2D/React state — no three.js to keep the
 * page lightweight and the bundle small.
 */

import { useEffect, useMemo, useRef, useState } from 'react'
import {
  TrendingUp, TrendingDown, Wifi, ShieldCheck, Lock, Activity,
  ArrowUpRight, ArrowDownRight, Zap,
} from 'lucide-react'

// =============================================================================
// TickerNumber — number that drifts up/down on a interval, sparkline trails it
// =============================================================================
export function TickerNumber({ label, base = 1000, volatility = 0.04, prefix = '', suffix = '', sparkline = true }) {
  const [value, setValue] = useState(base)
  const [history, setHistory] = useState(() => Array.from({ length: 24 }, () => base))

  useEffect(() => {
    const id = setInterval(() => {
      setValue((v) => {
        const drift = (Math.random() - 0.5) * 2 * volatility * base
        const meanReversion = (base - v) * 0.02
        const next = v + drift + meanReversion
        setHistory((h) => [...h.slice(1), next])
        return next
      })
    }, 850)
    return () => clearInterval(id)
  }, [base, volatility])

  const delta = value - base
  const up = delta >= 0

  const min = Math.min(...history)
  const max = Math.max(...history)
  const range = max - min || 1
  const points = history
    .map((v, i) => `${(i / (history.length - 1)) * 100},${100 - ((v - min) / range) * 100}`)
    .join(' ')

  return (
    <div className="rounded-lg border border-white/[0.07] bg-white/[0.015] px-4 py-3 backdrop-blur-sm">
      <p className="mono-label text-fog-500 text-[10px] tracking-[0.18em] mb-1">{label}</p>
      <div className="flex items-baseline gap-2">
        <p className="font-mono text-fog-50 text-[20px] font-medium tabular-nums">
          {prefix}
          {Math.abs(value) > 1000
            ? value.toLocaleString('en-US', { maximumFractionDigits: 0 })
            : value.toFixed(2)}
          {suffix}
        </p>
        <span
          className={`mono-label text-[10px] tracking-[0.16em] flex items-center gap-1 ${
            up ? 'text-signal-green' : 'text-signal-amber'
          }`}
        >
          {up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
          {up ? '+' : ''}
          {((delta / base) * 100).toFixed(1)}%
        </span>
      </div>
      {sparkline && (
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="mt-2 w-full h-8 opacity-80">
          <polyline
            points={points}
            fill="none"
            stroke={up ? '#2DE2C5' : '#F5B544'}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      )}
    </div>
  )
}

// =============================================================================
// TradingTerminal — Bloomberg-style transaction feed
// New rows stream in from the bottom, color-coded by status.
// =============================================================================
export function TradingTerminal({ ops = [], title = 'tx.feed' }) {
  const [feed, setFeed] = useState([])
  const idxRef = useRef(0)

  useEffect(() => {
    if (!ops.length) return
    const push = () => {
      const op = ops[idxRef.current % ops.length]
      idxRef.current++
      const id = Date.now() + Math.random()
      setFeed((f) => [...f.slice(-7), { ...op, id, ts: tsNow() }])
    }
    push()
    const id = setInterval(push, 1100)
    return () => clearInterval(id)
  }, [ops])

  return (
    <div className="rounded-xl border border-white/[0.07] bg-[rgba(8,12,18,0.7)] backdrop-blur-sm overflow-hidden">
      {/* terminal header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <span className="status-dot run" />
          <p className="mono-label text-fog-400 text-[10px] tracking-[0.22em]">{title}</p>
        </div>
        <div className="flex items-center gap-3">
          <p className="mono-label text-fog-500 text-[10px] tracking-[0.18em] flex items-center gap-1.5">
            <Wifi size={10} className="text-signal-green" />
            <span className="text-signal-green">LIVE</span>
          </p>
          <p className="mono-label text-fog-500 text-[10px] tracking-[0.18em]">
            {feed.length} / {ops.length}
          </p>
        </div>
      </div>

      {/* table head */}
      <div className="grid grid-cols-[60px_100px_1fr_70px_70px_50px] gap-2 px-4 py-2 mono-label text-fog-600 text-[9px] tracking-[0.18em] border-b border-white/[0.04]">
        <span>TYPE</span>
        <span>OP</span>
        <span>AMOUNT</span>
        <span>CCY</span>
        <span>STATUS</span>
        <span className="text-right">MS</span>
      </div>

      {/* rows */}
      <div className="px-4 py-2 space-y-1 font-mono text-[12px] min-h-[260px]">
        {feed.map((row, i) => {
          const fade = Math.max(0.4, (i + 1) / feed.length)
          const statusColor =
            row.status === 'OK'
              ? 'text-signal-green'
              : row.status === 'PENDING'
              ? 'text-signal-amber'
              : 'text-signal-red'
          return (
            <div
              key={row.id}
              className="grid grid-cols-[60px_100px_1fr_70px_70px_50px] gap-2 items-center animate-[txFade_0.4s_ease-out]"
              style={{ opacity: fade }}
            >
              <span className="mono-label text-fog-500 text-[10px] tracking-[0.14em]">{row.code}</span>
              <span className="text-fog-200 truncate">{row.op}</span>
              <span className="text-fog-50 tabular-nums truncate">{row.amount}</span>
              <span className="text-fog-400 text-[11px]">{row.currency}</span>
              <span className={`${statusColor} text-[11px] mono-label tracking-[0.12em]`}>{row.status}</span>
              <span className="text-fog-500 text-[10px] text-right tabular-nums">{row.ms}</span>
            </div>
          )
        })}
      </div>

      <div className="flex items-center justify-between px-4 py-2 border-t border-white/[0.06] mono-label text-fog-500 text-[9px] tracking-[0.18em]">
        <span className="flex items-center gap-1.5">
          <Activity size={10} className="text-accent" />
          <span>tps · 4.2</span>
        </span>
        <span>seq · {idxRef.current.toString().padStart(6, '0')}</span>
      </div>

      <style jsx global>{`
        @keyframes txFade {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

function tsNow() {
  const d = new Date(2026, 4, 15, 14, 32, 0)
  return d.toTimeString().slice(0, 8)
}

// =============================================================================
// CreditCard3D — rotating card with state badge pulsing
// CSS-only 3D transform; cycles through the provided states.
// =============================================================================
export function CreditCard3D({ states = ['ACTIVE'], holderName = 'JANE DOE', cardNumber = '4291 8842 3107 0244' }) {
  const [stateIdx, setStateIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)

  useEffect(() => {
    if (states.length < 2) return
    const id = setInterval(() => {
      setStateIdx((i) => (i + 1) % states.length)
    }, 2200)
    return () => clearInterval(id)
  }, [states.length])

  const stateColor = {
    ACTIVE: 'text-signal-green border-signal-green/40 bg-signal-green/10',
    PENDING: 'text-signal-amber border-signal-amber/40 bg-signal-amber/10',
    RENEWED: 'text-accent border-accent/40 bg-accent/10',
    BLOCKED: 'text-signal-red border-signal-red/40 bg-signal-red/10',
  }[states[stateIdx]] || 'text-fog-300 border-white/10 bg-white/[0.03]'

  const masked = cardNumber.split(' ')
  const visibleLast4 = masked[masked.length - 1]

  return (
    <div className="relative w-full max-w-[420px] mx-auto" style={{ perspective: '1200px' }}>
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        className="block w-full aspect-[16/10] relative cursor-pointer"
        style={{ transformStyle: 'preserve-3d', transition: 'transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
        aria-label="Flip card"
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 rounded-2xl p-6 flex flex-col justify-between overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            background:
              'linear-gradient(135deg, #0d1620 0%, #18242f 55%, #0d1620 100%)',
            boxShadow:
              '0 20px 50px -20px rgba(0,0,0,0.7), 0 1px 0 rgba(255,255,255,0.06) inset',
            border: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          {/* shimmer overlay */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at 30% 20%, rgba(45,226,197,0.18), transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(56,189,248,0.12), transparent 60%)',
            }}
          />

          <div className="relative flex items-start justify-between">
            <div>
              <p className="mono-label text-fog-500 text-[10px] tracking-[0.22em]">era · digital</p>
              <p className="mono-label text-accent text-[9px] tracking-[0.22em] mt-0.5">PLATINUM</p>
            </div>
            <span className={`mono-label text-[10px] tracking-[0.18em] px-2 py-1 rounded-full border ${stateColor} transition-colors duration-500`}>
              {states[stateIdx]}
            </span>
          </div>

          {/* chip */}
          <div className="relative w-12 h-9 rounded-md border border-accent/40 bg-gradient-to-br from-accent/30 to-accent/5 mt-2">
            <div className="absolute inset-1.5 grid grid-cols-3 grid-rows-3 gap-0.5">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="bg-accent/30 rounded-[1px]" />
              ))}
            </div>
          </div>

          <div className="relative">
            <p className="font-mono text-fog-50 text-[18px] sm:text-[20px] tracking-[0.18em] tabular-nums">
              {cardNumber}
            </p>
            <div className="flex justify-between mt-3 mono-label text-fog-400 text-[10px] tracking-[0.14em]">
              <span>{holderName}</span>
              <span>EXP 12/28</span>
            </div>
          </div>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: 'linear-gradient(135deg, #0d1620 0%, #18242f 55%, #0d1620 100%)',
            border: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <div className="h-10 bg-black/60 mt-6" />
          <div className="p-6 mt-2 flex items-center gap-3">
            <div className="flex-1 h-9 rounded bg-white/[0.06] flex items-center justify-end pr-3">
              <span className="font-mono text-fog-200 text-[14px] tracking-[0.18em]">•••</span>
            </div>
            <span className="font-mono text-fog-50 text-[14px] tracking-[0.18em]">427</span>
          </div>
          <p className="px-6 mono-label text-fog-500 text-[9px] tracking-[0.18em] mt-2">
            issued by · era digital · pci-aware
          </p>
        </div>
      </button>

      <p className="mono-label text-fog-500 text-[10px] tracking-[0.18em] mt-3 text-center flex items-center justify-center gap-2">
        <span className="status-dot run" />
        click · flip · last4 · {visibleLast4}
      </p>
    </div>
  )
}

// =============================================================================
// FlowDiagram — animated SVG with nodes + traveling data particles
// Pure SVG (no canvas, no three.js). Connections defined in `edges` prop.
// =============================================================================
export function FlowDiagram({ nodes = [], edges = [] }) {
  // node positions on a 1000x600 viewport — pre-computed for clean layout
  // Caller passes nodes by id; we'll lay them out in a structured grid here.
  const layout = useMemo(() => {
    const positions = {
      client:    { x: 80,  y: 110 },
      app:       { x: 280, y: 110 },
      gateway:   { x: 500, y: 200 },
      core:      { x: 720, y: 90 },
      processor: { x: 720, y: 200 },
      i2c:       { x: 720, y: 310 },
      salesforce:{ x: 280, y: 360 },
      audit:     { x: 500, y: 480 },
    }
    return positions
  }, [])

  const [pulse, setPulse] = useState(0)
  useEffect(() => {
    let raf = 0
    let last = performance.now()
    const tick = (now) => {
      const dt = (now - last) / 1000
      last = now
      setPulse((p) => (p + dt * 0.4) % 1)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className="rounded-xl border border-white/[0.07] bg-[rgba(8,12,18,0.5)] backdrop-blur-sm overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <span className="status-dot run" />
          <p className="mono-label text-fog-400 text-[10px] tracking-[0.22em]">arch.flow</p>
        </div>
        <p className="mono-label text-fog-500 text-[10px] tracking-[0.18em]">
          {nodes.length} nodes · {edges.length} routes
        </p>
      </div>

      <svg viewBox="0 0 800 540" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
        {/* dotted grid */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="0.5" cy="0.5" r="0.5" fill="rgba(255,255,255,0.08)" />
          </pattern>
        </defs>
        <rect width="800" height="540" fill="url(#grid)" opacity="0.6" />

        {/* edges */}
        {edges.map((edge, i) => {
          const a = layout[edge.from]
          const b = layout[edge.to]
          if (!a || !b) return null
          const phase = (pulse + i * 0.13) % 1
          const px = a.x + (b.x - a.x) * phase
          const py = a.y + (b.y - a.y) * phase
          return (
            <g key={i}>
              <line
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke="#2DE2C5"
                strokeOpacity="0.18"
                strokeWidth="1"
                strokeDasharray="3 4"
              />
              <circle cx={px} cy={py} r="3" fill="#2DE2C5" filter="url(#glow)" />
            </g>
          )
        })}

        {/* glow filter */}
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* nodes */}
        {nodes.map((node) => {
          const p = layout[node.id]
          if (!p) return null
          return (
            <g key={node.id} transform={`translate(${p.x},${p.y})`}>
              <circle r="22" fill="rgba(13,22,32,0.95)" stroke="rgba(45,226,197,0.4)" strokeWidth="1" />
              <circle r="4" fill="#2DE2C5" filter="url(#glow)" />
              <text
                x="0"
                y="-32"
                textAnchor="middle"
                fill="#F4F7FA"
                fontSize="11"
                fontFamily="var(--font-display), sans-serif"
                fontWeight="600"
              >
                {node.label}
              </text>
              <text
                x="0"
                y="42"
                textAnchor="middle"
                fill="#7C8A9C"
                fontSize="9"
                fontFamily="var(--font-mono), monospace"
                letterSpacing="1.2"
              >
                {node.meta}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

// =============================================================================
// TPKEncryption — animated key icon + scrolling hash blocks
// =============================================================================
export function TPKEncryption() {
  const [blocks, setBlocks] = useState([])
  const idxRef = useRef(0)

  useEffect(() => {
    const gen = () => {
      const chars = '0123456789abcdef'
      let h = ''
      for (let i = 0; i < 32; i++) h += chars[Math.floor(Math.random() * 16)]
      return h
    }
    const push = () => {
      idxRef.current++
      setBlocks((b) => [...b.slice(-9), { id: idxRef.current, hash: gen(), seq: idxRef.current }])
    }
    for (let i = 0; i < 6; i++) push()
    const id = setInterval(push, 720)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="rounded-xl border border-white/[0.07] bg-[rgba(8,12,18,0.5)] backdrop-blur-sm overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <Lock size={11} className="text-accent" />
          <p className="mono-label text-fog-400 text-[10px] tracking-[0.22em]">tpk.stream</p>
        </div>
        <p className="mono-label text-signal-green text-[10px] tracking-[0.18em] flex items-center gap-1.5">
          <ShieldCheck size={10} />
          ENCRYPTED
        </p>
      </div>

      <div className="grid grid-cols-[140px_1fr] gap-4 p-5 items-center">
        {/* key icon area */}
        <div className="relative aspect-square flex items-center justify-center">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(45,226,197,0.2), transparent 60%)',
              animation: 'tpkPulse 2.4s ease-in-out infinite',
            }}
          />
          <svg viewBox="0 0 100 100" className="relative w-20 h-20" style={{ animation: 'tpkRotate 8s linear infinite' }}>
            <circle cx="35" cy="50" r="18" fill="none" stroke="#2DE2C5" strokeWidth="2" />
            <circle cx="35" cy="50" r="6" fill="#2DE2C5" />
            <rect x="50" y="46" width="38" height="8" fill="#2DE2C5" />
            <rect x="78" y="46" width="6" height="14" fill="#2DE2C5" />
            <rect x="68" y="46" width="6" height="10" fill="#2DE2C5" />
          </svg>
        </div>

        {/* hash blocks */}
        <div className="space-y-1 font-mono text-[11px]">
          {blocks.map((b, i) => {
            const fade = Math.max(0.3, (i + 1) / blocks.length)
            return (
              <div
                key={b.id}
                className="flex items-center gap-2 animate-[tpkFade_0.4s_ease-out]"
                style={{ opacity: fade }}
              >
                <span className="mono-label text-fog-600 text-[9px] tracking-[0.14em] w-12 shrink-0">
                  #{b.seq.toString(16).padStart(4, '0')}
                </span>
                <span className="text-accent truncate">{b.hash}</span>
                <span className="mono-label text-signal-green text-[9px] tracking-[0.12em] shrink-0">OK</span>
              </div>
            )
          })}
        </div>
      </div>

      <style jsx global>{`
        @keyframes tpkPulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.08); }
        }
        @keyframes tpkRotate {
          to { transform: rotate(360deg); }
        }
        @keyframes tpkFade {
          from { opacity: 0; transform: translateX(-6px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  )
}

// =============================================================================
// BackOfficeMock — interactive tabs with rows
// =============================================================================
export function BackOfficeMock({ tabs = [] }) {
  const [activeId, setActiveId] = useState(tabs[0]?.id || null)
  const active = tabs.find((t) => t.id === activeId) || tabs[0]
  if (!active) return null

  return (
    <div className="rounded-xl border border-white/[0.07] bg-[rgba(8,12,18,0.6)] backdrop-blur-sm overflow-hidden">
      {/* window chrome */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.06]">
        <span className="w-2.5 h-2.5 rounded-full bg-fog-500/30" />
        <span className="w-2.5 h-2.5 rounded-full bg-fog-500/30" />
        <span className="w-2.5 h-2.5 rounded-full bg-fog-500/30" />
        <p className="ml-3 mono-label text-fog-500 text-[10px] tracking-[0.18em]">
          backoffice.era · v2026.5
        </p>
        <div className="ml-auto flex items-center gap-2">
          <span className="status-dot live" />
          <p className="mono-label text-signal-green text-[9px] tracking-[0.18em]">CONNECTED</p>
        </div>
      </div>

      {/* tabs */}
      <div className="flex border-b border-white/[0.05]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveId(tab.id)}
            className={`relative px-4 py-2.5 mono-label text-[10px] tracking-[0.18em] transition-colors ${
              activeId === tab.id ? 'text-accent' : 'text-fog-500 hover:text-fog-300'
            }`}
          >
            {tab.label}
            <span className={`ml-2 text-[9px] ${activeId === tab.id ? 'text-fog-300' : 'text-fog-600'}`}>
              {tab.count}
            </span>
            {activeId === tab.id && (
              <span className="absolute -bottom-px left-3 right-3 h-px bg-accent" />
            )}
          </button>
        ))}
      </div>

      {/* table */}
      <div className="p-4">
        <div className="grid grid-cols-4 gap-3 mono-label text-fog-600 text-[9px] tracking-[0.18em] pb-2 border-b border-white/[0.05]">
          <span>NAME / ID</span>
          <span>DETAIL</span>
          <span>STATUS</span>
          <span className="text-right">DATE / EXP</span>
        </div>
        <div className="space-y-1 mt-1">
          {active.rows.map((row, i) => {
            const status = row.col3
            const statusColor =
              status === 'ACTIVE' || status === 'OK' || status === 'RENEWED'
                ? 'text-signal-green'
                : status === 'PENDING'
                ? 'text-signal-amber'
                : 'text-signal-red'
            return (
              <div
                key={i}
                className="grid grid-cols-4 gap-3 py-2 text-[12px] hover:bg-white/[0.02] rounded transition-colors"
              >
                <span className="text-fog-100 truncate font-mono">{row.col1}</span>
                <span className="text-fog-300 truncate">{row.col2}</span>
                <span className={`mono-label text-[10px] tracking-[0.12em] ${statusColor}`}>
                  {row.col3}
                </span>
                <span className="text-fog-500 text-right tabular-nums font-mono text-[11px]">
                  {row.col4}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// =============================================================================
// Architecture stack — 6 vertical layers, each with code/name/meta
// =============================================================================
export function ArchitectureStack({ layers = [] }) {
  const TONE = ['#2DE2C5', '#38BDF8', '#9D8DF1', '#F5B544', '#2DE2C5', '#38BDF8']
  return (
    <div className="rounded-xl border border-white/[0.07] bg-[rgba(8,12,18,0.5)] backdrop-blur-sm overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <Zap size={11} className="text-accent" />
          <p className="mono-label text-fog-400 text-[10px] tracking-[0.22em]">stack.layers</p>
        </div>
        <p className="mono-label text-fog-500 text-[10px] tracking-[0.18em]">
          {layers.length} layers
        </p>
      </div>
      <div className="p-4 space-y-2">
        {layers.map((layer, i) => {
          const tone = TONE[i % TONE.length]
          return (
            <div
              key={layer.code}
              className="group relative rounded-lg border border-white/[0.06] bg-white/[0.015] px-4 py-3 hover:bg-white/[0.04] transition-colors"
            >
              <div
                aria-hidden
                className="absolute left-0 top-2 bottom-2 w-[2px] rounded-full"
                style={{ background: tone, boxShadow: `0 0 12px ${tone}` }}
              />
              <div className="flex items-center gap-3">
                <span
                  className="mono-label text-[10px] tracking-[0.18em] w-7 shrink-0"
                  style={{ color: tone }}
                >
                  {layer.code}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-fog-50 text-[14px] font-medium leading-tight truncate">
                    {layer.name}
                  </p>
                  <p className="mono-label text-fog-500 text-[10px] tracking-[0.12em] mt-0.5 truncate">
                    {layer.meta}
                  </p>
                </div>
                <ArrowDownRight size={11} className="text-fog-600 group-hover:text-accent transition-colors" />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
