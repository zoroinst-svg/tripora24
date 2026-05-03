// Resolves a unique hero image per city / country using the Wikipedia REST API.
// English Wikipedia is preferred — its city/country articles consistently use a
// real cityscape / landmark photo as the lead image, whereas German Wikipedia
// often uses a coat of arms or city flag. Server-side fetch is cached for 30 days.

import { getCity, getCountryName, getCategory } from "@/lib/data/iata-database"

const U = (id: string) => `https://images.unsplash.com/${id}?w=800&h=600&fit=crop`

// Category fallbacks — only used when Wikipedia has no usable image
const FALLBACK: Record<string, string> = {
  beach:    U("photo-1507525428034-b723cf961d3e"),
  city:     U("photo-1477959858617-67f85cf4f1df"),
  island:   U("photo-1559128010-7c1ad6e1b6a5"),
  mountain: U("photo-1464822759023-fed622ff2c3b"),
  cultural: U("photo-1549144511-f099e773c147"),
  default:  U("photo-1488646953014-85cb44e25828"),
}

// English Wikipedia title per IATA code. English titles are mapped explicitly
// because the IATA database stores German names which often don't match
// English Wikipedia (e.g. "Köln" → "Cologne", "München" → "Munich").
// Use an array to provide fallback landmark titles when the city's main
// Wikipedia article uses a flag / coat of arms as its lead image
// (e.g. Singapore → Marina Bay; Hong Kong → Victoria Harbour).
const CITY_TITLE_EN: Record<string, string | string[]> = {
  // Germany
  FRA: "Frankfurt", HHN: "Frankfurt",
  MUC: "Munich", FMM: "Memmingen",
  BER: "Berlin",
  DUS: "Düsseldorf", HAM: "Hamburg",
  CGN: "Cologne",
  STR: "Stuttgart", NUE: "Nuremberg",
  LEJ: "Leipzig", DRS: "Dresden",
  DTM: "Dortmund", BRE: "Bremen",
  HAJ: "Hanover", PAD: "Paderborn",
  FDH: "Friedrichshafen", KSF: "Kassel",
  FKB: "Karlsruhe", SCN: "Saarbrücken",
  FMO: "Münster", ERF: "Erfurt", RLG: "Rostock",
  SXB: "Strasbourg",
  // Austria
  VIE: "Vienna", SZG: "Salzburg", INN: "Innsbruck",
  GRZ: "Graz", LNZ: "Linz", KLU: "Klagenfurt am Wörthersee",
  // Switzerland
  ZRH: "Zürich", GVA: "Geneva", BSL: "Basel", BRN: "Bern",
  // Spain
  PMI: "Palma de Mallorca", BCN: "Barcelona",
  AGP: "Málaga", IBZ: "Ibiza",
  TFS: "Tenerife", LPA: "Gran Canaria", FUE: "Fuerteventura",
  ACE: "Lanzarote", MAH: "Menorca",
  ALC: "Alicante", MAD: "Madrid", SVQ: "Seville",
  VLC: "Valencia", GRO: "Girona", REU: "Reus",
  BIO: "Bilbao", SCQ: "Santiago de Compostela",
  MJV: "Murcia", XRY: "Jerez de la Frontera", LEI: "Almería",
  // Turkey
  AYT: "Antalya", IST: "Istanbul", SAW: "Istanbul",
  DLM: "Dalaman", BJV: "Bodrum",
  ADB: "İzmir", ESB: "Ankara",
  GZT: "Gaziantep", TZX: "Trabzon",
  // Greece
  ATH: "Athens", HER: "Heraklion",
  CFU: "Corfu (city)", RHO: "Rhodes (city)",
  JTR: "Santorini", ZTH: "Zakynthos",
  CHQ: "Chania", SKG: "Thessaloniki",
  KGS: "Kos (city)", JMK: "Mykonos",
  EFL: "Argostoli", PVK: "Lefkada",
  JSI: "Skiathos (town)", KLX: "Kalamata",
  // Italy
  FCO: "Rome", CIA: "Rome", ROM: "Rome",
  NAP: "Naples",
  MXP: "Milan", BGY: "Milan", LIN: "Milan", MIL: "Milan",
  VCE: "Venice", TSF: "Treviso",
  CTA: "Catania", PMO: "Palermo",
  PSA: "Pisa", BRI: "Bari",
  BLQ: "Bologna", TRN: "Turin",
  FLR: "Florence", VRN: "Verona",
  CAG: "Cagliari", OLB: "Olbia",
  AHO: "Alghero", SUF: "Lamezia Terme",
  REG: "Reggio Calabria", BDS: "Brindisi",
  TPS: "Trapani", GOA: "Genoa",
  PEG: "Perugia", AOI: "Ancona",
  // Portugal
  LIS: "Lisbon", FAO: "Faro, Portugal",
  OPO: "Porto", FNC: "Funchal", PDL: "Ponta Delgada",
  // France
  CDG: "Paris", ORY: "Paris", BVA: "Paris", PAR: "Paris",
  NCE: "Nice", MRS: "Marseille", LYS: "Lyon",
  TLS: "Toulouse", BOD: "Bordeaux",
  BIA: "Bastia", AJA: "Ajaccio",
  // UK / Ireland
  LHR: "London", LGW: "London", STN: "London", LTN: "London", LON: "London",
  MAN: "Manchester", EDI: "Edinburgh",
  BRS: "Bristol", BHX: "Birmingham",
  DUB: "Dublin", SNN: "Limerick",
  // Croatia
  SPU: "Split, Croatia", DBV: "Dubrovnik",
  ZAG: "Zagreb", ZAD: "Zadar",
  PUY: "Pula", RJK: "Rijeka",
  // Egypt
  HRG: "Hurghada", SSH: "Sharm El Sheikh",
  CAI: "Cairo", RMF: "Marsa Alam",
  // Netherlands
  AMS: "Amsterdam", EIN: "Eindhoven",
  // UAE
  DXB: "Dubai", AUH: "Abu Dhabi",
  // Thailand
  BKK: "Bangkok", HKT: "Phuket City", CNX: "Chiang Mai",
  // Romania
  OTP: "Bucharest", BUH: "Bucharest",
  CLJ: "Cluj-Napoca", TSR: "Timișoara",
  IAS: "Iași", SBZ: "Sibiu",
  // Poland
  WAW: "Warsaw", KRK: "Kraków",
  WRO: "Wrocław", GDN: "Gdańsk",
  KTW: "Katowice", POZ: "Poznań",
  WMI: "Warsaw",
  // Hungary / Czechia
  BUD: "Budapest", DEB: "Debrecen",
  PRG: "Prague", BRQ: "Brno",
  // Bulgaria
  SOF: "Sofia", BOJ: "Burgas", VAR: "Varna",
  // Balkans
  BEG: "Belgrade", INI: "Niš",
  TGD: "Podgorica", TIV: "Tivat",
  SJJ: "Sarajevo", SKP: "Skopje",
  OHD: "Ohrid", TIA: "Tirana",
  // Cyprus / Malta
  MLA: "Valletta",
  LCA: "Larnaca", PFO: "Paphos", ECN: "Famagusta",
  // Scandinavia
  CPH: "Copenhagen", ARN: "Stockholm", STO: "Stockholm",
  OSL: "Oslo", HEL: "Helsinki", GOT: "Gothenburg",
  // Baltics
  RIX: "Riga", VNO: "Vilnius", TLL: "Tallinn",
  // Maghreb
  RAK: "Marrakesh", AGA: "Agadir",
  CMN: "Casablanca", FEZ: "Fez, Morocco",
  TNG: "Tangier", NDR: "Nador",
  TUN: "Tunis", DJE: "Djerba", NBE: "Hammamet",
  // Israel / Caucasus
  TLV: "Tel Aviv", TBS: "Tbilisi", BUS: "Batumi",
  // Iceland / Benelux
  KEF: "Reykjavík",
  LUX: "Luxembourg City",
  BRU: "Brussels", CRL: "Brussels",
  // Long-haul Americas
  JFK: "New York City", NYC: "New York City",
  LAX: "Los Angeles", MIA: "Miami",
  ORD: "Chicago", CHI: "Chicago",
  SFO: "San Francisco", LAS: "Las Vegas",
  SEA: "Seattle", BOS: "Boston",
  IAD: "Washington, D.C.", WAS: "Washington, D.C.",
  YYZ: "Toronto", YTO: "Toronto", YVR: "Vancouver", YMQ: "Montreal",
  GRU: "São Paulo", SAO: "São Paulo",
  GIG: "Rio de Janeiro", RIO: "Rio de Janeiro",
  EZE: "Buenos Aires", BUE: "Buenos Aires",
  SCL: "Santiago", LIM: "Lima", BOG: "Bogotá",
  HAV: "Havana",
  CUN: "Cancún", MBJ: "Montego Bay", PUJ: "Punta Cana",
  // Long-haul Asia
  MLE: ["Malé", "Maldives"], CMB: "Colombo", DPS: "Denpasar",
  // City-states use a flag as their lead image — fall back to a landmark
  SIN: ["Marina Bay, Singapore", "Singapore"],
  NRT: "Tokyo", HND: "Tokyo", TYO: "Tokyo",
  ICN: "Seoul", SEL: "Seoul",
  PEK: "Beijing", PVG: "Shanghai",
  HKG: ["Victoria Harbour", "Hong Kong"], TPE: "Taipei",
  KUL: "Kuala Lumpur", MNL: "Manila",
  HAN: "Hanoi", SGN: "Ho Chi Minh City",
  REP: "Siem Reap",
  DEL: "New Delhi", BOM: "Mumbai",
  GOI: "Panaji", KTM: "Kathmandu",
  KIX: "Osaka", OSA: "Osaka",
  BKI: "Kota Kinabalu", SPK: "Sapporo",
  // Africa
  JNB: "Johannesburg", CPT: "Cape Town",
  NBO: "Nairobi", MBA: "Mombasa",
  ZNZ: "Zanzibar City", JRO: "Moshi, Tanzania",
  LOS: "Lagos", ADD: "Addis Ababa",
  DKR: "Dakar",
  // Oceania
  SYD: "Sydney", MEL: "Melbourne", AKL: "Auckland",
  // Eastern Europe / former USSR
  KBP: "Kyiv", IEV: "Kyiv", LWO: "Lviv",
  MSQ: "Minsk", KIV: "Chișinău",
  MOW: "Moscow", SVO: "Moscow",
}

// Country pages on Wikipedia usually show the flag — bad for hero.
// Use a representative cityscape / landmark instead (English Wikipedia title).
const COUNTRY_TITLE_EN: Record<string, string | string[]> = {
  DE: "Berlin", AT: "Vienna", CH: "Zürich",
  ES: "Madrid", TR: "Istanbul", GR: "Athens",
  IT: "Rome", PT: "Lisbon", FR: "Paris",
  GB: "London", HR: "Dubrovnik", EG: "Cairo",
  NL: "Amsterdam", AE: "Dubai", TH: "Bangkok",
  IE: "Dublin", RO: "Bucharest", PL: "Kraków",
  HU: "Budapest", CZ: "Prague",
  BG: "Sofia", RS: "Belgrade",
  ME: "Kotor", BA: "Sarajevo",
  MK: "Skopje", AL: "Tirana",
  MT: "Valletta", CY: "Larnaca",
  DK: "Copenhagen", SE: "Stockholm",
  NO: "Oslo", FI: "Helsinki",
  LV: "Riga", LT: "Vilnius", EE: "Tallinn",
  MA: "Marrakesh", TN: "Tunis",
  IL: "Tel Aviv", GE: "Tbilisi", IS: "Reykjavík",
  LU: "Luxembourg City", BE: "Brussels",
  US: "New York City", MX: "Cancún",
  MV: "Malé", LK: "Colombo", ID: "Bali",
  JM: "Montego Bay", DO: "Punta Cana",
  SG: ["Marina Bay, Singapore", "Singapore"], JP: "Tokyo", KR: "Seoul",
  CN: "Beijing", HK: ["Victoria Harbour", "Hong Kong"], TW: "Taipei",
  MY: "Kuala Lumpur", PH: "Manila",
  VN: "Hanoi", KH: "Angkor Wat",
  IN: "Taj Mahal", NP: "Kathmandu",
  ZA: "Cape Town", KE: "Nairobi",
  TZ: "Zanzibar City", NG: "Lagos",
  ET: "Addis Ababa", SN: "Dakar",
  BR: "Rio de Janeiro", AR: "Buenos Aires",
  CL: "Santiago", PE: "Machu Picchu",
  CO: "Bogotá", CU: "Havana", CA: "Toronto",
  AU: "Sydney", NZ: "Auckland",
  UA: "Kyiv", BY: "Minsk", MD: "Chișinău", RU: "Moscow",
}

interface WikiSummary {
  type?: string
  originalimage?: { source: string; width?: number; height?: number }
  thumbnail?: { source: string }
}

// Detects flags, coats of arms, maps, country-code icons, and other
// non-photographic lead images. These appear frequently on German
// Wikipedia city articles and would otherwise be served as the hero.
const BAD_IMAGE_RE = /(Flag_of_|Coat_of_arms_|_COA[._]|_Wappen[._]|Wappen_|Stadtwappen|Karte_|Map_of_|Locator_map|Location_map|Karte_Gemeinde_|_locator|_flag\.|\.svg\.png$|langde-|\/[A-Z]{2,3}\.png$|\/[A-Z]{2,3}\.svg)/i

// Convert any Wikimedia image URL to a Special:FilePath URL with explicit width.
// Critical: Wikipedia REST often returns the original full-size image (10+ MB).
// Wikimedia's upload CDN only serves thumbnail sizes that already exist for a
// given file — requesting an arbitrary "/1024px-" URL returns HTTP 400.
// Special:FilePath?width=N routes through MediaWiki's thumbnail pipeline,
// which generates any size on demand and 301-redirects to the right bucket.
function toThumb(url: string, width = 1024): string {
  // Match: upload.wikimedia.org/wikipedia/{site}/A/AB/filename.ext      (original)
  //   or   upload.wikimedia.org/wikipedia/{site}/thumb/A/AB/filename.ext/Npx-...  (thumbnail)
  const m = url.match(/^https:\/\/upload\.wikimedia\.org\/wikipedia\/([^/]+)(?:\/thumb)?\/[0-9a-f]\/[0-9a-f]{2}\/([^/?#]+)/i)
  if (!m) return url
  const [, site, filename] = m
  const host = site === "commons" ? "commons.wikimedia.org" : `${site}.wikipedia.org`
  return `https://${host}/wiki/Special:FilePath/${filename}?width=${width}`
}

async function fetchWikiThumb(title: string, lang: "en" | "de"): Promise<string | null> {
  try {
    const res = await fetch(
      `https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`,
      {
        headers: { "User-Agent": "Tripora24/1.0 (https://www.tripora24.com)" },
        next: { revalidate: 60 * 60 * 24 * 30 }, // 30 days
      },
    )
    if (!res.ok) return null
    const data: WikiSummary = await res.json()
    if (data.type === "disambiguation") return null
    // Prefer thumbnail (always sized) over originalimage (full-size, can be 10+ MB)
    const src = data.thumbnail?.source || data.originalimage?.source
    if (!src) return null
    if (BAD_IMAGE_RE.test(src)) return null
    return toThumb(src, 1024)
  } catch {
    return null
  }
}

async function tryTitles(titles: string[]): Promise<string | null> {
  // English first (better lead images for cities), then German
  for (const lang of ["en", "de"] as const) {
    for (const title of titles) {
      const url = await fetchWikiThumb(title, lang)
      if (url) return url
    }
  }
  return null
}

function buildCandidateTitles(primary: string): string[] {
  const set = new Set<string>()
  const add = (t: string) => {
    const trimmed = t.trim()
    if (trimmed) set.add(trimmed)
  }
  add(primary)
  // Strip parenthesised qualifier ("Mailand (Malpensa)" → "Mailand")
  const noParen = primary.replace(/\s*\(.+?\)\s*/g, "").trim()
  add(noParen)
  // Take part before slash ("Köln/Bonn" → "Köln")
  add(noParen.split("/")[0])
  return Array.from(set)
}

function expandTitles(value: string | string[] | undefined): string[] {
  if (!value) return []
  const arr = Array.isArray(value) ? value : [value]
  return arr.flatMap(buildCandidateTitles)
}

export async function resolveCityImage(code: string): Promise<string> {
  const upper = code.toUpperCase()
  const candidates: string[] = [...expandTitles(CITY_TITLE_EN[upper])]
  // Also try the German name from IATA_DB as a last resort
  const germanName = getCity(upper)
  if (germanName && germanName !== upper) candidates.push(...buildCandidateTitles(germanName))
  if (candidates.length === 0) return FALLBACK[getCategory(upper)] || FALLBACK.default
  const url = await tryTitles(candidates)
  if (url) return url
  return FALLBACK[getCategory(upper)] || FALLBACK.default
}

export async function resolveCountryImage(code: string): Promise<string> {
  const upper = code.toUpperCase()
  const candidates: string[] = [...expandTitles(COUNTRY_TITLE_EN[upper])]
  const countryName = getCountryName(upper)
  if (countryName && countryName !== upper) candidates.push(...buildCandidateTitles(countryName))
  if (candidates.length === 0) return FALLBACK.default
  const url = await tryTitles(candidates)
  if (url) return url
  return FALLBACK.default
}
