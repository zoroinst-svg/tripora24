import { NextResponse } from "next/server"
import { resolveCityImage } from "@/lib/utils/wiki-image"

const CACHE = "public, max-age=604800, s-maxage=2592000, stale-while-revalidate=2592000"
const FALLBACK = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1024&h=768&fit=crop"

export async function GET(_req: Request, ctx: { params: Promise<{ code: string }> }) {
  const { code } = await ctx.params
  let url: string
  try {
    url = await resolveCityImage(code)
  } catch {
    url = FALLBACK
  }
  const res = NextResponse.redirect(url || FALLBACK, 302)
  res.headers.set("Cache-Control", CACHE)
  return res
}
