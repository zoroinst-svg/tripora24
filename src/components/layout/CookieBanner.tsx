"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { CookieIcon } from "@/components/ui/icons"

export function CookieBanner() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) setShow(true)
  }, [])

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setShow(false)
  }

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined")
    setShow(false)
  }

  if (!show) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <Card className="max-w-2xl mx-auto p-4 md:p-5 shadow-2xl border bg-background flex flex-col md:flex-row items-start md:items-center gap-4">
        <CookieIcon className="h-8 w-8 text-primary shrink-0 hidden md:block" />
        <div className="flex-1">
          <p className="text-sm">
            Wir verwenden Cookies und Affiliate-Links um dir die besten Deals zu zeigen. Mit &quot;Akzeptieren&quot; stimmst du unserer{" "}
            <Link href="/datenschutz" className="text-primary underline">Datenschutzerklärung</Link> zu.
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <Button variant="outline" size="sm" onClick={decline}>Ablehnen</Button>
          <Button size="sm" onClick={accept}>Akzeptieren</Button>
        </div>
      </Card>
    </div>
  )
}
