'use client';
import { useEffect } from 'react';

export default function AdminError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      <p className="text-sm text-gray-500">Something went wrong loading this admin page.</p>
      <button onClick={reset} className="rounded-lg bg-[#6C63FF] px-5 py-2 text-sm text-white hover:bg-[#5a51f0]">
        Try again
      </button>
    </div>
  );
}
