'use client';

import NewsCard from './NewsCard';
import './News.css';

export default function News() {
    const news = [
        {
            title: 'Sustainable Design: Building a Greener Future in Architecture',
            description: 'Explore eco-friendly materials and innovative practices that are shaping the future of sustainable architecture, reducing environmental impact significantly.',
            date: 'Dec 15, 2024',
            gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        },
        {
            title: 'Maximizing Space: Tips for Multipurpose Architecture',
            description: 'Learn how to create versatile, adaptable spaces that meet various needs, optimizing functionality and flexibility in architectural design.',
            date: 'Nov 28, 2024',
            gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
        },
        {
            title: 'Enhancing Business through Thoughtful Design',
            description: 'Architectural design can improve customer experience, boost productivity, and drive success in commercial environments.',
            date: 'Nov 10, 2024',
            gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
        }
    ];

    return (
        <section id="news" className="section news">
            <div className="container">
                <div className="news-header">
                    <h2 className="news-title">Latest News</h2>
                    <a href="#contact" className="news-all-link">
                        VIEW ALL
                    </a>
                </div>
                <div className="news-grid">
                    {news.map((article) => (
                        <NewsCard
                            key={article.title}
                            title={article.title}
                            description={article.description}
                            date={article.date}
                            gradient={article.gradient}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
