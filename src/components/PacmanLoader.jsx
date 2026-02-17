import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PacmanLoader({ onComplete }) {
    const canvasRef = useRef(null);
    const [score, setScore] = useState(0);
    const [ready, setReady] = useState(false);
    const targetScore = 15;

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
            radius: 30,
            angle: 0,
            mouthOpen: 0,
            dir: 0
        };

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            spawnPellets();
        };

        const spawnPellets = () => {
            pellets = [];
            for (let i = 0; i < 40; i++) {
                pellets.push({
                    x: Math.random() * (canvas.width - 100) + 50,
                    y: Math.random() * (canvas.height - 100) + 50,
                    radius: 6,
                    color: Math.random() > 0.5 ? '#00d4ff' : '#ff9f43'
                });
            }
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        resize();

        const animate = () => {
            ctx.fillStyle = '#050505';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Pacman Movement (Lerp to mouse)
            const dx = mouse.x - pacman.x;
            const dy = mouse.y - pacman.y;
            pacman.x += dx * 0.1;
            pacman.y += dy * 0.1;
            pacman.dir = Math.atan2(dy, dx);

            // Mouth Animation
            pacman.mouthOpen = Math.abs(Math.sin(Date.now() * 0.01)) * 0.25;

            // Draw Pellets
            pellets.forEach((p, index) => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();

                // Collision Check
                const dist = Math.sqrt((p.x - pacman.x) ** 2 + (p.y - pacman.y) ** 2);
                if (dist < pacman.radius + p.radius) {
                    pellets.splice(index, 1);
                    setScore(s => s + 1);
                    // Add some particles for effect
                    for (let i = 0; i < 5; i++) {
                        particles.push({
                            x: p.x, y: p.y, dx: (Math.random() - 0.5) * 5, dy: (Math.random() - 0.5) * 5,
                            alpha: 1, color: p.color
                        });
                    }
                }
            });

            // Draw Particles
            particles.forEach((p, i) => {
                p.x += p.dx;
                p.y += p.dy;
                p.alpha -= 0.02;
                if (p.alpha <= 0) particles.splice(i, 1);
                ctx.globalAlpha = p.alpha;
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
                ctx.fill();
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

            // Respawn pellets if they get low
            if (pellets.length < 10) spawnPellets();

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    useEffect(() => {
        if (score >= targetScore) setReady(true);
    }, [score]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(20px)' }}
            className="pacman-loader"
            style={{
                position: 'fixed', inset: 0, zIndex: 10000, background: '#050505',
                overflow: 'hidden', cursor: 'none'
            }}
        >
            <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />

            <div style={{
                position: 'absolute', top: 40, left: '50%', transform: 'translateX(-50%)',
                textAlign: 'center', pointerEvents: 'none'
            }}>
                <h2 style={{
                    color: '#00d4ff', fontFamily: 'var(--font-heading)',
                    fontSize: '1.5rem', letterSpacing: '4px', textTransform: 'uppercase'
                }}>
                    Eat {targetScore} Beans to Load
                </h2>
                <div style={{
                    fontSize: '3rem', fontWeight: 900, color: '#ff9f43',
                    textShadow: '0 0 20px rgba(255,159,67,0.5)'
                }}>
                    {score} / {targetScore}
                </div>
            </div>

            <AnimatePresence>
                {ready && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                            position: 'absolute', bottom: '15%', left: '50%', transform: 'translateX(-50%)',
                            zIndex: 11
                        }}
                    >
                        <button
                            onClick={onComplete}
                            className="glow-btn glow-btn-primary"
                            style={{
                                padding: '16px 48px', fontSize: '1.5rem',
                                pointerEvents: 'auto', cursor: 'pointer'
                            }}
                        >
                            ENTER PORTFOLIO
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
