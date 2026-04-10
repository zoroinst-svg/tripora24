"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Plane, Hotel, Package } from "lucide-react"
import { formatPrice } from "@/lib/utils"
import type { TrendingDeal } from "@/lib/deal-engine/mock-data"

const typeIcons = { flight: Plane, hotel: Hotel, package: Package }
const typeLabels = { flight: "Flug", hotel: "Hotel", package: "Pauschal" }

export function DealCard({ deal }: { deal: TrendingDeal }) {
  const Icon = typeIcons[deal.type]

  return (
    <Card className="overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={deal.imageUrl}
          alt={deal.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* Type Badge */}
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="gap-1 bg-white/90 dark:bg-black/70 backdrop-blur text-foreground">
            <Icon className="h-3 w-3" />
            {typeLabels[deal.type]}
          </Badge>
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-bold text-lg drop-shadow-lg">{deal.title}</h3>
          <p className="text-white/80 text-xs">{deal.subtitle}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {deal.dates && <p className="text-xs text-muted-foreground mb-3">{deal.dates}</p>}

        <div className="flex items-end justify-between mt-auto">
          <div>
            <div className="text-xs text-muted-foreground">ab</div>
            <div className="text-2xl font-bold text-primary">~{formatPrice(deal.price)}</div>
          </div>
          <Link href={`/fluege?from=${deal.origin || "DE"}&to=${deal.destination || ""}`}>
            <Button size="sm" className="gap-1">
              Ansehen <ArrowRight className="h-3 w-3" />
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  )
}
