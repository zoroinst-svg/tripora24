"use client"

import { useState } from "react"
import { ChevronDownIcon } from "@/components/ui/icons"
import { useI18n } from "@/lib/i18n/context"

// Hardcoded FAQ content per locale — more reliable than message keys for long text
const FAQS: Record<string, { q: string; a: string }[]> = {
  de: [
    { q: "Wie funktioniert Tripora24?", a: "Tripora24 ist eine Reise-Suchmaschine. Wir durchsuchen für dich gleichzeitig hunderte Anbieter wie Ryanair, Lufthansa, Booking.com und viele mehr — und zeigen dir die günstigsten Flüge, Hotels und Pauschalreisen." },
    { q: "Sind die angezeigten Preise garantiert?", a: "Wir zeigen dir Richtwerte von unseren Partnern. Die Preise können sich im Laufe des Tages ändern. Deshalb zeigen wir die Preise mit ‚ab ~XX€' und du siehst beim Klick auf den Anbieter den finalen Preis." },
    { q: "Kostet die Nutzung etwas?", a: "Nein. Die Nutzung ist 100% kostenlos. Wir verdienen eine kleine Provision, wenn du über unseren Link beim Anbieter buchst — der Preis bleibt für dich gleich." },
    { q: "Kann ich direkt bei Tripora24 buchen?", a: "Wir leiten dich zur Buchung direkt zum jeweiligen Anbieter weiter (Ryanair, Lufthansa, Booking.com etc.). Dort schließt du den Vertrag ab." },
    { q: "Wie finde ich den günstigsten Flug?", a: "Sei flexibel bei Datum und Flughafen. Nutze unsere ‚Flexible Reisedaten' Funktion. Buche 6-8 Wochen vor Abflug. Vermeide Wochenenden und Schulferien." },
    { q: "Wie kann ich einen Preis-Alert setzen?", a: "Geh auf die Preis-Alerts Seite, gib deine Wunschstrecke und E-Mail ein. Wir benachrichtigen dich automatisch, sobald der Preis fällt. Kostenlos." },
    { q: "Welche Airlines werden durchsucht?", a: "Über 500 Airlines weltweit — von Ryanair, Wizz Air und Eurowings bis Lufthansa, Emirates und Singapore Airlines." },
    { q: "Wie aktuell sind die Preise?", a: "Wir aktualisieren regelmäßig über unsere Partner-API. Beim Klick auf den Anbieter siehst du immer den tagesaktuellen Endpreis." },
  ],
  en: [
    { q: "How does Tripora24 work?", a: "Tripora24 is a travel search engine. We search hundreds of providers like Ryanair, Lufthansa, Booking.com simultaneously — and show you the cheapest flights, hotels and holiday packages." },
    { q: "Are the displayed prices guaranteed?", a: "We show you estimates from our partners. Prices can change throughout the day. That's why we show prices with 'from ~XX€' and you'll see the final price when clicking through to the provider." },
    { q: "Does it cost anything to use?", a: "No. Usage is 100% free. We earn a small commission when you book through our link — the price stays the same for you." },
    { q: "Can I book directly on Tripora24?", a: "We redirect you to the provider (Ryanair, Lufthansa, Booking.com etc.) for booking. You complete the purchase there." },
    { q: "How do I find the cheapest flight?", a: "Be flexible with dates and airports. Use our 'Flexible dates' feature. Book 6-8 weeks before departure. Avoid weekends and school holidays." },
    { q: "How can I set a price alert?", a: "Go to the Price Alerts page, enter your desired route and email. We'll notify you automatically when the price drops. Free." },
    { q: "Which airlines are searched?", a: "Over 500 airlines worldwide — from Ryanair, Wizz Air and EasyJet to Lufthansa, Emirates and Singapore Airlines." },
    { q: "How up-to-date are the prices?", a: "We update regularly via our partner API. When you click through to the provider, you always see the current final price." },
  ],
  es: [
    { q: "¿Cómo funciona Tripora24?", a: "Tripora24 es un buscador de viajes. Buscamos en cientos de proveedores como Ryanair, Lufthansa, Booking.com simultáneamente — y te mostramos los vuelos, hoteles y paquetes más baratos." },
    { q: "¿Los precios mostrados están garantizados?", a: "Te mostramos estimaciones de nuestros partners. Los precios pueden cambiar durante el día. Por eso mostramos precios con 'desde ~XX€' y verás el precio final al hacer clic en el proveedor." },
    { q: "¿Cuesta algo usar Tripora24?", a: "No. El uso es 100% gratuito. Ganamos una pequeña comisión cuando reservas a través de nuestro enlace — el precio no cambia para ti." },
    { q: "¿Puedo reservar directamente en Tripora24?", a: "Te redirigimos al proveedor (Ryanair, Lufthansa, Booking.com etc.) para la reserva. Completas la compra allí." },
    { q: "¿Cómo encuentro el vuelo más barato?", a: "Sé flexible con las fechas y aeropuertos. Usa nuestra función 'Fechas flexibles'. Reserva 6-8 semanas antes. Evita fines de semana y vacaciones escolares." },
    { q: "¿Cómo puedo crear una alerta de precio?", a: "Ve a la página de Alertas de Precio, introduce tu ruta y email. Te notificaremos automáticamente cuando el precio baje. Gratis." },
    { q: "¿Qué aerolíneas se buscan?", a: "Más de 500 aerolíneas en todo el mundo — desde Ryanair, Wizz Air y EasyJet hasta Lufthansa, Emirates y Singapore Airlines." },
    { q: "¿Qué tan actualizados están los precios?", a: "Actualizamos regularmente a través de nuestra API de partners. Al hacer clic en el proveedor, siempre ves el precio final actual." },
  ],
  fr: [
    { q: "Comment fonctionne Tripora24 ?", a: "Tripora24 est un moteur de recherche de voyages. Nous cherchons simultanément chez des centaines de fournisseurs comme Ryanair, Lufthansa, Booking.com — et vous montrons les vols, hôtels et séjours les moins chers." },
    { q: "Les prix affichés sont-ils garantis ?", a: "Nous vous montrons des estimations de nos partenaires. Les prix peuvent changer au cours de la journée. C'est pourquoi nous affichons les prix avec 'à partir de ~XX€' et vous verrez le prix final en cliquant chez le fournisseur." },
    { q: "L'utilisation coûte-t-elle quelque chose ?", a: "Non. L'utilisation est 100% gratuite. Nous gagnons une petite commission quand vous réservez via notre lien — le prix reste le même pour vous." },
    { q: "Puis-je réserver directement sur Tripora24 ?", a: "Nous vous redirigeons vers le fournisseur (Ryanair, Lufthansa, Booking.com etc.) pour la réservation. Vous finalisez l'achat là-bas." },
    { q: "Comment trouver le vol le moins cher ?", a: "Soyez flexible sur les dates et aéroports. Utilisez notre fonction 'Dates flexibles'. Réservez 6-8 semaines avant. Évitez les week-ends et vacances scolaires." },
    { q: "Comment créer une alerte prix ?", a: "Allez sur la page Alertes Prix, entrez votre itinéraire et email. Nous vous notifierons automatiquement quand le prix baisse. Gratuit." },
    { q: "Quelles compagnies sont recherchées ?", a: "Plus de 500 compagnies aériennes dans le monde — de Ryanair, Wizz Air et EasyJet à Lufthansa, Emirates et Singapore Airlines." },
    { q: "Les prix sont-ils à jour ?", a: "Nous mettons à jour régulièrement via notre API partenaire. En cliquant chez le fournisseur, vous voyez toujours le prix final actuel." },
  ],
}

export function FAQ() {
  const { locale, t } = useI18n()
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const faqs = FAQS[locale] || FAQS.de

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
    <section id="faq" className="container mx-auto px-4 py-14 md:py-16 scroll-mt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">{t("faq.title")}</h2>
          <p className="text-muted-foreground">{t("faq.subtitle")}</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <div
                key={i}
                className={`border rounded-xl bg-card overflow-hidden transition-colors ${
                  isOpen ? "border-foreground/20" : "border-border"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left cursor-pointer hover:bg-muted/40 transition-colors"
                >
                  <span className="font-semibold text-base pr-4 leading-snug">{faq.q}</span>
                  <ChevronDownIcon className={`h-5 w-5 text-muted-foreground shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                </button>
                <div
                  className="grid transition-all duration-200 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                      {faq.a}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Noch Fragen? <a href="mailto:contact@tripora24.com" className="text-primary font-semibold hover:underline underline-offset-2">Schreib uns</a>
          </p>
        </div>
      </div>
    </section>
  )
}
