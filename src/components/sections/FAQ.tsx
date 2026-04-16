"use client"

import { useState } from "react"
import { ChevronDownIcon } from "@/components/ui/icons"

const FAQS = [
  {
    q: "Wie funktioniert Tripora24?",
    a: "Tripora24 ist eine Reise-Suchmaschine. Wir durchsuchen für dich gleichzeitig hunderte Anbieter wie Ryanair, Lufthansa, Booking.com und viele mehr — und zeigen dir die günstigsten Flüge, Hotels und Pauschalreisen. Du klickst dich nicht durch zig Seiten, sondern findest alles auf einen Blick.",
  },
  {
    q: "Sind die angezeigten Preise garantiert?",
    a: "Wir zeigen dir Richtwerte, die wir von unseren Partnern erhalten. Die Preise können sich im Laufe des Tages ändern — Airlines passen ihre Preise oft mehrmals täglich an. Deshalb zeigen wir die Preise mit ‚ab ~XX€' und du siehst beim Klick auf den Anbieter den finalen Preis.",
  },
  {
    q: "Kostet die Nutzung von Tripora24 etwas?",
    a: "Nein. Die Nutzung ist 100% kostenlos. Wir verdienen eine kleine Provision, wenn du über unseren Link beim Anbieter buchst — der Preis bleibt für dich aber gleich. So können wir die Plattform kostenlos für dich anbieten.",
  },
  {
    q: "Kann ich Flüge direkt bei Tripora24 buchen?",
    a: "Wir sind eine Suchmaschine, kein Reisebüro. Wir leiten dich zur Buchung direkt zum jeweiligen Anbieter weiter (Ryanair, Lufthansa, Booking.com etc.). Dort schließt du den Vertrag ab und erhältst auch den Kundenservice.",
  },
  {
    q: "Wie finde ich den günstigsten Flug?",
    a: "Sei flexibel bei Datum und Flughafen. Nutze unsere ‚Flexible Reisedaten' Funktion, um die günstigsten Tage zu finden. Buche idealerweise 6-8 Wochen vor Abflug. Vermeide Wochenenden und Schulferien. Mit unserem Preis-Alert wirst du benachrichtigt, sobald der Preis fällt.",
  },
  {
    q: "Wie kann ich einen Preis-Alert setzen?",
    a: "Geh auf die Preis-Alerts Seite, gib deine Wunschstrecke und deine E-Mail ein. Wir benachrichtigen dich dann automatisch, sobald der Preis für deine Strecke fällt. Komplett kostenlos.",
  },
  {
    q: "Welche Airlines werden durchsucht?",
    a: "Wir durchsuchen über 500 Airlines weltweit — von Ryanair, Wizz Air und Eurowings bis hin zu Lufthansa, Emirates und Singapore Airlines. Auch kleinere Regional-Airlines sind dabei. Damit findest du wirklich alle verfügbaren Flüge.",
  },
  {
    q: "Wie aktuell sind die Preise?",
    a: "Wir aktualisieren die Preise regelmäßig über unsere Partner-API. Da Preise sich aber sekündlich ändern können, zeigen wir Richtwerte. Beim Klick auf den Anbieter siehst du immer den tagesaktuellen Endpreis.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="container mx-auto px-4 py-16 scroll-mt-20">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Häufige Fragen</h2>
        <p className="text-muted-foreground mb-8">Alles was du über Tripora24 wissen musst</p>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className={`border rounded-2xl bg-card transition-all ${openIndex === i ? "shadow-md" : ""}`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left cursor-pointer hover:bg-muted/50 rounded-2xl transition-colors"
              >
                <span className="font-semibold text-base pr-4">{faq.q}</span>
                <ChevronDownIcon
                  className={`h-5 w-5 text-muted-foreground shrink-0 transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}`}
                />
              </button>
              {openIndex === i && (
                <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed animate-fade-in">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
