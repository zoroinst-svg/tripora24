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
      // Specific route like FRA→PMI: use BOTH V1 (return dates) + V3 (more options)
      const [v1, v3] = await Promise.all([
        getCheapFlightsV1({ origin, destination, departureMonth: dep, returnMonth: ret }).catch(() => []),
        getCheapestFlights({ origin, destination, departureAt: dep, returnAt: ret }).catch(() => []),
      ])
      allFlights = [...v1, ...v3]
    } else {
      // Country/everywhere search: V1 is fast (one call = all destinations)
      const searches = originAirports.slice(0, isEverywhere ? 5 : 8).map((orig) =>
        getCheapFlightsV1({
          origin: orig,
          destination: isCountryCode(destination) ? undefined : (isEverywhere ? undefined : destination),
          departureMonth: dep,
          returnMonth: ret,
        }).catch(() => [])
      )
      const results = await Promise.all(searches)
      allFlights = results.flat()

      // Filter to country if needed
      if (isCountryCode(destination)) {
        const destAirports = new Set(getAirportsForCountry(destination))
        allFlights = allFlights.filter(f => destAirports.has(f.destination))
      }
    }

    if (allFlights.length > 0) {
      const sorted = allFlights.sort((a, b) => a.price - b.price)
      const seen = new Set<string>()
      const unique = sorted.filter((f) => {
        const key = `${f.origin}-${f.destination}-${f.departureDate}-${f.price}`
        if (seen.has(key)) return false
        seen.add(key)
        return true
      }).slice(0, 100)

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
