import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function SectionWrapper({ children, id, className = '' }) {
    const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

    return (
        <motion.section
            id={id}
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className={className}
        >
            {children}
        </motion.section>
    );
}
