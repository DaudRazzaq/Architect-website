import Link from 'next/link'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import CTAStrip from './components/CTAStrip'
import './not-found.css'

export default function NotFound() {
  return (
    <>
      <Navigation />
      <CTAStrip />
      <main className="notfound">
        <div className="notfound__inner">
          <div className="notfound__rule-row">
            <span className="notfound__rule" aria-hidden="true" />
            <span className="notfound__eyebrow">404</span>
            <span className="notfound__rule" aria-hidden="true" />
          </div>
          <h1 className="notfound__title">Page Not Found</h1>
          <p className="notfound__text">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
            <br />
            Let&apos;s get you back on track.
          </p>
          <nav className="notfound__actions" aria-label="Recovery navigation">
            <Link href="/" className="notfound__btn notfound__btn--primary">
              Return Home
            </Link>
            <Link href="/contact" className="notfound__btn notfound__btn--outline">
              Contact Us
            </Link>
          </nav>
        </div>
      </main>
      <Footer />
    </>
  )
}
