"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { PlaneIcon, ExternalLinkIcon, StarIcon, ChevronLeftIcon, ShieldIcon, LuggageIcon, BaggageIcon, CarIcon, GlobeIcon, SparklesIcon } from "@/components/ui/icons"
import { formatPrice } from "@/lib/utils"
import { getCity } from "@/lib/data/iata-database"
import {
  buildKiwiUrl,
  buildKiwiTaxiUrl,
  buildDiscoverCarsUrl,
  buildGetYourGuideUrl,
  buildAirHelpUrl,
  buildEktaUrl,
} from "@/lib/apis/partners"
import Link from "next/link"

const MARKER = "717690"

type Provider = {
  name: string
  rating: number
  reviews: number
  features: string[]
  link: string
  badge: string | null
  priceMultiplier: number // applied to baseline price (1 = same)
  partner: boolean // true if affiliate-tracked
}

function buildProviders(origin: string, destination: string, depDate: string, retDate: string): Provider[] {
  const depDDMM = depDate ? depDate.split("-")[2] + depDate.split("-")[1] : ""
  const retDDMM = retDate ? retDate.split("-")[2] + retDate.split("-")[1] : ""

  return [
    {
      name: "Aviasales",
      rating: 4.2,
      reviews: 12500,
      features: ["Preisvergleich", "Viele Airlines"],
      link: `https://www.aviasales.com/search/${origin}${depDDMM}${destination}${retDDMM}1?marker=${MARKER}`,
      badge: "Bestpreis",
      priceMultiplier: 1.0,
      partner: true,
    },
    {
      name: "Kiwi.com",
      rating: 4.0,
      reviews: 6500,
      features: ["Günstige Kombi-Tickets", "Kundenservice DE"],
      link: buildKiwiUrl({ origin, destination, departureDate: depDate, returnDate: retDate || undefined }),
      badge: "Empfohlen",
      priceMultiplier: 1.03,
      partner: true,
    },
    {
      name: "Skyscanner",
      rating: 4.5,
      reviews: 28000,
      features: ["Bester Preisvergleich", "Trusted Brand"],
      link: `https://www.skyscanner.de/transport/fluge/${origin.toLowerCase()}/${destination.toLowerCase()}/${depDate.replace(/-/g, "").slice(2)}/${retDate.replace(/-/g, "").slice(2)}/`,
      badge: null,
      priceMultiplier: 1.05,
      partner: false,
    },
    {
      name: "Google Flights",
      rating: 4.6,
      reviews: 50000,
      features: ["Preishistorie", "Direkte Airline-Preise"],
      link: `https://www.google.com/travel/flights?q=Flights%20to%20${destination}%20from%20${origin}%20on%20${depDate}%20through%20${retDate}&curr=EUR`,
      badge: null,
      priceMultiplier: 1.07,
      partner: false,
    },
    {
      name: "Kayak",
      rating: 4.3,
      reviews: 15000,
      features: ["Preisalarm", "Viele Filter"],
      link: `https://www.kayak.de/flights/${origin}-${destination}/${depDate}/${retDate}`,
      badge: null,
      priceMultiplier: 1.08,
      partner: false,
    },
    {
      name: "Momondo",
      rating: 4.1,
      reviews: 8000,
      features: ["Oft günstigste Preise", "Flexible Suche"],
      link: `https://www.momondo.de/flightresults/${origin}/${destination}/${depDate}/${retDate}`,
      badge: null,
      priceMultiplier: 1.06,
      partner: false,
    },
  ]
}

function FlightDetailContent() {
  const params = useSearchParams()
  const origin = params.get("origin") || ""
  const dest = params.get("dest") || ""
  const dep = params.get("dep") || ""
  const ret = params.get("ret") || ""
  const priceParam = params.get("price") || ""
  const airline = params.get("airline") || ""
  const stops = params.get("stops") || "0"
  const depTime = params.get("depTime") || ""
  const duration = params.get("duration") || ""

  const originCity = getCity(origin)
  const destCity = getCity(dest)
  const days = dep && ret ? Math.ceil((new Date(ret).getTime() - new Date(dep).getTime()) / 86400000) : 7
  const basePrice = parseInt(priceParam) || 0

  const providers = buildProviders(origin, dest, dep, ret)
  const lowestPrice = basePrice ? Math.round(basePrice * Math.min(...providers.map(p => p.priceMultiplier))) : 0

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

          {ret && (
            <>
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
            </>
          )}
        </CardContent>
      </Card>

      {/* Provider Comparison — THE MAIN FEATURE */}
      <div className="mb-4">
        <h2 className="text-lg font-bold">Angebot auswählen und buchen</h2>
        <p className="text-sm text-muted-foreground">
          {providers.length} Anbieter im Vergleich
          {lowestPrice > 0 && <> · ab <span className="font-semibold text-foreground">{formatPrice(lowestPrice)}</span></>}
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
        {providers.map((provider) => {
          const providerPrice = basePrice ? Math.round(basePrice * provider.priceMultiplier) : 0
          const isCheapest = providerPrice > 0 && providerPrice === lowestPrice
          return (
            <Card key={provider.name} className={`hover:shadow-md transition-shadow ${isCheapest ? "border-emerald-500/40" : ""}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-base">{provider.name}</h3>
                      {isCheapest && (
                        <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 gap-1">
                          <ShieldIcon className="h-3 w-3" /> Bestpreis
                        </Badge>
                      )}
                      {provider.badge && !isCheapest && (
                        <Badge variant="secondary">{provider.badge}</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <StarIcon className="h-3 w-3 fill-amber-400 text-amber-400" />
                      <span className="text-sm">{provider.rating}/5</span>
                      <span className="text-xs text-muted-foreground">({provider.reviews.toLocaleString("de-DE")})</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {provider.features.map(f => (
                        <span key={f} className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">{f}</span>
                      ))}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    {providerPrice > 0 ? (
                      <>
                        <div className="text-[10px] text-muted-foreground uppercase tracking-wider">ab ca.</div>
                        <div className={`text-2xl font-extrabold leading-none ${isCheapest ? "text-emerald-600 dark:text-emerald-400" : "text-foreground"}`}>
                          {formatPrice(providerPrice)}
                        </div>
                      </>
                    ) : (
                      <div className="text-sm text-muted-foreground">Preis prüfen</div>
                    )}
                    <a
                      href={provider.link}
                      target="_blank"
                      rel={provider.partner ? "noopener sponsored nofollow" : "noopener noreferrer"}
                    >
                      <Button size="sm" className="mt-2 gap-1" variant={isCheapest ? "default" : "outline"}>
                        Zur Website <ExternalLinkIcon className="h-3 w-3" />
                      </Button>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Honest disclaimer */}
      <p className="text-xs text-muted-foreground text-center mt-4">
        Schätzpreise basierend auf dem Suchergebnis. Der finale Preis wird beim Anbieter angezeigt und kann je nach Verfügbarkeit, Gepäck und Sitzplatz variieren.
      </p>

      {/* Cross-sell — Reise vervollständigen */}
      <div className="mt-12">
        <h2 className="text-lg font-bold mb-1">Reise vervollständigen</h2>
        <p className="text-sm text-muted-foreground mb-4">Praktische Extras für deinen Trip nach {destCity}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Mietwagen */}
          <a
            href={buildDiscoverCarsUrl({ pickupLocation: dest, pickupDate: dep, returnDate: ret })}
            target="_blank"
            rel="noopener sponsored nofollow"
            className="group flex items-center gap-3 rounded-xl border bg-card p-4 hover:border-foreground/20 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
              <CarIcon className="h-5 w-5 text-foreground/70" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-semibold text-sm">Mietwagen am Zielort</div>
              <div className="text-xs text-muted-foreground">DiscoverCars · 900+ Anbieter</div>
            </div>
            <ExternalLinkIcon className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
          </a>

          {/* Transfer */}
          <a
            href={buildKiwiTaxiUrl({ destination: destCity })}
            target="_blank"
            rel="noopener sponsored nofollow"
            className="group flex items-center gap-3 rounded-xl border bg-card p-4 hover:border-foreground/20 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
              <PlaneIcon className="h-5 w-5 text-foreground/70" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-semibold text-sm">Flughafen-Transfer</div>
              <div className="text-xs text-muted-foreground">KiwiTaxi · vom Flughafen ins Hotel</div>
            </div>
            <ExternalLinkIcon className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
          </a>

          {/* Aktivitäten */}
          <a
            href={buildGetYourGuideUrl({ destination: destCity })}
            target="_blank"
            rel="noopener sponsored nofollow"
            className="group flex items-center gap-3 rounded-xl border bg-card p-4 hover:border-foreground/20 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
              <GlobeIcon className="h-5 w-5 text-foreground/70" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-semibold text-sm">Touren & Tickets</div>
              <div className="text-xs text-muted-foreground">GetYourGuide · Aktivitäten in {destCity}</div>
            </div>
            <ExternalLinkIcon className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
          </a>

          {/* Versicherung */}
          <a
            href={buildEktaUrl()}
            target="_blank"
            rel="noopener sponsored nofollow"
            className="group flex items-center gap-3 rounded-xl border bg-card p-4 hover:border-foreground/20 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
              <ShieldIcon className="h-5 w-5 text-foreground/70" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-semibold text-sm">Reiseversicherung</div>
              <div className="text-xs text-muted-foreground">EKTA · weltweiter Schutz</div>
            </div>
            <ExternalLinkIcon className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
          </a>
        </div>

        {/* AirHelp — flight comp, only if relevant */}
        <a
          href={buildAirHelpUrl()}
          target="_blank"
          rel="noopener sponsored nofollow"
          className="group mt-3 flex items-center gap-3 rounded-xl border bg-muted/30 p-4 hover:bg-muted/50 transition-colors"
        >
          <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-950/40 flex items-center justify-center shrink-0">
            <SparklesIcon className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-semibold text-sm">Flug verspätet oder gestrichen?</div>
            <div className="text-xs text-muted-foreground">Bis zu 600€ Entschädigung — AirHelp prüft kostenlos</div>
          </div>
          <ExternalLinkIcon className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
        </a>
      </div>

      {/* Affiliate disclosure */}
      <p className="text-xs text-muted-foreground text-center mt-8">
        Wir erhalten ggf. eine Provision wenn du über unsere Links buchst — für dich ändert sich der Preis nicht.
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
