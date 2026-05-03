"use client"

import Link from "next/link"
import { ARTICLES } from "@/lib/blog/articles"
import { Card } from "@/components/ui/card"
import { ArrowRightIcon, BookOpenIcon, ClockIcon } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"

export function BlogPreview() {
  return (
    <section className="bg-muted/30 py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-8 md:mb-10 gap-4">
          <div className="reveal">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3 border border-primary/20">
              <BookOpenIcon className="h-3.5 w-3.5" />
              Blog
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Reise-Inspiration</h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl">Tipps, Tricks und Geheimtipps für deine nächste Reise</p>
          </div>
          <Link href="/blog" className="hidden md:block">
            <Button variant="outline" className="gap-2 group">
              Alle Artikel
              <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {ARTICLES.map((article, i) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="reveal-scale block"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <Card className="overflow-hidden h-full hover:shadow-premium-lg hover:-translate-y-1.5 transition-all duration-500 group cursor-pointer border-border/60 hover:border-primary/40">
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={article.image}
                    alt={article.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[700ms] ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/95 dark:bg-black/80 backdrop-blur-md text-xs font-semibold px-2.5 py-1 rounded-full shadow">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">{article.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{article.excerpt}</p>
                  <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground pt-3 border-t border-border/50">
                    <span className="flex items-center gap-1.5">
                      <ClockIcon className="h-3 w-3" />
                      {article.readTime} Lesezeit
                    </span>
                    <span className="text-primary font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                      Lesen <ArrowRightIcon className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center md:hidden">
          <Link href="/blog">
            <Button variant="outline" className="gap-2 w-full sm:w-auto">
              Alle Artikel ansehen <ArrowRightIcon className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
