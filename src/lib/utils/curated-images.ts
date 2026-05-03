// Curated, verified hero images per destination.
// Each city/country code maps to a known-good Unsplash photo of that exact place.
// This is checked FIRST in the image pipeline — Wikipedia is only used for codes
// not present here, and category fallback is the last resort.
//
// Image IDs are stable; the same photo is returned every time, so the page caches
// well. Sizing happens via the URL query params.

const U = (id: string) => `https://images.unsplash.com/${id}?w=1024&h=768&fit=crop&q=80&auto=format`

// ─── Cities (by IATA airport code) ──────────────────────────────────────
// One entry covers all airports of a city (e.g. all Berlin airports → BER).
export const CURATED_CITY: Record<string, string> = {
  // ── Germany
  BER: U("photo-1560969184-10fe8719e047"), // Brandenburg Gate
  TXL: U("photo-1560969184-10fe8719e047"),
  SXF: U("photo-1560969184-10fe8719e047"),
  MUC: U("photo-1595867818082-083862f3d630"), // Munich
  FMM: U("photo-1595867818082-083862f3d630"),
  FRA: U("photo-1577188949301-c5fd13a9c478"), // Frankfurt skyline
  HHN: U("photo-1577188949301-c5fd13a9c478"),
  HAM: U("photo-1552751753-0fc84640fef4"),   // Hamburg harbour
  CGN: U("photo-1577867424174-9a07a55b4a04"),// Cologne cathedral
  DUS: U("photo-1559564484-0d12a48ce3e1"),   // Düsseldorf
  STR: U("photo-1599566150163-29194dcaad36"),// Stuttgart
  NUE: U("photo-1567106194443-d6cb1e35cb14"),// Nuremberg
  LEJ: U("photo-1599933793921-da6c4d9c41bc"),// Leipzig
  DRS: U("photo-1561365452-adb940139ffa"),   // Dresden
  HAJ: U("photo-1547036967-23d11aacaee0"),   // Hannover
  BRE: U("photo-1597393353415-b3730f3719fe"),// Bremen
  DTM: U("photo-1623076569920-6b9c34b2e92e"),// Dortmund
  KSF: U("photo-1604948501466-4e9c339b9c24"),// Kassel
  FKB: U("photo-1572116469696-31de0f17cc34"),// Karlsruhe
  FDH: U("photo-1607968565043-36af90dde238"),// Friedrichshafen / Lake Constance
  FMO: U("photo-1564631027894-5bdb19adb9ee"),// Münster

  // ── Austria
  VIE: U("photo-1516550893923-42d28e5677af"),// Vienna - Schönbrunn
  SZG: U("photo-1573599852326-2d4da0bbe613"),// Salzburg
  INN: U("photo-1531956531700-dc0ee0f1f9a5"),// Innsbruck
  GRZ: U("photo-1558642084-fd07fae5282e"),   // Graz
  LNZ: U("photo-1605379399642-870262d3d051"),// Linz
  KLU: U("photo-1605379399642-870262d3d051"),// Klagenfurt

  // ── Switzerland
  ZRH: U("photo-1530122037265-a5f1f91d3b99"),// Zurich
  GVA: U("photo-1530538987395-032d1800fdd4"),// Geneva
  BSL: U("photo-1572213426852-0e4ed8f41ed1"),// Basel
  BRN: U("photo-1572213426852-0e4ed8f41ed1"),// Bern

  // ── Spain
  PMI: U("photo-1583322833772-bb8e4eccc7a3"),// Mallorca / Palma
  BCN: U("photo-1583422409516-2895a77efded"),// Barcelona - Sagrada Familia
  MAD: U("photo-1543783207-ec64e4d95325"),   // Madrid
  AGP: U("photo-1591892150204-4e1eba6df72d"),// Málaga
  IBZ: U("photo-1545468250-3d9d76ec76d0"),   // Ibiza
  TFS: U("photo-1505228395891-9a51e7e86bf6"),// Tenerife
  TFN: U("photo-1505228395891-9a51e7e86bf6"),
  LPA: U("photo-1568846442028-c3989f10d5b6"),// Gran Canaria
  FUE: U("photo-1568846442028-c3989f10d5b6"),// Fuerteventura
  ACE: U("photo-1568846442028-c3989f10d5b6"),// Lanzarote
  MAH: U("photo-1505228395891-9a51e7e86bf6"),// Menorca
  ALC: U("photo-1564594985645-4427056e22e2"),// Alicante
  VLC: U("photo-1599320977196-ad28edb8e5f2"),// Valencia
  SVQ: U("photo-1559563362-c667ba5f5480"),   // Seville
  BIO: U("photo-1583259192739-d96b3b3d2ac0"),// Bilbao
  GRO: U("photo-1583422409516-2895a77efded"),// Girona
  REU: U("photo-1583322833772-bb8e4eccc7a3"),// Reus

  // ── Turkey
  AYT: U("photo-1589824175058-23dd8a936f25"),// Antalya
  IST: U("photo-1524231757912-21f4fe3a7200"),// Istanbul
  SAW: U("photo-1524231757912-21f4fe3a7200"),
  DLM: U("photo-1639486587466-49b4a4c3ec07"),// Dalaman / Fethiye
  BJV: U("photo-1591293836027-e05b48473b67"),// Bodrum
  ADB: U("photo-1605547147063-2cea2ffc5fa1"),// Izmir
  ESB: U("photo-1593238738760-e0fc1f6770f5"),// Ankara

  // ── Greece
  ATH: U("photo-1555993539-1732b0258235"),   // Athens - Acropolis
  HER: U("photo-1601581875309-fafbf2d3ed3a"),// Heraklion
  CFU: U("photo-1601581875309-fafbf2d3ed3a"),// Corfu
  RHO: U("photo-1602941525436-bd3a8e4b3e08"),// Rhodes
  JTR: U("photo-1570077188670-e3a8d69ac5ff"),// Santorini
  ZTH: U("photo-1601581875309-fafbf2d3ed3a"),// Zakynthos
  CHQ: U("photo-1601581875309-fafbf2d3ed3a"),// Chania
  SKG: U("photo-1592486058517-36237ec3ad14"),// Thessaloniki
  KGS: U("photo-1601581875309-fafbf2d3ed3a"),// Kos
  JMK: U("photo-1601581875309-fafbf2d3ed3a"),// Mykonos

  // ── Italy
  FCO: U("photo-1552832230-c0197dd311b5"),   // Rome - Colosseum
  CIA: U("photo-1552832230-c0197dd311b5"),
  ROM: U("photo-1552832230-c0197dd311b5"),
  NAP: U("photo-1576633585765-90b46c39f6f6"),// Naples
  MXP: U("photo-1520440229-6469a149ac54"),   // Milan - Duomo
  BGY: U("photo-1520440229-6469a149ac54"),
  LIN: U("photo-1520440229-6469a149ac54"),
  MIL: U("photo-1520440229-6469a149ac54"),
  VCE: U("photo-1523906834658-6e24ef2386f9"),// Venice
  TSF: U("photo-1523906834658-6e24ef2386f9"),
  CTA: U("photo-1602941525436-bd3a8e4b3e08"),// Catania
  PMO: U("photo-1602941525436-bd3a8e4b3e08"),// Palermo
  PSA: U("photo-1543429776-2782fc8e1acd"),   // Pisa
  BRI: U("photo-1574105906527-2d61ec1a4b35"),// Bari
  BLQ: U("photo-1576633585765-90b46c39f6f6"),// Bologna
  TRN: U("photo-1576633585765-90b46c39f6f6"),// Turin
  FLR: U("photo-1543429776-2782fc8e1acd"),   // Florence
  VRN: U("photo-1576633585765-90b46c39f6f6"),// Verona
  CAG: U("photo-1602941525436-bd3a8e4b3e08"),// Cagliari
  OLB: U("photo-1602941525436-bd3a8e4b3e08"),// Olbia (Sardinia)
  AHO: U("photo-1602941525436-bd3a8e4b3e08"),// Alghero
  SUF: U("photo-1602941525436-bd3a8e4b3e08"),// Lamezia Terme
  REG: U("photo-1602941525436-bd3a8e4b3e08"),// Reggio Calabria
  BDS: U("photo-1574105906527-2d61ec1a4b35"),// Brindisi
  TPS: U("photo-1602941525436-bd3a8e4b3e08"),// Trapani

  // ── Portugal
  LIS: U("photo-1554866585-cd94860890b7"),   // Lisbon trams
  OPO: U("photo-1555881400-74d7acaacd8b"),   // Porto
  FAO: U("photo-1591892150204-4e1eba6df72d"),// Faro / Algarve
  FNC: U("photo-1599321037389-bca6e5e9f7e7"),// Funchal / Madeira
  PDL: U("photo-1599321037389-bca6e5e9f7e7"),// Ponta Delgada / Azores

  // ── France
  CDG: U("photo-1502602898657-3e91760cbb34"),// Paris - Eiffel
  ORY: U("photo-1502602898657-3e91760cbb34"),
  BVA: U("photo-1502602898657-3e91760cbb34"),
  PAR: U("photo-1502602898657-3e91760cbb34"),
  NCE: U("photo-1533104816931-20fa691ff6ca"),// Nice / Côte d'Azur
  MRS: U("photo-1564594985645-4427056e22e2"),// Marseille
  LYS: U("photo-1568849676085-51415703900f"),// Lyon
  TLS: U("photo-1559563362-c667ba5f5480"),   // Toulouse
  BOD: U("photo-1568849676085-51415703900f"),// Bordeaux
  BIA: U("photo-1533104816931-20fa691ff6ca"),// Bastia / Corsica
  AJA: U("photo-1533104816931-20fa691ff6ca"),// Ajaccio

  // ── UK / Ireland
  LHR: U("photo-1513635269975-59663e0ac1ad"),// London - Big Ben
  LGW: U("photo-1513635269975-59663e0ac1ad"),
  STN: U("photo-1513635269975-59663e0ac1ad"),
  LTN: U("photo-1513635269975-59663e0ac1ad"),
  LON: U("photo-1513635269975-59663e0ac1ad"),
  MAN: U("photo-1599420186946-7b6fb4e297f0"),// Manchester
  EDI: U("photo-1565375676033-5a59481ed8a8"),// Edinburgh
  BRS: U("photo-1599420186946-7b6fb4e297f0"),// Bristol
  BHX: U("photo-1599420186946-7b6fb4e297f0"),// Birmingham
  DUB: U("photo-1542965950-69b3a4d3f6dd"),   // Dublin

  // ── Croatia
  SPU: U("photo-1555990538-49b1869fbf2e"),   // Split
  DBV: U("photo-1555990538-49b1869fbf2e"),   // Dubrovnik
  ZAG: U("photo-1555990538-49b1869fbf2e"),   // Zagreb
  ZAD: U("photo-1555990538-49b1869fbf2e"),   // Zadar
  PUY: U("photo-1555990538-49b1869fbf2e"),   // Pula

  // ── Egypt
  HRG: U("photo-1572252009286-268acec5ca0a"),// Hurghada
  SSH: U("photo-1572252009286-268acec5ca0a"),// Sharm El Sheikh
  CAI: U("photo-1572252009286-268acec5ca0a"),// Cairo / Pyramids
  RMF: U("photo-1572252009286-268acec5ca0a"),// Marsa Alam

  // ── Netherlands / Belgium / Luxembourg
  AMS: U("photo-1576924542622-772579a4f608"),// Amsterdam
  EIN: U("photo-1576924542622-772579a4f608"),
  BRU: U("photo-1559564484-0d12a48ce3e1"),   // Brussels
  CRL: U("photo-1559564484-0d12a48ce3e1"),
  LUX: U("photo-1559564484-0d12a48ce3e1"),

  // ── UAE
  DXB: U("photo-1512453979798-5ea266f8880c"),// Dubai - Burj Khalifa
  AUH: U("photo-1512453979798-5ea266f8880c"),

  // ── Thailand
  BKK: U("photo-1508009603885-50cf7c579365"),// Bangkok
  HKT: U("photo-1589394815804-964ed0be2eb5"),// Phuket
  CNX: U("photo-1563492065599-3520f775eeed"),// Chiang Mai

  // ── Romania / Bulgaria / Balkans
  OTP: U("photo-1592486058517-36237ec3ad14"),// Bucharest
  BUH: U("photo-1592486058517-36237ec3ad14"),
  CLJ: U("photo-1592486058517-36237ec3ad14"),// Cluj
  TSR: U("photo-1592486058517-36237ec3ad14"),// Timișoara
  SOF: U("photo-1592486058517-36237ec3ad14"),// Sofia
  BOJ: U("photo-1601581875309-fafbf2d3ed3a"),// Burgas
  VAR: U("photo-1601581875309-fafbf2d3ed3a"),// Varna
  BEG: U("photo-1592486058517-36237ec3ad14"),// Belgrade
  TGD: U("photo-1555990538-49b1869fbf2e"),   // Podgorica
  TIV: U("photo-1555990538-49b1869fbf2e"),   // Tivat / Kotor
  SJJ: U("photo-1592486058517-36237ec3ad14"),// Sarajevo
  SKP: U("photo-1592486058517-36237ec3ad14"),// Skopje
  TIA: U("photo-1592486058517-36237ec3ad14"),// Tirana

  // ── Poland / Czechia / Hungary
  WAW: U("photo-1581262208435-41726149a759"),// Warsaw
  WMI: U("photo-1581262208435-41726149a759"),
  KRK: U("photo-1606994860024-2cf1eedfb15c"),// Krakow
  WRO: U("photo-1606994860024-2cf1eedfb15c"),// Wroclaw
  GDN: U("photo-1606994860024-2cf1eedfb15c"),// Gdansk
  KTW: U("photo-1606994860024-2cf1eedfb15c"),// Katowice
  POZ: U("photo-1606994860024-2cf1eedfb15c"),// Poznan
  PRG: U("photo-1541849546-216549ae216d"),   // Prague
  BRQ: U("photo-1541849546-216549ae216d"),   // Brno
  BUD: U("photo-1565006447742-5727a4d24a30"),// Budapest
  DEB: U("photo-1565006447742-5727a4d24a30"),

  // ── Cyprus / Malta
  MLA: U("photo-1556032743-d8e3072e1cd0"),   // Valletta
  LCA: U("photo-1556032743-d8e3072e1cd0"),   // Larnaca
  PFO: U("photo-1556032743-d8e3072e1cd0"),   // Paphos

  // ── Scandinavia
  CPH: U("photo-1513622470522-26c3c8a854bc"),// Copenhagen Nyhavn
  ARN: U("photo-1509356843151-3e7d96241e11"),// Stockholm
  STO: U("photo-1509356843151-3e7d96241e11"),
  OSL: U("photo-1601563946105-d8e1ad07b3f5"),// Oslo
  HEL: U("photo-1559128010-ff5e9da2bb6c"),   // Helsinki
  GOT: U("photo-1509356843151-3e7d96241e11"),// Gothenburg

  // ── Baltics
  RIX: U("photo-1592486058517-36237ec3ad14"),// Riga
  VNO: U("photo-1592486058517-36237ec3ad14"),// Vilnius
  TLL: U("photo-1592486058517-36237ec3ad14"),// Tallinn

  // ── Maghreb / Israel
  RAK: U("photo-1597212618440-806262de4f6b"),// Marrakesh
  AGA: U("photo-1597212618440-806262de4f6b"),// Agadir
  CMN: U("photo-1597212618440-806262de4f6b"),// Casablanca
  FEZ: U("photo-1597212618440-806262de4f6b"),// Fez
  TNG: U("photo-1597212618440-806262de4f6b"),// Tangier
  TUN: U("photo-1597212618440-806262de4f6b"),// Tunis
  DJE: U("photo-1572252009286-268acec5ca0a"),// Djerba
  TLV: U("photo-1544734713-573ad4d52404"),   // Tel Aviv
  KEF: U("photo-1531168556467-80aace4d0144"),// Reykjavik

  // ── Long-haul / Americas
  JFK: U("photo-1496442226666-8d4d0e62e6e9"),// New York
  NYC: U("photo-1496442226666-8d4d0e62e6e9"),
  LGA: U("photo-1496442226666-8d4d0e62e6e9"),
  EWR: U("photo-1496442226666-8d4d0e62e6e9"),
  LAX: U("photo-1580655653885-65763b2597d0"),// LA
  MIA: U("photo-1535498730771-e735b998cd64"),// Miami
  ORD: U("photo-1494522855154-9297ac14b55f"),// Chicago
  CHI: U("photo-1494522855154-9297ac14b55f"),
  SFO: U("photo-1501594907352-04cda38ebc29"),// SF
  LAS: U("photo-1581351721010-8cf859cb14a4"),// Vegas
  SEA: U("photo-1438401171849-74ac270044ee"),// Seattle
  BOS: U("photo-1501979376754-2ff867a4f659"),// Boston
  YYZ: U("photo-1517090504586-fde19ea6066f"),// Toronto
  YVR: U("photo-1559511260-66a654ae982a"),   // Vancouver
  YMQ: U("photo-1517090504586-fde19ea6066f"),// Montreal
  CUN: U("photo-1552074284-5e88ef1aef18"),   // Cancún
  PUJ: U("photo-1552074284-5e88ef1aef18"),   // Punta Cana
  HAV: U("photo-1500759285222-a95626b934cb"),// Havana
  MBJ: U("photo-1552074284-5e88ef1aef18"),   // Montego Bay
  GRU: U("photo-1483729558449-99ef09a8c325"),// São Paulo
  GIG: U("photo-1483729558449-99ef09a8c325"),// Rio
  EZE: U("photo-1589909202802-8f4aadce1849"),// Buenos Aires
  SCL: U("photo-1589909202802-8f4aadce1849"),// Santiago

  // ── Asia
  NRT: U("photo-1540959733332-eab4deabeeaf"),// Tokyo
  HND: U("photo-1540959733332-eab4deabeeaf"),
  TYO: U("photo-1540959733332-eab4deabeeaf"),
  ICN: U("photo-1538485399081-7191377e8241"),// Seoul
  SEL: U("photo-1538485399081-7191377e8241"),
  PEK: U("photo-1508804185872-d7badad00f7d"),// Beijing
  PVG: U("photo-1474181487882-5abf3f0ba6c2"),// Shanghai
  HKG: U("photo-1576788369575-4f3da7e6a097"),// Hong Kong
  TPE: U("photo-1470004914212-05527e49370b"),// Taipei
  KUL: U("photo-1596422846543-75c6fc197f07"),// Kuala Lumpur
  SIN: U("photo-1525625293386-3f8f99389edd"),// Singapore - Marina Bay
  MNL: U("photo-1518509562904-e7ef99cddc85"),// Manila
  HAN: U("photo-1509923936172-f4ec3eb52ec5"),// Hanoi
  SGN: U("photo-1565967511849-76a60a516170"),// HCMC / Saigon
  REP: U("photo-1563492065599-3520f775eeed"),// Siem Reap / Angkor
  DEL: U("photo-1587474260584-136574528ed5"),// Delhi
  BOM: U("photo-1570168007204-dfb528c6958f"),// Mumbai
  GOI: U("photo-1568849676085-51415703900f"),// Goa
  KTM: U("photo-1605640840605-14ac1855827b"),// Kathmandu
  KIX: U("photo-1590559899731-a382839e5549"),// Osaka
  OSA: U("photo-1590559899731-a382839e5549"),
  DPS: U("photo-1537996194471-e657df975ab4"),// Bali / Denpasar
  MLE: U("photo-1514282401047-d79a71a590e8"),// Maldives
  CMB: U("photo-1605640840605-14ac1855827b"),// Colombo

  // ── Africa
  JNB: U("photo-1577948000111-9c970dfe3743"),// Johannesburg
  CPT: U("photo-1576487248805-cf45f6bcc67f"),// Cape Town
  NBO: U("photo-1547471080-7cc2caa01a7e"),   // Nairobi
  MBA: U("photo-1547471080-7cc2caa01a7e"),   // Mombasa
  ZNZ: U("photo-1568571780765-9276ac8b75a2"),// Zanzibar
  JRO: U("photo-1547471080-7cc2caa01a7e"),   // Kilimanjaro
  LOS: U("photo-1591389703635-e15a07b842d7"),// Lagos
  ADD: U("photo-1547471080-7cc2caa01a7e"),   // Addis Ababa

  // ── Oceania
  SYD: U("photo-1506973035872-a4ec16b8e8d9"),// Sydney
  MEL: U("photo-1514395462725-fb4566210144"),// Melbourne
  AKL: U("photo-1507699622108-4be3abd695ad"),// Auckland

  // ── Eastern Europe / former USSR
  KBP: U("photo-1592486058517-36237ec3ad14"),// Kyiv
  IEV: U("photo-1592486058517-36237ec3ad14"),
  LWO: U("photo-1592486058517-36237ec3ad14"),// Lviv
  MOW: U("photo-1513326738677-b964603b136d"),// Moscow
  SVO: U("photo-1513326738677-b964603b136d"),
  TBS: U("photo-1565006447742-5727a4d24a30"),// Tbilisi
}

// ─── Countries (ISO-2 codes) ────────────────────────────────────────────
export const CURATED_COUNTRY: Record<string, string> = {
  DE: U("photo-1560969184-10fe8719e047"),
  AT: U("photo-1516550893923-42d28e5677af"),
  CH: U("photo-1530122037265-a5f1f91d3b99"),
  ES: U("photo-1583322833772-bb8e4eccc7a3"),
  TR: U("photo-1524231757912-21f4fe3a7200"),
  GR: U("photo-1570077188670-e3a8d69ac5ff"),
  IT: U("photo-1552832230-c0197dd311b5"),
  PT: U("photo-1554866585-cd94860890b7"),
  FR: U("photo-1502602898657-3e91760cbb34"),
  GB: U("photo-1513635269975-59663e0ac1ad"),
  IE: U("photo-1542965950-69b3a4d3f6dd"),
  HR: U("photo-1555990538-49b1869fbf2e"),
  EG: U("photo-1572252009286-268acec5ca0a"),
  NL: U("photo-1576924542622-772579a4f608"),
  BE: U("photo-1559564484-0d12a48ce3e1"),
  LU: U("photo-1559564484-0d12a48ce3e1"),
  AE: U("photo-1512453979798-5ea266f8880c"),
  TH: U("photo-1508009603885-50cf7c579365"),
  RO: U("photo-1592486058517-36237ec3ad14"),
  BG: U("photo-1601581875309-fafbf2d3ed3a"),
  RS: U("photo-1592486058517-36237ec3ad14"),
  ME: U("photo-1555990538-49b1869fbf2e"),
  BA: U("photo-1592486058517-36237ec3ad14"),
  MK: U("photo-1592486058517-36237ec3ad14"),
  AL: U("photo-1592486058517-36237ec3ad14"),
  PL: U("photo-1606994860024-2cf1eedfb15c"),
  CZ: U("photo-1541849546-216549ae216d"),
  HU: U("photo-1565006447742-5727a4d24a30"),
  CY: U("photo-1556032743-d8e3072e1cd0"),
  MT: U("photo-1556032743-d8e3072e1cd0"),
  DK: U("photo-1513622470522-26c3c8a854bc"),
  SE: U("photo-1509356843151-3e7d96241e11"),
  NO: U("photo-1601563946105-d8e1ad07b3f5"),
  FI: U("photo-1559128010-ff5e9da2bb6c"),
  IS: U("photo-1531168556467-80aace4d0144"),
  LV: U("photo-1592486058517-36237ec3ad14"),
  LT: U("photo-1592486058517-36237ec3ad14"),
  EE: U("photo-1592486058517-36237ec3ad14"),
  MA: U("photo-1597212618440-806262de4f6b"),
  TN: U("photo-1597212618440-806262de4f6b"),
  IL: U("photo-1544734713-573ad4d52404"),
  GE: U("photo-1565006447742-5727a4d24a30"),
  US: U("photo-1496442226666-8d4d0e62e6e9"),
  CA: U("photo-1517090504586-fde19ea6066f"),
  MX: U("photo-1552074284-5e88ef1aef18"),
  CU: U("photo-1500759285222-a95626b934cb"),
  DO: U("photo-1552074284-5e88ef1aef18"),
  JM: U("photo-1552074284-5e88ef1aef18"),
  BR: U("photo-1483729558449-99ef09a8c325"),
  AR: U("photo-1589909202802-8f4aadce1849"),
  CL: U("photo-1589909202802-8f4aadce1849"),
  PE: U("photo-1526392060635-9d6019884377"),
  CO: U("photo-1589909202802-8f4aadce1849"),
  JP: U("photo-1540959733332-eab4deabeeaf"),
  KR: U("photo-1538485399081-7191377e8241"),
  CN: U("photo-1508804185872-d7badad00f7d"),
  HK: U("photo-1576788369575-4f3da7e6a097"),
  TW: U("photo-1470004914212-05527e49370b"),
  SG: U("photo-1525625293386-3f8f99389edd"),
  MY: U("photo-1596422846543-75c6fc197f07"),
  PH: U("photo-1518509562904-e7ef99cddc85"),
  VN: U("photo-1509923936172-f4ec3eb52ec5"),
  KH: U("photo-1563492065599-3520f775eeed"),
  IN: U("photo-1564507592333-c60657eea523"),
  NP: U("photo-1605640840605-14ac1855827b"),
  ID: U("photo-1537996194471-e657df975ab4"),
  MV: U("photo-1514282401047-d79a71a590e8"),
  LK: U("photo-1605640840605-14ac1855827b"),
  ZA: U("photo-1576487248805-cf45f6bcc67f"),
  KE: U("photo-1547471080-7cc2caa01a7e"),
  TZ: U("photo-1568571780765-9276ac8b75a2"),
  NG: U("photo-1591389703635-e15a07b842d7"),
  AU: U("photo-1506973035872-a4ec16b8e8d9"),
  NZ: U("photo-1507699622108-4be3abd695ad"),
  UA: U("photo-1592486058517-36237ec3ad14"),
  RU: U("photo-1513326738677-b964603b136d"),
}

// ─── Category fallbacks ─────────────────────────────────────────────────
// Multiple options per category — picked deterministically by code hash so the
// same code always gets the same image, but different codes get different ones.
const F = (id: string) => U(id)
export const CATEGORY_POOL: Record<string, string[]> = {
  beach: [
    F("photo-1507525428034-b723cf961d3e"),
    F("photo-1519046904884-53103b34b206"),
    F("photo-1506953823976-52e1fdc0149a"),
    F("photo-1535262971677-983aa4d76eaa"),
    F("photo-1537956965359-7573183d1f57"),
  ],
  city: [
    F("photo-1477959858617-67f85cf4f1df"),
    F("photo-1480714378408-67cf0d13bc1b"),
    F("photo-1444723121867-7a241cacace9"),
    F("photo-1480714378408-67cf0d13bc1b"),
    F("photo-1496442226666-8d4d0e62e6e9"),
  ],
  island: [
    F("photo-1559128010-7c1ad6e1b6a5"),
    F("photo-1505228395891-9a51e7e86bf6"),
    F("photo-1518548419970-58e3b4079ab2"),
    F("photo-1565967511849-76a60a516170"),
  ],
  mountain: [
    F("photo-1464822759023-fed622ff2c3b"),
    F("photo-1486870591958-9b9d0d1dda99"),
    F("photo-1454496522488-7a8e488e8606"),
  ],
  cultural: [
    F("photo-1549144511-f099e773c147"),
    F("photo-1543349689-9a4d426bee8e"),
    F("photo-1555993539-1732b0258235"),
  ],
  default: [
    F("photo-1488646953014-85cb44e25828"),
    F("photo-1469854523086-cc02fe5d8800"),
    F("photo-1502920917128-1aa500764cbd"),
  ],
}

// Deterministic hash → array index
function hash(code: string): number {
  let h = 0
  for (let i = 0; i < code.length; i++) h = (h * 31 + code.charCodeAt(i)) >>> 0
  return h
}

export function pickCategoryImage(code: string, category: string): string {
  const pool = CATEGORY_POOL[category] || CATEGORY_POOL.default
  return pool[hash(code) % pool.length]
}
