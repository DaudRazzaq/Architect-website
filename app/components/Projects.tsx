'use client';

import ProjectCard from './ProjectCard';
import './Projects.css';

export default function Projects() {
    const projects = [
        {
            title: 'Harborview Office',
            category: 'Residential',
            year: '2025',
            gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        },
        {
            title: 'Nordic Serenity',
            category: 'Multipurpose',
            year: '2025',
            gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
        },
        {
            title: 'Green City',
            category: 'Commercial',
            year: '2023',
            gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
        },
        {
            title: 'New Culture',
            category: 'Commercial',
            year: '2024',
            gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
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
                            gradient={project.gradient}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
