import { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import cursorLogo from '../assets/cursor-logo.png';

export default function CustomCursor({ darkMode }) {
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { stiffness: 400, damping: 35, mass: 0.5 };
    const springX = useSpring(cursorX, springConfig);
    const springY = useSpring(cursorY, springConfig);

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
                    scale: isClicked ? 1.4 : (isHovered ? 1.6 : 1),
                }}
                transition={{
                    type: "spring",
                    stiffness: 600,
                    damping: 30
                }}
                className="relative flex items-center justify-center p-1"
            >
                {/* Logo Cursor - More Subtle */}
                <motion.img
                    src={cursorLogo}
                    alt="Cursor Logo"
                    className={`w-7 h-7 object-contain ${darkMode ? 'drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]' : 'drop-shadow-[0_0_5px_rgba(0,0,0,0.2)]'}`}
                    animate={{
                        filter: isHovered || isClicked
                            ? (darkMode ? 'brightness(1.5) drop-shadow(0 0 10px rgba(255,215,0,0.5))' : 'brightness(0.8) drop-shadow(0 0 10px rgba(0,163,255,0.5))')
                            : (darkMode ? 'brightness(0.9)' : 'brightness(0.8)')
                    }}
                />

                {/* Subtle Ripple/Pulse on Click - More Refined */}
                <AnimatePresence>
                    {isClicked && (
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0.6 }}
                            animate={{ scale: 3, opacity: 0 }}
                            exit={{ opacity: 0 }}
                            className={`absolute inset-0 rounded-full border border-${darkMode ? 'white/30' : 'black/10'}`}
                        />
                    )}
                </AnimatePresence>

                {/* Magnetic Glow - More Subtle */}
                <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{
                        opacity: isHovered || isClicked ? 0.25 : 0.08,
                        scale: isClicked ? 5 : 3.5
                    }}
                    style={{
                        background: darkMode
                            ? 'radial-gradient(circle, rgba(255,215,0,0.15) 0%, transparent 70%)'
                            : 'radial-gradient(circle, rgba(0,163,255,0.15) 0%, transparent 70%)',
                        filter: 'blur(12px)',
                        zIndex: -1
                    }}
                />
            </motion.div>
        </motion.div>
    );
}
