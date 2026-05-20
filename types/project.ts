export interface Project {
  slug: string
  title: string
  category: 'Residential' | 'Commercial' | 'Multipurpose'
  description: string
  heroImage: string
  images: string[]
  year: number
  location: string
  services: string[]
  testimonial?: { quote: string; author: string }
}
