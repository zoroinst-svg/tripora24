"use client"

import Link from "next/link"
import { useState } from "react"
import { useI18n } from "@/lib/i18n/context"
import { MailIcon, CheckIcon } from "@/components/ui/icons"
import { buildAirHelpUrl, buildEktaUrl } from "@/lib/apis/partners"

export function Footer() {
  const { t } = useI18n()
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubscribed(true)
    setEmail("")
    setTimeout(() => setSubscribed(false), 4000)
  }

  return (
    <footer className="border-t bg-muted/30">
      {/* Newsletter strip */}
      <div className="container mx-auto px-4 pt-12 pb-8">
        <div className="max-w-2xl mx-auto rounded-2xl bg-[#05203c] p-7 md:p-9 text-center text-white">
          <h3 className="text-xl md:text-2xl font-bold mb-2">
            Die besten Reise-Deals direkt in dein Postfach
          </h3>
          <p className="text-white/70 text-sm mb-5 max-w-lg mx-auto">
            Wöchentlich kuratierte Angebote — nur die echten Schnäppchen, kein Spam.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <div className="relative flex-1">
              <MailIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="deine@email.de"
                className="w-full pl-11 pr-4 py-3 rounded-lg bg-white/10 border border-white/15 text-white placeholder:text-white/40 outline-none focus:bg-white/15 focus:border-white/30 transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={subscribed}
              className="px-6 py-3 rounded-lg bg-white text-[#05203c] font-semibold hover:bg-blue-50 transition-colors disabled:opacity-70 cursor-pointer flex items-center justify-center gap-2 min-w-[140px]"
            >
              {subscribed ? (
                <>
                  <CheckIcon className="h-4 w-4" /> Eingetragen
                </>
              ) : (
                "Abonnieren"
              )}
            </button>
          </form>
          <p className="text-xs text-white/40 mt-3">Jederzeit kündbar.</p>
        </div>
      </div>

      {/* Main grid */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 space-y-3">
            <Link href="/" className="flex items-center gap-2.5 w-fit">
              <img src="/trivoralogo.png" alt="Tripora24" className="h-9 w-9 object-contain" />
              <span className="text-lg font-bold">Tripora<span className="text-[#F08C3D]">24</span></span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">{t("footer.description")}</p>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-sm">{t("footer.search")}</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link href="/fluege" className="hover:text-foreground transition-colors">{t("nav.flights")}</Link>
              <Link href="/hotels" className="hover:text-foreground transition-colors">{t("nav.hotels")}</Link>
              <Link href="/mietwagen" className="hover:text-foreground transition-colors">{t("nav.carRental")}</Link>
              <Link href="/aktivitaeten" className="hover:text-foreground transition-colors">Aktivitäten</Link>
              <Link href="/pauschalreisen" className="hover:text-foreground transition-colors">{t("nav.packages")}</Link>
              <Link href="/deals" className="hover:text-foreground transition-colors">{t("nav.deals")}</Link>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-sm">{t("footer.popularDest")}</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link href="/fluege?from=DE&to=PMI" className="hover:text-foreground transition-colors">Mallorca</Link>
              <Link href="/fluege?from=DE&to=AYT" className="hover:text-foreground transition-colors">Antalya</Link>
              <Link href="/fluege?from=DE&to=HER" className="hover:text-foreground transition-colors">Kreta</Link>
              <Link href="/fluege?from=DE&to=BCN" className="hover:text-foreground transition-colors">Barcelona</Link>
              <Link href="/fluege?from=DE&to=LIS" className="hover:text-foreground transition-colors">Lissabon</Link>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-sm">{t("footer.about")}</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link href="/blog" className="hover:text-foreground transition-colors">{t("common.blog")}</Link>
              <Link href="/alerts" className="hover:text-foreground transition-colors">{t("nav.priceAlerts")}</Link>
              <a href={buildAirHelpUrl()} target="_blank" rel="noopener sponsored nofollow" className="hover:text-foreground transition-colors">Flug-Entschädigung</a>
              <a href={buildEktaUrl()} target="_blank" rel="noopener sponsored nofollow" className="hover:text-foreground transition-colors">Reiseversicherung</a>
              <Link href="/impressum" className="hover:text-foreground transition-colors">{t("footer.imprint")}</Link>
              <Link href="/datenschutz" className="hover:text-foreground transition-colors">{t("footer.privacy")}</Link>
              <a href="mailto:contact@tripora24.com" className="hover:text-foreground transition-colors">{t("footer.contact")}</a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t text-center text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Tripora24. {t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  )
}
