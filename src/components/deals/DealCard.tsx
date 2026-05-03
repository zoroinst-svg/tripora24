"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon, PlaneIcon, HotelIcon, PackageIcon } from "@/components/ui/icons"
import { formatPrice } from "@/lib/utils"
import type { TrendingDeal } from "@/lib/deal-engine/mock-data"

const typeIcons = { flight: PlaneIcon, hotel: HotelIcon, package: PackageIcon }
const typeLabels = { flight: "Flug", hotel: "Hotel", package: "Pauschal" }

export function DealCard({ deal }: { deal: TrendingDeal }) {
  const Icon = typeIcons[deal.type]

  const params = new URLSearchParams()
  if (deal.origin) params.set("from", deal.origin)
  if (deal.destination) params.set("to", deal.destination)
  if (deal.departureDate) params.set("dep", deal.departureDate)
  if (deal.returnDate) params.set("ret", deal.returnDate)
  const dealUrl = `/fluege?${params.toString()}`

  return (
    <Link href={dealUrl} className="block h-full">
      <Card className="overflow-hidden group hover:shadow-lg transition-shadow flex flex-col h-full">
        <div className="relative h-44 overflow-hidden">
          <img
            src={deal.imageUrl}
            alt={deal.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="gap-1 bg-white/95 dark:bg-black/70 text-foreground">
              <Icon className="h-3 w-3" />
              {typeLabels[deal.type]}
            </Badge>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white font-semibold text-base leading-tight">{deal.title}</h3>
            <p className="text-white/80 text-xs mt-0.5">{deal.subtitle}</p>
          </div>
        </div>

        <div className="p-4 flex flex-col flex-1">
          {deal.dates && (
            <p className="text-xs text-muted-foreground mb-3">{deal.dates}</p>
          )}

          <div className="flex items-end justify-between mt-auto">
            <div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">ab</div>
              <div className="text-2xl font-bold text-primary leading-none">~{formatPrice(deal.price)}</div>
            </div>
            <Button size="sm" className="gap-1">
              Ansehen
              <ArrowRightIcon className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  )
}
