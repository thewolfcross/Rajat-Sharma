import { useEffect, useRef } from 'react';

export default function InteractiveGalaxy() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationId;

        let particles = [];
        let mouse = { x: null, y: null, radius: 150 };

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        class Particle {
            constructor(x, y, radius, color, velocity) {
                this.x = x;
                this.y = y;
                this.baseX = x;
                this.baseY = y;
                this.radius = radius;
                this.color = color;
                this.density = (Math.random() * 30) + 1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fillStyle = this.color;
                ctx.fill();
            }

            update() {
                // Mouse interaction
                if (mouse.x) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    let forceDirectionX = dx / distance;
                    let forceDirectionY = dy / distance;
                    let maxDistance = mouse.radius;
                    let force = (maxDistance - distance) / maxDistance;
                    let directionX = forceDirectionX * force * this.density;
                    let directionY = forceDirectionY * force * this.density;

                    if (distance < mouse.radius) {
                        this.x -= directionX;
                        this.y -= directionY;
                    } else {
                        if (this.x !== this.baseX) {
                            let dx = this.x - this.baseX;
                            this.x -= dx / 10;
                        }
                        if (this.y !== this.baseY) {
                            let dy = this.y - this.baseY;
                            this.y -= dy / 10;
                        }
                    }
                } else {
                    // Drift back if no mouse
                    if (this.x !== this.baseX) {
                        let dx = this.x - this.baseX;
                        this.x -= dx / 10;
                    }
                    if (this.y !== this.baseY) {
                        let dy = this.y - this.baseY;
                        this.y -= dy / 10;
                    }
                }

                this.draw();
            }
        }

        const initParticles = () => {
            particles = [];
            const numberOfParticles = (canvas.width * canvas.height) / 9000;

            for (let i = 0; i < numberOfParticles; i++) {
                let x = Math.random() * canvas.width;
                let y = Math.random() * canvas.height;
                let size = (Math.random() * 2) + 0.5; // Slightly smaller/varied for stars
                // White / Silver Palette (Playful Stars)
                const colors = [
                    'rgba(255, 255, 255, 0.9)', // Bright White
                    'rgba(255, 255, 255, 0.6)', // Soft White
                    'rgba(200, 200, 220, 0.4)', // Faint Silver
                    'rgba(255, 255, 255, 0.2)'  // Distant Star
                ];
                let color = colors[Math.floor(Math.random() * colors.length)];
                particles.push(new Particle(x, y, size, color));
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Pure Black Background
            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            gradient.addColorStop(0, '#000000');
            gradient.addColorStop(1, '#080808'); // Subtle texture at bottom
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Connect particles
            connect();

            particles.forEach(p => p.update());
            animationId = requestAnimationFrame(animate);
        };

        const connect = () => {
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    let distance = ((particles[a].x - particles[b].x) * (particles[a].x - particles[b].x)) +
                        ((particles[a].y - particles[b].y) * (particles[a].y - particles[b].y));
                    if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                        let opacityValue = 1 - (distance / 20000);
                        if (opacityValue > 0) {
                            ctx.strokeStyle = `rgba(255, 255, 255, ${opacityValue * 0.15})`; // White connections
                            ctx.lineWidth = 0.8;
                            ctx.beginPath();
                            ctx.moveTo(particles[a].x, particles[a].y);
                            ctx.lineTo(particles[b].x, particles[b].y);
                            ctx.stroke();
                        }
                    }
                }
            }
        };

        const onMouseMove = (e) => {
            mouse.x = e.x;
            mouse.y = e.y;
        };

        const onTouchMove = (e) => {
            if (e.touches.length > 0) {
                mouse.x = e.touches[0].clientX;
                mouse.y = e.touches[0].clientY;
            }
        }

        const onLeave = () => {
            mouse.x = null;
            mouse.y = null;
        }

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('touchmove', onTouchMove);
        window.addEventListener('mouseout', onLeave);

        resize();
        animate();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('mouseout', onLeave);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: -1,
                background: '#000000',
            }}
        />
    );
}
