'use client';

import Image from 'next/image';
import Link from 'next/link';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import heroImg from '../../assets/Services/Commercial.jpeg';
import '../services.css';

export default function CommercialPage() {
    return (
        <>
            <Navigation />

            {/* ── HERO ── */}
            <section className="srv-hero">
                <Image
                    src={heroImg}
                    alt="Commercial architecture — Aureon Studio"
                    fill
                    priority
                    className="srv-hero-img"
                    sizes="100vw"
                />
                <div className="srv-hero-overlay" />
                <div className="srv-hero-content">
                    <span className="srv-hero-eyebrow">Commercial</span>
                    <h1 className="srv-hero-title">Innovative Spaces<br />for Business Success</h1>
                    <p className="srv-hero-desc">Our commercial design approach is centred on creating environments that are both functional and experience-driven.</p>
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
                        <h2 className="srv-intro-statement">Each space is carefully considered to support the way businesses operate while offering a clear and memorable identity.</h2>
                    </div>
                    <div className="srv-intro-right">
                        <p>We respond to the specific needs of commercial settings by shaping layouts that enhance productivity, encourage interaction, and improve overall user experience. From retail and workplace environments to hospitality and mixed-use spaces, our designs balance clarity, efficiency, and atmosphere.</p>
                        <p>By combining thoughtful planning with a refined material and lighting strategy, we deliver spaces that not only perform effectively but also strengthen brand presence and long-term value.</p>
                    </div>
                </div>
            </section>

            {/* ── SERVICES LIST ── */}
            <section className="srv-list">
                <div className="srv-list-inner">
                    <div className="srv-list-header">
                        <span className="srv-list-tag">Commercial Services</span>
                    </div>
                    <div className="srv-items">
                        <div className="srv-item">
                            <span className="srv-item-num">01</span>
                            <h3 className="srv-item-title">Retail Spaces</h3>
                            <p className="srv-item-desc">We design retail environments that are clear, engaging, and easy to navigate. Spatial flow, visibility, and material expression are carefully considered to support customer movement and interaction, creating an experience that feels intuitive while reinforcing brand identity.</p>
                        </div>
                        <div className="srv-item">
                            <span className="srv-item-num">02</span>
                            <h3 className="srv-item-title">Office Environments</h3>
                            <p className="srv-item-desc">Our workplace designs focus on clarity, flexibility, and comfort. By integrating natural light, efficient planning, and adaptable work zones, we create environments that support productivity, collaboration, and overall wellbeing.</p>
                        </div>
                        <div className="srv-item">
                            <span className="srv-item-num">03</span>
                            <h3 className="srv-item-title">Hospitality Spaces</h3>
                            <p className="srv-item-desc">We create hospitality interiors that feel welcoming and composed. Through a balance of atmosphere, layout, and material warmth, our designs enhance the guest experience while ensuring functionality and operational efficiency.</p>
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
