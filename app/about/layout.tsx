import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'

export const revalidate = false

export const metadata: Metadata = {
  ...buildMetadata({
    title: 'About Aureon Studio — London Interior Architecture Studio',
    description:
      'Aureon Studio is a London-based interior architecture studio in Fitzrovia. We design residential and commercial spaces with clarity, care, and complete delivery from concept to completion.',
    path: '/about',
  }),
  keywords: [
    'about Aureon Studio',
    'London interior architecture studio',
    'interior design team London',
    'Fitzrovia design studio',
    'interior architect London',
    'architecture studio Fitzrovia',
    'interior design practice London',
  ],
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
