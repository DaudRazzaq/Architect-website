import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import { enquiryHref } from '@/lib/enquiry'
import ServiceDetail from '@/app/components/ServiceDetail'

export const revalidate = false

export const metadata: Metadata = {
  ...buildMetadata({
    title: 'Measured Surveys London',
    description:
      'Laser measured surveys across London. Accurate floor plans, elevations and sections in PDF, DWG or Revit. From £600, with drawings within 5 working days.',
    path: '/services/measured-surveys',
  }),
  keywords: [
    'measured survey London',
    'laser measured survey London',
    'measured building survey',
    'floor plan survey London',
    'CAD survey drawings London',
  ],
}

export default function MeasuredSurveysPage() {
  return (
    <ServiceDetail
      eyebrow="Measured Surveys"
      headline="Laser measured surveys across London"
      intro="Every good design starts with accurate drawings of what is already there. We survey your property with laser measuring equipment and produce clear, accurate drawings in CAD or Revit, ready for design, planning or Building Regulations."
      list={{
        heading: 'What’s included',
        variant: 'bullets',
        items: [
          { text: 'Floor plans of every level, with room sizes and ceiling heights' },
          { text: 'Elevations and sections where needed' },
          { text: 'Doors, windows, chimney breasts, steps and level changes' },
          { text: 'Drawings in PDF, DWG (AutoCAD) or Revit' },
        ],
      }}
      timeline="Site visit within 5 working days of booking, drawings within 5 working days of the visit."
      price="From £600 for a flat or terrace up to 100 m². Larger homes and commercial spaces quoted on request."
      button={{ label: 'Book a survey', href: enquiryHref('measured-survey') }}
    />
  )
}
