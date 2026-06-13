import React from 'react';
import { motion } from 'framer-motion';
import { Award, GraduationCap, Trophy, Users } from 'lucide-react';

const EXPERIENCE = [
  {
    id: 'sse-coforge',
    period: 'Jul 2024 — Present',
    company: 'Coforge',
    title: 'Senior Software Engineer',
    location: 'Greater Noida, IN',
    bullets: [
      { id: 'sse-throughput', text: 'Architected scalable ASP.NET Core REST APIs and microservices, improving backend throughput by 40% and reducing latency.' },
      { id: 'sse-sonar', text: 'Led SonarQube adoption across .NET and React codebases, reducing technical debt by 25%.' },
      { id: 'sse-automation', text: 'Automated business workflows with background services and integration-driven processing.' },
      { id: 'sse-agile', text: 'Partnered with UK-based product teams in Agile sprints to ship housing-sector applications.' },
    ],
  },
  {
    id: 'se-coforge',
    period: 'Nov 2021 — Jul 2024',
    company: 'Coforge',
    title: 'Software Engineer',
    location: 'Greater Noida, IN',
    bullets: [
      { id: 'se-uptime', text: 'Developed enterprise modules in C# / ASP.NET Core for high-load apps, contributing to 99.9% uptime.' },
      { id: 'se-apis', text: 'Delivered optimized REST APIs used by 10,000+ end users across UK housing portals.' },
      { id: 'se-contracts', text: 'Collaborated with frontend teams to tighten API contracts and improve responsiveness.' },
    ],
  },
];

const AWARDS = [
  { id: 'pat', icon: Trophy, name: 'PAT On The Back Award', issuer: 'Coforge', date: 'Sep 2025' },
  { id: 'collab', icon: Users, name: 'Collaborator Award', issuer: 'Coforge', date: 'Mar 2025' },
  { id: 'hack', icon: Award, name: 'Hackathon Winner', issuer: 'Coforge', date: 'Dec 2024' },
];

function TimelineItem({ role, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="col-span-12 md:col-start-2 md:col-span-11 relative pb-10 sm:pb-14"
    >
      {/* mobile node (absolute on the mobile vertical line) */}
      <div className="md:hidden absolute -left-[18px] top-2 w-2 h-2 border-2 border-accent bg-ink" />
      {/* desktop node */}
      <div className="hidden md:block absolute -left-12 top-2 w-3 h-3 border-2 border-accent bg-ink" />
      <div className="grid grid-cols-12 gap-4 sm:gap-6">
        <div className="col-span-12 md:col-span-3">
          <div className="mono-label text-accent">{role.period}</div>
          <div className="mt-1 sm:mt-2 mono-label text-white/40">{role.location}</div>
        </div>
        <div className="col-span-12 md:col-span-9">
          <h3 className="font-display font-extrabold text-white text-2xl sm:text-3xl md:text-4xl tracking-tight">
            {role.title}
          </h3>
          <div className="mt-1 text-white/60 mono-label">{role.company}</div>
          <ul className="mt-4 sm:mt-5 space-y-3">
            {role.bullets.map((b) => (
              <li key={b.id} className="flex gap-3 sm:gap-4 text-white/75 text-sm sm:text-base leading-relaxed">
                <span className="text-accent mt-1.5 shrink-0">▸</span>
                <span>{b.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

function AwardRow({ award }) {
  const Icon = award.icon;
  return (
    <div
      data-testid={`award-item-${award.id}`}
      className="flex items-start gap-5 pb-5 border-b hairline last:border-0 last:pb-0"
    >
      <Icon size={22} className="text-accent mt-1 shrink-0" />
      <div className="flex-1">
        <div className="font-display text-white text-xl tracking-tight">{award.name}</div>
        <div className="mono-label mt-1">{award.issuer}</div>
      </div>
      <div className="mono-label text-white/50 shrink-0">{award.date}</div>
    </div>
  );
}

export default function Experience() {
  return (
    <section
      id="experience"
      data-testid="experience-section"
      className="relative border-b hairline"
    >
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 lg:px-20 py-16 sm:py-20 md:py-28">
        <div className="grid grid-cols-12 gap-8 mb-10 sm:mb-14">
          <div className="col-span-12 md:col-span-7">
            <p className="mono-label text-accent">[ 05 / Trajectory ]</p>
            <h2 className="mt-4 sm:mt-6 font-display font-extrabold text-white text-[clamp(2.2rem,6vw,4rem)] tracking-tightest leading-[0.95]">
              Where I've <br />
              <span className="text-accent">delivered.</span>
            </h2>
          </div>
        </div>

        <div className="relative grid grid-cols-12 gap-4 sm:gap-6 pl-6 md:pl-0" data-testid="experience-timeline">
          <div className="absolute top-1 bottom-0 left-1.5 md:left-[8.333%] w-px bg-line" />
          {EXPERIENCE.map((e, i) => (
            <TimelineItem key={e.id} role={e} index={i} />
          ))}
        </div>

        <div className="mt-14 sm:mt-16 grid grid-cols-12 gap-px bg-line border hairline">
          <div className="col-span-12 md:col-span-8 bg-ink p-6 sm:p-8 md:p-10">
            <div className="mono-label text-accent mb-5 sm:mb-6">{'// awards & recognition'}</div>
            <div className="space-y-5">
              {AWARDS.map((a) => (
                <AwardRow key={a.id} award={a} />
              ))}
            </div>
          </div>
          <div className="col-span-12 md:col-span-4 bg-ink p-6 sm:p-8 md:p-10">
            <div className="mono-label text-accent mb-5 sm:mb-6">{'// education'}</div>
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
