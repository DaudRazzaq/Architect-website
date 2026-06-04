import type { Metadata } from 'next'
import { getPostBySlug, getAllPosts } from '@/lib/blog'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const base = 'https://aureon.studio'
  const imageUrl = post.image.startsWith('http')
    ? post.image
    : `${base}${post.image}`

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    metadataBase: new URL(base),
    alternates: { canonical: `${base}/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${base}/blog/${post.slug}`,
      siteName: 'Aureon Studio',
      locale: 'en_GB',
      type: 'article',
      publishedTime: post.date,
      authors: [post.author ?? 'Aureon Studio'],
      images: [{ url: imageUrl, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [imageUrl],
    },
  }
}

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
