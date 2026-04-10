"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Hotel, Search, MapPin, Star, ExternalLink, Loader2, Calendar, ChevronLeft } from "lucide-react"
import { getCityImage, getCountryImage } from "@/lib/utils/images"
import { COUNTRY_NAMES, getCity } from "@/lib/data/iata-database"

const POPULAR_COUNTRIES = ["ES", "TR", "GR", "IT", "PT", "HR", "EG", "FR", "GB", "AE", "TH", "DE"]

const POPULAR_CITIES_BY_COUNTRY: Record<string, string[]> = {
  ES: ["PMI", "BCN", "AGP", "IBZ", "TFS", "LPA", "FUE", "ALC", "MAD"],
  TR: ["AYT", "IST", "DLM", "BJV"],
  GR: ["ATH", "HER", "CFU", "RHO", "JTR", "ZTH"],
  IT: ["FCO", "NAP", "MXP", "VCE", "FLR", "PSA", "BRI", "CTA"],
  PT: ["LIS", "FAO", "OPO", "FNC"],
  HR: ["SPU", "DBV", "ZAG", "ZAD"],
  EG: ["HRG", "SSH", "CAI"],
  FR: ["CDG", "NCE", "MRS", "LYS"],
  GB: ["LHR", "MAN", "EDI"],
  AE: ["DXB", "AUH"],
  TH: ["BKK", "HKT", "CNX"],
  DE: ["BER", "MUC", "HAM", "FRA", "CGN"],
}

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
      features: ["Sammle 10 Nächte = 1 gratis"],
    },
    {
      name: "Agoda",
      rating: 4.3,
      reviews: 42000,
      badge: null,
      link: `https://www.agoda.com/search?city=${encodeURIComponent(destination)}`,
      features: ["Oft günstigste Preise"],
    },
    {
      name: "Trivago",
      rating: 4.1,
      reviews: 28000,
      badge: null,
      link: `https://www.trivago.de/de/odr?search=${encodeURIComponent(destination)}`,
      features: ["400+ Buchungsseiten"],
    },
  ]
}

function HotelSearchContent() {
  const searchParams = useSearchParams()
  const initialDest = searchParams.get("to") || ""

  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [selectedCity, setSelectedCity] = useState<{ code: string; name: string } | null>(
    initialDest ? { code: initialDest, name: getCity(initialDest) } : null
  )
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  // STEP 3: City selected → show booking providers
  if (selectedCity) {
    const providers = buildBookingLinks(selectedCity.name, checkIn, checkOut)
    return (
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <button
          onClick={() => { setSelectedCity(null); setSearchQuery("") }}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 cursor-pointer"
        >
          <ChevronLeft className="h-4 w-4" /> Zurück
        </button>

        <div className="mb-6">
          <h1 className="text-3xl font-bold">Hotels in {selectedCity.name}</h1>
          <p className="text-muted-foreground">Vergleiche Preise bei {providers.length} Anbietern</p>
        </div>

        {/* Date pickers */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Check-in</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="pl-10" />
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Check-out</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="pl-10" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          {providers.map((p, i) => (
            <Card key={p.name} className={`hover:shadow-lg transition-shadow animate-fade-in-up stagger-${i + 1} ${p.badge ? "border-primary/30" : ""}`}>
              <CardContent className="p-4">
                {p.badge && (
                  <Badge className="mb-2 bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 text-xs">
                    {p.badge}
                  </Badge>
                )}
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-base">{p.name}</h3>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      <span className="text-sm">{p.rating}/5</span>
                      <span className="text-xs text-muted-foreground">({p.reviews.toLocaleString("de-DE")})</span>
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
      </div>
    )
  }

  // STEP 2: Country selected → show cities
  if (selectedCountry) {
    const cities = POPULAR_CITIES_BY_COUNTRY[selectedCountry] || []
    return (
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <button onClick={() => setSelectedCountry(null)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 cursor-pointer">
          <ChevronLeft className="h-4 w-4" /> Zurück
        </button>

        <h1 className="text-3xl font-bold mb-2">
          Hotels in {COUNTRY_NAMES[selectedCountry]}
        </h1>
        <p className="text-muted-foreground mb-6">Wähle eine Stadt um Hotelangebote zu sehen</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cities.map((cityCode, i) => {
            const cityName = getCity(cityCode)
            return (
              <Card
                key={cityCode}
                className={`overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group animate-fade-in-up stagger-${Math.min(i + 1, 10)}`}
                onClick={() => setSelectedCity({ code: cityCode, name: cityName })}
              >
                <div className="h-44 overflow-hidden relative">
                  <img src={getCityImage(cityCode)} alt={cityName} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="font-bold text-xl drop-shadow-lg">{cityName}</h3>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">5+ Anbieter vergleichen</span>
                    <Button size="sm" variant="ghost" className="gap-1">
                      Hotels <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    )
  }

  // STEP 1: No selection → show countries
  const filteredCountries = searchQuery
    ? POPULAR_COUNTRIES.filter(c => COUNTRY_NAMES[c]?.toLowerCase().includes(searchQuery.toLowerCase()))
    : POPULAR_COUNTRIES

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <Hotel className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Hotels vergleichen</h1>
          <p className="text-muted-foreground text-sm">Finde das günstigste Hotel über alle Anbieter</p>
        </div>
      </div>

      <Card className="mb-8">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Land oder Stadt suchen..."
              className="pl-10 h-11"
            />
          </div>
        </CardContent>
      </Card>

      <h2 className="text-xl font-bold mb-4">Beliebte Reiseziele</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredCountries.map((cc, i) => (
          <Card
            key={cc}
            className={`overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group animate-fade-in-up stagger-${Math.min(i + 1, 10)}`}
            onClick={() => setSelectedCountry(cc)}
          >
            <div className="h-32 overflow-hidden relative">
              <img src={getCountryImage(cc)} alt={COUNTRY_NAMES[cc]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-3 right-3 text-white">
                <h3 className="font-bold text-base drop-shadow-lg">{COUNTRY_NAMES[cc]}</h3>
              </div>
            </div>
          </Card>
        ))}
      </div>
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
