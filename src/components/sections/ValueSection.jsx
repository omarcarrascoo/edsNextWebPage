'use client'

import dynamic from 'next/dynamic'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Layers, Hand } from 'lucide-react'
import { useT } from '@/i18n/LanguageProvider'

const RocketLanding = dynamic(() => import('@/components/graph/RocketLanding'), {
  ssr: false,
  loading: () => null,
})

export default function ValueSection() {
  const t = useT()
  const sectionRef = useRef(null)
  const scrollProgressRef = useRef(0)
  const [isDesktop, setIsDesktop] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(min-width: 1024px)')
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener?.('change', update)
    return () => mq.removeEventListener?.('change', update)
  }, [])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // remap scroll into a "descent window" — rocket is high above before scroll 0.2,
  // touches down by 0.85, dwells the rest. Gives the descent room to read.
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const t = Math.max(0, Math.min(1, (v - 0.15) / 0.7))
    scrollProgressRef.current = t
  })

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
                scroll · descent · landing
              </p>
            </motion.div>
          </div>

          {/* RIGHT — 3D rocket landing on lg+, mobile renders below the grid */}
          <div className="relative">
            {/* DESKTOP — three.js rocket landing viewport */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:block relative w-full"
              style={{ height: '620px' }}
            >
              {isDesktop && <RocketLanding scrollProgressRef={scrollProgressRef} />}
              {/* corner crosshairs — quiet HUD framing */}
              <div aria-hidden className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-accent/40" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-accent/40" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-accent/40" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-accent/40" />
              </div>
              {/* HUD label */}
              <div className="absolute bottom-3 left-3 pointer-events-none">
                <p className="mono-label text-accent text-[10px] tracking-[0.22em]">
                  rocket.landing
                </p>
                <p className="mono-label text-fog-500 text-[9px] tracking-[0.18em] mt-1">
                  digital terrain · approach
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* MOBILE — full-bleed rocket landing scene, then the layer list below.
            Hidden on lg+ where the desktop two-column above already shows it. */}
        <div className="lg:hidden mt-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full"
            style={{ height: '70vh', minHeight: 420, maxHeight: 620 }}
          >
            {!isDesktop && <RocketLanding scrollProgressRef={scrollProgressRef} />}
            <div aria-hidden className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-accent/40" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-accent/40" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-accent/40" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-accent/40" />
            </div>
            {/* mobile HUD label */}
            <div className="absolute top-3 left-3 pointer-events-none">
              <p className="mono-label text-accent text-[10px] tracking-[0.22em]">
                rocket.landing
              </p>
              <p className="mono-label text-fog-500 text-[9px] tracking-[0.18em] mt-1">
                digital terrain · approach
              </p>
            </div>
            <div className="absolute bottom-3 right-3 pointer-events-none">
              <p className="mono-label text-fog-500 text-[9px] tracking-[0.2em]">
                scroll · descent
              </p>
            </div>
          </motion.div>
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
