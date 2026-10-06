import type { Metadata } from 'next'
import Link from 'next/link'
import { buildMetadata } from '@/lib/metadata'
import { enquiryHref } from '@/lib/enquiry'
import ServiceDetail from '@/app/components/ServiceDetail'

export const revalidate = false

export const metadata: Metadata = {
  ...buildMetadata({
    title: 'Planning Applications London',
    description:
      'Planning applications handled for you: drawings and documents prepared, submitted via the Planning Portal and followed up with the council. From £1,500.',
    path: '/services/planning-applications',
  }),
  keywords: [
    'planning application London',
    'planning permission drawings London',
    'householder planning application',
    'permitted development London',
    'Lawful Development Certificate London',
  ],
}

export default function PlanningApplicationsPage() {
  return (
    <ServiceDetail
      eyebrow="Planning Applications"
      headline="Planning applications handled for you"
      intro="Planning can feel confusing. We check your council’s rules, prepare every drawing and document the council asks for, submit the application through the Planning Portal, and deal with the planning officer until a decision is made."
      list={{
        heading: 'What’s included',
        variant: 'bullets',
        items: [
          {
            text: 'Advice on whether you need full planning permission, permitted development or a Lawful Development Certificate',
          },
          { text: 'Location and block plans' },
          { text: 'Existing and proposed plans, elevations and sections' },
          { text: 'Design and Access Statement where required' },
          { text: 'Submission and follow-up with the council' },
        ],
      }}
      timeline="Most householder applications are decided within 8 weeks of the council validating them."
      price={
        <>
          From £1,500 for a householder application, plus the council’s fee. A{' '}
          <Link href="/services/measured-surveys">measured survey</Link> is needed first if you
          don’t have one.
        </>
      }
      button={{ label: 'Start your application', href: enquiryHref('planning-application') }}
    />
  )
}
