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
      <Card className="overflow-hidden group hover:shadow-premium-lg hover:-translate-y-1.5 transition-all duration-500 flex flex-col h-full border-border/60 hover:border-primary/40">
        <div className="relative h-48 overflow-hidden">
          <img
            src={deal.imageUrl}
            alt={deal.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[700ms] ease-out"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          {/* Shine effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/0 to-white/0 group-hover:via-white/20 transition-all duration-700 -translate-x-full group-hover:translate-x-full" />

          <div className="absolute top-3 right-3 flex flex-col gap-2 items-end">
            <Badge variant="secondary" className="gap-1 bg-white/95 dark:bg-black/80 backdrop-blur text-foreground shadow">
              <Icon className="h-3 w-3" />
              {typeLabels[deal.type]}
            </Badge>
          </div>

          {/* Heat indicator (deal score) */}
          <div className="absolute top-3 left-3">
            <div className="flex items-center gap-1 bg-orange-500/95 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-75 animate-ping" />
                <span className="relative rounded-full h-1.5 w-1.5 bg-white" />
              </span>
              Hot Deal
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white font-bold text-lg leading-tight drop-shadow-lg">{deal.title}</h3>
            <p className="text-white/85 text-xs mt-0.5 drop-shadow">{deal.subtitle}</p>
          </div>
        </div>

        <div className="p-4 md:p-5 flex flex-col flex-1 bg-card">
          {deal.dates && (
            <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1.5">
              <span className="inline-block w-1 h-1 rounded-full bg-muted-foreground/50" />
              {deal.dates}
            </p>
          )}

          <div className="flex items-end justify-between mt-auto">
            <div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">ab</div>
              <div className="text-2xl md:text-3xl font-extrabold text-primary leading-none">~{formatPrice(deal.price)}</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">pro Person</div>
            </div>
            <Button size="sm" className="gap-1 group/btn shadow-sm">
              Ansehen
              <ArrowRightIcon className="h-3 w-3 group-hover/btn:translate-x-0.5 transition-transform" />
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  )
}
