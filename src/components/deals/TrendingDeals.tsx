"use client"

import { useEffect, useState } from "react"
import { MOCK_TRENDING_DEALS, type TrendingDeal } from "@/lib/deal-engine/mock-data"
import { DealCard } from "./DealCard"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon, FlameIcon, SpinnerIcon } from "@/components/ui/icons"
import Link from "next/link"

export function TrendingDeals() {
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
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FlameIcon className="h-5 w-5 text-orange-500" />
              <h2 className="text-2xl md:text-3xl font-bold">Trending Deals</h2>
            </div>
            <p className="text-muted-foreground">Die besten aktuellen Angebote — von unserer Deal-Engine gefunden</p>
          </div>
          <Link href="/deals">
            <Button variant="outline" className="gap-2 hidden md:flex">
              Alle Deals <ArrowRightIcon className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <SpinnerIcon className="h-8 w-8 text-primary mx-auto animate-spin" />
            <p className="text-sm text-muted-foreground mt-3">Deals werden geladen...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deals.slice(0, 6).map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>
        )}

        <div className="mt-8 text-center md:hidden">
          <Link href="/deals">
            <Button variant="outline" className="gap-2">
              Alle Deals ansehen <ArrowRightIcon className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
