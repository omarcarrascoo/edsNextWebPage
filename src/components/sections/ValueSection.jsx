'use client'

import { motion } from 'framer-motion'
import { useT } from '@/i18n/LanguageProvider'

const CLUSTERS = [
  {
    name: 'PRODUCT',
    dot: 'active',
    nodes: [
      { label: 'Web',         meta: 'SaaS · Portales' },
      { label: 'Móvil',       meta: 'iOS · Android' },
      { label: 'Dashboards',  meta: 'BI · KPIs' },
    ],
  },
  {
    name: 'INTELLIGENCE',
    dot: 'run',
    nodes: [
      { label: 'AI',     meta: 'Workflows' },
      { label: 'Agents', meta: 'Reglas · memoria' },
    ],
  },
  {
    name: 'INFRA',
    dot: 'live',
    nodes: [
      { label: 'Backend / APIs', meta: 'Postgres · Redis' },
      { label: 'Fintech',         meta: 'Pagos · Auth' },
      { label: 'Security',        meta: 'Hardening · Audit' },
    ],
  },
  {
    name: 'OPS',
    dot: 'live',
    nodes: [
      { label: 'Messaging',        meta: 'Realtime' },
      { label: 'Ecommerce / POS',  meta: 'Ventas · Stock' },
    ],
  },
]

export default function ValueSection() {
  const t = useT()

  return (
    <section className="section relative">
      <div className="container-shell">
        <div className="grid lg:grid-cols-[1fr_1.15fr] gap-14 items-start">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
              className="eyebrow mb-6"
            >
              <span className="eyebrow-dot" />
              {t.value.eyebrow}
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7 }}
              className="display-lg text-balance"
            >
              <span className="text-fog-50">{t.value.titleA}</span>{' '}
              <span className="text-fog-300">{t.value.titleB}</span>{' '}
              <span className="editorial text-accent">{t.value.titleC}</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-7 space-y-4 max-w-xl"
            >
              <p className="text-fog-200 text-[17px] leading-relaxed">{t.value.body1}</p>
              <p className="text-fog-200 text-[17px] leading-relaxed">{t.value.body2}</p>
              <p className="text-fog-400 text-[15px] leading-relaxed pt-2 border-t border-white/[0.06]">
                {t.value.body3}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-8 flex flex-wrap gap-2"
            >
              {CLUSTERS.map((c) => (
                <span
                  key={c.name}
                  className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.02]"
                >
                  <span className={`status-dot ${c.dot}`} />
                  <span className="mono-label text-fog-300 text-[10px]">{c.name}</span>
                </span>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="glass-panel rounded-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b glass-divider">
              <p className="mono-label text-fog-400">capability.graph</p>
              <span className="mono-label text-fog-500 text-[10px]">4 clusters · 10 nodes</span>
            </div>

            <div className="p-5 grid sm:grid-cols-2 gap-4">
              {CLUSTERS.map((cluster, ci) => (
                <motion.div
                  key={cluster.name}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 + ci * 0.08 }}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className={`status-dot ${cluster.dot}`} />
                      <p className="mono-label text-fog-200 text-[10px] tracking-[0.2em]">{cluster.name}</p>
                    </div>
                    <span className="mono-label text-fog-500 text-[9px]">{cluster.nodes.length} nodes</span>
                  </div>
                  <ul className="space-y-1.5">
                    {cluster.nodes.map((n, ni) => (
                      <li key={n.label} className="flex items-center justify-between gap-3 text-[12px]">
                        <span className="text-fog-100 font-medium truncate">{n.label}</span>
                        <span className="mono-label text-fog-500 text-[10px] truncate">{n.meta}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            <div className="px-5 py-3 border-t glass-divider flex items-center justify-between">
              <p className="mono-label text-fog-500 text-[10px]">mesh · 6 hub-edges · 10 spokes</p>
              <p className="mono-label text-signal-green flex items-center gap-1.5 text-[10px]">
                <span className="status-dot live" />
                CONVERGED
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
