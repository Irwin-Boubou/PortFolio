'use client';
import { useEffect, useState } from 'react';
import { Link } from '@/navigation';

interface Props {
  size?: number;
  showWordmark?: boolean;
  wordmarkColor?: string;
  className?: string;
}

/**
 * "The Node" — the Benison mark: an atomic structure with three distinctly
 * shaped orbital rings, five electrons, and a glowing nucleus. Rendered
 * inline (not <img>) so CSS can target and animate individual children.
 *
 * Icon-scale redraw (not the full 12-layer master in public/logo.svg): at
 * the 26-36px this renders at, thin strokes wash out, and near-identical
 * ring shapes blend into one blob — so the three rings here deliberately
 * differ in proportion (flat oval / near-circle / wide flat) so each one
 * stays visually distinct even at a glance.
 */
export function Logo({ size = 36, showWordmark = true, wordmarkColor = 'var(--text)', className }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // runs once on mount — triggers the draw-in/appear animation, then stays put
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <Link href="/" className={`logo-group inline-flex items-center gap-2.5 ${className ?? ''}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={mounted ? 'logo-loaded' : ''}
        aria-hidden="true"
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
          <radialGradient id="logo-nucleus" cx="38%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
            <stop offset="45%" stopColor="#9B94FF" />
            <stop offset="100%" stopColor="#3A34CC" />
          </radialGradient>
          <radialGradient id="logo-coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00D9FF" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#00D9FF" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ring 1 — flat oval, purple-dominant, tilted 55deg */}
        <g className="logo-orbit-1" style={{ transformOrigin: '60px 60px' }}>
          <ellipse
            cx="60" cy="60" rx="48" ry="22" fill="none"
            stroke="#6C63FF" strokeWidth="5" strokeLinecap="round"
            strokeDasharray="225" transform="rotate(55 60 60)"
          />
        </g>

        {/* ring 2 — near-circular, cyan, tilted -55deg: visually distinct from ring 1's flat oval */}
        <g className="logo-orbit-2" style={{ transformOrigin: '60px 60px' }}>
          <ellipse
            cx="60" cy="60" rx="40" ry="36" fill="none"
            stroke="#00D9FF" strokeWidth="5" strokeLinecap="round"
            strokeDasharray="240" transform="rotate(-55 60 60)"
          />
        </g>

        {/* ring 3 — equatorial, wide and flat, gradient */}
        <g className="logo-orbit-3" style={{ transformOrigin: '60px 60px' }}>
          <ellipse
            cx="60" cy="60" rx="50" ry="14" fill="none"
            stroke="url(#logo-gH)" strokeWidth="5" strokeLinecap="round"
            strokeDasharray="200"
          />
        </g>

        <g className="logo-nucleus-group logo-nucleus" style={{ transformOrigin: '60px 60px' }}>
          <circle cx="60" cy="60" r="26" fill="none" stroke="url(#logo-gPC)" strokeWidth="1.5" strokeOpacity="0.75" />
          <circle cx="60" cy="60" r="23" fill="url(#logo-nucleus)" />
          <circle cx="60" cy="60" r="9.5" fill="url(#logo-coreGlow)" />
          <circle cx="60" cy="60" r="4.5" fill="#ffffff" />
        </g>

        {/* E1 — brightest, cyan, hero electron */}
        <circle className="logo-e1" cx="97" cy="17" r="8.5" fill="#00D9FF" style={{ transformOrigin: '97px 17px' }} />
        {/* E2 — purple */}
        <circle cx="104" cy="82" r="6.5" fill="#6C63FF" />
        {/* E3 — gradient */}
        <circle cx="22" cy="94" r="7" fill="url(#logo-gPC)" />
        {/* E4 — small purple */}
        <circle cx="12" cy="46" r="4" fill="#8B84FF" opacity="0.85" />
        {/* E5 — small cyan */}
        <circle cx="70" cy="106" r="4" fill="#00D9FF" opacity="0.8" />
      </svg>

      {showWordmark && (
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            letterSpacing: '-0.04em',
            fontSize: `${size * 0.58}px`,
            color: wordmarkColor,
            lineHeight: 1,
          }}
        >
          Benison
        </span>
      )}

      <style jsx>{`
        @media (prefers-reduced-motion: no-preference) {
          .logo-group:hover .logo-orbit-1 {
            animation: logoOrbit1 8s linear infinite;
          }
          .logo-group:hover .logo-orbit-2 {
            animation: logoOrbit2 12s linear infinite;
          }
          .logo-group:hover .logo-orbit-3 {
            animation: logoOrbit3 18s linear infinite;
          }
          .logo-group:hover .logo-e1 {
            animation: logoElectronPulse 1.4s ease-in-out infinite;
          }
          .logo-group:hover .logo-nucleus {
            animation: logoNucleusBreathe 2s ease-in-out infinite;
          }

          .logo-loaded .logo-orbit-1 ellipse {
            animation: logoDrawIn1 1s ease-out forwards;
          }
          .logo-loaded .logo-orbit-2 ellipse {
            animation: logoDrawIn2 1s ease-out 0.25s forwards;
          }
          .logo-loaded .logo-orbit-3 ellipse {
            animation: logoDrawIn3 1s ease-out 0.5s forwards;
          }
          .logo-loaded .logo-e1 {
            animation: logoElectronAppear 0.5s ease-out 0.85s both;
          }
          .logo-loaded .logo-nucleus-group {
            animation: logoNucleusAppear 0.7s ease-out 0.7s both;
          }
        }

        @keyframes logoOrbit1 {
          from { transform: rotate(55deg); }
          to { transform: rotate(415deg); }
        }
        @keyframes logoOrbit2 {
          from { transform: rotate(-55deg); }
          to { transform: rotate(-415deg); }
        }
        @keyframes logoOrbit3 {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes logoElectronPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.35); }
        }
        @keyframes logoNucleusBreathe {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.85; }
        }
        @keyframes logoDrawIn1 {
          from { stroke-dashoffset: 225; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes logoDrawIn2 {
          from { stroke-dashoffset: 240; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes logoDrawIn3 {
          from { stroke-dashoffset: 200; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes logoElectronAppear {
          0% { transform: scale(0); opacity: 0; }
          60% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes logoNucleusAppear {
          0% { transform: scale(0.4); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </Link>
  );
}
