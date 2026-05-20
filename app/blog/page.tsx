'use client';

import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import CTAStrip from '../components/CTAStrip';
import NewsCard from '../components/NewsCard';
import './blog.css';

export default function BlogPage() {
    const articles = [
        {
            title: 'Sustainable Design: Building a Greener Future in Architecture',
            description: 'Explore eco-friendly materials and innovative practices that are shaping the future of sustainable architecture, reducing environmental impact significantly.',
            date: 'Dec 15, 2024',
            image: '/b1.webp'
        },
        {
            title: 'Maximizing Space: Tips for Multipurpose Architecture',
            description: 'Learn how to create versatile, adaptable spaces that meet various needs, optimizing functionality and flexibility in architectural design.',
            date: 'Nov 28, 2024',
            image: '/b2.webp'
        },
        {
            title: 'Enhancing Business through Thoughtful Design',
            description: 'Architectural design can improve customer experiences, boost productivity, and drive success in commercial environments.',
            date: 'Nov 10, 2024',
            image: '/b3.webp'
        },
        {
            title: 'Modern Minimalism in Residential Architecture',
            description: 'Discover how minimalist design principles create serene, functional living spaces that emphasize quality over quantity.',
            date: 'Oct 22, 2024',
            image: '/image1b.webp'
        },
        {
            title: 'The Future of Smart Buildings',
            description: 'Exploring how technology integration is revolutionizing building management, energy efficiency, and occupant comfort.',
            date: 'Oct 5, 2024',
            image: '/A0.webp'
        },
        {
            title: 'Preserving Heritage Through Modern Design',
            description: 'How contemporary architecture can honor historical context while meeting modern functional requirements.',
            date: 'Sep 18, 2024',
            image: '/hero6.png'
        }
    ];

    return (
        <>
            <Navigation />
            <CTAStrip />

            {/* ── HERO ── */}
            <section className="blog-hero">
                <div className="blog-hero-overlay" />
                <div className="blog-hero-content">
                    <motion.span
                        className="blog-hero-eyebrow"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        JOURNAL
                    </motion.span>
                    <motion.h1
                        className="blog-hero-heading"
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.85, delay: 0.13 }}
                    >
                        Architecture,<br /><em>Interiors &amp; Ideas</em>
                    </motion.h1>
                    <motion.p
                        className="blog-hero-sub"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.28 }}
                    >
                        Perspectives from Aureon Studio on design, craft and the spaces we inhabit.
                    </motion.p>
                </div>
                <div className="blog-hero-scroll"><div className="blog-hero-scroll-line" /></div>
            </section>

            {/* ── ARTICLES ── */}
            <section className="blog-articles">
                <div className="container">
                    <div className="blog-articles-header">
                        <span className="blog-articles-eyebrow">LATEST ARTICLES</span>
                        <div className="blog-articles-rule" />
                    </div>
                    <div className="blog-page-grid">
                        {articles.map((article) => (
                            <NewsCard
                                key={article.title}
                                title={article.title}
                                description={article.description}
                                date={article.date}
                                image={article.image}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
