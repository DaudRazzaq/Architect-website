/**
 * Studio location — single source of truth for anything that points at the
 * office on a map. Imported by the contact page and the site footer so the
 * embed and the directions link can never drift apart.
 *
 * The query is the plain postal address on purpose: the business name and
 * the internal unit ("Office 1720") do not geocode reliably, and including
 * them can make Google fall back to a broad text search instead of dropping
 * a pin on the building.
 */
export const STUDIO_MAP_QUERY = '60 Tottenham Court Road, Fitzrovia, London W1T 2EW'

/** Keyless Google Maps embed. Requires `frame-src https://maps.google.com`
 *  in the CSP (see next.config.ts) — without it the iframe is silently
 *  blocked and renders as an empty box. */
export const STUDIO_MAP_EMBED = `https://maps.google.com/maps?q=${encodeURIComponent(
  STUDIO_MAP_QUERY,
)}&z=16&output=embed`

/** Opens the location in the user's Google Maps app or the web client. */
export const STUDIO_DIRECTIONS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  STUDIO_MAP_QUERY,
)}`

/** Accessible description shared by both map embeds. */
export const STUDIO_MAP_TITLE =
  'Map showing Aureon Studio at 60 Tottenham Court Road, Office 1720, Fitzrovia, London W1T 2EW'
