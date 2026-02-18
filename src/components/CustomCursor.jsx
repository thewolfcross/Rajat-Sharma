import { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';
import logoImg from '../assets/hero-logo.png';

export default function CustomCursor({ darkMode }) {
    const [isHovered, setIsHovered] = useState(false);
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { stiffness: 250, damping: 25, mass: 0.5 };
    const springX = useSpring(cursorX, springConfig);
    const springY = useSpring(cursorY, springConfig);

    const [rotation, setRotation] = useState(0);
    const lastPos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const moveMouse = (e) => {
            const { clientX, clientY } = e;
            cursorX.set(clientX);
            cursorY.set(clientY);

            // Calculate rotation based on velocity
            const deltaX = clientX - lastPos.current.x;
            const deltaY = clientY - lastPos.current.y;
            const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

            // Only update rotation if moving significantly to avoid flickering
            if (Math.abs(deltaX) > 1 || Math.abs(deltaY) > 1) {
                setRotation(angle);
            }

            lastPos.current = { x: clientX, y: clientY };
        };

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
        window.addEventListener('mouseover', handleHover);

        return () => {
            window.removeEventListener('mousemove', moveMouse);
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
                    scale: isHovered ? 1.5 : 1,
                    rotate: rotation,
                }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                }}
                className="relative"
            >
                <img
                    src={logoImg}
                    alt="Custom Cursor"
                    style={{
                        width: '32px',
                        height: '32px',
                        filter: darkMode
                            ? `drop-shadow(0 0 8px rgba(0, 212, 255, 0.6)) invert(1) brightness(1.2)`
                            : `drop-shadow(0 0 8px rgba(0, 0, 0, 0.2))`,
                        objectFit: 'contain'
                    }}
                />

                {/* Trail Glow */}
                <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{
                        opacity: isHovered ? [0.2, 0.5, 0.2] : 0,
                    }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    style={{
                        background: 'radial-gradient(circle, rgba(0,212,255,0.4) 0%, transparent 70%)',
                        filter: 'blur(8px)',
                        transform: 'scale(2)'
                    }}
                />
            </motion.div>
        </motion.div>
    );
}
