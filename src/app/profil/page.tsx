"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, Heart, Plane, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function ProfilPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Mein Tripora24</h1>

      <Card className="mb-6 text-center p-8">
        <Plane className="h-12 w-12 text-primary mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Bald verfügbar</h3>
        <p className="text-muted-foreground text-sm mb-6 max-w-sm mx-auto">
          Demnächst kannst du hier deine Preis-Alerts verwalten, Suchen speichern und personalisierte Deals erhalten.
        </p>
        <div className="flex gap-3 justify-center">
          <Link href="/alerts">
            <Button variant="outline" className="gap-2">
              <Bell className="h-4 w-4" /> Preis-Alert erstellen
            </Button>
          </Link>
          <Link href="/fluege?from=DE">
            <Button className="gap-2">
              <Plane className="h-4 w-4" /> Flüge entdecken <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </Card>

      <div className="grid gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30 shrink-0">
              <Bell className="h-5 w-5 text-orange-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium">Preis-Alerts</h4>
              <p className="text-sm text-muted-foreground">Werde benachrichtigt wenn Preise fallen</p>
            </div>
            <Link href="/alerts"><Button variant="outline" size="sm">Erstellen</Button></Link>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 shrink-0">
              <Heart className="h-5 w-5 text-red-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium">Favoriten & Suchhistorie</h4>
              <p className="text-sm text-muted-foreground">Kommt bald — deine gespeicherten Suchen</p>
            </div>
            <Button variant="outline" size="sm" disabled>Bald</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
