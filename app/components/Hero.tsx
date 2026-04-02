'use client';

import Image from 'next/image';
import './Hero.css';
import logo from '../assets/logo.png';
import hero1 from '../assets/hero1.png';
import hero2 from '../assets/hero2.png';
import hero3 from '../assets/hero3.png';
import hero4 from '../assets/hero4.png';
import hero5 from '../assets/hero5.png';
import hero6 from '../assets/hero6.png';

export default function Hero() {
    const navLeft = [
        { label: 'Home', href: '#home' },
        { label: 'Projects', href: '#projects' },
        { label: 'Services', href: '/services' },
    ];

    const navRight = [
        { label: 'Studio', href: '/studio' },
        { label: 'News', href: '/blog' },
        { label: 'Contact', href: '/contact' },
    ];

    const sideLinks = [
        { label: 'Discover', href: '#about' },
        { label: 'Projects', href: '#projects' },
        { label: 'Contact', href: '/contact' },
    ];

    const slides = [hero1, hero2, hero3, hero4, hero5, hero6];
    const slidingTrack = [...slides, ...slides];

    return (
        <section id="home" className="hero">
            <div className="hero-media-track" aria-hidden="true">
                {slidingTrack.map((slide, index) => (
                    <div
                        key={`${slide.src}-${index}`}
                        className="hero-media-slide"
                        style={{ backgroundImage: `url(${slide.src})` }}
                    />
                ))}
            </div>

            <div className="hero-overlay"></div>
            <div className="hero-overlay-gradient"></div>

            <div className="hero-shell">
                <header className="hero-header">
                    <div className="hero-nav-grid">
                        <nav className="hero-nav hero-nav-left" aria-label="Primary left">
                            {navLeft.map((item) => (
                                <a key={item.label} href={item.href} className="hero-nav-link">
                                    {item.label}
                                </a>
                            ))}
                        </nav>

                        <a href="#home" className="hero-brand" aria-label="Home">
                            <div className="hero-brand-inner">
                                <Image src={logo} alt="Logo" className="hero-logo" priority />
                            </div>
                        </a>

                        <nav className="hero-nav hero-nav-right" aria-label="Primary right">
                            {navRight.map((item) => (
                                <a key={item.label} href={item.href} className="hero-nav-link">
                                    {item.label}
                                </a>
                            ))}
                        </nav>
                    </div>

                    <nav className="hero-nav-mobile" aria-label="Mobile navigation">
                        {[...navLeft, ...navRight].map((item) => (
                            <a key={item.label} href={item.href} className="hero-nav-link">
                                {item.label}
                            </a>
                        ))}
                    </nav>
                </header>

                <div className="hero-main">
                    <div className="hero-content">
                        <div className="hero-title-wrap">
                            <span className="hero-title-line" aria-hidden="true"></span>

                            <h1 className="hero-title">
                                Architecture
                                <br />
                                Studio in Oslo
                            </h1>

                            <span className="hero-title-line" aria-hidden="true"></span>
                        </div>
                    </div>

                    <aside className="hero-side-links" aria-label="Primary actions">
                        {sideLinks.map((link) => (
                            <a key={link.label} href={link.href} className="hero-side-link">
                                <span className="hero-side-label">{link.label}</span>
                                <span className="hero-side-stroke" aria-hidden="true"></span>
                            </a>
                        ))}
                    </aside>
                </div>
            </div>
        </section>
    );
}