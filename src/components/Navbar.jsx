import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';

const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Impact', href: '#impact' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Case Studies', href: '#casestudies' },
    { label: 'Contact', href: '#contact' },
];

export default function Navbar({ darkMode, setDarkMode }) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -80 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                backdropFilter: scrolled ? 'blur(20px)' : 'none',
                WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
                background: scrolled
                    ? (darkMode ? 'rgba(10,10,15,0.8)' : 'rgba(248,249,252,0.85)')
                    : 'transparent',
                borderBottom: scrolled
                    ? `1px solid ${darkMode ? 'rgba(0,212,255,0.08)' : 'rgba(0,0,0,0.06)'}`
                    : '1px solid transparent',
                transition: 'all 0.3s ease',
            }}
        >
            <div style={{
                maxWidth: 1200,
                margin: '0 auto',
                padding: '0 24px',
                height: 72,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                {/* Logo */}
                <a href="#" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.4rem',
                        fontWeight: 700,
                        letterSpacing: '-0.02em',
                    }}>
                        <span className="gradient-text">R</span>
                        <span style={{ color: darkMode ? '#e4e4e7' : '#1e293b' }}>S</span>
                    </span>
                </a>

                {/* Desktop Links */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 32,
                }}
                    className="nav-desktop"
                >
                    {navLinks.map(link => (
                        <a
                            key={link.href}
                            href={link.href}
                            style={{
                                textDecoration: 'none',
                                fontSize: '0.85rem',
                                fontWeight: 500,
                                color: darkMode ? 'var(--color-dark-muted)' : 'var(--color-light-muted)',
                                transition: 'color 0.2s',
                                letterSpacing: '0.01em',
                            }}
                            onMouseEnter={e => e.target.style.color = 'var(--color-primary)'}
                            onMouseLeave={e => e.target.style.color = darkMode ? 'var(--color-dark-muted)' : 'var(--color-light-muted)'}
                        >
                            {link.label}
                        </a>
                    ))}
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        aria-label="Toggle theme"
                        style={{
                            background: 'none',
                            border: `1px solid ${darkMode ? 'var(--color-dark-border)' : 'var(--color-light-border)'}`,
                            borderRadius: 8,
                            padding: 8,
                            cursor: 'pointer',
                            color: darkMode ? 'var(--color-dark-text)' : 'var(--color-light-text)',
                            display: 'flex',
                            alignItems: 'center',
                            transition: 'border-color 0.2s',
                        }}
                    >
                        {darkMode ? <FiSun size={16} /> : <FiMoon size={16} />}
                    </button>
                </div>

                {/* Mobile Toggle */}
                <div className="nav-mobile" style={{ display: 'none', alignItems: 'center', gap: 12 }}>
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        aria-label="Toggle theme"
                        style={{
                            background: 'none', border: 'none', cursor: 'pointer',
                            color: darkMode ? 'var(--color-dark-text)' : 'var(--color-light-text)',
                            display: 'flex', alignItems: 'center',
                        }}
                    >
                        {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
                    </button>
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Menu"
                        style={{
                            background: 'none', border: 'none', cursor: 'pointer',
                            color: darkMode ? 'var(--color-dark-text)' : 'var(--color-light-text)',
                            display: 'flex', alignItems: 'center',
                        }}
                    >
                        {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                        background: darkMode ? 'rgba(10,10,15,0.98)' : 'rgba(248,249,252,0.98)',
                        backdropFilter: 'blur(20px)',
                        padding: '16px 24px 24px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 16,
                    }}
                >
                    {navLinks.map(link => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={() => setMobileOpen(false)}
                            style={{
                                textDecoration: 'none',
                                fontSize: '1rem',
                                fontWeight: 500,
                                color: darkMode ? 'var(--color-dark-text)' : 'var(--color-light-text)',
                                padding: '8px 0',
                                borderBottom: `1px solid ${darkMode ? 'var(--color-dark-border)' : 'var(--color-light-border)'}`,
                            }}
                        >
                            {link.label}
                        </a>
                    ))}
                </motion.div>
            )}

            <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile { display: flex !important; }
        }
      `}</style>
        </motion.nav>
    );
}
