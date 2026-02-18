import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InteractiveImageBackground from './components/InteractiveImageBackground';
import ThanosTrigger from './components/ThanosTrigger';
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
import PortfolioLoader from './components/PortfolioLoader';
import SelectionGate from './components/SelectionGate';
import MiniGame from './components/MiniGame';
import CustomCursor from './components/CustomCursor';

export default function App() {
  const [appState, setAppState] = useState('selecting'); // 'selecting', 'game', 'loading', 'profile'
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [thanosMode, setThanosMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('light-mode', !darkMode);
  }, [darkMode]);

  const toggleThanos = () => {
    setThanosMode(!thanosMode);
  };

  const handleSelection = (choice) => {
    if (choice === 'game') {
      setAppState('game');
    } else {
      setAppState('loading');
    }
  };

  const handleGameComplete = () => {
    setAppState('loading');
  };

  const handleLoadingComplete = () => {
    setLoading(false);
    setAppState('profile');
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'dark' : ''}`}>
      <CustomCursor darkMode={darkMode} />
      <AnimatePresence mode="wait">
        {appState === 'selecting' && (
          <SelectionGate
            key="selection-gate"
            onPlayGame={() => handleSelection('game')}
            onGoToProfile={() => handleSelection('profile')}
          />
        )}
        {appState === 'game' && (
          <MiniGame key="mini-game" onComplete={handleGameComplete} />
        )}
        {appState === 'loading' && (
          <PortfolioLoader key="portfolio-loader" onComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>

      {appState === 'profile' && (
        <div className="relative">
          <InteractiveImageBackground />
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

          <main style={{ position: 'relative', zIndex: 2 }}>
            <Hero darkMode={darkMode} />

            <AnimatePresence>
              {!thanosMode && (
                <motion.div
                  key="extra-content"
                  initial={{ opacity: 1, filter: 'blur(0px)' }}
                  exit={{
                    opacity: 0,
                    filter: 'blur(20px)',
                    y: -20,
                    transition: { duration: 1.5, ease: "easeOut" }
                  }}
                >
                  <About />
                </motion.div>
              )}
            </AnimatePresence>

            <ImpactDashboard />
            <Experience />

            <AnimatePresence>
              {!thanosMode && (
                <motion.div
                  key="extra-content-lower"
                  initial={{ opacity: 1, filter: 'blur(0px)' }}
                  exit={{
                    opacity: 0,
                    filter: 'blur(30px)',
                    scale: 0.95,
                    transition: { duration: 2, ease: "easeOut" }
                  }}
                >
                  <Skills />
                  <CaseStudies />
                  <GamingZone />
                  <Testimonials />
                </motion.div>
              )}
            </AnimatePresence>

            <Contact />
          </main>

          <ThanosTrigger isActive={thanosMode} toggle={toggleThanos} />
        </div>
      )}
    </div>
  );
}
