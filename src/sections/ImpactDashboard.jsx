import { motion } from 'framer-motion';
import SectionWrapper from '../components/SectionWrapper';
import AnimatedCounter from '../components/AnimatedCounter';
import { FiTrendingUp, FiDollarSign, FiTarget, FiBarChart2, FiGlobe, FiZap } from 'react-icons/fi';

const metrics = [
    { icon: <FiTrendingUp size={22} />, value: 85, prefix: '₹', suffix: 'Cr+', label: 'Revenue Influence', color: '#ffc300' },
    { icon: <FiZap size={22} />, value: 4, prefix: '₹', suffix: 'Cr', label: 'Bulk Order – 4.5 Days', color: '#ffd60a' },
    { icon: <FiBarChart2 size={22} />, value: 20, suffix: '%', label: 'Sales Growth via Campaign', color: '#ff9f43' },
    { icon: <FiTarget size={22} />, value: 25, suffix: '%', label: 'Engagement Boost', color: '#e6b000' },
    { icon: <FiDollarSign size={22} />, value: 1.2, prefix: '$', suffix: 'M', label: 'Partnership Revenue', color: '#f0c040' },
    { icon: <FiGlobe size={22} />, value: 50, suffix: 'Cr', label: 'Pipeline Added', color: '#ffaa00' },
];

export default function ImpactDashboard() {
    return (
        <SectionWrapper id="impact">
            <div className="section-container">
                <div style={{ textAlign: 'center', marginBottom: 64 }}>
                    <span className="section-label" style={{ justifyContent: 'center' }}>Impact Dashboard</span>
                    <h2 className="section-title" style={{ maxWidth: 600, margin: '0 auto 16px' }}>
                        Numbers that tell the <span className="gradient-text">growth story.</span>
                    </h2>
                    <p className="section-subtitle" style={{ margin: '0 auto' }}>
                        Quantified results across market development, sales acceleration, and strategic partnerships.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: 20,
                }}
                    className="impact-grid"
                >
                    {metrics.map((m, i) => (
                        <motion.div
                            key={i}
                            className="glass-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                            style={{
                                padding: '32px 28px',
                                position: 'relative',
                                overflow: 'hidden',
                            }}
                        >
                            {/* Glow accent */}
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                height: 3,
                                background: `linear-gradient(90deg, ${m.color}, transparent)`,
                                borderRadius: '16px 16px 0 0',
                            }} />

                            <div style={{
                                width: 48,
                                height: 48,
                                borderRadius: 12,
                                background: `${m.color}15`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: m.color,
                                marginBottom: 20,
                            }}>
                                {m.icon}
                            </div>

                            <div style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: '2.2rem',
                                fontWeight: 700,
                                letterSpacing: '-0.02em',
                                marginBottom: 6,
                                color: m.color,
                            }}>
                                <AnimatedCounter target={m.value} prefix={m.prefix || ''} suffix={m.suffix || ''} duration={2000} />
                            </div>

                            <div style={{
                                fontSize: '0.85rem',
                                opacity: 0.6,
                                fontWeight: 500,
                            }}>
                                {m.label}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <style>{`
          @media (max-width: 768px) {
            .impact-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
          @media (max-width: 480px) {
            .impact-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
            </div>
        </SectionWrapper>
    );
}
