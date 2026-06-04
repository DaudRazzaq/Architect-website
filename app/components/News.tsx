import Link from 'next/link';
import NewsCard from './NewsCard';
import { posts } from '@/data/posts';
import './News.css';

export default function News() {
    const latestPosts = posts.slice(0, 6);

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
                    {latestPosts.map((post, i) => (
                        <NewsCard
                            key={post.slug}
                            index={i + 1}
                            title={post.title}
                            description={post.description}
                            date={post.date}
                            source={post.category}
                            image={post.image}
                            url={`/blog/${post.slug}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
