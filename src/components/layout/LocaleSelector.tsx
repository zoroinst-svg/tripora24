"use client"

import { useState, useRef, useEffect } from "react"
import { useI18n, LOCALES, CURRENCIES } from "@/lib/i18n/context"
import { GlobeIcon, CheckIcon } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"

export function LocaleSelector() {
  const { locale, setLocale, currency, setCurrency } = useI18n()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const currentLocale = LOCALES.find((l) => l.code === locale)

  return (
    <div ref={ref} className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setOpen(!open)}
        className="text-white/80 hover:text-white hover:bg-white/10 gap-1.5"
      >
        <GlobeIcon className="h-4 w-4" />
        <span className="text-xs font-semibold">{currentLocale?.short}</span>
      </Button>

      {open && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-background text-foreground rounded-xl border shadow-xl z-50 overflow-hidden">
          {/* Language */}
          <div className="p-3 border-b">
            <div className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">
              {locale === "de" ? "Sprache" : locale === "en" ? "Language" : locale === "es" ? "Idioma" : "Langue"}
            </div>
            <div className="space-y-1">
              {LOCALES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => { setLocale(l.code); setOpen(false) }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm cursor-pointer transition-colors ${
                    locale === l.code ? "bg-primary/10 text-primary font-semibold" : "hover:bg-muted"
                  }`}
                >
                  <span>{l.label}</span>
                  {locale === l.code && <CheckIcon className="h-4 w-4" />}
                </button>
              ))}
            </div>
          </div>

          {/* Currency */}
          <div className="p-3">
            <div className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">
              {locale === "de" ? "Währung" : locale === "en" ? "Currency" : locale === "es" ? "Moneda" : "Devise"}
            </div>
            <div className="space-y-1">
              {CURRENCIES.map((c) => (
                <button
                  key={c.code}
                  onClick={() => { setCurrency(c.code); setOpen(false) }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm cursor-pointer transition-colors ${
                    currency === c.code ? "bg-primary/10 text-primary font-semibold" : "hover:bg-muted"
                  }`}
                >
                  <span>{c.symbol} {c.label}</span>
                  {currency === c.code && <CheckIcon className="h-4 w-4" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
