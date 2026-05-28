'use client'

import dynamic from 'next/dynamic'
import { useT } from '@/i18n/LanguageProvider'
import { ScrollProvider } from './StoryConstellation'

const StoryConstellation = dynamic(() => import('./StoryConstellation'), {
  ssr: false,
  loading: () => null,
})

export default function StoryShell({ children }) {
  const t = useT()
  return (
    <ScrollProvider>
      <StoryConstellation modules={t.hero.modules} />
      {children}
    </ScrollProvider>
  )
}
