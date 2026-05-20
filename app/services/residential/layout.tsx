import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'

export const revalidate = false

export const metadata: Metadata = buildMetadata({
  title: 'Residential Architecture & Interior Design',
  description:
    'From single-room refurbishments to full-house transformations — Aureon Studio creates residential spaces that are calm, considered, and uniquely yours.',
  path: '/services/residential',
})

export default function ResidentialLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
