"use client"

import Link from "next/link"
import { useState } from "react"
import { useI18n } from "@/lib/i18n/context"
import { MailIcon, CheckIcon, ShieldIcon, SparklesIcon, GlobeIcon, BellIcon } from "@/components/ui/icons"
import { buildCompensairUrl, buildEktaUrl } from "@/lib/apis/partners"

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
    <footer className="relative border-t border-border bg-gradient-to-b from-muted/20 via-background to-muted/40 overflow-hidden">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -top-32 -left-20 w-80 h-80 rounded-full bg-primary/10 blur-3xl animate-blob" />
        <div className="absolute -bottom-20 right-0 w-96 h-96 rounded-full bg-[#F08C3D]/10 blur-3xl animate-blob" style={{ animationDelay: "4s" }} />
      </div>

      {/* Newsletter strip */}
      <div className="relative container mx-auto px-4 pt-16 pb-10">
        <div className="reveal max-w-3xl mx-auto rounded-3xl bg-gradient-to-br from-[#05203c] to-[#0a3d6e] p-8 md:p-10 text-center text-white shadow-premium-lg overflow-hidden relative">
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-3 py-1.5 rounded-full text-xs font-semibold mb-4 border border-white/10">
              <BellIcon className="h-3.5 w-3.5 text-[#F08C3D]" />
              Nie wieder Deals verpassen
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-2 tracking-tight">
              Die besten Reise-Deals direkt in dein Postfach
            </h3>
            <p className="text-white/70 text-sm md:text-base mb-6 max-w-xl mx-auto">
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
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder:text-white/40 outline-none focus:bg-white/15 focus:border-white/30 transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={subscribed}
                className="px-6 py-3 rounded-xl bg-[#F08C3D] hover:bg-[#F08C3D]/90 text-white font-semibold transition-all hover:scale-105 active:scale-100 disabled:opacity-70 disabled:hover:scale-100 cursor-pointer flex items-center justify-center gap-2 min-w-[140px]"
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
            <p className="text-xs text-white/40 mt-3">
              Jederzeit kündbar. Wir respektieren deine Privatsphäre.
            </p>
          </div>
        </div>
      </div>

      {/* Trust badges */}
      <div className="relative container mx-auto px-4 py-8 border-y border-border/50">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { icon: SparklesIcon, label: "1.2M+ Preise täglich" },
            { icon: ShieldIcon, label: "SSL-verschlüsselt" },
            { icon: GlobeIcon, label: "500+ Airlines" },
            { icon: CheckIcon, label: "Bestpreis-Garantie" },
          ].map((item, i) => (
            <div key={i} className="reveal flex items-center gap-3 text-sm" style={{ transitionDelay: `${i * 80}ms` }}>
              <span className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <item.icon className="h-4 w-4" />
              </span>
              <span className="text-muted-foreground font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main grid */}
      <div className="relative container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group w-fit">
              <img src="/trivoralogo.png" alt="Tripora24" className="h-10 w-10 object-contain transition-transform duration-500 group-hover:rotate-12" />
              <span className="text-xl font-bold">Tripora<span className="text-[#F08C3D]">24</span></span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">{t("footer.description")}</p>
            <div className="flex items-center gap-2 pt-2">
              <a
                href="mailto:contact@tripora24.com"
                className="w-9 h-9 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all flex items-center justify-center hover:scale-110"
                aria-label="Email"
              >
                <MailIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-foreground/80">{t("footer.search")}</h4>
            <div className="flex flex-col gap-2.5 text-sm text-muted-foreground">
              {[
                { href: "/fluege", label: t("nav.flights") },
                { href: "/hotels", label: t("nav.hotels") },
                { href: "/mietwagen", label: t("nav.carRental") },
                { href: "/aktivitaeten", label: "Aktivitäten" },
                { href: "/pauschalreisen", label: t("nav.packages") },
                { href: "/deals", label: t("nav.deals") },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-foreground hover:translate-x-0.5 transition-all w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-foreground/80">{t("footer.popularDest")}</h4>
            <div className="flex flex-col gap-2.5 text-sm text-muted-foreground">
              {[
                { href: "/fluege?from=DE&to=PMI", label: "Mallorca" },
                { href: "/fluege?from=DE&to=AYT", label: "Antalya" },
                { href: "/fluege?from=DE&to=HER", label: "Kreta" },
                { href: "/fluege?from=DE&to=BCN", label: "Barcelona" },
                { href: "/fluege?from=DE&to=LIS", label: "Lissabon" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-foreground hover:translate-x-0.5 transition-all w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-foreground/80">{t("footer.about")}</h4>
            <div className="flex flex-col gap-2.5 text-sm text-muted-foreground">
              <Link href="/blog" className="hover:text-foreground hover:translate-x-0.5 transition-all w-fit">{t("common.blog")}</Link>
              <Link href="/alerts" className="hover:text-foreground hover:translate-x-0.5 transition-all w-fit">{t("nav.priceAlerts")}</Link>
              <a
                href={buildCompensairUrl()}
                target="_blank"
                rel="noopener sponsored nofollow"
                className="hover:text-foreground hover:translate-x-0.5 transition-all w-fit"
              >
                Flug-Entschädigung
              </a>
              <a
                href={buildEktaUrl()}
                target="_blank"
                rel="noopener sponsored nofollow"
                className="hover:text-foreground hover:translate-x-0.5 transition-all w-fit"
              >
                Reiseversicherung
              </a>
              <Link href="/impressum" className="hover:text-foreground hover:translate-x-0.5 transition-all w-fit">{t("footer.imprint")}</Link>
              <Link href="/datenschutz" className="hover:text-foreground hover:translate-x-0.5 transition-all w-fit">{t("footer.privacy")}</Link>
              <a href="mailto:contact@tripora24.com" className="hover:text-foreground hover:translate-x-0.5 transition-all w-fit">{t("footer.contact")}</a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Tripora24. {t("footer.copyright")}</p>
          <p className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse-soft" />
            <span>Live • Echtzeit-Preise</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
