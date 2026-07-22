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
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
          <stop offset="45%" stopColor="#6C63FF" />
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
          <stop offset="0%" stopColor="#00D9FF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#00D9FF" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ambient glow */}
      <circle cx="60" cy="60" r="56" fill="url(#loader-gl1)" />
      <circle cx="66" cy="54" r="46" fill="url(#loader-gl2)" />

      {/* orbit ring 1 (60deg) — draws in, then rotates on loop */}
      <g className="loader-orbit-1" style={{ transformOrigin: '60px 60px' }}>
        <ellipse
          cx="60" cy="60" rx="50" ry="19" fill="none"
          stroke="url(#loader-gPC)" strokeWidth="2.4"
          strokeDasharray="400" transform="rotate(60 60 60)"
        />
      </g>

      {/* orbit ring 2 (-60deg) */}
      <g className="loader-orbit-2" style={{ transformOrigin: '60px 60px' }}>
        <ellipse
          cx="60" cy="60" rx="50" ry="19" fill="none"
          stroke="#00D9FF" strokeWidth="2.4"
          strokeDasharray="400" transform="rotate(-60 60 60)"
        />
      </g>

      {/* orbit ring 3 (equatorial) */}
      <g className="loader-orbit-3" style={{ transformOrigin: '60px 60px' }}>
        <ellipse
          cx="60" cy="60" rx="50" ry="14" fill="none"
          stroke="url(#loader-gH)" strokeWidth="2.4"
          strokeDasharray="400"
        />
      </g>

      {/* nucleus */}
      <g className="loader-nucleus-group" style={{ transformOrigin: '60px 60px' }}>
        <circle cx="60" cy="60" r="30" fill="url(#loader-gl1)" />
        <circle cx="60" cy="60" r="24" fill="url(#loader-gl2)" />
        <circle cx="60" cy="60" r="22" fill="none" stroke="url(#loader-gPC)" strokeWidth="1" strokeOpacity="0.6" />
        <circle cx="60" cy="60" r="20" fill="url(#loader-nucleus)" />
        <circle cx="52" cy="54" r="4.5" fill="#ffffff" opacity="0.18" />
        <circle cx="68" cy="53" r="3.8" fill="#ffffff" opacity="0.15" />
        <circle cx="66" cy="68" r="4.2" fill="#3A34CC" opacity="0.25" />
        <circle cx="53" cy="67" r="3.5" fill="#3A34CC" opacity="0.22" />
        <circle cx="60" cy="60" r="8" fill="url(#loader-coreGlow)" />
        <circle cx="60" cy="60" r="3.6" fill="#ffffff" />
        <circle cx="53" cy="53" r="3" fill="#ffffff" opacity="0.55" />
      </g>

      {/* electrons — only 3 in the loader, per spec */}
      <circle className="loader-e1" cx="90" cy="16" r="5.5" fill="#00D9FF" style={{ transformOrigin: '90px 16px' }} />
      <circle className="loader-e2" cx="108" cy="64" r="4.5" fill="#6C63FF" style={{ transformOrigin: '108px 64px' }} />
      <circle className="loader-e3" cx="32" cy="100" r="5" fill="url(#loader-gPC)" style={{ transformOrigin: '32px 100px' }} />

      <style jsx>{`
        /* Phase 1 (0.0s–0.4s): orbit rings draw in, staggered 0.12s */
        .loader-active .loader-orbit-1 ellipse {
          animation: loaderDrawIn 0.4s ease-out forwards;
        }
        .loader-active .loader-orbit-2 ellipse {
          animation: loaderDrawIn 0.4s ease-out 0.12s forwards;
        }
        .loader-active .loader-orbit-3 ellipse {
          animation: loaderDrawIn 0.4s ease-out 0.24s forwards;
        }

        /* Phase 2 (0.4s–0.7s): nucleus spring-in */
        .loader-active .loader-nucleus-group {
          animation: loaderNucleusIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s both;
        }

        /* Phase 3 (0.65s–1.0s): electrons pop in */
        .loader-active .loader-e1 {
          animation: loaderElectronPop 0.35s ease-out 0.65s both, loaderE1Pulse 1.4s ease-in-out 1.0s infinite;
        }
        .loader-active .loader-e2 {
          animation: loaderElectronPop 0.35s ease-out 0.72s both;
        }
        .loader-active .loader-e3 {
          animation: loaderElectronPop 0.35s ease-out 0.79s both;
        }

        /* Phase 4 (1.0s onwards): idle loop */
        .loader-active .loader-orbit-1 {
          animation: loaderSpin1 8s linear 1s infinite;
        }
        .loader-active .loader-orbit-2 {
          animation: loaderSpin2 12s linear 1s infinite;
        }
        .loader-active .loader-orbit-3 {
          animation: loaderSpin3 18s linear 1s infinite;
        }
        .loader-active .loader-nucleus {
          animation: loaderNucleusBreathe 3s ease-in-out 1s infinite;
        }

        @keyframes loaderDrawIn {
          from { stroke-dashoffset: 400; }
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
          from { transform: rotate(60deg); }
          to { transform: rotate(420deg); }
        }
        @keyframes loaderSpin2 {
          from { transform: rotate(-60deg); }
          to { transform: rotate(-420deg); }
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
            animation: 'loaderWordmarkIn 0.4s ease-out 0.8s forwards',
          }}
        >
          Benison
        </span>
        <span
          className="block h-[2px] w-[120px] origin-left scale-x-0"
          style={{
            background: 'linear-gradient(90deg, #6C63FF, #00D9FF)',
            animation: 'loaderBarIn 1.2s ease-out 0.4s forwards',
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
