'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Hand } from 'lucide-react'
import { useT } from '@/i18n/LanguageProvider'

const SystemFlow3D = dynamic(() => import('@/components/graph/SystemFlow3D'), {
  ssr: false,
  loading: () => null,
})

export default function SystemMap() {
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

  const nodes = t.systemMap.nodes || []

  return (
    <section
      id="system"
      ref={sectionRef}
      className="relative w-full overflow-hidden flex flex-col"
      style={{ background: '#05080C' }}
    >
      {/* DESKTOP: full-bleed 3D flow behind copy */}
      {isDesktop && (
        <>
          <div className="absolute inset-0 z-0">
            <SystemFlow3D nodes={nodes} />
          </div>
          {/* single soft vignette — left side keeps copy legible */}
          <div
            aria-hidden
            className="absolute inset-0 z-[1] pointer-events-none"
            style={{
              background:
                'linear-gradient(to right, rgba(5,8,12,0.9) 0%, rgba(5,8,12,0.45) 28%, rgba(5,8,12,0.0) 56%, rgba(5,8,12,0.0) 100%)',
            }}
          />
        </>
      )}

      {/* TOP-LEFT — section index */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="absolute top-10 sm:top-14 left-4 sm:left-8 z-10 pointer-events-none"
      >
        <p className="mono-label text-fog-500 text-[10px] tracking-[0.22em]">
          {'// SYSTEM · 05 · connect()'}
        </p>
        <p className="mono-label text-fog-600 text-[9px] mt-1 tracking-[0.16em]">
          {t.systemMap.eyebrow}
        </p>
      </motion.div>

      {/* DESKTOP: copy floats over the canvas; full viewport tall */}
      {isDesktop ? (
        <div className="relative z-10 min-h-screen flex flex-col px-4 sm:px-8 lg:px-14 max-w-[1400px]">
          <div className="pt-40">
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-semibold tracking-[-0.03em] leading-[0.96] text-balance break-words max-w-[820px]"
              style={{ fontSize: 'clamp(34px, 5.4vw, 88px)' }}
            >
              <span className="text-fog-300 block font-light">{t.systemMap.titleA}</span>
              <span className="text-fog-50 block">{t.systemMap.titleB}</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 max-w-md space-y-4"
            >
              <p className="text-fog-200 text-[16px] leading-relaxed text-pretty font-medium">
                {t.systemMap.subtitle}
              </p>
              <p className="text-fog-400 text-[14px] leading-relaxed text-pretty">
                {t.systemMap.body}
              </p>
              <p className="text-fog-500 text-[13.5px] leading-relaxed text-pretty pt-4 border-t border-white/[0.06]">
                {t.systemMap.bodyClose}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-8 flex items-center gap-2 text-fog-500"
            >
              <Hand size={11} className="text-accent" />
              <p className="mono-label text-[9px] tracking-[0.2em]">
                {t.systemMap.hudDrag}
              </p>
            </motion.div>
          </div>

          {/* ACCENT LINE — bottom-right, pinned via mt-auto */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.85, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-auto pt-12 pb-16"
          >
            <div className="flex justify-end">
              <p
                className="font-display font-medium text-fog-100 text-right text-balance"
                style={{
                  fontSize: 'clamp(20px, 2.8vw, 40px)',
                  lineHeight: 1.2,
                  maxWidth: '700px',
                  letterSpacing: '-0.02em',
                }}
              >
                {t.systemMap.accent}
              </p>
            </div>
          </motion.div>
        </div>
      ) : (
        // MOBILE: natural flow — copy → drag hint → 3D flow → accent
        <div className="relative z-10 px-4 sm:px-8 pt-44 pb-16">
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-semibold tracking-[-0.03em] leading-[0.98] text-balance break-words"
            style={{ fontSize: 'clamp(32px, 9vw, 60px)' }}
          >
            <span className="text-fog-300 block font-light">{t.systemMap.titleA}</span>
            <span className="text-fog-50 block">{t.systemMap.titleB}</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 space-y-4"
          >
            <p className="text-fog-200 text-[15px] leading-relaxed text-pretty font-medium">
              {t.systemMap.subtitle}
            </p>
            <p className="text-fog-400 text-[13.5px] leading-relaxed text-pretty">
              {t.systemMap.body}
            </p>
            <p className="text-fog-500 text-[13px] leading-relaxed text-pretty pt-4 border-t border-white/[0.06]">
              {t.systemMap.bodyClose}
            </p>
          </motion.div>

          {/* drag hint — sits right above the 3D viewport so it reads as a caption */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 flex items-center gap-2 text-fog-500"
          >
            <Hand size={11} className="text-accent" />
            <p className="mono-label text-[9px] tracking-[0.2em]">
              {t.systemMap.hudDrag}
            </p>
          </motion.div>

          {/* MOBILE 3D flow — bigger viewport, in flow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full mt-4"
            style={{ height: '70vh', minHeight: 460, maxHeight: 640 }}
          >
            <SystemFlow3D nodes={nodes} compact />
            <div aria-hidden className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-accent/40" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-accent/40" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-accent/40" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-accent/40" />
            </div>
          </motion.div>

          {/* ACCENT LINE — flows right after the 3D, no mt-auto on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12"
          >
            <div className="flex justify-end">
              <p
                className="font-display font-medium text-fog-100 text-right text-balance"
                style={{
                  fontSize: 'clamp(22px, 5.6vw, 36px)',
                  lineHeight: 1.2,
                  letterSpacing: '-0.02em',
                }}
              >
                {t.systemMap.accent}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  )
}
