import Link from 'next/link';
import type { ReactNode } from 'react';
import Navigation from './Navigation';
import CTAStrip from './CTAStrip';
import Footer from './Footer';
import './ServiceDetail.css';

/* ═══════════════════════════════════════════════════════════════════
   SERVICE DETAIL - fixed-fee service pages
   One layout shared by /services/measured-surveys, /extensions-and-lofts,
   /planning-applications and /building-regulations: headline, intro,
   what's included, timeline, price and a single button. The building
   blocks are exported separately so /for-studios uses the same system.
   ═══════════════════════════════════════════════════════════════════ */

export interface ServiceListItem {
    /** Bold lead-in, e.g. "Visit and survey" */
    title?: string;
    text: ReactNode;
}

interface ServiceHeroProps {
    eyebrow: string;
    headline: string;
    intro: string;
}

export function ServiceHero({ eyebrow, headline, intro }: ServiceHeroProps) {
    return (
        <section className="sd-hero">
            <div className="sd-hero__content">
                <div className="sd-hero__rule-row">
                    <span className="sd-hero__rule" aria-hidden="true" />
                    <span className="sd-hero__eyebrow">{eyebrow}</span>
                    <span className="sd-hero__rule" aria-hidden="true" />
                </div>
                <h1 className="sd-hero__title">{headline}</h1>
                <p className="sd-hero__intro">{intro}</p>
            </div>
        </section>
    );
}

interface ServiceListProps {
    heading: string;
    /** `steps` numbers each item and shows its title as a heading;
     *  `bullets` is a plain list with an optional bold lead-in. */
    variant: 'bullets' | 'steps';
    items: ServiceListItem[];
    tone?: 'warm' | 'white';
}

export function ServiceList({ heading, variant, items, tone = 'warm' }: ServiceListProps) {
    const ListTag = variant === 'steps' ? 'ol' : 'ul';

    return (
        <section className={`sd-section${tone === 'white' ? ' sd-section--white' : ''}`}>
            <div className="sd-inner">
                <h2 className="sd-heading">{heading}</h2>
                <ListTag className={`sd-list sd-list--${variant}`}>
                    {items.map((item, i) => (
                        <li key={item.title ?? i} className="sd-list__item">
                            {variant === 'steps' ? (
                                <>
                                    <span className="sd-list__num" aria-hidden="true">
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    <div>
                                        {item.title && <h3 className="sd-list__title">{item.title}</h3>}
                                        <p className="sd-list__text">{item.text}</p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <span className="sd-list__mark" aria-hidden="true" />
                                    <p className="sd-list__text">
                                        {item.title && <><strong>{item.title}:</strong>{' '}</>}
                                        {item.text}
                                    </p>
                                </>
                            )}
                        </li>
                    ))}
                </ListTag>
            </div>
        </section>
    );
}

interface ServiceActionProps {
    button: { label: string; href: string };
    /** Content shown above the button (e.g. timeline and price) */
    children?: ReactNode;
    /** Secondary line shown beneath the button */
    note?: ReactNode;
}

export function ServiceAction({ button, children, note }: ServiceActionProps) {
    return (
        <section className="sd-action">
            <div className="sd-inner sd-action__inner">
                {children}
                <Link href={button.href} className="sd-btn">{button.label}</Link>
                {note && <p className="sd-action__note">{note}</p>}
            </div>
        </section>
    );
}

export interface ServiceDetailProps extends ServiceHeroProps {
    list: Omit<ServiceListProps, 'tone'>;
    timeline?: ReactNode;
    price: ReactNode;
    button: { label: string; href: string };
}

export default function ServiceDetail({
    eyebrow,
    headline,
    intro,
    list,
    timeline,
    price,
    button,
}: ServiceDetailProps) {
    return (
        <>
            <Navigation />
            <CTAStrip />

            <ServiceHero eyebrow={eyebrow} headline={headline} intro={intro} />

            <ServiceList {...list} />

            <ServiceAction button={button}>
                <dl className={`sd-facts${timeline ? '' : ' sd-facts--single'}`}>
                    {timeline && (
                        <div className="sd-fact">
                            <dt className="sd-fact__label">Timeline</dt>
                            <dd className="sd-fact__value">{timeline}</dd>
                        </div>
                    )}
                    <div className="sd-fact">
                        <dt className="sd-fact__label">Price</dt>
                        <dd className="sd-fact__value">{price}</dd>
                    </div>
                </dl>
            </ServiceAction>

            <Footer />
        </>
    );
}
