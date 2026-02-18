import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';

export default function BackgroundBatLogo({ darkMode }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth physics for parallax
    const springConfig = { damping: 25, stiffness: 150 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    // Dynamic transforms for parallax depth
    const moveX = useTransform(springX, [-500, 500], [-30, 30]);
    const moveY = useTransform(springY, [-500, 500], [-30, 30]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            // Get center of the screen
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;

            // Set values relative to center
            mouseX.set(e.clientX - centerX);
            mouseY.set(e.clientY - centerY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <motion.div
            style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                x: '-50%',
                y: '-50%',
                translateX: moveX,
                translateY: moveY,
                zIndex: 0,
                pointerEvents: 'none',
                opacity: darkMode ? 0.07 : 0.04,
                width: 'min(90vw, 800px)',
                height: 'auto',
                transition: 'opacity 0.5s ease',
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: darkMode ? 0.07 : 0.04, scale: 1 }}
        >
            <svg
                viewBox="0 0 100 60"
                fill={darkMode ? '#ffffff' : '#000000'}
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M 50 15 
                       C 45 5, 42 5, 40 10 
                       C 35 8, 30 8, 25 12 
                       C 15 10, 5 15, 2 25 
                       C 0 35, 10 50, 25 55 
                       C 35 52, 45 45, 50 40 
                       C 55 45, 65 52, 75 55 
                       C 90 50, 100 35, 98 25 
                       C 95 15, 85 10, 75 12 
                       C 70 8, 65 8, 60 10 
                       C 58 5, 55 5, 50 15 Z"
                />
            </svg>
        </motion.div>
    );
}
