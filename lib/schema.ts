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
          width: 400,
          height: 120,
          caption: 'Aureon Studio — Interior Architecture & Design London',
        },
        image: 'https://aureon.studio/logo.png',
        sameAs: [
          'https://www.aureonstudio.co.uk',
          'https://www.instagram.com/aureon.studio',
          'https://www.linkedin.com/company/aureon-studio',
        ],
      },
      {
        '@type': ['LocalBusiness', 'InteriorDesigner'],
        '@id': 'https://aureon.studio/#localbusiness',
        name: 'Aureon Studio',
        description:
          'A London-based interior architecture and refurbishment design studio delivering residential and commercial projects across London.',
        url: 'https://aureon.studio',
        telephone: '+44 (0)20 7946 0321',
        email: 'contact@aureonstudio.com',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '14 Fitzroy Square',
          addressLocality: 'Fitzrovia, London',
          postalCode: 'W1T 6EH',
          addressCountry: 'GB',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 51.5225,
          longitude: -0.1392,
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '09:00',
            closes: '18:00',
          },
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Saturday'],
            opens: '10:00',
            closes: '14:00',
          },
        ],
        priceRange: '££££',
        areaServed: {
          '@type': 'City',
          name: 'London',
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Interior Architecture & Design Services',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Residential Interior Architecture' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Commercial Interior Design' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Multipurpose Space Design' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Loft Conversion Design' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Kitchen & Bathroom Design' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Office Refurbishment' } },
          ],
        },
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
  keywords,
}: {
  title: string
  description: string
  image: string
  date: string
  url: string
  keywords?: string[]
}) {
  const imageUrl = image.startsWith('http') ? image : `https://aureon.studio${image}`
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    image: imageUrl,
    datePublished: date,
    dateModified: date,
    url,
    keywords: keywords?.join(', '),
    author: {
      '@type': 'Organization',
      name: 'Aureon Studio',
      url: 'https://aureon.studio',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Aureon Studio',
      url: 'https://aureon.studio',
      logo: {
        '@type': 'ImageObject',
        url: 'https://aureon.studio/logo.png',
        width: 2400,
        height: 310,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  }
}
