import { NextRequest, NextResponse } from "next/server"
import { getMockFlights } from "@/lib/deal-engine/mock-data"
import { isTravelpayoutsConfigured, getCheapFlightsV1, getCheapestFlights } from "@/lib/apis/travelpayouts"
import { getAirportsForCountry, isKnownCountry } from "@/lib/data/iata-database"

function isCountryCode(code: string): boolean {
  return code.length === 2 && /^[A-Z]{2}$/.test(code) && isKnownCountry(code)
}

const TOP_DE = ["FRA", "MUC", "BER", "DUS", "HAM", "CGN", "STR", "NUE", "HHN", "FMM", "HAJ", "LEJ", "DTM", "BRE", "PAD"]
const TOP_AT = ["VIE", "SZG", "INN", "GRZ"]
const TOP_CH = ["ZRH", "GVA", "BSL"]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const origin = searchParams.get("origin") || ""
  const destination = searchParams.get("destination") || ""
  const dep = searchParams.get("dep") || undefined
  const ret = searchParams.get("ret") || undefined

  if (!isTravelpayoutsConfigured() || !origin) {
    const flights = getMockFlights(origin || undefined, destination || undefined)
    return NextResponse.json({ results: flights, count: flights.length, source: "mock" })
  }

  const originAirports = isCountryCode(origin)
    ? (origin === "DE" ? TOP_DE : origin === "AT" ? TOP_AT : origin === "CH" ? TOP_CH : getAirportsForCountry(origin).slice(0, 5))
    : [origin]

  const isEverywhere = !destination || destination === "EVERYWHERE"
  const isSpecificRoute = !isCountryCode(origin) && !isCountryCode(destination) && destination && !isEverywhere

  try {
    let allFlights: Awaited<ReturnType<typeof getCheapFlightsV1>> = []

    if (isSpecificRoute) {
      // Specific route: Use V3 ONLY (gives many options) + try variations
      // Call V3 multiple times for different month variations to maximize results
      const months = []
      const now = new Date()
      for (let i = 0; i < 6; i++) {
        const d = new Date(now.getFullYear(), now.getMonth() + i, 1)
        months.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`)
      }

      const targetMonths = dep ? [dep] : months.slice(0, 3)

      const searches = targetMonths.map((m) =>
        getCheapestFlights({ origin, destination, departureAt: m, returnAt: ret }).catch(() => [])
      )
      const results = await Promise.all(searches)
      allFlights = results.flat()
    } else {
      // Country/everywhere: V1 cheap (one call = all destinations cheapest)
      const searches = originAirports.slice(0, isEverywhere ? 5 : 8).map((orig) =>
        getCheapFlightsV1({
          origin: orig,
          destination: isCountryCode(destination) ? undefined : (isEverywhere ? undefined : destination),
          departureMonth: dep,
          returnMonth: ret,
        }).catch(() => [])
      )

      // Also fetch V3 for top destinations to get more variety
      if (destination && !isEverywhere && !isCountryCode(destination)) {
        searches.push(
          ...originAirports.slice(0, 3).map((orig) =>
            getCheapestFlights({ origin: orig, destination, departureAt: dep, returnAt: ret }).catch(() => [])
          )
        )
      }

      const results = await Promise.all(searches)
      allFlights = results.flat()

      if (isCountryCode(destination)) {
        const destAirports = new Set(getAirportsForCountry(destination))
        allFlights = allFlights.filter(f => destAirports.has(f.destination))
      }
    }

    if (allFlights.length > 0) {
      // Sort by price, dedupe by departure_at + price + airline (allows same-day different times)
      const sorted = allFlights.sort((a, b) => a.price - b.price)
      const seen = new Set<string>()
      const unique = sorted.filter((f) => {
        const key = `${f.origin}-${f.destination}-${f.departureDate}-${f.departureTime || ""}-${f.airline}-${f.price}`
        if (seen.has(key)) return false
        seen.add(key)
        return true
      }).slice(0, 200) // Up to 200 results for specific routes

      return NextResponse.json({ results: unique, count: unique.length, source: "travelpayouts" })
    }
  } catch (error) {
    console.error("Flight search error:", error)
  }

  const flights = getMockFlights(
    !isCountryCode(origin) ? origin : undefined,
    !isCountryCode(destination) && !isEverywhere ? destination : undefined
  )
  return NextResponse.json({ results: flights, count: flights.length, source: "mock" })
}
