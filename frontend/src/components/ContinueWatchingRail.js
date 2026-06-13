import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Cloud, Cpu, Database, Sparkles, Wrench } from 'lucide-react';

const TRACKS = [
  {
    id: 'backend',
    category: 'BACKEND',
    title: 'C# & .NET Core',
    blurb: 'High-throughput REST APIs, microservices, async pipelines, xUnit test pyramids.',
    proficiency: 94,
    tags: ['ASP.NET Core', 'xUnit', 'Microservices'],
    icon: Cpu,
    tint: 'from-[#1f0a08] to-[#0a0a0a]',
    accent: '#FF3B30',
  },
  {
    id: 'cloud',
    category: 'CLOUD',
    title: 'Azure Platform',
    blurb: 'App Services, Functions, Cosmos DB, Service Bus, App Insights — production-tuned.',
    proficiency: 88,
    tags: ['App Services', 'Functions', 'Cosmos DB'],
    icon: Cloud,
    tint: 'from-[#0a1018] to-[#0a0a0a]',
    accent: '#5eb1ff',
  },
  {
    id: 'data',
    category: 'DATA',
    title: 'Cosmos DB & SQL',
    blurb: 'NoSQL + relational design, query tuning, partitioning, indexing strategies.',
    proficiency: 82,
    tags: ['Cosmos DB', 'SQL', 'Indexing'],
    icon: Database,
    tint: 'from-[#0d1a0d] to-[#0a0a0a]',
    accent: '#7bd389',
  },
  {
    id: 'ai',
    category: 'AI · AUTOMATION',
    title: 'Copilot Studio & AI Foundry',
    blurb: 'Bot services, workflow automation, AI-enabled APIs glued to business flow.',
    proficiency: 78,
    tags: ['Copilot Studio', 'AI Foundry', 'Bot Services'],
    icon: Sparkles,
    tint: 'from-[#15101a] to-[#0a0a0a]',
    accent: '#b48cff',
  },
  {
    id: 'frontend',
    category: 'FRONTEND',
    title: 'React & TypeScript',
    blurb: 'Production UIs, design-system discipline, perf budgets, accessibility-first.',
    proficiency: 80,
    tags: ['React', 'TypeScript', 'a11y'],
    icon: Cpu,
    tint: 'from-[#0d121a] to-[#0a0a0a]',
    accent: '#ffd166',
  },
  {
    id: 'quality',
    category: 'QUALITY',
    title: 'SonarQube & CI/CD',
    blurb: 'Static analysis, code coverage, tech-debt reduction (-25%), build automation.',
    proficiency: 90,
    tags: ['SonarQube', 'CI/CD', 'Code Review'],
    icon: Wrench,
    tint: 'from-[#1a160a] to-[#0a0a0a]',
    accent: '#ffd166',
  },
];

function ProficiencyBar({ value, accent }) {
  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mono-label text-white/50">
        <span>PROFICIENCY</span>
        <span style={{ color: accent }}>{value}%</span>
      </div>
      <div className="mt-2 h-1 bg-white/10 overflow-hidden">
        <div
          className="h-full transition-all duration-700"
          style={{ width: `${value}%`, background: accent }}
        />
      </div>
    </div>
  );
}

function TrackCard({ track }) {
  const Icon = track.icon;
  return (
    <article
      data-testid={`watching-card-${track.id}`}
      className={`snap-start shrink-0 w-[260px] sm:w-[300px] md:w-[320px] border hairline bg-gradient-to-br ${track.tint} p-5 sm:p-6 group hover:border-white/30 transition-colors`}
    >
      <div className="flex items-start justify-between">
        <div
          className="w-11 h-11 border hairline flex items-center justify-center"
          style={{ color: track.accent }}
        >
          <Icon size={18} />
        </div>
        <span
          className="mono-label px-2 py-1 border hairline"
          style={{ color: track.accent, borderColor: `${track.accent}55` }}
        >
          {track.category}
        </span>
      </div>
      <h4 className="mt-5 font-display font-extrabold text-white text-xl sm:text-2xl tracking-tight">
        {track.title}
      </h4>
      <p className="mt-2 text-white/65 text-sm leading-relaxed min-h-[3.5rem]">{track.blurb}</p>
      <ProficiencyBar value={track.proficiency} accent={track.accent} />
      <div className="mt-4 flex flex-wrap gap-1.5">
        {track.tags.map((t) => (
          <span key={t} className="px-2 py-0.5 text-[11px] border hairline text-white/80">
            {t}
          </span>
        ))}
      </div>
    </article>
  );
}

export default function ContinueWatchingRail() {
  const railRef = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateBounds = () => {
    const el = railRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft < 8);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
  };

  const scrollBy = (dir) => {
    const el = railRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8 * (dir === 'left' ? -1 : 1);
    el.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <section
      data-testid="continue-watching-rail"
      className="border-t hairline"
    >
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 lg:px-20 py-12 sm:py-16">
        <div className="flex items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <p className="mono-label text-accent">▸ continue watching</p>
            <h3 className="mt-2 font-display font-extrabold text-white text-2xl sm:text-3xl md:text-4xl tracking-tightest leading-tight">
              <span className="text-white/50">Stack tracks —</span> Deepak's lanes
            </h3>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <button
              data-testid="watching-prev"
              aria-label="previous"
              disabled={atStart}
              onClick={() => scrollBy('left')}
              className="w-10 h-10 border hairline text-white/70 hover:text-white hover:border-white/40 transition-colors disabled:opacity-30"
            >
              <ChevronLeft size={18} className="mx-auto" />
            </button>
            <button
              data-testid="watching-next"
              aria-label="next"
              disabled={atEnd}
              onClick={() => scrollBy('right')}
              className="w-10 h-10 border hairline text-white/70 hover:text-white hover:border-white/40 transition-colors disabled:opacity-30"
            >
              <ChevronRight size={18} className="mx-auto" />
            </button>
          </div>
        </div>

        <div
          ref={railRef}
          onScroll={updateBounds}
          className="flex gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory pb-4 -mx-5 px-5 sm:mx-0 sm:px-0 scroll-smooth"
          style={{ scrollbarWidth: 'thin' }}
        >
          {TRACKS.map((t) => (
            <TrackCard key={t.id} track={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
