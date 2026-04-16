"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { PlaneIcon, ExternalLinkIcon, StarIcon, ChevronLeftIcon, ShieldIcon, LuggageIcon, BaggageIcon, ClockIcon, ArrowRightIcon } from "@/components/ui/icons"
import { formatPrice } from "@/lib/utils"
import { getCity } from "@/lib/data/iata-database"
import Link from "next/link"

// Booking providers with affiliate links
function buildProviders(origin: string, destination: string, depDate: string, retDate: string, marker: string) {
  const depDDMM = depDate ? depDate.split("-")[2] + depDate.split("-")[1] : ""
  const retDDMM = retDate ? retDate.split("-")[2] + retDate.split("-")[1] : ""

  return [
    {
      name: "Aviasales",
      rating: 4.2,
      reviews: 12500,
      price: null, // Will be set from actual data
      features: ["Preisvergleich", "Viele Airlines"],
      link: `https://www.aviasales.com/search/${origin}${depDDMM}${destination}${retDDMM}1?marker=${marker}`,
      badge: null,
    },
    {
      name: "Skyscanner",
      rating: 4.5,
      reviews: 28000,
      price: null,
      features: ["Bester Preisvergleich", "Trusted Brand"],
      link: `https://www.skyscanner.de/transport/fluge/${origin.toLowerCase()}/${destination.toLowerCase()}/${depDate.replace(/-/g, "").slice(2)}/${retDate.replace(/-/g, "").slice(2)}/`,
      badge: "Empfohlen",
    },
    {
      name: "Google Flights",
      rating: 4.6,
      reviews: 50000,
      price: null,
      features: ["Preishistorie", "Direkte Airline-Preise"],
      link: `https://www.google.com/travel/flights?q=Flights%20to%20${destination}%20from%20${origin}%20on%20${depDate}%20through%20${retDate}&curr=EUR`,
      badge: null,
    },
    {
      name: "Kiwi.com",
      rating: 3.2,
      reviews: 6500,
      price: null,
      features: ["Günstige Kombi-Tickets", "Kundenservice DE"],
      link: `https://www.kiwi.com/de/search/results/${origin}/${destination}/${depDate}/${retDate}`,
      badge: null,
    },
    {
      name: "Kayak",
      rating: 4.3,
      reviews: 15000,
      price: null,
      features: ["Preisalarm", "Viele Filter"],
      link: `https://www.kayak.de/flights/${origin}-${destination}/${depDate}/${retDate}`,
      badge: null,
    },
    {
      name: "Momondo",
      rating: 4.1,
      reviews: 8000,
      price: null,
      features: ["Oft günstigste Preise", "Flexible Suche"],
      link: `https://www.momondo.de/flightresults/${origin}/${destination}/${depDate}/${retDate}`,
      badge: null,
    },
  ]
}

function FlightDetailContent() {
  const params = useSearchParams()
  const origin = params.get("origin") || ""
  const dest = params.get("dest") || ""
  const dep = params.get("dep") || ""
  const ret = params.get("ret") || ""
  const price = params.get("price") || ""
  const airline = params.get("airline") || ""
  const stops = params.get("stops") || "0"
  const depTime = params.get("depTime") || ""
  const duration = params.get("duration") || ""
  const marker = "717690"

  const originCity = getCity(origin)
  const destCity = getCity(dest)
  const days = dep && ret ? Math.ceil((new Date(ret).getTime() - new Date(dep).getTime()) / 86400000) : 7

  const providers = buildProviders(origin, dest, dep, ret, marker)

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      {/* Back */}
      <Link href="/fluege" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 cursor-pointer">
        <ChevronLeftIcon className="h-4 w-4" /> Zurück zur Suche
      </Link>

      {/* Flight Summary Card */}
      <Card className="mb-6 overflow-hidden">
        <div className="bg-[#0a2540] text-white p-5">
          <h1 className="text-xl font-bold">{originCity} nach {destCity}</h1>
          <p className="text-sm text-blue-200 mt-1">
            {dep && new Date(dep).toLocaleDateString("de-DE", { day: "numeric", month: "long" })}
            {ret && ` – ${new Date(ret).toLocaleDateString("de-DE", { day: "numeric", month: "long" })}`}
            {" · "}1 Reisender · Economy Class
          </p>
        </div>

        <CardContent className="p-5 space-y-4">
          {/* Outbound */}
          <div>
            <p className="text-xs text-muted-foreground mb-2">{originCity} nach {destCity}</p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <PlaneIcon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="font-semibold">
                  {depTime || "—"} – {depTime ? "..." : "—"}
                </div>
                <div className="text-sm text-muted-foreground">
                  {airline || "Airline"} · {parseInt(stops) === 0 ? "Direkt" : `${stops} Stopp`}
                  {duration && ` · ${Math.floor(parseInt(duration) / 60)}h ${parseInt(duration) % 60}min`}
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Return */}
          <div>
            <p className="text-xs text-muted-foreground mb-2">{destCity} nach {originCity}</p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <PlaneIcon className="h-5 w-5 text-primary rotate-180" />
              </div>
              <div className="flex-1">
                <div className="font-semibold">Rückflug verfügbar</div>
                <div className="text-sm text-muted-foreground">
                  {ret && new Date(ret).toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long" })}
                  {" · "}{days}-Tage-Reise
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Provider Comparison — THE MAIN FEATURE */}
      <div className="mb-4">
        <h2 className="text-lg font-bold">Angebot auswählen und Details ansehen</h2>
        <p className="text-sm text-muted-foreground">
          {providers.length} Anbieter gefunden · Preise in EUR
        </p>
      </div>

      {/* Baggage Filter */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <span className="text-sm text-muted-foreground">Muss enthalten</span>
        <Badge variant="outline" className="gap-1 cursor-pointer hover:bg-accent">
          <LuggageIcon className="h-3 w-3" /> Handgepäck
        </Badge>
        <Badge variant="outline" className="gap-1 cursor-pointer hover:bg-accent">
          <BaggageIcon className="h-3 w-3" /> Aufgabegepäck
        </Badge>
      </div>

      {/* Provider Cards */}
      <div className="space-y-3">
        {providers.map((provider, i) => (
          <Card key={provider.name} className={`hover:shadow-lg transition-shadow ${provider.badge ? "border-primary/30" : ""}`}>
            <CardContent className="p-4">
              {provider.badge && (
                <Badge className="mb-2 bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                  <ShieldIcon className="h-3 w-3 mr-1" /> {provider.badge}
                </Badge>
              )}

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base">{provider.name}</h3>
                  <div className="flex items-center gap-1 mt-0.5">
                    <StarIcon className="h-3 w-3 fill-amber-400 text-amber-400" />
                    <span className="text-sm">{provider.rating}/5</span>
                    <span className="text-xs text-muted-foreground">{provider.reviews.toLocaleString("de-DE")}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {provider.features.map(f => (
                      <span key={f} className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">{f}</span>
                    ))}
                  </div>
                </div>

                <div className="text-right shrink-0 ml-4">
                  {price && i === 0 && (
                    <div className="text-2xl font-bold">{formatPrice(parseInt(price))}</div>
                  )}
                  {(!price || i > 0) && (
                    <div className="text-sm text-muted-foreground">Preis prüfen</div>
                  )}
                  <a href={provider.link} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" className="mt-2 gap-1" variant={i === 0 ? "default" : "outline"}>
                      Zur Website <ExternalLinkIcon className="h-3 w-3" />
                    </Button>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Info */}
      <p className="text-xs text-muted-foreground text-center mt-6">
        Preise können je nach Verfügbarkeit variieren. Wir erhalten ggf. eine Provision wenn du über unsere Links buchst — für dich ändert sich der Preis nicht.
      </p>
    </div>
  )
}

export default function FlightDetailPage() {
  return (
    <Suspense fallback={<div className="container mx-auto p-8 text-center">Laden...</div>}>
      <FlightDetailContent />
    </Suspense>
  )
}
