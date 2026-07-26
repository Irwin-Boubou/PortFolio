'use client';
import { PropsWithChildren } from 'react';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';

export function Providers({ children }: PropsWithChildren) {
  return (
    // data-theme attribute drives the CSS variables in globals.css
    <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false}>
      {children}
      <Toaster position="bottom-right" toastOptions={{ style: { background: 'var(--surface)', color: 'var(--text)' } }} />
    </ThemeProvider>
  );
}
