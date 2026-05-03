"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CookieIcon } from "@/components/ui/icons"

export function CookieBanner() {
  const [show, setShow] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      // Slight delay so it animates in after page mount
      const t = setTimeout(() => { setShow(true); setMounted(true) }, 600)
      return () => clearTimeout(t)
    }
  }, [])

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setMounted(false)
    setTimeout(() => setShow(false), 300)
  }

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined")
    setMounted(false)
    setTimeout(() => setShow(false), 300)
  }

  if (!show) return null

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 transition-all duration-300 ${
        mounted ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      <div className="max-w-2xl mx-auto p-4 md:p-5 rounded-2xl border bg-background/95 backdrop-blur-xl shadow-premium-lg flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="hidden md:flex w-12 h-12 rounded-xl bg-primary/10 text-primary items-center justify-center shrink-0">
          <CookieIcon className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <p className="text-sm leading-relaxed">
            Wir verwenden Cookies und Affiliate-Links um dir die besten Deals zu zeigen. Mit &quot;Akzeptieren&quot; stimmst du unserer{" "}
            <Link href="/datenschutz" className="text-primary underline-offset-2 hover:underline font-medium">
              Datenschutzerklärung
            </Link>{" "}
            zu.
          </p>
        </div>
        <div className="flex gap-2 shrink-0 w-full md:w-auto">
          <Button variant="outline" size="sm" onClick={decline} className="flex-1 md:flex-none">Ablehnen</Button>
          <Button size="sm" onClick={accept} className="flex-1 md:flex-none">Akzeptieren</Button>
        </div>
      </div>
    </div>
  )
}
