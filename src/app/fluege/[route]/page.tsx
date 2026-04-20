import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { getCity, getCountryCode, getCountryName } from "@/lib/data/iata-database"
import { getCityImage } from "@/lib/utils/images"
import { TOP_ROUTES, parseRouteSlug, routeSlug } from "@/lib/data/top-routes"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { PlaneIcon, ArrowRightIcon, ClockIcon, CalendarIcon } from "@/components/ui/icons"
import { BreadcrumbJsonLd, FlightRouteJsonLd } from "@/components/seo/JsonLd"

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

  const providers = [
    {
      name: "Skyscanner",
      link: `https://www.skyscanner.de/transport/fluege/${from.toLowerCase()}/${to.toLowerCase()}/`,
      badge: "Empfohlen",
    },
    {
      name: "Aviasales",
      link: `https://www.aviasales.com/search/${from}1${to}1?marker=tripora24`,
      badge: null,
    },
    {
      name: "Google Flights",
      link: `https://www.google.com/flights?q=${from}+to+${to}`,
      badge: null,
    },
    {
      name: "Kiwi.com",
      link: `https://www.kiwi.com/de/search/results/${fromCity}-${fromCountry}/${toCity}-${toCountry}`,
      badge: null,
    },
  ]

  const faqs = [
    {
      q: `Wie lange dauert ein Flug von ${fromCity} nach ${toCity}?`,
      a: `Die Flugdauer von ${fromCity} (${from}) nach ${toCity} (${to}) variiert je nach Airline und ob es ein Direktflug oder ein Flug mit Zwischenstopp ist. Direktflüge sind in der Regel die schnellste Option. Nutze unseren Preisvergleich oben, um aktuelle Flugzeiten einzusehen.`,
    },
    {
      q: `Welche Airlines fliegen von ${fromCity} nach ${toCity}?`,
      a: `Auf der Strecke ${fromCity} – ${toCity} fliegen zahlreiche Airlines, darunter Lufthansa, Eurowings, Ryanair, Wizz Air und weitere. Welche Airline die günstigste ist, hängt vom gewählten Reisedatum ab. Tripora24 vergleicht automatisch alle verfügbaren Anbieter.`,
    },
    {
      q: `Wann ist die beste Reisezeit für Flüge nach ${toCity}?`,
      a: `Die günstigsten Monate für einen Flug nach ${toCity} sind meistens in der Nebensaison (Frühling und Herbst). Vermeide Schulferien und große Feiertage. Dienstag und Mittwoch sind generell die günstigsten Wochentage zum Fliegen.`,
    },
    {
      q: `Wie finde ich den günstigsten Flug ${fromCity} ${toCity}?`,
      a: `Sei flexibel bei deinen Reisedaten, buche 6-8 Wochen vor Abflug und vergleiche mehrere Anbieter. Setze zusätzlich einen Preis-Alert bei Tripora24 — wir benachrichtigen dich kostenlos, sobald der Preis fällt.`,
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
          <p className="text-sm md:text-base mt-2 opacity-90">Preisvergleich & aktuelle Angebote für {toCountry}</p>
        </div>
      </div>

      {/* Quick Facts */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <Card className="p-4 text-center">
          <PlaneIcon className="h-5 w-5 mx-auto mb-1 text-primary" />
          <div className="text-xs text-muted-foreground">Route</div>
          <div className="font-semibold text-sm">{from} → {to}</div>
        </Card>
        <Card className="p-4 text-center">
          <CalendarIcon className="h-5 w-5 mx-auto mb-1 text-primary" />
          <div className="text-xs text-muted-foreground">Beste Reisezeit</div>
          <div className="font-semibold text-sm">Apr – Mai · Sep – Okt</div>
        </Card>
        <Card className="p-4 text-center">
          <ClockIcon className="h-5 w-5 mx-auto mb-1 text-primary" />
          <div className="text-xs text-muted-foreground">Buchen</div>
          <div className="font-semibold text-sm">6–8 Wochen vorher</div>
        </Card>
        <Card className="p-4 text-center">
          <ArrowRightIcon className="h-5 w-5 mx-auto mb-1 text-primary" />
          <div className="text-xs text-muted-foreground">Zielland</div>
          <div className="font-semibold text-sm">{toCountry}</div>
        </Card>
      </div>

      {/* Provider CTA */}
      <Card className="p-6 mb-10 bg-gradient-to-br from-primary/5 to-blue-50 dark:from-primary/10 dark:to-slate-900">
        <h2 className="text-xl font-bold mb-4">Günstige Flüge {fromCity} – {toCity} vergleichen</h2>
        <p className="text-muted-foreground text-sm mb-4">
          Tripora24 durchsucht gleichzeitig über 500 Airlines und zeigt dir die günstigsten Optionen für deine Reise nach {toCity}.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href={`/fluege?from=${from}&to=${to}`}>
            <Button size="lg" className="gap-2">
              Jetzt Flüge suchen <ArrowRightIcon className="h-4 w-4" />
            </Button>
          </Link>
          {providers.map((p) => (
            <a key={p.name} href={p.link} target="_blank" rel="noopener sponsored nofollow">
              <Button variant="outline" size="lg">{p.name} öffnen</Button>
            </a>
          ))}
        </div>
      </Card>

      {/* SEO Content */}
      <article className="prose dark:prose-invert max-w-none mb-12">
        <h2>Alles zur Strecke {fromCity} nach {toCity}</h2>
        <p>
          Du suchst einen <strong>günstigen Flug von {fromCity} nach {toCity}</strong>? Die Verbindung vom Flughafen {fromCity} ({from}) in {fromCountry} nach {toCity} ({to}) in {toCountry} gehört zu den beliebten Flugrouten. Mit Tripora24 findest du binnen weniger Sekunden die günstigsten Angebote aller großen Airlines — inklusive Billigflieger und Vollservice-Carrier.
        </p>

        <h3>Welche Airlines fliegen {fromCity} – {toCity}?</h3>
        <p>
          Auf dieser Route fliegen verschiedene Airlines, je nach Saison und Buchungszeitpunkt. Zu den häufigsten Anbietern gehören Lufthansa, Eurowings, Ryanair, Wizz Air, Vueling und Pegasus Airlines. Die Vielfalt sorgt für Konkurrenz und oft für günstige Preise — vor allem wenn du flexibel bist.
        </p>

        <h3>Beste Reisezeit für {toCity}</h3>
        <p>
          Die günstigsten Preise für einen Flug nach {toCity} findest du typischerweise in der <strong>Nebensaison</strong> — also im Frühjahr (April, Mai) und Herbst (September, Oktober). In diesen Monaten ist das Wetter oft angenehm, die Preise deutlich niedriger als in der Hochsaison und die Ziele weniger überlaufen.
        </p>

        <h3>Spartipps für deinen Flug {fromCity} {toCity}</h3>
        <ul>
          <li><strong>Flexible Daten:</strong> 1–2 Tage früher oder später fliegen spart oft 30–50%.</li>
          <li><strong>Dienstag/Mittwoch:</strong> Die günstigsten Wochentage zum Fliegen.</li>
          <li><strong>6–8 Wochen vorher buchen:</strong> Der Sweet Spot für Europa-Flüge.</li>
          <li><strong>Preis-Alert setzen:</strong> Wir benachrichtigen dich kostenlos, sobald der Preis fällt.</li>
          <li><strong>Nur Handgepäck:</strong> Spart 30–80€ Gepäckgebühren bei Billigfliegern.</li>
        </ul>

        <h3>Alternative Flughäfen</h3>
        <p>
          Prüfe auch nahegelegene Flughäfen in der Region {fromCountry}. Oft sind kleinere Airports wie Memmingen, Frankfurt-Hahn oder Weeze deutlich günstiger als die großen Drehkreuze — die Anfahrt lohnt sich häufig trotzdem.
        </p>
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
    </div>
  )
}
