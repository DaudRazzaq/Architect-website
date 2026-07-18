'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import './CTAStrip.css';

export default function CTAStrip() {
    const [pastHero, setPastHero] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setPastHero(window.scrollY > window.innerHeight * 0.85);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <div className={`cta-strip${pastHero ? ' cta-strip--icons' : ''}`}>
            <Link href="/contact" className="cta-strip-item" title="Enquire Now">
                <span className="cta-strip-label">Enquire Now</span>
                <span className="cta-strip-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                    </svg>
                </span>
            </Link>
            <Link href="/services" className="cta-strip-item" title="Services">
                <span className="cta-strip-label">Services</span>
                <span className="cta-strip-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                    </svg>
                </span>
            </Link>
            <Link href="/projects" className="cta-strip-item" title="View Latest Projects">
                <span className="cta-strip-label">Latest Projects</span>
                <span className="cta-strip-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                    </svg>
                </span>
            </Link>
        </div>
    );
}
