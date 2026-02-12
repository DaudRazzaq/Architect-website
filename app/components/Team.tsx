'use client';

import TeamCard from './TeamCard';
import './Team.css';

export default function Team() {
    const teamMembers = [
        {
            name: 'Sarah Anderson',
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=600&fit=crop',
            experience: '15+ Years in Architecture',
            qualifications: 'M.Arch, RIBA Chartered Architect, LEED AP'
        },
        {
            name: 'Michael Chen',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop',
            experience: '12+ Years in Interior Design',
            qualifications: 'M.Des Interior Architecture, NCIDQ Certified'
        },
        {
            name: 'Emma Thompson',
            image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=600&fit=crop',
            experience: '10+ Years in Project Management',
            qualifications: 'B.Arch, PMP Certified, LEED Green Associate'
        },
        {
            name: 'David Martinez',
            image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=600&fit=crop',
            experience: '14+ Years in Landscape Architecture',
            qualifications: 'M.L.A, Registered Landscape Architect'
        }
    ];

    return (
        <section id="team" className="team-section">
            <div className="container">
                <div className="team-header">
                    <span className="team-subtitle">OUR TEAM</span>
                    <h2 className="team-title">Meet the Experts</h2>
                </div>
                <div className="team-grid">
                    {teamMembers.map((member) => (
                        <TeamCard
                            key={member.name}
                            name={member.name}
                            image={member.image}
                            experience={member.experience}
                            qualifications={member.qualifications}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
