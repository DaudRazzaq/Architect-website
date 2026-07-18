'use client';

import { useState } from 'react';
import Link from 'next/link';
import ProjectCard from './ProjectCard';
import './Projects.css';

const projects = [
    {
        title: 'Oakridge House',
        location: 'Cobham, Surrey',
        category: 'Residential',
        image: '/projects/oakridge-house/3.jpeg',
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
    },
    {
        title: 'Axis Pavillion',
        location: 'Edinburgh, Scotland',
        category: 'Multipurpose',
        image: '/b2.webp',
    },
    {
        title: 'Green City',
        location: 'Manchester, UK',
        category: 'Commercial',
        image: '/b3.webp',
    },
];

const FILTERS = ['Residential', 'Commercial', 'Multipurpose'];

export default function Projects() {
    const [activeFilter, setActiveFilter] = useState<string | null>(null);

    const filtered = activeFilter
        ? projects.filter((p) => p.category === activeFilter)
        : projects;

    return (
        <section id="projects" className="projects">
            {/* Section heading */}
            <div className="projects-heading-wrap">
                <div className="projects-heading">
                    <h2 className="projects-title">Our Work</h2>
                    <span className="projects-heading-line" />
                </div>
            </div>

            {/* Category filters */}
            <div className="projects-filters">
                {FILTERS.map((f) => (
                    <button
                        key={f}
                        className={`projects-filter-btn${activeFilter === f ? ' active' : ''}`}
                        onClick={() => setActiveFilter(activeFilter === f ? null : f)}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Full-width cards grid */}
            <div className="projects-track">
                {filtered.map((project) => (
                    <ProjectCard
                        key={project.title}
                        title={project.title}
                        category={project.category}
                        location={project.location}
                        image={project.image}
                        href={project.href}
                    />
                ))}
            </div>

            {/* Footer link */}
            <div className="projects-footer">
                <Link href="/projects" className="projects-view-all">
                    View All Projects
                </Link>
            </div>
        </section>
    );
}
