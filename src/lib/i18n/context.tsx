"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import de from "../../../messages/de.json"
import en from "../../../messages/en.json"
import es from "../../../messages/es.json"
import fr from "../../../messages/fr.json"

const messages: Record<string, any> = { de, en, es, fr }

export const LOCALES = [
  { code: "de", label: "Deutsch", short: "DE" },
  { code: "en", label: "English", short: "EN" },
  { code: "es", label: "Español", short: "ES" },
  { code: "fr", label: "Français", short: "FR" },
]

export const CURRENCIES = [
  { code: "EUR", symbol: "€", label: "Euro" },
  { code: "USD", symbol: "$", label: "US Dollar" },
  { code: "GBP", symbol: "£", label: "British Pound" },
  { code: "CHF", symbol: "CHF", label: "Swiss Franc" },
]

interface I18nContextType {
  locale: string
  setLocale: (l: string) => void
  currency: string
  setCurrency: (c: string) => void
  t: (key: string, params?: Record<string, string | number>) => string
  currencySymbol: string
}

const I18nContext = createContext<I18nContextType>({
  locale: "de",
  setLocale: () => {},
  currency: "EUR",
  setCurrency: () => {},
  t: (key) => key,
  currencySymbol: "€",
})

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState("de")
  const [currency, setCurrencyState] = useState("EUR")

  useEffect(() => {
    const saved = localStorage.getItem("tripora-locale")
    if (saved && messages[saved]) setLocaleState(saved)
    const savedCur = localStorage.getItem("tripora-currency")
    if (savedCur) setCurrencyState(savedCur)
  }, [])

  const setLocale = (l: string) => {
    setLocaleState(l)
    localStorage.setItem("tripora-locale", l)
  }

  const setCurrency = (c: string) => {
    setCurrencyState(c)
    localStorage.setItem("tripora-currency", c)
  }

  // Get nested value from message object by dot-separated key
  const t = (key: string, params?: Record<string, string | number>): string => {
    const keys = key.split(".")
    let value: any = messages[locale]
    for (const k of keys) {
      value = value?.[k]
      if (value === undefined) {
        // Fallback to German
        let fallback: any = messages["de"]
        for (const fk of keys) fallback = fallback?.[fk]
        value = fallback
        break
      }
    }
    if (typeof value !== "string") return key

    // Replace {param} placeholders
    if (params) {
      return value.replace(/\{(\w+)\}/g, (_, name) => String(params[name] ?? `{${name}}`))
    }
    return value
  }

  const currencySymbol = CURRENCIES.find((c) => c.code === currency)?.symbol || "€"

  return (
    <I18nContext.Provider value={{ locale, setLocale, currency, setCurrency, t, currencySymbol }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  return useContext(I18nContext)
}
