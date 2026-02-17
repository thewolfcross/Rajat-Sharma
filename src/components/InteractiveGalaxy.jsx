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
            constructor(x, y, color) {
                this.x = Math.random() * canvas.width; // Start random
                this.y = Math.random() * canvas.height;
                this.targetX = x; // The "Wolf" position
                this.targetY = y;
                this.radius = Math.random() * 2 + 1;
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
                // Breathing effect (Base position moves slightly)
                const time = Date.now() * 0.001;
                const breathScale = 1 + Math.sin(time) * 0.02;
                const cx = canvas.width / 2;
                const cy = canvas.height / 2;

                // Calculate actual target with breathing
                let tx = ((this.targetX - cx) * breathScale) + cx;
                let ty = ((this.targetY - cy) * breathScale) + cy;

                // Mouse Interaction
                if (mouse.x) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < mouse.radius) {
                        const forceDirectionX = dx / distance;
                        const forceDirectionY = dy / distance;
                        const maxDistance = mouse.radius;
                        const force = (maxDistance - distance) / maxDistance;
                        const directionX = forceDirectionX * force * this.density * 5; // Strong repulsion
                        const directionY = forceDirectionY * force * this.density * 5;

                        this.x -= directionX;
                        this.y -= directionY;
                    } else {
                        // Return to Target (Elastic)
                        if (this.x !== tx) {
                            let dx = this.x - tx;
                            this.x -= dx / 10;
                        }
                        if (this.y !== ty) {
                            let dy = this.y - ty;
                            this.y -= dy / 10;
                        }
                    }
                } else {
                    // Return to Target (Idle)
                    if (this.x !== tx) {
                        let dx = this.x - tx;
                        this.x -= dx / 15; // Slower snap back
                    }
                    if (this.y !== ty) {
                        let dy = this.y - ty;
                        this.y -= dy / 15;
                    }
                }
                this.draw();
            }
        }

        const isInsideWolf = (x, y, cx, cy, scale) => {
            // Normalized coordinates relative to center
            const nx = (x - cx) / scale;
            const ny = (y - cy) / scale;

            // Simple Wolf Head approximation using combined shapes
            // 1. Snout (Triangle pointing down)
            if (ny > 0 && ny < 0.6 && Math.abs(nx) < (0.3 - ny * 0.4)) return true;
            // 2. Forehead (Rectangle-ish)
            if (ny > -0.5 && ny <= 0 && Math.abs(nx) < 0.4) return true;
            // 3. Ears (Triangles)
            // Left Ear
            if (nx < -0.2 && nx > -0.6 && ny < -0.3 && ny > -0.9 - (nx + 0.4)) return true;
            // Right Ear
            if (nx > 0.2 && nx < 0.6 && ny < -0.3 && ny > -0.9 + (nx - 0.4)) return true;
            // 4. Cheeks (Side fluff)
            if (ny > 0 && ny < 0.4 && Math.abs(nx) < 0.5 && Math.abs(nx) > 0.2) return true;

            return false;
        };

        const initParticles = () => {
            particles = [];
            const cx = canvas.width / 2;
            const cy = canvas.height / 2;
            // Scale based on screen size (responsive)
            const scale = Math.min(canvas.width, canvas.height) * 0.5;

            // Generate particles inside the Wolf shape
            const particleCount = canvas.width < 768 ? 200 : 400; // Efficient count

            let attempts = 0;
            while (particles.length < particleCount && attempts < 20000) {
                const x = (Math.random() - 0.5) * scale * 1.5 + cx;
                const y = (Math.random() - 0.5) * scale * 1.5 + cy;

                if (isInsideWolf(x, y, cx, cy, scale / 1.2)) {
                    // Cyber Colors
                    const colors = ['#00d4ff', '#ff9f43', '#ffffff'];
                    const color = colors[Math.floor(Math.random() * colors.length)];
                    particles.push(new Particle(x, y, color));
                }
                attempts++;
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Black Background
            ctx.fillStyle = '#050505';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Connect particles (The "Geometrical" part)
            connect();

            particles.forEach(p => p.update());
            animationId = requestAnimationFrame(animate);
        };

        const connect = () => {
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    const dx = particles[a].x - particles[b].x;
                    const dy = particles[a].y - particles[b].y;
                    const distance = dx * dx + dy * dy;

                    // Dynamic connection distance
                    if (distance < 5000) {
                        const opacity = 1 - (distance / 5000);
                        ctx.strokeStyle = `rgba(0, 212, 255, ${opacity * 0.25})`; // Cyan connections
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
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
            mouse.radius = 500; // Huge shockwave
            setTimeout(() => mouse.radius = 150, 400);
        };

        const onLeave = () => {
            mouse.x = null;
            mouse.y = null;
        }

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
                background: '#050505',
            }}
        />
    );
}
