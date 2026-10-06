import Link from 'next/link';
import './StudioBand.css';

/** Homepage band just above the footer, pointing architects and interior
 *  designers to the trade page. */
export default function StudioBand() {
    return (
        <section className="studio-band" aria-label="Support for architects and interior designers">
            <div className="studio-band__inner">
                <p className="studio-band__text">
                    <span className="studio-band__lead">Architect or interior designer?</span>{' '}
                    We provide surveys and drawing support for busy studios.
                </p>
                <Link href="/for-studios" className="studio-band__btn">For Studios</Link>
            </div>
        </section>
    );
}
