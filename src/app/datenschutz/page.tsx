import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
}

export default function DatenschutzPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl prose dark:prose-invert">
      <h1>Datenschutzerklärung</h1>

      <h2>1. Datenschutz auf einen Blick</h2>
      <h3>Allgemeine Hinweise</h3>
      <p>
        Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten
        passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich
        identifiziert werden können.
      </p>

      <h3>Datenerfassung auf dieser Website</h3>
      <p>
        <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
        Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten
        können Sie dem Impressum dieser Website entnehmen.
      </p>

      <h2>2. Hosting</h2>
      <p>
        Wir hosten die Inhalte unserer Website bei Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA.
        Vercel verarbeitet Daten auch in den USA. Die USA gelten nach Auffassung des EuGH als ein Land mit einem
        unzureichenden Datenschutzniveau. Vercel hat sich jedoch dem EU-US Data Privacy Framework angeschlossen.
      </p>

      <h2>3. Allgemeine Hinweise und Pflichtinformationen</h2>
      <h3>Datenschutz</h3>
      <p>
        Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre
        personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser
        Datenschutzerklärung.
      </p>

      <h2>4. Datenerfassung auf dieser Website</h2>
      <h3>Cookies</h3>
      <p>
        Unsere Internetseiten verwenden teilweise so genannte Cookies. Cookies richten auf Ihrem Rechner keinen
        Schaden an und enthalten keine Viren. Cookies dienen dazu, unser Angebot nutzerfreundlicher, effektiver
        und sicherer zu machen.
      </p>
      <p>
        Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden und
        Cookies nur im Einzelfall erlauben. Bei der Deaktivierung von Cookies kann die Funktionalität dieser
        Website eingeschränkt sein.
      </p>

      <h3>Server-Log-Dateien</h3>
      <p>
        Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien,
        die Ihr Browser automatisch an uns übermittelt. Dies sind: Browsertyp und Browserversion, verwendetes
        Betriebssystem, Referrer URL, Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage und IP-Adresse.
      </p>

      <h2>5. Affiliate-Partner</h2>
      <p>
        Wir arbeiten mit verschiedenen Reise-Affiliate-Partnern zusammen (z.B. Travelpayouts, Booking.com).
        Wenn Sie über unsere Links eine Buchung vornehmen, wird der jeweilige Partner über einen Tracking-Link
        informiert. Dies dient der korrekten Zuordnung der Vermittlungsprovision. Der Preis für Sie ändert sich
        dadurch nicht.
      </p>

      <h2>6. Ihre Rechte</h2>
      <p>
        Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten,
        deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung oder
        Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit
        an uns wenden: kontakt@tripora24.com
      </p>
    </div>
  )
}
