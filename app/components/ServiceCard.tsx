import Link from 'next/link';
import './ServiceCard.css';

interface ServiceCardProps {
    num: string;
    title: string;
    tagline: string;
    image: string;
    href: string;
}

export default function ServiceCard({ num, title, tagline, image, href }: ServiceCardProps) {
    return (
        <Link href={href} className="sc-tile">
            <div className="sc-tile-bg" style={{ backgroundImage: `url(${image})` }} />
            <div className="sc-tile-inner">
                <span className="sc-tile-num">{num}</span>
                <div className="sc-tile-foot">
                    <span className="sc-tile-accent-line" />
                    <h3 className="sc-tile-name">{title}</h3>
                    <p className="sc-tile-tagline">{tagline}</p>
                    <span className="sc-tile-explore">Explore →</span>
                </div>
            </div>
        </Link>
    );
}


