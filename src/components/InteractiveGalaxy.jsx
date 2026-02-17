import { useEffect, useRef } from 'react';

export default function InteractiveGalaxy() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationId;

        let particles = [];
        let shootingStars = [];
        let mouse = { x: null, y: null, radius: 150 };

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        class Particle {
            constructor(x, y, radius, color) {
                this.x = x;
                this.y = y;
                this.baseX = x;
                this.baseY = y;
                this.radius = radius;
                this.color = color;
                this.density = (Math.random() * 30) + 1;
                this.angle = Math.random() * 360; // For idle floating
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

                    if (distance < mouse.radius) {
                        const forceDirectionX = dx / distance;
                        const forceDirectionY = dy / distance;
                        const maxDistance = mouse.radius;
                        const force = (maxDistance - distance) / maxDistance;
                        const directionX = forceDirectionX * force * this.density;
                        const directionY = forceDirectionY * force * this.density;

                        this.x -= directionX;
                        this.y -= directionY;
                    } else {
                        // Return to base (Elastic snap)
                        if (this.x !== this.baseX) {
                            let dx = this.x - this.baseX;
                            this.x -= dx / 20;
                        }
                        if (this.y !== this.baseY) {
                            let dy = this.y - this.baseY;
                            this.y -= dy / 20;
                        }
                    }
                } else {
                    // Idle Float
                    this.x += Math.cos(this.angle) * 0.1;
                    this.y += Math.sin(this.angle) * 0.1;
                    this.angle += 0.02;

                    // Soft return if drifted too far
                    let driftX = this.x - this.baseX;
                    let driftY = this.y - this.baseY;
                    if (Math.abs(driftX) > 20 || Math.abs(driftY) > 20) {
                        this.x -= driftX / 100;
                        this.y -= driftY / 100;
                    }
                }
                this.draw();
            }
        }

        class ShootingStar {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * -100;
                this.speed = (Math.random() * 15) + 10;
                this.len = (Math.random() * 80) + 50;
                this.size = (Math.random() * 2) + 0.1;
                this.waitTime = new Date().getTime() + (Math.random() * 5000) + 1000;
                this.active = false;
            }

            update() {
                if (this.active) {
                    this.x -= this.speed;
                    this.y += this.speed;
                    if (this.x < -100 || this.y > canvas.height + 100) {
                        this.active = false;
                        this.waitTime = new Date().getTime() + (Math.random() * 5000) + 1000;
                    } else {
                        ctx.lineWidth = this.size;
                        ctx.beginPath();
                        ctx.moveTo(this.x, this.y);
                        ctx.lineTo(this.x + this.len, this.y - this.len);
                        ctx.strokeStyle = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.1})`;
                        ctx.stroke();
                    }
                } else {
                    if (this.waitTime < new Date().getTime()) {
                        this.active = true;
                        this.x = Math.random() * canvas.width + 200;
                        this.y = -100;
                    }
                }
            }
        }

        const initParticles = () => {
            particles = [];
            shootingStars = [];
            const numberOfParticles = (canvas.width * canvas.height) / 8000; // Increased density

            for (let i = 0; i < numberOfParticles; i++) {
                let x = Math.random() * canvas.width;
                let y = Math.random() * canvas.height;
                let size = (Math.random() * 2) + 0.5;
                const colors = [
                    'rgba(255, 255, 255, 0.9)',
                    'rgba(200, 200, 255, 0.6)',
                    'rgba(255, 215, 0, 0.4)', // Hint of gold
                    'rgba(255, 255, 255, 0.2)'
                ];
                let color = colors[Math.floor(Math.random() * colors.length)];
                particles.push(new Particle(x, y, size, color));
            }

            // Init Shooting Stars
            for (let i = 0; i < 3; i++) {
                shootingStars.push(new ShootingStar());
            }
        };

        const animate = () => {
            // Clear with trails
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // Trails effect
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Connect particles
            connect();

            particles.forEach(p => p.update());
            shootingStars.forEach(s => s.update());

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
                            ctx.strokeStyle = `rgba(255, 255, 255, ${opacityValue * 0.1})`;
                            ctx.lineWidth = 0.5;
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
        };

        const onClick = () => {
            mouse.radius = 400; // Shockwave
            setTimeout(() => mouse.radius = 150, 300);
        };

        const onLeave = () => {
            mouse.x = null;
            mouse.y = null;
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('touchmove', onTouchMove);
        window.addEventListener('click', onClick);
        window.addEventListener('mouseout', onLeave);

        resize();
        animate();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('click', onClick);
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
