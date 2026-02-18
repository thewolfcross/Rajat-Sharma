import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../components/SectionWrapper';
import { FiArrowRight, FiX, FiTarget, FiTrendingUp, FiCheckCircle } from 'react-icons/fi';

const caseStudies = [
    {
        title: 'Breaking into LATAM Markets',
        tag: 'Market Expansion',
        color: '#ffc300',
        metric: '2 New Markets',
        problem: 'Sekhmet Pharmaceutical had zero presence in Latin American pharmaceutical markets. The region represents a high-growth opportunity but comes with complex regulatory environments and entrenched competitors.',
        strategy: 'Conducted deep-dive competitor intelligence across 8 LATAM countries. Identified Cuba and Guatemala as highest-potential markets with favorable regulatory windows and underserved therapeutic segments.',
        execution: 'Built market entry playbooks for each territory. Established local distributor partnerships, negotiated favorable trade terms, and created region-specific positioning strategies. Led cross-functional coordination between regulatory, supply chain, and commercial teams.',
        outcome: 'Successfully opened Cuba and Guatemala markets as first-mover. Established sustainable revenue pipelines and a repeatable expansion framework now being used for other LATAM territories.',
        metrics: ['2 Markets Opened', '₹85Cr+ Pipeline Created', 'First-Mover Advantage', 'Replicable Framework Built'],
    },
    {
        title: '₹4Cr Rapid Execution Deal',
        tag: 'Sales Excellence',
        color: '#ffd60a',
        metric: '₹4Cr in 4.5 Days',
        problem: 'A time-sensitive pharmaceutical bulk order opportunity emerged from a LATAM distributor with a 5-day decision window. Traditional sales cycles in this segment typically take 3-6 weeks.',
        strategy: 'Immediately assembled a rapid-response team. Leveraged existing market intelligence to pre-build the value proposition. Identified the buyer\'s critical pain points (supply reliability, pricing competitiveness, regulatory compliance) and built the pitch around solving all three.',
        execution: 'Day 1-2: Customized proposal with competitive pricing analysis. Day 3: Virtual presentation with CEO-level decision makers. Day 4: Negotiation and terms alignment. Day 4.5: Contract signed and order confirmed.',
        outcome: 'Closed ₹4Cr bulk order in just 4.5 days — a company record for deal velocity in this product category. Established a template for rapid deal execution.',
        metrics: ['₹4Cr Deal Value', '4.5 Days Close Time', 'Company Record Set', 'Process Template Created'],
    },
    {
        title: 'Pipeline Growth Strategy',
        tag: 'Revenue Acceleration',
        color: '#ff9f43',
        metric: '₹50Cr Added',
        problem: 'The business development pipeline was stagnant with limited qualified leads and a long conversion cycle. Revenue growth targets required a 3x increase in pipeline value within 6 months.',
        strategy: 'Designed a multi-channel pipeline growth engine combining inbound lead generation, strategic partnership outreach, and data-driven territory prioritization. Built a scoring model to prioritize high-conversion opportunities.',
        execution: 'Implemented LinkedIn-driven thought leadership campaigns. Created automated lead nurturing sequences. Built a partnership network spanning 5 LATAM countries. Introduced weekly pipeline review cadence with CRM dashboards for real-time visibility.',
        outcome: 'Added ₹50Cr to the active pipeline within the target timeframe. Conversion rates improved by 15%, and average deal cycle time reduced by 20%.',
        metrics: ['₹50Cr Pipeline Added', '15% Better Conversion', '20% Faster Deals', '5 Country Network'],
    },
];

export default function CaseStudies({ darkMode }) {
    const [selected, setSelected] = useState(null);

    return (
        <SectionWrapper id="casestudies">
            <div className="section-container">
                <div style={{ textAlign: 'center', marginBottom: 64 }}>
                    <span className="section-label" style={{ justifyContent: 'center' }}>Case Studies</span>
                    <h2 className="section-title">
                        Strategy in <span className="gradient-text">action.</span>
                    </h2>
                    <p className="section-subtitle" style={{ margin: '0 auto' }}>
                        Deep dives into three transformative business development initiatives.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: 24,
                }}
                    className="cases-grid"
                >
                    {caseStudies.map((cs, i) => (
                        <motion.div
                            key={i}
                            className="glass-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15 }}
                            whileHover={{ y: -4, transition: { duration: 0.2 } }}
                            style={{
                                padding: '32px 28px',
                                cursor: 'pointer',
                                position: 'relative',
                                overflow: 'hidden',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                            onClick={() => setSelected(i)}
                        >
                            <div style={{
                                position: 'absolute',
                                top: 0, left: 0, right: 0,
                                height: 3,
                                background: `linear-gradient(90deg, ${cs.color}, transparent)`,
                            }} />

                            <span style={{
                                display: 'inline-block',
                                fontSize: '0.7rem',
                                fontWeight: 600,
                                letterSpacing: '0.08em',
                                textTransform: 'uppercase',
                                color: cs.color,
                                padding: '4px 10px',
                                borderRadius: 6,
                                background: `${cs.color}12`,
                                marginBottom: 16,
                                alignSelf: 'flex-start',
                            }}>
                                {cs.tag}
                            </span>

                            <h3 style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: '1.2rem',
                                fontWeight: 600,
                                marginBottom: 12,
                                lineHeight: 1.3,
                            }}>
                                {cs.title}
                            </h3>

                            <div style={{
                                fontSize: '1.6rem',
                                fontFamily: 'var(--font-heading)',
                                fontWeight: 700,
                                color: cs.color,
                                marginBottom: 20,
                                marginTop: 'auto',
                            }}>
                                {cs.metric}
                            </div>

                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 6,
                                fontSize: '0.85rem',
                                color: cs.color,
                                fontWeight: 500,
                            }}>
                                Read Case Study <FiArrowRight size={14} />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Case Study Modal */}
                <AnimatePresence>
                    {selected !== null && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{
                                position: 'fixed',
                                inset: 0,
                                zIndex: 2000,
                                background: 'rgba(0,0,0,0.7)',
                                backdropFilter: 'blur(8px)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: 24,
                            }}
                            onClick={() => setSelected(null)}
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                transition={{ duration: 0.3 }}
                                onClick={(e) => e.stopPropagation()}
                                style={{
                                    background: darkMode ? 'var(--color-dark-surface)' : 'var(--color-light-bg)',
                                    borderRadius: 20,
                                    border: `1px solid ${caseStudies[selected].color}${darkMode ? '20' : '40'}`,
                                    maxWidth: 700,
                                    width: '100%',
                                    maxHeight: '85vh',
                                    overflow: 'auto',
                                    padding: '40px 36px',
                                    position: 'relative',
                                }}
                                className="modal-content"
                            >
                                <style>{`
                                    .modal-content { padding: 40px 36px; }
                                    @media (max-width: 600px) {
                                        .modal-content { padding: 24px 20px !important; }
                                    }
                                `}</style>
                                <button
                                    onClick={() => setSelected(null)}
                                    style={{
                                        position: 'absolute',
                                        top: 16,
                                        right: 16,
                                        background: 'none',
                                        border: 'none',
                                        color: 'var(--color-dark-muted)',
                                        cursor: 'pointer',
                                        padding: 8,
                                    }}
                                >
                                    <FiX size={20} />
                                </button>

                                <span style={{
                                    display: 'inline-block',
                                    fontSize: '0.7rem',
                                    fontWeight: 600,
                                    letterSpacing: '0.08em',
                                    textTransform: 'uppercase',
                                    color: caseStudies[selected].color,
                                    padding: '4px 10px',
                                    borderRadius: 6,
                                    background: `${caseStudies[selected].color}12`,
                                    marginBottom: 12,
                                }}>
                                    {caseStudies[selected].tag}
                                </span>

                                <h2 style={{
                                    fontFamily: 'var(--font-heading)',
                                    fontSize: '1.6rem',
                                    fontWeight: 700,
                                    marginBottom: 32,
                                    lineHeight: 1.3,
                                }}>
                                    {caseStudies[selected].title}
                                </h2>

                                {[
                                    { icon: <FiTarget size={18} />, title: 'Problem', content: caseStudies[selected].problem },
                                    { icon: <FiTrendingUp size={18} />, title: 'Strategy', content: caseStudies[selected].strategy },
                                    { icon: <FiCheckCircle size={18} />, title: 'Execution', content: caseStudies[selected].execution },
                                    { icon: <FiCheckCircle size={18} />, title: 'Outcome', content: caseStudies[selected].outcome },
                                ].map((section, j) => (
                                    <motion.div
                                        key={j}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: j * 0.1 }}
                                        style={{ marginBottom: 28 }}
                                    >
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 8,
                                            color: caseStudies[selected].color,
                                            fontSize: '0.85rem',
                                            fontWeight: 600,
                                            letterSpacing: '0.05em',
                                            textTransform: 'uppercase',
                                            marginBottom: 8,
                                        }}>
                                            {section.icon} {section.title}
                                        </div>
                                        <p style={{ fontSize: '0.92rem', lineHeight: 1.7, opacity: darkMode ? 0.8 : 0.95, color: darkMode ? 'inherit' : '#334155' }}>
                                            {section.content}
                                        </p>
                                    </motion.div>
                                ))}

                                {/* Key Metrics */}
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(2, 1fr)',
                                    gap: 12,
                                    marginTop: 16,
                                }}>
                                    {caseStudies[selected].metrics.map((m, k) => (
                                        <div
                                            key={k}
                                            style={{
                                                padding: '14px 16px',
                                                borderRadius: 10,
                                                background: darkMode ? `${caseStudies[selected].color}08` : `${caseStudies[selected].color}12`,
                                                border: `1px solid ${caseStudies[selected].color}${darkMode ? '15' : '30'}`,
                                                fontSize: '0.85rem',
                                                fontWeight: 600,
                                                color: caseStudies[selected].color,
                                                textAlign: 'center',
                                            }}
                                        >
                                            {m}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <style>{`
          @media (max-width: 768px) {
            .cases-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
            </div>
        </SectionWrapper>
    );
}
