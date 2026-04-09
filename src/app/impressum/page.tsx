import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Impressum",
}

export default function ImpressumPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl prose dark:prose-invert">
      <h1>Impressum</h1>
      <h2>Angaben gemäß § 5 TMG</h2>
      <p>
        <span className="bg-yellow-200 dark:bg-yellow-900 px-1">DEIN NAME</span><br />
        <span className="bg-yellow-200 dark:bg-yellow-900 px-1">STRASSE + HAUSNUMMER</span><br />
        <span className="bg-yellow-200 dark:bg-yellow-900 px-1">PLZ + ORT</span><br />
        Deutschland
      </p>

      <h2>Kontakt</h2>
      <p>
        E-Mail: kontakt@tripora24.com
      </p>

      <h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
      <p>
        [Dein vollständiger Name]<br />
        [Adresse wie oben]
      </p>

      <h2>EU-Streitschlichtung</h2>
      <p>
        Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit.
        Unsere E-Mail-Adresse finden Sie oben im Impressum.
      </p>

      <h2>Haftungsausschluss</h2>
      <h3>Haftung für Inhalte</h3>
      <p>
        Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und
        Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG
        für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
      </p>

      <h3>Haftung für Links</h3>
      <p>
        Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben.
        Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
        Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
      </p>

      <h3>Affiliate-Hinweis</h3>
      <p>
        Tripora24 ist ein Preisvergleichsportal. Wenn Sie über unsere Links buchen, erhalten wir möglicherweise
        eine Provision vom Anbieter. Der Preis für Sie bleibt gleich. Dies beeinflusst nicht unsere Suchergebnisse
        oder Deal-Bewertungen.
      </p>
    </div>
  )
}
