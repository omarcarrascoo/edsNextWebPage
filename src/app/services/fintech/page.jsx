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
    <section className="relative overflow-hidden pt-32 sm:pt-44 pb-20 sm:pb-32">
      {/* breadcrumb */}
      <div className="container-shell relative z-10 mb-8">
        <p className="mono-label text-fog-500 text-[10px] tracking-[0.22em] flex items-center gap-2">
          <a href="/" className="hover:text-fog-200 transition-colors">
            {f.breadcrumb.services}
          </a>
          <ChevronRight size={11} />
          <span className="text-accent">{f.breadcrumb.current}</span>
        </p>
      </div>

      {/* grid backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage:
            'radial-gradient(ellipse 80% 60% at 70% 50%, black, transparent 80%)',
        }}
      />

      <div className="container-shell relative z-10 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
        {/* LEFT — copy */}
        <div>
          <Eyebrow>{f.hero.eyebrow}</Eyebrow>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-semibold tracking-[-0.035em] leading-[0.96] text-balance break-words"
            style={{ fontSize: 'clamp(36px, 6vw, 88px)' }}
          >
            <span className="text-fog-50 block">{f.hero.titleA}</span>
            <span className="text-fog-200 block">{f.hero.titleB}</span>
            <span className="text-fog-300 block font-light italic">{f.hero.titleC}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="editorial text-fog-300 mt-5 text-pretty break-words"
            style={{ fontSize: 'clamp(18px, 2vw, 28px)', lineHeight: 1.3 }}
          >
            {f.hero.titleAccent}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-6 text-fog-400 text-[14px] sm:text-[15px] leading-relaxed text-pretty max-w-xl"
          >
            {f.hero.subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
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
          </motion.div>
        </div>

        {/* RIGHT — live tickers */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, delay: 0.2 }}
          className="grid grid-cols-2 gap-3"
        >
          <TickerNumber label={f.hero.hudVolume} base={4820000} volatility={0.025} prefix="$" />
          <TickerNumber label={f.hero.hudLatency} base={142} volatility={0.18} suffix="ms" />
          <TickerNumber label={f.hero.hudLive} base={12480} volatility={0.05} />
          <TickerNumber label={f.hero.hudPCI} base={99.94} volatility={0.005} suffix="%" />
        </motion.div>
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
function Capabilities({ f }) {
  return (
    <SectionShell id="capabilities">
      <SectionHeader
        eyebrow={f.capabilities.eyebrow}
        title={f.capabilities.title}
        accent={f.capabilities.titleAccent}
      />
      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {f.capabilities.items.map((it, i) => {
          const Icon = capabilityIcons[it.code] || Cpu
          return (
            <motion.div
              key={it.code}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: Math.min(i * 0.04, 0.3) }}
              className="group rounded-xl border border-white/[0.07] bg-white/[0.015] p-5 hover:bg-white/[0.04] hover:border-accent/20 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex w-10 h-10 rounded-lg bg-accent/10 border border-accent/25 items-center justify-center text-accent">
                  <Icon size={17} />
                </span>
                <span className="mono-label text-fog-600 text-[10px] tracking-[0.18em]">
                  {it.code}
                </span>
              </div>
              <p className="mono-label text-accent text-[10px] tracking-[0.22em] mb-1.5">
                {it.tag}
              </p>
              <p className="text-fog-50 text-[15px] font-medium leading-tight">
                {it.title}
              </p>
              <p className="mono-label text-fog-500 text-[10px] tracking-[0.12em] mt-2 truncate">
                {it.meta}
              </p>
            </motion.div>
          )
        })}
      </div>
    </SectionShell>
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
          style={{ height: 'clamp(380px, 56vh, 560px)' }}
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
      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 items-center">
        <div>
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
// 07 · SALESFORCE
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
      <SectionHeader
        eyebrow={f.dashboards.eyebrow}
        title={f.dashboards.title}
        accent={f.dashboards.titleAccent}
        body={f.dashboards.body}
        max="max-w-3xl"
      />
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.85 }}
        className="mt-10"
      >
        <TradingWall />
      </motion.div>
      <p className="mt-10 text-fog-400 text-[14px] leading-relaxed text-pretty max-w-2xl">
        {f.dashboards.closing}
      </p>
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
      <div className="grid lg:grid-cols-[1fr_1fr] gap-12 items-start">
        <div className="space-y-8">
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
