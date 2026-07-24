'use client';
/**
 * Benison — PageLoader
 * Full cinematic Node logo loading animation.
 * Used in all Suspense boundaries and page transitions.
 *
 * Animation phases:
 *   Phase 1 (0.0–0.5s)  — orbit rings draw in via stroke-dashoffset, staggered
 *   Phase 2 (0.45–0.75s) — nucleus scales + fades in with spring overshoot
 *   Phase 3 (0.65–1.0s)  — electrons pop in one by one
 *   Phase 4 (1.0s+)      — idle: rings rotate, E1 pulses, nucleus breathes
 *   Phase 5 (exit)       — Framer Motion: opacity+scale out
 */

import { useEffect, useRef }    from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PageLoaderProps {
  /** Size of the SVG mark in px. Default: 120 */
  size?: number;
  /**
   * If true: fixed full-viewport overlay with blurred dark background.
   * If false: renders just the mark inline.
   * Default: false
   */
  fullscreen?: boolean;
  /**
   * Use the light admin background instead of the dark default.
   * Only applies when fullscreen=true.
   * Default: false
   */
  lightBackground?: boolean;
  /** Controls visibility — parent removes it when loading is done */
  show?: boolean;
}

export function PageLoader({
  size = 120,
  fullscreen = false,
  lightBackground = false,
  show = true,
}: PageLoaderProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  /* Trigger animation sequence on mount */
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      svgRef.current?.classList.add('pl-active');
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  const mark = (
    <svg
      ref={svgRef}
      width={size}
      height={size}
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="pl-svg"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <linearGradient id="pl-gPC" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#6C63FF"/>
          <stop offset="100%" stopColor="#00D9FF"/>
        </linearGradient>
        <linearGradient id="pl-gH" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#6C63FF"/>
          <stop offset="100%" stopColor="#00D9FF"/>
        </linearGradient>
        <radialGradient id="pl-gNucleus" cx="38%" cy="35%" r="65%">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.3"/>
          <stop offset="45%"  stopColor="#6C63FF"/>
          <stop offset="100%" stopColor="#3A34CC"/>
        </radialGradient>
        <radialGradient id="pl-gGl1" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#6C63FF" stopOpacity="0.35"/>
          <stop offset="100%" stopColor="#6C63FF" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="pl-gGl2" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#00D9FF" stopOpacity="0.3"/>
          <stop offset="100%" stopColor="#00D9FF" stopOpacity="0"/>
        </radialGradient>
      </defs>

      {/* Ambient glow */}
      <circle cx="60" cy="60" r="58" fill="url(#pl-gGl1)" opacity="0.7"/>
      <circle cx="60" cy="60" r="38" fill="url(#pl-gGl2)" opacity="0.3"/>

      {/* Orbit rings */}
      <g className="pl-orbit-1">
        <ellipse cx="60" cy="60" rx="54" ry="17" fill="none"
          stroke="url(#pl-gPC)" strokeWidth="1.4" opacity="0.55"
          transform="rotate(60 60 60)"
         />
        <ellipse cx="60" cy="60" rx="54" ry="17" fill="none"
          stroke="#6C63FF" strokeWidth="5" opacity="0.07"
          transform="rotate(60 60 60)"/>
      </g>
      <g className="pl-orbit-2">
        <ellipse cx="60" cy="60" rx="48" ry="15" fill="none"
          stroke="#00D9FF" strokeWidth="1.1" opacity="0.4"
          transform="rotate(-60 60 60)"
         />
        <ellipse cx="60" cy="60" rx="48" ry="15" fill="none"
          stroke="#00D9FF" strokeWidth="5" opacity="0.06"
          transform="rotate(-60 60 60)"/>
      </g>
      <ellipse className="pl-orbit-3"
        cx="60" cy="60" rx="51" ry="13" fill="none"
        stroke="url(#pl-gH)" strokeWidth="1.6" opacity="0.5"
       />

      {/* Electrons */}
      <g className="pl-e1">
        <circle cx="90" cy="16" r="5.5" fill="#00D9FF"/>
        <circle cx="90" cy="16" r="11"  fill="#00D9FF" opacity="0.18"/>
        <circle cx="88" cy="14" r="1.8" fill="white"   opacity="0.6"/>
      </g>
      <g className="pl-e2">
        <circle cx="108" cy="64" r="4.5" fill="#6C63FF"/>
        <circle cx="108" cy="64" r="9"   fill="#6C63FF" opacity="0.16"/>
        <circle cx="106" cy="62" r="1.4" fill="white"   opacity="0.4"/>
      </g>
      <g className="pl-e3">
        <circle cx="32" cy="100" r="5"   fill="url(#pl-gPC)"/>
        <circle cx="32" cy="100" r="10"  fill="#6C63FF"    opacity="0.15"/>
        <circle cx="30" cy="98"  r="1.6" fill="white"      opacity="0.45"/>
      </g>
      <circle cx="18" cy="42" r="3.5" fill="#6C63FF" opacity="0.75"/>
      <circle cx="18" cy="42" r="7"   fill="#6C63FF" opacity="0.1"/>
      <circle cx="96" cy="98" r="3"   fill="#00D9FF" opacity="0.7"/>
      <circle cx="8"  cy="62" r="3"   fill="#8877FF" opacity="0.65"/>

      {/* Nucleus */}
      <g className="pl-nucleus">
        <circle cx="60" cy="60" r="26" fill="url(#pl-gGl1)" opacity="0.6"/>
        <circle cx="60" cy="60" r="18" fill="url(#pl-gGl2)" opacity="0.4"/>
        <circle cx="60" cy="60" r="21" fill="none"
          stroke="url(#pl-gPC)" strokeWidth="1.2" opacity="0.4"/>
        <circle cx="60" cy="60" r="18" fill="url(#pl-gNucleus)"/>
        <circle cx="55" cy="55" r="5"   fill="#6C63FF" opacity="0.45"/>
        <circle cx="65" cy="57" r="4"   fill="#8877FF" opacity="0.38"/>
        <circle cx="57" cy="65" r="4"   fill="#5599FF" opacity="0.38"/>
        <circle cx="66" cy="65" r="3.5" fill="#6C63FF" opacity="0.3"/>
        <circle cx="60" cy="60" r="8"  fill="url(#pl-gGl2)" opacity="0.8"/>
        <circle cx="60" cy="60" r="4"  fill="white"         opacity="0.22"/>
        <circle cx="55" cy="55" r="2.8" fill="white"        opacity="0.16"/>
      </g>
    </svg>
  );

  const content = (
    <div
      className="pl-content flex flex-col items-center gap-6"
      role="status"
      aria-label="Loading"
    >
      {mark}

      {/* Wordmark + progress bar — only in fullscreen mode */}
      {fullscreen && (
        <div className="pl-footer flex flex-col items-center gap-3">
          <span
            className="pl-wordmark font-display font-bold tracking-tight"
            style={{
              fontSize: '22px',
              letterSpacing: '-0.04em',
              color: lightBackground ? '#1A1A2E' : '#F0F0FF',
            }}
          >
            Benison
          </span>
          {/* Progress bar */}
          <div
            className="pl-bar-track"
            style={{
              width: '100px',
              height: '2px',
              borderRadius: '9999px',
              background: lightBackground
                ? 'rgba(108,99,255,0.15)'
                : 'rgba(255,255,255,0.08)',
              overflow: 'hidden',
            }}
          >
            <div
              className="pl-bar-fill"
              style={{
                height: '100%',
                borderRadius: '9999px',
                background: 'linear-gradient(90deg, #6C63FF, #00D9FF)',
                transformOrigin: 'left center',
              }}
            />
          </div>
        </div>
      )}

      {/* Steady glow, no motion (the mark itself is static) */}
      <style>{`
        .pl-svg {
          filter: drop-shadow(0 0 14px rgba(108,99,255,0.55))
                  drop-shadow(0 0 34px rgba(0,217,255,0.30));
        }
        @media (prefers-reduced-motion: no-preference) {
          .pl-svg { animation: plGlow 2.6s ease-in-out infinite; }
          .pl-bar-fill { animation: plBarFill 1.4s cubic-bezier(0.4,0,0.2,1) 0.2s both; }
        }
        @keyframes plGlow {
          0%, 100% {
            filter: drop-shadow(0 0 12px rgba(108,99,255,0.45))
                    drop-shadow(0 0 28px rgba(0,217,255,0.22));
          }
          50% {
            filter: drop-shadow(0 0 22px rgba(108,99,255,0.75))
                    drop-shadow(0 0 48px rgba(0,217,255,0.45));
          }
        }
        @keyframes plBarFill {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );

  if (!fullscreen) return content;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="page-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.35, ease: 'easeIn' }}
          className="fixed inset-0 z-[9999] grid place-items-center"
          style={{
            background: lightBackground
              ? 'rgba(245,247,250,0.97)'
              : 'rgba(13,13,26,0.97)',
            backdropFilter: 'blur(8px)',
          }}
        >
          {content}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
