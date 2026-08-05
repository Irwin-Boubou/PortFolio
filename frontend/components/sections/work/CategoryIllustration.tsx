/** Abstract, on-brand illustrations for the Work index cards — no dependency on
 * any single project's thumbnail, so they stay consistent as projects come and go. */

export function Backdrop({ gradId }: { gradId: string }) {
  return (
    <>
      <defs>
        <radialGradient id={`${gradId}-a`} cx="20%" cy="15%" r="60%">
          <stop offset="0%" stopColor="#6C63FF" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#6C63FF" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${gradId}-b`} cx="85%" cy="90%" r="55%">
          <stop offset="0%" stopColor="#00D9FF" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#00D9FF" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${gradId}-line`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6C63FF" />
          <stop offset="100%" stopColor="#00D9FF" />
        </linearGradient>
        <pattern id={`${gradId}-dots`} width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1.5" fill="#ffffff" opacity="0.06" />
        </pattern>
      </defs>
      <rect width="400" height="250" fill="#12121f" />
      <rect width="400" height="250" fill={`url(#${gradId}-dots)`} />
      <rect width="400" height="250" fill={`url(#${gradId}-a)`} />
      <rect width="400" height="250" fill={`url(#${gradId}-b)`} />
    </>
  );
}

export function DevIllustration() {
  const id = 'dev-illust';
  return (
    <svg viewBox="0 0 400 250" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <Backdrop gradId={id} />

      {/* oversized angle brackets, decorative */}
      <text x="18" y="205" fontFamily="ui-monospace, monospace" fontSize="150" fontWeight="700" fill="#6C63FF" opacity="0.12">
        {'<>'}
      </text>

      {/* terminal card */}
      <g transform="translate(96,55)">
        <rect width="230" height="140" rx="12" fill="#0d0d17" stroke="#ffffff" strokeOpacity="0.08" />
        <rect width="230" height="26" rx="12" fill="#181828" />
        <rect width="230" height="14" y="12" fill="#181828" />
        <circle cx="16" cy="13" r="4" fill="#FF5F56" />
        <circle cx="32" cy="13" r="4" fill="#FFBD2E" />
        <circle cx="48" cy="13" r="4" fill="#27C93F" />

        {/* code lines */}
        <rect x="18" y="44" width="70" height="6" rx="3" fill={`url(#${id}-line)`} opacity="0.9" />
        <rect x="94" y="44" width="40" height="6" rx="3" fill="#ffffff" opacity="0.35" />
        <rect x="30" y="62" width="50" height="6" rx="3" fill="#00D9FF" opacity="0.7" />
        <rect x="86" y="62" width="90" height="6" rx="3" fill="#ffffff" opacity="0.2" />
        <rect x="18" y="80" width="30" height="6" rx="3" fill="#6C63FF" opacity="0.8" />
        <rect x="54" y="80" width="110" height="6" rx="3" fill="#ffffff" opacity="0.25" />
        <rect x="30" y="98" width="60" height="6" rx="3" fill="#00D9FF" opacity="0.6" />
        <rect x="18" y="116" width="20" height="6" rx="3" fill="#ffffff" opacity="0.3" />
        <rect x="44" y="116" width="8" height="6" rx="1" fill="#00D9FF">
          <animate attributeName="opacity" values="1;0;1" dur="1.1s" repeatCount="indefinite" />
        </rect>
      </g>
    </svg>
  );
}

export function DesignIllustration() {
  const id = 'design-illust';
  return (
    <svg viewBox="0 0 400 250" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <Backdrop gradId={id} />

      {/* layered swatch cards */}
      <g transform="translate(150,60)">
        <rect x="-40" y="30" width="110" height="80" rx="14" fill="#6C63FF" opacity="0.22" transform="rotate(-8 15 70)" />
        <rect x="-10" y="14" width="110" height="80" rx="14" fill="#00D9FF" opacity="0.22" transform="rotate(6 45 54)" />
        <rect x="20" y="0" width="110" height="80" rx="14" fill="#0d0d17" stroke="#ffffff" strokeOpacity="0.12" />
        <circle cx="46" cy="26" r="9" fill="#6C63FF" />
        <circle cx="72" cy="26" r="9" fill="#00D9FF" />
        <circle cx="98" cy="26" r="9" fill="#FF9AD5" />
        <rect x="38" y="48" width="80" height="6" rx="3" fill="#ffffff" opacity="0.25" />
        <rect x="38" y="60" width="55" height="6" rx="3" fill="#ffffff" opacity="0.15" />
      </g>

      {/* bezier pen-tool path, drawn across the scene */}
      <path
        d="M40 190 C 110 140, 160 230, 230 150 S 340 90, 372 70"
        fill="none"
        stroke={`url(#${id}-line)`}
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.85"
      />
      <circle cx="40" cy="190" r="5" fill="#0d0d17" stroke="#6C63FF" strokeWidth="2" />
      <circle cx="230" cy="150" r="5" fill="#0d0d17" stroke="#00D9FF" strokeWidth="2" />
      <circle cx="372" cy="70" r="5" fill="#0d0d17" stroke="#00D9FF" strokeWidth="2" />
    </svg>
  );
}
