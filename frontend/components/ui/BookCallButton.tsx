'use client';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { FiCalendar, FiX } from 'react-icons/fi';

interface Props {
  url: string;
  label: string;
  enabled: boolean;
}

/** Opens the booking URL (e.g. Calendly) inside a modal iframe. */
export function BookCallButton({ url, label, enabled }: Props) {
  const [open, setOpen] = useState(false);

  if (!enabled || !url) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-white shadow-[0_0_28px_rgba(108,99,255,0.35)] transition-colors hover:bg-[#5a51f0]"
      >
        <FiCalendar /> {label}
      </button>
      {open &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <div
              className="relative h-[80vh] w-full max-w-2xl overflow-hidden rounded-2xl bg-surface shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-bg/80 text-body hover:text-primary"
              >
                <FiX size={18} />
              </button>
              <iframe src={url} title={label} className="h-full w-full border-0" />
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
