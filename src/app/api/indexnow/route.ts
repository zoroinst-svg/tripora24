import { NextResponse } from "next/server"
import { notifyIndexNow } from "@/lib/seo/indexnow"
import { TOP_ROUTES, routeSlug } from "@/lib/data/top-routes"
import { ARTICLES } from "@/lib/blog/articles"

// GET /api/indexnow?secret=XYZ
// Meldet alle wichtigen URLs bei IndexNow (Bing, Yandex).
// Secret via env var INDEXNOW_SECRET schützt die Route vor Missbrauch.
export async function GET(req: Request) {
  const url = new URL(req.url)
  const secret = url.searchParams.get("secret")
  if (!process.env.INDEXNOW_SECRET || secret !== process.env.INDEXNOW_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const base = "https://www.tripora24.com"
  const urls = [
    base,
    `${base}/fluege`,
    `${base}/hotels`,
    `${base}/pauschalreisen`,
    `${base}/deals`,
    `${base}/alerts`,
    `${base}/blog`,
    `${base}/profil`,
    `${base}/impressum`,
    `${base}/datenschutz`,
    ...ARTICLES.map((a) => `${base}/blog/${a.slug}`),
    ...TOP_ROUTES.map((r) => `${base}/fluege/${routeSlug(r.from, r.to)}`),
  ]

  // IndexNow akzeptiert max. 10.000 URLs pro Request
  const batches: string[][] = []
  for (let i = 0; i < urls.length; i += 500) {
    batches.push(urls.slice(i, i + 500))
  }

  const results = await Promise.all(batches.map((batch) => notifyIndexNow(batch)))
  const allOk = results.every((r) => r.ok)

  return NextResponse.json({
    submitted: urls.length,
    batches: results.length,
    ok: allOk,
    results,
  })
}
