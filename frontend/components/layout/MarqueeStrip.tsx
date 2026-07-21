'use client';
import { Link } from '@/navigation';

const DEFAULT_TEXT = "Let's build something remarkable";
const REPEAT = 9;

/**
 * Full-width, always-dark, infinite marquee CTA strip.
 * Simplification note: spec suggests slowing to 50% speed on hover;
 * here we simply pause on hover (`hover:[animation-play-state:paused]`)
 * for simplicity and to guarantee no jank from swapping animation durations mid-flight.
 */
export function MarqueeStrip({ text = DEFAULT_TEXT }: { text?: string }) {
  const items = Array.from({ length: REPEAT }, () => text);

  return (
    <Link
      href="/contact"
      className="group relative block overflow-hidden bg-[#0D0D1A] py-6"
      aria-label={text}
    >
      <div className="flex w-max animate-marquee-strip gap-8 group-hover:[animation-play-state:paused]">
        {items.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-8 whitespace-nowrap font-display text-[32px] font-semibold uppercase tracking-tight text-white md:text-[48px]"
          >
            {item}
            <span className="text-primary">✱</span>
          </span>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee-strip {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee-strip {
          animation: marquee-strip 22s linear infinite;
        }
      `}</style>
    </Link>
  );
}
