"use client"

import Link from "next/link"
import { HotelIcon, CarIcon, PackageIcon, GlobeIcon } from "@/components/ui/icons"

const ACTIONS = [
  { href: "/hotels", label: "Hotels", description: "Über 2 Mio. Unterkünfte", icon: HotelIcon },
  { href: "/fluege?from=DE", label: "Mietwagen", description: "Bei 900+ Anbietern", icon: CarIcon },
  { href: "/pauschalreisen", label: "Pauschalreisen", description: "Flug + Hotel kombiniert", icon: PackageIcon },
  { href: "/fluege?from=DE&to=EVERYWHERE", label: "Alle Orte erkunden", description: "Wohin auch immer", icon: GlobeIcon },
]

export function QuickActions() {
  return (
    <section className="bg-muted/40 py-8 -mt-6 relative z-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {ACTIONS.map((action, i) => (
            <Link
              key={action.href}
              href={action.href}
              className={`animate-fade-in-up stagger-${i + 1} group rounded-2xl bg-card border border-border shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 p-5`}
            >
              <div className="inline-flex items-center justify-center h-11 w-11 rounded-xl bg-muted text-foreground mb-3 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                <action.icon className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-base">{action.label}</h3>
              <p className="text-xs text-muted-foreground mt-1">{action.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
