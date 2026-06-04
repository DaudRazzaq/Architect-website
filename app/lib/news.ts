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

// ─── Helpers ─────────────────────────────────────────────────────────────────

// Fallback images cycled when an article has no image
const FALLBACK_IMAGES = ['/b1.webp', '/b2.webp', '/b3.webp'];

const FALLBACK_ARTICLES: NewsArticle[] = [
    {
        title: 'Adaptive Reuse: Breathing New Life into Historic Structures',
        description: 'Transforming abandoned industrial buildings into vibrant cultural hubs and modern lofts while preserving their historical essence and character.',
        url: '#',
        image: '/b3.webp',
        publishedAt: 'Sep 18, 2024',
        source: 'Arch Daily',
    },
    {
        title: 'Minimalist Interventions: The Power of Understated Design',
        description: 'Exploring how stripping back to the essentials can create spaces that are intensely beautiful, highly functional, and deeply calming for residents.',
        url: '#',
        image: '/b1.webp',
        publishedAt: 'Sep 02, 2024',
        source: 'Aureon Journal',
    },
    {
        title: 'Light as a Medium: Sculpting Spaces with Natural Illumination',
        description: 'Mastering the interplay of sunlight and shadow to define architectural volumes, create dramatic focal points, and warm interior palettes.',
        url: '#',
        image: '/b2.webp',
        publishedAt: 'Aug 14, 2024',
        source: 'Design Digest',
    },
    {
        title: 'Tomorrow’s Materials: The Rise of Bio-Fabricated Architecture',
        description: 'From mycelium blocks to structural timber alternatives, these emerging materials promise a radical shift in how we sustainably construct the buildings of tomorrow.',
        url: '#',
        image: '/b3.webp',
        publishedAt: 'Jul 29, 2024',
        source: 'Arch Daily',
    },
    {
        title: 'Sustainable Design: Building a Greener Future in Architecture',
        description: 'Explore eco-friendly materials and innovative practices that are shaping the future of sustainable architecture, reducing environmental impact while enhancing quality of life.',
        url: '#',
        image: '/b1.webp',
        publishedAt: 'Dec 15, 2024',
        source: 'Aureon Studio',
    },
    {
        title: 'Maximising Space: The New Principles of Multipurpose Architecture',
        description: 'Learn how leading studios create versatile, adaptable spaces that meet varied needs — optimising functionality and flexibility without sacrificing elegance.',
        url: '#',
        image: '/b2.webp',
        publishedAt: 'Nov 28, 2024',
        source: 'Aureon Studio',
    },
];

function isValidArticle(item: Record<string, unknown>): boolean {
    return (
        typeof item.title === 'string' &&
        item.title.trim().length > 0 &&
        typeof item.url === 'string' &&
        item.url.startsWith('http')
    );
}

function hasUsableImage(item: Record<string, unknown>): boolean {
    return typeof item.image === 'string' && item.image.trim().startsWith('http');
}

function upgradeBunnyThumbnail(url: string): string {
    const match = url.match(/^https:\/\/scx\d+\.b-cdn\.net\/csz\/news\/tmb\/([^?#]+)(?:[?#].*)?$/i);
    if (!match) return url;

    return `https://scx2.b-cdn.net/gfx/news/${match[1]}`;
}

/** Upgrade image URLs so cards use crisp, secure sources */
function upgradeImageUrl(url: string | null | undefined, index: number): string {
    if (typeof url === 'string' && url.startsWith('http')) {
        const secureUrl = url.replace(/^http:\/\//, 'https://');
        return upgradeBunnyThumbnail(secureUrl);
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
            keywords: 'architecture',
            languages: 'en',
            sort: 'published_desc',
            limit: '20',
        });

        const res = await fetch(`https://api.mediastack.com/v1/news?${params}`, {
            next: { revalidate: 3600 }, // revalidate hourly
        });

        if (!res.ok) {
            const errorBody = await res.text();
            // warn (not error) — fallback articles are shown, so this is non-critical
            console.warn(`[news] API error ${res.status}: ${errorBody}`);
            return FALLBACK_ARTICLES;
        }

        const data = await res.json();
        const raw: Record<string, unknown>[] = data?.data ?? [];

        const validArticles = raw.filter(isValidArticle);
        const imageFirstArticles = [
            ...validArticles.filter(hasUsableImage),
            ...validArticles.filter((item) => !hasUsableImage(item)),
        ];

        const valid = imageFirstArticles
            .slice(0, 9)
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
