import React, { useEffect, useRef } from 'react';
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
  const videoRef = useRef(null);
  const prevXRef = useRef(0);
  const targetTimeRef = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const flushSeek = () => {
      rafRef.current = null;
      if (!video.duration) return;
      const target = targetTimeRef.current;
      // Only seek when there's a meaningful difference
      if (Math.abs(video.currentTime - target) > 0.03) {
        video.currentTime = target;
      }
    };

    const handleMouseMove = (e) => {
      if (!video.duration) return;

      if (prevXRef.current === 0) {
        prevXRef.current = e.clientX;
        return;
      }

      const delta = e.clientX - prevXRef.current;
      // Prevent massive jumps when cursor leaves and re-enters the window
      if (Math.abs(delta) > 250) {
        prevXRef.current = e.clientX;
        return;
      }
      prevXRef.current = e.clientX;

      const sensitivity = 2.5;
      const timeOffset = (delta / window.innerWidth) * sensitivity * video.duration;
      let newTarget = targetTimeRef.current + timeOffset;
      newTarget = Math.max(0, Math.min(newTarget, video.duration));
      targetTimeRef.current = newTarget;

      // Batch seeks to once-per-frame via rAF
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(flushSeek);
      }
    };

    const handleMouseLeave = () => {
      prevXRef.current = 0;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="grain min-h-screen bg-ink text-white selection:bg-accent relative overflow-x-hidden">
      {/* Global Background Video (scrubbed by mouse movement) */}
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        className="fixed inset-0 w-full h-full object-cover z-0"
        style={{ objectPosition: '70% center' }}
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4"
      />

      {/* Global dark gradient over video backdrop for readability */}
      <div className="fixed inset-0 bg-gradient-to-br from-ink/90 via-ink/65 to-ink lg:from-ink/75 lg:via-ink/45 lg:to-ink pointer-events-none z-10" />

      {/* Global decorative grid */}
      <div
        aria-hidden="true"
        className="fixed inset-0 opacity-[0.05] pointer-events-none z-10"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Scrollable portfolio contents */}
      <div className="relative z-20">
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
    </div>
  );
}
