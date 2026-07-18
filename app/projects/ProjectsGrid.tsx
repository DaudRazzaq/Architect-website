'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface PortfolioItem {
    title: string;
    location: string;
    category: string;
    image: string;
    href: string | null;
}

const FILTERS = ['All', 'Residential', 'Commercial', 'Multipurpose'];

export default function ProjectsGrid({ projects }: { projects: PortfolioItem[] }) {
    const [activeFilter, setActiveFilter] = useState<string>('All');
    const gridRef = useRef<HTMLDivElement>(null);

    const filtered =
        activeFilter === 'All'
            ? projects
            : projects.filter((p) => p.category === activeFilter);

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

            {/* Grid */}
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
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority={i < 2}
                                    className="pw-card-img"
                                />
                                <div className="pw-card-overlay" />
                                <div className="pw-card-content">
                                    <span className="pw-card-category">{project.category}</span>
                                    <h2 className="pw-card-title">{project.title}</h2>
                                    <span className="pw-card-location">
                                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '3px' }}>
                                            <path d="M5 0.5C3.34 0.5 2 1.84 2 3.5C2 5.5 5 9.5 5 9.5C5 9.5 8 5.5 8 3.5C8 1.84 6.66 0.5 5 0.5ZM5 4.75C4.31 4.75 3.75 4.19 3.75 3.5C3.75 2.81 4.31 2.25 5 2.25C5.69 2.25 6.25 2.81 6.25 3.5C6.25 4.19 5.69 4.75 5 4.75Z" fill="currentColor" />
                                        </svg>
                                        {project.location}
                                    </span>
                                </div>
                                {project.href && (
                                    <div className="pw-card-arrow">
                                        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3 13L13 3M13 3H7M13 3V9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
        </>
    );
}
