"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Plane, Hotel, Package } from "lucide-react"
import { formatPrice } from "@/lib/utils"
import { calculateDealScore } from "@/lib/deal-engine/score"
import type { TrendingDeal } from "@/lib/deal-engine/mock-data"

const typeIcons = { flight: Plane, hotel: Hotel, package: Package }
const typeLabels = { flight: "Flug", hotel: "Hotel", package: "Pauschal" }

export function DealCard({ deal }: { deal: TrendingDeal }) {
  const dealScore = calculateDealScore(deal.price, deal.avgPrice)
  const Icon = typeIcons[deal.type]
  const badgeVariant = dealScore.score >= 50 ? "mega" : dealScore.score >= 25 ? "great" : dealScore.score >= 10 ? "good" : "normal"

  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 flex flex-col">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={deal.imageUrl}
          alt={deal.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Deal Badge */}
        <div className="absolute top-3 left-3">
          <Badge variant={badgeVariant} className="text-xs font-bold">
            {dealScore.label} {dealScore.score > 0 && `(-${dealScore.score}%)`}
          </Badge>
        </div>

        {/* Type Badge */}
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="gap-1 bg-white/90 text-foreground">
            <Icon className="h-3 w-3" />
            {typeLabels[deal.type]}
          </Badge>
        </div>

        {/* Price overlay */}
        <div className="absolute bottom-3 left-3">
          <div className="text-white">
            <span className="text-2xl font-bold">ab ~{formatPrice(deal.price)}</span>
            {deal.avgPrice > deal.price && (
              <span className="text-sm text-white/70 line-through ml-2">~{formatPrice(deal.avgPrice)}</span>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-lg">{deal.title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{deal.subtitle}</p>
        {deal.dates && <p className="text-xs text-muted-foreground mt-1">{deal.dates}</p>}

        <div className="mt-auto pt-4">
          <Link href={`/fluege?from=${deal.origin || "DE"}&to=${deal.destination || ""}&dep=${deal.dates?.split("–")[0]?.trim() || ""}`}>
            <Button className="w-full gap-2" variant="default">
              Deal ansehen <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  )
}
