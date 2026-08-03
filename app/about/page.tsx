'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import OurApproach from '../components/OurApproach';
import WhyWorkWithUs from '../components/WhyWorkWithUs';
import StudioCredentials from '../components/StudioCredentials';
import GetInTouch from '../components/GetInTouch';
import CTAStrip from '../components/CTAStrip';
import './about-page.css';

/** The two founders. Portraits are cropped to a shared 4:5 so the cards line
 *  up exactly; source files are modest resolution (471px and 614px wide), so
 *  the cards are capped at 320px to keep them sharp on retina displays. */
const TEAM = [
    {
        name: 'Aiza Maryam',
        role: 'Co-Founder · Architect & Interior Designer',
        image: '/team/aiza-maryam.webp',
    },
    {
        name: 'Saad Sulaiman',
        role: 'Co-Founder · Architect & Interior Designer',
        image: '/team/saad-sulaiman.webp',
    },
] as const;

export default function AboutPage() {

    return (
        <>
            <Navigation />

            <CTAStrip />

            {/* ── HERO ── */}
            <section className="ab-hero">
                <div className="ab-hero-overlay" />
                <div className="ab-hero-content">
                    <motion.div
                        className="ab-hero-headline-row"
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.85, delay: 0.15 }}
                    >
                        <span className="ab-hero-flank-line" />
                        <h1 className="ab-hero-title">
                            We Craft Spaces That<br />Transform The Way You Live
                        </h1>
                        <span className="ab-hero-flank-line" />
                    </motion.div>
                </div>
            </section>

            {/* ── OUR STORY ── */}
            <section className="ab-story">
                <div className="ab-story-inner">
                    <div className="ab-rule-heading">
                        <span className="ab-rule-line" />
                        <span className="ab-rule-label">Our Story</span>
                        <span className="ab-rule-line" />
                    </div>
                    <p className="ab-story-p">
                        We&apos;re a London-based interior architecture studio built on clarity, care and complete delivery. Our team of architects, interior designers, and craftspeople work together to imagine, design and deliver quietly exceptional spaces that feel as good as they look.
                    </p>
                    <p className="ab-story-p">
                        We listen deeply to understand not just the potential of your property, but how you want to live within it. Every detail — from light and flow to materials and form — is thoughtfully considered to create spaces that are beautiful, functional, and built to last.
                    </p>
                    <p className="ab-story-p">
                        Guided by sustainable principles, we design with both people and the planet in mind. The result is a home that is calm, connected, and uniquely yours.
                    </p>
                    <Link href="/projects" className="ab-story-btn">View Our Projects</Link>
                </div>
            </section>

            {/* ── OUR TEAM ── */}
            <section className="ab-team" id="team">
                <div className="ab-team-inner">
                    <div className="ab-rule-heading">
                        <span className="ab-rule-line" />
                        <span className="ab-rule-label">Our Team</span>
                        <span className="ab-rule-line" />
                    </div>

                    <h2 className="ab-team-title">Two Designers. One Vision.</h2>

                    <p className="ab-team-lead">
                        Aureon Studio was founded by two designers who share a passion for creating
                        spaces that are thoughtful, timeless, and deeply connected to the people who
                        use them.
                    </p>
                    <p className="ab-team-p">
                        With backgrounds in architecture, interior design, and engineering, we bring
                        together technical precision and creative thinking to deliver spaces that are
                        both beautiful and practical. Every project is approached collaboratively —
                        from the first conversation to the final detail — ensuring each design
                        reflects our shared commitment to quality, innovation, and purpose.
                    </p>
                    <p className="ab-team-p">
                        We believe great design isn&apos;t simply about how a space looks. It&apos;s
                        about how it feels, how it functions, and how it enriches everyday life.
                    </p>

                    <div className="ab-team-grid">
                        {TEAM.map((member) => (
                            <figure className="ab-team-card" key={member.name}>
                                <div className="ab-team-photo">
                                    <Image
                                        src={member.image}
                                        alt={`${member.name} — ${member.role}, Aureon Studio`}
                                        fill
                                        sizes="(max-width: 720px) 86vw, 320px"
                                        quality={90}
                                        className="ab-team-img"
                                    />
                                </div>
                                <figcaption className="ab-team-caption">
                                    <span className="ab-team-name">{member.name}</span>
                                    <span className="ab-team-role">{member.role}</span>
                                </figcaption>
                            </figure>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── QUOTE BANNER ── */}
            <section className="ab-quote-banner">
                <div className="ab-quote-overlay" />
                <div className="ab-quote-content">
                    <span className="ab-quote-marks">&ldquo;</span>
                    <blockquote className="ab-quote-text">
                        Working with Aureon was a collaborative partnership from day one. We felt heard, valued, and the result exceeded every expectation.
                    </blockquote>
                    <cite className="ab-quote-cite">— Client, Oakridge House, Surrey</cite>
                </div>
            </section>

            <OurApproach />

            {/* ── QUOTE BANNER 2 ── */}
            <section className="ab-quote-banner ab-quote-banner--arbore">
                <div className="ab-quote-overlay" />
                <div className="ab-quote-content">
                    <span className="ab-quote-marks">&ldquo;</span>
                    <blockquote className="ab-quote-text">
                        The space feels completely alive — every corner was considered with such precision and warmth. It&apos;s exactly what we dreamed of.
                    </blockquote>
                    <cite className="ab-quote-cite">— Client, Arbore Sanctuary Café, London</cite>
                </div>
            </section>

            <WhyWorkWithUs />

            <StudioCredentials />

            <GetInTouch />

            <Footer />
        </>
    );
}
