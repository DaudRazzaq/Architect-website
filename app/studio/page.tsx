'use client';

import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Stats from '../components/Stats';
import './studio.css';

export default function StudioPage() {
    const teamMembers = [
        {
            name: 'Lars Johansen',
            role: 'SENIOR ARCHITECT',
            description: 'Lars brings a wealth of experience in commercial architecture, innovative designs that enhance functionality.',
            image: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        },
        {
            name: 'Erik Pedersen',
            role: 'PROJECT MANAGER',
            description: 'Erik develops flexible spaces that accommodate various functions and enhance community interactions.',
            image: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
        },
        {
            name: 'Ingrid Berg',
            role: 'CREATIVE DIRECTOR',
            description: 'Innovative designer with a focus on commercial architecture, Ingrid blends creative solutions with practical design.',
            image: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
        }
    ];

    return (
        <>
            <Navigation />

            {/* Studio Hero Section */}
            <section className="studio-hero">
                <div className="studio-hero-overlay"></div>
                <div className="studio-hero-content">
                    <span className="studio-hero-location">OSLO</span>
                    <h1 className="studio-hero-title">Studio</h1>
                    <div className="studio-hero-scroll">
                        <span>SCROLL</span>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M10 4L10 16M10 16L6 12M10 16L14 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>
            </section>

            {/* Studio About Section */}
            <section className="section studio-about">
                <div className="container">
                    <div className="studio-about-grid">
                        <div className="studio-about-title-col">
                            <h2 className="studio-about-title">Innovative Architecture with a Personal Touch</h2>
                        </div>
                        <div className="studio-about-content-col">
                            <p>
                                Welcome to our Oslo-based architecture studio, where creativity meets functionality in every design.
                                We specialize in commercial, multipurpose, and residential architecture, crafting spaces that not
                                only meet your needs but also inspire and delight. Our approach is rooted in a deep understanding
                                of each client's vision, allowing us to tailor our designs to reflect your unique style and requirements.
                            </p>
                            <p>
                                Our team is committed to integrating cutting-edge technology with sustainable practices, ensuring
                                that every project is both forward-thinking and environmentally responsible. From bustling commercial
                                hubs to versatile multipurpose venues and personalized residential homes, we strive to create
                                environments that enhance user experiences and stand the test of time.
                            </p>
                            <p>
                                Collaboration is at the heart of our process. We work closely with you to ensure every detail aligns
                                with your goals, resulting in spaces that are not only functional but also meaningful. Our dedication
                                to excellence and innovation drives us to push the boundaries of architecture, delivering exceptional
                                results that elevate the way people live and work. Let us bring your architectural dreams to life
                                with our expertise and passion for design.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <Stats />

            {/* Our Team Section */}
            <section className="section studio-team">
                <div className="container">
                    <h2 className="studio-team-title">Our Team</h2>
                    <div className="studio-team-grid">
                        {teamMembers.map((member) => (
                            <div key={member.name} className="team-card">
                                <div
                                    className="team-card-image"
                                    style={{ background: member.image }}
                                >
                                    {/* Placeholder for team member photo */}
                                </div>
                                <div className="team-card-content">
                                    <div className="team-card-role">{member.role}</div>
                                    <div className="team-card-social">
                                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                            </svg>
                                        </a>
                                        <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <circle cx="12" cy="12" r="10"></circle>
                                                <path d="M8 12h4v8M12 12c0-2.21 1.79-4 4-4"></path>
                                            </svg>
                                        </a>
                                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                                <rect x="2" y="9" width="4" height="12"></rect>
                                                <circle cx="4" cy="4" r="2"></circle>
                                            </svg>
                                        </a>
                                    </div>
                                    <h3 className="team-card-name">{member.name}</h3>
                                    <p className="team-card-description">{member.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
