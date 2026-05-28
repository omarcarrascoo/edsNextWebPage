'use client'

import { motion } from 'framer-motion'
import { useT } from '@/i18n/LanguageProvider'
import { MessageSquare, FileSpreadsheet, FileText, CreditCard, Users, AlertTriangle } from 'lucide-react'

const beforeIcons = [MessageSquare, FileSpreadsheet, FileText, CreditCard, Users]

export default function ProblemSection() {
  const t = useT()

  return (
    <section id="problem" className="section relative">
      <div className="container-shell">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <div className="eyebrow mb-6">
            <span className="eyebrow-dot" />
            {t.problem.eyebrow}
          </div>
          <h2 className="display-lg text-balance">
            <span className="text-fog-50">{t.problem.titleA}</span>{' '}
            <span className="text-fog-300">{t.problem.titleB}</span>{' '}
            <span className="editorial text-accent">{t.problem.titleC}.</span>
          </h2>
        </motion.div>

        <div className="mt-14 grid lg:grid-cols-2 gap-6">
          {/* BEFORE — fragmented log */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="glass-panel rounded-2xl p-6 sm:p-7"
          >
            <div className="flex items-center justify-between mb-5">
              <p className="mono-label text-fog-400">01 · {t.problem.beforeLabel.toUpperCase()}</p>
              <span className="inline-flex items-center gap-1.5 mono-label text-signal-amber/90 text-[10px]">
                <AlertTriangle size={10} />
                FRAGMENTED · 5 SOURCES
              </span>
            </div>

            <ul className="divide-y divide-white/[0.05]">
              {t.problem.beforeItems.map((item, i) => {
                const Icon = beforeIcons[i % beforeIcons.length]
                return (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}
                    className="py-3 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-7 h-7 rounded-md bg-white/[0.03] border border-white/10 inline-flex items-center justify-center text-fog-300">
                        <Icon size={13} />
                      </span>
                      <div className="leading-tight min-w-0">
                        <p className="text-[13px] font-medium text-fog-100">{item.label}</p>
                        <p className="text-[11px] text-fog-500 truncate">{item.meta}</p>
                      </div>
                    </div>
                    <span className="status-dot warn" />
                  </motion.li>
                )
              })}
            </ul>

            <div className="mt-4 pt-4 border-t glass-divider">
              <p className="mono-label text-fog-500 text-[10px] flex items-center gap-2">
                <span className="status-dot warn" />
                disconnected · no audit · manual sync
              </p>
            </div>
          </motion.div>

          {/* AFTER — connected log */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-panel gradient-border rounded-2xl p-6 sm:p-7 relative"
          >
            <div className="flex items-center justify-between mb-5">
              <p className="mono-label text-accent">02 · {t.problem.afterLabel.toUpperCase()}</p>
              <span className="inline-flex items-center gap-1.5 mono-label text-accent text-[10px]">
                <span className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(45,226,197,0.7)]" />
                CONNECTED · 1 GRAPH
              </span>
            </div>

            <ul className="divide-y divide-white/[0.05]">
              {t.problem.afterItems.map((item, i) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, x: 8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}
                  className="py-3 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-7 h-7 rounded-md bg-accent/[0.08] border border-accent/20 inline-flex items-center justify-center">
                      <span className="status-dot active" />
                    </span>
                    <div className="leading-tight min-w-0">
                      <p className="text-[13px] font-medium text-fog-50">{item.label}</p>
                      <p className="text-[11px] text-fog-400 truncate">{item.meta}</p>
                    </div>
                  </div>
                  <span className="mono-label text-fog-500 text-[9px] tracking-[0.16em]">SYNCED</span>
                </motion.li>
              ))}
            </ul>

            <div className="mt-4 pt-4 border-t glass-divider flex items-center justify-between">
              <p className="mono-label text-fog-500 text-[10px]">mesh.topology · 10 edges</p>
              <p className="mono-label text-signal-green flex items-center gap-1.5 text-[10px]">
                <span className="status-dot live" />
                AUDIT TRAIL ON
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-14 grid lg:grid-cols-3 gap-8 max-w-5xl"
        >
          <p className="text-fog-300 text-[16px] leading-relaxed">{t.problem.body1}</p>
          <p className="text-fog-50 text-[18px] leading-relaxed editorial">
            &ldquo;{t.problem.body2}&rdquo;
          </p>
          <p className="text-fog-300 text-[16px] leading-relaxed">{t.problem.body3}</p>
        </motion.div>
      </div>
    </section>
  )
}
