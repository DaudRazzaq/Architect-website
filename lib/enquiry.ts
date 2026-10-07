/**
 * Enquiry form options and rules - single source of truth.
 *
 * Shared by the /contact form and the <GetInTouch /> section so the two
 * enquiry forms can never offer different choices or validate differently.
 * The option text is what lands in the enquiry email, so keep it
 * human-readable.
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

export const TIMELINE_OPTIONS = [
  'As soon as possible',
  '1 to 3 months',
  '3 to 6 months',
  '6 to 12 months',
  'Over a year',
  'Not decided yet',
] as const

export const REFERRAL_OPTIONS = [
  { value: 'google', label: 'Google Search' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'referral', label: 'Personal Referral' },
  { value: 'press', label: 'Press / Editorial' },
  { value: 'other', label: 'Other' },
] as const

/** Contact form URL with the given service pre-selected. */
export function enquiryHref(slug: ServiceSlug): string {
  return `/contact?service=${slug}#ct-form`
}

/** Resolves a `?service=` slug to its option label, or null if unknown. */
export function serviceLabelFromSlug(slug: string | null): string | null {
  return SERVICE_OPTIONS.find((option) => option.slug === slug)?.label ?? null
}

// ---------------------------------------------------------------------------
// Budget - a free amount in pounds, typed by the visitor
// ---------------------------------------------------------------------------

/** Whole pounds, digits only, grouped in thousands: "25000" → "25,000". */
export function formatPounds(raw: string): string {
  const digits = raw.replace(/\D/g, '').replace(/^0+(?=\d)/, '').slice(0, 9)
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/** Index just after the `count`-th digit of a formatted amount - where the
 *  caret belongs once the commas have been re-inserted. */
export function caretAfterDigits(formatted: string, count: number): number {
  let position = 0
  for (let seen = 0; position < formatted.length && seen < count; position++) {
    if (/\d/.test(formatted[position])) seen++
  }
  return position
}

// ---------------------------------------------------------------------------
// Validation - every dropdown must be answered before the form is sent
// ---------------------------------------------------------------------------

/** Same rule as /api/send, so the browser never lets through an address
 *  the server will reject. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export type EnquiryField = 'name' | 'email' | 'service' | 'timeline' | 'referral'

export interface EnquiryIssue {
  field: EnquiryField
  message: string
}

/** First required field that is missing or invalid, in on-screen order.
 *  Dropdowns are checked against their option lists, so a stale saved
 *  draft holding a retired option still has to be re-selected. */
export function findEnquiryIssue(fields: Record<string, string>): EnquiryIssue | null {
  if (!fields.name?.trim()) {
    return { field: 'name', message: 'Please enter your full name.' }
  }
  if (!fields.email?.trim() || !EMAIL_PATTERN.test(fields.email)) {
    return { field: 'email', message: 'Please enter a valid email address.' }
  }
  if (!SERVICE_OPTIONS.some((option) => option.label === fields.service)) {
    return { field: 'service', message: 'Please select the type of service.' }
  }
  if (!TIMELINE_OPTIONS.some((option) => option === fields.timeline)) {
    return { field: 'timeline', message: 'Please select your project timeline.' }
  }
  if (!REFERRAL_OPTIONS.some((option) => option.value === fields.referral)) {
    return { field: 'referral', message: 'Please tell us how you found us.' }
  }
  return null
}

/** Fields as they should arrive in the enquiry email: a typed amount gains
 *  its pound sign ("25,000" → "£25,000"). Anything else (e.g. a budget band
 *  restored from a draft saved before the field became free-text) is sent
 *  exactly as the visitor left it. */
export function toEnquiryPayload(fields: Record<string, string>): Record<string, string> {
  const budget = (fields.budget ?? '').trim()
  return { ...fields, budget: /^\d{1,3}(,\d{3})*$/.test(budget) ? `£${budget}` : budget }
}
