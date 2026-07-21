'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { LiveClock } from '@/components/ui/LiveClock';
import { AvailabilityBadge } from '@/components/ui/AvailabilityBadge';
import { BookCallButton } from '@/components/ui/BookCallButton';

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
}

export function Hero({
  name, taglines, location, timezone, availabilityStatus, availabilityLabel,
  bookingUrl, bookingLabel, bookingEnabled,
}: Props) {
  const t = useTranslations('hero');
  const [idx, setIdx] = useState(0);

  // rotating tagline cycle — 3s interval (spec §7.1.1)
  useEffect(() => {
    if (taglines.length < 2) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % taglines.length), 3000);
    return () => clearInterval(id);
  }, [taglines.length]);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <HeroScene />
      <div className="relative z-10 mx-auto w-full max-w-content px-6 pt-16">
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
          <Button href="/work/development">{t('cta')} →</Button>
          {bookingUrl && bookingLabel && (
            <BookCallButton url={bookingUrl} label={bookingLabel} enabled={bookingEnabled ?? false} />
          )}
        </div>
      </div>
      {/* scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
        aria-hidden="true"
      >
        <span className="block text-[10px] uppercase tracking-[0.3em]">{t('scroll')}</span>
        <span className="mx-auto mt-2 block h-8 w-px bg-gradient-to-b from-secondary to-transparent" />
      </motion.div>
    </section>
  );
}
