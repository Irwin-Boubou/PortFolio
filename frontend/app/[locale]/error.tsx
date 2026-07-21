'use client';
import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-screen max-w-content flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="font-mono text-sm text-secondary">500</p>
      <h1 className="font-display text-3xl font-bold md:text-4xl">Something went wrong</h1>
      <p className="max-w-md text-muted">
        An unexpected error occurred while loading this page. You can try again or head back home.
      </p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="rounded-full border border-muted/25 px-6 py-2.5 text-sm transition-colors hover:text-body"
        >
          Try again
        </button>
        <Button href="/">Go home</Button>
      </div>
    </div>
  );
}
