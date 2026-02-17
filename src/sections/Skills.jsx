import { motion } from 'framer-motion';
import SectionWrapper from '../components/SectionWrapper';
import { useInView } from 'react-intersection-observer';

const skillCategories = [
    {
        title: 'Strategy',
        color: '#ffc300',
        skills: [
            { name: 'Market Research', level: 95 },
            { name: 'Competitive Intelligence', level: 90 },
            { name: 'Brand Positioning', level: 88 },
            { name: 'Market Expansion', level: 92 },
        ],
    },
    {
        title: 'Marketing',
        color: '#ffd60a',
        skills: [
            { name: 'Multi-channel Campaigns', level: 90 },
            { name: 'Lead Generation', level: 85 },
            { name: 'Email Marketing', level: 82 },
            { name: 'LinkedIn Strategy', level: 88 },
        ],
    },
    {
        title: 'Analytics',
        color: '#ff9f43',
        skills: [
            { name: 'Google Analytics', level: 80 },
            { name: 'Conversion Optimization', level: 85 },
            { name: 'Pipeline Forecasting', level: 87 },
            { name: 'Dashboard Reporting', level: 83 },
        ],
    },
];

function SkillBar({ name, level, color, delay }) {
    const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

    return (
        <div ref={ref} style={{ marginBottom: 20 }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 8,
                fontSize: '0.85rem',
            }}>
                <span style={{ fontWeight: 500 }}>{name}</span>
                <span style={{ color, fontWeight: 600 }}>{level}%</span>
            </div>
            <div className="skill-bar-bg">
                <motion.div
                    className="skill-bar-fill"
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${level}%` } : {}}
                    transition={{ duration: 1.2, delay: delay * 0.1, ease: [0.4, 0, 0.2, 1] }}
                    style={{
                        background: `linear-gradient(90deg, ${color}, ${color}80)`,
                    }}
                />
            </div>
        </div>
    );
}

export default function Skills() {
    return (
        <SectionWrapper id="skills">
            <div className="section-container">
                <div style={{ textAlign: 'center', marginBottom: 64 }}>
                    <span className="section-label" style={{ justifyContent: 'center' }}>Skills</span>
                    <h2 className="section-title">
                        Core <span className="gradient-text">competencies.</span>
                    </h2>
                    <p className="section-subtitle" style={{ margin: '0 auto' }}>
                        The strategic toolkit behind every growth initiative.
                    </p>
                </div>

                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: 32,
                    }}
                    className="skills-grid"
                >
                    {skillCategories.map((cat, ci) => (
                        <motion.div
                            key={ci}
                            className="glass-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: ci * 0.15 }}
                            style={{ padding: '32px 28px', position: 'relative', overflow: 'hidden' }}
                        >
                            <div style={{
                                position: 'absolute',
                                top: 0, left: 0, right: 0,
                                height: 3,
                                background: `linear-gradient(90deg, ${cat.color}, transparent)`,
                            }} />
                            <h3 style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: '1.1rem',
                                fontWeight: 600,
                                marginBottom: 28,
                                color: cat.color,
                            }}>
                                {cat.title}
                            </h3>
                            {cat.skills.map((skill, si) => (
                                <SkillBar
                                    key={si}
                                    name={skill.name}
                                    level={skill.level}
                                    color={cat.color}
                                    delay={si + ci * 4}
                                />
                            ))}
                        </motion.div>
                    ))}
                </div>

                <style>{`
          @media (max-width: 768px) {
            .skills-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
            </div>
        </SectionWrapper>
    );
}
