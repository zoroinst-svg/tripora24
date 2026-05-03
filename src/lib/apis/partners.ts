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
  kiwi:           "faf8de2cbfbf4cc29ae564a01",
  localrent:      "31ceefa35e2a43bf9528f5566",
  kiwitaxi:       "0fc136a4b28e4627bb1d25efa",
  compensair:     "e49d3cfc2ddd441e81764d880",
  airhelp:        "a63969cd0fb1409092df96b74",
  aviasales:      "Zz181bb994594244d5a809b39",
  wegotrip:       "ea1b986792b044eeb96138573",
  tiqets:         "62f7df36e0d846628dcb12344",
  autoEurope:     "9a201a07ac674",
  getRentacar:    "aad8aadaa0094ffcbae0359ee",
  getTransfer:    "bed3f89a5a724210bcc270697",
  welcomePickups: "9ebc1dcfc29a42a8b0ac93514",
  ekta:           "e6986554389b40baa01380d43",
  // Airalo routes through Impact (airalo.pxf.io) — see buildAiraloUrl below
  airalo:         "7c960ee79fa544c19e64e0995",
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
// Scheme: ?sub_id=<sub>&utm_source=travelpayouts
// ──────────────────────────────────────────────────────────
export function buildEktaUrl(): string {
  return withParams("https://ektatraveling.com/", {
    sub_id: sub("ekta"),
    utm_source: "travelpayouts",
  })
}

// ──────────────────────────────────────────────────────────
// GETTRANSFER — airport transfers (alternative to Kiwitaxi)
// Scheme: ?sub_id=<sub>&utm_campaign=travelpayouts&utm_medium=cpa&utm_source=travelpayouts
// ──────────────────────────────────────────────────────────
export function buildGetTransferUrl(_params?: { destination?: string }): string {
  return withParams("https://gettransfer.com/de", {
    sub_id: sub("getTransfer"),
    utm_campaign: "travelpayouts",
    utm_medium: "cpa",
    utm_source: "travelpayouts",
  })
}

// ──────────────────────────────────────────────────────────
// WELCOME PICKUPS — airport transfers
// Scheme: ?aff_track_id=<sub>&utm_source=travelpayouts
// ──────────────────────────────────────────────────────────
export function buildWelcomePickupsUrl(): string {
  return withParams("https://www.welcomepickups.com/", {
    aff_track_id: sub("welcomePickups"),
    utm_source: "travelpayouts",
  })
}

// ──────────────────────────────────────────────────────────
// GETRENTACAR — car rental
// Scheme: ?track_id=<sub>&utm_campaign=partner&utm_medium=partner_cpa&utm_source=travelpayouts
// ──────────────────────────────────────────────────────────
export function buildGetRentacarUrl(): string {
  return withParams("https://getrentacar.com/", {
    track_id: sub("getRentacar"),
    utm_campaign: "partner",
    utm_medium: "partner_cpa",
    utm_source: "travelpayouts",
  })
}

// ──────────────────────────────────────────────────────────
// AUTOEUROPE — car rental (EU/UK)
// Scheme: ?aff=travelpayoutseu&sub_id=<sub>
// Note: AutoEurope uses .eu domain, not .com
// ──────────────────────────────────────────────────────────
export function buildAutoEuropeUrl(): string {
  return withParams("https://www.autoeurope.eu/", {
    aff: "travelpayoutseu",
    sub_id: sub("autoEurope"),
  })
}

// ──────────────────────────────────────────────────────────
// TIQETS — attraction & museum tickets
// Scheme: ?partner=travelpayouts.com&tq_campaign=<sub>&tq_click_id=<sub>
// ──────────────────────────────────────────────────────────
export function buildTiqetsUrl(_params?: { destination?: string }): string {
  return withParams("https://www.tiqets.com/de/", {
    partner: "travelpayouts.com",
    tq_campaign: sub("tiqets"),
    tq_click_id: sub("tiqets"),
  })
}

// ──────────────────────────────────────────────────────────
// WEGOTRIP — guided tours
// Scheme: ?sub_id=<sub>&utm_source=travelpayouts
// ──────────────────────────────────────────────────────────
export function buildWeGoTripUrl(): string {
  return withParams("https://wegotrip.com/", {
    sub_id: sub("wegotrip"),
    utm_source: "travelpayouts",
  })
}

// ──────────────────────────────────────────────────────────
// AIRALO — eSIM
// Routes through Impact (airalo.pxf.io). The Impact entry URL itself works
// as our affiliate link — Impact generates irclickid downstream and tracks
// back to TP. We can change `u=` to deep-link to a specific Airalo page.
// ──────────────────────────────────────────────────────────
export function buildAiraloUrl(targetUrl?: string): string {
  const target = targetUrl || "https://airalo.com"
  return `https://airalo.pxf.io/c/1209822/1310283/15608?sharedID=${MARKER}_&subId1=${sub("airalo")}&u=${encodeURIComponent(target)}`
}

export function isPartnersConfigured(): boolean {
  return true // hardcoded fallbacks always work
}
