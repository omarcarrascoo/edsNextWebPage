'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Eye, Hand } from 'lucide-react'
import { useT } from '@/i18n/LanguageProvider'

const HumanoidHead = dynamic(() => import('@/components/graph/HumanoidHead'), {
  ssr: false,
  loading: () => null,
})

export default function AISection() {
  const t = useT()
  const sectionRef = useRef(null)
  const [isDesktop, setIsDesktop] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(min-width: 1024px)')
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener?.('change', update)
    return () => mq.removeEventListener?.('change', update)
  }, [])

  const pillars = t.ai.pillars || []

  return (
    <section
      id="ai"
      ref={sectionRef}
      className="relative w-full overflow-hidden flex flex-col"
      style={{ background: '#05080C' }}
    >
      {/* DESKTOP: full-bleed head viewport (anchored LEFT instead of right
          to invert SystemMap and break the repetitive feel) */}
      {isDesktop && (
        <>
          <div className="absolute inset-0 z-0">
            <HumanoidHead />
          </div>
          {/* RIGHT-side vignette: copy on the right, head on the left */}
          <div
            aria-hidden
            className="absolute inset-0 z-[1] pointer-events-none"
            style={{
              background:
                'linear-gradient(to left, rgba(5,8,12,0.9) 0%, rgba(5,8,12,0.45) 28%, rgba(5,8,12,0.0) 56%, rgba(5,8,12,0.0) 100%)',
            }}
          />
        </>
      )}

      {/* TOP-RIGHT — section index (mirrored from SystemMap which has it left) */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="absolute top-10 sm:top-14 right-4 sm:right-8 z-10 pointer-events-none text-right"
      >
        <p className="mono-label text-fog-500 text-[10px] tracking-[0.22em]">
          {'// AI · 06 · observe()'}
        </p>
        <p className="mono-label text-fog-600 text-[9px] mt-1 tracking-[0.16em]">
          {t.ai.eyebrow}
        </p>
      </motion.div>

      {/* TOP-LEFT — head HUD with eye icon (desktop only) */}
      {isDesktop && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="absolute top-10 sm:top-14 left-4 sm:left-8 z-10 hidden sm:flex flex-col items-start gap-1 pointer-events-none"
        >
          <div className="flex items-center gap-2">
            <Eye size={11} className="text-accent" />
            <span className="mono-label text-accent text-[10px] tracking-[0.22em]">
              {t.ai.hudHead}
            </span>
          </div>
          <span className="mono-label text-fog-500 text-[10px] tracking-[0.22em]">
            {t.ai.hudHeadMeta}
          </span>
        </motion.div>
      )}

      {/* DESKTOP layout — copy on RIGHT, head on LEFT */}
      {isDesktop ? (
        <div className="relative z-10 min-h-screen flex flex-col items-end px-4 sm:px-8 lg:px-14 ml-auto max-w-[1400px] w-full">
          <div className="pt-40 w-full flex justify-end">
            <div className="text-right">
              <motion.h2
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                className="font-display font-semibold tracking-[-0.03em] leading-[0.96] text-balance break-words max-w-[820px] ml-auto"
                style={{ fontSize: 'clamp(34px, 5.4vw, 88px)' }}
              >
                <span className="text-fog-50 block">{t.ai.titleA}</span>
                <span className="text-fog-200 block font-light italic">{t.ai.titleB}</span>
                <span className="text-fog-300 block font-light italic">{t.ai.titleC}</span>
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="mt-7 max-w-md ml-auto space-y-4"
              >
                <p className="text-fog-200 text-[16px] leading-relaxed text-pretty font-medium">
                  {t.ai.subtitle}
                </p>
                <p className="text-fog-400 text-[14px] leading-relaxed text-pretty">
                  {t.ai.body}
                </p>
                <p className="text-fog-500 text-[13.5px] leading-relaxed text-pretty pt-4 border-t border-white/[0.06]">
                  {t.ai.bodyClose}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="mt-7 flex flex-wrap gap-2 max-w-md ml-auto justify-end"
              >
                {pillars.map((p) => (
                  <span
                    key={p.title}
                    className="mono-label text-[10px] tracking-[0.16em] px-2.5 py-1 rounded-full border border-white/[0.07] bg-white/[0.02] text-fog-300"
                  >
                    {p.title}
                  </span>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="mt-8 flex items-center gap-2 text-fog-500 justify-end"
              >
                <Hand size={11} className="text-accent" />
                <p className="mono-label text-[9px] tracking-[0.2em]">
                  {t.ai.hudHover}
                </p>
              </motion.div>
            </div>
          </div>

          {/* ACCENT — pinned bottom LEFT (mirror of SystemMap which is bottom right) */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.85, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-auto pt-12 pb-16 w-full"
          >
            <div className="flex justify-start">
              <p
                className="font-display font-medium text-fog-100 text-left text-balance"
                style={{
                  fontSize: 'clamp(20px, 2.8vw, 40px)',
                  lineHeight: 1.2,
                  maxWidth: '700px',
                  letterSpacing: '-0.02em',
                }}
              >
                {t.ai.accent}
              </p>
            </div>
          </motion.div>
        </div>
      ) : (
        // MOBILE: head FIRST (mirror of SystemMap which has copy first), then copy
        <div className="relative z-10 px-4 sm:px-8 pt-44 pb-16">
          {/* Mobile head viewport — leads the section */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full"
            style={{ height: '64vh', minHeight: 420, maxHeight: 600 }}
          >
            <HumanoidHead />
            <div aria-hidden className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-accent/40" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-accent/40" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-accent/40" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-accent/40" />
            </div>
            {/* hover hint sits over the head */}
            <div className="absolute bottom-3 right-3 pointer-events-none flex items-center gap-2 text-fog-500">
              <Hand size={11} className="text-accent" />
              <p className="mono-label text-[9px] tracking-[0.2em]">
                {t.ai.hudHover}
              </p>
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 font-display font-semibold tracking-[-0.03em] leading-[0.98] text-balance break-words"
            style={{ fontSize: 'clamp(32px, 9vw, 60px)' }}
          >
            <span className="text-fog-50 block">{t.ai.titleA}</span>
            <span className="text-fog-200 block font-light italic">{t.ai.titleB}</span>
            <span className="text-fog-300 block font-light italic">{t.ai.titleC}</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 space-y-4"
          >
            <p className="text-fog-200 text-[15px] leading-relaxed text-pretty font-medium">
              {t.ai.subtitle}
            </p>
            <p className="text-fog-400 text-[13.5px] leading-relaxed text-pretty">
              {t.ai.body}
            </p>
            <p className="text-fog-500 text-[13px] leading-relaxed text-pretty pt-4 border-t border-white/[0.06]">
              {t.ai.bodyClose}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 flex flex-wrap gap-2"
          >
            {pillars.map((p) => (
              <span
                key={p.title}
                className="mono-label text-[10px] tracking-[0.16em] px-2.5 py-1 rounded-full border border-white/[0.07] bg-white/[0.02] text-fog-300"
              >
                {p.title}
              </span>
            ))}
          </motion.div>

          {/* ACCENT — bottom LEFT on mobile (mirror of SystemMap right) */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12"
          >
            <div className="flex justify-start">
              <p
                className="font-display font-medium text-fog-100 text-left text-balance"
                style={{
                  fontSize: 'clamp(22px, 5.6vw, 36px)',
                  lineHeight: 1.2,
                  letterSpacing: '-0.02em',
                }}
              >
                {t.ai.accent}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  )
}
