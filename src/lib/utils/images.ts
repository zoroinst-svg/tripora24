// Returns image URLs for a city / country. Routes through the /api/img endpoints
// which fetch the real Wikipedia hero photo for each location and 302-redirect.
// This guarantees every city / country shows its OWN photo (cityscape / landmark)
// rather than a duplicated stock image. Results are cached at the edge (30d) and
// in the browser (7d).

const slug = (code: string) => encodeURIComponent(code.toUpperCase())

export function getCityImage(code: string): string {
  return `/api/img/city/${slug(code)}`
}

export function getCountryImage(code: string): string {
  return `/api/img/country/${slug(code)}`
}
