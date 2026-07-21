'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []); // avoid hydration mismatch
  if (!mounted) return <span className="h-9 w-9" />;
  const dark = resolvedTheme === 'dark';
  return (
    <button
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      onClick={() => setTheme(dark ? 'light' : 'dark')}
      className="grid h-9 w-9 place-items-center rounded-full border border-muted/30 text-body transition-colors hover:border-secondary hover:text-secondary"
    >
      {dark ? <FiSun /> : <FiMoon />}
    </button>
  );
}
