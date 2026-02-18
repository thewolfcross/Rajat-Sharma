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
                    scale: isClicked ? 1.5 : (isHovered ? 1.8 : 1),
                }}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 25
                }}
                className="relative flex items-center justify-center p-2"
            >
                {/* Logo Cursor */}
                <motion.img
                    src={cursorLogo}
                    alt="Cursor Logo"
                    className={`w-10 h-10 object-contain ${darkMode ? 'drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]' : 'drop-shadow-[0_0_8px_rgba(0,0,0,0.4)]'}`}
                    animate={{
                        filter: isHovered || isClicked
                            ? (darkMode ? 'brightness(1.5) drop-shadow(0 0 12px rgba(255,215,0,0.6))' : 'brightness(0.8) drop-shadow(0 0 12px rgba(0,163,255,0.6))')
                            : (darkMode ? 'brightness(1)' : 'brightness(0.9)')
                    }}
                />

                {/* Subtle Ripple/Pulse on Click */}
                <AnimatePresence>
                    {isClicked && (
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0.8 }}
                            animate={{ scale: 2.5, opacity: 0 }}
                            exit={{ opacity: 0 }}
                            className={`absolute inset-0 rounded-full border-2 ${darkMode ? 'border-white/40' : 'border-black/20'}`}
                        />
                    )}
                </AnimatePresence>

                {/* Magnetic Glow */}
                <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{
                        opacity: isHovered || isClicked ? 0.3 : 0.1,
                        scale: isClicked ? 6 : 4
                    }}
                    style={{
                        background: darkMode
                            ? 'radial-gradient(circle, rgba(255,215,0,0.2) 0%, transparent 70%)'
                            : 'radial-gradient(circle, rgba(0,163,255,0.2) 0%, transparent 70%)',
                        filter: 'blur(15px)',
                        zIndex: -1
                    }}
                />
            </motion.div>
        </motion.div>
    );
}
