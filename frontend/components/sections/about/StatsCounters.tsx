'use client';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

export interface Stat { value: number; suffix: string; label: string }

function Counter({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - start) / 1200, 1);
      setN(Math.round(stat.value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, stat.value]);

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-white/10 bg-surface/60 p-6 text-center backdrop-blur transition-transform duration-300 hover:-translate-y-1"
    >
      <span className="font-display text-3xl font-bold text-primary md:text-4xl">
        {n}
        {stat.suffix}
      </span>
      <p className="mt-1 text-sm text-muted">{stat.label}</p>
    </div>
  );
}

export function StatsCounters({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {stats.map((s, i) => (
        <Counter key={`${s.label}-${i}`} stat={s} />
      ))}
    </div>
  );
}
