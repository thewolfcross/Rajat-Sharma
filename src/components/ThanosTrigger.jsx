import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import thanosIcon from '../assets/minimalist-thanos-icon-png-78-dn7gu50nv9qwtcos.webp';

export default function ThanosTrigger({ isActive, toggle }) {
    const [isSnapping, setIsSnapping] = useState(false);

    const handleClick = () => {
        if (!isActive) {
            setIsSnapping(true);

            // Play snap sound
            const audio = new Audio('https://www.soundjay.com/communication/sounds/finger-snap-1.mp3');
            audio.volume = 0.5;
            audio.play().catch(e => console.log("Audio play failed:", e));

            setTimeout(() => {
                setIsSnapping(false);
                toggle();
            }, 800);
        } else {
            toggle();
        }
    };

    return (
        <div className="fixed bottom-6 left-6 z-50 flex flex-col items-center">
            {/* Snap White Flash Overlay */}
            <AnimatePresence>
                {isSnapping && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, times: [0, 0.2, 1] }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            backgroundColor: 'white',
                            zIndex: 100000,
                            pointerEvents: 'none'
                        }}
                    />
                )}
            </AnimatePresence>

            <motion.button
                onClick={handleClick}
                className="relative group w-16 h-16 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center overflow-hidden"
                whileHover={{ scale: 1.1, borderColor: '#ffd700' }}
                whileTap={{ scale: 0.9 }}
                animate={{
                    borderColor: isActive ? '#ffd700' : 'rgba(255,255,255,0.1)',
                    boxShadow: isActive ? '0 0 20px rgba(255, 215, 0, 0.4)' : 'none'
                }}
            >
                <motion.img
                    src={thanosIcon}
                    alt="Thanos Mode"
                    className="w-10 h-10 object-contain"
                    animate={isSnapping ? {
                        scale: [1, 1.4, 0.8, 1],
                        rotate: [0, 15, -15, 0],
                    } : {
                        scale: 1,
                        rotate: 0
                    }}
                    transition={{
                        duration: 0.5,
                        ease: "easeInOut"
                    }}
                />
            </motion.button>
            <motion.span
                className="mt-2 text-[10px] uppercase font-bold tracking-widest text-[#ffd700]"
                animate={{ opacity: isActive ? 1 : 0.5 }}
            >
                {isActive ? "Balanced" : "Thanos Mode"}
            </motion.span>
        </div>
    );
}
