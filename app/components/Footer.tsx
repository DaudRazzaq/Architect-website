'use client';

import Link from 'next/link';
import Image from 'next/image';
import './Footer.css';
import logo from '../assets/logo.png';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="footer-branding">
                    <Image 
                        src={logo} 
                        alt="Aureon Logo" 
                        className="footer-minimal-logo" 
                        priority
                    />
                </div>
                
                <div className="footer-links">
                    <div className="link-column">
                        <span>Explore</span>
                        <Link href="/projects">Projects</Link>
                        <Link href="/studio">Studio</Link>
                        <Link href="/services">Services</Link>
                    </div>
                    <div className="link-column">
                        <span>Connect</span>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                        <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">Pinterest</a>
                    </div>
                    <div className="link-column">
                        <span>Visit</span>
                        <p>124 Architecture Blvd</p>
                        <p>New York, NY 10012</p>
                    </div>
                </div>
            </div>

            <div className="footer-message">
                <h2>Ready to start your project?</h2>
                <div className="footer-actions">
                    <Link href="/contact" className="contact-btn">Get in Touch ↗</Link>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} Aureon Architecture.</p>
                <div className="footer-legal-links">
                    <Link href="/">Privacy Policy</Link>
                    <Link href="/">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
}
