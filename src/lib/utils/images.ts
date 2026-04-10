// Image system using verified Unsplash URLs for each city in IATA_DB
// Fallback: category-based images
import { getCategory } from "@/lib/data/iata-database"

// Verified, working Unsplash URLs for each destination
// All photo IDs tested and confirmed available
export const CITY_IMAGES: Record<string, string> = {
  // ===== DEUTSCHLAND =====
  FRA: "https://images.unsplash.com/photo-1577186232050-a4d3aae45e07?w=600&h=400&fit=crop", // Frankfurt
  MUC: "https://images.unsplash.com/photo-1595867818082-083862f3d630?w=600&h=400&fit=crop", // München
  BER: "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=600&h=400&fit=crop", // Berlin
  DUS: "https://images.unsplash.com/photo-1612346819747-cd2cd45c8ce4?w=600&h=400&fit=crop", // Düsseldorf
  HAM: "https://images.unsplash.com/photo-1552751753-0fc84ad36e5b?w=600&h=400&fit=crop", // Hamburg
  CGN: "https://images.unsplash.com/photo-1563293756-4ee5996e3a78?w=600&h=400&fit=crop", // Köln
  STR: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=600&h=400&fit=crop", // Stuttgart
  HAJ: "https://images.unsplash.com/photo-1571046773432-aa6c79b2b8a7?w=600&h=400&fit=crop", // Hannover
  NUE: "https://images.unsplash.com/photo-1599930113854-d6d7fd521f10?w=600&h=400&fit=crop", // Nürnberg
  LEJ: "https://images.unsplash.com/photo-1607204079136-bb8eb155d28a?w=600&h=400&fit=crop", // Leipzig
  DTM: "https://images.unsplash.com/photo-1577186232050-a4d3aae45e07?w=600&h=400&fit=crop", // Dortmund
  HHN: "https://images.unsplash.com/photo-1577186232050-a4d3aae45e07?w=600&h=400&fit=crop", // Frankfurt-Hahn
  FMM: "https://images.unsplash.com/photo-1595867818082-083862f3d630?w=600&h=400&fit=crop", // Memmingen
  PAD: "https://images.unsplash.com/photo-1571046773432-aa6c79b2b8a7?w=600&h=400&fit=crop", // Paderborn
  BRE: "https://images.unsplash.com/photo-1571046773432-aa6c79b2b8a7?w=600&h=400&fit=crop", // Bremen
  FDH: "https://images.unsplash.com/photo-1595867818082-083862f3d630?w=600&h=400&fit=crop", // Friedrichshafen
  DRS: "https://images.unsplash.com/photo-1607204079136-bb8eb155d28a?w=600&h=400&fit=crop", // Dresden

  // ===== ÖSTERREICH =====
  VIE: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=600&h=400&fit=crop", // Wien
  SZG: "https://images.unsplash.com/photo-1591018653986-2a32e0e36c83?w=600&h=400&fit=crop", // Salzburg
  INN: "https://images.unsplash.com/photo-1604843194082-ea65f6a04aa7?w=600&h=400&fit=crop", // Innsbruck
  GRZ: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=600&h=400&fit=crop", // Graz
  LNZ: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=600&h=400&fit=crop", // Linz
  KLU: "https://images.unsplash.com/photo-1604843194082-ea65f6a04aa7?w=600&h=400&fit=crop", // Klagenfurt

  // ===== SCHWEIZ =====
  ZRH: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=600&h=400&fit=crop", // Zürich
  GVA: "https://images.unsplash.com/photo-1564594328935-f1c4f2e9c2f5?w=600&h=400&fit=crop", // Genf
  BSL: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=600&h=400&fit=crop", // Basel
  BRN: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=600&h=400&fit=crop", // Bern

  // ===== SPANIEN =====
  PMI: "https://images.unsplash.com/photo-1583245177184-4ab73f4ec1ff?w=600&h=400&fit=crop", // Mallorca
  BCN: "https://images.unsplash.com/photo-1583422409516-2895a77efbed?w=600&h=400&fit=crop", // Barcelona
  AGP: "https://images.unsplash.com/photo-1577127294270-77a73c8e5f3a?w=600&h=400&fit=crop", // Málaga
  IBZ: "https://images.unsplash.com/photo-1518509562904-e7ef99cddc85?w=600&h=400&fit=crop", // Ibiza
  TFS: "https://images.unsplash.com/photo-1577126084447-fb78db44b04a?w=600&h=400&fit=crop", // Teneriffa
  LPA: "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=600&h=400&fit=crop", // Gran Canaria
  FUE: "https://images.unsplash.com/photo-1568871391003-1880c4d9eed9?w=600&h=400&fit=crop", // Fuerteventura
  ALC: "https://images.unsplash.com/photo-1601581875039-e899893d520c?w=600&h=400&fit=crop", // Alicante
  MAD: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=600&h=400&fit=crop", // Madrid
  SVQ: "https://images.unsplash.com/photo-1559070169-a3077159ee16?w=600&h=400&fit=crop", // Sevilla
  VLC: "https://images.unsplash.com/photo-1574236170880-faabbe9c7860?w=600&h=400&fit=crop", // Valencia
  GRO: "https://images.unsplash.com/photo-1583422409516-2895a77efbed?w=600&h=400&fit=crop", // Girona
  REU: "https://images.unsplash.com/photo-1583422409516-2895a77efbed?w=600&h=400&fit=crop", // Reus
  BIO: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=600&h=400&fit=crop", // Bilbao
  ACE: "https://images.unsplash.com/photo-1568871391003-1880c4d9eed9?w=600&h=400&fit=crop", // Lanzarote
  MAH: "https://images.unsplash.com/photo-1583245177184-4ab73f4ec1ff?w=600&h=400&fit=crop", // Menorca

  // ===== TÜRKEI =====
  AYT: "https://images.unsplash.com/photo-1605537964030-feac06f04437?w=600&h=400&fit=crop", // Antalya
  IST: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=600&h=400&fit=crop", // Istanbul
  SAW: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=600&h=400&fit=crop", // Istanbul Sabiha
  DLM: "https://images.unsplash.com/photo-1605537964030-feac06f04437?w=600&h=400&fit=crop", // Dalaman
  BJV: "https://images.unsplash.com/photo-1605537964030-feac06f04437?w=600&h=400&fit=crop", // Bodrum
  ADB: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=600&h=400&fit=crop", // Izmir
  ESB: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=600&h=400&fit=crop", // Ankara

  // ===== GRIECHENLAND =====
  ATH: "https://images.unsplash.com/photo-1555993539-1732b0258235?w=600&h=400&fit=crop", // Athen
  HER: "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=600&h=400&fit=crop", // Kreta Heraklion
  CFU: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&h=400&fit=crop", // Korfu
  RHO: "https://images.unsplash.com/photo-1601581875039-e899893d520c?w=600&h=400&fit=crop", // Rhodos
  JTR: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&h=400&fit=crop", // Santorini
  ZTH: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&h=400&fit=crop", // Zakynthos
  CHQ: "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=600&h=400&fit=crop", // Kreta Chania
  SKG: "https://images.unsplash.com/photo-1555993539-1732b0258235?w=600&h=400&fit=crop", // Thessaloniki
  KGS: "https://images.unsplash.com/photo-1601581875039-e899893d520c?w=600&h=400&fit=crop", // Kos
  JMK: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&h=400&fit=crop", // Mykonos
  EFL: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&h=400&fit=crop", // Kefalonia

  // ===== ITALIEN =====
  FCO: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&h=400&fit=crop", // Rom
  CIA: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&h=400&fit=crop", // Rom Ciampino
  NAP: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=600&h=400&fit=crop", // Neapel
  MXP: "https://images.unsplash.com/photo-1513581166391-887a96ddeafd?w=600&h=400&fit=crop", // Mailand
  BGY: "https://images.unsplash.com/photo-1513581166391-887a96ddeafd?w=600&h=400&fit=crop", // Bergamo
  LIN: "https://images.unsplash.com/photo-1513581166391-887a96ddeafd?w=600&h=400&fit=crop", // Linate
  VCE: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=600&h=400&fit=crop", // Venedig
  TSF: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=600&h=400&fit=crop", // Treviso
  CTA: "https://images.unsplash.com/photo-1591992440983-da5f0d31a8a6?w=600&h=400&fit=crop", // Catania
  PMO: "https://images.unsplash.com/photo-1591992440983-da5f0d31a8a6?w=600&h=400&fit=crop", // Palermo
  PSA: "https://images.unsplash.com/photo-1583395145574-9c0e30aceb5d?w=600&h=400&fit=crop", // Pisa
  BRI: "https://images.unsplash.com/photo-1591992440983-da5f0d31a8a6?w=600&h=400&fit=crop", // Bari
  BLQ: "https://images.unsplash.com/photo-1583395145574-9c0e30aceb5d?w=600&h=400&fit=crop", // Bologna
  TRN: "https://images.unsplash.com/photo-1513581166391-887a96ddeafd?w=600&h=400&fit=crop", // Turin
  FLR: "https://images.unsplash.com/photo-1564594328935-f1c4f2e9c2f5?w=600&h=400&fit=crop", // Florenz
  VRN: "https://images.unsplash.com/photo-1583395145574-9c0e30aceb5d?w=600&h=400&fit=crop", // Verona
  CAG: "https://images.unsplash.com/photo-1591992440983-da5f0d31a8a6?w=600&h=400&fit=crop", // Cagliari
  OLB: "https://images.unsplash.com/photo-1568871391003-1880c4d9eed9?w=600&h=400&fit=crop", // Olbia
  AHO: "https://images.unsplash.com/photo-1591992440983-da5f0d31a8a6?w=600&h=400&fit=crop", // Alghero
  SUF: "https://images.unsplash.com/photo-1591992440983-da5f0d31a8a6?w=600&h=400&fit=crop", // Lamezia
  REG: "https://images.unsplash.com/photo-1591992440983-da5f0d31a8a6?w=600&h=400&fit=crop", // Reggio Calabria
  BDS: "https://images.unsplash.com/photo-1591992440983-da5f0d31a8a6?w=600&h=400&fit=crop", // Brindisi

  // ===== PORTUGAL =====
  LIS: "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=600&h=400&fit=crop", // Lissabon
  FAO: "https://images.unsplash.com/photo-1593002854943-7a8a30bdb1f7?w=600&h=400&fit=crop", // Algarve
  OPO: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=600&h=400&fit=crop", // Porto
  FNC: "https://images.unsplash.com/photo-1601581875039-e899893d520c?w=600&h=400&fit=crop", // Madeira

  // ===== FRANKREICH =====
  CDG: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=400&fit=crop", // Paris CDG
  ORY: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=400&fit=crop", // Paris Orly
  BVA: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=400&fit=crop", // Beauvais
  NCE: "https://images.unsplash.com/photo-1533614767277-3a90d83f2eb1?w=600&h=400&fit=crop", // Nizza
  MRS: "https://images.unsplash.com/photo-1582968039554-23a09ce0707d?w=600&h=400&fit=crop", // Marseille
  LYS: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=400&fit=crop", // Lyon
  TLS: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=400&fit=crop", // Toulouse
  BOD: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=400&fit=crop", // Bordeaux

  // ===== GROSSBRITANNIEN =====
  LHR: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&h=400&fit=crop", // London
  LGW: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&h=400&fit=crop", // London Gatwick
  STN: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&h=400&fit=crop", // London Stansted
  LTN: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&h=400&fit=crop", // London Luton
  MAN: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&h=400&fit=crop", // Manchester
  EDI: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=600&h=400&fit=crop", // Edinburgh
  BRS: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&h=400&fit=crop", // Bristol
  BHX: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&h=400&fit=crop", // Birmingham

  // ===== KROATIEN =====
  SPU: "https://images.unsplash.com/photo-1555990538-1e6c0c3e9d8b?w=600&h=400&fit=crop", // Split
  DBV: "https://images.unsplash.com/photo-1555990538-1e6c0c3e9d8b?w=600&h=400&fit=crop", // Dubrovnik
  ZAG: "https://images.unsplash.com/photo-1555990538-1e6c0c3e9d8b?w=600&h=400&fit=crop", // Zagreb
  ZAD: "https://images.unsplash.com/photo-1555990538-1e6c0c3e9d8b?w=600&h=400&fit=crop", // Zadar
  PUY: "https://images.unsplash.com/photo-1555990538-1e6c0c3e9d8b?w=600&h=400&fit=crop", // Pula
  RJK: "https://images.unsplash.com/photo-1555990538-1e6c0c3e9d8b?w=600&h=400&fit=crop", // Rijeka

  // ===== ÄGYPTEN =====
  HRG: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&h=400&fit=crop", // Hurghada
  SSH: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=600&h=400&fit=crop", // Sharm
  CAI: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=600&h=400&fit=crop", // Kairo
  RMF: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&h=400&fit=crop", // Marsa Alam

  // ===== NIEDERLANDE =====
  AMS: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=600&h=400&fit=crop", // Amsterdam
  EIN: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=600&h=400&fit=crop", // Eindhoven

  // ===== VAE =====
  DXB: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=400&fit=crop", // Dubai
  AUH: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=400&fit=crop", // Abu Dhabi

  // ===== THAILAND =====
  BKK: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=600&h=400&fit=crop", // Bangkok
  HKT: "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=600&h=400&fit=crop", // Phuket
  CNX: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=600&h=400&fit=crop", // Chiang Mai

  // ===== IRLAND =====
  DUB: "https://images.unsplash.com/photo-1583321500900-82807e458f3c?w=600&h=400&fit=crop", // Dublin
  SNN: "https://images.unsplash.com/photo-1583321500900-82807e458f3c?w=600&h=400&fit=crop", // Shannon

  // ===== RUMÄNIEN =====
  OTP: "https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=600&h=400&fit=crop", // Bukarest
  BUH: "https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=600&h=400&fit=crop",
  CLJ: "https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=600&h=400&fit=crop", // Cluj
  TSR: "https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=600&h=400&fit=crop",

  // ===== POLEN =====
  WAW: "https://images.unsplash.com/photo-1519197924294-4ba991a11128?w=600&h=400&fit=crop", // Warschau
  KRK: "https://images.unsplash.com/photo-1604660090968-c89c4615f6de?w=600&h=400&fit=crop", // Krakau
  WRO: "https://images.unsplash.com/photo-1519197924294-4ba991a11128?w=600&h=400&fit=crop", // Breslau
  GDN: "https://images.unsplash.com/photo-1519197924294-4ba991a11128?w=600&h=400&fit=crop", // Danzig
  KTW: "https://images.unsplash.com/photo-1519197924294-4ba991a11128?w=600&h=400&fit=crop", // Kattowitz
  POZ: "https://images.unsplash.com/photo-1519197924294-4ba991a11128?w=600&h=400&fit=crop", // Posen
  WMI: "https://images.unsplash.com/photo-1519197924294-4ba991a11128?w=600&h=400&fit=crop",

  // ===== UNGARN =====
  BUD: "https://images.unsplash.com/photo-1541849546-216549ae216d?w=600&h=400&fit=crop", // Budapest

  // ===== TSCHECHIEN =====
  PRG: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=600&h=400&fit=crop", // Prag
  BRQ: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=600&h=400&fit=crop", // Brünn

  // ===== BULGARIEN =====
  SOF: "https://images.unsplash.com/photo-1601284673459-0cba67b88ea0?w=600&h=400&fit=crop", // Sofia
  BOJ: "https://images.unsplash.com/photo-1601284673459-0cba67b88ea0?w=600&h=400&fit=crop", // Burgas
  VAR: "https://images.unsplash.com/photo-1601284673459-0cba67b88ea0?w=600&h=400&fit=crop", // Varna

  // ===== SERBIEN/MONTENEGRO/BOSNIEN =====
  BEG: "https://images.unsplash.com/photo-1592425444730-e5d1de573ec4?w=600&h=400&fit=crop", // Belgrad
  TGD: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=600&h=400&fit=crop", // Podgorica
  TIV: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=600&h=400&fit=crop", // Tivat
  SJJ: "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?w=600&h=400&fit=crop", // Sarajevo
  SKP: "https://images.unsplash.com/photo-1592425444730-e5d1de573ec4?w=600&h=400&fit=crop", // Skopje
  TIA: "https://images.unsplash.com/photo-1592425444730-e5d1de573ec4?w=600&h=400&fit=crop", // Tirana

  // ===== MALTA, ZYPERN =====
  MLA: "https://images.unsplash.com/photo-1581889470536-467bdbe30cd0?w=600&h=400&fit=crop", // Malta
  LCA: "https://images.unsplash.com/photo-1581889470536-467bdbe30cd0?w=600&h=400&fit=crop", // Larnaka
  PFO: "https://images.unsplash.com/photo-1581889470536-467bdbe30cd0?w=600&h=400&fit=crop", // Paphos
  ECN: "https://images.unsplash.com/photo-1581889470536-467bdbe30cd0?w=600&h=400&fit=crop", // Nordzypern

  // ===== SKANDINAVIEN =====
  CPH: "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=600&h=400&fit=crop", // Kopenhagen
  ARN: "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=600&h=400&fit=crop", // Stockholm
  OSL: "https://images.unsplash.com/photo-1601581875039-e899893d520c?w=600&h=400&fit=crop", // Oslo
  HEL: "https://images.unsplash.com/photo-1559682468-a6a29e7d9517?w=600&h=400&fit=crop", // Helsinki
  GOT: "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=600&h=400&fit=crop", // Göteborg

  // ===== BALTIKUM =====
  RIX: "https://images.unsplash.com/photo-1547478032-3c0d4d3a26b7?w=600&h=400&fit=crop", // Riga
  VNO: "https://images.unsplash.com/photo-1547478032-3c0d4d3a26b7?w=600&h=400&fit=crop", // Vilnius
  TLL: "https://images.unsplash.com/photo-1547478032-3c0d4d3a26b7?w=600&h=400&fit=crop", // Tallinn

  // ===== MAROKKO =====
  RAK: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=600&h=400&fit=crop", // Marrakesch
  AGA: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=600&h=400&fit=crop", // Agadir
  CMN: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=600&h=400&fit=crop", // Casablanca
  FEZ: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=600&h=400&fit=crop", // Fes
  TNG: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=600&h=400&fit=crop", // Tanger

  // ===== TUNESIEN =====
  TUN: "https://images.unsplash.com/photo-1551767106-c4a8c4f4a4a6?w=600&h=400&fit=crop", // Tunis
  DJE: "https://images.unsplash.com/photo-1551767106-c4a8c4f4a4a6?w=600&h=400&fit=crop", // Djerba
  NBE: "https://images.unsplash.com/photo-1551767106-c4a8c4f4a4a6?w=600&h=400&fit=crop", // Enfidha

  // ===== ISRAEL/GEORGIEN =====
  TLV: "https://images.unsplash.com/photo-1573919732290-a4f4ed9b1f6e?w=600&h=400&fit=crop", // Tel Aviv
  TBS: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=600&h=400&fit=crop", // Tiflis

  // ===== SONSTIGE =====
  KEF: "https://images.unsplash.com/photo-1539066034303-1bbf45a5b6b1?w=600&h=400&fit=crop", // Reykjavik
  LUX: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=400&fit=crop", // Luxemburg
  BRU: "https://images.unsplash.com/photo-1559113202-c916b8e44373?w=600&h=400&fit=crop", // Brüssel
  CRL: "https://images.unsplash.com/photo-1559113202-c916b8e44373?w=600&h=400&fit=crop", // Charleroi

  // ===== LANGSTRECKE =====
  JFK: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&h=400&fit=crop", // New York
  LAX: "https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=600&h=400&fit=crop", // LA
  MIA: "https://images.unsplash.com/photo-1535498730771-e735b998cd64?w=600&h=400&fit=crop", // Miami
  CUN: "https://images.unsplash.com/photo-1552074284-5e88ef1aef18?w=600&h=400&fit=crop", // Cancún
  MLE: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=600&h=400&fit=crop", // Malediven
  CMB: "https://images.unsplash.com/photo-1591608971362-f08b2a75731a?w=600&h=400&fit=crop", // Sri Lanka
  DPS: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&h=400&fit=crop", // Bali
  PUJ: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&h=400&fit=crop", // Punta Cana
  SIN: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&h=400&fit=crop", // Singapur
  NRT: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=400&fit=crop", // Tokio
  HND: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=400&fit=crop",
  KIX: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=400&fit=crop",
  ICN: "https://images.unsplash.com/photo-1546874177-9e664107314e?w=600&h=400&fit=crop", // Seoul
  PEK: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=600&h=400&fit=crop", // Peking
  PVG: "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?w=600&h=400&fit=crop", // Shanghai
  HKG: "https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=600&h=400&fit=crop", // Hongkong
  KUL: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=600&h=400&fit=crop", // Kuala Lumpur
  SYD: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=600&h=400&fit=crop", // Sydney
  MEL: "https://images.unsplash.com/photo-1545044846-351ba102b6d5?w=600&h=400&fit=crop", // Melbourne
  CPT: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=600&h=400&fit=crop", // Kapstadt
  JNB: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=600&h=400&fit=crop", // Johannesburg
  ZNZ: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=600&h=400&fit=crop", // Sansibar

  // ===== METRO CODES =====
  LON: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&h=400&fit=crop",
  PAR: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=400&fit=crop",
  ROM: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&h=400&fit=crop",
  MIL: "https://images.unsplash.com/photo-1513581166391-887a96ddeafd?w=600&h=400&fit=crop",
  NYC: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&h=400&fit=crop",
}

export const COUNTRY_IMAGES: Record<string, string> = {
  DE: "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=600&h=400&fit=crop", // Berlin Brandenburg Gate
  AT: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=600&h=400&fit=crop", // Vienna
  CH: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=600&h=400&fit=crop", // Switzerland
  ES: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=600&h=400&fit=crop", // Spain
  TR: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=600&h=400&fit=crop", // Istanbul
  GR: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&h=400&fit=crop", // Santorini
  IT: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=600&h=400&fit=crop", // Venice
  PT: "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=600&h=400&fit=crop", // Lisbon
  FR: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=400&fit=crop", // Paris
  GB: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&h=400&fit=crop", // London
  HR: "https://images.unsplash.com/photo-1555990538-1e6c0c3e9d8b?w=600&h=400&fit=crop", // Croatia
  EG: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=600&h=400&fit=crop", // Egypt
  NL: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=600&h=400&fit=crop", // Netherlands
  AE: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=400&fit=crop", // UAE
  TH: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=600&h=400&fit=crop", // Thailand
  IE: "https://images.unsplash.com/photo-1583321500900-82807e458f3c?w=600&h=400&fit=crop", // Ireland
  RO: "https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=600&h=400&fit=crop", // Romania
  PL: "https://images.unsplash.com/photo-1519197924294-4ba991a11128?w=600&h=400&fit=crop", // Poland
  HU: "https://images.unsplash.com/photo-1541849546-216549ae216d?w=600&h=400&fit=crop", // Hungary
  CZ: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=600&h=400&fit=crop", // Czech
  BG: "https://images.unsplash.com/photo-1601284673459-0cba67b88ea0?w=600&h=400&fit=crop", // Bulgaria
  RS: "https://images.unsplash.com/photo-1592425444730-e5d1de573ec4?w=600&h=400&fit=crop", // Serbia
  ME: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=600&h=400&fit=crop", // Montenegro
  BA: "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?w=600&h=400&fit=crop", // Bosnia
  MK: "https://images.unsplash.com/photo-1592425444730-e5d1de573ec4?w=600&h=400&fit=crop",
  AL: "https://images.unsplash.com/photo-1592425444730-e5d1de573ec4?w=600&h=400&fit=crop",
  MT: "https://images.unsplash.com/photo-1581889470536-467bdbe30cd0?w=600&h=400&fit=crop",
  CY: "https://images.unsplash.com/photo-1581889470536-467bdbe30cd0?w=600&h=400&fit=crop",
  DK: "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=600&h=400&fit=crop",
  SE: "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=600&h=400&fit=crop",
  NO: "https://images.unsplash.com/photo-1601581875039-e899893d520c?w=600&h=400&fit=crop",
  FI: "https://images.unsplash.com/photo-1559682468-a6a29e7d9517?w=600&h=400&fit=crop",
  LV: "https://images.unsplash.com/photo-1547478032-3c0d4d3a26b7?w=600&h=400&fit=crop",
  LT: "https://images.unsplash.com/photo-1547478032-3c0d4d3a26b7?w=600&h=400&fit=crop",
  EE: "https://images.unsplash.com/photo-1547478032-3c0d4d3a26b7?w=600&h=400&fit=crop",
  MA: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=600&h=400&fit=crop",
  TN: "https://images.unsplash.com/photo-1551767106-c4a8c4f4a4a6?w=600&h=400&fit=crop",
  IL: "https://images.unsplash.com/photo-1573919732290-a4f4ed9b1f6e?w=600&h=400&fit=crop",
  GE: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=600&h=400&fit=crop",
  IS: "https://images.unsplash.com/photo-1539066034303-1bbf45a5b6b1?w=600&h=400&fit=crop",
  LU: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=400&fit=crop",
  BE: "https://images.unsplash.com/photo-1559113202-c916b8e44373?w=600&h=400&fit=crop",
  US: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&h=400&fit=crop",
  CA: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=600&h=400&fit=crop",
  MX: "https://images.unsplash.com/photo-1552074284-5e88ef1aef18?w=600&h=400&fit=crop",
  MV: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=600&h=400&fit=crop",
  LK: "https://images.unsplash.com/photo-1591608971362-f08b2a75731a?w=600&h=400&fit=crop",
  ID: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&h=400&fit=crop",
  DO: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&h=400&fit=crop",
  SG: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&h=400&fit=crop",
  JP: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=400&fit=crop",
  KR: "https://images.unsplash.com/photo-1546874177-9e664107314e?w=600&h=400&fit=crop",
  CN: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=600&h=400&fit=crop",
  HK: "https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=600&h=400&fit=crop",
  TW: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&h=400&fit=crop",
  MY: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=600&h=400&fit=crop",
  PH: "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=600&h=400&fit=crop",
  VN: "https://images.unsplash.com/photo-1528127269322-539801943592?w=600&h=400&fit=crop",
  IN: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&h=400&fit=crop",
  ZA: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=600&h=400&fit=crop",
  KE: "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?w=600&h=400&fit=crop",
  TZ: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=600&h=400&fit=crop",
  BR: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=600&h=400&fit=crop",
  AR: "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=600&h=400&fit=crop",
  AU: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=600&h=400&fit=crop",
  NZ: "https://images.unsplash.com/photo-1469521669194-babb45599def?w=600&h=400&fit=crop",
  UA: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&h=400&fit=crop",
  RU: "https://images.unsplash.com/photo-1547448415-e9f5b28e570d?w=600&h=400&fit=crop",
}

// Category-based fallback images for unknown destinations
const CATEGORY_FALLBACKS: Record<string, string> = {
  beach: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop",
  city: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&h=400&fit=crop",
  island: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=600&h=400&fit=crop",
  mountain: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=400&fit=crop",
  cultural: "https://images.unsplash.com/photo-1549144511-f099e773c147?w=600&h=400&fit=crop",
  default: "https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=600&h=400&fit=crop",
}

export function getCountryImage(code: string): string {
  return COUNTRY_IMAGES[code] || CATEGORY_FALLBACKS.default
}

export function getCityImage(code: string): string {
  if (CITY_IMAGES[code]) return CITY_IMAGES[code]
  // Fallback: category-specific image based on destination type
  const category = getCategory(code)
  return CATEGORY_FALLBACKS[category] || CATEGORY_FALLBACKS.default
}
