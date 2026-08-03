/**
 * Social profiles — single source of truth.
 *
 * These were previously hard-coded per component, and most were bare
 * placeholder domains (`https://instagram.com`) that dropped visitors on the
 * network's home page rather than the studio's profile. Import from here so
 * a handle change is one edit and the JSON-LD `sameAs` can never drift from
 * what the footer actually links to.
 */
export const SOCIAL = {
  instagram: 'https://www.instagram.com/aureonstudioltd/',
  linkedin: 'https://www.linkedin.com/company/aureon-designstudio/',
  houzz:
    'https://www.houzz.co.uk/hznb/professionals/interior-designers/aureon-studio-pfvwgb-pf~760537425',
} as const

/** Ordered list for rendering icon rows, so every surface shows the same set. */
export const SOCIAL_LINKS = [
  { label: 'Instagram', href: SOCIAL.instagram },
  { label: 'LinkedIn', href: SOCIAL.linkedin },
  { label: 'Houzz', href: SOCIAL.houzz },
] as const
