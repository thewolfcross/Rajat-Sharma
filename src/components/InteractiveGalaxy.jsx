import { useEffect, useRef } from 'react';

export default function InteractiveGalaxy({ darkMode }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationId;
        let particles = [];
        let flowField = [];
        let mouse = { x: -1000, y: -1000, radius: 250, strength: 0 };
        const cellSize = 50;
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
                    const angle = (Math.cos(x * 0.1) + Math.sin(y * 0.1)) * Math.PI * 2;
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
                this.speed = Math.random() * 0.5 + 0.2;
                this.history = [];
                this.maxLength = Math.floor(Math.random() * 10 + 5);
                this.angle = 0;
                this.color = darkMode
                    ? `hsla(${200 + Math.random() * 40}, 100%, 60%, ${Math.random() * 0.4 + 0.1})`
                    : `hsla(${20 + Math.random() * 40}, 80%, 50%, ${Math.random() * 0.3 + 0.1})`;
            }

            update() {
                const xIdx = Math.floor(this.x / cellSize);
                const yIdx = Math.floor(this.y / cellSize);
                const idx = yIdx * cols + xIdx;

                if (flowField[idx]) {
                    this.angle = flowField[idx];
                }

                // Mouse interaction
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < mouse.radius) {
                    const force = (mouse.radius - dist) / mouse.radius;
                    const angle = Math.atan2(dy, dx);

                    if (mouse.strength > 0) {
                        // Gravity pull on click
                        this.accX += Math.cos(angle) * force * 5;
                        this.accY += Math.sin(angle) * force * 5;
                    } else {
                        // Gentle flow follow
                        this.accX += Math.cos(this.angle + force * 2) * this.speed;
                        this.accY += Math.sin(this.angle + force * 2) * this.speed;
                    }
                } else {
                    this.accX += Math.cos(this.angle) * this.speed * 0.5;
                    this.accY += Math.sin(this.angle) * this.speed * 0.5;
                }

                this.vx += this.accX;
                this.vy += this.accY;

                // Friction
                this.vx *= 0.96;
                this.vy *= 0.96;

                this.x += this.vx;
                this.y += this.vy;

                this.accX = 0;
                this.accY = 0;

                // Boundary check
                if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                    this.reset();
                }

                // Tail history
                this.history.push({ x: this.x, y: this.y });
                if (this.history.length > this.maxLength) this.history.shift();
            }

            draw() {
                ctx.beginPath();
                ctx.strokeStyle = this.color;
                ctx.lineWidth = 1.5;
                if (this.history.length > 0) {
                    ctx.moveTo(this.history[0].x, this.history[0].y);
                    for (let i = 1; i < this.history.length; i++) {
                        ctx.lineTo(this.history[i].x, this.history[i].y);
                    }
                    ctx.stroke();
                }
            }
        }

        const initParticles = () => {
            particles = [];
            const count = Math.min(window.innerWidth / 4, 300);
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        };

        const drawBackground = () => {
            const time = Date.now() * 0.0005;
            const grad = ctx.createRadialGradient(
                canvas.width / 2 + Math.cos(time) * 100,
                canvas.height / 2 + Math.sin(time) * 100,
                0,
                canvas.width / 2,
                canvas.height / 2,
                canvas.width
            );

            if (darkMode) {
                grad.addColorStop(0, '#0a0a15');
                grad.addColorStop(0.5, '#050505');
                grad.addColorStop(1, '#020205');
            } else {
                grad.addColorStop(0, '#f8faff');
                grad.addColorStop(0.5, '#ffffff');
                grad.addColorStop(1, '#f0f4f8');
            }

            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Subtle Mesh Blobs
            ctx.filter = 'blur(100px)';
            ctx.globalAlpha = darkMode ? 0.08 : 0.04;

            const bX = canvas.width / 2 + Math.sin(time * 0.7) * 200;
            const bY = canvas.height / 2 + Math.cos(time * 0.8) * 200;

            ctx.fillStyle = darkMode ? '#00d4ff' : '#3b82f6';
            ctx.beginPath();
            ctx.arc(bX, bY, 300, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = darkMode ? '#ffd700' : '#fb923c';
            ctx.beginPath();
            ctx.arc(canvas.width - bX, canvas.height - bY, 250, 0, Math.PI * 2);
            ctx.fill();

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
            mouse.radius = 400;
        };

        const onMouseUp = () => {
            mouse.strength = 0;
            mouse.radius = 250;
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
                zIndex: -1,
                background: darkMode ? '#050505' : '#ffffff',
                pointerEvents: 'auto', // Enable pointer events for interaction
            }}
        />
    );
}
