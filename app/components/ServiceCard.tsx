'use client';

import Link from 'next/link';
import './ServiceCard.css';

interface ServiceCardProps {
    title: string;
    description: string;
    image: string;
    href: string;
}

export default function ServiceCard({ title, description, image, href }: ServiceCardProps) {
    return (
        <div className="service-card" style={{ backgroundImage: `url(${image})` }}>
            <div className="service-card-overlay"></div>
            <div className="service-card-content">
                <h3 className="service-card-title">{title}</h3>
                <div className="service-card-details">
                    <p className="service-card-description">{description}</p>
                    <Link href={href} className="service-card-link">
                        LEARN MORE →
                    </Link>
                </div>
            </div>
        </div>
    );
}

