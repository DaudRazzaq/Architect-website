'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navigation from '../components/Navigation';
import CTAStrip from '../components/CTAStrip';
import './projects-page.css';

const ALL_PROJECTS = [
    {
        title: 'Oakridge House',
        location: 'Cobham, Surrey',
        category: 'Residential',
        image: '/projects/oakridge-house/1.jpeg',
        href: '/projects/oakridge-house',
    },
    {
        title: 'SereniFlow Wellness Centre',
        location: 'Richmond, London',
        category: 'Commercial',
        image: '/projects/sereniflow-wellness-centre/1.jpeg',
        href: '/projects/sereniflow-wellness-centre',
    },
    {
        title: 'Arboré Sanctuary Café',
        location: 'Bali, Indonesia',
        category: 'Multipurpose',
        image: '/projects/arbore-sanctuary-cafe/1.jpeg',
        href: '/projects/arbore-sanctuary-cafe',
    },
    {
        title: 'Harborview Office',
        location: 'London, UK',
        category: 'Commercial',
        image: '/b1.webp',
        href: null,
    },
    {
        title: 'Nordic Serenity',
        location: 'Edinburgh, Scotland',
        category: 'Multipurpose',
        image: '/b2.webp',
        href: null,
    },
    {
        title: 'Green City Residence',
        location: 'Manchester, UK',
        category: 'Residential',
        image: '/b3.webp',
        href: null,
    },
];

const FILTERS = ['All', 'Residential', 'Commercial', 'Multipurpose'];

export default function ProjectsPage() {
    const [activeFilter, setActiveFilter] = useState<string>('All');
    const gridRef = useRef<HTMLDivElement>(null);

    const filtered =
        activeFilter === 'All'
            ? ALL_PROJECTS
            : ALL_PROJECTS.filter((p) => p.category === activeFilter);

    // Scroll-reveal for cards
    useEffect(() => {
        const cards = gridRef.current?.querySelectorAll<HTMLElement>('.pw-reveal');
        if (!cards) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12 }
        );

        cards.forEach((card) => observer.observe(card));
        return () => observer.disconnect();
    }, [filtered]);

    return (
        <>
            <Navigation />
            <CTAStrip />
            {/* ── HERO ── */}
            <section className="pw-hero">
                <div className="pw-hero-bg">
                    <img
                        src="/projects/oakridge-house/3.jpeg"
                        alt="Oakridge House — Aureon Studio"
                    />
                </div>
                <div className="pw-hero-overlay" />

                <div className="pw-hero-center">
                    <motion.div
                        className="pw-hero-rule"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <span className="pw-hero-rule-line" />
                        <h1 className="pw-hero-title">Our Work</h1>
                        <span className="pw-hero-rule-line" />
                    </motion.div>
                    <motion.p
                        className="pw-hero-headline"
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.85, delay: 0.15 }}
                    >Selected Projects</motion.p>
                    <motion.p
                        className="pw-hero-sub"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                    >
                        A curated portfolio of homes, workspaces, and environments
                        designed with clarity, purpose, and material honesty.
                    </motion.p>
                </div>

                {/* Filter tabs */}
                <div className="pw-hero-filters">
                    {FILTERS.map((f) => (
                        <button
                            key={f}
                            className={`pw-hero-filter-btn${activeFilter === f ? ' active' : ''}`}
                            onClick={() => setActiveFilter(f)}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </section>

            {/* ── INTRO BAND ── */}
            <div className="pw-intro">
                <div className="pw-intro-rule">
                    <span className="pw-intro-rule-line" />
                    <span className="pw-intro-headline">Every Space Has Potential</span>
                    <span className="pw-intro-rule-line" />
                </div>
                <p className="pw-intro-body">
                    We believe architecture at its best is invisible — it simply makes life feel
                    easier, more comfortable, and more beautiful. Each project in our portfolio
                    begins with a conversation about how a space could work harder and feel richer.
                </p>
                <p className="pw-intro-body">
                    From private residences to commercial interiors and multipurpose environments,
                    explore the breadth of our work and see what becomes possible when design,
                    craft, and intention come together.
                </p>
            </div>

            {/* ── GRID ── */}
            <section className="pw-grid-section">
                <div ref={gridRef} className="pw-grid">
                    {filtered.length === 0 && (
                        <p className="pw-no-results">No projects found</p>
                    )}
                    {filtered.map((project, i) => {
                        const inner = (
                            <div
                                className="pw-card-img-wrap"
                                style={{ transitionDelay: `${(i % 2) * 0.12}s` }}
                            >
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    loading={i < 2 ? 'eager' : 'lazy'}
                                />
                                <div className="pw-card-overlay" />
                                <div className="pw-card-content">
                                    <span className="pw-card-category">{project.category}</span>
                                    <h2 className="pw-card-title">{project.title}</h2>
                                    <span className="pw-card-location">
                                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" style={{display:'inline',verticalAlign:'middle',marginRight:'3px'}}>
                                            <path d="M5 0.5C3.34 0.5 2 1.84 2 3.5C2 5.5 5 9.5 5 9.5C5 9.5 8 5.5 8 3.5C8 1.84 6.66 0.5 5 0.5ZM5 4.75C4.31 4.75 3.75 4.19 3.75 3.5C3.75 2.81 4.31 2.25 5 2.25C5.69 2.25 6.25 2.81 6.25 3.5C6.25 4.19 5.69 4.75 5 4.75Z" fill="currentColor"/>
                                        </svg>
                                        {project.location}
                                    </span>
                                </div>
                                {project.href && (
                                    <div className="pw-card-arrow">
                                        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3 13L13 3M13 3H7M13 3V9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                )}
                            </div>
                        );

                        if (project.href) {
                            return (
                                <Link
                                    key={project.title}
                                    href={project.href}
                                    className="pw-card pw-reveal"
                                    style={{ transitionDelay: `${(i % 2) * 0.1}s` }}
                                >
                                    {inner}
                                </Link>
                            );
                        }

                        return (
                            <div
                                key={project.title}
                                className="pw-card pw-card--placeholder pw-reveal"
                                style={{ transitionDelay: `${(i % 2) * 0.1}s` }}
                            >
                                {inner}
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="pw-cta">
                <span className="pw-cta-eyebrow">Start a Conversation</span>
                <h2 className="pw-cta-title">
                    Can you see the potential<br />in your home?
                </h2>
                <p className="pw-cta-body">
                    We&apos;d love to hear about your project. Whether you have a clear brief
                    or just an idea, reach out and let&apos;s explore what&apos;s possible together.
                </p>
                <Link href="/contact" className="pw-cta-btn">
                    Get in Touch
                </Link>
            </section>
        </>
    );
}
