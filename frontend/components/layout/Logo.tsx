'use client';
import { useEffect, useRef, useState } from 'react';
import { Link } from '@/navigation';

interface Props {
  size?: number;
  showWordmark?: boolean;
  wordmarkColor?: string;
  className?: string;
}

/**
 * "The Node" — the Benison mark: an atomic structure with three orbital
 * rings, six electrons, and a layered glowing nucleus. Rendered inline
 * (not <img>) so CSS can target and animate individual child elements.
 */
export function Logo({ size = 36, showWordmark = true, wordmarkColor = 'var(--text)', className }: Props) {
  const [mounted, setMounted] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // runs once on mount — triggers the draw-in/appear animation, then stays put
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <Link href="/" className={`logo-group inline-flex items-center gap-2.5 ${className ?? ''}`}>
      <svg
        ref={svgRef}
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
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
            <stop offset="45%" stopColor="#6C63FF" />
            <stop offset="100%" stopColor="#3A34CC" />
          </radialGradient>
          <radialGradient id="logo-coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00D9FF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#00D9FF" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g className="logo-orbit-1" style={{ transformOrigin: '60px 60px' }}>
          <ellipse
            cx="60" cy="60" rx="50" ry="19" fill="none"
            stroke="url(#logo-gPC)" strokeWidth="2.4"
            strokeDasharray="400" transform="rotate(60 60 60)"
          />
        </g>

        <g className="logo-orbit-2" style={{ transformOrigin: '60px 60px' }}>
          <ellipse
            cx="60" cy="60" rx="50" ry="19" fill="none"
            stroke="#00D9FF" strokeWidth="2.4"
            strokeDasharray="400" transform="rotate(-60 60 60)"
          />
        </g>

        <g className="logo-orbit-3" style={{ transformOrigin: '60px 60px' }}>
          <ellipse
            cx="60" cy="60" rx="50" ry="14" fill="none"
            stroke="url(#logo-gH)" strokeWidth="2.4"
            strokeDasharray="400"
          />
        </g>

        <g className="logo-nucleus-group logo-nucleus" style={{ transformOrigin: '60px 60px' }}>
          <circle cx="60" cy="60" r="22" fill="none" stroke="url(#logo-gPC)" strokeWidth="1" strokeOpacity="0.6" />
          <circle cx="60" cy="60" r="20" fill="url(#logo-nucleus)" />
          <circle cx="60" cy="60" r="8" fill="url(#logo-coreGlow)" />
          <circle cx="60" cy="60" r="3.6" fill="#ffffff" />
          <circle cx="53" cy="53" r="3" fill="#ffffff" opacity="0.55" />
        </g>

        <circle className="logo-e1" cx="90" cy="16" r="5.5" fill="#00D9FF" style={{ transformOrigin: '90px 16px' }} />
        <circle cx="108" cy="64" r="4.5" fill="#6C63FF" />
        <circle cx="32" cy="100" r="5" fill="url(#logo-gPC)" />
        <circle cx="18" cy="42" r="3.5" fill="#6C63FF" opacity="0.75" />
        <circle cx="96" cy="98" r="3" fill="#00D9FF" opacity="0.7" />
        <circle cx="8" cy="62" r="3" fill="#8877FF" opacity="0.65" />
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
            animation: logoDrawIn1 0.6s ease-out forwards;
          }
          .logo-loaded .logo-orbit-2 ellipse {
            animation: logoDrawIn1 0.6s ease-out 0.15s forwards;
          }
          .logo-loaded .logo-orbit-3 ellipse {
            animation: logoDrawIn1 0.6s ease-out 0.3s forwards;
          }
          .logo-loaded .logo-e1 {
            animation: logoElectronAppear 0.4s ease-out 0.5s both;
          }
          .logo-loaded .logo-nucleus-group {
            animation: logoNucleusAppear 0.5s ease-out 0.45s both;
          }
        }

        @keyframes logoOrbit1 {
          from { transform: rotate(60deg); }
          to { transform: rotate(420deg); }
        }
        @keyframes logoOrbit2 {
          from { transform: rotate(-60deg); }
          to { transform: rotate(-420deg); }
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
          from { stroke-dashoffset: 400; }
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
