import './Stats.css';

const topCompanies = [
  { name: "FOSTER + PARTNERS", slug: "foster-and-partners" },
  { name: "ZAHA HADID ARCHITECTS", slug: "zaha-hadid-architects" },
  { name: "BIG", slug: "big" },
  { name: "OMA", slug: "oma" },
  { name: "SNØHETTA", slug: "snohetta" },
  { name: "STUDIO GANG", slug: "studio-gang" },
  { name: "GENSLER", slug: "gensler" },
];

const bottomCompanies = [
  { name: "HOK", slug: "hok" },
  { name: "PERKINS&WILL", slug: "perkins-will" },
  { name: "SOM", slug: "som" },
  { name: "NBBJ", slug: "nbbj" },
  { name: "WOODS BAGOT", slug: "woods-bagot" },
  { name: "HDR", slug: "hdr" },
  { name: "BDP", slug: "bdp" },
];

const renderTrackItems = (companies: { name: string; slug: string }[]) => {
    // Duplicate multiple times for a seamless infinite scroll
    const items = [...companies, ...companies, ...companies, ...companies, ...companies];
    return items.map((company, i) => (
        <span key={`${company.slug}-${i}`} className="ribbon-brand">
            {company.name}
        </span>
    ));
};

// Plain numbers, not a scroll-triggered count-up: the count-up started at 0
// and only ran once the block scrolled into view, so crawlers, link previews
// and screenshots all showed "0+ Projects" and "0% Happy Clients".
const STATS = [
    {
        label: 'PROJECTS',
        value: '240+',
        description: 'Delivering diverse architectural solutions, showcasing our expertise and creativity.',
    },
    {
        label: 'CLIENTS',
        value: '150+',
        description: 'Building strong relationships through trust, collaboration, and exceptional service.',
    },
    {
        label: 'HAPPY CLIENTS',
        value: '100%',
        description: 'Client satisfaction is our top priority, reflected in glowing reviews.',
    },
    {
        label: 'COMMITMENT',
        value: '110%',
        description: 'Going above and beyond to exceed expectations in every project.',
    },
];

export default function Stats() {
    return (
        <section className="section stats">
            <div className="ribbon-slider ribbon-top">
                <div className="ribbon-track">
                    {renderTrackItems(topCompanies)}
                </div>
            </div>

            <div className="container">
                <div className="stats-grid">
                    {STATS.map((stat) => (
                        <div key={stat.label} className="stat-item">
                            <div className="stat-label">{stat.label}</div>
                            <div className="stat-number">{stat.value}</div>
                            <div className="stat-description">{stat.description}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="ribbon-slider ribbon-bottom">
                <div className="ribbon-track reverse">
                    {renderTrackItems(bottomCompanies)}
                </div>
            </div>
        </section>
    );
}
