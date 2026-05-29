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
  // Hydration-safe: server + client first paint both render the static `base`
  // value. We only start animating after mount so the markup matches.
  const [mounted, setMounted] = useState(false)
  const [value, setValue] = useState(base)
  const [history, setHistory] = useState(() => Array.from({ length: 24 }, () => base))

  useEffect(() => {
    setMounted(true)
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

  // While the component hasn't mounted yet (SSR + first client render),
  // render the deterministic base value so server HTML matches client HTML.
  const displayValue = mounted ? value : base
  const displayHistory = mounted ? history : Array.from({ length: 24 }, () => base)

  const delta = displayValue - base
  const up = delta >= 0

  const min = Math.min(...displayHistory)
  const max = Math.max(...displayHistory)
  const range = max - min || 1
  const points = displayHistory
    .map((v, i) => `${(i / (displayHistory.length - 1)) * 100},${100 - ((v - min) / range) * 100}`)
    .join(' ')

  return (
    <div className="rounded-lg border border-white/[0.07] bg-white/[0.015] px-4 py-3 backdrop-blur-sm">
      <p className="mono-label text-fog-500 text-[10px] tracking-[0.18em] mb-1">{label}</p>
      <div className="flex items-baseline gap-2">
        <p className="font-mono text-fog-50 text-[20px] font-medium tabular-nums">
          {prefix}
          {Math.abs(displayValue) > 1000
            ? displayValue.toLocaleString('en-US', { maximumFractionDigits: 0 })
            : displayValue.toFixed(2)}
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
// TradingWall — asymmetric grid of distinct mini-visualizations.
// Each tile uses a different visual language: candlestick, world map, gauge,
// bars, sparkline pulse. Animated independently so the wall feels alive.
// =============================================================================
export function TradingWall() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-[auto_auto] gap-3">
      {/* big candlestick */}
      <div className="md:col-span-7 md:row-span-2">
        <CandlestickChart />
      </div>
      {/* gauge */}
      <div className="md:col-span-5">
        <LatencyGauge />
      </div>
      {/* world heat */}
      <div className="md:col-span-3">
        <WorldHeat />
      </div>
      {/* error pulse */}
      <div className="md:col-span-2">
        <ErrorPulse />
      </div>
    </div>
  )
}

function CandlestickChart() {
  // Hydration-safe: start with a deterministic flat array. We populate the
  // randomized bars only on mount (client only) so server/client HTML match.
  const FLAT_BAR = { open: 80, close: 80, high: 80, low: 80 }
  const [bars, setBars] = useState(() => Array.from({ length: 30 }, () => FLAT_BAR))

  useEffect(() => {
    // seed initial randomized bars after mount
    setBars(() => {
      const arr = []
      let prev = 80
      for (let i = 0; i < 30; i++) {
        const open = prev
        const close = open + (Math.random() - 0.5) * 12
        const high = Math.max(open, close) + Math.random() * 5
        const low = Math.min(open, close) - Math.random() * 5
        arr.push({ open, close, high, low })
        prev = close
      }
      return arr
    })
    const id = setInterval(() => {
      setBars((b) => {
        const last = b[b.length - 1]
        const open = last.close
        const close = open + (Math.random() - 0.5) * 12
        const high = Math.max(open, close) + Math.random() * 5
        const low = Math.min(open, close) - Math.random() * 5
        return [...b.slice(1), { open, close, high, low }]
      })
    }, 1100)
    return () => clearInterval(id)
  }, [])

  const min = Math.min(...bars.map((b) => b.low))
  const max = Math.max(...bars.map((b) => b.high))
  const range = max - min || 1

  return (
    <div className="rounded-xl border border-white/[0.07] bg-[rgba(8,12,18,0.6)] backdrop-blur-sm overflow-hidden h-full">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <span className="status-dot run" />
          <p className="mono-label text-fog-400 text-[10px] tracking-[0.22em]">tx.volume · 24h</p>
        </div>
        <p className="mono-label text-signal-green text-[10px] tracking-[0.18em] tabular-nums">
          $ {(bars[bars.length - 1].close * 50000).toLocaleString('en-US', { maximumFractionDigits: 0 })}
        </p>
      </div>
      <div className="p-4 h-[260px] sm:h-[280px] flex items-end gap-1">
        <svg viewBox="0 0 600 200" preserveAspectRatio="none" className="w-full h-full">
          {bars.map((bar, i) => {
            const x = (i / bars.length) * 600
            const w = 600 / bars.length - 2
            const yHigh = 200 - ((bar.high - min) / range) * 200
            const yLow = 200 - ((bar.low - min) / range) * 200
            const yOpen = 200 - ((bar.open - min) / range) * 200
            const yClose = 200 - ((bar.close - min) / range) * 200
            const up = bar.close >= bar.open
            const color = up ? '#2DE2C5' : '#F5B544'
            return (
              <g key={i}>
                <line x1={x + w / 2} y1={yHigh} x2={x + w / 2} y2={yLow} stroke={color} strokeWidth="0.8" opacity="0.6" />
                <rect
                  x={x}
                  y={Math.min(yOpen, yClose)}
                  width={w}
                  height={Math.max(2, Math.abs(yOpen - yClose))}
                  fill={color}
                  opacity="0.85"
                />
              </g>
            )
          })}
        </svg>
      </div>
      <div className="px-4 py-2 border-t border-white/[0.06] flex items-center justify-between mono-label text-fog-500 text-[9px] tracking-[0.18em]">
        <span>candles · 30 · 5min</span>
        <span className="text-signal-green flex items-center gap-1.5">
          <TrendingUp size={10} /> +2.4%
        </span>
      </div>
    </div>
  )
}

function LatencyGauge() {
  const [val, setVal] = useState(142)
  useEffect(() => {
    const id = setInterval(() => {
      setVal((v) => Math.max(40, Math.min(280, v + (Math.random() - 0.5) * 40)))
    }, 700)
    return () => clearInterval(id)
  }, [])

  // arc settings — 270° arc starting at 135°
  const min = 0, max = 300
  const pct = (val - min) / (max - min)
  const angle = 135 + pct * 270
  const safeColor = val < 200 ? '#2DE2C5' : val < 250 ? '#F5B544' : '#F26B6B'

  // arc path
  const radius = 60
  const cx = 80, cy = 80
  const startA = (135 * Math.PI) / 180
  const endA = (angle * Math.PI) / 180
  const largeArc = pct > 0.5 ? 1 : 0
  const sx = cx + radius * Math.cos(startA)
  const sy = cy + radius * Math.sin(startA)
  const ex = cx + radius * Math.cos(endA)
  const ey = cy + radius * Math.sin(endA)
  const arcPath = `M ${sx} ${sy} A ${radius} ${radius} 0 ${largeArc} 1 ${ex} ${ey}`

  return (
    <div className="rounded-xl border border-white/[0.07] bg-[rgba(8,12,18,0.6)] backdrop-blur-sm overflow-hidden h-full">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <Activity size={11} className="text-accent" />
          <p className="mono-label text-fog-400 text-[10px] tracking-[0.22em]">latency · p95</p>
        </div>
        <p className="mono-label text-fog-500 text-[10px] tracking-[0.18em]">target &lt; 200ms</p>
      </div>
      <div className="p-4 flex items-center gap-4">
        <svg viewBox="0 0 160 130" className="w-32 h-32 shrink-0">
          {/* track */}
          <path
            d={`M ${cx + radius * Math.cos(startA)} ${cy + radius * Math.sin(startA)} A ${radius} ${radius} 0 1 1 ${cx + radius * Math.cos((45 * Math.PI) / 180)} ${cy + radius * Math.sin((45 * Math.PI) / 180)}`}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="6"
            strokeLinecap="round"
          />
          {/* fill */}
          <path d={arcPath} fill="none" stroke={safeColor} strokeWidth="6" strokeLinecap="round" />
          {/* center value */}
          <text
            x="80"
            y="78"
            textAnchor="middle"
            fill={safeColor}
            fontFamily="var(--font-mono), monospace"
            fontSize="22"
            fontWeight="500"
          >
            {Math.round(val)}
          </text>
          <text
            x="80"
            y="96"
            textAnchor="middle"
            fill="#7C8A9C"
            fontFamily="var(--font-mono), monospace"
            fontSize="10"
            letterSpacing="2"
          >
            MS
          </text>
        </svg>
        <div className="flex flex-col gap-1.5 text-[11px] flex-1">
          <RangeRow label="p50" value="78ms" />
          <RangeRow label="p90" value="124ms" />
          <RangeRow label="p95" value={`${Math.round(val)}ms`} active />
          <RangeRow label="p99" value="384ms" />
        </div>
      </div>
    </div>
  )
}

function RangeRow({ label, value, active }) {
  return (
    <div className={`flex items-center justify-between px-2 py-1 rounded ${active ? 'bg-accent/10 border border-accent/20' : ''}`}>
      <span className={`mono-label text-[10px] tracking-[0.16em] ${active ? 'text-accent' : 'text-fog-500'}`}>
        {label}
      </span>
      <span className={`font-mono tabular-nums ${active ? 'text-accent' : 'text-fog-300'}`}>
        {value}
      </span>
    </div>
  )
}

function WorldHeat() {
  // 12 city dots with pulsing intensity
  const cities = [
    { x: 18, y: 38, name: 'NYC' },
    { x: 28, y: 32, name: 'LON' },
    { x: 35, y: 42, name: 'MAD' },
    { x: 50, y: 48, name: 'CAI' },
    { x: 70, y: 38, name: 'TYO' },
    { x: 22, y: 60, name: 'MEX' },
    { x: 42, y: 78, name: 'BUE' },
    { x: 62, y: 60, name: 'SGP' },
    { x: 80, y: 70, name: 'SYD' },
    { x: 56, y: 30, name: 'BLN' },
    { x: 20, y: 48, name: 'BOG' },
    { x: 68, y: 50, name: 'BOM' },
  ]
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 800)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="rounded-xl border border-white/[0.07] bg-[rgba(8,12,18,0.6)] backdrop-blur-sm overflow-hidden h-full">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06]">
        <p className="mono-label text-fog-400 text-[10px] tracking-[0.22em]">geo.live</p>
        <p className="mono-label text-accent text-[10px] tracking-[0.18em] tabular-nums">12 / 124</p>
      </div>
      <div className="p-3 h-[220px] sm:h-[260px] relative">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* abstract grid lat/long lines */}
          <defs>
            <pattern id="latLong" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.3" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#latLong)" />
          {/* dotted continent silhouettes — abstract */}
          <ellipse cx="22" cy="42" rx="14" ry="22" fill="rgba(45,226,197,0.04)" />
          <ellipse cx="50" cy="38" rx="10" ry="18" fill="rgba(45,226,197,0.04)" />
          <ellipse cx="68" cy="42" rx="14" ry="14" fill="rgba(45,226,197,0.04)" />
          <ellipse cx="40" cy="72" rx="10" ry="14" fill="rgba(45,226,197,0.04)" />
          <ellipse cx="78" cy="70" rx="6" ry="6" fill="rgba(45,226,197,0.04)" />

          {/* pulsing cities */}
          {cities.map((c, i) => {
            const phase = (tick + i * 2) % 8
            const r = 1.4 + Math.sin(phase) * 0.4
            const ringR = 2 + ((tick + i) % 6) * 0.8
            const ringOp = Math.max(0, 0.6 - ((tick + i) % 6) * 0.1)
            return (
              <g key={c.name}>
                <circle cx={c.x} cy={c.y} r={ringR} fill="none" stroke="#2DE2C5" strokeOpacity={ringOp} strokeWidth="0.3" />
                <circle cx={c.x} cy={c.y} r={r} fill="#2DE2C5" />
              </g>
            )
          })}
        </svg>
      </div>
    </div>
  )
}

function ErrorPulse() {
  // Hydration-safe: start with deterministic zeros, randomize after mount.
  const [errors, setErrors] = useState(() => Array.from({ length: 14 }, () => 0))
  useEffect(() => {
    setErrors(() => Array.from({ length: 14 }, () => Math.random() * 0.4))
    const id = setInterval(() => {
      setErrors((arr) => [...arr.slice(1), Math.random() * (Math.random() < 0.15 ? 1 : 0.3)])
    }, 600)
    return () => clearInterval(id)
  }, [])
  const max = Math.max(...errors, 0.1)
  return (
    <div className="rounded-xl border border-white/[0.07] bg-[rgba(8,12,18,0.6)] backdrop-blur-sm overflow-hidden h-full">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06]">
        <p className="mono-label text-fog-400 text-[10px] tracking-[0.22em]">errors</p>
        <p className="mono-label text-fog-500 text-[10px] tracking-[0.18em] tabular-nums">/min</p>
      </div>
      <div className="p-3 h-[220px] sm:h-[260px] flex flex-col">
        <div className="flex items-end gap-[3px] flex-1">
          {errors.map((e, i) => {
            const h = (e / max) * 100
            const high = e > 0.6
            return (
              <div
                key={i}
                className="flex-1 rounded-sm transition-all duration-300"
                style={{
                  height: `${h}%`,
                  minHeight: 2,
                  background: high ? '#F26B6B' : '#2DE2C5',
                  opacity: 0.4 + (i / errors.length) * 0.6,
                }}
              />
            )
          })}
        </div>
        <p className="mono-label text-fog-500 text-[9px] tracking-[0.18em] mt-3">last 14 · 60s window</p>
      </div>
    </div>
  )
}

// =============================================================================
// OperatorConsole — terminal-style command interface with auto-typed queries
// and streaming responses. Replaces BackOfficeMock with something more dramatic.
// =============================================================================
export function OperatorConsole({ tabs = [] }) {
  const queries = [
    { cmd: '> SELECT * FROM users WHERE status = "PENDING" LIMIT 4;', tab: 'users' },
    { cmd: '> UPDATE cards SET status = "RENEWED" WHERE id = 8814;', tab: 'cards' },
    { cmd: '> EXEC reconcile_transactions("2026-05-29");', tab: 'transactions' },
    { cmd: '> AUDIT.export(period: 24h, format: csv);', tab: 'audit' },
  ]
  const [step, setStep] = useState(0)
  const [typed, setTyped] = useState('')
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    const q = queries[step % queries.length]
    let i = 0
    setTyped('')
    setShowResult(false)
    const typer = setInterval(() => {
      i++
      setTyped(q.cmd.slice(0, i))
      if (i >= q.cmd.length) {
        clearInterval(typer)
        setTimeout(() => setShowResult(true), 220)
      }
    }, 28)
    const advance = setTimeout(() => {
      setStep((s) => s + 1)
    }, 4200)
    return () => { clearInterval(typer); clearTimeout(advance) }
  }, [step])

  const currentTab = tabs[step % tabs.length] || tabs[0]

  return (
    <div
      className="rounded-xl border border-white/[0.07] bg-[#070b0f] backdrop-blur-sm overflow-hidden relative"
      style={{
        backgroundImage:
          'repeating-linear-gradient(0deg, rgba(45,226,197,0.025) 0px, rgba(45,226,197,0.025) 1px, transparent 1px, transparent 3px)',
      }}
    >
      {/* CRT scanline overlay */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background:
            'linear-gradient(transparent 50%, rgba(0,0,0,0.4) 50%)',
          backgroundSize: '100% 4px',
        }}
      />

      {/* terminal header */}
      <div className="relative flex items-center gap-2 px-4 py-2.5 border-b border-accent/20 bg-black/40">
        <span className="w-2.5 h-2.5 rounded-full bg-signal-red/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-signal-amber/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-signal-green/70" />
        <p className="ml-3 mono-label text-accent text-[10px] tracking-[0.22em]">
          OPERATOR · backoffice@era · {currentTab?.label?.toLowerCase()}
        </p>
        <div className="ml-auto flex items-center gap-2">
          <span className="status-dot run" />
          <p className="mono-label text-signal-green text-[9px] tracking-[0.18em]">SECURE TUNNEL</p>
        </div>
      </div>

      {/* terminal body */}
      <div className="relative p-5 font-mono text-[12.5px] min-h-[340px]">
        <div className="text-accent">
          {typed}
          <span className="inline-block w-[0.6em] h-[1em] align-middle bg-accent ml-0.5 animate-pulse" />
        </div>

        {showResult && currentTab && (
          <div className="mt-4 animate-[opFade_0.3s_ease-out]">
            <p className="text-fog-500 mb-2">
              [ok] returning {currentTab.count} rows · 142ms
            </p>
            <div className="grid grid-cols-[1fr_1.2fr_80px_90px] gap-3 mono-label text-fog-600 text-[9px] tracking-[0.18em] pb-1.5 border-b border-accent/10">
              <span>NAME / ID</span>
              <span>DETAIL</span>
              <span>STATUS</span>
              <span className="text-right">DATE</span>
            </div>
            <div className="space-y-0.5 mt-1">
              {currentTab.rows.map((row, i) => {
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
                    className="grid grid-cols-[1fr_1.2fr_80px_90px] gap-3 py-1.5 text-[12px] animate-[opFade_0.3s_ease-out]"
                    style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
                  >
                    <span className="text-accent truncate">{row.col1}</span>
                    <span className="text-fog-200 truncate">{row.col2}</span>
                    <span className={`${statusColor} truncate`}>{row.col3}</span>
                    <span className="text-fog-500 text-right tabular-nums truncate">{row.col4}</span>
                  </div>
                )
              })}
            </div>
            <p className="mt-3 text-fog-500 text-[10px]">
              audit_log: action_id=#{step.toString(16).padStart(4, '0')} · user=admin · ip=10.0.x.x · ok
            </p>
          </div>
        )}
      </div>

      {/* footer */}
      <div className="relative flex items-center justify-between px-4 py-2 border-t border-accent/20 bg-black/40 mono-label text-accent text-[9px] tracking-[0.18em]">
        <span>step · {(step % queries.length) + 1} / {queries.length}</span>
        <span>RBAC · admin · MFA · ok</span>
      </div>
    </div>
  )
}

// =============================================================================
// Vault — concentric rings rotating with stage labels (auth, encryption, audit)
// scroll-driven activation. Distinct visual language for security section.
// =============================================================================
export function Vault({ scrollProgressRef, pillars = [] }) {
  const [tick, setTick] = useState(0)
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    let raf = 0
    let last = performance.now()
    const tickFn = (now) => {
      const dt = (now - last) / 1000
      last = now
      setTick((t) => t + dt)
      if (scrollProgressRef?.current != null) {
        setProgress(scrollProgressRef.current)
      }
      raf = requestAnimationFrame(tickFn)
    }
    raf = requestAnimationFrame(tickFn)
    return () => cancelAnimationFrame(raf)
  }, [scrollProgressRef])

  // 4 concentric rings; each rotates at a different speed; activated as scroll progresses
  const rings = [
    { r: 110, w: 1.5, speed: 8,  label: 'AUTH',       activate: 0.1 },
    { r: 88,  w: 1.5, speed: -12, label: 'PERMS',     activate: 0.25 },
    { r: 66,  w: 1.5, speed: 16, label: 'ENCRYPTION', activate: 0.45 },
    { r: 44,  w: 1.5, speed: -22, label: 'AUDIT',     activate: 0.7 },
  ]

  return (
    <div className="relative w-full">
      <div className="aspect-square max-w-[480px] mx-auto relative">
        {/* center vault status */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <Lock size={28} className="text-accent mx-auto mb-2" style={{ filter: `drop-shadow(0 0 ${8 + progress * 12}px rgba(45,226,197,${0.3 + progress * 0.5}))` }} />
            <p className="mono-label text-accent text-[10px] tracking-[0.22em]">SECURED</p>
            <p className="mono-label text-fog-500 text-[9px] tracking-[0.18em] mt-1 tabular-nums">
              {Math.round(progress * 100)}%
            </p>
          </div>
        </div>

        <svg viewBox="0 0 320 320" className="w-full h-full">
          <defs>
            <filter id="vaultGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {rings.map((ring, idx) => {
            const active = progress >= ring.activate
            const angle = (tick * ring.speed) % 360
            const opacity = active ? 1 : 0.2
            const dash = active ? '20 6' : '4 8'
            return (
              <g key={ring.label} transform={`translate(160 160) rotate(${angle})`} opacity={opacity}>
                <circle r={ring.r} fill="none" stroke="#2DE2C5" strokeWidth={ring.w} strokeDasharray={dash} filter={active ? 'url(#vaultGlow)' : undefined} />
                {/* tick marks */}
                {Array.from({ length: 12 }).map((_, i) => {
                  const a = (i / 12) * Math.PI * 2
                  const x1 = Math.cos(a) * (ring.r - 4)
                  const y1 = Math.sin(a) * (ring.r - 4)
                  const x2 = Math.cos(a) * (ring.r + 4)
                  const y2 = Math.sin(a) * (ring.r + 4)
                  return (
                    <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#2DE2C5" strokeWidth="0.6" opacity={active ? 0.5 : 0.15} />
                  )
                })}
              </g>
            )
          })}

          {/* ring labels — DON'T rotate */}
          {rings.map((ring, idx) => {
            const active = progress >= ring.activate
            return (
              <text
                key={`label-${ring.label}`}
                x="160"
                y={160 - ring.r - 8}
                textAnchor="middle"
                fontFamily="var(--font-mono), monospace"
                fontSize="9"
                fontWeight="500"
                letterSpacing="2"
                fill={active ? '#2DE2C5' : 'rgba(124,138,156,0.4)'}
              >
                {ring.label}
              </text>
            )
          })}
        </svg>
      </div>
    </div>
  )
}

// =============================================================================
// CompliancePipeline — checklist that builds itself line-by-line, CI/CD style
// =============================================================================
export function CompliancePipeline({ items = [] }) {
  const [completed, setCompleted] = useState(0)
  // Stable per-step ms timings — generated once on mount so they don't churn
  // on every re-render (and don't run on the server).
  const [msStable, setMsStable] = useState(() => items.map(() => 100))
  useEffect(() => {
    setMsStable(items.map(() => Math.floor(80 + Math.random() * 40)))
  }, [items.length])

  useEffect(() => {
    if (completed >= items.length) {
      const reset = setTimeout(() => setCompleted(0), 2000)
      return () => clearTimeout(reset)
    }
    const id = setTimeout(() => setCompleted((c) => c + 1), 380)
    return () => clearTimeout(id)
  }, [completed, items.length])

  return (
    <div className="rounded-xl border border-white/[0.07] bg-[#070b0f] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <ShieldCheck size={11} className="text-accent" />
          <p className="mono-label text-fog-400 text-[10px] tracking-[0.22em]">compliance.run</p>
        </div>
        <p className="mono-label text-signal-green text-[10px] tracking-[0.18em] tabular-nums">
          {completed} / {items.length}
        </p>
      </div>
      <div className="p-4 font-mono text-[12.5px] min-h-[420px]">
        {items.map((it, i) => {
          const state = i < completed ? 'done' : i === completed ? 'running' : 'pending'
          return (
            <div
              key={i}
              className="flex items-center gap-3 py-1.5 border-b border-white/[0.04] last:border-0"
            >
              <span className="w-7 mono-label text-fog-600 text-[10px] tracking-[0.16em] tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="w-5 shrink-0">
                {state === 'done' && <span className="text-signal-green">✓</span>}
                {state === 'running' && (
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-signal-amber animate-pulse" />
                )}
                {state === 'pending' && <span className="text-fog-600">·</span>}
              </span>
              <span
                className={`flex-1 truncate ${
                  state === 'done' ? 'text-fog-300' :
                  state === 'running' ? 'text-fog-50' :
                  'text-fog-600'
                }`}
              >
                {it}
              </span>
              <span
                className={`mono-label text-[9px] tracking-[0.16em] tabular-nums ${
                  state === 'done' ? 'text-signal-green' :
                  state === 'running' ? 'text-signal-amber' :
                  'text-fog-600'
                }`}
              >
                {state === 'done' ? `${msStable[i] ?? 100}ms` :
                 state === 'running' ? '...' : '—'}
              </span>
            </div>
          )
        })}
      </div>
      <div className="flex items-center justify-between px-4 py-2 border-t border-white/[0.06] mono-label text-fog-500 text-[9px] tracking-[0.18em]">
        <span>pipeline · pci-aware · loop</span>
        <span className="text-signal-green">PASS</span>
      </div>
    </div>
  )
}

// =============================================================================
// BuildPipeline — CI-style step runner for the process section
// =============================================================================
export function BuildPipeline({ steps = [] }) {
  const [running, setRunning] = useState(0)
  useEffect(() => {
    if (running >= steps.length) {
      const reset = setTimeout(() => setRunning(0), 1800)
      return () => clearTimeout(reset)
    }
    const id = setTimeout(() => setRunning((r) => r + 1), 700)
    return () => clearTimeout(id)
  }, [running, steps.length])

  return (
    <div className="rounded-xl border border-white/[0.07] bg-[#070b0f] overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.06]">
        <span className="status-dot run" />
        <p className="mono-label text-accent text-[10px] tracking-[0.22em]">build.fintech</p>
        <p className="ml-auto mono-label text-fog-500 text-[10px] tracking-[0.18em] tabular-nums">
          {Math.min(running, steps.length)} / {steps.length}
        </p>
      </div>
      <div className="grid lg:grid-cols-3 gap-px bg-white/[0.04]">
        {steps.map((step, i) => {
          const state = i < running ? 'done' : i === running ? 'running' : 'pending'
          return (
            <div
              key={step.num}
              className="bg-[#070b0f] p-5 relative"
            >
              <div className="flex items-center justify-between mb-3">
                <p
                  className="font-mono text-[10px] tracking-[0.18em] tabular-nums"
                  style={{
                    color: state === 'done' ? '#2DE2C5' :
                           state === 'running' ? '#F5B544' :
                           '#3a4a5a',
                  }}
                >
                  STAGE {step.num}
                </p>
                <span>
                  {state === 'done' && <span className="text-signal-green text-[14px]">✓</span>}
                  {state === 'running' && <span className="inline-block w-2 h-2 rounded-full bg-signal-amber animate-pulse" />}
                  {state === 'pending' && <span className="inline-block w-2 h-2 rounded-full bg-white/10" />}
                </span>
              </div>
              <p
                className={`text-[15px] font-medium leading-tight ${
                  state === 'pending' ? 'text-fog-500' : 'text-fog-50'
                }`}
              >
                {step.title}
              </p>
              <p
                className={`text-[12.5px] leading-relaxed mt-2 text-pretty ${
                  state === 'pending' ? 'text-fog-600' : 'text-fog-400'
                }`}
              >
                {step.body}
              </p>
              <div className="mt-3 h-px overflow-hidden bg-white/[0.04] rounded-full">
                <div
                  className="h-full transition-all duration-700"
                  style={{
                    width: state === 'done' ? '100%' : state === 'running' ? '60%' : '0%',
                    background: state === 'done' ? '#2DE2C5' : '#F5B544',
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// =============================================================================
// EditorialMosaic — magazine-style asymmetric grid for use cases
// =============================================================================
export function EditorialMosaic({ items = [] }) {
  // pattern: rows of [big, small] alternating sides, with full-width hero items
  // We'll do a deterministic 3-column layout with span variations
  const spans = [
    'lg:col-span-7 lg:row-span-2',  // 0 - hero
    'lg:col-span-5',                 // 1
    'lg:col-span-5',                 // 2
    'lg:col-span-4',                 // 3
    'lg:col-span-4',                 // 4
    'lg:col-span-4',                 // 5
    'lg:col-span-7',                 // 6 - wide
    'lg:col-span-5',                 // 7
    'lg:col-span-6',                 // 8
    'lg:col-span-6',                 // 9
  ]
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
      {items.map((it, i) => {
        const span = spans[i] || 'lg:col-span-4'
        const isHero = i === 0
        return (
          <article
            key={it.num}
            className={`group ${span} rounded-xl border border-white/[0.07] bg-white/[0.015] hover:bg-white/[0.04] hover:border-accent/20 transition-all overflow-hidden relative`}
            style={{ minHeight: isHero ? 280 : 160 }}
          >
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
              style={{
                background:
                  'radial-gradient(ellipse 50% 60% at 30% 20%, rgba(45,226,197,0.08), transparent 60%)',
              }}
            />
            <div className="relative h-full p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <p
                  className="font-display font-light text-fog-600 leading-none"
                  style={{ fontSize: isHero ? 'clamp(60px, 9vw, 140px)' : 'clamp(36px, 5vw, 64px)', letterSpacing: '-0.05em' }}
                >
                  {it.num}
                </p>
              </div>
              <div className="mt-auto">
                <p
                  className={`font-display font-semibold text-fog-50 tracking-[-0.02em] leading-[1.05] ${
                    isHero ? 'text-[22px] sm:text-[28px]' : 'text-[16px] sm:text-[18px]'
                  }`}
                >
                  {it.title}
                </p>
                <p className="mono-label text-fog-500 text-[10px] tracking-[0.14em] mt-2 truncate">
                  {it.meta}
                </p>
              </div>
              <ArrowUpRight
                size={isHero ? 18 : 13}
                className="absolute top-5 right-5 text-fog-600 group-hover:text-accent transition-colors"
              />
            </div>
          </article>
        )
      })}
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
