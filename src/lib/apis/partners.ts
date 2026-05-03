// Travelpayouts Partner Programs — Affiliate URL builders
// All links route through Travelpayouts using your marker so we earn commission
// on every booking. The marker is universal across all programs you've been
// approved for in the Travelpayouts dashboard.
//
// Program IDs (p=) come from Travelpayouts docs. If a click lands on the partner
// without tracking, verify the program ID in your TP dashboard → "Tools → Links".

const MARKER = process.env.TRAVELPAYOUTS_MARKER || ""

// Travelpayouts program IDs — verify in TP dashboard if tracking breaks
const PROGRAM_IDS = {
  kiwi: 4471,
  getYourGuide: 4483,
  kiwiTaxi: 4480,
  discoverCars: 4519,
  localrent: 4581,
  compensair: 4513,
  ekta: 4509,
  tiqets: 4488,
} as const

/**
 * Build a Travelpayouts redirect URL — universal affiliate wrapper.
 * The user clicks → tp.media tracks → lands on the partner with attribution.
 */
function tpRedirect(programId: number, targetUrl: string): string {
  const marker = MARKER || "direct"
  const u = encodeURIComponent(targetUrl)
  return `https://tp.media/r?marker=${marker}&trs=${marker}&p=${programId}&u=${u}&campaign_id=${programId}`
}

// ──────────────────────────────────────────────────────────
// KIWI.COM — alternative flight booking
// ──────────────────────────────────────────────────────────
export function buildKiwiUrl(params: {
  origin: string
  destination: string
  departureDate?: string
  returnDate?: string
  adults?: number
}): string {
  const { origin, destination, departureDate, returnDate, adults = 1 } = params
  // Kiwi accepts IATA codes in their deep-link search URL
  const dep = departureDate || ""
  const ret = returnDate || ""
  const path = ret
    ? `${origin}/${destination}/${dep}_${ret}`
    : `${origin}/${destination}/${dep}`
  const target = `https://www.kiwi.com/de/search/results/${path}?adults=${adults}`
  return tpRedirect(PROGRAM_IDS.kiwi, target)
}

// ──────────────────────────────────────────────────────────
// GETYOURGUIDE — tours, activities, attraction tickets
// ──────────────────────────────────────────────────────────
export function buildGetYourGuideUrl(params: {
  destination: string
  query?: string
}): string {
  const q = encodeURIComponent(params.query || params.destination)
  const target = `https://www.getyourguide.com/s/?q=${q}`
  return tpRedirect(PROGRAM_IDS.getYourGuide, target)
}

// ──────────────────────────────────────────────────────────
// KIWITAXI — airport transfers
// ──────────────────────────────────────────────────────────
export function buildKiwiTaxiUrl(params: { destination: string }): string {
  const target = `https://kiwitaxi.com/search?q=${encodeURIComponent(params.destination)}`
  return tpRedirect(PROGRAM_IDS.kiwiTaxi, target)
}

// ──────────────────────────────────────────────────────────
// DISCOVERCARS — car rental (900+ providers)
// ──────────────────────────────────────────────────────────
export function buildDiscoverCarsUrl(params: {
  pickupLocation?: string
  pickupDate?: string
  returnDate?: string
}): string {
  const sp = new URLSearchParams()
  if (params.pickupLocation) sp.set("pickupLocation", params.pickupLocation)
  if (params.pickupDate) sp.set("pickupDate", params.pickupDate)
  if (params.returnDate) sp.set("returnDate", params.returnDate)
  const qs = sp.toString()
  const target = `https://www.discovercars.com/${qs ? `?${qs}` : ""}`
  return tpRedirect(PROGRAM_IDS.discoverCars, target)
}

// ──────────────────────────────────────────────────────────
// COMPENSAIR — flight delay/cancellation compensation (EU 261)
// ──────────────────────────────────────────────────────────
export function buildCompensairUrl(): string {
  return tpRedirect(PROGRAM_IDS.compensair, "https://compensair.com/de/")
}

// ──────────────────────────────────────────────────────────
// EKTA — travel insurance
// ──────────────────────────────────────────────────────────
export function buildEktaUrl(): string {
  return tpRedirect(PROGRAM_IDS.ekta, "https://ektatraveling.com/")
}

// ──────────────────────────────────────────────────────────
// TIQETS — attraction & museum tickets
// ──────────────────────────────────────────────────────────
export function buildTiqetsUrl(params: { destination: string }): string {
  const target = `https://www.tiqets.com/de/search/?q=${encodeURIComponent(params.destination)}`
  return tpRedirect(PROGRAM_IDS.tiqets, target)
}

export function isPartnersConfigured(): boolean {
  return MARKER.length > 0
}
