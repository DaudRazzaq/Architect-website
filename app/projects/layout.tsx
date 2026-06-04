import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'

export const revalidate = 3600

export const metadata: Metadata = {
  ...buildMetadata({
    title: 'Projects — Interior Architecture Portfolio London',
    description:
      'Explore completed interior architecture and design projects by Aureon Studio London — residential homes, commercial workplaces, and multipurpose spaces across the capital.',
    path: '/projects',
  }),
  keywords: [
    'interior design portfolio London',
    'interior architecture projects London',
    'residential design portfolio',
    'commercial interior design portfolio',
    'London architecture portfolio',
    'interior design case studies London',
    'Aureon Studio projects',
  ],
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
