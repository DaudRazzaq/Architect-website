import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

const resend = new Resend(process.env.RESEND_API_KEY)

// ---------------------------------------------------------------------------
// Rate limiting — in-memory per serverless instance.
// For production at scale, replace with Upstash Redis.
// ---------------------------------------------------------------------------
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const windowMs = 60 * 60 * 1000 // 1 hour
  const entry = rateLimitMap.get(ip)

  if (!entry || entry.resetAt < now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs })
    return true
  }
  if (entry.count >= 5) return false
  entry.count += 1
  return true
}

// ---------------------------------------------------------------------------
// Input schema
// ---------------------------------------------------------------------------
const sendSchema = z.object({
  /** Identifies which form triggered the submission (e.g. "contact-page") */
  source: z.string().min(1).max(60),
  /** Honeypot — bots fill this; humans leave it empty */
  website: z.string().max(0, 'Bot detected').optional(),
  /** Dynamic key/value pairs representing the form fields */
  fields: z.record(z.string(), z.string().max(5000)),
})

// ---------------------------------------------------------------------------
// HTML escape — all user input that ends up in the email must pass through this
// ---------------------------------------------------------------------------
function escHtml(value: unknown): string {
  if (typeof value !== 'string') return ''
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}

// ---------------------------------------------------------------------------
// Field label display map
// ---------------------------------------------------------------------------
const FIELD_LABELS: Record<string, string> = {
  name: 'Full Name',
  email: 'Email Address',
  phone: 'Phone Number',
  company: 'Company / Organisation',
  service: 'Service Requested',
  location: 'Project Location',
  budget: 'Estimated Budget',
  timeline: 'Project Timeline',
  message: 'Message / Vision',
  referral: 'How They Found Us',
  howHeard: 'How They Found Us',
  bestTime: 'Best Time to Contact',
  address: 'Address',
}

const SOURCE_LABELS: Record<string, string> = {
  'contact-page': 'Main Contact Page',
  'get-in-touch': 'Get In Touch (Service Page)',
}

// ---------------------------------------------------------------------------
// Dynamic HTML email builder
// ---------------------------------------------------------------------------
function buildEmailHtml(source: string, fields: Record<string, string>): string {
  const rows = Object.entries(fields)
    .filter(([, val]) => val && val.trim())
    .map(([key, val]) => {
      const rawLabel = FIELD_LABELS[key] ?? key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')
      const isMultiLine = key === 'message'
      return `
        <tr>
          <td style="padding:14px 20px;border-bottom:1px solid #f0ede8;width:176px;vertical-align:top;
                     font-family:Georgia,'Times New Roman',serif;font-size:10px;letter-spacing:0.12em;
                     text-transform:uppercase;color:#9a9590;white-space:nowrap;">
            ${escHtml(rawLabel)}
          </td>
          <td style="padding:14px 20px;border-bottom:1px solid #f0ede8;
                     font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
                     font-size:14px;line-height:1.6;color:#1a1a1a;
                     ${isMultiLine ? 'white-space:pre-wrap;' : ''}">
            ${escHtml(val)}
          </td>
        </tr>`
    })
    .join('')

  const timestamp = new Date().toLocaleString('en-GB', {
    timeZone: 'Europe/London',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  const sourceLabel = SOURCE_LABELS[source] ?? escHtml(source)

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>New Enquiry — Aureon Studio</title>
</head>
<body style="margin:0;padding:0;background-color:#f5f3f0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
         style="background-color:#f5f3f0;padding:48px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" role="presentation"
             style="max-width:600px;width:100%;">

        <!-- ── HEADER ── -->
        <tr>
          <td style="background-color:#111111;padding:40px 40px 36px;border-radius:6px 6px 0 0;">
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                <td>
                  <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:9px;
                            letter-spacing:0.22em;text-transform:uppercase;color:#888888;">
                    Aureon Studio
                  </p>
                  <h1 style="margin:10px 0 0;font-family:Georgia,'Times New Roman',serif;
                             font-size:22px;font-weight:400;color:#ffffff;letter-spacing:0.02em;">
                    New Enquiry Received
                  </h1>
                </td>
                <td align="right" style="vertical-align:top;">
                  <p style="margin:0;font-size:11px;color:#666666;">${escHtml(timestamp)}</p>
                  <p style="margin:4px 0 0;font-family:Georgia,serif;font-size:11px;
                            color:#888888;letter-spacing:0.04em;">
                    ${escHtml(sourceLabel)}
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ── ACCENT LINE ── -->
        <tr><td style="background-color:#c9a96e;height:2px;"></td></tr>

        <!-- ── FIELDS ── -->
        <tr>
          <td style="background-color:#ffffff;border-radius:0 0 6px 6px;padding:0;">
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
              ${rows}
            </table>
          </td>
        </tr>

        <!-- ── FOOTER ── -->
        <tr>
          <td style="padding:28px 0 0;">
            <p style="margin:0;font-size:11px;color:#aaaaaa;text-align:center;letter-spacing:0.04em;
                      line-height:1.8;">
              This message was submitted via the Aureon Studio website.<br>
              14 Fitzroy Square, Fitzrovia, London W1T 6EH
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}

// ---------------------------------------------------------------------------
// Plain-text bodies — critical for spam score (HTML-only = spam signal)
// ---------------------------------------------------------------------------
function buildAdminText(source: string, fields: Record<string, string>): string {
  const sourceLabel = SOURCE_LABELS[source] ?? source
  const timestamp = new Date().toLocaleString('en-GB', {
    timeZone: 'Europe/London',
    day: '2-digit', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
  const lines = Object.entries(fields)
    .filter(([, v]) => v?.trim())
    .map(([k, v]) => {
      const label = FIELD_LABELS[k] ?? k.charAt(0).toUpperCase() + k.slice(1).replace(/([A-Z])/g, ' $1')
      return `${label}: ${v.trim()}`
    })
  return [
    'NEW ENQUIRY -- AUREON STUDIO',
    '='.repeat(40),
    ...lines,
    '',
    `Form: ${sourceLabel}`,
    `Time: ${timestamp}`,
  ].join('\n')
}

function buildAutoReplyText(name: string, fields: Record<string, string>): string {
  const firstName = name.trim().split(' ')[0]
  const year = new Date().getFullYear()
  const receiptKeys = ['service', 'location', 'budget', 'timeline']
  const receiptLabels: Record<string, string> = {
    service: 'Service', location: 'Location', budget: 'Budget', timeline: 'Timeline',
  }
  const receipt = receiptKeys
    .filter((k) => fields[k]?.trim())
    .map((k) => `  ${receiptLabels[k]}: ${fields[k]}`)
    .join('\n')

  return [
    `Dear ${firstName},`,
    '',
    'Thank you for reaching out to Aureon Studio. We have received your project enquiry',
    'and can confirm it is now being reviewed by our design team.',
    '',
    'Our architects will carefully consider the details of your brief and get back to',
    'you within 24-48 hours.',
    '',
    'If you have any additional information to share in the meantime, please reply',
    'directly to this email.',
    '',
    ...(receipt ? ['YOUR ENQUIRY', '-'.repeat(30), receipt, ''] : []),
    'Warmly,',
    'The Aureon Studio Team',
    '',
    '--',
    'Aureon Studio | 14 Fitzroy Square, Fitzrovia, London W1T 6EH',
    '+44 20 7946 0123 | contact@aureonstudio.co.uk',
    `(c) ${year} Aureon Studio Ltd. All rights reserved.`,
  ].join('\n')
}

// ---------------------------------------------------------------------------
// Premium auto-reply email for the enquiring user
// ---------------------------------------------------------------------------
function buildAutoReplyHtml(name: string, fields: Record<string, string>): string {
  const firstName = escHtml(name.trim().split(' ')[0])

  // Build the inquiry receipt rows — only show meaningful fields
  const receiptKeys = ['service', 'location', 'budget', 'timeline']
  const receiptLabels: Record<string, string> = {
    service: 'Service',
    location: 'Location',
    budget: 'Budget',
    timeline: 'Timeline',
  }
  const receiptRows = receiptKeys
    .filter((k) => fields[k]?.trim())
    .map(
      (k) => `
      <tr>
        <td width="120" style="padding:10px 0;border-bottom:1px solid #eeebe6;
                               font-family:Helvetica Neue,Helvetica,Arial,sans-serif;
                               font-size:10px;letter-spacing:0.14em;text-transform:uppercase;
                               color:#aaa8a3;vertical-align:top;">
          ${receiptLabels[k]}
        </td>
        <td style="padding:10px 0 10px 16px;border-bottom:1px solid #eeebe6;
                   font-family:Helvetica Neue,Helvetica,Arial,sans-serif;
                   font-size:13px;color:#2d2d2d;line-height:1.5;vertical-align:top;">
          ${escHtml(fields[k])}
        </td>
      </tr>`,
    )
    .join('')

  const year = new Date().getFullYear()

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
      xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <title>Thank you for your enquiry &mdash; Aureon Studio</title>
  <!--[if mso]>
  <noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
  <![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#f0ede8;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">

<!-- PREVIEW TEXT — pads with invisible chars so body copy doesn't bleed into snippet -->
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">We have received your project enquiry and our design team is now reviewing the details.&nbsp;&#8203;&zwnj;&nbsp;&#8203;&zwnj;&nbsp;&#8203;&zwnj;&nbsp;&#8203;&zwnj;&nbsp;&#8203;&zwnj;&nbsp;&#8203;&zwnj;&nbsp;&#8203;&zwnj;&nbsp;&#8203;&zwnj;</div>

<!-- WRAPPER -->
<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#f0ede8;">
  <tr>
    <td align="center" style="padding:44px 16px 52px;">

      <!-- CARD -->
      <table width="560" cellpadding="0" cellspacing="0" role="presentation" style="max-width:560px;width:100%;">

        <!-- ░░ LOGO HEADER — white bg so the logo renders correctly ░░ -->
        <tr>
          <td style="background-color:#ffffff;padding:28px 44px 24px;
                     border-top:3px solid #1c1c1c;border-radius:4px 4px 0 0;">
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                <td width="76" style="vertical-align:middle;">
                  <img src="https://aureonstudio.co.uk/logoEmail.png"
                       alt="Aureon Studio"
                       width="68" height="68"
                       style="display:block;width:68px;height:auto;border:0;outline:none;
                              text-decoration:none;-ms-interpolation-mode:bicubic;" />
                </td>
                <td style="vertical-align:middle;padding-left:13px;">
                  <p style="margin:0;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;
                            font-size:12px;font-weight:600;letter-spacing:0.14em;
                            text-transform:uppercase;color:#1c1c1c;
                            mso-line-height-rule:exactly;line-height:1;">
                    Aureon Studio
                  </p>
                  <p style="margin:4px 0 0;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;
                            font-size:8px;letter-spacing:0.2em;text-transform:uppercase;
                            color:#c9a96e;mso-line-height-rule:exactly;line-height:1;">
                    Architecture &amp; Interior Design
                  </p>
                </td>
                <td align="right" style="vertical-align:middle;">
                  <p style="margin:0;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;
                            font-size:9px;letter-spacing:0.1em;color:#c4c0ba;
                            mso-line-height-rule:exactly;">London, UK</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ░░ GOLD HAIRLINE ░░ -->
        <tr>
          <td style="background-color:#c9a96e;height:1px;font-size:0;line-height:0;">&nbsp;</td>
        </tr>

        <!-- ░░ DARK HEADLINE BAND ░░ -->
        <tr>
          <td style="background-color:#1c1c1c;padding:26px 44px 24px;">
            <p style="margin:0 0 5px;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;
                      font-size:8px;letter-spacing:0.24em;text-transform:uppercase;
                      color:#c9a96e;mso-line-height-rule:exactly;">Enquiry Confirmed</p>
            <p style="margin:0;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;
                      font-size:19px;font-weight:300;color:#ffffff;letter-spacing:0.01em;
                      line-height:1.35;mso-line-height-rule:exactly;">
              We&rsquo;ve received your project brief.
            </p>
          </td>
        </tr>

        <!-- ░░ BODY ░░ -->
        <tr>
          <td style="background-color:#ffffff;padding:44px 44px 40px;">

            <!-- Greeting -->
            <p style="margin:0 0 28px;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;
                      font-size:21px;font-weight:300;color:#1c1c1c;letter-spacing:-0.01em;
                      line-height:1.3;mso-line-height-rule:exactly;">
              Dear ${firstName},
            </p>

            <!-- Confirmation line -->
            <p style="margin:0 0 20px;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;
                      font-size:14px;font-weight:400;color:#2d2d2d;line-height:1.8;
                      mso-line-height-rule:exactly;">
              Thank you for reaching out to Aureon Studio. We have received your enquiry
              and wanted to take a moment to confirm that it is now in the hands of our team.
            </p>

            <p style="margin:0 0 20px;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;
                      font-size:14px;font-weight:400;color:#2d2d2d;line-height:1.8;
                      mso-line-height-rule:exactly;">
              Our architects will carefully review the details of your brief — taking the time
              to understand your vision, your aspirations, and the unique character of your
              project. You can expect to hear from us
              <span style="color:#1c1c1c;font-weight:500;">within 24–48 hours</span>.
            </p>

            <p style="margin:0 0 40px;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;
                      font-size:14px;font-weight:400;color:#2d2d2d;line-height:1.8;
                      mso-line-height-rule:exactly;">
              In the meantime, if you have any additional information to share or any
              questions at all, please don&#8217;t hesitate to reply directly to this email.
            </p>

            ${receiptRows ? `
            <!-- ░░ INQUIRY RECEIPT ░░ -->
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
                   style="border:1px solid #e8e5e0;border-radius:4px;background-color:#f9f7f4;
                          margin-bottom:40px;">
              <tr>
                <td style="padding:18px 20px 4px;">
                  <p style="margin:0 0 14px;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;
                            font-size:9px;letter-spacing:0.2em;text-transform:uppercase;
                            color:#c9a96e;mso-line-height-rule:exactly;">
                    Your Enquiry
                  </p>
                  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                    ${receiptRows}
                  </table>
                </td>
              </tr>
            </table>
            ` : ''}

            <!-- Sign-off -->
            <p style="margin:0 0 4px;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;
                      font-size:14px;color:#2d2d2d;line-height:1.8;mso-line-height-rule:exactly;">
              Warmly,
            </p>
            <p style="margin:0;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;
                      font-size:14px;font-weight:500;color:#1c1c1c;letter-spacing:0.01em;
                      mso-line-height-rule:exactly;">
              The Aureon Studio Team
            </p>

          </td>
        </tr>

        <!-- ░░ FOOTER DIVIDER ░░ -->
        <tr>
          <td style="background-color:#ffffff;padding:0 44px;">
            <div style="border-top:1px solid #eeebe6;font-size:0;line-height:0;">&nbsp;</div>
          </td>
        </tr>

        <!-- ░░ FOOTER ░░ -->
        <tr>
          <td style="background-color:#ffffff;padding:24px 44px 36px;border-radius:0 0 4px 4px;">
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                <td style="vertical-align:top;">
                  <p style="margin:0 0 3px;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;
                            font-size:10px;font-weight:500;letter-spacing:0.1em;text-transform:uppercase;
                            color:#1c1c1c;mso-line-height-rule:exactly;">
                    Aureon Studio
                  </p>
                  <p style="margin:0;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;
                            font-size:11px;color:#aaa8a3;line-height:1.7;mso-line-height-rule:exactly;">
                    14 Fitzroy Square, Fitzrovia<br>
                    London, W1T 6EH
                  </p>
                </td>
                <td align="right" style="vertical-align:top;">
                  <p style="margin:0;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;
                            font-size:11px;color:#aaa8a3;line-height:1.7;mso-line-height-rule:exactly;
                            text-align:right;">
                    +44 20 7946 0123<br>
                    contact@aureonstudio.co.uk
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ░░ BOTTOM CHROME BAR ░░ -->
        <tr>
          <td style="background-color:#1c1c1c;height:3px;border-radius:0 0 4px 4px;font-size:0;line-height:0;">&nbsp;</td>
        </tr>

        <!-- ░░ COPYRIGHT ░░ -->
        <tr>
          <td style="padding:20px 0 0;">
            <p style="margin:0;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;
                      font-size:10px;color:#c4c0ba;text-align:center;letter-spacing:0.06em;
                      mso-line-height-rule:exactly;">
              &copy; ${year} Aureon Studio Ltd. All rights reserved.
            </p>
          </td>
        </tr>

      </table>
      <!-- / CARD -->

    </td>
  </tr>
</table>
<!-- / WRAPPER -->

</body>
</html>`
}

// ---------------------------------------------------------------------------
// POST /api/send
// ---------------------------------------------------------------------------
export async function POST(req: NextRequest) {
  // Rate limit by IP
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Too many submissions. Please try again later.' },
      { status: 429 },
    )
  }

  // Parse body
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  // Validate shape
  const parsed = sendSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed.', details: parsed.error.flatten().fieldErrors },
      { status: 422 },
    )
  }

  const { source, website, fields } = parsed.data

  // Honeypot — silently succeed so bots receive no useful signal
  if (website) {
    return NextResponse.json({ success: true }, { status: 200 })
  }

  // Require name and valid email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!fields.name?.trim()) {
    return NextResponse.json({ error: 'Name is required.' }, { status: 422 })
  }
  if (!fields.email?.trim() || !emailRegex.test(fields.email)) {
    return NextResponse.json({ error: 'A valid email address is required.' }, { status: 422 })
  }

  // Fire both emails simultaneously — admin notification + user auto-reply
  try {
    const [adminResult, replyResult] = await Promise.allSettled([
      // Admin notification — internal, noreply is fine here
      resend.emails.send({
        from: 'Aureon Studio <noreply@aureonstudio.co.uk>',
        to: ['contact@aureonstudio.co.uk'],
        replyTo: fields.email,
        subject: `New Enquiry \u2014 ${fields.name.trim()}${fields.service ? ` \u00b7 ${fields.service}` : ''}`,
        html: buildEmailHtml(source, fields),
        text: buildAdminText(source, fields),
      }),
      // User auto-reply — FROM contact@ builds trust & avoids spam filters
      resend.emails.send({
        from: 'Aureon Studio <contact@aureonstudio.co.uk>',
        to: [fields.email],
        replyTo: 'contact@aureonstudio.co.uk',
        subject: `Thank you for your enquiry \u2014 Aureon Studio`,
        html: buildAutoReplyHtml(fields.name, fields),
        text: buildAutoReplyText(fields.name, fields),
      }),
    ])

    // Admin email is the critical path — fail the request if it didn't send
    if (adminResult.status === 'rejected' || adminResult.value.error) {
      const reason =
        adminResult.status === 'rejected'
          ? adminResult.reason
          : adminResult.value.error
      console.error('[api/send] Admin email failed:', reason)
      return NextResponse.json(
        { error: 'Failed to send message. Please try again.' },
        { status: 502 },
      )
    }

    // Auto-reply failure is non-critical — log but still return success
    if (replyResult.status === 'rejected' || replyResult.value.error) {
      const reason =
        replyResult.status === 'rejected'
          ? replyResult.reason
          : replyResult.value.error
      console.warn('[api/send] Auto-reply email failed (non-critical):', reason)
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('[api/send] Unexpected error:', err)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 },
    )
  }
}
