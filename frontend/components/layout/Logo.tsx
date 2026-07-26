'use client';
/**
 * Benison — The Node — static logo mark (identical to the PageLoader mark).
 * No motion: the rings/electrons never draw in or rotate; only a soft, steady
 * glow (matching the loading page). Inline SVG so the glow can be applied via CSS.
 */

import { Link } from '@/navigation';

interface LogoProps {
  /** Width and height of the SVG mark in px. Default: 36 */
  size?: number;
  /** Show "Benison" wordmark text beside the mark. Default: true */
  showWordmark?: boolean;
  /** CSS color value for the wordmark. Default: var(--color-text-primary) */
  wordmarkColor?: string;
  className?: string;
}

export function Logo({
  size = 36,
  showWordmark = true,
  wordmarkColor = 'var(--color-text-primary)',
  className = '',
}: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="Benison — Home"
      className={`logo-group inline-flex items-center gap-2.5 outline-none ${className}`}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="logo-svg flex-shrink-0"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="logo-gPC" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6C63FF" />
            <stop offset="100%" stopColor="#00D9FF" />
          </linearGradient>
          <linearGradient id="logo-gH" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6C63FF" />
            <stop offset="100%" stopColor="#00D9FF" />
          </linearGradient>
          <radialGradient id="logo-gNucleus" cx="38%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
            <stop offset="45%" stopColor="#6C63FF" />
            <stop offset="100%" stopColor="#3A34CC" />
          </radialGradient>
          <radialGradient id="logo-gGl1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6C63FF" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#6C63FF" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="logo-gGl2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00D9FF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#00D9FF" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient glow */}
        <circle cx="60" cy="60" r="58" fill="url(#logo-gGl1)" opacity="0.7" />
        <circle cx="60" cy="60" r="38" fill="url(#logo-gGl2)" opacity="0.3" />

        {/* Orbit rings */}
        <g>
          <ellipse cx="60" cy="60" rx="54" ry="17" fill="none" stroke="url(#logo-gPC)" strokeWidth="1.4" opacity="0.55" transform="rotate(60 60 60)" />
          <ellipse cx="60" cy="60" rx="54" ry="17" fill="none" stroke="#6C63FF" strokeWidth="5" opacity="0.07" transform="rotate(60 60 60)" />
        </g>
        <g>
          <ellipse cx="60" cy="60" rx="48" ry="15" fill="none" stroke="#00D9FF" strokeWidth="1.1" opacity="0.4" transform="rotate(-60 60 60)" />
          <ellipse cx="60" cy="60" rx="48" ry="15" fill="none" stroke="#00D9FF" strokeWidth="5" opacity="0.06" transform="rotate(-60 60 60)" />
        </g>
        <ellipse cx="60" cy="60" rx="51" ry="13" fill="none" stroke="url(#logo-gH)" strokeWidth="1.6" opacity="0.5" />

        {/* Electrons */}
        <g>
          <circle cx="90" cy="16" r="5.5" fill="#00D9FF" />
          <circle cx="90" cy="16" r="11" fill="#00D9FF" opacity="0.18" />
          <circle cx="88" cy="14" r="1.8" fill="white" opacity="0.6" />
        </g>
        <g>
          <circle cx="108" cy="64" r="4.5" fill="#6C63FF" />
          <circle cx="108" cy="64" r="9" fill="#6C63FF" opacity="0.16" />
          <circle cx="106" cy="62" r="1.4" fill="white" opacity="0.4" />
        </g>
        <g>
          <circle cx="32" cy="100" r="5" fill="url(#logo-gPC)" />
          <circle cx="32" cy="100" r="10" fill="#6C63FF" opacity="0.15" />
          <circle cx="30" cy="98" r="1.6" fill="white" opacity="0.45" />
        </g>
        <circle cx="18" cy="42" r="3.5" fill="#6C63FF" opacity="0.75" />
        <circle cx="18" cy="42" r="7" fill="#6C63FF" opacity="0.1" />
        <circle cx="96" cy="98" r="3" fill="#00D9FF" opacity="0.7" />
        <circle cx="8" cy="62" r="3" fill="#8877FF" opacity="0.65" />

        {/* Nucleus */}
        <g>
          <circle cx="60" cy="60" r="26" fill="url(#logo-gGl1)" opacity="0.6" />
          <circle cx="60" cy="60" r="18" fill="url(#logo-gGl2)" opacity="0.4" />
          <circle cx="60" cy="60" r="21" fill="none" stroke="url(#logo-gPC)" strokeWidth="1.2" opacity="0.4" />
          <circle cx="60" cy="60" r="18" fill="url(#logo-gNucleus)" />
          <circle cx="55" cy="55" r="5" fill="#6C63FF" opacity="0.45" />
          <circle cx="65" cy="57" r="4" fill="#8877FF" opacity="0.38" />
          <circle cx="57" cy="65" r="4" fill="#5599FF" opacity="0.38" />
          <circle cx="66" cy="65" r="3.5" fill="#6C63FF" opacity="0.3" />
          <circle cx="60" cy="60" r="8" fill="url(#logo-gGl2)" opacity="0.8" />
          <circle cx="60" cy="60" r="4" fill="white" opacity="0.22" />
          <circle cx="55" cy="55" r="2.8" fill="white" opacity="0.16" />
        </g>
      </svg>

      {showWordmark && (
        <span
          className="font-display font-bold leading-none tracking-tight"
          style={{ fontSize: `${(size * 0.58).toFixed(1)}px`, color: wordmarkColor, letterSpacing: '-0.04em' }}
        >
          Benison
        </span>
      )}

      <style>{`
        /* Steady glow, identical to the loading-page mark. No ring/electron motion. */
        .logo-svg {
          filter: drop-shadow(0 0 8px rgba(108,99,255,0.5))
                  drop-shadow(0 0 18px rgba(0,217,255,0.28));
        }
        .logo-group:focus-visible {
          outline: 2px solid var(--color-primary);
          outline-offset: 4px;
          border-radius: 6px;
        }
      `}</style>
    </Link>
  );
}
