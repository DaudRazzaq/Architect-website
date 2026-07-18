'use client';

import { useRef, useCallback } from 'react';
import Image from 'next/image';
import {
    motion,
    useScroll,
    useMotionValue,
    useMotionValueEvent,
    animate,
} from 'framer-motion';
import './StudioCredentials.css';
import studioImage from '../assets/about.webp';

const EXPAND_THRESHOLD = 0.75;
const IMG_SPRING = { type: 'spring', stiffness: 60, damping: 18, mass: 1 } as const;
const TEXT_OUT = { duration: 0.35, ease: [0.4, 0, 0.2, 1] } as const;
const TEXT_IN = { duration: 0.45, ease: [0.0, 0, 0.2, 1] } as const;

export default function StudioCredentials() {
    const sectionRef = useRef<HTMLElement>(null);
    const isExpanded = useRef(false);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    const imageScale = useMotionValue(1);
    const imageX = useMotionValue(0);
    const imageRotateY = useMotionValue(28);
    const imageRotateZ = useMotionValue(0);
    const imageY = useMotionValue(0);
    const textOpacityVal = useMotionValue(1);
    const textYVal = useMotionValue(0);
    const overlayOpacity = useMotionValue(0);
    const gradientOpacity = useMotionValue(0);

    const clipPath = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';

    const expand = useCallback(() => {
        if (isExpanded.current) return;
        isExpanded.current = true;
        animate(imageScale, 2.34, IMG_SPRING);
        animate(imageX, 0, IMG_SPRING);
        animate(imageRotateY, 0, IMG_SPRING);
        animate(imageRotateZ, 0, IMG_SPRING);
        animate(imageY, 0, IMG_SPRING);
        animate(textOpacityVal, 0, TEXT_OUT);
        animate(textYVal, -30, TEXT_OUT);
        animate(overlayOpacity, 0, IMG_SPRING);
        animate(gradientOpacity, 0, IMG_SPRING);
    }, [imageScale, imageX, imageRotateY, imageRotateZ, imageY, textOpacityVal, textYVal, overlayOpacity, gradientOpacity]);

    const collapse = useCallback(() => {
        if (!isExpanded.current) return;
        isExpanded.current = false;
        animate(imageScale, 1, IMG_SPRING);
        animate(imageX, 0, IMG_SPRING);
        animate(imageRotateY, 28, IMG_SPRING);
        animate(imageRotateZ, 0, IMG_SPRING);
        animate(imageY, 0, IMG_SPRING);
        animate(textOpacityVal, 1, TEXT_IN);
        animate(textYVal, 0, TEXT_IN);
        animate(overlayOpacity, 0, IMG_SPRING);
        animate(gradientOpacity, 0, IMG_SPRING);
    }, [imageScale, imageX, imageRotateY, imageRotateZ, imageY, textOpacityVal, textYVal, overlayOpacity, gradientOpacity]);

    useMotionValueEvent(scrollYProgress, 'change', (latest) => {
        if (latest >= EXPAND_THRESHOLD) expand();
        else collapse();
    });

    return (
        <section ref={sectionRef} className="sc-section">
            <div className="sc-stage">

                {/* ── IMAGE LEFT ── */}
                <div className="sc-visual-shell">
                    <motion.div
                        className="sc-visual-card"
                        style={{
                            scale: imageScale,
                            x: imageX,
                            y: imageY,
                            rotateY: imageRotateY,
                            rotateZ: imageRotateZ,
                        }}
                    >
                        <motion.div className="sc-visual-media" style={{ clipPath }}>
                            <div className="sc-media-layer">
                                <Image
                                    src={studioImage}
                                    alt="Aureon Studio team reviewing architectural drawings and material samples"
                                    fill
                                    className="sc-img"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority={false}
                                />
                            </div>
                            <motion.div className="sc-darken" style={{ opacity: overlayOpacity }} />
                            <motion.div className="sc-fade-bottom" style={{ opacity: gradientOpacity }} />
                        </motion.div>
                    </motion.div>
                </div>

                {/* ── CONTENT RIGHT ── */}
                <motion.div
                    className="sc-content"
                    style={{ opacity: textOpacityVal, y: textYVal }}
                >
                    <div className="sc-text-panel">
                        <div className="sc-header">
                            <span className="sc-eyebrow">Our Commitment</span>
                            <div className="sc-header-line" />
                        </div>

                        <h2 className="sc-title">A Practice Held to the Highest Professional Standard</h2>

                        <div className="sc-blocks">
                            <p className="sc-body">
                                Homes with extraordinary potential deserve expert care. At Aureon, every project is held to the most rigorous professional standards — from initial concept through to completion — with meticulous attention to detail, thoughtful client support, and transparent pricing from the very first conversation.
                            </p>
                            <p className="sc-body">
                                Our design approach prioritises efficiency, comfort, and long-term sustainability, ensuring each space is tailored precisely to how our clients live. We believe beautiful architecture and responsible building are not in conflict — they are inseparable.
                            </p>
                            <p className="sc-body sc-body--closing">
                                These principles reflect our commitment to quality, accountability, and delivering exceptional homes built to stand the test of time.
                            </p>
                        </div>

                        <div className="sc-credential-strip">
                            <div className="sc-credential-item">
                                <span className="sc-credential-mark" aria-hidden="true">✦</span>
                                <div className="sc-credential-text">
                                    <p className="sc-credential-name">Studio Excellence</p>
                                    <p className="sc-credential-desc">Held to the highest professional benchmarks across every discipline</p>
                                </div>
                            </div>
                            <div className="sc-credential-item">
                                <span className="sc-credential-mark" aria-hidden="true">✦</span>
                                <div className="sc-credential-text">
                                    <p className="sc-credential-name">Sustainably Designed</p>
                                    <p className="sc-credential-desc">Long-term performance and comfort built into every project from the outset</p>
                                </div>
                            </div>
                        </div>

                        <a href="/services" className="sc-cta">
                            View Our Services
                        </a>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
