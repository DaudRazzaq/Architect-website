import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'

export const revalidate = 3600

export const metadata: Metadata = buildMetadata({
  title: 'Our Work',
  description:
    'Explore completed architecture and interior design projects by Aureon Studio — residential homes, commercial spaces, and multipurpose environments across the UK and beyond.',
  path: '/projects',
})

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
