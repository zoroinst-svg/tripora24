// Travelpayouts API — FREE, real flight data, we earn per booking
import type { FlightOffer } from "@/lib/deal-engine/mock-data"
import { getCity } from "@/lib/data/iata-database"

const API_TOKEN = process.env.TRAVELPAYOUTS_TOKEN || ""
const AFFILIATE_MARKER = process.env.TRAVELPAYOUTS_MARKER || ""
const BASE_URL = "https://api.travelpayouts.com"

// Common airline codes → names
const AIRLINE_NAMES: Record<string, string> = {
  FR: "Ryanair", EW: "Eurowings", LH: "Lufthansa", OS: "Austrian",
  LX: "Swiss", U2: "EasyJet", W6: "Wizz Air", DE: "Condor",
  XQ: "SunExpress", TK: "Turkish Airlines", PC: "Pegasus",
  VY: "Vueling", IB: "Iberia", BA: "British Airways", AF: "Air France",
  KL: "KLM", AZ: "ITA Airways", TP: "TAP Portugal", SK: "SAS",
  DY: "Norwegian", EI: "Aer Lingus", HV: "Transavia", TO: "Transavia France",
  BT: "airBaltic", OA: "Olympic Air", A3: "Aegean", FB: "Bulgaria Air",
  RO: "TAROM", LO: "LOT", QS: "SmartWings", OK: "Czech Airlines",
  "6E": "IndiGo", FZ: "Flydubai", EK: "Emirates", QR: "Qatar Airways",
  EY: "Etihad", TG: "Thai Airways", SQ: "Singapore Airlines",
  X3: "TUIfly", "4U": "Germanwings", EN: "Air Dolomiti",
  SN: "Brussels Airlines", AY: "Finnair", DL: "Delta",
  UA: "United", AA: "American Airlines", AC: "Air Canada",
  JU: "Air Serbia", OU: "Croatia Airlines", JP: "Adria Airways",
  MW: "Mokulele", "8P": "Pacific Coastal", "5O": "ASL Airlines",
}

// Multi-city codes that Travelpayouts uses
const CITY_CODE_MAP: Record<string, string> = {
  LON: "LHR", NYC: "JFK", PAR: "CDG", MIL: "MXP", ROM: "FCO",
  BER: "BER", MOW: "SVO", BUH: "OTP", IST: "IST",
}

export function isTravelpayoutsConfigured(): boolean {
  return API_TOKEN.length > 0
}

function getAirlineName(code: string): string {
  return AIRLINE_NAMES[code] || code
}

// Resolve city codes (LON → London, etc.)
function resolveDestination(code: string): string {
  return CITY_CODE_MAP[code] || code
}

export async function getCheapestFlights(params: {
  origin: string
  destination: string
  departureAt?: string
  returnAt?: string
  currency?: string
}): Promise<FlightOffer[]> {
  const searchParams = new URLSearchParams({
    origin: params.origin,
    currency: params.currency || "EUR",
    token: API_TOKEN,
  })
  if (params.destination) searchParams.set("destination", params.destination)
  if (params.departureAt) searchParams.set("depart_date", params.departureAt)
  if (params.returnAt) searchParams.set("return_date", params.returnAt)

  const res = await fetch(`${BASE_URL}/aviasales/v3/prices_for_dates?${searchParams}`, {
    headers: { "X-Access-Token": API_TOKEN },
    next: { revalidate: 300 },
  })

  if (!res.ok) return []
  const data = await res.json()
  if (!data.success || !data.data) return []

  return data.data
    .filter((item: any) => item.departure_at || item.depart_date) // Skip items without dates
    .map((item: any, i: number) => mapToFlightOffer(item, i, params.origin, params.destination))
}

export async function getPopularRoutes(origin: string): Promise<FlightOffer[]> {
  const res = await fetch(`${BASE_URL}/aviasales/v3/get_latest_prices?origin=${origin}&currency=EUR&period_type=month&limit=20&token=${API_TOKEN}`, {
    headers: { "X-Access-Token": API_TOKEN },
    next: { revalidate: 600 },
  })

  if (!res.ok) return []
  const data = await res.json()
  if (!data.success || !data.data) return []

  return data.data
    .filter((item: any) => item.departure_at || item.depart_date)
    .map((item: any, i: number) => mapToFlightOffer(item, i, origin, item.destination))
}

// V1 Cheap API — returns proper return_at dates!
export async function getCheapFlightsV1(params: {
  origin: string
  destination?: string
  departureMonth?: string // YYYY-MM
  returnMonth?: string
}): Promise<FlightOffer[]> {
  const searchParams = new URLSearchParams({
    origin: params.origin,
    currency: "EUR",
    token: API_TOKEN,
  })
  if (params.destination) searchParams.set("destination", params.destination)
  if (params.departureMonth) searchParams.set("depart_date", params.departureMonth)
  if (params.returnMonth) searchParams.set("return_date", params.returnMonth)

  const res = await fetch(`${BASE_URL}/v1/prices/cheap?${searchParams}`, {
    headers: { "X-Access-Token": API_TOKEN },
    next: { revalidate: 300 },
  })

  if (!res.ok) return []
  const data = await res.json()
  if (!data.success || !data.data) return []

  const flights: FlightOffer[] = []
  // V1 response format: { data: { "PMI": { "0": {...}, "1": {...} }, "BCN": {...} } }
  for (const [destCode, transfers] of Object.entries(data.data as Record<string, any>)) {
    for (const [, item] of Object.entries(transfers as Record<string, any>)) {
      const departureAt = item.departure_at || ""
      const returnAt = item.return_at || ""
      const departDate = departureAt.split("T")[0]
      const returnDate = returnAt.split("T")[0]
      const realDest = resolveDestination(destCode)
      const airlineCode = item.airline || ""

      const bookingUrl = buildAffiliateUrl(params.origin, realDest, departDate, returnDate)

      flights.push({
        id: `tp1-${destCode}-${departDate}`,
        airline: getAirlineName(airlineCode),
        airlineLogo: airlineCode ? `https://images.kiwi.com/airlines/64/${airlineCode}.png` : "",
        origin: params.origin,
        originCity: getCity(params.origin),
        destination: realDest,
        destinationCity: getCity(realDest) !== realDest ? getCity(realDest) : getCity(destCode),
        departureTime: departureAt ? new Date(departureAt).toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" }) : "",
        arrivalTime: "",
        departureDate: departDate,
        returnDate: returnDate || undefined,
        duration: item.duration_to || item.duration || 0,
        stops: parseInt(Object.keys(transfers).find(k => (transfers as any)[k] === item) || "0") || 0,
        price: item.price || 0,
        avgPrice: Math.round((item.price || 0) * 1.35),
        currency: "EUR",
        cabinClass: "Economy",
        bookingUrl,
        source: "travelpayouts",
        returnDepartureTime: returnAt ? new Date(returnAt).toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" }) : "",
        returnArrivalTime: "",
        returnDuration: item.duration_back || 0,
        returnStops: item.return_transfers ?? 0,
      })
    }
  }
  return flights
}

export async function getMonthPrices(params: {
  origin: string
  destination: string
  month: string
}): Promise<{ date: string; price: number }[]> {
  const res = await fetch(
    `${BASE_URL}/aviasales/v3/prices_for_dates?origin=${params.origin}&destination=${params.destination}&depart_date=${params.month}&currency=EUR&sorting=price&token=${API_TOKEN}`,
    {
      headers: { "X-Access-Token": API_TOKEN },
      next: { revalidate: 600 },
    }
  )

  if (!res.ok) return []
  const data = await res.json()
  if (!data.success || !data.data) return []

  return data.data.map((item: any) => ({
    date: item.depart_date || item.departure_at?.split("T")[0],
    price: item.price || item.value,
  }))
}

function mapToFlightOffer(item: any, index: number, origin: string, destination: string): FlightOffer {
  // Travelpayouts uses "price" (v3) or "value" (v2)
  const price = item.price || item.value || 0
  const rawDest = item.destination || destination
  const resolvedDest = resolveDestination(rawDest)
  const airlineCode = item.airline || ""

  // Extract dates
  const departureAt = item.departure_at || ""
  const departDate = item.depart_date || (departureAt ? departureAt.split("T")[0] : "")

  // Travelpayouts doesn't return return_date — calculate it (default +7 days for round-trip)
  let returnDate = item.return_date || item.return_at?.split("T")[0] || undefined
  if (!returnDate && departDate) {
    const dep = new Date(departDate)
    dep.setDate(dep.getDate() + 7) // Default 7-day trip
    returnDate = dep.toISOString().split("T")[0]
  }

  // Real origin airport (e.g. HHN instead of FRA)
  const realOrigin = item.origin_airport || item.origin || origin

  // Always build our own URL with correct round-trip dates
  // The API's item.link often lacks return date
  const bookingUrl = buildAffiliateUrl(realOrigin, resolvedDest, departDate, returnDate)

  return {
    id: `tp-${index}-${departDate}-${resolvedDest}`,
    airline: getAirlineName(airlineCode),
    airlineLogo: airlineCode ? `https://images.kiwi.com/airlines/64/${airlineCode}.png` : "",
    origin: realOrigin,
    originCity: getCity(realOrigin),
    destination: item.destination_airport || resolvedDest,
    destinationCity: getCity(item.destination_airport || resolvedDest) !== (item.destination_airport || resolvedDest)
      ? getCity(item.destination_airport || resolvedDest)
      : getCity(rawDest),
    departureTime: departureAt ? new Date(departureAt).toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" }) : "",
    arrivalTime: "",
    departureDate: departDate,
    returnDate,
    duration: item.duration_to || item.duration || 0,
    stops: item.transfers ?? 0,
    price,
    avgPrice: Math.round(price * 1.35),
    currency: "EUR",
    cabinClass: "Economy",
    bookingUrl,
    source: "travelpayouts",
    returnDepartureTime: "",
    returnArrivalTime: "",
    returnDuration: item.duration_back || 0,
    returnStops: item.return_transfers ?? item.transfers ?? 0,
  }
}

function buildAffiliateUrl(origin: string, destination: string, departDate?: string, returnDate?: string): string {
  const marker = AFFILIATE_MARKER || "direct"
  // Aviasales format: /search/FRA1506PMI2206 1 (origin + DDMM + dest + DDMM + passengers)
  // Date 2026-06-15 → "1506" (day 15, month 06)
  const formatDate = (d?: string) => {
    if (!d || d.length < 10) return ""
    const parts = d.split("-") // ["2026", "06", "15"]
    return parts[2] + parts[1] // "15" + "06" = "1506"
  }
  const depCode = formatDate(departDate)
  const retCode = formatDate(returnDate)
  return `https://www.aviasales.com/search/${origin}${depCode}${destination}${retCode}1?marker=${marker}`
}
