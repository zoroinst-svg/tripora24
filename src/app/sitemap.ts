import type { MetadataRoute } from "next"
import { ARTICLES } from "@/lib/blog/articles"
import { TOP_ROUTES, routeSlug } from "@/lib/data/top-routes"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.tripora24.com"
  const now = new Date()

  return [
    // Main pages
    { url: baseUrl, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/fluege`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/hotels`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/mietwagen`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/aktivitaeten`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/pauschalreisen`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/deals`, lastModified: now, changeFrequency: "hourly", priority: 0.8 },
    { url: `${baseUrl}/alerts`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/profil`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${baseUrl}/impressum`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${baseUrl}/datenschutz`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },

    // Blog articles
    ...ARTICLES.map((a) => ({
      url: `${baseUrl}/blog/${a.slug}`,
      lastModified: new Date(a.publishedAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),

    // Programmatic flight routes
    ...TOP_ROUTES.map((r) => ({
      url: `${baseUrl}/fluege/${routeSlug(r.from, r.to)}`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.7,
    })),
  ]
}
