import NewsCard from './NewsCard';
import { getLatestArchitectureNews } from '../lib/news';
import './News.css';

export default async function News() {
    const articles = await getLatestArchitectureNews();

    return (
        <section id="news" className="section news">
            <div className="container">
                <div className="news-header">
                    <h2 className="news-title">Latest News</h2>
                    <a href="/blog" className="news-all-link">
                        VIEW ALL
                    </a>
                </div>
                <div className="news-grid">
                    {articles.map((article, i) => (
                        <NewsCard
                            key={`${article.url}-${i}`}
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
