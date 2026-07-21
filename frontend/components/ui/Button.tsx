'use client';
import { useRef } from 'react';
import { Link } from '@/navigation';
import clsxLite from '@/lib/clsx';

interface Props {
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'outline';
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

/**
 * Design-system button with the spec's "magnetic" hover (§7.1.1):
 * the button leans toward the cursor, then springs back.
 */
export function Button({ href, onClick, variant = 'primary', children, className, type = 'button', disabled }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.25;
    const y = (e.clientY - r.top - r.height / 2) * 0.25;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = 'translate(0,0)'; };

  const base = clsxLite(
    'inline-block rounded-full px-7 py-3 font-medium text-sm md:text-base transition-colors',
    variant === 'primary'
      ? 'bg-primary text-white hover:bg-[#5a51f0] shadow-[0_0_28px_rgba(108,99,255,0.35)]'
      : 'border border-primary/60 text-body hover:border-secondary hover:text-secondary',
    disabled && 'opacity-50 pointer-events-none',
    className,
  );

  const inner = (
    <span ref={ref} className="block transition-transform duration-200 ease-out" onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </span>
  );

  if (href) return <Link href={href} className={base}>{inner}</Link>;
  return <button type={type} onClick={onClick} disabled={disabled} className={base}>{inner}</button>;
}
