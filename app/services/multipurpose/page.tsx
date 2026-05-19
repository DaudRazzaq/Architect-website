'use client';

import Image from 'next/image';
import Link from 'next/link';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import heroImg from '../../assets/Services/Multipurpuse Image.jpeg';
import '../services.css';

export default function MultipurposePage() {
    return (
        <>
            <Navigation />

            {/* ── HERO ── */}
            <section className="srv-hero">
                <Image
                    src={heroImg}
                    alt="Multipurpose architecture — Aureon Studio"
                    fill
                    priority
                    className="srv-hero-img"
                    sizes="100vw"
                />
                <div className="srv-hero-overlay" />
                <div className="srv-hero-content">
                    <span className="srv-hero-eyebrow">Multipurpose</span>
                    <h1 className="srv-hero-title">Versatile Spaces<br />for Diverse Needs</h1>
                    <p className="srv-hero-desc">Our approach to multipurpose design focuses on creating adaptable environments that respond to changing uses over time.</p>
                </div>
                <div className="srv-hero-scroll">
                    <span>Scroll</span>
                    <div className="srv-hero-scroll-line" />
                </div>
            </section>

            {/* ── INTRO ── */}
            <section className="srv-intro">
                <div className="srv-intro-inner">
                    <div className="srv-intro-left">
                        <span className="srv-intro-label">Our Approach</span>
                        <h2 className="srv-intro-statement">Each space is carefully planned to support flexibility while maintaining clarity and coherence in its overall form.</h2>
                    </div>
                    <div className="srv-intro-right">
                        <p>We design community, educational, and shared environments with a strong emphasis on usability and flow. Through considered planning and simple, robust material strategies, these spaces can accommodate a range of activities and user groups without compromise.</p>
                        <p>By balancing flexibility with long-term durability, we deliver spaces that remain efficient, relevant, and responsive to evolving needs.</p>
                    </div>
                </div>
            </section>

            {/* ── SERVICES LIST ── */}
            <section className="srv-list">
                <div className="srv-list-inner">
                    <div className="srv-list-header">
                        <span className="srv-list-tag">Multipurpose Services</span>
                    </div>
                    <div className="srv-items">
                        <div className="srv-item">
                            <span className="srv-item-num">01</span>
                            <h3 className="srv-item-title">Community Centers</h3>
                            <p className="srv-item-desc">Our community centers are designed as welcoming and inclusive environments that bring people together. Flexible layouts support a range of activities — from social gatherings to workshops — creating spaces that encourage connection, interaction, and a strong sense of belonging.</p>
                        </div>
                        <div className="srv-item">
                            <span className="srv-item-num">02</span>
                            <h3 className="srv-item-title">Educational Facilities</h3>
                            <p className="srv-item-desc">We create educational spaces that adapt to evolving learning methods. Through flexible planning and carefully considered layouts, our designs support both collaborative and independent learning, providing environments that are practical, engaging, and future-ready.</p>
                        </div>
                        <div className="srv-item">
                            <span className="srv-item-num">03</span>
                            <h3 className="srv-item-title">Event Spaces</h3>
                            <p className="srv-item-desc">Our event spaces are conceived to accommodate a wide range of functions with ease. From formal gatherings to informal events, we focus on adaptable spatial planning, seamless circulation, and refined material choices to ensure both functionality and a high-quality user experience.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="srv-cta">
                <p className="srv-cta-label">Ready to Begin</p>
                <h2 className="srv-cta-title">Let&apos;s Design Your Space</h2>
                <Link href="/contact" className="srv-cta-link">Start a Conversation &rarr;</Link>
            </section>

            <Footer />
        </>
    );
}
