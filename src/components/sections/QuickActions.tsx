"use client"

import Link from "next/link"
import { HotelIcon, CarIcon, PackageIcon, GlobeIcon } from "@/components/ui/icons"
import { useI18n } from "@/lib/i18n/context"

export function QuickActions() {
  const { t } = useI18n()

  const ACTIONS = [
    { href: "/hotels", label: t("quickActions.hotels"), icon: HotelIcon },
    { href: "/fluege?from=DE", label: t("quickActions.carRental"), icon: CarIcon },
    { href: "/pauschalreisen", label: t("quickActions.packages"), icon: PackageIcon },
    { href: "/fluege?from=DE&to=EVERYWHERE", label: t("quickActions.explore"), icon: GlobeIcon },
  ]

  return (
    <section className="py-6 relative z-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {ACTIONS.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="group flex items-center gap-3 rounded-xl bg-[#0a2540] hover:bg-[#0f3460] text-white px-5 py-4 transition-all duration-200 hover:shadow-lg"
            >
              <action.icon className="h-5 w-5 text-white/80" />
              <span className="font-semibold text-sm">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
