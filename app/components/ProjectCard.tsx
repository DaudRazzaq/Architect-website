import Link from 'next/link';
import Image from 'next/image';
import './ProjectCard.css';

interface ProjectCardProps {
    title: string;
    category: string;
    location?: string;
    image?: string;
    href?: string;
    gradient?: string;
    year?: string;
}

export default function ProjectCard({ title, category, location, image, href, gradient }: ProjectCardProps) {
    const inner = (
        <div className="project-card-image" style={image ? undefined : { background: gradient || '#c8c0b4' }}>
            {image && (
                <Image src={image} alt={title} fill className="project-card-img" sizes="(max-width: 768px) 100vw, 33vw" />
            )}
            <div className="project-card-overlay">
                <div className="project-card-overlay-content">
                    <h3 className="project-card-title">{title}</h3>
                    <span className="project-card-category">{location || category}</span>
                </div>
            </div>
        </div>
    );

    if (href) {
        return (
            <Link href={href} className="project-card project-card--link">
                {inner}
            </Link>
        );
    }

    return <div className="project-card">{inner}</div>;
}
