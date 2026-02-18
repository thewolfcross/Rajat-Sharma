import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import profileBg from '../assets/profile-bg.png';

export default function InteractiveImageBackground({ darkMode }) {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const [grid, setGrid] = useState([]);
    const [ripples, setRipples] = useState([]);

    // Mouse values for 3D Parallax and Interactivity
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const velocityX = useMotionValue(0);
    const velocityY = useMotionValue(0);

    const springConfig = { damping: 30, stiffness: 200 };
    const rotateX = useSpring(useTransform(mouseY, [0, window.innerHeight], [8, -8]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [0, window.innerWidth], [-8, 8]), springConfig);

    useEffect(() => {
        // --- Grid Calculation ---
        const calculateGrid = () => {
            const tileSize = 80; // Smaller tiles for more detail
            const cols = Math.ceil(window.innerWidth / tileSize);
            const rows = Math.ceil(window.innerHeight / tileSize);
            const tiles = [];
            for (let i = 0; i < rows * cols; i++) {
                tiles.push({
                    id: i,
                    x: (i % cols) * tileSize,
                    y: Math.floor(i / cols) * tileSize
                });
            }
            setGrid(tiles);
        };

        calculateGrid();
        window.addEventListener('resize', calculateGrid);

        // --- Mouse and Particle System ---
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationId;
        let particles = [];

        class Shard {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 3 + 1;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.opacity = Math.random() * 0.5 + 0.1;
                this.rotation = Math.random() * Math.PI * 2;
                this.rotSpeed = (Math.random() - 0.5) * 0.02;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.rotation += this.rotSpeed;

                const dx = mouseX.get() - this.x;
                const dy = mouseY.get() - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 200) {
                    const force = (200 - dist) / 200;
                    this.x -= dx * force * 0.02;
                    this.y -= dy * force * 0.02;
                }

                if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                    this.reset();
                }
            }
            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotation);
                ctx.beginPath();
                ctx.moveTo(-this.size, -this.size);
                ctx.lineTo(this.size, -this.size);
                ctx.lineTo(0, this.size);
                ctx.closePath();
                ctx.fillStyle = darkMode
                    ? `rgba(255, 255, 255, ${this.opacity})`
                    : `rgba(0, 0, 0, ${this.opacity * 0.5})`;
                ctx.fill();
                ctx.restore();
            }
        }

        const initParticles = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            particles = Array.from({ length: 50 }, () => new Shard());
        };

        const drawConnections = () => {
            const maxDist = 150;
            const mX = mouseX.get();
            const mY = mouseY.get();

            particles.forEach((p, i) => {
                // Connect to Mouse
                const dMouse = Math.sqrt((p.x - mX) ** 2 + (p.y - mY) ** 2);
                if (dMouse < 200) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mX, mY);
                    const alpha = (1 - dMouse / 200) * 0.2;
                    ctx.strokeStyle = darkMode ? `rgba(255, 215, 0, ${alpha})` : `rgba(0, 163, 255, ${alpha})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }

                // Connect to other Shards
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < maxDist) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        const alpha = (1 - dist / maxDist) * 0.1;
                        ctx.strokeStyle = darkMode ? `rgba(255, 255, 255, ${alpha})` : `rgba(0, 0, 0, ${alpha})`;
                        ctx.lineWidth = 0.3;
                        ctx.stroke();
                    }
                }
            });
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            drawConnections();
            animationId = requestAnimationFrame(animate);
        };

        initParticles();
        animate();

        let lastMousePos = { x: 0, y: 0 };
        const handleMouseMove = (e) => {
            const vX = e.clientX - lastMousePos.x;
            const vY = e.clientY - lastMousePos.y;
            velocityX.set(vX);
            velocityY.set(vY);

            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            lastMousePos = { x: e.clientX, y: e.clientY };
        };

        const handleGlobalClick = (e) => {
            const id = Date.now();
            setRipples(prev => [...prev, { id, x: e.clientX, y: e.clientY }]);
            setTimeout(() => {
                setRipples(prev => prev.filter(r => r.id !== id));
            }, 1000);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('click', handleGlobalClick);

        return () => {
            window.removeEventListener('resize', calculateGrid);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('click', handleGlobalClick);
            cancelAnimationFrame(animationId);
        };
    }, [darkMode]);

    return (
        <div
            ref={containerRef}
            className={`fixed inset-0 z-0 overflow-hidden transition-colors duration-700 ${darkMode ? 'bg-[#020205]' : 'bg-[#f0f2f5]'} cursor-crosshair`}
        >
            {/* 1. Base 3D Parallax Image */}
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    perspective: 1000,
                }}
                className="absolute inset-[-10%] z-0"
            >
                <img
                    src={profileBg}
                    alt="Background"
                    className={`w-full h-full object-contain ${darkMode ? 'opacity-40' : 'opacity-10'} p-20 select-none pointer-events-none`}
                />
                <div className={`absolute inset-0 bg-gradient-to-b from-transparent ${darkMode ? 'via-[#020205]/40 to-[#020205]' : 'via-white/40 to-white'}`} />
            </motion.div>

            {/* 2. Glass shard particles */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 z-10 pointer-events-none opacity-50"
            />

            {/* 3. Interactive Tile Grid */}
            <div
                className="absolute inset-0 z-20 grid pointer-events-none"
                style={{
                    gridTemplateColumns: `repeat(auto-fill, minmax(80px, 1fr))`,
                    gridTemplateRows: `repeat(auto-fill, minmax(80px, 1fr))`
                }}
            >
                {grid.map((t) => (
                    <Tile
                        key={t.id}
                        mouseX={mouseX}
                        mouseY={mouseY}
                        velocityX={velocityX}
                        velocityY={velocityY}
                        ripples={ripples}
                        darkMode={darkMode}
                    />
                ))}
            </div>

            {/* 4. Click Ripples */}
            <AnimatePresence>
                {ripples.map(r => (
                    <motion.div
                        key={r.id}
                        initial={{ scale: 0, opacity: 0.5 }}
                        animate={{ scale: 4, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={`absolute w-64 h-64 border-2 ${darkMode ? 'border-white/20' : 'border-black/10'} rounded-full z-30 pointer-events-none`}
                        style={{ left: r.x - 128, top: r.y - 128 }}
                    />
                ))}
            </AnimatePresence>

            {/* 5. Magnetic Glow */}
            <motion.div
                className="pointer-events-none absolute z-40 w-[500px] h-[500px] rounded-full blur-[100px]"
                style={{
                    x: useSpring(useTransform(mouseX, x => x - 250), springConfig),
                    y: useSpring(useTransform(mouseY, y => y - 250), springConfig),
                    background: darkMode
                        ? "radial-gradient(circle, rgba(255, 215, 0, 0.1) 0%, transparent 70%)"
                        : "radial-gradient(circle, rgba(0, 163, 255, 0.1) 0%, transparent 70%)"
                }}
            />
        </div>
    );
}

function Tile({ mouseX, mouseY, ripples, darkMode }) {
    const tileRef = useRef(null);
    const [distance, setDistance] = useState(1000);
    const [isRippling, setIsRippling] = useState(false);

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

    // Check for nearby ripples
    useEffect(() => {
        if (!tileRef.current || ripples.length === 0) return;
        const rect = tileRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        ripples.forEach(r => {
            const dx = r.x - centerX;
            const dy = r.y - centerY;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < 150) {
                setIsRippling(true);
                setTimeout(() => setIsRippling(false), 500);
            }
        });
    }, [ripples]);

    const range = 200;
    const active = distance < range;
    const progress = active ? (range - distance) / range : 0;

    // Individual tile tilting towards mouse
    const tiltX = active ? (mouseY.get() - (tileRef.current?.getBoundingClientRect().top || 0)) * -0.1 : 0;
    const tiltY = active ? (mouseX.get() - (tileRef.current?.getBoundingClientRect().left || 0)) * 0.1 : 0;

    return (
        <motion.div
            ref={tileRef}
            animate={{
                scale: active ? 1.05 + progress * 0.1 : 1,
                rotateX: tiltX * progress,
                rotateY: tiltY * progress,
                backgroundColor: active
                    ? (darkMode ? `rgba(255, 255, 255, ${progress * 0.08})` : `rgba(0, 0, 0, ${progress * 0.04})`)
                    : "rgba(255, 255, 255, 0)",
                borderColor: active
                    ? (darkMode ? `rgba(255, 215, 0, ${progress * 0.2})` : `rgba(0, 163, 255, ${progress * 0.3})`)
                    : "rgba(255, 255, 255, 0)",
                y: isRippling ? -10 : 0
            }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="w-full h-full border border-transparent backdrop-blur-[1px] relative"
            style={{ transformStyle: "preserve-3d" }}
        >
            {active && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: progress * 0.5 }}
                    className={`absolute inset-0 bg-gradient-to-tr ${darkMode ? 'from-white/5' : 'from-black/5'} to-transparent pointer-events-none`}
                />
            )}
        </motion.div>
    );
}
