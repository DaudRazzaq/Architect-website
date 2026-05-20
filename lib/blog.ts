import { posts } from '@/data/posts'
import type { Post } from '@/types/post'

export async function getAllPosts(): Promise<Post[]> {
  return posts
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  return posts.find((p) => p.slug === slug)
}
