import { createI18n } from 'vue-i18n'
import type { Locale } from '../types/character'
import en from './en.json'
import de from './de.json'
import ja from './ja.json'
import fr from './fr.json'
import ptBR from './pt-BR.json'
import it from './it.json'

const STORAGE_KEY = 'sailormoondle-lang'
const SUPPORTED: Locale[] = ['en', 'de', 'ja', 'fr', 'pt-BR', 'it']

function detectLocale(): Locale {
  const stored = localStorage.getItem(STORAGE_KEY) as Locale | null
  if (stored && SUPPORTED.includes(stored)) return stored

  const browser = navigator.language || navigator.languages?.[0] || 'en'
  const code = browser.toLowerCase()

  if (code.startsWith('de')) return 'de'
  if (code.startsWith('ja')) return 'ja'
  if (code.startsWith('fr')) return 'fr'
  if (code === 'pt-br' || code.startsWith('pt')) return 'pt-BR'
  if (code.startsWith('it')) return 'it'
  return 'en'
}

export const i18n = createI18n({
  legacy: false,
  locale: detectLocale(),
  fallbackLocale: 'en',
  messages: {
    en,
    de,
    ja,
    fr,
    'pt-BR': ptBR,
    it,
  },
})

export function setLocale(locale: Locale) {
  i18n.global.locale.value = locale
  localStorage.setItem(STORAGE_KEY, locale)
}

export { SUPPORTED }
