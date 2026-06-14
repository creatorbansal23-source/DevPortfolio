import React, { useEffect, useState, useMemo } from 'react';

/**
 * A terminal-style block that types lines out sequentially when in view.
 * Lines can include simple inline highlights using a tuple format:
 *   { prompt: '~/deepak ❯', cmd: 'whoami', out: ['line one', 'line two'] }
 */
const BLOCKS = [
  { prompt: '~/deepak ❯', cmd: 'whoami', out: ['Deepak Bansal · Senior Software Engineer'] },
  { prompt: '~/deepak ❯', cmd: 'cat current.role', out: ['Coforge · UK housing-portal APIs · 10K+ users'] },
  { prompt: '~/deepak ❯', cmd: 'ls stack/', out: ['C# · .NET Core · Azure · React · Copilot Studio · AI Foundry'] },
  { prompt: '~/deepak ❯', cmd: 'echo $LOCATION', out: ['New Delhi, IN ⟶ available worldwide'] },
  { prompt: '~/deepak ❯', cmd: 'cat open_to.txt', out: ['Senior · Lead · Staff · Architect'] },
];

function Caret() {
  return (
    <span className="inline-block w-[7px] h-[14px] align-middle ml-1 bg-accent animate-pulse" />
  );
}

export default function WhoamiTerminal({ profile }) {
  const [revealed, setRevealed] = useState(0);

  const blocksList = useMemo(() => {
    if (!profile) return BLOCKS;

    const name = profile.name || 'Deepak Bansal';
    const title = profile.title || 'Senior Software Engineer';
    const location = profile.location || 'New Delhi, India';

    // Get company from the latest experience item
    const currentExp = profile.experience?.[0];
    const company = currentExp?.company || 'Coforge';
    const currentRoleString = `${company} · ${profile.tagline || 'Backend, Cloud & AI Systems'}`;

    // Flat list of skills (up to 8 items) for ls stack/
    const allSkills = profile.skills?.flatMap((g) => g.items).slice(0, 8) || [];
    const skillsLine = allSkills.join(' · ');

    return [
      { prompt: '~/deepak ❯', cmd: 'whoami', out: [`${name} · ${title}`] },
      { prompt: '~/deepak ❯', cmd: 'cat current.role', out: [currentRoleString] },
      { prompt: '~/deepak ❯', cmd: 'ls stack/', out: [skillsLine] },
      { prompt: '~/deepak ❯', cmd: 'echo $LOCATION', out: [`${location} ⟶ available worldwide`] },
      { prompt: '~/deepak ❯', cmd: 'cat open_to.txt', out: ['Senior · Lead · Staff · Architect'] },
    ];
  }, [profile]);

  useEffect(() => {
    if (revealed >= blocksList.length) return;
    const t = setTimeout(() => setRevealed((r) => r + 1), revealed === 0 ? 250 : 520);
    return () => clearTimeout(t);
  }, [revealed, blocksList]);

  return (
    <div
      data-testid="whoami-terminal"
      className="border hairline bg-[#121212]/75 backdrop-blur-md font-mono text-[12.5px] sm:text-sm"
    >
      <div className="flex items-center gap-2 px-4 py-2.5 border-b hairline">
        <span className="w-2 h-2 rounded-full bg-accent" />
        <span className="w-2 h-2 rounded-full bg-white/20" />
        <span className="w-2 h-2 rounded-full bg-white/20" />
        <span className="mono-label ml-2 text-white/40 truncate">deepak@portfolio: ~</span>
      </div>
      <div className="p-4 sm:p-5 space-y-3 leading-relaxed">
        {blocksList.slice(0, revealed).map((b, i) => (
          <div key={b.cmd} className="space-y-1">
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="text-accent shrink-0">{b.prompt}</span>
              <span className="text-white break-all">{b.cmd}</span>
            </div>
            {b.out.map((line) => (
              <div key={line} className="text-white/70 pl-0 sm:pl-4 break-words">
                <span className="text-white/40">›</span> {line}
              </div>
            ))}
          </div>
        ))}
        {revealed < blocksList.length && (
          <div className="flex items-center">
            <span className="text-accent">{'~/deepak ❯'}</span>
            <Caret />
          </div>
        )}
      </div>
    </div>
  );
}

