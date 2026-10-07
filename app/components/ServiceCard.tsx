import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';
import './ServiceCard.css';

interface ServiceCardProps {
    title: string;
    tagline: string;
    image: string | StaticImageData;
    href: string;
}

export default function ServiceCard({ title, tagline, image, href }: ServiceCardProps) {
    return (
        <Link href={href} className="sc-tile">
            {/* next/image rather than a CSS background, so each tile downloads a
                resized, modern-format copy instead of the 3,200px original.
                Decorative: the tile's title says what it is. */}
            <Image src={image} alt="" fill sizes="(max-width: 768px) 100vw, 50vw" className="sc-tile-bg" />
            <div className="sc-tile-inner">
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
