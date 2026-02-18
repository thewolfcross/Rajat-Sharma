import { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import cursorLogo from '../assets/cursor-logo.png';

export default function CustomCursor({ darkMode }) {
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { stiffness: 400, damping: 35, mass: 0.5 };
    const auraConfig = { stiffness: 200, damping: 30, mass: 1.5 }; // Heavier, delayed feel

    const springX = useSpring(cursorX, springConfig);
    const springY = useSpring(cursorY, springConfig);

    const auraX = useSpring(cursorX, auraConfig);
    const auraY = useSpring(cursorY, auraConfig);

    useEffect(() => {
        const moveMouse = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseDown = () => setIsClicked(true);
        const handleMouseUp = () => setIsClicked(false);

        const handleHover = (e) => {
            const target = e.target;
            const isInteractive =
                target.tagName === 'BUTTON' ||
                target.tagName === 'A' ||
                target.closest('button') ||
                target.closest('a') ||
                window.getComputedStyle(target).cursor === 'pointer';

            setIsHovered(isInteractive);
        };

        window.addEventListener('mousemove', moveMouse);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mouseover', handleHover);

        return () => {
            window.removeEventListener('mousemove', moveMouse);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mouseover', handleHover);
        };
    }, [cursorX, cursorY]);

    return (
        <>
            {/* Trailing Aura - Cinematic Smoke/Glow */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[99998] opacity-20"
                style={{
                    x: auraX,
                    y: auraY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            >
                <motion.div
                    animate={{
                        background: darkMode
                            ? 'radial-gradient(circle, rgba(0, 212, 255, 0.4) 0%, transparent 70%)'
                            : 'radial-gradient(circle, rgba(30, 64, 175, 0.35) 0%, transparent 70%)',
                    }}
                    style={{
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        filter: 'blur(15px)'
                    }}
                />
            </motion.div>

            {/* Main Cursor Hub */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[99999]"
                style={{
                    x: springX,
                    y: springY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            >
                <motion.div
                    animate={{
                        scale: isClicked ? 1.2 : (isHovered ? 1.4 : 1),
                    }}
                    className="relative flex items-center justify-center"
                >
                    {/* Pulsing Focus Ring */}
                    <motion.div
                        className="absolute inset-0 rounded-full border border-white/20"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: isHovered ? [0.2, 0.5, 0.2] : 0,
                            borderColor: darkMode ? 'rgba(0, 212, 255, 0.5)' : 'rgba(30, 64, 175, 0.5)'
                        }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        style={{ width: 44, height: 44, left: '50%', top: '50%', x: '-50%', y: '-50%' }}
                    />

                    {/* Logo Hub */}
                    <div className="relative group">
                        <motion.img
                            src={cursorLogo}
                            alt="Cursor Logo"
                            className="w-8 h-8 object-contain"
                            animate={{
                                filter: darkMode
                                    ? `drop-shadow(0 0 8px rgba(255, 255, 255, ${isHovered ? 0.6 : 0.3}))`
                                    : `drop-shadow(0 0 5px rgba(0, 0, 0, 0.4)) brightness(0.8)`,
                                rotate: isClicked ? -15 : 0
                            }}
                        />

                        {/* High-Brightness Core Dot */}
                        <motion.div
                            className="absolute bg-white rounded-full shadow-[0_0_10px_white]"
                            style={{
                                width: 3,
                                height: 3,
                                left: '50%',
                                top: '50%',
                                x: '-50%',
                                y: '-50%',
                                display: darkMode ? 'block' : 'none'
                            }}
                            animate={{
                                scale: isHovered ? 1.5 : 1,
                                opacity: [0.5, 1, 0.5]
                            }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                        />
                    </div>

                    {/* Enhanced Bloom Layers */}
                    <motion.div
                        className="absolute inset-0 rounded-full"
                        animate={{
                            opacity: isHovered || isClicked ? 0.4 : 0.15,
                            scale: isClicked ? 4 : 2.5,
                            background: darkMode
                                ? 'radial-gradient(circle, rgba(0, 212, 255, 0.2) 0%, transparent 60%)'
                                : 'radial-gradient(circle, rgba(30, 64, 175, 0.15) 0%, transparent 60%)',
                        }}
                        style={{
                            filter: 'blur(10px)',
                            zIndex: -1
                        }}
                    />

                    <motion.div
                        className="absolute inset-0 rounded-full"
                        animate={{
                            opacity: isHovered ? 0.2 : 0,
                            background: darkMode
                                ? 'radial-gradient(circle, rgba(255, 214, 10, 0.15) 0%, transparent 70%)'
                                : 'radial-gradient(circle, rgba(71, 85, 105, 0.1) 0%, transparent 70%)',
                        }}
                        style={{
                            filter: 'blur(20px)',
                            zIndex: -2,
                            width: 100,
                            height: 100,
                            left: '50%', top: '50%', x: '-50%', y: '-50%'
                        }}
                    />

                    {/* Click Interaction Ripple */}
                    <AnimatePresence>
                        {isClicked && (
                            <motion.div
                                initial={{ scale: 0.5, opacity: 0.8 }}
                                animate={{ scale: 3, opacity: 0 }}
                                exit={{ opacity: 0 }}
                                className={`absolute inset-0 rounded-full border-2 ${darkMode ? 'border-cyan-400/50' : 'border-blue-600/40'}`}
                                style={{ width: 40, height: 40, left: '50%', top: '50%', x: '-50%', y: '-50%' }}
                            />
                        )}
                    </AnimatePresence>
                </motion.div>
            </motion.div>
        </>
    );
}
