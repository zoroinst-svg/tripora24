"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Plane, Clock, ArrowRight, ExternalLink } from "lucide-react"
import { formatPrice, formatDuration } from "@/lib/utils"
import { calculateDealScore } from "@/lib/deal-engine/score"
import type { FlightOffer } from "@/lib/deal-engine/mock-data"

export function FlightCard({ flight }: { flight: FlightOffer }) {
  const dealScore = calculateDealScore(flight.price, flight.avgPrice)
  const badgeVariant = dealScore.score >= 50 ? "mega" : dealScore.score >= 25 ? "great" : dealScore.score >= 10 ? "good" : "normal"

  return (
    <Card className="p-4 md:p-6 hover:shadow-lg transition-shadow">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        {/* Airline Info */}
        <div className="flex items-center gap-3 md:w-36 shrink-0">
          <img src={flight.airlineLogo} alt={flight.airline} className="w-8 h-8 rounded" />
          <div>
            <div className="font-medium text-sm">{flight.airline}</div>
            <div className="text-xs text-muted-foreground">{flight.cabinClass}</div>
          </div>
        </div>

        {/* Flight Details */}
        <div className="flex-1 space-y-3">
          {/* Outbound */}
          <div className="flex items-center gap-3">
            <div className="text-right w-16">
              <div className="font-bold text-lg">{flight.departureTime}</div>
              <div className="text-xs text-muted-foreground">{flight.origin}</div>
            </div>
            <div className="flex-1 flex flex-col items-center">
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" /> {formatDuration(flight.duration)}
              </div>
              <div className="w-full flex items-center gap-1">
                <div className="h-px flex-1 bg-border" />
                <Plane className="h-3 w-3 text-primary" />
                <div className="h-px flex-1 bg-border" />
              </div>
              <div className="text-xs text-muted-foreground">
                {flight.stops === 0 ? "Nonstop" : `${flight.stops} Stopp${flight.stops > 1 ? "s" : ""}`}
                {flight.stopCities && ` (${flight.stopCities.join(", ")})`}
              </div>
            </div>
            <div className="w-16">
              <div className="font-bold text-lg">{flight.arrivalTime}</div>
              <div className="text-xs text-muted-foreground">{flight.destination}</div>
            </div>
          </div>

          {/* Return */}
          {flight.returnDepartureTime && (
            <>
              <Separator />
              <div className="flex items-center gap-3">
                <div className="text-right w-16">
                  <div className="font-bold text-lg">{flight.returnDepartureTime}</div>
                  <div className="text-xs text-muted-foreground">{flight.destination}</div>
                </div>
                <div className="flex-1 flex flex-col items-center">
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {formatDuration(flight.returnDuration || flight.duration)}
                  </div>
                  <div className="w-full flex items-center gap-1">
                    <div className="h-px flex-1 bg-border" />
                    <Plane className="h-3 w-3 text-primary rotate-180" />
                    <div className="h-px flex-1 bg-border" />
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {(flight.returnStops ?? flight.stops) === 0 ? "Nonstop" : `${flight.returnStops ?? flight.stops} Stopp`}
                  </div>
                </div>
                <div className="w-16">
                  <div className="font-bold text-lg">{flight.returnArrivalTime}</div>
                  <div className="text-xs text-muted-foreground">{flight.origin}</div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Price & Deal */}
        <div className="flex md:flex-col items-center md:items-end gap-3 md:gap-2 md:w-44 shrink-0">
          <Badge variant={badgeVariant} className="text-xs">
            {dealScore.label}
          </Badge>
          <div className="text-right">
            {flight.avgPrice > flight.price && (
              <div className="text-sm text-muted-foreground line-through">{formatPrice(flight.avgPrice)}</div>
            )}
            <div className="text-2xl font-bold text-primary">{formatPrice(flight.price)}</div>
            <div className="text-xs text-muted-foreground">pro Person</div>
          </div>
          <a href={flight.bookingUrl} target="_blank" rel="noopener noreferrer">
            <Button className="gap-2 w-full md:w-auto" size="sm">
              Buchen <ExternalLink className="h-3 w-3" />
            </Button>
          </a>
        </div>
      </div>
    </Card>
  )
}
