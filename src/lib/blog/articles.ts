export interface BlogArticle {
  slug: string
  title: string
  excerpt: string
  category: string
  readTime: string
  publishedAt: string
  image: string
  content: { type: "h2" | "h3" | "p" | "list" | "quote" | "cta"; text?: string; items?: string[]; href?: string }[]
}

export const ARTICLES: BlogArticle[] = [
  {
    slug: "guenstig-reisen",
    title: "So günstig wie noch nie reisen — 7 Tricks der Profis",
    excerpt: "Spare bis zu 60% auf deinem nächsten Flug mit diesen bewährten Insider-Tipps von Vielfliegern.",
    category: "Spartipps",
    readTime: "5 Min",
    publishedAt: "2026-04-09",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=600&fit=crop",
    content: [
      { type: "p", text: "Wer günstig reisen will, muss nicht auf Komfort verzichten. Mit den richtigen Tricks findest du Flüge, die andere Reisende übersehen — und das oft für die Hälfte des Normalpreises. Wir zeigen dir die 7 wichtigsten Profi-Strategien." },
      { type: "h2", text: "1. Flexibel bei Datum und Flughafen sein" },
      { type: "p", text: "Der größte Fehler beim Buchen: starre Daten. Wer einen Tag früher oder später fliegt, spart oft 30-50%. Bei Tripora24 kannst du die ‚Flexible Reisedaten‘ Funktion nutzen und siehst sofort die günstigsten Tage und Monate für deine Wunschstrecke." },
      { type: "list", items: [
        "Dienstag und Mittwoch sind die günstigsten Wochentage zum Fliegen",
        "Sonntags und Montags sind oft die teuersten Tage",
        "Nebensaison statt Hauptsaison kann bis zu 70% Ersparnis bringen",
        "Kleine Regional-Flughäfen wie Memmingen, Hahn oder Weeze sind oft günstiger als FRA oder MUC",
      ] },
      { type: "h2", text: "2. Frühzeitig buchen — aber nicht zu früh" },
      { type: "p", text: "Der Sweet Spot für Flugbuchungen liegt bei 6-8 Wochen vor Abflug für innerdeutsche und europäische Strecken. Für Langstreckenflüge solltest du 3-6 Monate vorher buchen. Wer zu früh oder zu spät bucht, zahlt drauf." },
      { type: "h2", text: "3. Inkognito-Modus nutzen — wirklich!" },
      { type: "p", text: "Es klingt wie ein Mythos, aber viele Buchungsseiten merken sich deine Suchen via Cookies und erhöhen die Preise bei wiederholten Aufrufen. Suche immer im privaten/inkognito Modus und lösche Cookies vor jeder neuen Suche." },
      { type: "h2", text: "4. Hidden City Ticketing" },
      { type: "p", text: "Manchmal ist ein Flug mit Zwischenstopp günstiger als ein Direktflug zur Zwischenstopp-Stadt selbst. Du kannst dann am Zwischenstopp einfach aussteigen. Achtung: Funktioniert nur ohne Aufgabegepäck und nur einmal — Airlines mögen das nicht." },
      { type: "quote", text: "Mit Tripora24 finde ich Flüge, die ich auf anderen Seiten nie gesehen hätte. Letztes Jahr sind wir für 89€ nach Mallorca geflogen — Hin und Rück." },
      { type: "h2", text: "5. Newsletter und Preis-Alerts setzen" },
      { type: "p", text: "Setze dir für deine Wunschstrecke einen Preis-Alert. Sobald der Preis fällt, bekommst du eine Benachrichtigung. So verpasst du nie einen Schnapper. Bei Tripora24 ist das kostenlos und dauert nur 30 Sekunden." },
      { type: "h2", text: "6. Pakete vergleichen" },
      { type: "p", text: "Manchmal sind Pauschalreisen (Flug + Hotel) günstiger als die Einzelbuchung. Vor allem in der Hauptsaison oder bei beliebten Zielen wie Mallorca, Antalya oder den Kanaren. Vergleiche immer beide Optionen." },
      { type: "h2", text: "7. Multi-Anbieter Vergleich" },
      { type: "p", text: "Vertraue nie nur einer Plattform. Kiwi.com, Skyscanner, Expedia, Booking.com und kleinere OTAs haben oft unterschiedliche Preise für denselben Flug. Tripora24 vergleicht automatisch über 6 Anbieter pro Suche." },
      { type: "cta", text: "Jetzt günstige Flüge entdecken", href: "/fluege?from=DE" },
    ],
  },
  {
    slug: "reise-hacks-2026",
    title: "Die 10 besten Reise-Hacks für 2026",
    excerpt: "Von smarter Packliste bis Visa-Tricks — diese 10 Hacks machen deine nächste Reise stressfreier und günstiger.",
    category: "Reise-Tipps",
    readTime: "7 Min",
    publishedAt: "2026-04-08",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&h=600&fit=crop",
    content: [
      { type: "p", text: "Das Reisejahr 2026 wird wild — neue Flugrouten, geänderte Visa-Regeln und steigende Preise. Wer schlau plant, spart Zeit, Geld und Nerven. Hier sind die 10 wichtigsten Hacks für entspanntes Reisen." },
      { type: "h2", text: "1. Handgepäck statt Aufgabegepäck" },
      { type: "p", text: "Nichts spart mehr Geld und Zeit als nur mit Handgepäck zu reisen. Du sparst Gepäckgebühren (oft 30-80€), wartest nicht am Gepäckband und verlierst keine Koffer. Mit dem richtigen System passt eine Woche Urlaub locker in einen 40x20x25cm Trolley." },
      { type: "h2", text: "2. Universaladapter bereits zuhause kaufen" },
      { type: "p", text: "Am Flughafen kostet ein Universaladapter oft 30-40€. Online bekommst du ihn für unter 15€. Pack ihn IMMER ein, auch wenn du ‚nur‘ in der EU bleibst." },
      { type: "h2", text: "3. eSIM statt teure Roaming-Gebühren" },
      { type: "p", text: "Mit Apps wie Airalo oder Holafly bekommst du eine lokale eSIM in jedem Land — oft für unter 10€ pro Woche. Schluss mit horrenden Roaming-Rechnungen oder Daten-Sparen." },
      { type: "h2", text: "4. Google Maps offline nutzen" },
      { type: "p", text: "Lade dir die Karten deines Reiseziels VOR der Reise im WLAN herunter. Du kannst dann offline navigieren — auch ohne Datenverbindung." },
      { type: "h2", text: "5. Kreditkarte ohne Auslandsgebühren" },
      { type: "p", text: "Eine kostenlose Kreditkarte ohne Auslandsgebühren spart dir 1-3% bei jeder Kartenzahlung. Über das Jahr summiert sich das schnell auf hunderte Euro." },
      { type: "list", items: [
        "Hanseatic GenialCard — keine Gebühren weltweit",
        "DKB Visa Debit — perfekt für Bargeld-Abheben",
        "Revolut — günstige Wechselkurse + Mehrwährungs-Konto",
      ] },
      { type: "h2", text: "6. Reisepass-Foto auf dem Handy" },
      { type: "p", text: "Falls dein Pass verloren geht, brauchst du ein Foto davon für die Botschaft. Mache vor jeder Reise ein Foto deines Passes (Datenseite) und speichere es in der Cloud." },
      { type: "h2", text: "7. Notfall-Kontakte am Sperrbildschirm" },
      { type: "p", text: "Trage in iOS oder Android einen Notfall-Kontakt ein, der vom Sperrbildschirm aus angerufen werden kann. Im Notfall kann dir das Leben retten." },
      { type: "h2", text: "8. Auslandskrankenversicherung" },
      { type: "p", text: "Eine Jahresreise-Krankenversicherung kostet ca. 15€ und deckt unbegrenzte Reisen bis zu 56 Tagen ab. Im Krankheitsfall zahlst du sonst tausende Euro." },
      { type: "h2", text: "9. Pack-Würfel verwenden" },
      { type: "p", text: "Pack-Würfel (Packing Cubes) revolutionieren das Kofferpacken. Du sparst 30% Platz und findest alles sofort wieder. Ein Set bekommst du für unter 20€." },
      { type: "h2", text: "10. Reise-Apps installieren" },
      { type: "p", text: "Die wichtigsten Apps für jede Reise: Tripora24 (Flüge), Booking.com (Hotels), Maps.me (Offline Karten), DeepL (Übersetzer), XE Currency (Wechselkurse), Airalo (eSIM)." },
      { type: "cta", text: "Plane jetzt deine nächste Reise", href: "/fluege?from=DE&to=EVERYWHERE" },
    ],
  },
  {
    slug: "geheimtipps-europa",
    title: "Geheimtipps in Europa — Diese 8 Orte muss man besucht haben",
    excerpt: "Weg von Paris und Rom: Die schönsten unentdeckten Reiseziele Europas, die noch nicht überlaufen sind.",
    category: "Reiseziele",
    readTime: "6 Min",
    publishedAt: "2026-04-07",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&h=600&fit=crop",
    content: [
      { type: "p", text: "Du hast Paris, Rom und Barcelona schon zigmal gesehen? Dann wird es Zeit für etwas Neues. Diese 8 Orte in Europa sind echte Geheimtipps — wunderschön, günstig und (noch) nicht überlaufen." },
      { type: "h2", text: "1. Tirana, Albanien" },
      { type: "p", text: "Albaniens Hauptstadt erlebt einen kreativen Boom. Bunte Häuserfassaden, eine lebendige Café-Kultur und eine entspannte Atmosphäre machen Tirana zur europäischen Trend-Metropole. Bonus: Extrem günstig — ein gutes Mittagessen kostet 5€." },
      { type: "h2", text: "2. Lecce, Italien" },
      { type: "p", text: "Das ‚Florenz des Südens‘ in Apulien ist barocke Architektur pur, aber ohne Touristenmassen. Die Altstadt aus weißem Stein, hervorragendes Essen und Strände in 30 Minuten Entfernung machen Lecce zum perfekten Reiseziel." },
      { type: "h2", text: "3. Porto, Portugal" },
      { type: "p", text: "Während alle nach Lissabon strömen, ist Porto noch der Geheimtipp. Bunte Häuser am Douro-Fluss, weltberühmter Portwein und einige der besten Restaurants Europas — und das zu echten Preisen." },
      { type: "h2", text: "4. Ljubljana, Slowenien" },
      { type: "p", text: "Sloweniens Hauptstadt ist klein, charmant und überraschend grün. Mit der Burg über der Altstadt, Drachen-Brücken und einer entspannten Atmosphäre fühlt sich Ljubljana wie ein Märchen an." },
      { type: "h2", text: "5. Riga, Lettland" },
      { type: "p", text: "Die größte Stadt im Baltikum hat eine UNESCO-geschützte Altstadt mit jugendstilreicher Architektur. Im Winter magisch verschneit, im Sommer eine lebendige Hafenstadt mit viel Geschichte." },
      { type: "h2", text: "6. Sevilla, Spanien" },
      { type: "p", text: "Andalusien pur: Flamenco, Tapas, Orangenbäume in den Straßen und der majestätische Alcázar. Sevilla ist heißer als Barcelona oder Madrid, aber genauso günstig — und viel authentischer." },
      { type: "h2", text: "7. Vilnius, Litauen" },
      { type: "p", text: "Vilnius hat eine der größten erhaltenen Altstädte Europas — und kaum jemand kennt sie. Barocke Kirchen, gemütliche Cafés und der ‚Republik Užupis‘ (eine selbsterklärte Künstler-Republik mitten in der Stadt) machen Vilnius einzigartig." },
      { type: "h2", text: "8. Bordeaux, Frankreich" },
      { type: "p", text: "Wein, Architektur, gutes Essen und das Atlantik-Flair: Bordeaux ist Frankreichs Geheimwaffe. Die Altstadt ist UNESCO-geschützt, der Place de la Bourse spiegelt sich in einem riesigen Wasserspiegel — Insta-Gold." },
      { type: "h2", text: "Wann hinfliegen?" },
      { type: "p", text: "Die beste Reisezeit für die meisten dieser Ziele ist Mai, Juni oder September. Du vermeidest die Hochsaison, die Preise sind moderat und das Wetter ist angenehm. Tripora24 zeigt dir die günstigsten Monate auf einen Blick." },
      { type: "cta", text: "Diese Geheimtipps jetzt entdecken", href: "/fluege?from=DE&to=EVERYWHERE" },
    ],
  },
]

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return ARTICLES.find((a) => a.slug === slug)
}
