import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import InteractiveGalaxy from './components/InteractiveGalaxy';
import CursorGlow from './components/CursorGlow';
import ThanosTrigger from './components/ThanosTrigger';
import JethaTrigger from './components/JethaTrigger';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import ImpactDashboard from './sections/ImpactDashboard';
import Experience from './sections/Experience';
import Skills from './sections/Skills';
import CaseStudies from './sections/CaseStudies';
import GamingZone from './sections/GamingZone';
import Testimonials from './sections/Testimonials';
import Contact from './sections/Contact';
import SkeletonLoader from './components/SkeletonLoader';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [thanosMode, setThanosMode] = useState(false);
  const [jethaMode, setJethaMode] = useState(false); // Added jethaMode state

  useEffect(() => {
    document.body.classList.toggle('light-mode', !darkMode);
  }, [darkMode]);

  // Added toggleThanos function for mutual exclusivity
  const toggleThanos = () => {
    setThanosMode(!thanosMode);
    if (jethaMode) setJethaMode(false); // Mutual exclusive
  };

  // Added toggleJetha function for mutual exclusivity
  const toggleJetha = () => {
    setJethaMode(!jethaMode);
    if (thanosMode) setThanosMode(false); // Mutual exclusive
  };

  // Added getModeClass function to determine active mode class
  const getModeClass = () => {
    if (thanosMode) return 'thanos-active';
    if (jethaMode) return 'jetha-active';
    return '';
  };

  return (
    <>
      <AnimatePresence>
        {loading && <PacmanLoader onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      <InteractiveGalaxy darkMode={darkMode} />
      <CursorGlow />
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Updated main className to use getModeClass() and new section rendering logic */}
      <main className={`transition-all duration-1000 ${getModeClass()}`} style={{ position: 'relative', zIndex: 2 }}>
        {/* Hero: Visible in both */}
        <div className="mode-transition thanos-visible jetha-visible"><Hero /></div>

        {/* About: Hidden in both */}
        <div className="mode-transition thanos-hidden jetha-hidden"><About /></div>

        {/* Impact: Visible in both (Main Highlight) */}
        <div className="mode-transition thanos-visible jetha-visible"><ImpactDashboard /></div>

        {/* Experience: Visible in Thanos (Professional), Hidden in Jetha (Fun) */}
        <div className="mode-transition thanos-visible jetha-hidden"><Experience /></div>

        {/* Skills: Hidden in Thanos, Hidden in Jetha */}
        <div className="mode-transition thanos-hidden jetha-hidden"><Skills /></div>

        {/* Case Studies: Hidden in Thanos, Hidden in Jetha */}
        <div className="mode-transition thanos-hidden jetha-hidden"><CaseStudies /></div>

        {/* Games: Hidden in Thanos (Focus), Visible in Jetha (Fun) */}
        <div className="mode-transition thanos-hidden jetha-visible"><GamingZone /></div>

        {/* Testimonials: Hidden in Thanos, Hidden in Jetha */}
        <div className="mode-transition thanos-hidden jetha-hidden"><Testimonials /></div>

        {/* Contact: Visible in Thanos, Hidden in Jetha */}
        <div className="mode-transition thanos-visible jetha-hidden"><Contact /></div>
      </main>

      {/* Updated ThanosTrigger to use toggleThanos */}
      <ThanosTrigger isActive={thanosMode} toggle={toggleThanos} />
      {/* Added JethaTrigger */}
      <JethaTrigger isActive={jethaMode} toggle={toggleJetha} />
    </>
  );
}
