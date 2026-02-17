import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from '../components/SectionWrapper';
import { FiSend, FiMail, FiLinkedin, FiMapPin, FiCheck } from 'react-icons/fi';

export default function Contact() {
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', message: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
        setForm({ name: '', email: '', message: '' });
    };

    const inputStyle = {
        width: '100%',
        padding: '14px 16px',
        borderRadius: 12,
        border: '1px solid rgba(245, 245, 220, 0.15)', // Beige border
        background: 'rgba(245, 245, 220, 0.05)', // Glassy Beige input
        color: 'var(--color-dark-text)',
        fontSize: '0.9rem',
        fontFamily: 'var(--font-body)',
        outline: 'none',
        transition: 'border-color 0.2s',
    };

    return (
        <SectionWrapper id="contact">
            <div className="section-container">
                <div style={{ textAlign: 'center', marginBottom: 64 }}>
                    <span className="section-label" style={{ justifyContent: 'center' }}>Contact</span>
                    <h2 className="section-title" style={{ maxWidth: 600, margin: '0 auto 16px' }}>
                        Let's Build{' '}
                        <span className="gradient-text">Revenue-First Growth Strategies.</span>
                    </h2>
                    <p className="section-subtitle" style={{ margin: '0 auto' }}>
                        Open to strategic roles in business development, market expansion, and growth leadership.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 48,
                    maxWidth: 900,
                    margin: '0 auto',
                }}
                    className="contact-grid"
                >
                    {/* Left: Info */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                        <div className="glass-card" style={{ padding: '24px' }}>
                            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                                <div style={{
                                    width: 44, height: 44, borderRadius: 12,
                                    background: 'rgba(255,195,0,0.1)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: 'var(--color-primary)',
                                }}>
                                    <FiMail size={18} />
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.75rem', opacity: 0.5, marginBottom: 2 }}>Email</div>
                                    <a href="mailto:sharmarajat1197@gmail.com" style={{
                                        color: 'var(--color-primary)',
                                        textDecoration: 'none',
                                        fontSize: '0.9rem',
                                        fontWeight: 500,
                                    }}>
                                        sharmarajat1197@gmail.com
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card" style={{ padding: '24px' }}>
                            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                                <div style={{
                                    width: 44, height: 44, borderRadius: 12,
                                    background: 'rgba(255,214,10,0.1)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: 'var(--color-accent)',
                                }}>
                                    <FiLinkedin size={18} />
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.75rem', opacity: 0.5, marginBottom: 2 }}>LinkedIn</div>
                                    <a href="https://linkedin.com/in/rajatsharma" target="_blank" rel="noopener noreferrer" style={{
                                        color: 'var(--color-accent)',
                                        textDecoration: 'none',
                                        fontSize: '0.9rem',
                                        fontWeight: 500,
                                    }}>
                                        Connect on LinkedIn
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card" style={{ padding: '24px' }}>
                            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                                <div style={{
                                    width: 44, height: 44, borderRadius: 12,
                                    background: 'rgba(255,159,67,0.1)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: '#ff9f43',
                                }}>
                                    <FiMapPin size={18} />
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.75rem', opacity: 0.5, marginBottom: 2 }}>Location</div>
                                    <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Hyderabad, India</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Form */}
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <input
                            type="text"
                            placeholder="Your Name"
                            required
                            value={form.name}
                            onChange={e => setForm({ ...form, name: e.target.value })}
                            style={inputStyle}
                            onFocus={e => e.target.style.borderColor = 'var(--color-primary)'}
                            onBlur={e => e.target.style.borderColor = 'var(--color-dark-border)'}
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            required
                            value={form.email}
                            onChange={e => setForm({ ...form, email: e.target.value })}
                            style={inputStyle}
                            onFocus={e => e.target.style.borderColor = 'var(--color-primary)'}
                            onBlur={e => e.target.style.borderColor = 'var(--color-dark-border)'}
                        />
                        <textarea
                            placeholder="Your Message"
                            rows={5}
                            required
                            value={form.message}
                            onChange={e => setForm({ ...form, message: e.target.value })}
                            style={{ ...inputStyle, resize: 'vertical', fontFamily: 'var(--font-body)' }}
                            onFocus={e => e.target.style.borderColor = 'var(--color-primary)'}
                            onBlur={e => e.target.style.borderColor = 'var(--color-dark-border)'}
                        />
                        <motion.button
                            type="submit"
                            className="glow-btn glow-btn-primary"
                            style={{ justifyContent: 'center', width: '100%' }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {submitted ? (
                                <><FiCheck size={18} /> Message Sent!</>
                            ) : (
                                <><FiSend size={16} /> Send Message</>
                            )}
                        </motion.button>
                    </form>
                </div>

                {/* Footer */}
                <div style={{
                    marginTop: 100,
                    paddingTop: 32,
                    borderTop: '1px solid var(--color-dark-border)',
                    textAlign: 'center',
                    fontSize: '0.8rem',
                    opacity: 0.4,
                }}>
                    <p>© 2025 Rajat Sharma. Designed with strategy in mind.</p>
                </div>

                <style>{`
          @media (max-width: 768px) {
            .contact-grid { grid-template-columns: 1fr !important; }
          }
          body.light-mode .contact-grid input,
          body.light-mode .contact-grid textarea {
            background: rgba(241,245,249,0.8) !important;
            border-color: var(--color-light-border) !important;
            color: var(--color-light-text) !important;
          }
        `}</style>
            </div>
        </SectionWrapper>
    );
}
