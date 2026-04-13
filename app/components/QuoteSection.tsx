import './QuoteSection.css';

interface QuoteSectionProps {
    image: string;
    quote: string;
    label?: string;
    attribution?: string;
}

export default function QuoteSection({ image, quote, label, attribution }: QuoteSectionProps) {
    return (
        <section
            className="qs-section"
            aria-label="Philosophy quote"
            style={{ backgroundImage: `url('${image}')` }}
        >
            <div className="qs-overlay" />
            <div className="qs-content">
                {label && <span className="qs-label">{label}</span>}
                <span className="qs-mark" aria-hidden="true">&ldquo;</span>
                <blockquote className="qs-quote">{quote}</blockquote>
                {attribution && <cite className="qs-attribution">{attribution}</cite>}
            </div>
        </section>
    );
}