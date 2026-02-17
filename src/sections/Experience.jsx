import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../components/SectionWrapper';
import { FiGlobe, FiTrendingUp, FiUsers, FiTarget, FiBarChart2, FiChevronDown } from 'react-icons/fi';

const experiences = [
    {
        company: 'Sekhmet Pharmaceutical',
        role: 'Business Development Associate – LATAM',
        period: 'Jan 2024 – Jan 2025',
        color: '#ffc300',
        highlights: [
            { icon: <FiGlobe size={16} />, text: 'Conducted deep-dive market research & competitor intelligence across 5+ LATAM territories' },
            { icon: <FiTarget size={16} />, text: 'Spearheaded entry into Cuba & Guatemala markets, securing critical first-mover advantage' },
            { icon: <FiTrendingUp size={16} />, text: 'Orchestrated strategic sales expansion contributing to an ₹85Cr+ revenue pipeline' },
            { icon: <FiBarChart2 size={16} />, text: 'Quarterbacked cross-functional campaign execution with marketing & supply chain teams' },
            { icon: <FiGlobe size={16} />, text: 'Executed a high-stakes ₹4Cr bulk pharmaceutical order in a record-breaking 4.5 days' },
        ],
    },
    {
        company: 'Kishore Diagnostics',
        role: 'Area Manager / Campaign Associate',
        period: '2022 – Dec 2023',
        color: '#ffd60a',
        highlights: [
            { icon: <FiBarChart2 size={16} />, text: 'Catalyzed a 20% engagement surge through targeted multi-channel campaign launches' },
            { icon: <FiUsers size={16} />, text: 'Forged high-value strategic doctor partnerships dominating the Hyderabad territory' },
            { icon: <FiUsers size={16} />, text: 'Mobilized and mentored a high-performance squad of 12 field associates' },
            { icon: <FiTarget size={16} />, text: 'Revolutionized the lead generation engine to optimize conversion pipelines' },
            { icon: <FiTrendingUp size={16} />, text: 'Drove substantial area revenue growth through precision data-backed territory management' },
        ],
    },
];

export default function Experience() {
    const [expanded, setExpanded] = useState(null);

    return (
        <SectionWrapper id="experience">
            <div className="section-container">
                <div style={{ textAlign: 'center', marginBottom: 64 }}>
                    <span className="section-label" style={{ justifyContent: 'center' }}>Experience</span>
                    <h2 className="section-title">
                        Where strategy meets <span className="gradient-text">execution.</span>
                    </h2>
                    <p className="section-subtitle" style={{ margin: '0 auto' }}>
                        A track record of turning market insights into measurable business outcomes.
                    </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 800, margin: '0 auto' }}>
                    {experiences.map((exp, i) => (
                        <motion.div
                            key={i}
                            className="glass-card"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15 }}
                            style={{
                                cursor: 'pointer',
                                overflow: 'hidden',
                                position: 'relative',
                            }}
                            onClick={() => setExpanded(expanded === i ? null : i)}
                        >
                            {/* Top accent */}
                            <div style={{
                                position: 'absolute',
                                top: 0, left: 0, right: 0,
                                height: 3,
                                background: `linear-gradient(90deg, ${exp.color}, transparent)`,
                            }} />

                            <div className="experience-card-padding" style={{ padding: '28px 32px' }}>
                                <div className="experience-header" style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    position: 'relative'
                                }}>
                                    <div>
                                        <div style={{
                                            fontSize: '0.75rem',
                                            color: exp.color,
                                            fontWeight: 600,
                                            letterSpacing: '0.05em',
                                            marginBottom: 6,
                                        }}>
                                            {exp.period}
                                        </div>
                                        <h3 style={{
                                            fontFamily: 'var(--font-heading)',
                                            fontSize: '1.2rem',
                                            fontWeight: 600,
                                            marginBottom: 4,
                                        }}>
                                            {exp.company}
                                        </h3>
                                        <p style={{ fontSize: '0.9rem', opacity: 0.6 }}>
                                            {exp.role}
                                        </p>
                                    </div>
                                    <motion.div
                                        className="experience-toggle"
                                        animate={{ rotate: expanded === i ? 180 : 0 }}
                                        transition={{ duration: 0.2 }}
                                        style={{
                                            width: 36, height: 36, borderRadius: 10,
                                            background: `${exp.color}10`,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            color: exp.color,
                                            flexShrink: 0,
                                        }}
                                    >
                                        <FiChevronDown size={18} />
                                    </motion.div>
                                </div>

                                <AnimatePresence>
                                    {expanded === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            style={{ overflow: 'hidden' }}
                                        >
                                            <div style={{
                                                marginTop: 24,
                                                paddingTop: 24,
                                                borderTop: '1px solid rgba(255,255,255,0.06)',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: 14,
                                            }}>
                                                {exp.highlights.map((h, j) => (
                                                    <motion.div
                                                        key={j}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: j * 0.05 }}
                                                        style={{
                                                            display: 'flex',
                                                            gap: 12,
                                                            alignItems: 'start',
                                                            fontSize: '0.9rem',
                                                            lineHeight: 1.5,
                                                            opacity: 0.8,
                                                        }}
                                                    >
                                                        <span style={{ color: exp.color, marginTop: 2, flexShrink: 0 }}>{h.icon}</span>
                                                        <span>{h.text}</span>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    ))}
                </div>
                <style>{`
                  @media (max-width: 600px) {
                    .experience-card-padding { padding: 20px !important; }
                    .experience-header { flex-direction: column; align-items: flex-start !important; gap: 12px; }
                    .experience-toggle { position: absolute; top: 20px; right: 20px; }
                  }
                `}</style>
            </div>
        </SectionWrapper>
    );
}
