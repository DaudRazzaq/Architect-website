import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Strict TypeScript in CI
  typescript: { ignoreBuildErrors: false },

  // Image optimisation
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2560],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [70, 75, 90],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },

  // Security headers + cache
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=()' },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https:",
              "font-src 'self'",
              "connect-src 'self'",
              // Google Maps embed on /contact. Without this, frame-src falls
              // back to default-src 'self' and the map is silently blocked —
              // the iframe renders as an empty box with a console error only.
              "frame-src 'self' https://www.google.com https://maps.google.com",
            ].join('; '),
          },
        ],
      },
      {
        // Matches every static image actually served from /public
        // (root-level heroes/logos + /public/projects/**), not just a
        // nonexistent /images/ subfolder.
        source: '/:path*.(png|jpg|jpeg|webp|avif|svg|gif|ico)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // Next.js image optimizer output — safe to cache at the edge for a year.
        source: '/_next/image(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ]
  },

  // Clean URL redirects
  async redirects() {
    return [
      { source: '/home', destination: '/', permanent: true },
      { source: '/index', destination: '/', permanent: true },
    ]
  },

  // Remove console.log in production
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Optimise package imports for tree-shaking
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
}

export default nextConfig
