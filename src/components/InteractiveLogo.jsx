import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';
import logoImg from '../assets/hero-logo.png';

export default function InteractiveLogo() {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(mouseY, [-500, 500], [15, -15]);
    const rotateY = useTransform(mouseX, [-500, 500], [-15, 15]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const moveX = clientX - window.innerWidth / 2;
            const moveY = clientY - window.innerHeight / 2;
            x.set(moveX);
            y.set(moveY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [x, y]);

    return (
        <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            zIndex: 0,
            overflow: 'hidden'
        }}>
            <motion.div
                style={{
                    perspective: 1000,
                    width: 'clamp(300px, 50vw, 600px)',
                    opacity: 0.15, // Subtle for professional background
                }}
            >
                <motion.img
                    src={logoImg}
                    alt="Background Logo"
                    style={{
                        width: '100%',
                        height: 'auto',
                        rotateX,
                        rotateY,
                        filter: 'drop-shadow(0 0 30px rgba(0, 212, 255, 0.2)) grayscale(20%)',
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                />
            </motion.div>
        </div>
    );
}
