import { projects } from '@/data/projects'
import type { Project } from '@/types/project'

export async function getAllProjects(): Promise<Project[]> {
  return projects
}

export async function getProjectBySlug(
  slug: string
): Promise<Project | undefined> {
  return projects.find((p) => p.slug === slug)
}
