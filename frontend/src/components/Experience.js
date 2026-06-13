import React from 'react';
import { motion } from 'framer-motion';
import { Award, GraduationCap, Trophy, Users } from 'lucide-react';

const EXPERIENCE = [
  {
    period: 'Jul 2024 — Present',
    company: 'Coforge',
    title: 'Senior Software Engineer',
    location: 'Greater Noida, IN',
    bullets: [
      'Architected scalable ASP.NET Core REST APIs and microservices, improving backend throughput by 40% and reducing latency.',
      'Led SonarQube adoption across .NET and React codebases, reducing technical debt by 25%.',
      'Automated business workflows with background services and integration-driven processing.',
      'Partnered with UK-based product teams in Agile sprints to ship housing-sector applications.',
    ],
  },
  {
    period: 'Nov 2021 — Jul 2024',
    company: 'Coforge',
    title: 'Software Engineer',
    location: 'Greater Noida, IN',
    bullets: [
      'Developed enterprise modules in C# / ASP.NET Core for high-load apps, contributing to 99.9% uptime.',
      'Delivered optimized REST APIs used by 10,000+ end users across UK housing portals.',
      'Collaborated with frontend teams to tighten API contracts and improve responsiveness.',
    ],
  },
];

const AWARDS = [
  { icon: Trophy, name: 'PAT On The Back Award', issuer: 'Coforge', date: 'Sep 2025' },
  { icon: Users, name: 'Collaborator Award', issuer: 'Coforge', date: 'Mar 2025' },
  { icon: Award, name: 'Hackathon Winner', issuer: 'Coforge', date: 'Dec 2024' },
];

export default function Experience() {
  return (
    <section
      id="experience"
      data-testid="experience-section"
      className="relative border-b hairline"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-28">
        <div className="grid grid-cols-12 gap-8 mb-14">
          <div className="col-span-12 md:col-span-7">
            <p className="mono-label text-accent">[ 05 / Trajectory ]</p>
            <h2 className="mt-6 font-display font-extrabold text-white text-4xl md:text-6xl tracking-tightest leading-none">
              Where I've <br />
              <span className="text-accent">delivered.</span>
            </h2>
          </div>
        </div>

        {/* Timeline */}
        <div
          className="relative grid grid-cols-12 gap-6"
          data-testid="experience-timeline"
        >
          {/* vertical line */}
          <div className="hidden md:block absolute top-0 bottom-0 left-[8.333%] w-px bg-line" />

          {EXPERIENCE.map((e, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="col-span-12 md:col-start-2 md:col-span-11 relative pb-14"
            >
              {/* node */}
              <div className="hidden md:block absolute -left-12 top-2 w-3 h-3 border-2 border-accent bg-ink" />
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-3">
                  <div className="mono-label text-accent">{e.period}</div>
                  <div className="mt-2 mono-label text-white/40">{e.location}</div>
                </div>
                <div className="col-span-12 md:col-span-9">
                  <h3 className="font-display font-extrabold text-white text-3xl md:text-4xl tracking-tight">
                    {e.title}
                  </h3>
                  <div className="mt-1 text-white/60 mono-label">{e.company}</div>
                  <ul className="mt-5 space-y-3">
                    {e.bullets.map((b, j) => (
                      <li
                        key={j}
                        className="flex gap-4 text-white/75 leading-relaxed"
                      >
                        <span className="text-accent mt-1.5">▸</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Awards + Education */}
        <div className="mt-16 grid grid-cols-12 gap-px bg-line border hairline">
          <div className="col-span-12 md:col-span-8 bg-ink p-8 md:p-10">
            <div className="mono-label text-accent mb-6">// awards & recognition</div>
            <div className="space-y-5">
              {AWARDS.map((a, i) => {
                const Icon = a.icon;
                return (
                  <div
                    key={i}
                    data-testid={`award-item-${i}`}
                    className="flex items-start gap-5 pb-5 border-b hairline last:border-0 last:pb-0"
                  >
                    <Icon size={22} className="text-accent mt-1 shrink-0" />
                    <div className="flex-1">
                      <div className="font-display text-white text-xl tracking-tight">
                        {a.name}
                      </div>
                      <div className="mono-label mt-1">{a.issuer}</div>
                    </div>
                    <div className="mono-label text-white/50 shrink-0">{a.date}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-span-12 md:col-span-4 bg-ink p-8 md:p-10">
            <div className="mono-label text-accent mb-6">// education</div>
            <div className="flex items-start gap-4">
              <GraduationCap size={22} className="text-accent mt-1 shrink-0" />
              <div>
                <div className="font-display text-white text-xl tracking-tight leading-snug">
                  B.Tech, EECE
                </div>
                <div className="text-white/70 mt-1 text-sm">SRMS CET, Bareilly</div>
                <div className="mono-label mt-3">Graduated 2020</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
