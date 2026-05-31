'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import {
  ArrowRight, ArrowUpRight, ChevronRight, Plus, Minus,
  MessageCircle, Bell, Activity, Inbox, ShieldCheck, Zap, Sparkles,
  Users, Workflow, Server, Smartphone, Monitor, Network, Hand,
} from 'lucide-react'
import SiteHeader from '@/components/site/SiteHeader'
import SiteFooter from '@/components/site/SiteFooter'
import { useT } from '@/i18n/LanguageProvider'
import { ArchitectureStack, BuildPipeline } from '@/components/graph/FintechGraphics'

const ParticleMessage = dynamic(
  () => import('@/components/graph/ParticleMessage'),
  { ssr: false, loading: () => null },
)

const ParticleBell = dynamic(
  () => import('@/components/graph/ParticleBell'),
  { ssr: false, loading: () => null },
)

const ParticleRobot = dynamic(
  () => import('@/components/graph/ParticleRobot'),
  { ssr: false, loading: () => null },
)

const capabilityIcons = {
  CHAT: MessageCircle, INBOX: Inbox, PUSH: Bell, READ: Activity,
  EVENT: Zap, SECURE: ShieldCheck, SOCKETS: Network, LIVE: Monitor,
}

export default function MessagingPage() {
  const t = useT()
  const m = t.messaging
  if (!m) return null

  return (
    <>
      <SiteHeader />
      <main className="relative bg-[#05080C] text-fog-100">
        <Hero m={m} />
        <Problem m={m} />
        <Value m={m} />
        <Chat m={m} />
        <Notifications m={m} />
        <Realtime m={m} />
        <States m={m} />
        <Secure m={m} />
        <Ecommerce m={m} />
        <Community m={m} />
        <Events m={m} />
        <Backend m={m} />
        <Sync m={m} />
        <Dashboards m={m} />
        <AI m={m} />
        <Security m={m} />
        <Architecture m={m} />
        <UseCases m={m} />
        <Differentiators m={m} />
        <Process m={m} />
        <Stack m={m} />
        <MidCta m={m} />
        <FAQ m={m} />
        <FinalCta m={m} />
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
// 01 — HERO (full-bleed particle network, copy bottom-left)
// ============================================================================
function Hero({ m }) {
  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: '100vh', background: '#05080C' }}
    >
      <div className="absolute inset-0 z-0">
        <ParticleMessage />
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

      <div className="absolute top-24 sm:top-28 left-4 sm:left-8 lg:left-14 z-10">
        <p className="mono-label text-fog-500 text-[10px] tracking-[0.22em] flex items-center gap-2">
          <a href="/" className="hover:text-fog-200 transition-colors">{m.breadcrumb.services}</a>
          <ChevronRight size={11} />
          <span className="text-accent">{m.breadcrumb.current}</span>
        </p>
      </div>

      <div className="absolute top-24 sm:top-28 right-4 sm:right-8 lg:right-14 z-10 hidden sm:flex flex-col items-end gap-1 pointer-events-none">
        <div className="flex items-center gap-2">
          <Activity size={11} className="text-accent" />
          <span className="mono-label text-accent text-[10px] tracking-[0.22em]">
            {m.hero.hudLive}
          </span>
        </div>
        <span className="mono-label text-fog-500 text-[10px] tracking-[0.22em]">
          {m.hero.hudInteract}
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 px-4 sm:px-8 lg:px-14 pb-12 sm:pb-16">
        <div className="container-shell">
          <Eyebrow>{m.hero.eyebrow}</Eyebrow>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="font-display font-semibold tracking-[-0.035em] leading-[0.94] text-pretty"
            style={{ fontSize: 'clamp(40px, 7.4vw, 110px)', hyphens: 'auto', overflowWrap: 'anywhere' }}
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
              <a href="#capabilities" className="text-fog-300 text-[14px] inline-flex items-center gap-1.5 hover:text-accent transition-colors">
                {m.hero.ctaSecondary} <ChevronRight size={13} />
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
// 02 — PROBLEM (8 symptom chips + closing)
// ============================================================================
function Problem({ m }) {
  return (
    <SectionShell id="problem">
      <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-14 items-start min-w-0">
        <div className="min-w-0">
          <Eyebrow>{m.problem.eyebrow}</Eyebrow>
          <H2 title={m.problem.title} accent={m.problem.titleAccent} max="max-w-md" />
          <p className="text-fog-300 text-[15px] sm:text-[16px] leading-relaxed text-pretty mt-6 max-w-md">
            {m.problem.body}
          </p>
        </div>
        <motion.ul
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85 }}
          className="grid grid-cols-2 sm:grid-cols-2 gap-2 min-w-0"
        >
          {m.problem.symptoms.map((s) => (
            <li
              key={s.tag + s.text}
              className="rounded-lg border border-white/[0.07] bg-white/[0.015] p-4"
            >
              <p className="mono-label text-signal-amber text-[9px] tracking-[0.22em] mb-1.5">
                {s.tag}
              </p>
              <p className="text-fog-100 text-[13.5px] leading-tight">{s.text}</p>
            </li>
          ))}
        </motion.ul>
      </div>
      <p className="mt-12 text-fog-400 text-[14px] sm:text-[15px] leading-relaxed text-pretty max-w-2xl pt-8 border-t border-white/[0.06]">
        {m.problem.closing}
      </p>
    </SectionShell>
  )
}

// ============================================================================
// 03 — VALUE (capability bento — icon + title)
// ============================================================================
function Value({ m }) {
  return (
    <SectionShell id="capabilities">
      <Eyebrow>{m.value.eyebrow}</Eyebrow>
      <H2 title={m.value.title} accent={m.value.titleAccent} max="max-w-3xl" />
      <p className="text-fog-300 text-[15px] sm:text-[16px] leading-relaxed text-pretty mt-6 max-w-2xl">
        {m.value.body}
      </p>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.85 }}
        className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-2 min-w-0"
      >
        {m.value.capabilities.map((c) => {
          const Icon = capabilityIcons[c.tag] || MessageCircle
          return (
            <div
              key={c.title}
              className="rounded-xl border border-white/[0.07] bg-white/[0.015] p-5 hover:bg-white/[0.025] hover:border-accent/20 transition-all"
            >
              <Icon size={18} className="text-accent" />
              <p className="mono-label text-fog-500 text-[9px] tracking-[0.22em] mt-3">{c.tag}</p>
              <p className="text-fog-50 text-[14px] font-medium leading-tight mt-1.5">{c.title}</p>
            </div>
          )
        })}
      </motion.div>
    </SectionShell>
  )
}

// ============================================================================
// 04 — CHAT (5 type cards + closing)
// ============================================================================
function Chat({ m }) {
  return (
    <SectionShell id="chat">
      <div className="text-center max-w-3xl mx-auto">
        <Eyebrow>{m.chat.eyebrow}</Eyebrow>
        <H2 title={m.chat.title} accent={m.chat.titleAccent} max="max-w-3xl" align="center" />
        <p className="text-fog-300 text-[15px] sm:text-[16px] leading-relaxed text-pretty mt-6 max-w-xl mx-auto">
          {m.chat.body}
        </p>
      </div>
      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {m.chat.types.map((it, i) => (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: Math.min(i * 0.05, 0.3) }}
            className="rounded-xl border border-white/[0.07] bg-white/[0.015] p-6 hover:border-accent/25 hover:bg-white/[0.025] transition-all"
          >
            <p className="mono-label text-accent text-[10px] tracking-[0.22em] mb-3">{it.label}</p>
            <p className="font-display font-semibold text-fog-50 text-[18px] tracking-[-0.01em] leading-tight">
              {it.title}
            </p>
            <p className="text-fog-300 text-[13.5px] leading-relaxed mt-3">{it.body}</p>
          </motion.div>
        ))}
      </div>
      <p className="mt-12 text-fog-400 text-[14px] sm:text-[15px] leading-relaxed text-pretty max-w-2xl mx-auto text-center italic">
        {m.chat.closing}
      </p>
    </SectionShell>
  )
}

// ============================================================================
// 05 — NOTIFICATIONS (left copy + right phone-style notification stack)
// ============================================================================
function Notifications({ m }) {
  return (
    <SectionShell id="notifications">
      <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-14 items-start min-w-0">
        <div className="min-w-0">
          <Eyebrow>{m.notifications.eyebrow}</Eyebrow>
          <H2 title={m.notifications.title} accent={m.notifications.titleAccent} max="max-w-md" />
          <p className="text-fog-300 text-[15px] sm:text-[16px] leading-relaxed text-pretty mt-6 max-w-md">
            {m.notifications.body}
          </p>
          <div className="mt-8 flex flex-wrap gap-1.5 max-w-md">
            {m.notifications.types.map((t) => (
              <span
                key={t}
                className="mono-label text-fog-200 text-[10px] tracking-[0.16em] px-2.5 py-1 rounded-full border border-white/[0.07] bg-white/[0.02]"
              >
                {t}
              </span>
            ))}
          </div>
          <p className="mt-8 text-fog-400 text-[13.5px] leading-relaxed italic max-w-md">
            {m.notifications.closing}
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85 }}
          className="rounded-2xl border border-white/[0.07] bg-white/[0.015] p-5 min-w-0"
        >
          <div className="flex items-center justify-between mb-4 px-1">
            <p className="mono-label text-fog-500 text-[10px] tracking-[0.22em]">// notifications.feed</p>
            <span className="mono-label text-accent text-[10px] tracking-[0.22em] flex items-center gap-1">
              <span className="status-dot active" /> live
            </span>
          </div>
          <ul className="space-y-2 min-w-0">
            {m.notifications.examples.map((ex, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.5) }}
                className="flex items-start gap-3 rounded-lg border border-white/[0.05] bg-white/[0.02] px-3 py-2.5"
              >
                <Bell size={12} className="text-accent shrink-0 mt-0.5" />
                <p className="text-fog-100 text-[13px] leading-snug min-w-0 break-words">{ex}</p>
                <span className="mono-label text-fog-500 text-[9px] tracking-[0.18em] tabular-nums shrink-0 ml-auto">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </SectionShell>
  )
}

// ============================================================================
// 06 — REALTIME (immersive: bell at center, copy + stack orbit around it)
// ============================================================================
function Realtime({ m }) {
  return (
    <section
      id="realtime"
      className="relative overflow-hidden py-24 sm:py-32 px-4 sm:px-8 lg:px-14"
      style={{ background: '#05080C' }}
    >
      {/* radial accent glow behind the bell */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(ellipse 50% 60% at 50% 50%, rgba(45,226,197,0.08) 0%, rgba(45,226,197,0.0) 60%)',
        }}
      />

      {/* faint grid backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04] pointer-events-none z-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent 80%)',
        }}
      />

      <div className="container-shell relative z-[1]">
        {/* HEADLINE — top, full width, centered */}
        <div className="text-center max-w-3xl mx-auto">
          <Eyebrow>{m.realtime.eyebrow}</Eyebrow>
          <H2 title={m.realtime.title} accent={m.realtime.titleAccent} max="max-w-3xl" align="center" />
          <p className="text-fog-300 text-[15px] sm:text-[16px] leading-relaxed text-pretty mt-6 max-w-xl mx-auto">
            {m.realtime.body}
          </p>
        </div>

        {/* IMMERSIVE STAGE — bell at center, no surrounding cards */}
        <div className="relative mt-12 flex items-center justify-center min-h-[520px] sm:min-h-[640px] lg:min-h-[760px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-[820px] aspect-square"
          >
            <ParticleBell />
          </motion.div>

          {/* HUD — instrument labels (top center) */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-[2] hidden sm:flex items-center gap-3 pointer-events-none">
            <span className="status-dot active" />
            <span className="mono-label text-accent text-[10px] tracking-[0.22em]">
              notify · live
            </span>
            <span className="mono-label text-fog-500 text-[10px] tracking-[0.22em]">
              {m.hero.hudLatency}
            </span>
          </div>
        </div>

        {/* Closing line — italic, centered */}
        <p className="mt-12 text-fog-400 text-[14px] sm:text-[15px] leading-relaxed text-pretty max-w-2xl mx-auto text-center italic pt-8 border-t border-white/[0.06]">
          {m.realtime.closing}
        </p>
      </div>
    </section>
  )
}

// ============================================================================
// 07 — STATES (state pills + features list — diagram of message states)
// ============================================================================
function States({ m }) {
  return (
    <SectionShell id="states">
      <Eyebrow>{m.states.eyebrow}</Eyebrow>
      <H2 title={m.states.title} accent={m.states.titleAccent} max="max-w-3xl" />
      <p className="text-fog-300 text-[15px] sm:text-[16px] leading-relaxed text-pretty mt-6 max-w-2xl">
        {m.states.body}
      </p>

      {/* state flow visual — pills with arrows */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.85 }}
        className="mt-12 rounded-2xl border border-white/[0.07] bg-white/[0.015] p-6 sm:p-8"
      >
        <p className="mono-label text-fog-500 text-[10px] tracking-[0.22em] mb-5">// message.state</p>
        <div className="flex flex-wrap items-center gap-2">
          {m.states.states.map((s, i) => (
            <span key={s} className="flex items-center gap-2">
              <span className={`mono-label text-[10px] tracking-[0.16em] px-2.5 py-1.5 rounded-full border ${i < 4 ? 'border-accent/30 bg-accent/[0.06] text-accent' : 'border-white/[0.07] bg-white/[0.02] text-fog-200'}`}>
                {s}
              </span>
              {i < m.states.states.length - 1 && (
                <ChevronRight size={11} className="text-fog-600" />
              )}
            </span>
          ))}
        </div>
      </motion.div>

      <div className="mt-10 grid lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-12 items-start min-w-0">
        <p className="text-fog-300 text-[15px] leading-relaxed text-pretty max-w-md">
          {m.states.closing}
        </p>
        <ul className="grid sm:grid-cols-2 gap-2 min-w-0">
          {m.states.features.map((f) => (
            <li
              key={f}
              className="text-fog-200 text-[13.5px] leading-snug flex items-center gap-2"
            >
              <span className="w-1 h-1 rounded-full bg-accent shrink-0" />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </SectionShell>
  )
}

// ============================================================================
// 08 — SECURE (right-aligned editorial + mosaic capabilities)
// ============================================================================
function Secure({ m }) {
  return (
    <SectionShell id="secure">
      <div className="ml-auto max-w-3xl text-right min-w-0">
        <Eyebrow>{m.secure.eyebrow}</Eyebrow>
        <p
          className="font-display font-semibold text-fog-50 tracking-[-0.02em] leading-[1.06] text-pretty"
          style={{ fontSize: 'clamp(22px, 4.4vw, 60px)', hyphens: 'auto', overflowWrap: 'anywhere' }}
        >
          {m.secure.title}
        </p>
        <p
          className="font-display font-light italic text-fog-300 leading-[1.1] mt-1 text-pretty"
          style={{ fontSize: 'clamp(22px, 4.4vw, 60px)', hyphens: 'auto', overflowWrap: 'anywhere' }}
        >
          {m.secure.titleAccent}
        </p>
        <p className="text-fog-300 text-[15px] leading-relaxed text-pretty mt-6 max-w-xl ml-auto">
          {m.secure.body}
        </p>
      </div>
      <motion.ul
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.85 }}
        className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-2 max-w-5xl ml-auto"
      >
        {m.secure.capabilities.map((c) => (
          <li
            key={c}
            className="rounded-lg border border-accent/15 bg-gradient-to-br from-accent/[0.04] to-transparent px-3 py-3 text-fog-100 text-[13px] leading-snug flex items-start gap-2"
          >
            <ShieldCheck size={11} className="text-accent shrink-0 mt-1" />
            <span>{c}</span>
          </li>
        ))}
      </motion.ul>
      <p className="mt-12 text-fog-400 text-[14px] leading-relaxed text-pretty max-w-2xl ml-auto text-right pt-8 border-t border-white/[0.06]">
        {m.secure.closing}
      </p>
    </SectionShell>
  )
}

// ============================================================================
// 09 — ECOMMERCE (split: ecommerce / logistics events as twin columns)
// ============================================================================
function Ecommerce({ m }) {
  return (
    <SectionShell id="ecommerce">
      <Eyebrow>{m.ecommerce.eyebrow}</Eyebrow>
      <H2 title={m.ecommerce.title} accent={m.ecommerce.titleAccent} max="max-w-3xl" />
      <p className="text-fog-300 text-[15px] leading-relaxed text-pretty mt-6 max-w-2xl">
        {m.ecommerce.body}
      </p>
      <div className="mt-12 grid lg:grid-cols-2 gap-3 min-w-0">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="rounded-2xl border border-white/[0.07] bg-white/[0.015] p-7 min-w-0"
        >
          <p className="mono-label text-accent text-[10px] tracking-[0.22em] mb-5">// ecommerce.events</p>
          <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-2">
            {m.ecommerce.ecommerce.map((e) => (
              <li key={e} className="text-fog-100 text-[13.5px] leading-snug flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-accent shrink-0 mt-2" />
                {e}
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="rounded-2xl border border-white/[0.07] bg-white/[0.015] p-7 min-w-0"
        >
          <p className="mono-label text-signal-amber text-[10px] tracking-[0.22em] mb-5">// logistics.events</p>
          <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-2">
            {m.ecommerce.logistics.map((e) => (
              <li key={e} className="text-fog-100 text-[13.5px] leading-snug flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-signal-amber shrink-0 mt-2" />
                {e}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
      <p className="mt-10 text-fog-400 text-[14px] leading-relaxed text-pretty max-w-2xl italic">
        {m.ecommerce.closing}
      </p>
    </SectionShell>
  )
}

// ============================================================================
// 10 — COMMUNITY (centered + pill cloud)
// ============================================================================
function Community({ m }) {
  return (
    <SectionShell id="community">
      <div className="text-center max-w-3xl mx-auto">
        <Eyebrow>{m.community.eyebrow}</Eyebrow>
        <H2 title={m.community.title} accent={m.community.titleAccent} max="max-w-3xl" align="center" />
        <p className="text-fog-300 text-[15px] leading-relaxed text-pretty mt-6 max-w-xl mx-auto">
          {m.community.body}
        </p>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.85, delay: 0.2 }}
        className="mt-10 flex flex-wrap justify-center gap-1.5 max-w-3xl mx-auto"
      >
        {m.community.features.map((f) => (
          <span
            key={f}
            className="mono-label text-fog-200 text-[11px] tracking-[0.16em] px-3 py-1.5 rounded-full border border-white/[0.07] bg-white/[0.02]"
          >
            <Users size={10} className="inline-block mr-1.5 -mt-0.5 text-accent" />
            {f}
          </span>
        ))}
      </motion.div>
      <p className="mt-12 text-fog-400 text-[14px] leading-relaxed text-pretty max-w-2xl mx-auto text-center italic">
        {m.community.closing}
      </p>
    </SectionShell>
  )
}

// ============================================================================
// 11 — EVENTS (event triggers list + ASCII pipeline)
// ============================================================================
function Events({ m }) {
  return (
    <SectionShell id="events">
      <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-14 items-start min-w-0">
        <div className="min-w-0">
          <Eyebrow>{m.events.eyebrow}</Eyebrow>
          <H2 title={m.events.title} accent={m.events.titleAccent} max="max-w-md" />
          <p className="text-fog-300 text-[15px] leading-relaxed text-pretty mt-6 max-w-md">
            {m.events.body}
          </p>
          <ul className="mt-7 grid grid-cols-2 gap-x-4 gap-y-2 max-w-md">
            {m.events.triggers.map((t) => (
              <li key={t} className="text-fog-200 text-[13px] leading-snug flex items-start gap-2">
                <Zap size={10} className="text-accent shrink-0 mt-1.5" />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85 }}
          className="rounded-2xl border border-white/[0.07] bg-white/[0.015] p-6 sm:p-8 min-w-0"
        >
          <p className="mono-label text-fog-500 text-[10px] tracking-[0.22em] mb-5">// event.pipeline</p>
          <div className="space-y-2 font-mono">
            {m.events.pipeline.map((step, i) => (
              <div key={step} className="min-w-0">
                <div
                  className={`flex items-center gap-3 rounded-lg border px-4 py-3 min-w-0 ${
                    i === 0
                      ? 'border-accent/30 bg-accent/[0.05]'
                      : 'border-white/[0.07] bg-white/[0.02]'
                  }`}
                >
                  <span className="mono-label text-fog-500 text-[10px] tracking-[0.18em] tabular-nums shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className={`text-[13px] leading-snug min-w-0 break-words ${i === 0 ? 'text-accent' : 'text-fog-100'}`}>
                    {step}
                  </span>
                </div>
                {i < m.events.pipeline.length - 1 && (
                  <div className="flex justify-center py-1">
                    <span className="text-fog-600 text-[10px]">↓</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      <p className="mt-12 text-fog-400 text-[14px] leading-relaxed text-pretty max-w-2xl pt-8 border-t border-white/[0.06] italic">
        {m.events.closing}
      </p>
    </SectionShell>
  )
}

// ============================================================================
// 12 — BACKEND (left copy + 3-col module grid right)
// ============================================================================
function Backend({ m }) {
  return (
    <SectionShell id="backend">
      <div className="grid lg:grid-cols-[1fr_1.3fr] gap-10 lg:gap-14 items-start min-w-0">
        <div className="min-w-0">
          <Eyebrow>{m.backend.eyebrow}</Eyebrow>
          <H2 title={m.backend.title} accent={m.backend.titleAccent} max="max-w-md" />
          <p className="text-fog-300 text-[15px] leading-relaxed text-pretty mt-6 max-w-md">
            {m.backend.body}
          </p>
          <p className="mt-6 text-fog-400 text-[13.5px] leading-relaxed italic max-w-md">
            {m.backend.closing}
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85 }}
          className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 min-w-0"
        >
          {m.backend.modules.map((mod, i) => (
            <div
              key={mod}
              className="rounded-md border border-white/[0.06] bg-white/[0.015] px-3 py-2.5 hover:bg-white/[0.03] hover:border-accent/20 transition-all"
            >
              <p className="mono-label text-fog-600 text-[9px] tracking-[0.18em]">
                {String(i + 1).padStart(2, '0')}
              </p>
              <p className="text-fog-100 text-[12.5px] leading-tight mt-1">{mod}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </SectionShell>
  )
}

// ============================================================================
// 13 — SYNC (4 surfaces icons + flows ribbon)
// ============================================================================
function Sync({ m }) {
  const surfaceIcons = [Smartphone, Monitor, Server, Inbox]
  return (
    <SectionShell id="sync">
      <div className="text-center max-w-3xl mx-auto">
        <Eyebrow>{m.sync.eyebrow}</Eyebrow>
        <H2 title={m.sync.title} accent={m.sync.titleAccent} max="max-w-3xl" align="center" />
        <p className="text-fog-300 text-[15px] leading-relaxed text-pretty mt-6 max-w-xl mx-auto">
          {m.sync.body}
        </p>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.85 }}
        className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 max-w-5xl mx-auto min-w-0"
      >
        {m.sync.surfaces.map((s, i) => {
          const Icon = surfaceIcons[i % surfaceIcons.length]
          return (
            <div
              key={s}
              className="rounded-lg border border-white/[0.07] bg-white/[0.015] px-3 py-3 hover:bg-white/[0.025] hover:border-accent/20 transition-all"
            >
              <Icon size={14} className="text-accent" />
              <p className="text-fog-100 text-[12.5px] leading-tight mt-2">{s}</p>
            </div>
          )
        })}
      </motion.div>
      <div className="mt-10 max-w-3xl mx-auto">
        <p className="mono-label text-fog-500 text-[10px] tracking-[0.22em] mb-4 text-center">// sync.flows</p>
        <ul className="space-y-2">
          {m.sync.flows.map((f, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.06, 0.4) }}
              className="rounded-lg border border-white/[0.06] bg-white/[0.015] px-4 py-3 text-fog-100 text-[13.5px] leading-snug flex items-start gap-3"
            >
              <span className="mono-label text-accent text-[10px] tracking-[0.18em] tabular-nums shrink-0 mt-0.5">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="min-w-0 break-words">{f}</span>
            </motion.li>
          ))}
        </ul>
      </div>
      <p className="mt-10 text-fog-400 text-[14px] leading-relaxed text-pretty max-w-2xl mx-auto text-center italic">
        {m.sync.closing}
      </p>
    </SectionShell>
  )
}

// ============================================================================
// 14 — DASHBOARDS (metrics tile cloud — 4-col)
// ============================================================================
function Dashboards({ m }) {
  return (
    <SectionShell id="dashboards">
      <Eyebrow>{m.dashboards.eyebrow}</Eyebrow>
      <H2 title={m.dashboards.title} accent={m.dashboards.titleAccent} max="max-w-3xl" />
      <p className="text-fog-300 text-[15px] leading-relaxed text-pretty mt-6 max-w-2xl">
        {m.dashboards.body}
      </p>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.85 }}
        className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1.5 min-w-0"
      >
        {m.dashboards.metrics.map((mt, i) => (
          <div
            key={mt}
            className="rounded-lg border border-white/[0.06] bg-white/[0.015] px-3 py-3 hover:bg-white/[0.03] hover:border-accent/20 transition-all"
          >
            <p className="mono-label text-accent text-[9px] tracking-[0.22em] tabular-nums">
              {String(i + 1).padStart(2, '0')}
            </p>
            <p className="text-fog-100 text-[12.5px] leading-tight mt-1.5">{mt}</p>
          </div>
        ))}
      </motion.div>
      <p className="mt-12 text-fog-400 text-[14px] leading-relaxed text-pretty max-w-2xl italic">
        {m.dashboards.closing}
      </p>
    </SectionShell>
  )
}

// ============================================================================
// 15 — AI (minimalist + elegant: particle robot at center, copy at sides)
// ============================================================================
function AI({ m }) {
  return (
    <section
      id="ai"
      className="relative overflow-hidden py-24 sm:py-32 px-4 sm:px-8 lg:px-14"
      style={{ background: '#05080C' }}
    >
      {/* very subtle radial accent — barely there, just enough to lift the robot */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(ellipse 45% 55% at 50% 55%, rgba(45,226,197,0.06) 0%, rgba(45,226,197,0.0) 65%)',
        }}
      />

      <div className="container-shell relative z-[1]">
        {/* HEADLINE — anchored top, single column, generous breathing room */}
        <div className="max-w-3xl">
          <Eyebrow>{m.ai.eyebrow}</Eyebrow>
          <H2 title={m.ai.title} accent={m.ai.titleAccent} max="max-w-3xl" />
        </div>

        {/* MAIN STAGE — robot center, copy left, hairline use-cases right */}
        <div className="mt-14 lg:mt-20 grid lg:grid-cols-[1fr_1.2fr_1fr] gap-8 lg:gap-12 items-center min-w-0">
          {/* Left — body copy + closing */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
            className="min-w-0 lg:text-right order-2 lg:order-1"
          >
            <p className="text-fog-200 text-[15px] sm:text-[16px] leading-relaxed text-pretty">
              {m.ai.body}
            </p>
            <div className="mt-6 pt-6 border-t border-white/[0.06] lg:border-t-0 lg:border-b-0">
              <p className="text-fog-400 text-[13.5px] leading-relaxed italic text-pretty">
                {m.ai.closing}
              </p>
            </div>
          </motion.div>

          {/* Center — particle robot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-square w-full max-w-[520px] mx-auto order-1 lg:order-2"
          >
            <ParticleRobot />

            {/* HUD — minimalist labels at the corners */}
            <div aria-hidden className="absolute inset-0 pointer-events-none">
              <div className="absolute top-4 left-4 mono-label text-fog-500 text-[10px] tracking-[0.22em]">
                // ai.assist()
              </div>
              <div className="absolute top-4 right-4 flex items-center gap-1.5">
                <span className="status-dot active" />
                <span className="mono-label text-accent text-[10px] tracking-[0.22em]">live</span>
              </div>
              <div className="absolute bottom-4 left-4 mono-label text-fog-500 text-[10px] tracking-[0.22em]">
                supervised
              </div>
              <div className="absolute bottom-4 right-4 mono-label text-fog-500 text-[10px] tracking-[0.22em]">
                EDS · 0042
              </div>
            </div>
          </motion.div>

          {/* Right — use cases as a clean numbered list, no boxes */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="min-w-0 order-3"
          >
            <p className="mono-label text-fog-500 text-[10px] tracking-[0.22em] mb-5">
              // use cases
            </p>
            <ul className="divide-y divide-white/[0.06]">
              {m.ai.useCases.map((u, i) => (
                <li
                  key={u}
                  className="group flex items-baseline gap-4 py-2.5 hover:text-accent transition-colors"
                >
                  <span className="mono-label text-fog-600 group-hover:text-accent text-[10px] tracking-[0.18em] tabular-nums shrink-0 w-7 transition-colors">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-fog-200 group-hover:text-fog-50 text-[13.5px] leading-snug min-w-0 break-words transition-colors">
                    {u}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// 16 — SECURITY (centered + pill grid + closing)
// ============================================================================
function Security({ m }) {
  return (
    <SectionShell id="security">
      <div className="text-center max-w-3xl mx-auto">
        <Eyebrow>{m.security.eyebrow}</Eyebrow>
        <H2 title={m.security.title} accent={m.security.titleAccent} max="max-w-3xl" align="center" />
        <p className="text-fog-300 text-[15px] leading-relaxed text-pretty mt-6 max-w-xl mx-auto">
          {m.security.body}
        </p>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.85 }}
        className="mt-10 flex flex-wrap justify-center gap-1.5 max-w-3xl mx-auto"
      >
        {m.security.practices.map((p) => (
          <span
            key={p}
            className="mono-label text-accent text-[10px] tracking-[0.18em] px-3 py-1.5 rounded-full border border-accent/20 bg-accent/[0.04]"
          >
            <ShieldCheck size={10} className="inline-block mr-1.5 -mt-0.5" />
            {p}
          </span>
        ))}
      </motion.div>
      <p className="mt-12 text-fog-400 text-[14px] leading-relaxed text-pretty max-w-2xl mx-auto text-center pt-8 border-t border-white/[0.06]">
        {m.security.closing}
      </p>
    </SectionShell>
  )
}

// ============================================================================
// 17 — ARCHITECTURE (disruptive editorial: index list + hovered-row preview)
// Elegant, minimalist — no card walls, no grid lockup
// ============================================================================
function Architecture({ m }) {
  const toneText = {
    accent: 'text-accent',
    blue:   'text-signal-blue',
    violet: 'text-[#9D8DF1]',
    amber:  'text-signal-amber',
  }
  const toneDot = {
    accent: 'bg-accent',
    blue:   'bg-signal-blue',
    violet: 'bg-[#9D8DF1]',
    amber:  'bg-signal-amber',
  }
  const [active, setActive] = useState(0)
  const layer = m.architecture.layers[active]
  const ts = toneText[layer?.tone] || toneText.accent
  const tdot = toneDot[layer?.tone] || toneDot.accent

  return (
    <section
      id="architecture"
      className="relative overflow-hidden py-28 sm:py-36 px-4 sm:px-8 lg:px-14"
      style={{ background: '#05080C' }}
    >
      {/* very subtle radial — barely there */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 40%, rgba(56,189,248,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="container-shell relative z-[1]">
        {/* HEADLINE — disruptive split. Eyebrow + meta on a slim left column, title huge on the right */}
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-16 items-end mb-16 lg:mb-24">
          <div className="min-w-0">
            <Eyebrow>{m.architecture.eyebrow}</Eyebrow>
            <p className="mono-label text-fog-500 text-[10px] tracking-[0.22em] mt-2">
              {m.architecture.layers.length.toString().padStart(2, '0')} layers · stack
            </p>
            <div
              aria-hidden
              className="mt-6 h-px max-w-[180px]"
              style={{ background: 'linear-gradient(to right, rgba(45,226,197,0.6), transparent)' }}
            />
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-semibold tracking-[-0.04em] leading-[0.9] text-pretty"
            style={{ fontSize: 'clamp(40px, 7.2vw, 110px)', hyphens: 'auto', overflowWrap: 'anywhere' }}
          >
            <span className="text-fog-50 block">{m.architecture.title}</span>
            <span className="text-fog-300 block font-light italic">{m.architecture.titleAccent}</span>
          </motion.h2>
        </div>

        {/* MAIN STAGE — left: numbered ledger of layers; right: focused preview */}
        <div className="grid lg:grid-cols-[1fr_0.85fr] gap-12 lg:gap-20 items-start min-w-0">
          {/* LEDGER — typographic list, no boxes; rows highlight on hover */}
          <ul className="min-w-0">
            {m.architecture.layers.map((l, i) => {
              const isActive = i === active
              const lt = toneText[l.tone] || toneText.accent
              return (
                <li key={l.tag} className="border-b border-white/[0.06] last:border-b-0">
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className="group w-full text-left py-5 lg:py-6 flex items-baseline gap-5 sm:gap-8 transition-colors"
                  >
                    <span
                      className={`mono-label text-[10px] tracking-[0.22em] tabular-nums shrink-0 w-8 transition-colors ${
                        isActive ? lt : 'text-fog-600 group-hover:text-fog-300'
                      }`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`mono-label text-[10px] tracking-[0.22em] shrink-0 w-20 hidden sm:inline transition-colors ${
                        isActive ? lt : 'text-fog-500 group-hover:text-fog-300'
                      }`}
                    >
                      {l.tag}
                    </span>
                    <span
                      className={`font-display tracking-[-0.02em] leading-tight min-w-0 break-words text-pretty transition-all ${
                        isActive ? 'text-fog-50' : 'text-fog-400 group-hover:text-fog-200'
                      }`}
                      style={{ fontSize: 'clamp(18px, 2.4vw, 28px)' }}
                    >
                      {l.title}
                    </span>
                    <span
                      className={`ml-auto shrink-0 w-1.5 h-1.5 rounded-full transition-all ${
                        isActive ? `${toneDot[l.tone] || toneDot.accent}` : 'bg-fog-700 group-hover:bg-fog-500'
                      }`}
                      style={isActive ? { boxShadow: '0 0 12px currentColor' } : undefined}
                    />
                  </button>
                </li>
              )
            })}
          </ul>

          {/* PREVIEW — sticky, minimalist info panel that reflects active row */}
          <div className="lg:sticky lg:top-28 self-start min-w-0">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative pl-6"
            >
              {/* hairline accent on the left */}
              <div
                aria-hidden
                className={`absolute left-0 top-1 bottom-1 w-[2px] ${tdot}`}
                style={{ opacity: 0.7, boxShadow: '0 0 12px currentColor' }}
              />

              <p className={`mono-label ${ts} text-[10px] tracking-[0.22em] mb-3`}>
                L{String(active + 1).padStart(2, '0')} · {layer?.tag}
              </p>
              <p
                className="font-display font-semibold text-fog-50 tracking-[-0.02em] leading-tight text-pretty"
                style={{ fontSize: 'clamp(24px, 3.4vw, 40px)' }}
              >
                {layer?.title}
              </p>
              <p className="text-fog-400 text-[13.5px] leading-relaxed mt-5 max-w-md">
                Capa {String(active + 1).padStart(2, '0')} de {m.architecture.layers.length} en la pila de mensajería y tiempo real.
              </p>

              <div className="mt-8 flex items-center gap-2">
                {m.architecture.layers.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-label={`Layer ${i + 1}`}
                    className={`h-[3px] rounded-full transition-all ${
                      i === active ? `w-8 ${toneDot[m.architecture.layers[i].tone] || 'bg-accent'}` : 'w-3 bg-white/[0.1] hover:bg-white/[0.2]'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* FOOTER — flow ribbon: tags chained with arrows, single line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-20 pt-8 border-t border-white/[0.06] flex flex-wrap items-center justify-center gap-x-3 gap-y-2"
        >
          {m.architecture.layers.map((l, i) => {
            const lt = toneText[l.tone] || toneText.accent
            return (
              <span key={l.tag} className="flex items-center gap-3">
                <span
                  onMouseEnter={() => setActive(i)}
                  className={`mono-label text-[10px] tracking-[0.18em] cursor-default transition-colors ${
                    i === active ? lt : 'text-fog-500 hover:text-fog-300'
                  }`}
                >
                  {l.tag}
                </span>
                {i < m.architecture.layers.length - 1 && (
                  <span className="text-fog-700 text-[10px]">→</span>
                )}
              </span>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// 18 — USE CASES (10 numbered cards)
// ============================================================================
function UseCases({ m }) {
  return (
    <SectionShell id="use-cases">
      <Eyebrow>{m.useCases.eyebrow}</Eyebrow>
      <H2 title={m.useCases.title} accent={m.useCases.titleAccent} max="max-w-3xl" />
      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 min-w-0">
        {m.useCases.items.map((it, i) => (
          <motion.div
            key={it.num}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: Math.min(i * 0.04, 0.4) }}
            className="rounded-xl border border-white/[0.07] bg-white/[0.015] p-5 hover:bg-white/[0.025] hover:border-accent/20 transition-all"
          >
            <p className="mono-label text-accent text-[10px] tracking-[0.22em] tabular-nums">
              {it.num}
            </p>
            <p className="text-fog-50 text-[14px] font-medium leading-tight mt-3">{it.title}</p>
            <p className="text-fog-400 text-[12.5px] leading-relaxed mt-2.5">{it.body}</p>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  )
}

// ============================================================================
// 19 — DIFFERENTIATORS (6 numbered cards)
// ============================================================================
function Differentiators({ m }) {
  return (
    <SectionShell id="why">
      <Eyebrow>{m.differentiators.eyebrow}</Eyebrow>
      <H2 title={m.differentiators.title} accent={m.differentiators.titleAccent} max="max-w-3xl" />
      <div className="mt-12 space-y-3">
        {m.differentiators.items.map((it, i) => (
          <motion.div
            key={it.num}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: Math.min(i * 0.05, 0.3) }}
            className="group rounded-2xl border border-white/[0.07] bg-white/[0.015] p-6 sm:p-8 hover:bg-white/[0.025] hover:border-accent/20 transition-all overflow-hidden"
          >
            <div className="grid sm:grid-cols-[auto_1fr] gap-6 items-start min-w-0">
              <span
                className="font-display text-fog-600 group-hover:text-accent transition-colors leading-none"
                style={{ fontSize: 'clamp(48px, 7vw, 96px)', letterSpacing: '-0.04em' }}
              >
                {it.num}
              </span>
              <div className="min-w-0">
                <p
                  className="font-display font-semibold text-fog-50 tracking-[-0.02em] leading-tight text-pretty"
                  style={{ fontSize: 'clamp(20px, 2.6vw, 32px)' }}
                >
                  {it.title}
                </p>
                <p className="text-fog-300 text-[14px] sm:text-[15px] leading-relaxed text-pretty mt-3 max-w-2xl">
                  {it.body}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  )
}

// ============================================================================
// 20 — PROCESS (BuildPipeline with 10 steps)
// ============================================================================
function Process({ m }) {
  return (
    <SectionShell id="process">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <Eyebrow>{m.process.eyebrow}</Eyebrow>
        <H2 title={m.process.title} accent={m.process.titleAccent} max="max-w-3xl" align="center" />
      </div>
      <BuildPipeline steps={m.process.steps} />
    </SectionShell>
  )
}

// ============================================================================
// 21 — STACK (groups of items)
// ============================================================================
function Stack({ m }) {
  return (
    <SectionShell id="stack">
      <Eyebrow>{m.stack.eyebrow}</Eyebrow>
      <H2 title={m.stack.title} accent={m.stack.titleAccent} max="max-w-3xl" />
      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 min-w-0">
        {m.stack.groups.map((g) => (
          <motion.div
            key={g.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55 }}
            className="rounded-xl border border-white/[0.07] bg-white/[0.015] p-5"
          >
            <p className="mono-label text-accent text-[10px] tracking-[0.22em] mb-4">{g.label}</p>
            <ul className="space-y-1.5">
              {g.items.map((it) => (
                <li key={it} className="text-fog-200 text-[13px] leading-snug">{it}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  )
}

// ============================================================================
// 22 — MID CTA (banner with hand emoji)
// ============================================================================
function MidCta({ m }) {
  return (
    <section className="relative py-20 px-4 sm:px-8 lg:px-14 overflow-hidden">
      <div className="container-shell">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85 }}
          className="rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/[0.07] to-accent/[0.01] p-8 sm:p-12 grid lg:grid-cols-[1.4fr_1fr] gap-8 items-center min-w-0"
        >
          <div className="min-w-0">
            <Eyebrow>{m.midCta.eyebrow}</Eyebrow>
            <p
              className="font-display font-semibold text-fog-50 tracking-[-0.02em] leading-tight text-pretty"
              style={{ fontSize: 'clamp(24px, 3.6vw, 42px)' }}
            >
              {m.midCta.title}
              <span className="text-fog-300 font-light italic block">{m.midCta.titleAccent}</span>
            </p>
            <p className="text-fog-300 text-[15px] leading-relaxed text-pretty mt-5 max-w-xl">
              {m.midCta.body}
            </p>
          </div>
          <div className="lg:justify-self-end">
            <a href="#contact" className="btn-primary">
              {m.midCta.cta}
              <ArrowUpRight size={15} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// 23 — FAQ (accordion)
// ============================================================================
function FAQ({ m }) {
  const [open, setOpen] = useState(0)
  return (
    <SectionShell id="faq">
      <div className="grid lg:grid-cols-[1fr_1.5fr] gap-10 lg:gap-14 items-start min-w-0">
        <div className="min-w-0">
          <Eyebrow>{m.faq.eyebrow}</Eyebrow>
          <H2 title={m.faq.title} accent={m.faq.titleAccent} max="max-w-md" />
        </div>
        <div className="space-y-2 min-w-0">
          {m.faq.items.map((it, i) => {
            const isOpen = open === i
            return (
              <button
                key={i}
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="w-full text-left rounded-xl border border-white/[0.07] bg-white/[0.015] px-5 py-4 hover:bg-white/[0.025] hover:border-accent/20 transition-all"
                aria-expanded={isOpen}
              >
                <div className="flex items-start justify-between gap-4 min-w-0">
                  <p className="font-display text-fog-50 text-[15px] sm:text-[16px] leading-snug min-w-0 break-words">
                    {it.q}
                  </p>
                  <span className="text-accent shrink-0 mt-0.5">
                    {isOpen ? <Minus size={15} /> : <Plus size={15} />}
                  </span>
                </div>
                {isOpen && (
                  <p className="text-fog-300 text-[14px] leading-relaxed mt-3 pr-7 text-pretty">
                    {it.a}
                  </p>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </SectionShell>
  )
}

// ============================================================================
// 24 — FINAL CTA
// ============================================================================
function FinalCta({ m }) {
  return (
    <section id="contact" className="relative py-24 sm:py-32 px-4 sm:px-8 lg:px-14">
      <div className="container-shell relative">
        <Eyebrow>{m.finalCta.eyebrow}</Eyebrow>
        <h2
          className="font-display font-semibold tracking-[-0.03em] leading-[0.96] text-pretty max-w-4xl"
          style={{ fontSize: 'clamp(32px, 5.2vw, 76px)', hyphens: 'auto', overflowWrap: 'anywhere' }}
        >
          <span className="text-fog-50 block">{m.finalCta.title}</span>
          <span className="text-fog-300 block font-light italic">{m.finalCta.titleAccent}</span>
        </h2>
        <p className="mt-6 text-fog-300 text-[15px] sm:text-[16px] leading-relaxed text-pretty max-w-2xl">
          {m.finalCta.body}
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <a href="mailto:omar.carrasco.aranda@gmail.com" className="btn-primary">
            {m.finalCta.cta}
            <ArrowRight size={15} />
          </a>
          <a href="/" className="text-fog-300 text-[14px] inline-flex items-center gap-1.5 hover:text-accent transition-colors">
            {m.finalCta.ctaSecondary} <ChevronRight size={13} />
          </a>
        </div>
      </div>
    </section>
  )
}
