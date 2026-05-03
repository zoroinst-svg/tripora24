"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { CarIcon, MapPinIcon, CalendarIcon, ExternalLinkIcon, CheckIcon, ShieldIcon } from "@/components/ui/icons"
import { buildDiscoverCarsUrl } from "@/lib/apis/partners"

const POPULAR_LOCATIONS = [
  { code: "PMI", name: "Mallorca (Palma)", country: "Spanien", img: "https://images.unsplash.com/photo-1538970272646-f61fabb3a8a2?w=600&h=400&fit=crop" },
  { code: "AYT", name: "Antalya", country: "Türkei", img: "https://images.unsplash.com/photo-1589646618907-e9b4c95b4029?w=600&h=400&fit=crop" },
  { code: "FAO", name: "Faro (Algarve)", country: "Portugal", img: "https://images.unsplash.com/photo-1591193686104-fddba4d2cf8b?w=600&h=400&fit=crop" },
  { code: "AGP", name: "Málaga", country: "Spanien", img: "https://images.unsplash.com/photo-1559634569-a8a47fd2cf41?w=600&h=400&fit=crop" },
  { code: "HER", name: "Heraklion (Kreta)", country: "Griechenland", img: "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=600&h=400&fit=crop" },
  { code: "NCE", name: "Nizza", country: "Frankreich", img: "https://images.unsplash.com/photo-1493707553966-283afac8c358?w=600&h=400&fit=crop" },
  { code: "DBV", name: "Dubrovnik", country: "Kroatien", img: "https://images.unsplash.com/photo-1555990538-32195a877a44?w=600&h=400&fit=crop" },
  { code: "DXB", name: "Dubai", country: "VAE", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=400&fit=crop" },
]

const FEATURES = [
  { icon: CheckIcon, title: "900+ Anbieter", desc: "Sixt, Hertz, Europcar, Avis und viele mehr" },
  { icon: ShieldIcon, title: "Kostenlose Stornierung", desc: "Bei den meisten Buchungen flexibel stornierbar" },
  { icon: CheckIcon, title: "Keine versteckten Kosten", desc: "Vollkasko & Diebstahlschutz inklusive verfügbar" },
]

export default function MietwagenPage() {
  const [pickupLocation, setPickupLocation] = useState("")
  const [pickupDate, setPickupDate] = useState("")
  const [returnDate, setReturnDate] = useState("")

  const searchUrl = buildDiscoverCarsUrl({ pickupLocation, pickupDate, returnDate })

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <CarIcon className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Mietwagen weltweit vergleichen</h1>
          <p className="text-muted-foreground text-sm">Günstige Mietwagen bei 900+ Anbietern · ab 8€/Tag</p>
        </div>
      </div>

      {/* Search Card */}
      <Card className="mb-8">
        <CardContent className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block font-semibold">Abholort</label>
              <div className="relative">
                <MapPinIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  placeholder="z.B. Mallorca, Antalya..."
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block font-semibold">Abholdatum</label>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input type="date" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} className="pl-10" />
              </div>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block font-semibold">Rückgabe</label>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} className="pl-10" />
              </div>
            </div>
          </div>
          <a href={searchUrl} target="_blank" rel="noopener sponsored nofollow">
            <Button className="w-full h-11 gap-2" size="lg">
              Mietwagen vergleichen <ExternalLinkIcon className="h-4 w-4" />
            </Button>
          </a>
          <p className="text-xs text-muted-foreground text-center mt-2">
            Powered by DiscoverCars · 900+ Anbieter · 145+ Länder
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

      {/* Popular destinations */}
      <h2 className="text-xl font-bold mb-4">Beliebte Mietwagen-Ziele</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
        {POPULAR_LOCATIONS.map((loc) => (
          <a
            key={loc.code}
            href={buildDiscoverCarsUrl({ pickupLocation: loc.name })}
            target="_blank"
            rel="noopener sponsored nofollow"
            className="group block"
          >
            <Card className="overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <div className="h-32 overflow-hidden relative">
                <img src={loc.img} alt={loc.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-3 right-3 text-white">
                  <h3 className="font-bold text-sm drop-shadow-lg">{loc.name}</h3>
                  <p className="text-xs opacity-90">{loc.country}</p>
                </div>
              </div>
              <CardContent className="p-3">
                <div className="flex items-center justify-between text-xs">
                  <Badge variant="secondary" className="text-[10px]">ab 12€/Tag</Badge>
                  <span className="text-muted-foreground">Vergleichen →</span>
                </div>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>

      {/* SEO Content */}
      <article className="prose dark:prose-invert max-w-none">
        <h2>Mietwagen günstig buchen — der schnelle Weg</h2>
        <p>
          Du planst deinen Urlaub und willst flexibel sein? Ein <strong>Mietwagen</strong> gibt dir die Freiheit, abgelegene Strände, Bergdörfer und versteckte Geheimtipps selbst zu entdecken.
          Tripora24 vergleicht für dich Preise von <strong>über 900 Mietwagenanbietern</strong> in 145+ Ländern — von großen Marken wie Sixt, Hertz und Europcar bis zu lokalen Anbietern, die oft 30-50% günstiger sind.
        </p>

        <h3>Was kostet ein Mietwagen?</h3>
        <p>
          Die Preise starten bei etwa 8-12€ pro Tag in günstigen Regionen wie Mallorca, Kreta oder der Türkei. In teureren Märkten wie Skandinavien oder Island liegen die Preise eher bei 40-60€/Tag.
          Die Hauptsaison (Juli/August) ist deutlich teurer — frühzeitige Buchung spart oft 20-40%.
        </p>

        <h3>Worauf solltest du beim Mietwagen achten?</h3>
        <ul>
          <li><strong>Vollkasko ohne Selbstbeteiligung:</strong> Spart dir im Schadensfall mehrere hundert Euro.</li>
          <li><strong>Kraftstoffregelung:</strong> "Voll-Voll" ist fairer als "Voll-Leer" (du bezahlst nur, was du verbrauchst).</li>
          <li><strong>Kilometerregelung:</strong> Unbegrenzte Kilometer sind Standard — bei lokalen Anbietern manchmal eingeschränkt.</li>
          <li><strong>Abholzeiten:</strong> Übernachtgebühren am Flughafen vermeiden, wenn möglich.</li>
          <li><strong>Kreditkarte:</strong> Die meisten Anbieter verlangen eine Kreditkarte mit ausreichendem Limit für die Kaution.</li>
        </ul>

        <h3>Mietwagen oder Taxi/Bus?</h3>
        <p>
          Auf Inseln und in ländlichen Gegenden lohnt sich ein Mietwagen fast immer — besonders wenn ihr zu zweit oder mehr unterwegs seid. In Großstädten wie Barcelona, Rom oder Istanbul ist öffentlicher Verkehr meist günstiger und stressfreier.
        </p>
      </article>
    </div>
  )
}
