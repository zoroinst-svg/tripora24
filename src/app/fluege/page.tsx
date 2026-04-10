"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getCountryCode, getCity, getCountryName as getCountryNameFromDB, isKnownCountry, COUNTRY_FLAGS } from "@/lib/data/iata-database"
import { getCountryImage, getCityImage } from "@/lib/utils/images"
import type { FlightOffer } from "@/lib/deal-engine/mock-data"
import { Plane, Search, Loader2, AlertCircle, ArrowRight, ChevronLeft } from "lucide-react"
import Link from "next/link"
import { formatPrice } from "@/lib/utils"

function isCountryCode(c: string): boolean {
  return c.length === 2 && /^[A-Z]{2}$/.test(c) && isKnownCountry(c)
}

function getMonthName(ym: string) {
  if (!ym || ym.length < 7) return ""
  const [y, m] = ym.split("-")
  return new Date(parseInt(y), parseInt(m) - 1).toLocaleDateString("de-DE", { month: "long", year: "numeric" })
}

// ========================================
// SEARCH SUMMARY BAR
// ========================================
function SearchBar({ from, to, dep }: { from: string; to: string; dep: string }) {
  const depLabel = dep ? (dep.length === 7 ? getMonthName(dep) : new Date(dep).toLocaleDateString("de-DE", { month: "short", year: "numeric" })) : ""
  return (
    <div className="bg-[#0a2540] text-white rounded-xl mb-8 px-4 py-3 flex items-center gap-3">
      <Search className="h-4 w-4 shrink-0 opacity-70" />
      <div className="text-sm font-medium truncate flex-1">
        {from} – {to || "Alle Orte"}{depLabel && ` · ${depLabel}`} · Economy
      </div>
    </div>
  )
}

// ========================================
// STEP 1: EXPLORE COUNTRIES
// ========================================
function ExploreCountries({ flights, month, onSelectCountry }: {
  flights: FlightOffer[]; month: string; onSelectCountry: (code: string, name: string) => void
}) {
  // Group by COUNTRY — track cheapest price + number of cities + total options
  const countryStats = new Map<string, { price: number; stops: number; cities: Set<string>; count: number }>()
  for (const f of flights) {
    const cc = getCountryCode(f.destination)
    if (cc === "XX" || cc === "DE") continue
    const existing = countryStats.get(cc)
    if (!existing) {
      countryStats.set(cc, { price: f.price, stops: f.stops, cities: new Set([f.destination]), count: 1 })
    } else {
      existing.cities.add(f.destination)
      existing.count++
      if (f.price < existing.price) {
        existing.price = f.price
        existing.stops = f.stops
      }
    }
  }

  const countries = Array.from(countryStats.entries())
    .map(([code, data]) => ({
      code,
      name: getCountryNameFromDB(code),
      flag: COUNTRY_FLAGS[code] || "",
      price: data.price,
      stops: data.stops,
      cityCount: data.cities.size,
      optionCount: data.count,
    }))
    .sort((a, b) => a.price - b.price)

  const [filter, setFilter] = useState("Günstigste Flüge")
  const filtered = filter === "Direktflüge" ? countries.filter(c => c.stops === 0) : countries

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold mb-2">
        Alle Orte {month ? `im ${getMonthName(month)}` : ""} erkunden
      </h2>
      <p className="text-muted-foreground mb-6">{countries.length} Länder gefunden · Wähle ein Land um Städte zu sehen</p>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 no-scrollbar">
        {["Günstigste Flüge", "Direktflüge"].map(t => (
          <button key={t} onClick={() => setFilter(t)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap cursor-pointer transition-colors ${filter === t ? "bg-foreground text-background" : "bg-muted hover:bg-muted/80"}`}
          >{t}</button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((country, i) => (
          <Card key={country.code}
            className={`overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group animate-fade-in-up stagger-${Math.min(i + 1, 10)}`}
            onClick={() => onSelectCountry(country.code, country.name)}
          >
            <div className="h-44 overflow-hidden relative">
              <img src={getCountryImage(country.code)} alt={country.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <h3 className="font-bold text-xl drop-shadow-lg">{country.flag} {country.name}</h3>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">
                    {country.cityCount} {country.cityCount === 1 ? "Stadt" : "Städte"} · {country.optionCount} Optionen
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {country.stops === 0 ? "Direktflüge verfügbar" : "Mit Umstieg"}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xs text-muted-foreground">ab</div>
                  <div className="text-2xl font-bold text-primary">~{formatPrice(country.price)}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <Card className="p-12 text-center">
          <Plane className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold">Keine Direktflüge gefunden</h3>
          <p className="text-muted-foreground mt-2">Wähle &quot;Günstigste Flüge&quot; für mehr Ergebnisse.</p>
        </Card>
      )}
    </div>
  )
}

// ========================================
// STEP 2: EXPLORE CITIES IN A COUNTRY
// ========================================
function ExploreCities({ flights, countryCode, countryName, month, onSelectCity, onBack }: {
  flights: FlightOffer[]; countryCode: string; countryName: string; month: string
  onSelectCity: (code: string, name: string) => void; onBack: () => void
}) {
  // Track multiple options per city
  const cityStats = new Map<string, { price: number; stops: number; name: string; count: number }>()
  for (const f of flights) {
    const cc = getCountryCode(f.destination)
    if (cc !== countryCode) continue
    const cityName = f.destinationCity || getCity(f.destination)
    const existing = cityStats.get(f.destination)
    if (!existing) {
      cityStats.set(f.destination, { price: f.price, stops: f.stops, name: cityName, count: 1 })
    } else {
      existing.count++
      if (f.price < existing.price) {
        existing.price = f.price
        existing.stops = f.stops
      }
    }
  }

  const cities = Array.from(cityStats.entries())
    .map(([code, data]) => ({ code, ...data }))
    .sort((a, b) => a.price - b.price)

  const [filter, setFilter] = useState("Günstigste Flüge")
  const filtered = filter === "Direktflüge" ? cities.filter(c => c.stops === 0) : cities

  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 cursor-pointer">
        <ChevronLeft className="h-4 w-4" /> Zurück zu allen Ländern
      </button>

      <h2 className="text-2xl md:text-3xl font-bold mb-2">
        Entdecke {countryName} {month ? `im ${getMonthName(month)}` : ""}
      </h2>
      <p className="text-muted-foreground mb-6">{cities.length} {cities.length === 1 ? "Stadt" : "Städte"} gefunden · Wähle eine für konkrete Angebote</p>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 no-scrollbar">
        {["Günstigste Flüge", "Direktflüge"].map(t => (
          <button key={t} onClick={() => setFilter(t)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap cursor-pointer transition-colors ${filter === t ? "bg-foreground text-background" : "bg-muted hover:bg-muted/80"}`}
          >{t}</button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((city, i) => (
          <Card key={city.code}
            className={`overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group animate-fade-in-up stagger-${Math.min(i + 1, 10)}`}
            onClick={() => onSelectCity(city.code, city.name)}
          >
            <div className="h-44 overflow-hidden relative">
              <img src={getCityImage(city.code)} alt={city.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <h3 className="font-bold text-xl drop-shadow-lg">{city.name}</h3>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">{city.count} {city.count === 1 ? "Verbindung" : "Verbindungen"}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{city.stops === 0 ? "Direkt verfügbar" : "Mit Umstieg"}</p>
                </div>
                <div className="text-right">
                  <div className="text-xs text-muted-foreground">ab</div>
                  <div className="text-2xl font-bold text-primary">~{formatPrice(city.price)}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <Card className="p-12 text-center">
          <Plane className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold">Keine Direktflüge gefunden</h3>
          <p className="text-muted-foreground mt-2">Wähle &quot;Günstigste Flüge&quot; für alle Verbindungen.</p>
        </Card>
      )}
    </div>
  )
}

// ========================================
// STEP 3: FLIGHT OFFERS TO A SPECIFIC CITY
// ========================================
function FlightOffers({ flights, destCode, destName, month, onBack }: {
  flights: FlightOffer[]; destCode: string; destName: string; month: string; onBack: () => void
}) {
  // Show flights to this specific airport AND to the same city via other airports
  const cityFlights = flights
    .filter(f => f.destination === destCode || f.destinationCity === destName)
    .sort((a, b) => a.price - b.price)

  const months = [] as { value: string; label: string }[]
  const now = new Date()
  for (let i = 0; i < 6; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() + i, 1)
    months.push({
      value: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
      label: d.toLocaleDateString("de-DE", { month: "short", year: "numeric" }),
    })
  }

  const [filter, setFilter] = useState("Günstigste Flüge")
  const filtered = filter === "Direktflüge" ? cityFlights.filter(f => f.stops === 0) : cityFlights

  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 cursor-pointer">
        <ChevronLeft className="h-4 w-4" /> Zurück
      </button>

      <h2 className="text-2xl md:text-3xl font-bold mb-1">Flugangebote nach {destName}</h2>
      {month && <p className="text-muted-foreground mb-4">Geschätzte günstigste Preise im {getMonthName(month)}</p>}

      {/* Month Tabs */}
      {month && (
        <div className="flex gap-2 mb-5 overflow-x-auto pb-2">
          {months.map(m => (
            <div key={m.value}
              className={`px-5 py-3 rounded-xl text-center min-w-[80px] cursor-pointer transition-all ${
                month === m.value ? "bg-sky-200 dark:bg-sky-800 font-bold" : "bg-muted hover:bg-muted/80"
              }`}
            >
              <div className="text-sm font-semibold">{m.label.split(" ")[0]}</div>
              <div className="text-[10px] text-muted-foreground">{m.label.split(" ")[1]}</div>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {["Günstigste Flüge", "Direktflüge"].map(t => (
          <button key={t} onClick={() => setFilter(t)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap cursor-pointer transition-colors ${filter === t ? "bg-foreground text-background" : "bg-muted hover:bg-muted/80"}`}
          >{t}</button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map(flight => {
          const days = flight.returnDate
            ? Math.ceil((new Date(flight.returnDate).getTime() - new Date(flight.departureDate).getTime()) / 86400000)
            : null

          return (
            <Card key={flight.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                {/* Hinflug */}
                <div className="flex items-center gap-3 mb-2">
                  <Plane className="h-4 w-4 text-primary shrink-0" />
                  <div className="flex-1">
                    <span className="font-semibold">
                      {flight.departureDate ? new Date(flight.departureDate).toLocaleDateString("de-DE", { weekday: "short", day: "numeric", month: "short" }) : ""}
                    </span>
                    {flight.departureTime && <span className="text-sm text-muted-foreground ml-1">{flight.departureTime}</span>}
                  </div>
                  <span className="text-sm font-medium">{flight.stops === 0 ? "Direkt" : `${flight.stops} Stopp`}</span>
                </div>
                <div className="text-xs text-muted-foreground ml-7 -mt-1 mb-2">
                  {flight.origin} nach {flight.destination} · {flight.airline}
                </div>

                {/* Rückflug */}
                {flight.returnDate && (
                  <>
                    <div className="flex items-center gap-3 mb-1">
                      <Plane className="h-4 w-4 text-primary shrink-0 rotate-180" />
                      <div className="flex-1">
                        <span className="font-semibold">
                          {new Date(flight.returnDate).toLocaleDateString("de-DE", { weekday: "short", day: "numeric", month: "short" })}
                        </span>
                      </div>
                      <span className="text-sm font-medium">{(flight.returnStops ?? flight.stops) === 0 ? "Direkt" : `${flight.returnStops ?? flight.stops} Stopp`}</span>
                    </div>
                    <div className="text-xs text-muted-foreground ml-7 -mt-0.5 mb-3">
                      {flight.destination} nach {flight.origin}
                    </div>
                  </>
                )}

                <div className="text-right mb-3">
                  <span className="text-sm text-muted-foreground">Ab </span>
                  <span className="text-2xl font-bold">~{formatPrice(flight.price)}</span>
                  {days && <div className="text-xs text-muted-foreground">{days}-Tage-Reise</div>}
                </div>

                <div className="border-t pt-3 text-center">
                  <Link
                    href={`/fluege/detail?origin=${flight.origin}&dest=${flight.destination}&dep=${flight.departureDate}&ret=${flight.returnDate || ""}&price=${flight.price}&airline=${encodeURIComponent(flight.airline)}&stops=${flight.stops}&depTime=${encodeURIComponent(flight.departureTime || "")}&duration=${flight.duration}`}
                    className="text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    Diese Reisedaten anzeigen <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <Card className="p-12 text-center">
          <Plane className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold">Keine Flüge gefunden</h3>
          <p className="text-muted-foreground mt-2">Versuche einen anderen Filter oder Monat.</p>
        </Card>
      )}
    </div>
  )
}

// ========================================
// STEP 2.5: SELECT DEPARTURE AIRPORT (when origin = country)
// ========================================
function SelectDepartureAirport({ flights, destCode, destName, month, originIsCountry, onSelectAirport, onBack }: {
  flights: FlightOffer[]; destCode: string; destName: string; month: string; originIsCountry: boolean
  onSelectAirport: (code: string, name: string) => void; onBack: () => void
}) {
  // Track multiple options per departure airport
  const airportStats = new Map<string, { price: number; stops: number; name: string; count: number }>()
  const destFlights = flights.filter(f => f.destination === destCode || f.destinationCity === destName)

  for (const f of destFlights) {
    const existing = airportStats.get(f.origin)
    if (!existing) {
      airportStats.set(f.origin, { price: f.price, stops: f.stops, name: f.originCity, count: 1 })
    } else {
      existing.count++
      if (f.price < existing.price) {
        existing.price = f.price
        existing.stops = f.stops
      }
    }
  }

  const airports = Array.from(airportStats.entries())
    .map(([code, data]) => ({ code, ...data }))
    .sort((a, b) => a.price - b.price)

  const [filter, setFilter] = useState("Günstigste Flüge")
  const filtered = filter === "Direktflüge" ? airports.filter(a => a.stops === 0) : airports

  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 cursor-pointer">
        <ChevronLeft className="h-4 w-4" /> Zurück
      </button>

      <h2 className="text-2xl md:text-3xl font-bold mb-2">Abflughafen auswählen</h2>
      <p className="text-muted-foreground mb-6">{airports.length} Flughäfen mit Verbindungen nach {destName}</p>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 no-scrollbar">
        {["Günstigste Flüge", "Direktflüge", "Alle verfügbaren Orte"].map(t => (
          <button key={t} onClick={() => setFilter(t)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap cursor-pointer transition-colors ${filter === t ? "bg-foreground text-background" : "bg-muted hover:bg-muted/80"}`}
          >{t}</button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((airport, i) => (
          <Card key={airport.code}
            className={`hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-pointer animate-fade-in-up stagger-${Math.min(i + 1, 10)}`}
            onClick={() => onSelectAirport(airport.code, airport.name)}
          >
            <CardContent className="p-4 flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold truncate">{airport.name}</h3>
                <p className="text-xs text-muted-foreground">
                  {airport.code} · {airport.count} {airport.count === 1 ? "Flug" : "Flüge"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {airport.stops === 0 ? "Direkt verfügbar" : "Mit Umstieg"}
                </p>
              </div>
              <div className="text-right shrink-0">
                <div className="text-xs text-muted-foreground">ab</div>
                <div className="text-xl font-bold text-primary">~{formatPrice(airport.price)}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <Card className="p-12 text-center">
          <Plane className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold">Keine Direktflüge gefunden</h3>
          <p className="text-muted-foreground mt-2">Wähle &quot;Günstigste Flüge&quot; für alle Verbindungen.</p>
        </Card>
      )}
    </div>
  )
}

// ========================================
// MAIN PAGE
// ========================================
function FlightSearchContent() {
  const searchParams = useSearchParams()
  const from = searchParams.get("from") || ""
  const to = searchParams.get("to") || ""
  const dep = searchParams.get("dep") || ""
  const ret = searchParams.get("ret") || ""

  const [flights, setFlights] = useState<FlightOffer[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const originIsCountry = isCountryCode(from)

  // Drill-down: Countries → Cities → (Airport if origin=country) → Flights
  const [selectedCountry, setSelectedCountry] = useState<{ code: string; name: string } | null>(
    to && isCountryCode(to) ? { code: to, name: getCountryNameFromDB(to) } : null
  )
  const [selectedCity, setSelectedCity] = useState<{ code: string; name: string } | null>(
    to && !isCountryCode(to) && to !== "EVERYWHERE" && to ? { code: to, name: getCity(to) } : null
  )
  const [selectedAirport, setSelectedAirport] = useState<{ code: string; name: string } | null>(null)

  const originLabel = originIsCountry ? `${getCountryNameFromDB(from)} (${from})` : (from ? getCity(from) : "")
  const destLabel = selectedCity ? selectedCity.name :
    selectedCountry ? selectedCountry.name : "Alle Orte"

  // AbortController + ref to prevent race condition
  const abortRef = useRef<AbortController | null>(null)

  const doSearch = useCallback(async () => {
    if (!from) return

    // Cancel previous request
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    setLoading(true); setError(null)
    try {
      const params = new URLSearchParams()
      // If specific airport selected, use it directly (gives more options for that route)
      if (selectedAirport && selectedCity) {
        params.set("origin", selectedAirport.code)
        params.set("destination", selectedCity.code)
      } else {
        params.set("origin", from)
        if (selectedCountry && !selectedCity) params.set("destination", selectedCountry.code)
        else if (selectedCity) params.set("destination", selectedCity.code)
      }
      if (dep) params.set("dep", dep)
      if (ret) params.set("ret", ret)

      const res = await fetch(`/api/flights/search?${params}`, { signal: controller.signal })
      if (!res.ok) throw new Error("API error")
      const data = await res.json()
      if (!controller.signal.aborted) {
        setFlights(data.results || [])
      }
    } catch (err: any) {
      if (err?.name !== "AbortError") {
        setError("Suche fehlgeschlagen. Bitte versuche es erneut.")
      }
    } finally {
      if (!controller.signal.aborted) setLoading(false)
    }
  }, [from, selectedCountry, selectedCity, selectedAirport, dep, ret])

  useEffect(() => {
    if (from) doSearch()
    return () => abortRef.current?.abort()
  }, [from, selectedCountry?.code, selectedCity?.code, selectedAirport?.code, dep]) // eslint-disable-line

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <SearchBar from={originLabel} to={destLabel} dep={dep} />

      {loading && (
        <div className="text-center py-20">
          <Loader2 className="h-10 w-10 text-primary mx-auto mb-4 animate-spin" />
          <h3 className="text-lg font-semibold">Suche läuft...</h3>
          <p className="text-muted-foreground mt-2">Wir durchsuchen hunderte Airlines nach den besten Preisen.</p>
        </div>
      )}

      {error && !loading && (
        <Card className="p-8 text-center">
          <AlertCircle className="h-10 w-10 text-destructive mx-auto mb-4" />
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={doSearch} variant="outline">Erneut versuchen</Button>
        </Card>
      )}

      {!loading && !error && !from && (
        <div className="text-center py-20">
          <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold">Starte eine Suche</h3>
          <p className="text-muted-foreground mt-2">Wähle auf der Startseite einen Abflugort.</p>
        </div>
      )}

      {/* STEP 4: Airport selected → flight offers (re-fetched from API) */}
      {!loading && !error && from && selectedCity && selectedAirport && (
        <FlightOffers
          flights={flights}
          destCode={selectedCity.code}
          destName={selectedCity.name}
          month={dep}
          onBack={() => setSelectedAirport(null)}
        />
      )}

      {/* STEP 3: City selected + origin is country → select departure airport */}
      {!loading && !error && from && selectedCity && !selectedAirport && originIsCountry && (
        <SelectDepartureAirport
          flights={flights}
          destCode={selectedCity.code}
          destName={selectedCity.name}
          month={dep}
          originIsCountry={originIsCountry}
          onSelectAirport={(code, name) => setSelectedAirport({ code, name })}
          onBack={() => setSelectedCity(null)}
        />
      )}

      {/* STEP 3 ALT: City selected + origin is specific airport → show flights directly */}
      {!loading && !error && from && selectedCity && !originIsCountry && (
        <FlightOffers flights={flights} destCode={selectedCity.code} destName={selectedCity.name} month={dep}
          onBack={() => setSelectedCity(null)} />
      )}

      {/* STEP 2: Country selected → cities */}
      {!loading && !error && from && selectedCountry && !selectedCity && (
        <ExploreCities flights={flights} countryCode={selectedCountry.code} countryName={selectedCountry.name} month={dep}
          onSelectCity={(code, name) => setSelectedCity({ code, name })}
          onBack={() => setSelectedCountry(null)} />
      )}

      {/* STEP 1: Nothing selected → countries */}
      {!loading && !error && from && !selectedCountry && !selectedCity && (
        <ExploreCountries flights={flights} month={dep}
          onSelectCountry={(code, name) => setSelectedCountry({ code, name })} />
      )}

      {!loading && flights.length > 0 && (
        <div className="mt-8 text-center text-xs text-muted-foreground">
          Richtwerte pro Person · Tagesaktuelle Preise beim Anbieter prüfen
        </div>
      )}
    </div>
  )
}

export default function FluegePage() {
  return (
    <Suspense fallback={<div className="container mx-auto p-8 text-center"><Loader2 className="h-8 w-8 animate-spin mx-auto" /></div>}>
      <FlightSearchContent />
    </Suspense>
  )
}
