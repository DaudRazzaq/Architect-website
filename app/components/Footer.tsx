'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './Footer.css';
import { Logo } from './Logo';
import { STUDIO_DIRECTIONS_URL, STUDIO_MAP_EMBED, STUDIO_MAP_TITLE } from '@/lib/studio';
import { SOCIAL } from '@/lib/social';

export default function Footer() {
    const pathname = usePathname();

    // /contact already lists the studio address and carries a full-width map
    // of it higher up the page, so repeating both in the footer is redundant
    // (and would load the Google iframe twice). Explore + Connect widen to fill.
    const isContact = pathname === '/contact';
    const showLocation = !isContact;

    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="footer-masthead">
                    <Logo className="footer-minimal-logo" />
                    <p className="footer-masthead__tagline">
                        Interior architecture &amp; design — London
                    </p>
                </div>

                <div className={`footer-links${showLocation ? '' : ' footer-links--compact'}`}>
                    <div className="link-column">
                        <span>Explore</span>
                        <Link href="/">Home</Link>
                        <Link href="/about">About Us</Link>
                        <Link href="/services">Services</Link>
                        <Link href="/projects">Projects</Link>
                        <Link href="/blog">Journal</Link>
                        <Link href="/faqs">FAQs</Link>
                        <Link href="/contact">Contact</Link>
                    </div>
                    <div className="link-column">
                        <span>Connect</span>
                        <a href="tel:+442034324059">+44 20 3432 4059</a>
                        <a href="mailto:contact@aureonstudio.co.uk">contact@aureonstudio.co.uk</a>
                        <a href="https://wa.me/447440115124" target="_blank" rel="noopener noreferrer">WhatsApp</a>
                        <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
                        <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                        <a href={SOCIAL.houzz} target="_blank" rel="noopener noreferrer">Houzz</a>
                    </div>
                    {showLocation && (
                        <div className="link-column link-column--visit">
                            <span>Visit</span>
                            <p>60 Tottenham Court Road</p>
                            <p>Office 1720, Fitzrovia</p>
                            <p>London W1T 2EW</p>
                            <p>United Kingdom</p>
                        </div>
                    )}

                    {/* Map is its own column so the row fills the footer width
                        instead of leaving the right third empty on desktop. */}
                    {showLocation && (
                        <div className="link-column link-column--map">
                            <span>Find Us</span>
                            <div className="footer-map">
                                <iframe
                                    title={STUDIO_MAP_TITLE}
                                    src={STUDIO_MAP_EMBED}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                            <a
                                className="footer-map__link"
                                href={STUDIO_DIRECTIONS_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Get Directions
                            </a>
                        </div>
                    )}
                </div>
            </div>

            <div className="footer-message">
                <h2>Ready to start your project?</h2>
                <div className="footer-actions">
                    <Link href="/contact" className="contact-btn">Get in Touch</Link>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} Aureon Studio.</p>
                <div className="footer-legal-links">
                    <Link href="/">Privacy Policy</Link>
                    <Link href="/">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
}
