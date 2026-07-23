'use client';
/**
 * Benison — The Node — animated logo component.
 *
 * Features:
 * - Inline SVG (not <img>) so CSS animations work on child elements
 * - All gradient IDs prefixed "logo-" to avoid conflicts with other SVGs
 * - On hover: three orbit rings spin at different speeds, hero electron pulses
 * - On mount: rings draw in via stroke-dashoffset, nucleus + electrons pop in
 * - All animations respect prefers-reduced-motion
 * - Optional wordmark text beside the mark
 */

import { useEffect, useRef } from 'react';
import { Link }              from '@/navigation';

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
  const svgRef = useRef<SVGSVGElement>(null);

  /* Trigger the page-load draw-in animation once on mount */
  useEffect(() => {
    const t = requestAnimationFrame(() => {
      svgRef.current?.classList.add('logo-loaded');
    });
    return () => cancelAnimationFrame(t);
  }, []);

  return (
    <Link
      href="/"
      aria-label="Benison — Home"
      className={`logo-group inline-flex items-center gap-2.5 outline-none ${className}`}
    >
      {/* ── SVG mark ─────────────────────────────────────── */}
      <svg
        ref={svgRef}
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
            <stop offset="0%"   stopColor="#6C63FF"/>
            <stop offset="100%" stopColor="#00D9FF"/>
          </linearGradient>
          <linearGradient id="logo-gH" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#6C63FF"/>
            <stop offset="100%" stopColor="#00D9FF"/>
          </linearGradient>
          <radialGradient id="logo-gNucleus" cx="38%" cy="35%" r="65%">
            <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.3"/>
            <stop offset="45%"  stopColor="#6C63FF"/>
            <stop offset="100%" stopColor="#3A34CC"/>
          </radialGradient>
          <radialGradient id="logo-gGl1" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#6C63FF" stopOpacity="0.35"/>
            <stop offset="100%" stopColor="#6C63FF" stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="logo-gGl2" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#00D9FF" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#00D9FF" stopOpacity="0"/>
          </radialGradient>
        </defs>

        {/* Ambient glow */}
        <circle cx="60" cy="60" r="58" fill="url(#logo-gGl1)" opacity="0.7"/>
        <circle cx="60" cy="60" r="38" fill="url(#logo-gGl2)" opacity="0.3"/>

        {/* ── Orbit rings ── */}
        <g className="logo-orbit-1">
          <ellipse cx="60" cy="60" rx="54" ry="17" fill="none"
            stroke="url(#logo-gPC)" strokeWidth="1.4" opacity="0.55"
            transform="rotate(60 60 60)"
            strokeDasharray="400" strokeDashoffset="400"/>
          <ellipse cx="60" cy="60" rx="54" ry="17" fill="none"
            stroke="#6C63FF" strokeWidth="5" opacity="0.07"
            transform="rotate(60 60 60)"/>
        </g>

        <g className="logo-orbit-2">
          <ellipse cx="60" cy="60" rx="48" ry="15" fill="none"
            stroke="#00D9FF" strokeWidth="1.1" opacity="0.4"
            transform="rotate(-60 60 60)"
            strokeDasharray="360" strokeDashoffset="360"/>
          <ellipse cx="60" cy="60" rx="48" ry="15" fill="none"
            stroke="#00D9FF" strokeWidth="5" opacity="0.06"
            transform="rotate(-60 60 60)"/>
        </g>

        <ellipse className="logo-orbit-3"
          cx="60" cy="60" rx="51" ry="13" fill="none"
          stroke="url(#logo-gH)" strokeWidth="1.6" opacity="0.5"
          strokeDasharray="380" strokeDashoffset="380"/>

        {/* ── Electrons ── */}
        {/* E1 — cyan, top-right, hero */}
        <g className="logo-e1">
          <circle cx="90" cy="16" r="5.5" fill="#00D9FF"/>
          <circle cx="90" cy="16" r="11"  fill="#00D9FF" opacity="0.18"/>
          <circle cx="88" cy="14" r="1.8" fill="white"   opacity="0.6"/>
        </g>
        {/* E2 — purple, right */}
        <g className="logo-e2">
          <circle cx="108" cy="64" r="4.5" fill="#6C63FF"/>
          <circle cx="108" cy="64" r="9"   fill="#6C63FF" opacity="0.16"/>
          <circle cx="106" cy="62" r="1.4" fill="white"   opacity="0.4"/>
        </g>
        {/* E3 — gradient, bottom-left */}
        <g className="logo-e3">
          <circle cx="32" cy="100" r="5"   fill="url(#logo-gPC)"/>
          <circle cx="32" cy="100" r="10"  fill="#6C63FF"       opacity="0.15"/>
          <circle cx="30" cy="98"  r="1.6" fill="white"         opacity="0.45"/>
        </g>
        {/* E4, E5, E6 — minor electrons */}
        <circle cx="18" cy="42" r="3.5" fill="#6C63FF" opacity="0.75"/>
        <circle cx="18" cy="42" r="7"   fill="#6C63FF" opacity="0.1"/>
        <circle cx="96" cy="98" r="3"   fill="#00D9FF" opacity="0.7"/>
        <circle cx="8"  cy="62" r="3"   fill="#8877FF" opacity="0.65"/>

        {/* ── Nucleus ── */}
        <g className="logo-nucleus-group">
          <circle cx="60" cy="60" r="26" fill="url(#logo-gGl1)" opacity="0.6"/>
          <circle cx="60" cy="60" r="18" fill="url(#logo-gGl2)" opacity="0.4"/>
          <circle cx="60" cy="60" r="21" fill="none"
            stroke="url(#logo-gPC)" strokeWidth="1.2" opacity="0.4"/>
          <circle cx="60" cy="60" r="18" fill="url(#logo-gNucleus)"/>
          <circle cx="55" cy="55" r="5"   fill="#6C63FF" opacity="0.45"/>
          <circle cx="65" cy="57" r="4"   fill="#8877FF" opacity="0.38"/>
          <circle cx="57" cy="65" r="4"   fill="#5599FF" opacity="0.38"/>
          <circle cx="66" cy="65" r="3.5" fill="#6C63FF" opacity="0.3"/>
          <circle cx="60" cy="60" r="8"  fill="url(#logo-gGl2)" opacity="0.8"/>
          <circle cx="60" cy="60" r="4"  fill="white"           opacity="0.22"/>
          <circle cx="55" cy="55" r="2.8" fill="white"          opacity="0.16"/>
        </g>
      </svg>

      {/* ── Wordmark ── */}
      {showWordmark && (
        <span
          className="logo-wordmark font-display font-bold leading-none tracking-tight
                     transition-colors duration-200"
          style={{
            fontSize:    `${(size * 0.58).toFixed(1)}px`,
            color:       wordmarkColor,
            letterSpacing: '-0.04em',
          }}
        >
          Benison
        </span>
      )}

      {/* ── All animations ── */}
      <style>{`

        /* ── PAGE LOAD — draw-in (runs once) ─────────────── */
        @media (prefers-reduced-motion: no-preference) {

          .logo-loaded .logo-orbit-1 ellipse:first-child {
            animation: logoDrawIn 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0s forwards;
          }
          .logo-loaded .logo-orbit-2 ellipse:first-child {
            animation: logoDrawIn 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.15s forwards;
          }
          .logo-loaded .logo-orbit-3 {
            animation: logoDrawIn3 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.3s forwards;
          }
          @keyframes logoDrawIn {
            from { stroke-dashoffset: 400; opacity: 0.2; }
            to   { stroke-dashoffset: 0;   opacity: 0.55; }
          }
          @keyframes logoDrawIn3 {
            from { stroke-dashoffset: 380; opacity: 0.2; }
            to   { stroke-dashoffset: 0;   opacity: 0.5;  }
          }

          .logo-loaded .logo-nucleus-group {
            animation: logoNucleusIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.45s both;
            transform-origin: 60px 60px;
            transform-box: fill-box;
          }
          @keyframes logoNucleusIn {
            from { transform: scale(0.3); opacity: 0; }
            to   { transform: scale(1);   opacity: 1; }
          }

          .logo-loaded .logo-e1 {
            animation: logoElectronIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.6s both;
            transform-origin: 90px 16px;
            transform-box: fill-box;
          }
          .logo-loaded .logo-e2 {
            animation: logoElectronIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.68s both;
            transform-origin: 108px 64px;
            transform-box: fill-box;
          }
          .logo-loaded .logo-e3 {
            animation: logoElectronIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.76s both;
            transform-origin: 32px 100px;
            transform-box: fill-box;
          }
          @keyframes logoElectronIn {
            0%   { transform: scale(0);    opacity: 0; }
            70%  { transform: scale(1.3);  opacity: 1; }
            100% { transform: scale(1);    opacity: 1; }
          }

          .logo-loaded .logo-wordmark {
            animation: logoWordmarkIn 0.5s ease-out 0.7s both;
          }
          @keyframes logoWordmarkIn {
            from { opacity: 0; transform: translateX(-6px); }
            to   { opacity: 1; transform: translateX(0);    }
          }

          /* ── HOVER — continuous rotation ─────────────────── */
          .logo-group:hover .logo-orbit-1 {
            animation: logoOrbit1 8s linear infinite;
            transform-origin: 60px 60px;
            transform-box: fill-box;
          }
          .logo-group:hover .logo-orbit-2 {
            animation: logoOrbit2 12s linear infinite;
            transform-origin: 60px 60px;
            transform-box: fill-box;
          }
          .logo-group:hover .logo-orbit-3 {
            animation: logoOrbit3 18s linear infinite;
            transform-origin: 60px 60px;
            transform-box: fill-box;
          }
          @keyframes logoOrbit1 {
            from { transform: rotate(60deg);  }
            to   { transform: rotate(420deg); }
          }
          @keyframes logoOrbit2 {
            from { transform: rotate(-60deg);  }
            to   { transform: rotate(-420deg); }
          }
          @keyframes logoOrbit3 {
            from { transform: rotate(0deg);   }
            to   { transform: rotate(360deg); }
          }

          .logo-group:hover .logo-e1 {
            animation: logoE1Pulse 1.4s ease-in-out infinite;
            transform-origin: 90px 16px;
            transform-box: fill-box;
          }
          @keyframes logoE1Pulse {
            0%, 100% { transform: scale(1);    opacity: 1;   }
            50%       { transform: scale(1.35); opacity: 0.7; }
          }

          .logo-group:hover .logo-nucleus-group {
            animation: logoNucleusBreathe 2.5s ease-in-out infinite;
          }
          @keyframes logoNucleusBreathe {
            0%, 100% { opacity: 1;    }
            50%       { opacity: 0.85; }
          }

          .logo-group:hover .logo-wordmark {
            color: var(--color-primary) !important;
          }

        } /* end prefers-reduced-motion */

        /* Focus ring for keyboard nav */
        .logo-group:focus-visible {
          outline: 2px solid var(--color-primary);
          outline-offset: 4px;
          border-radius: 6px;
        }

      `}</style>
    </Link>
  );
}
