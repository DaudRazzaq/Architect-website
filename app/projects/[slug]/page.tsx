import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllProjects, getProjectBySlug } from '@/lib/projects'
import { buildMetadata } from '@/lib/metadata'
import { buildProjectSchema } from '@/lib/schema'
import ProjectCaseStudy, { type MoreProject } from './ProjectCaseStudy'

export const revalidate = 86400

interface Props {
  params: Promise<{ slug: string }>
}

// Only data-driven case studies are built here. The original three projects
// have their own static routes (e.g. /projects/oakridge-house), which take
// precedence over this dynamic segment.
export async function generateStaticParams() {
  const projects = await getAllProjects()
  return projects.filter((p) => p.caseStudy).map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project?.caseStudy) return {}
  return buildMetadata({
    title: project.title,
    description: project.description,
    path: `/projects/${project.slug}`,
    image: project.heroImage,
  })
}

export default async function ProjectSlugPage({ params }: Props) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project?.caseStudy) notFound()

  const moreProjects: MoreProject[] = (await getAllProjects())
    .filter((p) => p.slug !== project.slug)
    .map((p) => ({
      title: p.title,
      category: p.category,
      image: p.heroImage,
      href: `/projects/${p.slug}`,
    }))

  const schema = buildProjectSchema(project)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ProjectCaseStudy project={project} moreProjects={moreProjects} />
    </>
  )
}
