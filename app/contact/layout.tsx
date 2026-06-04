import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'

export const revalidate = 0

export const metadata: Metadata = {
  ...buildMetadata({
    title: 'Contact Aureon Studio — Interior Architecture London',
    description:
      'Get in touch with Aureon Studio, London\'s interior architecture and refurbishment design studio. Based in Fitzrovia W1T. Free initial consultation. Call +44 (0)20 7946 0321.',
    path: '/contact',
  }),
  keywords: [
    'contact interior designer London',
    'interior design consultation London',
    'hire interior architect London',
    'interior design quote London',
    'Aureon Studio contact',
    'Fitzrovia interior designer',
    'London interior design studio contact',
  ],
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
