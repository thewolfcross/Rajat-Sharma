import { useEffect, useRef } from 'react';

export default function ParticleBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationId;
        let particles = [];
        let nebulaOrbs = [];
        const particleCount = 60;
        const orbCount = 4;
        let mouse = { x: null, y: null, radius: 150 };
        let scrollY = window.scrollY;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        };

        const handleScroll = () => {
            scrollY = window.scrollY;
        };

        window.addEventListener('resize', resize);
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        class NebulaOrb {
            constructor() {
                this.baseX = Math.random() * canvas.width;
                this.baseY = Math.random() * canvas.height;
                this.x = this.baseX;
                this.y = this.baseY;
                this.size = Math.random() * 300 + 200;
                this.color = Math.random() > 0.5 ? 'rgba(255, 195, 0, 0.03)' : 'rgba(0, 29, 61, 0.04)';
                this.speedX = Math.random() * 0.2 - 0.1;
                this.speedY = Math.random() * 0.2 - 0.1;
                this.parallaxFactor = Math.random() * 0.1 + 0.05;
            }

            update() {
                this.baseX += this.speedX;
                this.baseY += this.speedY;

                // Wrap around
                if (this.baseX > canvas.width + this.size) this.baseX = -this.size;
                if (this.baseX < -this.size) this.baseX = canvas.width + this.size;
                if (this.baseY > canvas.height + this.size) this.baseY = -this.size;
                if (this.baseY < -this.size) this.baseY = canvas.height + this.size;

                // Parallax effect
                this.x = this.baseX;
                this.y = this.baseY - scrollY * this.parallaxFactor;
            }

            draw() {
                const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
                gradient.addColorStop(0, this.color);
                gradient.addColorStop(1, 'transparent');
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        class NeuralParticle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.4;
                this.vy = (Math.random() - 0.5) * 0.4;
                this.radius = Math.random() * 1.5 + 0.5;
                this.color = 'rgba(255, 195, 0, 0.4)';
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Float towards mouse organically
                if (mouse.x !== null) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < mouse.radius) {
                        const force = (mouse.radius - distance) / mouse.radius;
                        this.x -= dx * force * 0.02;
                        this.y -= dy * force * 0.02;
                    }
                }

                // Boundary check
                if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
                if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }

        function init() {
            particles = [];
            nebulaOrbs = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new NeuralParticle());
            }
            for (let i = 0; i < orbCount; i++) {
                nebulaOrbs.push(new NebulaOrb());
            }
        }

        function drawConnections() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 150) {
                        const opacity = 1 - dist / 150;
                        ctx.beginPath();
                        // Neural-style elegant thin lines
                        ctx.strokeStyle = `rgba(255, 214, 10, ${opacity * 0.07})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // 1. Draw Nebula Orbs (Deep Layer)
            nebulaOrbs.forEach(orb => {
                orb.update();
                orb.draw();
            });

            // 2. Draw Connections (Middle Layer)
            drawConnections();

            // 3. Draw Particles (Top Layer)
            particles.forEach(p => {
                p.update();
                p.draw();
            });

            animationId = requestAnimationFrame(animate);
        }

        resize();
        animate();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resize);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                pointerEvents: 'none',
                background: 'var(--color-dark-bg)',
            }}
        />
    );
}
