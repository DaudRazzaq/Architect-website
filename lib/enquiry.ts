/**
 * Enquiry form options — single source of truth.
 *
 * Shared by the /contact form and the <GetInTouch /> section so the two
 * enquiry forms can never offer different choices. The option text is what
 * lands in the enquiry email, so keep it human-readable.
 */

/** Service types, each with a URL-safe slug so a page can link straight to
 *  the contact form with the service pre-selected: /contact?service=<slug> */
export const SERVICE_OPTIONS = [
  { slug: 'measured-survey', label: 'Measured survey' },
  { slug: 'extension-or-loft', label: 'Extension or loft' },
  { slug: 'planning-application', label: 'Planning application' },
  { slug: 'building-regulations', label: 'Building Regulations drawings' },
  { slug: 'interior-design', label: 'Interior design' },
  { slug: 'studio-support', label: 'Studio support (for architects and designers)' },
  { slug: 'not-sure', label: 'Not sure' },
] as const

export type ServiceSlug = (typeof SERVICE_OPTIONS)[number]['slug']

export const BUDGET_OPTIONS = [
  'Under £5k',
  '£5k–£25k',
  '£25k–£100k',
  '£100k–£500k',
  '£500k+',
  'Not sure yet',
] as const

export const TIMELINE_OPTIONS = [
  'As soon as possible',
  '1 – 3 months',
  '3 – 6 months',
  '6 – 12 months',
  'Over a year',
  'Not decided yet',
] as const

/** Contact form URL with the given service pre-selected. */
export function enquiryHref(slug: ServiceSlug): string {
  return `/contact?service=${slug}#ct-form`
}

/** Resolves a `?service=` slug to its option label, or null if unknown. */
export function serviceLabelFromSlug(slug: string | null): string | null {
  return SERVICE_OPTIONS.find((option) => option.slug === slug)?.label ?? null
}
