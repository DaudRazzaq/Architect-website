'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import CTAStrip from '../../components/CTAStrip';
import breakImg from '../../assets/Services/Residential2.jpeg';
import '../services.css';

const heroImg = '/interior.webp';
// Intrinsic ratio of the hero photo (3200x2133). Drives the mobile/tablet
// band height so the full frame shows with no dead space beneath it.
const heroAspect = 1.5002;

export default function ResidentialPage() {
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
                    alt="Residential architecture — Aureon Studio"
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
                    >Residential</motion.span>
                    <motion.h1
                        className="srv-hero-title"
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.85, delay: 0.15 }}
                    >Designing Homes That Reflect<br />the Way You Live</motion.h1>
                    <motion.p
                        className="srv-hero-desc"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                    >Our residential architecture focuses on creating thoughtful living environments shaped around everyday life.</motion.p>
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
                        <h2 className="srv-intro-statement">We approach each home as a personal sanctuary — carefully designed to reflect individual lifestyles while maintaining clarity, comfort, and balance.</h2>
                    </div>
                    <div className="srv-intro-right">
                        <p>Through a considered use of space, light, and material, we create interiors that feel calm, functional, and enduring. Whether designing new homes or reworking existing spaces, our process is guided by close collaboration, ensuring each project responds naturally to its context and the people who inhabit it.</p>
                    </div>
                </div>
            </section>

            {/* ── IMAGE BREAK ── */}
            <div className="srv-img-break">
                <Image
                    src={breakImg}
                    alt="Residential interior — Aureon Studio"
                    fill
                    className="srv-img-break-photo"
                    sizes="100vw"
                />
                <div className="srv-img-break-overlay" />
            </div>

            {/* ── SERVICES LIST ── */}
            <section className="srv-list">
                <div className="srv-list-inner">
                    <div className="srv-list-header">
                        <span className="srv-list-tag">Residential Services</span>
                    </div>
                    <div className="srv-items">
                        <div className="srv-item">
                            <span className="srv-item-num">01</span>
                            <h3 className="srv-item-title">Custom Homes</h3>
                            <p className="srv-item-desc">We design bespoke homes shaped around individual lifestyles and aspirations. Every element is carefully considered, resulting in spaces that feel personal, balanced, and thoughtfully resolved.</p>
                        </div>
                        <div className="srv-item">
                            <span className="srv-item-num">02</span>
                            <h3 className="srv-item-title">Home Renovations</h3>
                            <p className="srv-item-desc">Our renovation approach redefines existing spaces while respecting their original character. Through careful planning and material refinement, we enhance functionality and bring a renewed sense of clarity and cohesion.</p>
                        </div>
                        <div className="srv-item">
                            <span className="srv-item-num">03</span>
                            <h3 className="srv-item-title">Sustainable Living</h3>
                            <p className="srv-item-desc">We integrate sustainable principles into every stage of the design process. By combining responsible material choices with energy-efficient strategies, we create homes that are both environmentally conscious and comfortable to live in.</p>
                        </div>
                    </div>
                </div>
            </section>

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
