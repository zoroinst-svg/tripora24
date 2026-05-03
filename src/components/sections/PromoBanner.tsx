"use client"

import Link from "next/link"
import { ArrowRightIcon, SparklesIcon, FlameIcon } from "@/components/ui/icons"
import { useI18n } from "@/lib/i18n/context"

export function PromoBanner() {
  const { t } = useI18n()

  return (
    <section className="container mx-auto px-4 py-10 md:py-12">
      <div className="reveal relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-800 shadow-premium-lg">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-300 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-blob" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-400 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 animate-blob" style={{ animationDelay: "6s" }} />
          <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-pink-400 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-blob" style={{ animationDelay: "3s" }} />
        </div>

        {/* Subtle grid */}
        <div className="absolute inset-0 bg-grid opacity-20" />

        <div className="relative grid md:grid-cols-2 gap-6 items-center p-8 md:p-12 lg:p-14">
          <div className="text-white">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold mb-5 border border-white/20 animate-pulse-glow">
              <FlameIcon className="h-3.5 w-3.5 text-orange-300" />
              {t("promo.badge")}
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-[1.1] tracking-tight">
              {t("promo.title")}
            </h2>
            <p className="text-blue-100/90 mb-7 text-base md:text-lg leading-relaxed">
              {t("promo.subtitle")}
            </p>
            <Link href="/blog/guenstig-reisen">
              <button className="group inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-7 py-3.5 rounded-xl hover:bg-blue-50 transition-all hover:scale-105 active:scale-100 shadow-lg shadow-black/10 cursor-pointer">
                <SparklesIcon className="h-4 w-4 text-orange-500 group-hover:rotate-12 transition-transform" />
                {t("promo.cta")}
                <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </Link>
          </div>

          <div className="relative h-48 md:h-72 rounded-2xl overflow-hidden hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop"
              alt="Travel"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-transparent to-transparent" />
            {/* Floating price tag */}
            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl px-3 py-2 shadow-lg animate-float">
              <div className="text-[10px] text-blue-700 font-semibold uppercase tracking-wider">Beispiel</div>
              <div className="text-sm font-bold text-foreground">Mallorca ab 49€</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
