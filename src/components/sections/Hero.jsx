'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown, Activity, Zap } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useT } from '@/i18n/LanguageProvider'

const BrainSynapse = dynamic(() => import('@/components/graph/BrainSynapse'), {
  ssr: false,
  loading: () => null,
})

function useNeuralPulse() {
  const [pulse, setPulse] = useState({ pathways: 24, signal: 0.94, neurons: 142 })
  useEffect(() => {
    let raf = 0
    let last = performance.now()
    const tick = (now) => {
      if (now - last > 700) {
        last = now
        setPulse(() => ({
          pathways: 18 + Math.floor(Math.random() * 14),
          signal: 0.86 + Math.random() * 0.13,
          neurons: 138 + Math.floor(Math.random() * 8),
        }))
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])
  return pulse
}

export default function Hero() {
  const t = useT()
  const pulse = useNeuralPulse()
  const sparkRef = useRef(null)
  const sectionRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  // Mouse parallax → drives BrainSynapse rotation
  useEffect(() => {
    const onMove = (e) => {
      const w = window.innerWidth || 1
      const h = window.innerHeight || 1
      mouseRef.current.x = (e.clientX / w - 0.5) * 2
      mouseRef.current.y = (e.clientY / h - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // Sparkline anim
  useEffect(() => {
    let raf = 0
    let phase = 0
    const tick = () => {
      phase += 0.06
      const el = sparkRef.current
      if (el) {
        const N = 40
        const pts = []
        for (let i = 0; i < N; i++) {
          const x = (i / (N - 1)) * 100
          const a = Math.sin(phase + i * 0.4) * 0.5
          const b = Math.sin(phase * 1.7 + i * 0.18) * 0.3
          const y = 50 + (a + b) * 18
          pts.push(`${x},${y}`)
        }
        el.setAttribute('points', pts.join(' '))
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ minHeight: '100vh' }}
    >
      {/* FULL-BLEED BRAIN — covers the entire hero */}
      <div className="absolute inset-0 z-0">
        <BrainSynapse mouseRef={mouseRef} />
      </div>

      {/* RADIAL VIGNETTE (lifts left for legibility, lifts right for telemetry) */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 70% at 22% 50%, rgba(7,12,18,0.85), rgba(7,12,18,0.35) 45%, transparent 70%), radial-gradient(ellipse 40% 60% at 92% 100%, rgba(7,12,18,0.6), transparent 60%)',
        }}
      />

      {/* GRID OVERLAY */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1] opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          maskImage:
            'radial-gradient(ellipse 60% 60% at 50% 50%, black, transparent 80%)',
        }}
      />

      {/* HORIZONTAL SCAN LINE — sweeps top to bottom across whole hero */}
      <div
        aria-hidden
        className="absolute inset-x-0 z-[2] h-px pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, transparent, rgba(45,226,197,0.7), transparent)',
          top: 0,
          animation: 'heroScan 7s ease-in-out infinite',
        }}
      />

      {/* TOP-LEFT instrument · timestamp / system handle */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="absolute top-24 sm:top-28 left-4 sm:left-8 z-10 pointer-events-none"
      >
        <p className="mono-label text-fog-500 text-[10px] tracking-[0.22em]">
          {'// HERO · 01'}
        </p>
        <p className="mono-label text-fog-600 text-[9px] mt-1 tracking-[0.16em]">
          coord · 41.40 / -8.29
        </p>
      </motion.div>

      {/* TOP-RIGHT instrument · neural status badge */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="absolute top-24 sm:top-28 right-4 sm:right-8 z-10 flex items-center gap-2 pointer-events-none"
      >
        <span className="status-dot run" />
        <span className="mono-label text-accent text-[10px] tracking-[0.22em]">
          {t.hero.hudStatus}
        </span>
        <span className="mono-label text-fog-500 text-[10px]">
          / {t.hero.hudTitle}
        </span>
      </motion.div>

      {/* MAIN CONTENT — single-column, anchored bottom-left, headline overlaps brain */}
      <div className="relative z-10 min-h-screen flex flex-col justify-end pb-24 sm:pb-28 pt-32">
        <div className="px-4 sm:px-8 lg:px-14 max-w-[1700px]">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="eyebrow mb-6"
          >
            <span className="eyebrow-dot" />
            {t.hero.eyebrow}
          </motion.div>

          {/* HEADLINE — gigantic, two-line, asymmetric. titleAccent floats indented to the right */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-semibold tracking-[-0.04em] leading-[0.9] text-balance"
            style={{ fontSize: 'clamp(48px, 9.5vw, 168px)' }}
          >
            <span className="text-fog-50 block">{t.hero.titleLead}</span>
            <span
              className="editorial block"
              style={{
                marginLeft: 'clamp(40px, 12vw, 240px)',
                marginTop: '-0.04em',
                background:
                  'linear-gradient(120deg, #2DE2C5 0%, #38BDF8 55%, #2DE2C5 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 0 90px rgba(45,226,197,0.28)',
              }}
            >
              {t.hero.titleAccent}
            </span>
          </motion.h1>

          {/* SUBLINE + CTAs in a horizontal strip below the headline */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-9 grid lg:grid-cols-[1.2fr_auto] gap-8 items-end"
          >
            <p className="text-fog-300 text-[15px] sm:text-[16px] leading-relaxed max-w-2xl text-pretty">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a href="#contact" className="btn-primary">
                {t.hero.ctaPrimary}
                <ArrowRight size={16} />
              </a>
              <a href="#services" className="btn-secondary">
                {t.hero.ctaSecondary}
                <ChevronDown size={16} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* RIGHT SIDE — vertical column of floating instruments */}
      <div className="hidden md:flex flex-col gap-3 absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="flex items-center gap-2 mono-label text-[10px] tracking-[0.18em] justify-end"
        >
          <Activity size={11} className="text-accent" />
          <span className="text-fog-300">{t.hero.hudActivity}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.95 }}
          className="w-[180px]"
        >
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-10">
            <polyline
              ref={sparkRef}
              fill="none"
              stroke="#2DE2C5"
              strokeWidth="1.4"
              strokeLinejoin="round"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              points=""
            />
          </svg>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 1.05 }}
          className="flex flex-col gap-1.5 items-end"
        >
          <div className="flex items-center gap-2">
            <Zap size={11} className="text-signal-blue" />
            <span className="mono-label text-fog-200 text-[11px]">
              {pulse.pathways}
            </span>
            <span className="mono-label text-fog-500 text-[10px]">
              {t.hero.hudPathways}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="status-dot live" />
            <span className="mono-label text-signal-green text-[11px]">
              {pulse.neurons}
            </span>
            <span className="mono-label text-fog-500 text-[10px]">
              {t.hero.hudNodes}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="mono-label text-fog-500 text-[10px]">
              {t.hero.hudSignal}
            </span>
            <span className="mono-label text-accent text-[11px]">
              {pulse.signal.toFixed(2)}
            </span>
          </div>
        </motion.div>
      </div>

      {/* BOTTOM-LEFT — signals strip + scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.0 }}
        className="absolute left-4 sm:left-8 lg:left-14 bottom-6 z-10 hidden md:flex items-center gap-8 pointer-events-none"
      >
        {t.hero.signals.map((s) => (
          <div key={s.k} className="border-l border-white/10 pl-3">
            <p className="font-display text-xl font-semibold text-fog-50 leading-tight">
              {s.k}
            </p>
            <p className="text-[10px] text-fog-500 leading-tight mt-0.5 max-w-[180px]">
              {s.l}
            </p>
          </div>
        ))}
      </motion.div>

      {/* BOTTOM-RIGHT — scroll hint + footer codes */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1 }}
        className="absolute right-4 sm:right-8 lg:right-14 bottom-6 z-10 flex items-center gap-3 pointer-events-none"
      >
        <span className="status-dot live" />
        <p className="mono-label text-fog-400 text-[10px] tracking-[0.22em]">
          {t.hero.scrollHint}
        </p>
        <ChevronDown
          size={12}
          className="text-fog-400"
          style={{ animation: 'heroScrollNudge 2.4s ease-in-out infinite' }}
        />
      </motion.div>

      <style jsx global>{`
        @keyframes heroScan {
          0% { transform: translateY(0); opacity: 0; }
          12% { opacity: 0.9; }
          88% { opacity: 0.9; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        @keyframes heroScrollNudge {
          0%, 100% { transform: translateY(0); opacity: 0.6; }
          50% { transform: translateY(3px); opacity: 1; }
        }
      `}</style>
    </section>
  )
}
