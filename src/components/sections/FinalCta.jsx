'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Mail } from 'lucide-react'
import { useT } from '@/i18n/LanguageProvider'

export default function FinalCta() {
  const t = useT()

  return (
    <section id="contact" className="section relative">
      <div className="container-shell">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="surface-card gradient-border relative overflow-hidden p-8 sm:p-14"
        >
          {/* glow */}
          <div
            aria-hidden
            className="absolute -inset-1 -z-10 opacity-70 blur-3xl"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(45,226,197,0.18), transparent 60%)',
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 tech-grid opacity-30"
          />

          <div className="max-w-3xl">
            <div className="eyebrow mb-6">
              <span className="eyebrow-dot" />
              {t.finalCta.eyebrow}
            </div>
            <h2 className="display-lg text-balance">
              <span className="editorial text-fog-50">&ldquo;</span>
              <span className="text-fog-50">{t.finalCta.quote}</span>
              <span className="editorial text-fog-50">&rdquo;</span>
            </h2>
            <p className="mt-6 text-fog-300 text-[17px] leading-relaxed text-pretty max-w-2xl">
              {t.finalCta.body}
            </p>
            <p className="mt-8 editorial text-[20px] sm:text-[24px] text-accent text-pretty max-w-2xl">
              {t.finalCta.closing}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a href="mailto:contact@eradigitalsolutions.com" className="btn-primary">
                {t.finalCta.cta}
                <ArrowRight size={16} />
              </a>
              <a href="mailto:contact@eradigitalsolutions.com" className="btn-secondary">
                <Mail size={15} />
                {t.finalCta.ctaSecondary}
              </a>
            </div>
          </div>

          {/* corner monitors */}
          <div className="hidden sm:flex absolute top-6 right-6 gap-2">
            <span className="mono-label text-fog-500 text-[10px]">eradigitalsolutions.com</span>
            <span className="status-dot active" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
