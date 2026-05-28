'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import {
  AppWindow, Bot, Smartphone, Database, BarChart3, ShoppingBag,
  Landmark, Shield, MessagesSquare, Truck, ArrowUpRight, ArrowRight,
} from 'lucide-react'
import { useT } from '@/i18n/LanguageProvider'
import { useScrollStory } from '@/components/graph/StoryConstellation'

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

// Mini visuals — same library as before, just trimmed for clarity
function MiniVisual({ slug }) {
  if (slug === 'web-apps') {
    return (
      <div className="rounded-lg border border-white/10 bg-ink-900/70 overflow-hidden w-full">
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/[0.06]">
          <span className="w-2 h-2 rounded-full bg-fog-500/40" />
          <span className="w-2 h-2 rounded-full bg-fog-500/40" />
          <span className="w-2 h-2 rounded-full bg-fog-500/40" />
          <span className="ml-2 mono-label text-[9px]">app.empresa.com</span>
        </div>
        <div className="grid grid-cols-[80px_1fr]">
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
      <div className="space-y-2 w-full">
        {[
          { l: 'INPUT', v: 'documento.pdf · 14p', c: 'text-fog-300' },
          { l: 'AI', v: 'extract → classify → summarize', c: 'text-accent' },
          { l: 'RULES', v: 'if amount > 50k → review', c: 'text-signal-blue' },
          { l: 'OUTPUT', v: 'ticket #4291 · slack', c: 'text-signal-green' },
        ].map((line) => (
          <div key={line.l} className="flex items-center gap-2.5 text-[12px] font-mono">
            <span className="mono-label w-14 text-fog-500 text-[10px]">{line.l}</span>
            <span className={line.c}>{line.v}</span>
          </div>
        ))}
      </div>
    )
  }

  if (slug === 'fintech') {
    return (
      <div className="space-y-1 font-mono text-[11px] w-full">
        {[
          { t: 'POST', p: '/api/transfer', s: '200', c: 'text-signal-green' },
          { t: 'AUTH', p: 'token verified', s: 'ok', c: 'text-accent' },
          { t: 'AUDIT', p: 'logged · idempotent', s: '✓', c: 'text-signal-blue' },
          { t: 'POST', p: '/api/card/charge', s: '201', c: 'text-signal-green' },
        ].map((row, i) => (
          <div key={i} className="flex items-center gap-2 py-1.5 border-b border-white/[0.04] last:border-0">
            <span className={`mono-label text-[10px] w-12 ${row.c}`}>{row.t}</span>
            <span className="text-fog-200 flex-1 truncate">{row.p}</span>
            <span className="mono-label text-fog-400 text-[10px]">{row.s}</span>
          </div>
        ))}
      </div>
    )
  }

  if (slug === 'dashboards') {
    return (
      <div className="flex items-end gap-1.5 h-24 w-full">
        {[40, 65, 50, 78, 60, 90, 72, 85, 58, 92, 70].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t bg-gradient-to-t from-accent/30 to-accent/70"
            style={{ height: `${h}%`, minHeight: 4 }}
          />
        ))}
      </div>
    )
  }

  if (slug === 'security') {
    return (
      <div className="grid grid-cols-3 gap-1.5 w-full">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className={`h-10 rounded border ${
              i === 4 ? 'bg-accent/20 border-accent/40' : 'bg-white/[0.02] border-white/[0.05]'
            } flex items-center justify-center`}
          >
            <span className={`mono-label text-[10px] ${i === 4 ? 'text-accent' : 'text-fog-500'}`}>
              {i === 4 ? '✓' : '·'}
            </span>
          </div>
        ))}
      </div>
    )
  }

  if (slug === 'messaging') {
    return (
      <div className="space-y-2 w-full">
        {[
          { who: 'Cliente', m: 'Necesito el reporte de…', a: 'left' },
          { who: 'Bot', m: 'Generándolo ahora.', a: 'right' },
          { who: 'Cliente', m: 'Perfecto, gracias.', a: 'left' },
        ].map((b, i) => (
          <div key={i} className={`flex ${b.a === 'right' ? 'justify-end' : ''}`}>
            <div
              className={`rounded-lg px-3 py-1.5 text-[11px] max-w-[75%] ${
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
      <div className="flex justify-center w-full">
        <div className="w-[90px] h-[150px] rounded-xl border-2 border-white/15 bg-ink-900 p-2 relative">
          <div className="w-7 h-1 rounded bg-white/20 mx-auto mb-2" />
          <div className="space-y-1.5">
            <div className="h-4 rounded bg-gradient-to-r from-accent/40 to-accent/10" />
            <div className="grid grid-cols-2 gap-1.5">
              <div className="h-9 rounded bg-white/[0.05]" />
              <div className="h-9 rounded bg-white/[0.05]" />
              <div className="h-9 rounded bg-accent/15 border border-accent/30" />
              <div className="h-9 rounded bg-white/[0.05]" />
            </div>
            <div className="h-4 rounded bg-white/[0.04]" />
          </div>
        </div>
      </div>
    )
  }

  if (slug === 'backend') {
    return (
      <div className="grid grid-cols-3 gap-2 w-full">
        {['API', 'DB', 'Cache', 'Queue', 'Auth', 'Storage'].map((n, i) => (
          <div key={n} className="rounded border border-white/10 bg-white/[0.02] p-2.5 text-center">
            <p className="mono-label text-[10px] text-accent">{n}</p>
            <div className="mt-1.5 h-0.5 rounded bg-accent/40" style={{ width: `${50 + i * 7}%`, marginInline: 'auto' }} />
          </div>
        ))}
      </div>
    )
  }

  if (slug === 'ecommerce') {
    return (
      <div className="flex items-center justify-between gap-2 w-full">
        <div className="flex-1 rounded-lg border border-white/10 bg-white/[0.02] p-2.5">
          <p className="mono-label text-[10px] text-fog-500">SKU 2294</p>
          <p className="text-fog-50 text-[13px] font-medium mt-0.5">Producto demo</p>
          <p className="text-accent text-[12px] font-mono mt-1">$1,240.00</p>
        </div>
        <div className="text-fog-500 text-2xl">→</div>
        <div className="flex-1 rounded-lg border border-accent/30 bg-accent/10 p-2.5">
          <p className="mono-label text-[10px] text-accent">CHECKOUT</p>
          <p className="text-fog-50 text-[13px] font-medium mt-0.5">Procesado</p>
          <p className="text-signal-green text-[12px] font-mono mt-1">+1 venta</p>
        </div>
      </div>
    )
  }

  if (slug === 'logistics') {
    return (
      <div className="relative h-20 w-full">
        <svg viewBox="0 0 200 60" className="w-full h-full">
          <path d="M10,50 Q40,10 80,30 T150,15 L190,25" stroke="rgba(45,226,197,0.6)" strokeWidth="1.5" fill="none" strokeDasharray="4 3" />
          <circle cx="10" cy="50" r="3" fill="#2DE2C5" />
          <circle cx="80" cy="30" r="2.5" fill="#38BDF8" />
          <circle cx="150" cy="15" r="2.5" fill="#38BDF8" />
          <circle cx="190" cy="25" r="3" fill="#22D39A" />
        </svg>
        <div className="absolute bottom-0 left-0 right-0 flex justify-between mono-label text-[10px]">
          <span className="text-accent">Origen</span>
          <span className="text-signal-green">Destino</span>
        </div>
      </div>
    )
  }

  return null
}

function ServicePanel({ item, index, total }) {
  const Icon = iconBySlug[item.slug] || AppWindow
  const num = String(index + 1).padStart(2, '0')
  const totalStr = String(total).padStart(2, '0')

  return (
    <article
      className="shrink-0 w-[100vw] h-screen flex items-center justify-center px-6 sm:px-12"
    >
      <div className="grid lg:grid-cols-[1.05fr_1fr] gap-10 items-center max-w-6xl w-full">
        {/* LEFT — editorial copy */}
        <div className="relative">
          <div className="flex items-center gap-3 mb-7">
            <span className="mono-label text-fog-500 text-[10px]">// CORE · {num} / {totalStr}</span>
            <span className="flex-1 h-px bg-white/[0.07]" />
          </div>

          <div className="flex items-baseline gap-5 mb-4">
            <span
              className="font-display font-semibold text-fog-50/[0.08] leading-none"
              style={{ fontSize: 'clamp(96px, 16vw, 200px)', letterSpacing: '-0.05em' }}
            >
              {num}
            </span>
            <span className="inline-flex w-12 h-12 rounded-xl bg-accent/10 border border-accent/30 items-center justify-center text-accent shrink-0 self-center">
              <Icon size={22} />
            </span>
          </div>

          <h3 className="display-md text-balance text-fog-50 mb-3">
            {item.name}
          </h3>
          <p className="text-fog-300 text-[16px] leading-relaxed mb-6 max-w-xl text-pretty">
            {item.tagline}
          </p>
          <p className="text-fog-400 text-[14px] leading-relaxed max-w-xl text-pretty">
            {item.description}
          </p>

          {item.bullets?.length > 0 && (
            <div className="mt-7 flex flex-wrap gap-1.5">
              {item.bullets.map((b) => (
                <span
                  key={b}
                  className="mono-label text-[10px] tracking-[0.08em] px-2.5 py-1 rounded-full border border-white/[0.07] bg-white/[0.015] text-fog-300"
                >
                  {b}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT — visual panel */}
        <div className="relative">
          <div
            aria-hidden
            className="absolute -inset-8 -z-10 rounded-3xl"
            style={{
              background:
                'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(45,226,197,0.08), transparent 60%)',
            }}
          />
          <div className="glass-panel gradient-border rounded-2xl p-6 sm:p-7">
            <div className="flex items-center justify-between mb-5">
              <p className="mono-label text-fog-400 text-[10px]">capability.preview</p>
              <span className="inline-flex items-center gap-1.5 mono-label text-accent text-[10px]">
                <span className="status-dot active" />
                LIVE
              </span>
            </div>
            <div className="min-h-[150px] flex items-center">
              <MiniVisual slug={item.slug} />
            </div>
            <div className="mt-5 pt-4 border-t glass-divider flex items-center justify-between">
              <p className="mono-label text-fog-500 text-[10px]">module · {item.slug}</p>
              <p className="mono-label text-signal-green flex items-center gap-1.5 text-[10px]">
                <span className="status-dot live" />
                READY
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default function ServicesBento() {
  const t = useT()
  const story = useScrollStory()
  const wrapperRef = useRef(null)
  const trackRef = useRef(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const items = t.services.items
  const count = items.length

  // Outer wrapper height = (count + 0.5) * 100vh, so user scrolls through all services
  // while the inner track translates horizontally.
  const wrapperVh = count + 0.5

  useEffect(() => {
    if (!wrapperRef.current) return
    let raf = 0
    const loop = () => {
      const wrap = wrapperRef.current
      if (!wrap) return
      const rect = wrap.getBoundingClientRect()
      const vh = window.innerHeight
      const total = rect.height - vh   // distance the user scrolls inside the pin
      const scrolled = -rect.top       // how much past the top
      let progress = total > 0 ? scrolled / total : 0
      progress = Math.max(0, Math.min(1, progress))
      const active = rect.top < vh && rect.bottom > 0

      // Move the inner track horizontally
      if (trackRef.current) {
        const dx = -progress * (count - 1) * 100  // vw
        trackRef.current.style.transform = `translate3d(${dx}vw, 0, 0)`
      }

      // Push pin state to story scene
      if (story.setServicesPin) {
        story.setServicesPin({
          active,
          progress,
          total: count,
        })
      }

      // Active index for nav dots
      const idx = Math.round(progress * (count - 1))
      setActiveIdx(idx)

      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [count, story])

  return (
    <section
      id="services"
      ref={wrapperRef}
      className="relative"
      style={{ height: `${wrapperVh * 100}vh` }}
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 z-20 px-6 sm:px-12 pt-8 pointer-events-none">
          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="eyebrow mb-3">
                <span className="eyebrow-dot" />
                {t.services.eyebrow}
              </div>
              <h2 className="display-md text-balance">
                <span className="text-fog-50">{t.services.title}</span>
              </h2>
            </div>
            <p className="hidden md:block mono-label text-fog-500 text-[10px] max-w-xs text-right">
              {t.services.subtitle}
            </p>
          </div>
        </div>

        {/* Horizontal track */}
        <div
          ref={trackRef}
          className="flex h-full will-change-transform"
          style={{ width: `${count * 100}vw`, transform: 'translate3d(0,0,0)' }}
        >
          {items.map((item, i) => (
            <ServicePanel key={item.slug} item={item} index={i} total={count} />
          ))}
        </div>

        {/* Bottom progress rail */}
        <div className="absolute bottom-6 left-0 right-0 z-20 px-6 sm:px-12 pointer-events-none">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <span className="mono-label text-fog-500 text-[10px]">
                {String(activeIdx + 1).padStart(2, '0')}
              </span>
              <div className="flex items-center gap-1.5">
                {items.map((_, i) => (
                  <span
                    key={i}
                    className={`h-px transition-all duration-300 ${
                      i === activeIdx
                        ? 'w-8 bg-accent'
                        : i < activeIdx
                        ? 'w-4 bg-fog-300/40'
                        : 'w-4 bg-fog-500/20'
                    }`}
                  />
                ))}
              </div>
              <span className="mono-label text-fog-500 text-[10px]">
                {String(count).padStart(2, '0')}
              </span>
            </div>
            <p className="mono-label text-fog-500 text-[10px] flex items-center gap-2">
              <span>scroll</span>
              <ArrowRight size={11} />
              <span className="text-fog-300">{items[activeIdx]?.name}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
