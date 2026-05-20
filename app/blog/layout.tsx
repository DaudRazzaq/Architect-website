import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'

export const revalidate = 3600

export const metadata: Metadata = buildMetadata({
  title: 'Journal',
  description:
    'Insights, ideas, and inspiration from the Aureon Studio team — covering architecture, interior design, sustainability, and the future of the built environment.',
  path: '/blog',
})

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
