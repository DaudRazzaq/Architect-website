import { ImageResponse } from 'next/og'
import { WORDMARK_PATH, WORDMARK_VIEWBOX } from '@/lib/brand'

export const alt = 'Aureon Studio — Interior Architecture & Design'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Wordmark in warm brand gold, rendered from the same vector geometry as the site logo
const WORDMARK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${WORDMARK_VIEWBOX}"><path fill="#d4a574" fill-rule="evenodd" d="${WORDMARK_PATH}"/></svg>`

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          background: '#1a1a1a',
          padding: '80px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              width: '80px',
              height: '1px',
              background: '#d4a574',
            }}
          />
          {/* next/image can't be used inside ImageResponse's Satori renderer — a plain <img> is required here. */}
          <img
            src={`data:image/svg+xml;base64,${btoa(WORDMARK_SVG)}`}
            width={340}
            height={44}
            alt="Aureon Studio"
          />
          <div
            style={{
              width: '80px',
              height: '1px',
              background: '#d4a574',
            }}
          />
        </div>
        <h1
          style={{
            color: '#ffffff',
            fontSize: '64px',
            fontWeight: 400,
            textAlign: 'center',
            lineHeight: 1.1,
            margin: 0,
            marginBottom: '24px',
          }}
        >
          Interior Architecture
          <br />& Design
        </h1>
        <p
          style={{
            color: 'rgba(255,255,255,0.65)',
            fontSize: '22px',
            textAlign: 'center',
            margin: 0,
          }}
        >
          London-based studio · Calm, considered spaces
        </p>
      </div>
    ),
    { ...size }
  )
}
