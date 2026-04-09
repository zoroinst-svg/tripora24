import { NextRequest, NextResponse } from "next/server"
import { getMockHotels } from "@/lib/deal-engine/mock-data"
import { isHotellookConfigured, searchHotels } from "@/lib/apis/hotellook"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const destination = searchParams.get("destination") || undefined
  const checkIn = searchParams.get("checkIn") || undefined
  const checkOut = searchParams.get("checkOut") || undefined

  // Priority 1: Hotellook/Travelpayouts (Booking.com, Agoda etc.)
  if (isHotellookConfigured() && destination) {
    try {
      const hotels = await searchHotels({
        destination,
        checkIn: checkIn || undefined,
        checkOut: checkOut || undefined,
      })
      if (hotels.length > 0) {
        return NextResponse.json({
          results: hotels,
          count: hotels.length,
          source: "hotellook",
        })
      }
    } catch (error) {
      console.error("Hotellook error:", error)
    }
  }

  // Fallback: Mock data
  const hotels = getMockHotels(destination)
  return NextResponse.json({
    results: hotels,
    count: hotels.length,
    source: "mock",
  })
}
