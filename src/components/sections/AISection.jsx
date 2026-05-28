'use client'

import { motion } from 'framer-motion'
import { Eye, Brain, History, Plug, ArrowRight } from 'lucide-react'
import { useT, useLanguage } from '@/i18n/LanguageProvider'

const pillarIcons = [Eye, Brain, History, Plug]

const FLOW_ES = [
  { id: 'input',   label: 'Input',         meta: 'docs · APIs · uploads',  state: 'active' },
  { id: 'core',    label: 'AI · CORE',     meta: 'agent loop',             state: 'run',  primary: true },
  { id: 'human',   label: 'Human Review',  meta: 'aprobación · supervisión', state: 'warn', branch: 'low confidence' },
  { id: 'auto',    label: 'Auto Action',   meta: 'confianza > 0.9',        state: 'run',  branch: 'high confidence' },
  { id: 'report',  label: 'Report',        meta: 'informe · slack · email', state: 'live' },
  { id: 'trigger', label: 'Trigger',       meta: 'API · ticket · webhook',  state: 'live' },
]
const FLOW_EN = [
  { id: 'input',   label: 'Input',         meta: 'docs · APIs · uploads',  state: 'active' },
  { id: 'core',    label: 'AI · CORE',     meta: 'agent loop',             state: 'run',  primary: true },
  { id: 'human',   label: 'Human Review',  meta: 'approval · supervision', state: 'warn', branch: 'low confidence' },
  { id: 'auto',    label: 'Auto Action',   meta: 'confidence > 0.9',       state: 'run',  branch: 'high confidence' },
  { id: 'report',  label: 'Report',        meta: 'report · slack · email',  state: 'live' },
  { id: 'trigger', label: 'Trigger',       meta: 'API · ticket · webhook',  state: 'live' },
]

const CONTEXT_NODES_ES = [
  { label: 'Memory',  meta: 'contexto · historial' },
  { label: 'Tools',   meta: 'APIs · funciones' },
  { label: 'Context', meta: 'reglas · políticas' },
]
const CONTEXT_NODES_EN = [
  { label: 'Memory',  meta: 'context · history' },
  { label: 'Tools',   meta: 'APIs · functions' },
  { label: 'Context', meta: 'rules · policies' },
]

export default function AISection() {
  const t = useT()
  const { lang } = useLanguage()
  const flow = lang === 'en' ? FLOW_EN : FLOW_ES
  const ctx  = lang === 'en' ? CONTEXT_NODES_EN : CONTEXT_NODES_ES

  return (
    <section id="ai" className="section relative">
      <div className="container-shell">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-14 items-start">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
              className="eyebrow mb-5"
            >
              <span className="eyebrow-dot" />
              {t.ai.eyebrow}
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7 }}
              className="display-lg text-balance"
            >
              <span className="text-fog-50">{t.ai.title}</span>{' '}
              <span className="editorial text-accent block mt-2">{t.ai.titleAccent}</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-6 text-fog-300 text-[16px] leading-relaxed text-pretty max-w-xl"
            >
              {t.ai.body}
            </motion.p>

            <div className="mt-10 grid sm:grid-cols-2 gap-3">
              {t.ai.pillars.map((p, i) => {
                const Icon = pillarIcons[i] || Brain
                return (
                  <motion.div
                    key={p.title}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: 0.1 + i * 0.07 }}
                    className="rounded-lg border border-white/[0.07] bg-white/[0.015] p-4"
                  >
                    <Icon size={15} className="text-accent" />
                    <p className="mt-2.5 text-[13px] font-semibold text-fog-50">{p.title}</p>
                    <p className="text-[12px] text-fog-400 leading-relaxed mt-1">{p.body}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="glass-panel gradient-border rounded-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b glass-divider">
              <p className="mono-label text-fog-400">{'// AI · WORKFLOW PIPELINE'}</p>
              <div className="flex items-center gap-2">
                <span className="status-dot run" />
                <span className="mono-label text-signal-blue text-[10px]">PROCESSING</span>
              </div>
            </div>

            <div className="p-5 space-y-3">
              {flow.map((step, i) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.05 + i * 0.06 }}
                  className={`relative rounded-xl border p-3.5 flex items-center gap-3 ${
                    step.primary
                      ? 'border-accent/30 bg-accent/[0.04]'
                      : 'border-white/[0.07] bg-white/[0.015]'
                  }`}
                >
                  {step.branch && (
                    <span className="absolute -top-2 left-3 px-1.5 py-0.5 rounded mono-label text-[8px] tracking-[0.2em] bg-ink-700/90 border border-white/10 text-fog-400">
                      {step.branch}
                    </span>
                  )}
                  <span className={`status-dot ${step.state}`} />
                  <div className="flex-1 min-w-0 leading-tight">
                    <p className={`text-[13px] font-semibold ${step.primary ? 'text-accent' : 'text-fog-50'}`}>{step.label}</p>
                    <p className="text-[11px] text-fog-500">{step.meta}</p>
                  </div>
                  <ArrowRight size={14} className="text-fog-500" />
                </motion.div>
              ))}
            </div>

            <div className="px-5 pb-5">
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.01] p-3.5">
                <div className="flex items-center justify-between mb-2">
                  <p className="mono-label text-fog-500 text-[10px]">core.context · attached</p>
                  <span className="mono-label text-signal-blue text-[10px]">3 sources</span>
                </div>
                <ul className="grid grid-cols-3 gap-2">
                  {ctx.map((c) => (
                    <li key={c.label} className="rounded-lg border border-white/[0.05] bg-white/[0.01] p-2">
                      <p className="mono-label text-fog-200 text-[10px] tracking-[0.16em]">{c.label}</p>
                      <p className="text-[10px] text-fog-500 mt-0.5 truncate">{c.meta}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="px-5 py-3 border-t glass-divider flex items-center justify-between">
              <p className="mono-label text-fog-500 text-[10px]">trace_id · 9c2f-ed81-bbf2</p>
              <p className="mono-label text-signal-green flex items-center gap-1.5 text-[10px]">
                <span className="status-dot live" />
                AUDITED
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
