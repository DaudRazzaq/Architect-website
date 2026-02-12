'use client';

import Link from 'next/link';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <Link href="/" className="footer-logo">
                            AYANO
                        </Link>
                        <p className="footer-copyright">© by Gola Templates</p>
                        <div className="footer-social">
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                </svg>
                            </a>
                            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <path d="M8 12h4v8M12 12c0-2.21 1.79-4 4-4"></path>
                                </svg>
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                    <rect x="2" y="9" width="4" height="12"></rect>
                                    <circle cx="4" cy="4" r="2"></circle>
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div className="footer-column">
                        <h4 className="footer-column-title">Pages</h4>
                        <ul className="footer-links">
                            <li><a href="#home">HOME</a></li>
                            <li><a href="#services">SERVICES</a></li>
                            <li><a href="#about">STUDIO</a></li>
                            <li><a href="#contact">CONTACT</a></li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h4 className="footer-column-title">CMS</h4>
                        <ul className="footer-links">
                            <li><a href="#projects">WORK</a></li>
                            <li><a href="#projects">WORK SINGLE</a></li>
                            <li><a href="#news">BLOG</a></li>
                            <li><a href="#news">BLOG SINGLE</a></li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h4 className="footer-column-title">Utility Pages</h4>
                        <ul className="footer-links">
                            <li><a href="#home">404 ERROR PAGE</a></li>
                            <li><a href="#home">LICENSING</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}
