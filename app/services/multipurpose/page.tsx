'use client';

import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import '../services.css';

export default function MultipurposePage() {
    return (
        <>
            <Navigation />

            <section className="service-detail-page">
                {/* Hero Section */}
                <div className="service-hero service-hero-reverse">
                    <div className="service-hero-content">
                        <h1 className="service-hero-title">Versatile Spaces for Diverse Needs</h1>
                        <p className="service-hero-description">
                            Our multipurpose architecture services create adaptable spaces that serve a variety of functions.
                        </p>
                        <p className="service-hero-text">
                            We design community centers, educational facilities, and event spaces with flexibility in mind, ensuring
                            they can accommodate different activities and user groups. These spaces are built to be sustainable and
                            resilient, supporting diverse needs effectively and efficiently.
                        </p>
                    </div>
                    <div className="service-hero-image">
                        <div className="service-hero-overlay"></div>
                        <div className="service-hero-label">Multipurpose</div>
                    </div>
                </div>

                {/* Services List */}
                <div className="service-detail-content">
                    <div className="container">
                        <h2 className="service-detail-label">MULTIPURPOSE SERVICES</h2>

                        <div className="service-detail-list">
                            <div className="service-detail-item">
                                <h3 className="service-detail-item-title">Community Centers</h3>
                                <p className="service-detail-item-description">
                                    Our community centers are designed to be the heart of the neighborhood. They offer flexible spaces
                                    for events, meetings, and recreational activities, fostering community engagement and interaction.
                                </p>
                            </div>

                            <div className="service-detail-item">
                                <h3 className="service-detail-item-title">Educational Facilities</h3>
                                <p className="service-detail-item-description">
                                    We design educational facilities that support diverse teaching methods and activities. Our flexible
                                    classroom layouts and multipurpose areas enhance learning experiences and adapt to changing educational needs.
                                </p>
                            </div>

                            <div className="service-detail-item">
                                <h3 className="service-detail-item-title">Event Spaces</h3>
                                <p className="service-detail-item-description">
                                    Our event spaces are versatile and multifunctional, capable of hosting a variety of events from
                                    conferences to social gatherings. We focus on creating adaptable layouts and high-quality acoustics.
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
