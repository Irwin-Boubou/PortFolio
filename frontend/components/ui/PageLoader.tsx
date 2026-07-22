'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Props {
  size?: number;
  fullscreen?: boolean;
  lightBackground?: boolean;
}

/**
 * The Node, rendered large with a cinematic 5-phase reveal: orbit rings draw
 * themselves in, the nucleus springs into place, three electrons pop in one
 * by one, then everything settles into a looping idle animation.
 */
export function PageLoader({ size = 120, fullscreen = false, lightBackground = false }: Props) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setActive(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const mark = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={active ? 'loader-active' : ''}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="loader-gPC" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6C63FF" />
          <stop offset="100%" stopColor="#00D9FF" />
        </linearGradient>
        <linearGradient id="loader-gH" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6C63FF" />
          <stop offset="100%" stopColor="#00D9FF" />
        </linearGradient>
        <radialGradient id="loader-nucleus" cx="38%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
          <stop offset="45%" stopColor="#9B94FF" />
          <stop offset="100%" stopColor="#3A34CC" />
        </radialGradient>
        <radialGradient id="loader-gl1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#6C63FF" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#6C63FF" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="loader-gl2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00D9FF" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#00D9FF" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="loader-coreGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00D9FF" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#00D9FF" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ambient glow */}
      <circle cx="58" cy="58" r="56" fill="url(#loader-gl1)" />
      <circle cx="66" cy="54" r="44" fill="url(#loader-gl2)" />

      {/* ring 1: flat oval, purple, tilted 55deg, draws in, then rotates on loop */}
      <g className="loader-orbit-1" style={{ transformOrigin: '60px 60px' }}>
        <ellipse
          cx="60" cy="60" rx="48" ry="22" fill="none"
          stroke="#6C63FF" strokeWidth="5" strokeLinecap="round"
          strokeDasharray="260" transform="rotate(55 60 60)"
        />
      </g>

      {/* ring 2: near-circular, cyan, tilted -55deg */}
      <g className="loader-orbit-2" style={{ transformOrigin: '60px 60px' }}>
        <ellipse
          cx="60" cy="60" rx="40" ry="36" fill="none"
          stroke="#00D9FF" strokeWidth="5" strokeLinecap="round"
          strokeDasharray="260" transform="rotate(-55 60 60)"
        />
      </g>

      {/* ring 3: wide flat equatorial, gradient */}
      <g className="loader-orbit-3" style={{ transformOrigin: '60px 60px' }}>
        <ellipse
          cx="60" cy="60" rx="50" ry="14" fill="none"
          stroke="url(#loader-gH)" strokeWidth="5" strokeLinecap="round"
          strokeDasharray="260"
        />
      </g>

      {/* nucleus */}
      <g className="loader-nucleus-group" style={{ transformOrigin: '60px 60px' }}>
        <circle cx="60" cy="60" r="30" fill="url(#loader-gl1)" />
        <circle cx="60" cy="60" r="24" fill="url(#loader-gl2)" />
        <circle cx="60" cy="60" r="26" fill="none" stroke="url(#loader-gPC)" strokeWidth="1.5" strokeOpacity="0.75" />
        <circle cx="60" cy="60" r="23" fill="url(#loader-nucleus)" />
        <circle cx="60" cy="60" r="9.5" fill="url(#loader-coreGlow)" />
        <circle cx="60" cy="60" r="4.5" fill="#ffffff" />
        <circle cx="53" cy="53" r="2.6" fill="#ffffff" opacity="0.5" />
      </g>

      {/* electrons */}
      <circle className="loader-e1" cx="97" cy="17" r="8.5" fill="#00D9FF" style={{ transformOrigin: '97px 17px' }} />
      <circle className="loader-e2" cx="104" cy="82" r="6.5" fill="#6C63FF" style={{ transformOrigin: '104px 82px' }} />
      <circle className="loader-e3" cx="22" cy="94" r="7" fill="url(#loader-gPC)" style={{ transformOrigin: '22px 94px' }} />

      <style jsx>{`
        /* Phase 1 (0.0s–0.4s): orbit rings draw in, staggered 0.12s */
        .loader-active .loader-orbit-1 ellipse {
          animation: loaderDrawIn 0.9s ease-out forwards;
        }
        .loader-active .loader-orbit-2 ellipse {
          animation: loaderDrawIn 0.9s ease-out 0.26s forwards;
        }
        .loader-active .loader-orbit-3 ellipse {
          animation: loaderDrawIn 0.9s ease-out 0.52s forwards;
        }

        /* Phase 2: nucleus spring-in */
        .loader-active .loader-nucleus-group {
          animation: loaderNucleusIn 0.65s cubic-bezier(0.34, 1.56, 0.64, 1) 0.9s both;
        }

        /* Phase 3: electrons pop in */
        .loader-active .loader-e1 {
          animation: loaderElectronPop 0.7s ease-out 1.5s both, loaderE1Pulse 1.8s ease-in-out 2.2s infinite;
        }
        .loader-active .loader-e2 {
          animation: loaderElectronPop 0.7s ease-out 1.65s both;
        }
        .loader-active .loader-e3 {
          animation: loaderElectronPop 0.7s ease-out 1.8s both;
        }

        /* Phase 4: idle loop */
        .loader-active .loader-orbit-1 {
          animation: loaderSpin1 8s linear 2.2s infinite;
        }
        .loader-active .loader-orbit-2 {
          animation: loaderSpin2 12s linear 2.2s infinite;
        }
        .loader-active .loader-orbit-3 {
          animation: loaderSpin3 18s linear 2.2s infinite;
        }
        .loader-active .loader-nucleus {
          animation: loaderNucleusBreathe 3s ease-in-out 2.2s infinite;
        }

        @keyframes loaderDrawIn {
          from { stroke-dashoffset: 260; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes loaderNucleusIn {
          0% { transform: scale(0.3); opacity: 0; }
          70% { transform: scale(1.08); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes loaderElectronPop {
          0% { transform: scale(0); opacity: 0; }
          60% { transform: scale(1.3); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes loaderE1Pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.35); }
        }
        @keyframes loaderSpin1 {
          from { transform: rotate(55deg); }
          to { transform: rotate(415deg); }
        }
        @keyframes loaderSpin2 {
          from { transform: rotate(-55deg); }
          to { transform: rotate(-415deg); }
        }
        @keyframes loaderSpin3 {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes loaderNucleusBreathe {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.9; }
        }
      `}</style>
    </svg>
  );

  if (!fullscreen) return mark;

  return (
    <motion.div
      initial={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.35, ease: 'easeIn' }}
      className="fixed inset-0 z-[200] grid place-items-center backdrop-blur-sm"
      style={{ background: lightBackground ? 'rgba(245,247,250,0.97)' : 'rgba(13,13,26,0.95)' }}
    >
      <div className="flex flex-col items-center gap-4">
        {mark}
        <span
          className="opacity-0"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '24px',
            color: lightBackground ? '#1A1A2E' : '#F0F0FF',
            animation: 'loaderWordmarkIn 0.6s ease-out 1.7s forwards',
          }}
        >
          Benison
        </span>
        <span
          className="block h-[2px] w-[120px] origin-left scale-x-0"
          style={{
            background: 'linear-gradient(90deg, #6C63FF, #00D9FF)',
            animation: 'loaderBarIn 1.8s ease-out 0.9s forwards',
          }}
        />
      </div>
      <style jsx>{`
        @keyframes loaderWordmarkIn {
          to { opacity: 1; }
        }
        @keyframes loaderBarIn {
          to { transform: scaleX(1); }
        }
      `}</style>
    </motion.div>
  );
}
