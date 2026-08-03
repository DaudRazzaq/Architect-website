'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import CTAStrip from '../../components/CTAStrip';
import QuoteSection from '../../components/QuoteSection';
import '../services.css';

const heroImg = '/architecture.webp';
// Intrinsic ratio of the hero photo (3200x2107). Drives the mobile/tablet
// band height so the full frame shows with no dead space beneath it.
const heroAspect = 1.5187;

export default function ArchitecturePage() {
    return (
        <>
            <Navigation />
            <CTAStrip />

            {/* ── HERO ── */}
            <section
                className="srv-hero"
                style={{ '--srv-hero-ar': heroAspect } as React.CSSProperties}
            >
                <Image
                    src={heroImg}
                    alt="Architecture — Aureon Studio"
                    fill
                    priority
                    quality={90}
                    className="srv-hero-img"
                    sizes="100vw"
                />
                <div className="srv-hero-overlay" />
                <div className="srv-hero-content">
                    <motion.span
                        className="srv-hero-eyebrow"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >Architecture</motion.span>
                    <motion.h1
                        className="srv-hero-title"
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.85, delay: 0.15 }}
                    >Timeless Architecture<br />for Modern Living</motion.h1>
                    <motion.p
                        className="srv-hero-desc"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                    >Spaces shaped by vision and context.</motion.p>
                </div>
                <div className="srv-hero-scroll">
                    <span>Scroll</span>
                    <div className="srv-hero-scroll-line" />
                </div>
            </section>

            {/* ── OVERVIEW ── */}
            <section className="srv-list">
                <div className="srv-list-inner">
                    <div className="srv-list-header">
                        <span className="srv-list-tag">Architecture</span>
                    </div>
                    <div className="srv-items">
                        <div className="srv-item">
                            <span className="srv-item-num">01</span>
                            <h3 className="srv-item-title">Our Approach</h3>
                            <p className="srv-item-desc">Architecture is about more than creating buildings—it is about designing environments that enrich daily life. We approach every project with a balance of creativity, practicality, and contextual understanding to deliver spaces that feel both functional and enduring.</p>
                        </div>
                        <div className="srv-item">
                            <span className="srv-item-num">02</span>
                            <h3 className="srv-item-title">Design Philosophy</h3>
                            <p className="srv-item-desc">Our designs are guided by clarity, proportion, and purpose. We carefully consider site conditions, user needs, and long-term adaptability to create architecture that responds naturally to its surroundings.</p>
                        </div>
                        <div className="srv-item">
                            <span className="srv-item-num">03</span>
                            <h3 className="srv-item-title">What We Deliver</h3>
                            <p className="srv-item-desc">From bespoke homes and residential developments to commercial and hospitality projects, we provide a complete architectural service from concept through to completion.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CLIENT FEEDBACK ── */}
            <QuoteSection
                image={heroImg}
                label="Client Feedback"
                quote="Aureon Studio transformed our vision into a home that feels both contemporary and timeless. Every detail was considered with care and precision."
                attribution="Residential Client, Surrey"
            />

            {/* ── CTA ── */}
            <section className="srv-cta">
                <p className="srv-cta-label">Ready to Begin</p>
                <h2 className="srv-cta-title">Let&apos;s Design Your Space</h2>
                <Link href="/contact" className="srv-cta-link">Start a Conversation</Link>
            </section>

            <Footer />
        </>
    );
}
