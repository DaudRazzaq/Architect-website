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
import ourApproachImage from '../assets/ourApprouch.webp';

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

const EXPAND_THRESHOLD = 0.75;

const IMG_SPRING = { type: 'spring', stiffness: 60, damping: 18, mass: 1 } as const;
const TEXT_OUT = { duration: 0.35, ease: [0.4, 0, 0.2, 1] } as const;
const TEXT_IN = { duration: 0.45, ease: [0.0, 0, 0.2, 1] } as const;

export default function OurApproach() {
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
  }, [
    imageScale,
    cpAVal,
    cpBVal,
    imageX,
    imageRotateY,
    imageRotateZ,
    imageY,
    textOpacityVal,
    textYVal,
    overlayOpacity,
    gradientOpacity,
  ]);

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
  }, [
    imageScale,
    cpAVal,
    cpBVal,
    imageX,
    imageRotateY,
    imageRotateZ,
    imageY,
    textOpacityVal,
    textYVal,
    overlayOpacity,
    gradientOpacity,
  ]);

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
              <span className="oa-eyebrow">OUR APPROACH</span>
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
            <motion.div
              className="oa-visual-media"
              style={{ clipPath }}
            >
              <div className="oa-media-layer">
                <Image
                  src={ourApproachImage}
                  alt="Refined architectural interior showcasing our design philosophy"
                  fill
                  className="oa-img"
                  sizes="(max-width: 768px) 100vw, 44vw"
                  priority={false}
                />
              </div>

              <motion.div
                className="oa-darken"
                style={{ opacity: overlayOpacity }}
              />

              <motion.div
                className="oa-fade-bottom"
                style={{ opacity: gradientOpacity }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}