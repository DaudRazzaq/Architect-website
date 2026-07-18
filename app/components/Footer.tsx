'use client';

import Link from 'next/link';
import Image from 'next/image';
import './Footer.css';
import logo from '../assets/logo.png';
import logoMark from '../assets/logo-mark.png';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="footer-branding">
                    <Image
                        src={logo}
                        alt="Aureon Studio"
                        className="footer-minimal-logo footer-minimal-logo--desktop"
                        sizes="360px"
                    />
                    <Image
                        src={logoMark}
                        alt="Aureon Studio"
                        className="footer-minimal-logo footer-minimal-logo--mobile"
                        sizes="80px"
                    />
                </div>

                <div className="footer-links">
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
                        <a href="tel:+442079460321">+44 (0)20 7946 0321</a>
                        <a href="mailto:contact@aureonstudio.co.uk">contact@aureonstudio.co.uk</a>
                        <a href="https://wa.me/447440115124" target="_blank" rel="noopener noreferrer">WhatsApp</a>
                        <a href="https://instagram.com/aureonstudio" target="_blank" rel="noopener noreferrer">Instagram</a>
                        <a href="https://linkedin.com/company/aureonstudio" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                        <a href="https://pinterest.com/aureonstudio" target="_blank" rel="noopener noreferrer">Pinterest</a>
                    </div>
                    <div className="link-column">
                        <span>Visit</span>
                        <p>Studio One</p>
                        <p>14 Fitzroy Square, Fitzrovia</p>
                        <p>London W1T 6EH</p>
                        <p>United Kingdom</p>
                    </div>
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
