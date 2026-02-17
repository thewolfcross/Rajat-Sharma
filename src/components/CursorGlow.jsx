import { useEffect, useRef } from 'react';

export default function CursorGlow() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationId;
        let mouse = { x: -200, y: -200 };
        let projectiles = [];
        let ripples = [];
        let trail = [];
        let lastMouse = { x: -200, y: -200 };

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const onMouseMove = (e) => {
            lastMouse.x = mouse.x;
            lastMouse.y = mouse.y;
            mouse.x = e.clientX;
            mouse.y = e.clientY;

            // Add trail particles
            trail.push({
                x: mouse.x,
                y: mouse.y,
                alpha: 1,
                size: Math.random() * 3 + 2,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5
            });

            if (trail.length > 40) trail.shift();
        };
        window.addEventListener('mousemove', onMouseMove);

        const onClick = (e) => {
            // Spawn Ripple (Bat Signal vibe)
            ripples.push({
                x: e.clientX,
                y: e.clientY,
                radius: 10,
                alpha: 1,
                color: '#ffc300' // Bat signal yellow
            });

            // Throw 3 Mini Batarangs
            for (let i = 0; i < 3; i++) {
                const angle = (Math.PI * 2 * i) / 3 - Math.PI / 2; // Start upwards
                projectiles.push({
                    x: e.clientX,
                    y: e.clientY,
                    vx: Math.cos(angle) * 8,
                    vy: Math.sin(angle) * 8,
                    rotation: 0,
                    life: 1
                });
            }
        };
        window.addEventListener('click', onClick);

        // Draw Batarang Shape
        const drawBatarang = (x, y, scale = 1, rotation = 0, color = '#1a1a1a') => {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(rotation);
            ctx.scale(scale, scale);

            ctx.beginPath();
            // Classic Batarang curve approximation
            ctx.moveTo(0, -10); // Top center tip
            ctx.bezierCurveTo(5, -15, 20, -10, 30, -5); // Right wing top
            ctx.quadraticCurveTo(25, 5, 30, 15); // Right wing tip to bottom
            ctx.quadraticCurveTo(15, 10, 8, 12); // Right bottom curve
            ctx.lineTo(0, 5); // Center bottom
            ctx.lineTo(-8, 12); // Left bottom curve
            ctx.quadraticCurveTo(-15, 10, -30, 15); // Left wing tip
            ctx.quadraticCurveTo(-25, 5, -30, -5); // Left wing top
            ctx.bezierCurveTo(-20, -10, -5, -15, 0, -10); // Back to center

            ctx.closePath();

            // Fill
            ctx.fillStyle = color;
            ctx.shadowColor = 'rgba(0,0,0,0.8)';
            ctx.shadowBlur = 10;
            ctx.fill();

            // Inner styling (Tech-lines)
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 1;
            ctx.stroke();

            // Center glow
            ctx.fillStyle = '#ffc300';
            ctx.beginPath();
            ctx.arc(0, 0, 2, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // 1. Draw Trail (Smoky/Shadowy)
            trail.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;
                p.alpha -= 0.04;
                if (p.alpha <= 0) return;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(20, 20, 30, ${p.alpha * 0.4})`;
                ctx.fill();
            });
            trail = trail.filter(p => p.alpha > 0);

            // 2. Draw Ripples (Bat Signal)
            ripples.forEach((r, i) => {
                r.radius += 3;
                r.alpha -= 0.02;
                if (r.alpha <= 0) return;

                ctx.beginPath();
                ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(255, 195, 0, ${r.alpha})`; // Yellow ring
                ctx.lineWidth = 2;
                ctx.stroke();

                // Inner circle
                ctx.beginPath();
                ctx.arc(r.x, r.y, r.radius * 0.7, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(30, 30, 40, ${r.alpha * 0.5})`; // Dark inner ring
                ctx.stroke();
            });
            ripples = ripples.filter(r => r.alpha > 0);

            // 3. Draw Projectiles
            projectiles.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;
                p.rotation += 0.4;
                p.life -= 0.02;
                if (p.life <= 0) return;

                drawBatarang(p.x, p.y, 0.4, p.rotation, '#333');
            });
            projectiles = projectiles.filter(p => p.life > 0);

            // 4. Draw Main Cursor
            // Calculate rotation based on movement
            const dx = mouse.x - lastMouse.x;
            const dy = mouse.y - lastMouse.y;
            let rotation = 0;
            if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
                rotation = Math.atan2(dy, dx) + Math.PI / 2;
            }

            // Smooth rotation or fixed? Let's add a slight tilt based on X velocity
            const tilt = Math.max(Math.min(dx * 0.05, 0.5), -0.5);

            drawBatarang(mouse.x, mouse.y, 0.8, tilt, '#0a0a0a');

            animationId = requestAnimationFrame(animate);
        };
        animate();

        // CSS to hide default cursor
        const styleEl = document.createElement('style');
        styleEl.textContent = '* { cursor: none !important; }';
        document.head.appendChild(styleEl);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('click', onClick);
            styleEl.remove();
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                pointerEvents: 'none',
            }}
        />
    );
}
