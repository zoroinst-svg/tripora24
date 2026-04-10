import { NextResponse } from "next/server"
import { MOCK_TRENDING_DEALS, type TrendingDeal } from "@/lib/deal-engine/mock-data"
import { isTravelpayoutsConfigured, getCheapFlightsV1 } from "@/lib/apis/travelpayouts"
import { getCityImage, getCountryImage } from "@/lib/utils/images"
import { getCountryCode } from "@/lib/data/iata-database"

export async function GET() {
  if (isTravelpayoutsConfigured()) {
    try {
      // Get cheap flights from top DACH airports using V1 API (has return dates!)
      const origins = ["FRA", "MUC", "BER", "DUS", "HAM"]
      const allFlights = await Promise.all(
        origins.map((o) => getCheapFlightsV1({ origin: o }).catch(() => []))
      )
      const flights = allFlights.flat()
        .filter(f => f.price > 0 && f.departureDate)
        .sort((a, b) => a.price - b.price)

      if (flights.length > 0) {
        // Deduplicate by destination — show cheapest per destination
        const seenDest = new Set<string>()
        const uniqueFlights = flights.filter(f => {
          if (seenDest.has(f.destination)) return false
          seenDest.add(f.destination)
          return true
        })

        const deals: TrendingDeal[] = uniqueFlights.slice(0, 9).map((f, i) => {
          const cc = getCountryCode(f.destination)
          return {
            id: `tp-deal-${i}`,
            type: "flight" as const,
            title: `${f.originCity} → ${f.destinationCity}`,
            subtitle: `${f.airline}, ${f.stops === 0 ? "Nonstop" : f.stops + " Stopp"}${f.returnDate ? ` · ${Math.ceil((new Date(f.returnDate).getTime() - new Date(f.departureDate).getTime()) / 86400000)} Tage` : ""}`,
            imageUrl: getCityImage(f.destination) || getCountryImage(cc),
            price: f.price,
            avgPrice: f.avgPrice,
            currency: "EUR",
            dealScore: f.avgPrice > 0 ? Math.round(((f.avgPrice - f.price) / f.avgPrice) * 100) : 0,
            origin: f.origin, // IATA code (e.g. "FRA")
            destination: f.destination, // IATA code (e.g. "PMI") — was destinationCity (display name) before
            destinationName: f.destinationCity, // Display name (e.g. "Mallorca")
            departureDate: f.departureDate, // YYYY-MM-DD
            returnDate: f.returnDate, // YYYY-MM-DD
            dates: f.departureDate && f.returnDate
              ? `${new Date(f.departureDate).toLocaleDateString("de-DE", { day: "numeric", month: "short" })} – ${new Date(f.returnDate).toLocaleDateString("de-DE", { day: "numeric", month: "short" })}`
              : f.departureDate,
            bookingUrl: f.bookingUrl,
          }
        })

        return NextResponse.json({ results: deals, count: deals.length, source: "travelpayouts" })
      }
    } catch (error) {
      console.error("Travelpayouts trending error:", error)
    }
  }

  const deals = [...MOCK_TRENDING_DEALS].sort((a, b) => b.dealScore - a.dealScore)
  return NextResponse.json({ results: deals, count: deals.length, source: "mock" })
}
