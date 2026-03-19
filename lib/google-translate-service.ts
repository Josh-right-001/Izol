// Google Translate API v3 Integration for Isolele Project
// Supports 8 languages: EN, FR, PT, ES, ZU, XH, SW, LN

const API_KEY = 'AIzaSyD2eG5aZJtokfzt_mERH0ArFvfXX3OkkW4'
const GOOGLE_TRANSLATE_API = 'https://translation.googleapis.com/language/translate/v2'

interface TranslationResponse {
  data: {
    translations: Array<{
      translatedText: string
    }>
  }
}

const languageMap: Record<string, string> = {
  en: 'en',
  fr: 'fr',
  pt: 'pt',
  es: 'es',
  zu: 'zu',
  xh: 'xh',
  sw: 'sw',
  ln: 'ln'
}

/**
 * Translate text using Google Translate API v3
 * @param text - Text to translate
 * @param targetLanguage - Target language code (en, fr, pt, es, zu, xh, sw, ln)
 * @returns Translated text or original text if translation fails
 */
export async function translateText(text: string, targetLanguage: string): Promise<string> {
  if (!text || targetLanguage === 'en') {
    return text
  }

  const langCode = languageMap[targetLanguage] || 'en'
  if (langCode === 'en') return text

  try {
    const response = await fetch(GOOGLE_TRANSLATE_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        target: langCode,
        key: API_KEY
      })
    })

    if (!response.ok) {
      console.error('[v0] Translation API error:', response.statusText)
      return text
    }

    const data: TranslationResponse = await response.json()
    return data.data.translations[0]?.translatedText || text
  } catch (error) {
    console.error('[v0] Translation failed:', error)
    return text
  }
}

/**
 * Translate multiple texts at once for better performance
 * @param texts - Array of texts to translate
 * @param targetLanguage - Target language code
 * @returns Array of translated texts
 */
export async function translateMultiple(texts: string[], targetLanguage: string): Promise<string[]> {
  if (!texts.length || targetLanguage === 'en') {
    return texts
  }

  const langCode = languageMap[targetLanguage] || 'en'
  if (langCode === 'en') return texts

  try {
    const response = await fetch(GOOGLE_TRANSLATE_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: texts,
        target: langCode,
        key: API_KEY
      })
    })

    if (!response.ok) {
      console.error('[v0] Batch translation API error:', response.statusText)
      return texts
    }

    const data: TranslationResponse = await response.json()
    return data.data.translations.map(t => t.translatedText) || texts
  } catch (error) {
    console.error('[v0] Batch translation failed:', error)
    return texts
  }
}

/**
 * Cache translations in localStorage to reduce API calls
 */
class TranslationCache {
  private cache: Map<string, string> = new Map()
  private storageKey = 'isolele_translations'

  constructor() {
    this.loadFromStorage()
  }

  private loadFromStorage() {
    try {
      const stored = localStorage.getItem(this.storageKey)
      if (stored) {
        const parsed = JSON.parse(stored)
        this.cache = new Map(parsed)
      }
    } catch (error) {
      console.error('[v0] Failed to load translation cache:', error)
    }
  }

  private saveToStorage() {
    try {
      const array = Array.from(this.cache.entries())
      localStorage.setItem(this.storageKey, JSON.stringify(array))
    } catch (error) {
      console.error('[v0] Failed to save translation cache:', error)
    }
  }

  get(key: string): string | null {
    return this.cache.get(key) || null
  }

  set(key: string, value: string) {
    this.cache.set(key, value)
    this.saveToStorage()
  }

  clear() {
    this.cache.clear()
    localStorage.removeItem(this.storageKey)
  }
}

export const translationCache = new TranslationCache()
