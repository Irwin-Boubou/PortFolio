'use client';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { FiGithub, FiLinkedin, FiInstagram, FiTwitter, FiYoutube } from 'react-icons/fi';
import { SiDribbble, SiBehance } from 'react-icons/si';
import { Button } from '@/components/ui/Button';
import { AvailabilityBadge } from '@/components/ui/AvailabilityBadge';
import { LiveClock } from '@/components/ui/LiveClock';
import { BookCallButton } from '@/components/ui/BookCallButton';
import { StickyPhotoColumn } from '@/components/ui/StickyPhotoColumn';

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
  title?: string;
}

export function IdentityHero({
  name, intro, photoUrl, location, timezone, availabilityStatus, availabilityLabel,
  cvUrl, bookingUrl, bookingLabel, bookingEnabled, socials, title,
}: Props) {
  const t = useTranslations('about');

  const content = (
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

      {socials.length > 0 && (
        <div className="mt-8 flex gap-4">
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

  if (!photoUrl) {
    return (
      <section className="mx-auto max-w-content px-6 pb-16 pt-28 md:pt-36">
        {content}
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-content px-6 pb-16 pt-28 md:pt-36">
      <StickyPhotoColumn
        photoSrc={photoUrl}
        photoAlt={name}
        photoSize="lg"
        side="left"
        availabilityStatus={availabilityStatus}
        availabilityLabel={availabilityLabel}
        name={name}
        title={title}
      >
        {content}
      </StickyPhotoColumn>
    </section>
  );
}
