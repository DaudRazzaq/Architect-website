import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'

export const revalidate = false

export const metadata: Metadata = {
  ...buildMetadata({
    title: 'Multipurpose & Mixed-Use Interior Design London',
    description:
      'Hybrid space design by Aureon Studio London — wellness centres, boutique hotels, co-working spaces, and mixed-use developments that flex between residential and commercial needs.',
    path: '/services/multipurpose',
  }),
  keywords: [
    'multipurpose interior design London',
    'mixed use development design London',
    'wellness centre interior design',
    'boutique hotel design London',
    'co-working space design London',
    'biophilic interior design London',
    'hybrid space design London',
    'acoustic design interior',
    'bespoke millwork London',
    'lighting design London',
  ],
}

export default function MultipurposeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
