"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BellIcon, MailIcon, CheckIcon, PlaneIcon, ArrowRightIcon } from "@/components/ui/icons"
import Link from "next/link"
import { useI18n } from "@/lib/i18n/context"

export default function AlertsPage() {
  const { t } = useI18n()
  const [email, setEmail] = useState("")
  const [route, setRoute] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (email && route) setSubmitted(true)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <BellIcon className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{t("alerts.title")}</h1>
          <p className="text-muted-foreground text-sm">{t("alerts.subtitle")}</p>
        </div>
      </div>

      {!submitted ? (
        <>
          <Card className="mb-6">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold text-lg">{t("alerts.createAlert")}</h3>
              <p className="text-sm text-muted-foreground">{t("alerts.createAlertDesc")}</p>

              <div>
                <label className="text-sm font-medium mb-1 block">{t("alerts.route")}</label>
                <Input value={route} onChange={(e) => setRoute(e.target.value)} placeholder={t("alerts.routePlaceholder")} />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">{t("alerts.email")}</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder={t("alerts.emailPlaceholder")} className="pl-10" />
                  </div>
                  <Button onClick={handleSubmit} disabled={!email || !route} className="gap-2">
                    <BellIcon className="h-4 w-4" /> {t("alerts.createBtn")}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-muted/30">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3">{t("alerts.howItWorks")}</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex gap-3"><div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-xs font-bold text-primary">1</div><span>{t("alerts.step1")}</span></div>
                <div className="flex gap-3"><div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-xs font-bold text-primary">2</div><span>{t("alerts.step2")}</span></div>
                <div className="flex gap-3"><div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-xs font-bold text-primary">3</div><span>{t("alerts.step3")}</span></div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground mb-3">{t("alerts.meanwhile")}</p>
            <Link href="/fluege?from=DE">
              <Button variant="outline" className="gap-2">
                <PlaneIcon className="h-4 w-4" /> {t("alerts.discoverFlights")} <ArrowRightIcon className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </>
      ) : (
        <Card className="text-center p-8">
          <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
            <CheckIcon className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold mb-2">{t("alerts.created")}</h3>
          <p className="text-muted-foreground mb-6">{t("alerts.createdDesc", { email, route })}</p>
          <div className="flex gap-3 justify-center">
            <Button onClick={() => { setSubmitted(false); setEmail(""); setRoute("") }} variant="outline">
              {t("alerts.createAnother")}
            </Button>
            <Link href="/fluege?from=DE">
              <Button className="gap-2"><PlaneIcon className="h-4 w-4" /> {t("alerts.searchFlights")}</Button>
            </Link>
          </div>
        </Card>
      )}
    </div>
  )
}
