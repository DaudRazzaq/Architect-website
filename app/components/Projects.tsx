'use client';

import ProjectCard from './ProjectCard';
import './Projects.css';

export default function Projects() {
    const projects = [
        {
            title: 'Harborview Office',
            category: 'Residential',
            year: '2025',
            image: '/b1.webp'
        },
        {
            title: 'Nordic Serenity',
            category: 'Multipurpose',
            year: '2025',
            image: '/b2.webp'
        },
        {
            title: 'Green City',
            category: 'Commercial',
            year: '2023',
            image: '/b3.webp'
        },
        {
            title: 'New Culture',
            category: 'Commercial',
            year: '2024',
            image: '/image1b.webp'
        }
    ];

    return (
        <section id="projects" className="section projects">
            <div className="container">
                <div className="projects-header">
                    <h2 className="projects-title">Latest Projects</h2>
                    <a href="#contact" className="projects-all-link">
                        ALL PROJECTS
                    </a>
                </div>
                <div className="projects-grid">
                    {projects.map((project) => (
                        <ProjectCard
                            key={project.title}
                            title={project.title}
                            category={project.category}
                            year={project.year}
                            image={project.image}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
