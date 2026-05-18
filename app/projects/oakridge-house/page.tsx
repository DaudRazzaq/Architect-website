'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import img1 from '../../assets/Project1/1.jpeg';
import img2 from '../../assets/Project1/2.jpeg';
import img3 from '../../assets/Project1/3.jpeg';
import img4 from '../../assets/Project1/4.jpeg';
import img5 from '../../assets/Project1/5.jpeg';
import img6 from '../../assets/Project1/6.jpeg';
import img7 from '../../assets/Project1/7.jpeg';
import img8 from '../../assets/Project1/8.jpeg';
import './project.css';

const MORE_PROJECTS = [
    { title: 'Harborview Office', category: 'Commercial', image: '/b1.webp' },
    { title: 'Nordic Serenity', category: 'Multipurpose', image: '/b2.webp' },
    { title: 'Green City', category: 'Commercial', image: '/b3.webp' },
];

const HERO_SLIDES = [img1, img2, img3, img4, img5, img6, img7, img8];

export default function OakridgeHousePage() {
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
                    {/* Crossfade slide stack */}
                    {HERO_SLIDES.map((src, i) => (
                        <Image
                            key={i}
                            src={src}
                            alt={`Oakridge House — view ${i + 1}`}
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
                            <h1 className="pd-hero-title">Oakridge House</h1>
                            <span className="pd-hero-deco-line" />
                        </div>
                        <p className="pd-hero-category">Residential</p>
                    </div>

                    {/* Bottom bar — location + 3 feature stats */}
                    <div className="pd-hero-bottom">
                        <div className="pd-hero-location">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 21s-8-7.75-8-13A8 8 0 0 1 20 8c0 5.25-8 13-8 13Z" />
                                <circle cx="12" cy="8" r="2.5" />
                            </svg>
                            <span>Cobham, Surrey</span>
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
                                <p>A new-build family home combining a traditional pitched form with a refined contemporary material palette.</p>
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
                                <p>Coursed natural stone façade, dark slate roof, steel-framed glazing and a south-facing garden terrace with pool.</p>
                            </div>
                            <div className="pd-hero-stat-divider" />
                            <div className="pd-hero-stat">
                                <svg className="pd-hero-stat-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M24 6v6M24 36v6M6 24h6M36 24h6"/>
                                    <path d="M11.5 11.5l4.2 4.2M32.3 32.3l4.2 4.2M36.5 11.5l-4.2 4.2M15.7 32.3l-4.2 4.2"/>
                                    <circle cx="24" cy="24" r="7"/>
                                    <circle cx="24" cy="24" r="2"/>
                                </svg>
                                <p>Open-plan ground floor living designed to connect seamlessly with outdoor terraced space and mature landscape.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── THE CHALLENGE ── */}
                <section className="pd-text-section pd-text-section--alt pd-reveal">
                    <h2 className="pd-section-heading">The Challenge</h2>
                    <div className="pd-text-body">
                        <p>
                            The brief was to design a substantial family home on a generous plot in Cobham,
                            Surrey — a setting defined by mature trees, established boundaries and a strong
                            local vernacular of stone-built houses under pitched slate roofs.
                        </p>
                        <p>
                            The client required a home that could accommodate multi-generational family life
                            across generous open-plan spaces, while maintaining a sense of privacy, scale and
                            connection to the south-facing garden. The planning context demanded a roofline and
                            massing consistent with neighbouring properties, ruling out flat-roof or overtly
                            modernist approaches.
                        </p>
                    </div>
                </section>

                {/* ── THE SOLUTION ── */}
                <section className="pd-text-section pd-reveal">
                    <h2 className="pd-section-heading">The Solution</h2>
                    <div className="pd-text-body">
                        <p>
                            The design adopts a traditional pitched roof form and coursed natural stone façade
                            — responding directly to the local character whilst resolved through a strictly
                            contemporary architectural language. Dark slate roofing, black steel-framed windows
                            and minimal external detailing create a house that feels grounded and assured
                            without resorting to pastiche.
                        </p>
                        <p>
                            Internally, the ground floor is organised as a series of open-plan living and
                            dining spaces, each oriented towards the garden. Full-height sliding glass doors
                            dissolve the boundary between inside and outside, opening onto a generous stone
                            terrace with an integrated pool. The principal bedroom suite occupies a private
                            wing at first-floor level, designed for calm and quiet retreat.
                        </p>
                    </div>
                </section>

                {/* ── THE OUTCOME ── */}
                <section className="pd-text-section pd-text-section--alt pd-reveal">
                    <h2 className="pd-section-heading">The Outcome</h2>
                    <div className="pd-text-body">
                        <p>
                            Oakridge House achieves a rare balance — a home that is unmistakably contemporary
                            in character yet entirely at ease within its Surrey village setting. The natural
                            stone façade, slate roof and carefully considered proportions give the house a
                            quality of permanence that belies its newness.
                        </p>
                        <p>
                            The open-plan interior flows naturally between kitchen, dining and living zones,
                            with the garden terrace and pool acting as an extension of daily family life.
                            The project demonstrates that sensitive contextual design and ambitious spatial
                            quality are not mutually exclusive — and that the best new homes are those that
                            look as though they were always meant to be there.
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
                        {([img1, img2, img3, img4, img5, img6, img7, img8] as const).map((src, i) => (
                            <div key={i} className="pd-gallery-item">
                                <Image
                                    src={src}
                                    alt={`Oakridge House — view ${i + 1}`}
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
                        src={img5}
                        alt="Oakridge House — interior"
                        fill
                        className="pd-quote-bg"
                        sizes="100vw"
                    />
                    <div className="pd-quote-overlay" />
                    <div className="pd-quote-content pd-reveal">
                        <span className="pd-quote-marks">&ldquo;&ldquo;</span>
                        <blockquote className="pd-quote-text">
                            The stone, the slate, the light through those full-height doors — it feels
                            like it has always been here. It is exactly the home we imagined,
                            and more than we hoped for.
                        </blockquote>
                        <cite className="pd-quote-cite">Client, Oakridge House — Cobham, Surrey</cite>
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
