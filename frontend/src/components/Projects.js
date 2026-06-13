import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Star, GitFork } from 'lucide-react';
import { useGithubRepos } from '../hooks/useGithubRepos';

const FEATURED = [
  {
    key: 'DiagramAI',
    blurb: 'AI-assisted diagram generator — turn natural language into clean architecture visuals.',
    stack: ['Python', 'LLM', 'Visualization'],
    accent: true,
  },
  {
    key: 'budget-planner',
    blurb: 'TypeScript personal-finance planner — track expenses, categorize spend, project budgets.',
    stack: ['TypeScript', 'React', 'Charts'],
    accent: false,
  },
  {
    key: 'CarDamageEstimatorV2',
    blurb: 'Image-based estimator that classifies vehicle damage from photos.',
    stack: ['Computer Vision', 'Web', 'HTML'],
    accent: false,
  },
  {
    key: 'DevPortfolio',
    blurb: 'This site. Immersive 3D engineering portfolio built with React Three Fiber.',
    stack: ['React', 'Three.js', 'Framer Motion'],
    accent: true,
  },
];

function mergeWithLive(featured, repos) {
  return featured.map((f) => {
    const live = repos.find((r) => r.name?.toLowerCase() === f.key.toLowerCase());
    return {
      key: f.key,
      name: live?.name || f.key,
      blurb: live?.description || f.blurb,
      stack: live?.topics?.length ? live.topics.slice(0, 4) : f.stack,
      language: live?.language,
      url: live?.html_url || `https://github.com/creatorbansal23-source/${f.key}`,
      stars: live?.stargazers_count ?? 0,
      forks: live?.forks_count ?? 0,
      accent: f.accent,
    };
  });
}

function ProjectCard({ project, index }) {
  const p = project;
  return (
    <motion.a
      href={p.url}
      target="_blank"
      rel="noreferrer"
      data-testid={`project-card-${p.key.toLowerCase()}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="group col-span-12 md:col-span-6 bg-ink p-8 md:p-10 hover:bg-[#0d0d0d] transition-colors relative"
    >
      <div className="flex items-start justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mono-label">
            <span className="text-white/40">{String(index + 1).padStart(2, '0')}</span>
            {p.language && <span className="text-accent">{p.language}</span>}
          </div>
          <h3 className="mt-4 font-display font-extrabold text-white text-3xl md:text-4xl tracking-tight">
            {p.name}
          </h3>
          <p className="mt-3 text-white/65 max-w-xl">{p.blurb}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <span key={s} className="px-2.5 py-1 text-xs border hairline text-white/80">
                {s}
              </span>
            ))}
          </div>
        </div>
        <div className="text-white/40 group-hover:text-accent transition-colors">
          <ExternalLink size={20} />
        </div>
      </div>

      <div className="mt-8 pt-6 border-t hairline flex items-center justify-between mono-label">
        <span className="flex items-center gap-4">
          <span className="inline-flex items-center gap-1">
            <Star size={12} /> {p.stars}
          </span>
          <span className="inline-flex items-center gap-1">
            <GitFork size={12} /> {p.forks}
          </span>
        </span>
        <span
          data-testid="project-github-link"
          className="inline-flex items-center gap-2 text-white/70 group-hover:text-white"
        >
          <Github size={12} /> View source
        </span>
      </div>

      {p.accent && <span className="absolute top-0 right-0 w-2 h-12 bg-accent" />}
    </motion.a>
  );
}

export default function Projects() {
  const { repos, loading } = useGithubRepos();
  const items = mergeWithLive(FEATURED, repos);

  return (
    <section id="projects" data-testid="projects-section" className="relative border-b hairline">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-28">
        <div className="grid grid-cols-12 gap-8 mb-14">
          <div className="col-span-12 md:col-span-7">
            <p className="mono-label text-accent">[ 04 / Selected work ]</p>
            <h2 className="mt-6 font-display font-extrabold text-white text-4xl md:text-6xl tracking-tightest leading-none">
              Things I've <br />
              <span className="text-accent">built &amp; shipped.</span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-5 flex items-end">
            <p className="text-white/60">
              A mix of production work, side projects, and explorations. Pulled live from GitHub —
              click any card to view source.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-px bg-line border hairline">
          {items.map((p, i) => (
            <ProjectCard key={p.key} project={p} index={i} />
          ))}
        </div>

        {loading && (
          <p className="mono-label mt-8 text-white/40">{'// syncing with github…'}</p>
        )}
      </div>
    </section>
  );
}
