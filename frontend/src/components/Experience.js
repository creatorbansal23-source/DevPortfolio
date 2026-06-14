import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Award, GraduationCap, Trophy, Users } from 'lucide-react';
import { useProfile } from '../hooks/useProfile';

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

const getAwardIcon = (name) => {
  const lower = name.toLowerCase();
  if (lower.includes('pat') || lower.includes('trophy')) return Trophy;
  if (lower.includes('collaborator') || lower.includes('users')) return Users;
  return Award;
};


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

function AwardRow({ award, rank }) {
  const Icon = award.icon;
  return (
    <div
      data-testid={`award-item-${award.id}`}
      className="relative flex items-end gap-4 sm:gap-6 pl-2 sm:pl-4 pb-6 border-b hairline last:border-0 last:pb-0 overflow-hidden"
    >
      {/* Netflix-style giant rank numeral */}
      <div
        aria-hidden="true"
        className="font-display font-extrabold leading-none select-none shrink-0"
        style={{
          fontSize: 'clamp(64px, 12vw, 128px)',
          color: 'transparent',
          WebkitTextStroke: '2px rgba(255,255,255,0.18)',
          lineHeight: 0.85,
          letterSpacing: '-0.04em',
        }}
      >
        {String(rank).padStart(2, '0')}
      </div>
      <div className="flex-1 min-w-0 pb-1">
        <div className="flex items-center gap-3">
          <Icon size={18} className="text-accent shrink-0" />
          <div className="mono-label">{award.issuer}</div>
        </div>
        <div className="mt-1 font-display text-white text-xl sm:text-2xl tracking-tight leading-tight">
          {award.name}
        </div>
      </div>
      <div className="mono-label text-white/50 shrink-0 pb-1">{award.date}</div>
    </div>
  );
}

export default function Experience() {
  const { profile } = useProfile();

  const experienceList = useMemo(() => {
    if (!profile?.experience) return EXPERIENCE;
    return profile.experience.map((exp, idx) => ({
      id: `${exp.company.toLowerCase()}-${idx}`,
      period: exp.period,
      company: exp.company,
      title: exp.title,
      location: exp.location,
      bullets: exp.highlights.map((h, hIdx) => ({
        id: `${exp.company.toLowerCase()}-${idx}-bullet-${hIdx}`,
        text: h
      }))
    }));
  }, [profile]);

  const awardsList = useMemo(() => {
    if (!profile?.awards) return AWARDS;
    return profile.awards.map((a, idx) => ({
      id: `award-${idx}`,
      icon: getAwardIcon(a.name),
      name: a.name,
      issuer: a.issuer,
      date: a.date
    }));
  }, [profile]);

  const educationList = useMemo(() => {
    if (!profile?.education) {
      return [
        {
          degree: 'B.Tech, EECE',
          institution: 'SRMS CET, Bareilly',
          year: '2020'
        }
      ];
    }
    return profile.education;
  }, [profile]);

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
          {experienceList.map((e, i) => (
            <TimelineItem key={e.id} role={e} index={i} />
          ))}
        </div>

        <div className="mt-14 sm:mt-16 grid grid-cols-12 gap-px bg-line border hairline">
          <div className="col-span-12 md:col-span-8 bg-[#121212]/75 backdrop-blur-md p-6 sm:p-8 md:p-10">
            <div className="flex items-center justify-between mb-5 sm:mb-6">
              <div className="mono-label text-accent">{'// top 3 recognitions'}</div>
              <span className="mono-label px-2 py-1 bg-accent text-white" style={{ fontSize: 9 }}>TOP 3</span>
            </div>
            <div className="space-y-6">
              {awardsList.map((a, i) => (
                <AwardRow key={a.id} award={a} rank={i + 1} />
              ))}
            </div>
          </div>
          <div className="col-span-12 md:col-span-4 bg-[#121212]/75 backdrop-blur-md p-6 sm:p-8 md:p-10">
            <div className="mono-label text-accent mb-5 sm:mb-6">{'// education'}</div>
            <div className="space-y-6">
              {educationList.map((edu, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <GraduationCap size={22} className="text-accent mt-1 shrink-0" />
                  <div>
                    <div className="font-display text-white text-xl tracking-tight leading-snug">
                      {edu.degree}
                    </div>
                    <div className="text-white/70 mt-1 text-sm">{edu.institution}</div>
                    <div className="mono-label mt-3">Graduated {edu.year}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
