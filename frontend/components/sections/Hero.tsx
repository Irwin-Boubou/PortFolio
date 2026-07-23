'use client';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { LiveClock } from '@/components/ui/LiveClock';
import { AvailabilityBadge } from '@/components/ui/AvailabilityBadge';
import { BookCallButton } from '@/components/ui/BookCallButton';
import { ParallaxPhotoCard } from '@/components/ui/ParallaxPhotoCard';

// Heavy 3D canvas is lazy-loaded, never server-rendered (spec §5.5.2)
const HeroScene = dynamic(() => import('@/components/3d/HeroScene'), { ssr: false });

interface Props {
  name: string;
  taglines: string[];
  location?: string;
  timezone?: string;
  availabilityStatus?: 'available' | 'busy' | 'open';
  availabilityLabel?: string;
  bookingUrl?: string;
  bookingLabel?: string;
  bookingEnabled?: boolean;
  photoUrl?: string;
  ctaLabel?: string;
}

export function Hero({
  name, taglines, location, timezone, availabilityStatus, availabilityLabel,
  bookingUrl, bookingLabel, bookingEnabled, photoUrl, ctaLabel,
}: Props) {
  const t = useTranslations('hero');
  const [idx, setIdx] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const photoY = useTransform(scrollYProgress, [0, 0.3], [0, -60]);
  const photoOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const photoScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.9]);

  // rotating tagline cycle, 3s interval (spec §7.1.1)
  useEffect(() => {
    if (taglines.length < 2) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % taglines.length), 3000);
    return () => clearInterval(id);
  }, [taglines.length]);

  return (
    <section ref={heroRef} className="relative flex min-h-screen items-center overflow-hidden">
      <HeroScene />
      <div className="relative z-10 mx-auto grid w-full max-w-content items-center gap-10 px-6 pt-16 md:grid-cols-[1.3fr_1fr]">
        <div>
          <p className="mb-4 font-mono text-sm text-secondary">{t('greeting')}</p>
          <h1 className="font-display text-5xl font-bold leading-[1.02] tracking-[-0.03em] md:text-7xl lg:text-8xl">
            <span className="gradient-text">{name}</span>
          </h1>
          <div className="mt-6 h-10 md:h-12" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
                className="text-xl text-muted md:text-3xl"
              >
                {taglines[idx]}
              </motion.p>
            </AnimatePresence>
          </div>
          {(location || availabilityLabel) && (
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted">
              {location && timezone && <LiveClock location={location} timezone={timezone} />}
              {availabilityStatus && availabilityLabel && (
                <AvailabilityBadge status={availabilityStatus} label={availabilityLabel} />
              )}
            </div>
          )}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button href="/work/development">{ctaLabel || t('cta')} →</Button>
            {bookingUrl && bookingLabel && (
              <BookCallButton url={bookingUrl} label={bookingLabel} enabled={bookingEnabled ?? false} />
            )}
          </div>
        </div>

        {photoUrl && (
          <motion.div
            className="order-first flex justify-self-center md:order-none"
            style={{ y: photoY, opacity: photoOpacity, scale: photoScale }}
          >
            {/* smaller card on phones, full md size from the sm breakpoint up */}
            <div className="w-[220px] sm:w-auto">
              <ParallaxPhotoCard src={photoUrl} alt={name} size="md" priority />
            </div>
          </motion.div>
        )}
      </div>
      {/* scroll indicator, centering (inset-x-0/flex) lives on a plain wrapper, never on the
          same element Framer Motion animates: animating y/x/scale takes over the `transform`
          property entirely and silently drops any translate-x-1/2 class used for centering. */}
      <div className="absolute inset-x-0 bottom-8 flex justify-center text-muted" aria-hidden="true">
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
          <span className="block text-[10px] uppercase tracking-[0.3em]">{t('scroll')}</span>
          <span className="mx-auto mt-2 block h-8 w-px bg-gradient-to-b from-secondary to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
