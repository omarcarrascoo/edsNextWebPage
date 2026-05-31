'use client'

import Logo from './Logo'
import { useT } from '@/i18n/LanguageProvider'
import {
  Mail, MessageCircle, MapPin, Github, Linkedin,
  ArrowUpRight,
} from 'lucide-react'

const LIVE_SERVICES = new Set(['fintech', 'mobile', 'backend', 'ecommerce'])
const SERVICE_HREF = (slug) =>
  LIVE_SERVICES.has(slug) ? `/services/${slug}` : '/#services'
const isLive = (slug) => LIVE_SERVICES.has(slug)

export default function SiteFooter() {
  const t = useT()
  const services = t.servicesNav?.items || []

  return (
    <footer className="relative mt-20 border-t border-white/[0.06] bg-[#05080C]">
      {/* top accent line */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      {/* faint grid backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent 80%)',
        }}
      />

      <div className="container-shell relative py-16 sm:py-20">
        {/* TOP — brand statement */}
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-10 lg:gap-16 pb-12 border-b border-white/[0.06]">
          <div className="space-y-6">
            <Logo />
            <p
              className="text-fog-100 text-pretty max-w-xl"
              style={{ fontSize: 'clamp(18px, 2vw, 26px)', lineHeight: 1.3, letterSpacing: '-0.01em' }}
            >
              {t.footer.tagline}
            </p>
            <div className="flex items-center gap-2 pt-2">
              <a
                aria-label="LinkedIn"
                href="#"
                className="inline-flex w-9 h-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] text-fog-300 hover:text-fog-50 hover:bg-white/[0.06] hover:border-accent/30 transition"
              >
                <Linkedin size={15} />
              </a>
              <a
                aria-label="GitHub"
                href="#"
                className="inline-flex w-9 h-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] text-fog-300 hover:text-fog-50 hover:bg-white/[0.06] hover:border-accent/30 transition"
              >
                <Github size={15} />
              </a>
            </div>
          </div>

          {/* Big CTA on the right */}
          <div className="flex flex-col justify-center lg:items-end gap-4">
            <p className="mono-label text-fog-500 text-[10px] tracking-[0.22em]">
              // hablemos
            </p>
            <a
              href="mailto:omar.carrasco.aranda@gmail.com"
              className="group flex items-center gap-2 font-display font-semibold text-fog-50 hover:text-accent transition-colors text-pretty"
              style={{ fontSize: 'clamp(20px, 2.4vw, 32px)', letterSpacing: '-0.02em' }}
            >
              omar.carrasco.aranda@gmail.com
              <ArrowUpRight size={18} className="text-fog-500 group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
            </a>
            <a
              href="/#contact"
              className="btn-primary mt-2"
            >
              Iniciar proyecto
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>

        {/* MIDDLE — link columns */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 py-12 border-b border-white/[0.06]">
          {/* Services */}
          <div className="col-span-2 lg:col-span-1">
            <h4 className="mono-label text-accent text-[10px] tracking-[0.22em] mb-5">
              {t.footer.sectionsTitle}
            </h4>
            <ul className="grid grid-cols-2 lg:grid-cols-1 gap-x-6 gap-y-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <a
                    href={SERVICE_HREF(s.slug)}
                    className="group inline-flex items-center gap-1.5 text-[13.5px] text-fog-200 hover:text-accent transition-colors"
                  >
                    <span>{s.name}</span>
                    {isLive(s.slug) && (
                      <span className="mono-label text-[8.5px] tracking-[0.14em] px-1.5 py-0.5 rounded-full bg-accent/10 border border-accent/30 text-accent">
                        LIVE
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mono-label text-accent text-[10px] tracking-[0.22em] mb-5">
              {t.footer.companyTitle}
            </h4>
            <ul className="space-y-2.5">
              {(t.footer.company || []).map((c) => (
                <li key={c.label}>
                  <a href={c.href} className="text-[13.5px] text-fog-200 hover:text-accent transition-colors">
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mono-label text-accent text-[10px] tracking-[0.22em] mb-5">
              {t.footer.contactTitle}
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:omar.carrasco.aranda@gmail.com"
                  className="group inline-flex items-start gap-2 text-[13.5px] text-fog-200 hover:text-accent transition-colors"
                >
                  <Mail size={13} className="mt-1 text-fog-500 group-hover:text-accent transition-colors shrink-0" />
                  <span className="break-all">omar.carrasco.aranda@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/"
                  className="group inline-flex items-start gap-2 text-[13.5px] text-fog-200 hover:text-accent transition-colors"
                >
                  <MessageCircle size={13} className="mt-1 text-fog-500 group-hover:text-accent transition-colors shrink-0" />
                  <span>WhatsApp</span>
                </a>
              </li>
              <li className="inline-flex items-start gap-2 text-[13.5px] text-fog-300">
                <MapPin size={13} className="mt-1 text-fog-500 shrink-0" />
                <span>{t.footer.location || 'Remoto · México · LATAM'}</span>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mono-label text-accent text-[10px] tracking-[0.22em] mb-5">
              {t.footer.legalTitle || 'Legal'}
            </h4>
            <ul className="space-y-2.5">
              {(t.footer.legal || []).map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-[13.5px] text-fog-200 hover:text-accent transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* BOTTOM — copyright + status */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <p className="text-[12px] text-fog-400">
              © {new Date().getFullYear()} Era Digital Solutions. {t.footer.rights}
            </p>
            <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-fog-600" />
            <p className="mono-label text-fog-500 text-[10px] tracking-[0.22em]">
              EST · 2019
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="status-dot active" />
            <p className="mono-label text-fog-400 text-[10px] tracking-[0.22em]">
              {t.footer.builtWith}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
