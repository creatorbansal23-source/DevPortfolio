import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Mail } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';
import { useProfile } from '../hooks/useProfile';

const STATS = [
  { id: 'throughput', value: 40, prefix: '+', suffix: '%', label: 'Backend throughput' },
  { id: 'uptime', value: 99.9, suffix: '%', label: 'Uptime delivered' },
  { id: 'users', value: 10000, suffix: '+', label: 'End users served' },
  { id: 'debt', value: 25, prefix: '-', suffix: '%', label: 'Tech debt reduced' },
];

function parseStat(s, index) {
  const valStr = s.value.replace(/[^0-9.]/g, '');
  const value = parseFloat(valStr) || 0;
  const prefix = s.value.startsWith('+') ? '+' : s.value.startsWith('-') ? '-' : '';
  const suffix = s.value.endsWith('%') ? '%' : s.value.endsWith('+') ? '+' : '';
  const id = s.label?.toLowerCase().replace(/\s+/g, '-') || `stat-${index}`;
  return { id, value, prefix, suffix, label: s.label };
}


function KPI({ stat }) {
  return (
    <div data-testid={`hero-stat-${stat.id}`} className="group">
      <div className="font-display font-extrabold text-white tracking-tightest text-[clamp(2rem,5vw,3.25rem)] leading-none flex items-baseline">
        <AnimatedCounter value={stat.value} prefix={stat.prefix || ''} suffix={stat.suffix || ''} />
      </div>
      <div className="mt-2 h-px w-8 bg-accent transition-all duration-300 group-hover:w-16" />
      <div className="mono-label mt-2 text-white/60 group-hover:text-white/90 transition-colors">
        {stat.label}
      </div>
    </div>
  );
}

function LiveStatusPill({ company, year }) {
  return (
    <div
      data-testid="hero-status-pill"
      className="inline-flex items-center gap-2.5 border hairline px-3 py-1.5 bg-ink/40 backdrop-blur-sm"
    >
      <span className="relative inline-flex">
        <span className="absolute inset-0 rounded-full bg-accent opacity-60 animate-ping" />
        <span className="relative w-2 h-2 rounded-full bg-accent" />
      </span>
      <span className="mono-label text-white">SHIPPING · {company || 'COFORGE'} · {year || '2026'}</span>
    </div>
  );
}

export default function Hero() {
  const { profile } = useProfile();

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const currentExp = profile?.experience?.[0];
  const currentCompany = currentExp ? currentExp.company.toUpperCase() : 'COFORGE';
  const currentYear = currentExp ? currentExp.period.split(' ')[0] : '2026';

  const nameParts = (profile?.name || 'Deepak Bansal').toUpperCase().split(' ');
  const firstName = nameParts[0] || 'DEEPAK';
  const lastName = nameParts.slice(1).join(' ') || 'BANSAL';

  const statsList = profile?.stats?.map(parseStat) || STATS;

  return (
    <section
      id="hero"
      data-testid="hero-section"
      className="relative min-h-[100svh] w-full overflow-hidden border-b hairline flex flex-col"
    >
      {/* Top meta — wraps cleanly on small screens */}
      <div className="relative z-10 pt-20 sm:pt-24 md:pt-28">
        <div className="max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 lg:px-20 flex flex-wrap items-center justify-between gap-3">
          <LiveStatusPill company={currentCompany} year={currentYear} />
          <span className="mono-label hidden md:inline">{profile?.location || 'New Delhi, IN'} ⟶ available worldwide</span>
        </div>
      </div>

      {/* Main copy */}
      <div className="relative z-10 flex-1 max-w-[1600px] w-full mx-auto px-5 sm:px-8 md:px-12 lg:px-20 mt-10 sm:mt-14 md:mt-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="mono-label text-accent mb-4 sm:mb-6">[ 01 / Introduction ]</p>
          <h1
            data-testid="hero-headline"
            className="font-display font-extrabold tracking-tightest text-white text-[clamp(2.4rem,9vw,7rem)] leading-[0.92]"
          >
            {firstName} <br />
            {lastName}<span className="text-accent">.</span>
          </h1>
          <div className="mt-6 sm:mt-8 max-w-2xl">
            <p className="text-white/75 text-base sm:text-lg md:text-xl leading-relaxed">
              {profile?.summary || (
                <>
                  I build scalable backend systems and AI-enabled services in{' '}
                  <span className="text-white">C# / .NET</span> on{' '}
                  <span className="text-white">Azure</span>. Currently shipping APIs that
                  power UK housing portals for <span className="text-white">10,000+</span>{' '}
                  end users.
                </>
              )}
            </p>
          </div>

          <div className="mt-8 sm:mt-10 flex flex-wrap gap-3">
            <button
              data-testid="hero-contact-button"
              onClick={() => scrollTo('contact')}
              className="group inline-flex items-center gap-2 px-5 sm:px-6 py-3 bg-white text-ink font-medium hover:bg-accent hover:text-white transition-colors text-sm sm:text-base"
            >
              <Mail size={16} /> Start a conversation
            </button>
            <a
              data-testid="hero-github-link"
              href={profile?.social?.github || "https://github.com/creatorbansal23-source"}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 border hairline bg-[#121212]/70 backdrop-blur-sm text-white hover:bg-[#1c1c1c]/85 hover:border-white/60 transition-colors text-sm sm:text-base"
            >
              <Github size={16} /> View GitHub
            </a>
            <button
              data-testid="hero-resume-button"
              onClick={() => scrollTo('experience')}
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 text-white/70 hover:text-white transition-colors text-sm sm:text-base"
            >
              See experience →
            </button>
          </div>
        </motion.div>
      </div>

      {/* In-flow editorial KPI rail */}
      <div className="relative z-10 mt-12 sm:mt-16 md:mt-20 border-t hairline">
        <div className="max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 lg:px-20 py-6 sm:py-8 md:py-10 backdrop-blur-sm">
          <div className="mono-label text-white/40 mb-4 sm:mb-6">
            ▸ measured impact, last 24 months
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
            {statsList.map((s) => (
              <KPI key={s.id} stat={s} />
            ))}
          </div>
        </div>
      </div>


      {/* Scroll cue — desktop only */}
      <div className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 z-10 flex-col items-center gap-3 text-white/40">
        <span className="vertical-rl mono-label">SCROLL</span>
        <ArrowDown size={14} className="animate-bounce" />
      </div>
    </section>
  );
}
