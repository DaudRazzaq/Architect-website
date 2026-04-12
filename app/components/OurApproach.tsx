'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import './OurApproach.css';
import ourApproachImage from '../assets/ourApprouch.png';

const blocks = [
    {
        title: 'We notice the things',
        body: 'From seemingly understated questions about how you live now or envisage living, to understanding the little niggles that add friction to daily life, we listen first and adapt second.',
    },
    {
        title: 'We make the seemingly impossible, possible',
        body: "We're creative thinkers and practical doers who thrive on a challenge. From clever project phasing to overcome planning constraints, to strategic tricks to add space or increase natural light and air flow, we craft solutions as unique as the clients we work with.",
    },
    {
        title: 'We build for life',
        body: 'Sustainability is woven into every conversation. We guide clients to make informed choices, delivering homes that last, feel more comfortable, cost less to run, and leave a smaller carbon footprint. From feasibility to delivery, we are looking to the future.',
    },
    {
        title: 'We deliver',
        body: "We don't cut corners. We don't overpromise. We deliver exceptional homes that are thoughtfully designed, buildable, and achievable within sensible timeframes, because you deserve to live better now.",
    },
];

export default function OurApproach() {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end end'],
    });

    // --- Image scale: contained right-side → full-bleed ---
    // CSS transform-origin is right-center so scaling expands leftward
    const imageScale = useTransform(
        scrollYProgress,
        [0, 0.25, 0.5, 0.75, 1],
        [1, 1.04, 1.25, 1.8, 2.1]
    );

    // --- Clip-path: architectural angled crop → full rectangle ---
    // Top-left x-indent relaxes from 12% to 0%
    const cpA = useTransform(scrollYProgress, [0, 0.4, 0.75], [12, 4, 0]);
    // Bottom-right y-cutoff opens from 92% to 100%
    const cpB = useTransform(scrollYProgress, [0, 0.4, 0.75], [92, 97, 100]);

    const clipPath = useTransform(
        [cpA, cpB],
        ([a, b]) => `polygon(${a}% 0%, 100% 0%, 100% ${b}%, 0% 100%)`
    );

    // --- Text fades gently during the takeover phase ---
    const textOpacity = useTransform(scrollYProgress, [0, 0.45, 0.65], [1, 1, 0]);
    const textY = useTransform(scrollYProgress, [0, 0.45, 0.65], [0, 0, -30]);

    // --- Cinematic overlay: deepens as image expands ---
    const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.02, 0.06, 0.22]);

    // --- Bottom gradient for seamless handoff into next section ---
    const gradientOpacity = useTransform(scrollYProgress, [0, 0.78, 0.95], [0, 0, 0.85]);

    return (
        <section ref={sectionRef} className="oa-section">
            <div className="oa-stage">
                {/* Editorial text — left side */}
                <motion.div
                    className="oa-content"
                    style={{ opacity: textOpacity, y: textY }}
                >
                    <div className="oa-content-inner">
                        <span className="oa-eyebrow">OUR APPROACH</span>
                        <div className="oa-blocks">
                            {blocks.map((item) => (
                                <article key={item.title} className="oa-block">
                                    <h3 className="oa-block-title">{item.title}</h3>
                                    <p className="oa-block-body">{item.body}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Cinematic image — scales from right-side to full viewport */}
                <motion.div
                    className="oa-visual"
                    style={{ scale: imageScale, clipPath }}
                >
                    <Image
                        src={ourApproachImage}
                        alt="Refined architectural interior showcasing our design philosophy"
                        fill
                        className="oa-img"
                        sizes="(max-width: 768px) 92vw, 100vw"
                    />
                    <motion.div
                        className="oa-darken"
                        style={{ opacity: overlayOpacity }}
                    />
                    <motion.div
                        className="oa-fade-bottom"
                        style={{ opacity: gradientOpacity }}
                    />
                </motion.div>
            </div>
        </section>
    );
}
