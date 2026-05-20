import Link from 'next/link';
import './About.css';

export default function About() {
    return (
        <section id="about" className="about" aria-label="About Aureon Studio">
            <div className="about-inner">
                <div className="about-headline-row">
                    <h2 className="about-headline">
                        Is Your Home Living Up to Its Full Potential?
                    </h2>
                </div>

                <p className="about-body">
                    Your home should be more than a backdrop to daily life — it should reflect who you are, support how you live, and grow in value over time. Yet for many London homeowners, the gap between a property&apos;s potential and its reality remains frustratingly out of reach.
                </p>

                <p className="about-body">
                    Aureon Studio is a London-based interior architecture and refurbishment design practice. We partner with homeowners across London and the South East to plan, design, and deliver beautiful, functional spaces — managing every stage from initial concept and planning through to final handover with clarity, care, and complete creative oversight.
                </p>

                <p className="about-coda">
                    Because well-designed spaces don&apos;t just look better — they live better.
                </p>

                <Link href="/projects" className="about-link">
                    VIEW OUR PROJECTS
                </Link>
            </div>
        </section>
    );
}
