'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import CTAStrip from '../../components/CTAStrip';
import QuoteSection from '../../components/QuoteSection';
import '../services.css';

const heroImg = '/landscape.webp';
// Intrinsic ratio of the hero photo (3200x2391). Drives the mobile/tablet
// band height so the full frame shows with no dead space beneath it.
const heroAspect = 1.3384;

export default function LandscapePage() {
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
                    alt="Landscape Design — Aureon Studio"
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
                    >Landscape Design</motion.span>
                    <motion.h1
                        className="srv-hero-title"
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.85, delay: 0.15 }}
                    >Seamless Connections<br />Between Home and Garden</motion.h1>
                    <motion.p
                        className="srv-hero-desc"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                    >Bringing nature closer to everyday life.</motion.p>
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
                        <span className="srv-list-tag">Landscape</span>
                    </div>
                    <div className="srv-items">
                        <div className="srv-item">
                            <span className="srv-item-num">01</span>
                            <h3 className="srv-item-title">Our Approach</h3>
                            <p className="srv-item-desc">Landscape design is an extension of architecture. We create outdoor environments that strengthen the relationship between people, nature, and the built environment.</p>
                        </div>
                        <div className="srv-item">
                            <span className="srv-item-num">02</span>
                            <h3 className="srv-item-title">Design Philosophy</h3>
                            <p className="srv-item-desc">Our landscapes combine structure, planting, and materiality to create spaces that feel natural, balanced, and sustainable. Every design is developed with consideration for seasonal change, maintenance, and long-term growth.</p>
                        </div>
                        <div className="srv-item">
                            <span className="srv-item-num">03</span>
                            <h3 className="srv-item-title">What We Deliver</h3>
                            <p className="srv-item-desc">From private gardens and courtyards to larger commercial landscapes, we design outdoor spaces that encourage wellbeing, interaction, and a strong connection to nature.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CLIENT FEEDBACK ── */}
            <QuoteSection
                image={heroImg}
                label="Client Feedback"
                quote="The garden has become our favourite part of the home. It feels calm, natural, and beautifully integrated with the architecture."
                attribution="Landscape Design Client"
            />

            {/* ── CTA ── */}
            <section className="srv-cta">
                <p className="srv-cta-label">Ready to Begin</p>
                <h2 className="srv-cta-title">Let&apos;s Design Your Garden</h2>
                <Link href="/contact" className="srv-cta-link">Start a Conversation</Link>
            </section>

            <Footer />
        </>
    );
}
