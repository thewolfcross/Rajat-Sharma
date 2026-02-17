import { useEffect, useRef } from 'react';

export default function CursorGlow() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationId;
        let mouse = { x: -200, y: -200 };
        let rasengans = []; // click effects
        let shurikens = []; // spinning shurikens on click
        let chakraTrail = [];
        let isClicking = false;
        let clickTime = 0;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const onMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            chakraTrail.push({ x: e.clientX, y: e.clientY, life: 1 });
            if (chakraTrail.length > 20) chakraTrail.shift();
        };
        window.addEventListener('mousemove', onMouseMove);

        const onClick = (e) => {
            isClicking = true;
            clickTime = 0;
            // Spawn rasengan burst
            rasengans.push({ x: e.clientX, y: e.clientY, life: 1, radius: 5 });
            // Spawn 3 shurikens flying outward
            for (let i = 0; i < 3; i++) {
                const angle = (Math.PI * 2 * i) / 3 + Math.random() * 0.5;
                shurikens.push({
                    x: e.clientX,
                    y: e.clientY,
                    vx: Math.cos(angle) * 4,
                    vy: Math.sin(angle) * 4,
                    rotation: 0,
                    life: 1,
                });
            }
            setTimeout(() => { isClicking = false; }, 300);
        };
        window.addEventListener('click', onClick);

        // Draw kunai knife cursor
        const drawKunai = (x, y) => {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(Math.PI / 4); // 45 degree tilt

            // Blade
            ctx.beginPath();
            ctx.moveTo(0, -18);  // tip
            ctx.lineTo(-5, 4);
            ctx.lineTo(0, 1);
            ctx.lineTo(5, 4);
            ctx.closePath();
            const bladeGrad = ctx.createLinearGradient(0, -18, 0, 4);
            bladeGrad.addColorStop(0, '#e8e8e8');
            bladeGrad.addColorStop(0.5, '#b0b0b0');
            bladeGrad.addColorStop(1, '#808080');
            ctx.fillStyle = bladeGrad;
            ctx.shadowColor = 'rgba(255,255,255,0.5)';
            ctx.shadowBlur = 6;
            ctx.fill();
            ctx.shadowBlur = 0;

            // Edge highlight
            ctx.strokeStyle = 'rgba(255,255,255,0.6)';
            ctx.lineWidth = 0.5;
            ctx.stroke();

            // Handle wrap
            ctx.fillStyle = '#2a1a0a';
            ctx.beginPath();
            ctx.roundRect(-3.5, 4, 7, 14, 1.5);
            ctx.fill();

            // Handle wrap bandage lines (white cloth)
            ctx.strokeStyle = '#f5f0e0';
            ctx.lineWidth = 1.2;
            for (let i = 0; i < 4; i++) {
                const yy = 6 + i * 3;
                ctx.beginPath();
                ctx.moveTo(-3.5, yy);
                ctx.lineTo(3.5, yy + 1.5);
                ctx.stroke();
            }

            // Ring at bottom
            ctx.strokeStyle = '#888';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(0, 22, 4, 0, Math.PI * 2);
            ctx.stroke();
            ctx.fillStyle = '#555';
            ctx.fill();

            // Ring hole
            ctx.beginPath();
            ctx.arc(0, 22, 2, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0,0,0,0.6)';
            ctx.fill();

            ctx.restore();
        };

        // Draw shuriken
        const drawShuriken = (x, y, rotation, alpha) => {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(rotation);
            ctx.globalAlpha = alpha;

            const points = 4;
            const outerR = 8;
            const innerR = 3;

            ctx.beginPath();
            for (let i = 0; i < points * 2; i++) {
                const r = i % 2 === 0 ? outerR : innerR;
                const a = (Math.PI * i) / points;
                const px = Math.cos(a) * r;
                const py = Math.sin(a) * r;
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            }
            ctx.closePath();
            ctx.fillStyle = '#888';
            ctx.strokeStyle = '#ccc';
            ctx.lineWidth = 0.5;
            ctx.shadowColor = 'rgba(255,255,255,0.4)';
            ctx.shadowBlur = 4;
            ctx.fill();
            ctx.stroke();
            ctx.shadowBlur = 0;

            // Center hole
            ctx.beginPath();
            ctx.arc(0, 0, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = '#333';
            ctx.fill();

            ctx.restore();
        };

        // Draw rasengan (blue chakra ball)
        const drawRasengan = (x, y, life, radius) => {
            ctx.save();
            ctx.globalAlpha = life;

            // Outer swirl glow
            const r = radius * (2 - life);

            // Multiple rotating rings
            const time = Date.now() * 0.005;
            for (let ring = 0; ring < 3; ring++) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(100,180,255,${life * 0.4})`;
                ctx.lineWidth = 1.5;
                ctx.shadowColor = '#4dc9f6';
                ctx.shadowBlur = 15;
                const ringR = r * (0.5 + ring * 0.3);
                ctx.arc(x, y, ringR, time + ring * 2, time + ring * 2 + Math.PI * 1.5);
                ctx.stroke();
            }

            // Core blue ball
            const coreGrad = ctx.createRadialGradient(x, y, 0, x, y, r * 0.6);
            coreGrad.addColorStop(0, `rgba(200,230,255,${life * 0.9})`);
            coreGrad.addColorStop(0.4, `rgba(80,160,255,${life * 0.7})`);
            coreGrad.addColorStop(0.8, `rgba(40,100,220,${life * 0.3})`);
            coreGrad.addColorStop(1, 'transparent');
            ctx.fillStyle = coreGrad;
            ctx.beginPath();
            ctx.arc(x, y, r * 0.6, 0, Math.PI * 2);
            ctx.fill();

            // Wind streaks
            ctx.shadowBlur = 0;
            for (let i = 0; i < 6; i++) {
                const angle = time * 3 + (Math.PI * 2 * i) / 6;
                const sx = x + Math.cos(angle) * r * 0.3;
                const sy = y + Math.sin(angle) * r * 0.3;
                const ex = x + Math.cos(angle) * r;
                const ey = y + Math.sin(angle) * r;
                ctx.beginPath();
                ctx.moveTo(sx, sy);
                ctx.lineTo(ex, ey);
                ctx.strokeStyle = `rgba(150,210,255,${life * 0.3})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }

            // Burst particles
            const particleCount = 8;
            for (let i = 0; i < particleCount; i++) {
                const angle = time * 2 + (Math.PI * 2 * i) / particleCount;
                const dist = r * (1.2 - life * 0.5) + Math.sin(time * 4 + i) * 5;
                const px = x + Math.cos(angle) * dist;
                const py = y + Math.sin(angle) * dist;
                ctx.beginPath();
                ctx.arc(px, py, 1.5 * life, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(150,210,255,${life * 0.6})`;
                ctx.fill();
            }

            ctx.restore();
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Chakra trail (orange-blue like Naruto's chakra)
            for (let i = 0; i < chakraTrail.length; i++) {
                chakraTrail[i].life -= 0.04;
                if (chakraTrail[i].life <= 0) continue;
                const t = chakraTrail[i];

                // Orange chakra wisps
                ctx.beginPath();
                ctx.arc(t.x + Math.sin(Date.now() * 0.01 + i) * 3, t.y, 2 * t.life, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255,140,20,${t.life * 0.25})`;
                ctx.fill();

                // Blue chakra wisps
                ctx.beginPath();
                ctx.arc(t.x - Math.sin(Date.now() * 0.01 + i) * 3, t.y, 1.5 * t.life, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(80,160,255,${t.life * 0.2})`;
                ctx.fill();
            }
            chakraTrail = chakraTrail.filter(t => t.life > 0);

            // Kunai cursor
            drawKunai(mouse.x, mouse.y);

            // Subtle orange chakra aura around kunai
            const auraGrad = ctx.createRadialGradient(mouse.x, mouse.y, 5, mouse.x, mouse.y, 35);
            auraGrad.addColorStop(0, `rgba(255,140,20,${isClicking ? 0.15 : 0.05})`);
            auraGrad.addColorStop(1, 'transparent');
            ctx.fillStyle = auraGrad;
            ctx.beginPath();
            ctx.arc(mouse.x, mouse.y, 35, 0, Math.PI * 2);
            ctx.fill();

            // Update and draw rasengans
            rasengans = rasengans.filter(r => {
                r.life -= 0.012;
                r.radius += 1.5;
                if (r.life > 0) {
                    drawRasengan(r.x, r.y, r.life, r.radius);
                    return true;
                }
                return false;
            });

            // Update and draw shurikens
            shurikens = shurikens.filter(s => {
                s.x += s.vx;
                s.y += s.vy;
                s.rotation += 0.3;
                s.life -= 0.015;
                if (s.life > 0) {
                    drawShuriken(s.x, s.y, s.rotation, s.life);
                    return true;
                }
                return false;
            });

            animationId = requestAnimationFrame(animate);
        };
        animate();

        // Hide default cursor
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
                zIndex: 9998,
                pointerEvents: 'none',
            }}
        />
    );
}
