import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'
import { REFERRAL_OPTIONS } from '@/lib/enquiry'
import { SOCIAL_LINKS } from '@/lib/social'
import { buildStudioNotification, buildVisitorConfirmation } from './email-templates'

const resend = new Resend(process.env.RESEND_API_KEY)

// ---------------------------------------------------------------------------
// Rate limiting - in-memory per serverless instance.
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
  /** Honeypot - bots fill this; humans leave it empty */
  website: z.string().max(0, 'Bot detected').optional(),
  /** Dynamic key/value pairs representing the form fields */
  fields: z
    .record(z.string(), z.string().max(5000))
    .refine((fields) => Object.keys(fields).length <= 25, 'Too many fields.'),
})

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

  // Honeypot - silently succeed so bots receive no useful signal
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

  // Fire both emails simultaneously - admin notification + user auto-reply
  try {
    // The form posts the referral option's value ("google"); emails show its label.
    const referral = REFERRAL_OPTIONS.find((option) => option.value === fields.referral)?.label
    const enquiry = referral ? { ...fields, referral } : fields

    const notification = buildStudioNotification(enquiry, { source, receivedAt: new Date() })
    const confirmation = buildVisitorConfirmation(enquiry, { socials: SOCIAL_LINKS })

    const [adminResult, replyResult] = await Promise.allSettled([
      // Admin notification - internal, noreply is fine here
      resend.emails.send({
        from: 'Aureon Studio <noreply@aureonstudio.co.uk>',
        to: ['hello@aureonstudio.co.uk'],
        replyTo: fields.email,
        subject: notification.subject,
        html: notification.html,
        text: notification.text,
      }),
      // User auto-reply - FROM hello@ builds trust & avoids spam filters
      resend.emails.send({
        from: 'Aureon Studio <hello@aureonstudio.co.uk>',
        to: [fields.email],
        replyTo: 'hello@aureonstudio.co.uk',
        subject: confirmation.subject,
        html: confirmation.html,
        text: confirmation.text,
      }),
    ])

    // Admin email is the critical path - fail the request if it didn't send
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

    // Auto-reply failure is non-critical - log but still return success
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
