'use client';
import { FiStar } from 'react-icons/fi';

/** 1–5 star selector for the admin testimonial form. */
export function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex items-center gap-1" role="radiogroup" aria-label="Rating">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          aria-label={`${n} star${n > 1 ? 's' : ''}`}
          aria-checked={value === n}
          role="radio"
          className="rounded p-0.5 transition-transform hover:scale-110"
        >
          <FiStar
            size={24}
            className={n <= value ? 'fill-[#FFB800] text-[#FFB800]' : 'text-gray-300'}
          />
        </button>
      ))}
      <span className="ml-2 text-sm text-gray-500">{value}/5</span>
    </div>
  );
}
