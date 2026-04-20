import Link from "next/link"
import { ARTICLES } from "@/lib/blog/articles"
import { Card } from "@/components/ui/card"
import { ArrowRightIcon, BookOpenIcon } from "@/components/ui/icons"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog — Reise-Inspiration & Tipps",
  description: "Tipps, Tricks und Inspiration für günstige Reisen. Lerne von Profi-Reisenden, wie du bis zu 60% sparst.",
  alternates: { canonical: "/blog" },
}

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
          <BookOpenIcon className="h-4 w-4" />
          Tripora24 Blog
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-3">Reise-Inspiration & Tipps</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Spartipps, Geheimtipps und Profi-Tricks für deine nächste Reise. Kostenlos und immer aktuell.
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ARTICLES.map((article, i) => (
          <Link key={article.slug} href={`/blog/${article.slug}`} className={`animate-fade-in-up stagger-${i + 1}`}>
            <Card className="overflow-hidden h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
              <div className="h-52 overflow-hidden relative">
                <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3">
                  <span className="bg-white/90 dark:bg-black/70 backdrop-blur text-xs font-semibold px-2.5 py-1 rounded-full">
                    {article.category}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h2 className="font-bold text-lg leading-tight mb-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h2>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{article.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{article.readTime} Lesezeit</span>
                  <span className="text-primary font-semibold flex items-center gap-1">
                    Lesen <ArrowRightIcon className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
