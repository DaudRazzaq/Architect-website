import type { Metadata } from 'next'
import { Playfair_Display, Inter, Poppins } from 'next/font/google'
import { buildOrganisationSchema } from '@/lib/schema'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  preload: true,
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-primary',
  display: 'swap',
  preload: true,
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-accent',
  display: 'swap',
  preload: false,
})

export const metadata: Metadata = {
  title: {
    default: 'Aureon Studio — Interior Architecture & Refurbishment Design',
    template: '%s | Aureon Studio',
  },
  description:
    'A London-based studio delivering interior architecture and refurbishment design with a calm, considered approach.',
  metadataBase: new URL('https://aureon.studio'),
  alternates: { canonical: 'https://aureon.studio' },
  openGraph: {
    siteName: 'Aureon Studio',
    locale: 'en_GB',
    type: 'website',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${poppins.variable}`}
    >
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildOrganisationSchema()),
          }}
        />
        <div id="main-content">{children}</div>
      </body>
    </html>
  )
}

