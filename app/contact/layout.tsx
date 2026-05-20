import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'

export const revalidate = 0

export const metadata: Metadata = buildMetadata({
  title: 'Get In Touch',
  description:
    'Start your project with Aureon Studio. Tell us about your space, your vision, and your timeline — we will get back to you within two working days.',
  path: '/contact',
})

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
