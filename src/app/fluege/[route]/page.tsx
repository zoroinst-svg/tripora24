import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { getCity, getCountryCode, getCountryName } from "@/lib/data/iata-database"
import { getCityImage } from "@/lib/utils/images"
import { TOP_ROUTES, parseRouteSlug, routeSlug } from "@/lib/data/top-routes"
import { getRouteStats, monthLabel, formatDuration } from "@/lib/apis/route-stats"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { PlaneIcon, ArrowRightIcon, ClockIcon, CalendarIcon, GlobeIcon, CarIcon, ShieldIcon } from "@/components/ui/icons"
import { BreadcrumbJsonLd, FlightRouteJsonLd } from "@/components/seo/JsonLd"
import { buildGetYourGuideUrl, buildKiwiTaxiUrl, buildDiscoverCarsUrl, buildAirHelpUrl, buildKiwiUrl, buildAviasalesUrl } from "@/lib/apis/partners"

export const dynamicParams = false
export const revalidate = 86400

export async function generateStaticParams() {
  return TOP_ROUTES.map((r) => ({ route: routeSlug(r.from, r.to) }))
}

export async function generateMetadata({ params }: { params: Promise<{ route: string }> }): Promise<Metadata> {
  const { route } = await params
  const parsed = parseRouteSlug(route)
  if (!parsed) return { title: "Route nicht gefunden" }

  const fromCity = getCity(parsed.from)
  const toCity = getCity(parsed.to)
  const toCountry = getCountryName(getCountryCode(parsed.to))

  return {
    title: `Flüge ${fromCity} ${toCity} — Preisvergleich 2026 | Tripora24`,
    description: `Günstige Flüge von ${fromCity} nach ${toCity} (${toCountry}) finden. Preisvergleich über 500 Airlines, aktuelle Angebote, beste Reisezeit und Spartipps auf einen Blick.`,
    alternates: { canonical: `/fluege/${route}` },
    openGraph: {
      title: `Flüge ${fromCity} → ${toCity} ab günstig`,
      description: `Preisvergleich für Flüge ${fromCity} – ${toCity}. Aktuelle Angebote aller Airlines.`,
      images: [getCityImage(parsed.to)],
    },
  }
}

export default async function RoutePage({ params }: { params: Promise<{ route: string }> }) {
  const { route } = await params
  const parsed = parseRouteSlug(route)
  if (!parsed) notFound()

  const { from, to } = parsed
  const fromCity = getCity(from)
  const toCity = getCity(to)
  const fromCountry = getCountryName(getCountryCode(from))
  const toCountry = getCountryName(getCountryCode(to))
  const image = getCityImage(to)
  const url = `https://www.tripora24.com/fluege/${route}`

  const stats = await getRouteStats(from, to)
  const hasData = stats.flightsFound > 0

  const providers = [
    { name: "Aviasales", link: buildAviasalesUrl({ origin: from, destination: to }), badge: "Empfohlen" },
    { name: "Kiwi.com", link: buildKiwiUrl({ origin: from, destination: to }), badge: null },
  ]

  const priceRange = hasData && stats.cheapestPrice && stats.maxPrice
    ? `${stats.cheapestPrice}€ – ${stats.maxPrice}€`
    : "variabel"

  const durationStr = formatDuration(stats.avgDurationMin)
  const directPct = Math.round(stats.directFlightShare * 100)
  const airlineList = stats.airlines.map((a) => a.name)
  const airlineText = airlineList.length > 0
    ? airlineList.slice(0, 6).join(", ") + (airlineList.length > 6 ? " und weitere" : "")
    : "Lufthansa, Eurowings, Ryanair, Wizz Air und weitere"

  const faqs = [
    {
      q: `Wie lange dauert ein Flug von ${fromCity} nach ${toCity}?`,
      a: hasData && durationStr
        ? `Die durchschnittliche Flugdauer von ${fromCity} (${from}) nach ${toCity} (${to}) beträgt ${durationStr}. ${directPct > 0 ? `${directPct}% der verfügbaren Flüge sind Direktflüge` : "Es sind überwiegend Flüge mit Zwischenstopp verfügbar"}. Direktflüge sind in der Regel schneller als Verbindungen mit Umstieg.`
        : `Die Flugdauer von ${fromCity} (${from}) nach ${toCity} (${to}) variiert je nach Airline und ob Direktflug oder Zwischenstopp. Direktflüge sind die schnellste Option.`,
    },
    {
      q: `Welche Airlines fliegen von ${fromCity} nach ${toCity}?`,
      a: `Auf der Strecke ${fromCity} – ${toCity} fliegen ${airlineText}. Welche Airline am günstigsten ist, hängt vom Reisedatum ab. Tripora24 vergleicht automatisch alle verfügbaren Anbieter.`,
    },
    {
      q: `Wann ist die beste Reisezeit für Flüge nach ${toCity}?`,
      a: hasData && stats.cheapestMonth
        ? `Laut aktuellen Preisdaten ist ${monthLabel(stats.cheapestMonth)} der günstigste Monat für einen Flug von ${fromCity} nach ${toCity}. Generell lohnen sich Frühjahr (April/Mai) und Herbst (September/Oktober) — dort fallen Schulferien weg und Preise sind niedriger.`
        : `Die günstigsten Monate für einen Flug nach ${toCity} sind meistens in der Nebensaison (Frühling und Herbst). Vermeide Schulferien und große Feiertage. Dienstag und Mittwoch sind die günstigsten Wochentage zum Fliegen.`,
    },
    {
      q: `Wie viel kostet ein Flug ${fromCity} ${toCity}?`,
      a: hasData && stats.cheapestPrice
        ? `Flüge ${fromCity} nach ${toCity} beginnen aktuell bei ca. ${stats.cheapestPrice}€ (Hin- und Rückflug). Der Durchschnittspreis liegt bei etwa ${stats.avgPrice}€. Mit flexiblen Daten und frühzeitiger Buchung kannst du oft noch günstiger fliegen.`
        : `Die Preise für Flüge ${fromCity} – ${toCity} variieren stark nach Saison, Airline und Buchungszeitpunkt. Mit flexiblen Daten und Preis-Alerts findest du meistens gute Angebote.`,
    },
    {
      q: `Wie finde ich den günstigsten Flug ${fromCity} ${toCity}?`,
      a: `Sei flexibel bei Reisedaten, buche 6-8 Wochen vor Abflug und vergleiche mehrere Anbieter. Setze zusätzlich einen Preis-Alert bei Tripora24 — wir benachrichtigen dich kostenlos, sobald der Preis fällt.`,
    },
  ]

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://www.tripora24.com" },
          { name: "Flüge", url: "https://www.tripora24.com/fluege" },
          { name: `${fromCity} – ${toCity}`, url },
        ]}
      />
      <FlightRouteJsonLd
        origin={fromCity}
        destination={toCity}
        originCode={from}
        destinationCode={to}
        price={stats.cheapestPrice || undefined}
        url={url}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-8 shadow-lg">
        <img src={image} alt={`Flüge nach ${toCity}`} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white">
          <div className="flex items-center gap-2 text-sm font-semibold mb-2 opacity-90">
            <span>{fromCity} ({from})</span>
            <ArrowRightIcon className="h-4 w-4" />
            <span>{toCity} ({to})</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            Flüge {fromCity} → {toCity}
          </h1>
          <p className="text-sm md:text-base mt-2 opacity-90">
            {hasData && stats.cheapestPrice
              ? `Ab ${stats.cheapestPrice}€ · Preisvergleich für ${toCountry}`
              : `Preisvergleich & aktuelle Angebote für ${toCountry}`}
          </p>
        </div>
      </div>

      {/* Live Price Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <Card className="p-4 text-center">
          <div className="text-xs text-muted-foreground mb-1">Ab-Preis (Hin+Rück)</div>
          <div className="font-bold text-2xl text-primary">
            {hasData && stats.cheapestPrice ? `${stats.cheapestPrice}€` : "—"}
          </div>
          {hasData && stats.avgPrice && (
            <div className="text-xs text-muted-foreground mt-1">Ø {stats.avgPrice}€</div>
          )}
        </Card>
        <Card className="p-4 text-center">
          <div className="text-xs text-muted-foreground mb-1">Günstigster Monat</div>
          <div className="font-bold text-lg">
            {hasData && stats.cheapestMonth ? monthLabel(stats.cheapestMonth) : "Nebensaison"}
          </div>
          <div className="text-xs text-muted-foreground mt-1">Tiefstpreis</div>
        </Card>
        <Card className="p-4 text-center">
          <ClockIcon className="h-5 w-5 mx-auto mb-1 text-primary" />
          <div className="text-xs text-muted-foreground">Ø Flugdauer</div>
          <div className="font-semibold text-sm">{durationStr || "—"}</div>
        </Card>
        <Card className="p-4 text-center">
          <PlaneIcon className="h-5 w-5 mx-auto mb-1 text-primary" />
          <div className="text-xs text-muted-foreground">Direktflug-Anteil</div>
          <div className="font-semibold text-sm">{hasData ? `${directPct}%` : "—"}</div>
        </Card>
      </div>

      {/* Monthly Price Heatmap */}
      {stats.monthlyPrices.length >= 3 && (
        <Card className="p-5 mb-8">
          <h2 className="text-lg font-bold mb-3">Preisverlauf nach Monat</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Günstigste verfügbare Preise (Hin + Rück) pro Reisemonat für die Strecke {fromCity} – {toCity}.
          </p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {stats.monthlyPrices.map((mp) => {
              const isLowest = mp.month === stats.cheapestMonth
              return (
                <div key={mp.month} className={`rounded-lg p-3 text-center border ${isLowest ? "bg-primary/10 border-primary" : "bg-muted/30"}`}>
                  <div className="text-xs text-muted-foreground">{monthLabel(mp.month).split(" ")[0].slice(0, 3)}</div>
                  <div className={`font-bold text-base ${isLowest ? "text-primary" : ""}`}>{mp.minPrice}€</div>
                  {isLowest && <div className="text-[10px] text-primary font-semibold mt-0.5">TIEFSTPREIS</div>}
                </div>
              )
            })}
          </div>
        </Card>
      )}

      {/* Airlines auf der Route */}
      {stats.airlines.length > 0 && (
        <Card className="p-5 mb-8">
          <h2 className="text-lg font-bold mb-3">Airlines auf dieser Route</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Folgende Airlines bieten aktuell Flüge von {fromCity} nach {toCity} an (nach Häufigkeit sortiert).
          </p>
          <div className="flex flex-wrap gap-2">
            {stats.airlines.map((a) => (
              <div key={a.code} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted text-sm">
                <span className="font-semibold">{a.name}</span>
                <span className="text-xs text-muted-foreground">{a.count} Angebote</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Provider CTA */}
      <Card className="p-6 mb-10 bg-gradient-to-br from-primary/5 to-blue-50 dark:from-primary/10 dark:to-slate-900">
        <h2 className="text-xl font-bold mb-2">
          {hasData && stats.cheapestPrice
            ? `Günstige Flüge ${fromCity} – ${toCity} ab ${stats.cheapestPrice}€`
            : `Günstige Flüge ${fromCity} – ${toCity} vergleichen`}
        </h2>
        <p className="text-muted-foreground text-sm mb-4">
          Tripora24 durchsucht gleichzeitig über 500 Airlines und zeigt dir die günstigsten Optionen für deine Reise nach {toCity}.
          {hasData && ` Aktuell haben wir ${stats.flightsFound} verfügbare Angebote für diese Strecke gefunden.`}
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href={`/fluege?from=${from}&to=${to}`}>
            <Button size="lg" className="gap-2">
              Jetzt {stats.flightsFound > 0 ? `${stats.flightsFound} ` : ""}Flüge suchen <ArrowRightIcon className="h-4 w-4" />
            </Button>
          </Link>
          {providers.map((p) => (
            <a key={p.name} href={p.link} target="_blank" rel="noopener sponsored nofollow">
              <Button variant="outline" size="lg">{p.name} öffnen</Button>
            </a>
          ))}
        </div>
      </Card>

      {/* Komplettiere deine Reise — Partner-Services */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-2">Komplettiere deine Reise nach {toCity}</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Mietwagen, Transfers und Aktivitäten — alles was du nach der Landung brauchst.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href={buildGetYourGuideUrl({ destination: toCity })}
            target="_blank"
            rel="noopener sponsored nofollow"
            className="group"
          >
            <Card className="p-5 h-full hover:shadow-lg hover:-translate-y-0.5 transition-all">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center mb-3">
                <GlobeIcon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="font-bold text-base mb-1">Touren & Tickets in {toCity}</h3>
              <p className="text-xs text-muted-foreground mb-3">Skip-the-line Tickets, Stadtführungen und Erlebnisse — sofort buchen.</p>
              <span className="text-xs text-primary font-semibold group-hover:underline">Aktivitäten ansehen →</span>
            </Card>
          </a>
          <a
            href={buildKiwiTaxiUrl({ destination: `${to} airport ${toCity}` })}
            target="_blank"
            rel="noopener sponsored nofollow"
            className="group"
          >
            <Card className="p-5 h-full hover:shadow-lg hover:-translate-y-0.5 transition-all">
              <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center mb-3">
                <CarIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-bold text-base mb-1">Flughafentransfer {toCity}</h3>
              <p className="text-xs text-muted-foreground mb-3">Privat-Transfer von {to} zum Hotel — Festpreis, deutscher Fahrer möglich.</p>
              <span className="text-xs text-primary font-semibold group-hover:underline">Transfer buchen →</span>
            </Card>
          </a>
          <a
            href={buildDiscoverCarsUrl({ pickupLocation: `${toCity} ${to}` })}
            target="_blank"
            rel="noopener sponsored nofollow"
            className="group"
          >
            <Card className="p-5 h-full hover:shadow-lg hover:-translate-y-0.5 transition-all">
              <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center mb-3">
                <CarIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-bold text-base mb-1">Mietwagen ab {toCity} {to}</h3>
              <p className="text-xs text-muted-foreground mb-3">900+ Anbieter vergleichen — Vollkasko inkl., kostenlose Stornierung.</p>
              <span className="text-xs text-primary font-semibold group-hover:underline">Mietwagen vergleichen →</span>
            </Card>
          </a>
        </div>
      </section>

      {/* AirHelp Banner — Flugverspätung/Annullierung */}
      <Card className="p-5 mb-10 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-amber-200 dark:border-amber-900/50">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center shrink-0">
            <ShieldIcon className="h-6 w-6 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-base mb-1">Flug verspätet oder annulliert?</h3>
            <p className="text-sm text-muted-foreground">
              Nach EU-Verordnung 261/2004 stehen dir bis zu <strong>600€ Entschädigung</strong> zu — AirHelp prüft kostenlos, auch rückwirkend für Flüge der letzten 3 Jahre.
            </p>
          </div>
          <a href={buildAirHelpUrl()} target="_blank" rel="noopener sponsored nofollow">
            <Button variant="outline" className="gap-2 bg-white dark:bg-slate-900">
              Anspruch prüfen <ArrowRightIcon className="h-4 w-4" />
            </Button>
          </a>
        </div>
      </Card>

      {/* SEO Content */}
      <article className="prose dark:prose-invert max-w-none mb-12">
        <h2>Alles zur Strecke {fromCity} nach {toCity}</h2>
        <p>
          Du suchst einen <strong>günstigen Flug von {fromCity} nach {toCity}</strong>? Die Verbindung vom Flughafen {fromCity} ({from}) in {fromCountry} nach {toCity} ({to}) in {toCountry} gehört zu den beliebten Flugrouten.
          {hasData && stats.cheapestPrice && ` Aktuell beginnen die Preise bei ${stats.cheapestPrice}€ für Hin- und Rückflug, der Durchschnitt liegt bei ${stats.avgPrice}€.`}
          {" "}Mit Tripora24 findest du binnen weniger Sekunden die günstigsten Angebote aller großen Airlines.
        </p>

        <h3>Welche Airlines fliegen {fromCity} – {toCity}?</h3>
        <p>
          {stats.airlines.length > 0
            ? `Auf dieser Strecke fliegen aktuell ${airlineList.length} Airlines — am häufigsten ${stats.airlines[0].name}${stats.airlines[1] ? ` und ${stats.airlines[1].name}` : ""}. Zu den weiteren Anbietern gehören ${airlineText}.`
            : `Auf dieser Route fliegen verschiedene Airlines, je nach Saison und Buchungszeitpunkt. Zu den häufigsten Anbietern gehören Lufthansa, Eurowings, Ryanair, Wizz Air, Vueling und Pegasus Airlines.`}
          {" "}Die Vielfalt sorgt für Konkurrenz und oft für günstige Preise — vor allem wenn du flexibel bist.
        </p>

        <h3>Beste Reisezeit für {toCity}</h3>
        <p>
          {hasData && stats.cheapestMonth
            ? `Unsere aktuelle Preisanalyse zeigt: ${monthLabel(stats.cheapestMonth)} ist derzeit der günstigste Monat für einen Flug nach ${toCity}. Generell findest du in der Nebensaison (Frühjahr und Herbst) die besten Preise.`
            : `Die günstigsten Preise für einen Flug nach ${toCity} findest du typischerweise in der Nebensaison — also im Frühjahr (April, Mai) und Herbst (September, Oktober). In diesen Monaten ist das Wetter oft angenehm, die Preise deutlich niedriger als in der Hochsaison.`}
        </p>

        <h3>Flugdauer und Verbindungen</h3>
        <p>
          {hasData && durationStr
            ? `Die durchschnittliche Flugzeit auf dieser Route beträgt ${durationStr}. ${directPct >= 50 ? `Die meisten Flüge (${directPct}%) sind Direktverbindungen — du kommst also ohne Umsteigen an.` : directPct > 0 ? `${directPct}% der Flüge sind Direktverbindungen, der Rest erfolgt mit Zwischenstopp.` : `Die Verbindung erfolgt in der Regel mit Zwischenstopp.`}`
            : `Die Flugdauer variiert je nach Airline und ob Direktflug oder Verbindung mit Umsteigen. Direktflüge sind am schnellsten, Verbindungen oft günstiger.`}
        </p>

        <h3>Spartipps für deinen Flug {fromCity} {toCity}</h3>
        <ul>
          <li><strong>Flexible Daten:</strong> 1–2 Tage früher oder später fliegen spart oft 30–50%.</li>
          <li><strong>Dienstag/Mittwoch:</strong> Die günstigsten Wochentage zum Fliegen.</li>
          <li><strong>6–8 Wochen vorher buchen:</strong> Der Sweet Spot für Europa-Flüge.</li>
          <li><strong>Preis-Alert setzen:</strong> Wir benachrichtigen dich kostenlos, sobald der Preis fällt.</li>
          <li><strong>Nur Handgepäck:</strong> Spart 30–80€ Gepäckgebühren bei Billigfliegern.</li>
        </ul>
      </article>

      {/* FAQ */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Häufige Fragen zum Flug {fromCity} – {toCity}</h2>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <Card key={i} className="p-5">
              <h3 className="font-semibold mb-2">{f.q}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Related Routes */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4">Weitere beliebte Flugrouten</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {TOP_ROUTES
            .filter((r) => r.from === from && r.to !== to)
            .slice(0, 8)
            .map((r) => (
              <Link key={`${r.from}-${r.to}`} href={`/fluege/${routeSlug(r.from, r.to)}`}>
                <Card className="p-3 hover:shadow-md transition-shadow text-sm">
                  <div className="font-semibold">{getCity(r.from)} → {getCity(r.to)}</div>
                  <div className="text-xs text-muted-foreground mt-1">{r.from} – {r.to}</div>
                </Card>
              </Link>
            ))}
        </div>
      </section>

      {hasData && (
        <div className="text-xs text-muted-foreground text-center mb-4">
          Preisdaten zuletzt aktualisiert: {new Date(stats.updatedAt).toLocaleString("de-DE")}
        </div>
      )}
    </div>
  )
}
