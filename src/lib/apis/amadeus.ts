import type { FlightOffer } from "@/lib/deal-engine/mock-data"

let accessToken: string | null = null
let tokenExpiresAt = 0

const API_KEY = process.env.AMADEUS_API_KEY || ""
const API_SECRET = process.env.AMADEUS_API_SECRET || ""
const BASE_URL = "https://test.api.amadeus.com" // Switch to api.amadeus.com for production

export function isAmadeusConfigured(): boolean {
  return API_KEY.length > 0 && API_SECRET.length > 0
}

async function getAccessToken(): Promise<string> {
  if (accessToken && Date.now() < tokenExpiresAt) return accessToken

  const res = await fetch(`${BASE_URL}/v1/security/oauth2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: API_KEY,
      client_secret: API_SECRET,
    }),
  })

  if (!res.ok) throw new Error(`Amadeus auth failed: ${res.status}`)

  const data = await res.json()
  accessToken = data.access_token
  tokenExpiresAt = Date.now() + (data.expires_in - 60) * 1000 // Refresh 60s before expiry
  return accessToken!
}

interface AmadeusSearchParams {
  origin: string
  destination: string
  departureDate: string
  returnDate?: string
  adults?: number
  maxResults?: number
}

export async function searchFlights(params: AmadeusSearchParams): Promise<FlightOffer[]> {
  const token = await getAccessToken()

  const searchParams = new URLSearchParams({
    originLocationCode: params.origin,
    destinationLocationCode: params.destination,
    departureDate: params.departureDate,
    adults: String(params.adults || 1),
    max: String(params.maxResults || 20),
    currencyCode: "EUR",
  })
  if (params.returnDate) searchParams.set("returnDate", params.returnDate)

  const res = await fetch(`${BASE_URL}/v2/shopping/flight-offers?${searchParams}`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!res.ok) {
    const err = await res.text()
    console.error("Amadeus search failed:", res.status, err)
    throw new Error(`Amadeus search failed: ${res.status}`)
  }

  const data = await res.json()
  return mapAmadeusResults(data, params.origin, params.destination)
}

function mapAmadeusResults(data: any, origin: string, destination: string): FlightOffer[] {
  if (!data.data || !Array.isArray(data.data)) return []

  const carrierNames: Record<string, string> = data.dictionaries?.carriers || {}

  return data.data.map((offer: any, index: number) => {
    const outbound = offer.itineraries?.[0]
    const inbound = offer.itineraries?.[1]
    const firstSegment = outbound?.segments?.[0]
    const lastSegment = outbound?.segments?.[outbound.segments.length - 1]
    const carrierCode = firstSegment?.carrierCode || "XX"
    const airlineName = carrierNames[carrierCode] || carrierCode

    const price = parseFloat(offer.price?.total || "0")

    // Parse outbound duration (PT2H45M -> 165 minutes)
    const durationMinutes = parseDuration(outbound?.duration || "PT0H0M")

    const flight: FlightOffer = {
      id: `amadeus-${offer.id || index}`,
      airline: airlineName,
      airlineLogo: `https://images.kiwi.com/airlines/64/${carrierCode}.png`,
      origin: firstSegment?.departure?.iataCode || origin,
      originCity: firstSegment?.departure?.iataCode || origin,
      destination: lastSegment?.arrival?.iataCode || destination,
      destinationCity: lastSegment?.arrival?.iataCode || destination,
      departureTime: formatTimeFromISO(firstSegment?.departure?.at),
      arrivalTime: formatTimeFromISO(lastSegment?.arrival?.at),
      departureDate: firstSegment?.departure?.at?.split("T")[0] || "",
      returnDate: inbound?.segments?.[0]?.departure?.at?.split("T")[0],
      duration: durationMinutes,
      stops: (outbound?.segments?.length || 1) - 1,
      stopCities: outbound?.segments?.length > 1
        ? outbound.segments.slice(0, -1).map((s: any) => s.arrival?.iataCode)
        : undefined,
      price,
      avgPrice: price * 1.3, // Estimate: real avg comes from price_history table
      currency: offer.price?.currency || "EUR",
      cabinClass: offer.travelerPricings?.[0]?.fareDetailsBySegment?.[0]?.cabin || "ECONOMY",
      bookingUrl: "#",
      source: "amadeus",
    }

    if (inbound) {
      const returnFirst = inbound.segments[0]
      const returnLast = inbound.segments[inbound.segments.length - 1]
      flight.returnDepartureTime = formatTimeFromISO(returnFirst?.departure?.at)
      flight.returnArrivalTime = formatTimeFromISO(returnLast?.arrival?.at)
      flight.returnDuration = parseDuration(inbound.duration || "PT0H0M")
      flight.returnStops = (inbound.segments?.length || 1) - 1
    }

    return flight
  })
}

function parseDuration(iso: string): number {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?/)
  if (!match) return 0
  return (parseInt(match[1] || "0") * 60) + parseInt(match[2] || "0")
}

function formatTimeFromISO(iso?: string): string {
  if (!iso) return "--:--"
  const date = new Date(iso)
  return date.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })
}
