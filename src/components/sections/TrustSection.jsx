'use client'

import { motion } from 'framer-motion'
import { Layers3, ShieldCheck, BarChart3, Bot, Plug2, Server } from 'lucide-react'
import { useT } from '@/i18n/LanguageProvider'

const icons = [Layers3, ShieldCheck, BarChart3, Bot, Plug2, Server]

export default function TrustSection() {
  const t = useT()

  return (
    <section id="process" className="section relative">
      <div className="container-shell">
        <div className="max-w-3xl mb-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="eyebrow mb-5"
          >
            <span className="eyebrow-dot" />
            {t.trust.eyebrow}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="display-lg text-balance"
          >
            {t.trust.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-3 editorial text-fog-400 text-[15px]"
          >
            {t.trust.subtitle}
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {t.trust.items.map((item, i) => {
            const Icon = icons[i] || Layers3
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: 0.04 * i }}
                className="surface-card p-6 group hover:border-accent/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex w-9 h-9 rounded-lg bg-white/[0.03] border border-white/10 items-center justify-center text-fog-200 group-hover:text-accent group-hover:border-accent/30 transition-colors">
                    <Icon size={16} />
                  </span>
                  <p className="mono-label text-fog-500 text-[10px]">{String(i + 1).padStart(2, '0')}</p>
                </div>
                <h3 className="mt-4 font-display text-[17px] font-semibold text-fog-50">{item.title}</h3>
                <p className="mt-2 text-[14px] text-fog-300 leading-relaxed">{item.body}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
