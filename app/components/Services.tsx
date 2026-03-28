'use client';

import ServiceCard from './ServiceCard';
import './Services.css';

export default function Services() {
    const services = [
        {
            title: 'Architecture',
            tagline: 'Designing homes that transform the way you live.',
            description: 'We don\'t just design buildings — we design the way you live within them. Every project begins with understanding your lifestyle, your priorities, and the potential of your property. From reimagining layouts and shaping forms to guiding you through planning, technical detail, and delivery, we make the complex feel simple.',
            image: '/b1.webp'
        },
        {
            title: 'Interior Design',
            tagline: 'Calm, comfortable spaces that feel as good as they look.',
            description: 'Interior design is where everyday life happens. We create interiors that support the way you live — balancing function with atmosphere, and refining details that quietly elevate the entire home. From light and flow to materials, colour, and joinery, we design spaces that feel cohesive, practical, and timeless.',
            image: '/b2.webp'
        },
        {
            title: 'Landscape',
            tagline: 'Outdoor spaces designed for connection, comfort, and calm.',
            description: 'Great homes extend beyond the walls. We design outdoor spaces that feel natural, usable, and thoughtfully composed. We consider sunlight, planting, materials, boundaries, and flow between inside and out, creating an outdoor environment that complements the architecture and enhances daily living.',
            image: '/b3.webp'
        },
        {
            title: 'Project Management',
            tagline: 'Clear coordination. Calm delivery. Quality you can trust.',
            description: 'A successful project needs more than great design — it needs structure, clarity, and consistent oversight. We coordinate timelines, help manage decisions, support contractor communication, and keep the project aligned with the agreed design, scope, and budget expectations.',
            image: '/image1b.webp'
        }
    ];

    return (
        <section id="services" className="services">
            <div className="container">
                <div className="services-header">
                    <span className="services-label">OUR SERVICES</span>
                    <h2 className="services-title">What We Do</h2>
                    <div className="services-header-line"></div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="services-grid">
                    {services.map((service) => (
                        <ServiceCard
                            key={service.title}
                            title={service.title}
                            description={service.description}
                            image={service.image}
                        />
                    ))}
                </div>
            </div>

            {/* Our Process Section */}
            <div className="container">
                <div className="process-section">
                    <div className="process-content">
                        <span className="process-label">OUR PROCESS</span>
                        <h2 className="process-title">From First Ideas to Completion</h2>
                        <p>
                            Our services follow a clear, stage-by-stage process that takes you from first ideas through to completion. With fixed fees agreed in advance and a structured approach, you can move forward with confidence — knowing what happens next, what you&apos;ll receive, and what each stage will cost.
                        </p>
                        <p>
                            Each stage is confirmed in writing, keeping the journey flexible but well-defined. This ensures decisions are made at the right time, the scope stays clear, and the project remains guided by your needs, priorities, and budget.
                        </p>
                        <p>
                            The process begins with a simple enquiry. If we&apos;re a good fit for your project, we&apos;ll arrange an initial visit and consultation to understand your property, discuss your goals, and gather the information needed to recommend the next steps.
                        </p>
                        <a href="/contact" className="process-link">
                            START A CONVERSATION →
                        </a>
                    </div>
                    <div className="process-steps">
                        <div className="process-step">
                            <span className="process-step-number">01</span>
                            <div>
                                <h4>Enquiry & Consultation</h4>
                                <p>Initial visit to understand your property, goals, and vision.</p>
                            </div>
                        </div>
                        <div className="process-step">
                            <span className="process-step-number">02</span>
                            <div>
                                <h4>Design Development</h4>
                                <p>Layouts, material palettes, and spatial concepts refined with you.</p>
                            </div>
                        </div>
                        <div className="process-step">
                            <span className="process-step-number">03</span>
                            <div>
                                <h4>Technical Detail</h4>
                                <p>Buildable drawings and specifications ready for delivery.</p>
                            </div>
                        </div>
                        <div className="process-step">
                            <span className="process-step-number">04</span>
                            <div>
                                <h4>Delivery & Completion</h4>
                                <p>Managed delivery from site to handover with care and precision.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

