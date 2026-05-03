// Travelpayouts Partner Programs — Direct Affiliate URL builders
//
// Each partner has its own affiliate-tracking scheme baked into URL query
// parameters. We extracted those schemes by tracing one TP shortlink per
// partner (e.g. `https://kiwi.tpx.lv/...`) and observing the final URL the
// shortlink redirects to. The redirect chain reveals the params the partner
// uses to attribute commission to the marker.
//
// This file hardcodes those patterns so we can build *deep links* directly to
// any page on the partner site (e.g. a specific Kiwi search) with proper
// tracking — no tp.media middleman, no per-program-ID lookups, no fragile
// shortlinks that always land on the partner homepage.
//
// To add or refresh a partner: in TP dashboard → "Generate links" → copy any
// shortlink → curl -IL it and grab the `Location:` header. The deeplink-hash
// in the URL is per-user; the tracking-param scheme is per-partner.

const MARKER = process.env.TRAVELPAYOUTS_MARKER || "717690"

// ──────────────────────────────────────────────────────────
// Per-partner deeplink hashes (extracted from TP shortlinks).
// Format: <hash>-<marker>. These are tied to a single shortlink in TP
// analytics but tracking still attributes to the marker, so all clicks
// using the same hash get aggregated together.
// ──────────────────────────────────────────────────────────
const DEEPLINK = {
  kiwi:       "faf8de2cbfbf4cc29ae564a01",
  localrent:  "31ceefa35e2a43bf9528f5566",
  kiwitaxi:   "0fc136a4b28e4627bb1d25efa",
  compensair: "e49d3cfc2ddd441e81764d880",
  airhelp:    "a63969cd0fb1409092df96b74",
  aviasales:  "Zz181bb994594244d5a809b39",
} as const

const sub = (k: keyof typeof DEEPLINK) => `${DEEPLINK[k]}-${MARKER}`

// Append affiliate query-params to any URL on the partner's domain.
// Returns the URL string with tracking baked in.
function withParams(base: string, params: Record<string, string>): string {
  const url = new URL(base)
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v)
  return url.toString()
}

// ──────────────────────────────────────────────────────────
// KIWI.COM — flights (deep-linked search)
// Scheme: ?affilid=travelpayoutsdeeplink_tripora24.com_<sub>&sub1=<sub>
// ──────────────────────────────────────────────────────────
const KIWI_AFFILID = process.env.NEXT_PUBLIC_KIWI_AFFILID
  || `travelpayoutsdeeplink_tripora24.com_${sub("kiwi")}`

export function buildKiwiUrl(params: {
  origin: string
  destination: string
  departureDate?: string
  returnDate?: string
  adults?: number
}): string {
  const { origin, destination, departureDate = "", returnDate = "", adults = 1 } = params
  const path = returnDate
    ? `${origin}/${destination}/${departureDate}_${returnDate}`
    : `${origin}/${destination}/${departureDate}`
  return withParams(`https://www.kiwi.com/de/search/results/${path}`, {
    adults: String(adults),
    affilid: KIWI_AFFILID,
    sub1: sub("kiwi"),
  })
}

// ──────────────────────────────────────────────────────────
// AVIASALES — flights (already used as default; we add sub-id for tracking)
// Scheme: ?marker=<marker>.<sub>
// ──────────────────────────────────────────────────────────
export function buildAviasalesUrl(params: {
  origin: string
  destination: string
  departureDate?: string
  returnDate?: string
}): string {
  const { origin, destination, departureDate = "", returnDate = "" } = params
  const fmt = (d: string) => (d.length >= 10 ? d.slice(8, 10) + d.slice(5, 7) : "")
  const dep = fmt(departureDate)
  const ret = fmt(returnDate)
  return `https://www.aviasales.com/search/${origin}${dep}${destination}${ret}1?marker=${MARKER}.${sub("aviasales")}`
}

// ──────────────────────────────────────────────────────────
// LOCALRENT.COM — car rental
// Scheme: ?r=2869&trace_id=<sub>&utm_source=travelpayouts
// ──────────────────────────────────────────────────────────
function withLocalrentTracking(base: string): string {
  return withParams(base, {
    r: "2869",
    trace_id: sub("localrent"),
    utm_source: "travelpayouts",
  })
}

export function buildLocalrentUrl(params?: {
  pickupLocation?: string
  pickupDate?: string
  returnDate?: string
}): string {
  // Localrent search: /search?from=<location>&start=<date>&end=<date>
  const url = new URL("https://www.localrent.com/de")
  if (params?.pickupLocation) url.pathname = `/de/${encodeURIComponent(params.pickupLocation)}`
  return withLocalrentTracking(url.toString())
}

// Backwards-compat shim — old code path used buildDiscoverCarsUrl
export function buildDiscoverCarsUrl(params?: {
  pickupLocation?: string
  pickupDate?: string
  returnDate?: string
}): string {
  return buildLocalrentUrl(params)
}

// ──────────────────────────────────────────────────────────
// KIWITAXI — airport transfers
// Scheme: ?tpo=<sub>&utm_source=travelpayouts
// ──────────────────────────────────────────────────────────
export function buildKiwiTaxiUrl(params?: { destination?: string }): string {
  const url = new URL("https://kiwitaxi.com/de/")
  if (params?.destination) {
    url.searchParams.set("search", params.destination)
  }
  return withParams(url.toString(), {
    tpo: sub("kiwitaxi"),
    utm_source: "travelpayouts",
  })
}

// ──────────────────────────────────────────────────────────
// COMPENSAIR — flight delay/cancellation compensation
// Scheme: ?sub_id=<sub>&utm_medium=affiliate&utm_source=travelpayouts
// ──────────────────────────────────────────────────────────
export function buildCompensairUrl(): string {
  return withParams("https://compensair.com/de/", {
    sub_id: sub("compensair"),
    utm_medium: "affiliate",
    utm_source: "travelpayouts",
  })
}

// ──────────────────────────────────────────────────────────
// AIRHELP — flight compensation (better commission than Compensair)
// Scheme: ?a_aid=Travelpayouts&data1=<sub>&utm_campaign=aff-Travelpayouts
//          &utm_medium=affiliate&utm_source=pap
// ──────────────────────────────────────────────────────────
export function buildAirHelpUrl(): string {
  return withParams("https://www.airhelp.com/de/", {
    a_aid: "Travelpayouts",
    data1: sub("airhelp"),
    utm_campaign: "aff-Travelpayouts",
    utm_medium: "affiliate",
    utm_source: "pap",
  })
}

// ──────────────────────────────────────────────────────────
// KKDAY — activities & tickets (replacement for GetYourGuide)
// KKday's TP shortlink routes through Involve Asia (third-party network).
// Direct deep linking is unreliable because the affiliate ID is generated
// per click in the involve.me hop. Use the shortlink directly — it lands
// on the kkday homepage, which is fine for now.
// ──────────────────────────────────────────────────────────
export function buildKKdayUrl(_params?: { destination?: string }): string {
  return "https://kkday.tpx.lv/TmumzgHc"
}

// Backwards-compat — older code references buildGetYourGuideUrl/buildKlookUrl
export function buildKlookUrl(params?: { destination?: string }): string {
  return buildKKdayUrl(params)
}
export function buildGetYourGuideUrl(params?: { destination?: string; query?: string }): string {
  return buildKKdayUrl({ destination: params?.destination || params?.query })
}

// ──────────────────────────────────────────────────────────
// EKTA — travel insurance
// (No shortlink shared yet → simple direct URL, no tracking until shortlink
// is provided. The Marker still gets credited for any TP-tracked program
// the user is in if they navigate from a tracked page, but for now this is
// a plain link.)
// ──────────────────────────────────────────────────────────
export function buildEktaUrl(): string {
  // TODO: replace with real EKTA tracking once shortlink is provided
  return "https://ektatraveling.com/"
}

// ──────────────────────────────────────────────────────────
// Stubs for partners not yet wired (function exists so callers don't break)
// ──────────────────────────────────────────────────────────
export function buildGetTransferUrl(_params?: { destination?: string }): string {
  return "https://gettransfer.com/"
}
export function buildWelcomePickupsUrl(): string {
  return "https://www.welcomepickups.com/"
}
export function buildGetRentacarUrl(): string {
  return "https://getrentacar.com/"
}
export function buildAutoEuropeUrl(): string {
  return "https://www.autoeurope.com/"
}
export function buildTiqetsUrl(_params?: { destination?: string }): string {
  return "https://www.tiqets.com/"
}
export function buildWeGoTripUrl(): string {
  return "https://wegotrip.com/"
}
export function buildAiraloUrl(): string {
  return "https://www.airalo.com/"
}

export function isPartnersConfigured(): boolean {
  return true // hardcoded fallbacks always work
}
