"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { PlaneIcon, ClockIcon, ExternalLinkIcon } from "@/components/ui/icons"
import { formatPrice, formatDuration } from "@/lib/utils"
import { calculateDealScore } from "@/lib/deal-engine/score"
import type { FlightOffer } from "@/lib/deal-engine/mock-data"

export function FlightCard({ flight }: { flight: FlightOffer }) {
  const dealScore = calculateDealScore(flight.price, flight.avgPrice)
  const badgeVariant = dealScore.score >= 50 ? "mega" : dealScore.score >= 25 ? "great" : dealScore.score >= 10 ? "good" : "normal"
  const savings = flight.avgPrice - flight.price
  const savingsPct = Math.round((savings / flight.avgPrice) * 100)

  return (
    <Card className="p-4 md:p-6 hover:shadow-premium-lg hover:-translate-y-0.5 hover:border-primary/40 transition-all duration-300 overflow-hidden relative group">
      {/* Hot deal pulse on left edge */}
      {dealScore.score >= 25 && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-400 to-emerald-600" />
      )}

      <div className="flex flex-col md:flex-row md:items-center gap-4">
        {/* Airline Info */}
        <div className="flex items-center gap-3 md:w-36 shrink-0">
          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center overflow-hidden ring-1 ring-border">
            <img src={flight.airlineLogo} alt={flight.airline} className="w-8 h-8 rounded object-contain" />
          </div>
          <div>
            <div className="font-semibold text-sm">{flight.airline}</div>
            <div className="text-xs text-muted-foreground">{flight.cabinClass}</div>
          </div>
        </div>

        {/* Flight Details */}
        <div className="flex-1 space-y-3">
          {/* Outbound */}
          <div className="flex items-center gap-3">
            <div className="text-right w-16">
              <div className="font-bold text-lg leading-tight">{flight.departureTime}</div>
              <div className="text-xs text-muted-foreground font-medium">{flight.origin}</div>
            </div>
            <div className="flex-1 flex flex-col items-center">
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                <ClockIcon className="h-3 w-3" /> {formatDuration(flight.duration)}
              </div>
              <div className="w-full flex items-center gap-1 my-0.5">
                <div className="h-px flex-1 bg-border" />
                <PlaneIcon className="h-3 w-3 text-primary group-hover:translate-x-1 transition-transform duration-500" />
                <div className="h-px flex-1 bg-border" />
              </div>
              <div className="text-xs text-muted-foreground">
                {flight.stops === 0 ? (
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Nonstop</span>
                ) : (
                  <>
                    {flight.stops} Stopp{flight.stops > 1 ? "s" : ""}
                    {flight.stopCities && ` (${flight.stopCities.join(", ")})`}
                  </>
                )}
              </div>
            </div>
            <div className="w-16">
              <div className="font-bold text-lg leading-tight">{flight.arrivalTime}</div>
              <div className="text-xs text-muted-foreground font-medium">{flight.destination}</div>
            </div>
          </div>

          {/* Return */}
          {flight.returnDepartureTime && (
            <>
              <Separator />
              <div className="flex items-center gap-3">
                <div className="text-right w-16">
                  <div className="font-bold text-lg leading-tight">{flight.returnDepartureTime}</div>
                  <div className="text-xs text-muted-foreground font-medium">{flight.destination}</div>
                </div>
                <div className="flex-1 flex flex-col items-center">
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <ClockIcon className="h-3 w-3" /> {formatDuration(flight.returnDuration || flight.duration)}
                  </div>
                  <div className="w-full flex items-center gap-1 my-0.5">
                    <div className="h-px flex-1 bg-border" />
                    <PlaneIcon className="h-3 w-3 text-primary rotate-180 group-hover:-translate-x-1 transition-transform duration-500" />
                    <div className="h-px flex-1 bg-border" />
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {(flight.returnStops ?? flight.stops) === 0 ? (
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Nonstop</span>
                    ) : (
                      <>{flight.returnStops ?? flight.stops} Stopp</>
                    )}
                  </div>
                </div>
                <div className="w-16">
                  <div className="font-bold text-lg leading-tight">{flight.returnArrivalTime}</div>
                  <div className="text-xs text-muted-foreground font-medium">{flight.origin}</div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Price & Deal */}
        <div className="flex md:flex-col items-center md:items-end gap-3 md:gap-2 md:w-44 shrink-0 md:border-l md:pl-5">
          <Badge variant={badgeVariant} className="text-xs">
            {dealScore.label}
          </Badge>
          <div className="text-right">
            {savings > 0 && (
              <div className="flex items-center gap-1.5 justify-end">
                <span className="text-xs text-muted-foreground line-through">{formatPrice(flight.avgPrice)}</span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-900/40 dark:text-emerald-400 px-1.5 py-0.5 rounded">
                  -{savingsPct}%
                </span>
              </div>
            )}
            <div className="text-2xl font-extrabold text-primary leading-none mt-0.5">{formatPrice(flight.price)}</div>
            <div className="text-xs text-muted-foreground mt-0.5">pro Person</div>
          </div>
          <a href={flight.bookingUrl} target="_blank" rel="noopener noreferrer" className="w-full md:w-auto">
            <Button className="gap-2 w-full md:w-auto group/btn shadow-sm" size="sm">
              Buchen
              <ExternalLinkIcon className="h-3 w-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </Button>
          </a>
        </div>
      </div>
    </Card>
  )
}
