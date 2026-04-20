import Link from "next/link"
import { notFound } from "next/navigation"
import { ARTICLES, getArticleBySlug } from "@/lib/blog/articles"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, ArrowRightIcon, CalendarIcon, ClockIcon } from "@/components/ui/icons"
import { BlogPostingJsonLd } from "@/components/seo/JsonLd"
import type { Metadata } from "next"

export async function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return { title: "Artikel nicht gefunden" }
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: { title: article.title, description: article.excerpt, images: [article.image] },
  }
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) notFound()

  return (
    <article className="container mx-auto px-4 py-8 max-w-3xl">
      <BlogPostingJsonLd
        headline={article.title}
        description={article.excerpt}
        image={article.image}
        datePublished={article.publishedAt}
        url={`https://www.tripora24.com/blog/${article.slug}`}
      />
      {/* Back Link */}
      <Link href="/blog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ChevronLeftIcon className="h-4 w-4" /> Zurück zum Blog
      </Link>

      {/* Header */}
      <div className="mb-8">
        <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-4">
          {article.category}
        </span>
        <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">{article.title}</h1>
        <p className="text-lg text-muted-foreground mb-4">{article.excerpt}</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5"><CalendarIcon className="h-4 w-4" /> {new Date(article.publishedAt).toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" })}</span>
          <span className="flex items-center gap-1.5"><ClockIcon className="h-4 w-4" /> {article.readTime} Lesezeit</span>
        </div>
      </div>

      {/* Hero Image */}
      <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
        <img src={article.image} alt={article.title} className="w-full h-64 md:h-96 object-cover" />
      </div>

      {/* Content */}
      <div className="space-y-6 text-base leading-relaxed">
        {article.content.map((block, i) => {
          if (block.type === "h2") return <h2 key={i} className="text-2xl md:text-3xl font-bold mt-8 mb-2">{block.text}</h2>
          if (block.type === "h3") return <h3 key={i} className="text-xl md:text-2xl font-bold mt-6 mb-2">{block.text}</h3>
          if (block.type === "p") return <p key={i} className="text-foreground/90">{block.text}</p>
          if (block.type === "list") return (
            <ul key={i} className="list-disc list-inside space-y-2 ml-2 text-foreground/90">
              {block.items?.map((item, j) => <li key={j}>{item}</li>)}
            </ul>
          )
          if (block.type === "quote") return (
            <blockquote key={i} className="border-l-4 border-primary pl-4 py-2 italic text-muted-foreground bg-muted/30 rounded-r-lg">
              &ldquo;{block.text}&rdquo;
            </blockquote>
          )
          if (block.type === "cta") return (
            <div key={i} className="my-8 rounded-2xl bg-gradient-to-br from-primary to-blue-700 p-8 text-center text-white shadow-xl">
              <h3 className="text-2xl font-bold mb-4">{block.text}</h3>
              <Link href={block.href || "/fluege"}>
                <Button size="lg" className="bg-white text-primary hover:bg-blue-50 gap-2">
                  Jetzt entdecken <ArrowRightIcon className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          )
          return null
        })}
      </div>

      {/* More Articles */}
      <div className="mt-16 pt-8 border-t">
        <h3 className="text-xl font-bold mb-4">Weitere Artikel</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ARTICLES.filter(a => a.slug !== slug).slice(0, 2).map(a => (
            <Link key={a.slug} href={`/blog/${a.slug}`} className="group">
              <div className="flex gap-4 p-4 rounded-xl border hover:shadow-md transition-shadow">
                <img src={a.image} alt={a.title} className="w-24 h-24 object-cover rounded-lg shrink-0" />
                <div>
                  <span className="text-xs text-primary font-semibold">{a.category}</span>
                  <h4 className="font-semibold leading-tight group-hover:text-primary transition-colors mt-1">{a.title}</h4>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </article>
  )
}
