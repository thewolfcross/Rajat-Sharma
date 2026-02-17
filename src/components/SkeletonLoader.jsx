import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SkeletonLoader({ onComplete }) {
    const canvasRef = useRef(null);
    const [knocking, setKnocking] = useState(false);
    const [doorOpen, setDoorOpen] = useState(false);
    const [message, setMessage] = useState("Opportunity is Knocking...");

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationId;
        let particles = [];
        let time = 0;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        // Skeleton Definition (simplified joints)
        // 0: Head, 1: Neck, 2: R-Shoulder, 3: R-Elbow, 4: R-Hand (Knocking)
        // 5: L-Shoulder, 6: L-Elbow, 7: L-Hand, 8: Spine, 9: Hips
        // 10: R-Knee, 11: R-Foot, 12: L-Knee, 13: L-Foot
        let joints = [];

        const initSkeleton = () => {
            const cx = canvas.width / 2;
            const cy = canvas.height / 2 + 50;
            const s = Math.min(canvas.width, canvas.height) * 0.002; // Scale

            joints = [
                { x: cx, y: cy - 150 * s, base: { x: 0, y: -150 } }, // 0 Head
                { x: cx, y: cy - 120 * s, base: { x: 0, y: -120 } }, // 1 Neck
                { x: cx + 40 * s, y: cy - 120 * s, base: { x: 40, y: -120 } }, // 2 R-Sho
                { x: cx + 60 * s, y: cy - 60 * s, base: { x: 60, y: -60 } }, // 3 R-Elb (Animated)
                { x: cx + 50 * s, y: cy - 100 * s, base: { x: 50, y: -100 } }, // 4 R-Hand
                { x: cx - 40 * s, y: cy - 120 * s, base: { x: -40, y: -120 } }, // 5 L-Sho
                { x: cx - 60 * s, y: cy - 50 * s, base: { x: -60, y: -50 } }, // 6 L-Elb
                { x: cx - 70 * s, y: cy + 0 * s, base: { x: -70, y: 0 } }, // 7 L-Hand
                { x: cx, y: cy - 0 * s, base: { x: 0, y: 0 } }, // 8 Spine
                { x: cx, y: cy + 20 * s, base: { x: 0, y: 20 } }, // 9 Hips
                { x: cx + 30 * s, y: cy + 100 * s, base: { x: 30, y: 100 } }, // 10 R-Knee
                { x: cx + 30 * s, y: cy + 180 * s, base: { x: 30, y: 180 } }, // 11 R-Foot
                { x: cx - 30 * s, y: cy + 100 * s, base: { x: -30, y: 100 } }, // 12 L-Knee
                { x: cx - 30 * s, y: cy + 180 * s, base: { x: -30, y: 180 } }, // 13 L-Foot
            ];
        };

        const drawSkeleton = () => {
            const s = Math.min(canvas.width, canvas.height) * 0.002;
            const cx = canvas.width / 2;
            const cy = canvas.height / 2 + 50;

            // Animate Knocking Arm (Joints 3 and 4)
            const knockSpeed = 10;
            const knockAngle = Math.sin(time * knockSpeed) * 0.5; // -0.5 to 0.5

            // If knocking, move the arm
            // R-Elbow stays mostly fixed relative to shoulder, hand moves
            // Simple translation for visual effect
            // Knocking motion: Hand moves forward/back (simulated by x/y)

            // Base positions
            joints.forEach(j => {
                j.x = cx + j.base.x * s;
                j.y = cy + j.base.y * s;
            });

            // Apply Knock Animation to R-Hand (4) and R-Elbow (3)
            // Knocking 3 times quickly, then pause
            const knockCycle = (Date.now() / 1000) % 2; // 2 second loop
            let isKnocking = false;
            if (knockCycle < 0.5) { // Knock for 0.5s
                const k = Math.sin(Date.now() * 0.02) * 20 * s;
                joints[4].x -= k; // Move hand left/right
                joints[3].x -= k * 0.5;
                isKnocking = true;
            }

            if (isKnocking && !knocking) setKnocking(true);
            if (!isKnocking && knocking) setKnocking(false);

            // Draw Connections
            ctx.strokeStyle = '#00d4ff'; // Cyan Skeleton
            ctx.lineWidth = 2;
            ctx.lineCap = 'round';

            const lims = [
                [0, 1], [1, 2], [2, 3], [3, 4], // R-Arm
                [1, 5], [5, 6], [6, 7], // L-Arm
                [1, 8], [8, 9], // Spine
                [9, 10], [10, 11], // R-Leg
                [9, 12], [12, 13] // L-Leg
            ];

            ctx.beginPath();
            lims.forEach(([a, b]) => {
                if (joints[a] && joints[b]) {
                    ctx.moveTo(joints[a].x, joints[a].y);
                    ctx.lineTo(joints[b].x, joints[b].y);
                }
            });
            ctx.stroke();

            // Draw Joints (Stars)
            ctx.fillStyle = '#ffffff';
            joints.forEach(j => {
                ctx.beginPath();
                ctx.arc(j.x, j.y, 4, 0, Math.PI * 2);
                ctx.fill();

                // Glow
                ctx.shadowBlur = 10;
                ctx.shadowColor = '#00d4ff';
            });
            ctx.shadowBlur = 0;

            // Head (Circle)
            ctx.strokeStyle = '#00d4ff';
            ctx.beginPath();
            ctx.arc(joints[0].x, joints[0].y, 15 * s, 0, Math.PI * 2);
            ctx.stroke();
        };

        const drawDoor = () => {
            const cx = canvas.width / 2;
            const cy = canvas.height / 2 + 50;
            const s = Math.min(canvas.width, canvas.height) * 0.002;

            // Door Frame (Neon)
            ctx.strokeStyle = '#ff9f43'; // Orange Door
            ctx.lineWidth = 3;
            ctx.shadowBlur = 20;
            ctx.shadowColor = '#ff9f43';

            const w = 120 * s;
            const h = 250 * s;

            // Draw Door Rect with perspective (Trapezoid?) keeping it simple for now
            // Just a frame the guy is standing "at"
            // He is slightly to the right, knocking on the "air" or a surface?
            // Let's put a "Door Surface" at x: cx + 60*s (where his hand is)

            ctx.beginPath();
            ctx.rect(cx - w / 2, cy - h / 2 - 50 * s, w, h);
            ctx.stroke();
            ctx.shadowBlur = 0;
        }

        const animate = () => {
            // Logic handled in render loop
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Background
            ctx.fillStyle = '#050505';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            if (!doorOpen) {
                initSkeleton();
                drawDoor();
                drawSkeleton();
            }

            time++;
            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resize);
        };
    }, []); // Fixed: Empty dependency array to prevent reset on state change

    const handleEnter = () => {
        setDoorOpen(true);
        // Play Open Sound?
        setTimeout(() => {
            onComplete();
        }, 800);
    };

    return (
        <AnimatePresence>
            {!doorOpen && (
                <motion.div
                    className="skeleton-loader-container"
                    initial={{ opacity: 1 }}
                    style={{
                        position: 'fixed', inset: 0, zIndex: 9999, background: '#050505',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                    }}
                    exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                    transition={{ duration: 0.8 }}
                >
                    <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />

                    <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', marginTop: '30vh' }}>
                        <motion.h2
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            style={{
                                color: '#00d4ff', fontFamily: 'var(--font-heading)',
                                fontSize: '2rem', textTransform: 'uppercase', letterSpacing: '0.2em',
                                marginBottom: 20
                            }}
                        >
                            {knocking ? "Knock Knock..." : "Someone is here"}
                        </motion.h2>

                        <motion.button
                            onClick={handleEnter}
                            whileHover={{ scale: 1.1, textShadow: "0 0 10px #ff9f43" }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                background: 'transparent',
                                border: '2px solid #ff9f43',
                                color: '#ff9f43',
                                padding: '12px 32px',
                                fontSize: '1.2rem',
                                fontFamily: 'var(--font-heading)',
                                cursor: 'pointer',
                                borderRadius: '4px',
                                boxShadow: '0 0 15px rgba(255, 159, 67, 0.2)'
                            }}
                        >
                            OPEN THE DOOR
                        </motion.button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
