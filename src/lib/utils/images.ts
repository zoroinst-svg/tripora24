// Returns image URLs for a city / country. Routes through the /api/img endpoints
// which fetch the real Wikipedia infobox photo for each location and 302-redirect.
// This guarantees every city / country shows its OWN photo (cityscape / landmark)
// rather than a duplicated stock image. Results are cached at the edge (30d) and
// in the browser (7d).
//
// Bump IMG_CACHE_VERSION whenever the image-resolution logic changes — this
// invalidates the edge/browser cache for all images so users see the new
// resolutions instead of stale incorrect ones.

const IMG_CACHE_VERSION = "3"

const slug = (code: string) => encodeURIComponent(code.toUpperCase())

export function getCityImage(code: string): string {
  return `/api/img/city/${slug(code)}?v=${IMG_CACHE_VERSION}`
}

export function getCountryImage(code: string): string {
  return `/api/img/country/${slug(code)}?v=${IMG_CACHE_VERSION}`
}
