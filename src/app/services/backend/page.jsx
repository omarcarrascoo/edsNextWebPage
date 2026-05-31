'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import {
  ArrowRight, ArrowUpRight, ChevronRight, Plus, Minus,
  Database, Cloud, Shield, KeyRound, Network, Zap, Cpu, Server,
  GitBranch, Activity, Hand, Layers, Boxes,
} from 'lucide-react'
import SiteHeader from '@/components/site/SiteHeader'
import SiteFooter from '@/components/site/SiteFooter'
import { useT } from '@/i18n/LanguageProvider'
import {
  ArchitectureStack, BuildPipeline, EditorialMosaic,
} from '@/components/graph/FintechGraphics'

const ParticleServer = dynamic(
  () => import('@/components/graph/ParticleServer'),
  { ssr: false, loading: () => null },
)

const ParticleAPIs = dynamic(
  () => import('@/components/graph/ParticleAPIs'),
  { ssr: false, loading: () => null },
)

const capabilityIcons = {
  '01': Network, '02': Boxes, '03': Database, '04': KeyRound,
  '05': Cloud, '06': GitBranch, '07': Zap, '08': Activity,
}

export default function BackendPage() {
  const t = useT()
  const b = t.backend
  if (!b) return null

  return (
    <>
      <SiteHeader />
      <main className="relative bg-[#05080C] text-fog-100">
        <Hero b={b} />
        <Problem b={b} />
        <Value b={b} />
        <APIs b={b} />
        <Microservices b={b} />
        <Databases b={b} />
        <Auth b={b} />
        <Cloud_ b={b} />
        <Integrations b={b} />
        <Architecture b={b} />
        <UseCases b={b} />
        <Differentiators b={b} />
        <Process b={b} />
        <Stack b={b} />
        <MidCta b={b} />
        <SecuritySection b={b} />
        <FAQ b={b} />
        <FinalCta b={b} />
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
// 01 — HERO (full-bleed particle server, copy bottom-left)
// ============================================================================
function Hero({ b }) {
  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: '100vh', background: '#05080C' }}
    >
      <div className="absolute inset-0 z-0">
        <ParticleServer />
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

      {/* breadcrumb top-left */}
      <div className="absolute top-24 sm:top-28 left-4 sm:left-8 lg:left-14 z-10">
        <p className="mono-label text-fog-500 text-[10px] tracking-[0.22em] flex items-center gap-2">
          <a href="/" className="hover:text-fog-200 transition-colors">
            {b.breadcrumb.services}
          </a>
          <ChevronRight size={11} />
          <span className="text-accent">{b.breadcrumb.current}</span>
        </p>
      </div>

      {/* status top-right */}
      <div className="absolute top-24 sm:top-28 right-4 sm:right-8 lg:right-14 z-10 hidden sm:flex flex-col items-end gap-1 pointer-events-none">
        <div className="flex items-center gap-2">
          <Server size={11} className="text-accent" />
          <span className="mono-label text-accent text-[10px] tracking-[0.22em]">
            {b.hero.hudUptime}
          </span>
        </div>
        <span className="mono-label text-fog-500 text-[10px] tracking-[0.22em]">
          {b.hero.hudInteract}
        </span>
      </div>

      {/* copy anchored bottom-left */}
      <div className="absolute inset-x-0 bottom-0 z-10 px-4 sm:px-8 lg:px-14 pb-12 sm:pb-16">
        <div className="container-shell">
          <Eyebrow>{b.hero.eyebrow}</Eyebrow>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="font-display font-semibold tracking-[-0.035em] leading-[0.94] text-pretty"
            style={{ fontSize: 'clamp(40px, 7.4vw, 110px)', hyphens: 'auto', overflowWrap: 'anywhere' }}
          >
            <span className="text-fog-50 block">{b.hero.titleA}</span>
            <span className="text-fog-200 block">{b.hero.titleB}</span>
            <span className="text-fog-300 block font-light italic">{b.hero.titleC}</span>
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
              {b.hero.titleAccent}{' '}
              <span className="text-fog-400 font-normal">{b.hero.subtitle}</span>
            </p>
            <div className="flex flex-wrap items-center gap-3 lg:justify-end">
              <a href="#contact" className="btn-primary">
                {b.hero.ctaPrimary}
                <ArrowRight size={15} />
              </a>
              <a href="#capabilities" className="text-fog-300 text-[14px] inline-flex items-center gap-1.5 hover:text-accent transition-colors">
                {b.hero.ctaSecondary} <ChevronRight size={13} />
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
// 02 — PROBLEM (right-aligned editorial + symptom chip strip)
// ============================================================================
function Problem({ b }) {
  return (
    <SectionShell id="problem">
      <div className="grid lg:grid-cols-[1fr_1.3fr] gap-10 lg:gap-16 items-end min-w-0">
        {/* left: a single huge mono question */}
        <div className="min-w-0">
          <Eyebrow>{b.problem.eyebrow}</Eyebrow>
          <p
            className="font-display font-semibold text-fog-50 tracking-[-0.025em] leading-[0.96] text-pretty"
            style={{ fontSize: 'clamp(28px, 4.6vw, 70px)', hyphens: 'auto', overflowWrap: 'anywhere' }}
          >
            {b.problem.title}
          </p>
          <p
            className="font-display font-light italic text-fog-300 leading-[1.06] mt-1 text-pretty"
            style={{ fontSize: 'clamp(28px, 4.6vw, 70px)', hyphens: 'auto', overflowWrap: 'anywhere' }}
          >
            {b.problem.titleAccent}
          </p>
        </div>
        <div className="min-w-0 max-w-md">
          <p className="text-fog-300 text-[15px] sm:text-[16px] leading-relaxed text-pretty">
            {b.problem.body}
          </p>
        </div>
      </div>

      {/* horizontal scrolling symptoms strip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-2"
      >
        {b.problem.symptoms.map((s) => (
          <div
            key={s.tag}
            className="rounded-lg border border-white/[0.07] bg-white/[0.015] px-3 py-3"
          >
            <p className="mono-label text-signal-amber text-[10px] tracking-[0.18em] mb-1">{s.tag}</p>
            <p className="text-fog-200 text-[13px] leading-tight">{s.text}</p>
          </div>
        ))}
      </motion.div>

      <p className="mt-12 text-fog-400 text-[14px] sm:text-[15px] leading-relaxed text-pretty max-w-2xl pt-8 border-t border-white/[0.06]">
        {b.problem.closing}
      </p>
    </SectionShell>
  )
}

// ============================================================================
// 03 — VALUE (centered headline + 8 capability bento)
// ============================================================================
function Value({ b }) {
  return (
    <SectionShell id="capabilities">
      <div className="text-center mx-auto max-w-3xl min-w-0">
        <Eyebrow>{b.value.eyebrow}</Eyebrow>
        <H2 title={b.value.title} accent={b.value.titleAccent} max="max-w-3xl" align="center" />
        <p className="text-fog-300 text-[15px] sm:text-[16px] leading-relaxed text-pretty mt-6 max-w-xl mx-auto">
          {b.value.body}
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.85 }}
        className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-3 min-w-0"
      >
        {b.value.capabilities.map((c, i) => {
          const Icon = capabilityIcons[c.code] || Cpu
          return (
            <div
              key={c.code}
              className="group rounded-xl border border-white/[0.07] bg-white/[0.015] p-4 hover:bg-white/[0.04] hover:border-accent/20 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex w-9 h-9 rounded-lg bg-accent/10 border border-accent/25 items-center justify-center text-accent">
                  <Icon size={15} />
                </span>
                <span className="mono-label text-fog-600 text-[10px] tracking-[0.18em]">{c.code}</span>
              </div>
              <p className="mono-label text-accent text-[10px] tracking-[0.22em] mb-1">{c.tag}</p>
              <p className="text-fog-50 text-[14px] sm:text-[15px] font-medium leading-tight">{c.title}</p>
              <p className="mono-label text-fog-500 text-[10px] tracking-[0.12em] mt-1.5 truncate">
                {c.meta}
              </p>
            </div>
          )
        })}
      </motion.div>

      <p className="mt-10 text-fog-500 text-[13.5px] leading-relaxed text-pretty mt-8 italic max-w-xl mx-auto text-center">
        {b.value.closing}
      </p>
    </SectionShell>
  )
}

// ============================================================================
// 04 — APIs (left LiveAPILogs + right copy + best practices)
// ============================================================================
function APIs({ b }) {
  return (
    <SectionShell id="apis">
      <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-14 items-center min-w-0">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85 }}
          className="min-w-0 order-2 lg:order-1 relative w-full"
          style={{ height: 'clamp(380px, 56vh, 540px)' }}
        >
          <ParticleAPIs />
          {/* corner crosshairs to match the rest of the visuals */}
          <div aria-hidden className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-accent/40" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-accent/40" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-accent/40" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-accent/40" />
          </div>
          <div className="absolute bottom-3 left-3 pointer-events-none">
            <p className="mono-label text-accent text-[10px] tracking-[0.22em]">
              api.gateway
            </p>
            <p className="mono-label text-fog-500 text-[9px] tracking-[0.18em] mt-1">
              5 methods · {b.apis.sampleLogs.length} routes · live
            </p>
          </div>
        </motion.div>

        <div className="min-w-0 order-1 lg:order-2">
          <Eyebrow>{b.apis.eyebrow}</Eyebrow>
          <H2 title={b.apis.title} accent={b.apis.titleAccent} max="max-w-md" />
          <p className="text-fog-300 text-[15px] sm:text-[16px] leading-relaxed text-pretty mt-6 max-w-md">
            {b.apis.body}
          </p>

          <div className="mt-8 grid grid-cols-2 gap-1.5 max-w-md">
            {b.apis.bestPractices.map((p) => (
              <span
                key={p}
                className="mono-label text-fog-300 text-[10px] tracking-[0.12em] px-2.5 py-1.5 rounded-md border border-white/[0.06] bg-white/[0.015] truncate"
              >
                {p}
              </span>
            ))}
          </div>

          <p className="text-fog-500 text-[13.5px] leading-relaxed text-pretty mt-6 italic max-w-md">
            {b.apis.closing}
          </p>
        </div>
      </div>
    </SectionShell>
  )
}

// ============================================================================
// 05 — MICROSERVICES (centered + radial layout of services)
// ============================================================================
function Microservices({ b }) {
  return (
    <SectionShell id="microservices">
      <div className="text-center max-w-3xl mx-auto">
        <Eyebrow>{b.microservices.eyebrow}</Eyebrow>
        <H2
          title={b.microservices.title}
          accent={b.microservices.titleAccent}
          max="max-w-3xl"
          align="center"
        />
        <p className="text-fog-300 text-[15px] sm:text-[16px] leading-relaxed text-pretty mt-6 max-w-xl mx-auto">
          {b.microservices.body}
        </p>
        <p className="text-fog-400 text-[13.5px] leading-relaxed text-pretty mt-3 max-w-xl mx-auto">
          {b.microservices.bodyClose}
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.85 }}
        className="mt-12 grid grid-cols-2 sm:grid-cols-5 gap-2 max-w-4xl mx-auto"
      >
        {b.microservices.services.map((s, i) => (
          <div
            key={s.code}
            className="rounded-lg border border-white/[0.07] bg-white/[0.015] px-3 py-3 hover:bg-white/[0.04] hover:border-accent/20 transition-all text-center"
          >
            <p className="mono-label text-accent text-[10px] tracking-[0.22em] mb-1">
              {s.code}/
            </p>
            <p className="text-fog-50 text-[13px] font-medium leading-tight font-mono">{s.name}</p>
            <p className="mono-label text-fog-500 text-[9px] tracking-[0.12em] mt-1.5 leading-tight">
              {s.meta}
            </p>
          </div>
        ))}
      </motion.div>
    </SectionShell>
  )
}

// ============================================================================
// 06 — DATABASES (right-anchored editorial copy + 3 stack groups)
// ============================================================================
function Databases({ b }) {
  return (
    <SectionShell id="databases">
      <div className="ml-auto max-w-3xl text-right min-w-0">
        <Eyebrow>{b.databases.eyebrow}</Eyebrow>
        <p
          className="font-display font-semibold text-fog-50 tracking-[-0.02em] leading-[1.06] text-pretty"
          style={{ fontSize: 'clamp(22px, 4.4vw, 60px)', hyphens: 'auto', overflowWrap: 'anywhere' }}
        >
          {b.databases.title}
        </p>
        <p
          className="font-display font-light italic text-fog-300 leading-[1.1] mt-1 text-pretty"
          style={{ fontSize: 'clamp(22px, 4.4vw, 60px)', hyphens: 'auto', overflowWrap: 'anywhere' }}
        >
          {b.databases.titleAccent}
        </p>
        <p className="text-fog-300 text-[15px] sm:text-[16px] leading-relaxed text-pretty mt-6 max-w-xl ml-auto">
          {b.databases.body}
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.85 }}
        className="mt-12 grid sm:grid-cols-3 gap-3"
      >
        {b.databases.stacks.map((stack) => (
          <div
            key={stack.label}
            className="rounded-xl border border-white/[0.07] bg-white/[0.015] p-5"
          >
            <div className="flex items-center gap-2 mb-4">
              <Database size={12} className="text-accent" />
              <p className="mono-label text-accent text-[10px] tracking-[0.22em]">{stack.label}</p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {stack.items.map((it) => (
                <span
                  key={it}
                  className="mono-label text-fog-200 text-[11px] tracking-[0.08em] px-2 py-1 rounded-md border border-white/[0.06] bg-white/[0.02]"
                >
                  {it}
                </span>
              ))}
            </div>
          </div>
        ))}
      </motion.div>

      <p className="mt-10 text-fog-500 text-[13.5px] leading-relaxed text-pretty italic max-w-2xl ml-auto text-right">
        {b.databases.closing}
      </p>
    </SectionShell>
  )
}

// ============================================================================
// 07 — AUTH (split: copy left, 6 capability tiles right)
// ============================================================================
function Auth({ b }) {
  return (
    <SectionShell id="auth">
      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-14 items-center min-w-0">
        <div className="min-w-0">
          <Eyebrow>{b.auth.eyebrow}</Eyebrow>
          <H2 title={b.auth.title} accent={b.auth.titleAccent} max="max-w-md" />
          <p className="text-fog-300 text-[15px] sm:text-[16px] leading-relaxed text-pretty mt-6 max-w-md">
            {b.auth.body}
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85 }}
          className="grid sm:grid-cols-2 gap-2.5 min-w-0"
        >
          {b.auth.capabilities.map((c) => (
            <div
              key={c.title}
              className="rounded-xl border border-white/[0.07] bg-white/[0.015] p-4"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <Shield size={11} className="text-accent" />
                <p className="text-fog-50 text-[14px] font-medium leading-tight">{c.title}</p>
              </div>
              <p className="mono-label text-fog-500 text-[10px] tracking-[0.12em]">{c.meta}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </SectionShell>
  )
}

// ============================================================================
// 08 — CLOUD (copy right + 8-tile grid left)
// ============================================================================
function Cloud_({ b }) {
  return (
    <SectionShell id="cloud">
      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-14 items-center min-w-0">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-2 min-w-0 order-2 lg:order-1"
        >
          {b.cloud.services.map((s) => (
            <div
              key={s.name}
              className="rounded-xl border border-white/[0.07] bg-white/[0.015] p-4 hover:bg-white/[0.04] hover:border-accent/20 transition-all"
            >
              <div className="flex items-center gap-2 mb-2">
                <Cloud size={11} className="text-accent" />
                <p className="text-fog-50 text-[13px] font-medium leading-tight">{s.name}</p>
              </div>
              <p className="mono-label text-fog-500 text-[9px] tracking-[0.12em] leading-tight">
                {s.meta}
              </p>
            </div>
          ))}
        </motion.div>

        <div className="min-w-0 order-1 lg:order-2">
          <Eyebrow>{b.cloud.eyebrow}</Eyebrow>
          <H2 title={b.cloud.title} accent={b.cloud.titleAccent} max="max-w-md" />
          <p className="text-fog-300 text-[15px] sm:text-[16px] leading-relaxed text-pretty mt-6 max-w-md">
            {b.cloud.body}
          </p>
        </div>
      </div>
    </SectionShell>
  )
}

// ============================================================================
// 09 — INTEGRATIONS (centered + provider grid)
// ============================================================================
function Integrations({ b }) {
  return (
    <SectionShell id="integrations">
      <div className="text-center max-w-3xl mx-auto">
        <Eyebrow>{b.integrations.eyebrow}</Eyebrow>
        <H2
          title={b.integrations.title}
          accent={b.integrations.titleAccent}
          max="max-w-3xl"
          align="center"
        />
        <p className="text-fog-300 text-[15px] sm:text-[16px] leading-relaxed text-pretty mt-6 max-w-xl mx-auto">
          {b.integrations.body}
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.85 }}
        className="mt-12 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 max-w-5xl mx-auto"
      >
        {b.integrations.providers.map((p) => (
          <div
            key={p.name}
            className="rounded-lg border border-white/[0.07] bg-white/[0.015] px-3 py-3 hover:bg-white/[0.04] hover:border-accent/20 transition-all text-center"
          >
            <p className="text-fog-50 text-[13px] font-medium leading-tight">{p.name}</p>
            <p className="mono-label text-fog-500 text-[10px] tracking-[0.12em] mt-1">{p.kind}</p>
          </div>
        ))}
      </motion.div>

      <p className="mt-10 text-fog-500 text-[13.5px] leading-relaxed text-pretty mt-8 italic max-w-2xl mx-auto text-center">
        {b.integrations.closing}
      </p>
    </SectionShell>
  )
}

// ============================================================================
// 10 — ARCHITECTURE (split + ArchitectureStack reused)
// ============================================================================
function Architecture({ b }) {
  return (
    <SectionShell id="architecture">
      <div className="grid lg:grid-cols-[1fr_1fr] gap-12 items-center min-w-0">
        <div className="min-w-0">
          <Eyebrow>{b.architecture.eyebrow}</Eyebrow>
          <H2 title={b.architecture.title} accent={b.architecture.titleAccent} max="max-w-md" />
          <p className="text-fog-300 text-[15px] sm:text-[16px] leading-relaxed text-pretty mt-6 max-w-md">
            {b.architecture.body}
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85 }}
          className="min-w-0"
        >
          <ArchitectureStack layers={b.architecture.layers} />
        </motion.div>
      </div>
    </SectionShell>
  )
}

// ============================================================================
// 11 — USE CASES (editorial mosaic)
// ============================================================================
function UseCases({ b }) {
  return (
    <SectionShell id="use-cases">
      <Eyebrow>{b.useCases.eyebrow}</Eyebrow>
      <H2 title={b.useCases.title} max="max-w-3xl" />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.85 }}
        className="mt-12"
      >
        <EditorialMosaic items={b.useCases.items} />
      </motion.div>
    </SectionShell>
  )
}

// ============================================================================
// 12 — DIFFERENTIATORS (6 cards 3-col)
// ============================================================================
function Differentiators({ b }) {
  return (
    <SectionShell id="why">
      <Eyebrow>{b.differentiators.eyebrow}</Eyebrow>
      <H2 title={b.differentiators.title} max="max-w-3xl" />
      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {b.differentiators.items.map((it, i) => (
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
// 13 — PROCESS (BuildPipeline)
// ============================================================================
function Process({ b }) {
  return (
    <SectionShell id="process">
      <Eyebrow>{b.process.eyebrow}</Eyebrow>
      <H2 title={b.process.title} max="max-w-3xl" />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.85 }}
        className="mt-10"
      >
        <BuildPipeline steps={b.process.steps} />
      </motion.div>
    </SectionShell>
  )
}

// ============================================================================
// 14 — STACK (3-col tech groups)
// ============================================================================
function Stack({ b }) {
  return (
    <SectionShell id="stack">
      <Eyebrow>{b.stack.eyebrow}</Eyebrow>
      <H2 title={b.stack.title} accent={b.stack.titleAccent} max="max-w-3xl" />
      <p className="text-fog-300 text-[15px] sm:text-[16px] leading-relaxed text-pretty mt-6 max-w-2xl">
        {b.stack.body}
      </p>
      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {b.stack.groups.map((group, i) => (
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
// 15 — MID CTA banner
// ============================================================================
function MidCta({ b }) {
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
            {b.midCta.title}
          </h3>
          <p className="text-fog-300 text-[14px] sm:text-[15px] leading-relaxed text-pretty max-w-xl mx-auto mt-5">
            {b.midCta.body}
          </p>
          <a href="#contact" className="btn-primary mt-7 inline-flex">
            {b.midCta.cta}
            <ArrowRight size={15} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// 16 — SECURITY (centered minimal + practice pills)
// ============================================================================
function SecuritySection({ b }) {
  return (
    <SectionShell id="security">
      <div className="text-center mx-auto max-w-3xl min-w-0">
        <Eyebrow>{b.security.eyebrow}</Eyebrow>
        <H2 title={b.security.title} accent={b.security.titleAccent} max="max-w-3xl" align="center" />
        <p className="text-fog-300 text-[15px] sm:text-[16px] leading-relaxed text-pretty mt-6 max-w-xl mx-auto">
          {b.security.body}
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-10 flex flex-wrap justify-center gap-1.5 max-w-2xl mx-auto"
        >
          {b.security.practices.map((p) => (
            <span
              key={p}
              className="mono-label text-fog-300 text-[10px] tracking-[0.16em] px-2.5 py-1.5 rounded-full border border-white/[0.07] bg-white/[0.02]"
            >
              {p}
            </span>
          ))}
        </motion.div>
      </div>
    </SectionShell>
  )
}

// ============================================================================
// 17 — FAQ
// ============================================================================
function FAQ({ b }) {
  const [openIdx, setOpenIdx] = useState(0)
  return (
    <SectionShell id="faq">
      <Eyebrow>{b.faq.eyebrow}</Eyebrow>
      <H2 title={b.faq.title} max="max-w-3xl" />
      <div className="mt-10 max-w-3xl space-y-2">
        {b.faq.items.map((it, i) => {
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
// 18 — FINAL CTA
// ============================================================================
function FinalCta({ b }) {
  return (
    <section id="contact" className="relative py-24 sm:py-32 px-4 sm:px-8 lg:px-14">
      <div className="container-shell relative">
        <Eyebrow>{b.finalCta.eyebrow}</Eyebrow>
        <h2
          className="font-display font-semibold tracking-[-0.03em] leading-[0.96] text-pretty max-w-4xl"
          style={{ fontSize: 'clamp(32px, 5.2vw, 76px)', hyphens: 'auto', overflowWrap: 'anywhere' }}
        >
          <span className="text-fog-50 block">{b.finalCta.title}</span>
          <span className="text-fog-300 block font-light italic">{b.finalCta.titleAccent}</span>
        </h2>
        <p className="mt-6 text-fog-300 text-[15px] sm:text-[16px] leading-relaxed text-pretty max-w-2xl">
          {b.finalCta.body}
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <a href="mailto:omar.carrasco.aranda@gmail.com" className="btn-primary">
            {b.finalCta.cta}
            <ArrowRight size={15} />
          </a>
          <a href="/" className="text-fog-300 text-[14px] inline-flex items-center gap-1.5 hover:text-accent transition-colors">
            {b.finalCta.ctaSecondary} <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </section>
  )
}
