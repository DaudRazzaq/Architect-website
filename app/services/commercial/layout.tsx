import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'

export const revalidate = false

export const metadata: Metadata = {
  ...buildMetadata({
    title: 'Commercial Interior Design London | Office & Retail Fit-Out',
    description:
      'Commercial interior design and office refurbishment in London by Aureon Studio. Workplaces, retail environments, and hospitality spaces designed to elevate your brand and business.',
    path: '/services/commercial',
  }),
  keywords: [
    'commercial interior design London',
    'office refurbishment London',
    'office interior design London',
    'retail interior design London',
    'hospitality design London',
    'office fit out London',
    'workplace design London',
    'Cat B fit out London',
    'commercial fit out London',
    'office renovation London',
  ],
}

export default function CommercialLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
