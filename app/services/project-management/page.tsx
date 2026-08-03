'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import CTAStrip from '../../components/CTAStrip';
import QuoteSection from '../../components/QuoteSection';
import '../services.css';

const heroImg = '/project-management.webp';
// Intrinsic ratio of the hero photo (3200x2133). Drives the mobile/tablet
// band height so the full frame shows with no dead space beneath it.
const heroAspect = 1.5002;

export default function ProjectManagementPage() {
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
                    alt="Project Management — Aureon Studio"
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
                    >Project Management</motion.span>
                    <motion.h1
                        className="srv-hero-title"
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.85, delay: 0.15 }}
                    >From Vision<br />to Completion</motion.h1>
                    <motion.p
                        className="srv-hero-desc"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                    >Managing every detail with precision.</motion.p>
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
                        <span className="srv-list-tag">Project Management</span>
                    </div>
                    <div className="srv-items">
                        <div className="srv-item">
                            <span className="srv-item-num">01</span>
                            <h3 className="srv-item-title">Our Approach</h3>
                            <p className="srv-item-desc">Successful projects rely on clear coordination, communication, and oversight. Our project management service ensures that every stage is delivered efficiently while protecting the integrity of the design vision.</p>
                        </div>
                        <div className="srv-item">
                            <span className="srv-item-num">02</span>
                            <h3 className="srv-item-title">Design Philosophy</h3>
                            <p className="srv-item-desc">We believe the best outcomes come from collaboration and careful planning. By coordinating consultants, contractors, and stakeholders, we create a seamless process from inception to handover.</p>
                        </div>
                        <div className="srv-item">
                            <span className="srv-item-num">03</span>
                            <h3 className="srv-item-title">What We Deliver</h3>
                            <p className="srv-item-desc">Our services include programme management, budget monitoring, consultant coordination, contract administration, construction oversight, and quality assurance.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CLIENT FEEDBACK ── */}
            <QuoteSection
                image={heroImg}
                label="Client Feedback"
                quote="Aureon Studio managed every aspect of the project with professionalism and clarity. We always felt informed, supported, and confident in the process."
                attribution="Commercial Development Client"
            />

            {/* ── CTA ── */}
            <section className="srv-cta">
                <p className="srv-cta-label">Ready to Begin</p>
                <h2 className="srv-cta-title">Let&apos;s Manage Your Project</h2>
                <Link href="/contact" className="srv-cta-link">Start a Conversation</Link>
            </section>

            <Footer />
        </>
    );
}
