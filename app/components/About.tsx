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

            {/* Our Approach Section */}
            <section className="approach-section">
                <div className="container">
                    <div className="approach-header">
                        <span className="approach-label">OUR APPROACH</span>
                        <h2 className="approach-title">How We Work</h2>
                        <div className="approach-header-line"></div>
                    </div>
                    <div className="approach-grid">
                        <div className="approach-card">
                            <span className="approach-card-number">01</span>
                            <h3 className="approach-card-title">We notice the things</h3>
                            <p>
                                From the small frustrations you&apos;ve stopped noticing to the habits that shape how you live, we pay attention. We listen first, ask the right questions, and look closely at how your home works day to day — so the design solves real problems, not just aesthetic ones.
                            </p>
                        </div>
                        <div className="approach-card">
                            <span className="approach-card-number">02</span>
                            <h3 className="approach-card-title">We make the seemingly impossible, possible</h3>
                            <p>
                                London homes come with constraints: tight footprints, awkward layouts, limited light, and planning or structural limits. We thrive on finding smart ways through them — rethinking flow, unlocking hidden storage, reshaping sightlines, and using light and proportion to make spaces feel bigger, brighter, and calmer.
                            </p>
                        </div>
                        <div className="approach-card">
                            <span className="approach-card-number">03</span>
                            <h3 className="approach-card-title">We design for real life</h3>
                            <p>
                                Beautiful interiors only matter if they work effortlessly. We balance atmosphere with function, creating spaces that support routines, gatherings, privacy, and rest. Every decision — from layout to materials — is made with longevity, comfort, and daily use in mind.
                            </p>
                        </div>
                        <div className="approach-card">
                            <span className="approach-card-number">04</span>
                            <h3 className="approach-card-title">We build for the future</h3>
                            <p>
                                Sustainability is part of every conversation. We prioritise improving what already exists, choosing durable materials, and designing details that age well. The goal is a home that costs less to run, wastes less, and feels better to live in — now and years from now.
                            </p>
                        </div>
                        <div className="approach-card">
                            <span className="approach-card-number">05</span>
                            <h3 className="approach-card-title">We deliver</h3>
                            <p>
                                We don&apos;t cut corners and we don&apos;t overpromise. We communicate clearly, keep the process organised, and produce design information that&apos;s buildable and ready for smooth delivery. From first ideas to final detail, we focus on making the journey feel confident, calm, and well-managed.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Work With Us Section */}
            <section className="why-section">
                <div className="container">
                    <div className="why-header">
                        <span className="why-label">WHY WORK WITH US</span>
                        <h2 className="why-title">What Sets Us Apart</h2>
                    </div>
                    <div className="why-grid">
                        <div className="why-card">
                            <div className="why-card-icon">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                            </div>
                            <h3>Clear guidance from start to finish</h3>
                            <p>
                                Every home — and every client — is different. We begin by understanding your goals, your property, and what &quot;better living&quot; looks like for you. From there, we give clear recommendations, define a sensible scope, and guide you through each decision so the process feels calm, structured, and manageable.
                            </p>
                        </div>
                        <div className="why-card">
                            <div className="why-card-icon">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
                            </div>
                            <h3>Practical, buildable design</h3>
                            <p>
                                We design with delivery in mind. That means layouts that work, details that make sense, and information that helps contractors price accurately and build with confidence. Our focus is on creating interiors that look beautiful on paper — and perform beautifully in real life.
                            </p>
                        </div>
                        <div className="why-card">
                            <div className="why-card-icon">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                            </div>
                            <h3>A calmer, more considered home</h3>
                            <p>
                                We design spaces that support modern living: better flow, improved storage, stronger natural light, and a cohesive material palette that brings everything together. The result is a home that feels lighter, more comfortable, and more connected to the way you live day to day.
                            </p>
                        </div>
                        <div className="why-card">
                            <div className="why-card-icon">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                            </div>
                            <h3>Sustainable thinking, naturally</h3>
                            <p>
                                Sustainability is woven into every conversation. We prioritise improving what already exists, choosing durable materials, and making responsible design decisions that reduce waste and help your home last longer. It&apos;s a quieter approach to sustainability — focused on comfort, longevity, and thoughtful choices.
                            </p>
                        </div>
                    </div>

                    {/* Professional Statement */}
                    <div className="professional-statement">
                        <span className="professional-label">PROFESSIONAL, STRUCTURED AND DELIVERY-FOCUSED</span>
                        <p>
                            We approach every project with the same commitment: clear thinking, careful detailing, and a smooth path from design to delivery. We produce well-coordinated information that supports accurate quotes and reduces uncertainty on site, while keeping the client experience organised and transparent.
                        </p>
                        <p className="professional-tagline">
                            This is a studio built on trust, consistency, and quietly exceptional outcomes.
                        </p>
                    </div>

                    {/* Quote */}
                    <div className="about-quote">
                        <div className="about-quote-mark">&ldquo;</div>
                        <blockquote>
                            We work side by side with our clients and trusted specialists to create calm, practical spaces — designed around real life and delivered with care.
                        </blockquote>
                    </div>
                </div>
            </section>
        </>
    );
}
