"use client"

import { useEffect, useState } from "react"
import { MOCK_TRENDING_DEALS, type TrendingDeal } from "@/lib/deal-engine/mock-data"
import { DealCard } from "./DealCard"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon } from "@/components/ui/icons"
import Link from "next/link"
import { useI18n } from "@/lib/i18n/context"

function DealSkeleton() {
  return (
    <div className="rounded-2xl border bg-card overflow-hidden">
      <div className="h-44 skeleton" />
      <div className="p-4 space-y-3">
        <div className="h-3 w-1/3 skeleton rounded" />
        <div className="flex justify-between items-end pt-2">
          <div className="h-7 w-20 skeleton rounded" />
          <div className="h-8 w-16 skeleton rounded" />
        </div>
      </div>
    </div>
  )
}

export function TrendingDeals() {
  const { t } = useI18n()
  const [deals, setDeals] = useState<TrendingDeal[]>(MOCK_TRENDING_DEALS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/deals/trending")
      .then((res) => res.json())
      .then((data) => {
        if (data.results?.length > 0) setDeals(data.results)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="py-14 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-1">{t("trending.title")}</h2>
            <p className="text-muted-foreground">{t("trending.subtitle")}</p>
          </div>
          <Link href="/deals" className="hidden md:block">
            <Button variant="outline" className="gap-2">
              {t("trending.allDeals")}
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <DealSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {deals.slice(0, 6).map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>
        )}

        <div className="mt-8 text-center md:hidden">
          <Link href="/deals">
            <Button variant="outline" className="gap-2 w-full sm:w-auto">
              Alle Deals ansehen <ArrowRightIcon className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
