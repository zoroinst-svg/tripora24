// Travelpayouts Partner Programs — Affiliate URL builders
// All links route through Travelpayouts using your marker so we earn commission
// on every booking. The marker is universal across all programs you've been
// approved for in the Travelpayouts dashboard.
//
// Program IDs (p=) come from Travelpayouts docs. If a click lands on the partner
// without tracking, verify the program ID in your TP dashboard → "Tools → Links".

// Travelpayouts marker — your affiliate ID (numeric).
const MARKER = process.env.TRAVELPAYOUTS_MARKER || "717690"

// Travelpayouts traffic source — optional sub-ID *within* your account, used
// when you've configured multiple traffic sources in the TP dashboard. If it
// isn't an ID you actually own, tp.media rejects the click with
// "traffic_source is not valid". Leave empty unless you've set one up there.
const TRS = process.env.TRAVELPAYOUTS_TRS || ""

// Programs that haven't been approved yet for this marker. tp.media rejects
// clicks for unsubscribed programs with "marker is not subscribed to campaign",
// so for these we fall back to direct URLs (no commission, but the link works).
//
// Set in Vercel env: TRAVELPAYOUTS_DISABLED_PROGRAMS=4471,4519,4480 etc.
// Remove a program ID from the list once it's approved in the TP dashboard.
const DISABLED_PROGRAMS = new Set(
  (process.env.TRAVELPAYOUTS_DISABLED_PROGRAMS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map(Number),
)

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
 * If the program isn't approved yet (listed in DISABLED_PROGRAMS), returns the
 * raw target URL instead so users still reach the partner without a broken
 * tp.media error page.
 */
function tpRedirect(programId: number, targetUrl: string): string {
  if (DISABLED_PROGRAMS.has(programId)) return targetUrl
  const u = encodeURIComponent(targetUrl)
  const trs = TRS ? `&trs=${TRS}` : ""
  return `https://tp.media/r?marker=${MARKER}${trs}&p=${programId}&u=${u}&campaign_id=${programId}`
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
  return MARKER !== "717690" || !!process.env.TRAVELPAYOUTS_MARKER
}
