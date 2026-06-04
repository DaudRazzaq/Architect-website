import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'

export const revalidate = 3600

export const metadata: Metadata = {
  ...buildMetadata({
    title: 'Journal — Interior Design Insights & Architecture Ideas',
    description:
      'The Aureon Studio journal — expert insights on interior design, residential architecture, commercial fit-out, sustainability, and London property refurbishment.',
    path: '/blog',
  }),
  keywords: [
    'interior design blog London',
    'architecture blog London',
    'interior design tips London',
    'home refurbishment advice London',
    'sustainable architecture blog',
    'office design ideas London',
    'kitchen renovation advice London',
    'loft conversion ideas London',
    'interior design inspiration',
    'London architecture journal',
  ],
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
