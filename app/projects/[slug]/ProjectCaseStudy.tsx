'use client';

import { Fragment, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import CTAStrip from '@/app/components/CTAStrip';
import { PROJECT_ROLE } from '@/data/project-role';
import type { Project, ProjectImage } from '@/types/project';
import '../oakridge-house/project.css';
import './case-study.css';

/* ═══════════════════════════════════════════════════════════════════
   PROJECT CASE STUDY - shared template for data-driven projects
   Same structure and styling as the hand-built project pages (hero with
   three highlights, "Our role" band, three text sections, gallery, more
   projects), adapted to the shape of each project's renders:
     · landscape lead render → the full-bleed `pd-hero` used elsewhere;
     · portrait lead render  → a split hero that shows the render whole
       instead of cropping a tall image into a wide band.
   The gallery likewise keeps every render's own aspect ratio.
   ═══════════════════════════════════════════════════════════════════ */

export interface MoreProject {
    title: string;
    category: string;
    image: string;
    href: string;
}

interface ProjectCaseStudyProps {
    project: Project;
    moreProjects: MoreProject[];
}

const ratio = (image: ProjectImage) => image.width / image.height;

/* Same three icons as the hand-built pages: plan, layered materials, light */
const HIGHLIGHT_ICON_SHAPES = [
    <>
        <rect x="6" y="8" width="36" height="32" rx="1" />
        <line x1="6" y1="17" x2="42" y2="17" />
        <line x1="6" y1="28" x2="42" y2="28" />
        <line x1="18" y1="8" x2="18" y2="40" />
        <line x1="30" y1="8" x2="30" y2="40" />
        <rect x="20" y="30" width="8" height="10" rx="0.5" />
    </>,
    <>
        <path d="M8 34l16 8 16-8" />
        <path d="M8 26l16 8 16-8" />
        <path d="M8 18l16 8 16-8" />
        <path d="M8 18l16-8 16 8" />
        <line x1="8" y1="18" x2="8" y2="34" />
        <line x1="40" y1="18" x2="40" y2="34" />
    </>,
    <>
        <path d="M24 6v6M24 36v6M6 24h6M36 24h6" />
        <path d="M11.5 11.5l4.2 4.2M32.3 32.3l4.2 4.2M36.5 11.5l-4.2 4.2M15.7 32.3l-4.2 4.2" />
        <circle cx="24" cy="24" r="7" />
        <circle cx="24" cy="24" r="2" />
    </>,
];

function HighlightIcon({ index, className }: { index: number; className: string }) {
    return (
        <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {HIGHLIGHT_ICON_SHAPES[index]}
        </svg>
    );
}

/** Landscape renders of mixed proportions, in rows of two (three in the last
 *  row when the count is odd) - the row CSS gives every render in a row the
 *  same height, so nothing is cropped and no column runs short. */
function justifiedRows(images: ProjectImage[]): ProjectImage[][] {
    const rows: ProjectImage[][] = [];
    for (let i = 0; i < images.length; ) {
        const size = images.length - i === 3 ? 3 : 2;
        rows.push(images.slice(i, i + size));
        i += size;
    }
    return rows;
}

function GalleryItem({ image, sizes }: { image: ProjectImage; sizes: string }) {
    return (
        <figure
            className="cs-gallery-item"
            style={{ aspectRatio: `${image.width} / ${image.height}`, '--cs-ratio': ratio(image) } as React.CSSProperties}
        >
            <Image src={image.src} alt={image.alt} fill sizes={sizes} className="cs-gallery-img" />
        </figure>
    );
}

const PIN_ICON = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 21s-8-7.75-8-13A8 8 0 0 1 20 8c0 5.25-8 13-8 13Z" />
        <circle cx="12" cy="8" r="2.5" />
    </svg>
);

export default function ProjectCaseStudy({ project, moreProjects }: ProjectCaseStudyProps) {
    const caseStudy = project.caseStudy!;
    const { gallery } = caseStudy;
    const lead = gallery[0];
    const isPortrait = ratio(lead) < 1;

    // The hero cycles through renders of the lead's shape only - a near-square
    // render in a 16:9 slideshow (or vice versa) would crop badly.
    const heroSlides = gallery.filter((image) => Math.abs(ratio(image) - ratio(lead)) / ratio(lead) <= 0.3);
    const heroRatios = heroSlides.map(ratio).sort((a, b) => a - b);
    const medianHeroRatio = heroRatios[Math.floor(heroRatios.length / 2)];

    const [activeSlide, setActiveSlide] = useState(0);
    const [prevSlide, setPrevSlide] = useState<number | null>(null);
    const [moreActive, setMoreActive] = useState(0);

    /* Hero slideshow - advance every 5 s */
    useEffect(() => {
        if (heroSlides.length < 2) return;
        const timer = setInterval(() => {
            setActiveSlide((cur) => {
                setPrevSlide(cur);
                return (cur + 1) % heroSlides.length;
            });
        }, 5000);
        return () => clearInterval(timer);
    }, [heroSlides.length]);

    /* More Projects slideshow - advance every 5 s, loops */
    useEffect(() => {
        if (moreProjects.length < 2) return;
        const timer = setInterval(() => {
            setMoreActive((cur) => (cur + 1) % moreProjects.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [moreProjects.length]);

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

    const slideClass = (base: string, i: number) =>
        `${base}${i === activeSlide ? ` ${base}--active` : i === prevSlide ? ` ${base}--exit` : ''}`;

    return (
        <>
            <Navigation />
            <CTAStrip />
            <article className="project-detail">

                {isPortrait ? (
                    /* ── HERO · portrait renders ── */
                    <section className="cs-hero" style={{ '--cs-hero-ar': ratio(lead) } as React.CSSProperties}>
                        <div className="cs-hero-inner">
                            <div className="cs-hero-text">
                                <motion.p
                                    className="cs-hero-label"
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.7 }}
                                >{caseStudy.label}</motion.p>
                                <motion.h1
                                    className="cs-hero-title"
                                    initial={{ opacity: 0, y: 28 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.85, delay: 0.15 }}
                                >{project.title}</motion.h1>
                                <motion.p
                                    className="cs-hero-subtitle"
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.7, delay: 0.3 }}
                                >{caseStudy.subtitle}</motion.p>
                                <motion.ul
                                    className="cs-hero-highlights"
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.7, delay: 0.45 }}
                                >
                                    {caseStudy.highlights.map((highlight, i) => (
                                        <li key={highlight} className="cs-hero-highlight">
                                            <HighlightIcon index={i} className="cs-hero-highlight-icon" />
                                            <p>{highlight}</p>
                                        </li>
                                    ))}
                                </motion.ul>
                                <p className="cs-hero-location">
                                    {PIN_ICON}
                                    <span>{project.location}</span>
                                </p>
                            </div>

                            <div className="cs-hero-media">
                                {heroSlides.map((image, i) => (
                                    <Image
                                        key={image.src}
                                        src={image.src}
                                        alt={image.alt}
                                        fill
                                        priority={i === 0}
                                        quality={90}
                                        sizes="(max-width: 920px) 100vw, 46vw"
                                        className={slideClass('cs-slide', i)}
                                    />
                                ))}
                            </div>
                        </div>
                    </section>
                ) : (
                    /* ── HERO · landscape renders (same as the hand-built pages on
                          desktop; stacked render-then-copy on phones, see CSS) ── */
                    <section className="pd-hero cs-hero--landscape" style={{ '--pd-hero-ar': medianHeroRatio } as React.CSSProperties}>
                        <div className="cs-landscape-media">
                            {heroSlides.map((image, i) => (
                                <Image
                                    key={image.src}
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    priority={i === 0}
                                    quality={90}
                                    sizes="100vw"
                                    className={`pd-hero-img ${slideClass('pd-hero-slide', i)}`}
                                />
                            ))}
                            <div className="pd-hero-overlay" />
                        </div>

                        <div className="pd-hero-center">
                            <motion.p
                                className="pd-hero-category"
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7 }}
                            >{caseStudy.label}</motion.p>
                            <motion.div
                                className="pd-hero-title-row"
                                initial={{ opacity: 0, y: 28 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.85, delay: 0.15 }}
                            >
                                <span className="pd-hero-deco-line" />
                                <h1 className="pd-hero-title">{project.title}</h1>
                                <span className="pd-hero-deco-line" />
                            </motion.div>
                            <motion.p
                                className="pd-hero-subtitle"
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.3 }}
                            >{caseStudy.subtitle}</motion.p>
                        </div>

                        {/* Bottom bar - location + 3 highlights */}
                        <div className="pd-hero-bottom">
                            <div className="pd-hero-location">
                                {PIN_ICON}
                                <span>{project.location}</span>
                            </div>
                            {/* Flat stat / divider / stat … siblings, exactly as on the
                                hand-built pages - their CSS hides `.pd-hero-stat:last-child`
                                on tablets, which relies on this structure. */}
                            <div className="pd-hero-stats">
                                {caseStudy.highlights.map((highlight, i) => (
                                    <Fragment key={highlight}>
                                        {i > 0 && <div className="pd-hero-stat-divider" />}
                                        <div className="pd-hero-stat">
                                            <HighlightIcon index={i} className="pd-hero-stat-icon" />
                                            <p>{highlight}</p>
                                        </div>
                                    </Fragment>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                <p className="pd-role">{PROJECT_ROLE}</p>

                {/* ── TEXT SECTIONS ── */}
                {caseStudy.sections.map((section, i) => (
                    <section
                        key={section.heading}
                        className={`pd-text-section${i % 2 === 0 ? ' pd-text-section--alt' : ''} pd-reveal`}
                    >
                        <h2 className="pd-section-heading">{section.heading}</h2>
                        <div className="pd-text-body">
                            <p>{section.body}</p>
                        </div>
                    </section>
                ))}

                {/* ── PROJECT GALLERY ── */}
                <section className="pd-gallery-section">
                    <div className="pd-gallery-heading pd-reveal">
                        <span className="pd-gallery-deco-line" />
                        <h2 className="pd-gallery-title">Project Gallery</h2>
                        <span className="pd-gallery-deco-line" />
                    </div>
                    {isPortrait ? (
                        <div
                            className="cs-gallery cs-gallery--portrait"
                            // 6 renders → 3 + 3; 7 → 4 + 3 (centred). Breakpoints narrow it further.
                            style={{ '--cs-gallery-desktop-cols': gallery.length % 3 === 0 ? 3 : 4 } as React.CSSProperties}
                        >
                            {gallery.map((image) => (
                                <GalleryItem
                                    key={image.src}
                                    image={image}
                                    sizes="(max-width: 640px) 50vw, (max-width: 1100px) 33vw, 25vw"
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="cs-gallery cs-gallery--landscape">
                            {justifiedRows(gallery).map((row) => (
                                <div key={row[0].src} className="cs-gallery-row">
                                    {row.map((image) => (
                                        <GalleryItem
                                            key={image.src}
                                            image={image}
                                            sizes={`(max-width: 768px) 100vw, ${Math.round(100 / row.length)}vw`}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* ── MORE PROJECTS ── */}
                {moreProjects.length > 0 && (
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
                                {[...moreProjects, moreProjects[0]].map((p, i) => (
                                    <Link key={i} href={p.href} className="pd-more-card">
                                        <div className="pd-more-card-img-wrap">
                                            <Image src={p.image} alt={p.title} fill className="pd-more-card-img" sizes="(max-width: 768px) 80vw, 46vw" />
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
                )}

            </article>
            <Footer />
        </>
    );
}
