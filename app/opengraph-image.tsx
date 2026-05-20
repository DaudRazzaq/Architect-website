import { ImageResponse } from 'next/og'

export const alt = 'Aureon Studio — Interior Architecture & Design'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

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
          <span
            style={{
              color: '#d4a574',
              fontSize: '14px',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            Aureon Studio
          </span>
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
