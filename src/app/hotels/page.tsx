"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Hotel, Search, MapPin, Star, ExternalLink, Loader2, Calendar } from "lucide-react"
import { getCityImage, getCountryImage } from "@/lib/utils/images"

const POPULAR_DESTINATIONS = [
  { name: "Mallorca", code: "PMI", country: "Spanien" },
  { name: "Antalya", code: "AYT", country: "Türkei" },
  { name: "Kreta", code: "HER", country: "Griechenland" },
  { name: "Barcelona", code: "BCN", country: "Spanien" },
  { name: "Rom", code: "FCO", country: "Italien" },
  { name: "Lissabon", code: "LIS", country: "Portugal" },
  { name: "Dubai", code: "DXB", country: "VAE" },
  { name: "Paris", code: "CDG", country: "Frankreich" },
  { name: "London", code: "LHR", country: "Großbritannien" },
  { name: "Dubrovnik", code: "DBV", country: "Kroatien" },
  { name: "Hurghada", code: "HRG", country: "Ägypten" },
  { name: "Istanbul", code: "IST", country: "Türkei" },
]

function buildBookingLinks(destination: string, checkIn?: string, checkOut?: string) {
  const marker = "717690"
  const params = checkIn && checkOut ? `&checkin=${checkIn}&checkout=${checkOut}` : ""
  return [
    {
      name: "Booking.com",
      rating: 4.7,
      reviews: 180000,
      badge: "Bester Anbieter",
      link: `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(destination)}${params}&aid=2311236`,
      features: ["Kostenlose Stornierung", "Jetzt buchen, später zahlen"],
    },
    {
      name: "Hotellook",
      rating: 4.2,
      reviews: 15000,
      badge: null,
      link: `https://search.hotellook.com/hotels?destination=${encodeURIComponent(destination)}&marker=${marker}`,
      features: ["Preisvergleich", "30+ Anbieter"],
    },
    {
      name: "Hotels.com",
      rating: 4.4,
      reviews: 95000,
      badge: null,
      link: `https://www.hotels.com/search.do?q-destination=${encodeURIComponent(destination)}`,
      features: ["Sammle 10 Nächte = 1 gratis", "Treueprogramm"],
    },
    {
      name: "Agoda",
      rating: 4.3,
      reviews: 42000,
      badge: null,
      link: `https://www.agoda.com/search?city=${encodeURIComponent(destination)}`,
      features: ["Oft günstigste Preise in Asien", "Geheimtipps"],
    },
    {
      name: "Trivago",
      rating: 4.1,
      reviews: 28000,
      badge: null,
      link: `https://www.trivago.de/de/odr?search=${encodeURIComponent(destination)}`,
      features: ["Über 400 Buchungsseiten", "Bester Hotelvergleich"],
    },
  ]
}

function HotelSearchContent() {
  const searchParams = useSearchParams()
  const initialDest = searchParams.get("to") || ""
  const [destination, setDestination] = useState(initialDest)
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [searched, setSearched] = useState(!!initialDest)

  const providers = buildBookingLinks(destination, checkIn, checkOut)

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <Hotel className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Hotels vergleichen</h1>
          <p className="text-muted-foreground text-sm">Finde das günstigste Hotel über alle Anbieter</p>
        </div>
      </div>

      {/* Search */}
      <Card className="mb-8">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input value={destination} onChange={(e) => setDestination(e.target.value)}
                placeholder="Wohin? (z.B. Mallorca, Barcelona...)" className="pl-10 h-11" />
            </div>
            <div className="relative flex-1 md:max-w-40">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="pl-10 h-11" placeholder="Check-in" />
            </div>
            <div className="relative flex-1 md:max-w-40">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="pl-10 h-11" placeholder="Check-out" />
            </div>
            <Button className="gap-2 shrink-0" size="lg" onClick={() => setSearched(true)} disabled={!destination}>
              <Search className="h-4 w-4" /> Hotels suchen
            </Button>
          </div>
        </CardContent>
      </Card>

      {searched && destination ? (
        <>
          {/* Destination Header */}
          <div className="mb-6">
            <h2 className="text-xl font-bold">Hotels in {destination}</h2>
            <p className="text-muted-foreground text-sm">Vergleiche Preise bei {providers.length} Anbietern</p>
          </div>

          {/* Provider Cards */}
          <div className="space-y-3 mb-8">
            {providers.map((p) => (
              <Card key={p.name} className={`hover:shadow-lg transition-shadow ${p.badge ? "border-primary/30" : ""}`}>
                <CardContent className="p-4">
                  {p.badge && (
                    <Badge className="mb-2 bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 text-xs">
                      {p.badge}
                    </Badge>
                  )}
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-base">{p.name}</h3>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        <span className="text-sm">{p.rating}/5</span>
                        <span className="text-xs text-muted-foreground">{p.reviews.toLocaleString("de-DE")} Bewertungen</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {p.features.map(f => (
                          <span key={f} className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">{f}</span>
                        ))}
                      </div>
                    </div>
                    <a href={p.link} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" className="gap-1">
                        Zur Website <ExternalLink className="h-3 w-3" />
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <>
          {/* Popular Destinations */}
          <h2 className="text-xl font-bold mb-4">Beliebte Reiseziele</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {POPULAR_DESTINATIONS.map((dest) => (
              <Card key={dest.code} className="overflow-hidden cursor-pointer hover:shadow-lg transition-all group"
                onClick={() => { setDestination(dest.name); setSearched(true) }}>
                <div className="h-28 overflow-hidden">
                  <img src={getCityImage(dest.code)} alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <CardContent className="p-3">
                  <h3 className="font-semibold text-sm">{dest.name}</h3>
                  <p className="text-xs text-muted-foreground">{dest.country}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default function HotelsPage() {
  return (
    <Suspense fallback={<div className="container mx-auto p-8 text-center"><Loader2 className="h-8 w-8 animate-spin mx-auto" /></div>}>
      <HotelSearchContent />
    </Suspense>
  )
}
