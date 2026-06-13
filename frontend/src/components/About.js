import React from 'react';
import { motion } from 'framer-motion';
import WhoamiTerminal from './WhoamiTerminal';

const TICKER = [
  'C#', '.NET CORE', 'ASP.NET CORE', 'AZURE', 'COSMOS DB', 'MICROSERVICES',
  'REACT', 'TYPESCRIPT', 'COPILOT STUDIO', 'AI FOUNDRY', 'SONARQUBE',
  'AGILE', 'CI/CD',
];

export default function About() {
  return (
    <section
      id="about"
      data-testid="about-section"
      className="relative border-b hairline"
    >
      {/* Refined ticker — thinner, slower, more elegant */}
      <div className="overflow-hidden border-b hairline py-3 bg-ink">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...TICKER, ...TICKER, ...TICKER].map((t, i) => (
            <span
              key={`${t}-${i}`}
              className="mono-label mx-6 sm:mx-8 text-white/35"
              style={{ fontSize: 11 }}
            >
              {t}
              <span className="text-accent/60 ml-6 sm:ml-8">/</span>
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 lg:px-20 py-16 sm:py-20 md:py-28 lg:py-32 grid grid-cols-12 gap-8 lg:gap-12">
        <div className="col-span-12 md:col-span-4">
          <p className="mono-label text-accent">[ 02 / About ]</p>
          <h2 className="mt-4 sm:mt-6 font-display font-extrabold text-white text-[clamp(2.2rem,6vw,4rem)] tracking-tightest leading-[0.95]">
            Engineer. <br />
            Architect. <br />
            <span className="text-accent">Shipper.</span>
          </h2>
        </div>

        <div className="col-span-12 md:col-span-8 md:col-start-5">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            data-testid="about-narrative"
          >
            <p className="text-white text-xl sm:text-2xl md:text-3xl leading-snug font-display tracking-tight">
              For four years I've been the engineer behind the systems that
              don't make headlines — the ones that just <em className="not-italic text-accent">stay up</em>.
            </p>
            <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-5 text-white/70 text-sm sm:text-base md:text-lg leading-relaxed">
              <p>
                I work at <span className="text-white">Coforge</span> as a Senior Software Engineer,
                building <span className="text-white">ASP.NET Core REST APIs and microservices</span> for
                UK housing portals that serve 10,000+ end users every day. My focus
                is throughput, latency, and the quiet rigor of code that ages well.
              </p>
              <p>
                Lately I'm bringing <span className="text-white">AI-enabled automation</span> into the
                stack with <span className="text-white">Copilot Studio</span> and{' '}
                <span className="text-white">Microsoft AI Foundry</span> — connecting bot services
                to business workflows so teams ship faster.
              </p>
              <p>
                On the human side: I led <span className="text-white">SonarQube</span> adoption
                across our .NET and React codebases, cut technical debt by{' '}
                <span className="text-white">25%</span>, and partnered with UK product teams in
                Agile sprints. Got the awards to show for it.
              </p>
            </div>

            {/* Creative replacement for the 2x2 info tiles */}
            <div className="mt-8 sm:mt-10">
              <WhoamiTerminal />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
