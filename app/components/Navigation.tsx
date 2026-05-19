'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './Navigation.css';
import logo from '../assets/logo.png';

export default function Navigation() {
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

    useEffect(() => {
        document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
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

    const mobileNav = [...navLeft, ...navRight];
    const closeMenu = () => setMobileMenuOpen(false);

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
                            <Image src={logo} alt="Aureon Studio" className="nav-header__logo" priority />
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
                                src={logo}
                                alt="Aureon Studio"
                                className="nav-header__logo nav-header__logo--mobile"
                                priority
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
                        <span></span>
                    </button>
                </div>
            </header>

            <div
                className={`nav-drawer ${mobileMenuOpen ? 'nav-drawer--open' : ''}`}
                aria-hidden={!mobileMenuOpen}
            >
                <div className="nav-drawer__inner">
                    <nav className="nav-drawer__nav" aria-label="Mobile navigation">
                        {mobileNav.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="nav-drawer__link"
                                onClick={closeMenu}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
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
