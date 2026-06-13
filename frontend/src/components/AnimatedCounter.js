import React, { useEffect, useRef, useState } from 'react';

/**
 * Counts up to a target value when the element scrolls into view.
 * Supports numeric input + an optional prefix/suffix string.
 * Respects prefers-reduced-motion.
 */
export default function AnimatedCounter({ value, prefix = '', suffix = '', duration = 1400, className = '' }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (reduce) {
      setDisplay(value);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            const start = performance.now();
            const tick = (now) => {
              const t = Math.min(1, (now - start) / duration);
              // easeOutCubic
              const eased = 1 - Math.pow(1 - t, 3);
              setDisplay(value * eased);
              if (t < 1) requestAnimationFrame(tick);
              else setDisplay(value);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [value, duration]);

  // Format display value — preserve integer feel for the common cases
  const formatted = Number.isFinite(display)
    ? value >= 100
      ? Math.round(display).toLocaleString()
      : display.toFixed(value % 1 === 0 ? 0 : 1)
    : value;

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
