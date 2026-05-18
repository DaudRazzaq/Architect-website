'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import img1 from '../../assets/Project2/1.jpeg';
import img2 from '../../assets/Project2/2.jpeg';
import img3 from '../../assets/Project2/3.jpeg';
import img4 from '../../assets/Project2/4.jpeg';
import img5 from '../../assets/Project2/5.jpeg';
import img6 from '../../assets/Project2/6.jpeg';
import img7 from '../../assets/Project2/7.jpeg';
import img8 from '../../assets/Project2/8.jpeg';
import img9 from '../../assets/Project2/9.jpeg';
import img10 from '../../assets/Project2/10.jpeg';
import img11 from '../../assets/Project2/1.1.jpeg';
import '../oakridge-house/project.css';

const MORE_PROJECTS = [
    { title: 'Oakridge House', category: 'Residential', image: '/projects/oakridge-house/1.jpeg' },
    { title: 'Harborview Office', category: 'Commercial', image: '/b1.webp' },
    { title: 'Nordic Serenity', category: 'Multipurpose', image: '/b2.webp' },
];

const HERO_SLIDES = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11];

export default function SereniflowWellnessPage() {
    const [activeSlide, setActiveSlide] = useState(0);
    const [prevSlide, setPrevSlide] = useState<number | null>(null);
    const [moreActive, setMoreActive] = useState(0);

    /* Hero slideshow — advance every 5 s */
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveSlide((cur) => {
                setPrevSlide(cur);
                return (cur + 1) % HERO_SLIDES.length;
            });
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    /* More Projects slideshow — advance every 5 s, loops */
    useEffect(() => {
        const timer = setInterval(() => {
            setMoreActive((cur) => (cur + 1) % MORE_PROJECTS.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    /* Scroll-reveal */
    useEffect(() => {
        const els = document.querySelectorAll('.pd-reveal');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('pd-revealed');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12 }
        );
        els.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <>
            <Navigation />
            <article className="project-detail">

                {/* ── HERO ── */}
                <section className="pd-hero">
                    {HERO_SLIDES.map((src, i) => (
                        <Image
                            key={i}
                            src={src}
                            alt={`SereniFlow Wellness Centre — view ${i + 1}`}
                            fill
                            priority={i === 0}
                            className={`pd-hero-img pd-hero-slide${
                                i === activeSlide ? ' pd-hero-slide--active' :
                                i === prevSlide   ? ' pd-hero-slide--exit'   : ''
                            }`}
                            sizes="100vw"
                        />
                    ))}
                    <div className="pd-hero-overlay" />

                    {/* Right quick-nav panel */}
                    <nav className="pd-hero-panel">
                        <a href="#contact" className="pd-hero-panel-item">Enquire Now</a>
                        <Link href="/services" className="pd-hero-panel-item">Services</Link>
                        <Link href="/#projects" className="pd-hero-panel-item">View Latest Projects</Link>
                    </nav>

                    {/* Centred title */}
                    <div className="pd-hero-center">
                        <div className="pd-hero-title-row">
                            <span className="pd-hero-deco-line" />
                            <h1 className="pd-hero-title">SereniFlow Wellness Centre</h1>
                            <span className="pd-hero-deco-line" />
                        </div>
                        <p className="pd-hero-category">Commercial</p>
                        <p className="pd-hero-subtitle">A contemporary wellness environment designed to support movement, relaxation, and a seamless spatial experience.</p>
                    </div>

                    {/* Bottom bar — location + 3 feature stats */}
                    <div className="pd-hero-bottom">
                        <div className="pd-hero-location">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 21s-8-7.75-8-13A8 8 0 0 1 20 8c0 5.25-8 13-8 13Z" />
                                <circle cx="12" cy="8" r="2.5" />
                            </svg>
                            <span>Richmond, London</span>
                        </div>
                        <div className="pd-hero-stats">
                            <div className="pd-hero-stat">
                                <svg className="pd-hero-stat-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="6" y="8" width="36" height="32" rx="1"/>
                                    <line x1="6" y1="17" x2="42" y2="17"/>
                                    <line x1="6" y1="28" x2="42" y2="28"/>
                                    <line x1="18" y1="8" x2="18" y2="40"/>
                                    <line x1="30" y1="8" x2="30" y2="40"/>
                                    <rect x="20" y="30" width="8" height="10" rx="0.5"/>
                                </svg>
                                <p>A contemporary wellness environment designed around clarity, movement and a seamless spatial experience.</p>
                            </div>
                            <div className="pd-hero-stat-divider" />
                            <div className="pd-hero-stat">
                                <svg className="pd-hero-stat-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M8 34l16 8 16-8"/>
                                    <path d="M8 26l16 8 16-8"/>
                                    <path d="M8 18l16 8 16-8"/>
                                    <path d="M8 18l16-8 16 8"/>
                                    <line x1="8" y1="18" x2="8" y2="34"/>
                                    <line x1="40" y1="18" x2="40" y2="34"/>
                                </svg>
                                <p>Timber cladding, limestone floors, microcement walls and a double-height atrium with glass balustrade.</p>
                            </div>
                            <div className="pd-hero-stat-divider" />
                            <div className="pd-hero-stat">
                                <svg className="pd-hero-stat-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M24 6v6M24 36v6M6 24h6M36 24h6"/>
                                    <path d="M11.5 11.5l4.2 4.2M32.3 32.3l4.2 4.2M36.5 11.5l-4.2 4.2M15.7 32.3l-4.2 4.2"/>
                                    <circle cx="24" cy="24" r="7"/>
                                    <circle cx="24" cy="24" r="2"/>
                                </svg>
                                <p>Raised movement studio, living green wall, integrated linear lighting and a circular glass lift.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── CONCEPT ── */}
                <section className="pd-text-section pd-text-section--alt pd-reveal">
                    <h2 className="pd-section-heading">Concept</h2>
                    <div className="pd-text-body">
                        <p>
                            SereniFlow Wellness Centre is conceived as a spatial environment that promotes
                            calm through clarity and continuity. The design builds on the client&#39;s
                            preference for a minimal, naturally lit setting, where visual noise is reduced
                            and the focus remains on movement, balance, and wellbeing. The central platform
                            forms the core of the space, acting as a grounding element that organises activity
                            while allowing the surrounding environment to remain open and fluid. Vertical
                            openness enhances this sense of lightness and connection.
                        </p>
                    </div>
                </section>

                {/* ── PLANNING & FORM ── */}
                <section className="pd-text-section pd-reveal">
                    <h2 className="pd-section-heading">Planning &amp; Form</h2>
                    <div className="pd-text-body">
                        <p>
                            The layout is structured around a clear and efficient circulation strategy,
                            allowing uninterrupted use of the central wellness area. A continuous walkway
                            frames the raised platform, maintaining movement around the space without
                            interfering with its primary function. Spatial layering reinforces openness
                            while maintaining a controlled and balanced composition.
                        </p>
                    </div>
                </section>

                {/* ── MATERIAL & LIGHT ── */}
                <section className="pd-text-section pd-text-section--alt pd-reveal">
                    <h2 className="pd-section-heading">Material &amp; Light</h2>
                    <div className="pd-text-body">
                        <p>
                            A restrained palette of timber, stone, and neutral finishes establishes a warm
                            and cohesive interior language. Natural textures are used to soften the space,
                            while darker elements provide contrast and definition. Daylight is maximised
                            through large glazed openings, creating a calm and naturally evolving atmosphere.
                            Integrated linear lighting provides soft, even illumination that supports both
                            function and ambience.
                        </p>
                    </div>
                </section>

                {/* ── REALISATION ── */}
                <section className="pd-text-section pd-reveal">
                    <h2 className="pd-section-heading">Realisation</h2>
                    <div className="pd-text-body">
                        <p>
                            The project translates a clear design intent into a practical and durable
                            commercial space. Material selections and construction methods are chosen for
                            longevity and ease of maintenance, ensuring the Centre remains functional over
                            time. The final outcome is a balanced environment that combines simplicity,
                            flexibility, and a refined architectural identity.
                        </p>
                    </div>
                </section>

                {/* ── PROJECT GALLERY ── */}
                <section className="pd-gallery-section pd-reveal">
                    <div className="pd-gallery-heading">
                        <span className="pd-gallery-deco-line" />
                        <h2 className="pd-gallery-title">Project Gallery</h2>
                        <span className="pd-gallery-deco-line" />
                    </div>
                    <div className="pd-gallery-grid">
                        {([img1, img11, img2, img3, img4, img5, img6, img7, img8, img9, img10] as const).map((src, i) => (
                            <div key={i} className="pd-gallery-item">
                                <Image
                                    src={src}
                                    alt={`SereniFlow Wellness Centre — view ${i + 1}`}
                                    className="pd-gallery-img"
                                    style={{ width: '100%', height: 'auto', display: 'block' }}
                                />
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── QUOTE / TESTIMONIAL ── */}
                <section className="pd-quote-section">
                    <Image
                        src={img7}
                        alt="SereniFlow Wellness Centre — lobby"
                        fill
                        className="pd-quote-bg"
                        sizes="100vw"
                    />
                    <div className="pd-quote-overlay" />
                    <div className="pd-quote-content pd-reveal">
                        <span className="pd-quote-marks">&ldquo;&ldquo;</span>
                        <blockquote className="pd-quote-text">
                            Walking in for the first time, the space just settles you. The light,
                            the stone, the warmth of the timber — it is exactly what a wellness
                            centre should feel like. Our clients never want to leave.
                        </blockquote>
                        <cite className="pd-quote-cite">Client, SereniFlow Wellness Centre — Richmond, London</cite>
                    </div>
                </section>

                {/* ── MORE PROJECTS LIKE THIS ── */}
                <section className="pd-more-section">
                    <div className="pd-more-heading pd-reveal">
                        <span className="pd-more-deco-line" />
                        <h2 className="pd-more-title">More Projects Like This</h2>
                        <span className="pd-more-deco-line" />
                    </div>
                    <div className="pd-more-track">
                        <div
                            className="pd-more-strip"
                            style={{ transform: `translateX(calc(-${moreActive} * var(--more-card-advance)))` }}
                        >
                            {[...MORE_PROJECTS, MORE_PROJECTS[0]].map((p, i) => (
                                <div key={i} className="pd-more-card">
                                    <div className="pd-more-card-img-wrap">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={p.image} alt={p.title} className="pd-more-card-img" loading="lazy" />
                                    </div>
                                    <div className="pd-more-card-overlay">
                                        <h3 className="pd-more-card-title">{p.title}</h3>
                                        <span className="pd-more-card-cat">{p.category}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

            </article>
            <Footer />
        </>
    );
}
