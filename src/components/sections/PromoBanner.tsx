"use client"

import Link from "next/link"
import { ArrowRightIcon } from "@/components/ui/icons"
import { useI18n } from "@/lib/i18n/context"

export function PromoBanner() {
  const { t } = useI18n()

  return (
    <section className="container mx-auto px-4 py-10">
      <div className="relative overflow-hidden rounded-2xl bg-[#0a3d6e] shadow-lg">
        <div className="relative grid md:grid-cols-2 gap-6 items-center p-8 md:p-12">
          <div className="text-white">
            <div className="inline-flex items-center bg-white/10 px-3 py-1 rounded-full text-xs font-medium mb-4 text-white/90">
              {t("promo.badge")}
            </div>
            <h2 className="text-2xl md:text-4xl font-bold mb-3 leading-tight">
              {t("promo.title")}
            </h2>
            <p className="text-blue-100/80 mb-6 text-base">
              {t("promo.subtitle")}
            </p>
            <Link href="/blog/guenstig-reisen">
              <button className="inline-flex items-center gap-2 bg-white text-[#0a3d6e] font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer">
                {t("promo.cta")}
                <ArrowRightIcon className="h-4 w-4" />
              </button>
            </Link>
          </div>

          <div className="relative h-48 md:h-56 rounded-xl overflow-hidden hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop"
              alt="Travel"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
