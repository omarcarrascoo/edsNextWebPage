'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import {
  ArrowRight, ArrowUpRight, ChevronRight, ChevronDown, Plus, Minus,
  Smartphone, Users, ShoppingBag, Truck, Wallet, Bot, Zap, Hand,
  Bell, Lock, Cpu, BarChart3, Layers, Eye, Activity, ShieldCheck,
} from 'lucide-react'
import SiteHeader from '@/components/site/SiteHeader'
import SiteFooter from '@/components/site/SiteFooter'
import { useT } from '@/i18n/LanguageProvider'
import {
  BuildPipeline,
  ArchitectureStack,
  EditorialMosaic,
} from '@/components/graph/FintechGraphics'

const ParticlePhone = dynamic(
  () => import('@/components/graph/ParticlePhone'),
  { ssr: false, loading: () => null },
)

const capabilityIcons = {
  '01': Lock, '02': Bell, '03': Wallet, '04': Cpu,
  '05': Smartphone, '06': ShieldCheck, '07': BarChart3, '08': Bot,
}

const typeIcons = {
  '01': Users, '02': Layers, '03': Wallet, '04': Truck, '05': Bot,
}

export default function MobilePage() {
  const t = useT()
  const m = t.mobile
  if (!m) return null

  return (
    <>
      <SiteHeader />
      <main className="relative bg-[#05080C] text-fog-100">
        <Hero m={m} />
        <Problem m={m} />
        <Value m={m} />
        <Types m={m} />
        <FintechCallout m={m} />
        <Approach m={m} />
        <Architecture m={m} />
        <Stack m={m} />
        <UseCases m={m} />
        <Differentiators m={m} />
        <Process m={m} />
        <MidCta m={m} />
        <AICallout m={m} />
        <FAQ m={m} />
        <FinalCta m={m} />
      </main>
      <SiteFooter />
    </>
  )
}

// ============================================================================
// SHARED — section utilities
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
      style={{
        fontSize: size,
        hyphens: 'auto',
        overflowWrap: 'anywhere',
      }}
    >
      <span className="text-fog-50 block">{title}</span>
      {accent && (
        <span className="text-fog-300 block font-light italic">{accent}</span>
      )}
    </motion.h2>
  )
}

// ============================================================================
// 01 — HERO (full-bleed phone, copy left, particle phone right)
// ============================================================================
function Hero({ m }) {
  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: '100vh', background: '#05080C' }}
    >
      {/* full-bleed particle phone behind everything */}
      <div className="absolute inset-0 z-0">
        <ParticlePhone />
      </div>

      {/* left vignette so copy reads */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, rgba(5,8,12,0.92) 0%, rgba(5,8,12,0.5) 30%, rgba(5,8,12,0.0) 60%, rgba(5,8,12,0.0) 100%)',
        }}
      />
      {/* top + bottom soft fades */}
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
            {m.breadcrumb.services}
          </a>
          <ChevronRight size={11} />
          <span className="text-accent">{m.breadcrumb.current}</span>
        </p>
      </div>

      {/* status top-right */}
      <div className="absolute top-24 sm:top-28 right-4 sm:right-8 lg:right-14 z-10 hidden sm:flex flex-col items-end gap-1 pointer-events-none">
        <div className="flex items-center gap-2">
          <Smartphone size={11} className="text-accent" />
          <span className="mono-label text-accent text-[10px] tracking-[0.22em]">
            {m.hero.hudPlatform}
          </span>
        </div>
        <span className="mono-label text-fog-500 text-[10px] tracking-[0.22em]">
          {m.hero.hudInteract}
        </span>
      </div>

      {/* copy anchored bottom-left */}
      <div className="absolute inset-x-0 bottom-0 z-10 px-4 sm:px-8 lg:px-14 pb-12 sm:pb-16">
        <div className="container-shell">
          <Eyebrow>{m.hero.eyebrow}</Eyebrow>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="font-display font-semibold tracking-[-0.035em] leading-[0.94] text-pretty"
            style={{
              fontSize: 'clamp(40px, 7.4vw, 110px)',
              hyphens: 'auto',
              overflowWrap: 'anywhere',
            }}
          >
            <span className="text-fog-50 block">{m.hero.titleA}</span>
            <span className="text-fog-200 block">{m.hero.titleB}</span>
            <span className="text-fog-300 block font-light italic">{m.hero.titleC}</span>
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
              {m.hero.titleAccent}{' '}
              <span className="text-fog-400 font-normal">{m.hero.subtitle}</span>
            </p>
            <div className="flex flex-wrap items-center gap-3 lg:justify-end">
              <a href="#contact" className="btn-primary">
                {m.hero.ctaPrimary}
                <ArrowRight size={15} />
              </a>
              <a
                href="#capabilities"
                className="text-fog-300 text-[14px] inline-flex items-center gap-1.5 hover:text-accent transition-colors"
              >
                {m.hero.ctaSecondary} <ChevronRight size={13} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* corner crosshairs */}
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
// 02 — PROBLEM (centered editorial + chip grid of reasons)
// ============================================================================
function Problem({ m }) {
  return (
    <SectionShell id="problem">
      <div className="text-center mx-auto max-w-3xl">
        <Eyebrow>{m.problem.eyebrow}</Eyebrow>
        <H2 title={m.problem.title} accent={m.problem.titleAccent} max="max-w-3xl" align="center" />
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-fog-300 text-[15px] sm:text-[16px] leading-relaxed text-pretty mt-6 max-w-xl mx-auto"
        >
          {m.problem.body}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-2 max-w-4xl mx-auto"
      >
        {m.problem.reasons.map((r) => (
          <div
            key={r.tag}
            className="rounded-lg border border-white/[0.07] bg-white/[0.015] px-3 py-3"
          >
            <p className="mono-label text-accent text-[10px] tracking-[0.18em] mb-1">{r.tag}</p>
            <p className="text-fog-200 text-[13px] leading-tight">{r.text}</p>
          </div>
        ))}
      </motion.div>

      <p className="mt-12 max-w-2xl mx-auto text-fog-400 text-[14px] sm:text-[15px] leading-relaxed text-pretty text-center">
        {m.problem.closing}
      </p>
    </SectionShell>
  )
}

// ============================================================================
// 03 — VALUE (left copy + right bento of 8 capabilities)
// ============================================================================
function Value({ m }) {
  return (
    <SectionShell id="capabilities">
      <div className="grid lg:grid-cols-[1fr_1.3fr] gap-10 lg:gap-14 items-start min-w-0">
        <div className="min-w-0 lg:sticky lg:top-32">
          <Eyebrow>{m.value.eyebrow}</Eyebrow>
          <H2 title={m.value.title} accent={m.value.titleAccent} max="max-w-md" />
          <p className="text-fog-300 text-[15px] sm:text-[16px] leading-relaxed text-pretty mt-5 max-w-md">
            {m.value.body}
          </p>
          <p className="text-fog-500 text-[13.5px] leading-relaxed text-pretty mt-5 italic max-w-md">
            {m.value.closing}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 min-w-0"
        >
          {m.value.capabilities.map((c, i) => {
            const Icon = capabilityIcons[c.code] || Cpu
            const big = i === 0 || i === 5
            return (
              <div
                key={c.code}
                className={`group rounded-xl border border-white/[0.07] bg-white/[0.015] p-4 hover:bg-white/[0.04] hover:border-accent/20 transition-all ${
                  big ? 'sm:col-span-2 sm:row-span-1' : ''
                }`}
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
      </div>
    </SectionShell>
  )
}

// ============================================================================
// 04 — TYPES (5 huge horizontal cards stacked)
// ============================================================================
function Types({ m }) {
  return (
    <SectionShell id="types">
      <Eyebrow>{m.types.eyebrow}</Eyebrow>
      <H2 title={m.types.title} accent={m.types.titleAccent} max="max-w-3xl" />
      <p className="text-fog-300 text-[15px] sm:text-[16px] leading-relaxed text-pretty mt-6 max-w-2xl">
        {m.types.body}
      </p>

      <div className="mt-12 space-y-3">
        {m.types.categories.map((cat, i) => {
          const Icon = typeIcons[cat.code] || Layers
          return (
            <motion.div
              key={cat.code}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: Math.min(i * 0.05, 0.3) }}
              className="group relative rounded-2xl border border-white/[0.07] bg-white/[0.015] p-6 sm:p-8 hover:bg-white/[0.03] hover:border-accent/20 transition-all overflow-hidden"
            >
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background:
                    'radial-gradient(ellipse 50% 60% at 80% 30%, rgba(45,226,197,0.08), transparent 60%)',
                }}
              />
              <div className="relative grid sm:grid-cols-[auto_1.2fr_1fr] gap-6 items-center min-w-0">
                <div className="flex items-center gap-4 shrink-0">
                  <span className="font-display text-fog-600 text-[44px] sm:text-[64px] font-light leading-none" style={{ letterSpacing: '-0.04em' }}>
                    {cat.code}
                  </span>
                  <span className="hidden sm:inline-flex w-12 h-12 rounded-xl bg-accent/10 border border-accent/25 items-center justify-center text-accent">
                    <Icon size={18} />
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-fog-50 text-[20px] sm:text-[24px] font-display font-semibold leading-tight tracking-[-0.02em]">
                    {cat.title}
                  </p>
                  <p className="text-fog-300 text-[14px] sm:text-[15px] mt-1.5 italic">
                    {cat.tagline}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cat.examples.map((ex) => (
                    <span
                      key={ex}
                      className="mono-label text-fog-400 text-[10px] tracking-[0.14em] px-2.5 py-1 rounded-full border border-white/[0.06] bg-white/[0.02]"
                    >
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </SectionShell>
  )
}

// ============================================================================
// 05 — FINTECH CALLOUT (dark accent banner with 4 pillars)
// ============================================================================
function FintechCallout({ m }) {
  return (
    <section
      id="fintech-callout"
      className="relative py-24 sm:py-32 px-4 sm:px-8 lg:px-14"
    >
      <div className="container-shell relative">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85 }}
          className="rounded-2xl border border-accent/15 bg-gradient-to-br from-accent/[0.05] via-transparent to-transparent p-8 sm:p-12 overflow-hidden relative"
        >
          <div
            aria-hidden
            className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-30"
            style={{
              background: 'radial-gradient(circle, rgba(45,226,197,0.18), transparent 60%)',
            }}
          />
          <div className="relative grid lg:grid-cols-[1.2fr_1fr] gap-10 items-center">
            <div className="min-w-0">
              <Eyebrow>{m.fintechCallout.eyebrow}</Eyebrow>
              <H2 title={m.fintechCallout.title} accent={m.fintechCallout.titleAccent} max="max-w-2xl" />
              <p className="text-fog-300 text-[14px] sm:text-[15px] leading-relaxed text-pretty mt-6 max-w-xl">
                {m.fintechCallout.body}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {m.fintechCallout.pillars.map((p) => (
                <div
                  key={p.title}
                  className="rounded-lg border border-white/[0.07] bg-[rgba(8,12,18,0.5)] backdrop-blur-sm p-3"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <ShieldCheck size={11} className="text-accent" />
                    <p className="text-fog-50 text-[13px] font-medium leading-tight">{p.title}</p>
                  </div>
                  <p className="mono-label text-fog-500 text-[10px] tracking-[0.12em]">{p.meta}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// 06 — APPROACH (3 huge questions with answers)
// ============================================================================
function Approach({ m }) {
  return (
    <SectionShell id="approach">
      <div className="max-w-4xl">
        <Eyebrow>{m.approach.eyebrow}</Eyebrow>
        <H2 title={m.approach.title} accent={m.approach.titleAccent} max="max-w-3xl" />
        <p className="text-fog-300 text-[15px] sm:text-[16px] leading-relaxed text-pretty mt-6 max-w-xl">
          {m.approach.body}
        </p>
      </div>

      <div className="mt-14 space-y-10">
        {m.approach.questions.map((q, i) => (
          <motion.div
            key={q.n}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: Math.min(i * 0.1, 0.3) }}
            className="grid lg:grid-cols-[auto_1.2fr_1fr] gap-6 lg:gap-10 items-start min-w-0 pt-8 border-t border-white/[0.06]"
          >
            <p
              className="font-display text-fog-600 leading-none"
              style={{ fontSize: 'clamp(60px, 8vw, 110px)', letterSpacing: '-0.04em' }}
            >
              {q.n}
            </p>
            <p
              className="font-display font-semibold text-fog-50 tracking-[-0.02em] leading-[1.08] min-w-0"
              style={{ fontSize: 'clamp(22px, 2.6vw, 36px)', overflowWrap: 'anywhere' }}
            >
              {q.q}
            </p>
            <p className="text-fog-300 text-[14px] sm:text-[15px] leading-relaxed text-pretty">
              {q.a}
            </p>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  )
}

// ============================================================================
// 07 — ARCHITECTURE (left copy + right architecture stack)
// ============================================================================
function Architecture({ m }) {
  return (
    <SectionShell id="architecture">
      <div className="grid lg:grid-cols-[1fr_1fr] gap-12 items-center min-w-0">
        <div className="min-w-0">
          <Eyebrow>{m.architecture.eyebrow}</Eyebrow>
          <H2 title={m.architecture.title} accent={m.architecture.titleAccent} max="max-w-md" />
          <p className="text-fog-300 text-[15px] sm:text-[16px] leading-relaxed text-pretty mt-6 max-w-md">
            {m.architecture.body}
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85 }}
          className="min-w-0"
        >
          <ArchitectureStack layers={m.architecture.layers} />
        </motion.div>
      </div>
    </SectionShell>
  )
}

// ============================================================================
// 08 — STACK (3-column technology groups)
// ============================================================================
function Stack({ m }) {
  return (
    <SectionShell id="stack">
      <Eyebrow>{m.stack.eyebrow}</Eyebrow>
      <H2 title={m.stack.title} accent={m.stack.titleAccent} max="max-w-3xl" />
      <p className="text-fog-300 text-[15px] sm:text-[16px] leading-relaxed text-pretty mt-6 max-w-2xl">
        {m.stack.body}
      </p>

      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {m.stack.groups.map((group, i) => (
          <motion.div
            key={group.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: Math.min(i * 0.1, 0.3) }}
            className="rounded-xl border border-white/[0.07] bg-white/[0.015] p-5"
          >
            <p className="mono-label text-accent text-[10px] tracking-[0.22em] mb-4">
              {group.label}
            </p>
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
// 09 — USE CASES (editorial mosaic)
// ============================================================================
function UseCases({ m }) {
  return (
    <SectionShell id="use-cases">
      <Eyebrow>{m.useCases.eyebrow}</Eyebrow>
      <H2 title={m.useCases.title} max="max-w-3xl" />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.85 }}
        className="mt-12"
      >
        <EditorialMosaic items={m.useCases.items} />
      </motion.div>
    </SectionShell>
  )
}

// ============================================================================
// 10 — DIFFERENTIATORS (6 cards in 3-col)
// ============================================================================
function Differentiators({ m }) {
  return (
    <SectionShell id="why">
      <Eyebrow>{m.differentiators.eyebrow}</Eyebrow>
      <H2 title={m.differentiators.title} max="max-w-3xl" />
      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {m.differentiators.items.map((it, i) => (
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
// 11 — PROCESS (BuildPipeline reused)
// ============================================================================
function Process({ m }) {
  return (
    <SectionShell id="process">
      <Eyebrow>{m.process.eyebrow}</Eyebrow>
      <H2 title={m.process.title} max="max-w-3xl" />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.85 }}
        className="mt-10"
      >
        <BuildPipeline steps={m.process.steps} />
      </motion.div>
    </SectionShell>
  )
}

// ============================================================================
// 12 — MID CTA banner
// ============================================================================
function MidCta({ m }) {
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
            style={{
              fontSize: 'clamp(22px, 3.6vw, 48px)',
              hyphens: 'auto',
              overflowWrap: 'anywhere',
            }}
          >
            {m.midCta.title}
          </h3>
          <p className="text-fog-300 text-[14px] sm:text-[15px] leading-relaxed text-pretty max-w-xl mx-auto mt-5">
            {m.midCta.body}
          </p>
          <a href="#contact" className="btn-primary mt-7 inline-flex">
            {m.midCta.cta}
            <ArrowRight size={15} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// 13 — AI CALLOUT (centered minimal)
// ============================================================================
function AICallout({ m }) {
  return (
    <SectionShell id="ai">
      <div className="text-center mx-auto max-w-3xl min-w-0">
        <Eyebrow>{m.aiCallout.eyebrow}</Eyebrow>
        <H2 title={m.aiCallout.title} accent={m.aiCallout.titleAccent} max="max-w-3xl" align="center" />
        <p className="text-fog-300 text-[15px] sm:text-[16px] leading-relaxed text-pretty mt-6 max-w-xl mx-auto">
          {m.aiCallout.body}
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-10 flex flex-wrap justify-center gap-1.5 max-w-2xl mx-auto"
        >
          {m.aiCallout.uses.map((u) => (
            <span
              key={u}
              className="mono-label text-fog-300 text-[10px] tracking-[0.18em] px-2.5 py-1.5 rounded-full border border-white/[0.07] bg-white/[0.02]"
            >
              {u}
            </span>
          ))}
        </motion.div>

        <p className="text-fog-500 text-[13px] leading-relaxed text-pretty mt-10 italic max-w-xl mx-auto">
          {m.aiCallout.closing}
        </p>
      </div>
    </SectionShell>
  )
}

// ============================================================================
// 14 — FAQ accordion
// ============================================================================
function FAQ({ m }) {
  const [openIdx, setOpenIdx] = useState(0)
  return (
    <SectionShell id="faq">
      <Eyebrow>{m.faq.eyebrow}</Eyebrow>
      <H2 title={m.faq.title} max="max-w-3xl" />
      <div className="mt-10 max-w-3xl space-y-2">
        {m.faq.items.map((it, i) => {
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
// 15 — FINAL CTA (hero-like)
// ============================================================================
function FinalCta({ m }) {
  return (
    <section id="contact" className="relative py-24 sm:py-32 px-4 sm:px-8 lg:px-14">
      <div className="container-shell relative">
        <Eyebrow>{m.finalCta.eyebrow}</Eyebrow>
        <h2
          className="font-display font-semibold tracking-[-0.03em] leading-[0.96] text-pretty max-w-4xl"
          style={{
            fontSize: 'clamp(32px, 5.2vw, 76px)',
            hyphens: 'auto',
            overflowWrap: 'anywhere',
          }}
        >
          <span className="text-fog-50 block">{m.finalCta.title}</span>
          <span className="text-fog-300 block font-light italic">{m.finalCta.titleAccent}</span>
        </h2>
        <p className="mt-6 text-fog-300 text-[15px] sm:text-[16px] leading-relaxed text-pretty max-w-2xl">
          {m.finalCta.body}
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <a href="mailto:hello@eradigitalsolutions.com" className="btn-primary">
            {m.finalCta.cta}
            <ArrowRight size={15} />
          </a>
          <a href="/" className="text-fog-300 text-[14px] inline-flex items-center gap-1.5 hover:text-accent transition-colors">
            {m.finalCta.ctaSecondary} <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </section>
  )
}
