"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { MapPinIcon } from "@/components/ui/icons"
import { getCityImage } from "@/lib/utils/images"
import { useI18n } from "@/lib/i18n/context"

const DESTINATIONS = [
  { name: "Mallorca", code: "PMI", country: "Spanien", fromPrice: 49 },
  { name: "Antalya", code: "AYT", country: "Türkei", fromPrice: 159 },
  { name: "Kreta", code: "HER", country: "Griechenland", fromPrice: 89 },
  { name: "Barcelona", code: "BCN", country: "Spanien", fromPrice: 29 },
  { name: "Lissabon", code: "LIS", country: "Portugal", fromPrice: 69 },
  { name: "Hurghada", code: "HRG", country: "Ägypten", fromPrice: 199 },
]

export function PopularDestinations() {
  const { t } = useI18n()
  return (
    <section className="py-14 md:py-16 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">{t("popular.title")}</h2>
          <p className="text-muted-foreground">{t("popular.subtitle")}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {DESTINATIONS.map((dest) => (
            <Link key={dest.code} href={`/fluege?from=DE&to=${dest.code}`}>
              <Card className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
                <div className="relative h-32">
                  <img
                    src={getCityImage(dest.code)}
                    alt={dest.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-2 left-3 text-white">
                    <div className="font-semibold text-sm">{dest.name}</div>
                    <div className="text-xs text-white/80 flex items-center gap-1">
                      <MapPinIcon className="h-3 w-3" /> {dest.country}
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-3">
                    <div className="text-white text-xs">ab <span className="font-bold text-sm">~{dest.fromPrice}€</span></div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
