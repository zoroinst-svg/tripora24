import Link from "next/link"
import { Plane } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-blue-400 text-white">
                <Plane className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold">Tripora<span className="text-primary">24</span></span>
            </div>
            <p className="text-sm text-muted-foreground">
              Deine Reise-Suchmaschine — 24/7 die besten Flüge, Hotels und Pauschalreisen. Automatisch und in Echtzeit.
            </p>
          </div>

          {/* Suchen */}
          <div className="space-y-3">
            <h4 className="font-semibold">Suchen</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link href="/fluege" className="hover:text-foreground transition-colors">Flüge</Link>
              <Link href="/hotels" className="hover:text-foreground transition-colors">Hotels</Link>
              <Link href="/pauschalreisen" className="hover:text-foreground transition-colors">Pauschalreisen</Link>
              <Link href="/deals" className="hover:text-foreground transition-colors">Top Deals</Link>
            </div>
          </div>

          {/* Beliebte Ziele */}
          <div className="space-y-3">
            <h4 className="font-semibold">Beliebte Ziele</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link href="/fluege?to=PMI" className="hover:text-foreground transition-colors">Mallorca</Link>
              <Link href="/fluege?to=AYT" className="hover:text-foreground transition-colors">Antalya</Link>
              <Link href="/fluege?to=HER" className="hover:text-foreground transition-colors">Kreta</Link>
              <Link href="/fluege?to=BCN" className="hover:text-foreground transition-colors">Barcelona</Link>
              <Link href="/fluege?to=LIS" className="hover:text-foreground transition-colors">Lissabon</Link>
            </div>
          </div>

          {/* Info */}
          <div className="space-y-3">
            <h4 className="font-semibold">Info</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link href="/alerts" className="hover:text-foreground transition-colors">Preis-Alerts</Link>
              <Link href="/impressum" className="hover:text-foreground transition-colors">Impressum</Link>
              <Link href="/datenschutz" className="hover:text-foreground transition-colors">Datenschutz</Link>
              <a href="mailto:kontakt@tripora24.com" className="hover:text-foreground transition-colors">Kontakt</a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Tripora24. Alle Preise inkl. Steuern und Gebühren. Preisänderungen vorbehalten.</p>
        </div>
      </div>
    </footer>
  )
}
