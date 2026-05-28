'use client'

import { motion } from 'framer-motion'
import { useT } from '@/i18n/LanguageProvider'
import { ArrowUpRight } from 'lucide-react'

export default function UseCases() {
  const t = useT()

  return (
    <section id="use-cases" className="section relative">
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
            {t.useCases.eyebrow}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="display-lg text-balance"
          >
            {t.useCases.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-3 text-fog-300 text-[16px] text-pretty"
          >
            {t.useCases.subtitle}
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {t.useCases.items.map((c, i) => (
            <motion.a
              key={c.title}
              href="#contact"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: 0.04 * i }}
              className="group surface-card p-5 sm:p-6 flex items-center gap-4 hover:border-accent/30 hover:bg-accent/[0.02] transition-colors"
            >
              <p className="mono-label text-fog-500 text-[10px] shrink-0">{String(i + 1).padStart(2, '0')}</p>
              <div className="flex-1 min-w-0">
                <p className="text-[15px] font-medium text-fog-50 leading-snug">{c.title}</p>
                <p className="mt-1 mono-label text-accent/80 text-[10px]">{c.meta}</p>
              </div>
              <ArrowUpRight size={16} className="text-fog-500 group-hover:text-accent transition-colors shrink-0" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
