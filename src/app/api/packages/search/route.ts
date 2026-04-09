import { NextRequest, NextResponse } from "next/server"
import { getMockFlights, getMockHotels } from "@/lib/deal-engine/mock-data"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const origin = searchParams.get("origin") || undefined
  const destination = searchParams.get("destination") || undefined

  const flights = getMockFlights(origin, destination)
  const hotels = getMockHotels(destination)

  // Build virtual packages by combining cheapest flight + cheapest hotel per destination
  const destinations = [...new Set(flights.map((f) => f.destination))]
  const packages = destinations.map((dest) => {
    const cheapestFlight = flights.filter((f) => f.destination === dest).sort((a, b) => a.price - b.price)[0]
    const matchingHotel = hotels.find((h) => h.destination === dest)

    if (!cheapestFlight || !matchingHotel) return null

    return {
      destination: matchingHotel.destinationCity,
      flight: { airline: cheapestFlight.airline, price: cheapestFlight.price, origin: cheapestFlight.originCity },
      hotel: { name: matchingHotel.name, priceTotal: matchingHotel.totalPrice, nights: matchingHotel.nights, mealPlan: matchingHotel.mealPlan },
      totalPrice: cheapestFlight.price + matchingHotel.totalPrice,
      avgPrice: cheapestFlight.avgPrice + matchingHotel.avgPricePerNight * matchingHotel.nights,
    }
  }).filter(Boolean)

  return NextResponse.json({
    results: packages,
    count: packages.length,
    source: "virtual",
  })
}
