import { motion } from 'framer-motion';
import { FiArrowRight, FiLinkedin, FiMail, FiDownload } from 'react-icons/fi';
import AnimatedCounter from '../components/AnimatedCounter';

export default function Hero({ darkMode }) {
    return (
        <section
            id="hero"
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Gradient orbs */}
            <div style={{
                position: 'absolute',
                top: '-20%',
                right: '-10%',
                width: '600px',
                height: '600px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255,195,0,0.08) 0%, transparent 70%)',
                animation: 'float 8s ease-in-out infinite',
                pointerEvents: 'none',
            }} />
            <div style={{
                position: 'absolute',
                bottom: '-10%',
                left: '-10%',
                width: '500px',
                height: '500px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255,214,10,0.05) 0%, transparent 70%)',
                animation: 'float 10s ease-in-out infinite reverse',
                pointerEvents: 'none',
            }} />

            <div className="section-container hero-padding" style={{ width: '100%', paddingTop: 120, paddingBottom: 80 }}>
                <style>{`
                    @media (max-width: 768px) {
                        .hero-padding { paddingTop: 100px !important; paddingBottom: 60px !important; }
                    }
                `}</style>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 8,
                            padding: '8px 16px',
                            borderRadius: 100,
                            border: '1px solid rgba(0,212,255,0.2)',
                            background: 'rgba(0,212,255,0.05)',
                            fontSize: '0.8rem',
                            fontWeight: 500,
                            color: 'var(--color-primary)',
                            marginBottom: 32,
                        }}
                    >
                        <span style={{
                            width: 8, height: 8, borderRadius: '50%',
                            background: 'var(--color-accent)',
                            display: 'inline-block',
                            animation: 'pulse-glow 2s infinite',
                        }} />
                        Available for Strategic Roles
                    </motion.div>

                    {/* Headline */}
                    <h1 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                        fontWeight: 700,
                        lineHeight: 1.1,
                        letterSpacing: '-0.03em',
                        maxWidth: 800,
                        marginBottom: 24,
                    }}>
                        Turning Market Intelligence into{' '}
                        <span className="gradient-text">Revenue Engines.</span>
                    </h1>

                    {/* Subheadline */}
                    <p style={{
                        fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                        lineHeight: 1.7,
                        maxWidth: 620,
                        marginBottom: 16,
                        opacity: 0.7,
                    }}>
                        Marketing & Business Development Strategist driving{' '}
                        <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
                            ₹<AnimatedCounter target={85} suffix="Cr+" duration={2500} />
                        </span>{' '}
                        revenue impact through insight-led growth.
                    </p>

                    <p style={{
                        fontSize: '0.9rem',
                        opacity: 0.5,
                        marginBottom: 40,
                    }}>
                        3+ Years · LATAM Market Expansion · Data-Driven Campaigns · Strategic Partnerships
                    </p>

                    {/* CTAs */}
                    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 48 }}>
                        <a href="#casestudies" className="glow-btn glow-btn-primary">
                            View My Work <FiArrowRight />
                        </a>
                        <a href="#contact" className="glow-btn glow-btn-outline">
                            Let's Connect
                        </a>
                        <a
                            href="/resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glow-btn glow-btn-outline"
                            style={{ borderColor: 'var(--color-accent)', color: 'var(--color-accent)' }}
                        >
                            Resume <FiDownload style={{ marginLeft: 6 }} />
                        </a>
                    </div>

                    {/* Social */}
                    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                        <a
                            href="https://www.linkedin.com/in/rajat-sharma-4a2141129"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                width: 44, height: 44, borderRadius: 12,
                                border: '1px solid var(--color-dark-border)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: 'var(--color-dark-muted)',
                                textDecoration: 'none',
                                transition: 'all 0.2s',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-primary)'; e.currentTarget.style.color = 'var(--color-primary)'; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-dark-border)'; e.currentTarget.style.color = 'var(--color-dark-muted)'; }}
                        >
                            <FiLinkedin size={18} />
                        </a>
                        <a
                            href="mailto:sharmarajat1197@gmail.com"
                            style={{
                                width: 44, height: 44, borderRadius: 12,
                                border: '1px solid var(--color-dark-border)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: 'var(--color-dark-muted)',
                                textDecoration: 'none',
                                transition: 'all 0.2s',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-primary)'; e.currentTarget.style.color = 'var(--color-primary)'; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-dark-border)'; e.currentTarget.style.color = 'var(--color-dark-muted)'; }}
                        >
                            <FiMail size={18} />
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
