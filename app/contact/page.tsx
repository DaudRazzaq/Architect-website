'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import CTAStrip from '../components/CTAStrip';
import './contact.css';

const SERVICES = [
    'Residential Architecture',
    'Commercial Architecture',
    'Interior Design',
    'Landscape Design',
    'Urban Planning',
    'Renovation & Extension',
    'Not Sure Yet',
];

const BUDGETS = [
    'Under £100k',
    '£100k – £250k',
    '£250k – £500k',
    '£500k – £1M',
    '£1M – £5M',
    'Over £5M',
    'To Be Discussed',
];

const TIMELINES = [
    'As soon as possible',
    '1 – 3 months',
    '3 – 6 months',
    '6 – 12 months',
    'Over a year',
    'Not decided yet',
];

type FormData = {
    name: string; email: string; phone: string; company: string;
    service: string; location: string; budget: string; timeline: string;
    message: string; referral: string;
};

const INITIAL: FormData = {
    name: '', email: '', phone: '', company: '',
    service: '', location: '', budget: '', timeline: '',
    message: '', referral: '',
};

export default function ContactPage() {
    const [form, setForm] = useState<FormData>(INITIAL);
    const [submitted, setSubmitted] = useState(false);

    const update = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const submit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

    return (
        <>
            <Navigation />
            <CTAStrip />

            {/* ── HERO ── */}
            <section className="ct-hero">
                <div className="ct-hero-overlay" />
                <div className="ct-hero-content">
                    <motion.span
                        className="ct-hero-eyebrow"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        GET IN TOUCH
                    </motion.span>
                    <motion.h1
                        className="ct-hero-heading"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.85, delay: 0.15 }}
                    >
                        Let&apos;s Build Something<br /><em>Remarkable</em>
                    </motion.h1>
                    <motion.p
                        className="ct-hero-sub"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                    >
                        Every great project begins with a conversation. Share your vision with our London studio
                        and we&apos;ll help bring it to life with precision and care.
                    </motion.p>
                    <motion.a
                        href="#ct-form"
                        className="ct-hero-cta"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.45 }}
                    >
                        Start the Conversation
                    </motion.a>
                </div>
                <div className="ct-hero-scroll"><div className="ct-hero-scroll-line" /></div>
            </section>

            {/* ── MAIN CONTACT SECTION ── */}
            <section id="ct-form" className="ct-main">
                <div className="ct-main-inner">

                    {/* INFO COLUMN */}
                    <motion.div
                        className="ct-info"
                        initial={{ opacity: 0, x: -36 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="ct-info-header">
                            <span className="ct-info-eyebrow">AUREON STUDIO</span>
                            <h2 className="ct-info-heading">How Can We Help You?</h2>
                            <p className="ct-info-body">
                                Whether you have a fully-formed brief or simply an idea, our team is ready to
                                listen, advise, and guide you from initial concept through to completed project.
                            </p>
                        </div>

                        <div className="ct-info-details">
                            <div className="ct-detail">
                                <span className="ct-detail-icon">
                                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /><circle cx="12" cy="9" r="2.5" /></svg>
                                </span>
                                <div>
                                    <span className="ct-detail-label">Studio Address</span>
                                    <span className="ct-detail-value">14 Fitzroy Square, Fitzrovia<br />London W1T 6EH</span>
                                </div>
                            </div>
                            <div className="ct-detail">
                                <span className="ct-detail-icon">
                                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 7.18 19.79 19.79 0 012 2.18 2 2 0 014 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14z" /></svg>
                                </span>
                                <div>
                                    <span className="ct-detail-label">Phone</span>
                                    <span className="ct-detail-value">+44 (0)20 7946 0321</span>
                                </div>
                            </div>
                            <div className="ct-detail">
                                <span className="ct-detail-icon">
                                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                                </span>
                                <div>
                                    <span className="ct-detail-label">Email</span>
                                    <span className="ct-detail-value">hello@aureonstudio.com</span>
                                </div>
                            </div>
                            <div className="ct-detail">
                                <span className="ct-detail-icon">
                                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                                </span>
                                <div>
                                    <span className="ct-detail-label">Studio Hours</span>
                                    <span className="ct-detail-value">Mon – Fri: 9:00 – 18:00<br />Sat: By appointment only</span>
                                </div>
                            </div>
                        </div>

                        <div className="ct-process">
                            <h3 className="ct-process-title">What Happens Next</h3>
                            <ol className="ct-steps">
                                <li className="ct-step">
                                    <span className="ct-step-num">01</span>
                                    <div>
                                        <strong>We review your brief</strong>
                                        <p>Our team carefully reads your enquiry and identifies the right architect for your project.</p>
                                    </div>
                                </li>
                                <li className="ct-step">
                                    <span className="ct-step-num">02</span>
                                    <div>
                                        <strong>Initial consultation</strong>
                                        <p>We&apos;ll schedule a complimentary 30-minute call to discuss your vision, timeline and budget.</p>
                                    </div>
                                </li>
                                <li className="ct-step">
                                    <span className="ct-step-num">03</span>
                                    <div>
                                        <strong>Tailored proposal</strong>
                                        <p>You&apos;ll receive a detailed proposal outlining our approach, fees and project roadmap.</p>
                                    </div>
                                </li>
                            </ol>
                        </div>
                    </motion.div>

                    {/* FORM COLUMN */}
                    <motion.div
                        className="ct-form-col"
                        initial={{ opacity: 0, x: 36 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
                    >
                        {submitted ? (
                            <div className="ct-success">
                                <div className="ct-success-icon">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="20 6 9 17 4 12" /></svg>
                                </div>
                                <h2 className="ct-success-heading">Message Received</h2>
                                <p className="ct-success-body">
                                    Thank you for reaching out. A member of our team will be in touch within
                                    one business day to discuss your project.
                                </p>
                                <button className="ct-success-back" onClick={() => setSubmitted(false)}>
                                    Send Another Enquiry
                                </button>
                            </div>
                        ) : (
                            <form className="ct-form" onSubmit={submit} noValidate>
                                <div className="ct-form-header">
                                    <span className="ct-form-eyebrow">YOUR ENQUIRY</span>
                                    <h2 className="ct-form-heading">Tell Us About Your Project</h2>
                                </div>

                                <div className="ct-form-grid">
                                    {/* Name */}
                                    <div className="ct-field">
                                        <input className="ct-input" type="text" name="name" id="ct-name" placeholder=" " value={form.name} onChange={update} required />
                                        <label className="ct-label" htmlFor="ct-name">Full Name <span>*</span></label>
                                    </div>
                                    {/* Email */}
                                    <div className="ct-field">
                                        <input className="ct-input" type="email" name="email" id="ct-email" placeholder=" " value={form.email} onChange={update} required />
                                        <label className="ct-label" htmlFor="ct-email">Email Address <span>*</span></label>
                                    </div>
                                    {/* Phone */}
                                    <div className="ct-field">
                                        <input className="ct-input" type="tel" name="phone" id="ct-phone" placeholder=" " value={form.phone} onChange={update} />
                                        <label className="ct-label" htmlFor="ct-phone">Phone Number</label>
                                    </div>
                                    {/* Company */}
                                    <div className="ct-field">
                                        <input className="ct-input" type="text" name="company" id="ct-company" placeholder=" " value={form.company} onChange={update} />
                                        <label className="ct-label" htmlFor="ct-company">Company / Organisation</label>
                                    </div>
                                    {/* Service */}
                                    <div className="ct-field ct-field--full">
                                        <select className="ct-select" name="service" id="ct-service" value={form.service} onChange={update} required>
                                            <option value="" disabled></option>
                                            {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                        <label className="ct-label ct-label--select" htmlFor="ct-service">Type of Service <span>*</span></label>
                                        <span className="ct-select-arrow"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg></span>
                                    </div>
                                    {/* Location */}
                                    <div className="ct-field">
                                        <input className="ct-input" type="text" name="location" id="ct-location" placeholder=" " value={form.location} onChange={update} />
                                        <label className="ct-label" htmlFor="ct-location">Project Location</label>
                                    </div>
                                    {/* Budget */}
                                    <div className="ct-field">
                                        <select className="ct-select" name="budget" id="ct-budget" value={form.budget} onChange={update}>
                                            <option value="" disabled></option>
                                            {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
                                        </select>
                                        <label className="ct-label ct-label--select" htmlFor="ct-budget">Estimated Budget</label>
                                        <span className="ct-select-arrow"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg></span>
                                    </div>
                                    {/* Timeline */}
                                    <div className="ct-field ct-field--full">
                                        <select className="ct-select" name="timeline" id="ct-timeline" value={form.timeline} onChange={update}>
                                            <option value="" disabled></option>
                                            {TIMELINES.map(t => <option key={t} value={t}>{t}</option>)}
                                        </select>
                                        <label className="ct-label ct-label--select" htmlFor="ct-timeline">Project Timeline</label>
                                        <span className="ct-select-arrow"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg></span>
                                    </div>
                                    {/* Message */}
                                    <div className="ct-field ct-field--full">
                                        <textarea className="ct-textarea" name="message" id="ct-message" placeholder=" " value={form.message} onChange={update} required rows={5} />
                                        <label className="ct-label" htmlFor="ct-message">Tell Us About Your Vision <span>*</span></label>
                                    </div>
                                    {/* Referral */}
                                    <div className="ct-field ct-field--full">
                                        <select className="ct-select" name="referral" id="ct-referral" value={form.referral} onChange={update}>
                                            <option value="" disabled></option>
                                            <option value="google">Google Search</option>
                                            <option value="instagram">Instagram</option>
                                            <option value="linkedin">LinkedIn</option>
                                            <option value="referral">Personal Referral</option>
                                            <option value="press">Press / Editorial</option>
                                            <option value="other">Other</option>
                                        </select>
                                        <label className="ct-label ct-label--select" htmlFor="ct-referral">How Did You Find Us?</label>
                                        <span className="ct-select-arrow"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg></span>
                                    </div>
                                </div>

                                <button type="submit" className="ct-submit">
                                    <span>Submit Enquiry</span>
                                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                                </button>
                                <p className="ct-privacy">
                                    Your information is handled in accordance with our privacy policy.
                                    We will never share your details with third parties.
                                </p>
                            </form>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* ── OFFICE STRIP ── */}
            <section className="ct-office-strip">
                <div className="ct-office-inner">
                    <div className="ct-office-item">
                        <span className="ct-office-label">LONDON STUDIO</span>
                        <span className="ct-office-value">14 Fitzroy Square, W1T 6EH</span>
                    </div>
                    <div className="ct-office-divider" />
                    <div className="ct-office-item">
                        <span className="ct-office-label">TELEPHONE</span>
                        <span className="ct-office-value">+44 (0)20 7946 0321</span>
                    </div>
                    <div className="ct-office-divider" />
                    <div className="ct-office-item">
                        <span className="ct-office-label">EMAIL</span>
                        <span className="ct-office-value">hello@aureonstudio.com</span>
                    </div>
                    <div className="ct-office-divider" />
                    <div className="ct-office-item">
                        <span className="ct-office-label">FOLLOW US</span>
                        <div className="ct-office-socials">
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
                            </a>
                            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M8 12h4v8M12 12c0-2.21 1.79-4 4-4" /></svg>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
