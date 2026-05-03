"use client"

import { SearchIcon, FlameIcon, BellIcon, SparklesIcon } from "@/components/ui/icons"

const STEPS = [
  {
    icon: SearchIcon,
    title: "Multi-Suche",
    description: "Wir durchsuchen gleichzeitig Aviasales, Kiwi, Travelpayouts und mehr — du bekommst Ergebnisse, die du nirgendwo sonst findest.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: FlameIcon,
    title: "Deal-Score",
    description: "Unser Algorithmus vergleicht jeden Preis mit dem Durchschnitt der letzten 90 Tage. Du siehst sofort, ob ein Preis wirklich günstig ist.",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: SparklesIcon,
    title: "Smart Tricks",
    description: "Split-Tickets, Multi-Airport, flexible Daten — wir nutzen die gleichen Tricks wie Reise-Profis. Automatisch.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: BellIcon,
    title: "Preis-Alerts",
    description: "Setze einen Zielpreis und wir benachrichtigen dich, sobald dein Wunschflug günstiger wird.",
    color: "from-emerald-500 to-teal-500",
  },
]

export function HowItWorks() {
  return (
    <section className="relative py-16 md:py-20 bg-gradient-to-b from-muted/30 to-background overflow-hidden">
      {/* Decorative */}
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-[#F08C3D]/5 blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4">
        <div className="text-center mb-12 md:mb-14 reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3 border border-primary/20">
            <SparklesIcon className="h-3.5 w-3.5" />
            Warum Tripora24
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">So findest du den besten Preis</h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
            Andere suchen Deals manuell. Wir automatisieren das komplett.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {STEPS.map((step, i) => (
            <div
              key={i}
              className="reveal-scale group relative bg-card border border-border rounded-2xl p-6 md:p-7 hover:shadow-premium-lg hover:-translate-y-1 transition-all duration-500 overflow-hidden"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Step number */}
              <div className="absolute top-3 right-4 text-5xl font-extrabold text-muted/40 group-hover:text-primary/20 transition-colors">
                0{i + 1}
              </div>

              <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                <step.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2 leading-tight">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
