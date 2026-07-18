import type { Metadata } from 'next'
import { Playfair_Display, Inter, Poppins } from 'next/font/google'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'
import { buildOrganisationSchema } from '@/lib/schema'
import WhatsAppButton from '@/app/components/whatsapp-button/WhatsAppButton'
import { ToastProvider } from '@/app/components/Toast'
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

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  title: {
    default: 'Aureon Studio — Interior Architecture & Refurbishment Design London',
    template: '%s | Aureon Studio',
  },
  description:
    'Aureon Studio — London\'s premier interior architecture and refurbishment design studio. Residential, commercial & multipurpose spaces. Based in Fitzrovia. Call +44 (0)20 7946 0321.',
  metadataBase: new URL('https://aureon.studio'),
  alternates: { canonical: 'https://aureon.studio' },
  keywords: [
    'interior designer London',
    'interior architecture London',
    'interior design studio London',
    'residential interior design London',
    'commercial interior design London',
    'home refurbishment London',
    'office refurbishment London',
    'loft conversion design London',
    'kitchen renovation London',
    'interior design services London',
    'Fitzrovia interior designer',
    'London architecture studio',
    'refurbishment design London',
    'bespoke interior design London',
  ],
  openGraph: {
    siteName: 'Aureon Studio',
    locale: 'en_GB',
    type: 'website',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630, alt: 'Aureon Studio — Interior Architecture London' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@aureonstudio',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '',
  },
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
        <ToastProvider>
          <main id="main-content">{children}</main>
          <WhatsAppButton />
        </ToastProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}

