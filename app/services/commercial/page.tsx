'use client';

import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import '../services.css';

export default function CommercialPage() {
    return (
        <>
            <Navigation />

            <section className="service-detail-page">
                {/* Hero Section */}
                <div className="service-hero">
                    <div className="service-hero-image">
                        <div className="service-hero-overlay"></div>
                        <div className="service-hero-label">Commercial</div>
                    </div>
                    <div className="service-hero-content">
                        <h1 className="service-hero-title">Innovative Designs for Business Success</h1>
                        <p className="service-hero-description">
                            Our commercial architecture services focus on creating dynamic and functional spaces that drive business success.
                        </p>
                        <p className="service-hero-text">
                            We understand the unique needs of commercial environments and design spaces that enhance productivity,
                            foster innovation, and create memorable experiences for customers and employees alike. Our approach combines
                            aesthetic appeal with practical solutions, ensuring that your commercial space stands out and serves its
                            purpose effectively. Whether it's a retail store, office building, or hospitality venue, we tailor our
                            designs to meet your specific business goals and brand identity.
                        </p>
                    </div>
                </div>

                {/* Services List */}
                <div className="service-detail-content">
                    <div className="container">
                        <h2 className="service-detail-label">COMMERCIAL SERVICES</h2>

                        <div className="service-detail-list">
                            <div className="service-detail-item">
                                <h3 className="service-detail-item-title">Retail Spaces</h3>
                                <p className="service-detail-item-description">
                                    We design engaging retail environments that attract customers and encourage longer visits.
                                    Our layouts optimize flow and product visibility, boosting sales and enhancing the shopping experience.
                                </p>
                            </div>

                            <div className="service-detail-item">
                                <h3 className="service-detail-item-title">Office Buildings</h3>
                                <p className="service-detail-item-description">
                                    Our office designs focus on creating efficient, inspiring workspaces. We prioritize natural light,
                                    ergonomic layouts, and collaborative areas to improve employee productivity and satisfaction.
                                </p>
                            </div>

                            <div className="service-detail-item">
                                <h3 className="service-detail-item-title">Hospitality Venues</h3>
                                <p className="service-detail-item-description">
                                    We craft inviting hospitality spaces that provide exceptional guest experiences. Our designs balance
                                    aesthetics and functionality to create memorable atmospheres in hotels, restaurants, and more.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
