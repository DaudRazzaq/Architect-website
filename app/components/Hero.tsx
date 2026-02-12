'use client';

import './Hero.css';

export default function Hero() {
    return (
        <section id="home" className="hero">
            <div className="hero-overlay"></div>
            <div className="hero-content">
                <h1 className="hero-title">
                    Architecture<br />Studio in Oslo
                </h1>
                <a href="#about" className="hero-discover">
                    <span>DISCOVER</span>
                    <svg className="hero-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M10 4L10 16M10 16L6 12M10 16L14 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </a>
            </div>
        </section>
    );
}
