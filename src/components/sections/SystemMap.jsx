'use client'

import { motion } from 'framer-motion'
import { useEffect, useReducer, useRef } from 'react'
import { Users, Layers, Network, Database, Cpu, BarChart3, Workflow } from 'lucide-react'
import { useT } from '@/i18n/LanguageProvider'

const icons = [Users, Layers, Network, Database, Cpu, BarChart3, Workflow]
const dotState = ['active', 'run', 'live', 'live', 'active', 'run', 'live']

// Each connection: from-row, to-row (rows are the node indexes 0..6)
const TRAFFIC = [
  { from: 0, to: 1, color: '#2DE2C5', delay: 0,    duration: 1.6 },  // customer → app
  { from: 1, to: 2, color: '#2DE2C5', delay: 0.4,  duration: 1.4 },  // app → api
  { from: 2, to: 3, color: '#38BDF8', delay: 0.9,  duration: 1.5 },  // api → db
  { from: 2, to: 4, color: '#38BDF8', delay: 1.2,  duration: 1.5 },  // api → ai
  { from: 4, to: 3, color: '#38BDF8', delay: 1.7,  duration: 1.2 },  // ai ↔ db
  { from: 3, to: 5, color: '#22D39A', delay: 2.0,  duration: 1.5 },  // db → dash
  { from: 6, to: 2, color: '#F5B544', delay: 2.4,  duration: 1.3 },  // automation → api
  { from: 5, to: 1, color: '#22D39A', delay: 2.8,  duration: 1.4 },  // dash → app feedback
]

function TrafficParticle({ id, fromY, toY, color, delay, duration, onLoop }) {
  const ref = useRef(null)
  useEffect(() => {
    let raf = 0
    let start = performance.now() - delay * 1000
    const tick = (now) => {
      const t = (now - start) / 1000
      const cycle = duration + 0.6
      const p = (t % cycle) / duration
      const el = ref.current
      if (!el) {
        raf = requestAnimationFrame(tick)
        return
      }
      if (p > 1) {
        el.style.opacity = '0'
      } else {
        const y = fromY + (toY - fromY) * p
        const fade = p < 0.1 ? p / 0.1 : p > 0.85 ? (1 - p) / 0.15 : 1
        el.style.transform = `translate3d(0, ${y}px, 0)`
        el.style.opacity = String(0.95 * fade)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [fromY, toY, delay, duration])

  return (
    <span
      ref={ref}
      className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full pointer-events-none"
      style={{
        top: 0,
        background: color,
        boxShadow: `0 0 8px ${color}`,
        opacity: 0,
        willChange: 'transform, opacity',
      }}
      aria-hidden
    />
  )
}

export default function SystemMap() {
  const t = useT()
  const nodes = t.systemMap.nodes
  const stackRef = useRef(null)
  const railRef = useRef(null)
  const rowRefs = useRef([])
  const trafficRef = useRef([])
  const [, force] = useReducer((x) => x + 1, 0)

  useEffect(() => {
    const compute = () => {
      const stack = stackRef.current
      if (!stack) return
      const stackBox = stack.getBoundingClientRect()
      const ys = rowRefs.current.map((el) => {
        if (!el) return 0
        const b = el.getBoundingClientRect()
        return (b.top - stackBox.top) + b.height / 2
      })
      trafficRef.current = TRAFFIC.map((tr) => ({
        ...tr,
        fromY: ys[tr.from] ?? 0,
        toY:   ys[tr.to]   ?? 0,
      }))
      force()
    }
    compute()
    const ro = new ResizeObserver(compute)
    if (stackRef.current) ro.observe(stackRef.current)
    window.addEventListener('resize', compute)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', compute)
    }
  }, [])

  return (
    <section id="system" className="section relative">
      <div className="container-shell">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-14 items-start">
          {/* LEFT — copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
              className="eyebrow mb-5"
            >
              <span className="eyebrow-dot" />
              {t.systemMap.eyebrow}
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7 }}
              className="display-lg text-balance"
            >
              {t.systemMap.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-6 text-fog-300 text-[16px] leading-relaxed text-pretty max-w-xl"
            >
              {t.systemMap.subtitle}
            </motion.p>

            {/* Layer legend */}
            <div className="mt-9 grid grid-cols-2 gap-2 max-w-md">
              {[
                { dot: 'active', label: 'EDGE',     meta: 'clientes · canales' },
                { dot: 'run',    label: 'CORE',     meta: 'app · API · auth' },
                { dot: 'live',   label: 'DATA',     meta: 'DB · cache · storage' },
                { dot: 'warn',   label: 'AUTOMATION', meta: 'IA · eventos' },
              ].map((l) => (
                <div
                  key={l.label}
                  className="rounded-lg border border-white/[0.06] bg-white/[0.015] px-3 py-2.5"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`status-dot ${l.dot}`} />
                    <p className="mono-label text-fog-200 text-[10px] tracking-[0.18em]">{l.label}</p>
                  </div>
                  <p className="text-[11px] text-fog-500 leading-tight">{l.meta}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — live architecture HUD */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="glass-panel gradient-border rounded-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b glass-divider">
              <p className="mono-label text-fog-400">{'// SYSTEM · ARCHITECTURE'}</p>
              <div className="flex items-center gap-2">
                <span className="status-dot run" />
                <span className="mono-label text-signal-blue text-[10px]">LIVE TRAFFIC</span>
              </div>
            </div>

            <div className="px-5 py-6 relative" ref={stackRef}>
              {/* central rail */}
              <div
                ref={railRef}
                aria-hidden
                className="absolute left-1/2 top-6 bottom-6 -translate-x-1/2 w-px bg-gradient-to-b from-accent/0 via-accent/30 to-accent/0 pointer-events-none"
              />

              {/* traffic particles */}
              {trafficRef.current.map((tr, i) => (
                <TrafficParticle
                  key={`tr-${i}`}
                  id={`tr-${i}`}
                  fromY={tr.fromY}
                  toY={tr.toY}
                  color={tr.color}
                  delay={tr.delay}
                  duration={tr.duration}
                />
              ))}

              {/* node rows */}
              <div className="relative space-y-3">
                {nodes.map((node, i) => {
                  const Icon = icons[i] || Network
                  const state = dotState[i] || 'active'
                  return (
                    <motion.div
                      key={node.label}
                      ref={(el) => (rowRefs.current[i] = el)}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: 0.06 + i * 0.05 }}
                      className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-4"
                    >
                      {/* LEFT side info (alternating) */}
                      <div className={`text-right ${i % 2 === 0 ? '' : 'invisible'}`}>
                        <p className="text-[13px] font-semibold text-fog-50 leading-tight">{node.label}</p>
                        <p className="mono-label text-fog-500 text-[10px] mt-0.5 truncate">{node.meta}</p>
                      </div>

                      {/* CENTER node */}
                      <div className="relative z-10 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-xl border border-accent/30 bg-ink-900/80 backdrop-blur flex items-center justify-center text-accent shadow-[0_0_24px_-8px_rgba(45,226,197,0.6)]">
                          <Icon size={17} />
                        </div>
                        <span
                          className={`status-dot ${state} absolute -top-1 -right-1`}
                          style={{ width: 7, height: 7 }}
                        />
                      </div>

                      {/* RIGHT side info (alternating) */}
                      <div className={`text-left ${i % 2 === 1 ? '' : 'invisible'}`}>
                        <p className="text-[13px] font-semibold text-fog-50 leading-tight">{node.label}</p>
                        <p className="mono-label text-fog-500 text-[10px] mt-0.5 truncate">{node.meta}</p>
                      </div>

                      {/* layer index */}
                      <span
                        aria-hidden
                        className="absolute -left-1 top-1/2 -translate-y-1/2 mono-label text-fog-600/60 text-[9px]"
                      >
                        {String(i).padStart(2, '0')}
                      </span>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="px-5 py-3 border-t glass-divider flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="status-dot active" />
                <p className="mono-label text-fog-400 text-[10px]">SYSTEM ARCHITECTURE · ERA DIGITAL</p>
              </div>
              <div className="flex items-center gap-3">
                <p className="mono-label text-fog-500 text-[10px]">latency · 42ms</p>
                <p className="mono-label text-signal-green text-[10px] flex items-center gap-1.5">
                  <span className="status-dot live" />
                  v2026.1
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

