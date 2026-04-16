"use client"

import Link from "next/link"
import { ARTICLES } from "@/lib/blog/articles"
import { Card } from "@/components/ui/card"
import { ArrowRightIcon, BookOpenIcon } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"

export function BlogPreview() {
  return (
    <section className="bg-muted/30 py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <BookOpenIcon className="h-5 w-5 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold">Reise-Inspiration</h2>
            </div>
            <p className="text-muted-foreground">Tipps, Tricks und Geheimtipps für deine nächste Reise</p>
          </div>
          <Link href="/blog" className="hidden md:block">
            <Button variant="outline" className="gap-2">
              Alle Artikel <ArrowRightIcon className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ARTICLES.map((article, i) => (
            <Link key={article.slug} href={`/blog/${article.slug}`} className={`animate-fade-in-up stagger-${i + 1}`}>
              <Card className="overflow-hidden h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
                <div className="h-48 overflow-hidden relative">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/90 dark:bg-black/70 backdrop-blur text-xs font-semibold px-2.5 py-1 rounded-full">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg leading-tight mb-2 group-hover:text-primary transition-colors">{article.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{article.excerpt}</p>
                  <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
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

        <div className="mt-8 text-center md:hidden">
          <Link href="/blog">
            <Button variant="outline" className="gap-2">
              Alle Artikel ansehen <ArrowRightIcon className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
