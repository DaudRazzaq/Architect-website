'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import './Navigation.css';
import logo from '../assets/logo.png';
import logoMark from '../assets/logo-mark.png';

export default function Navigation() {
    const [headerHidden, setHeaderHidden] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const lastScrollY = useRef(0);
    const drawerRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

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

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [mobileMenuOpen]);

    // Body scroll lock while the drawer is open (position preserved on close)
    useEffect(() => {
        document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileMenuOpen]);

    // Close on route change (state adjustment during render — no effect needed)
    const [prevPathname, setPrevPathname] = useState(pathname);
    if (prevPathname !== pathname) {
        setPrevPathname(pathname);
        setMobileMenuOpen(false);
    }

    // Escape to close + focus trap while open
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

    const navLeft = [
        { label: 'ABOUT US', href: '/about' },
        { label: 'OUR WORK', href: '/#projects' },
        { label: 'SERVICES', href: '/services' },
    ];

    const navRight = [
        { label: 'FAQS', href: '/faqs' },
        { label: 'JOURNAL', href: '/blog' },
        { label: 'CONTACT', href: '/contact' },
    ];

    const mobileNav = [{ label: 'HOME', href: '/' }, ...navLeft, ...navRight];
    const closeMenu = () => setMobileMenuOpen(false);

    const isActive = (href: string) => {
        const clean = href.replace('/#projects', '/');
        if (clean === '/') return pathname === '/';
        return pathname.startsWith(clean);
    };

    return (
        <>
            <header
                className={[
                    'nav-header',
                    headerHidden ? 'nav-header--hidden' : '',
                    mobileMenuOpen ? 'nav-header--menu-open' : '',
                ].join(' ')}
            >
                <div className="nav-header__grid">
                    <nav className="nav-header__nav nav-header__nav--left" aria-label="Primary left">
                        {navLeft.map((item) => (
                            <Link key={item.label} href={item.href} className="nav-header__link">
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    <Link href="/" className="nav-header__brand" aria-label="Home">
                        <div className="nav-header__brand-inner">
                            <Image src={logo} alt="Aureon Studio" className="nav-header__logo" priority sizes="272px" />
                        </div>
                    </Link>

                    <nav className="nav-header__nav nav-header__nav--right" aria-label="Primary right">
                        {navRight.map((item) => (
                            <Link key={item.label} href={item.href} className="nav-header__link">
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="nav-header__mobile-bar">
                    <Link href="/" className="nav-header__brand nav-header__brand--mobile" aria-label="Home">
                        <div className="nav-header__brand-inner nav-header__brand-inner--mobile">
                            <Image
                                src={logoMark}
                                alt="Aureon Studio"
                                className="nav-header__logo nav-header__logo--mobile"
                                priority
                                sizes="64px"
                            />
                        </div>
                    </Link>

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
                        <Link href="/" className="nav-drawer__brand" aria-label="Home" onClick={closeMenu}>
                            <Image src={logoMark} alt="Aureon Studio" className="nav-drawer__logo" sizes="64px" />
                        </Link>
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
                            <Link
                                key={item.label}
                                href={item.href}
                                className={`nav-drawer__link${isActive(item.href) ? ' nav-drawer__link--active' : ''}`}
                                style={{ transitionDelay: mobileMenuOpen ? `${120 + index * 50}ms` : '0ms' }}
                                onClick={closeMenu}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="nav-drawer__footer">
                        <Link href="/contact" className="nav-drawer__cta" onClick={closeMenu}>
                            Enquire Now
                        </Link>
                        <a href="tel:+442079460321" className="nav-drawer__contact-link">
                            +44 (0)20 7946 0321
                        </a>
                        <a href="mailto:contact@aureonstudio.co.uk" className="nav-drawer__contact-link">
                            contact@aureonstudio.co.uk
                        </a>
                        <div className="nav-drawer__socials">
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="nav-drawer__social">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                </svg>
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="nav-drawer__social">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                                    <rect x="2" y="9" width="4" height="12" />
                                    <circle cx="4" cy="4" r="2" />
                                </svg>
                            </a>
                            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" aria-label="Pinterest" className="nav-drawer__social">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.247-5.277 1.247-5.277s-.319-.638-.319-1.581c0-1.484.866-2.594 1.937-2.594.913 0 1.356.684 1.356 1.504 0 .917-.583 2.287-.885 3.556-.252 1.062.531 1.928 1.577 1.928 1.893 0 3.351-1.994 3.351-4.871 0-2.545-1.829-4.326-4.442-4.326-3.025 0-4.8 2.269-4.8 4.615 0 .914.351 1.893.79 2.428a.318.318 0 0 1 .073.304c-.081.333-.26 1.06-.295 1.207-.047.196-.157.237-.362.143-1.349-.629-2.193-2.603-2.193-4.192 0-3.408 2.476-6.539 7.141-6.539 3.749 0 6.667 2.673 6.667 6.244 0 3.726-2.349 6.72-5.61 6.72-1.096 0-2.127-.57-2.48-1.24l-.674 2.514c-.244.939-.904 2.113-1.346 2.83.607.188 1.25.289 1.916.289 5.523 0 10-4.477 10-10S17.523 2 12 2z" />
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
        </>
    );
}
