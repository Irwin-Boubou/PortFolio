'use client';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { FaStar, FaQuoteRight } from 'react-icons/fa';
import { FiStar } from 'react-icons/fi';
import { Link } from '@/navigation';
import { Section } from '@/components/layout/Section';
import type { Testimonial } from '@/lib/serverApi';

function initials(name: string) {
  return name
    .split(' ')
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1 text-[#FFB800]" aria-label={`${rating}/5`}>
      {Array.from({ length: 5 }).map((_, i) =>
        i < rating ? <FaStar key={i} size={15} /> : <FiStar key={i} size={15} className="text-muted/40" />,
      )}
    </div>
  );
}

function Card({ tm, index, featuredLabel }: { tm: Testimonial; index: number; featuredLabel: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.figure
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40, rotateX: 12, scale: 0.96 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: index * 0.1 }}
      className="group relative flex flex-col rounded-2xl border border-muted/15 bg-surface/70 p-6 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_16px_40px_-12px_rgba(108,99,255,0.25)] sm:p-7"
    >
      <FaQuoteRight
        className="absolute right-5 top-5 text-primary/15 transition-colors group-hover:text-primary/30"
        size={30}
        aria-hidden="true"
      />

      <Stars rating={tm.rating} />

      <blockquote className="mt-4 flex-1 text-[15px] italic leading-relaxed text-body md:text-base">
        &ldquo;{tm.content}&rdquo;
      </blockquote>

      <figcaption className="mt-6 flex items-center gap-3 border-t border-muted/10 pt-5">
        {tm.avatarUrl ? (
          <Image
            src={tm.avatarUrl}
            alt={tm.name}
            width={44}
            height={44}
            className="h-11 w-11 rounded-full object-cover ring-2 ring-primary/20"
          />
        ) : (
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-sm font-semibold text-white">
            {initials(tm.name)}
          </div>
        )}
        <div className="min-w-0">
          <p className="flex items-center gap-2 font-medium text-body">
            <span className="truncate">{tm.name}</span>
            {tm.featured && (
              <span className="shrink-0 rounded-full bg-secondary/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-secondary">
                ★ {featuredLabel}
              </span>
            )}
          </p>
          <p className="truncate text-sm text-muted">
            {tm.role} · {tm.company}
          </p>
        </div>
      </figcaption>
    </motion.figure>
  );
}

export function TestimonialsSection({
  testimonials,
  title,
  subtitle,
}: {
  testimonials: Testimonial[];
  title?: string;
  subtitle?: string;
}) {
  const t = useTranslations('testimonials');

  return (
    <Section id="testimonials">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-4xl font-semibold md:text-5xl">{title || t('title')}</h2>
          <p className="mt-2 text-muted">{subtitle || t('subtitle')}</p>
        </div>
        {testimonials.length > 0 && (
          <Link
            href="/testimonials"
            className="whitespace-nowrap text-sm font-medium text-secondary underline-offset-4 hover:underline"
          >
            {t('seeAll')} →
          </Link>
        )}
      </div>

      {testimonials.length === 0 ? (
        <p className="mt-8 font-mono text-muted">{t('empty')}</p>
      ) : (
        <div className="mt-10 grid gap-6 [perspective:1200px] sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((tm, i) => (
            <Card key={tm.id} tm={tm} index={i} featuredLabel={t('featured')} />
          ))}
        </div>
      )}
    </Section>
  );
}
