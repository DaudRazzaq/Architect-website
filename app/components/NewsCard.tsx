import './NewsCard.css';

interface NewsCardProps {
    title: string;
    description: string;
    date: string;
    source?: string;
    image?: string | null;
    url?: string;
    // legacy gradient still accepted for any static usage
    gradient?: string;
}

export default function NewsCard({
    title,
    description,
    date,
    source,
    image,
    url = '#',
    gradient,
}: NewsCardProps) {
    const isExternal = url.startsWith('http');
    const linkProps = isExternal
        ? { target: '_blank', rel: 'noopener noreferrer' }
        : {};

    return (
        <a
            href={url}
            className="news-card"
            aria-label={`Read article: ${title}`}
            {...linkProps}
        >
            <div className="news-card-image-wrap">
                {image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={image}
                        alt={title}
                        className="news-card-img"
                        loading="lazy"
                    />
                ) : (
                    <div
                        className="news-card-placeholder"
                        style={{
                            background:
                                gradient ??
                                'linear-gradient(135deg, #e8e4dc 0%, #d0ccc4 100%)',
                        }}
                    />
                )}
            </div>
            <div className="news-card-content">
                {(source || date) && (
                    <p className="news-card-meta">
                        {source && <span className="news-card-source">{source}</span>}
                        {source && date && <span className="news-card-sep">·</span>}
                        {date && <span>{date}</span>}
                    </p>
                )}
                <h3 className="news-card-title">{title}</h3>
                <p className="news-card-description">{description}</p>
                <span className="news-card-link">READ ARTICLE</span>
            </div>
        </a>
    );
}
