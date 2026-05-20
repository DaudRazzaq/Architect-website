import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'

export const revalidate = 86400

export const metadata: Metadata = buildMetadata({
  title: 'SereniFlow Wellness Centre — Commercial Architecture',
  description:
    'A purpose-built wellness centre in Richmond, London, designed around biophilic principles — connecting occupants to nature through light, material, and form.',
  path: '/projects/sereniflow-wellness-centre',
  image: '/projects/sereniflow-wellness-centre/1.jpeg',
})

export default function SereniFlowLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
