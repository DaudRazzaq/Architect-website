import type { Project } from '@/types/project'

// Organisation + LocalBusiness schema for root layout
export function buildOrganisationSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://aureon.studio/#organization',
        name: 'Aureon Studio',
        url: 'https://aureon.studio',
        logo: {
          '@type': 'ImageObject',
          url: 'https://aureon.studio/logo.png',
        },
        sameAs: [
          'https://www.instagram.com/aureon.studio',
          'https://www.linkedin.com/company/aureon-studio',
        ],
      },
      {
        '@type': 'LocalBusiness',
        '@id': 'https://aureon.studio/#localbusiness',
        name: 'Aureon Studio',
        description:
          'A London-based interior architecture and refurbishment design studio.',
        url: 'https://aureon.studio',
        telephone: '+44 20 0000 0000',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '124 Architecture Boulevard',
          addressLocality: 'London',
          postalCode: 'EC1A 1BB',
          addressCountry: 'GB',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 51.5074,
          longitude: -0.1278,
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '09:00',
            closes: '18:00',
          },
        ],
        priceRange: '££££',
      },
    ],
  }
}

// CreativeWork schema for individual project pages
export function buildProjectSchema(project: Project) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    image: `https://aureon.studio${project.heroImage}`,
    creator: {
      '@type': 'Organization',
      name: 'Aureon Studio',
      url: 'https://aureon.studio',
    },
    dateCreated: String(project.year),
    locationCreated: {
      '@type': 'Place',
      name: project.location,
    },
  }
}

// FAQPage schema
export function buildFaqSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

// Article schema for blog posts
export function buildArticleSchema({
  title,
  description,
  image,
  date,
  url,
}: {
  title: string
  description: string
  image: string
  date: string
  url: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: `https://aureon.studio${image}`,
    datePublished: date,
    url,
    publisher: {
      '@type': 'Organization',
      name: 'Aureon Studio',
      url: 'https://aureon.studio',
    },
  }
}
