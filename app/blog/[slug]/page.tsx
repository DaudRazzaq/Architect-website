import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/app/components/Navigation'
import Footer from '@/app/components/Footer'
import CTAStrip from '@/app/components/CTAStrip'
import { getAllPosts, getPostBySlug } from '@/lib/blog'
import { buildArticleSchema } from '@/lib/schema'
import './post.css'

export const revalidate = 86400

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((p) => ({ slug: p.slug }))
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const allPosts = await getAllPosts()
  const related = allPosts
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, 3)
    .concat(allPosts.filter((p) => p.slug !== slug && p.category !== post.category))
    .slice(0, 3)

  const base = 'https://aureon.studio'
  const articleSchema = buildArticleSchema({
    title: post.title,
    description: post.description,
    image: post.image,
    date: post.date,
    url: `${base}/blog/${post.slug}`,
    keywords: post.keywords,
  })

  return (
    <>
      <Navigation />
      <CTAStrip />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* ── ARTICLE HERO ── */}
      <section className="post-hero">
        <div className="post-hero-image-wrap">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            sizes="100vw"
            className="post-hero-image"
          />
          <div className="post-hero-overlay" />
        </div>
        <div className="post-hero-content">
          <Link href="/blog" className="post-back">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back to Journal
          </Link>
          <span className="post-category">{post.category}</span>
          <h1 className="post-title">{post.title}</h1>
          <div className="post-meta">
            <span>{post.date}</span>
            {post.readTime && <><span className="post-meta-dot">·</span><span>{post.readTime}</span></>}
            <span className="post-meta-dot">·</span>
            <span>{post.author ?? 'Aureon Studio'}</span>
          </div>
        </div>
      </section>

      {/* ── ARTICLE BODY ── */}
      <article className="post-article">
        <div className="post-container">

          {/* Description lead */}
          <p className="post-lead">{post.description}</p>

          {/* Article content */}
          {post.content ? (
            <div
              className="post-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          ) : (
            <p className="post-content">
              This article is coming soon. <Link href="/contact">Contact us</Link> to learn more.
            </p>
          )}

          {/* Keywords tags */}
          {post.keywords && post.keywords.length > 0 && (
            <div className="post-tags">
              {post.keywords.slice(0, 5).map((kw) => (
                <span key={kw} className="post-tag">{kw}</span>
              ))}
            </div>
          )}

          {/* ── CTA ── */}
          <div className="post-cta-block">
            <span className="post-cta-eyebrow">Work with us</span>
            <h2 className="post-cta-heading">Ready to Start Your Project?</h2>
            <p className="post-cta-body">
              Aureon Studio is a London-based interior architecture studio delivering residential and commercial
              projects across the capital. Every great project starts with a conversation.
            </p>
            <Link href="/contact" className="post-cta-btn">
              Get in Touch
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </article>

      {/* ── RELATED POSTS ── */}
      {related.length > 0 && (
        <section className="post-related">
          <div className="post-container">
            <div className="post-related-header">
              <span className="post-related-eyebrow">Continue Reading</span>
              <h2 className="post-related-heading">More from the Journal</h2>
            </div>
            <div className="post-related-grid">
              {related.map((r) => (
                <Link key={r.slug} href={`/blog/${r.slug}`} className="post-related-card">
                  <div className="post-related-image-wrap">
                    <Image
                      src={r.image}
                      alt={r.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="post-related-image"
                    />
                  </div>
                  <div className="post-related-info">
                    <span className="post-related-category">{r.category}</span>
                    <h3 className="post-related-title">{r.title}</h3>
                    <span className="post-related-date">{r.date}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </>
  )
}
