import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import InteractiveGalaxy from './components/InteractiveGalaxy';
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

  const getModeClass = () => {
    return thanosMode ? 'thanos-active' : '';
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
    <>
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
        <>
          <InteractiveGalaxy darkMode={darkMode} />
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

          <main className={`transition-all duration-1000 ${getModeClass()}`} style={{ position: 'relative', zIndex: 2 }}>
            <div className="mode-transition thanos-visible"><Hero darkMode={darkMode} /></div>
            <div className="mode-transition thanos-hidden"><About /></div>
            <div className="mode-transition thanos-visible"><ImpactDashboard /></div>
            <div className="mode-transition thanos-visible"><Experience /></div>
            <div className="mode-transition thanos-hidden"><Skills /></div>
            <div className="mode-transition thanos-hidden"><CaseStudies /></div>
            <div className="mode-transition thanos-hidden"><GamingZone /></div>
            <div className="mode-transition thanos-hidden"><Testimonials /></div>
            <div className="mode-transition thanos-visible"><Contact /></div>
          </main>

          <ThanosTrigger isActive={thanosMode} toggle={toggleThanos} />
        </>
      )}
    </>
  );
}
