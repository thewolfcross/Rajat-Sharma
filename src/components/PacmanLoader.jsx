import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PacmanLoader({ onComplete }) {
    const canvasRef = useRef(null);
    const [score, setScore] = useState(0);
    const [ready, setReady] = useState(false);
    const [glitching, setGlitching] = useState(false);
    const targetScore = 4;

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationId;
        let pellets = [];
        let particles = [];
        let trail = [];
        let shake = { x: 0, y: 0, intensity: 0 };
        let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        let pacman = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
            radius: 20,
            mouthOpen: 0,
            dir: 0
        };

        const maze = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0],
            [0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ];

        let cellSize, offsetX, offsetY;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            const cols = maze[0].length;
            const rows = maze.length;
            cellSize = Math.min(canvas.width / cols, canvas.height / rows) * 0.7;
            offsetX = (canvas.width - cols * cellSize) / 2;
            offsetY = (canvas.height - rows * cellSize) / 2;
            spawnPellets();
            pacman.x = offsetX + cellSize * 1.5;
            pacman.y = offsetY + cellSize * 1.5;
            pacman.radius = cellSize * 0.35;
        };

        const spawnPellets = () => {
            pellets = [];
            const pathPositions = [];
            maze.forEach((row, r) => row.forEach((cell, c) => { if (cell === 1) pathPositions.push({ r, c }); }));
            for (let i = 0; i < targetScore; i++) {
                const pos = pathPositions[Math.floor(Math.random() * pathPositions.length)];
                pellets.push({
                    x: offsetX + pos.c * cellSize + cellSize / 2,
                    y: offsetY + pos.r * cellSize + cellSize / 2,
                    radius: cellSize * 0.15,
                    color: i % 2 === 0 ? '#00d4ff' : '#ff9f43'
                });
            }
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });

        resize();

        const isWalkable = (x, y) => {
            const c = Math.floor((x - offsetX) / cellSize);
            const r = Math.floor((y - offsetY) / cellSize);
            return maze[r] && maze[r][c] === 1;
        };

        const animate = () => {
            ctx.fillStyle = '#050505';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw Digital Grid
            ctx.strokeStyle = 'rgba(0, 212, 255, 0.05)';
            ctx.lineWidth = 1;
            const gridSize = 40;
            for (let x = 0; x < canvas.width; x += gridSize) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke(); }
            for (let y = 0; y < canvas.height; y += gridSize) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke(); }

            // Camera Shake Logic
            if (shake.intensity > 0) {
                shake.x = (Math.random() - 0.5) * shake.intensity;
                shake.y = (Math.random() - 0.5) * shake.intensity;
                shake.intensity *= 0.9;
                if (shake.intensity < 0.1) shake.intensity = 0;
            } else { shake.x = 0; shake.y = 0; }

            ctx.save();
            ctx.translate(shake.x, shake.y);

            // Draw Maze Walls (Double Neon Line)
            ctx.lineCap = 'round';
            maze.forEach((row, r) => {
                row.forEach((cell, c) => {
                    if (cell === 0) {
                        const x = offsetX + c * cellSize + 5;
                        const y = offsetY + r * cellSize + 5;
                        const w = cellSize - 10;
                        const h = cellSize - 10;

                        // Layered Glow
                        ctx.shadowBlur = 10; ctx.shadowColor = 'rgba(0, 212, 255, 0.8)';
                        ctx.strokeStyle = 'rgba(0, 212, 255, 1)';
                        ctx.lineWidth = 2;
                        ctx.strokeRect(x, y, w, h);

                        ctx.shadowBlur = 0;
                        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
                        ctx.lineWidth = 0.5;
                        ctx.strokeRect(x + 2, y + 2, w - 4, h - 4);
                    }
                });
            });

            // Pacman Movement & Trail
            const dx = mouse.x - pacman.x;
            const dy = mouse.y - pacman.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist > 5) {
                const nextX = pacman.x + (dx / dist) * 6;
                const nextY = pacman.y + (dy / dist) * 6;
                if (isWalkable(nextX, pacman.y)) pacman.x = nextX;
                if (isWalkable(pacman.x, nextY)) pacman.y = nextY;
                pacman.dir = Math.atan2(dy, dx);
            }

            // Manage Trail
            trail.push({ x: pacman.x, y: pacman.y, age: 0 });
            if (trail.length > 20) trail.shift();

            // Draw Trail
            ctx.lineWidth = pacman.radius * 0.5;
            trail.forEach((t, i) => {
                t.age++;
                const opacity = i / trail.length * 0.3;
                ctx.strokeStyle = `rgba(255, 255, 0, ${opacity})`;
                ctx.beginPath();
                const prev = trail[i - 1] || t;
                ctx.moveTo(prev.x, prev.y);
                ctx.lineTo(t.x, t.y);
                ctx.stroke();
            });

            // Draw Pellets
            pellets.forEach((p, index) => {
                ctx.shadowBlur = 15; ctx.shadowColor = p.color;
                ctx.fillStyle = p.color;
                ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2); ctx.fill();

                const pDist = Math.sqrt((p.x - pacman.x) ** 2 + (p.y - pacman.y) ** 2);
                if (pDist < pacman.radius + p.radius) {
                    pellets.splice(index, 1);
                    setScore(s => s + 1);
                    shake.intensity = 15;
                    for (let i = 0; i < 20; i++) {
                        particles.push({
                            x: p.x, y: p.y, dx: (Math.random() - 0.5) * 10, dy: (Math.random() - 0.5) * 10,
                            alpha: 1, color: p.color, size: Math.random() * 4 + 2
                        });
                    }
                }
            });
            ctx.shadowBlur = 0;

            // Particles with physics
            particles.forEach((p, i) => {
                p.x += p.dx; p.y += p.dy; p.dy += 0.1; // Gravity
                p.alpha -= 0.02; p.size *= 0.98;
                if (p.alpha <= 0 || p.size < 0.5) particles.splice(i, 1);
                ctx.globalAlpha = p.alpha; ctx.fillStyle = p.color;
                ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
            });
            ctx.globalAlpha = 1;

            // Draw Pacman (Premium Glow)
            ctx.save();
            ctx.translate(pacman.x, pacman.y); ctx.rotate(pacman.dir);
            ctx.shadowBlur = 20; ctx.shadowColor = '#ffff00';
            ctx.beginPath(); ctx.moveTo(0, 0);
            pacman.mouthOpen = Math.abs(Math.sin(Date.now() * 0.015)) * 0.25;
            ctx.arc(0, 0, pacman.radius, pacman.mouthOpen * Math.PI, (2 - pacman.mouthOpen) * Math.PI);
            ctx.fillStyle = '#ffff00'; ctx.fill();
            ctx.restore();

            ctx.restore();
            animationId = requestAnimationFrame(animate);
        };

        animate();
        return () => { cancelAnimationFrame(animationId); window.removeEventListener('resize', resize); };
    }, []);

    useEffect(() => { if (score >= targetScore) setReady(true); }, [score]);

    const handleEnter = () => {
        setGlitching(true);
        setTimeout(onComplete, 1200);
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 1.1, filter: 'blur(50px)' }}
                className="pacman-loader"
                style={{
                    position: 'fixed', inset: 0, zIndex: 10000, background: '#050505',
                    overflow: 'hidden', cursor: 'crosshair'
                }}
            >
                <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />

                {/* Glitch Overlay */}
                {glitching && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0, 1, 0] }}
                        style={{ position: 'fixed', inset: 0, background: 'rgba(0, 212, 255, 0.2)', pointerEvents: 'none', zIndex: 10001 }}
                    />
                )}

                <div style={{ position: 'absolute', top: 30, left: '50%', transform: 'translateX(-50%)', textAlign: 'center', pointerEvents: 'none' }}>
                    <motion.h2
                        animate={{ letterSpacing: ['4px', '8px', '4px'], filter: ['blur(0px)', 'blur(2px)', 'blur(0px)'] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        style={{ color: '#00d4ff', fontFamily: 'var(--font-heading)', fontSize: '1.2rem', textTransform: 'uppercase', textShadow: '0 0 10px rgba(0,212,255,0.8)' }}
                    >
                        PROTOCOL: NEON MAZE
                    </motion.h2>
                    <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#ff9f43', textShadow: '0 0 25px rgba(255,159,67,0.7)', fontFamily: 'Space Grotesk' }}>
                        NODES COLLECTED: {score} / {targetScore}
                    </div>
                </div>

                <AnimatePresence>
                    {ready && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            style={{ position: 'absolute', bottom: '10%', left: '50%', transform: 'translateX(-50%)', zIndex: 11 }}
                        >
                            <button
                                onClick={handleEnter}
                                className="glow-btn glow-btn-primary"
                                style={{
                                    padding: '20px 60px', fontSize: '1.6rem', border: 'none', cursor: 'pointer',
                                    background: 'linear-gradient(45deg, #00d4ff, #0088ff)', color: 'white',
                                    borderRadius: '8px', fontWeight: 800, letterSpacing: '2px',
                                    boxShadow: '0 0 30px rgba(0, 212, 255, 0.5)'
                                }}
                            >
                                {glitching ? "INITIALIZING..." : "ACCESS GRANTED"}
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </AnimatePresence>
    );
}
