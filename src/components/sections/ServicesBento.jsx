'use client'

import { motion } from 'framer-motion'
import {
  AppWindow, Bot, Smartphone, Database, BarChart3, ShoppingBag,
  Landmark, Shield, MessagesSquare, Truck, ArrowUpRight
} from 'lucide-react'
import { useT } from '@/i18n/LanguageProvider'

const iconBySlug = {
  'web-apps': AppWindow,
  ai: Bot,
  mobile: Smartphone,
  backend: Database,
  dashboards: BarChart3,
  ecommerce: ShoppingBag,
  fintech: Landmark,
  security: Shield,
  messaging: MessagesSquare,
  logistics: Truck,
}

const sizeClass = {
  lg: 'lg:col-span-3 lg:row-span-2',
  md: 'lg:col-span-3',
  sm: 'lg:col-span-2',
}

function MiniVisual({ slug }) {
  if (slug === 'web-apps') {
    return (
      <div className="rounded-lg border border-white/10 bg-ink-900/70 overflow-hidden">
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/[0.06]">
          <span className="w-2 h-2 rounded-full bg-fog-500/40" />
          <span className="w-2 h-2 rounded-full bg-fog-500/40" />
          <span className="w-2 h-2 rounded-full bg-fog-500/40" />
          <span className="ml-2 mono-label text-[9px]">app.empresa.com</span>
        </div>
        <div className="grid grid-cols-[80px_1fr] h-[120px]">
          <div className="border-r border-white/[0.05] p-2.5 space-y-1.5">
            {['Dashboard', 'Ventas', 'Clientes', 'Inventario'].map((s, i) => (
              <div key={s} className={`h-2 rounded ${i === 0 ? 'bg-accent/40' : 'bg-white/[0.06]'}`} />
            ))}
          </div>
          <div className="p-3 space-y-2">
            <div className="flex gap-2">
              <div className="flex-1 h-12 rounded bg-gradient-to-br from-accent/15 to-accent/5 border border-accent/20" />
              <div className="flex-1 h-12 rounded bg-white/[0.04] border border-white/[0.06]" />
            </div>
            <div className="h-10 rounded bg-white/[0.03] border border-white/[0.06]" />
          </div>
        </div>
      </div>
    )
  }

  if (slug === 'ai') {
    return (
      <div className="space-y-1.5">
        {[
          { l: 'INPUT', v: 'documento.pdf · 14p', c: 'text-fog-300' },
          { l: 'AI', v: 'extract → classify → summarize', c: 'text-accent' },
          { l: 'RULES', v: 'if amount > 50k → review', c: 'text-signal-blue' },
          { l: 'OUTPUT', v: 'ticket #4291 · slack', c: 'text-signal-green' },
        ].map((line, i) => (
          <motion.div
            key={line.l}
            initial={{ opacity: 0, x: 4 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            className="flex items-center gap-2.5 text-[11px] font-mono"
          >
            <span className="mono-label w-12 text-fog-500 text-[9px]">{line.l}</span>
            <span className={line.c}>{line.v}</span>
          </motion.div>
        ))}
      </div>
    )
  }

  if (slug === 'fintech') {
    return (
      <div className="space-y-1 font-mono text-[10px]">
        {[
          { t: 'POST', p: '/api/transfer', s: '200', c: 'text-signal-green' },
          { t: 'AUTH', p: 'token verified', s: 'ok', c: 'text-accent' },
          { t: 'AUDIT', p: 'logged · idempotent', s: '✓', c: 'text-signal-blue' },
          { t: 'POST', p: '/api/card/charge', s: '201', c: 'text-signal-green' },
        ].map((row, i) => (
          <div key={i} className="flex items-center gap-2 py-1 border-b border-white/[0.04] last:border-0">
            <span className={`mono-label text-[9px] w-10 ${row.c}`}>{row.t}</span>
            <span className="text-fog-200 flex-1 truncate">{row.p}</span>
            <span className="mono-label text-fog-400 text-[9px]">{row.s}</span>
          </div>
        ))}
      </div>
    )
  }

  if (slug === 'dashboards') {
    return (
      <div className="flex items-end gap-1.5 h-16">
        {[40, 65, 50, 78, 60, 90, 72, 85, 58, 92, 70].map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            whileInView={{ height: `${h}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.04, ease: 'easeOut' }}
            className="flex-1 rounded-t bg-gradient-to-t from-accent/30 to-accent/70"
            style={{ minHeight: 4 }}
          />
        ))}
      </div>
    )
  }

  if (slug === 'security') {
    return (
      <div className="grid grid-cols-3 gap-1.5">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className={`h-8 rounded border ${
              i === 4 ? 'bg-accent/20 border-accent/40' : 'bg-white/[0.02] border-white/[0.05]'
            } flex items-center justify-center`}
          >
            <span className={`mono-label text-[9px] ${i === 4 ? 'text-accent' : 'text-fog-500'}`}>
              {i === 4 ? '✓' : '·'}
            </span>
          </div>
        ))}
      </div>
    )
  }

  if (slug === 'messaging') {
    return (
      <div className="space-y-1.5">
        {[
          { who: 'Cliente', m: 'Necesito el reporte de…', a: 'left' },
          { who: 'Bot', m: 'Generándolo ahora.', a: 'right' },
          { who: 'Cliente', m: 'Perfecto, gracias.', a: 'left' },
        ].map((b, i) => (
          <div key={i} className={`flex ${b.a === 'right' ? 'justify-end' : ''}`}>
            <div
              className={`rounded-lg px-2.5 py-1 text-[10px] max-w-[70%] ${
                b.a === 'right'
                  ? 'bg-accent/15 border border-accent/25 text-accent'
                  : 'bg-white/[0.04] border border-white/[0.06] text-fog-200'
              }`}
            >
              {b.m}
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (slug === 'mobile') {
    return (
      <div className="flex justify-center">
        <div className="w-[70px] h-[120px] rounded-xl border-2 border-white/15 bg-ink-900 p-1.5 relative">
          <div className="w-6 h-1 rounded bg-white/20 mx-auto mb-1.5" />
          <div className="space-y-1">
            <div className="h-3 rounded bg-gradient-to-r from-accent/40 to-accent/10" />
            <div className="grid grid-cols-2 gap-1">
              <div className="h-7 rounded bg-white/[0.05]" />
              <div className="h-7 rounded bg-white/[0.05]" />
              <div className="h-7 rounded bg-accent/15 border border-accent/30" />
              <div className="h-7 rounded bg-white/[0.05]" />
            </div>
            <div className="h-3 rounded bg-white/[0.04]" />
          </div>
        </div>
      </div>
    )
  }

  if (slug === 'backend') {
    return (
      <div className="grid grid-cols-3 gap-2">
        {['API', 'DB', 'Cache', 'Queue', 'Auth', 'Storage'].map((n, i) => (
          <div key={n} className="rounded border border-white/10 bg-white/[0.02] p-2 text-center">
            <p className="mono-label text-[9px] text-accent">{n}</p>
            <div className="mt-1 h-0.5 rounded bg-accent/40" style={{ width: `${50 + i * 7}%`, marginInline: 'auto' }} />
          </div>
        ))}
      </div>
    )
  }

  if (slug === 'ecommerce') {
    return (
      <div className="flex items-center justify-between gap-2">
        <div className="flex-1 rounded-lg border border-white/10 bg-white/[0.02] p-2">
          <p className="mono-label text-[9px] text-fog-500">SKU 2294</p>
          <p className="text-fog-50 text-xs font-medium mt-0.5">Producto demo</p>
          <p className="text-accent text-[11px] font-mono mt-1">$1,240.00</p>
        </div>
        <div className="text-fog-500 text-xl">→</div>
        <div className="flex-1 rounded-lg border border-accent/30 bg-accent/10 p-2">
          <p className="mono-label text-[9px] text-accent">CHECKOUT</p>
          <p className="text-fog-50 text-xs font-medium mt-0.5">Procesado</p>
          <p className="text-signal-green text-[11px] font-mono mt-1">+1 venta</p>
        </div>
      </div>
    )
  }

  if (slug === 'logistics') {
    return (
      <div className="relative h-16">
        <svg viewBox="0 0 200 60" className="w-full h-full">
          <path d="M10,50 Q40,10 80,30 T150,15 L190,25" stroke="rgba(45,226,197,0.6)" strokeWidth="1.5" fill="none" strokeDasharray="4 3" />
          <circle cx="10" cy="50" r="3" fill="#2DE2C5" />
          <circle cx="80" cy="30" r="2.5" fill="#38BDF8" />
          <circle cx="150" cy="15" r="2.5" fill="#38BDF8" />
          <circle cx="190" cy="25" r="3" fill="#22D39A" />
        </svg>
        <div className="absolute bottom-0 left-0 right-0 flex justify-between mono-label text-[9px]">
          <span className="text-accent">Origen</span>
          <span className="text-signal-green">Destino</span>
        </div>
      </div>
    )
  }

  return null
}

function ServiceCard({ item, index }) {
  const Icon = iconBySlug[item.slug] || AppWindow
  const sizeCls = sizeClass[item.size] || sizeClass.md
  const isLarge = item.size === 'lg'

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: 0.04 * index, ease: [0.22, 1, 0.36, 1] }}
      className={`surface-card group relative p-6 sm:p-7 overflow-hidden hover:shadow-card-hover ${sizeCls}`}
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            'radial-gradient(ellipse at top, rgba(45,226,197,0.08), transparent 50%)',
        }}
      />
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="inline-flex w-10 h-10 rounded-lg bg-accent/10 border border-accent/25 items-center justify-center text-accent">
            <Icon size={17} />
          </span>
          <div>
            <h3 className={`font-display font-semibold tracking-tight text-fog-50 ${isLarge ? 'text-xl' : 'text-base'}`}>
              {item.name}
            </h3>
            <p className="text-[12px] text-fog-400 mt-0.5">{item.tagline}</p>
          </div>
        </div>
        <ArrowUpRight size={16} className="text-fog-500 group-hover:text-accent transition-colors" />
      </div>

      <p className={`mt-4 text-fog-300 leading-relaxed ${isLarge ? 'text-[15px]' : 'text-[13px]'}`}>
        {item.description}
      </p>

      {/* Bullets */}
      {item.bullets?.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {item.bullets.map((b) => (
            <span
              key={b}
              className="mono-label text-[10px] tracking-[0.08em] px-2 py-1 rounded border border-white/[0.07] bg-white/[0.015] text-fog-300"
            >
              {b}
            </span>
          ))}
        </div>
      )}

      {/* Mini visual */}
      <div className={`mt-5 rounded-lg border border-white/[0.05] bg-ink-900/40 p-3.5 ${isLarge ? '' : 'mt-4'}`}>
        <MiniVisual slug={item.slug} />
      </div>
    </motion.article>
  )
}

export default function ServicesBento() {
  const t = useT()

  return (
    <section id="services" className="section relative">
      <div className="container-shell">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
              className="eyebrow mb-5"
            >
              <span className="eyebrow-dot" />
              {t.services.eyebrow}
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7 }}
              className="display-lg text-balance"
            >
              {t.services.title}
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-fog-300 text-[15px] max-w-md text-pretty"
          >
            {t.services.subtitle}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 auto-rows-min">
          {t.services.items.map((item, i) => (
            <ServiceCard key={item.slug} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
