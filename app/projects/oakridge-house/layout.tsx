import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'

export const revalidate = 86400

export const metadata: Metadata = buildMetadata({
  title: 'Oakridge House — Residential Architecture',
  description:
    'A considered transformation of a Victorian semi in Cobham, Surrey — restoring original character while introducing calm, contemporary interiors for modern family life.',
  path: '/projects/oakridge-house',
  image: '/projects/oakridge-house/1.jpeg',
})

export default function OakridgeHouseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
