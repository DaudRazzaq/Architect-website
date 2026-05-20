import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'

export const revalidate = false

export const metadata: Metadata = buildMetadata({
  title: 'Services',
  description:
    'Aureon Studio offers residential, commercial, and multipurpose design services across the UK. From single-room refurbishments to full architectural projects.',
  path: '/services',
})

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
