import Image from 'next/image';
import Link from 'next/link';
import Navigation from '../components/Navigation';
import CTAStrip from '../components/CTAStrip';
import ProjectsGrid, { type PortfolioItem } from './ProjectsGrid';
import { getAllProjects } from '@/lib/projects';
import './projects-page.css';

// ISR — the page is built once, cached at the edge, and silently
// regenerated in the background at most once every 24h. Visitors always get
// an instant cached response; the (static) project data never needs a
// per-request lookup.
export const revalidate = 86400;

// Additional in-progress / concept pieces without a dedicated case-study
// page yet — shown for portfolio breadth but not linked.
const COMING_SOON: PortfolioItem[] = [
    {
        title: 'Harborview Office',
        location: 'London, UK',
        category: 'Commercial',
        image: '/b1.webp',
        href: null,
    },
    {
        title: 'Axis Pavillion',
        location: 'Edinburgh, Scotland',
        category: 'Multipurpose',
        image: '/b2.webp',
        href: null,
    },
    {
        title: 'Green City Residence',
        location: 'Manchester, UK',
        category: 'Residential',
        image: '/b3.webp',
        href: null,
    },
];

export default async function ProjectsPage() {
    const projects = await getAllProjects();

    const portfolio: PortfolioItem[] = [
        ...projects.map((p) => ({
            title: p.title,
            location: p.location,
            category: p.category,
            image: p.heroImage,
            href: `/projects/${p.slug}`,
        })),
        ...COMING_SOON,
    ];

    return (
        <>
            <Navigation />
            <CTAStrip />
            {/* ── HERO ── */}
            <section className="pw-hero">
                <div className="pw-hero-bg">
                    <Image
                        src="/projects/oakridge-house/3.jpeg"
                        alt="Oakridge House — Aureon Studio"
                        fill
                        priority
                        sizes="100vw"
                        quality={90}
                    />
                </div>
                <div className="pw-hero-overlay" />

                <div className="pw-hero-center">
                    <div className="pw-hero-rule">
                        <span className="pw-hero-rule-line" />
                        <h1 className="pw-hero-title">Our Work</h1>
                        <span className="pw-hero-rule-line" />
                    </div>
                    <p className="pw-hero-headline">Selected Projects</p>
                    <p className="pw-hero-sub">
                        A curated portfolio of homes, workspaces, and environments
                        designed with clarity, purpose, and material honesty.
                    </p>
                </div>
            </section>

            {/* ── INTRO BAND ── */}
            <div className="pw-intro">
                <div className="pw-intro-rule">
                    <span className="pw-intro-rule-line" />
                    <span className="pw-intro-headline">Every Space Has Potential</span>
                    <span className="pw-intro-rule-line" />
                </div>
                <p className="pw-intro-body">
                    We believe architecture at its best is invisible — it simply makes life feel
                    easier, more comfortable, and more beautiful. Each project in our portfolio
                    begins with a conversation about how a space could work harder and feel richer.
                </p>
                <p className="pw-intro-body">
                    From private residences to commercial interiors and multipurpose environments,
                    explore the breadth of our work and see what becomes possible when design,
                    craft, and intention come together.
                </p>
            </div>

            {/* ── GRID (interactive filter, client component) ── */}
            <ProjectsGrid projects={portfolio} />

            {/* ── CTA ── */}
            <section className="pw-cta">
                <span className="pw-cta-eyebrow">Start a Conversation</span>
                <h2 className="pw-cta-title">
                    Can you see the potential<br />in your home?
                </h2>
                <p className="pw-cta-body">
                    We&apos;d love to hear about your project. Whether you have a clear brief
                    or just an idea, reach out and let&apos;s explore what&apos;s possible together.
                </p>
                <Link href="/contact" className="pw-cta-btn">
                    Get in Touch
                </Link>
            </section>
        </>
    );
}
