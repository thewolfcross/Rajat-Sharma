import { motion } from 'framer-motion';
import SectionWrapper from '../components/SectionWrapper';
import { FiBriefcase, FiMapPin, FiTrendingUp } from 'react-icons/fi';

const timelineData = [
    {
        period: 'Jan 2024 – Jan 2025',
        role: 'Business Development Associate – LATAM',
        company: 'Sekhmet Pharmaceutical',
        description: 'Architecting the LATAM expansion strategy, decoding competitor movements to fuel an ₹85Cr+ revenue engine through high-impact partnerships.',
        icon: <FiTrendingUp />,
    },
    {
        period: '2022 – Dec 2023',
        role: 'Area Manager / Campaign Associate',
        company: 'Kishore Diagnostics',
        description: 'Commanded a 12-strong battalion to a 20% engagement victory, cementing dominance in the Hyderabad healthcare ecosystem through relentless execution.',
        icon: <FiBriefcase />,
    },
    {
        period: '2020 – 2022',
        role: 'MBA – Core Marketing',
        company: 'ICFAI Business School',
        description: 'Won "Best Speaker" award. Developed expertise in market research, brand strategy, and data-driven decision making.',
        icon: <FiMapPin />,
    },
];

export default function About({ darkMode }) {
    return (
        <SectionWrapper id="about">
            <div className="section-container">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
                    {/* Left: Narrative */}
                    <div className="about-left">
                        <span className="section-label">About Me</span>
                        <h2 className="section-title">
                            Strategy-first thinker who{' '}
                            <span className="gradient-text">turns data into deals.</span>
                        </h2>
                        <p className="section-subtitle" style={{ marginBottom: 24 }}>
                            I'm not your typical marketer. I think like a strategist, execute like an operator,
                            and measure like an analyst. With 3+ years of experience spanning healthcare,
                            pharma, and LATAM expansion, I've built a track record of translating market
                            intelligence into tangible revenue growth.
                        </p>
                        <p className="section-subtitle" style={{ marginBottom: 32 }}>
                            From opening new markets in Cuba and Guatemala to closing ₹4Cr deals in under
                            5 days, I thrive at the intersection of strategic thinking and rapid execution.
                            Every campaign I run is data-backed, every partnership I build is value-driven.
                        </p>

                        {/* Quick stats */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: 16,
                        }}>
                            {[
                                { value: '3+', label: 'Years Experience' },
                                { value: '₹85Cr+', label: 'Revenue Impact' },
                                { value: '2', label: 'Markets Opened' },
                            ].map((stat, i) => (
                                <div
                                    key={i}
                                    className="glass-card"
                                    style={{ padding: '20px 16px', textAlign: 'center' }}
                                >
                                    <div className="gradient-text" style={{
                                        fontFamily: 'var(--font-heading)',
                                        fontSize: '1.5rem',
                                        fontWeight: 700,
                                        marginBottom: 4,
                                    }}>
                                        {stat.value}
                                    </div>
                                    <div style={{ fontSize: '0.75rem', opacity: darkMode ? 0.5 : 0.7 }}>{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Timeline */}
                    <div className="about-right">
                        <div style={{ position: 'relative', paddingLeft: 48 }}>
                            <div className="timeline-line" />
                            {timelineData.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.15, duration: 0.5 }}
                                    style={{
                                        display: 'flex',
                                        gap: 20,
                                        marginBottom: 40,
                                        position: 'relative',
                                    }}
                                >
                                    <div className="timeline-dot" style={{ position: 'absolute', left: -48, background: darkMode ? 'var(--color-dark-bg)' : 'var(--color-light-bg)' }}>
                                        <span style={{ color: 'var(--color-primary)', fontSize: 14 }}>{item.icon}</span>
                                    </div>
                                    <div>
                                        <div style={{
                                            fontSize: '0.75rem',
                                            color: 'var(--color-primary)',
                                            fontWeight: 600,
                                            letterSpacing: '0.05em',
                                            marginBottom: 4,
                                        }}>
                                            {item.period}
                                        </div>
                                        <h3 style={{
                                            fontFamily: 'var(--font-heading)',
                                            fontSize: '1.1rem',
                                            fontWeight: 600,
                                            marginBottom: 2,
                                        }}>
                                            {item.role}
                                        </h3>
                                        <div style={{ fontSize: '0.85rem', opacity: darkMode ? 0.5 : 0.7, marginBottom: 8 }}>
                                            {item.company}
                                        </div>
                                        <p style={{ fontSize: '0.9rem', lineHeight: 1.6, opacity: darkMode ? 0.7 : 0.85 }}>
                                            {item.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                <style>{`
          @media (max-width: 768px) {
            .about-left + .about-right { margin-top: 48px; }
            #about .section-container > div { grid-template-columns: 1fr !important; }
          }
        `}</style>
            </div>
        </SectionWrapper>
    );
}
