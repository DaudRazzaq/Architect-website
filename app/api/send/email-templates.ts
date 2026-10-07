/* ═══════════════════════════════════════════════════════════════════
   ENQUIRY EMAILS: studio notification + visitor confirmation

   Table-based HTML with inline styles: the only markup that renders
   reliably across Gmail, Outlook (Windows / Mac / web) and Apple Mail.
   Visual language follows the website: dark header with the cream
   wordmark, the gold accent line, Playfair / Georgia headings and warm
   off-white panels.

   Everything a visitor typed passes through `esc()` before it reaches the
   HTML. The module has no app imports, so the emails can be rendered for
   preview with plain Node, without the Next.js toolchain.
   ═══════════════════════════════════════════════════════════════════ */

export type EnquiryFields = Record<string, string>

export interface EmailContent {
  subject: string
  html: string
  text: string
}

export interface SocialLink {
  label: string
  href: string
}

// ---------------------------------------------------------------------------
// Studio details & design tokens
// ---------------------------------------------------------------------------

/** The live site. Emails load their images from here, so it must be the
 *  final address. The bare domain redirects, and some email clients won't
 *  follow a redirect for an image. */
const SITE_URL = 'https://www.aureonstudio.co.uk'
const SITE_LABEL = 'aureonstudio.co.uk'
const ASSETS = `${SITE_URL}/email`

const STUDIO = {
  legal: 'Aureon Studio Ltd, registered in England and Wales, company no. 17365238',
  tagline: 'Architectural & Interior Design',
  phone: '+44 20 3432 4059',
  phoneHref: 'tel:+442034324059',
  email: 'hello@aureonstudio.co.uk',
  address: ['60 Tottenham Court Road', 'Office 1720, Fitzrovia', 'London W1T 2EW'],
}

/** Cream wordmark for the dark header (intrinsic size of the PNG). */
const LOGO = { src: `${ASSETS}/aureon-wordmark.png`, width: 600, height: 78 }

/** Shown in the confirmation email: one architecture project, one interior.
 *  The thumbnails in /public/email are 600 × 400 crops of the project renders. */
const RECENT_WORK = [
  {
    title: 'Oakridge House',
    caption: 'Architecture & interiors',
    href: `${SITE_URL}/projects/oakridge-house`,
    image: `${ASSETS}/work-oakridge-house.jpg`,
    alt: 'Oakridge House, a brick family home, at dusk',
  },
  {
    title: 'The Reconnected Home',
    caption: 'Interior refurbishment',
    href: `${SITE_URL}/projects/the-reconnected-home`,
    image: `${ASSETS}/work-the-reconnected-home.jpg`,
    alt: 'The Reconnected Home, an open-plan kitchen and living space',
  },
]

const C = {
  page: '#f2efe9',
  card: '#ffffff',
  dark: '#12100e',
  ink: '#1a1a1a',
  body: '#4a4540',
  muted: '#736c65',
  faint: '#857e76',
  /** Labels and links on white: the site's gold, deepened for legibility. */
  bronze: '#8f6a43',
  /** The site's accent (--color-accent): header line and labels on dark. */
  accent: '#d4a574',
  cream: '#f5efe3',
  line: '#e9e3da',
  panel: '#f8f5f0',
  panelLine: '#ebe4d9',
}

const SERIF = "Georgia, 'Times New Roman', serif"
const SANS = "'Helvetica Neue', Helvetica, Arial, sans-serif"

/** The reply promise shown on the contact page. Keep the two in step. */
const RESPONSE_TIME = 'within one business day'

const FIELD_LABELS: Record<string, string> = {
  name: 'Name',
  email: 'Email',
  phone: 'Phone',
  company: 'Company',
  service: 'Service',
  location: 'Property postcode',
  budget: 'Estimated budget',
  timeline: 'Timeline',
  message: 'About the project',
  referral: 'How they found us',
  howHeard: 'How they found us',
  bestTime: 'Best time to contact',
  address: 'Address',
}

const SOURCE_LABELS: Record<string, string> = {
  'contact-page': 'the contact page',
  'get-in-touch': 'the Get in Touch form (home / about page)',
}

/** Project facts, shown as the grid at the top of the studio notification. */
const FACT_KEYS = ['service', 'budget', 'timeline', 'location']

/** Fields the studio notification lays out itself. Anything else a form
 *  sends is added to the contact details, so nothing is ever dropped. */
const STRUCTURED_FIELDS = new Set(['name', 'email', 'phone', 'company', 'message', 'referral', ...FACT_KEYS])

const NEXT_STEPS = [
  {
    title: 'We review your brief',
    body: 'Our team reads your enquiry carefully to understand your property, your goals and what you need from us.',
  },
  {
    title: 'Initial consultation',
    body: 'We’ll schedule a complimentary 30-minute call to discuss your vision, timeline and budget.',
  },
  {
    title: 'Tailored proposal',
    body: 'You’ll receive a detailed proposal outlining our approach, fees and project roadmap.',
  },
]

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function esc(value: unknown): string {
  if (typeof value !== 'string') return ''
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}

/** Typed text with its line breaks normalised and long runs of blank
 *  lines collapsed. */
const tidyLines = (value: string) => value.replace(/\r\n?/g, '\n').replace(/\n{3,}/g, '\n\n')

/** Escaped, keeping the visitor's line breaks (Outlook ignores pre-wrap). */
const escMultiline = (value: string) => esc(tidyLines(value)).replace(/\n/g, '<br>')

const field = (fields: EnquiryFields, key: string) => (fields[key] ?? '').trim()

/** Subjects and preview text: one short line. */
function oneLine(value: string, max = 80): string {
  const flat = value.replace(/\s+/g, ' ').trim()
  return flat.length > max ? `${flat.slice(0, max - 1).trimEnd()}…` : flat
}

const labelFor = (key: string) =>
  FIELD_LABELS[key] ?? key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')

function formatReceived(date: Date): string {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

const HONORIFIC = /^(mr|mrs|ms|miss|mx|dr|prof|sir|dame|lady|lord)\.?$/i
const PLAIN_NAME = /^\p{L}[\p{L}\p{M}'’-]{0,29}$/u

/** Given name for greetings, skipping a leading title ("Dr Jane Smith" →
 *  "Jane"). Null when there isn't a plausible one, so the emails fall back
 *  to wording without a name. */
function givenName(name: string): string | null {
  const words = name.trim().split(/\s+/).filter(Boolean)
  const given = HONORIFIC.test(words[0] ?? '') ? (words.length > 2 ? words[1] : '') : (words[0] ?? '')
  const clean = given.replace(/[.,;:!?]+$/, '')
  if (!PLAIN_NAME.test(clean)) return null
  return clean.charAt(0).toUpperCase() + clean.slice(1)
}

/** The confirmation goes to whatever address was typed into the form, so it
 *  only repeats short, plain answers. A link, an email address or free text
 *  can never be relayed to a third party under the studio's name. */
const ECHO_SAFE = /^[\p{L}\p{M}\p{N} ,'’()£&+\u2013-]{1,60}$/u

/** RFC 6068: `?`, `&` or `#` in a typed address would otherwise start a
 *  query (and could slip in a cc). Encode them, but keep the @ readable. */
function mailtoHref(address: string, subject?: string): string {
  const to = encodeURIComponent(address).replace(/%40/g, '@')
  return `mailto:${to}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`
}

/** Dialable form of a typed number: digits and a leading +, without the
 *  "(0)" UK numbers are often written with. Null if nothing is dialable. */
function telHref(phone: string): string | null {
  const dial = phone.replace(/\(0\)/g, '').replace(/[^\d+]/g, '').replace(/(?!^)\+/g, '')
  return /\d{6,}/.test(dial) ? `tel:${dial}` : null
}

// ---------------------------------------------------------------------------
// Building blocks
// ---------------------------------------------------------------------------

function documentShell({ title, preheader, rows }: { title: string; preheader: string; rows: string }): string {
  return `<!DOCTYPE html>
<html lang="en-GB" dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="x-apple-disable-message-reformatting">
<meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${esc(title)}</title>
<!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&amp;display=swap" rel="stylesheet">
<style>
  body { margin: 0; padding: 0; width: 100% !important; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
  table { border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
  img { border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }
  a { text-decoration: none; }
  @media only screen and (max-width: 620px) {
    .outer { padding: 0 0 32px !important; }
    .px { padding-left: 24px !important; padding-right: 24px !important; }
    .panel-pad { padding-left: 18px !important; padding-right: 18px !important; }
    .stack { display: block !important; width: 100% !important; box-sizing: border-box !important; padding-right: 0 !important; }
    .stack-gap { padding-top: 22px !important; }
    .h1 { font-size: 29px !important; line-height: 1.2 !important; }
    .tagline { letter-spacing: 2px !important; }
    .links { letter-spacing: 1.5px !important; }
    .dl-label { display: block !important; width: auto !important; padding: 14px 0 3px !important; border-bottom: 0 !important; }
    .dl-value { display: block !important; padding: 0 0 12px !important; }
  }
</style>
<style>
  /* Kept apart from the block above: a client that rejects a rule here
     must not throw away the layout rules with it. */
  @media screen { .serif { font-family: 'Playfair Display', Georgia, 'Times New Roman', serif !important; } }
</style>
<style>
  :root { color-scheme: light; supported-color-schemes: light; }
</style>
</head>
<body style="margin:0;padding:0;word-spacing:normal;background-color:${C.page};">
<div role="article" aria-roledescription="email" aria-label="${esc(title)}" lang="en-GB" dir="ltr" style="background-color:${C.page};">
<div style="display:none;max-height:0;max-width:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:${C.page};opacity:0;">${esc(preheader)}${'&#847;&zwnj;&nbsp;'.repeat(40)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.page}" style="background-color:${C.page};">
  <tr>
    <td class="outer" align="center" style="padding:32px 12px 40px;">
      <!--[if mso]><table role="presentation" align="center" width="600" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;margin:0 auto;">
${rows}
      </table>
      <!--[if mso]></td></tr></table><![endif]-->
    </td>
  </tr>
</table>
</div>
</body>
</html>`
}

function logoImg(width: number): string {
  const height = Math.round((width * LOGO.height) / LOGO.width)
  return `<img src="${LOGO.src}" width="${width}" height="${height}" alt="AUREON STUDIO" style="display:block;width:${width}px;max-width:100%;height:auto;border:0;color:${C.cream};font-family:${SERIF};font-size:16px;letter-spacing:4px;">`
}

/** The site's gold line under the dark header. */
const hairline = `        <tr><td height="2" bgcolor="${C.accent}" style="height:2px;font-size:2px;line-height:2px;mso-line-height-rule:exactly;background-color:${C.accent};">&nbsp;</td></tr>`

/** One band of the white card. */
function section(inner: string, padding: string): string {
  return `        <tr>
          <td bgcolor="${C.card}" class="px" style="background-color:${C.card};padding:${padding};">
${inner}
          </td>
        </tr>`
}

const eyebrow = (text: string, margin = '0 0 14px') =>
  `<p style="margin:${margin};font-family:${SANS};font-size:11px;font-weight:600;line-height:1.4;letter-spacing:2.5px;text-transform:uppercase;color:${C.bronze};">${esc(text)}</p>`

/** `html` must already be escaped. */
const paragraph = (html: string, margin = '0 0 16px') =>
  `<p style="margin:${margin};font-family:${SANS};font-size:15px;line-height:1.7;color:${C.body};">${html}</p>`

/** Bulletproof button: the padding lives on the link everywhere except
 *  Outlook for Windows, which ignores it there and reads mso-padding-alt. */
function button(label: string, href: string, variant: 'solid' | 'outline' = 'solid'): string {
  const solid = variant === 'solid'
  const background = solid ? C.ink : C.card
  const target = /^https?:/.test(href) ? ' target="_blank"' : ''
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td bgcolor="${background}" style="background-color:${background};border:1px solid ${C.ink};mso-padding-alt:15px 26px;">
                  <a href="${esc(href)}"${target} style="display:inline-block;padding:15px 26px;font-family:${SANS};font-size:11px;font-weight:600;line-height:16px;letter-spacing:2px;text-transform:uppercase;color:${solid ? '#ffffff' : C.ink};text-decoration:none;">${esc(label)}&nbsp;&nbsp;&rarr;</a>
                </td>
              </tr>
            </table>`
}

/** Buttons side by side, wrapping onto a new line when they don't fit.
 *  Outlook for Windows ignores inline-block and simply stacks them. */
function buttonRow(buttons: string[]): string {
  return `<div style="font-size:0;line-height:0;">${buttons
    .map((html) => `<div style="display:inline-block;vertical-align:top;margin:0 12px 12px 0;">${html}</div>`)
    .join('')}</div>`
}

/** Label / value rows. Values arrive already escaped. On phones each label
 *  sits above its value so long addresses keep the full width. */
function detailRows(rows: { label: string; value: string }[]): string {
  return rows
    .map(({ label, value }, i) => {
      const divider = i < rows.length - 1 ? `border-bottom:1px solid ${C.panelLine};` : ''
      return `<tr>
                    <td class="dl-label" valign="top" width="160" style="width:160px;padding:16px 16px 13px 0;${divider}font-family:${SANS};font-size:10px;font-weight:600;line-height:1.5;letter-spacing:2px;text-transform:uppercase;color:${C.muted};">${esc(label)}</td>
                    <td class="dl-value" valign="top" style="padding:11px 0;${divider}font-family:${SANS};font-size:14px;line-height:1.6;color:${C.ink};word-break:break-word;">${value}</td>
                  </tr>`
    })
    .join('\n                  ')
}

/** Warm off-white box with a title. */
function panel(title: string, inner: string): string {
  return `            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.panel}" style="background-color:${C.panel};border:1px solid ${C.panelLine};">
              <tr>
                <td class="panel-pad" style="padding:24px 26px 10px;">
                  ${eyebrow(title, '0 0 4px')}
                  ${inner}
                </td>
              </tr>
            </table>`
}

function contactBand(): string {
  const label = (text: string) =>
    `<p style="margin:0 0 8px;font-family:${SANS};font-size:10px;font-weight:600;line-height:1.4;letter-spacing:2.5px;text-transform:uppercase;color:${C.accent};">${text}</p>`
  const text = `font-family:${SANS};font-size:13px;line-height:1.75;color:${C.cream};`
  return `        <tr>
          <td bgcolor="${C.dark}" class="px" style="background-color:${C.dark};padding:34px 48px 36px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td class="stack" valign="top" width="50%" style="padding-right:16px;">
                  ${label('Contact')}
                  <p style="margin:0;${text}"><a href="${STUDIO.phoneHref}" style="color:${C.cream};text-decoration:none;">${STUDIO.phone}</a><br><a href="mailto:${STUDIO.email}" style="color:${C.cream};text-decoration:none;">${STUDIO.email}</a></p>
                </td>
                <td class="stack stack-gap" valign="top" width="50%">
                  ${label('Studio')}
                  <p style="margin:0;${text}">${STUDIO.address.map(esc).join('<br>')}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>`
}

function recentWork(): string {
  const card = (work: (typeof RECENT_WORK)[number], padding: string) => `<td width="50%" valign="top" style="${padding}">
                  <a href="${work.href}" target="_blank" style="text-decoration:none;"><img src="${work.image}" width="244" height="163" alt="${esc(work.alt)}" style="display:block;width:100%;max-width:244px;height:auto;border:0;background-color:${C.line};font-family:${SANS};font-size:12px;color:${C.muted};"></a>
                  <p class="serif" style="margin:14px 0 3px;font-family:${SERIF};font-size:17px;line-height:1.3;"><a href="${work.href}" target="_blank" style="color:${C.ink};text-decoration:none;">${esc(work.title)}</a></p>
                  <p style="margin:0;font-family:${SANS};font-size:12px;line-height:1.5;color:${C.muted};">${esc(work.caption)}</p>
                </td>`
  return `        <tr>
          <td bgcolor="${C.panel}" class="px" style="background-color:${C.panel};padding:44px 48px 48px;border-top:1px solid ${C.panelLine};">
            ${eyebrow('While you wait')}
            <h2 class="serif" style="margin:0 0 26px;font-family:${SERIF};font-size:26px;line-height:1.25;font-weight:400;color:${C.ink};">Explore our recent work</h2>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                ${card(RECENT_WORK[0], 'padding-right:8px;')}
                ${card(RECENT_WORK[1], 'padding-left:8px;')}
              </tr>
            </table>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding-top:30px;">
            ${button('View all projects', `${SITE_URL}/projects`)}
                </td>
              </tr>
            </table>
          </td>
        </tr>`
}

function legalFooter({ note, socials = [] }: { note: string; socials?: readonly SocialLink[] }): string {
  const links = socials.length
    ? `<p class="links" style="margin:0 0 14px;font-family:${SANS};font-size:10px;font-weight:600;line-height:1.8;letter-spacing:2.5px;text-transform:uppercase;">${[
        ...socials,
        { label: 'Website', href: SITE_URL },
      ]
        .map((link) => `<a href="${esc(link.href)}" target="_blank" style="color:${C.bronze};text-decoration:none;">${esc(link.label)}</a>`)
        .join(' &nbsp;&middot;&nbsp; ')}</p>
            `
    : ''
  return `        <tr>
          <td align="center" class="px" style="padding:28px 40px 0;">
            ${links}<p style="margin:0 0 6px;font-family:${SANS};font-size:11px;line-height:1.7;color:${C.muted};">${esc(STUDIO.legal)}</p>
            <p style="margin:0;font-family:${SANS};font-size:11px;line-height:1.7;color:${C.faint};">${esc(note)}</p>
          </td>
        </tr>`
}

// ---------------------------------------------------------------------------
// 1. Studio notification, sent to hello@aureonstudio.co.uk
// ---------------------------------------------------------------------------

export function buildStudioNotification(
  fields: EnquiryFields,
  { source, receivedAt }: { source: string; receivedAt: Date },
): EmailContent {
  const name = field(fields, 'name')
  const who = givenName(name)
  const short = who && who.length <= 16 ? who : null
  const email = field(fields, 'email')
  const phone = field(fields, 'phone')
  const tel = telHref(phone)
  const service = field(fields, 'service')
  const message = field(fields, 'message')
  const received = formatReceived(receivedAt)
  const via = SOURCE_LABELS[source] ?? source
  const detailKeys = ['company', 'referral', ...Object.keys(fields).filter((key) => !STRUCTURED_FIELDS.has(key))].filter(
    (key) => field(fields, key),
  )

  const notProvided = `<span style="color:${C.faint};">Not provided</span>`
  const link = (href: string, text: string) =>
    `<a href="${esc(href)}" style="color:${C.bronze};text-decoration:none;">${esc(text)}</a>`

  const fact = (key: string) => {
    const value = field(fields, key)
    return `<td class="stack" valign="top" width="50%" style="padding:0 16px 24px 0;">
                  <p style="margin:0 0 6px;font-family:${SANS};font-size:10px;font-weight:600;line-height:1.5;letter-spacing:2px;text-transform:uppercase;color:${C.muted};">${esc(labelFor(key))}</p>
                  <p style="margin:0;font-family:${SANS};font-size:17px;line-height:1.4;color:${C.ink};word-break:break-word;">${value ? esc(value) : notProvided}</p>
                </td>`
  }

  const contactRows = [
    { label: labelFor('email'), value: link(mailtoHref(email), email) },
    { label: labelFor('phone'), value: phone ? (tel ? link(tel, phone) : esc(phone)) : notProvided },
    ...detailKeys.map((key) => ({ label: labelFor(key), value: escMultiline(field(fields, key)) })),
  ]

  const rows = `        <tr>
          <td bgcolor="${C.dark}" class="px" style="background-color:${C.dark};padding:26px 48px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td valign="middle"><a href="${SITE_URL}" target="_blank" style="display:inline-block;text-decoration:none;">${logoImg(150)}</a></td>
                <td valign="middle" align="right" style="font-family:${SANS};font-size:10px;font-weight:600;letter-spacing:2.5px;text-transform:uppercase;white-space:nowrap;color:${C.accent};">New enquiry</td>
              </tr>
            </table>
          </td>
        </tr>
${hairline}
${section(
  `            ${eyebrow('Enquiry from')}
            <h1 class="h1 serif" style="margin:0 0 12px;font-family:${SERIF};font-size:34px;line-height:1.15;font-weight:400;color:${C.ink};word-break:break-word;">${esc(name)}</h1>
            <p style="margin:0;font-family:${SANS};font-size:13px;line-height:1.6;color:${C.muted};">Received ${esc(received)} via ${esc(via)}</p>`,
  '44px 48px 30px',
)}
${section(
  `            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid ${C.line};">
              <tr><td colspan="2" height="28" style="height:28px;font-size:0;line-height:0;">&nbsp;</td></tr>
              <tr>${fact('service')}${fact('budget')}</tr>
              <tr>${fact('timeline')}${fact('location')}</tr>
            </table>`,
  '0 48px 4px',
)}
${section(
  panel(
    'Contact details',
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  ${detailRows(contactRows)}
                  </table>`,
  ),
  '0 48px 8px',
)}
${section(
  `            ${eyebrow(labelFor('message'))}
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding:2px 0 2px 20px;border-left:2px solid ${C.accent};font-family:${SANS};font-size:15px;line-height:1.75;color:${message ? C.ink : C.faint};word-break:break-word;">${message ? escMultiline(message) : 'No message provided.'}</td>
              </tr>
            </table>`,
  '32px 48px 8px',
)}
${section(
  `            ${buttonRow([
    button(short ? `Reply to ${short}` : 'Reply by email', mailtoHref(email, 'Your enquiry with Aureon Studio')),
    ...(tel ? [button(short ? `Call ${short}` : 'Call back', tel, 'outline')] : []),
  ])}
            <p style="margin:6px 0 0;font-family:${SANS};font-size:13px;line-height:1.6;color:${C.muted};">Replying to this email also goes straight to ${who ? esc(who) : 'the enquirer'}.</p>`,
  '32px 48px 44px',
)}
${legalFooter({ note: `Enquiry notification from the website form on ${SITE_LABEL}.` })}`

  const text = [
    'NEW WEBSITE ENQUIRY',
    name,
    `Received ${received} via ${via}`,
    '',
    ...FACT_KEYS.map((key) => `${labelFor(key)}: ${field(fields, key) || 'Not provided'}`),
    '',
    'CONTACT DETAILS',
    `${labelFor('email')}: ${email}`,
    `${labelFor('phone')}: ${phone || 'Not provided'}`,
    ...detailKeys.map((key) => `${labelFor(key)}: ${field(fields, key)}`),
    '',
    labelFor('message').toUpperCase(),
    message ? tidyLines(message) : 'No message provided.',
    '',
    `Reply to this email to respond to ${who ?? 'the enquirer'} directly.`,
  ].join('\n')

  const preview = FACT_KEYS.map((key) => field(fields, key))
    .filter(Boolean)
    .map((value) => oneLine(value, 40))
    .join(' · ')

  return {
    subject: `New enquiry from ${oneLine(name)}${service ? ` · ${oneLine(service)}` : ''}`,
    html: documentShell({
      title: `New enquiry from ${oneLine(name)}`,
      preheader: preview || `New enquiry from ${oneLine(name)}`,
      rows,
    }),
    text,
  }
}

// ---------------------------------------------------------------------------
// 2. Visitor confirmation, sent to the person who submitted the form
// ---------------------------------------------------------------------------

const intro = (responseTime: string) =>
  `We’ve received your enquiry and it’s now with our design team. We’ll be in touch ${responseTime} to arrange a conversation about your project.`

const FOLLOW_UP =
  'If anything else comes to mind in the meantime, such as photos of the property, existing drawings or a few images you love, simply reply to this email and it will reach us directly.'

export function buildVisitorConfirmation(
  fields: EnquiryFields,
  { socials = [] }: { socials?: readonly SocialLink[] } = {},
): EmailContent {
  const first = givenName(field(fields, 'name'))
  const heading = first ? `Thank you, ${first}.` : 'Thank you for your enquiry.'
  const summary = ['service', 'location', 'budget', 'timeline']
    .map((key) => ({ label: labelFor(key), value: field(fields, key) }))
    .filter(({ value }) => ECHO_SAFE.test(value))

  const steps = NEXT_STEPS.map(
    (step, i) => `<tr>
                <td valign="top" width="48" class="serif" style="width:48px;padding:0;font-family:${SERIF};font-size:22px;font-style:italic;line-height:1.1;color:${C.accent};">0${i + 1}</td>
                <td valign="top" style="padding:0 0 ${i < NEXT_STEPS.length - 1 ? 24 : 0}px;">
                  <p style="margin:0 0 4px;font-family:${SANS};font-size:15px;font-weight:600;line-height:1.4;color:${C.ink};">${esc(step.title)}</p>
                  <p style="margin:0;font-family:${SANS};font-size:14px;line-height:1.65;color:${C.body};">${esc(step.body)}</p>
                </td>
              </tr>`,
  ).join('\n              ')

  const rows = `        <tr>
          <td bgcolor="${C.dark}" align="center" class="px" style="background-color:${C.dark};padding:40px 48px 34px;">
            <a href="${SITE_URL}" target="_blank" style="display:inline-block;text-decoration:none;">${logoImg(200)}</a>
            <p class="tagline" style="margin:18px 0 0;font-family:${SANS};font-size:10px;font-weight:600;line-height:1.5;letter-spacing:3px;text-transform:uppercase;color:${C.accent};">${esc(STUDIO.tagline)}</p>
          </td>
        </tr>
${hairline}
${section(
  `            ${eyebrow('Enquiry received')}
            <h1 class="h1 serif" style="margin:0 0 22px;font-family:${SERIF};font-size:34px;line-height:1.18;font-weight:400;color:${C.ink};">${esc(heading)}</h1>
            ${paragraph(intro(`<strong style="font-weight:600;color:${C.ink};">${RESPONSE_TIME}</strong>`))}
            ${paragraph(esc(FOLLOW_UP), '0')}`,
  '48px 48px 8px',
)}
${section(
  `            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid ${C.line};">
              <tr>
                <td style="padding-top:34px;">
                  ${eyebrow('What happens next', '0 0 22px')}
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              ${steps}
                  </table>
                </td>
              </tr>
            </table>`,
  '36px 48px 8px',
)}
${
  summary.length
    ? `${section(
        panel(
          'Your enquiry',
          `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  ${detailRows(summary.map(({ label, value }) => ({ label, value: esc(value) })))}
                  </table>`,
        ),
        '30px 48px 8px',
      )}\n`
    : ''
}${section(
  `            ${paragraph('Warm regards,', '0 0 6px')}
            <p class="serif" style="margin:0;font-family:${SERIF};font-size:22px;line-height:1.3;color:${C.ink};">The Aureon Studio team</p>`,
  '34px 48px 48px',
)}
${recentWork()}
${contactBand()}
${legalFooter({
  note: `You’re receiving this one-off email because this address was used to send an enquiry on ${SITE_LABEL}. If that wasn’t you, please ignore it.`,
  socials,
})}`

  const text = [
    heading,
    '',
    intro(RESPONSE_TIME),
    '',
    FOLLOW_UP,
    '',
    'WHAT HAPPENS NEXT',
    ...NEXT_STEPS.map((step, i) => `${i + 1}. ${step.title}: ${step.body}`),
    ...(summary.length ? ['', 'YOUR ENQUIRY', ...summary.map(({ label, value }) => `${label}: ${value}`)] : []),
    '',
    'Warm regards,',
    'The Aureon Studio team',
    '',
    `Explore our recent work: ${SITE_URL}/projects`,
    '',
    '--',
    'Aureon Studio',
    `${STUDIO.phone} · ${STUDIO.email}`,
    STUDIO.address.join(', '),
    STUDIO.legal,
  ].join('\n')

  return {
    subject: 'Thank you for contacting Aureon Studio',
    html: documentShell({
      title: 'Thank you for contacting Aureon Studio',
      preheader: first
        ? `Thank you, ${first}. We’ll be in touch ${RESPONSE_TIME}.`
        : `We’ve received your enquiry and will be in touch ${RESPONSE_TIME}.`,
      rows,
    }),
    text,
  }
}
