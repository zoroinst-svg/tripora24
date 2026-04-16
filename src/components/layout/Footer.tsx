"use client"

import Link from "next/link"
import { useI18n } from "@/lib/i18n/context"

export function Footer() {
  const { t } = useI18n()

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <img src="/trivoralogo.png" alt="Tripora24" className="h-9 w-9 object-contain" />
              <span className="text-lg font-bold">Tripora<span className="text-[#F08C3D]">24</span></span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">{t("footer.description")}</p>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-sm">{t("footer.search")}</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link href="/fluege" className="hover:text-foreground transition-colors">{t("nav.flights")}</Link>
              <Link href="/hotels" className="hover:text-foreground transition-colors">{t("nav.hotels")}</Link>
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
