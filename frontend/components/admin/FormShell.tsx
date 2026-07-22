'use client';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from '@/navigation';

/** Consistent wrapper for admin create/edit screens: back link, title, white card. */
export function FormShell({
  title,
  backHref,
  children,
}: {
  title: string;
  backHref: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href={backHref}
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-[#6C63FF]"
      >
        <FiArrowLeft size={15} /> Back
      </Link>
      <h1 className="mb-6 font-display text-2xl font-bold">{title}</h1>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">{children}</div>
    </div>
  );
}
