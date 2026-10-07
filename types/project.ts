export interface ProjectImage {
  src: string
  /** Intrinsic pixel size — the case-study layout keeps each render's own
   *  shape (portrait or landscape) instead of cropping it to a fixed ratio. */
  width: number
  height: number
  alt: string
}

/** Content for projects rendered by the shared case-study template at
 *  /projects/[slug]. The original three projects have hand-built pages. */
export interface ProjectCaseStudy {
  /** Eyebrow above the title, e.g. "Residential Interiors · Refurbishment" */
  label: string
  subtitle: string
  /** The three summary points shown with the hero */
  highlights: [string, string, string]
  sections: { heading: string; body: string }[]
  /** Display order; the first image leads the hero */
  gallery: ProjectImage[]
}

export interface Project {
  slug: string
  title: string
  category: 'Residential' | 'Commercial' | 'Multipurpose'
  description: string
  heroImage: string
  images: string[]
  year?: number
  location: string
  services?: string[]
  testimonial?: { quote: string; author: string }
  caseStudy?: ProjectCaseStudy
}
