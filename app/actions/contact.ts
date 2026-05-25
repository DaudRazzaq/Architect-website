'use server'

import { Resend } from 'resend'
import { z } from 'zod'

const resend = new Resend(process.env.RESEND_API_KEY)

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z
    .string()
    .optional()
    .refine(
      (val) =>
        !val ||
        /^(\+44|0)[0-9\s\-().]{9,14}$/.test(val) ||
        /^\+[1-9]\d{6,14}$/.test(val),
      { message: 'Please enter a valid phone number' }
    ),
  company: z.string().optional(),
  service: z.string().min(1, 'Please select a service'),
  location: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  message: z.string().min(20, 'Message must be at least 20 characters'),
  referral: z.string().optional(),
  // honeypot — must be empty
  website: z.string().max(0, 'Submission rejected').optional(),
})

export type ContactFormData = z.infer<typeof contactSchema>

type ActionResult =
  | { success: true }
  | { success: false; errors: Record<string, string[]> }
  | { success: false; error: string }

// In-memory rate limit store (per server instance)
// In production, replace with Redis or Upstash
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

export async function submitContact(
  formData: ContactFormData,
  ip = 'unknown'
): Promise<ActionResult> {
  // Rate limit check
  if (!checkRateLimit(ip)) {
    return {
      success: false,
      error: 'Too many submissions. Please try again later.',
    }
  }

  // Honeypot check
  if (formData.website) {
    // Silently succeed to not reveal detection
    return { success: true }
  }

  // Validate
  const parsed = contactSchema.safeParse(formData)
  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    }
  }

  const d = parsed.data
  const lines = [
    `Name: ${d.name}`,
    `Email: ${d.email}`,
    d.phone ? `Phone: ${d.phone}` : null,
    d.company ? `Company: ${d.company}` : null,
    `Service: ${d.service}`,
    d.location ? `Location: ${d.location}` : null,
    d.budget ? `Budget: ${d.budget}` : null,
    d.timeline ? `Timeline: ${d.timeline}` : null,
    `\nMessage:\n${d.message}`,
    d.referral ? `\nReferral: ${d.referral}` : null,
  ]
    .filter(Boolean)
    .join('\n')

  const { error: resendError } = await resend.emails.send({
    from: 'Aureon Studio <noreply@aureonstudio.co.uk>',
    to: ['contact@aureonstudio.co.uk'],
    replyTo: d.email,
    subject: `New Enquiry — ${d.name} · ${d.service}`,
    text: lines,
  })

  if (resendError) {
    console.error('[submitContact] Resend error:', resendError)
    return { success: false, error: 'Failed to send message. Please try again.' }
  }

  return { success: true }
}
