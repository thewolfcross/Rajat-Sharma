import { useEffect, useRef } from 'react';

export default function HogwartsBackground({ darkMode }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationId;
        let candles = [];
        let particles = [];
        let mouse = { x: -1000, y: -1000 };

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initCandles();
        };

        class Candle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = canvas.height + Math.random() * 200;
                this.width = Math.random() * 4 + 4;
                this.height = Math.random() * 40 + 60;
                this.speed = Math.random() * 0.3 + 0.1;
                this.sway = Math.random() * 0.02;
                this.swayDir = Math.random() * Math.PI * 2;
                this.flicker = 0;
            }

            update() {
                this.y -= this.speed;
                this.swayDir += this.sway;
                this.x += Math.sin(this.swayDir) * 0.5;

                // React to mouse
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    const force = (150 - dist) / 150;
                    this.x -= (dx / dist) * force * 2;
                    this.y -= (dy / dist) * force * 2;
                }

                if (this.y < -this.height - 20) {
                    this.reset();
                }
            }

            draw() {
                // Candle Body
                const grad = ctx.createLinearGradient(this.x, this.y, this.x + this.width, this.y);
                grad.addColorStop(0, '#e5e7eb');
                grad.addColorStop(0.5, '#f9fafb');
                grad.addColorStop(1, '#d1d5db');

                ctx.fillStyle = grad;
                ctx.fillRect(this.x, this.y, this.width, this.height);

                // Flame
                const flameX = this.x + this.width / 2;
                const flameY = this.y - 5;
                this.flicker = Math.random() * 2;

                const flameGrad = ctx.createRadialGradient(flameX, flameY, 0, flameX, flameY, 8 + this.flicker);
                flameGrad.addColorStop(0, '#fff');
                flameGrad.addColorStop(0.2, '#ffd700');
                flameGrad.addColorStop(0.6, 'rgba(255, 120, 0, 0.4)');
                flameGrad.addColorStop(1, 'rgba(255, 60, 0, 0)');

                ctx.fillStyle = flameGrad;
                ctx.beginPath();
                ctx.arc(flameX, flameY, 10 + this.flicker, 0, Math.PI * 2);
                ctx.fill();

                // Subtle Wick
                ctx.strokeStyle = '#333';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(flameX, this.y);
                ctx.lineTo(flameX, this.y - 4);
                ctx.stroke();
            }
        }

        class MagicParticle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.vx = (Math.random() - 0.5) * 2;
                this.vy = (Math.random() - 0.5) * 2;
                this.life = 1;
                this.decay = Math.random() * 0.02 + 0.01;
                this.size = Math.random() * 2 + 1;
                const hues = [45, 55, 30, 200]; // Gold, Amber, Muted Blue
                this.h = hues[Math.floor(Math.random() * hues.length)];
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.vy += 0.02; // Slight gravity
                this.life -= this.decay;
            }

            draw() {
                ctx.globalAlpha = this.life;
                ctx.fillStyle = `hsla(${this.h}, 100%, 70%, ${this.life})`;
                ctx.shadowBlur = 10;
                ctx.shadowColor = `hsla(${this.h}, 100%, 50%, 1)`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }

        const initCandles = () => {
            candles = [];
            const count = Math.min(window.innerWidth / 40, 40);
            for (let i = 0; i < count; i++) {
                const c = new Candle();
                c.y = Math.random() * canvas.height;
                candles.push(c);
            }
        };

        const animate = () => {
            ctx.fillStyle = darkMode ? '#050510' : '#f0f0f5';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Ambient Mist
            const mistGrad = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width);
            if (darkMode) {
                mistGrad.addColorStop(0, 'rgba(10, 10, 30, 0)');
                mistGrad.addColorStop(1, 'rgba(0, 0, 0, 0.4)');
            } else {
                mistGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
                mistGrad.addColorStop(1, 'rgba(200, 200, 220, 0.2)');
            }
            ctx.fillStyle = mistGrad;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            candles.forEach(c => {
                c.update();
                c.draw();
            });

            ctx.globalAlpha = 1;
            particles.forEach((p, i) => {
                p.update();
                p.draw();
                if (p.life <= 0) particles.splice(i, 1);
            });

            animationId = requestAnimationFrame(animate);
        };

        const onMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            // Create particles for the wand trail
            for (let i = 0; i < 2; i++) {
                particles.push(new MagicParticle(mouse.x, mouse.y));
            }
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', onMouseMove);

        resize();
        animate();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMouseMove);
        };
    }, [darkMode]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 0,
                background: darkMode ? '#050510' : '#f0f0f5',
                pointerEvents: 'none',
            }}
        />
    );
}
