import Link from 'next/link';
import NewsCard from './NewsCard';
import { getLatestArchitectureNews } from '../lib/news';
import './News.css';

export default async function News() {
    const articles = await getLatestArchitectureNews();

    if (!articles || articles.length === 0) return null;

    return (
        <section id="news" className="section news">
            <div className="container">
                <div className="news-top-bar">
                    <div className="news-top-left">
                        <span className="news-badge">Insights</span>
                        <h2 className="news-section-title">Latest<br/>Perspectives</h2>
                    </div>
                    <div className="news-top-right">
                        <p className="news-section-desc">
                            A curated selection of thoughts, updates, and innovations from our studio and the broader architectural world.
                        </p>
                        <Link href="/blog" className="news-explore-btn">
                            Explore Journal
                        </Link>
                    </div>
                </div>
                
                <div className="news-minimal-grid">
                    {articles.map((article, i) => (
                        <NewsCard
                            key={`${article.url}-${i}`}
                            index={i + 1}
                            title={article.title}
                            description={article.description}
                            date={article.publishedAt}
                            source={article.source}
                            image={article.image}
                            url={article.url}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
