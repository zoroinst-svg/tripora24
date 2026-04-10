"use client"

import Link from "next/link"
import { Hotel, Car, Package, Globe } from "lucide-react"

const ACTIONS = [
  {
    href: "/hotels",
    label: "Hotels",
    description: "Über 2 Mio. Unterkünfte",
    icon: Hotel,
    color: "from-blue-500 to-blue-600",
  },
  {
    href: "/fluege?from=DE",
    label: "Mietwagen",
    description: "Bei 900+ Anbietern",
    icon: Car,
    color: "from-emerald-500 to-emerald-600",
  },
  {
    href: "/pauschalreisen",
    label: "Pauschalreisen",
    description: "Flug + Hotel kombiniert",
    icon: Package,
    color: "from-amber-500 to-orange-500",
  },
  {
    href: "/fluege?from=DE&to=EVERYWHERE",
    label: "Alle Orte erkunden",
    description: "Wohin auch immer",
    icon: Globe,
    color: "from-purple-500 to-pink-500",
  },
]

export function QuickActions() {
  return (
    <section className="bg-background py-8 -mt-6 relative z-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {ACTIONS.map((action, i) => (
            <Link
              key={action.href}
              href={action.href}
              className={`animate-fade-in-up stagger-${i + 1} group relative overflow-hidden rounded-2xl bg-card border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              <div className="relative">
                <div className={`inline-flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br ${action.color} text-white mb-3 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  <action.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-base">{action.label}</h3>
                <p className="text-xs text-muted-foreground mt-1">{action.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
