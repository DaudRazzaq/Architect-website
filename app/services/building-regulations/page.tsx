import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import { enquiryHref } from '@/lib/enquiry'
import ServiceDetail from '@/app/components/ServiceDetail'

export const revalidate = false

export const metadata: Metadata = {
  ...buildMetadata({
    title: 'Building Regulations Drawings London',
    description:
      'Building Regulations drawings your builder can price and build from: construction details, specification notes and structural engineer coordination.',
    path: '/services/building-regulations',
  }),
  keywords: [
    'Building Regulations drawings London',
    'building control drawings London',
    'technical drawings extension London',
    'construction drawings London',
    'Building Regs drawings',
  ],
}

export default function BuildingRegulationsPage() {
  return (
    <ServiceDetail
      eyebrow="Building Regulations Drawings"
      headline="Building Regulations drawings your builder can price and build from"
      intro="After planning, your project needs technical drawings that show how it will be built safely and meet current regulations. We prepare a clear drawing package and coordinate with your structural engineer."
      list={{
        heading: 'What’s included',
        variant: 'bullets',
        items: [
          { text: 'Construction plans, sections and details' },
          { text: 'Specification notes covering structure, insulation, fire safety, ventilation and drainage' },
          { text: 'Coordination with your structural engineer’s calculations' },
          { text: 'Submission to building control (local council or approved inspector)' },
        ],
      }}
      price="From £1,200 for a typical extension, or £2,450 together with the survey and planning drawings."
      button={{ label: 'Get a quote', href: enquiryHref('building-regulations') }}
    />
  )
}
