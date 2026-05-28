'use client'

import { useLanguage } from '@/i18n/LanguageProvider'

export default function LanguageToggle({ compact = false }) {
  const { lang, setLang } = useLanguage()

  return (
    <div
      role="group"
      aria-label="Language"
      className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.02] p-0.5 backdrop-blur"
    >
      {['es', 'en'].map((code) => {
        const active = lang === code
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            className={`px-2.5 ${compact ? 'py-1 text-[11px]' : 'py-1 text-[12px]'} rounded-full font-medium tracking-[0.12em] uppercase transition-colors ${
              active
                ? 'bg-accent text-ink-900'
                : 'text-fog-300 hover:text-fog-50'
            }`}
          >
            {code}
          </button>
        )
      })}
    </div>
  )
}
