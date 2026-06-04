import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'

export const revalidate = false

export const metadata: Metadata = {
  ...buildMetadata({
    title: 'Residential Interior Architecture & Design London',
    description:
      'Aureon Studio delivers residential interior architecture in London — from loft conversions and kitchen renovations to full home refurbishments. Bespoke design, complete delivery.',
    path: '/services/residential',
  }),
  keywords: [
    'residential interior design London',
    'residential architect London',
    'home refurbishment London',
    'loft conversion design London',
    'kitchen renovation London',
    'house renovation London',
    'bespoke kitchen design London',
    'interior architecture residential London',
    'full house refurbishment London',
    'residential refurbishment London',
  ],
}

export default function ResidentialLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
