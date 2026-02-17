import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PacmanLoader({ onComplete }) {
    const canvasRef = useRef(null);
    const [score, setScore] = useState(0);
    const [ready, setReady] = useState(false);
    const targetScore = 4;

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationId;
        let pellets = [];
        let particles = [];
        let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        let pacman = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
            radius: 20,
            mouthOpen: 0,
            dir: 0
        };

        // Maze Grid (0: Wall, 1: Path)
        const maze = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0],
            [0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ];

        let cellSize;
        let offsetX, offsetY;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            const cols = maze[0].length;
            const rows = maze.length;
            cellSize = Math.min(canvas.width / cols, canvas.height / rows) * 0.8;
            offsetX = (canvas.width - cols * cellSize) / 2;
            offsetY = (canvas.height - rows * cellSize) / 2;

            spawnPellets();
            // Start Pac-Man in first path
            pacman.x = offsetX + cellSize * 1.5;
            pacman.y = offsetY + cellSize * 1.5;
            pacman.radius = cellSize * 0.35;
        };

        const spawnPellets = () => {
            pellets = [];
            const pathPositions = [];
            maze.forEach((row, r) => {
                row.forEach((cell, c) => {
                    if (cell === 1) pathPositions.push({ r, c });
                });
            });

            // Target 4 specific spots
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

        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);

        resize();

        const isWalkable = (x, y) => {
            const c = Math.floor((x - offsetX) / cellSize);
            const r = Math.floor((y - offsetY) / cellSize);
            return maze[r] && maze[r][c] === 1;
        };

        const animate = () => {
            ctx.fillStyle = '#050505';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw Maze
            ctx.save();
            ctx.lineWidth = 2;
            ctx.shadowBlur = 15;
            ctx.shadowColor = 'rgba(0, 212, 255, 0.5)';
            ctx.strokeStyle = '#00d4ff';

            maze.forEach((row, r) => {
                row.forEach((cell, c) => {
                    if (cell === 0) {
                        ctx.strokeRect(offsetX + c * cellSize + 5, offsetY + r * cellSize + 5, cellSize - 10, cellSize - 10);
                    }
                });
            });
            ctx.restore();

            // Try to move Pac-Man towards mouse
            const dx = mouse.x - pacman.x;
            const dy = mouse.y - pacman.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist > 5) {
                const nextX = pacman.x + (dx / dist) * 4;
                const nextY = pacman.y + (dy / dist) * 4;

                // Simple collision: check x and y independently for sliding
                if (isWalkable(nextX, pacman.y)) pacman.x = nextX;
                if (isWalkable(pacman.x, nextY)) pacman.y = nextY;

                pacman.dir = Math.atan2(dy, dx);
            }

            // Mouth Animation
            pacman.mouthOpen = Math.abs(Math.sin(Date.now() * 0.015)) * 0.25;

            // Draw Pellets
            pellets.forEach((p, index) => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.shadowBlur = 10;
                ctx.shadowColor = p.color;
                ctx.fill();

                // Collision
                const pDist = Math.sqrt((p.x - pacman.x) ** 2 + (p.y - pacman.y) ** 2);
                if (pDist < pacman.radius + p.radius) {
                    pellets.splice(index, 1);
                    setScore(s => s + 1);
                    for (let i = 0; i < 8; i++) {
                        particles.push({
                            x: p.x, y: p.y, dx: (Math.random() - 0.5) * 6, dy: (Math.random() - 0.5) * 6,
                            alpha: 1, color: p.color
                        });
                    }
                }
            });
            ctx.shadowBlur = 0;

            // Particles
            particles.forEach((p, i) => {
                p.x += p.dx; p.y += p.dy; p.alpha -= 0.03;
                if (p.alpha <= 0) particles.splice(i, 1);
                ctx.globalAlpha = p.alpha;
                ctx.fillStyle = p.color;
                ctx.beginPath(); ctx.arc(p.x, p.y, 2, 0, Math.PI * 2); ctx.fill();
            });
            ctx.globalAlpha = 1;

            // Draw Pacman
            ctx.save();
            ctx.translate(pacman.x, pacman.y);
            ctx.rotate(pacman.dir);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.arc(0, 0, pacman.radius, pacman.mouthOpen * Math.PI, (2 - pacman.mouthOpen) * Math.PI);
            ctx.fillStyle = '#ffff00';
            ctx.fill();
            ctx.restore();

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    useEffect(() => {
        if (score >= targetScore) setReady(true);
    }, [score]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(30px)' }}
            className="pacman-loader"
            style={{
                position: 'fixed', inset: 0, zIndex: 10000, background: '#050505',
                overflow: 'hidden', cursor: 'crosshair'
            }}
        >
            <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />

            <div style={{
                position: 'absolute', top: 30, left: '50%', transform: 'translateX(-50%)',
                textAlign: 'center', pointerEvents: 'none'
            }}>
                <h2 style={{
                    color: '#00d4ff', fontFamily: 'var(--font-heading)',
                    fontSize: '1.2rem', letterSpacing: '4px', textTransform: 'uppercase',
                    textShadow: '0 0 10px rgba(0,212,255,0.5)'
                }}>
                    Neon Maze Challenge
                </h2>
                <div style={{
                    fontSize: '2.5rem', fontWeight: 900, color: '#ff9f43',
                    textShadow: '0 0 20px rgba(255,159,67,0.5)'
                }}>
                    BEANS EATEN: {score} / {targetScore}
                </div>
            </div>

            <AnimatePresence>
                {ready && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{
                            position: 'absolute', bottom: '10%', left: '50%', transform: 'translateX(-50%)',
                            zIndex: 11
                        }}
                    >
                        <button
                            onClick={onComplete}
                            className="glow-btn glow-btn-primary"
                            style={{
                                padding: '16px 48px', fontSize: '1.4rem', border: 'none',
                                pointerEvents: 'auto', cursor: 'pointer'
                            }}
                        >
                            ACCESS PORTFOLIO
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
