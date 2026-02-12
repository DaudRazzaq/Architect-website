'use client';

import './NewsCard.css';

interface NewsCardProps {
    title: string;
    description: string;
    date: string;
    gradient: string;
}

export default function NewsCard({ title, description, date, gradient }: NewsCardProps) {
    return (
        <div className="news-card">
            <div
                className="news-card-image"
                style={{ background: gradient }}
            >
            </div>
            <div className="news-card-content">
                <h3 className="news-card-title">{title}</h3>
                <p className="news-card-description">{description}</p>
                <a href="#contact" className="news-card-link">
                    READ ARTICLE
                </a>
            </div>
        </div>
    );
}
