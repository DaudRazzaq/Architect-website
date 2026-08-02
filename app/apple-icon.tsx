import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

// Aureon lambda mark — identical geometry to icon.svg
const MARK =
  'M12.5 107 L0.9 107 L0.9 105.7 L58.4 3.1 L61.7 0.2 L119.9 106.5 L96.6 106 L60.7 41.3 L25.6 105.2 L24.1 106.8 L12.5 107 Z'

const SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 121 108">
  <path fill="#1a1a1a" fill-rule="evenodd" d="${MARK}"/>
</svg>`

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          // Pure white — matches premium off-white Apple icon conventions
          background: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Mark at ~58% width — generous breathing room, no edge-to-edge */}
        {/* btoa is available globally in Node 16+ and all edge runtimes */}
        {/* next/image can't be used inside ImageResponse's Satori renderer — a plain <img> is required here. */}
        <img
          src={`data:image/svg+xml;base64,${btoa(SVG)}`}
          width={104}
          height={93}
          alt="Aureon Studio"
        />
      </div>
    ),
    { ...size },
  )
}
