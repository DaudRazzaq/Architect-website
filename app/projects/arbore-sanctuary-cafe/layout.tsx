import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'

export const revalidate = 86400

export const metadata: Metadata = buildMetadata({
  title: 'Arboré Sanctuary Café — Multipurpose Design',
  description:
    'A sanctuary café and co-working retreat in Bali blending traditional Balinese craftsmanship with contemporary hospitality design.',
  path: '/projects/arbore-sanctuary-cafe',
  image: '/projects/arbore-sanctuary-cafe/1.jpeg',
})

export default function ArboreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
