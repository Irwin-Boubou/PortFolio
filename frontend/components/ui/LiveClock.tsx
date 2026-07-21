'use client';
import { useEffect, useState } from 'react';

interface Props {
  timezone: string;
  location: string;
}

/** Client-only live clock; renders nothing until mounted to avoid SSR/CSR time mismatch. */
export function LiveClock({ timezone, location }: Props) {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState('');

  useEffect(() => {
    setMounted(true);
    const format = () =>
      setTime(
        new Intl.DateTimeFormat('en-GB', {
          timeZone: timezone,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }).format(new Date()),
      );
    format();
    const id = setInterval(format, 1000);
    return () => clearInterval(id);
  }, [timezone]);

  if (!mounted) return null;

  return (
    <span className="font-mono text-sm text-muted">
      {location} · <span className="text-body">{time}</span>
    </span>
  );
}
