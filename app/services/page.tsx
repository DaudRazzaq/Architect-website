'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import imgHero from '../assets/Project1/1.jpeg';
import imgArch from '../assets/Services/Commercial.jpeg';
import imgInt  from '../assets/Services/Residential.jpeg';
import imgLand from '../assets/Services/Multipurpuse Image.jpeg';
import imgPM   from '../assets/Services/Residential2.jpeg';
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
                    <span className="sov-hero-eyebrow">Aureon Studio</span>
                    <h1 className="sov-hero-title">Services</h1>
                    <p className="sov-hero-sub">All your project needs, housed together</p>
                </div>
                <nav className="sov-hero-panel">
                    <Link href="/contact" className="sov-hero-panel-item">Enquire Now</Link>
                    <Link href="/services" className="sov-hero-panel-item">Services</Link>
                    <Link href="/#projects" className="sov-hero-panel-item">View Latest Projects</Link>
                </nav>
            </section>

            {/* ── ARCHITECTURE  ·  text left / image right ── */}
            <div className="sov-row sov-reveal">
                <div className="sov-row-text">
                    <span className="sov-row-label">Architecture</span>
                    <h2 className="sov-row-tagline">Designing homes that transform<br />the way you live.</h2>
                    <p className="sov-row-body">We don&apos;t just design buildings — we design the way you live within them. Every project begins with understanding your lifestyle, your priorities, and the potential of your property. From reimagining layouts and shaping forms to guiding you through planning, technical detail, and delivery, we make the complex feel simple.</p>
                    <p className="sov-row-body">Each project is shaped around you — your life, your home, your future. The result is architecture that feels effortless, enduring, and entirely yours.</p>
                    <Link href="/services/commercial" className="sov-row-link">Learn More</Link>
                </div>
                <div className="sov-row-img-wrap">
                    <Image src={imgArch} alt="Architecture — Aureon Studio" fill sizes="(max-width:960px) 100vw, 55vw" className="sov-row-img" />
                </div>
            </div>

            <div className="sov-sep" />

            {/* ── INTERIOR DESIGN  ·  image left / text right ── */}
            <div className="sov-row sov-row--rev sov-reveal">
                <div className="sov-row-img-wrap">
                    <Image src={imgInt} alt="Interior Design — Aureon Studio" fill sizes="(max-width:960px) 100vw, 55vw" className="sov-row-img" />
                </div>
                <div className="sov-row-text">
                    <span className="sov-row-label">Interior Design</span>
                    <h2 className="sov-row-tagline">Calm, comfortable spaces that feel<br />as good as they look.</h2>
                    <p className="sov-row-body">Interior design is where everyday life happens. We create interiors that support the way you live — balancing function with atmosphere, and refining details that quietly elevate the entire home. From light and flow to materials, colour, and joinery, we design spaces that feel cohesive, practical, and timeless.</p>
                    <p className="sov-row-body">Selecting products and materials can feel overwhelming, so we offer as much or as little input as you need — from a single room to a whole house — ensuring every detail is considered.</p>
                    <Link href="/services/residential" className="sov-row-link">Learn More</Link>
                </div>
            </div>

            <div className="sov-sep" />

            {/* ── LANDSCAPE  ·  text left / image right ── */}
            <div className="sov-row sov-reveal">
                <div className="sov-row-text">
                    <span className="sov-row-label">Landscape</span>
                    <h2 className="sov-row-tagline">Outdoor spaces designed for<br />connection, comfort, and calm.</h2>
                    <p className="sov-row-body">Great homes extend beyond the walls. We design outdoor spaces that feel natural, usable, and thoughtfully composed. We consider sunlight, planting, materials, boundaries, and flow between inside and out — creating an environment that complements the architecture and enhances daily living.</p>
                    <p className="sov-row-body">Whether a compact courtyard or a multi-acre plot, every outdoor space is designed with the same care and precision as the interior — ensuring the full property feels resolved.</p>
                    <Link href="/services/multipurpose" className="sov-row-link">Learn More</Link>
                </div>
                <div className="sov-row-img-wrap">
                    <Image src={imgLand} alt="Landscape — Aureon Studio" fill sizes="(max-width:960px) 100vw, 55vw" className="sov-row-img" />
                </div>
            </div>

            <div className="sov-sep" />

            {/* ── PROJECT MANAGEMENT  ·  image left / text right ── */}
            <div className="sov-row sov-row--rev sov-reveal">
                <div className="sov-row-img-wrap">
                    <Image src={imgPM} alt="Project Management — Aureon Studio" fill sizes="(max-width:960px) 100vw, 55vw" className="sov-row-img" />
                </div>
                <div className="sov-row-text">
                    <span className="sov-row-label">Project Management</span>
                    <h2 className="sov-row-tagline">Clear coordination. Calm delivery.<br />Quality you can trust.</h2>
                    <p className="sov-row-body">A successful project needs more than great design — it needs structure, clarity, and consistent oversight. We coordinate timelines, help manage decisions, support contractor communication, and keep the project aligned with the agreed design, scope, and budget.</p>
                    <p className="sov-row-body">While we take care of the process, you can save time, avoid stress, and enjoy watching your home come to life — confident that every stage is managed with care and professionalism.</p>
                    <Link href="/contact" className="sov-row-link">Enquire About This Service</Link>
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
                            <a href="mailto:hello@aureonstudio.com">hello@aureonstudio.com</a>
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

