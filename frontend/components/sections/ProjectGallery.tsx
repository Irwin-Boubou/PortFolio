'use client';
import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight, FiMaximize2 } from 'react-icons/fi';

/** Featured image + scrollable thumbnail strip, with a keyboard-navigable lightbox. */
export function ProjectGallery({ images, title }: { images: string[]; title: string }) {
  const [featured, setFeatured] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const go = useCallback(
    (dir: 1 | -1) => setOpen((i) => (i === null ? i : (i + dir + images.length) % images.length)),
    [images.length],
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

  if (images.length === 0) return null;

  return (
    <>
      <div>
        {/* featured image */}
        <button
          onClick={() => setOpen(featured)}
          className="group relative block aspect-video w-full overflow-hidden rounded-2xl border border-muted/15 bg-surface"
          aria-label={`Open image ${featured + 1}`}
        >
          <Image
            key={images[featured]}
            src={images[featured]}
            alt={`${title} ${featured + 1}`}
            fill
            sizes="(max-width:768px) 100vw, 800px"
            className="object-contain p-8"
          />
          <span className="absolute bottom-4 right-4 grid h-10 w-10 place-items-center rounded-full bg-black/50 text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
            <FiMaximize2 size={16} />
          </span>
        </button>

        {/* thumbnail strip */}
        {images.length > 1 && (
          <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
            {images.map((src, i) => (
              <button
                key={src + i}
                onClick={() => setFeatured(i)}
                aria-label={`Show image ${i + 1}`}
                aria-current={i === featured}
                className={`relative aspect-video w-28 shrink-0 overflow-hidden rounded-lg border bg-surface transition-colors ${
                  i === featured ? 'border-primary' : 'border-muted/15 hover:border-muted/40'
                }`}
              >
                <Image src={src} alt="" fill sizes="112px" className="object-contain p-2" />
              </button>
            ))}
          </div>
        )}
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
            {images.length > 1 && (
              <>
                <button onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label="Previous" className="absolute left-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20">
                  <FiChevronLeft size={22} />
                </button>
                <button onClick={(e) => { e.stopPropagation(); go(1); }} aria-label="Next" className="absolute right-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20">
                  <FiChevronRight size={22} />
                </button>
              </>
            )}
            <div className="relative h-[80vh] w-[90vw] max-w-5xl" onClick={(e) => e.stopPropagation()}>
              <Image src={images[open]} alt={`${title} ${open + 1}`} fill sizes="90vw" className="object-contain" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
