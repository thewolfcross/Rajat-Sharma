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
import BatmanJobLoader from './components/BatmanJobLoader';
import SelectionGate from './components/SelectionGate';
import MiniGame from './components/MiniGame';

export default function App() {
  const [appState, setAppState] = useState('selecting'); // 'selecting', 'game', 'loading', 'profile'
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [thanosMode, setThanosMode] = useState(false);
  const [jethaMode, setJethaMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('light-mode', !darkMode);
  }, [darkMode]);

  const toggleThanos = () => {
    setThanosMode(!thanosMode);
    if (jethaMode) setJethaMode(false);
  };

  const toggleJetha = () => {
    setJethaMode(!jethaMode);
    if (thanosMode) setThanosMode(false);
  };

  const getModeClass = () => {
    if (thanosMode) return 'thanos-active';
    if (jethaMode) return 'jetha-active';
    return '';
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
      <AnimatePresence>
        {appState === 'selecting' && (
          <SelectionGate
            onPlayGame={() => handleSelection('game')}
            onGoToProfile={() => handleSelection('profile')}
          />
        )}
        {appState === 'game' && (
          <MiniGame onComplete={handleGameComplete} />
        )}
        {appState === 'loading' && <BatmanJobLoader onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      {(appState === 'profile' || (appState === 'loading' && !loading)) && (
        <>
          <InteractiveGalaxy darkMode={darkMode} />
          <CursorGlow />
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

          <main className={`transition-all duration-1000 ${getModeClass()}`} style={{ position: 'relative', zIndex: 2 }}>
            <div className="mode-transition thanos-visible jetha-visible"><Hero /></div>
            <div className="mode-transition thanos-hidden jetha-hidden"><About /></div>
            <div className="mode-transition thanos-visible jetha-visible"><ImpactDashboard /></div>
            <div className="mode-transition thanos-visible jetha-hidden"><Experience /></div>
            <div className="mode-transition thanos-hidden jetha-hidden"><Skills /></div>
            <div className="mode-transition thanos-hidden jetha-hidden"><CaseStudies /></div>
            <div className="mode-transition thanos-hidden jetha-visible"><GamingZone /></div>
            <div className="mode-transition thanos-hidden jetha-hidden"><Testimonials /></div>
            <div className="mode-transition thanos-visible jetha-hidden"><Contact /></div>
          </main>

          <ThanosTrigger isActive={thanosMode} toggle={toggleThanos} />
          <JethaTrigger isActive={jethaMode} toggle={toggleJetha} />
        </>
      )}
    </>
  );
}
