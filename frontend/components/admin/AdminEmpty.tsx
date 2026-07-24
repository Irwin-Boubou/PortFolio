import type { ReactNode } from 'react';

/** Consistent empty state for admin lists: dashed card, icon, message, optional action. */
export function AdminEmpty({
  icon,
  title,
  hint,
  action,
}: {
  icon?: ReactNode;
  title: string;
  hint?: string;
  action?: ReactNode;
}) {
  return (
    <div className="grid place-items-center rounded-2xl border border-dashed border-gray-300 bg-white/60 px-6 py-14 text-center">
      {icon && <div className="mb-3 text-gray-300">{icon}</div>}
      <p className="text-sm font-medium text-gray-600">{title}</p>
      {hint && <p className="mt-1 max-w-sm text-xs text-gray-400">{hint}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
