import AuthProvider from '@/providers/authProvider'
import './globals.css'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata = {
  title: 'Era Digital Solutions',
  description: 'The best blog app!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}><AuthProvider>{children}</AuthProvider></body>
    </html>
  )
}
