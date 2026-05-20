import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/app/components/Navigation'
import Footer from '@/app/components/Footer'
import CTAStrip from '@/app/components/CTAStrip'
import { getAllProjects, getProjectBySlug } from '@/lib/projects'
import { buildMetadata } from '@/lib/metadata'
import { buildProjectSchema } from '@/lib/schema'
import './project-slug.css'

export const revalidate = 86400

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const projects = await getAllProjects()
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) return {}
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
  if (!project) notFound()

  const schema = buildProjectSchema(project)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Navigation />
      <CTAStrip />
      <article className="project-detail">
        <header className="project-detail__header">
          <div className="project-detail__hero">
            <Image
              src={project.heroImage}
              alt={`${project.title} — ${project.location}`}
              fill
              priority
              sizes="100vw"
              className="project-detail__hero-img"
            />
            <div className="project-detail__hero-overlay" />
            <div className="project-detail__hero-content">
              <span className="project-detail__category">{project.category}</span>
              <h1 className="project-detail__title">{project.title}</h1>
              <p className="project-detail__location">{project.location} · {project.year}</p>
            </div>
          </div>
        </header>

        <section className="project-detail__body">
          <div className="project-detail__inner">
            <p className="project-detail__description">{project.description}</p>

            <ul className="project-detail__services" aria-label="Services provided">
              {project.services.map((s) => (
                <li key={s} className="project-detail__service-tag">{s}</li>
              ))}
            </ul>
          </div>
        </section>

        {project.images.length > 1 && (
          <section className="project-detail__gallery" aria-label="Project gallery">
            {project.images.slice(1).map((src, i) => (
              <div key={src} className="project-detail__gallery-item">
                <Image
                  src={src}
                  alt={`${project.title} — image ${i + 2}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="project-detail__gallery-img"
                />
              </div>
            ))}
          </section>
        )}

        {project.testimonial && (
          <blockquote className="project-detail__testimonial">
            <p className="project-detail__testimonial-quote">
              &ldquo;{project.testimonial.quote}&rdquo;
            </p>
            <cite className="project-detail__testimonial-author">
              — {project.testimonial.author}
            </cite>
          </blockquote>
        )}

        <nav className="project-detail__back" aria-label="Navigation">
          <Link href="/projects" className="project-detail__back-link">
            ← Back to all projects
          </Link>
        </nav>
      </article>
      <Footer />
    </>
  )
}
