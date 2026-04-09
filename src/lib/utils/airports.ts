export interface Airport {
  code: string
  name: string
  city: string
  country: string
}

// Search result can be a country, city, or airport
export interface SearchResult {
  type: "everywhere" | "country" | "city" | "airport"
  code: string // IATA or country code
  label: string // Display name
  sublabel: string // e.g. "Alle Flughäfen" or airport name
  country: string // Country code
  countryName: string
  airportCount?: number // How many airports in this country/city
}

// --- Countries ---
import { IATA_DB, COUNTRY_NAMES, COUNTRY_FLAGS, getAirportsForCountry } from "@/lib/data/iata-database"

// Derive COUNTRIES array from IATA_DB for backward compatibility
export const COUNTRIES: { code: string; name: string; flag: string }[] =
  Object.entries(COUNTRY_NAMES).map(([code, name]) => ({
    code,
    name,
    flag: COUNTRY_FLAGS[code] || "✈️",
  }))

// --- All Airports ---
export const DACH_AIRPORTS: Airport[] = [
  // Deutschland
  { code: "FRA", name: "Frankfurt am Main", city: "Frankfurt", country: "DE" },
  { code: "MUC", name: "München Franz Josef Strauß", city: "München", country: "DE" },
  { code: "BER", name: "Berlin Brandenburg", city: "Berlin", country: "DE" },
  { code: "DUS", name: "Düsseldorf", city: "Düsseldorf", country: "DE" },
  { code: "HAM", name: "Hamburg", city: "Hamburg", country: "DE" },
  { code: "CGN", name: "Köln/Bonn", city: "Köln", country: "DE" },
  { code: "STR", name: "Stuttgart", city: "Stuttgart", country: "DE" },
  { code: "HAJ", name: "Hannover", city: "Hannover", country: "DE" },
  { code: "NUE", name: "Nürnberg", city: "Nürnberg", country: "DE" },
  { code: "LEJ", name: "Leipzig/Halle", city: "Leipzig", country: "DE" },
  { code: "DTM", name: "Dortmund", city: "Dortmund", country: "DE" },
  { code: "HHN", name: "Frankfurt-Hahn", city: "Hahn", country: "DE" },
  { code: "FMM", name: "Memmingen", city: "Memmingen", country: "DE" },
  { code: "PAD", name: "Paderborn/Lippstadt", city: "Paderborn", country: "DE" },
  { code: "BRE", name: "Bremen", city: "Bremen", country: "DE" },
  // Österreich
  { code: "VIE", name: "Wien Schwechat", city: "Wien", country: "AT" },
  { code: "SZG", name: "Salzburg", city: "Salzburg", country: "AT" },
  { code: "INN", name: "Innsbruck", city: "Innsbruck", country: "AT" },
  { code: "GRZ", name: "Graz", city: "Graz", country: "AT" },
  { code: "LNZ", name: "Linz", city: "Linz", country: "AT" },
  // Schweiz
  { code: "ZRH", name: "Zürich", city: "Zürich", country: "CH" },
  { code: "GVA", name: "Genf", city: "Genf", country: "CH" },
  { code: "BSL", name: "Basel-Mulhouse", city: "Basel", country: "CH" },
  { code: "BRN", name: "Bern", city: "Bern", country: "CH" },
]

export const POPULAR_DESTINATIONS: Airport[] = [
  { code: "PMI", name: "Palma de Mallorca", city: "Mallorca", country: "ES" },
  { code: "AYT", name: "Antalya", city: "Antalya", country: "TR" },
  { code: "HRG", name: "Hurghada", city: "Hurghada", country: "EG" },
  { code: "HER", name: "Heraklion", city: "Kreta", country: "GR" },
  { code: "IBZ", name: "Ibiza", city: "Ibiza", country: "ES" },
  { code: "LPA", name: "Gran Canaria", city: "Gran Canaria", country: "ES" },
  { code: "TFS", name: "Teneriffa Süd", city: "Teneriffa", country: "ES" },
  { code: "FUE", name: "Fuerteventura", city: "Fuerteventura", country: "ES" },
  { code: "CFU", name: "Korfu", city: "Korfu", country: "GR" },
  { code: "RHO", name: "Rhodos", city: "Rhodos", country: "GR" },
  { code: "BCN", name: "Barcelona", city: "Barcelona", country: "ES" },
  { code: "FCO", name: "Rom Fiumicino", city: "Rom", country: "IT" },
  { code: "NAP", name: "Neapel", city: "Neapel", country: "IT" },
  { code: "LIS", name: "Lissabon", city: "Lissabon", country: "PT" },
  { code: "FAO", name: "Faro", city: "Algarve", country: "PT" },
  { code: "AGP", name: "Málaga", city: "Málaga", country: "ES" },
  { code: "ATH", name: "Athen", city: "Athen", country: "GR" },
  { code: "DXB", name: "Dubai", city: "Dubai", country: "AE" },
  { code: "BKK", name: "Bangkok", city: "Bangkok", country: "TH" },
  { code: "IST", name: "Istanbul", city: "Istanbul", country: "TR" },
  { code: "CDG", name: "Paris Charles de Gaulle", city: "Paris", country: "FR" },
  { code: "LHR", name: "London Heathrow", city: "London", country: "GB" },
  { code: "AMS", name: "Amsterdam Schiphol", city: "Amsterdam", country: "NL" },
  { code: "SPU", name: "Split", city: "Split", country: "HR" },
  { code: "DBV", name: "Dubrovnik", city: "Dubrovnik", country: "HR" },
]

const ALL_AIRPORTS: Airport[] = Object.entries(IATA_DB).map(([code, info]) => ({
  code,
  name: info.city,
  city: info.city,
  country: info.country,
}))

function getCountryName(code: string): string {
  return COUNTRY_NAMES[code] || code
}

function getCountryFlag(code: string): string {
  return COUNTRY_FLAGS[code] || "✈️"
}

// --- SMART SEARCH (like Skyscanner) ---
export function smartSearch(query: string, isDestination = false): SearchResult[] {
  const q = query.toLowerCase().trim()
  const results: SearchResult[] = []

  // Empty query → show popular options
  if (q.length === 0) {
    if (isDestination) {
      // Show "Überall" + popular countries for destination
      results.push({
        type: "everywhere",
        code: "EVERYWHERE",
        label: "Überall",
        sublabel: "Günstigste Flüge weltweit",
        country: "",
        countryName: "",
      })
      for (const c of ["ES", "TR", "GR", "IT", "PT"]) {
        const country = COUNTRIES.find((cc) => cc.code === c)!
        results.push({
          type: "country",
          code: c,
          label: `${country.flag} ${country.name}`,
          sublabel: `Alle Flughäfen`,
          country: c,
          countryName: country.name,
          airportCount: ALL_AIRPORTS.filter((a) => a.country === c).length,
        })
      }
    } else {
      // Show DACH countries + top airports for origin
      for (const code of ["DE", "AT", "CH"]) {
        const apCount = getAirportsForCountry(code).length
        results.push({
          type: "country",
          code,
          label: `${getCountryFlag(code)} ${getCountryName(code)}`,
          sublabel: `Alle ${apCount} Flughäfen`,
          country: code,
          countryName: getCountryName(code),
          airportCount: apCount,
        })
      }
      // Top airports
      for (const a of DACH_AIRPORTS.slice(0, 5)) {
        results.push({
          type: "airport",
          code: a.code,
          label: a.city,
          sublabel: `${a.name} (${a.code})`,
          country: a.country,
          countryName: getCountryName(a.country),
        })
      }
    }
    return results
  }

  if (q.length < 2) return []

  // "Überall" for destination
  if (isDestination && ("überall".includes(q) || "everywhere".includes(q) || "egal".includes(q) || "weltweit".includes(q))) {
    results.push({
      type: "everywhere",
      code: "EVERYWHERE",
      label: "Überall",
      sublabel: "Günstigste Flüge weltweit",
      country: "",
      countryName: "",
    })
  }

  // Search countries
  for (const country of COUNTRIES) {
    if (country.name.toLowerCase().includes(q)) {
      const airportCount = ALL_AIRPORTS.filter((a) => a.country === country.code).length
      results.push({
        type: "country",
        code: country.code,
        label: `${country.flag} ${country.name}`,
        sublabel: airportCount > 0 ? `Alle ${airportCount} Flughäfen` : "Alle Flughäfen",
        country: country.code,
        countryName: country.name,
        airportCount,
      })
    }
  }

  // Search airports (by city, name, code)
  for (const airport of ALL_AIRPORTS) {
    if (
      airport.code.toLowerCase().includes(q) ||
      airport.name.toLowerCase().includes(q) ||
      airport.city.toLowerCase().includes(q)
    ) {
      // Check if this city has multiple airports → show city first
      const cityAirports = ALL_AIRPORTS.filter((a) => a.city === airport.city)
      const alreadyHasCity = results.some((r) => r.type === "city" && r.label === airport.city)

      if (cityAirports.length > 1 && !alreadyHasCity) {
        results.push({
          type: "city",
          code: cityAirports[0].code,
          label: airport.city,
          sublabel: `Alle Flughäfen · ${getCountryName(airport.country)}`,
          country: airport.country,
          countryName: getCountryName(airport.country),
          airportCount: cityAirports.length,
        })
      }

      // Individual airport
      if (!results.some((r) => r.type === "airport" && r.code === airport.code)) {
        results.push({
          type: "airport",
          code: airport.code,
          label: airport.city,
          sublabel: `${airport.name} (${airport.code}) · ${getCountryName(airport.country)}`,
          country: airport.country,
          countryName: getCountryName(airport.country),
        })
      }
    }
  }

  return results.slice(0, 10)
}

// Legacy function for backward compatibility
export function searchAirports(query: string): Airport[] {
  const q = query.toLowerCase().trim()
  if (q.length < 2) return []
  return ALL_AIRPORTS.filter(
    (a) =>
      a.code.toLowerCase().includes(q) ||
      a.name.toLowerCase().includes(q) ||
      a.city.toLowerCase().includes(q)
  ).slice(0, 8)
}
