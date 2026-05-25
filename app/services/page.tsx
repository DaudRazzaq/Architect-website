'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '../components/Navigation';
import CTAStrip from '../components/CTAStrip';
import Footer from '../components/Footer';
import imgHero       from '../assets/Project1/1.jpeg';
import imgCommercial from '../assets/Services/Commercial.jpeg';
import imgMulti      from '../assets/Services/Multipurpuse Image.jpeg';
import imgResidential from '../assets/Services/Residential.jpeg';
import './services-overview.css';

export default function ServicesPage() {
    const wrapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const els = wrapRef.current?.querySelectorAll('.sov-reveal') ?? [];
        const io = new IntersectionObserver(
            (entries) => entries.forEach((e) => {
                if (e.isIntersecting) {
                    e.target.classList.add('is-revealed');
                    io.unobserve(e.target);
                }
            }),
            { threshold: 0.1 }
        );
        els.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, []);

    return (
        <div ref={wrapRef}>
            <Navigation />
            <CTAStrip />

            {/* ── HERO ── */}
            <section className="sov-hero">
                <Image
                    src={imgHero}
                    alt="Aureon Studio — Services"
                    fill
                    priority
                    sizes="100vw"
                    className="sov-hero-img"
                />
                <div className="sov-hero-overlay" />
                <div className="sov-hero-center">
                    <motion.span
                        className="sov-hero-eyebrow"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >Aureon Studio</motion.span>
                    <motion.h1
                        className="sov-hero-title"
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.85, delay: 0.15 }}
                    >Services</motion.h1>
                    <motion.p
                        className="sov-hero-sub"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                    >All your project needs, housed together</motion.p>
                </div>
            </section>

            {/* ── COMMERCIAL  ·  text left / image right ── */}
            <div className="sov-row sov-reveal">
                <div className="sov-row-text">
                    <span className="sov-row-label">Commercial</span>
                    <h2 className="sov-row-tagline">Innovative Spaces for<br />Business Success</h2>
                    <p className="sov-row-body">Our commercial design approach is centred on creating environments that are both functional and experience-driven. Each space is carefully considered to support the way businesses operate while offering a clear and memorable identity.</p>
                    <p className="sov-row-body">We respond to the specific needs of commercial settings by shaping layouts that enhance productivity, encourage interaction, and improve overall user experience. From retail and workplace environments to hospitality and mixed-use spaces, our designs balance clarity, efficiency, and atmosphere.</p>
                    <p className="sov-row-body">By combining thoughtful planning with a refined material and lighting strategy, we deliver spaces that not only perform effectively but also strengthen brand presence and long-term value.</p>
                    <Link href="/services/commercial" className="sov-row-link">Explore Commercial Services</Link>
                </div>
                <div className="sov-row-img-wrap">
                    <Image src={imgCommercial} alt="Commercial — Aureon Studio" fill sizes="(max-width:960px) 100vw, 55vw" className="sov-row-img" />
                </div>
            </div>

            <div className="sov-sep" />

            {/* ── MULTIPURPOSE  ·  image left / text right ── */}
            <div className="sov-row sov-row--rev sov-reveal">
                <div className="sov-row-img-wrap">
                    <Image src={imgMulti} alt="Multipurpose — Aureon Studio" fill sizes="(max-width:960px) 100vw, 55vw" className="sov-row-img" />
                </div>
                <div className="sov-row-text">
                    <span className="sov-row-label">Multipurpose</span>
                    <h2 className="sov-row-tagline">Versatile Spaces for<br />Diverse Needs</h2>
                    <p className="sov-row-body">Our approach to multipurpose design focuses on creating adaptable environments that respond to changing uses over time. Each space is carefully planned to support flexibility while maintaining clarity and coherence in its overall form.</p>
                    <p className="sov-row-body">We design community, educational, and shared environments with a strong emphasis on usability and flow. Through considered planning and simple, robust material strategies, these spaces can accommodate a range of activities and user groups without compromise.</p>
                    <p className="sov-row-body">By balancing flexibility with long-term durability, we deliver spaces that remain efficient, relevant, and responsive to evolving needs.</p>
                    <Link href="/services/multipurpose" className="sov-row-link">Explore Multipurpose Services</Link>
                </div>
            </div>

            <div className="sov-sep" />

            {/* ── RESIDENTIAL  ·  text left / image right ── */}
            <div className="sov-row sov-reveal">
                <div className="sov-row-text">
                    <span className="sov-row-label">Residential</span>
                    <h2 className="sov-row-tagline">Designing Homes That Reflect<br />the Way You Live</h2>
                    <p className="sov-row-body">Our residential architecture focuses on creating thoughtful living environments shaped around everyday life.</p>
                    <p className="sov-row-body">We approach each home as a personal sanctuary — carefully designed to reflect individual lifestyles while maintaining clarity, comfort, and balance. Through a considered use of space, light, and material, we create interiors that feel calm, functional, and enduring.</p>
                    <p className="sov-row-body">Whether designing new homes or reworking existing spaces, our process is guided by close collaboration, ensuring each project responds naturally to its context and the people who inhabit it.</p>
                    <Link href="/services/residential" className="sov-row-link">Explore Residential Services</Link>
                </div>
                <div className="sov-row-img-wrap">
                    <Image src={imgResidential} alt="Residential — Aureon Studio" fill sizes="(max-width:960px) 100vw, 55vw" className="sov-row-img" />
                </div>
            </div>

            {/* ── OUR PROCESS ── */}
            <section className="sov-process sov-reveal">
                <div className="sov-flag">
                    <span className="sov-flag-line" />
                    <span className="sov-flag-text">Our Process</span>
                    <span className="sov-flag-line" />
                </div>
                <div className="sov-process-body">
                    <p>Our services are structured around a clear stage-by-stage approach, providing a defined path from initial concept through to completed delivery. With fixed fees and transparent milestones, you have complete confidence in both process and cost.</p>
                    <p>Each stage is confirmed in writing, keeping the journey flexible, well-defined, and fully guided by your needs and vision.</p>
                    <p>Begin by getting in touch. If we&apos;re a good fit for your project, we&apos;ll arrange an initial consultation to gather the information we need and outline the next steps together.</p>
                </div>
            </section>

            {/* ── TAGLINE BAND ── */}
            <section className="sov-band sov-reveal">
                <div className="sov-flag">
                    <span className="sov-flag-line" />
                    <span className="sov-flag-text">Your Home, The Way You Live</span>
                    <span className="sov-flag-line" />
                </div>
                <p className="sov-band-text">You can see your home&apos;s potential — a space that truly reflects you and the way you live. For those with vision but no time to chase it, we guide every step, turning your ideas into a home that is effortless and entirely yours.</p>
            </section>

            {/* ── GET IN TOUCH ── */}
            <section className="sov-contact sov-reveal">
                <div className="sov-contact-left">
                    <h3 className="sov-contact-heading">Get in Touch</h3>
                    <p className="sov-contact-text">What if your home could be more? A space that works better for your life, your lifestyle, and your future? With the right team guiding you, we help uncover its full potential and bring it to life, every step of the way.</p>
                    <div className="sov-contact-meta">
                        <div className="sov-contact-meta-item">
                            <span className="sov-contact-meta-label">Location</span>
                            <span>London, United Kingdom</span>
                        </div>
                        <div className="sov-contact-meta-item">
                            <span className="sov-contact-meta-label">Email</span>
                            <a href="mailto:contact@aureonstudio.com">contact@aureonstudio.com</a>
                        </div>
                    </div>
                </div>
                <div className="sov-contact-right">
                    <Link href="/contact" className="sov-contact-btn">Enquire Now</Link>
                </div>
            </section>

            <Footer />
        </div>
    );
}

