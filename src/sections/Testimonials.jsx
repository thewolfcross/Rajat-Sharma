import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../components/SectionWrapper';
import { FiAward, FiStar, FiMic } from 'react-icons/fi';

const testimonials = [
    {
        icon: <FiAward size={24} />,
        title: 'CEO Recognition',
        source: 'Sekhmet Pharmaceutical',
        quote: 'Rajat demonstrated exceptional strategic acumen in opening new LATAM markets. His ability to combine market intelligence with rapid execution sets him apart as a key contributor to our international growth.',
        color: '#ffc300',
    },
    {
        icon: <FiMic size={24} />,
        title: 'Best Speaker Award',
        source: 'ICFAI Business School',
        quote: 'Awarded "Best Speaker" at ICFAI debate for contextual clarity, confident delivery, and audience engagement skills — a testament to strong communication and persuasion capabilities.',
        color: '#ffd60a',
    },
    {
        icon: <FiStar size={24} />,
        title: 'CEO Recognition',
        source: 'Snitch — Internship Phase',
        quote: 'During the internship phase, Rajat showed remarkable initiative and business development skills that earned direct recognition from the CEO. His strategic thinking was evident from day one.',
        color: '#ff9f43',
    },
];

export default function Testimonials() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <SectionWrapper id="testimonials">
            <div className="section-container">
                <div style={{ textAlign: 'center', marginBottom: 64 }}>
                    <span className="section-label" style={{ justifyContent: 'center' }}>Recognition</span>
                    <h2 className="section-title">
                        Trusted by <span className="gradient-text">leaders.</span>
                    </h2>
                </div>

                <div style={{ maxWidth: 700, margin: '0 auto', position: 'relative', minHeight: 280 }}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                            className="glass-card"
                            style={{
                                padding: '40px 36px',
                                textAlign: 'center',
                                position: 'relative',
                                overflow: 'hidden',
                            }}
                        >
                            <div style={{
                                position: 'absolute',
                                top: 0, left: 0, right: 0,
                                height: 3,
                                background: `linear-gradient(90deg, transparent, ${testimonials[current].color}, transparent)`,
                            }} />

                            <div style={{
                                width: 56, height: 56,
                                borderRadius: 16,
                                background: `${testimonials[current].color}12`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: testimonials[current].color,
                                margin: '0 auto 24px',
                            }}>
                                {testimonials[current].icon}
                            </div>

                            <h3 style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: '1.2rem',
                                fontWeight: 600,
                                marginBottom: 4,
                            }}>
                                {testimonials[current].title}
                            </h3>
                            <p style={{
                                fontSize: '0.8rem',
                                color: testimonials[current].color,
                                fontWeight: 500,
                                marginBottom: 20,
                            }}>
                                {testimonials[current].source}
                            </p>
                            <p style={{
                                fontSize: '1rem',
                                lineHeight: 1.8,
                                opacity: 0.7,
                                fontStyle: 'italic',
                                maxWidth: 550,
                                margin: '0 auto',
                            }}>
                                "{testimonials[current].quote}"
                            </p>
                        </motion.div>
                    </AnimatePresence>

                    {/* Carousel dots */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 8,
                        marginTop: 24,
                    }}>
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                className={`carousel-dot ${i === current ? 'active' : ''}`}
                                onClick={() => setCurrent(i)}
                                aria-label={`Go to testimonial ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}
