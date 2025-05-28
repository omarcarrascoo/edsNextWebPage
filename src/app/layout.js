import './globals.css'
import { Montserrat } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react';

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata = {
  title: 'Software Development Company | ERA DIGITAL SOLUTIONS',
  description: ' Era Digital Solutions transforms Ideas into Digital Innovations.Specializing in bespoke software, web and mobile development with a focus in audience analytics and data-driven insights, we land your business into the digital era.',
  keywords: 'Bespoke Software Development, Web Development, Mobile App Development, Digital Innovation, Audience Analytics, Data-Driven Insights, Creative Coding Studio, Digital Solutions Provider, Custom Software Solutions, Digital Transformation, Software Engineering, Innovative Technology Solutions, Digital Era Solutions, Technology Consultancy, Digital Strategy, Web Analytics, Mobile Application Design, User Experience (UX), UI Design, Technology Innovation'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
