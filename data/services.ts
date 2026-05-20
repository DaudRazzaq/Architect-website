import type { Service } from '@/types/service'

export const services: Service[] = [
  {
    slug: 'residential',
    title: 'Residential',
    description:
      'From single-room transformations to full-house refurbishments — thoughtful residential design that puts how you live at the centre of every decision.',
    image: '/assets/Services/Residential.jpeg',
    features: [
      'Full interior architecture',
      'Kitchen & bathroom design',
      'Extension & loft conversions',
      'Planning applications',
      'FF&E specification',
      'Project management',
    ],
    href: '/services/residential',
  },
  {
    slug: 'commercial',
    title: 'Commercial',
    description:
      'Workspace, retail, and hospitality environments designed to elevate brand experience, boost productivity, and create lasting impressions.',
    image: '/assets/Services/Commercial.jpeg',
    features: [
      'Workplace design',
      'Retail & hospitality environments',
      'Brand-led interiors',
      'Cat A & Cat B fit-out',
      'Planning & CDM compliance',
      'Furniture procurement',
    ],
    href: '/services/commercial',
  },
  {
    slug: 'multipurpose',
    title: 'Multipurpose',
    description:
      'Hybrid spaces that flex between residential and commercial demands — wellness centres, boutique hotels, co-working retreats, and mixed-use developments.',
    image: '/assets/Services/Multipurpuse Image.jpeg',
    features: [
      'Mixed-use concept design',
      'Biophilic design principles',
      'Acoustic & wellness planning',
      'Bespoke millwork',
      'Lighting design',
      'Art & styling curation',
    ],
    href: '/services/multipurpose',
  },
]
