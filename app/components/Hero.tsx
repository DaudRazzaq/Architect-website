'use client';

import { useEffect, useRef, useState } from 'react';
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
    const [headerHidden, setHeaderHidden] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY <= 20) {
                setHeaderHidden(false);
                lastScrollY.current = currentScrollY;
                return;
            }

            if (currentScrollY > lastScrollY.current && currentScrollY > 100 && !mobileMenuOpen) {
                setHeaderHidden(true);
            } else if (currentScrollY < lastScrollY.current) {
                setHeaderHidden(false);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [mobileMenuOpen]);

    useEffect(() => {
        document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [mobileMenuOpen]);

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

    const mobileNav = [...navLeft, ...navRight];

    const slides = [hero1, hero2, hero3, hero4, hero5, hero6];
    const slidingTrack = [...slides, ...slides];

    const closeMenu = () => setMobileMenuOpen(false);

    return (
        <section id="home" className="hero">
            <div className="hero-media-track" aria-hidden="true">
                {slidingTrack.map((slide, index) => (
                    <div key={`${slide.src}-${index}`} className="hero-media-slide">
                        <Image
                            src={slide}
                            alt=""
                            fill
                            priority={index < 2}
                            sizes="100vw"
                            className="hero-media-image"
                        />
                    </div>
                ))}
            </div>

            <div className="hero-overlay"></div>
            <div className="hero-overlay-gradient"></div>

            <div className="hero-shell">
                <header className={`hero-header ${headerHidden ? 'hero-header-hidden' : ''}`}>
                    <div className="hero-nav-grid">
                        <nav className="hero-nav hero-nav-left" aria-label="Primary left">
                            {navLeft.map((item) => (
                                <a key={item.label} href={item.href} className="hero-nav-link">
                                    {item.label}
                                </a>
                            ))}
                        </nav>

                        <a href="#home" className="hero-brand hero-brand-desktop" aria-label="Home">
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

                    <div className="hero-mobile-bar">
                        <a href="#home" className="hero-brand hero-brand-mobile" aria-label="Home">
                            <div className="hero-brand-inner hero-brand-inner-mobile">
                                <Image src={logo} alt="Logo" className="hero-logo hero-logo-mobile" priority />
                            </div>
                        </a>

                        <button
                            type="button"
                            className={`hero-menu-toggle ${mobileMenuOpen ? 'is-open' : ''}`}
                            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={mobileMenuOpen}
                            onClick={() => setMobileMenuOpen((prev) => !prev)}
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </header>

                <div
                    className={`hero-mobile-drawer ${mobileMenuOpen ? 'hero-mobile-drawer-open' : ''}`}
                    aria-hidden={!mobileMenuOpen}
                >
                    <div className="hero-mobile-drawer-inner">
                        <nav className="hero-mobile-drawer-nav" aria-label="Mobile navigation">
                            {mobileNav.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    className="hero-mobile-drawer-link"
                                    onClick={closeMenu}
                                >
                                    {item.label}
                                </a>
                            ))}
                        </nav>
                    </div>
                </div>

                {mobileMenuOpen && (
                    <button
                        type="button"
                        className="hero-mobile-backdrop"
                        aria-label="Close menu overlay"
                        onClick={closeMenu}
                    />
                )}
            </div>
        </section>
    );
}