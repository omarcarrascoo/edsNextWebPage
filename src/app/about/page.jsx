'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import {
  ArrowRight, ArrowUpRight, ChevronRight,
  ShieldCheck, Sparkles,
} from 'lucide-react'
import SiteHeader from '@/components/site/SiteHeader'
import SiteFooter from '@/components/site/SiteFooter'
import { useT } from '@/i18n/LanguageProvider'

const RocketParticles = dynamic(
  () => import('@/components/graph/RocketParticles'),
  { ssr: false, loading: () => null },
)

const ParticleHalo = dynamic(
  () => import('@/components/graph/ParticleHalo'),
  { ssr: false, loading: () => null },
)

export default function AboutPage() {
  const t = useT()
  const a = t.about
  if (!a) return null

  return (
    <>
      <SiteHeader />
      <main className="relative bg-[#05080C] text-fog-100">
        <Hero a={a} />
        <Market a={a} />
        <Story a={a} />
        <MissionVision a={a} />
        <Represent a={a} />
        <Stance a={a} />
        <Security a={a} />
        <Beliefs a={a} />
        <Pillars a={a} />
        <WhatWeDo a={a} />
        <ForWhom a={a} />
        <Process a={a} />
        <Different a={a} />
        <Manifesto a={a} />
        <FinalCta a={a} />
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
// 01 — HERO (immersive: full-bleed saucer, copy weaves through it)
// ============================================================================
function Hero({ a }) {
  return (
    <section
      className="relative overflow-hidden border-b border-white/[0.05]"
      style={{ minHeight: '100vh', background: '#05080C' }}
    >
      {/* full-bleed grid backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05] pointer-events-none z-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse 100% 80% at 50% 50%, black, transparent 80%)',
        }}
      />

      {/* SAUCER — fills the screen, lives in its own dedicated layer */}
      <div className="absolute inset-0 z-[1]">
        <ParticleHalo />
      </div>

      {/* very subtle radial darkening to anchor type at edges only */}
      <div
        aria-hidden
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, transparent 0%, rgba(5,8,12,0.0) 50%, rgba(5,8,12,0.6) 100%)',
        }}
      />

      {/* HUD CHROME — corner instruments */}
      <div className="absolute top-24 sm:top-28 left-4 sm:left-8 lg:left-14 z-[5]">
        <p className="mono-label text-fog-500 text-[10px] tracking-[0.22em] flex items-center gap-2">
          <a href="/" className="hover:text-fog-200 transition-colors">{a.breadcrumb.home}</a>
          <ChevronRight size={11} />
          <span className="text-accent">{a.breadcrumb.current}</span>
        </p>
      </div>

      <div className="absolute top-24 sm:top-28 right-4 sm:right-8 lg:right-14 z-[5] hidden sm:flex items-center gap-2">
        <span className="status-dot active" />
        <span className="mono-label text-accent text-[10px] tracking-[0.22em]">EDS · 0001 · orbit</span>
      </div>

      {/* DISRUPTIVE TYPE — broken across the saucer in 3 anchored zones */}
      <div className="absolute inset-0 z-[10] pointer-events-none">
        {/* TOP-LEFT — line A (oversized headline anchor) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          className="absolute top-[16%] sm:top-[18%] left-4 sm:left-8 lg:left-14 max-w-[55%] pointer-events-auto"
        >
          <Eyebrow>{a.hero.eyebrow}</Eyebrow>
          <h1
            className="font-display font-semibold tracking-[-0.04em] leading-[0.86] text-fog-50 text-pretty"
            style={{ fontSize: 'clamp(54px, 10vw, 168px)', hyphens: 'auto', overflowWrap: 'anywhere' }}
          >
            {a.hero.titleA}
          </h1>
        </motion.div>

        {/* MID-RIGHT — line B (offset right, cuts the halo plane) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="absolute top-[44%] right-4 sm:right-8 lg:right-14 max-w-[60%] text-right pointer-events-auto"
        >
          <h2
            className="font-display font-semibold tracking-[-0.04em] leading-[0.86] text-fog-200 text-pretty"
            style={{ fontSize: 'clamp(40px, 7.6vw, 124px)', hyphens: 'auto', overflowWrap: 'anywhere' }}
          >
            {a.hero.titleB}
          </h2>
        </motion.div>

        {/* BOTTOM-LEFT — line C (italic, completes the sentence; spans wider) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
          className="absolute bottom-[26%] left-4 sm:left-8 lg:left-14 max-w-[70%] sm:max-w-[55%] pointer-events-auto"
        >
          <h2
            className="font-display font-light italic tracking-[-0.03em] leading-[0.92] text-fog-300 text-pretty"
            style={{ fontSize: 'clamp(28px, 5.4vw, 86px)', hyphens: 'auto', overflowWrap: 'anywhere' }}
          >
            {a.hero.titleC}
          </h2>
        </motion.div>

        {/* DIAGONAL ACCENT LINE — slashes across saucer mid-frame */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-[40%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent origin-left"
        />

        {/* BOTTOM-RIGHT — accent line + CTAs anchored where eyes land last */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.55 }}
          className="absolute bottom-8 sm:bottom-12 right-4 sm:right-8 lg:right-14 max-w-md text-right pointer-events-auto"
        >
          <p
            className="editorial text-accent mb-5 text-pretty"
            style={{ fontSize: 'clamp(15px, 1.5vw, 20px)', lineHeight: 1.35 }}
          >
            {a.hero.titleAccent}
          </p>
          <div className="flex flex-wrap items-center justify-end gap-3">
            <a href="/#contact" className="text-fog-300 text-[13px] inline-flex items-center gap-1.5 hover:text-accent transition-colors">
              {a.hero.ctaSecondary} <ChevronRight size={13} />
            </a>
            <a href="#story" className="btn-primary">
              {a.hero.ctaPrimary}
              <ArrowRight size={15} />
            </a>
          </div>
        </motion.div>

        {/* BOTTOM-LEFT TICKER — 3 stats inline, mono, breaks the visual frame */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.75 }}
          className="absolute bottom-8 sm:bottom-12 left-4 sm:left-8 lg:left-14 pointer-events-auto"
        >
          <div className="flex items-center gap-5 sm:gap-7">
            <div>
              <p className="mono-label text-fog-500 text-[9px] tracking-[0.22em]">EST</p>
              <p className="font-display text-fog-50 text-[18px] sm:text-[22px] tracking-[-0.02em]">2019</p>
            </div>
            <div className="w-px h-8 bg-white/[0.08]" />
            <div>
              <p className="mono-label text-fog-500 text-[9px] tracking-[0.22em]">FOCO</p>
              <p className="font-display text-fog-50 text-[18px] sm:text-[22px] tracking-[-0.02em]">PyMEs · MiPyMEs</p>
            </div>
            <div className="hidden sm:block w-px h-8 bg-white/[0.08]" />
            <div className="hidden sm:block">
              <p className="mono-label text-fog-500 text-[9px] tracking-[0.22em]">ALCANCE</p>
              <p className="font-display text-fog-50 text-[18px] sm:text-[22px] tracking-[-0.02em]">Global</p>
            </div>
          </div>
        </motion.div>

        {/* corner brackets — full hero frame */}
        <div aria-hidden className="absolute inset-6 sm:inset-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-accent/35" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-accent/35" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-accent/35" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-accent/35" />
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// 02 — MARKET (4 stat cards — the data that justifies why Era exists)
// ============================================================================
function Market({ a }) {
  return (
    <SectionShell id="market">
      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-14 items-end min-w-0">
        <div className="min-w-0">
          <Eyebrow>{a.market.eyebrow}</Eyebrow>
          <H2 title={a.market.title} accent={a.market.titleAccent} max="max-w-md" />
          <p className="text-fog-300 text-[15px] sm:text-[16px] leading-relaxed text-pretty mt-6 max-w-md">
            {a.market.body}
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85 }}
          className="grid grid-cols-2 gap-3 min-w-0"
        >
          {a.market.stats.map((s, i) => (
            <motion.div
              key={s.value}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: Math.min(i * 0.06, 0.3) }}
              className="rounded-xl border border-white/[0.07] bg-white/[0.015] p-5"
            >
              <p
                className="font-display font-semibold text-accent leading-none"
                style={{
                  fontSize: 'clamp(36px, 5.6vw, 72px)',
                  letterSpacing: '-0.04em',
                  textShadow: '0 0 32px rgba(45,226,197,0.18)',
                }}
              >
                {s.value}
              </p>
              <p className="text-fog-200 text-[13px] sm:text-[14px] leading-snug mt-3 text-pretty">
                {s.label}
              </p>
              <p className="mono-label text-fog-500 text-[9px] tracking-[0.18em] mt-2">
                {s.source}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <p className="mt-12 text-fog-400 text-[14px] sm:text-[15px] leading-relaxed text-pretty max-w-2xl pt-8 border-t border-white/[0.06]">
        {a.market.closing}
      </p>
    </SectionShell>
  )
}

// ============================================================================
// 03 — STORY (long editorial column, single max-w-2xl — feels like reading)
// ============================================================================
function Story({ a }) {
  return (
    <SectionShell id="story">
      <div className="max-w-3xl">
        <Eyebrow>{a.story.eyebrow}</Eyebrow>
        <H2 title={a.story.title} accent={a.story.titleAccent} max="max-w-3xl" />
      </div>
      <div className="mt-10 grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-14 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="space-y-5"
        >
          <p className="text-fog-200 text-[15px] sm:text-[16px] leading-relaxed text-pretty font-medium">
            {a.story.body}
          </p>
          <p className="text-fog-300 text-[14px] sm:text-[15px] leading-relaxed text-pretty">
            {a.story.bodyMid}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="space-y-5"
        >
          <p className="text-fog-300 text-[14px] sm:text-[15px] leading-relaxed text-pretty">
            {a.story.bodyClose}
          </p>
          <p className="editorial text-fog-200 text-[16px] sm:text-[18px] leading-snug text-pretty pt-5 border-t border-accent/20 italic">
            {a.story.tagline}
          </p>
        </motion.div>
      </div>
    </SectionShell>
  )
}

// ============================================================================
// 04 — MISSION & VISION (2 huge label/title/body blocks side by side)
// ============================================================================
function MissionVision({ a }) {
  return (
    <SectionShell id="mission">
      <div className="text-center max-w-3xl mx-auto">
        <Eyebrow>{a.missionVision.eyebrow}</Eyebrow>
        <H2 title={a.missionVision.title} accent={a.missionVision.titleAccent} max="max-w-3xl" align="center" />
      </div>
      <div className="mt-14 grid lg:grid-cols-2 gap-3 min-w-0">
        {[a.missionVision.mission, a.missionVision.vision].map((b, i) => (
          <motion.div
            key={b.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            className="rounded-2xl border border-white/[0.07] bg-white/[0.015] p-7 sm:p-9 min-w-0"
          >
            <p className="mono-label text-accent text-[10px] tracking-[0.22em] mb-4">
              {b.label}
            </p>
            <p
              className="font-display font-semibold text-fog-50 tracking-[-0.02em] leading-[1.1] text-pretty"
              style={{ fontSize: 'clamp(20px, 2.6vw, 30px)' }}
            >
              {b.title}
            </p>
            <p className="text-fog-300 text-[14px] sm:text-[15px] leading-relaxed text-pretty mt-5">
              {b.body}
            </p>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  )
}

// ============================================================================
// 05 — REPRESENT (centered + tag cloud + closing italic)
// ============================================================================
function Represent({ a }) {
  return (
    <SectionShell id="represent">
      <div className="text-center max-w-3xl mx-auto">
        <Eyebrow>{a.represent.eyebrow}</Eyebrow>
        <H2 title={a.represent.title} accent={a.represent.titleAccent} max="max-w-3xl" align="center" />
        <p className="text-fog-300 text-[15px] sm:text-[16px] leading-relaxed text-pretty mt-6 max-w-xl mx-auto">
          {a.represent.body}
        </p>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mt-10 flex flex-wrap justify-center gap-1.5 max-w-3xl mx-auto"
      >
        {a.represent.tags.map((tag) => (
          <span
            key={tag}
            className="mono-label text-fog-200 text-[11px] tracking-[0.16em] px-3 py-1.5 rounded-full border border-white/[0.07] bg-white/[0.02]"
          >
            {tag}
          </span>
        ))}
      </motion.div>
      <p className="mt-12 editorial text-fog-400 text-[15px] sm:text-[16px] leading-relaxed text-pretty max-w-2xl mx-auto text-center italic">
        {a.represent.closing}
      </p>
    </SectionShell>
  )
}

// ============================================================================
// 06 — STANCE (left copy + right huge questions)
// ============================================================================
function Stance({ a }) {
  return (
    <SectionShell id="stance">
      <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-14 items-start min-w-0">
        <div className="min-w-0">
          <Eyebrow>{a.stance.eyebrow}</Eyebrow>
          <H2 title={a.stance.title} accent={a.stance.titleAccent} max="max-w-md" />
          <p className="text-fog-300 text-[15px] sm:text-[16px] leading-relaxed text-pretty mt-6 max-w-md">
            {a.stance.body}
          </p>
          <p className="text-fog-500 text-[13.5px] leading-relaxed text-pretty mt-6 italic max-w-md">
            {a.stance.closing}
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85 }}
          className="space-y-3 min-w-0"
        >
          {a.stance.questions.map((q, i) => (
            <div
              key={i}
              className="flex items-start gap-4 rounded-xl border border-white/[0.07] bg-white/[0.015] p-4 sm:p-5"
            >
              <span className="mono-label text-accent text-[10px] tracking-[0.18em] tabular-nums w-7 shrink-0 mt-1">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p
                className="font-display font-medium text-fog-100 text-pretty min-w-0"
                style={{ fontSize: 'clamp(16px, 2vw, 22px)', lineHeight: 1.3 }}
              >
                {q}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </SectionShell>
  )
}

// ============================================================================
// 07 — SECURITY (centered editorial + 10 pillar pills)
// ============================================================================
function Security({ a }) {
  return (
    <SectionShell id="security">
      <div className="text-center max-w-3xl mx-auto">
        <Eyebrow>{a.security.eyebrow}</Eyebrow>
        <H2 title={a.security.title} accent={a.security.titleAccent} max="max-w-3xl" align="center" />
        <p className="text-fog-300 text-[15px] sm:text-[16px] leading-relaxed text-pretty mt-6 max-w-xl mx-auto">
          {a.security.body}
        </p>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mt-10 flex flex-wrap justify-center gap-1.5 max-w-3xl mx-auto"
      >
        {a.security.pillars.map((p) => (
          <span
            key={p}
            className="mono-label text-fog-300 text-[10px] tracking-[0.18em] px-3 py-1.5 rounded-full border border-accent/20 bg-accent/[0.04] text-accent"
          >
            <ShieldCheck size={10} className="inline-block mr-1.5 -mt-0.5" />
            {p}
          </span>
        ))}
      </motion.div>
      <p className="mt-12 text-fog-400 text-[14px] sm:text-[15px] leading-relaxed text-pretty max-w-2xl mx-auto text-center pt-8 border-t border-white/[0.06]">
        {a.security.closing}
      </p>
    </SectionShell>
  )
}

// ============================================================================
// 08 — BELIEFS (against / for — diptych with strikethrough on the left)
// ============================================================================
function Beliefs({ a }) {
  return (
    <SectionShell id="beliefs">
      <div className="text-center max-w-3xl mx-auto">
        <Eyebrow>{a.beliefs.eyebrow}</Eyebrow>
        <H2 title={a.beliefs.title} accent={a.beliefs.titleAccent} max="max-w-3xl" align="center" />
      </div>
      <div className="mt-14 grid lg:grid-cols-2 gap-3 min-w-0">
        {/* AGAINST */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="rounded-2xl border border-white/[0.06] bg-white/[0.015] p-7 min-w-0"
        >
          <p className="mono-label text-signal-amber text-[10px] tracking-[0.22em] mb-5 flex items-center gap-2">
            <span>×</span>
            <span>NO CREEMOS EN</span>
          </p>
          <ul className="space-y-3">
            {a.beliefs.against.map((it) => (
              <li
                key={it}
                className="text-fog-400 text-[14px] sm:text-[15px] leading-relaxed line-through text-pretty"
              >
                {it}
              </li>
            ))}
          </ul>
        </motion.div>
        {/* FOR */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="rounded-2xl border border-accent/15 bg-gradient-to-br from-accent/[0.04] to-transparent p-7 min-w-0"
        >
          <p className="mono-label text-accent text-[10px] tracking-[0.22em] mb-5 flex items-center gap-2">
            <span>✓</span>
            <span>SÍ CREEMOS EN TECNOLOGÍA QUE AYUDA A</span>
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
            {a.beliefs.forItems.map((it) => (
              <li
                key={it}
                className="text-fog-100 text-[14px] sm:text-[15px] leading-relaxed text-pretty flex items-center gap-2"
              >
                <span className="w-1 h-1 rounded-full bg-accent shrink-0" />
                {it}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </SectionShell>
  )
}

// ============================================================================
// 09 — PILLARS (5 huge stacked cards with big numerals)
// ============================================================================
function Pillars({ a }) {
  return (
    <SectionShell id="pillars">
      <Eyebrow>{a.pillars.eyebrow}</Eyebrow>
      <H2 title={a.pillars.title} accent={a.pillars.titleAccent} max="max-w-3xl" />
      <div className="mt-12 space-y-3">
        {a.pillars.items.map((item, i) => (
          <motion.div
            key={item.num}
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
                {item.num}
              </span>
              <div className="min-w-0">
                <p
                  className="font-display font-semibold text-fog-50 tracking-[-0.02em] leading-tight text-pretty"
                  style={{ fontSize: 'clamp(20px, 2.6vw, 32px)' }}
                >
                  {item.title}
                </p>
                <p className="text-fog-300 text-[14px] sm:text-[15px] leading-relaxed text-pretty mt-3 max-w-2xl">
                  {item.body}
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
// 10 — WHAT WE DO (12 service tags with accent labels)
// ============================================================================
function WhatWeDo({ a }) {
  return (
    <SectionShell id="what-we-do">
      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-14 items-start min-w-0">
        <div className="min-w-0">
          <Eyebrow>{a.whatWeDo.eyebrow}</Eyebrow>
          <H2 title={a.whatWeDo.title} accent={a.whatWeDo.titleAccent} max="max-w-md" />
          <p className="text-fog-300 text-[15px] sm:text-[16px] leading-relaxed text-pretty mt-6 max-w-md">
            {a.whatWeDo.body}
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85 }}
          className="grid grid-cols-2 sm:grid-cols-3 gap-2 min-w-0"
        >
          {a.whatWeDo.services.map((s) => (
            <div
              key={s.title}
              className="rounded-lg border border-white/[0.06] bg-white/[0.015] px-3 py-3 hover:bg-white/[0.04] hover:border-accent/20 transition-all"
            >
              <p className="mono-label text-accent text-[9px] tracking-[0.22em] mb-1">{s.tag}</p>
              <p className="text-fog-100 text-[13px] font-medium leading-tight">{s.title}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </SectionShell>
  )
}

// ============================================================================
// 11 — FOR WHOM (right-aligned editorial + audience list with bullets)
// ============================================================================
function ForWhom({ a }) {
  return (
    <SectionShell id="for-whom">
      <div className="ml-auto max-w-3xl text-right min-w-0">
        <Eyebrow>{a.forWhom.eyebrow}</Eyebrow>
        <p
          className="font-display font-semibold text-fog-50 tracking-[-0.02em] leading-[1.06] text-pretty"
          style={{ fontSize: 'clamp(22px, 4.4vw, 60px)', hyphens: 'auto', overflowWrap: 'anywhere' }}
        >
          {a.forWhom.title}
        </p>
        <p
          className="font-display font-light italic text-fog-300 leading-[1.1] mt-1 text-pretty"
          style={{ fontSize: 'clamp(22px, 4.4vw, 60px)', hyphens: 'auto', overflowWrap: 'anywhere' }}
        >
          {a.forWhom.titleAccent}
        </p>
        <p className="text-fog-300 text-[15px] sm:text-[16px] leading-relaxed text-pretty mt-6 max-w-xl ml-auto">
          {a.forWhom.body}
        </p>
      </div>
      <motion.ul
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.85 }}
        className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-2 max-w-5xl ml-auto"
      >
        {a.forWhom.audiences.map((aud) => (
          <li
            key={aud}
            className="rounded-lg border border-white/[0.06] bg-white/[0.015] px-3 py-3 text-fog-200 text-[13.5px] leading-snug flex items-start gap-2"
          >
            <span className="w-1 h-1 rounded-full bg-accent shrink-0 mt-2" />
            <span>{aud}</span>
          </li>
        ))}
      </motion.ul>
    </SectionShell>
  )
}

// ============================================================================
// 12 — PROCESS (numbered timeline, 7 steps)
// ============================================================================
function Process({ a }) {
  return (
    <SectionShell id="process">
      <Eyebrow>{a.process.eyebrow}</Eyebrow>
      <H2 title={a.process.title} accent={a.process.titleAccent} max="max-w-3xl" />
      <p className="text-fog-300 text-[15px] sm:text-[16px] leading-relaxed text-pretty mt-6 max-w-2xl">
        {a.process.body}
      </p>
      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {a.process.steps.map((step, i) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: Math.min(i * 0.05, 0.3) }}
            className="rounded-xl border border-white/[0.07] bg-white/[0.015] p-5 relative"
          >
            <p
              className="font-display text-fog-300 leading-none"
              style={{ fontSize: '40px', letterSpacing: '-0.04em' }}
            >
              {step.num}
            </p>
            <p className="text-fog-50 text-[14px] font-medium mt-3 mb-1.5">
              {step.title}
            </p>
            <p className="text-fog-400 text-[12.5px] leading-relaxed text-pretty">
              {step.body}
            </p>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  )
}

// ============================================================================
// 13 — DIFFERENT (translation pairs — from → to)
// ============================================================================
function Different({ a }) {
  return (
    <SectionShell id="different">
      <div className="text-center max-w-3xl mx-auto">
        <Eyebrow>{a.different.eyebrow}</Eyebrow>
        <H2 title={a.different.title} accent={a.different.titleAccent} max="max-w-3xl" align="center" />
        <p className="text-fog-300 text-[15px] sm:text-[16px] leading-relaxed text-pretty mt-6 max-w-xl mx-auto">
          {a.different.body}
        </p>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.85 }}
        className="mt-12 max-w-3xl mx-auto space-y-2"
      >
        {a.different.translations.map((tr, i) => (
          <div
            key={tr.from}
            className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center rounded-xl border border-white/[0.07] bg-white/[0.015] px-5 py-4"
          >
            <p className="font-display font-medium text-fog-400 text-[18px] sm:text-[22px] line-through text-right tracking-[-0.02em]">
              {tr.from}
            </p>
            <ArrowRight size={18} className="text-accent" />
            <p className="font-display font-semibold text-fog-50 text-[18px] sm:text-[22px] tracking-[-0.02em]">
              {tr.to}
            </p>
          </div>
        ))}
      </motion.div>
      <p className="mt-12 text-fog-400 text-[14px] sm:text-[15px] leading-relaxed text-pretty max-w-2xl mx-auto text-center italic">
        {a.different.closing}
      </p>
    </SectionShell>
  )
}

// ============================================================================
// 14 — MANIFESTO (full-bleed with rocket particles, large editorial copy)
// ============================================================================
function Manifesto({ a }) {
  return (
    <section
      id="manifesto"
      className="relative overflow-hidden"
      style={{ minHeight: '100vh', background: '#05080C' }}
    >
      {/* rocket particles backdrop — ties the about page to the home brand */}
      <div className="absolute inset-0 z-0">
        <RocketParticles />
      </div>

      {/* gradient veils so copy reads */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, rgba(5,8,12,0.85) 0%, rgba(5,8,12,0.45) 30%, rgba(5,8,12,0.0) 65%, rgba(5,8,12,0.0) 100%)',
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[15%] z-[1] pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(5,8,12,0.7), transparent)' }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[25%] z-[1] pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(5,8,12,0.85), transparent)' }}
      />

      <div className="relative z-10 px-4 sm:px-8 lg:px-14 pt-32 pb-20 min-h-screen flex flex-col justify-center">
        <div className="container-shell">
          <Eyebrow>{a.manifesto.eyebrow}</Eyebrow>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-semibold tracking-[-0.035em] leading-[0.96] text-pretty max-w-4xl"
            style={{ fontSize: 'clamp(36px, 6.4vw, 92px)', hyphens: 'auto', overflowWrap: 'anywhere' }}
          >
            <span className="text-fog-50 block">{a.manifesto.title}</span>
            <span className="text-fog-300 block font-light italic">{a.manifesto.titleAccent}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-fog-200 text-[16px] sm:text-[17px] leading-relaxed text-pretty max-w-2xl mt-7"
          >
            {a.manifesto.body}
          </motion.p>

          <motion.ul
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-9 space-y-3 max-w-2xl"
          >
            {a.manifesto.lines.map((line, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
                className="text-fog-100 text-[15px] sm:text-[16px] leading-relaxed text-pretty flex items-start gap-3"
              >
                <Sparkles size={13} className="text-accent shrink-0 mt-1" />
                <span>{line}</span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.85, delay: 0.6 }}
            className="mt-12 max-w-[820px] pl-5 border-l-2 border-accent/40"
          >
            <p
              className="font-display font-semibold text-fog-50 text-pretty"
              style={{
                fontSize: 'clamp(22px, 3.6vw, 44px)',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
              }}
            >
              {a.manifesto.closing}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// 15 — FINAL CTA
// ============================================================================
function FinalCta({ a }) {
  return (
    <section id="contact" className="relative py-24 sm:py-32 px-4 sm:px-8 lg:px-14">
      <div className="container-shell relative">
        <Eyebrow>{a.finalCta.eyebrow}</Eyebrow>
        <h2
          className="font-display font-semibold tracking-[-0.03em] leading-[0.96] text-pretty max-w-4xl"
          style={{ fontSize: 'clamp(32px, 5.2vw, 76px)', hyphens: 'auto', overflowWrap: 'anywhere' }}
        >
          <span className="text-fog-50 block">{a.finalCta.title}</span>
          <span className="text-fog-300 block font-light italic">{a.finalCta.titleAccent}</span>
        </h2>
        <p className="mt-6 text-fog-300 text-[15px] sm:text-[16px] leading-relaxed text-pretty max-w-2xl">
          {a.finalCta.body}
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <a href="mailto:omar.carrasco.aranda@gmail.com" className="btn-primary">
            {a.finalCta.cta}
            <ArrowRight size={15} />
          </a>
          <a href="/#services" className="text-fog-300 text-[14px] inline-flex items-center gap-1.5 hover:text-accent transition-colors">
            {a.finalCta.ctaSecondary} <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </section>
  )
}
