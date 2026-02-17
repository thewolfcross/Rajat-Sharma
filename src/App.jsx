import { useState, useEffect } from 'react';
import ParticleBackground from './components/ParticleBackground';
import CursorGlow from './components/CursorGlow';
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

  useEffect(() => {
    document.body.classList.toggle('light-mode', !darkMode);
  }, [darkMode]);

  return (
    <>
      <LoadingScreen />
      <ParticleBackground />
      <CursorGlow />
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <main style={{ position: 'relative', zIndex: 2 }}>
        <Hero />
        <About />
        <ImpactDashboard />
        <Experience />
        <Skills />
        <CaseStudies />
        <TicTacToe />
        <Testimonials />
        <Contact />
      </main>
    </>
  );
}
