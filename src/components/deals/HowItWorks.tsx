import { Search, TrendingDown, Bell, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const STEPS = [
  {
    icon: Search,
    title: "Multi-Suche",
    description: "Wir durchsuchen gleichzeitig Amadeus, Kiwi, Travelpayouts und mehr — du bekommst Ergebnisse die du nirgendwo sonst findest.",
  },
  {
    icon: TrendingDown,
    title: "Deal-Score",
    description: "Unser Algorithmus vergleicht jeden Preis mit dem Durchschnitt der letzten 90 Tage. So siehst du sofort ob ein Preis wirklich günstig ist.",
  },
  {
    icon: Zap,
    title: "Smart Tricks",
    description: "Split-Tickets, Multi-Airport, flexible Daten — wir nutzen die gleichen Tricks wie Reise-Profis. Automatisch.",
  },
  {
    icon: Bell,
    title: "Preis-Alerts",
    description: "Setze einen Zielpreis und wir benachrichtigen dich, sobald dein Wunschflug günstiger wird.",
  },
]

export function HowItWorks() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Warum Tripora24?</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Andere suchen Deals manuell. Wir automatisieren das komplett.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, i) => (
            <Card key={i} className="border-0 shadow-none bg-transparent text-center">
              <CardContent className="pt-6">
                <div className="mx-auto w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <step.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
