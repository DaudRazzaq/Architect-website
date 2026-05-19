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

const HERO_SLIDES = [hero1, hero2, hero3, hero4, hero5, hero6];

export default function Hero() {
    const [headerHidden, setHeaderHidden] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isPastHero, setIsPastHero] = useState(false);
    const [activeSlide, setActiveSlide] = useState(0);
    const [isSlideTransitioning, setIsSlideTransitioning] = useState(true);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const heroTrigger = Math.max(window.innerHeight * 0.72, 420);

            setIsPastHero(currentScrollY > heroTrigger);

            if (currentScrollY <= 20) {
                setHeaderHidden(false);
                lastScrollY.current = currentScrollY;
                return;
            }

            if (!mobileMenuOpen) {
                if (currentScrollY > lastScrollY.current && currentScrollY > 140) {
                    setHeaderHidden(true);
                } else if (currentScrollY < lastScrollY.current) {
                    setHeaderHidden(false);
                }
            }

            lastScrollY.current = currentScrollY;
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, [mobileMenuOpen]);

    useEffect(() => {
        document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [mobileMenuOpen]);

    useEffect(() => {
        const slideInterval = window.setInterval(() => {
            setActiveSlide((prev) => prev + 1);
        }, 5000);

        return () => {
            window.clearInterval(slideInterval);
        };
    }, []);

    useEffect(() => {
        if (activeSlide !== HERO_SLIDES.length) {
            return;
        }

        const resetTimer = window.setTimeout(() => {
            setIsSlideTransitioning(false);
            setActiveSlide(0);

            window.requestAnimationFrame(() => {
                window.requestAnimationFrame(() => {
                    setIsSlideTransitioning(true);
                });
            });
        }, 700);

        return () => {
            window.clearTimeout(resetTimer);
        };
    }, [activeSlide]);

    const navLeft = [
        { label: 'ABOUT US', href: '#about' },
        { label: 'OUR WORK', href: '#projects' },
        { label: 'SERVICES', href: '/services' },
    ];

    const navRight = [
        { label: 'FAQS', href: '/faqs' },
        { label: 'JOURNAL', href: '/blog' },
        { label: 'CONTACT', href: '/contact' },
    ];

    const mobileNav = [...navLeft, ...navRight];

    const slidingTrack = [...HERO_SLIDES, HERO_SLIDES[0]];
    const mediaTrackStyle = {
        width: `${slidingTrack.length * 100}vw`,
        transform: `translate3d(-${activeSlide * 100}vw, 0, 0)`,
        transition: isSlideTransitioning
            ? 'transform 700ms cubic-bezier(0.2, 0.65, 0.2, 1)'
            : 'none',
    };

    const closeMenu = () => setMobileMenuOpen(false);

    return (
        <section id="home" className="hero">
            <div className="hero-media-track" aria-hidden="true" style={mediaTrackStyle}>
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
                <header
                    className={[
                        'hero-header',
                        headerHidden ? 'hero-header-hidden' : '',
                        isPastHero ? 'hero-header-scrolled' : 'hero-header-hero',
                        mobileMenuOpen ? 'hero-header-menu-open' : '',
                    ].join(' ')}
                >
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
                                <Image
                                    src={logo}
                                    alt="Logo"
                                    className="hero-logo hero-logo-mobile"
                                    priority
                                />
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

                <div className="hero-centerpiece">
                    <div className="hero-tagline-row">
                        <span className="hero-tagline-line" />
                        <span className="hero-tagline-text">Spaces Crafted for Life</span>
                        <span className="hero-tagline-line" />
                    </div>
                    <div className="hero-btn-row">
                        <a href="/contact" className="hero-btn hero-btn--primary">Enquire Now</a>
                        <a href="/services" className="hero-btn hero-btn--ghost">View Services</a>
                    </div>
                </div>
            </div>
        </section>
    );
}