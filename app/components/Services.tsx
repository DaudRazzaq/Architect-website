import ServiceCard from './ServiceCard';
import surveyImage from '../assets/about.webp';
import './Services.css';

export default function Services() {
    const services = [
        {
            title: 'Measured Surveys',
            tagline: 'Laser measured surveys across London',
            image: surveyImage,
            href: '/services/measured-surveys'
        },
        {
            title: 'Extensions & Lofts',
            tagline: 'Extensions and loft conversions, designed and approved',
            image: '/project-management.webp',
            href: '/services/extensions-and-lofts'
        },
        {
            title: 'Planning Applications',
            tagline: 'Planning applications handled for you',
            image: '/landscape.webp',
            href: '/services/planning-applications'
        },
        {
            title: 'Interior Design',
            tagline: 'Calm, comfortable spaces that feel as good as they look.',
            image: '/interior.webp',
            href: '/services/interior'
        }
    ];

    return (
        <section id="services" className="services">
            <div className="container">
                <div className="services-header">
                    <div className="services-eyebrow-row">
                        <span className="services-label">OUR SERVICES</span>
                        <div className="services-header-line"></div>
                    </div>
                    <h2 className="services-title">What We Do</h2>
                </div>
            </div>
            <div className="container-fluid">
                <div className="services-grid">
                    {services.map((service) => (
                        <ServiceCard
                            key={service.title}
                            title={service.title}
                            tagline={service.tagline}
                            image={service.image}
                            href={service.href}
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
                            Our services follow a clear, stage-by-stage process that takes you from first ideas through to completion. With fixed fees agreed in advance and a structured approach, you can move forward with confidence, knowing what happens next, what you&apos;ll receive, and what each stage will cost.
                        </p>
                        <p>
                            Each stage is confirmed in writing, keeping the journey flexible but well-defined. This ensures decisions are made at the right time, the scope stays clear, and the project remains guided by your needs, priorities, and budget.
                        </p>
                        <p>
                            The process begins with a simple enquiry. If we&apos;re a good fit for your project, we&apos;ll arrange an initial visit and consultation to understand your property, discuss your goals, and gather the information needed to recommend the next steps.
                        </p>
                        <a href="/contact" className="process-link">
                            START A CONVERSATION
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

