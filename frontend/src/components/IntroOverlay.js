import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Code2, Compass, X } from 'lucide-react';

const PROFILES = [
  {
    id: 'recruiter',
    label: 'Recruiter',
    badge: { text: 'GUIDED · 60s', color: 'bg-accent text-white' },
    icon: Briefcase,
    blurb: 'Impact, awards, contact — the hiring view.',
    flow: ['experience', 'projects', 'contact'],
    accent: '#FF3B30',
  },
  {
    id: 'engineer',
    label: 'Engineer',
    badge: { text: 'DEEP DIVE', color: 'bg-white text-ink' },
    icon: Code2,
    blurb: 'Architecture, stack, and the code behind it.',
    flow: ['projects', 'skills', 'experience'],
    accent: '#ffffff',
  },
  {
    id: 'explorer',
    label: 'Just exploring',
    badge: { text: 'FREEROAM', color: 'bg-white/10 text-white' },
    icon: Compass,
    blurb: 'No agenda. Scroll at your own pace.',
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
  const [open, setOpen] = useState(false);
  const [picked, setPicked] = useState(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const seen = window.localStorage.getItem(STORAGE_KEY);
    if (!seen) setOpen(true);
    // Expose a global re-open hook for the footer link
    window.__openIntro = () => setOpen(true);
  }, []);

  const choose = (profile) => {
    setPicked(profile.id);
    window.localStorage.setItem(STORAGE_KEY, profile.id);
    setTimeout(() => {
      setOpen(false);
      autoScroll(profile.flow);
    }, 650);
  };

  const skip = () => {
    window.localStorage.setItem(STORAGE_KEY, 'skipped');
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
          className="fixed inset-0 z-[100] bg-ink"
          style={{
            backgroundImage:
              'radial-gradient(circle at 50% 30%, rgba(255,59,48,0.10), transparent 60%), linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: 'auto, 56px 56px, 56px 56px',
          }}
        >
          <button
            onClick={skip}
            data-testid="intro-close"
            aria-label="close intro"
            className="absolute top-5 right-5 sm:top-7 sm:right-7 text-white/50 hover:text-white transition-colors p-2"
          >
            <X size={20} />
          </button>

          <div className="h-full w-full flex flex-col items-center justify-center px-5 sm:px-8 py-12 overflow-y-auto">
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-center max-w-3xl"
            >
              <div className="mono-label text-accent">— PORTFOLIO —</div>
              <h1 className="mt-5 font-display font-extrabold text-white tracking-tightest leading-[0.95] text-[clamp(2.5rem,8vw,5.5rem)]">
                Who's <span className="text-accent">exploring?</span>
              </h1>
              <p className="mt-5 text-white/60 text-sm sm:text-base max-w-lg mx-auto">
                Pick how you'd like to navigate Deepak's work. We'll fast-track you
                to what matters — or just step aside if you prefer to wander.
              </p>
            </motion.div>

            <div className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full max-w-4xl">
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
                    className={`group relative text-left p-5 sm:p-6 border hairline bg-[#0a0a0a] hover:bg-[#101010] hover:border-white/30 transition-colors ${
                      isPicked ? 'border-accent' : ''
                    }`}
                  >
                    <span
                      className={`absolute top-3 right-3 mono-label px-2 py-1 ${p.badge.color}`}
                      style={{ fontSize: 9 }}
                    >
                      {p.badge.text}
                    </span>
                    <div
                      className="w-12 h-12 sm:w-14 sm:h-14 border hairline flex items-center justify-center mb-5"
                      style={{ color: p.accent }}
                    >
                      <Icon size={22} />
                    </div>
                    <div className="font-display font-extrabold text-white text-2xl sm:text-3xl tracking-tight">
                      {p.label}
                      <span className="text-accent">.</span>
                    </div>
                    <div className="mt-2 text-white/60 text-sm">{p.blurb}</div>
                    <div className="mt-5 mono-label text-white/40 group-hover:text-white transition-colors">
                      ENTER →
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
              className="mt-10 sm:mt-12 mono-label text-white/40 hover:text-white transition-colors px-3 py-2"
            >
              skip intro →
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
