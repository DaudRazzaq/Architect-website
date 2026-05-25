import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

// AS monogram — identical paths to icon.svg
const SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="90 100 370 370" fill="none">
  <g stroke="#111111" stroke-width="22" stroke-linecap="round" stroke-linejoin="round">
    <path d="M138 360L238 150L322 390"/>
    <path d="M186 275C225 245 278 240 315 282"/>
    <path d="M360 170 C315 195 305 255 350 285 C392 312 430 285 430 340 C430 390 392 420 348 410 C310 402 285 370 286 332"/>
  </g>
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
        {/* Logo at ~65% scale (117px) — generous breathing room, no edge-to-edge */}
        {/* btoa is available globally in Node 16+ and all edge runtimes */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/svg+xml;base64,${btoa(SVG)}`}
          width={117}
          height={117}
          alt="Aureon Studio"
        />
      </div>
    ),
    { ...size },
  )
}
