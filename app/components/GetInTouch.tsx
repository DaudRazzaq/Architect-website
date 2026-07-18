'use client';

import { useEffect } from 'react';
import { useContactForm } from '../hooks/useContactForm';
import { useFormStorage } from '../hooks/useFormStorage';
import { useToast } from './Toast';
import './GetInTouch.css';

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

const INITIAL = {
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    location: '',
    budget: '',
    timeline: '',
    message: '',
    referral: '',
};

export default function GetInTouch() {
    const { formData, updateField: handleChange, clearDraft } = useFormStorage('get-in-touch', INITIAL);
    const { loading, success, error: formError, submit: sendEnquiry, reset } = useContactForm();
    const { showToast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await sendEnquiry(formData as Record<string, string>, 'get-in-touch');
    };

    // Wipe the saved draft the moment Resend confirms delivery.
    useEffect(() => {
        if (success) {
            clearDraft();
            showToast('Thank you — your enquiry has been sent.', 'success');
        }
    }, [success, clearDraft, showToast]);

    useEffect(() => {
        if (formError) showToast(formError, 'error');
    }, [formError, showToast]);

    return (
        <section className="git-section">
            <div className="git-container">

                {/* ── LEFT INFO ── */}
                <div className="git-left">
                    <h2 className="git-heading">Get in Touch</h2>
                    <p className="git-intro">
                        What if your home could be more? A space that works better for your life, your lifestyle, and your future. With the right team guiding you, we help uncover its full potential and bring it to life, every step of the way.
                    </p>

                    <div className="git-details">
                        <div className="git-detail-group">
                            <span className="git-detail-label">Location</span>
                            <p className="git-detail-value">
                                Studio One,<br />
                                14 Fitzroy Square,<br />
                                London, W1T 6EH
                            </p>
                        </div>

                        <div className="git-detail-group">
                            <span className="git-detail-label">Phone</span>
                            <p className="git-detail-value">
                                <a href="tel:+442079460321">+44 (0)20 7946 0321</a>
                            </p>
                        </div>

                        <div className="git-detail-group">
                            <span className="git-detail-label">Email</span>
                            <p className="git-detail-value">
                                <a href="mailto:contact@aureonstudio.co.uk">contact@aureonstudio.co.uk</a>
                            </p>
                        </div>

                        <div className="git-detail-group">
                            <span className="git-detail-label">Social</span>
                            <div className="git-socials">
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="git-social-link">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                    </svg>
                                </a>
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="git-social-link">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                                        <rect x="2" y="9" width="4" height="12" />
                                        <circle cx="4" cy="4" r="2" />
                                    </svg>
                                </a>
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="git-social-link">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                    </svg>
                                </a>
                                <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" aria-label="Pinterest" className="git-social-link">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.247-5.277 1.247-5.277s-.319-.638-.319-1.581c0-1.484.866-2.594 1.937-2.594.913 0 1.356.684 1.356 1.504 0 .917-.583 2.287-.885 3.556-.252 1.062.531 1.928 1.577 1.928 1.893 0 3.351-1.994 3.351-4.871 0-2.545-1.829-4.326-4.442-4.326-3.025 0-4.8 2.269-4.8 4.615 0 .914.351 1.893.79 2.428a.318.318 0 0 1 .073.304c-.081.333-.26 1.06-.295 1.207-.047.196-.157.237-.362.143-1.349-.629-2.193-2.603-2.193-4.192 0-3.408 2.476-6.539 7.141-6.539 3.749 0 6.667 2.673 6.667 6.244 0 3.726-2.349 6.72-5.61 6.72-1.096 0-2.127-.57-2.48-1.24l-.674 2.514c-.244.939-.904 2.113-1.346 2.83.607.188 1.25.289 1.916.289 5.523 0 10-4.477 10-10S17.523 2 12 2z" />
                                    </svg>
                                </a>
                                <a href="https://houzz.com" target="_blank" rel="noopener noreferrer" aria-label="Houzz" className="git-social-link">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M6 21V12.41L12 9l6 3.41V21h-4.5v-4.5h-3V21H6z" />
                                        <path d="M12 2L2 8v2h20V8L12 2z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── RIGHT FORM ── */}
                <div className="git-right">
                    {success ? (
                        <div className="git-success">
                            <p className="git-success-msg">Thank you for your enquiry. We&apos;ll be in touch shortly.</p>
                            <button
                                className="git-submit"
                                style={{ marginTop: '16px', background: 'transparent', border: '1px solid currentColor', cursor: 'pointer' }}
                                onClick={() => { reset(); clearDraft(); }}
                            >
                                Send Another Enquiry
                            </button>
                        </div>
                    ) : (
                        <form className="git-form" onSubmit={handleSubmit} noValidate>

                            <div className="git-form-row">
                                <div className="git-field">
                                    <label className="git-label" htmlFor="git-name">Full Name <span className="git-required">*</span></label>
                                    <input className="git-input" id="git-name" type="text" name="name" value={formData.name} onChange={handleChange} required autoComplete="name" />
                                </div>
                                <div className="git-field">
                                    <label className="git-label" htmlFor="git-email">Email Address <span className="git-required">*</span></label>
                                    <input className="git-input" id="git-email" type="email" name="email" value={formData.email} onChange={handleChange} required autoComplete="email" />
                                </div>
                            </div>

                            <div className="git-form-row">
                                <div className="git-field">
                                    <label className="git-label" htmlFor="git-phone">Phone Number</label>
                                    <input className="git-input" id="git-phone" type="tel" name="phone" value={formData.phone} onChange={handleChange} autoComplete="tel" />
                                </div>
                                <div className="git-field">
                                    <label className="git-label" htmlFor="git-company">Company / Organisation</label>
                                    <input className="git-input" id="git-company" type="text" name="company" value={formData.company} onChange={handleChange} autoComplete="organization" />
                                </div>
                            </div>

                            <div className="git-form-row git-form-row--full">
                                <div className="git-field">
                                    <label className="git-label" htmlFor="git-service">Type of Service <span className="git-required">*</span></label>
                                    <select className="git-select" id="git-service" name="service" value={formData.service} onChange={handleChange} required>
                                        <option value="" />
                                        {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div className="git-form-row">
                                <div className="git-field">
                                    <label className="git-label" htmlFor="git-location">Project Location</label>
                                    <input className="git-input" id="git-location" type="text" name="location" value={formData.location} onChange={handleChange} />
                                </div>
                                <div className="git-field">
                                    <label className="git-label" htmlFor="git-budget">Estimated Budget</label>
                                    <select className="git-select" id="git-budget" name="budget" value={formData.budget} onChange={handleChange}>
                                        <option value="" />
                                        {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div className="git-form-row git-form-row--full">
                                <div className="git-field">
                                    <label className="git-label" htmlFor="git-timeline">Project Timeline</label>
                                    <select className="git-select" id="git-timeline" name="timeline" value={formData.timeline} onChange={handleChange}>
                                        <option value="" />
                                        {TIMELINES.map(t => <option key={t} value={t}>{t}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div className="git-form-row git-form-row--full">
                                <div className="git-field">
                                    <label className="git-label" htmlFor="git-message">Tell Us About Your Vision <span className="git-required">*</span></label>
                                    <p className="git-field-hint">
                                        A little information really helps us to assess your project and provide great advice. Please include the type and age of the property, an outline of your ambitions, and an approximation of budget and timescales if known.
                                    </p>
                                    <textarea className="git-textarea" id="git-message" name="message" value={formData.message} onChange={handleChange} rows={5} required />
                                </div>
                            </div>

                            <div className="git-form-row git-form-row--full">
                                <div className="git-field">
                                    <label className="git-label" htmlFor="git-referral">How Did You Find Us?</label>
                                    <select className="git-select" id="git-referral" name="referral" value={formData.referral} onChange={handleChange}>
                                        <option value="" />
                                        <option value="google">Google Search</option>
                                        <option value="instagram">Instagram</option>
                                        <option value="linkedin">LinkedIn</option>
                                        <option value="referral">Personal Referral</option>
                                        <option value="press">Press / Editorial</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>

                            {formError && (
                                <div className="git-form-row git-form-row--full">
                                    <div className="git-error-banner" role="alert">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" style={{ flexShrink: 0, marginTop: '1px' }}>
                                            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                                        </svg>
                                        {formError}
                                    </div>
                                </div>
                            )}

                            <div className="git-form-row git-form-row--full">
                                <button
                                    type="submit"
                                    className={`git-submit${loading ? ' git-submit--loading' : ''}`}
                                    disabled={loading}
                                    aria-busy={loading}
                                >
                                    {loading ? (
                                        <>
                                            <svg className="git-spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                                                <circle cx="12" cy="12" r="9" strokeDasharray="32" strokeDashoffset="24" />
                                            </svg>
                                            Sending…
                                        </>
                                    ) : (
                                        'Submit Enquiry'
                                    )}
                                </button>
                            </div>

                        </form>
                    )}
                </div>

            </div>
        </section>
    );
}
