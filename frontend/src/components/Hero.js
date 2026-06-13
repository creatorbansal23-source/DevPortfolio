import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Mail } from 'lucide-react';
import HeroScene from '../three/HeroScene';

const STATS = [
  { v: '+40%', l: 'Backend throughput' },
  { v: '99.9%', l: 'Uptime delivered' },
  { v: '10K+', l: 'End users served' },
  { v: '-25%', l: 'Tech debt reduced' },
];

export default function Hero() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <section
      id="hero"
      data-testid="hero-section"
      className="relative min-h-screen w-full overflow-hidden border-b hairline"
    >
      {/* 3D background canvas */}
      <div className="absolute inset-0">
        <HeroScene />
      </div>
      {/* readability overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/30 to-ink/90 pointer-events-none" />

      {/* Top meta strip */}
      <div className="relative z-10 pt-24 md:pt-28">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between mono-label">
          <span>// Senior Software Engineer · Coforge</span>
          <span className="hidden md:inline">New Delhi, IN ⟶ Available worldwide</span>
        </div>
      </div>

      {/* Main copy */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 mt-16 md:mt-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="mono-label text-accent mb-6">[ 01 / Introduction ]</p>
          <h1
            data-testid="hero-headline"
            className="font-display font-extrabold tracking-tightest text-white text-[44px] sm:text-6xl md:text-7xl lg:text-[112px] leading-[0.92]"
          >
            DEEPAK <br />
            BANSAL<span className="text-accent">.</span>
          </h1>
          <div className="mt-8 max-w-2xl">
            <p className="text-white/70 text-lg md:text-xl leading-relaxed">
              I build scalable backend systems and AI-enabled services in{' '}
              <span className="text-white">C# / .NET</span> on{' '}
              <span className="text-white">Azure</span>. Currently shipping APIs that
              power UK housing portals for <span className="text-white">10,000+</span>{' '}
              end users.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <button
              data-testid="hero-contact-button"
              onClick={() => scrollTo('contact')}
              className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-ink font-medium hover:bg-accent hover:text-white transition-colors"
            >
              <Mail size={16} /> Start a conversation
            </button>
            <a
              data-testid="hero-github-link"
              href="https://github.com/creatorbansal23-source"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border hairline text-white hover:border-white/60 transition-colors"
            >
              <Github size={16} /> View GitHub
            </a>
            <button
              data-testid="hero-resume-button"
              onClick={() => scrollTo('experience')}
              className="inline-flex items-center gap-2 px-6 py-3 text-white/70 hover:text-white transition-colors"
            >
              See experience →
            </button>
          </div>
        </motion.div>
      </div>

      {/* Stats bento — bottom-left grid */}
      <div className="absolute bottom-0 inset-x-0 z-10 border-t hairline bg-ink/60 backdrop-blur-sm">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-2 md:grid-cols-4">
          {STATS.map((s, i) => (
            <div
              key={i}
              data-testid={`hero-stat-${i}`}
              className={`py-6 md:py-8 ${
                i !== 0 ? 'border-l hairline' : ''
              } ${i >= 2 ? 'md:border-l' : ''} ${i === 2 ? 'border-t md:border-t-0' : ''}`}
            >
              <div className="font-display font-extrabold text-3xl md:text-5xl text-white tracking-tightest">
                {s.v}
              </div>
              <div className="mono-label mt-2">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute right-6 md:right-12 lg:right-20 bottom-44 md:bottom-48 z-10 hidden md:flex flex-col items-center gap-3 text-white/40">
        <span className="vertical-rl mono-label">SCROLL</span>
        <ArrowDown size={14} className="animate-bounce" />
      </div>
    </section>
  );
}
