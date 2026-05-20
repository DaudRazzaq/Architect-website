import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'

export const revalidate = false

export const metadata: Metadata = buildMetadata({
  title: 'Multipurpose Design',
  description:
    'Hybrid spaces that flex between residential and commercial demands — wellness centres, boutique hotels, co-working retreats, and mixed-use developments.',
  path: '/services/multipurpose',
})

export default function MultipurposeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
