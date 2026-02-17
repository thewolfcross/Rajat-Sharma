import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import thanosIcon from '../assets/minimalist-thanos-icon-png-78-dn7gu50nv9qwtcos.webp';

export default function ThanosTrigger({ isActive, toggle }) {
    const [isSnapping, setIsSnapping] = useState(false);

    const handleClick = () => {
        if (!isActive) {
            setIsSnapping(true);
            // Snap sound effect could go here
            setTimeout(() => {
                setIsSnapping(false);
                toggle();
            }, 1000); // Wait for snap animation
        } else {
            // Restore immediately
            toggle();
        }
    };

    return (
        <div className="fixed bottom-6 left-6 z-50 flex flex-col items-center">
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
                <AnimatePresence mode="wait">
                    {!isSnapping ? (
                        <motion.img
                            key="gauntlet"
                            src={thanosIcon}
                            alt="Thanos Mode"
                            className="w-10 h-10 object-contain"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 1.5, opacity: 0, rotate: 20 }}
                            transition={{ duration: 0.3 }}
                        />
                    ) : (
                        <motion.div
                            key="snap"
                            className="w-full h-full bg-white flex items-center justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 0], scale: [1, 1.5, 1] }}
                            transition={{ duration: 0.8 }}
                        >
                            {/* Snap Flash */}
                        </motion.div>
                    )}
                </AnimatePresence>
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
