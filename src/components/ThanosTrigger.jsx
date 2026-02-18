import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import snapVibe from '../assets/snap-vibe.png';

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
        <>
            {/* Interactive Vibe Wallpaper */}
            <AnimatePresence>
                {isActive && (
                    <motion.div
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 0.15, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        transition={{ duration: 2 }}
                        className="fixed inset-0 z-[1] pointer-events-none flex items-center justify-center overflow-hidden"
                    >
                        <motion.img
                            src={snapVibe}
                            alt="Snap Vibe"
                            className="w-[85vw] h-auto object-contain grayscale contrast-125 mix-blend-screen opacity-10"
                            animate={{
                                scale: [1, 1.05, 1],
                                opacity: [0.1, 0.2, 0.1],
                            }}
                            transition={{
                                duration: 10,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

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
                    className="relative group w-24 h-24 rounded-full bg-white/5 backdrop-blur-md border border-white/5 flex items-center justify-center overflow-hidden transition-all duration-500 shadow-xl"
                    whileHover={{ scale: 1.1, borderColor: '#ffd700', backgroundColor: 'rgba(255, 215, 0, 0.05)' }}
                    whileTap={{ scale: 0.9 }}
                    animate={{
                        borderColor: isActive ? '#ffd700' : 'rgba(255,255,255,0.05)',
                        boxShadow: isActive ? '0 0 30px rgba(255, 215, 0, 0.2)' : 'none'
                    }}
                >
                    <motion.img
                        src={snapVibe}
                        alt="Snap"
                        animate={isSnapping ? {
                            scale: [1, 1.3, 0.8, 1],
                            rotate: [0, 20, -20, 0],
                        } : {
                            scale: isActive ? 1.15 : 1,
                            rotate: 0
                        }}
                        className="w-18 h-18 object-contain brightness-110 mix-blend-screen opacity-60 group-hover:opacity-100 transition-opacity"
                    />

                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#ffd700]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>

                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 0.8, y: 0 }}
                    className="mt-3 text-[11px] uppercase font-bold tracking-[0.25em] text-white pointer-events-none drop-shadow-lg"
                >
                    Thanos Snap
                </motion.span>
            </div>
        </>
    );
}
