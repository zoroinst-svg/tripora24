// SINGLE SOURCE OF TRUTH for all airport/city/country data
// Every IATA code the Travelpayouts API could return from DACH origins

type Category = "beach" | "city" | "island" | "mountain" | "cultural" | "default"

interface AirportInfo {
  city: string    // Human-readable city name (German)
  country: string // 2-letter country code
  category: Category
}

export const IATA_DB: Record<string, AirportInfo> = {
  // ==================== DEUTSCHLAND ====================
  FRA: { city: "Frankfurt", country: "DE", category: "city" },
  MUC: { city: "München", country: "DE", category: "city" },
  BER: { city: "Berlin", country: "DE", category: "city" },
  DUS: { city: "Düsseldorf", country: "DE", category: "city" },
  HAM: { city: "Hamburg", country: "DE", category: "city" },
  CGN: { city: "Köln/Bonn", country: "DE", category: "city" },
  STR: { city: "Stuttgart", country: "DE", category: "city" },
  HAJ: { city: "Hannover", country: "DE", category: "city" },
  NUE: { city: "Nürnberg", country: "DE", category: "city" },
  LEJ: { city: "Leipzig", country: "DE", category: "city" },
  DTM: { city: "Dortmund", country: "DE", category: "city" },
  HHN: { city: "Frankfurt-Hahn", country: "DE", category: "city" },
  FMM: { city: "Memmingen", country: "DE", category: "city" },
  PAD: { city: "Paderborn", country: "DE", category: "city" },
  BRE: { city: "Bremen", country: "DE", category: "city" },
  FDH: { city: "Friedrichshafen", country: "DE", category: "city" },
  KSF: { city: "Kassel", country: "DE", category: "city" },
  SXB: { city: "Straßburg", country: "FR", category: "city" },
  FKB: { city: "Karlsruhe/Baden", country: "DE", category: "city" },
  SCN: { city: "Saarbrücken", country: "DE", category: "city" },
  FMO: { city: "Münster", country: "DE", category: "city" },
  ERF: { city: "Erfurt", country: "DE", category: "city" },
  DRS: { city: "Dresden", country: "DE", category: "city" },
  RLG: { city: "Rostock", country: "DE", category: "city" },

  // ==================== ÖSTERREICH ====================
  VIE: { city: "Wien", country: "AT", category: "city" },
  SZG: { city: "Salzburg", country: "AT", category: "mountain" },
  INN: { city: "Innsbruck", country: "AT", category: "mountain" },
  GRZ: { city: "Graz", country: "AT", category: "city" },
  LNZ: { city: "Linz", country: "AT", category: "city" },
  KLU: { city: "Klagenfurt", country: "AT", category: "mountain" },

  // ==================== SCHWEIZ ====================
  ZRH: { city: "Zürich", country: "CH", category: "city" },
  GVA: { city: "Genf", country: "CH", category: "city" },
  BSL: { city: "Basel", country: "CH", category: "city" },
  BRN: { city: "Bern", country: "CH", category: "city" },

  // ==================== SPANIEN ====================
  PMI: { city: "Mallorca", country: "ES", category: "beach" },
  BCN: { city: "Barcelona", country: "ES", category: "city" },
  AGP: { city: "Málaga", country: "ES", category: "beach" },
  IBZ: { city: "Ibiza", country: "ES", category: "island" },
  TFS: { city: "Teneriffa", country: "ES", category: "island" },
  LPA: { city: "Gran Canaria", country: "ES", category: "island" },
  FUE: { city: "Fuerteventura", country: "ES", category: "island" },
  ALC: { city: "Alicante", country: "ES", category: "beach" },
  MAD: { city: "Madrid", country: "ES", category: "city" },
  SVQ: { city: "Sevilla", country: "ES", category: "cultural" },
  VLC: { city: "Valencia", country: "ES", category: "city" },
  GRO: { city: "Girona", country: "ES", category: "beach" },
  REU: { city: "Reus", country: "ES", category: "beach" },
  BIO: { city: "Bilbao", country: "ES", category: "city" },
  SCQ: { city: "Santiago de Compostela", country: "ES", category: "cultural" },
  ACE: { city: "Lanzarote", country: "ES", category: "island" },
  MJV: { city: "Murcia", country: "ES", category: "beach" },
  XRY: { city: "Jerez", country: "ES", category: "cultural" },
  LEI: { city: "Almería", country: "ES", category: "beach" },
  MAH: { city: "Menorca", country: "ES", category: "island" },

  // ==================== TÜRKEI ====================
  AYT: { city: "Antalya", country: "TR", category: "beach" },
  IST: { city: "Istanbul", country: "TR", category: "cultural" },
  SAW: { city: "Istanbul Sabiha", country: "TR", category: "cultural" },
  DLM: { city: "Dalaman", country: "TR", category: "beach" },
  BJV: { city: "Bodrum", country: "TR", category: "beach" },
  ADB: { city: "Izmir", country: "TR", category: "city" },
  ESB: { city: "Ankara", country: "TR", category: "city" },
  GZT: { city: "Gaziantep", country: "TR", category: "cultural" },
  TZX: { city: "Trabzon", country: "TR", category: "city" },

  // ==================== GRIECHENLAND ====================
  ATH: { city: "Athen", country: "GR", category: "cultural" },
  HER: { city: "Kreta (Heraklion)", country: "GR", category: "island" },
  CFU: { city: "Korfu", country: "GR", category: "island" },
  RHO: { city: "Rhodos", country: "GR", category: "island" },
  JTR: { city: "Santorini", country: "GR", category: "island" },
  ZTH: { city: "Zakynthos", country: "GR", category: "island" },
  CHQ: { city: "Kreta (Chania)", country: "GR", category: "island" },
  SKG: { city: "Thessaloniki", country: "GR", category: "city" },
  KGS: { city: "Kos", country: "GR", category: "island" },
  JMK: { city: "Mykonos", country: "GR", category: "island" },
  EFL: { city: "Kefalonia", country: "GR", category: "island" },
  PVK: { city: "Preveza/Lefkada", country: "GR", category: "island" },
  JSI: { city: "Skiathos", country: "GR", category: "island" },
  KLX: { city: "Kalamata", country: "GR", category: "beach" },

  // ==================== ITALIEN ====================
  FCO: { city: "Rom", country: "IT", category: "cultural" },
  NAP: { city: "Neapel", country: "IT", category: "cultural" },
  MXP: { city: "Mailand (Malpensa)", country: "IT", category: "city" },
  BGY: { city: "Mailand (Bergamo)", country: "IT", category: "city" },
  LIN: { city: "Mailand (Linate)", country: "IT", category: "city" },
  VCE: { city: "Venedig", country: "IT", category: "cultural" },
  TSF: { city: "Venedig (Treviso)", country: "IT", category: "cultural" },
  CTA: { city: "Catania", country: "IT", category: "island" },
  PMO: { city: "Palermo", country: "IT", category: "island" },
  PSA: { city: "Pisa", country: "IT", category: "cultural" },
  BRI: { city: "Bari", country: "IT", category: "beach" },
  BLQ: { city: "Bologna", country: "IT", category: "city" },
  TRN: { city: "Turin", country: "IT", category: "city" },
  FLR: { city: "Florenz", country: "IT", category: "cultural" },
  VRN: { city: "Verona", country: "IT", category: "city" },
  CAG: { city: "Cagliari", country: "IT", category: "island" },
  OLB: { city: "Olbia (Sardinien)", country: "IT", category: "island" },
  AHO: { city: "Alghero (Sardinien)", country: "IT", category: "island" },
  SUF: { city: "Lamezia Terme", country: "IT", category: "beach" },
  REG: { city: "Reggio Calabria", country: "IT", category: "beach" },
  BDS: { city: "Brindisi", country: "IT", category: "beach" },
  TPS: { city: "Trapani", country: "IT", category: "island" },
  CIA: { city: "Rom (Ciampino)", country: "IT", category: "cultural" },
  GOA: { city: "Genua", country: "IT", category: "city" },
  PEG: { city: "Perugia", country: "IT", category: "cultural" },
  AOI: { city: "Ancona", country: "IT", category: "beach" },

  // ==================== PORTUGAL ====================
  LIS: { city: "Lissabon", country: "PT", category: "city" },
  FAO: { city: "Algarve (Faro)", country: "PT", category: "beach" },
  OPO: { city: "Porto", country: "PT", category: "city" },
  FNC: { city: "Madeira", country: "PT", category: "island" },
  PDL: { city: "Azoren", country: "PT", category: "island" },

  // ==================== FRANKREICH ====================
  CDG: { city: "Paris (CDG)", country: "FR", category: "city" },
  ORY: { city: "Paris (Orly)", country: "FR", category: "city" },
  NCE: { city: "Nizza", country: "FR", category: "beach" },
  MRS: { city: "Marseille", country: "FR", category: "city" },
  LYS: { city: "Lyon", country: "FR", category: "city" },
  TLS: { city: "Toulouse", country: "FR", category: "city" },
  BOD: { city: "Bordeaux", country: "FR", category: "city" },
  BIA: { city: "Bastia (Korsika)", country: "FR", category: "island" },
  AJA: { city: "Ajaccio (Korsika)", country: "FR", category: "island" },
  BVA: { city: "Paris (Beauvais)", country: "FR", category: "city" },

  // ==================== GROSSBRITANNIEN ====================
  LHR: { city: "London (Heathrow)", country: "GB", category: "city" },
  LGW: { city: "London (Gatwick)", country: "GB", category: "city" },
  STN: { city: "London (Stansted)", country: "GB", category: "city" },
  LTN: { city: "London (Luton)", country: "GB", category: "city" },
  MAN: { city: "Manchester", country: "GB", category: "city" },
  EDI: { city: "Edinburgh", country: "GB", category: "city" },
  BRS: { city: "Bristol", country: "GB", category: "city" },
  BHX: { city: "Birmingham", country: "GB", category: "city" },

  // ==================== KROATIEN ====================
  SPU: { city: "Split", country: "HR", category: "beach" },
  DBV: { city: "Dubrovnik", country: "HR", category: "cultural" },
  ZAG: { city: "Zagreb", country: "HR", category: "city" },
  ZAD: { city: "Zadar", country: "HR", category: "beach" },
  PUY: { city: "Pula", country: "HR", category: "beach" },
  RJK: { city: "Rijeka", country: "HR", category: "beach" },

  // ==================== ÄGYPTEN ====================
  HRG: { city: "Hurghada", country: "EG", category: "beach" },
  SSH: { city: "Sharm el-Sheikh", country: "EG", category: "beach" },
  CAI: { city: "Kairo", country: "EG", category: "cultural" },
  RMF: { city: "Marsa Alam", country: "EG", category: "beach" },

  // ==================== NIEDERLANDE ====================
  AMS: { city: "Amsterdam", country: "NL", category: "city" },
  EIN: { city: "Eindhoven", country: "NL", category: "city" },

  // ==================== VAE ====================
  DXB: { city: "Dubai", country: "AE", category: "city" },
  AUH: { city: "Abu Dhabi", country: "AE", category: "city" },

  // ==================== THAILAND ====================
  BKK: { city: "Bangkok", country: "TH", category: "cultural" },
  HKT: { city: "Phuket", country: "TH", category: "beach" },
  CNX: { city: "Chiang Mai", country: "TH", category: "cultural" },

  // ==================== IRLAND ====================
  DUB: { city: "Dublin", country: "IE", category: "city" },
  SNN: { city: "Shannon", country: "IE", category: "city" },

  // ==================== RUMÄNIEN ====================
  OTP: { city: "Bukarest", country: "RO", category: "city" },
  BUH: { city: "Bukarest (alle)", country: "RO", category: "city" },
  CLJ: { city: "Cluj-Napoca", country: "RO", category: "city" },
  TSR: { city: "Timișoara", country: "RO", category: "city" },
  IAS: { city: "Iași", country: "RO", category: "city" },
  SBZ: { city: "Sibiu", country: "RO", category: "cultural" },

  // ==================== POLEN ====================
  WAW: { city: "Warschau", country: "PL", category: "city" },
  KRK: { city: "Krakau", country: "PL", category: "cultural" },
  WRO: { city: "Breslau", country: "PL", category: "city" },
  GDN: { city: "Danzig", country: "PL", category: "city" },
  KTW: { city: "Kattowitz", country: "PL", category: "city" },
  POZ: { city: "Posen", country: "PL", category: "city" },
  WMI: { city: "Warschau-Modlin", country: "PL", category: "city" },

  // ==================== UNGARN ====================
  BUD: { city: "Budapest", country: "HU", category: "city" },
  DEB: { city: "Debrecen", country: "HU", category: "city" },

  // ==================== TSCHECHIEN ====================
  PRG: { city: "Prag", country: "CZ", category: "city" },
  BRQ: { city: "Brünn", country: "CZ", category: "city" },

  // ==================== BULGARIEN ====================
  SOF: { city: "Sofia", country: "BG", category: "city" },
  BOJ: { city: "Burgas", country: "BG", category: "beach" },
  VAR: { city: "Varna", country: "BG", category: "beach" },

  // ==================== SERBIEN ====================
  BEG: { city: "Belgrad", country: "RS", category: "city" },
  INI: { city: "Niš", country: "RS", category: "city" },

  // ==================== MONTENEGRO ====================
  TGD: { city: "Podgorica", country: "ME", category: "city" },
  TIV: { city: "Tivat", country: "ME", category: "beach" },

  // ==================== BOSNIEN ====================
  SJJ: { city: "Sarajevo", country: "BA", category: "cultural" },

  // ==================== NORDMAZEDONIEN ====================
  SKP: { city: "Skopje", country: "MK", category: "city" },
  OHD: { city: "Ohrid", country: "MK", category: "beach" },

  // ==================== ALBANIEN ====================
  TIA: { city: "Tirana", country: "AL", category: "city" },

  // ==================== MALTA ====================
  MLA: { city: "Malta", country: "MT", category: "island" },

  // ==================== ZYPERN ====================
  LCA: { city: "Larnaka", country: "CY", category: "beach" },
  PFO: { city: "Paphos", country: "CY", category: "beach" },
  ECN: { city: "Nordzypern", country: "CY", category: "beach" },

  // ==================== SKANDINAVIEN ====================
  CPH: { city: "Kopenhagen", country: "DK", category: "city" },
  ARN: { city: "Stockholm", country: "SE", category: "city" },
  OSL: { city: "Oslo", country: "NO", category: "city" },
  HEL: { city: "Helsinki", country: "FI", category: "city" },
  GOT: { city: "Göteborg", country: "SE", category: "city" },

  // ==================== BALTIKUM ====================
  RIX: { city: "Riga", country: "LV", category: "city" },
  VNO: { city: "Vilnius", country: "LT", category: "city" },
  TLL: { city: "Tallinn", country: "EE", category: "city" },

  // ==================== MAROKKO ====================
  RAK: { city: "Marrakesch", country: "MA", category: "cultural" },
  AGA: { city: "Agadir", country: "MA", category: "beach" },
  CMN: { city: "Casablanca", country: "MA", category: "city" },
  FEZ: { city: "Fès", country: "MA", category: "cultural" },
  NDR: { city: "Nador", country: "MA", category: "beach" },
  TNG: { city: "Tanger", country: "MA", category: "cultural" },

  // ==================== TUNESIEN ====================
  TUN: { city: "Tunis", country: "TN", category: "cultural" },
  DJE: { city: "Djerba", country: "TN", category: "island" },
  NBE: { city: "Enfidha", country: "TN", category: "beach" },

  // ==================== ISRAEL ====================
  TLV: { city: "Tel Aviv", country: "IL", category: "city" },

  // ==================== GEORGIEN ====================
  TBS: { city: "Tiflis", country: "GE", category: "cultural" },
  BUS: { city: "Batumi", country: "GE", category: "beach" },

  // ==================== WEITERES ====================
  KEF: { city: "Reykjavik", country: "IS", category: "mountain" },
  LUX: { city: "Luxemburg", country: "LU", category: "city" },
  BRU: { city: "Brüssel", country: "BE", category: "city" },
  CRL: { city: "Brüssel (Charleroi)", country: "BE", category: "city" },

  // ==================== LANGSTRECKE ====================
  JFK: { city: "New York", country: "US", category: "city" },
  LAX: { city: "Los Angeles", country: "US", category: "city" },
  MIA: { city: "Miami", country: "US", category: "beach" },
  CUN: { city: "Cancún", country: "MX", category: "beach" },
  MLE: { city: "Malediven", country: "MV", category: "island" },
  CMB: { city: "Sri Lanka", country: "LK", category: "island" },
  DPS: { city: "Bali", country: "ID", category: "island" },
  MBJ: { city: "Jamaika", country: "JM", category: "island" },
  PUJ: { city: "Punta Cana", country: "DO", category: "beach" },
  SIN: { city: "Singapur", country: "SG", category: "city" },
  NRT: { city: "Tokio", country: "JP", category: "city" },
  ICN: { city: "Seoul", country: "KR", category: "city" },

  // ==================== CITY/METRO CODES (used by Travelpayouts) ====================
  LON: { city: "London", country: "GB", category: "city" },
  NYC: { city: "New York", country: "US", category: "city" },
  PAR: { city: "Paris", country: "FR", category: "city" },
  MIL: { city: "Mailand", country: "IT", category: "city" },
  ROM: { city: "Rom", country: "IT", category: "cultural" },
  MOW: { city: "Moskau", country: "RU", category: "city" },
  STO: { city: "Stockholm", country: "SE", category: "city" },
  BUE: { city: "Buenos Aires", country: "AR", category: "city" },
  TYO: { city: "Tokio", country: "JP", category: "city" },
  SEL: { city: "Seoul", country: "KR", category: "city" },
  BKI: { city: "Kota Kinabalu", country: "MY", category: "beach" },
  IEV: { city: "Kiew", country: "UA", category: "city" },
  SPK: { city: "Sapporo", country: "JP", category: "city" },
  OSA: { city: "Osaka", country: "JP", category: "city" },
  WAS: { city: "Washington", country: "US", category: "city" },
  CHI: { city: "Chicago", country: "US", category: "city" },
  YTO: { city: "Toronto", country: "CA", category: "city" },
  YMQ: { city: "Montreal", country: "CA", category: "city" },
  RIO: { city: "Rio de Janeiro", country: "BR", category: "beach" },
  SAO: { city: "São Paulo", country: "BR", category: "city" },
  SVO: { city: "Moskau (Sheremetyevo)", country: "RU", category: "city" },
  STN: { city: "London (Stansted)", country: "GB", category: "city" },
}

// ==================== COUNTRY NAMES (German) ====================
export const COUNTRY_NAMES: Record<string, string> = {
  DE: "Deutschland", AT: "Österreich", CH: "Schweiz",
  ES: "Spanien", TR: "Türkei", GR: "Griechenland",
  IT: "Italien", PT: "Portugal", FR: "Frankreich",
  GB: "Großbritannien", HR: "Kroatien", EG: "Ägypten",
  NL: "Niederlande", AE: "VAE", TH: "Thailand",
  IE: "Irland", RO: "Rumänien", PL: "Polen",
  HU: "Ungarn", CZ: "Tschechien", BG: "Bulgarien",
  RS: "Serbien", ME: "Montenegro", BA: "Bosnien",
  MK: "Nordmazedonien", AL: "Albanien", MT: "Malta",
  CY: "Zypern", DK: "Dänemark", SE: "Schweden",
  NO: "Norwegen", FI: "Finnland", LV: "Lettland",
  LT: "Litauen", EE: "Estland", MA: "Marokko",
  TN: "Tunesien", IL: "Israel", GE: "Georgien",
  IS: "Island", LU: "Luxemburg", BE: "Belgien",
  US: "USA", MX: "Mexiko", MV: "Malediven",
  LK: "Sri Lanka", ID: "Indonesien", JM: "Jamaika",
  DO: "Dominikanische Republik", SG: "Singapur",
  JP: "Japan", KR: "Südkorea",
}

export const COUNTRY_FLAGS: Record<string, string> = {
  DE: "🇩🇪", AT: "🇦🇹", CH: "🇨🇭", ES: "🇪🇸", TR: "🇹🇷", GR: "🇬🇷",
  IT: "🇮🇹", PT: "🇵🇹", FR: "🇫🇷", GB: "🇬🇧", HR: "🇭🇷", EG: "🇪🇬",
  NL: "🇳🇱", AE: "🇦🇪", TH: "🇹🇭", IE: "🇮🇪", RO: "🇷🇴", PL: "🇵🇱",
  HU: "🇭🇺", CZ: "🇨🇿", BG: "🇧🇬", RS: "🇷🇸", ME: "🇲🇪", BA: "🇧🇦",
  MK: "🇲🇰", AL: "🇦🇱", MT: "🇲🇹", CY: "🇨🇾", DK: "🇩🇰", SE: "🇸🇪",
  NO: "🇳🇴", FI: "🇫🇮", LV: "🇱🇻", LT: "🇱🇹", EE: "🇪🇪", MA: "🇲🇦",
  TN: "🇹🇳", IL: "🇮🇱", GE: "🇬🇪", IS: "🇮🇸", LU: "🇱🇺", BE: "🇧🇪",
  US: "🇺🇸", MX: "🇲🇽", MV: "🇲🇻", LK: "🇱🇰", ID: "🇮🇩", JM: "🇯🇲",
  DO: "🇩🇴", SG: "🇸🇬", JP: "🇯🇵", KR: "🇰🇷",
}

// ==================== HELPER FUNCTIONS ====================

export function getCity(iata: string): string {
  return IATA_DB[iata]?.city || iata
}

export function getCountryCode(iata: string): string {
  return IATA_DB[iata]?.country || "XX"
}

export function getCategory(iata: string): Category {
  return IATA_DB[iata]?.category || "default"
}

export function getCountryName(code: string): string {
  return COUNTRY_NAMES[code] || code
}

export function getCountryFlag(code: string): string {
  return COUNTRY_FLAGS[code] || "✈️"
}

export function isKnownCountry(code: string): boolean {
  return code in COUNTRY_NAMES
}

// Dynamically derive all airports for a country from IATA_DB
export function getAirportsForCountry(countryCode: string): string[] {
  return Object.entries(IATA_DB)
    .filter(([, info]) => info.country === countryCode)
    .map(([iata]) => iata)
}

// Get all known country codes that have airports
export function getAllCountryCodes(): string[] {
  const codes = new Set(Object.values(IATA_DB).map((a) => a.country))
  return Array.from(codes).sort()
}
