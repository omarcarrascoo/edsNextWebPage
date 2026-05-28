'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import es from './dictionaries/es'
import en from './dictionaries/en'

const dictionaries = { es, en }

const LanguageContext = createContext({
  lang: 'es',
  setLang: () => {},
  t: es,
})

const STORAGE_KEY = 'eds.lang'

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState('es')
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored === 'es' || stored === 'en') {
        setLangState(stored)
      }
    } catch {}
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(STORAGE_KEY, lang)
      document.documentElement.lang = lang
    } catch {}
  }, [lang, hydrated])

  const setLang = useCallback((value) => {
    if (value === 'es' || value === 'en') setLangState(value)
  }, [])

  const t = dictionaries[lang]

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}

export function useT() {
  return useContext(LanguageContext).t
}
