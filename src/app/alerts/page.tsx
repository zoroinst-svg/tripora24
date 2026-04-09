"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bell, Mail, Check, Plane, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function AlertsPage() {
  const [email, setEmail] = useState("")
  const [route, setRoute] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (email && route) {
      setSubmitted(true)
      // TODO: Save to Supabase when connected
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <Bell className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Preis-Alerts</h1>
          <p className="text-muted-foreground text-sm">Werde benachrichtigt wenn Flugpreise fallen</p>
        </div>
      </div>

      {!submitted ? (
        <>
          <Card className="mb-6">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold text-lg">Preis-Alert erstellen</h3>
              <p className="text-sm text-muted-foreground">
                Gib deine Wunschroute und E-Mail ein — wir benachrichtigen dich sobald der Preis fällt.
              </p>

              <div>
                <label className="text-sm font-medium mb-1 block">Strecke</label>
                <Input value={route} onChange={(e) => setRoute(e.target.value)}
                  placeholder="z.B. Frankfurt nach Mallorca" />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">E-Mail</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input value={email} onChange={(e) => setEmail(e.target.value)}
                      type="email" placeholder="deine@email.de" className="pl-10" />
                  </div>
                  <Button onClick={handleSubmit} disabled={!email || !route} className="gap-2">
                    <Bell className="h-4 w-4" /> Alert erstellen
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-muted/30">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3">So funktioniert&apos;s</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-xs font-bold text-primary">1</div>
                  <span>Gib deine Wunschstrecke ein</span>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-xs font-bold text-primary">2</div>
                  <span>Wir überwachen den Preis 24/7</span>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-xs font-bold text-primary">3</div>
                  <span>Du bekommst eine E-Mail sobald der Preis fällt</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground mb-3">In der Zwischenzeit — entdecke unsere aktuellen Deals:</p>
            <Link href="/fluege?from=DE">
              <Button variant="outline" className="gap-2">
                <Plane className="h-4 w-4" /> Günstige Flüge entdecken <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </>
      ) : (
        <Card className="text-center p-8">
          <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold mb-2">Alert erstellt!</h3>
          <p className="text-muted-foreground mb-6">
            Wir benachrichtigen dich an <strong>{email}</strong> sobald Preise für <strong>{route}</strong> fallen.
          </p>
          <div className="flex gap-3 justify-center">
            <Button onClick={() => { setSubmitted(false); setEmail(""); setRoute("") }} variant="outline">
              Weiteren Alert erstellen
            </Button>
            <Link href="/fluege?from=DE">
              <Button className="gap-2">
                <Plane className="h-4 w-4" /> Jetzt Flüge suchen
              </Button>
            </Link>
          </div>
        </Card>
      )}
    </div>
  )
}
