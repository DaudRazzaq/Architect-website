'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import CTAStrip from '../../components/CTAStrip';
import QuoteSection from '../../components/QuoteSection';
import '../services.css';

const heroImg = '/interior.webp';

export default function InteriorPage() {
    return (
        <>
            <Navigation />
            <CTAStrip />

            {/* ── HERO ── */}
            <section className="srv-hero">
                <Image
                    src={heroImg}
                    alt="Interior Design — Aureon Studio"
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
                    >Interior Design</motion.span>
                    <motion.h1
                        className="srv-hero-title"
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.85, delay: 0.15 }}
                    >Designing Atmospheres,<br />Not Just Rooms</motion.h1>
                    <motion.p
                        className="srv-hero-desc"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                    >Crafted for comfort, designed for life.</motion.p>
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
                        <span className="srv-list-tag">Interior Design</span>
                    </div>
                    <div className="srv-items">
                        <div className="srv-item">
                            <span className="srv-item-num">01</span>
                            <h3 className="srv-item-title">Our Approach</h3>
                            <p className="srv-item-desc">We believe great interiors should feel effortless, personal, and timeless. Every space is carefully designed to reflect the lifestyle, aspirations, and character of its users.</p>
                        </div>
                        <div className="srv-item">
                            <span className="srv-item-num">02</span>
                            <h3 className="srv-item-title">Design Philosophy</h3>
                            <p className="srv-item-desc">Through thoughtful space planning, material selection, and bespoke detailing, we create interiors that balance aesthetics with functionality. Our designs focus on warmth, comfort, and long-term usability.</p>
                        </div>
                        <div className="srv-item">
                            <span className="srv-item-num">03</span>
                            <h3 className="srv-item-title">What We Deliver</h3>
                            <p className="srv-item-desc">Whether designing a private residence, wellness space, hospitality venue, or commercial interior, we create environments that are both visually refined and deeply practical.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CLIENT FEEDBACK ── */}
            <QuoteSection
                image={heroImg}
                label="Client Feedback"
                quote="The interior feels exactly how we imagined—warm, sophisticated, and perfectly suited to our lifestyle. The entire process was seamless."
                attribution="Private Residential Client"
            />

            {/* ── CTA ── */}
            <section className="srv-cta">
                <p className="srv-cta-label">Ready to Begin</p>
                <h2 className="srv-cta-title">Let&apos;s Design Your Home</h2>
                <Link href="/contact" className="srv-cta-link">Start a Conversation</Link>
            </section>

            <Footer />
        </>
    );
}
