import { NextResponse } from "next/server"
import { resolveCountryImage } from "@/lib/utils/wiki-image"

const CACHE = "public, max-age=604800, s-maxage=2592000, stale-while-revalidate=2592000"

export async function GET(_req: Request, ctx: { params: Promise<{ code: string }> }) {
  const { code } = await ctx.params
  const url = await resolveCountryImage(code)
  const res = NextResponse.redirect(url, 302)
  res.headers.set("Cache-Control", CACHE)
  return res
}
