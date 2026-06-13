import React from 'react';
import { motion } from 'framer-motion';
import SkillsConstellation from '../three/SkillsConstellation';

const GROUPS = [
  {
    title: 'Languages & Frameworks',
    items: ['C#', '.NET Core', 'ASP.NET Core', 'REST APIs', 'Microservices', 'React', 'TypeScript', 'JavaScript'],
  },
  {
    title: 'Cloud & Data',
    items: ['Azure App Services', 'Azure Functions', 'Blob Storage', 'App Insights', 'Service Bus', 'Cosmos DB', 'SQL'],
  },
  {
    title: 'AI & Automation',
    items: ['Copilot Studio', 'Microsoft AI Foundry', 'Bot Services', 'Workflow Automation'],
  },
  {
    title: 'Tools & Practices',
    items: ['Git', 'Visual Studio', 'Postman', 'SonarQube', 'xUnit', 'MSTest', 'Agile / Scrum', 'CI/CD'],
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      data-testid="skills-section"
      className="relative border-b hairline"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-28 grid grid-cols-12 gap-10">
        <div className="col-span-12 lg:col-span-5">
          <p className="mono-label text-accent">[ 03 / Stack ]</p>
          <h2 className="mt-6 font-display font-extrabold text-white text-4xl md:text-6xl tracking-tightest leading-none">
            The full <br />
            <span className="text-accent">production</span> <br />
            stack.
          </h2>
          <p className="mt-6 text-white/60 max-w-md">
            Drag the constellation to inspect every technology I ship with —
            from backend frameworks to cloud primitives and the AI tooling
            layered on top.
          </p>

          <div className="mt-10 space-y-8">
            {GROUPS.map((g, i) => (
              <motion.div
                key={g.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                data-testid={`skill-group-${i}`}
              >
                <div className="mono-label text-white/70">{g.title}</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <span
                      key={s}
                      className="px-3 py-1.5 text-sm border hairline text-white/90 hover:border-white/40 hover:text-white transition-colors"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div
          className="col-span-12 lg:col-span-7 h-[520px] md:h-[680px] border hairline relative"
          data-testid="skills-3d-canvas"
        >
          <div className="absolute top-0 left-0 z-10 mono-label p-4">
            // tech-constellation.live
          </div>
          <div className="absolute bottom-0 right-0 z-10 mono-label p-4 text-white/40">
            drag to rotate
          </div>
          <SkillsConstellation />
        </div>
      </div>
    </section>
  );
}
