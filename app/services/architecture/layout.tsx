import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'

export const revalidate = false

export const metadata: Metadata = {
  ...buildMetadata({
    title: 'Architecture Services London | Aureon Studio',
    description:
      'Timeless architecture for modern living. Aureon Studio designs bespoke homes, residential developments, and commercial spaces from concept through to completion.',
    path: '/services/architecture',
  }),
  keywords: [
    'architecture services London',
    'residential architecture London',
    'architect London',
    'bespoke home design London',
    'architectural design studio',
  ],
}

export default function ArchitectureLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
