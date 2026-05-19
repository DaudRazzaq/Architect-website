'use client';

import { useRef, useCallback } from 'react';
import Image from 'next/image';
import {
  motion,
  useScroll,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  animate,
} from 'framer-motion';
import './OurApproach.css';
import whyImage from '../assets/hero2.png';

const blocks = [
  {
    title: 'Clear guidance from start to finish',
    body: 'Every home — and every client — is different. We begin by understanding your goals, your property, and what "better living" looks like for you. From there, we give clear recommendations, define a sensible scope, and guide you through each decision so the process feels calm, structured, and manageable.',
  },
  {
    title: 'Practical, buildable design',
    body: 'We design with delivery in mind. That means layouts that work, details that make sense, and information that helps contractors price accurately and build with confidence. Our focus is on creating interiors that look beautiful on paper — and perform beautifully in real life.',
  },
  {
    title: 'A calmer, more considered home',
    body: 'We design spaces that support modern living: better flow, improved storage, stronger natural light, and a cohesive material palette that brings everything together. The result is a home that feels lighter, more comfortable, and more connected to the way you live day to day.',
  },
  {
    title: 'Sustainable thinking, naturally',
    body: "Sustainability is woven into every conversation. We prioritise improving what already exists, choosing durable materials, and making responsible design decisions that reduce waste and help your home last longer. It's a quieter approach to sustainability — focused on comfort, longevity, and thoughtful choices.",
  },
];

const EXPAND_THRESHOLD = 0.75;
const IMG_SPRING = { type: 'spring', stiffness: 60, damping: 18, mass: 1 } as const;
const TEXT_OUT = { duration: 0.35, ease: [0.4, 0, 0.2, 1] } as const;
const TEXT_IN = { duration: 0.45, ease: [0.0, 0, 0.2, 1] } as const;

export default function WhyWorkWithUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const isExpanded = useRef(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imageScale = useMotionValue(1);
  const cpAVal = useMotionValue(3);
  const cpBVal = useMotionValue(98.5);
  const imageX = useMotionValue(0);
  const imageRotateY = useMotionValue(-28);
  const imageRotateZ = useMotionValue(0);
  const imageY = useMotionValue(0);
  const textOpacityVal = useMotionValue(1);
  const textYVal = useMotionValue(0);
  const overlayOpacity = useMotionValue(0);
  const gradientOpacity = useMotionValue(0);

  const clipPath = useTransform(
    [cpAVal, cpBVal],
    ([a, b]) => `polygon(${a}% 0%, 100% 0%, 100% ${b}%, 0% 100%)`
  );

  const expand = useCallback(() => {
    if (isExpanded.current) return;
    isExpanded.current = true;
    animate(imageScale, 2.34, IMG_SPRING);
    animate(cpAVal, 0, IMG_SPRING);
    animate(cpBVal, 100, IMG_SPRING);
    animate(imageX, 0, IMG_SPRING);
    animate(imageRotateY, 0, IMG_SPRING);
    animate(imageRotateZ, 0, IMG_SPRING);
    animate(imageY, 0, IMG_SPRING);
    animate(textOpacityVal, 0, TEXT_OUT);
    animate(textYVal, -30, TEXT_OUT);
    animate(overlayOpacity, 0, IMG_SPRING);
    animate(gradientOpacity, 0, IMG_SPRING);
  }, [imageScale, cpAVal, cpBVal, imageX, imageRotateY, imageRotateZ, imageY, textOpacityVal, textYVal, overlayOpacity, gradientOpacity]);

  const collapse = useCallback(() => {
    if (!isExpanded.current) return;
    isExpanded.current = false;
    animate(imageScale, 1, IMG_SPRING);
    animate(cpAVal, 3, IMG_SPRING);
    animate(cpBVal, 98.5, IMG_SPRING);
    animate(imageX, 0, IMG_SPRING);
    animate(imageRotateY, -28, IMG_SPRING);
    animate(imageRotateZ, 0, IMG_SPRING);
    animate(imageY, 0, IMG_SPRING);
    animate(textOpacityVal, 1, TEXT_IN);
    animate(textYVal, 0, TEXT_IN);
    animate(overlayOpacity, 0, IMG_SPRING);
    animate(gradientOpacity, 0, IMG_SPRING);
  }, [imageScale, cpAVal, cpBVal, imageX, imageRotateY, imageRotateZ, imageY, textOpacityVal, textYVal, overlayOpacity, gradientOpacity]);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest >= EXPAND_THRESHOLD) expand();
    else collapse();
  });

  return (
    <section ref={sectionRef} className="oa-section">
      <div className="oa-stage">
        <motion.div
          className="oa-content"
          style={{ opacity: textOpacityVal, y: textYVal }}
        >
          <div className="oa-text-panel">
            <div className="oa-header">
              <span className="oa-eyebrow">WHY WORK WITH US</span>
              <div className="oa-header-line"></div>
            </div>
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

        <div className="oa-visual-shell">
          <motion.div
            className="oa-visual-card"
            style={{
              scale: imageScale,
              x: imageX,
              y: imageY,
              rotateY: imageRotateY,
              rotateZ: imageRotateZ,
            }}
          >
            <motion.div className="oa-visual-media" style={{ clipPath }}>
              <div className="oa-media-layer">
                <Image
                  src={whyImage}
                  alt="Our studio at work — collaborative, structured, and delivery-focused"
                  fill
                  className="oa-img"
                  sizes="(max-width: 768px) 100vw, 44vw"
                  priority={false}
                />
              </div>
              <motion.div className="oa-darken" style={{ opacity: overlayOpacity }} />
              <motion.div className="oa-fade-bottom" style={{ opacity: gradientOpacity }} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
