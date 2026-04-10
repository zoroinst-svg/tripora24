"use client"

import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"

export function PromoBanner() {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 shadow-2xl">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-300 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="relative grid md:grid-cols-2 gap-6 items-center p-8 md:p-12">
          {/* Text */}
          <div className="text-white">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur px-3 py-1.5 rounded-full text-xs font-semibold mb-4">
              <Sparkles className="h-3 w-3" />
              Neu bei Tripora24
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">
              So günstig wie noch nie reisen
            </h2>
            <p className="text-blue-100 mb-6 text-base md:text-lg">
              Entdecke unsere 7 Profi-Tricks und spare bis zu 60% auf deinem nächsten Flug. Kostenlos und in 5 Minuten gelesen.
            </p>
            <Link href="/blog/guenstig-reisen">
              <button className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-all hover:scale-105 shadow-lg cursor-pointer">
                Unser Guide
                <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
          </div>

          {/* Image */}
          <div className="relative h-48 md:h-64 rounded-2xl overflow-hidden hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop"
              alt="Reise"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}
