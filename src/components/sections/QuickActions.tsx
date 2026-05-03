"use client"

import Link from "next/link"
import { HotelIcon, CarIcon, PackageIcon, GlobeIcon, ArrowRightIcon } from "@/components/ui/icons"
import { useI18n } from "@/lib/i18n/context"

export function QuickActions() {
  const { t } = useI18n()

  const ACTIONS = [
    { href: "/hotels", label: t("quickActions.hotels"), icon: HotelIcon, hint: "2M+ Hotels" },
    { href: "/mietwagen", label: t("quickActions.carRental"), icon: CarIcon, hint: "900+ Anbieter" },
    { href: "/aktivitaeten", label: t("quickActions.activities"), icon: GlobeIcon, hint: "Touren & Tickets" },
    { href: "/pauschalreisen", label: t("quickActions.packages"), icon: PackageIcon, hint: "Flug + Hotel" },
  ]

  return (
    <section className="py-8 md:py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {ACTIONS.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="group flex items-center gap-3 rounded-xl bg-card border border-border px-4 py-4 hover:border-foreground/20 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                <action.icon className="h-5 w-5 text-foreground/70" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-sm leading-tight truncate">{action.label}</div>
                <div className="text-xs text-muted-foreground mt-0.5 truncate">{action.hint}</div>
              </div>
              <ArrowRightIcon className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 hidden sm:block" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
