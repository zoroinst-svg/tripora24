"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DealCard } from "@/components/deals/DealCard"
import { MOCK_TRENDING_DEALS, type TrendingDeal } from "@/lib/deal-engine/mock-data"
import { Flame, Plane, Hotel, Package, Loader2, Sparkles } from "lucide-react"

const DEPARTURE_AIRPORTS = ["Alle", "FRA", "MUC", "BER", "DUS", "HAM", "VIE", "ZRH"]

export default function DealsPage() {
  const [deals, setDeals] = useState<TrendingDeal[]>(MOCK_TRENDING_DEALS)
  const [loading, setLoading] = useState(true)
  const [typeFilter, setTypeFilter] = useState<"all" | "flight" | "hotel" | "package">("all")
  const [airportFilter, setAirportFilter] = useState("Alle")

  useEffect(() => {
    fetch("/api/deals/trending")
      .then(res => res.json())
      .then(data => { if (data.results?.length > 0) setDeals(data.results) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const filtered = deals.filter(deal => {
    if (typeFilter !== "all" && deal.type !== typeFilter) return false
    if (airportFilter !== "Alle" && deal.origin && deal.origin !== airportFilter) return false
    return true
  }).sort((a, b) => b.dealScore - a.dealScore)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30">
          <Flame className="h-6 w-6 text-orange-500" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Top Deals</h1>
          <p className="text-muted-foreground text-sm">Die besten aktuellen Angebote — sortiert nach Ersparnis</p>
        </div>
      </div>

      <Card className="mb-6 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
        <CardContent className="p-4 flex items-center gap-3">
          <Sparkles className="h-5 w-5 text-amber-600 shrink-0" />
          <p className="text-sm">
            Echtzeit-Preise von Ryanair, Wizz Air, EasyJet und vielen mehr. Alle Preise sind Hin- und Rückflug pro Person.
          </p>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {(["all", "flight"] as const).map(t => (
            <button key={t} onClick={() => setTypeFilter(t)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap cursor-pointer transition-colors flex items-center gap-1.5 ${typeFilter === t ? "bg-foreground text-background" : "bg-muted hover:bg-muted/80"}`}
            >
              {t === "all" ? "Alle" : <><Plane className="h-3 w-3" /> Flüge</>}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground">Ab:</span>
          {DEPARTURE_AIRPORTS.map(ap => (
            <Button key={ap} variant={airportFilter === ap ? "default" : "outline"} size="sm" onClick={() => setAirportFilter(ap)}>
              {ap}
            </Button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20">
          <Loader2 className="h-10 w-10 text-primary mx-auto mb-4 animate-spin" />
          <h3 className="text-lg font-semibold">Deals werden geladen...</h3>
        </div>
      ) : filtered.length === 0 ? (
        <Card className="p-12 text-center">
          <Flame className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Keine Deals für diese Filter</h3>
          <p className="text-muted-foreground">Versuche andere Filter.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(deal => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>
      )}
    </div>
  )
}
