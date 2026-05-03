import { NextResponse } from "next/server"
import { resolveCityImage } from "@/lib/utils/wiki-image"

// Cache redirect at the edge for 30 days, browser for 7 days
const CACHE = "public, max-age=604800, s-maxage=2592000, stale-while-revalidate=2592000"

export async function GET(_req: Request, ctx: { params: Promise<{ code: string }> }) {
  const { code } = await ctx.params
  const url = await resolveCityImage(code)
  const res = NextResponse.redirect(url, 302)
  res.headers.set("Cache-Control", CACHE)
  return res
}
