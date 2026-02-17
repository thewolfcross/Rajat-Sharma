import { motion } from 'framer-motion';

export default function BatmanLogo({ size = 120, color = 'var(--color-primary)', textColor = '#ffffff' }) {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12
        }}>
            <motion.svg
                width={size}
                height={size * 0.6}
                viewBox="0 0 100 60"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{ filter: `drop-shadow(0 0 10px ${color})` }}
            >
                {/* Batman Bat-Wing Logo Path */}
                <path
                    d="M 50 15 
                       C 45 5, 42 5, 40 10 
                       C 35 8, 30 8, 25 12 
                       C 15 10, 5 15, 2 25 
                       C 0 35, 10 50, 25 55 
                       C 35 52, 45 45, 50 40 
                       C 55 45, 65 52, 75 55 
                       C 90 50, 100 35, 98 25 
                       C 95 15, 85 10, 75 12 
                       C 70 8, 65 8, 60 10 
                       C 58 5, 55 5, 50 15 Z"
                    fill={color}
                />
            </motion.svg>

            <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: `${size * 0.2}px`,
                    fontWeight: 900,
                    letterSpacing: '0.3em',
                    color: textColor,
                    textTransform: 'uppercase',
                    textAlign: 'center',
                    textShadow: `0 0 8px ${color}`
                }}
            >
                ENFORCING
            </motion.span>
        </div>
    );
}
