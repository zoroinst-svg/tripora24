"use client"

import Link from "next/link"
import { MapPinIcon, ArrowRightIcon } from "@/components/ui/icons"
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
    <section className="relative py-16 md:py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-12 reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3 border border-primary/20">
            <MapPinIcon className="h-3.5 w-3.5" />
            Top Destinationen
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">{t("popular.title")}</h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">{t("popular.subtitle")}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {DESTINATIONS.map((dest, i) => (
            <Link
              key={dest.code}
              href={`/fluege?from=DE&to=${dest.code}`}
              className="reveal-scale group block"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-premium hover:shadow-premium-lg transition-all duration-500 hover:-translate-y-1">
                <div className="relative h-40 md:h-44 overflow-hidden">
                  <img
                    src={getCityImage(dest.code)}
                    alt={dest.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[700ms] ease-out"
                  />
                  {/* Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                  {/* Top-right price chip */}
                  <div className="absolute top-2.5 right-2.5 bg-white/95 dark:bg-black/80 backdrop-blur-md rounded-full px-2.5 py-1 shadow-lg">
                    <div className="text-[9px] text-muted-foreground leading-none">ab</div>
                    <div className="text-[11px] font-extrabold text-primary leading-tight">{dest.fromPrice}€</div>
                  </div>

                  {/* Bottom info */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-bold text-base md:text-lg leading-tight drop-shadow">{dest.name}</div>
                        <div className="text-[11px] text-white/80 flex items-center gap-1 mt-0.5">
                          <MapPinIcon className="h-3 w-3" /> {dest.country}
                        </div>
                      </div>
                      <ArrowRightIcon className="h-4 w-4 text-white opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2 transition-all duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
