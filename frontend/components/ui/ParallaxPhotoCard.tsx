'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

type Size = 'sm' | 'md' | 'lg';

// sizes bumped ~20% to make the photo card a bit more prominent
const SIZE_PX: Record<Size, number> = { sm: 336, md: 400, lg: 460 };

interface Props {
  src: string;
  alt: string;
  size?: Size;
  glowColor?: string;
  availabilityStatus?: 'available' | 'busy' | 'open';
  availabilityLabel?: string;
  name?: string;
  title?: string;
  /** Optional message shown as a frosted strip across the bottom (any size). */
  message?: string;
  priority?: boolean;
  className?: string;
}

const STATUS_DOT: Record<NonNullable<Props['availabilityStatus']>, string> = {
  available: 'bg-success',
  open: 'bg-amber-400',
  busy: 'bg-error',
};

/**
 * Reusable scroll-pinned / mouse-tilt photo card (inspired by nikolaradeski.com).
 * Tilts toward the cursor, floats gently while idle, and falls back to a static
 * card on reduced-motion or small screens.
 */
export function ParallaxPhotoCard({
  src,
  alt,
  size = 'md',
  glowColor = '#6C63FF',
  availabilityStatus,
  availabilityLabel,
  name,
  title,
  message,
  priority = false,
  className = '',
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const framePending = useRef(false);
  const latest = useRef({ rx: 0, ry: 0 });
  const [staticMode, setStaticMode] = useState(true);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const check = () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setStaticMode(reduce || window.innerWidth < 640);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const applyTransform = () => {
    framePending.current = false;
    const el = ref.current;
    if (!el) return;
    const { rx, ry } = latest.current;
    el.style.transition = 'transform 0.1s ease-out';
    el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  };

  const onMove = (e: React.MouseEvent) => {
    if (staticMode) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left - r.width / 2) / (r.width / 2);
    const py = (e.clientY - r.top - r.height / 2) / (r.height / 2);
    latest.current = { rx: -py * 8, ry: px * 8 };
    if (!framePending.current) {
      framePending.current = true;
      requestAnimationFrame(applyTransform);
    }
  };

  const onEnter = () => setHovering(true);
  const onLeave = () => {
    setHovering(false);
    const el = ref.current;
    if (el) {
      el.style.transition = 'transform 0.6s ease-out';
      el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    }
  };

  const px = SIZE_PX[size];
  const py = Math.round(px * 1.2);
  const showBadge = Boolean(availabilityStatus && availabilityLabel);
  const showStrip = size === 'lg' && Boolean(name && title);

  const card = (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="relative h-full w-full rounded-[24px] overflow-hidden border border-[rgba(108,99,255,0.3)] bg-surface will-change-transform"
      style={{
        boxShadow: hovering
          ? `0 0 50px ${glowColor}80, 0 0 100px ${glowColor}40`
          : `0 0 30px ${glowColor}4d, 0 0 60px ${glowColor}26`,
        transition: 'box-shadow 0.4s ease',
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={`${px}px`}
        className="object-cover"
        priority={priority}
        loading={priority ? undefined : 'lazy'}
      />

      {showBadge && (
        <div className="pointer-events-none absolute right-3 top-3 flex items-center gap-2 rounded-full bg-bg/80 px-3 py-1.5 text-xs text-body backdrop-blur">
          <span className="relative flex h-2 w-2">
            <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${STATUS_DOT[availabilityStatus!]} opacity-60`} />
            <span className={`relative inline-flex h-2 w-2 rounded-full ${STATUS_DOT[availabilityStatus!]}`} />
          </span>
          {availabilityLabel}
        </div>
      )}

      {showStrip && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 backdrop-blur-sm">
          <p className="font-semibold text-white">{name}</p>
          <p className="text-sm text-white/70">{title}</p>
        </div>
      )}

      {message && !showStrip && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/40 to-transparent p-5 backdrop-blur-sm">
          <p className="font-display text-base font-semibold leading-snug text-white">{message}</p>
        </div>
      )}
    </div>
  );

  return (
    <div
      className={`relative ${className}`}
      style={{ width: px, maxWidth: '100%', aspectRatio: `${px} / ${py}` }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[8%] top-[8%] -z-10 h-1/2 w-1/2 rounded-full bg-primary opacity-30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[8%] right-[8%] -z-10 h-1/2 w-1/2 rounded-full bg-secondary opacity-30 blur-3xl"
      />
      {staticMode ? (
        card
      ) : hovering ? (
        <div className="h-full w-full">{card}</div>
      ) : (
        <motion.div
          className="h-full w-full"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          {card}
        </motion.div>
      )}
    </div>
  );
}
