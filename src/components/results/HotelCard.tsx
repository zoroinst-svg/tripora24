"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { StarIcon, MapPinIcon, ExternalLinkIcon, CheckIcon } from "@/components/ui/icons"
import { formatPrice } from "@/lib/utils"
import { calculateDealScore } from "@/lib/deal-engine/score"
import type { HotelOffer } from "@/lib/deal-engine/mock-data"

export function HotelCard({ hotel }: { hotel: HotelOffer }) {
  const dealScore = calculateDealScore(hotel.pricePerNight, hotel.avgPricePerNight)
  const badgeVariant = dealScore.score >= 50 ? "mega" : dealScore.score >= 25 ? "great" : dealScore.score >= 10 ? "good" : "normal"
  const savings = hotel.avgPricePerNight - hotel.pricePerNight
  const savingsPct = savings > 0 ? Math.round((savings / hotel.avgPricePerNight) * 100) : 0

  return (
    <Card className="overflow-hidden hover:shadow-premium-lg hover:-translate-y-0.5 hover:border-primary/40 transition-all duration-300 group">
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="relative md:w-72 h-52 md:h-auto shrink-0 overflow-hidden">
          <img
            src={hotel.imageUrl}
            alt={hotel.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent md:hidden" />
          <div className="absolute top-3 left-3">
            <Badge variant={badgeVariant} className="text-xs shadow">
              {dealScore.label}
            </Badge>
          </div>
          {savingsPct > 0 && (
            <div className="absolute top-3 right-3 bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow">
              -{savingsPct}%
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-4 md:p-5 flex flex-col">
          <div className="flex-1">
            {/* Title & Stars */}
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-bold text-lg md:text-xl leading-tight group-hover:text-primary transition-colors">{hotel.name}</h3>
                <div className="flex items-center gap-2 mt-1.5">
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
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-extrabold text-base shadow">
                  {hotel.rating}
                </div>
                <div className="text-[10px] text-muted-foreground mt-1">{hotel.reviewCount.toLocaleString("de-DE")} Bew.</div>
              </div>
            </div>

            {/* Meal Plan & Amenities */}
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge variant="secondary">{hotel.mealPlan}</Badge>
              {hotel.freeCancel && (
                <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800 gap-1">
                  <CheckIcon className="h-3 w-3" /> Kostenlose Stornierung
                </Badge>
              )}
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {hotel.amenities.slice(0, 5).map((a) => (
                <span key={a} className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">{a}</span>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="flex items-end justify-between mt-4 pt-3 border-t border-border/60">
            <div>
              <span className="text-xs text-muted-foreground">{hotel.nights} Nächte</span>
              {hotel.avgPricePerNight > hotel.pricePerNight && (
                <span className="text-sm text-muted-foreground line-through ml-2">{formatPrice(hotel.avgPricePerNight)}/N.</span>
              )}
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">{formatPrice(hotel.pricePerNight)} / Nacht</div>
              <div className="text-2xl md:text-3xl font-extrabold text-primary leading-none mt-0.5">{formatPrice(hotel.totalPrice)}</div>
              <a href={hotel.bookingUrl} target="_blank" rel="noopener noreferrer">
                <Button className="mt-2 gap-2 group/btn shadow-sm" size="sm">
                  Hotel ansehen
                  <ExternalLinkIcon className="h-3 w-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
