import Image from 'next/image';
import './NewsCard.css';

interface NewsCardProps {
    index?: number;
    title: string;
    description: string;
    date: string;
    source?: string;
    image?: string | null;
    url?: string;
}

export default function NewsCard({
    title,
    description,
    date,
    source,
    image,
    url = '#',
}: NewsCardProps) {
    const isExternal = url.startsWith('http');
    const linkProps = isExternal
        ? { target: '_blank', rel: 'noopener noreferrer' }
        : {};

    // External images (from news API) are passed through unoptimized to avoid
    // needing an exhaustive remotePatterns list while still using next/image.
    const isExternalImage = image ? image.startsWith('http') : false;

    return (
        <a
            href={url}
            className="news-mini-card"
            aria-label={`Read article: ${title}`}
            {...linkProps}
        >
            <div className="news-mini-image-wrap">
                {image ? (
                    <Image
                        src={image}
                        alt={title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                        className="news-mini-image"
                        loading="lazy"
                        unoptimized={isExternalImage}
                    />
                ) : (
                    <div className="news-mini-image placeholder" />
                )}

                <div className="news-mini-meta-overlay">
                    <span className="news-mini-tag">{source || 'Architecture'}</span>
                </div>
            </div>

            <div className="news-mini-content">
                <div className="news-mini-date">{date}</div>
                <h3 className="news-mini-title">{title}</h3>
                <p className="news-mini-desc">{description}</p>
                <span className="news-mini-read-more">Read More +</span>
            </div>
        </a>
    );
}
