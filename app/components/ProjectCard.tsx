'use client';

import './ProjectCard.css';

interface ProjectCardProps {
    title: string;
    category: string;
    year: string;
    gradient: string;
}

export default function ProjectCard({ title, category, year, gradient }: ProjectCardProps) {
    return (
        <div className="project-card">
            <div
                className="project-card-image"
                style={{ background: gradient }}
            >
            </div>
            <div className="project-card-content">
                <h3 className="project-card-title">{title}</h3>
                <div className="project-card-meta">
                    <span className="project-card-category">{category}</span>
                    <span className="project-card-year">{year}</span>
                </div>
            </div>
        </div>
    );
}
