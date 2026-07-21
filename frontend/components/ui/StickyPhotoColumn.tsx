'use client';
import { motion, useReducedMotion } from 'framer-motion';
import { ParallaxPhotoCard } from './ParallaxPhotoCard';

interface Props {
  children: React.ReactNode;
  photoSrc: string;
  photoAlt: string;
  photoSize?: 'md' | 'lg';
  side?: 'left' | 'right';
  availabilityStatus?: 'available' | 'busy' | 'open';
  availabilityLabel?: string;
  name?: string;
  title?: string;
}

/**
 * Two-column layout with a sticky, tilting photo card on one side and
 * arbitrary content on the other. Used on About/Contact pages.
 */
export function StickyPhotoColumn({
  children,
  photoSrc,
  photoAlt,
  photoSize = 'lg',
  side = 'left',
  availabilityStatus,
  availabilityLabel,
  name,
  title,
}: Props) {
  const reduce = useReducedMotion();
  const photoFromX = side === 'left' ? -40 : 40;

  return (
    <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-[40%_60%] md:gap-12">
      <motion.div
        className={side === 'left' ? 'md:order-1' : 'md:order-2'}
        initial={reduce ? undefined : { opacity: 0, x: photoFromX }}
        whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex justify-center md:sticky md:top-24 md:block md:self-start">
          <ParallaxPhotoCard
            src={photoSrc}
            alt={photoAlt}
            size={photoSize}
            availabilityStatus={availabilityStatus}
            availabilityLabel={availabilityLabel}
            name={name}
            title={title}
          />
        </div>
      </motion.div>

      <motion.div
        className={side === 'left' ? 'md:order-2' : 'md:order-1'}
        initial={reduce ? undefined : { opacity: 0, x: -photoFromX }}
        whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
