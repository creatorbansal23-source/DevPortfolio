import React, { useEffect, useState } from 'react';

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

export default function WhoamiTerminal() {
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    if (revealed >= BLOCKS.length) return;
    const t = setTimeout(() => setRevealed((r) => r + 1), revealed === 0 ? 250 : 520);
    return () => clearTimeout(t);
  }, [revealed]);

  return (
    <div
      data-testid="whoami-terminal"
      className="border hairline bg-[#0a0a0a] font-mono text-[12.5px] sm:text-sm"
    >
      <div className="flex items-center gap-2 px-4 py-2.5 border-b hairline">
        <span className="w-2 h-2 rounded-full bg-accent" />
        <span className="w-2 h-2 rounded-full bg-white/20" />
        <span className="w-2 h-2 rounded-full bg-white/20" />
        <span className="mono-label ml-2 text-white/40 truncate">deepak@portfolio: ~</span>
      </div>
      <div className="p-4 sm:p-5 space-y-3 leading-relaxed">
        {BLOCKS.slice(0, revealed).map((b, i) => (
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
        {revealed < BLOCKS.length && (
          <div className="flex items-center">
            <span className="text-accent">{'~/deepak ❯'}</span>
            <Caret />
          </div>
        )}
      </div>
    </div>
  );
}
