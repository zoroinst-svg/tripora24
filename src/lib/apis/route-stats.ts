// Route-Statistiken aus Travelpayouts für programmatische SEO-Seiten
// Cached via Next.js ISR — revalidate täglich

import { getCheapestFlights } from "./travelpayouts"

export interface RouteStats {
  cheapestPrice: number | null
  avgPrice: number | null
  maxPrice: number | null
  cheapestMonth: string | null // YYYY-MM
  airlines: { code: string; name: string; count: number }[]
  avgDurationMin: number | null
  directFlightShare: number // 0..1
  flightsFound: number
  monthlyPrices: { month: string; minPrice: number }[]
  updatedAt: string
}

const MONTHS_DE = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"]

export function monthLabel(ym: string | null): string {
  if (!ym) return ""
  const [y, m] = ym.split("-")
  return `${MONTHS_DE[parseInt(m) - 1]} ${y}`
}

export async function getRouteStats(origin: string, destination: string): Promise<RouteStats> {
  const empty: RouteStats = {
    cheapestPrice: null,
    avgPrice: null,
    maxPrice: null,
    cheapestMonth: null,
    airlines: [],
    avgDurationMin: null,
    directFlightShare: 0,
    flightsFound: 0,
    monthlyPrices: [],
    updatedAt: new Date().toISOString(),
  }

  try {
    const offers = await Promise.race([
      getCheapestFlights({ origin, destination }),
      new Promise<never>((_, reject) => setTimeout(() => reject(new Error("timeout")), 4000)),
    ])

    if (!offers || offers.length === 0) return empty

    const prices = offers.map((o) => o.price).filter((p) => p > 0)
    if (prices.length === 0) return empty

    const cheapestPrice = Math.min(...prices)
    const maxPrice = Math.max(...prices)
    const avgPrice = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length)

    // Group airlines
    const airlineMap = new Map<string, { code: string; name: string; count: number }>()
    for (const o of offers) {
      if (!o.airline) continue
      const key = o.airline
      const existing = airlineMap.get(key)
      if (existing) existing.count++
      else airlineMap.set(key, { code: key, name: o.airline, count: 1 })
    }
    const airlines = Array.from(airlineMap.values()).sort((a, b) => b.count - a.count).slice(0, 8)

    // Duration
    const durations = offers.map((o) => o.duration).filter((d) => d > 0)
    const avgDurationMin = durations.length ? Math.round(durations.reduce((a, b) => a + b, 0) / durations.length) : null

    // Direct flight share
    const directs = offers.filter((o) => o.stops === 0).length
    const directFlightShare = offers.length > 0 ? directs / offers.length : 0

    // Monthly aggregates
    const monthly = new Map<string, number>()
    for (const o of offers) {
      if (!o.departureDate) continue
      const month = o.departureDate.slice(0, 7) // YYYY-MM
      const min = monthly.get(month)
      if (min === undefined || o.price < min) monthly.set(month, o.price)
    }
    const monthlyPrices = Array.from(monthly.entries())
      .map(([month, minPrice]) => ({ month, minPrice }))
      .sort((a, b) => a.month.localeCompare(b.month))

    const cheapestMonth = monthlyPrices.length > 0
      ? monthlyPrices.reduce((min, cur) => (cur.minPrice < min.minPrice ? cur : min)).month
      : null

    return {
      cheapestPrice,
      avgPrice,
      maxPrice,
      cheapestMonth,
      airlines,
      avgDurationMin,
      directFlightShare,
      flightsFound: offers.length,
      monthlyPrices,
      updatedAt: new Date().toISOString(),
    }
  } catch {
    return empty
  }
}

export function formatDuration(minutes: number | null): string {
  if (!minutes) return ""
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m > 0 ? `${h}h ${m}min` : `${h}h`
}
