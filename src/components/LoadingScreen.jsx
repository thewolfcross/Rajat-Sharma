import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setShow(false), 2200);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className="loading-screen"
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                >
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                            fontWeight: 700,
                            letterSpacing: '-0.02em',
                        }}
                    >
                        <span className="gradient-text">RS</span>
                    </motion.h1>
                    <div className="loading-bar">
                        <div className="loading-bar-fill" />
                    </div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        transition={{ delay: 0.3 }}
                        style={{
                            fontSize: '0.8rem',
                            color: 'var(--color-dark-muted)',
                            letterSpacing: '3px',
                            textTransform: 'uppercase',
                        }}
                    >
                        Loading Experience
                    </motion.p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
