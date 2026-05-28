'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import Logo from './Logo'
import LanguageToggle from './LanguageToggle'
import { useT } from '@/i18n/LanguageProvider'

const links = [
  { id: 'services', key: 'services' },
  { id: 'system', key: 'work' },
  { id: 'process', key: 'process' },
  { id: 'contact', key: 'contact' },
]

export default function SiteHeader() {
  const t = useT()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-white/[0.06] bg-ink-900/70 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="container-shell flex h-16 items-center justify-between gap-6">
        <a href="#top" className="shrink-0">
          <Logo />
        </a>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="px-3 py-2 text-sm text-fog-300 hover:text-fog-50 transition-colors"
            >
              {t.nav[l.key]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageToggle />
          <a href="#contact" className="hidden sm:inline-flex btn-primary text-sm py-2 px-3.5">
            {t.nav.cta}
          </a>
          <button
            type="button"
            aria-label="Menu"
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-white/10 bg-white/[0.02] text-fog-100 hover:bg-white/[0.05] transition"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-white/[0.06] bg-ink-900/95 backdrop-blur-xl">
          <div className="container-shell py-6 flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                className="py-3 text-base text-fog-100 border-b border-white/5"
              >
                {t.nav[l.key]}
              </a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="btn-primary mt-4 justify-center">
              {t.nav.cta}
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
