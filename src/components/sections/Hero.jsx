'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { useT } from '@/i18n/LanguageProvider'

export default function Hero() {
  const t = useT()

  return (
    <section id="top" className="relative pt-32 pb-32 lg:pt-44 lg:pb-44 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-[640px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(45,226,197,0.10), transparent 60%)',
        }}
      />

      <div className="container-shell">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="eyebrow mb-7"
            >
              <span className="eyebrow-dot" />
              {t.hero.eyebrow}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="display-xl text-balance"
            >
              <span className="text-fog-50">{t.hero.titleA}</span>{' '}
              <span className="text-fog-300">{t.hero.titleB}</span>{' '}
              <span className="editorial text-accent">{t.hero.titleC}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18 }}
              className="mt-7 text-fog-300 text-[17px] leading-relaxed max-w-2xl text-pretty"
            >
              {t.hero.subtitle}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.26 }}
              className="mt-4 text-fog-400 text-[15px] leading-relaxed max-w-2xl text-pretty"
            >
              {t.hero.note}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.36 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <a href="#contact" className="btn-primary">
                {t.hero.ctaPrimary}
                <ArrowRight size={16} />
              </a>
              <a href="#services" className="btn-secondary">
                {t.hero.ctaSecondary}
                <ChevronDown size={16} />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-12 grid grid-cols-3 max-w-md gap-6"
            >
              {[
                { k: '+10', l: 'Frentes técnicos / Technical fronts' },
                { k: '24/7', l: 'Sistemas en producción / In production' },
                { k: 'IA', l: 'Con supervisión / With supervision' },
              ].map((s) => (
                <div key={s.k} className="border-l border-white/10 pl-3">
                  <p className="font-display text-2xl font-semibold text-fog-50 leading-tight">{s.k}</p>
                  <p className="text-[11px] text-fog-400 leading-tight mt-0.5">{s.l}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* HUD lateral — no canvas. Solo telemetría textual del OS */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:justify-self-end w-full max-w-md"
          >
            <div className="glass-panel rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.06] bg-white/[0.015]">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-fog-500/40" />
                    <span className="w-2 h-2 rounded-full bg-fog-500/40" />
                    <span className="w-2 h-2 rounded-full bg-fog-500/40" />
                  </div>
                  <p className="mono-label text-[10px]">{t.hero.osTitle} · {t.hero.osMeta}</p>
                </div>
                <div className="flex items-center gap-2 px-2 py-0.5 rounded-full bg-accent/10 border border-accent/20">
                  <span className="status-dot active" />
                  <span className="mono-label text-accent text-[9px] tracking-[0.16em]">{t.hero.osStatus}</span>
                </div>
              </div>

              <div className="px-5 py-4 grid gap-2">
                {t.hero.modules.map((m, i) => (
                  <div key={m.name} className="flex items-center justify-between gap-3 py-1">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className={`status-dot ${m.state}`} />
                      <p className="text-[13px] text-fog-100 font-medium truncate">{m.name}</p>
                    </div>
                    <span className="mono-label text-fog-500 text-[9px] tracking-[0.16em] shrink-0">{m.tag}</span>
                  </div>
                ))}
              </div>

              <div className="px-5 py-3 border-t border-white/[0.06] flex items-center justify-between">
                <p className="mono-label text-[10px]">UPTIME · 99.98%</p>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 18 }).map((_, i) => (
                    <span
                      key={i}
                      className="block w-[2.5px] rounded-full bg-accent/70"
                      style={{
                        height: `${4 + ((i * 13) % 12)}px`,
                        opacity: 0.35 + ((i * 7) % 60) / 100,
                        animation: `pulseSoft ${1 + (i % 5) * 0.3}s ease-in-out ${i * 0.1}s infinite`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <p className="mt-3 text-fog-500 text-[11px] mono-label flex items-center gap-2">
              <span className="status-dot live" />
              scroll · explora la arquitectura ↓
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
