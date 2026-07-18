import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'

export const revalidate = false

export const metadata: Metadata = {
  ...buildMetadata({
    title: 'Project Management Services London | Aureon Studio',
    description:
      'From vision to completion. Aureon Studio manages programme delivery, budgets, consultants, and construction oversight for residential and commercial projects in London.',
    path: '/services/project-management',
  }),
  keywords: [
    'project management London',
    'construction project management',
    'programme management London',
    'architectural project management',
    'contract administration London',
  ],
}

export default function ProjectManagementLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
