'use client';
import { PropsWithChildren, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';

export function Providers({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: { queries: { staleTime: 30_000, retry: 1 } },
  }));
  return (
    <QueryClientProvider client={queryClient}>
      {/* data-theme attribute drives the CSS variables in globals.css */}
      <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false}>
        {children}
        <Toaster position="bottom-right" toastOptions={{ style: { background: 'var(--surface)', color: 'var(--text)' } }} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
