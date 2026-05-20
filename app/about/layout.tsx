import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'

export const revalidate = false

export const metadata: Metadata = buildMetadata({
  title: 'About Us',
  description:
    "We're a London-based interior architecture studio built on clarity, care and complete delivery. Learn about our story, team, and approach to design.",
  path: '/about',
})

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
