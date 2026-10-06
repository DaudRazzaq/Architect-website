import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import { enquiryHref } from '@/lib/enquiry'
import Navigation from '@/app/components/Navigation'
import CTAStrip from '@/app/components/CTAStrip'
import Footer from '@/app/components/Footer'
import { ServiceAction, ServiceHero, ServiceList } from '@/app/components/ServiceDetail'

export const revalidate = false

export const metadata: Metadata = {
  ...buildMetadata({
    title: 'Drawing & Survey Support for Architects',
    description:
      'Extra capacity for busy London studios: measured surveys, planning and Building Regulations drawings, interior production and 3D visualization.',
    path: '/for-studios',
  }),
  keywords: [
    'architectural drafting support London',
    'outsourced drawing production London',
    'measured survey for architects',
    'planning drawings for architects',
    'CAD drafting services London',
    'architectural visualisation London',
  ],
}

const RATES = [
  { service: 'Measured survey, flat or terrace up to 100 m²', from: '£350' },
  { service: 'Measured survey, house 100–200 m²', from: '£500' },
  { service: 'Planning drawing set, rear or side extension', from: '£750' },
  { service: 'Building Regulations drawings, extension', from: '£800' },
  { service: 'Drafting or visualisation support', from: '£30 per hour' },
]

export default function ForStudiosPage() {
  return (
    <>
      <Navigation />
      <CTAStrip />

      <ServiceHero
        eyebrow="For Architects & Studios"
        headline="Extra capacity for busy London studios"
        intro="When your team is stretched, we take on the surveys and drawing production so you can stay focused on design and clients. We work on your title block, to your standards, and we never approach your clients."
      />

      <ServiceList
        heading="What we can take on"
        variant="bullets"
        items={[
          {
            title: 'Measured surveys',
            text: 'laser measured plans, elevations and sections in CAD or Revit, back within 5 working days of the site visit.',
          },
          {
            title: 'Planning drawing packages',
            text: 'existing and proposed plans, elevations, sections, location and block plans, ready for you to review and submit.',
          },
          {
            title: 'Building Regulations drawings',
            text: 'technical packages for residential extensions and lofts.',
          },
          {
            title: 'Interior production',
            text: 'joinery and kitchen drawings, lighting layouts, FF&E schedules.',
          },
          {
            title: '3D visualization',
            text: 'interior and exterior visuals for client presentations.',
          },
        ]}
      />

      <ServiceList
        heading="How we work with you"
        variant="steps"
        tone="white"
        items={[
          {
            title: 'Send us the brief',
            text: 'A site address, sketch or marked-up drawing is enough to start.',
          },
          {
            title: 'Fixed quote within 24 hours',
            text: 'One price per job, or a day rate for ongoing support.',
          },
          {
            title: 'Your title block, your standards',
            text: 'Send your CAD template and layer standards and we follow them.',
          },
          {
            title: 'Confidential',
            text: 'A simple non-disclosure and non-solicitation agreement comes as standard.',
          },
        ]}
      />

      <section className="sd-section">
        <div className="sd-inner">
          <h2 className="sd-heading">Rates</h2>
          <table className="sd-table">
            <thead>
              <tr>
                <th scope="col">Service</th>
                <th scope="col">From</th>
              </tr>
            </thead>
            <tbody>
              {RATES.map((rate) => (
                <tr key={rate.service}>
                  <td>{rate.service}</td>
                  <td>{rate.from}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="sd-table-note">
            Rates exclude VAT where applicable. Repeat studios get priority booking.
          </p>
        </div>
      </section>

      <ServiceAction
        button={{ label: 'Send us a brief', href: enquiryHref('studio-support') }}
        note={
          <>
            or email <a href="mailto:hello@aureonstudio.co.uk">hello@aureonstudio.co.uk</a>
          </>
        }
      >
        <p className="sd-credentials">
          Degrees in architecture, interior design and civil engineering · Revit, AutoCAD and
          laser survey equipment
        </p>
      </ServiceAction>

      <Footer />
    </>
  )
}
