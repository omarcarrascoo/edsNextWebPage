'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import {
  ArrowRight, ArrowUpRight, ChevronRight, Plus, Minus,
  ShoppingBag, ShoppingCart, Package, Users, Truck, Wallet,
  BarChart3, Bot, Layers, Tag, Boxes, Workflow,
} from 'lucide-react'
import SiteHeader from '@/components/site/SiteHeader'
import SiteFooter from '@/components/site/SiteFooter'
import { useT } from '@/i18n/LanguageProvider'
import {
  TickerNumber, ArchitectureStack, BuildPipeline, EditorialMosaic,
  POSGrid, InventoryTicker,
} from '@/components/graph/FintechGraphics'

const ParticleCart = dynamic(
  () => import('@/components/graph/ParticleCart'),
  { ssr: false, loading: () => null },
)

const capabilityIcons = {
  '01': ShoppingBag, '02': ShoppingCart, '03': Boxes, '04': Users,
  '05': Truck, '06': Wallet, '07': BarChart3, '08': Bot,
}

export default function CommercePage() {
  const t = useT()
  const c = t.commerce
  if (!c) return null

  return (
    <>
      <SiteHeader />
      <main className="relative bg-[#05080C] text-fog-100">
        <Hero c={c} />
        <Problem c={c} />
        <Value c={c} />
        <Ecommerce c={c} />
        <POS c={c} />
        <Inventory c={c} />
        <Catalog c={c} />
        <Clients c={c} />
        <Suppliers c={c} />
        <Dashboards c={c} />
        <Omnichannel c={c} />
        <AICallout c={c} />
        <Architecture c={c} />
        <UseCases c={c} />
        <Differentiators c={c} />
        <Process c={c} />
        <Stack c={c} />
        <MidCta c={c} />
        <FAQ c={c} />
        <FinalCta c={c} />
      </main>
      <SiteFooter />
    </>
  )
}

// ============================================================================
// shared utilities
// ============================================================================
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

function H2({ title, accent, max = 'max-w-3xl', align = 'left', size = 'clamp(22px, 4.4vw, 60px)' }) {
  const alignCls = align === 'center' ? 'text-center mx-auto' : 'text-left'
  return (
    <motion.h2
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      className={`font-display font-semibold tracking-[-0.02em] leading-[1.06] text-pretty ${max} ${alignCls}`}
      style={{ fontSize: size, hyphens: 'auto', overflowWrap: 'anywhere' }}
    >
      <span className="text-fog-50 block">{title}</span>
      {accent && (
        <span className="text-fog-300 block font-light italic">{accent}</span>
      )}
    </motion.h2>
  )
}

// ============================================================================
// 01 — HERO (full-bleed cart particles)
// ============================================================================
function Hero({ c }) {
  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: '100vh', background: '#05080C' }}
    >
      <div className="absolute inset-0 z-0">
        <ParticleCart />
      </div>

      <div
        aria-hidden
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, rgba(5,8,12,0.85) 0%, rgba(5,8,12,0.45) 30%, rgba(5,8,12,0.0) 60%, rgba(5,8,12,0.0) 100%)',
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[20%] z-[1] pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(5,8,12,0.7), transparent)' }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[28%] z-[1] pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(5,8,12,0.85), transparent)' }}
      />

      {/* breadcrumb */}
      <div className="absolute top-24 sm:top-28 left-4 sm:left-8 lg:left-14 z-10">
        <p className="mono-label text-fog-500 text-[10px] tracking-[0.22em] flex items-center gap-2">
          <a href="/" className="hover:text-fog-200 transition-colors">
            {c.breadcrumb.services}
          </a>
          <ChevronRight size={11} />
          <span className="text-accent">{c.breadcrumb.current}</span>
        </p>
      </div>

      {/* status */}
      <div className="absolute top-24 sm:top-28 right-4 sm:right-8 lg:right-14 z-10 hidden sm:flex flex-col items-end gap-1 pointer-events-none">
        <div className="flex items-center gap-2">
          <ShoppingBag size={11} className="text-accent" />
          <span className="mono-label text-accent text-[10px] tracking-[0.22em]">
            {c.hero.hudOmni}
          </span>
        </div>
        <span className="mono-label text-fog-500 text-[10px] tracking-[0.22em]">
          {c.hero.hudInteract}
        </span>
      </div>

      {/* copy bottom-left */}
      <div className="absolute inset-x-0 bottom-0 z-10 px-4 sm:px-8 lg:px-14 pb-12 sm:pb-16">
        <div className="container-shell">
          <Eyebrow>{c.hero.eyebrow}</Eyebrow>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="font-display font-semibold tracking-[-0.035em] leading-[0.94] text-pretty"
            style={{ fontSize: 'clamp(40px, 7.4vw, 110px)', hyphens: 'auto', overflowWrap: 'anywhere' }}
          >
            <span className="text-fog-50 block">{c.hero.titleA}</span>
            <span className="text-fog-200 block">{c.hero.titleB}</span>
            <span className="text-fog-300 block font-light italic">{c.hero.titleC}</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-6 grid lg:grid-cols-[1.4fr_1fr] gap-8 items-end"
          >
            <p
              className="editorial text-fog-200 text-pretty break-words max-w-xl"
              style={{ fontSize: 'clamp(17px, 1.8vw, 24px)', lineHeight: 1.3 }}
            >
              {c.hero.titleAccent}{' '}
              <span className="text-fog-400 font-normal">{c.hero.subtitle}</span>
            </p>
            <div className="flex flex-wrap items-center gap-3 lg:justify-end">
              <a href="#contact" className="btn-primary">
                {c.hero.ctaPrimary}
                <ArrowRight size={15} />
              </a>
              <a href="#capabilities" className="text-fog-300 text-[14px] inline-flex items-center gap-1.5 hover:text-accent transition-colors">
                {c.hero.ctaSecondary} <ChevronRight size={13} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <div aria-hidden className="absolute inset-6 sm:inset-10 pointer-events-none z-[2]">
        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-accent/35" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-accent/35" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-accent/35" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-accent/35" />
      </div>
    </section>
  )
}

// ============================================================================
// 02 — PROBLEM (centered editorial + symptom chips)
// ============================================================================
function Problem({ c }) {
  return (
    <SectionShell id="problem">
      <div className="text-center mx-auto max-w-3xl">
        <Eyebrow>{c.problem.eyebrow}</Eyebrow>
        <H2 title={c.problem.title} accent={c.problem.titleAccent} max="max-w-3xl" align="center" />
        <p className="text-fog-300 text-[15px] sm:text-[16px] leading-relaxed text-pretty mt-6 max-w-xl mx-auto">
          {c.problem.body}
        </p>
      </div>
      <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-2 max-w-4xl mx-auto">
        {c.problem.symptoms.map((s) => (
          <div
            key={s.tag}
            className="rounded-lg border border-white/[0.07] bg-white/[0.015] px-3 py-3"
          >
            <p className="mono-label text-signal-amber text-[10px] tracking-[0.18em] mb-1">{s.tag}</p>
            <p className="text-fog-200 text-[13px] leading-tight">{s.text}</p>
          </div>
        ))}
      </div>
      <p className="mt-12 text-fog-400 text-[14px] sm:text-[15px] leading-relaxed text-pretty max-w-2xl mx-auto text-center">
        {c.problem.closing}
      </p>
    </SectionShell>
  )
}

// ============================================================================
// 03 — VALUE (sticky left + 8 capability bento right)
// ============================================================================
function Value({ c }) {
  return (
    <SectionShell id="capabilities">
      <div className="grid lg:grid-cols-[1fr_1.3fr] gap-10 lg:gap-14 items-start min-w-0">
        <div className="min-w-0 lg:sticky lg:top-32">
          <Eyebrow>{c.value.eyebrow}</Eyebrow>
          <H2 title={c.value.title} accent={c.value.titleAccent} max="max-w-md" />
          <p className="text-fog-300 text-[15px] sm:text-[16px] leading-relaxed text-pretty mt-6 max-w-md">
            {c.value.body}
          </p>
          <p className="text-fog-500 text-[13.5px] leading-relaxed text-pretty mt-5 italic max-w-md">
            {c.value.closing}
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 min-w-0"
        >
          {c.value.capabilities.map((cap) => {
            const Icon = capabilityIcons[cap.code] || Layers
            return (
              <div
                key={cap.code}
                className="group rounded-xl border border-white/[0.07] bg-white/[0.015] p-4 hover:bg-white/[0.04] hover:border-accent/20 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex w-9 h-9 rounded-lg bg-accent/10 border border-accent/25 items-center justify-center text-accent">
                    <Icon size={15} />
                  </span>
                  <span className="mono-label text-fog-600 text-[10px] tracking-[0.18em]">{cap.code}</span>
                </div>
                <p className="mono-label text-accent text-[10px] tracking-[0.22em] mb-1">{cap.tag}</p>
                <p className="text-fog-50 text-[14px] sm:text-[15px] font-medium leading-tight">{cap.title}</p>
                <p className="mono-label text-fog-500 text-[10px] tracking-[0.12em] mt-1.5 truncate">
                  {cap.meta}
                </p>
              </div>
            )
          })}
        </motion.div>
      </div>
    </SectionShell>
  )
}

// ============================================================================
// 04 — ECOMMERCE (left copy + right feature grid)
// ============================================================================
function Ecommerce({ c }) {
  return (
    <SectionShell id="ecommerce">
      <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-14 items-center min-w-0">
        <div className="min-w-0">
          <Eyebrow>{c.ecommerce.eyebrow}</Eyebrow>
          <H2 title={c.ecommerce.title} accent={c.ecommerce.titleAccent} max="max-w-md" />
          <p className="text-fog-300 text-[15px] sm:text-[16px] leading-relaxed text-pretty mt-6 max-w-md">
            {c.ecommerce.body}
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85 }}
          className="grid grid-cols-2 gap-1.5 min-w-0"
        >
          {c.ecommerce.features.map((f) => (
            <span
              key={f}
              className="mono-label text-fog-300 text-[10px] tracking-[0.12em] px-3 py-2.5 rounded-md border border-white/[0.06] bg-white/[0.015]"
            >
              {f}
            </span>
          ))}
        </motion.div>
      </div>
    </SectionShell>
  )
}

// ============================================================================
// 05 — POS (POSGrid widget left + copy + kinds right)
// ============================================================================
function POS({ c }) {
  return (
    <SectionShell id="pos">
      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-14 items-center min-w-0">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85 }}
          className="min-w-0 order-2 lg:order-1"
        >
          <POSGrid kinds={c.pos.kinds} capabilities={c.pos.capabilities} />
        </motion.div>
        <div className="min-w-0 order-1 lg:order-2">
          <Eyebrow>{c.pos.eyebrow}</Eyebrow>
          <H2 title={c.pos.title} accent={c.pos.titleAccent} max="max-w-md" />
          <p className="text-fog-300 text-[15px] sm:text-[16px] leading-relaxed text-pretty mt-6 max-w-md">
            {c.pos.body}
          </p>
          <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {c.pos.kinds.map((k) => (
              <div
                key={k.tag}
                className="rounded-lg border border-white/[0.06] bg-white/[0.015] px-3 py-2"
              >
                <p className="mono-label text-accent text-[10px] tracking-[0.18em] mb-0.5">
                  {k.tag}
                </p>
                <p className="text-fog-100 text-[13px] font-medium leading-tight">{k.name}</p>
                <p className="mono-label text-fog-500 text-[9px] tracking-[0.12em] mt-0.5 truncate">
                  {k.meta}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  )
}

// ============================================================================
// 06 — INVENTORY (right-aligned editorial + InventoryTicker left)
// ============================================================================
function Inventory({ c }) {
  return (
    <SectionShell id="inventory">
      <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-14 items-center min-w-0">
        <div className="min-w-0">
          <Eyebrow>{c.inventory.eyebrow}</Eyebrow>
          <H2 title={c.inventory.title} accent={c.inventory.titleAccent} max="max-w-md" />
          <p className="text-fog-300 text-[15px] sm:text-[16px] leading-relaxed text-pretty mt-6 max-w-md">
            {c.inventory.body}
          </p>
          <p className="text-fog-500 text-[13.5px] leading-relaxed text-pretty mt-5 italic max-w-md">
            {c.inventory.closing}
          </p>
          <div className="mt-7 grid grid-cols-2 gap-1.5 max-w-md">
            {c.inventory.features.map((f) => (
              <span
                key={f}
                className="mono-label text-fog-300 text-[10px] tracking-[0.12em] px-2.5 py-1.5 rounded-md border border-white/[0.06] bg-white/[0.015] truncate"
              >
                {f}
              </span>
            ))}
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85 }}
          className="min-w-0"
        >
          <InventoryTicker />
        </motion.div>
      </div>
    </SectionShell>
  )
}

// ============================================================================
// 07 — CATALOG (centered + 2-col feature grid)
// ============================================================================
function Catalog({ c }) {
  return (
    <SectionShell id="catalog">
      <div className="text-center max-w-3xl mx-auto">
        <Eyebrow>{c.catalog.eyebrow}</Eyebrow>
        <H2 title={c.catalog.title} accent={c.catalog.titleAccent} max="max-w-3xl" align="center" />
        <p className="text-fog-300 text-[15px] sm:text-[16px] leading-relaxed text-pretty mt-6 max-w-xl mx-auto">
          {c.catalog.body}
        </p>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.85 }}
        className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-2 max-w-4xl mx-auto"
      >
        {c.catalog.features.map((f) => (
          <div
            key={f}
            className="rounded-lg border border-white/[0.07] bg-white/[0.015] px-3 py-3 hover:bg-white/[0.04] hover:border-accent/20 transition-all"
          >
            <Tag size={11} className="text-accent mb-2" />
            <p className="text-fog-200 text-[12.5px] leading-tight">{f}</p>
          </div>
        ))}
      </motion.div>
    </SectionShell>
  )
}

// ============================================================================
// 08 — CLIENTS (centered editorial + 6-tile grid)
// ============================================================================
function Clients({ c }) {
  return (
    <SectionShell id="clients">
      <div className="grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-14 items-center min-w-0">
        <div className="min-w-0">
          <Eyebrow>{c.clients.eyebrow}</Eyebrow>
          <H2 title={c.clients.title} accent={c.clients.titleAccent} max="max-w-md" />
          <p className="text-fog-300 text-[15px] sm:text-[16px] leading-relaxed text-pretty mt-6 max-w-md">
            {c.clients.body}
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85 }}
          className="grid sm:grid-cols-2 gap-2.5 min-w-0"
        >
          {c.clients.features.map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-white/[0.07] bg-white/[0.015] p-4"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <Users size={11} className="text-accent" />
                <p className="text-fog-50 text-[14px] font-medium leading-tight">{f.title}</p>
              </div>
              <p className="mono-label text-fog-500 text-[10px] tracking-[0.12em]">{f.meta}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </SectionShell>
  )
}

// ============================================================================
// 09 — SUPPLIERS (right-aligned headline + feature pills)
// ============================================================================
function Suppliers({ c }) {
  return (
    <SectionShell id="suppliers">
      <div className="ml-auto max-w-3xl text-right min-w-0">
        <Eyebrow>{c.suppliers.eyebrow}</Eyebrow>
        <p
          className="font-display font-semibold text-fog-50 tracking-[-0.02em] leading-[1.06] text-pretty"
          style={{ fontSize: 'clamp(22px, 4.4vw, 60px)', hyphens: 'auto', overflowWrap: 'anywhere' }}
        >
          {c.suppliers.title}
        </p>
        <p
          className="font-display font-light italic text-fog-300 leading-[1.1] mt-1 text-pretty"
          style={{ fontSize: 'clamp(22px, 4.4vw, 60px)', hyphens: 'auto', overflowWrap: 'anywhere' }}
        >
          {c.suppliers.titleAccent}
        </p>
        <p className="text-fog-300 text-[15px] sm:text-[16px] leading-relaxed text-pretty mt-6 max-w-xl ml-auto">
          {c.suppliers.body}
        </p>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.85 }}
        className="mt-12 flex flex-wrap justify-end gap-1.5 max-w-3xl ml-auto"
      >
        {c.suppliers.features.map((f) => (
          <span
            key={f}
            className="mono-label text-fog-300 text-[10px] tracking-[0.16em] px-3 py-1.5 rounded-full border border-white/[0.07] bg-white/[0.02]"
          >
            {f}
          </span>
        ))}
      </motion.div>
    </SectionShell>
  )
}

// ============================================================================
// 10 — DASHBOARDS (centered + 6 ticker grid)
// ============================================================================
function Dashboards({ c }) {
  return (
    <SectionShell id="dashboards">
      <div className="text-center max-w-3xl mx-auto">
        <Eyebrow>{c.dashboards.eyebrow}</Eyebrow>
        <H2 title={c.dashboards.title} accent={c.dashboards.titleAccent} max="max-w-3xl" align="center" />
        <p className="text-fog-300 text-[15px] sm:text-[16px] leading-relaxed text-pretty mt-6 max-w-xl mx-auto">
          {c.dashboards.body}
        </p>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.85 }}
        className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-3"
      >
        {c.dashboards.tickers.map((tk) => {
          const num = parseFloat(String(tk.value).replace(/[^0-9.\-]/g, '')) || 100
          const prefix = String(tk.value).includes('$') ? '$' : ''
          const isMs = String(tk.value).includes('ms')
          const isPct = String(tk.value).includes('%')
          const suffix = isMs ? 'ms' : isPct ? '%' : ''
          return (
            <TickerNumber
              key={tk.label}
              label={tk.label}
              base={num}
              volatility={tk.up ? 0.04 : 0.06}
              prefix={prefix}
              suffix={suffix}
            />
          )
        })}
      </motion.div>
      <p className="mt-10 text-fog-400 text-[14px] leading-relaxed text-pretty max-w-2xl mx-auto text-center">
        {c.dashboards.closing}
      </p>
    </SectionShell>
  )
}

// ============================================================================
// 11 — OMNICHANNEL (centered headline + flow stack)
// ============================================================================
function Omnichannel({ c }) {
  return (
    <SectionShell id="omnichannel">
      <div className="text-center max-w-3xl mx-auto">
        <Eyebrow>{c.omnichannel.eyebrow}</Eyebrow>
        <H2 title={c.omnichannel.title} accent={c.omnichannel.titleAccent} max="max-w-3xl" align="center" />
        <p className="text-fog-300 text-[15px] sm:text-[16px] leading-relaxed text-pretty mt-6 max-w-xl mx-auto">
          {c.omnichannel.body}
        </p>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.85 }}
        className="mt-12 max-w-2xl mx-auto"
      >
        <ArchitectureStack layers={c.omnichannel.flow} />
      </motion.div>
    </SectionShell>
  )
}

// ============================================================================
// 12 — AI CALLOUT (centered minimal + chip cloud + ironic close)
// ============================================================================
function AICallout({ c }) {
  return (
    <SectionShell id="ai">
      <div className="text-center mx-auto max-w-3xl min-w-0">
        <Eyebrow>{c.aiCallout.eyebrow}</Eyebrow>
        <H2 title={c.aiCallout.title} accent={c.aiCallout.titleAccent} max="max-w-3xl" align="center" />
        <p className="text-fog-300 text-[15px] sm:text-[16px] leading-relaxed text-pretty mt-6 max-w-xl mx-auto">
          {c.aiCallout.body}
        </p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-10 flex flex-wrap justify-center gap-1.5 max-w-2xl mx-auto"
        >
          {c.aiCallout.uses.map((u) => (
            <span
              key={u}
              className="mono-label text-fog-300 text-[10px] tracking-[0.18em] px-2.5 py-1.5 rounded-full border border-white/[0.07] bg-white/[0.02]"
            >
              {u}
            </span>
          ))}
        </motion.div>
        <p className="text-fog-500 text-[13px] leading-relaxed text-pretty mt-10 italic max-w-xl mx-auto">
          {c.aiCallout.closing}
        </p>
      </div>
    </SectionShell>
  )
}

// ============================================================================
// 13 — ARCHITECTURE
// ============================================================================
function Architecture({ c }) {
  return (
    <SectionShell id="architecture">
      <div className="grid lg:grid-cols-[1fr_1fr] gap-12 items-center min-w-0">
        <div className="min-w-0">
          <Eyebrow>{c.architecture.eyebrow}</Eyebrow>
          <H2 title={c.architecture.title} accent={c.architecture.titleAccent} max="max-w-md" />
          <p className="text-fog-300 text-[15px] sm:text-[16px] leading-relaxed text-pretty mt-6 max-w-md">
            {c.architecture.body}
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85 }}
          className="min-w-0"
        >
          <ArchitectureStack layers={c.architecture.layers} />
        </motion.div>
      </div>
    </SectionShell>
  )
}

// ============================================================================
// 14 — USE CASES (mosaic)
// ============================================================================
function UseCases({ c }) {
  return (
    <SectionShell id="use-cases">
      <Eyebrow>{c.useCases.eyebrow}</Eyebrow>
      <H2 title={c.useCases.title} max="max-w-3xl" />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.85 }}
        className="mt-12"
      >
        <EditorialMosaic items={c.useCases.items} />
      </motion.div>
    </SectionShell>
  )
}

// ============================================================================
// 15 — DIFFERENTIATORS
// ============================================================================
function Differentiators({ c }) {
  return (
    <SectionShell id="why">
      <Eyebrow>{c.differentiators.eyebrow}</Eyebrow>
      <H2 title={c.differentiators.title} max="max-w-3xl" />
      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {c.differentiators.items.map((it, i) => (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: Math.min(i * 0.04, 0.3) }}
            className="rounded-xl border border-white/[0.07] bg-white/[0.015] p-5"
          >
            <p className="text-fog-50 text-[15px] font-medium mb-2">{it.title}</p>
            <p className="text-fog-400 text-[13px] leading-relaxed text-pretty">{it.body}</p>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  )
}

// ============================================================================
// 16 — PROCESS (BuildPipeline)
// ============================================================================
function Process({ c }) {
  return (
    <SectionShell id="process">
      <Eyebrow>{c.process.eyebrow}</Eyebrow>
      <H2 title={c.process.title} max="max-w-3xl" />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.85 }}
        className="mt-10"
      >
        <BuildPipeline steps={c.process.steps} />
      </motion.div>
    </SectionShell>
  )
}

// ============================================================================
// 17 — STACK
// ============================================================================
function Stack({ c }) {
  return (
    <SectionShell id="stack">
      <Eyebrow>{c.stack.eyebrow}</Eyebrow>
      <H2 title={c.stack.title} accent={c.stack.titleAccent} max="max-w-3xl" />
      <p className="text-fog-300 text-[15px] sm:text-[16px] leading-relaxed text-pretty mt-6 max-w-2xl">
        {c.stack.body}
      </p>
      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {c.stack.groups.map((group, i) => (
          <motion.div
            key={group.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: Math.min(i * 0.08, 0.3) }}
            className="rounded-xl border border-white/[0.07] bg-white/[0.015] p-5"
          >
            <p className="mono-label text-accent text-[10px] tracking-[0.22em] mb-4">{group.label}</p>
            <div className="flex flex-wrap gap-1.5">
              {group.items.map((it) => (
                <span
                  key={it}
                  className="mono-label text-fog-200 text-[11px] tracking-[0.08em] px-2.5 py-1 rounded-md border border-white/[0.06] bg-white/[0.02]"
                >
                  {it}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  )
}

// ============================================================================
// 18 — MID CTA
// ============================================================================
function MidCta({ c }) {
  return (
    <section className="relative py-20 sm:py-28 px-4 sm:px-8 lg:px-14">
      <div className="container-shell">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85 }}
          className="rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/5 to-transparent p-10 sm:p-14 text-center"
        >
          <h3
            className="font-display font-semibold text-fog-50 tracking-[-0.025em] leading-[1.1] text-pretty max-w-3xl mx-auto"
            style={{ fontSize: 'clamp(22px, 3.6vw, 48px)', hyphens: 'auto', overflowWrap: 'anywhere' }}
          >
            {c.midCta.title}
          </h3>
          <p className="text-fog-300 text-[14px] sm:text-[15px] leading-relaxed text-pretty max-w-xl mx-auto mt-5">
            {c.midCta.body}
          </p>
          <a href="#contact" className="btn-primary mt-7 inline-flex">
            {c.midCta.cta}
            <ArrowRight size={15} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// 19 — FAQ
// ============================================================================
function FAQ({ c }) {
  const [openIdx, setOpenIdx] = useState(0)
  return (
    <SectionShell id="faq">
      <Eyebrow>{c.faq.eyebrow}</Eyebrow>
      <H2 title={c.faq.title} max="max-w-3xl" />
      <div className="mt-10 max-w-3xl space-y-2">
        {c.faq.items.map((it, i) => {
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
                <span className="text-fog-100 text-[14px] sm:text-[15px] font-medium">{it.q}</span>
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

// ============================================================================
// 20 — FINAL CTA
// ============================================================================
function FinalCta({ c }) {
  return (
    <section id="contact" className="relative py-24 sm:py-32 px-4 sm:px-8 lg:px-14">
      <div className="container-shell relative">
        <Eyebrow>{c.finalCta.eyebrow}</Eyebrow>
        <h2
          className="font-display font-semibold tracking-[-0.03em] leading-[0.96] text-pretty max-w-4xl"
          style={{ fontSize: 'clamp(32px, 5.2vw, 76px)', hyphens: 'auto', overflowWrap: 'anywhere' }}
        >
          <span className="text-fog-50 block">{c.finalCta.title}</span>
          <span className="text-fog-300 block font-light italic">{c.finalCta.titleAccent}</span>
        </h2>
        <p className="mt-6 text-fog-300 text-[15px] sm:text-[16px] leading-relaxed text-pretty max-w-2xl">
          {c.finalCta.body}
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <a href="mailto:omar.carrasco.aranda@gmail.com" className="btn-primary">
            {c.finalCta.cta}
            <ArrowRight size={15} />
          </a>
          <a href="/" className="text-fog-300 text-[14px] inline-flex items-center gap-1.5 hover:text-accent transition-colors">
            {c.finalCta.ctaSecondary} <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </section>
  )
}
