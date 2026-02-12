'use client';

import './About.css';

export default function About() {
    return (
        <section id="about" className="section about">
            <div className="container">
                <div className="about-grid">
                    <div className="about-title-col">
                        <h2 className="about-title">Architecture and Design, Defined by Clarity and Purpose</h2>
                    </div>
                    <div className="about-content-col">
                        <span className="about-subtitle">WELCOME TO OUR STUDIO</span>
                        <p>
                            We are an architecture and design studio specializing in residential, commercial, 
                            interior, and landscape projects. Our practice is driven by a clear design process 
                            that responds to client objectives, site context, and functional requirements. We 
                            approach every project with a commitment to precision, quality, and long-term value.
                        </p>
                        <p>
                            Our work is grounded in the belief that well-designed spaces are shaped through 
                            careful planning, strong collaboration, and a clear understanding of how environments 
                            are used. By working closely with our clients, we translate ideas and vision into 
                            cohesive architectural solutions that are both practical and refined.
                        </p>
                        <p>
                            From early concept development through to detailed design and delivery, we focus on 
                            creating spaces that are efficient, contextual, and thoughtfully composed. Our goal 
                            is to deliver architecture that is purposeful, adaptable, and enduring.
                        </p>
                        <a href="#services" className="about-link">
                            MORE ABOUT US
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
