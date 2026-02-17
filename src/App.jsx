import { useState, useEffect } from 'react';
import InteractiveGalaxy from './components/InteractiveGalaxy';
import CursorGlow from './components/CursorGlow';
import ThanosTrigger from './components/ThanosTrigger';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import ImpactDashboard from './sections/ImpactDashboard';
import Experience from './sections/Experience';
import Skills from './sections/Skills';
import CaseStudies from './sections/CaseStudies';
import TicTacToe from './sections/TicTacToe';
import Testimonials from './sections/Testimonials';
import Contact from './sections/Contact';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [thanosMode, setThanosMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('light-mode', !darkMode);
  }, [darkMode]);

  return (
    <>
      <LoadingScreen />
      <InteractiveGalaxy />
      <CursorGlow />
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className={`transition-all duration-1000 ${thanosMode ? 'thanos-active' : ''}`} style={{ position: 'relative', zIndex: 2 }}>
        <div className="section-essential"><Hero /></div>
        <div className="section-non-essential"><About /></div>
        <div className="section-essential"><ImpactDashboard /></div>
        <div className="section-essential"><Experience /></div>
        <div className="section-non-essential"><Skills /></div>
        <div className="section-non-essential"><CaseStudies /></div>
        <div className="section-non-essential"><TicTacToe /></div>
        <div className="section-non-essential"><Testimonials /></div>
        <div className="section-essential"><Contact /></div>
      </main>

      <ThanosTrigger isActive={thanosMode} toggle={() => setThanosMode(!thanosMode)} />
    </>
  );
}
