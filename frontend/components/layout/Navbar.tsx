'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { FiMenu, FiX } from 'react-icons/fi';
import { ThemeToggle } from './ThemeToggle';
import { LocaleSwitcher } from './LocaleSwitcher';

export function Navbar() {
  const t = useTranslations('nav');
  const [open, setOpen] = useState(false);
  const links = [
    { href: '/', label: t('home') },
    { href: '/work/development', label: t('devWork') },
    { href: '/work/design', label: t('designWork') },
    { href: '/blog', label: t('blog') },
    { href: '/contact', label: t('contact') },
  ];
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-muted/10 bg-bg/70 backdrop-blur-lg">
      <nav className="mx-auto flex h-16 max-w-content items-center justify-between px-6" aria-label="Main">
        <Link href="/" className="font-display text-lg font-bold tracking-tight">
          <span className="gradient-text">&lt;YN /&gt;</span>
        </Link>
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="text-sm text-muted transition-colors hover:text-body">{l.label}</Link>
            </li>
          ))}
        </ul>
        <div className="hidden items-center gap-3 md:flex">
          <LocaleSwitcher />
          <ThemeToggle />
        </div>
        <button className="md:hidden" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </nav>
      {open && (
        <div className="border-t border-muted/10 bg-bg px-6 py-4 md:hidden">
          <ul className="space-y-4">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} onClick={() => setOpen(false)} className="block text-body">{l.label}</Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center gap-3"><LocaleSwitcher /><ThemeToggle /></div>
        </div>
      )}
    </header>
  );
}
