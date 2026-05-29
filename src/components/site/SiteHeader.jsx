'use client'

import { useEffect, useRef, useState } from 'react'
import { Menu, X, ChevronDown, ArrowUpRight } from 'lucide-react'
import Logo from './Logo'
import LanguageToggle from './LanguageToggle'
import { useT } from '@/i18n/LanguageProvider'

// fintech is the only service with its own page (for now). Others link
// back to the homepage anchor until their dedicated routes are built.
const SERVICE_HREF = (slug) =>
  slug === 'fintech' ? '/services/fintech' : '/#services'

const links = [
  { id: 'system',  key: 'work' },
  { id: 'process', key: 'process' },
  { id: 'contact', key: 'contact' },
]

export default function SiteHeader() {
  const t = useT()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const closeTimer = useRef(null)
  const servicesItems = t.servicesNav?.items || []

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

  // Hover intent — keep dropdown open briefly so cursor can travel between
  // trigger and menu without it disappearing
  const onTriggerEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setServicesOpen(true)
  }
  const onTriggerLeave = () => {
    closeTimer.current = setTimeout(() => setServicesOpen(false), 140)
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-white/[0.06] bg-ink-900/70 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="container-shell flex h-16 items-center justify-between gap-6">
        <a href="/" className="shrink-0">
          <Logo />
        </a>

        <nav className="hidden lg:flex items-center gap-1">
          {/* Services dropdown trigger */}
          <div
            className="relative"
            onMouseEnter={onTriggerEnter}
            onMouseLeave={onTriggerLeave}
          >
            <button
              type="button"
              className="px-3 py-2 text-sm text-fog-300 hover:text-fog-50 transition-colors flex items-center gap-1"
              aria-haspopup="true"
              aria-expanded={servicesOpen}
            >
              {t.servicesNav?.label || 'Services'}
              <ChevronDown
                size={13}
                className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Mega menu */}
            {servicesOpen && (
              <div
                className="absolute left-0 top-full pt-2 z-50"
                style={{ minWidth: 720 }}
              >
                <div
                  className="rounded-xl border border-white/[0.07] bg-ink-900/95 backdrop-blur-xl p-5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)]"
                >
                  <div className="flex items-baseline justify-between mb-4 px-1">
                    <p className="mono-label text-fog-500 text-[10px] tracking-[0.22em]">
                      {'// services · 10'}
                    </p>
                    <p className="text-fog-400 text-[12px] max-w-md text-right">
                      {t.servicesNav?.description}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    {servicesItems.map((it) => (
                      <a
                        key={it.slug}
                        href={SERVICE_HREF(it.slug)}
                        onClick={() => setServicesOpen(false)}
                        className="group flex items-start gap-3 rounded-lg px-3 py-2.5 hover:bg-white/[0.04] transition-colors"
                      >
                        <span className="mono-label text-fog-600 text-[10px] tracking-[0.18em] mt-0.5 w-6 shrink-0">
                          {String(servicesItems.indexOf(it) + 1).padStart(2, '0')}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <p className="text-fog-50 text-[13.5px] font-medium leading-tight truncate">
                              {it.name}
                            </p>
                            {it.slug === 'fintech' && (
                              <span className="mono-label text-[9px] tracking-[0.14em] px-1.5 py-0.5 rounded-full bg-accent/10 border border-accent/30 text-accent">
                                LIVE
                              </span>
                            )}
                          </div>
                          <p className="mono-label text-fog-500 text-[10px] tracking-[0.12em] mt-0.5 truncate">
                            {it.meta}
                          </p>
                        </div>
                        <ArrowUpRight
                          size={12}
                          className="text-fog-600 group-hover:text-accent transition-colors mt-1 shrink-0"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {links.map((l) => (
            <a
              key={l.id}
              href={`/#${l.id}`}
              className="px-3 py-2 text-sm text-fog-300 hover:text-fog-50 transition-colors"
            >
              {t.nav[l.key]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageToggle />
          <a href="/#contact" className="hidden sm:inline-flex btn-primary text-sm py-2 px-3.5">
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

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-white/[0.06] bg-ink-900/95 backdrop-blur-xl max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="container-shell py-6 flex flex-col gap-1">
            {/* Services accordion */}
            <button
              type="button"
              onClick={() => setMobileServicesOpen((v) => !v)}
              className="py-3 text-base text-fog-100 border-b border-white/5 flex items-center justify-between"
              aria-expanded={mobileServicesOpen}
            >
              <span>{t.servicesNav?.label || 'Services'}</span>
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {mobileServicesOpen && (
              <div className="flex flex-col gap-px py-2 border-b border-white/5">
                {servicesItems.map((it) => (
                  <a
                    key={it.slug}
                    href={SERVICE_HREF(it.slug)}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg hover:bg-white/[0.03]"
                  >
                    <div className="min-w-0">
                      <p className="text-fog-100 text-[14px] font-medium truncate">
                        {it.name}
                      </p>
                      <p className="mono-label text-fog-500 text-[10px] tracking-[0.12em] mt-0.5 truncate">
                        {it.meta}
                      </p>
                    </div>
                    {it.slug === 'fintech' && (
                      <span className="mono-label text-[9px] tracking-[0.14em] px-1.5 py-0.5 rounded-full bg-accent/10 border border-accent/30 text-accent shrink-0">
                        LIVE
                      </span>
                    )}
                  </a>
                ))}
              </div>
            )}

            {links.map((l) => (
              <a
                key={l.id}
                href={`/#${l.id}`}
                onClick={() => setOpen(false)}
                className="py-3 text-base text-fog-100 border-b border-white/5"
              >
                {t.nav[l.key]}
              </a>
            ))}
            <a href="/#contact" onClick={() => setOpen(false)} className="btn-primary mt-4 justify-center">
              {t.nav.cta}
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
