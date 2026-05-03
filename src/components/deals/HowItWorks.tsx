"use client"

import { SearchIcon, FlameIcon, BellIcon, SparklesIcon } from "@/components/ui/icons"

const STEPS = [
  {
    icon: SearchIcon,
    title: "Multi-Suche",
    description: "Wir durchsuchen gleichzeitig Aviasales, Kiwi, Travelpayouts und mehr — du bekommst Ergebnisse, die du nirgendwo sonst findest.",
  },
  {
    icon: FlameIcon,
    title: "Deal-Score",
    description: "Unser Algorithmus vergleicht jeden Preis mit dem Durchschnitt der letzten 90 Tage. Du siehst sofort, ob ein Preis wirklich günstig ist.",
  },
  {
    icon: SparklesIcon,
    title: "Smart Tricks",
    description: "Split-Tickets, Multi-Airport, flexible Daten — wir nutzen die gleichen Tricks wie Reise-Profis. Automatisch.",
  },
  {
    icon: BellIcon,
    title: "Preis-Alerts",
    description: "Setze einen Zielpreis und wir benachrichtigen dich, sobald dein Wunschflug günstiger wird.",
  },
]

export function HowItWorks() {
  return (
    <section className="py-14 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">Warum Tripora24?</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Andere suchen Deals manuell. Wir automatisieren das komplett.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STEPS.map((step, i) => (
            <div key={i} className="text-center px-2">
              <div className="mx-auto w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <step.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-base mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
