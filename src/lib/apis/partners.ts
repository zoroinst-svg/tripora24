// Travelpayouts Partner Programs — Affiliate URL builders
//
// Strategy: we use TP shortlinks (`{partner}.tpx.lv/{code}`) or partner-native
// affiliate IDs extracted from those shortlinks. The `tp.media/r?p=PROGRAM_ID`
// flow we tried first kept failing with "marker is not subscribed to campaign"
// because the program IDs we were guessing didn't match the user's actual
// approved programs. Shortlinks side-step that — they only work for programs
// the user is actually approved for, and they bake the marker (717690) into
// the redirect chain.
//
// To add a partner: in the TP dashboard click "Generate links" on the program,
// copy the shortlink, set the env var below. If the partner accepts a native
// affiliate-ID parameter (Kiwi has `affilid`), prefer that — it lets us deep
// link to specific search results. Otherwise the shortlink lands on the
// partner home / generic page, which is fine but no pre-filled search.

const MARKER = process.env.TRAVELPAYOUTS_MARKER || "717690"

// ──────────────────────────────────────────────────────────
// KIWI.COM — flight booking (deep-linkable via affilid)
// Extracted from a TP shortlink: kiwi.tpx.lv/XOHr30ql redirects to a Kiwi URL
// with `affilid=travelpayoutsdeeplink_tripora24.com_<hash>-<marker>` and
// `sub1=<hash>-<marker>`. We can append those params to ANY Kiwi URL and the
// affiliate cookies (SKYPICKER_AFFILIATE, sub1Param) get set correctly.
// ──────────────────────────────────────────────────────────
const KIWI_AFFILID = process.env.NEXT_PUBLIC_KIWI_AFFILID
  || `travelpayoutsdeeplink_tripora24.com_faf8de2cbfbf4cc29ae564a01-${MARKER}`

function kiwiSub1(): string {
  // sub1 is the trailing "<hash>-<marker>" portion of the affilid
  const m = KIWI_AFFILID.match(/_([a-f0-9]+-\d+)$/)
  return m ? m[1] : `faf8de2cbfbf4cc29ae564a01-${MARKER}`
}

export function buildKiwiUrl(params: {
  origin: string
  destination: string
  departureDate?: string
  returnDate?: string
  adults?: number
}): string {
  const { origin, destination, departureDate, returnDate, adults = 1 } = params
  const dep = departureDate || ""
  const ret = returnDate || ""
  const path = ret
    ? `${origin}/${destination}/${dep}_${ret}`
    : `${origin}/${destination}/${dep}`
  const url = new URL(`https://www.kiwi.com/de/search/results/${path}`)
  url.searchParams.set("adults", String(adults))
  url.searchParams.set("affilid", KIWI_AFFILID)
  url.searchParams.set("sub1", kiwiSub1())
  return url.toString()
}

// ──────────────────────────────────────────────────────────
// Generic shortlinks — set via env vars from TP "Generate links"
// Format expected: https://{partner}.tpx.lv/{code} or any TP-tracked URL.
// Empty fallback = direct partner URL (no commission, but link works).
// ──────────────────────────────────────────────────────────

const SHORTLINKS = {
  airHelp:        process.env.NEXT_PUBLIC_TP_AIRHELP        || "",
  ekta:           process.env.NEXT_PUBLIC_TP_EKTA           || "",
  compensair:     process.env.NEXT_PUBLIC_TP_COMPENSAIR     || "",
  kiwiTaxi:       process.env.NEXT_PUBLIC_TP_KIWITAXI       || "",
  getTransfer:    process.env.NEXT_PUBLIC_TP_GETTRANSFER    || "",
  welcomePickups: process.env.NEXT_PUBLIC_TP_WELCOMEPICKUPS || "",
  localrent:      process.env.NEXT_PUBLIC_TP_LOCALRENT      || "",
  getRentacar:    process.env.NEXT_PUBLIC_TP_GETRENTACAR    || "",
  autoEurope:     process.env.NEXT_PUBLIC_TP_AUTOEUROPE     || "",
  klook:          process.env.NEXT_PUBLIC_TP_KLOOK          || "",
  tiqets:         process.env.NEXT_PUBLIC_TP_TIQETS         || "",
  weGoTrip:       process.env.NEXT_PUBLIC_TP_WEGOTRIP       || "",
  airalo:         process.env.NEXT_PUBLIC_TP_AIRALO         || "",
} as const

// ──────────────────────────────────────────────────────────
// FLIGHT COMPENSATION
// ──────────────────────────────────────────────────────────
// AirHelp = the better choice (15-16.6% commission vs Compensair €5-12 fixed)
export function buildAirHelpUrl(): string {
  return SHORTLINKS.airHelp || "https://www.airhelp.com/de/"
}

export function buildCompensairUrl(): string {
  return SHORTLINKS.compensair || "https://compensair.com/de/"
}

// ──────────────────────────────────────────────────────────
// TRAVEL INSURANCE
// ──────────────────────────────────────────────────────────
export function buildEktaUrl(): string {
  return SHORTLINKS.ekta || "https://ektatraveling.com/"
}

// ──────────────────────────────────────────────────────────
// AIRPORT TRANSFERS — Kiwitaxi or GetTransfer or Welcome Pickups
// ──────────────────────────────────────────────────────────
export function buildKiwiTaxiUrl(_params?: { destination?: string }): string {
  // Shortlinks land on Kiwitaxi homepage — user enters destination there
  return SHORTLINKS.kiwiTaxi || "https://kiwitaxi.com/"
}

export function buildGetTransferUrl(_params?: { destination?: string }): string {
  return SHORTLINKS.getTransfer || "https://gettransfer.com/"
}

export function buildWelcomePickupsUrl(): string {
  return SHORTLINKS.welcomePickups || "https://www.welcomepickups.com/"
}

// ──────────────────────────────────────────────────────────
// CAR RENTAL — Localrent / GetRentacar / AutoEurope
// (DiscoverCars wasn't in approved list — replaced with these)
// ──────────────────────────────────────────────────────────
export function buildLocalrentUrl(_params?: {
  pickupLocation?: string
  pickupDate?: string
  returnDate?: string
}): string {
  return SHORTLINKS.localrent || "https://www.localrent.com/"
}

export function buildGetRentacarUrl(): string {
  return SHORTLINKS.getRentacar || "https://getrentacar.com/"
}

export function buildAutoEuropeUrl(): string {
  return SHORTLINKS.autoEurope || "https://www.autoeurope.com/"
}

// Backwards compat — keep buildDiscoverCarsUrl name but route to Localrent
export function buildDiscoverCarsUrl(params?: {
  pickupLocation?: string
  pickupDate?: string
  returnDate?: string
}): string {
  return buildLocalrentUrl(params)
}

// ──────────────────────────────────────────────────────────
// ACTIVITIES & TICKETS — Klook, Tiqets, WeGoTrip
// (GetYourGuide wasn't in approved list — replaced with Klook)
// ──────────────────────────────────────────────────────────
export function buildKlookUrl(_params?: { destination?: string }): string {
  return SHORTLINKS.klook || "https://www.klook.com/"
}

export function buildTiqetsUrl(_params?: { destination?: string }): string {
  return SHORTLINKS.tiqets || "https://www.tiqets.com/"
}

export function buildWeGoTripUrl(): string {
  return SHORTLINKS.weGoTrip || "https://wegotrip.com/"
}

// Backwards compat — GetYourGuide → Klook
export function buildGetYourGuideUrl(params?: { destination?: string; query?: string }): string {
  return buildKlookUrl(params)
}

// ──────────────────────────────────────────────────────────
// eSIM / Connectivity
// ──────────────────────────────────────────────────────────
export function buildAiraloUrl(): string {
  return SHORTLINKS.airalo || "https://www.airalo.com/"
}

export function isPartnersConfigured(): boolean {
  return !!process.env.TRAVELPAYOUTS_MARKER
}
