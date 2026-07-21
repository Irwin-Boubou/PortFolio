'use client';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/navigation';
import { FiMenu, FiX } from 'react-icons/fi';
import { ThemeToggle } from './ThemeToggle';
import { LocaleSwitcher } from './LocaleSwitcher';

export function Navbar() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '/', label: t('home') },
    { href: '/work/development', label: t('devWork') },
    { href: '/work/design', label: t('designWork') },
    { href: '/blog', label: t('blog') },
    { href: '/contact', label: t('contact') },
  ];
  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors ${
        scrolled ? 'border-muted/10 bg-bg/80 backdrop-blur-lg shadow-sm' : 'border-transparent bg-bg/40 backdrop-blur-md'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-content items-center justify-between px-6" aria-label="Main">
        <Link href="/" className="font-display text-lg font-bold tracking-tight">
          <span className="gradient-text">&lt;YN /&gt;</span>
        </Link>
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={isActive(l.href) ? 'page' : undefined}
                className={`text-sm transition-colors hover:text-body ${isActive(l.href) ? 'font-medium text-body' : 'text-muted'}`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="hidden items-center gap-3 md:flex">
          <LocaleSwitcher />
          <ThemeToggle />
        </div>
        <button className="min-h-[44px] min-w-[44px] md:hidden" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </nav>
      {open && (
        <div className="border-t border-muted/10 bg-bg px-6 py-4 md:hidden">
          <ul className="space-y-4">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(l.href) ? 'page' : undefined}
                  className={`block py-1 ${isActive(l.href) ? 'font-medium text-body' : 'text-muted'}`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center gap-3"><LocaleSwitcher /><ThemeToggle /></div>
        </div>
      )}
    </header>
  );
}
