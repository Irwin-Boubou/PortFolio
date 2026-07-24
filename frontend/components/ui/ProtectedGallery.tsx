'use client';
import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight, FiMaximize2 } from 'react-icons/fi';

/**
 * Preview-only image gallery for credentials (diplomas, certificates).
 *
 * Download deterrents: context menu and drag are blocked, and a transparent
 * overlay sits above the image so "save image as" targets nothing useful.
 * Note this only deters casual saving, a determined visitor can still pull the
 * file from the network tab; true prevention isn't possible for web images.
 */
export function ProtectedGallery({ images, alt }: { images: string[]; alt: string }) {
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

  if (!images || images.length === 0) return null;

  const guard = {
    onContextMenu: (e: React.MouseEvent) => e.preventDefault(),
    onDragStart: (e: React.DragEvent) => e.preventDefault(),
  };

  return (
    <>
      <div className="mt-3 flex flex-wrap gap-2">
        {images.map((src, i) => (
          <button
            key={src + i}
            onClick={() => setOpen(i)}
            className="group relative h-16 w-24 overflow-hidden rounded-lg border border-muted/20"
            aria-label={`View ${alt} document ${i + 1}`}
            {...guard}
          >
            <Image src={src} alt="" fill sizes="96px" className="select-none object-cover" draggable={false} />
            <span className="pointer-events-none absolute inset-0 grid place-items-center bg-black/0 text-white opacity-0 transition group-hover:bg-black/40 group-hover:opacity-100">
              <FiMaximize2 size={16} />
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            onContextMenu={(e) => e.preventDefault()}
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
            <div className="relative h-[80vh] w-[90vw] max-w-4xl" onClick={(e) => e.stopPropagation()} {...guard}>
              <Image src={images[open]} alt={alt} fill sizes="90vw" className="select-none object-contain" draggable={false} />
              {/* transparent shield above the image */}
              <div className="absolute inset-0" aria-hidden="true" {...guard} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
