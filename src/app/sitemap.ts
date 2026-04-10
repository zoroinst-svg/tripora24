import type { MetadataRoute } from "next"
import { ARTICLES } from "@/lib/blog/articles"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://tripora24.com"
  const now = new Date()

  // Top 30 most popular routes for programmatic SEO
  const popularRoutes: { from: string; to: string }[] = [
    { from: "FRA", to: "PMI" }, { from: "MUC", to: "PMI" }, { from: "BER", to: "PMI" },
    { from: "DUS", to: "PMI" }, { from: "HAM", to: "PMI" },
    { from: "FRA", to: "AYT" }, { from: "MUC", to: "AYT" }, { from: "BER", to: "AYT" },
    { from: "FRA", to: "BCN" }, { from: "MUC", to: "BCN" }, { from: "BER", to: "BCN" },
    { from: "FRA", to: "LIS" }, { from: "MUC", to: "LIS" },
    { from: "FRA", to: "FCO" }, { from: "MUC", to: "FCO" }, { from: "BER", to: "FCO" },
    { from: "FRA", to: "HER" }, { from: "MUC", to: "HER" },
    { from: "FRA", to: "DXB" }, { from: "MUC", to: "DXB" },
    { from: "FRA", to: "CDG" }, { from: "MUC", to: "CDG" },
    { from: "FRA", to: "LHR" }, { from: "MUC", to: "LHR" },
    { from: "FRA", to: "AMS" }, { from: "BER", to: "AMS" },
    { from: "FRA", to: "VIE" }, { from: "FRA", to: "ZRH" },
    { from: "FRA", to: "IST" }, { from: "FRA", to: "BKK" },
  ]

  return [
    // Main pages
    { url: baseUrl, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/fluege`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/hotels`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/pauschalreisen`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/deals`, lastModified: now, changeFrequency: "hourly", priority: 0.8 },
    { url: `${baseUrl}/alerts`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/impressum`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${baseUrl}/datenschutz`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },

    // Blog articles
    ...ARTICLES.map((a) => ({
      url: `${baseUrl}/blog/${a.slug}`,
      lastModified: new Date(a.publishedAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),

    // Popular flight routes (programmatic SEO)
    ...popularRoutes.map(({ from, to }) => ({
      url: `${baseUrl}/fluege?from=${from}&to=${to}`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.7,
    })),

    // Country exploration pages
    ...["DE", "AT", "CH"].map((from) => ({
      url: `${baseUrl}/fluege?from=${from}&to=EVERYWHERE`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.8,
    })),
  ]
}
