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
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY <= 20) {
                setHeaderHidden(false);
                lastScrollY.current = currentScrollY;
                return;
            }

            if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                setHeaderHidden(true);
            } else if (currentScrollY < lastScrollY.current) {
                setHeaderHidden(false);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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

    const slides = [hero1, hero2, hero3, hero4, hero5, hero6];
    const slidingTrack = [...slides, ...slides];

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
            </div>
        </section>
    );
}