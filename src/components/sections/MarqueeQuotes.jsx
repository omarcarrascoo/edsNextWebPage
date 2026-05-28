'use client'

import { useT } from '@/i18n/LanguageProvider'

export default function MarqueeQuotes() {
  const t = useT()
  const quotes = t.brand.quotes
  const loop = [...quotes, ...quotes]

  return (
    <section className="relative py-12 border-y border-white/[0.05] bg-white/[0.01] overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none mask-fade-y"
      />
      <div className="flex gap-16 whitespace-nowrap animate-[marquee_55s_linear_infinite]">
        {loop.map((q, i) => (
          <span
            key={i}
            className="editorial text-[18px] sm:text-[22px] text-fog-300 inline-flex items-center gap-16"
          >
            {q}
            <span aria-hidden className="text-accent text-2xl">·</span>
          </span>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}
