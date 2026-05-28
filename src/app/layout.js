import './globals.css'
import { Inter, Inter_Tight, JetBrains_Mono, Instrument_Serif } from 'next/font/google'
import { LanguageProvider } from '@/i18n/LanguageProvider'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const display = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const editorial = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-editorial',
  display: 'swap',
  weight: '400',
})

export const metadata = {
  metadataBase: new URL('https://eradigitalsolutions.com'),
  title: {
    default: 'Era Digital Solutions | Software, IA y automatización para empresas',
    template: '%s | Era Digital Solutions',
  },
  description:
    'Desarrollamos software a la medida, aplicaciones web, apps móviles, dashboards, ecommerce, infraestructura backend, automatizaciones con IA, soluciones fintech y seguridad informática para empresas que quieren operar mejor.',
  keywords: [
    'desarrollo de software a la medida',
    'desarrollo de aplicaciones web',
    'desarrollo de apps móviles',
    'automatización con inteligencia artificial',
    'agentes de IA para empresas',
    'desarrollo de dashboards empresariales',
    'infraestructura backend',
    'desarrollo de APIs',
    'ecommerce a la medida',
    'sistemas POS',
    'software para paquetería',
    'software para logística',
    'soluciones fintech',
    'seguridad informática para empresas',
    'auditoría de aplicaciones web',
    'transformación digital para empresas',
    'sistemas internos para empresas',
  ],
  authors: [{ name: 'Era Digital Solutions' }],
  creator: 'Era Digital Solutions',
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    alternateLocale: 'en_US',
    url: 'https://eradigitalsolutions.com',
    siteName: 'Era Digital Solutions',
    title: 'Era Digital Solutions | Software, IA y automatización para empresas',
    description:
      'Software a la medida, IA e infraestructura para empresas que ya no quieren operar en modo manual.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Era Digital Solutions | Software, IA y automatización',
    description:
      'Software a la medida, IA e infraestructura para empresas que ya no quieren operar en modo manual.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport = {
  themeColor: '#070A0F',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${inter.variable} ${display.variable} ${mono.variable} ${editorial.variable}`}>
      <body className="font-sans antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
