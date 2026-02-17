import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import jethaIcon from '../assets/16277159-08f2-44c0-b3b7-39162de53f71.png';

export default function JethaTrigger({ isActive, toggle }) {
    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center">
            <motion.button
                onClick={toggle}
                className="relative group w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center overflow-hidden"
                whileHover={{ scale: 1.1, borderColor: '#ff9f43', rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                animate={{
                    borderColor: isActive ? '#ff9f43' : 'rgba(255,255,255,0.2)',
                    boxShadow: isActive ? '0 0 20px rgba(255, 159, 67, 0.4)' : 'none',
                    y: isActive ? [0, -5, 0] : 0
                }}
                transition={{ y: { repeat: isActive ? Infinity : 0, duration: 0.5 } }} // Bouncing when active (Jetha style)
            >
                <img
                    src={jethaIcon}
                    alt="Jetha Lal Mode"
                    className="w-full h-full object-cover"
                />
            </motion.button>
            <motion.span
                className="mt-2 text-[10px] uppercase font-bold tracking-widest text-[#ff9f43]"
                animate={{ opacity: isActive ? 1 : 0.5 }}
            >
                {isActive ? "Gada Electronics" : "Jetha Mode"}
            </motion.span>
        </div>
    );
}
