import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'

export const revalidate = false

export const metadata: Metadata = buildMetadata({
  title: 'Commercial Architecture & Interior Design',
  description:
    'Workspace, retail, and hospitality environments designed by Aureon Studio to elevate brand experience, boost productivity, and create lasting impressions.',
  path: '/services/commercial',
})

export default function CommercialLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
