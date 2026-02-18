import { useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';
import logoImg from '../assets/hero-logo.png';

export default function InteractiveLandingBackground() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring configuration for organic feel
    const springConfig = { stiffness: 100, damping: 30, mass: 1 };
    const rotateX = useSpring(useTransform(mouseY, [0, window.innerHeight], [10, -10]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [0, window.innerWidth], [-10, 10]), springConfig);

    // Parallax movement for layers
    const translateX = useSpring(useTransform(mouseX, [0, window.innerWidth], [-20, 20]), springConfig);
    const translateY = useSpring(useTransform(mouseY, [0, window.innerHeight], [-20, 20]), springConfig);

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center bg-[#020205]">
            {/* Ambient Aurora Glows */}
            <motion.div
                animate={{
                    opacity: [0.1, 0.2, 0.1],
                    scale: [1, 1.2, 1],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                style={{
                    position: 'absolute',
                    width: '100vw',
                    height: '100vh',
                    background: 'radial-gradient(circle at 30% 30%, rgba(0, 212, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(114, 9, 183, 0.15) 0%, transparent 50%)',
                    filter: 'blur(80px)'
                }}
            />

            {/* Main Interactive Logo Container */}
            <motion.div
                style={{
                    perspective: 1200,
                    x: translateX,
                    y: translateY,
                    rotateX,
                    rotateY,
                }}
                className="relative z-10 flex items-center justify-center"
            >
                {/* Logo Glow Layer */}
                <motion.div
                    animate={{
                        opacity: [0.3, 0.6, 0.3],
                        scale: [1.1, 1.2, 1.1]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                        position: 'absolute',
                        width: 'clamp(280px, 40vw, 500px)',
                        height: 'clamp(280px, 40vw, 500px)',
                        background: 'radial-gradient(circle, rgba(0,212,255,0.4) 0%, transparent 70%)',
                        filter: 'blur(40px)',
                        zIndex: -1
                    }}
                />

                {/* Primary Logo Image */}
                <motion.img
                    src={logoImg}
                    alt="Atmospheric Logo"
                    style={{
                        width: 'clamp(250px, 35vw, 450px)',
                        height: 'auto',
                        filter: 'drop-shadow(0 0 30px rgba(0, 212, 255, 0.3)) invert(1) brightness(1.2)',
                    }}
                    initial={{ opacity: 0, scale: 0.8, filter: 'blur(20px) invert(1)' }}
                    animate={{ opacity: 0.4, scale: 1, filter: 'blur(0px) invert(1) brightness(1)' }}
                    transition={{ duration: 2, ease: "easeOut" }}
                />

                {/* Floating Aesthetic Particles */}
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                        animate={{
                            y: [0, -40, 0],
                            x: [0, (i % 2 === 0 ? 30 : -30), 0],
                            opacity: [0, 0.6, 0],
                            scale: [0, 1.5, 0]
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                            ease: "easeInOut"
                        }}
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                    />
                ))}
            </motion.div>

            {/* Scanning Line Effect (Cyberpunk/Formal vibe) */}
            <motion.div
                animate={{ y: ['-100%', '200%'] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0,
                    height: '2px',
                    background: 'linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.2), transparent)',
                    zIndex: 2,
                    boxShadow: '0 0 10px rgba(0, 212, 255, 0.1)'
                }}
            />
        </div>
    );
}
