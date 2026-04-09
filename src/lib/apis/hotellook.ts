// Hotels via Travelpayouts — uses Hotellook affiliate links
// Since the direct Hotellook API is deprecated, we use affiliate redirect links
// Users click → go to Hotellook search → we earn commission

import type { HotelOffer } from "@/lib/deal-engine/mock-data"

const MARKER = process.env.TRAVELPAYOUTS_MARKER || ""

export function isHotellookConfigured(): boolean {
  return MARKER.length > 0
}

// Build Hotellook affiliate search URL
export function buildHotelSearchUrl(destination: string, checkIn?: string, checkOut?: string): string {
  const params = new URLSearchParams({ marker: MARKER })
  if (checkIn) params.set("checkIn", checkIn)
  if (checkOut) params.set("checkOut", checkOut)
  return `https://search.hotellook.com/hotels?destination=${encodeURIComponent(destination)}&${params}`
}

// Since Hotellook cache API is not available, we return mock hotels
// with real affiliate links that earn us money when clicked
export async function searchHotels(params: {
  destination: string
  checkIn?: string
  checkOut?: string
}): Promise<HotelOffer[]> {
  // Return empty — the hotel page will show a "Search on Hotellook" button instead
  // This is actually how many metasearch sites work — redirect to booking partner
  return []
}
