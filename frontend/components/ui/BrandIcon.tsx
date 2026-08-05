/** Small on-brand line-art icon set — same gradient/glow language as the Work card
 * illustrations, used for Services, About "Values" tiles, and section empty states. */
import { cloneElement } from 'react';

const GRADIENT_ID = 'brand-icon-grad';

function Grad() {
  return (
    <defs>
      <linearGradient id={GRADIENT_ID} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6C63FF" />
        <stop offset="100%" stopColor="#00D9FF" />
      </linearGradient>
    </defs>
  );
}

const icons = {
  // services
  fullstack: (
    <svg viewBox="0 0 48 48" fill="none">
      <Grad />
      <rect x="8" y="8" width="32" height="9" rx="2.5" stroke={`url(#${GRADIENT_ID})`} strokeWidth="2" />
      <rect x="8" y="19.5" width="32" height="9" rx="2.5" stroke={`url(#${GRADIENT_ID})`} strokeWidth="2" opacity="0.75" />
      <rect x="8" y="31" width="32" height="9" rx="2.5" stroke={`url(#${GRADIENT_ID})`} strokeWidth="2" opacity="0.5" />
      <circle cx="13.5" cy="12.5" r="1.6" fill={`url(#${GRADIENT_ID})`} />
      <circle cx="13.5" cy="24" r="1.6" fill={`url(#${GRADIENT_ID})`} opacity="0.75" />
      <circle cx="13.5" cy="35.5" r="1.6" fill={`url(#${GRADIENT_ID})`} opacity="0.5" />
    </svg>
  ),
  payments: (
    <svg viewBox="0 0 48 48" fill="none">
      <Grad />
      <rect x="6" y="12" width="36" height="24" rx="4" stroke={`url(#${GRADIENT_ID})`} strokeWidth="2" />
      <rect x="6" y="18" width="36" height="5" fill={`url(#${GRADIENT_ID})`} opacity="0.35" />
      <circle cx="33" cy="29" r="4.5" stroke={`url(#${GRADIENT_ID})`} strokeWidth="2" />
      <path d="M13 29h8" stroke={`url(#${GRADIENT_ID})`} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
    </svg>
  ),
  brand: (
    <svg viewBox="0 0 48 48" fill="none">
      <Grad />
      <circle cx="18" cy="18" r="7" fill={`url(#${GRADIENT_ID})`} opacity="0.28" />
      <circle cx="29" cy="15" r="6" fill={`url(#${GRADIENT_ID})`} opacity="0.4" />
      <path d="M12 36 L34 12" stroke={`url(#${GRADIENT_ID})`} strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="36" r="2.4" fill="#0d0d17" stroke={`url(#${GRADIENT_ID})`} strokeWidth="2" />
      <circle cx="34" cy="12" r="2.4" fill="#0d0d17" stroke={`url(#${GRADIENT_ID})`} strokeWidth="2" />
    </svg>
  ),
  uiux: (
    <svg viewBox="0 0 48 48" fill="none">
      <Grad />
      <rect x="7" y="9" width="34" height="24" rx="3" stroke={`url(#${GRADIENT_ID})`} strokeWidth="2" />
      <path d="M7 15h34" stroke={`url(#${GRADIENT_ID})`} strokeWidth="2" opacity="0.5" />
      <circle cx="11.5" cy="12" r="1" fill={`url(#${GRADIENT_ID})`} />
      <circle cx="15" cy="12" r="1" fill={`url(#${GRADIENT_ID})`} opacity="0.6" />
      <path d="M24 24 L31 31 M31 24 L26 29" stroke={`url(#${GRADIENT_ID})`} strokeWidth="2" strokeLinecap="round" />
      <rect x="14" y="21" width="7" height="7" rx="1.5" stroke={`url(#${GRADIENT_ID})`} strokeWidth="1.6" opacity="0.7" />
    </svg>
  ),
  mobile: (
    <svg viewBox="0 0 48 48" fill="none">
      <Grad />
      <rect x="15" y="6" width="18" height="36" rx="4" stroke={`url(#${GRADIENT_ID})`} strokeWidth="2" />
      <path d="M15 12h18M15 36h18" stroke={`url(#${GRADIENT_ID})`} strokeWidth="2" opacity="0.5" />
      <circle cx="24" cy="39" r="1.4" fill={`url(#${GRADIENT_ID})`} />
      <rect x="19" y="17" width="10" height="6" rx="1.5" fill={`url(#${GRADIENT_ID})`} opacity="0.3" />
      <rect x="19" y="25" width="6" height="6" rx="1.5" stroke={`url(#${GRADIENT_ID})`} strokeWidth="1.6" opacity="0.7" />
    </svg>
  ),
  // "what i do" identity cards
  domains: (
    <svg viewBox="0 0 48 48" fill="none">
      <Grad />
      <rect x="6" y="8" width="16" height="12" rx="2.5" stroke={`url(#${GRADIENT_ID})`} strokeWidth="2" />
      <rect x="26" y="8" width="16" height="12" rx="2.5" stroke={`url(#${GRADIENT_ID})`} strokeWidth="2" opacity="0.75" />
      <rect x="6" y="28" width="16" height="12" rx="2.5" stroke={`url(#${GRADIENT_ID})`} strokeWidth="2" opacity="0.55" />
      <rect x="26" y="28" width="16" height="12" rx="2.5" stroke={`url(#${GRADIENT_ID})`} strokeWidth="2" opacity="0.35" />
    </svg>
  ),
  lifecycle: (
    <svg viewBox="0 0 48 48" fill="none">
      <Grad />
      <path
        d="M24 8a16 16 0 1 1-11.3 4.7"
        stroke={`url(#${GRADIENT_ID})`}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M7 6v7h7" stroke={`url(#${GRADIENT_ID})`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="24" cy="8" r="2" fill={`url(#${GRADIENT_ID})`} />
      <circle cx="24" cy="40" r="2" fill={`url(#${GRADIENT_ID})`} opacity="0.6" />
    </svg>
  ),
  // about "values"
  precision: (
    <svg viewBox="0 0 48 48" fill="none">
      <Grad />
      <circle cx="24" cy="24" r="15" stroke={`url(#${GRADIENT_ID})`} strokeWidth="2" opacity="0.4" />
      <circle cx="24" cy="24" r="9" stroke={`url(#${GRADIENT_ID})`} strokeWidth="2" opacity="0.7" />
      <circle cx="24" cy="24" r="3" fill={`url(#${GRADIENT_ID})`} />
    </svg>
  ),
  'user-first': (
    <svg viewBox="0 0 48 48" fill="none">
      <Grad />
      <circle cx="24" cy="17" r="7" stroke={`url(#${GRADIENT_ID})`} strokeWidth="2" />
      <path d="M10 39c1.5-8 7-12 14-12s12.5 4 14 12" stroke={`url(#${GRADIENT_ID})`} strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  growth: (
    <svg viewBox="0 0 48 48" fill="none">
      <Grad />
      <path d="M24 40V20" stroke={`url(#${GRADIENT_ID})`} strokeWidth="2" strokeLinecap="round" />
      <path d="M24 20c0-8-6-11-12-11 0 8 5 12 12 11Z" fill={`url(#${GRADIENT_ID})`} opacity="0.35" />
      <path d="M24 26c0-7 5-10 11-10 0 7-5 11-11 10Z" fill={`url(#${GRADIENT_ID})`} opacity="0.55" />
    </svg>
  ),
  // generic empty state
  empty: (
    <svg viewBox="0 0 48 48" fill="none">
      <Grad />
      <rect x="8" y="8" width="32" height="32" rx="8" stroke={`url(#${GRADIENT_ID})`} strokeWidth="2" strokeDasharray="5 5" opacity="0.5" />
      <circle cx="24" cy="24" r="5" stroke={`url(#${GRADIENT_ID})`} strokeWidth="2" />
      <path d="M28 28l6 6" stroke={`url(#${GRADIENT_ID})`} strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
} as const;

export type BrandIconName = keyof typeof icons;

export function BrandIcon({ name, size = 32, className }: { name: BrandIconName; size?: number; className?: string }) {
  const svg = icons[name] ?? icons.empty;
  return (
    <span style={{ width: size, height: size }} className={`inline-block ${className ?? ''}`}>
      {cloneElement(svg, { width: size, height: size })}
    </span>
  );
}
