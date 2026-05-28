'use client'

import Logo from './Logo'
import { useT } from '@/i18n/LanguageProvider'
import { Mail, MessageCircle, MapPin, Github, Linkedin } from 'lucide-react'

export default function SiteFooter() {
  const t = useT()
  const services = t.services.items

  return (
    <footer className="relative mt-16 border-t border-white/[0.06]">
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="container-shell py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="space-y-5">
            <Logo size={32} />
            <p className="text-fog-300 text-sm leading-relaxed max-w-xs">{t.footer.tagline}</p>
            <div className="flex items-center gap-2">
              <a
                aria-label="LinkedIn"
                href="#"
                className="inline-flex w-9 h-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] text-fog-300 hover:text-fog-50 hover:bg-white/[0.06] transition"
              >
                <Linkedin size={15} />
              </a>
              <a
                aria-label="GitHub"
                href="#"
                className="inline-flex w-9 h-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] text-fog-300 hover:text-fog-50 hover:bg-white/[0.06] transition"
              >
                <Github size={15} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mono-label text-fog-400 mb-4">{t.footer.sectionsTitle}</h4>
            <ul className="space-y-2.5">
              {services.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <a href="#services" className="text-sm text-fog-200 hover:text-accent transition-colors">
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mono-label text-fog-400 mb-4">{t.footer.companyTitle}</h4>
            <ul className="space-y-2.5">
              {t.footer.company.map((c) => (
                <li key={c.label}>
                  <a href={c.href} className="text-sm text-fog-200 hover:text-accent transition-colors">
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mono-label text-fog-400 mb-4">{t.footer.contactTitle}</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:contact@eradigitalsolutions.com" className="inline-flex items-start gap-2 text-sm text-fog-200 hover:text-accent transition-colors">
                  <Mail size={14} className="mt-0.5 text-fog-400" />
                  contact@eradigitalsolutions.com
                </a>
              </li>
              <li>
                <a href="https://wa.me/" className="inline-flex items-start gap-2 text-sm text-fog-200 hover:text-accent transition-colors">
                  <MessageCircle size={14} className="mt-0.5 text-fog-400" />
                  WhatsApp
                </a>
              </li>
              <li className="inline-flex items-start gap-2 text-sm text-fog-300">
                <MapPin size={14} className="mt-0.5 text-fog-400" />
                Remote · LATAM · MX
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-fog-400">
            © {new Date().getFullYear()} Era Digital Solutions. {t.footer.rights}
          </p>
          <p className="mono-label text-fog-400">{t.footer.builtWith}</p>
        </div>
      </div>
    </footer>
  )
}
