"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { StarIcon, MapPinIcon, ExternalLinkIcon, CheckIcon } from "@/components/ui/icons"
import { Wifi, Waves, Utensils } from "lucide-react" // These 3 have no Heroicon equivalent
import { formatPrice } from "@/lib/utils"
import { calculateDealScore } from "@/lib/deal-engine/score"
import type { HotelOffer } from "@/lib/deal-engine/mock-data"

const amenityIcons: Record<string, typeof Wifi> = {
  WLAN: Wifi,
  Pool: Waves,
  Restaurant: Utensils,
}

export function HotelCard({ hotel }: { hotel: HotelOffer }) {
  const dealScore = calculateDealScore(hotel.pricePerNight, hotel.avgPricePerNight)
  const badgeVariant = dealScore.score >= 50 ? "mega" : dealScore.score >= 25 ? "great" : dealScore.score >= 10 ? "good" : "normal"

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="relative md:w-72 h-48 md:h-auto shrink-0">
          <img src={hotel.imageUrl} alt={hotel.name} className="w-full h-full object-cover" />
          <div className="absolute top-3 left-3">
            <Badge variant={badgeVariant} className="text-xs">
              {dealScore.label}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 md:p-5 flex flex-col">
          <div className="flex-1">
            {/* Title & Stars */}
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold text-lg leading-tight">{hotel.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center">
                    {Array.from({ length: hotel.stars }).map((_, i) => (
                      <StarIcon key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPinIcon className="h-3 w-3" /> {hotel.distanceToCenter}
                  </span>
                </div>
              </div>
              {/* Rating */}
              <div className="shrink-0 text-right">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground font-bold text-sm">
                  {hotel.rating}
                </div>
                <div className="text-xs text-muted-foreground mt-1">{hotel.reviewCount.toLocaleString("de-DE")} Bewertungen</div>
              </div>
            </div>

            {/* Meal Plan & Amenities */}
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge variant="secondary">{hotel.mealPlan}</Badge>
              {hotel.freeCancel && (
                <Badge variant="outline" className="text-green-600 border-green-200 gap-1">
                  <CheckIcon className="h-3 w-3" /> Kostenlose Stornierung
                </Badge>
              )}
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {hotel.amenities.slice(0, 5).map((a) => (
                <span key={a} className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">{a}</span>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="flex items-end justify-between mt-4 pt-3 border-t">
            <div>
              <span className="text-xs text-muted-foreground">{hotel.nights} Nächte</span>
              {hotel.avgPricePerNight > hotel.pricePerNight && (
                <span className="text-sm text-muted-foreground line-through ml-2">{formatPrice(hotel.avgPricePerNight)}/N.</span>
              )}
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">{formatPrice(hotel.pricePerNight)} / Nacht</div>
              <div className="text-2xl font-bold text-primary">{formatPrice(hotel.totalPrice)}</div>
              <a href={hotel.bookingUrl} target="_blank" rel="noopener noreferrer">
                <Button className="mt-2 gap-2" size="sm">
                  Hotel ansehen <ExternalLinkIcon className="h-3 w-3" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
