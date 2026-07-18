import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'

export const revalidate = false

export const metadata: Metadata = {
  ...buildMetadata({
    title: 'Landscape Design Services London | Aureon Studio',
    description:
      'Landscape design that extends architecture into the garden. Aureon Studio designs private gardens, courtyards, and commercial landscapes across London.',
    path: '/services/landscape',
  }),
  keywords: [
    'landscape design London',
    'garden design London',
    'outdoor space design',
    'landscape architect London',
    'courtyard design London',
  ],
}

export default function LandscapeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
