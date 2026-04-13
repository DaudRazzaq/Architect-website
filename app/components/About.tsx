'use client';

import './About.css';

export default function About() {
    return (
        <>
            {/* About Us Section */}
            <section id="about" className="section about">
                <div className="container">
                    <div className="about-header">
                        <span className="about-label">ABOUT US</span>
                        <div className="about-header-line"></div>
                    </div>
                    <div className="about-grid">
                        <div className="about-title-col">
                            <h2 className="about-title">Interior Architecture & Refurbishment Design</h2>
                            <p className="about-lead">
                                We&apos;re a London studio delivering interior architecture and refurbishment design with a calm, considered approach.
                            </p>
                        </div>
                        <div className="about-content-col">
                            <p>
                                Our work is defined by strong layouts, refined material palettes, and details that translate beautifully from concept to build.
                            </p>
                            <p>
                                We take time to understand how you live, what you value, and what your home needs to become. With careful attention to proportion, light, and flow, we create spaces that feel effortless — elevated in character, practical in use, and designed to last.
                            </p>
                            <p>
                                Sustainability is integrated into our thinking from day one, through re-use, responsible specification, and long-term performance. The outcome is a home that supports your life today and remains relevant for years to come.
                            </p>
                            <a href="/studio" className="about-link">
                                DISCOVER OUR STUDIO →
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
