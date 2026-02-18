import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import profileBg from '../assets/profile-bg.png';

export default function InteractiveImageBackground() {
    const containerRef = useRef(null);
    const [grid, setGrid] = useState([]);

    // Mouse values for 3D Parallax
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const rotateX = useSpring(useTransform(mouseY, [0, window.innerHeight], [5, -5]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [0, window.innerWidth], [-5, 5]), springConfig);

    useEffect(() => {
        const calculateGrid = () => {
            const cols = Math.ceil(window.innerWidth / 100);
            const rows = Math.ceil(window.innerHeight / 100);
            const tiles = [];
            for (let i = 0; i < rows * cols; i++) {
                tiles.push(i);
            }
            setGrid(tiles);
        };

        calculateGrid();
        window.addEventListener('resize', calculateGrid);

        const handleMouseMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('resize', calculateGrid);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div ref={containerRef} className="fixed inset-0 z-0 overflow-hidden bg-[#020205]">
            {/* 3D Parallax Image Base */}
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                className="absolute inset-[-10%] z-0"
            >
                <img
                    src={profileBg}
                    alt="Background"
                    className="w-full h-full object-cover opacity-60 scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020205]/40 to-[#020205]" />
            </motion.div>

            {/* Glass Tile Grid */}
            <div
                className="absolute inset-0 z-10 grid"
                style={{
                    gridTemplateColumns: `repeat(auto-fill, minmax(100px, 1fr))`,
                    gridTemplateRows: `repeat(auto-fill, minmax(100px, 1fr))`
                }}
            >
                {grid.map((i) => (
                    <Tile key={i} mouseX={mouseX} mouseY={mouseY} />
                ))}
            </div>

            {/* Ambient Glow cursor follower */}
            <motion.div
                className="pointer-events-none absolute z-20 w-[600px] h-[600px] rounded-full blur-[120px]"
                style={{
                    x: useSpring(useTransform(mouseX, x => x - 300), springConfig),
                    y: useSpring(useTransform(mouseY, y => y - 300), springConfig),
                    background: "radial-gradient(circle, rgba(0, 212, 255, 0.15) 0%, transparent 70%)"
                }}
            />
        </div>
    );
}

function Tile({ mouseX, mouseY }) {
    const tileRef = useRef(null);
    const [distance, setDistance] = useState(1000);

    useEffect(() => {
        const updateDistance = () => {
            if (!tileRef.current) return;
            const rect = tileRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const dx = mouseX.get() - centerX;
            const dy = mouseY.get() - centerY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            setDistance(dist);
        };

        const unsubscribeX = mouseX.on("change", updateDistance);
        const unsubscribeY = mouseY.on("change", updateDistance);

        return () => {
            unsubscribeX();
            unsubscribeY();
        };
    }, [mouseX, mouseY]);

    // Calculate scale and opacity based on distance
    const range = 250;
    const active = distance < range;
    const progress = active ? (range - distance) / range : 0;

    return (
        <motion.div
            ref={tileRef}
            animate={{
                scale: active ? 1.1 + progress * 0.2 : 1,
                backgroundColor: active ? `rgba(255, 255, 255, ${progress * 0.05})` : "rgba(255, 255, 255, 0)",
                boxShadow: active ? `0 10px 30px rgba(0, 212, 255, ${progress * 0.1})` : "none",
                borderColor: active ? `rgba(255, 255, 255, ${progress * 0.1})` : "rgba(255, 255, 255, 0)"
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full h-full border border-transparent backdrop-blur-[2px] rounded-lg transition-colors duration-500"
        >
            {active && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: progress * 1 }}
                    className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none rounded-lg"
                />
            )}
        </motion.div>
    );
}
