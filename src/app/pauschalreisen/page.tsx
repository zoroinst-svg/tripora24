"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { PackageIcon, PlaneIcon, HotelIcon, ArrowRightIcon, ExternalLinkIcon, SparklesIcon, SpinnerIcon } from "@/components/ui/icons"
import { formatPrice } from "@/lib/utils"
import { getCityImage } from "@/lib/utils/images"
import { getCountryCode, getCountryName } from "@/lib/data/iata-database"
import type { FlightOffer } from "@/lib/deal-engine/mock-data"

export default function PauschalreisenPage() {
  const [flights, setFlights] = useState<FlightOffer[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get cheapest flights from Germany to popular destinations
    fetch("/api/flights/search?origin=DE&dep=2026-07")
      .then(res => res.json())
      .then(data => setFlights(data.results || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  // Group by destination, show cheapest as "package" with estimated hotel cost
  const destinations = new Map<string, FlightOffer>()
  for (const f of flights) {
    const key = f.destinationCity || f.destination
    if (!destinations.has(key) || f.price < destinations.get(key)!.price) {
      destinations.set(key, f)
    }
  }

  const packages = Array.from(destinations.entries())
    .map(([city, flight]) => {
      // Estimate hotel cost based on destination category
      const cc = getCountryCode(flight.destination)
      let hotelPerNight = 60 // Default
      if (["EG", "TN", "TR", "BG", "AL", "ME"].includes(cc)) hotelPerNight = 35
      if (["ES", "GR", "HR", "PT", "IT"].includes(cc)) hotelPerNight = 55
      if (["FR", "GB", "NL", "DK", "SE"].includes(cc)) hotelPerNight = 80
      if (["AE", "JP", "SG"].includes(cc)) hotelPerNight = 100

      const nights = flight.returnDate
        ? Math.ceil((new Date(flight.returnDate).getTime() - new Date(flight.departureDate).getTime()) / 86400000)
        : 7

      const hotelTotal = hotelPerNight * nights
      const totalPrice = flight.price + hotelTotal
      const avgTotal = Math.round(totalPrice * 1.4)

      return {
        city,
        flight,
        hotelPerNight,
        nights,
        hotelTotal,
        totalPrice,
        avgTotal,
        country: getCountryName(cc),
        image: getCityImage(flight.destination),
      }
    })
    .sort((a, b) => a.totalPrice - b.totalPrice)
    .slice(0, 12)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-lg bg-primary/10">
          <PackageIcon className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Pauschalreisen</h1>
          <p className="text-muted-foreground text-sm">Flug + Hotel kombiniert — die günstigsten Pakete ab Deutschland</p>
        </div>
      </div>

      <Card className="mb-6 bg-primary/5 border-primary/20">
        <CardContent className="p-4 flex items-center gap-3">
          <SparklesIcon className="h-5 w-5 text-primary shrink-0" />
          <p className="text-sm">
            <strong>Wie funktioniert das?</strong> Wir kombinieren den günstigsten Flug mit geschätzten Hotelkosten. Klick auf &quot;Jetzt suchen&quot; um Hotel-Preise auf Booking.com zu vergleichen.
          </p>
        </CardContent>
      </Card>

      {loading ? (
        <div className="text-center py-20">
          <SpinnerIcon className="h-10 w-10 text-primary mx-auto mb-4 animate-spin" />
          <h3 className="text-lg font-semibold">Pauschalreisen werden berechnet...</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {packages.map((pkg) => (
            <Card key={pkg.city} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-48 h-40 sm:h-auto overflow-hidden shrink-0">
                  <img src={pkg.image} alt={pkg.city} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 p-4">
                  <h3 className="font-bold text-lg">{pkg.city}</h3>
                  <p className="text-xs text-muted-foreground">{pkg.country}</p>

                  <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <PlaneIcon className="h-3.5 w-3.5 text-primary" />
                      <span>Flug ab {pkg.flight.originCity}: <strong>{formatPrice(pkg.flight.price)}</strong></span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <HotelIcon className="h-3.5 w-3.5 text-primary" />
                      <span>{pkg.nights} Nächte ab ca. <strong>{formatPrice(pkg.hotelPerNight)}/N.</strong></span>
                    </div>
                  </div>

                  <Separator className="my-3" />

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-muted-foreground">Gesamt ab</div>
                      <div className="text-2xl font-bold text-primary">{formatPrice(pkg.totalPrice)}</div>
                      <div className="text-xs text-muted-foreground">
                        {pkg.flight.departureDate && pkg.flight.returnDate
                          ? `${new Date(pkg.flight.departureDate).toLocaleDateString("de-DE", { day: "numeric", month: "short" })} – ${new Date(pkg.flight.returnDate).toLocaleDateString("de-DE", { day: "numeric", month: "short" })}`
                          : `${pkg.nights} Nächte`
                        }
                      </div>
                    </div>
                    <a href={pkg.flight.bookingUrl} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" className="gap-1">
                        Jetzt suchen <ExternalLinkIcon className="h-3 w-3" />
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
