// Curated image overrides + category-pool fallback.
//
// The PRIMARY image source is Wikipedia's `pageimages` API (in wiki-image.ts) —
// it returns the article's infobox photo, which Wikipedia editors curate as the
// canonical image for the entity. That's far more reliable than any handcrafted
// Unsplash ID list maintained here.
//
// We deliberately keep CURATED_CITY and CURATED_COUNTRY EMPTY: every previous
// attempt to hand-pick Unsplash IDs ended up with the same photo reused across
// sister cities (e.g. Gdańsk + Krakow + Wrocław all sharing one image), which
// is exactly what we want to avoid. Wikipedia handles 99% of cases correctly.
//
// CATEGORY_POOL is the last-resort fallback when Wikipedia has no usable photo.
// Multiple options per category are picked deterministically by hashing the
// destination code, so two unknown beach destinations don't share an image.

const U = (id: string) => `https://images.unsplash.com/${id}?w=1024&h=768&fit=crop&q=80&auto=format`

export const CURATED_CITY: Record<string, string> = {}
export const CURATED_COUNTRY: Record<string, string> = {}

// Category fallback pool — verified Unsplash photo IDs.
export const CATEGORY_POOL: Record<string, string[]> = {
  beach: [
    U("photo-1507525428034-b723cf961d3e"),
    U("photo-1519046904884-53103b34b206"),
    U("photo-1506953823976-52e1fdc0149a"),
    U("photo-1535262971677-983aa4d76eaa"),
    U("photo-1537956965359-7573183d1f57"),
  ],
  city: [
    U("photo-1477959858617-67f85cf4f1df"),
    U("photo-1480714378408-67cf0d13bc1b"),
    U("photo-1444723121867-7a241cacace9"),
    U("photo-1496442226666-8d4d0e62e6e9"),
  ],
  island: [
    U("photo-1559128010-7c1ad6e1b6a5"),
    U("photo-1505228395891-9a51e7e86bf6"),
    U("photo-1518548419970-58e3b4079ab2"),
  ],
  mountain: [
    U("photo-1464822759023-fed622ff2c3b"),
    U("photo-1486870591958-9b9d0d1dda99"),
    U("photo-1454496522488-7a8e488e8606"),
  ],
  cultural: [
    U("photo-1549144511-f099e773c147"),
    U("photo-1543349689-9a4d426bee8e"),
    U("photo-1555993539-1732b0258235"),
  ],
  default: [
    U("photo-1488646953014-85cb44e25828"),
    U("photo-1469854523086-cc02fe5d8800"),
    U("photo-1502920917128-1aa500764cbd"),
  ],
}

function hash(code: string): number {
  let h = 0
  for (let i = 0; i < code.length; i++) h = (h * 31 + code.charCodeAt(i)) >>> 0
  return h
}

export function pickCategoryImage(code: string, category: string): string {
  const pool = CATEGORY_POOL[category] || CATEGORY_POOL.default
  return pool[hash(code) % pool.length]
}
