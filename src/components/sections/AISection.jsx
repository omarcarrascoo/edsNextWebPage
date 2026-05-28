'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import {
  Eye, Brain, History, Plug, Database, Wrench, ScrollText,
  UserCheck, Activity, ShieldCheck,
} from 'lucide-react'
import { useT } from '@/i18n/LanguageProvider'

const AgentLoop = dynamic(() => import('@/components/graph/AgentLoop'), {
  ssr: false,
  loading: () => null,
})

const pillarIcons = [Eye, Brain, History, Plug]

// Live confidence meter — wanders, occasionally drops below the gate
function useConfidence() {
  const [val, setVal] = useState(0.92)
  useEffect(() => {
    let raf = 0
    let last = performance.now()
    let target = 0.92
    const tick = (now) => {
      if (now - last > 600) {
        last = now
        target = 0.55 + Math.random() * 0.42
      }
      setVal((v) => v + (target - v) * 0.04)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])
  return val
}

// Cycling transcript — emits one line at a time and keeps last N
function useTranscript(lines) {
  const [stream, setStream] = useState([])
  useEffect(() => {
    let i = 0
    let interval
    const push = () => {
      const line = lines[i % lines.length]
      i++
      setStream((s) => [...s, { ...line, id: Date.now() + Math.random() }].slice(-5))
    }
    push()
    interval = setInterval(push, 1700)
    return () => clearInterval(interval)
  }, [lines])
  return stream
}

const TAG_COLORS = {
  PLAN: 'text-fog-300',
  TOOL: 'text-signal-blue',
  OBS: 'text-fog-200',
  RULE: 'text-accent',
  GATE: 'text-signal-amber',
  OK: 'text-signal-green',
}

export default function AISection() {
  const t = useT()
  const conf = useConfidence()
  const transcript = useTranscript(t.ai.transcript)
  const sectionRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e) => {
      const sec = sectionRef.current
      if (!sec) return
      const rect = sec.getBoundingClientRect()
      if (rect.bottom < 0 || rect.top > window.innerHeight) return
      const w = window.innerWidth || 1
      const h = window.innerHeight || 1
      mouseRef.current.x = (e.clientX / w - 0.5) * 2
      mouseRef.current.y = (e.clientY / h - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  const lowConfidence = conf < 0.7

  return (
    <section
      id="ai"
      ref={sectionRef}
      className="relative w-full overflow-hidden flex flex-col"
      style={{ minHeight: '110vh', background: '#05080C' }}
    >
      {/* FULL-BLEED 3D AGENT LOOP */}
      <div className="absolute inset-0 z-0">
        <AgentLoop mouseRef={mouseRef} />
      </div>

      {/* layered vignettes — top + bottom dark, middle clear so the canvas shines */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(7,12,18,0.85) 0%, rgba(7,12,18,0.25) 18%, rgba(7,12,18,0.0) 40%, rgba(7,12,18,0.0) 60%, rgba(7,12,18,0.45) 82%, rgba(7,12,18,0.95) 100%)',
        }}
      />

      {/* GRID OVERLAY */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1] opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage:
            'radial-gradient(ellipse 70% 60% at 50% 50%, black, transparent 80%)',
        }}
      />

      {/* CIRCULAR SCAN — sweeps around the core */}
      <div
        aria-hidden
        className="absolute z-[2] pointer-events-none"
        style={{
          left: '50%', top: '34%',
          width: '600px', height: '600px',
          marginLeft: '-300px', marginTop: '-300px',
          borderRadius: '50%',
          border: '1px solid rgba(45,226,197,0.18)',
          maskImage:
            'conic-gradient(from 0deg, transparent 0deg, rgba(0,0,0,1) 45deg, transparent 90deg, transparent 360deg)',
          animation: 'agentScan 6s linear infinite',
        }}
      />

      {/* TOP-LEFT — section index + AGENT CORE label */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="absolute top-10 sm:top-14 left-4 sm:left-8 z-10 pointer-events-none"
      >
        <p className="mono-label text-fog-500 text-[10px] tracking-[0.22em]">
          {'// AI · 04 · agent.run()'}
        </p>
        <p className="mono-label text-fog-600 text-[9px] mt-1 tracking-[0.16em]">
          {t.ai.eyebrow}
        </p>
      </motion.div>

      {/* TOP-RIGHT — status badge */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="absolute top-10 sm:top-14 right-4 sm:right-8 z-10 hidden sm:flex items-center gap-2 pointer-events-none"
      >
        <span className="status-dot run" />
        <span className="mono-label text-signal-blue text-[10px] tracking-[0.22em]">
          {t.ai.hudStatus}
        </span>
        <span className="mono-label text-fog-500 text-[10px]">
          / {t.ai.hudCore}
        </span>
      </motion.div>

      {/* HEADLINE — diagonal split, asymmetric.
          Line 1 anchored top-left of the canvas zone
          Line 2 floats indented to the right (overlaps the agent visually)
          Accent line is BOTTOM-RIGHT, breaking the typical flow */}
      <div className="relative z-10 pt-28 sm:pt-32 px-4 sm:px-8 lg:px-14">
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-semibold tracking-[-0.035em] leading-[0.92] text-balance max-w-[1500px]"
          style={{ fontSize: 'clamp(34px, 6.2vw, 108px)' }}
        >
          <span className="text-fog-50 block">{t.ai.title}</span>
        </motion.h2>
      </div>

      {/* MEMORY CALLOUT — bottom-left, anchored to the left lattice */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, delay: 0.45 }}
        className="absolute z-10 pointer-events-none hidden md:block"
        style={{ top: '40%', left: '3%' }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Database size={11} className="text-signal-blue" />
          <p className="mono-label text-signal-blue text-[10px] tracking-[0.22em]">
            {t.ai.hudMemory}
          </p>
        </div>
        <p className="mono-label text-fog-500 text-[9px] tracking-[0.18em] mb-2">
          {t.ai.hudMemoryMeta}
        </p>
        <p className="text-fog-300 text-[12px] leading-snug max-w-[200px]">
          {t.ai.pillars[1].body}
        </p>
      </motion.div>

      {/* CONTEXT CALLOUT — bottom-right, anchored to the right lattice */}
      <motion.div
        initial={{ opacity: 0, x: 16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="absolute z-10 pointer-events-none text-right hidden md:block"
        style={{ top: '40%', right: '3%' }}
      >
        <div className="flex items-center gap-2 mb-2 justify-end">
          <p className="mono-label text-[10px] tracking-[0.22em]" style={{ color: '#9D8DF1' }}>
            {t.ai.hudContext}
          </p>
          <ScrollText size={11} style={{ color: '#9D8DF1' }} />
        </div>
        <p className="mono-label text-fog-500 text-[9px] tracking-[0.18em] mb-2">
          {t.ai.hudContextMeta}
        </p>
        <p className="text-fog-300 text-[12px] leading-snug max-w-[200px] ml-auto">
          {t.ai.pillars[3].body}
        </p>
      </motion.div>

      {/* HUMAN-IN-LOOP CALLOUT — top-center, anchored to the top pillar */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, delay: 0.6 }}
        className="absolute z-10 pointer-events-none hidden md:block"
        style={{ top: '22%', left: '50%', transform: 'translate(-50%, 0)' }}
      >
        <div className="flex flex-col items-center gap-1.5">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-signal-amber/30 bg-ink-900/70 backdrop-blur">
            <UserCheck size={11} className="text-signal-amber" />
            <p className="mono-label text-signal-amber text-[10px] tracking-[0.22em]">
              {t.ai.hudHuman}
            </p>
          </div>
          <p className="mono-label text-fog-500 text-[9px] tracking-[0.18em]">
            {t.ai.hudHumanMeta}
          </p>
        </div>
      </motion.div>

      {/* CONFIDENCE GAUGE — floating mid-right above context callout */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, delay: 0.7 }}
        className="absolute z-10 pointer-events-none hidden lg:block"
        style={{ top: '36%', right: '8%' }}
      >
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <Activity size={10} className={lowConfidence ? 'text-signal-amber' : 'text-accent'} />
            <p className="mono-label text-fog-400 text-[10px] tracking-[0.22em]">
              {t.ai.hudConfidence}
            </p>
          </div>
          <div className="w-[140px] h-1 rounded-full bg-white/[0.05] overflow-hidden">
            <div
              className="h-full rounded-full transition-colors"
              style={{
                width: `${Math.round(conf * 100)}%`,
                background: lowConfidence ? '#F5B544' : '#2DE2C5',
                boxShadow: lowConfidence
                  ? '0 0 12px rgba(245,181,68,0.5)'
                  : '0 0 12px rgba(45,226,197,0.5)',
                transition: 'width 0.3s linear',
              }}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="mono-label text-fog-500 text-[9px]">
              {conf.toFixed(2)}
            </span>
            <span className={`mono-label text-[9px] ${lowConfidence ? 'text-signal-amber' : 'text-accent'}`}>
              {lowConfidence ? '→ HUMAN' : 'AUTO'}
            </span>
          </div>
        </div>
      </motion.div>

      {/* TOOL RING CALLOUT — left middle, anchored to the orbit */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, delay: 0.55 }}
        className="absolute z-10 pointer-events-none hidden lg:block"
        style={{ top: '36%', left: '8%' }}
      >
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <Wrench size={10} className="text-signal-blue" />
            <p className="mono-label text-signal-blue text-[10px] tracking-[0.22em]">
              {t.ai.hudTools}
            </p>
          </div>
          <p className="mono-label text-fog-500 text-[9px] tracking-[0.18em]">
            {t.ai.hudToolsMeta}
          </p>
        </div>
      </motion.div>

      {/* ACCENT LINE — bottom right, breaks the flow.
          The "answer" appears AFTER you've seen the agent in motion */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.85, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 px-4 sm:px-8 lg:px-14 mt-auto pt-12 pb-4"
      >
        <div className="flex justify-end">
          <p
            className="font-display font-semibold editorial text-right text-balance"
            style={{
              fontSize: 'clamp(28px, 4.6vw, 76px)',
              lineHeight: 1.08,
              maxWidth: '900px',
              paddingRight: '0.12em',
              paddingBottom: '0.15em',
              background:
                'linear-gradient(120deg, #2DE2C5 0%, #38BDF8 55%, #2DE2C5 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {t.ai.titleAccent}
          </p>
        </div>
      </motion.div>

      {/* BOTTOM — agent transcript console + body + trace badge */}
      <div className="relative z-10 px-4 sm:px-8 lg:px-14 pb-12 sm:pb-16 mt-8">
        <div className="grid lg:grid-cols-12 gap-8 items-end">
          {/* body copy */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 min-w-0"
          >
            <p className="text-fog-300 text-[14px] sm:text-[15px] leading-relaxed text-pretty max-w-md">
              {t.ai.body}
            </p>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {t.ai.pillars.map((p, i) => {
                const Icon = pillarIcons[i] || Brain
                return (
                  <span
                    key={p.title}
                    className="inline-flex items-center gap-1.5 mono-label text-[10px] tracking-[0.14em] px-2.5 py-1 rounded-full border border-white/[0.07] bg-white/[0.02] text-fog-300"
                  >
                    <Icon size={10} className="text-accent" />
                    {p.title.toLowerCase()}
                  </span>
                )
              })}
            </div>
          </motion.div>

          {/* live transcript console */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-7 min-w-0"
          >
            <div className="flex items-center justify-between mb-3 gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <span className="status-dot run shrink-0" />
                <p className="mono-label text-fog-400 text-[10px] tracking-[0.22em] truncate">
                  {'// agent.transcript · live'}
                </p>
              </div>
              <p className="mono-label text-fog-500 text-[10px] tracking-[0.18em] shrink-0">
                {t.ai.hudTrace} · {t.ai.hudTraceId}
              </p>
            </div>

            <ul className="space-y-1.5 font-mono">
              {transcript.map((line) => (
                <li
                  key={line.id}
                  className="flex items-start gap-3 text-[12px] leading-relaxed animate-[traceFade_0.5s_ease-out]"
                >
                  <span
                    className={`mono-label text-[10px] tracking-[0.18em] w-12 shrink-0 ${
                      TAG_COLORS[line.tag] || 'text-fog-400'
                    }`}
                  >
                    {line.tag}
                  </span>
                  <span className="text-fog-200 break-words min-w-0 flex-1">
                    {line.text}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex items-center justify-between flex-wrap gap-3 pt-3 border-t border-white/[0.05]">
              <p className="mono-label text-fog-500 text-[10px] tracking-[0.22em] flex items-center gap-2">
                <ShieldCheck size={11} className="text-signal-green" />
                <span className="text-signal-green">{t.ai.hudAudited}</span>
                <span className="hidden sm:inline">· every step is logged</span>
              </p>
              <p className="mono-label text-fog-500 text-[10px] tracking-[0.22em]">
                cycle · {String(transcript.length).padStart(2, '0')} / 06
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes agentScan {
          to { transform: rotate(360deg); }
        }
        @keyframes traceFade {
          from { opacity: 0; transform: translateX(-6px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </section>
  )
}
