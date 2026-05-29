'use client'

import dynamic from 'next/dynamic'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useRef } from 'react'
import { Layers, Hand } from 'lucide-react'
import { useT } from '@/i18n/LanguageProvider'

const RocketParticles = dynamic(() => import('@/components/graph/RocketParticles'), {
  ssr: false,
  loading: () => null,
})

const LAYER_TONES = [
  { dot: '#2DE2C5', label: 'text-accent' },
  { dot: '#38BDF8', label: 'text-signal-blue' },
  { dot: '#9D8DF1', label: 'text-[#9D8DF1]' },
  { dot: '#F5B544', label: 'text-signal-amber' },
  { dot: '#2DE2C5', label: 'text-accent' },
  { dot: '#38BDF8', label: 'text-signal-blue' },
  { dot: '#9D8DF1', label: 'text-[#9D8DF1]' },
  { dot: '#F5B544', label: 'text-signal-amber' },
  { dot: '#2DE2C5', label: 'text-accent' },
  { dot: '#38BDF8', label: 'text-signal-blue' },
]

function FlatCard({ layer, index }) {
  const tone = LAYER_TONES[index % LAYER_TONES.length]
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.3) }}
      className="group relative rounded-xl border bg-[rgba(10,14,20,0.78)] backdrop-blur-md transition-all duration-300 hover:bg-[rgba(15,21,30,0.9)]"
      style={{
        borderColor: 'rgba(255,255,255,0.07)',
        boxShadow:
          '0 1px 0 rgba(255,255,255,0.04) inset, 0 18px 38px -18px rgba(0,0,0,0.7)',
      }}
    >
      <div
        aria-hidden
        className="absolute left-0 top-2 bottom-2 w-[2px] rounded-full opacity-70 group-hover:opacity-100 transition-opacity"
        style={{ background: tone.dot, boxShadow: `0 0 12px ${tone.dot}` }}
      />
      <div className="flex items-center gap-2.5 sm:gap-4 px-3.5 py-3.5 sm:px-6 sm:py-[18px] min-w-0">
        <span className="mono-label text-fog-500 text-[10px] sm:text-[11px] tracking-[0.16em] w-6 sm:w-7 shrink-0">
          {layer.code}
        </span>
        <span
          className={`mono-label text-[9px] sm:text-[10px] tracking-[0.18em] sm:tracking-[0.22em] w-[64px] sm:w-[92px] shrink-0 ${tone.label}`}
        >
          {layer.tag}
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-fog-50 text-[13px] sm:text-[15px] font-medium leading-tight truncate">
            {layer.title}
          </p>
          <p className="mono-label text-fog-500 text-[9px] sm:text-[10px] tracking-[0.12em] sm:tracking-[0.14em] mt-1 truncate">
            {layer.meta}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default function ValueSection() {
  const t = useT()
  const sectionRef = useRef(null)
  const activeStagesRef = useRef(0)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // map scroll (0..1) → activeStages (0..10), with the assembly happening
  // in the middle 50% of the section's scroll arc (not at the very edges)
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const t = Math.max(0, Math.min(1, (v - 0.2) / 0.5))
    activeStagesRef.current = t * 10
  })

  const layers = t.value.layers || []

  return (
    <section
      id="value"
      ref={sectionRef}
      className="section relative overflow-hidden"
      style={{ background: '#05080C' }}
    >
      {/* subtle grid texture, capped */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage:
            'radial-gradient(ellipse 70% 60% at 70% 50%, black, transparent 80%)',
        }}
      />

      <div className="container-shell relative">
        {/* TOP — section index */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex items-center justify-between gap-4"
        >
          <p className="mono-label text-fog-500 text-[10px] tracking-[0.22em]">
            {'// VALUE · 03 · stack()'}
          </p>
          <div className="hidden sm:flex items-center gap-2">
            <Layers size={11} className="text-accent" />
            <span className="mono-label text-accent text-[10px] tracking-[0.22em]">
              {t.value.stackLabel}
            </span>
            <span className="mono-label text-fog-500 text-[10px]">
              / {t.value.stackMeta}
            </span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.05fr] gap-10 lg:gap-16 items-start min-w-0">
          {/* LEFT — narrative */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
              className="eyebrow mb-7"
            >
              <span className="eyebrow-dot" />
              {t.value.eyebrow}
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-semibold tracking-[-0.03em] leading-[0.98] text-balance break-words"
              style={{ fontSize: 'clamp(30px, 5.4vw, 84px)' }}
            >
              <span className="text-fog-50 block">{t.value.titleA}</span>
              <span className="text-fog-200 block">{t.value.titleB}</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="editorial text-fog-300 mt-5 text-pretty break-words"
              style={{ fontSize: 'clamp(18px, 2vw, 28px)', lineHeight: 1.3 }}
            >
              {t.value.titleC}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-9 space-y-4 max-w-xl"
            >
              <p className="text-fog-100 text-[16px] sm:text-[17px] leading-relaxed font-medium">
                {t.value.body1}
              </p>
              <p className="text-fog-200 text-[14px] sm:text-[15px] leading-relaxed text-pretty">
                {t.value.body2}
              </p>
              <p className="text-fog-400 text-[13px] sm:text-[14px] leading-relaxed text-pretty pt-4 border-t border-white/[0.06]">
                {t.value.body3}
              </p>
            </motion.div>

            {/* drag hint — only desktop where the 3D is */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-8 hidden lg:flex items-center gap-2 text-fog-500"
            >
              <Hand size={12} className="text-accent" />
              <p className="mono-label text-[10px] tracking-[0.2em]">
                hover · particles scatter · reform
              </p>
            </motion.div>
          </div>

          {/* RIGHT — 3D glass stack on lg+, flat list below */}
          <div className="relative">
            {/* layers title */}
            <div className="flex items-center justify-between mb-5">
              <p className="mono-label text-fog-400 text-[10px] tracking-[0.22em]">
                {t.value.layersTitle}
              </p>
              <p className="mono-label text-fog-500 text-[10px] tracking-[0.18em]">
                {String(layers.length).padStart(2, '0')} / 10
              </p>
            </div>

            {/* DESKTOP — three.js glass stack viewport */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:block relative w-full"
              style={{ height: '620px' }}
            >
              <RocketParticles activeStagesRef={activeStagesRef} />
              {/* corner crosshairs — quiet HUD framing */}
              <div aria-hidden className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-accent/40" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-accent/40" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-accent/40" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-accent/40" />
              </div>
            </motion.div>

            {/* MOBILE / TABLET — flat vertical list */}
            <div className="lg:hidden space-y-2">
              {layers.map((layer, i) => (
                <FlatCard key={layer.code} layer={layer} index={i} />
              ))}
            </div>
          </div>
        </div>

        {/* CLOSING — sober, mono-anchored. */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 lg:mt-24 pt-8 border-t border-white/[0.06]"
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 min-w-0">
            <div className="flex items-center gap-3 min-w-0">
              <span className="status-dot active shrink-0" />
              <p className="mono-label text-fog-500 text-[10px] tracking-[0.18em] sm:tracking-[0.22em] truncate">
                {t.value.stackLabel} · {t.value.stackMeta}
              </p>
            </div>
            <p
              className="font-display font-semibold text-fog-50 tracking-[-0.02em] text-pretty break-words sm:text-right"
              style={{
                fontSize: 'clamp(18px, 2.4vw, 34px)',
                lineHeight: 1.2,
              }}
            >
              {t.value.closing}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
