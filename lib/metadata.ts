import type { Metadata } from 'next'

interface MetadataInput {
  title: string
  description: string
  path: string
  image?: string
}

export function buildMetadata({
  title,
  description,
  path,
  image,
}: MetadataInput): Metadata {
  const base = 'https://aureon.studio'
  const ogImage = image ?? '/og-default.jpg'
  return {
    title: { default: title, template: '%s | Aureon Studio' },
    description,
    metadataBase: new URL(base),
    alternates: { canonical: `${base}${path}` },
    openGraph: {
      title,
      description,
      url: `${base}${path}`,
      siteName: 'Aureon Studio',
      locale: 'en_GB',
      type: 'website',
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}
