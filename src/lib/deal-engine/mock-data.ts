// Realistic mock data for development — will be replaced by real API data

export interface FlightOffer {
  id: string
  airline: string
  airlineLogo: string
  origin: string
  originCity: string
  destination: string
  destinationCity: string
  departureTime: string
  arrivalTime: string
  departureDate: string
  returnDate?: string
  duration: number // minutes
  stops: number
  stopCities?: string[]
  price: number
  avgPrice: number
  currency: string
  cabinClass: string
  bookingUrl: string
  source: string
  // Return flight info
  returnDepartureTime?: string
  returnArrivalTime?: string
  returnDuration?: number
  returnStops?: number
}

export interface HotelOffer {
  id: string
  name: string
  imageUrl: string
  destination: string
  destinationCity: string
  stars: number
  rating: number
  reviewCount: number
  pricePerNight: number
  avgPricePerNight: number
  totalPrice: number
  nights: number
  currency: string
  amenities: string[]
  mealPlan: string
  bookingUrl: string
  source: string
  distanceToCenter: string
  freeCancel: boolean
}

export interface PackageOffer {
  id: string
  destination: string
  destinationCity: string
  imageUrl: string
  flight: {
    airline: string
    origin: string
    departureDate: string
    returnDate: string
    duration: number
    price: number
  }
  hotel: {
    name: string
    stars: number
    rating: number
    mealPlan: string
    pricePerNight: number
    nights: number
  }
  totalPrice: number
  separatePrice: number // price if booked separately
  savings: number
  currency: string
  bookingUrl: string
}

export interface TrendingDeal {
  id: string
  type: "flight" | "hotel" | "package"
  title: string
  subtitle: string
  imageUrl: string
  price: number
  avgPrice: number
  currency: string
  dealScore: number
  origin?: string // IATA airport code (e.g. "FRA")
  destination: string // IATA airport code (e.g. "PMI")
  destinationName?: string // Display name (e.g. "Mallorca")
  dates?: string // Display string for UI
  departureDate?: string // YYYY-MM-DD for URL params
  returnDate?: string // YYYY-MM-DD for URL params
  bookingUrl: string
}

// --- MOCK DATA ---

export const MOCK_FLIGHTS: FlightOffer[] = [
  {
    id: "f1",
    airline: "Ryanair",
    airlineLogo: "https://images.kiwi.com/airlines/64/FR.png",
    origin: "FRA",
    originCity: "Frankfurt",
    destination: "PMI",
    destinationCity: "Mallorca",
    departureTime: "06:15",
    arrivalTime: "09:00",
    departureDate: "2026-06-15",
    returnDate: "2026-06-22",
    duration: 165,
    stops: 0,
    price: 49,
    avgPrice: 189,
    currency: "EUR",
    cabinClass: "Economy",
    bookingUrl: "#",
    source: "amadeus",
    returnDepartureTime: "19:30",
    returnArrivalTime: "22:15",
    returnDuration: 165,
    returnStops: 0,
  },
  {
    id: "f2",
    airline: "Eurowings",
    airlineLogo: "https://images.kiwi.com/airlines/64/EW.png",
    origin: "FRA",
    originCity: "Frankfurt",
    destination: "PMI",
    destinationCity: "Mallorca",
    departureTime: "10:30",
    arrivalTime: "13:15",
    departureDate: "2026-06-15",
    returnDate: "2026-06-22",
    duration: 165,
    stops: 0,
    price: 79,
    avgPrice: 189,
    currency: "EUR",
    cabinClass: "Economy",
    bookingUrl: "#",
    source: "amadeus",
    returnDepartureTime: "14:00",
    returnArrivalTime: "16:45",
    returnDuration: 165,
    returnStops: 0,
  },
  {
    id: "f3",
    airline: "Lufthansa",
    airlineLogo: "https://images.kiwi.com/airlines/64/LH.png",
    origin: "FRA",
    originCity: "Frankfurt",
    destination: "PMI",
    destinationCity: "Mallorca",
    departureTime: "08:45",
    arrivalTime: "11:30",
    departureDate: "2026-06-15",
    returnDate: "2026-06-22",
    duration: 165,
    stops: 0,
    price: 149,
    avgPrice: 189,
    currency: "EUR",
    cabinClass: "Economy",
    bookingUrl: "#",
    source: "amadeus",
    returnDepartureTime: "16:30",
    returnArrivalTime: "19:15",
    returnDuration: 165,
    returnStops: 0,
  },
  {
    id: "f4",
    airline: "Turkish Airlines",
    airlineLogo: "https://images.kiwi.com/airlines/64/TK.png",
    origin: "FRA",
    originCity: "Frankfurt",
    destination: "AYT",
    destinationCity: "Antalya",
    departureTime: "11:20",
    arrivalTime: "16:45",
    departureDate: "2026-07-01",
    returnDate: "2026-07-08",
    duration: 205,
    stops: 1,
    stopCities: ["Istanbul"],
    price: 189,
    avgPrice: 320,
    currency: "EUR",
    cabinClass: "Economy",
    bookingUrl: "#",
    source: "amadeus",
    returnDepartureTime: "08:00",
    returnArrivalTime: "12:30",
    returnDuration: 210,
    returnStops: 1,
  },
  {
    id: "f5",
    airline: "SunExpress",
    airlineLogo: "https://images.kiwi.com/airlines/64/XQ.png",
    origin: "DUS",
    originCity: "Düsseldorf",
    destination: "AYT",
    destinationCity: "Antalya",
    departureTime: "07:00",
    arrivalTime: "11:50",
    departureDate: "2026-07-01",
    returnDate: "2026-07-08",
    duration: 230,
    stops: 0,
    price: 159,
    avgPrice: 280,
    currency: "EUR",
    cabinClass: "Economy",
    bookingUrl: "#",
    source: "travelpayouts",
    returnDepartureTime: "12:30",
    returnArrivalTime: "15:20",
    returnDuration: 230,
    returnStops: 0,
  },
  {
    id: "f6",
    airline: "Wizz Air",
    airlineLogo: "https://images.kiwi.com/airlines/64/W6.png",
    origin: "BER",
    originCity: "Berlin",
    destination: "BCN",
    destinationCity: "Barcelona",
    departureTime: "06:00",
    arrivalTime: "09:00",
    departureDate: "2026-06-20",
    returnDate: "2026-06-27",
    duration: 180,
    stops: 0,
    price: 29,
    avgPrice: 120,
    currency: "EUR",
    cabinClass: "Economy",
    bookingUrl: "#",
    source: "kiwi",
    returnDepartureTime: "21:00",
    returnArrivalTime: "00:00",
    returnDuration: 180,
    returnStops: 0,
  },
  {
    id: "f7",
    airline: "EasyJet",
    airlineLogo: "https://images.kiwi.com/airlines/64/U2.png",
    origin: "MUC",
    originCity: "München",
    destination: "LIS",
    destinationCity: "Lissabon",
    departureTime: "14:30",
    arrivalTime: "17:00",
    departureDate: "2026-08-10",
    returnDate: "2026-08-17",
    duration: 210,
    stops: 0,
    price: 69,
    avgPrice: 180,
    currency: "EUR",
    cabinClass: "Economy",
    bookingUrl: "#",
    source: "kiwi",
    returnDepartureTime: "18:00",
    returnArrivalTime: "23:00",
    returnDuration: 180,
    returnStops: 0,
  },
  {
    id: "f8",
    airline: "Condor",
    airlineLogo: "https://images.kiwi.com/airlines/64/DE.png",
    origin: "FRA",
    originCity: "Frankfurt",
    destination: "HRG",
    destinationCity: "Hurghada",
    departureTime: "09:00",
    arrivalTime: "14:30",
    departureDate: "2026-09-01",
    returnDate: "2026-09-08",
    duration: 290,
    stops: 0,
    price: 199,
    avgPrice: 350,
    currency: "EUR",
    cabinClass: "Economy",
    bookingUrl: "#",
    source: "amadeus",
    returnDepartureTime: "15:30",
    returnArrivalTime: "19:30",
    returnDuration: 300,
    returnStops: 0,
  },
]

export const MOCK_HOTELS: HotelOffer[] = [
  {
    id: "h1",
    name: "Hotel Playa de Palma",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
    destination: "PMI",
    destinationCity: "Mallorca",
    stars: 4,
    rating: 8.5,
    reviewCount: 2341,
    pricePerNight: 65,
    avgPricePerNight: 95,
    totalPrice: 455,
    nights: 7,
    currency: "EUR",
    amenities: ["Pool", "WLAN", "Strand", "Restaurant", "Fitness"],
    mealPlan: "Halbpension",
    bookingUrl: "#",
    source: "booking",
    distanceToCenter: "2.3 km zum Strand",
    freeCancel: true,
  },
  {
    id: "h2",
    name: "Iberostar Selection Playa de Muro",
    imageUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop",
    destination: "PMI",
    destinationCity: "Mallorca",
    stars: 5,
    rating: 9.2,
    reviewCount: 1856,
    pricePerNight: 120,
    avgPricePerNight: 180,
    totalPrice: 840,
    nights: 7,
    currency: "EUR",
    amenities: ["Pool", "Spa", "WLAN", "Direkt am Strand", "All Inclusive", "Fitness", "Kinderclub"],
    mealPlan: "All Inclusive",
    bookingUrl: "#",
    source: "booking",
    distanceToCenter: "Direkt am Strand",
    freeCancel: true,
  },
  {
    id: "h3",
    name: "Sherwood Exclusive Lara",
    imageUrl: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
    destination: "AYT",
    destinationCity: "Antalya",
    stars: 5,
    rating: 8.9,
    reviewCount: 3421,
    pricePerNight: 85,
    avgPricePerNight: 140,
    totalPrice: 595,
    nights: 7,
    currency: "EUR",
    amenities: ["Pool", "Spa", "WLAN", "Strand", "All Inclusive", "Wasserpark", "Animation"],
    mealPlan: "Ultra All Inclusive",
    bookingUrl: "#",
    source: "agoda",
    distanceToCenter: "Direkt am Strand",
    freeCancel: false,
  },
  {
    id: "h4",
    name: "Creta Maris Resort",
    imageUrl: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=300&fit=crop",
    destination: "HER",
    destinationCity: "Kreta",
    stars: 5,
    rating: 9.0,
    reviewCount: 2100,
    pricePerNight: 95,
    avgPricePerNight: 150,
    totalPrice: 665,
    nights: 7,
    currency: "EUR",
    amenities: ["Pool", "Spa", "WLAN", "Strand", "Halbpension", "Fitness", "Wassersport"],
    mealPlan: "Halbpension",
    bookingUrl: "#",
    source: "booking",
    distanceToCenter: "Am Privatstrand",
    freeCancel: true,
  },
  {
    id: "h5",
    name: "Dana Beach Resort",
    imageUrl: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop",
    destination: "HRG",
    destinationCity: "Hurghada",
    stars: 5,
    rating: 8.7,
    reviewCount: 4523,
    pricePerNight: 55,
    avgPricePerNight: 90,
    totalPrice: 385,
    nights: 7,
    currency: "EUR",
    amenities: ["Pool", "Schnorcheln", "WLAN", "Strand", "All Inclusive", "Animation", "Aquapark"],
    mealPlan: "All Inclusive",
    bookingUrl: "#",
    source: "agoda",
    distanceToCenter: "Direkt am Strand",
    freeCancel: true,
  },
]

export const MOCK_TRENDING_DEALS: TrendingDeal[] = [
  {
    id: "td1",
    type: "flight",
    title: "Berlin → Barcelona",
    subtitle: "Wizz Air, Nonstop",
    imageUrl: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=600&h=400&fit=crop",
    price: 29,
    avgPrice: 120,
    currency: "EUR",
    dealScore: 76,
    origin: "BER",
    destination: "Barcelona",
    dates: "20. Jun - 27. Jun",
    bookingUrl: "#",
  },
  {
    id: "td2",
    type: "flight",
    title: "Frankfurt → Mallorca",
    subtitle: "Ryanair, Nonstop",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop",
    price: 49,
    avgPrice: 189,
    currency: "EUR",
    dealScore: 74,
    origin: "FRA",
    destination: "Mallorca",
    dates: "15. Jun - 22. Jun",
    bookingUrl: "#",
  },
  {
    id: "td3",
    type: "hotel",
    title: "5* Resort Hurghada",
    subtitle: "7 Nächte, All Inclusive",
    imageUrl: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&h=400&fit=crop",
    price: 385,
    avgPrice: 630,
    currency: "EUR",
    dealScore: 39,
    destination: "Hurghada",
    dates: "Sep 2026",
    bookingUrl: "#",
  },
  {
    id: "td4",
    type: "package",
    title: "1 Woche Kreta",
    subtitle: "Flug + 5* Hotel, Halbpension",
    imageUrl: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&h=400&fit=crop",
    price: 599,
    avgPrice: 950,
    currency: "EUR",
    dealScore: 37,
    origin: "MUC",
    destination: "Kreta",
    dates: "Jul - Aug 2026",
    bookingUrl: "#",
  },
  {
    id: "td5",
    type: "flight",
    title: "München → Lissabon",
    subtitle: "EasyJet, Nonstop",
    imageUrl: "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=600&h=400&fit=crop",
    price: 69,
    avgPrice: 180,
    currency: "EUR",
    dealScore: 62,
    origin: "MUC",
    destination: "Lissabon",
    dates: "10. Aug - 17. Aug",
    bookingUrl: "#",
  },
  {
    id: "td6",
    type: "hotel",
    title: "5* Antalya All Inclusive",
    subtitle: "7 Nächte, Ultra AI",
    imageUrl: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&h=400&fit=crop",
    price: 595,
    avgPrice: 980,
    currency: "EUR",
    dealScore: 39,
    destination: "Antalya",
    dates: "Jul 2026",
    bookingUrl: "#",
  },
]

export function getMockFlights(origin?: string, destination?: string): FlightOffer[] {
  let flights = [...MOCK_FLIGHTS]
  if (origin) flights = flights.filter((f) => f.origin === origin)
  if (destination) flights = flights.filter((f) => f.destination === destination)
  return flights.sort((a, b) => a.price - b.price)
}

export function getMockHotels(destination?: string): HotelOffer[] {
  let hotels = [...MOCK_HOTELS]
  if (destination) hotels = hotels.filter((h) => h.destination === destination || h.destinationCity.toLowerCase().includes(destination.toLowerCase()))
  return hotels.sort((a, b) => a.pricePerNight - b.pricePerNight)
}
