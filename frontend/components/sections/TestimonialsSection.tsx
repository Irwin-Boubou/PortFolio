'use client';
import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { FaStar } from 'react-icons/fa';
import { FiStar } from 'react-icons/fi';
import { Section } from '@/components/layout/Section';
import type { Testimonial } from '@/lib/serverApi';

const AUTOPLAY_MS = 6000;
const SWIPE_THRESHOLD = 60;

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
    <div className="flex gap-1 text-secondary" aria-label={`${rating}/5`}>
      {Array.from({ length: 5 }).map((_, i) =>
        i < rating ? <FaStar key={i} size={14} /> : <FiStar key={i} size={14} />,
      )}
    </div>
  );
}

export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  const t = useTranslations('testimonials');
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setIndex((i) => (i + 1) % Math.max(testimonials.length, 1)), [testimonials.length]);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + testimonials.length) % Math.max(testimonials.length, 1)),
    [testimonials.length],
  );

  useEffect(() => {
    if (paused || reduce || testimonials.length < 2) return;
    const id = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, reduce, next, testimonials.length]);

  return (
    <Section id="testimonials">
      <h2 className="font-display text-4xl font-semibold md:text-5xl">{t('title')}</h2>
      <p className="mt-2 text-muted">{t('subtitle')}</p>

      {testimonials.length === 0 ? (
        <p className="mt-8 font-mono text-muted">{t('empty')}</p>
      ) : (
        <div
          className="relative mt-10 mx-auto max-w-2xl"
          style={{ perspective: '1200px' }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonials[index].id}
              drag={testimonials.length > 1 ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.6}
              onDragEnd={(_, info) => {
                if (info.offset.x < -SWIPE_THRESHOLD) next();
                else if (info.offset.x > SWIPE_THRESHOLD) prev();
              }}
              initial={reduce ? undefined : { opacity: 0, y: 60, rotateX: 15, scale: 0.95, x: 40 }}
              animate={reduce ? undefined : { opacity: 1, y: 0, rotateX: 0, scale: 1, x: 0 }}
              exit={reduce ? undefined : { opacity: 0, x: -40 }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              className="cursor-grab rounded-2xl border border-muted/15 bg-surface/60 p-8 shadow-lg backdrop-blur active:cursor-grabbing"
            >
              <Stars rating={testimonials[index].rating} />
              <p className="mt-5 font-display text-lg italic text-body md:text-xl">
                &ldquo;{testimonials[index].content}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-4">
                {testimonials[index].avatarUrl ? (
                  <Image
                    src={testimonials[index].avatarUrl as string}
                    alt={testimonials[index].name}
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                    {initials(testimonials[index].name)}
                  </div>
                )}
                <div>
                  <p className="font-medium text-body">
                    {testimonials[index].name}
                    {testimonials[index].featured && (
                      <span className="ml-2 rounded-full bg-secondary/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-secondary">
                        {t('featured')}
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-muted">
                    {testimonials[index].role} @ {testimonials[index].company}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {testimonials.length > 1 && (
            <div className="mt-6 flex justify-center gap-2">
              {testimonials.map((tm, i) => (
                <button
                  key={tm.id}
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all ${i === index ? 'w-6 bg-primary' : 'w-2 bg-muted/30'}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </Section>
  );
}
