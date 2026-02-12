'use client';

import ServiceCard from './ServiceCard';
import './Services.css';

export default function Services() {
    const services = [
        {
            title: 'Architecture',
            description: 'We provide comprehensive architectural services from concept design to detailed development, delivering responsive and context-driven solutions. Our approach integrates functionality, aesthetics, and sustainability to create buildings that are efficient, adaptable, and aligned with client objectives while meeting regulatory and technical requirements.',
            image: '/b1.webp'
        },
        {
            title: 'Interior',
            description: 'We offer interior design services that focus on spatial efficiency, material clarity, and functional detailing. Our work responds to user needs and project context, translating design concepts into refined interior environments that balance aesthetics with comfort, durability, and practical performance across residential and commercial spaces.',
            image: '/b2.webp'
        },
        {
            title: 'Build',
            description: 'Our studio is supported by a skilled team of building artisans and experienced site managers who ensure that each project is delivered with precision and care. By maintaining close coordination across all stages of construction, we oversee quality control, manage on-site processes, and ensure smooth workflow from start to completion. This collaborative approach allows us to translate design intent into built form effectively, while maintaining high standards of craftsmanship, efficiency, and reliability on every site.',
            image: '/b3.webp'
        },
        {
            title: 'Landscape Design',
            description: 'We provide landscape design solutions that integrate natural systems with the built environment. Our approach enhances outdoor spaces through thoughtful planning, sustainable strategies, and material selection, creating functional and visually balanced landscapes that support environmental performance, usability, and contextual harmony.',
            image: '/image1b.webp'
        }
    ];

    return (
        <section id="services" className="services">
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
        </section>
    );
}

