"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { GlobeIcon, SearchIcon, ExternalLinkIcon, StarIcon, CheckIcon } from "@/components/ui/icons"
import { buildGetYourGuideUrl, buildTiqetsUrl } from "@/lib/apis/partners"

const POPULAR_CITIES = [
  { name: "Rom", country: "Italien", img: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&h=400&fit=crop", highlight: "Kolosseum, Vatikan" },
  { name: "Barcelona", country: "Spanien", img: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600&h=400&fit=crop", highlight: "Sagrada Família, Park Güell" },
  { name: "Istanbul", country: "Türkei", img: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&h=400&fit=crop", highlight: "Hagia Sophia, Bosporus-Kreuzfahrt" },
  { name: "Paris", country: "Frankreich", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=400&fit=crop", highlight: "Eiffelturm, Louvre" },
  { name: "Dubai", country: "VAE", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=400&fit=crop", highlight: "Burj Khalifa, Wüstensafari" },
  { name: "Lissabon", country: "Portugal", img: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=600&h=400&fit=crop", highlight: "Tram 28, Sintra-Tour" },
  { name: "London", country: "UK", img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&h=400&fit=crop", highlight: "London Eye, Tower of London" },
  { name: "New York", country: "USA", img: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&h=400&fit=crop", highlight: "Statue of Liberty, Empire State" },
]

const FEATURES = [
  { icon: CheckIcon, title: "60.000+ Erlebnisse", desc: "Touren, Tickets, Workshops in 170+ Ländern" },
  { icon: CheckIcon, title: "Skip-the-line", desc: "Warteschlangen umgehen — direkt rein" },
  { icon: CheckIcon, title: "Kostenlose Stornierung", desc: "Bis 24h vorher kostenlos stornieren" },
]

export default function AktivitaetenPage() {
  const [query, setQuery] = useState("")

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <GlobeIcon className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Touren, Aktivitäten & Tickets</h1>
          <p className="text-muted-foreground text-sm">Über 60.000 Erlebnisse — Skip-the-line, Sofort-Bestätigung</p>
        </div>
      </div>

      {/* Search */}
      <Card className="mb-8">
        <CardContent className="p-5">
          <label className="text-xs text-muted-foreground mb-1 block font-semibold">Wo möchtest du etwas erleben?</label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="z.B. Rom, Sagrada Família, Wüstensafari..."
                className="pl-10 h-11"
              />
            </div>
            <a
              href={buildGetYourGuideUrl({ destination: query || "Europa", query: query || undefined })}
              target="_blank"
              rel="noopener sponsored nofollow"
            >
              <Button size="lg" className="h-11 gap-2">
                Suchen <ExternalLinkIcon className="h-4 w-4" />
              </Button>
            </a>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Powered by GetYourGuide · Bestpreis-Garantie · Sofortige Bestätigung
          </p>
        </CardContent>
      </Card>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-10">
        {FEATURES.map((f) => (
          <Card key={f.title} className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">{f.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{f.desc}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Popular cities */}
      <h2 className="text-xl font-bold mb-4">Beliebte Städte für Aktivitäten</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
        {POPULAR_CITIES.map((city) => (
          <a
            key={city.name}
            href={buildGetYourGuideUrl({ destination: city.name })}
            target="_blank"
            rel="noopener sponsored nofollow"
            className="group block"
          >
            <Card className="overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <div className="h-36 overflow-hidden relative">
                <img src={city.img} alt={city.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-3 right-3 text-white">
                  <h3 className="font-bold text-base drop-shadow-lg">{city.name}</h3>
                  <p className="text-xs opacity-90">{city.country}</p>
                </div>
              </div>
              <CardContent className="p-3">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <StarIcon className="h-3 w-3 fill-amber-400 text-amber-400 shrink-0" />
                  <span className="truncate">{city.highlight}</span>
                </div>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>

      {/* Tickets section (Tiqets) */}
      <Card className="p-6 mb-10 bg-gradient-to-br from-primary/5 to-blue-50 dark:from-primary/10 dark:to-slate-900">
        <h2 className="text-xl font-bold mb-2">Museen & Sehenswürdigkeiten</h2>
        <p className="text-muted-foreground text-sm mb-4">
          Tickets für Museen, Schlösser und Top-Attraktionen weltweit — oft Skip-the-line ohne Warten.
        </p>
        <div className="flex flex-wrap gap-2">
          {["Vatikanische Museen", "Louvre", "Eiffelturm", "Sagrada Família", "Anne Frank Haus", "Akropolis"].map((attr) => (
            <a
              key={attr}
              href={buildTiqetsUrl({ destination: attr })}
              target="_blank"
              rel="noopener sponsored nofollow"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 border text-sm hover:border-primary transition-colors"
            >
              {attr} <ExternalLinkIcon className="h-3 w-3 opacity-50" />
            </a>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-4">Powered by Tiqets</p>
      </Card>

      {/* SEO Content */}
      <article className="prose dark:prose-invert max-w-none">
        <h2>Touren & Aktivitäten — was deinen Urlaub unvergesslich macht</h2>
        <p>
          Sehenswürdigkeiten besichtigen ist schön — aber <strong>Erlebnisse</strong> sind, woran du dich Jahre später erinnerst.
          Eine Wüstensafari in Dubai, ein Kochkurs in Bologna, eine Bootstour bei Sonnenuntergang in Santorini. Genau das findest du auf dieser Seite.
        </p>

        <h3>Was du buchen kannst</h3>
        <ul>
          <li><strong>Stadtführungen:</strong> Geführte Touren mit lokalen Guides — oft günstiger als gedacht.</li>
          <li><strong>Skip-the-line Tickets:</strong> Vatikan, Eiffelturm, Sagrada Família — ohne 2h Warten.</li>
          <li><strong>Tagesausflüge:</strong> Pompeji, Versailles, Stonehenge — Transport & Eintritt inklusive.</li>
          <li><strong>Wassersport:</strong> Schnorcheln, Tauchen, Bootstouren.</li>
          <li><strong>Kulinarisches:</strong> Kochkurse, Weinverkostungen, Streetfood-Touren.</li>
          <li><strong>Erlebnisse:</strong> Heißluftballon, Wüstensafari, Themenparks.</li>
        </ul>

        <h3>Warum vorher buchen?</h3>
        <p>
          Beliebte Attraktionen wie der Eiffelturm oder das Kolosseum sind oft <strong>Wochen im Voraus ausverkauft</strong>.
          Skip-the-line Tickets sparen dir 1-3 Stunden Wartezeit und kosten meist nur wenige Euro mehr.
          Die meisten Buchungen sind kostenlos stornierbar bis 24h vor dem Erlebnis — du gehst also kein Risiko ein.
        </p>
      </article>
    </div>
  )
}
