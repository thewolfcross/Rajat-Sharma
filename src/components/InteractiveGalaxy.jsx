import { useEffect, useRef } from 'react';

export default function InteractiveGalaxy({ darkMode }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationId;
        let particles = [];
        let flowField = [];
        let mouse = { x: -1000, y: -1000, radius: 300, strength: 0 };
        const cellSize = 60;
        let rows, cols;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            cols = Math.ceil(canvas.width / cellSize) + 1;
            rows = Math.ceil(canvas.height / cellSize) + 1;
            initFlowField();
            initParticles();
        };

        const initFlowField = () => {
            flowField = [];
            for (let y = 0; y < rows; y++) {
                for (let x = 0; x < cols; x++) {
                    const angle = (Math.cos(x * 0.05) + Math.sin(y * 0.05)) * Math.PI * 2;
                    flowField.push(angle);
                }
            }
        };

        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = 0;
                this.vy = 0;
                this.accX = 0;
                this.accY = 0;
                this.speed = Math.random() * 0.2 + 0.1; // Slower, more elegant speed
                this.history = [];
                this.maxLength = Math.floor(Math.random() * 20 + 10); // Longer, smoother tails
                this.angle = 0;

                // Formal Portfolio Color Palette
                if (darkMode) {
                    // Deep Slate, Indigo, Muted Cyan
                    const hues = [210, 220, 230];
                    const h = hues[Math.floor(Math.random() * hues.length)];
                    this.color = `hsla(${h}, 30%, 70%, ${Math.random() * 0.2 + 0.05})`;
                } else {
                    // Soft Alabaster, Pearl, Mist Blue
                    const hues = [200, 210, 190];
                    const h = hues[Math.floor(Math.random() * hues.length)];
                    this.color = `hsla(${h}, 20%, 40%, ${Math.random() * 0.1 + 0.05})`;
                }
            }

            update() {
                const xIdx = Math.floor(this.x / cellSize);
                const yIdx = Math.floor(this.y / cellSize);
                const idx = yIdx * cols + xIdx;

                if (flowField[idx]) {
                    this.angle = flowField[idx];
                }

                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < mouse.radius) {
                    const force = (mouse.radius - dist) / mouse.radius;
                    const angle = Math.atan2(dy, dx);

                    if (mouse.strength > 0) {
                        // Very smooth gravity pull
                        this.accX += Math.cos(angle) * force * 1.5;
                        this.accY += Math.sin(angle) * force * 1.5;
                    } else {
                        // Subtle interaction
                        this.accX += Math.cos(this.angle + force) * this.speed * 0.5;
                        this.accY += Math.sin(this.angle + force) * this.speed * 0.5;
                    }
                } else {
                    this.accX += Math.cos(this.angle) * this.speed * 0.3;
                    this.accY += Math.sin(this.angle) * this.speed * 0.3;
                }

                this.vx += this.accX;
                this.vy += this.accY;

                this.vx *= 0.98; // Higher friction for calmer movement
                this.vy *= 0.98;

                this.x += this.vx;
                this.y += this.vy;

                this.accX = 0;
                this.accY = 0;

                if (this.x < -100 || this.x > canvas.width + 100 || this.y < -100 || this.y > canvas.height + 100) {
                    this.reset();
                }

                this.history.push({ x: this.x, y: this.y });
                if (this.history.length > this.maxLength) this.history.shift();
            }

            draw() {
                if (this.history.length < 2) return;
                ctx.beginPath();
                ctx.strokeStyle = this.color;
                ctx.lineWidth = 1;
                ctx.moveTo(this.history[0].x, this.history[0].y);
                for (let i = 1; i < this.history.length; i++) {
                    ctx.lineTo(this.history[i].x, this.history[i].y);
                }
                ctx.stroke();
            }
        }

        const initParticles = () => {
            particles = [];
            const count = Math.min(window.innerWidth / 10, 150); // Fewer particles for a cleaner look
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        };

        const drawBackground = () => {
            const time = Date.now() * 0.0002; // Very slow time progression

            // Professional Base
            ctx.fillStyle = darkMode ? '#020205' : '#fcfcff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Aurora Mesh Blobs
            ctx.filter = 'blur(120px)';

            if (darkMode) {
                // Top Left: Deep Indigo
                ctx.globalAlpha = 0.25;
                ctx.fillStyle = '#1e1b4b';
                ctx.beginPath();
                ctx.arc(Math.sin(time) * 300 + 200, Math.cos(time * 0.8) * 300 + 200, 600, 0, Math.PI * 2);
                ctx.fill();

                // Bottom Right: Slate Blue
                ctx.globalAlpha = 0.2;
                ctx.fillStyle = '#1e293b';
                ctx.beginPath();
                ctx.arc(canvas.width - 100, canvas.height - 100, 700, 0, Math.PI * 2);
                ctx.fill();
            } else {
                // Top Right: Soft Mist Blue
                ctx.globalAlpha = 0.1;
                ctx.fillStyle = '#cbd5e1';
                ctx.beginPath();
                ctx.arc(canvas.width - 100, 100, 600, 0, Math.PI * 2);
                ctx.fill();

                // Bottom Left: Very Soft Pearl
                ctx.globalAlpha = 0.08;
                ctx.fillStyle = '#e2e8f0';
                ctx.beginPath();
                ctx.arc(100, canvas.height - 100, 500, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.filter = 'none';
            ctx.globalAlpha = 1;
        };

        const animate = () => {
            drawBackground();

            particles.forEach(p => {
                p.update();
                p.draw();
            });

            animationId = requestAnimationFrame(animate);
        };

        const onMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        const onMouseDown = () => {
            mouse.strength = 1;
            mouse.radius = 450;
        };

        const onMouseUp = () => {
            mouse.strength = 0;
            mouse.radius = 300;
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);

        resize();
        animate();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
        };
    }, [darkMode]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 0,
                background: darkMode ? '#020205' : '#fcfcff',
                pointerEvents: 'none',
            }}
        />
    );
}
