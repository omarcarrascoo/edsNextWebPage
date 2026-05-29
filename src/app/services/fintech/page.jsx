'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import {
  ArrowRight, ArrowUpRight, Plus, Minus, ChevronRight, ShieldCheck,
  TrendingUp, Wallet, CreditCard, Network, Database, Cpu, FileCheck,
  Boxes, Workflow, MessageSquare, Lock, Activity, Hand,
} from 'lucide-react'
import SiteHeader from '@/components/site/SiteHeader'
import SiteFooter from '@/components/site/SiteFooter'
import { useT } from '@/i18n/LanguageProvider'
import {
  TickerNumber, TradingTerminal, CreditCard3D,
  TPKEncryption, ArchitectureStack,
  TradingWall, OperatorConsole, Vault, CompliancePipeline,
  BuildPipeline, EditorialMosaic,
} from '@/components/graph/FintechGraphics'

const BankParticles = dynamic(
  () => import('@/components/graph/BankParticles'),
  { ssr: false, loading: () => null },
)

const MoneyParticles = dynamic(
  () => import('@/components/graph/MoneyParticles'),
  { ssr: false, loading: () => null },
)

const GlobeNetwork = dynamic(
  () => import('@/components/graph/GlobeNetwork'),
  { ssr: false, loading: () => null },
)

const DataReform = dynamic(
  () => import('@/components/graph/DataReform'),
  { ssr: false, loading: () => null },
)

const capabilityIcons = {
  '01': Network,
  '02': Activity,
  '03': Boxes,
  '04': Wallet,
  '05': CreditCard,
  '06': Database,
  '07': MessageSquare,
  '08': Lock,
  '09': ShieldCheck,
}

export default function FintechPage() {
  const t = useT()
  const f = t.fintech

  return (
    <>
      <SiteHeader />
      <main className="relative bg-[#05080C] text-fog-100">
        <Hero f={f} />
        <Problem f={f} />
        <Capabilities f={f} />
        <Integration f={f} />
        <Payments f={f} />
        <I2C f={f} />
        <BPC f={f} />
        <Salesforce f={f} />
        <Dashboards f={f} />
        <BackOffice f={f} />
        <Security f={f} />
        <PCI f={f} />
        <Architecture f={f} />
        <UseCases f={f} />
        <Differentiators f={f} />
        <Process f={f} />
        <MidCta f={f} />
        <FAQ f={f} />
        <FinalCta f={f} />
      </main>
      <SiteFooter />
    </>
  )
}

// =============================================================================
// Section utilities
// =============================================================================
function SectionShell({ id, children, className = '' }) {
  return (
    <section
      id={id}
      className={`relative py-24 sm:py-32 px-4 sm:px-8 lg:px-14 overflow-hidden ${className}`}
    >
      <div className="container-shell relative">{children}</div>
    </section>
  )
}

function Eyebrow({ children }) {
  return (
    <p className="mono-label text-fog-500 text-[10px] tracking-[0.22em] mb-4">
      {children}
    </p>
  )
}

function SectionHeader({ eyebrow, title, accent, body, align = 'left', max = 'max-w-3xl' }) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left'
  return (
    <div className={`${alignClass} ${max} min-w-0`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="font-display font-semibold tracking-[-0.02em] leading-[1.06] text-pretty"
        style={{
          fontSize: 'clamp(22px, 4.4vw, 60px)',
          hyphens: 'auto',
          overflowWrap: 'anywhere',
          wordBreak: 'normal',
        }}
      >
        <span className="text-fog-50 block">{title}</span>
        {accent && (
          <span className="text-fog-300 block font-light italic">{accent}</span>
        )}
      </motion.h2>
      {body && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-5 text-fog-300 text-[15px] sm:text-[16px] leading-relaxed text-pretty"
        >
          {body}
        </motion.p>
      )}
    </div>
  )
}

// =============================================================================
// HERO
// =============================================================================
function Hero({ f }) {
  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: '100vh', background: '#05080C' }}
    >
      {/* GLOBE — full bleed, dominating the viewport */}
      <div className="absolute inset-0 z-0">
        <GlobeNetwork />
      </div>

      {/* Bottom dark fade so the headline reads cleanly against the globe */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[55%] z-[1] pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(5,8,12,0.92) 0%, rgba(5,8,12,0.55) 50%, rgba(5,8,12,0.0) 100%)',
        }}
      />

      {/* Top fade so the breadcrumb + status read against any globe pole */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[20%] z-[1] pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(5,8,12,0.7) 0%, rgba(5,8,12,0.0) 100%)',
        }}
      />

      {/* TOP-LEFT — breadcrumb */}
      <div className="absolute top-24 sm:top-28 left-4 sm:left-8 lg:left-14 z-10 pointer-events-auto">
        <p className="mono-label text-fog-500 text-[10px] tracking-[0.22em] flex items-center gap-2">
          <a href="/" className="hover:text-fog-200 transition-colors">
            {f.breadcrumb.services}
          </a>
          <ChevronRight size={11} />
          <span className="text-accent">{f.breadcrumb.current}</span>
        </p>
      </div>

      {/* TOP-RIGHT — live status (HUD label, not ticker grid) */}
      <div className="absolute top-24 sm:top-28 right-4 sm:right-8 lg:right-14 z-10 hidden sm:flex flex-col items-end gap-1 pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="status-dot run" />
          <span className="mono-label text-accent text-[10px] tracking-[0.22em]">
            global · 24/7
          </span>
        </div>
        <span className="mono-label text-fog-500 text-[10px] tracking-[0.22em]">
          14 financial cities · live
        </span>
      </div>

      {/* CENTERED EYEBROW — sits high, small, near the top of the visual */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="absolute top-[26%] left-1/2 -translate-x-1/2 z-10 pointer-events-none text-center"
      >
        <p className="mono-label text-accent text-[10px] tracking-[0.32em]">
          {f.hero.eyebrow}
        </p>
      </motion.div>

      {/* HEADLINE — bottom-anchored, tight against the gradient bed.
          The globe rises behind it like the foundation of an idea. */}
      <div className="absolute inset-x-0 bottom-0 z-10 px-4 sm:px-8 lg:px-14 pb-12 sm:pb-16">
        <div className="container-shell">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="font-display font-semibold tracking-[-0.035em] leading-[0.94] text-pretty break-words"
            style={{
              fontSize: 'clamp(40px, 7.6vw, 116px)',
              hyphens: 'auto',
              overflowWrap: 'anywhere',
              wordBreak: 'normal',
            }}
          >
            <span className="text-fog-50 block">{f.hero.titleA}</span>
            <span className="text-fog-200 block">{f.hero.titleB}</span>
            <span className="text-fog-300 block font-light italic">{f.hero.titleC}</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-6 grid lg:grid-cols-[1.4fr_1fr] gap-8 items-end"
          >
            <p
              className="editorial text-fog-200 text-pretty break-words max-w-2xl"
              style={{ fontSize: 'clamp(17px, 1.8vw, 24px)', lineHeight: 1.3 }}
            >
              {f.hero.titleAccent}
            </p>
            <div className="flex flex-wrap items-center gap-3 lg:justify-end">
              <a href="#contact" className="btn-primary">
                {f.hero.ctaPrimary}
                <ArrowRight size={15} />
              </a>
              <a
                href="#capabilities"
                className="text-fog-300 text-[14px] inline-flex items-center gap-1.5 hover:text-accent transition-colors"
              >
                {f.hero.ctaSecondary} <ChevronRight size={13} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* CORNER CROSSHAIRS — quiet HUD framing for the entire hero */}
      <div aria-hidden className="absolute inset-6 sm:inset-10 pointer-events-none z-[2]">
        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-accent/35" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-accent/35" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-accent/35" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-accent/35" />
      </div>

      {/* SCROLL HINT — bottom right, tiny */}
      <div className="absolute bottom-4 right-4 sm:right-8 lg:right-14 z-10 pointer-events-none hidden sm:flex items-center gap-2 text-fog-500">
        <p className="mono-label text-[9px] tracking-[0.22em]">scroll</p>
        <span className="block w-px h-4 bg-fog-500 animate-pulse" />
      </div>
    </section>
  )
}

// =============================================================================
// 02 · PROBLEM
// =============================================================================
function Problem({ f }) {
  return (
    <SectionShell id="problem">
      <SectionHeader
        eyebrow={f.problem.eyebrow}
        title={f.problem.title}
        accent={f.problem.titleAccent}
        body={f.problem.body}
        max="max-w-4xl"
      />
      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {f.problem.symptoms.map((s, i) => (
          <motion.div
            key={s.tag}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.3) }}
            className="rounded-xl border border-white/[0.07] bg-white/[0.015] px-4 py-3 flex items-center gap-3"
          >
            <span className="mono-label text-signal-amber text-[10px] tracking-[0.18em] w-14 shrink-0">
              {s.tag}
            </span>
            <span className="text-fog-200 text-[14px] truncate">{s.text}</span>
          </motion.div>
        ))}
      </div>
      <p className="mt-12 text-fog-300 text-[15px] sm:text-[16px] leading-relaxed text-pretty max-w-2xl pt-8 border-t border-white/[0.06]">
        {f.problem.closing}
      </p>
    </SectionShell>
  )
}

// =============================================================================
// 03 · CAPABILITIES
// =============================================================================
// Bento layout — 12-col asymmetric grid: hero (col-span-6 row-span-2) +
// horizontal (col-span-6) + 4×3-col + 3 footer cards. Each capability gets
// its own thematic micro-animation.
const CAPABILITY_LAYOUT = {
  '01': 'lg:col-span-6 lg:row-span-2',  // API — hero
  '02': 'lg:col-span-3',                  // BI
  '03': 'lg:col-span-3',                  // BACKOFFICE
  '04': 'lg:col-span-3',                  // PAYMENTS
  '05': 'lg:col-span-3',                  // i2c
  '06': 'lg:col-span-4',                  // SALESFORCE
  '07': 'lg:col-span-4',                  // MESSAGING
  '08': 'lg:col-span-4',                  // TPK
  '09': 'lg:col-span-12',                 // PCI — full width footer
}

function Capabilities({ f }) {
  return (
    <SectionShell id="capabilities">
      <SectionHeader
        eyebrow={f.capabilities.eyebrow}
        title={f.capabilities.title}
        accent={f.capabilities.titleAccent}
      />
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 auto-rows-[minmax(180px,auto)]">
        {f.capabilities.items.map((it, i) => (
          <CapabilityCard key={it.code} item={it} index={i} />
        ))}
      </div>
    </SectionShell>
  )
}

function CapabilityCard({ item, index }) {
  const Icon = capabilityIcons[item.code] || Cpu
  const layoutClass = CAPABILITY_LAYOUT[item.code] || 'lg:col-span-4'
  const isHero = item.code === '01'
  const isFullWidth = item.code === '09'

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.3) }}
      className={`group relative ${layoutClass} rounded-xl border border-white/[0.07] bg-white/[0.015] p-5 sm:p-6 hover:bg-white/[0.03] hover:border-accent/25 transition-all overflow-hidden`}
    >
      {/* hover gradient */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            'radial-gradient(ellipse 60% 70% at 70% 20%, rgba(45,226,197,0.08), transparent 60%)',
        }}
      />

      {/* layout depends on whether this is the hero card */}
      {isHero ? (
        <div className="relative h-full flex flex-col">
          <div className="flex items-center justify-between">
            <span className="inline-flex w-12 h-12 rounded-xl bg-accent/10 border border-accent/30 items-center justify-center text-accent">
              <Icon size={20} />
            </span>
            <span className="mono-label text-fog-600 text-[10px] tracking-[0.18em]">
              {item.code}
            </span>
          </div>
          <p className="mono-label text-accent text-[10px] tracking-[0.22em] mt-6">
            {item.tag}
          </p>
          <p className="font-display text-fog-50 text-[28px] sm:text-[34px] font-medium tracking-[-0.02em] leading-[1.05] mt-2 max-w-md">
            {item.title}
          </p>
          <p className="mono-label text-fog-500 text-[10px] tracking-[0.14em] mt-3">
            {item.meta}
          </p>
          <div className="mt-auto pt-6">
            <CapabilityVisual code={item.code} large />
          </div>
        </div>
      ) : isFullWidth ? (
        <div className="relative grid sm:grid-cols-[auto_1fr_auto] gap-5 items-center h-full">
          <span className="inline-flex w-11 h-11 rounded-xl bg-accent/10 border border-accent/25 items-center justify-center text-accent shrink-0">
            <Icon size={18} />
          </span>
          <div className="min-w-0">
            <div className="flex items-center gap-3 mb-1">
              <p className="mono-label text-accent text-[10px] tracking-[0.22em]">
                {item.tag}
              </p>
              <span className="mono-label text-fog-600 text-[10px] tracking-[0.18em]">
                {item.code}
              </span>
            </div>
            <p className="text-fog-50 text-[16px] sm:text-[18px] font-medium leading-tight">
              {item.title}
            </p>
            <p className="mono-label text-fog-500 text-[10px] tracking-[0.12em] mt-1.5">
              {item.meta}
            </p>
          </div>
          <div className="hidden sm:block w-[200px]">
            <CapabilityVisual code={item.code} />
          </div>
        </div>
      ) : (
        <div className="relative h-full flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <span className="inline-flex w-10 h-10 rounded-lg bg-accent/10 border border-accent/25 items-center justify-center text-accent">
              <Icon size={16} />
            </span>
            <span className="mono-label text-fog-600 text-[10px] tracking-[0.18em]">
              {item.code}
            </span>
          </div>
          <p className="mono-label text-accent text-[10px] tracking-[0.22em] mb-1.5">
            {item.tag}
          </p>
          <p className="text-fog-50 text-[14px] sm:text-[15px] font-medium leading-tight">
            {item.title}
          </p>
          <p className="mono-label text-fog-500 text-[10px] tracking-[0.12em] mt-1.5">
            {item.meta}
          </p>
          <div className="mt-auto pt-4">
            <CapabilityVisual code={item.code} />
          </div>
        </div>
      )}
    </motion.div>
  )
}

// Each capability code gets its own micro-animation. Lightweight CSS / SVG.
function CapabilityVisual({ code, large }) {
  switch (code) {
    case '01': return <ApiTrace large={large} />
    case '02': return <SparklinePulse />
    case '03': return <WindowChrome />
    case '04': return <PaymentChip />
    case '05': return <MiniCard />
    case '06': return <CloudNodes />
    case '07': return <MessageBubbles />
    case '08': return <KeyStream />
    case '09': return <PciCheckBar />
    default: return null
  }
}

// 01 — API request/response trace
function ApiTrace({ large }) {
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1100)
    return () => clearInterval(id)
  }, [])
  const traces = [
    { method: 'GET',    path: '/v1/accounts',         status: 200, ms: 42 },
    { method: 'POST',   path: '/v1/transfers',        status: 201, ms: 184 },
    { method: 'POST',   path: '/v1/cards/auth',       status: 200, ms: 88 },
    { method: 'POST',   path: '/v1/i2c/sync',         status: 200, ms: 142 },
    { method: 'GET',    path: '/v1/users/me',         status: 200, ms: 38 },
    { method: 'PUT',    path: '/v1/cards/4291',       status: 200, ms: 110 },
  ]
  // show 4 most recent (rolls forward over time)
  const visible = []
  for (let i = 0; i < 4; i++) {
    visible.push(traces[(tick + i) % traces.length])
  }
  return (
    <div className="font-mono text-[11px] sm:text-[12px] space-y-1">
      {visible.map((row, i) => {
        const opacity = (i + 1) / 4
        const methodColor =
          row.method === 'GET' ? 'text-signal-blue'
          : row.method === 'POST' ? 'text-accent'
          : 'text-signal-amber'
        return (
          <div
            key={`${tick}-${i}`}
            className="flex items-center gap-2 sm:gap-3 animate-[traceFade_0.4s_ease-out]"
            style={{ opacity }}
          >
            <span className={`mono-label text-[9px] sm:text-[10px] tracking-[0.14em] w-9 sm:w-10 shrink-0 ${methodColor}`}>
              {row.method}
            </span>
            <span className="text-fog-200 truncate flex-1">{row.path}</span>
            <span className={`tabular-nums text-[10px] sm:text-[11px] ${row.status === 200 || row.status === 201 ? 'text-signal-green' : 'text-signal-red'}`}>
              {row.status}
            </span>
            <span className="mono-label text-fog-500 text-[9px] tracking-[0.12em] tabular-nums w-10 text-right">
              {row.ms}ms
            </span>
          </div>
        )
      })}
      <style jsx global>{`
        @keyframes traceFade {
          from { opacity: 0; transform: translateX(-4px); }
          to { opacity: var(--final, 1); transform: translateX(0); }
        }
      `}</style>
    </div>
  )
}

// 02 — animated sparkline
function SparklinePulse() {
  const [points, setPoints] = useState(() => Array.from({ length: 20 }, () => 50))
  useEffect(() => {
    setPoints(() => {
      let p = 50
      return Array.from({ length: 20 }, () => {
        p += (Math.random() - 0.45) * 14
        p = Math.max(20, Math.min(80, p))
        return p
      })
    })
    const id = setInterval(() => {
      setPoints((arr) => {
        const last = arr[arr.length - 1]
        let next = last + (Math.random() - 0.45) * 14
        next = Math.max(20, Math.min(80, next))
        return [...arr.slice(1), next]
      })
    }, 700)
    return () => clearInterval(id)
  }, [])
  const min = Math.min(...points)
  const max = Math.max(...points)
  const range = max - min || 1
  const path = points
    .map((v, i) => `${(i / (points.length - 1)) * 100},${100 - ((v - min) / range) * 100}`)
    .join(' ')
  return (
    <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="w-full h-10 opacity-90">
      <polyline
        points={path.replace(/,(\d+(?:\.\d+)?) /g, ',$1 ').split(' ').map((p) => {
          const [x, y] = p.split(',')
          return `${x},${y / 2}`
        }).join(' ')}
        fill="none"
        stroke="#2DE2C5"
        strokeWidth="1.5"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

// 03 — back office window chrome with row indicator
function WindowChrome() {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % 4), 1100)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="rounded-md border border-white/[0.06] bg-black/30 overflow-hidden">
      <div className="flex items-center gap-1 px-2 py-1.5 border-b border-white/[0.05]">
        <span className="w-1.5 h-1.5 rounded-full bg-signal-red/60" />
        <span className="w-1.5 h-1.5 rounded-full bg-signal-amber/60" />
        <span className="w-1.5 h-1.5 rounded-full bg-signal-green/60" />
        <span className="ml-2 mono-label text-fog-600 text-[8px] tracking-[0.16em]">backoffice</span>
      </div>
      <div className="p-2 space-y-1">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-1.5 rounded transition-all duration-500 ${
              i === active
                ? 'bg-accent/70 w-full'
                : 'bg-white/[0.05] w-3/4'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

// 04 — payment chip with amount
function PaymentChip() {
  const [amount, setAmount] = useState(1240)
  useEffect(() => {
    const id = setInterval(() => {
      setAmount(Math.floor(800 + Math.random() * 4500))
    }, 1300)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-6 rounded border border-accent/40 bg-gradient-to-br from-accent/30 to-accent/5 flex items-center justify-center shrink-0">
        <div className="w-5 h-3 grid grid-cols-3 gap-px">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="bg-accent/40 rounded-[1px]" />
          ))}
        </div>
      </div>
      <div className="font-mono">
        <p className="text-accent text-[14px] sm:text-[15px] font-medium tabular-nums">
          $ {amount.toLocaleString()}
        </p>
        <p className="mono-label text-fog-600 text-[9px] tracking-[0.14em]">approved</p>
      </div>
    </div>
  )
}

// 05 — mini card with masked number
function MiniCard() {
  return (
    <div
      className="relative w-full h-12 rounded-md overflow-hidden p-2"
      style={{
        background: 'linear-gradient(135deg, #0d1620 0%, #18242f 100%)',
        border: '1px solid rgba(45,226,197,0.18)',
      }}
    >
      <div className="absolute top-1 right-1.5 mono-label text-accent text-[8px] tracking-[0.16em]">
        i2c
      </div>
      <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between">
        <p className="font-mono text-fog-200 text-[10px] tracking-[0.16em] tabular-nums">
          •••• •••• •••• 4291
        </p>
        <span className="status-dot run" />
      </div>
    </div>
  )
}

// 06 — cloud nodes (Salesforce)
function CloudNodes() {
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setTick((t) => (t + 1) % 4), 600)
    return () => clearInterval(id)
  }, [])
  const nodes = [
    { x: 20, y: 30 },
    { x: 60, y: 20 },
    { x: 90, y: 50 },
    { x: 50, y: 60 },
    { x: 15, y: 70 },
  ]
  return (
    <svg viewBox="0 0 110 80" className="w-full h-12">
      {nodes.map((a, i) =>
        nodes.slice(i + 1).map((b, j) => (
          <line
            key={`${i}-${j}`}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke="#2DE2C5"
            strokeOpacity="0.18"
            strokeWidth="0.4"
          />
        )),
      )}
      {nodes.map((n, i) => (
        <circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={i === tick % nodes.length ? 3 : 1.8}
          fill="#2DE2C5"
          opacity={i === tick % nodes.length ? 1 : 0.5}
        />
      ))}
    </svg>
  )
}

// 07 — message bubbles cycling
function MessageBubbles() {
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 900)
    return () => clearInterval(id)
  }, [])
  const messages = ['support reply', 'auth otp', 'tx alert', 'doc ready']
  return (
    <div className="space-y-1">
      {[0, 1, 2].map((i) => {
        const idx = (tick + i) % messages.length
        const isLeft = (tick + i) % 2 === 0
        const opacity = (i + 1) / 3
        return (
          <div key={`${tick}-${i}`} className={`flex ${isLeft ? '' : 'justify-end'}`} style={{ opacity }}>
            <span
              className={`text-[9px] sm:text-[10px] px-2 py-0.5 rounded ${
                isLeft
                  ? 'bg-white/[0.04] text-fog-300 border border-white/[0.05]'
                  : 'bg-accent/15 text-accent border border-accent/25'
              }`}
            >
              {messages[idx]}
            </span>
          </div>
        )
      })}
    </div>
  )
}

// 08 — key + binary stream
function KeyStream() {
  const [seed, setSeed] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setSeed((s) => s + 1), 240)
    return () => clearInterval(id)
  }, [])
  // deterministic-looking hex per seed step
  const hex = '0123456789abcdef'
  const line = Array.from({ length: 24 }, (_, i) => hex[(seed + i * 7) % 16]).join('')
  return (
    <div className="flex items-center gap-3">
      <div
        className="w-8 h-8 rounded border border-accent/30 bg-accent/10 flex items-center justify-center shrink-0"
        style={{ animation: 'tpkPulse 2.4s ease-in-out infinite' }}
      >
        <Lock size={13} className="text-accent" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-mono text-accent text-[10px] tracking-[0.05em] truncate">
          {line}
        </p>
        <p className="mono-label text-fog-600 text-[9px] tracking-[0.14em] mt-0.5">
          tpk · in-transit
        </p>
      </div>
    </div>
  )
}

// 09 — full-width PCI compliance check bar
function PciCheckBar() {
  const items = ['network', 'data', 'access', 'monitoring', 'policy', 'vulnerabilities']
  const [active, setActive] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % items.length), 800)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
      {items.map((label, i) => {
        const done = i <= active
        return (
          <div key={label} className="flex items-center gap-1.5">
            <span
              className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center text-[8px] transition-all ${
                done
                  ? 'border-signal-green bg-signal-green/20 text-signal-green'
                  : 'border-white/15 text-fog-600'
              }`}
            >
              {done ? '✓' : ''}
            </span>
            <span
              className={`mono-label text-[9px] sm:text-[10px] tracking-[0.16em] ${
                done ? 'text-fog-200' : 'text-fog-600'
              }`}
            >
              {label}
            </span>
            {i < items.length - 1 && (
              <span className={`hidden sm:inline-block w-3 h-px ${done ? 'bg-signal-green/40' : 'bg-white/10'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}

// =============================================================================
// 04 · INTEGRATION
// =============================================================================
function Integration({ f }) {
  return (
    <SectionShell id="integration">
      <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-14 items-center">
        {/* LEFT (lg+) — bank canvas */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full order-1 lg:order-1"
          style={{ height: 'clamp(440px, 70vh, 680px)' }}
        >
          <BankParticles />
          {/* corner crosshairs */}
          <div aria-hidden className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-accent/40" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-accent/40" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-accent/40" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-accent/40" />
          </div>
          {/* HUD label */}
          <div className="absolute bottom-3 left-3 pointer-events-none">
            <p className="mono-label text-accent text-[10px] tracking-[0.22em]">
              bank.façade
            </p>
            <p className="mono-label text-fog-500 text-[9px] tracking-[0.18em] mt-1">
              particles · interactive
            </p>
          </div>
          {/* mobile hint over the canvas */}
          <div className="absolute top-3 right-3 pointer-events-none flex items-center gap-2 text-fog-500 lg:hidden">
            <Hand size={11} className="text-accent" />
            <p className="mono-label text-[9px] tracking-[0.2em]">hover · scatter</p>
          </div>
        </motion.div>

        {/* RIGHT (lg+) — copy */}
        <div className="min-w-0 order-2 lg:order-2">
          <SectionHeader
            eyebrow={f.integration.eyebrow}
            title={f.integration.title}
            accent={f.integration.titleAccent}
            body={f.integration.body}
            max="max-w-md"
          />
          <p className="editorial text-fog-500 text-[13px] sm:text-[14px] leading-relaxed text-pretty mt-6 italic max-w-md">
            {f.integration.witty}
          </p>
          <div className="mt-6 hidden lg:flex items-center gap-2 text-fog-500">
            <Hand size={11} className="text-accent" />
            <p className="mono-label text-[9px] tracking-[0.2em]">
              hover · scatter · reform
            </p>
          </div>
        </div>
      </div>
    </SectionShell>
  )
}

// =============================================================================
// 05 · PAYMENTS
// =============================================================================
function Payments({ f }) {
  return (
    <SectionShell id="payments">
      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 items-center min-w-0">
        <div className="min-w-0">
          <SectionHeader
            eyebrow={f.payments.eyebrow}
            title={f.payments.title}
            accent={f.payments.titleAccent}
            body={f.payments.body}
            max="max-w-md"
          />
          <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-2">
            {f.payments.capabilities.map((c) => (
              <li
                key={c}
                className="flex items-center gap-2 text-fog-300 text-[13.5px]"
              >
                <span className="w-1 h-1 rounded-full bg-accent shrink-0" />
                {c}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-fog-500 text-[13.5px] leading-relaxed text-pretty pt-5 border-t border-white/[0.06] italic">
            {f.payments.closing}
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85 }}
          className="min-w-0"
        >
          <TradingTerminal ops={f.payments.tickerOps} />
        </motion.div>
      </div>
    </SectionShell>
  )
}

// =============================================================================
// 06 · i2c
// =============================================================================
function I2C({ f }) {
  return (
    <SectionShell id="i2c">
      <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85 }}
          className="order-2 lg:order-1"
        >
          <CreditCard3D states={f.i2c.cardStates} />
        </motion.div>
        <div className="order-1 lg:order-2">
          <SectionHeader
            eyebrow={f.i2c.eyebrow}
            title={f.i2c.title}
            accent={f.i2c.titleAccent}
            body={f.i2c.body}
            max="max-w-md"
          />
          <div className="mt-8 grid grid-cols-2 gap-2">
            {f.i2c.flows.map((flow) => (
              <span
                key={flow}
                className="mono-label text-fog-300 text-[10px] tracking-[0.12em] px-3 py-2 rounded-lg border border-white/[0.06] bg-white/[0.015] truncate"
              >
                {flow}
              </span>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  )
}

// =============================================================================
// 07 · BPC / SMARTVISTA
// =============================================================================
function BPC({ f }) {
  if (!f.bpc) return null
  return (
    <SectionShell id="bpc">
      <div className="max-w-3xl mx-auto text-center min-w-0">
        <Eyebrow>{f.bpc.eyebrow}</Eyebrow>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-semibold tracking-[-0.02em] leading-[1.06] text-pretty"
          style={{
            fontSize: 'clamp(22px, 4.4vw, 60px)',
            hyphens: 'auto',
            overflowWrap: 'anywhere',
          }}
        >
          <span className="text-fog-50 block">{f.bpc.title}</span>
          <span className="text-fog-300 block font-light italic">
            {f.bpc.titleAccent}
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-fog-300 text-[15px] sm:text-[16px] leading-relaxed text-pretty mt-6 max-w-xl mx-auto"
        >
          {f.bpc.body}
        </motion.p>

        {/* 8 module pills, inline — minimal, no cards, no icons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-wrap justify-center gap-1.5 max-w-2xl mx-auto"
        >
          {f.bpc.modules.map((m) => (
            <span
              key={m.code}
              className="mono-label text-fog-300 text-[10px] tracking-[0.18em] px-2.5 py-1.5 rounded-full border border-white/[0.07] bg-white/[0.02]"
            >
              {m.title}
            </span>
          ))}
        </motion.div>

        {/* mono divider with the relation */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-10 flex items-center justify-center gap-3"
        >
          <span className="block w-12 h-px bg-white/10" />
          <span className="mono-label text-accent text-[10px] tracking-[0.22em]">
            BPC · SMARTVISTA
          </span>
          <span className="block w-12 h-px bg-white/10" />
        </motion.div>
      </div>
    </SectionShell>
  )
}

// =============================================================================
// 08 · SALESFORCE
// =============================================================================
function Salesforce({ f }) {
  return (
    <SectionShell id="salesforce">
      <SectionHeader
        eyebrow={f.salesforce.eyebrow}
        title={f.salesforce.title}
        accent={f.salesforce.titleAccent}
        body={f.salesforce.body}
        max="max-w-3xl"
      />
      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {f.salesforce.cases.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: Math.min(i * 0.05, 0.3) }}
            className="rounded-xl border border-white/[0.07] bg-white/[0.015] p-5 hover:bg-white/[0.04] transition-colors"
          >
            <div className="flex items-center gap-2 mb-3">
              <Workflow size={13} className="text-accent" />
              <span className="mono-label text-accent text-[10px] tracking-[0.18em]">
                CASE {String(i + 1).padStart(2, '0')}
              </span>
            </div>
            <p className="text-fog-50 text-[15px] font-medium leading-tight">{c.title}</p>
            <p className="mono-label text-fog-500 text-[10px] tracking-[0.12em] mt-2">
              {c.meta}
            </p>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  )
}

// =============================================================================
// 08 · DASHBOARDS
// =============================================================================
function Dashboards({ f }) {
  return (
    <SectionShell id="dashboards">
      <div className="grid lg:grid-cols-[1fr_1.15fr] gap-10 lg:gap-14 items-center">
        {/* LEFT — copy */}
        <div className="min-w-0">
          <SectionHeader
            eyebrow={f.dashboards.eyebrow}
            title={f.dashboards.title}
            accent={f.dashboards.titleAccent}
            body={f.dashboards.body}
            max="max-w-md"
          />
          <p className="text-fog-500 text-[13.5px] sm:text-[14px] leading-relaxed text-pretty mt-6 pt-5 border-t border-white/[0.06] italic max-w-md">
            {f.dashboards.closing}
          </p>
          <div className="mt-6 hidden lg:flex items-center gap-2 text-fog-500">
            <Hand size={11} className="text-accent" />
            <p className="mono-label text-[9px] tracking-[0.2em]">
              hover · scatter · auto-cycle
            </p>
          </div>
        </div>

        {/* RIGHT — particle reformation visual */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full"
          style={{ height: 'clamp(420px, 60vh, 600px)' }}
        >
          <DataReform />
          {/* corner crosshairs */}
          <div aria-hidden className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-accent/40" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-accent/40" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-accent/40" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-accent/40" />
          </div>
        </motion.div>
      </div>
    </SectionShell>
  )
}

// =============================================================================
// 09 · BACK OFFICE
// =============================================================================
function BackOffice({ f }) {
  return (
    <SectionShell id="backoffice">
      <div className="grid lg:grid-cols-[1fr_1.3fr] gap-12 items-center">
        <div>
          <SectionHeader
            eyebrow={f.backoffice.eyebrow}
            title={f.backoffice.title}
            accent={f.backoffice.titleAccent}
            body={f.backoffice.body}
            max="max-w-md"
          />
          <p className="mt-8 text-fog-500 text-[13.5px] leading-relaxed text-pretty pt-5 border-t border-white/[0.06] italic">
            {f.backoffice.closing}
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85 }}
        >
          <OperatorConsole tabs={f.backoffice.tabs} />
        </motion.div>
      </div>
    </SectionShell>
  )
}

// =============================================================================
// 10 · SECURITY
// =============================================================================
function Security({ f }) {
  // Scroll progress for the vault — drives ring activation
  const sectionRef = useRef(null)
  const vaultProgress = useRef(0)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    // Map 0.15..0.75 → 0..1 so the vault opens through the section
    vaultProgress.current = Math.max(0, Math.min(1, (v - 0.15) / 0.6))
  })

  return (
    <section
      id="security"
      ref={sectionRef}
      className="relative py-24 sm:py-32 px-4 sm:px-8 lg:px-14 overflow-hidden"
    >
      <div className="container-shell relative">
        <SectionHeader
          eyebrow={f.security.eyebrow}
          title={f.security.title}
          accent={f.security.titleAccent}
          body={f.security.body}
          max="max-w-3xl"
        />

        {/* Vault is the centerpiece — pillars wrap around it */}
        <div className="mt-16 grid lg:grid-cols-[1fr_1fr_1fr] gap-8 items-center">
          {/* LEFT pillars */}
          <div className="space-y-3 lg:order-1">
            {f.security.pillars.slice(0, 3).map((p) => (
              <PillarCard key={p.title} pillar={p} />
            ))}
          </div>

          {/* CENTER vault */}
          <div className="lg:order-2 relative">
            <Vault scrollProgressRef={vaultProgress} />
          </div>

          {/* RIGHT pillars */}
          <div className="space-y-3 lg:order-3">
            {f.security.pillars.slice(3, 6).map((p) => (
              <PillarCard key={p.title} pillar={p} />
            ))}
          </div>
        </div>

        {/* TPK band — different visual: side-by-side strip below the vault */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85 }}
          className="mt-16 grid lg:grid-cols-[1fr_1.5fr] gap-8 items-center"
        >
          <div>
            <p className="mono-label text-accent text-[10px] tracking-[0.22em] mb-3">
              {f.security.tpkTitle}
            </p>
            <p className="text-fog-300 text-[14px] leading-relaxed">
              {f.security.tpkBody}
            </p>
          </div>
          <TPKEncryption />
        </motion.div>

        <p className="mt-14 text-fog-400 text-[14px] leading-relaxed text-pretty max-w-3xl pt-8 border-t border-white/[0.06]">
          {f.security.closing}
        </p>
      </div>
    </section>
  )
}

function PillarCard({ pillar }) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/[0.015] p-4 hover:bg-white/[0.04] hover:border-accent/20 transition-colors">
      <div className="flex items-center gap-2 mb-2">
        <ShieldCheck size={12} className="text-accent" />
        <p className="text-fog-50 text-[14px] font-medium">{pillar.title}</p>
      </div>
      <p className="mono-label text-fog-500 text-[10px] tracking-[0.12em]">
        {pillar.meta}
      </p>
    </div>
  )
}

// =============================================================================
// 11 · PCI
// =============================================================================
function PCI({ f }) {
  return (
    <SectionShell id="pci">
      <div className="grid lg:grid-cols-[1fr_1fr] gap-12 items-start min-w-0">
        <div className="space-y-8 min-w-0">
          <SectionHeader
            eyebrow={f.pci.eyebrow}
            title={f.pci.title}
            accent={f.pci.titleAccent}
            body={f.pci.body}
            max="max-w-md"
          />
          {/* Educational explainer — what is PCI compliance? (SEO + clarity) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
            className="rounded-xl border border-accent/15 bg-gradient-to-br from-accent/[0.04] to-transparent p-6 sm:p-7"
          >
            <p className="mono-label text-accent text-[10px] tracking-[0.22em] mb-4">
              {f.pci.explainerTitle}
            </p>
            <p className="text-fog-50 text-[15px] sm:text-[16px] leading-relaxed font-medium text-pretty">
              {f.pci.explainerLead}
            </p>
            <p className="text-fog-400 text-[13.5px] sm:text-[14px] leading-relaxed text-pretty mt-3">
              {f.pci.explainerBody}
            </p>

            {/* 6 PCI DSS pillars — compact grid for SEO + clarity */}
            <div className="mt-6 grid sm:grid-cols-2 gap-2">
              {f.pci.explainerPillars.map((p) => (
                <div
                  key={p.code}
                  className="flex items-start gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5"
                >
                  <span className="mono-label text-accent text-[10px] tracking-[0.16em] shrink-0 mt-0.5">
                    {p.code}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-fog-100 text-[13px] font-medium leading-tight">{p.title}</p>
                    <p className="mono-label text-fog-500 text-[10px] tracking-[0.1em] mt-0.5">{p.meta}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-fog-300 text-[13.5px] sm:text-[14px] leading-relaxed text-pretty mt-6 pt-5 border-t border-white/[0.06]">
              {f.pci.explainerCloser}
            </p>
          </motion.div>
        </div>

        {/* CI/CD pipeline — runs the capabilities list as if it were a build */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85 }}
          className="min-w-0"
        >
          <CompliancePipeline items={f.pci.capabilities} />
        </motion.div>
      </div>
    </SectionShell>
  )
}

// =============================================================================
// 12 · ARCHITECTURE
// =============================================================================
function Architecture({ f }) {
  return (
    <SectionShell id="architecture">
      <div className="grid lg:grid-cols-[1fr_1fr] gap-12 items-center">
        <div>
          <SectionHeader
            eyebrow={f.architecture.eyebrow}
            title={f.architecture.title}
            accent={f.architecture.titleAccent}
            body={f.architecture.body}
            max="max-w-md"
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85 }}
        >
          <ArchitectureStack layers={f.architecture.layers} />
        </motion.div>
      </div>
    </SectionShell>
  )
}

// =============================================================================
// 13 · USE CASES
// =============================================================================
function UseCases({ f }) {
  return (
    <SectionShell id="use-cases">
      <Eyebrow>{f.useCases.eyebrow}</Eyebrow>
      <h2
        className="font-display font-semibold tracking-[-0.02em] leading-[1.06] text-fog-50 text-pretty max-w-3xl"
        style={{
          fontSize: 'clamp(22px, 4.4vw, 60px)',
          hyphens: 'auto',
          overflowWrap: 'anywhere',
          wordBreak: 'normal',
        }}
      >
        {f.useCases.title}
      </h2>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.85 }}
        className="mt-12"
      >
        <EditorialMosaic items={f.useCases.items} />
      </motion.div>
    </SectionShell>
  )
}

// =============================================================================
// 14 · DIFFERENTIATORS
// =============================================================================
function Differentiators({ f }) {
  return (
    <SectionShell id="why">
      <Eyebrow>{f.differentiators.eyebrow}</Eyebrow>
      <h2
        className="font-display font-semibold tracking-[-0.02em] leading-[1.06] text-fog-50 text-pretty"
        style={{
          fontSize: 'clamp(22px, 4.4vw, 60px)',
          hyphens: 'auto',
          overflowWrap: 'anywhere',
          wordBreak: 'normal',
        }}
      >
        {f.differentiators.title}
      </h2>
      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {f.differentiators.items.map((it, i) => (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: Math.min(i * 0.04, 0.3) }}
            className="rounded-xl border border-white/[0.07] bg-white/[0.015] p-5"
          >
            <p className="text-fog-50 text-[15px] font-medium mb-2">{it.title}</p>
            <p className="text-fog-400 text-[13px] leading-relaxed text-pretty">
              {it.body}
            </p>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  )
}

// =============================================================================
// 15 · PROCESS
// =============================================================================
function Process({ f }) {
  return (
    <SectionShell id="process">
      <Eyebrow>{f.process.eyebrow}</Eyebrow>
      <h2
        className="font-display font-semibold tracking-[-0.02em] leading-[1.06] text-fog-50 text-pretty max-w-3xl"
        style={{
          fontSize: 'clamp(22px, 4.4vw, 60px)',
          hyphens: 'auto',
          overflowWrap: 'anywhere',
          wordBreak: 'normal',
        }}
      >
        {f.process.title}
      </h2>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.85 }}
        className="mt-10"
      >
        <BuildPipeline steps={f.process.steps} />
      </motion.div>
    </SectionShell>
  )
}

// =============================================================================
// MID CTA
// =============================================================================
function MidCta({ f }) {
  return (
    <section id="mid-cta" className="relative py-20 sm:py-28 px-4 sm:px-8 lg:px-14">
      <div className="container-shell">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85 }}
          className="rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/5 to-transparent p-10 sm:p-14 text-center"
        >
          <h3
            className="font-display font-semibold text-fog-50 tracking-[-0.025em] leading-[1.1] text-balance max-w-3xl mx-auto"
            style={{ fontSize: 'clamp(24px, 3.6vw, 48px)' }}
          >
            {f.midCta.title}
          </h3>
          <p className="text-fog-300 text-[14px] sm:text-[15px] leading-relaxed text-pretty max-w-xl mx-auto mt-5">
            {f.midCta.body}
          </p>
          <a
            href="#contact"
            className="btn-primary mt-7 inline-flex"
          >
            {f.midCta.cta}
            <ArrowRight size={15} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

// =============================================================================
// FAQ
// =============================================================================
function FAQ({ f }) {
  const [openIdx, setOpenIdx] = useState(0)
  return (
    <SectionShell id="faq">
      <Eyebrow>{f.faq.eyebrow}</Eyebrow>
      <h2
        className="font-display font-semibold tracking-[-0.02em] leading-[1.06] text-fog-50 text-pretty"
        style={{
          fontSize: 'clamp(22px, 4.4vw, 60px)',
          hyphens: 'auto',
          overflowWrap: 'anywhere',
          wordBreak: 'normal',
        }}
      >
        {f.faq.title}
      </h2>
      <div className="mt-10 max-w-3xl space-y-2">
        {f.faq.items.map((it, i) => {
          const open = openIdx === i
          return (
            <div
              key={i}
              className="rounded-xl border border-white/[0.07] bg-white/[0.015] overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenIdx(open ? -1 : i)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="text-fog-100 text-[14px] sm:text-[15px] font-medium">
                  {it.q}
                </span>
                <span className="text-accent shrink-0">
                  {open ? <Minus size={16} /> : <Plus size={16} />}
                </span>
              </button>
              {open && (
                <div className="px-5 pb-5 pt-1 text-fog-400 text-[13.5px] leading-relaxed text-pretty border-t border-white/[0.04]">
                  {it.a}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </SectionShell>
  )
}

// =============================================================================
// FINAL CTA
// =============================================================================
function FinalCta({ f }) {
  return (
    <section id="contact" className="relative py-24 sm:py-32 px-4 sm:px-8 lg:px-14">
      <div className="container-shell relative">
        <Eyebrow>{f.finalCta.eyebrow}</Eyebrow>
        <h2
          className="font-display font-semibold tracking-[-0.03em] leading-[0.96] text-balance break-words max-w-4xl"
          style={{ fontSize: 'clamp(34px, 5.4vw, 80px)' }}
        >
          <span className="text-fog-50 block">{f.finalCta.title}</span>
          <span className="text-fog-300 block font-light italic">
            {f.finalCta.titleAccent}
          </span>
        </h2>
        <p className="mt-6 text-fog-300 text-[15px] sm:text-[16px] leading-relaxed text-pretty max-w-2xl">
          {f.finalCta.body}
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <a href="mailto:hello@eradigitalsolutions.com" className="btn-primary">
            {f.finalCta.cta}
            <ArrowRight size={15} />
          </a>
          <a
            href="/"
            className="text-fog-300 text-[14px] inline-flex items-center gap-1.5 hover:text-accent transition-colors"
          >
            {f.finalCta.ctaSecondary} <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </section>
  )
}
