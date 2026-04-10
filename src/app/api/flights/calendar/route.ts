import { NextRequest, NextResponse } from "next/server"

const TOKEN = process.env.TRAVELPAYOUTS_TOKEN || ""

// Get day-by-day prices for a specific route + month
// or month-by-month prices for a route across the year
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const origin = searchParams.get("origin") || ""
  const destination = searchParams.get("destination") || ""
  const month = searchParams.get("month") // YYYY-MM
  const mode = searchParams.get("mode") || "month" // "month" or "year"

  if (!TOKEN || !origin || !destination) {
    return NextResponse.json({ prices: {}, source: "none" })
  }

  try {
    if (mode === "year") {
      // Get cheapest price per month for the next 12 months
      const months: Record<string, number> = {}
      const now = new Date()

      const promises = []
      for (let i = 0; i < 12; i++) {
        const d = new Date(now.getFullYear(), now.getMonth() + i, 1)
        const monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`
        promises.push(
          fetch(
            `https://api.travelpayouts.com/aviasales/v3/prices_for_dates?origin=${origin}&destination=${destination}&depart_date=${monthKey}&currency=EUR&sorting=price&token=${TOKEN}`,
            { next: { revalidate: 600 } }
          )
            .then((r) => r.json())
            .then((data) => {
              if (data.success && Array.isArray(data.data) && data.data.length > 0) {
                const cheapest = Math.min(...data.data.map((it: any) => it.price || it.value || Infinity))
                if (cheapest !== Infinity) months[monthKey] = Math.round(cheapest)
              }
            })
            .catch(() => {})
        )
      }

      await Promise.all(promises)
      return NextResponse.json({ prices: months, source: "travelpayouts" })
    }

    // Month mode: day-by-day prices for specific month
    if (!month) return NextResponse.json({ prices: {}, source: "none" })

    const res = await fetch(
      `https://api.travelpayouts.com/aviasales/v3/prices_for_dates?origin=${origin}&destination=${destination}&depart_date=${month}&currency=EUR&sorting=price&token=${TOKEN}`,
      { next: { revalidate: 600 } }
    )

    if (!res.ok) return NextResponse.json({ prices: {}, source: "error" })
    const data = await res.json()
    if (!data.success || !Array.isArray(data.data)) return NextResponse.json({ prices: {}, source: "empty" })

    // Build day → cheapest price map
    const dayPrices: Record<string, number> = {}
    for (const item of data.data) {
      const dateStr = item.departure_at?.split("T")[0] || item.depart_date
      if (!dateStr) continue
      const price = item.price || item.value || 0
      if (!dayPrices[dateStr] || price < dayPrices[dateStr]) {
        dayPrices[dateStr] = price
      }
    }

    return NextResponse.json({ prices: dayPrices, source: "travelpayouts" })
  } catch (error) {
    console.error("Calendar API error:", error)
    return NextResponse.json({ prices: {}, source: "error" })
  }
}
