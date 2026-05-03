"use client"

import Link from "next/link"
import { HotelIcon, CarIcon, PackageIcon, GlobeIcon, ArrowRightIcon } from "@/components/ui/icons"
import { useI18n } from "@/lib/i18n/context"

export function QuickActions() {
  const { t } = useI18n()

  const ACTIONS = [
    {
      href: "/hotels",
      label: t("quickActions.hotels"),
      icon: HotelIcon,
      gradient: "from-blue-500 to-blue-700",
      hint: "2M+ Hotels",
    },
    {
      href: "/mietwagen",
      label: t("quickActions.carRental"),
      icon: CarIcon,
      gradient: "from-purple-500 to-pink-600",
      hint: "900+ Anbieter",
    },
    {
      href: "/aktivitaeten",
      label: t("quickActions.activities"),
      icon: GlobeIcon,
      gradient: "from-emerald-500 to-teal-600",
      hint: "Touren & Tickets",
    },
    {
      href: "/pauschalreisen",
      label: t("quickActions.packages"),
      icon: PackageIcon,
      gradient: "from-orange-500 to-rose-600",
      hint: "Flug + Hotel",
    },
  ]

  return (
    <section className="relative py-8 md:py-10 -mt-8 z-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {ACTIONS.map((action, i) => (
            <Link
              key={action.href}
              href={action.href}
              className="reveal-scale group relative overflow-hidden rounded-2xl bg-card border border-border shadow-premium hover:shadow-premium-lg transition-all duration-500 hover:-translate-y-1"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {/* Animated gradient background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />
              {/* Decorative blob */}
              <div className="absolute -bottom-12 -right-12 w-32 h-32 rounded-full bg-foreground/5 blur-2xl group-hover:bg-white/30 transition-colors duration-500" />

              <div className="relative p-4 md:p-5 flex flex-col gap-2 md:gap-3 min-h-[100px] md:min-h-[120px]">
                <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-primary/10 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                  <action.icon className="h-5 w-5 text-primary group-hover:text-white transition-colors" />
                </div>
                <div className="mt-auto">
                  <div className="font-bold text-sm md:text-base text-foreground group-hover:text-white transition-colors leading-tight">
                    {action.label}
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[11px] md:text-xs text-muted-foreground group-hover:text-white/80 transition-colors">
                      {action.hint}
                    </span>
                    <ArrowRightIcon className="h-3.5 w-3.5 text-muted-foreground group-hover:text-white opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 -translate-x-1 transition-all" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
