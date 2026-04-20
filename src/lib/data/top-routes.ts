// Top-Routen für programmatische SEO-Landing-Pages
// Kombination aus DACH-Abflughäfen × Top-Zielen
// Jede Route = 1 indexierbare URL: /fluege/{from}-{to}

import { IATA_DB } from "./iata-database"

const DACH_ORIGINS = ["FRA", "MUC", "BER", "DUS", "HAM", "CGN", "STR", "VIE", "ZRH", "GVA"]

const TOP_DESTINATIONS = [
  // Spanien
  "PMI", "BCN", "AGP", "IBZ", "TFS", "LPA", "FUE", "ALC", "MAD",
  // Türkei
  "AYT", "IST", "DLM", "BJV",
  // Griechenland
  "HER", "RHO", "CFU", "JTR", "KGS",
  // Italien
  "FCO", "MXP", "VCE", "NAP", "CTA",
  // Portugal
  "LIS", "FAO", "OPO", "FNC",
  // Ägypten, Emirate, Thailand, USA
  "HRG", "SSH", "DXB", "BKK", "HKT", "JFK", "MIA",
  // UK, Frankreich
  "LHR", "CDG", "NCE",
]

export interface Route {
  from: string
  to: string
}

export const TOP_ROUTES: Route[] = DACH_ORIGINS.flatMap((from) =>
  TOP_DESTINATIONS
    .filter((to) => IATA_DB[from] && IATA_DB[to] && IATA_DB[from].country !== IATA_DB[to].country)
    .map((to) => ({ from, to }))
)

export function parseRouteSlug(slug: string): Route | null {
  const parts = slug.toUpperCase().split("-")
  if (parts.length !== 2) return null
  const [from, to] = parts
  if (from.length !== 3 || to.length !== 3) return null
  return { from, to }
}

export function routeSlug(from: string, to: string): string {
  return `${from.toLowerCase()}-${to.toLowerCase()}`
}
