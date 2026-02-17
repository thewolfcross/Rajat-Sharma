import { useEffect, useRef } from 'react';

export default function GothamRain() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationId;

        // State
        let raindrops = [];
        let lightning = 0;
        let fogOffset = 0;
        let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        let isLightning = false;
        let jokerLaughs = [];
        let batSignalOpacity = 0;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initRain();
        };

        const initRain = () => {
            raindrops = [];
            const count = Math.floor(canvas.width / 4);
            for (let i = 0; i < count; i++) {
                raindrops.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    speed: Math.random() * 15 + 10,
                    length: Math.random() * 20 + 10,
                    opacity: Math.random() * 0.5 + 0.1
                });
            }
        };

        const onMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        const onTouchMove = (e) => {
            if (e.touches.length > 0) {
                mouse.x = e.touches[0].clientX;
                mouse.y = e.touches[0].clientY;
            }
        };

        const onClick = (e) => {
            // Trigger Joker Laugh
            const laughTexts = ["HA HA", "HEE HEE", "JOKER", "WHY SO SERIOUS?"];
            const text = laughTexts[Math.floor(Math.random() * laughTexts.length)];
            jokerLaughs.push({
                x: e.clientX,
                y: e.clientY,
                text: text,
                size: Math.random() * 20 + 20,
                life: 1,
                vx: (Math.random() - 0.5) * 2,
                vy: -2 - Math.random() * 2,
                color: Math.random() > 0.5 ? '#7209b7' : '#2dc653' // Purple or Green
            });

            // Trigger Lightning occasionally
            if (Math.random() > 0.7) {
                isLightning = true;
                lightning = 1;
            }
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('touchmove', onTouchMove);
        window.addEventListener('click', onClick);

        // Initial setup
        initRain();

        // Building Skyline Data (Procedural-ish)
        const buildings = [];
        const buildingCount = 15;
        const width = window.innerWidth / buildingCount;
        for (let i = 0; i < buildingCount + 2; i++) {
            buildings.push({
                h: Math.random() * 150 + 50, // Height varies
                w: width + Math.random() * 20,
                type: Math.random() > 0.8 ? 'gothic' : 'block' // Some have spires
            });
        }

        const animate = () => {
            // 1. Background
            if (lightning > 0) {
                ctx.fillStyle = `rgba(180, 200, 255, ${lightning * 0.6})`;
                lightning -= 0.05;
            } else {
                const skyGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
                skyGrad.addColorStop(0, '#020408');
                skyGrad.addColorStop(1, '#0f172a');
                ctx.fillStyle = skyGrad;
            }
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // 2. Bat-Signal (Cloud Projection)
            // If mouse is in upper half, show it
            if (mouse.y < canvas.height * 0.6) {
                batSignalOpacity += 0.02;
            } else {
                batSignalOpacity -= 0.02;
            }
            batSignalOpacity = Math.max(0, Math.min(0.4, batSignalOpacity));

            if (batSignalOpacity > 0) {
                ctx.save();
                ctx.translate(mouse.x, mouse.y);
                ctx.fillStyle = `rgba(255, 255, 200, ${batSignalOpacity})`;
                ctx.shadowBlur = 20;
                ctx.shadowColor = 'rgba(255, 255, 200, 0.5)';

                // Oval
                ctx.beginPath();
                ctx.ellipse(0, 0, 60, 40, 0, 0, Math.PI * 2);
                ctx.fill();

                // Bat symbol (simple silhouette inside)
                ctx.fillStyle = `rgba(0,0,0, ${batSignalOpacity * 1.5})`;
                ctx.beginPath();
                // Simple bat shape
                ctx.moveTo(0, -10);
                ctx.quadraticCurveTo(10, -20, 20, -10);
                ctx.lineTo(30, 0);
                ctx.lineTo(15, 5);
                ctx.lineTo(0, 15);
                ctx.lineTo(-15, 5);
                ctx.lineTo(-30, 0);
                ctx.lineTo(-20, -10);
                ctx.quadraticCurveTo(-10, -20, 0, -10);
                ctx.fill();
                ctx.restore();
            }

            // 3. Skyline (Silhouette)
            ctx.fillStyle = '#010203';
            let currentX = 0;
            buildings.forEach((b, i) => {
                const x = i * (window.innerWidth / (buildings.length - 2));
                const y = canvas.height - b.h;
                ctx.fillRect(x, y, b.w, b.h);

                // Windows (Lit randomly)
                if (Math.random() > 0.95) {
                    ctx.fillStyle = '#fef08a'; // Yellow window light
                    const wx = x + Math.random() * (b.w - 5);
                    const wy = y + Math.random() * (b.h - 5);
                    ctx.fillRect(wx, wy, 2, 4);
                    ctx.fillStyle = '#010203'; // Reset
                }

                // Arkham Tower Spire (on specific index)
                if (i === 3) {
                    ctx.beginPath();
                    ctx.moveTo(x + b.w / 2 - 10, y);
                    ctx.lineTo(x + b.w / 2, y - 40);
                    ctx.lineTo(x + b.w / 2 + 10, y);
                    ctx.fill();
                }
            });

            // 4. Batman Silhouette (Perched on left)
            ctx.save();
            const batX = 50;
            const batY = canvas.height - 150; // Perched on a ledge

            // Draw ledge
            ctx.fillStyle = '#000';
            ctx.fillRect(0, canvas.height - 100, 100, 100); // Gargoyle block

            // Draw Batman (Cape & Cowl)
            ctx.translate(batX, batY);
            ctx.fillStyle = '#050505';
            ctx.beginPath();
            ctx.moveTo(0, 0); // Head top
            ctx.lineTo(10, 10); // Ears
            ctx.lineTo(15, 0);
            ctx.lineTo(20, 10);
            ctx.lineTo(30, 50); // Cape flows down
            ctx.lineTo(-10, 50);
            ctx.lineTo(-10, 10);
            ctx.fill();

            // Eyes (Review mouse pos) - White glowing eyes tracking mouse
            const dx = mouse.x - batX;
            const dy = mouse.y - batY;
            const angle = Math.atan2(dy, dx);

            ctx.fillStyle = '#fff';
            ctx.beginPath();
            // Left eye
            ctx.ellipse(5 + Math.cos(angle) * 1, 5 + Math.sin(angle) * 1, 2, 1, 0, 0, Math.PI * 2);
            // Right eye
            ctx.ellipse(12 + Math.cos(angle) * 1, 5 + Math.sin(angle) * 1, 2, 1, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();


            // 5. Fog
            fogOffset += 0.2;
            const fogGrad = ctx.createLinearGradient(0, canvas.height - 400, 0, canvas.height);
            fogGrad.addColorStop(0, 'transparent');
            fogGrad.addColorStop(1, 'rgba(80, 100, 120, 0.3)');
            ctx.fillStyle = fogGrad;
            ctx.fillRect(0, canvas.height - 400, canvas.width, 400);

            // 6. Rain
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            raindrops.forEach(drop => {
                drop.y += drop.speed;
                if (drop.y > canvas.height) {
                    drop.y = -drop.length;
                    drop.x = Math.random() * canvas.width;
                }

                const dx = drop.x - mouse.x;
                const dy = drop.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                let alpha = drop.opacity;
                if (dist < 350) {
                    alpha += (1 - dist / 350) * 0.8;
                    ctx.strokeStyle = `rgba(220, 240, 255, ${Math.min(1, alpha)})`;
                } else {
                    ctx.strokeStyle = `rgba(120, 140, 160, ${alpha * 0.6})`;
                }

                ctx.moveTo(drop.x, drop.y);
                ctx.lineTo(drop.x, drop.y + drop.length);
            });
            ctx.stroke();

            // 7. Joker Laughs
            jokerLaughs.forEach((laugh, i) => {
                laugh.y += laugh.vy;
                laugh.x += laugh.vx;
                laugh.life -= 0.02;
                laugh.size *= 1.01;

                if (laugh.life > 0) {
                    ctx.font = `bold ${laugh.size}px "Comic Sans MS", cursive`; // Joker font
                    ctx.fillStyle = laugh.color;
                    ctx.globalAlpha = laugh.life;
                    ctx.save();
                    ctx.translate(laugh.x, laugh.y);
                    ctx.rotate(Math.random() * 0.2 - 0.1);
                    ctx.fillText(laugh.text, 0, 0);
                    ctx.restore();
                    ctx.globalAlpha = 1;
                }
            });
            jokerLaughs = jokerLaughs.filter(l => l.life > 0);

            // 8. Spotlight Halo
            const spotGrad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 400);
            spotGrad.addColorStop(0, 'rgba(255, 255, 255, 0.08)');
            spotGrad.addColorStop(0.5, 'rgba(200, 220, 255, 0.02)');
            spotGrad.addColorStop(1, 'transparent');
            ctx.fillStyle = spotGrad;
            ctx.beginPath();
            ctx.arc(mouse.x, mouse.y, 400, 0, Math.PI * 2);
            ctx.fill();

            animationId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('click', onClick);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: -1,
                pointerEvents: 'none',
                background: '#020408',
            }}
        />
    );
}
