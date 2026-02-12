'use client';

import './TeamCard.css';

interface TeamCardProps {
    name: string;
    image: string;
    experience: string;
    qualifications: string;
}

export default function TeamCard({ name, image, experience, qualifications }: TeamCardProps) {
    return (
        <div className="team-card">
            <div className="team-card-image-wrapper">
                <img src={image} alt={name} className="team-card-image" />
                <div className="team-card-overlay">
                    <div className="team-card-details">
                        <div className="team-detail-item">
                            <h4 className="team-detail-label">Experience</h4>
                            <p className="team-detail-text">{experience}</p>
                        </div>
                        <div className="team-detail-item">
                            <h4 className="team-detail-label">Qualifications</h4>
                            <p className="team-detail-text">{qualifications}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="team-card-name">
                <h3>{name}</h3>
            </div>
        </div>
    );
}
