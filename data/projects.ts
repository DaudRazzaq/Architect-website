import type { Project } from '@/types/project'

export const projects: Project[] = [
  {
    slug: 'oakridge-house',
    title: 'Oakridge House',
    category: 'Residential',
    description:
      'A considered transformation of a Victorian semi in Surrey — restoring its original bones while introducing calm, contemporary interiors that work for modern family life.',
    heroImage: '/projects/oakridge-house/1.jpeg',
    images: [
      '/projects/oakridge-house/1.jpeg',
      '/projects/oakridge-house/2.jpeg',
      '/projects/oakridge-house/3.jpeg',
      '/projects/oakridge-house/4.jpeg',
      '/projects/oakridge-house/5.jpeg',
      '/projects/oakridge-house/6.jpeg',
    ],
    year: 2024,
    location: 'Cobham, Surrey, UK',
    services: ['Architecture', 'Interior Design', 'Project Management'],
    testimonial: {
      quote:
        'It was a transition from listening to what our needs and problems were, and what kind of aspirations we had, and then converting those into solutions.',
      author: 'Oakridge House Client',
    },
  },
  {
    slug: 'sereniflow-wellness-centre',
    title: 'SereniFlow Wellness Centre',
    category: 'Commercial',
    description:
      'A purpose-built wellness centre in Richmond designed around the principles of biophilic design — connecting occupants to nature through light, material, and form.',
    heroImage: '/projects/sereniflow-wellness-centre/1.jpeg',
    images: [
      '/projects/sereniflow-wellness-centre/1.jpeg',
      '/projects/sereniflow-wellness-centre/2.jpeg',
      '/projects/sereniflow-wellness-centre/3.jpeg',
    ],
    year: 2023,
    location: 'Richmond, London, UK',
    services: ['Architecture', 'Interior Design', 'Landscape Design'],
  },
  {
    slug: 'arbore-sanctuary-cafe',
    title: 'Arboré Sanctuary Café',
    category: 'Multipurpose',
    description:
      'A sanctuary café and co-working retreat in Bali that blends traditional Balinese craftsmanship with contemporary hospitality design — a space to slow down and reconnect.',
    heroImage: '/projects/arbore-sanctuary-cafe/1.jpeg',
    images: [
      '/projects/arbore-sanctuary-cafe/1.jpeg',
      '/projects/arbore-sanctuary-cafe/2.jpeg',
      '/projects/arbore-sanctuary-cafe/3.jpeg',
    ],
    year: 2024,
    location: 'Bali, Indonesia',
    services: ['Interior Design', 'Concept Design', 'FF&E'],
  },
]
