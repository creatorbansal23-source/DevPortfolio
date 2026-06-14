import React from 'react';
import { motion } from 'framer-motion';
import SkillsConstellation from '../three/SkillsConstellation';
import { useProfile } from '../hooks/useProfile';

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
  const { profile } = useProfile();

  const groupsList = profile?.skills?.map((s) => ({
    title: s.group,
    items: s.items,
  })) || GROUPS;

  return (
    <section
      id="skills"
      data-testid="skills-section"
      className="relative border-b hairline"
    >
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 lg:px-20 py-16 sm:py-20 md:py-28 grid grid-cols-12 gap-8 lg:gap-12">
        <div className="col-span-12 lg:col-span-5">
          <p className="mono-label text-accent">[ 03 / Stack ]</p>
          <h2 className="mt-4 sm:mt-6 font-display font-extrabold text-white text-[clamp(2.2rem,6vw,4rem)] tracking-tightest leading-[0.95]">
            The full <br />
            <span className="text-accent">production</span> <br />
            stack.
          </h2>
          <p className="mt-5 sm:mt-6 text-white/60 max-w-md text-sm sm:text-base">
            Drag the constellation to inspect every technology I ship with —
            from backend frameworks to cloud primitives and the AI tooling
            layered on top.
          </p>

          <div className="mt-8 sm:mt-10 space-y-6 sm:space-y-8">
            {groupsList.map((g, i) => (
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
                      className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm border hairline text-white/90 hover:border-white/40 hover:text-white transition-colors"
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
          className="col-span-12 lg:col-span-7 h-[360px] sm:h-[460px] md:h-[560px] lg:h-[680px] border hairline relative order-first lg:order-none backdrop-blur-md overflow-hidden"
          style={{ backgroundColor: 'rgba(18, 18, 18, 0.75)' }}
          data-testid="skills-3d-canvas"
        >
          <div className="absolute top-0 left-0 z-10 mono-label p-3 sm:p-4 text-[10px] sm:text-[11px]">
            {'// tech-constellation.live'}
          </div>
          <div className="absolute bottom-0 right-0 z-10 mono-label p-3 sm:p-4 text-white/40 text-[10px] sm:text-[11px]">
            drag to rotate
          </div>
          <SkillsConstellation skills={profile?.skills} />
        </div>

      </div>
    </section>
  );
}
