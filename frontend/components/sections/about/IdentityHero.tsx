'use client';
import { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { FiGithub, FiLinkedin, FiInstagram, FiTwitter, FiYoutube } from 'react-icons/fi';
import { SiDribbble, SiBehance } from 'react-icons/si';
import { Button } from '@/components/ui/Button';
import { AvailabilityBadge } from '@/components/ui/AvailabilityBadge';
import { LiveClock } from '@/components/ui/LiveClock';
import { BookCallButton } from '@/components/ui/BookCallButton';

interface Social { key: string; url: string }

const SOCIAL_ICONS: Record<string, React.ComponentType<{ size?: number }>> = {
  github: FiGithub,
  linkedin: FiLinkedin,
  dribbble: SiDribbble,
  behance: SiBehance,
  instagram: FiInstagram,
  twitter: FiTwitter,
  youtube: FiYoutube,
};

interface Props {
  name: string;
  intro: string;
  photoUrl: string | null;
  location: string;
  timezone: string;
  availabilityStatus: 'available' | 'busy' | 'open';
  availabilityLabel: string;
  cvUrl: string | null;
  bookingUrl: string | null;
  bookingLabel: string;
  bookingEnabled: boolean;
  socials: Social[];
}

function Photo({ name, photoUrl, socials }: { name: string; photoUrl: string | null; socials: Social[] }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left - r.width / 2) / (r.width / 2);
    const py = (e.clientY - r.top - r.height / 2) / (r.height / 2);
    el.style.transform = `perspective(800px) rotateY(${px * 8}deg) rotateX(${-py * 8}deg)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg)';
  };

  return (
    <div className="flex flex-col items-center">
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="relative aspect-square w-full max-w-sm overflow-hidden rounded-3xl border border-muted/15 bg-surface transition-transform duration-200 ease-out"
      >
        {photoUrl ? (
          <Image src={photoUrl} alt={name} fill sizes="384px" className="object-cover" priority />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-display text-6xl font-bold text-primary">
            {name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase()}
          </div>
        )}
      </div>
      {socials.length > 0 && (
        <div className="mt-5 flex gap-4">
          {socials.map(({ key, url }) => {
            const Icon = SOCIAL_ICONS[key];
            if (!Icon) return null;
            return (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noreferrer"
                aria-label={key}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-muted/20 bg-surface text-muted transition-colors hover:border-primary/50 hover:text-primary"
              >
                <Icon size={18} />
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function IdentityHero({
  name, intro, photoUrl, location, timezone, availabilityStatus, availabilityLabel,
  cvUrl, bookingUrl, bookingLabel, bookingEnabled, socials,
}: Props) {
  const t = useTranslations('about');

  return (
    <section className="mx-auto max-w-content px-6 pb-16 pt-28 md:pt-36">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Photo name={name} photoUrl={photoUrl} socials={socials} />
        </motion.div>

        <div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-display text-4xl font-bold md:text-5xl"
          >
            {t('heroGreeting')}{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{name}</span>
          </motion.h1>

          <p className="mt-4 max-w-lg text-lg leading-relaxed text-muted">{intro}</p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <AvailabilityBadge status={availabilityStatus} label={availabilityLabel} />
            <LiveClock timezone={timezone} location={location} />
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            {cvUrl && <Button href={cvUrl}>{t('downloadCv')} ↓</Button>}
            <BookCallButton url={bookingUrl ?? ''} label={bookingLabel || t('bookCall')} enabled={bookingEnabled && !!bookingUrl} />
          </div>
        </div>
      </div>
    </section>
  );
}
