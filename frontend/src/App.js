import React from 'react';
import './App.css';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import ContinueWatchingRail from './components/ContinueWatchingRail';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import IntroOverlay from './components/IntroOverlay';

export default function App() {
  return (
    <div className="grain min-h-screen bg-ink text-white selection:bg-accent">
      <IntroOverlay />
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <ContinueWatchingRail />
        <Projects />
        <Experience />
        <Contact />
      </main>
    </div>
  );
}
