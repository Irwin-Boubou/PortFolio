interface Props {
  status: 'available' | 'busy' | 'open';
  label: string;
}

const DOT_COLOR: Record<Props['status'], string> = {
  available: 'bg-success',
  open: 'bg-amber-400',
  busy: 'bg-error',
};

/** Small pulsing-dot availability indicator, used near the hero. */
export function AvailabilityBadge({ status, label }: Props) {
  const dot = DOT_COLOR[status] ?? 'bg-muted';
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-muted/20 bg-surface px-3 py-1.5 text-sm text-body">
      <span className="relative flex h-2.5 w-2.5">
        <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${dot} opacity-60`} />
        <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${dot}`} />
      </span>
      {label}
    </span>
  );
}
