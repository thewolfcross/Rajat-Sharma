import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ThanosTrigger({ isActive, toggle }) {
    const [isSnapping, setIsSnapping] = useState(false);

    const handleClick = () => {
        if (!isActive) {
            setIsSnapping(true);

            // Play a high-end snap sound or provide haptic/visual feedback
            // Use a reliable public sound or visual flash
            const audio = new Audio('https://www.soundjay.com/communication/sounds/finger-snap-1.mp3');
            audio.volume = 0.4;
            audio.play().catch(() => { });

            setTimeout(() => {
                setIsSnapping(false);
                toggle();
            }, 600);
        } else {
            toggle();
        }
    };

    return (
        <div className="fixed bottom-8 left-8 z-[100] flex flex-col items-center">
            {/* Cinematic Snap Flash */}
            <AnimatePresence>
                {isSnapping && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, times: [0, 0.2, 1] }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            backgroundColor: 'white',
                            zIndex: 99999,
                            pointerEvents: 'none'
                        }}
                    />
                )}
            </AnimatePresence>

            <motion.button
                onClick={handleClick}
                className="relative group w-14 h-14 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.1, borderColor: '#ffd700' }}
                whileTap={{ scale: 0.9 }}
                animate={{
                    borderColor: isActive ? '#ffd700' : 'rgba(255,255,255,0.1)',
                    boxShadow: isActive ? '0 0 20px rgba(255, 215, 0, 0.3)' : 'none'
                }}
            >
                {/* Minimalist Snap Icon (SVG) */}
                <motion.div
                    animate={isSnapping ? {
                        scale: [1, 1.3, 0.8, 1],
                        rotate: [0, 20, -20, 0],
                    } : {
                        scale: 1,
                        rotate: 0
                    }}
                    className="text-2xl"
                >
                    <span role="img" aria-label="snap">🫰</span>
                </motion.div>

                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#ffd700]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>

            <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.6, y: 0 }}
                className="mt-2 text-[10px] uppercase font-bold tracking-[0.2em] text-white/50 pointer-events-none"
            >
                {isActive ? "Balanced" : "The Snap"}
            </motion.span>
        </div>
    );
}
