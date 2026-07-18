'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import CTAStrip from '../../components/CTAStrip';
import img1 from '../../assets/Project3/1.webp';
import img2 from '../../assets/Project3/2.webp';
import img3 from '../../assets/Project3/3.webp';
import img4 from '../../assets/Project3/4.webp';
import img5 from '../../assets/Project3/5.webp';
import img6 from '../../assets/Project3/6.webp';
import img7 from '../../assets/Project3/7.webp';
import img8 from '../../assets/Project3/8.webp';
import '../oakridge-house/project.css';

const MORE_PROJECTS = [
    { title: 'Oakridge House', category: 'Residential', image: '/projects/oakridge-house/3.jpeg', href: '/projects/oakridge-house' },
    { title: 'SereniFlow Wellness Centre', category: 'Commercial', image: '/projects/sereniflow-wellness-centre/1.jpeg', href: '/projects/sereniflow-wellness-centre' },
    { title: 'Oakridge House', category: 'Residential', image: '/projects/oakridge-house/1.jpeg', href: '/projects/oakridge-house' },
];

const HERO_SLIDES = [img1, img2, img3, img4, img5, img6, img7, img8];

export default function ArboreSanctuaryCafePage() {
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
        { rootMargin: '0px 0px -40px 0px', threshold: 0 }
        );
        els.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <>
            <Navigation />
            <CTAStrip />
            <article className="project-detail">

                {/* ── HERO ── */}
                <section className="pd-hero">
                    {HERO_SLIDES.map((src, i) => (
                        <Image
                            key={i}
                            src={src}
                            alt={`Arboré Sanctuary Café — view ${i + 1}`}
                            fill
                            priority={i === 0}
                            className={`pd-hero-img pd-hero-slide${
                                i === activeSlide ? ' pd-hero-slide--active' :
                                i === prevSlide   ? ' pd-hero-slide--exit'   : ''
                            }`}
                            sizes="100vw"
                            quality={90}
                        />
                    ))}
                    <div className="pd-hero-overlay" />

                    {/* Centred title */}
                    <div className="pd-hero-center">
                        <motion.p
                            className="pd-hero-category"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                        >Multipurpose</motion.p>
                        <motion.div
                            className="pd-hero-title-row"
                            initial={{ opacity: 0, y: 28 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.85, delay: 0.15 }}
                        >
                            <span className="pd-hero-deco-line" />
                            <h1 className="pd-hero-title">Arboré Sanctuary Café</h1>
                            <span className="pd-hero-deco-line" />
                        </motion.div>
                        <motion.p
                            className="pd-hero-subtitle"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.3 }}
                        >A contemporary hospitality space designed to blend relaxation, social interaction, and nature within a refined interior setting.</motion.p>
                    </div>

                    {/* Bottom bar — location + 3 feature stats */}
                    <div className="pd-hero-bottom">
                        <div className="pd-hero-location">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 21s-8-7.75-8-13A8 8 0 0 1 20 8c0 5.25-8 13-8 13Z" />
                                <circle cx="12" cy="8" r="2.5" />
                            </svg>
                            <span>Bali, Indonesia</span>
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
                                <p>A biophilic hospitality environment designed to blend café culture, relaxation and social gathering within a single cohesive space.</p>
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
                                <p>Textured concrete ceiling, dark metal framework, warm timber planters and tiered planting units used as spatial dividers.</p>
                            </div>
                            <div className="pd-hero-stat-divider" />
                            <div className="pd-hero-stat">
                                <svg className="pd-hero-stat-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M24 6v6M24 36v6M6 24h6M36 24h6"/>
                                    <path d="M11.5 11.5l4.2 4.2M32.3 32.3l4.2 4.2M36.5 11.5l-4.2 4.2M15.7 32.3l-4.2 4.2"/>
                                    <circle cx="24" cy="24" r="7"/>
                                    <circle cx="24" cy="24" r="2"/>
                                </svg>
                                <p>Arched wall recesses, exposed services overhead, warm pendant clusters and a full-height glazed street frontage.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── CONCEPT ── */}
                <section className="pd-text-section pd-text-section--alt pd-reveal">
                    <h2 className="pd-section-heading">Concept</h2>
                    <div className="pd-text-body">
                        <p>
                            Arboré Sanctuary Café is conceived as a calm, immersive environment where
                            hospitality meets biophilic design. The space is designed to offer a layered
                            experience — transitioning from intimate seating areas to more social dining
                            zones — while maintaining a consistent sense of warmth and enclosure. The
                            client&#39;s preference for a natural yet contemporary atmosphere is reflected
                            through the integration of greenery, soft lighting, and a restrained material
                            palette.
                        </p>
                    </div>
                </section>

                {/* ── PLANNING & FORM ── */}
                <section className="pd-text-section pd-reveal">
                    <h2 className="pd-section-heading">Planning &amp; Form</h2>
                    <div className="pd-text-body">
                        <p>
                            The layout is organised to create clear zoning between lounge, café, and
                            circulation areas while maintaining visual continuity across the space. Linear
                            seating arrangements are paired with clustered social zones, allowing flexibility
                            in how the space is used throughout the day. Repetitive architectural elements
                            introduce rhythm and structure, while suspended planting units define spaces
                            without creating visual barriers.
                        </p>
                    </div>
                </section>

                {/* ── MATERIAL & LIGHT ── */}
                <section className="pd-text-section pd-text-section--alt pd-reveal">
                    <h2 className="pd-section-heading">Material &amp; Light</h2>
                    <div className="pd-text-body">
                        <p>
                            A combination of textured concrete finishes, warm timber, and dark metal accents
                            establishes a balanced and grounded material palette. Integrated planting
                            introduces a strong biophilic layer, softening the architectural edges and
                            enhancing the overall atmosphere. Lighting is layered and intentional — warm
                            pendant lights, concealed linear strips, and focused task lighting work together
                            to create depth, highlight textures, and maintain a comfortable ambience.
                        </p>
                    </div>
                </section>

                {/* ── REALISATION ── */}
                <section className="pd-text-section pd-reveal">
                    <h2 className="pd-section-heading">Realisation</h2>
                    <div className="pd-text-body">
                        <p>
                            The project is developed with a focus on durability, efficiency, and long-term
                            usability within a commercial setting. Materials and finishes are selected for
                            both performance and aesthetic consistency, ensuring the space remains functional
                            under high usage. The final outcome is a cohesive hospitality environment that
                            balances comfort, identity, and operational practicality.
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
                        {([img1, img2, img3, img4, img5, img6, img7, img8] as const).map((src, i, arr) => {
                            const isFull = i % 3 === 0 || (i === arr.length - 1 && i % 3 !== 2);
                            return (
                                <div key={i} className={`pd-gallery-item${isFull ? ' pd-gallery-item--full' : ''}`}>
                                    <Image
                                        src={src}
                                        alt={`Arboré Sanctuary Café — view ${i + 1}`}
                                        fill
                                        className="pd-gallery-img"
                                        sizes={isFull ? '100vw' : '50vw'}
                                        quality={90}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* ── QUOTE / TESTIMONIAL ── */}
                <section className="pd-quote-section">
                    <Image
                        src={img4}
                        alt="Arboré Sanctuary Café — dining room"
                        fill
                        className="pd-quote-bg"
                        sizes="100vw"
                        quality={90}
                    />
                    <div className="pd-quote-overlay" />
                    <div className="pd-quote-content pd-reveal">
                        <span className="pd-quote-marks">&ldquo;&ldquo;</span>
                        <blockquote className="pd-quote-text">
                            The planting, the light, the textures — it all works together in a way
                            that makes people slow down. Guests come in for a coffee and stay for hours.
                            That is exactly what we wanted.
                        </blockquote>
                        <cite className="pd-quote-cite">Client, Arboré Sanctuary Café — Bali, Indonesia</cite>
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
                                <Link key={i} href={p.href} className="pd-more-card">
                                    <div className="pd-more-card-img-wrap">
                                        <Image src={p.image} alt={p.title} fill className="pd-more-card-img" sizes="33vw" />
                                    </div>
                                    <div className="pd-more-card-overlay">
                                        <h3 className="pd-more-card-title">{p.title}</h3>
                                        <span className="pd-more-card-cat">{p.category}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

            </article>
            <Footer />
        </>
    );
}
