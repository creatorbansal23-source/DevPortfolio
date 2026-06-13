import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header
      data-testid="site-nav"
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-ink/80 backdrop-blur-md border-b hairline' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 h-16 flex items-center justify-between">
        <button
          data-testid="nav-logo"
          onClick={() => scrollTo('hero')}
          className="flex items-center gap-2 text-white font-display font-extrabold tracking-tightest text-lg"
        >
          <span className="inline-block w-2 h-2 bg-accent" />
          DEEPAK<span className="text-accent">.</span>
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <button
              key={l.id}
              data-testid={`nav-link-${l.id}`}
              onClick={() => scrollTo(l.id)}
              className="mono-label text-white/70 hover:text-white transition-colors"
            >
              {l.label}
            </button>
          ))}
          <button
            data-testid="nav-cta"
            onClick={() => scrollTo('contact')}
            className="px-4 py-2 bg-white text-ink hover:bg-accent hover:text-white transition-colors font-medium text-sm"
          >
            Get in touch →
          </button>
        </nav>

        <button
          data-testid="nav-menu-toggle"
          className="md:hidden text-white p-2"
          onClick={() => setOpen(!open)}
          aria-label="menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-t hairline bg-ink/95 backdrop-blur"
        >
          <div className="px-6 py-6 flex flex-col gap-4">
            {LINKS.map((l) => (
              <button
                key={l.id}
                data-testid={`nav-mobile-${l.id}`}
                onClick={() => scrollTo(l.id)}
                className="text-left mono-label text-white/80"
              >
                {l.label}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  );
}
