'use client';

import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import '../services.css';

export default function ResidentialPage() {
    return (
        <>
            <Navigation />

            <section className="service-detail-page">
                {/* Hero Section */}
                <div className="service-hero">
                    <div className="service-hero-image">
                        <div className="service-hero-overlay"></div>
                        <div className="service-hero-label">Residential</div>
                    </div>
                    <div className="service-hero-content">
                        <h1 className="service-hero-title">Crafting Homes That Reflect Your Lifestyle</h1>
                        <p className="service-hero-description">
                            Our residential architecture services focus on creating personalized living spaces that enhance your quality of life.
                        </p>
                        <p className="service-hero-text">
                            We believe that every home should be a sanctuary that reflects the unique personality and lifestyle of its
                            inhabitants. Our approach combines functionality with beauty, creating spaces that are not only visually
                            stunning but also perfectly tailored to your daily needs. From custom homes to renovations, we work closely
                            with you to bring your vision to life while incorporating sustainable practices and innovative design solutions.
                        </p>
                    </div>
                </div>

                {/* Services List */}
                <div className="service-detail-content">
                    <div className="container">
                        <h2 className="service-detail-label">RESIDENTIAL SERVICES</h2>

                        <div className="service-detail-list">
                            <div className="service-detail-item">
                                <h3 className="service-detail-item-title">Custom Homes</h3>
                                <p className="service-detail-item-description">
                                    We design bespoke homes tailored to your specific needs and preferences. Every detail is carefully
                                    considered to create a living space that perfectly reflects your lifestyle and personality.
                                </p>
                            </div>

                            <div className="service-detail-item">
                                <h3 className="service-detail-item-title">Home Renovations</h3>
                                <p className="service-detail-item-description">
                                    Our renovation services breathe new life into existing homes. We modernize spaces while respecting
                                    their original character, improving functionality and aesthetic appeal.
                                </p>
                            </div>

                            <div className="service-detail-item">
                                <h3 className="service-detail-item-title">Sustainable Living</h3>
                                <p className="service-detail-item-description">
                                    We integrate eco-friendly materials and energy-efficient systems into residential designs. Our
                                    sustainable approach reduces environmental impact while creating comfortable, healthy living environments.
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
