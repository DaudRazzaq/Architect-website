'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import './Hero.css';
import './Navigation.css';

import { Logo } from './Logo';
import hero1 from '../assets/hero1.png';
import hero2 from '../assets/hero2.png';
import hero3 from '../assets/hero3.png';
import hero4 from '../assets/hero4.png';
import hero5 from '../assets/hero5.png';
import hero6 from '../assets/hero6.png';

const HERO_SLIDES = [hero1, hero2, hero3, hero4, hero5, hero6];

const TAGLINES = [
    'Spaces Crafted for Life',
    'Architecture with Purpose',
    'Design Beyond Boundaries',
    'Where Form Meets Function',
    'Building Timeless Spaces',
];

export default function Hero() {
    const [headerHidden, setHeaderHidden] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isPastHero, setIsPastHero] = useState(false);
    const [activeSlide, setActiveSlide] = useState(0);
    const [isSlideTransitioning, setIsSlideTransitioning] = useState(true);
    const [taglineIdx, setTaglineIdx] = useState(0);
    const lastScrollY = useRef(0);
    const drawerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setTaglineIdx(prev => (prev + 1) % TAGLINES.length);
        }, 10000);
        return () => clearInterval(interval);
    }, []);

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

    // Escape to close + focus trap while the drawer is open
    useEffect(() => {
        if (!mobileMenuOpen) return;

        const drawer = drawerRef.current;
        const focusables = drawer?.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled])'
        );
        focusables?.[0]?.focus();

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setMobileMenuOpen(false);
                return;
            }
            if (e.key === 'Tab' && focusables && focusables.length > 0) {
                const first = focusables[0];
                const last = focusables[focusables.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
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
        { label: 'ABOUT US', href: '/about' },
        { label: 'OUR WORK', href: '#projects' },
        { label: 'SERVICES', href: '/services' },
    ];

    const navRight = [
        { label: 'FAQS', href: '/faqs' },
        { label: 'JOURNAL', href: '/blog' },
        { label: 'CONTACT', href: '/contact' },
    ];

    const mobileNav = [{ label: 'HOME', href: '/' }, ...navLeft, ...navRight];

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
                            priority={index === 0}
                            loading={index === 0 ? undefined : 'lazy'}
                            quality={75}
                            placeholder="blur"
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
                                <Logo className="hero-logo" />
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
                                <Logo className="hero-logo hero-logo-mobile" />
                            </div>
                        </a>

                        <button
                            type="button"
                            className={`nav-header__toggle ${mobileMenuOpen ? 'is-open' : ''}`}
                            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={mobileMenuOpen}
                            onClick={() => setMobileMenuOpen((prev) => !prev)}
                        >
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </header>

                <div
                    ref={drawerRef}
                    className={`nav-drawer ${mobileMenuOpen ? 'nav-drawer--open' : ''}`}
                    aria-hidden={!mobileMenuOpen}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Site menu"
                >
                    <div className="nav-drawer__inner">
                        <div className="nav-drawer__top">
                            <a href="#home" className="nav-drawer__brand" aria-label="Home" onClick={closeMenu}>
                                <Logo className="nav-drawer__logo" />
                            </a>
                            <button
                                type="button"
                                className="nav-drawer__close"
                                aria-label="Close menu"
                                onClick={closeMenu}
                            >
                                <span></span>
                                <span></span>
                            </button>
                        </div>

                        <nav className="nav-drawer__nav" aria-label="Mobile navigation">
                            {mobileNav.map((item, index) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    className={`nav-drawer__link${item.href === '/' ? ' nav-drawer__link--active' : ''}`}
                                    style={{ transitionDelay: mobileMenuOpen ? `${120 + index * 50}ms` : '0ms' }}
                                    onClick={closeMenu}
                                >
                                    {item.label}
                                </a>
                            ))}
                        </nav>

                        <div className="nav-drawer__footer">
                            <a href="/contact" className="nav-drawer__cta" onClick={closeMenu}>
                                Enquire Now
                            </a>
                            <a href="tel:+442034324059" className="nav-drawer__contact-link">
                                +44 20 3432 4059
                            </a>
                            <a href="mailto:contact@aureonstudio.co.uk" className="nav-drawer__contact-link">
                                contact@aureonstudio.co.uk
                            </a>
                            <div className="nav-drawer__socials">
                                <a href="https://www.instagram.com/aureonstudioltd/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="nav-drawer__social">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                    </svg>
                                </a>
                                <a href="https://www.linkedin.com/company/aureon-designstudio/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="nav-drawer__social">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                                        <rect x="2" y="9" width="4" height="12" />
                                        <circle cx="4" cy="4" r="2" />
                                    </svg>
                                </a>
                                <a href="https://www.houzz.co.uk/hznb/professionals/interior-designers/aureon-studio-pfvwgb-pf~760537425" target="_blank" rel="noopener noreferrer" aria-label="Houzz" className="nav-drawer__social">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                        <path d="M6 21V12.41L12 9l6 3.41V21h-4.5v-4.5h-3V21H6z" />
                                        <path d="M12 2L2 8v2h20V8L12 2z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {mobileMenuOpen && (
                    <button
                        type="button"
                        className="nav-drawer__backdrop"
                        aria-label="Close menu overlay"
                        onClick={closeMenu}
                    />
                )}

                <div className="hero-centerpiece">
                    {/* Eyebrow and lede are mobile-only (hidden at >640px) — they give
                        the stacked full-frame hero the editorial hierarchy it needs
                        once the copy sits below the photo rather than over it. */}
                    <span className="hero-eyebrow">
                        <span className="hero-eyebrow__rule" aria-hidden="true" />
                        London · Interior Architecture
                    </span>

                    <div className="hero-tagline-row">
                        <span className="hero-tagline-line" />
                        <span key={taglineIdx} className="hero-tagline-text">{TAGLINES[taglineIdx]}</span>
                        <span className="hero-tagline-line" />
                    </div>

                    <p className="hero-lede">
                        Calm, considered spaces for modern living.
                    </p>

                    <div className="hero-btn-row">
                        <a href="/contact" className="hero-btn hero-btn--primary">Enquire Now</a>
                        <a href="/services" className="hero-btn hero-btn--ghost">View Services</a>
                    </div>
                </div>

                <div className="hero-dots" aria-label="Slide indicators">
                    {HERO_SLIDES.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            className={`hero-dot ${index === activeSlide % HERO_SLIDES.length ? 'is-active' : ''}`}
                            aria-label={`Go to slide ${index + 1}`}
                            onClick={() => setActiveSlide(index)}
                        />
                    ))}
                    <span className="hero-count" aria-hidden="true">
                        {String((activeSlide % HERO_SLIDES.length) + 1).padStart(2, '0')}
                        <i>/</i>
                        {String(HERO_SLIDES.length).padStart(2, '0')}
                    </span>
                </div>
            </div>
        </section>
    );
}