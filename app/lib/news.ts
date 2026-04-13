// ─── Types ──────────────────────────────────────────────────────────────────

export interface NewsArticle {
    title: string;
    description: string;
    url: string;
    image: string | null;
    publishedAt: string;
    source: string;
}

// ─── Fallback data (shown when API key is missing or API fails) ──────────────

const FALLBACK_ARTICLES: NewsArticle[] = [
    {
        title: 'Sustainable Design: Building a Greener Future in Architecture',
        description:
            'Explore eco-friendly materials and innovative practices that are shaping the future of sustainable architecture, reducing environmental impact while enhancing quality of life.',
        url: '#',
        image: '/b1.webp',
        publishedAt: 'Dec 15, 2024',
        source: 'Aureon Studio',
    },
    {
        title: 'Maximising Space: The New Principles of Multipurpose Architecture',
        description:
            'Learn how leading studios create versatile, adaptable spaces that meet varied needs — optimising functionality and flexibility without sacrificing elegance.',
        url: '#',
        image: '/b2.webp',
        publishedAt: 'Nov 28, 2024',
        source: 'Aureon Studio',
    },
    {
        title: 'Interior Architecture and the Art of Considered Refurbishment',
        description:
            'How a thoughtful refurbishment approach can transform existing homes, preserving character while introducing calm, contemporary design that truly supports modern living.',
        url: '#',
        image: '/b3.webp',
        publishedAt: 'Nov 10, 2024',
        source: 'Aureon Studio',
    },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

// Fallback images cycled when an article has no image
const FALLBACK_IMAGES = ['/b1.webp', '/b2.webp', '/b3.webp'];

function isValidArticle(item: Record<string, unknown>): boolean {
    return (
        typeof item.title === 'string' &&
        item.title.trim().length > 0 &&
        typeof item.url === 'string' &&
        item.url.startsWith('http')
    );
}

/** Upgrade http:// image URLs to https:// to avoid mixed-content blocking */
function upgradeImageUrl(url: string | null | undefined, index: number): string {
    if (typeof url === 'string' && url.startsWith('http')) {
        return url.replace(/^http:\/\//, 'https://');
    }
    return FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];
}

function formatDate(iso: string): string {
    try {
        return new Date(iso).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    } catch {
        return iso;
    }
}

// ─── Main fetch function ──────────────────────────────────────────────────────

export async function getLatestArchitectureNews(): Promise<NewsArticle[]> {
    const apiKey = process.env.MEDIASTACK_API_KEY;

    if (!apiKey) {
        console.warn('[news] MEDIASTACK_API_KEY not set — using fallback data');
        return FALLBACK_ARTICLES;
    }

    try {
        const params = new URLSearchParams({
            access_key: apiKey,
            keywords: 'architecture,architectural,interior design,urban design,sustainable design',
            languages: 'en',
            sort: 'published_desc',
            limit: '10',
        });

        const res = await fetch(`https://api.mediastack.com/v1/news?${params}`, {
            next: { revalidate: 3600 }, // revalidate hourly
        });

        if (!res.ok) {
            console.error(`[news] API error ${res.status}`);
            return FALLBACK_ARTICLES;
        }

        const data = await res.json();
        const raw: Record<string, unknown>[] = data?.data ?? [];

        const valid = raw
            .filter(isValidArticle)
            .slice(0, 3)
            .map((item, i) => ({
                title: item.title as string,
                description:
                    typeof item.description === 'string' && item.description.trim().length > 0
                        ? item.description
                        : 'Read the full article for more details.',
                url: item.url as string,
                image: upgradeImageUrl(item.image as string | null | undefined, i),
                publishedAt: formatDate(item.published_at as string),
                source: typeof item.source === 'string' ? item.source : '',
            }));

        // If fewer than 1 valid article, fall back entirely
        return valid.length > 0 ? valid : FALLBACK_ARTICLES;
    } catch (err) {
        console.error('[news] Fetch failed:', err);
        return FALLBACK_ARTICLES;
    }
}
