'use client';
import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Section } from '@/components/layout/Section';
import type { GalleryPhoto } from '@/lib/serverApi';

export function GallerySection({ photos }: { photos: GalleryPhoto[] }) {
  const t = useTranslations('about');
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const go = useCallback(
    (dir: 1 | -1) => setOpen((i) => (i === null ? i : (i + dir + photos.length) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close, go]);

  if (photos.length === 0) return null;

  return (
    <Section id="gallery">
      <h2 className="font-display text-4xl font-semibold md:text-5xl">{t('galleryTitle')}</h2>
      <p className="mt-2 text-muted">{t('gallerySubtitle')}</p>

      <div className="mt-10 columns-2 gap-4 md:columns-3 [&>*]:mb-4">
        {photos.map((photo, i) => (
          <motion.button
            key={photo.id}
            onClick={() => setOpen(i)}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30 }}
            whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            className="group relative block w-full overflow-hidden rounded-2xl border border-muted/15"
            aria-label={photo.caption ?? `Photo ${i + 1}`}
          >
            <Image
              src={photo.url}
              alt={photo.caption ?? ''}
              width={600}
              height={800}
              className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {photo.caption && (
              <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-left text-sm text-white opacity-0 transition-opacity group-hover:opacity-100">
                {photo.caption}
              </span>
            )}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <button onClick={close} aria-label="Close" className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20">
              <FiX size={22} />
            </button>
            {photos.length > 1 && (
              <>
                <button onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label="Previous" className="absolute left-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20">
                  <FiChevronLeft size={22} />
                </button>
                <button onClick={(e) => { e.stopPropagation(); go(1); }} aria-label="Next" className="absolute right-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20">
                  <FiChevronRight size={22} />
                </button>
              </>
            )}
            <figure className="max-h-[85vh] max-w-4xl" onClick={(e) => e.stopPropagation()}>
              <Image
                src={photos[open].url}
                alt={photos[open].caption ?? ''}
                width={1200}
                height={1600}
                className="max-h-[80vh] w-auto rounded-xl object-contain"
              />
              {photos[open].caption && (
                <figcaption className="mt-3 text-center text-sm text-white/80">{photos[open].caption}</figcaption>
              )}
            </figure>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
