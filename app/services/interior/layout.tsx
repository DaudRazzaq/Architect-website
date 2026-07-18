import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'

export const revalidate = false

export const metadata: Metadata = {
  ...buildMetadata({
    title: 'Interior Design Services London | Aureon Studio',
    description:
      'Interior design that creates atmosphere, not just rooms. Aureon Studio designs calm, comfortable interiors for homes, hospitality, and commercial spaces across London.',
    path: '/services/interior',
  }),
  keywords: [
    'interior design London',
    'residential interior design',
    'bespoke interiors London',
    'interior design studio London',
    'home interior designer London',
  ],
}

export default function InteriorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
