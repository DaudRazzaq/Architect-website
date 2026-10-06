import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import { enquiryHref } from '@/lib/enquiry'
import ServiceDetail from '@/app/components/ServiceDetail'

export const revalidate = false

export const metadata: Metadata = {
  ...buildMetadata({
    title: 'House Extensions & Loft Conversions London',
    description:
      'Rear, side return, wraparound and two-storey extensions and loft conversions for London homes, from first visit to approved drawings. Fixed fees.',
    path: '/services/extensions-and-lofts',
  }),
  keywords: [
    'house extension London',
    'loft conversion London',
    'rear extension design London',
    'side return extension London',
    'wraparound extension London',
  ],
}

export default function ExtensionsAndLoftsPage() {
  return (
    <ServiceDetail
      eyebrow="House Extensions & Loft Conversions"
      headline="Extensions and loft conversions, designed and approved"
      intro="We design rear, side return, wraparound and two-storey extensions, and loft conversions, for London homes. We take you from the first visit to approved drawings, with fixed fees for each stage."
      list={{
        heading: 'How it works',
        variant: 'steps',
        items: [
          {
            title: 'Visit and survey',
            text: 'We meet you at home, talk through your ideas and measure the property.',
          },
          {
            title: 'Design options',
            text: 'We prepare two or three layout options with 3D views so you can see the space.',
          },
          {
            title: 'Planning or permitted development',
            text: 'We check what your project needs and prepare the drawings.',
          },
          {
            title: 'Building Regulations',
            text: 'We produce the technical drawings your builder and building control need.',
          },
        ],
      }}
      price="Design and planning drawings from £1,500, plus the council’s application fee."
      button={{ label: 'Discuss your extension', href: enquiryHref('extension-or-loft') }}
    />
  )
}
