import { useRef, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export default function AnimatedCounter({ target, prefix = '', suffix = '', duration = 2000 }) {
    const [count, setCount] = useState(0);
    const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (!inView || hasAnimated.current) return;
        hasAnimated.current = true;

        const numericTarget = parseFloat(String(target).replace(/[^0-9.]/g, ''));
        const isFloat = String(target).includes('.');
        const startTime = performance.now();

        const animate = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
            const current = eased * numericTarget;

            setCount(isFloat ? current.toFixed(1) : Math.floor(current));

            if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }, [inView, target, duration]);

    return (
        <span ref={ref}>
            {prefix}{count}{suffix}
        </span>
    );
}
