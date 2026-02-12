'use client';

import { useState, useEffect, useRef } from 'react';
import './Stats.css';

export default function Stats() {
    const [counts, setCounts] = useState({ projects: 0, clients: 0, satisfaction: 0, growth: 0 });
    const [hasAnimated, setHasAnimated] = useState(false);
    const statsRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    animateCounters();
                }
            },
            { threshold: 0.5 }
        );

        if (statsRef.current) {
            observer.observe(statsRef.current);
        }

        return () => observer.disconnect();
    }, [hasAnimated]);

    const animateCounters = () => {
        const duration = 2000;
        const steps = 60;
        const stepDuration = duration / steps;

        const targets = {
            projects: 240,
            clients: 150,
            satisfaction: 100,
            growth: 110
        };

        let currentStep = 0;

        const interval = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;

            setCounts({
                projects: Math.floor(targets.projects * progress),
                clients: Math.floor(targets.clients * progress),
                satisfaction: Math.floor(targets.satisfaction * progress),
                growth: Math.floor(targets.growth * progress)
            });

            if (currentStep >= steps) {
                clearInterval(interval);
                setCounts(targets);
            }
        }, stepDuration);
    };

    return (
        <section ref={statsRef} className="section stats">
            <div className="container">
                <div className="stats-grid">
                    <div className="stat-item">
                        <div className="stat-label">PROJECTS</div>
                        <div className="stat-number">{counts.projects}+</div>
                        <div className="stat-description">Delivering diverse architectural solutions, showcasing our expertise and creativity.</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-label">CLIENTS</div>
                        <div className="stat-number">{counts.clients}+</div>
                        <div className="stat-description">Building strong relationships through trust, collaboration, and exceptional service.</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-label">HAPPY CLIENTS</div>
                        <div className="stat-number">{counts.satisfaction}%</div>
                        <div className="stat-description">Client satisfaction is our top priority, reflected in glowing reviews.</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-label">COMMITMENT</div>
                        <div className="stat-number">{counts.growth}%</div>
                        <div className="stat-description">Going above and beyond to exceed expectations in every project.</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
