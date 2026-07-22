import type { Metadata } from 'next';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = { title: 'Not Found' };

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-screen max-w-content flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="font-mono text-sm text-secondary">404</p>
      <h1 className="font-display text-3xl font-bold md:text-4xl">Page not found</h1>
      <p className="max-w-md text-muted">The page you&apos;re looking for doesn&apos;t exist or may have moved.</p>
      <Button href="/">Go home</Button>
    </div>
  );
}
