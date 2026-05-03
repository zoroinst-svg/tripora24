"use client"

import { useEffect, useState } from "react"
import { MOCK_TRENDING_DEALS, type TrendingDeal } from "@/lib/deal-engine/mock-data"
import { DealCard } from "./DealCard"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon, FlameIcon } from "@/components/ui/icons"
import Link from "next/link"
import { useI18n } from "@/lib/i18n/context"

function DealSkeleton() {
  return (
    <div className="rounded-xl border bg-card overflow-hidden">
      <div className="h-48 skeleton" />
      <div className="p-4 space-y-3">
        <div className="h-3 w-1/3 skeleton rounded" />
        <div className="h-5 w-3/4 skeleton rounded" />
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
    <section className="relative py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-8 md:mb-10 gap-4">
          <div className="reveal">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-semibold mb-3 border border-orange-500/20">
              <FlameIcon className="h-3.5 w-3.5" />
              Trending
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">{t("trending.title")}</h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl">{t("trending.subtitle")}</p>
          </div>
          <Link href="/deals" className="hidden md:block">
            <Button variant="outline" className="gap-2 group">
              {t("trending.allDeals")}
              <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <DealSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {deals.slice(0, 6).map((deal, i) => (
              <div
                key={deal.id}
                className="reveal-scale"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <DealCard deal={deal} />
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 text-center md:hidden">
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
