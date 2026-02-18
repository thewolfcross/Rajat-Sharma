import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiX, FiBriefcase, FiMapPin, FiAward } from 'react-icons/fi';

const jobs = [
    { id: 1, title: "Marketing Strategist", company: "Wayne Enterprises", location: "Gotham City", salary: "₹85 Cr+ Impact", icon: <FiBriefcase /> },
    { id: 2, title: "Growth Director", company: "Gada Electronics", location: "Mumbai / Hybrid", salary: "Top Tier", icon: <FiAward /> },
    { id: 3, title: "Operations Head", company: "Arkham Solutions", location: "Remote", salary: "High Fidelity", icon: <FiMapPin /> },
    { id: 4, title: "Revenue Engine Lead", company: "Steletoulogo Corp", location: "Global / LATAM", salary: "Strategic", icon: <FiAward /> },
];

export default function BatmanJobLoader({ onComplete }) {
    const targetScore = jobs.length;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [accepted, setAccepted] = useState(0);
    const [swipeDir, setSwipeDir] = useState(null);

    const handleSwipe = (direction) => {
        setSwipeDir(direction);
        setTimeout(() => {
            if (direction === 'right') setAccepted(prev => prev + 1);
            if (currentIndex < jobs.length - 1) {
                setCurrentIndex(prev => prev + 1);
            } else {
                // If we finished all 4, and let's say we need at least some accepted
                if (accepted >= 1 || direction === 'right') {
                    // Unlock
                }
            }
            setSwipeDir(null);
        }, 300);
    };

    useEffect(() => {
        if (accepted >= 4) {
            setTimeout(onComplete, 800);
        }
    }, [accepted]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(30px)' }}
            className="batman-job-loader"
            style={{
                position: 'fixed', inset: 0, zIndex: 10000,
                background: '#050505',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Space Grotesk, sans-serif'
            }}
        >
            {/* Batcave Atmosphere */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(circle at 50% 50%, rgba(0, 212, 255, 0.05) 0%, transparent 70%)',
                opacity: 0.5, pointerEvents: 'none'
            }} />

            <div style={{ textAlign: 'center', marginBottom: 30, zIndex: 1, pointerEvents: 'none' }}>
                <h2 style={{ color: '#00d4ff', letterSpacing: '4px', textTransform: 'uppercase', fontSize: '0.9rem', marginBottom: 10 }}>
                    Protocol: Career Hunt
                </h2>
                <h1 style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: 800 }}>
                    HE IS LOOKING FOR A NEW MISSION...
                </h1>
                <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: 8 }}>
                    Accept {jobs.length} roles to deploy the portfolio.
                </p>
            </div>

            {/* iPhone Frame */}
            <motion.div
                style={{
                    width: 300, height: 600,
                    background: '#1a1a1a',
                    borderRadius: 40,
                    border: '8px solid #333',
                    position: 'relative',
                    boxShadow: '0 0 50px rgba(0,212,255,0.2)',
                    overflow: 'hidden',
                    display: 'flex', flexDirection: 'column'
                }}
            >
                {/* iPhone Notch */}
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 120, height: 25, background: '#333', borderBottomLeftRadius: 15, borderBottomRightRadius: 15, zIndex: 10 }} />

                {/* Bat-LinkedIn App Bar */}
                <div style={{ height: 60, background: '#000', display: 'flex', alignItems: 'center', padding: '0 20px', paddingTop: 20 }}>
                    <div style={{ color: '#00d4ff', fontWeight: 900, fontSize: '1.2rem' }}>Bat-In</div>
                </div>

                <div style={{ flex: 1, padding: 20, display: 'flex', flexDirection: 'column', gap: 20, background: '#111' }}>
                    <AnimatePresence mode="wait">
                        {currentIndex < jobs.length ? (
                            <motion.div
                                key={jobs[currentIndex].id}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{
                                    opacity: 0,
                                    x: swipeDir === 'right' ? 200 : swipeDir === 'left' ? -200 : 0,
                                    rotate: swipeDir === 'right' ? 10 : swipeDir === 'left' ? -10 : 0
                                }}
                                style={{
                                    background: '#1e1e1e',
                                    borderRadius: 20,
                                    padding: 24,
                                    height: 350,
                                    display: 'flex', flexDirection: 'column', justifyContent: 'center',
                                    border: '1px solid rgba(0, 212, 255, 0.1)',
                                    position: 'relative'
                                }}
                            >
                                <div style={{ fontSize: '3rem', color: '#00d4ff', marginBottom: 20 }}>
                                    {jobs[currentIndex].icon}
                                </div>
                                <h3 style={{ color: '#fff', fontSize: '1.4rem', fontWeight: 700, marginBottom: 8 }}>
                                    {jobs[currentIndex].title}
                                </h3>
                                <p style={{ color: '#00d4ff', fontWeight: 600, marginBottom: 4 }}>
                                    {jobs[currentIndex].company}
                                </p>
                                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', marginBottom: 15 }}>
                                    <FiMapPin style={{ display: 'inline', marginRight: 4 }} /> {jobs[currentIndex].location}
                                </p>
                                <div style={{
                                    background: 'rgba(0,212,255,0.1)',
                                    padding: '8px 12px',
                                    borderRadius: 8,
                                    color: '#00d4ff',
                                    fontWeight: 700,
                                    fontSize: '1.1rem'
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
                                <div style={{ fontSize: '4rem', color: '#ff9f43', marginBottom: 20 }}>🎯</div>
                                <h3 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 700 }}>MISSIONS ACCEPTED</h3>
                                <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: 10 }}>Accessing Secure Portfolio...</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {currentIndex < jobs.length && (
                        <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 'auto', paddingBottom: 20 }}>
                            <button
                                onClick={() => handleSwipe('left')}
                                style={{
                                    width: 60, height: 60, borderRadius: '50%', border: '2px solid #ff4b2b',
                                    background: 'transparent', color: '#ff4b2b', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    cursor: 'pointer', transition: 'all 0.2s'
                                }}
                                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,75,43,0.1)'}
                                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                            >
                                <FiX size={30} />
                            </button>
                            <button
                                onClick={() => handleSwipe('right')}
                                style={{
                                    width: 60, height: 60, borderRadius: '50%', border: '2px solid #00d4ff',
                                    background: 'transparent', color: '#00d4ff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    cursor: 'pointer', transition: 'all 0.2s'
                                }}
                                onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,212,255,0.1)'}
                                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                            >
                                <FiCheck size={30} />
                            </button>
                        </div>
                    )}
                </div>

                {/* iPhone Home Bar */}
                <div style={{ height: 20, background: '#111', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ width: 100, height: 5, background: '#333', borderRadius: 5 }} />
                </div>
            </motion.div>

            <div style={{ marginTop: 40, color: '#00d4ff', fontWeight: 900, fontSize: '1.2rem', display: 'flex', gap: 10 }}>
                {Array.from({ length: targetScore }).map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0.3, scale: 0.8 }}
                        animate={{
                            opacity: i < accepted ? 1 : 0.3,
                            scale: i < accepted ? 1.2 : 1,
                            background: i < accepted ? '#00d4ff' : 'transparent',
                            border: '2px solid #00d4ff'
                        }}
                        style={{ width: 12, height: 12, borderRadius: '50%' }}
                    />
                ))}
            </div>
        </motion.div>
    );
}
