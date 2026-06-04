'use client';

import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import CTAStrip from '../components/CTAStrip';
import NewsCard from '../components/NewsCard';
import { posts } from '@/data/posts';
import './blog.css';

export default function BlogPage() {
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
                        {posts.map((post) => (
                            <NewsCard
                                key={post.slug}
                                title={post.title}
                                description={post.description}
                                date={post.date}
                                image={post.image}
                                source={post.category}
                                url={`/blog/${post.slug}`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
