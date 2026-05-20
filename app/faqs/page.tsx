import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import { buildFaqSchema } from '@/lib/schema'
import { faqs } from '@/data/faqs'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import CTAStrip from '../components/CTAStrip'
import './faqs.css'

export const revalidate = false

export const metadata: Metadata = buildMetadata({
  title: 'Frequently Asked Questions',
  description:
    'Everything you need to know about working with Aureon Studio — from our design process and planning applications to fees, timelines, and how to start your project.',
  path: '/faqs',
})

export default function FAQsPage() {
  const schema = buildFaqSchema(faqs)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Navigation />
      <CTAStrip />
      <main id="faqs-content">

        {/* ── HERO ── */}
        <section className="faqs-hero" aria-label="FAQs hero">
          <div className="faqs-hero__content">
            <div className="faqs-hero__rule-row">
              <span className="faqs-hero__rule" aria-hidden="true" />
              <span className="faqs-hero__eyebrow">Support &amp; Guidance</span>
              <span className="faqs-hero__rule" aria-hidden="true" />
            </div>
            <h1 className="faqs-hero__title">
              Frequently Asked <em>Questions</em>
            </h1>
            <p className="faqs-hero__subtitle">
              Honest answers about our process, services, timelines, and fees —
              everything you need before your first conversation with us.
            </p>
          </div>
        </section>

        {/* ── ACCORDION ── */}
        <section className="faqs-section" aria-label="Frequently asked questions">
          <div className="faqs-section__inner">

            <div className="faqs-section__header">
              <div>
                <span className="faqs-section__label">All Questions</span>
                <h2 className="faqs-section__heading">
                  Everything You Need<br />to Know
                </h2>
              </div>
              <span className="faqs-section__count">{faqs.length} questions</span>
            </div>

            <dl className="faqs-accordion">
              {faqs.map((faq, i) => (
                <div key={i} className="faqs-accordion__item">
                  <details className="faqs-accordion__details">
                    <summary className="faqs-accordion__summary">
                      <span className="faqs-accordion__num" aria-hidden="true">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <dt className="faqs-accordion__question">{faq.question}</dt>
                      <span className="faqs-accordion__icon" aria-hidden="true">+</span>
                    </summary>
                    <div className="faqs-accordion__answer">
                      <dd><p>{faq.answer}</p></dd>
                    </div>
                  </details>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="faqs-cta" aria-label="Get in touch">
          <div className="faqs-cta__inner">
            <span className="faqs-cta__eyebrow">Let&apos;s Talk</span>
            <h2 className="faqs-cta__title">
              Still Have <em>Questions?</em>
            </h2>
            <p className="faqs-cta__text">
              We&apos;re always happy to talk through your project in more detail.
              Our team responds to all enquiries within two working days.
            </p>
            <a href="/contact" className="faqs-cta__btn">
              Start a Conversation
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}

