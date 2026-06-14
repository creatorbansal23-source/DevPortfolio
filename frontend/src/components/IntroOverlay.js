import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Code2, Compass, X } from 'lucide-react';

const PROFILES = [
  {
    id: 'recruiter',
    label: 'Recruiter',
    badge: { text: 'GUIDED · 60s', color: 'bg-accent text-white' },
    icon: Briefcase,
    blurb: 'Discover top-tier engineering talent vetted for performance.',
    flow: ['experience', 'projects', 'contact'],
    accent: '#FF3B30',
  },
  {
    id: 'engineer',
    label: 'Engineer',
    badge: { text: 'DEEP DIVE', color: 'bg-white text-ink' },
    icon: Code2,
    blurb: 'Deep dive into technical architectures and code documentation.',
    flow: ['projects', 'skills', 'experience'],
    accent: '#ffffff',
  },
  {
    id: 'explorer',
    label: 'Just exploring',
    badge: { text: 'FREEROAM', color: 'bg-white/10 text-white' },
    icon: Compass,
    blurb: 'Casual browse through our ecosystem and digital craft.',
    flow: null,
    accent: '#aaaaaa',
  },
];

const STORAGE_KEY = 'deepak-portfolio:intro-seen-v1';

function autoScroll(flowIds) {
  if (!flowIds || !flowIds.length) return;
  let i = 0;
  const next = () => {
    const id = flowIds[i];
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    i += 1;
    if (i < flowIds.length) setTimeout(next, 3200);
  };
  setTimeout(next, 700);
}

export default function IntroOverlay() {
  const [open, setOpen] = useState(true);
  const [picked, setPicked] = useState(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Always scroll to top on page load / refresh
    window.scrollTo(0, 0);
    // Expose a global re-open hook for the footer link
    window.__openIntro = () => setOpen(true);
  }, []);

  // Lock body scroll while the overlay is visible
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = open ? 'hidden' : prev || '';
    return () => {
      document.body.style.overflow = prev || '';
    };
  }, [open]);

  const choose = (profile) => {
    setPicked(profile.id);
    setTimeout(() => {
      setOpen(false);
      autoScroll(profile.flow);
    }, 650);
  };

  const skip = () => {
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
          data-testid="intro-overlay"
          className="fixed inset-0 z-[100] bg-ink/75 backdrop-blur-md overflow-hidden"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '56px 56px, 56px 56px',
          }}
        >
          {/* Vertical Grid Lines */}
          <div className="absolute left-1/4 top-0 bottom-0 w-px bg-white/[0.04] z-10 pointer-events-none hidden md:block" />
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/[0.04] z-10 pointer-events-none" />
          <div className="absolute left-3/4 top-0 bottom-0 w-px bg-white/[0.04] z-10 pointer-events-none hidden md:block" />

          {/* Central Radial Red Glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] pointer-events-none z-0 filter blur-[80px] opacity-40 sm:opacity-50"
            style={{
              background: 'radial-gradient(circle, rgba(255, 59, 48, 0.15) 0%, rgba(255, 59, 48, 0) 70%)',
            }}
          />

          <button
            onClick={skip}
            data-testid="intro-close"
            aria-label="close intro"
            className="absolute top-5 right-5 sm:top-7 sm:right-7 text-white/50 hover:text-white transition-colors p-2 z-30"
          >
            <X size={20} />
          </button>

          <div className="h-full w-full flex flex-col items-center justify-center px-5 sm:px-8 py-12 overflow-y-auto z-20 relative">
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="flex flex-col items-center mb-10 sm:mb-14 text-center max-w-3xl"
            >
              <h1 className="font-display font-extrabold text-white tracking-tightest leading-tight text-3xl sm:text-4xl md:text-5xl">
                Who's <span className="text-accent">exploring?</span>
              </h1>
              <div className="mt-4 h-px w-24 bg-accent/30" />
              <p className="mt-5 text-white/60 text-sm sm:text-base max-w-md mx-auto">
                Pick how you'd like to navigate Deepak's work. We'll fast-track you
                to what matters — or just step aside if you prefer to wander.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-5xl z-20">
              {PROFILES.map((p, i) => {
                const Icon = p.icon;
                const isPicked = picked === p.id;
                return (
                  <motion.button
                    key={p.id}
                    data-testid={`intro-profile-${p.id}`}
                    onClick={() => choose(p)}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.25 + i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -4 }}
                    className={`group relative text-left p-8 border bg-black/60 backdrop-blur-md hover:bg-neutral-900/40 hover:border-accent/50 transition-all duration-500 overflow-hidden rounded-none ${
                      isPicked ? 'border-accent' : 'border-white/10'
                    }`}
                  >
                    {/* Corner radial glow decoration */}
                    <div className="absolute -top-12 -right-12 w-24 h-24 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/20 transition-all duration-500 pointer-events-none" />

                    <span
                      className={`absolute top-4 right-4 mono-label px-2.5 py-1 ${p.badge.color} rounded-none`}
                      style={{ fontSize: 9 }}
                    >
                      {p.badge.text}
                    </span>

                    <div className="flex items-center justify-center w-12 h-12 bg-white/5 mb-6 border border-white/10 group-hover:border-accent/30 transition-colors duration-500 rounded-none">
                      <Icon size={20} className="text-accent" />
                    </div>

                    <h3 className="font-display font-extrabold text-white text-2xl sm:text-3xl tracking-tight mb-3">
                      {p.label}
                      <span className="text-accent">.</span>
                    </h3>

                    <p className="font-body text-white/60 text-sm leading-relaxed mb-8 min-h-[40px] sm:min-h-[48px]">
                      {p.blurb}
                    </p>

                    <div className="flex items-center gap-1.5 mono-label text-accent/80 group-hover:text-accent transition-colors">
                      <span>ENTER</span>
                      <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            <motion.button
              data-testid="intro-skip"
              onClick={skip}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-14 sm:mt-16 flex items-center gap-1.5 mono-label text-accent/60 hover:text-accent transition-colors px-3 py-2 group z-20"
            >
              <span>SKIP INTRO</span>
              <span className="group-hover:translate-x-0.5 transition-transform">»</span>
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
