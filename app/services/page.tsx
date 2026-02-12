'use client';

import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import './services-overview.css';

export default function ServicesPage() {
    return (
        <>
            <Navigation />

            <section className="services-overview-page">
                {/* Commercial Section */}
                <div className="service-section">
                    <div className="service-sticky-container">
                        <div className="service-image-wrapper">
                            <div className="service-section-image">
                                <div className="service-section-overlay"></div>
                                <div className="service-section-label">Commercial</div>
                            </div>
                        </div>
                        <div className="service-text-wrapper">
                            <div className="service-section-content">
                                <h1 className="service-section-title">Innovative Designs for Business Success</h1>
                                <p className="service-section-description">
                                    Our commercial architecture services focus on creating dynamic and functional spaces that drive business success.
                                </p>
                                <p className="service-section-text">
                                    We understand the unique needs of commercial environments and design spaces that enhance productivity,
                                    foster innovation, and create memorable experiences for customers and employees alike. Our approach combines
                                    aesthetic appeal with practical solutions, ensuring that your commercial space stands out and serves its
                                    purpose effectively. Whether it's a retail store, office building, or hospitality venue, we tailor our
                                    designs to meet your specific business goals and brand identity.
                                </p>
                            </div>

                            <div className="service-section-list">
                                <h2 className="service-section-list-label">COMMERCIAL SERVICES</h2>

                                <div className="service-section-items">
                                    <div className="service-section-item">
                                        <h3 className="service-section-item-title">Retail Spaces</h3>
                                        <p className="service-section-item-description">
                                            We design engaging retail environments that attract customers and encourage longer visits.
                                            Our layouts optimize flow and product visibility, boosting sales and enhancing the shopping experience.
                                        </p>
                                    </div>

                                    <div className="service-section-item">
                                        <h3 className="service-section-item-title">Office Buildings</h3>
                                        <p className="service-section-item-description">
                                            Our office designs focus on creating efficient, inspiring workspaces. We prioritize natural light,
                                            ergonomic layouts, and collaborative areas to improve employee productivity and satisfaction.
                                        </p>
                                    </div>

                                    <div className="service-section-item">
                                        <h3 className="service-section-item-title">Hospitality Venues</h3>
                                        <p className="service-section-item-description">
                                            We craft inviting hospitality spaces that provide exceptional guest experiences. Our designs balance
                                            aesthetics and functionality to create memorable atmospheres in hotels, restaurants, and more.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Multipurpose Section */}
                <div className="service-section service-section-alt">
                    <div className="service-sticky-container">
                        <div className="service-text-wrapper">
                            <div className="service-section-content">
                                <h1 className="service-section-title">Versatile Spaces for Diverse Needs</h1>
                                <p className="service-section-description">
                                    Our multipurpose architecture services create adaptable spaces that serve a variety of functions.
                                </p>
                                <p className="service-section-text">
                                    We design community centers, educational facilities, and event spaces with flexibility in mind, ensuring
                                    they can accommodate different activities and user groups. These spaces are built to be sustainable and
                                    resilient, supporting diverse needs effectively and efficiently.
                                </p>
                            </div>

                            <div className="service-section-list">
                                <h2 className="service-section-list-label">MULTIPURPOSE SERVICES</h2>

                                <div className="service-section-items">
                                    <div className="service-section-item">
                                        <h3 className="service-section-item-title">Community Centers</h3>
                                        <p className="service-section-item-description">
                                            Our community centers are designed to be the heart of the neighborhood. They offer flexible spaces
                                            for events, meetings, and recreational activities, fostering community engagement and interaction.
                                        </p>
                                    </div>

                                    <div className="service-section-item">
                                        <h3 className="service-section-item-title">Educational Facilities</h3>
                                        <p className="service-section-item-description">
                                            We design educational facilities that support diverse teaching methods and activities. Our flexible
                                            classroom layouts and multipurpose areas enhance learning experiences and adapt to changing educational needs.
                                        </p>
                                    </div>

                                    <div className="service-section-item">
                                        <h3 className="service-section-item-title">Event Spaces</h3>
                                        <p className="service-section-item-description">
                                            Our event spaces are versatile and multifunctional, capable of hosting a variety of events from
                                            conferences to social gatherings. We focus on creating adaptable layouts and high-quality acoustics.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="service-image-wrapper">
                            <div className="service-section-image">
                                <div className="service-section-overlay"></div>
                                <div className="service-section-label">Multipurpose</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Residential Section */}
                <div className="service-section">
                    <div className="service-sticky-container">
                        <div className="service-image-wrapper">
                            <div className="service-section-image">
                                <div className="service-section-overlay"></div>
                                <div className="service-section-label">Residential</div>
                            </div>
                        </div>
                        <div className="service-text-wrapper">
                            <div className="service-section-content">
                                <h1 className="service-section-title">Crafting Homes That Reflect Your Lifestyle</h1>
                                <p className="service-section-description">
                                    Our residential architecture services focus on creating personalized living spaces that enhance your quality of life.
                                </p>
                                <p className="service-section-text">
                                    We believe that every home should be a sanctuary that reflects the unique personality and lifestyle of its
                                    inhabitants. Our approach combines functionality with beauty, creating spaces that are not only visually
                                    stunning but also perfectly tailored to your daily needs. From custom homes to renovations, we work closely
                                    with you to bring your vision to life while incorporating sustainable practices and innovative design solutions.
                                </p>
                            </div>

                            <div className="service-section-list">
                                <h2 className="service-section-list-label">RESIDENTIAL SERVICES</h2>

                                <div className="service-section-items">
                                    <div className="service-section-item">
                                        <h3 className="service-section-item-title">Custom Homes</h3>
                                        <p className="service-section-item-description">
                                            We design bespoke homes tailored to your specific needs and preferences. Every detail is carefully
                                            considered to create a living space that perfectly reflects your lifestyle and personality.
                                        </p>
                                    </div>

                                    <div className="service-section-item">
                                        <h3 className="service-section-item-title">Home Renovations</h3>
                                        <p className="service-section-item-description">
                                            Our renovation services breathe new life into existing homes. We modernize spaces while respecting
                                            their original character, improving functionality and aesthetic appeal.
                                        </p>
                                    </div>

                                    <div className="service-section-item">
                                        <h3 className="service-section-item-title">Sustainable Living</h3>
                                        <p className="service-section-item-description">
                                            We integrate eco-friendly materials and energy-efficient systems into residential designs. Our
                                            sustainable approach reduces environmental impact while creating comfortable, healthy living environments.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
