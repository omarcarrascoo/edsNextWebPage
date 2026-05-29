'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import {
  AppWindow, Bot, Smartphone, Database, BarChart3, ShoppingBag,
  Landmark, Shield, MessagesSquare, Truck, Rocket, ArrowRight,
} from 'lucide-react'
import { useT } from '@/i18n/LanguageProvider'
import { useScrollStory } from '@/components/graph/StoryConstellation'

const RocketParticles = dynamic(() => import('@/components/graph/RocketParticles'), {
  ssr: false,
  loading: () => null,
})

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

// Each pair index → activeStages target. Pair 0 = 2 stages lit, pair 4 = 10.
const STAGES_BY_PAIR = [2, 4, 6, 8, 10]

function ServiceMini({ slug, items }) {
  const item = items.find((it) => it.slug === slug)
  const Icon = iconBySlug[slug] || AppWindow
  if (!item) return null
  return (
    <div className="rounded-xl border border-white/[0.08] bg-[rgba(8,12,18,0.6)] backdrop-blur-md p-4 sm:p-5">
      <div className="flex items-start gap-3 mb-2.5">
        <span className="inline-flex w-8 h-8 rounded-lg bg-accent/10 border border-accent/25 items-center justify-center text-accent shrink-0">
          <Icon size={15} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-fog-50 text-[14px] sm:text-[15px] font-medium leading-tight">
            {item.name}
          </p>
          <p className="mono-label text-fog-500 text-[10px] tracking-[0.14em] mt-1 truncate">
            {slug}
          </p>
        </div>
      </div>
      <p className="text-fog-300 text-[12.5px] sm:text-[13px] leading-relaxed text-pretty">
        {item.tagline}
      </p>
      {item.bullets?.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {item.bullets.slice(0, 3).map((b) => (
            <span
              key={b}
              className="mono-label text-[9px] tracking-[0.08em] px-2 py-0.5 rounded-full border border-white/[0.07] bg-white/[0.02] text-fog-400"
            >
              {b}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

function PairPanel({ pair, items, index, total }) {
  return (
    <article
      className="shrink-0 w-[100vw] h-screen flex items-center px-6 sm:px-12 lg:px-20 pt-32 pb-24"
    >
      <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-center max-w-[1400px] w-full">
        {/* LEFT — copy */}
        <div className="relative">
          <div className="flex items-center gap-3 mb-7">
            <span
              className="font-display font-semibold leading-none text-accent"
              style={{ fontSize: 'clamp(46px, 7vw, 100px)', letterSpacing: '-0.04em' }}
            >
              {pair.code}
            </span>
            <div className="flex-1">
              <p className="mono-label text-fog-500 text-[10px] tracking-[0.22em] mb-1">
                {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </p>
              <p className="mono-label text-accent text-[10px] tracking-[0.22em]">
                {pair.stage}
              </p>
            </div>
          </div>

          <h3
            className="font-display font-semibold text-fog-50 tracking-[-0.03em] leading-[0.98] text-balance break-words"
            style={{ fontSize: 'clamp(36px, 6vw, 92px)' }}
          >
            {pair.title}
          </h3>
          <p
            className="editorial text-fog-300 mt-4 text-pretty"
            style={{ fontSize: 'clamp(18px, 2vw, 28px)', lineHeight: 1.3 }}
          >
            {pair.caption}
          </p>
          <p className="text-fog-400 text-[14px] sm:text-[15px] leading-relaxed text-pretty mt-6 max-w-xl">
            {pair.body}
          </p>
        </div>

        {/* RIGHT — the two services in this pair */}
        <div className="grid gap-3">
          {pair.slugs.map((slug) => (
            <ServiceMini key={slug} slug={slug} items={items} />
          ))}
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
  const headerRef = useRef(null)
  const activeStagesRef = useRef(0)
  const [activePairIdx, setActivePairIdx] = useState(0)
  const [pinActive, setPinActive] = useState(false)

  const pairs = t.services.pairs || []
  const items = t.services.items || []
  const count = pairs.length

  // Outer wrapper scroll: (count + 0.5) viewports tall to give room for entry
  // and one final dwell on the assembled rocket.
  const wrapperVh = count + 0.5

  useEffect(() => {
    if (!wrapperRef.current) return
    let raf = 0

    const loop = () => {
      const wrap = wrapperRef.current
      if (!wrap) return
      const rect = wrap.getBoundingClientRect()
      const vh = window.innerHeight
      const total = rect.height - vh
      const scrolled = -rect.top
      let progress = total > 0 ? scrolled / total : 0
      progress = Math.max(0, Math.min(1, progress))
      const active = rect.top < vh && rect.bottom > 0
      setPinActive(active)

      // horizontal track translate — span (count - 1) viewports
      if (trackRef.current) {
        const dx = -progress * (count - 1) * 100
        trackRef.current.style.transform = `translate3d(${dx}vw, 0, 0)`
      }

      // continuous pair index 0..(count-1)
      const continuous = progress * (count - 1)
      const idx = Math.round(continuous)
      setActivePairIdx(idx)

      // smooth stages target — interpolate between adjacent pair targets
      const floorIdx = Math.max(0, Math.min(count - 1, Math.floor(continuous)))
      const ceilIdx = Math.min(count - 1, floorIdx + 1)
      const frac = continuous - floorIdx
      const stagesFloor = STAGES_BY_PAIR[floorIdx] ?? 0
      const stagesCeil = STAGES_BY_PAIR[ceilIdx] ?? stagesFloor
      const stagesTarget = stagesFloor + (stagesCeil - stagesFloor) * frac

      // Smooth approach so the rocket animates rather than snapping
      const cur = activeStagesRef.current ?? 0
      activeStagesRef.current = cur + (stagesTarget - cur) * 0.1

      // fade section header out as horizontal track starts moving
      if (headerRef.current && active) {
        const fade = Math.max(0, Math.min(1, 1 - progress / 0.06))
        headerRef.current.style.opacity = String(fade)
        headerRef.current.style.transform = `translateY(${(1 - fade) * -8}px)`
      } else if (headerRef.current) {
        headerRef.current.style.opacity = '1'
        headerRef.current.style.transform = 'translateY(0px)'
      }

      if (story.setServicesPin) {
        story.setServicesPin({ active, progress, total: count })
      }

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
      style={{ height: `${wrapperVh * 100}vh`, background: '#05080C' }}
    >
      {/* Sticky viewport — rocket layer + horizontal track + HUD */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* ROCKET BACKGROUND — fullbleed, lives behind everything else.
            Anchored to the right side so the panels' copy gets breathing room
            on the left while the rocket dominates the right two thirds. */}
        <div
          aria-hidden={false}
          className="absolute inset-0 pointer-events-auto"
        >
          <RocketParticles activeStagesRef={activeStagesRef} />
        </div>

        {/* gradient overlays — tame the rocket on the LEFT so copy reads,
            keep the right open so users can interact with particles */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            background:
              'linear-gradient(to right, rgba(5,8,12,0.92) 0%, rgba(5,8,12,0.65) 25%, rgba(5,8,12,0.0) 55%, rgba(5,8,12,0.0) 100%)',
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            background:
              'linear-gradient(to bottom, rgba(5,8,12,0.55) 0%, rgba(5,8,12,0.0) 18%, rgba(5,8,12,0.0) 75%, rgba(5,8,12,0.7) 100%)',
          }}
        />

        {/* TOP — section header, fades out as you scroll past entry */}
        <div
          ref={headerRef}
          className="absolute top-0 left-0 right-0 z-20 px-6 sm:px-12 lg:px-20 pt-8 sm:pt-10 pointer-events-none will-change-[opacity,transform]"
        >
          <div className="flex items-end justify-between gap-6 max-w-[1400px]">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <p className="mono-label text-fog-500 text-[10px] tracking-[0.22em]">
                  {'// SERVICES · 04 · assemble()'}
                </p>
                <span className="hidden sm:inline-flex items-center gap-2">
                  <Rocket size={11} className="text-accent" />
                  <span className="mono-label text-accent text-[10px] tracking-[0.22em]">
                    {t.services.assemblyLabel}
                  </span>
                </span>
              </div>
              <div className="eyebrow mb-3">
                <span className="eyebrow-dot" />
                {t.services.eyebrow}
              </div>
              <h2
                className="font-display font-semibold tracking-[-0.025em] leading-[1.02] text-fog-50 text-balance break-words max-w-3xl"
                style={{ fontSize: 'clamp(26px, 4vw, 56px)' }}
              >
                {t.services.title}
              </h2>
              <p className="text-fog-400 text-[13px] sm:text-[14px] leading-relaxed mt-2 max-w-xl text-pretty">
                {t.services.subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* HORIZONTAL TRACK — panels slide left as user scrolls */}
        <div
          ref={trackRef}
          className="flex h-full will-change-transform relative z-10"
          style={{ width: `${count * 100}vw`, transform: 'translate3d(0,0,0)' }}
        >
          {pairs.map((pair, i) => (
            <PairPanel
              key={pair.code}
              pair={pair}
              items={items}
              index={i}
              total={count}
            />
          ))}
        </div>

        {/* PROGRESS RAIL — bottom, with stage counter */}
        <div className="absolute bottom-6 left-0 right-0 z-20 px-6 sm:px-12 lg:px-20 pointer-events-none">
          <div className="flex items-center justify-between gap-6 flex-wrap">
            <div className="flex items-center gap-3">
              <span className="mono-label text-fog-500 text-[10px] tracking-[0.22em]">
                {pairs[activePairIdx]?.code}
              </span>
              <div className="flex items-center gap-1.5">
                {pairs.map((p, i) => (
                  <span
                    key={p.code}
                    className={`h-px transition-all duration-500 ${
                      i === activePairIdx
                        ? 'w-8 bg-accent'
                        : i < activePairIdx
                        ? 'w-4 bg-fog-300/40'
                        : 'w-4 bg-fog-500/20'
                    }`}
                  />
                ))}
              </div>
              <span className="mono-label text-fog-500 text-[10px] tracking-[0.22em]">
                {String(count).padStart(2, '0')}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <p className="mono-label text-accent text-[10px] tracking-[0.22em]">
                {Math.min(STAGES_BY_PAIR[activePairIdx] ?? 0, 10)} / 10 stages
              </p>
              <p className="mono-label text-fog-500 text-[10px] flex items-center gap-2">
                <span>scroll</span>
                <ArrowRight size={11} />
                <span className="text-fog-300 hidden sm:inline">{pairs[activePairIdx]?.title}</span>
              </p>
            </div>
          </div>
        </div>

        {/* hover hint — only visible during pin */}
        {pinActive && (
          <div className="absolute top-1/2 right-8 -translate-y-1/2 z-20 pointer-events-none hidden lg:block">
            <p className="mono-label text-fog-500 text-[9px] tracking-[0.2em] [writing-mode:vertical-rl]">
              hover · particles scatter
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
