// IndexNow API — sofortiges Indexieren bei Bing, Yandex, Seznam
// https://www.indexnow.org/documentation

const INDEXNOW_KEY = "196217b99f985e40e6716f6c771ba151"
const HOST = "www.tripora24.com"

export async function notifyIndexNow(urls: string[]): Promise<{ ok: boolean; status: number }> {
  if (urls.length === 0) return { ok: true, status: 200 }

  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
      urlList: urls,
    }),
  })

  return { ok: res.ok, status: res.status }
}
