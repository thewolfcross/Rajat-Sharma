import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiX, FiBriefcase, FiMapPin, FiAward } from 'react-icons/fi';

const jobs = [
    { id: 1, title: "Marketing Strategist", company: "Wayne Enterprises", location: "Gotham City", salary: "₹85 Cr+ Impact", icon: <FiBriefcase /> },
    { id: 2, title: "Growth Director", company: "Gada Electronics", location: "Mumbai / Hybrid", salary: "Top Tier", icon: <FiAward /> },
    { id: 3, title: "Operations Head", company: "Arkham Solutions", location: "Remote", salary: "High Fidelity", icon: <FiMapPin /> },
    { id: 4, title: "Revenue Engine Lead", company: "Steletoulogo Corp", location: "Global / LATAM", salary: "Strategic", icon: <FiAward /> },
];

export default function PortfolioLoader({ onComplete }) {
    const targetScore = jobs.length;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [accepted, setAccepted] = useState(0);
    const [swipeDir, setSwipeDir] = useState(null);

    const handleSwipe = (direction) => {
        setSwipeDir(direction);
        setTimeout(() => {
            if (direction === 'right') setAccepted(prev => prev + 1);
            setCurrentIndex(prev => prev + 1);
            setSwipeDir(null);
        }, 300);
    };

    useEffect(() => {
        if (currentIndex === jobs.length) {
            setTimeout(onComplete, 1500); // Give time to see "MATCHES ACCEPTED"
        }
    }, [currentIndex, onComplete]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(30px)' }}
            className="portfolio-loader"
            style={{
                position: 'fixed', inset: 0, zIndex: 10000,
                background: '#020205',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Space Grotesk, sans-serif'
            }}
        >
            {/* Elegant Atmosphere */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(circle at 50% 50%, rgba(0, 212, 255, 0.03) 0%, transparent 70%)',
                opacity: 0.5, pointerEvents: 'none'
            }} />

            <div style={{ textAlign: 'center', marginBottom: 30, zIndex: 1, pointerEvents: 'none' }}>
                <h2 style={{ color: '#00d4ff', letterSpacing: '4px', textTransform: 'uppercase', fontSize: '0.8rem', marginBottom: 10, opacity: 0.8 }}>
                    System Status: Reviewing Opportunities
                </h2>
                <h1 style={{ color: '#ffffff', fontSize: '1.4rem', fontWeight: 800 }}>
                    FINDING THE PERFECT MATCH...
                </h1>
                <p style={{ color: 'rgba(255,255,255,0.4)', marginTop: 8, fontSize: '0.9rem' }}>
                    Match with {jobs.length} opportunities to continue.
                </p>
            </div>

            {/* Smart Phone Frame */}
            <motion.div
                style={{
                    width: 280, height: 560,
                    background: '#0d0d0d',
                    borderRadius: 40,
                    border: '1px solid rgba(255,255,255,0.1)',
                    position: 'relative',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                    overflow: 'hidden',
                    display: 'flex', flexDirection: 'column'
                }}
            >
                {/* iPhone Notch */}
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 100, height: 20, background: '#1a1a1a', borderBottomLeftRadius: 12, borderBottomRightRadius: 12, zIndex: 10 }} />

                {/* Professional App Bar */}
                <div style={{ height: 50, background: '#000', display: 'flex', alignItems: 'center', padding: '0 20px', paddingTop: 15 }}>
                    <div style={{ color: '#fff', fontWeight: 900, fontSize: '1.1rem', letterSpacing: '1px' }}>HIRE-IN</div>
                </div>

                <div style={{ flex: 1, padding: 15, display: 'flex', flexDirection: 'column', gap: 15, background: '#080808' }}>
                    <AnimatePresence mode="wait">
                        {currentIndex < jobs.length ? (
                            <motion.div
                                key={jobs[currentIndex].id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{
                                    opacity: 0,
                                    x: swipeDir === 'right' ? 200 : swipeDir === 'left' ? -200 : 0,
                                    rotate: swipeDir === 'right' ? 10 : swipeDir === 'left' ? -10 : 0
                                }}
                                style={{
                                    background: '#121212',
                                    borderRadius: 16,
                                    padding: 20,
                                    height: 320,
                                    display: 'flex', flexDirection: 'column', justifyContent: 'center',
                                    border: '1px solid rgba(255, 255, 255, 0.05)',
                                    position: 'relative'
                                }}
                            >
                                <div style={{ fontSize: '2.5rem', color: '#00d4ff', marginBottom: 15 }}>
                                    {jobs[currentIndex].icon}
                                </div>
                                <h3 style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 700, marginBottom: 6 }}>
                                    {jobs[currentIndex].title}
                                </h3>
                                <p style={{ color: '#00d4ff', fontWeight: 600, marginBottom: 4, fontSize: '0.9rem' }}>
                                    {jobs[currentIndex].company}
                                </p>
                                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', marginBottom: 15 }}>
                                    <FiMapPin style={{ display: 'inline', marginRight: 4 }} /> {jobs[currentIndex].location}
                                </p>
                                <div style={{
                                    background: 'rgba(0,212,255,0.05)',
                                    padding: '6px 10px',
                                    borderRadius: 6,
                                    color: '#00d4ff',
                                    fontWeight: 700,
                                    fontSize: '1rem',
                                    textAlign: 'center'
                                }}>
                                    {jobs[currentIndex].salary}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}
                            >
                                <div style={{ fontSize: '3rem', color: '#00d4ff', marginBottom: 15 }}>✅</div>
                                <h3 style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 700 }}>MATCHES ACCEPTED</h3>
                                <p style={{ color: 'rgba(255,255,255,0.4)', marginTop: 8, fontSize: '0.9rem' }}>Transitioning to Profile...</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {currentIndex < jobs.length && (
                        <div style={{ display: 'flex', justifyContent: 'center', gap: 15, marginTop: 'auto', paddingBottom: 15 }}>
                            <button
                                onClick={() => handleSwipe('left')}
                                style={{
                                    width: 50, height: 50, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)',
                                    background: 'rgba(255,255,255,0.02)', color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    cursor: 'pointer', transition: 'all 0.2s'
                                }}
                                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#ff4b2b'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
                            >
                                <FiX size={24} />
                            </button>
                            <button
                                onClick={() => handleSwipe('right')}
                                style={{
                                    width: 50, height: 50, borderRadius: '50%', border: '1px solid rgba(0,212,255,0.3)',
                                    background: 'rgba(0,212,255,0.02)', color: '#00d4ff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    cursor: 'pointer', transition: 'all 0.2s'
                                }}
                                onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,212,255,0.05)'}
                                onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,212,255,0.02)'}
                            >
                                <FiCheck size={24} />
                            </button>
                        </div>
                    )}
                </div>

                {/* iPhone Home Bar */}
                <div style={{ height: 15, background: '#000', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ width: 80, height: 4, background: '#333', borderRadius: 2 }} />
                </div>
            </motion.div>

            <div style={{ marginTop: 30, display: 'flex', gap: 8 }}>
                {Array.from({ length: targetScore }).map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            opacity: i < accepted ? 1 : 0.2,
                            scale: i < accepted ? 1.1 : 1,
                            background: i < accepted ? '#00d4ff' : 'rgba(255,255,255,1)',
                        }}
                        style={{ width: 8, height: 8, borderRadius: '50%' }}
                    />
                ))}
            </div>
        </motion.div>
    );
}
