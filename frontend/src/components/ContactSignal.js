import React, { useEffect, useState } from 'react';

/**
 * Animated signal block for the Contact section.
 * Live pulsing dot + 3 status rows + a rotating "now playing" focus line.
 */
const FOCUS = [
  'Architecting AI-enabled housing-portal APIs',
  'Cutting tech debt with SonarQube + xUnit',
  'Tuning Azure Functions for sub-100ms cold starts',
  'Shipping Copilot Studio automations to product teams',
];

const ROWS = [
  { label: 'Status', value: 'Available · open to senior + lead', accent: true },
  { label: 'Reply window', value: 'Under 24 hours · IST workdays' },
  { label: 'Time zone', value: 'GMT +5:30 · flexible with UK & EU' },
  { label: 'Best fit', value: 'Backend · cloud · platform · AI integration' },
];

export default function ContactSignal() {
  const [focusIdx, setFocusIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setFocusIdx((i) => (i + 1) % FOCUS.length), 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <div data-testid="contact-signal" className="mt-12 border-t hairline pt-8">
      {/* Live availability pill */}
      <div className="inline-flex items-center gap-3 border hairline px-4 py-2">
        <span className="relative inline-flex">
          <span className="absolute inset-0 rounded-full bg-accent opacity-60 animate-ping" />
          <span className="relative w-2.5 h-2.5 rounded-full bg-accent" />
        </span>
        <span className="mono-label text-white">LIVE · OPEN TO WORK</span>
      </div>

      {/* Now-shipping rotator */}
      <div className="mt-6 border hairline p-5 bg-[#121212]/75 backdrop-blur-md">
        <div className="mono-label text-white/40 mb-2">NOW SHIPPING</div>
        <div className="font-display text-white text-lg sm:text-xl tracking-tight min-h-[1.75rem]">
          <span key={focusIdx} className="block animate-[fadeIn_0.5s_ease-out]">
            {FOCUS[focusIdx]}
            <span className="text-accent">.</span>
          </span>
        </div>
      </div>

      {/* Signal rows */}
      <ul className="mt-6 divide-y divide-white/5 border-t border-b hairline">
        {ROWS.map((r) => (
          <li
            key={r.label}
            className="grid grid-cols-3 gap-3 py-3.5 items-baseline"
            data-testid={`contact-signal-${r.label.toLowerCase().replace(/\s+/g, '-')}`}
          >
            <span className="mono-label col-span-1">{r.label}</span>
            <span
              className={`col-span-2 text-sm sm:text-base ${
                r.accent ? 'text-white' : 'text-white/70'
              }`}
            >
              {r.accent && (
                <span className="inline-block w-1.5 h-1.5 bg-accent mr-2 align-middle" />
              )}
              {r.value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
