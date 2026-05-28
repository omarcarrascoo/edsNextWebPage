'use client'

import { motion } from 'framer-motion'
import { Users, Layers, Network, Database, Cpu, BarChart3, Workflow } from 'lucide-react'
import { useT } from '@/i18n/LanguageProvider'

const icons = [Users, Layers, Network, Database, Cpu, BarChart3, Workflow]

export default function SystemMap() {
  const t = useT()
  const nodes = t.systemMap.nodes

  return (
    <section id="system" className="section relative">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-30"
        style={{
          backgroundImage:
            'radial-gradient(circle at 30% 50%, rgba(56,189,248,0.10), transparent 45%)',
        }}
      />
      <div className="container-shell">
        <div className="text-center max-w-3xl mx-auto mb-14">
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
            className="mt-4 text-fog-300 text-[16px] text-pretty"
          >
            {t.systemMap.subtitle}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="surface-card gradient-border p-6 sm:p-10 relative overflow-hidden"
        >
          {/* tech grid background */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10 tech-grid opacity-40"
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 opacity-60"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(45,226,197,0.06), transparent 60%)',
            }}
          />

          {/* Connection line — desktop horizontal flow */}
          <div className="hidden lg:block">
            <div className="relative grid grid-cols-7 gap-3">
              {/* animated connection line */}
              <svg
                aria-hidden
                className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full h-2 pointer-events-none"
                viewBox="0 0 700 20"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="flowGrad" x1="0" x2="1">
                    <stop offset="0%" stopColor="#2DE2C5" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="#2DE2C5" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.5" />
                  </linearGradient>
                </defs>
                <line x1="0" y1="10" x2="700" y2="10" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                <line x1="0" y1="10" x2="700" y2="10" stroke="url(#flowGrad)" strokeWidth="1.5" strokeDasharray="2 5" />
              </svg>

              {nodes.map((node, i) => {
                const Icon = icons[i] || Network
                return (
                  <motion.div
                    key={node.label}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                    className="relative z-10 flex flex-col items-center text-center"
                  >
                    <div className="w-14 h-14 rounded-xl border border-accent/30 bg-ink-800 backdrop-blur flex items-center justify-center text-accent shadow-[0_0_24px_-8px_rgba(45,226,197,0.5)]">
                      <Icon size={20} />
                    </div>
                    <p className="mt-3 text-[13px] font-medium text-fog-50">{node.label}</p>
                    <p className="text-[10px] text-fog-400 leading-tight mt-0.5 px-1">{node.meta}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Mobile vertical */}
          <div className="lg:hidden space-y-3">
            {nodes.map((node, i) => {
              const Icon = icons[i] || Network
              return (
                <motion.div
                  key={node.label}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.05 + i * 0.06 }}
                  className="relative flex items-center gap-3"
                >
                  <div className="w-12 h-12 rounded-lg border border-accent/30 bg-ink-800 flex items-center justify-center text-accent shrink-0">
                    <Icon size={17} />
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-fog-50">{node.label}</p>
                    <p className="text-[11px] text-fog-400">{node.meta}</p>
                  </div>
                  {i < nodes.length - 1 && (
                    <span aria-hidden className="absolute left-6 top-12 h-3 w-px bg-accent/30" />
                  )}
                </motion.div>
              )
            })}
          </div>

          {/* Footer label */}
          <div className="mt-10 flex flex-wrap items-center justify-between gap-3 pt-6 border-t border-white/[0.06]">
            <div className="flex items-center gap-2">
              <span className="status-dot active" />
              <p className="mono-label text-fog-300">SYSTEM ARCHITECTURE · ERA DIGITAL</p>
            </div>
            <p className="mono-label text-fog-500">v2026.1</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
