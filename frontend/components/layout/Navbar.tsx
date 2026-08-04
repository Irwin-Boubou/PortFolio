'use client';
import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import { FiMenu, FiCalendar } from 'react-icons/fi';
import { Link, usePathname } from '@/navigation';
import { siteContent } from '@/data/site-content';
import { ThemeToggle } from './ThemeToggle';
import { LocaleSwitcher } from './LocaleSwitcher';
import { MobileMenuOverlay } from './MobileMenuOverlay';
import { Logo } from './Logo';

/** Localize a site-content value ({ en, fr } shaped) for the navbar. */
function scValue(key: string, locale: string): unknown {
  const v = (siteContent as Record<string, unknown>)[key];
  if (v && typeof v === 'object' && !Array.isArray(v) && ('en' in v || 'fr' in v)) {
    const m = v as Record<string, unknown>;
    return m[locale] ?? m.en ?? m.fr ?? undefined;
  }
  return v;
}

export function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY >= 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const data: Record<string, unknown> = {
    'booking.url': scValue('booking.url', locale),
    'booking.label': scValue('booking.label', locale),
    'booking.enabled': scValue('booking.enabled', locale),
    'social.github': scValue('social.github', locale),
    'social.linkedin': scValue('social.linkedin', locale),
    'social.behance': scValue('social.behance', locale),
    'social.dribbble': scValue('social.dribbble', locale),
    'social.instagram': scValue('social.instagram', locale),
    'social.twitter': scValue('social.twitter', locale),
    'social.youtube': scValue('social.youtube', locale),
    'social.github.visible': scValue('social.github.visible', locale),
    'social.linkedin.visible': scValue('social.linkedin.visible', locale),
    'social.behance.visible': scValue('social.behance.visible', locale),
    'social.dribbble.visible': scValue('social.dribbble.visible', locale),
    'social.instagram.visible': scValue('social.instagram.visible', locale),
    'social.twitter.visible': scValue('social.twitter.visible', locale),
    'social.youtube.visible': scValue('social.youtube.visible', locale),
  };

  const links = [
    { href: '/about', label: t('about') },
    { href: '/work', label: t('work') },
    { href: '/skills', label: t('skills') },
    { href: '/tools', label: t('tools') },
    { href: '/blog', label: t('blog') },
    { href: '/contact', label: t('contact') },
  ];

  const mobileLinks = [{ href: '/', label: t('home') }, ...links];

  const isActive = (href: string) => {
    if (href.startsWith('/#')) return false;
    if (href === '/') return pathname === '/';
    if (href === '/work') return pathname.startsWith('/work');
    return pathname.startsWith(href);
  };

  const bookingUrl = data['booking.url'] as string | undefined;
  const bookingLabel = (data['booking.label'] as string | undefined) ?? t('bookCall');
  const bookingEnabled = Boolean(data['booking.enabled']);
  const raw = data;
  const socials = (
    [
      { key: 'github', label: 'GitHub' },
      { key: 'linkedin', label: 'LinkedIn' },
      { key: 'behance', label: 'Behance' },
      { key: 'dribbble', label: 'Dribbble' },
      { key: 'instagram', label: 'Instagram' },
      { key: 'twitter', label: 'X (Twitter)' },
      { key: 'youtube', label: 'YouTube' },
    ] as const
  )
    // hidden when the URL is empty or the `.visible` flag is explicitly false
    .map((s) => ({
      key: s.key as string,
      label: s.label as string,
      href: raw?.[`social.${s.key}`] as string | undefined,
      visible: raw?.[`social.${s.key}.visible`] !== false,
    }))
    .filter((s): s is { key: string; href: string; label: string; visible: boolean } => Boolean(s.href) && s.visible);

  return (
    <>
      <motion.header
        initial={reduce ? undefined : { y: -20, opacity: 0 }}
        animate={reduce ? undefined : { y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="fixed inset-x-0 top-4 z-50 mx-auto w-fit max-w-[calc(100%-2rem)] rounded-full transition-all duration-400"
        style={{
          border: scrolled ? '1px solid rgba(108,99,255,0.35)' : '1px solid rgba(108,99,255,0.2)',
          boxShadow: scrolled ? '0 8px 32px rgba(108,99,255,0.15)' : undefined,
        }}
      >
        <nav
          className={`flex items-center gap-6 rounded-full py-2.5 pl-6 pr-3 ${
            scrolled ? 'bg-bg/85 backdrop-blur-[20px] backdrop-saturate-[1.8]' : 'bg-bg/40'
          }`}
          aria-label="Main"
        >
          <div className="shrink-0">
            <Logo size={30} showWordmark={false} className="lg:hidden" />
            <Logo size={36} showWordmark className="hidden lg:inline-flex" />
          </div>

          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? 'page' : undefined}
                  className={`whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-medium transition-colors duration-200 hover:text-primary ${
                    isActive(l.href) ? 'text-primary' : 'text-muted'
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-4 lg:flex">
            <div className="flex items-center gap-3">
              <LocaleSwitcher />
              <ThemeToggle />
            </div>
            <span className="h-6 w-px shrink-0 bg-muted/20" aria-hidden="true" />
            {/* Only show a highlighted CTA pill when there's a real booking link to promote —
                otherwise it just duplicates the "Contact" nav link right next to it. */}
            {bookingEnabled && bookingUrl && <InlineBookCallButton url={bookingUrl} label={bookingLabel} />}
          </div>

          <div className="ml-auto flex items-center gap-2 lg:hidden">
            {bookingEnabled && bookingUrl && <InlineBookCallButton url={bookingUrl} label={bookingLabel} iconOnly />}
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full text-body"
              aria-label={t('menu')}
              aria-expanded={open}
              onClick={() => setOpen(true)}
            >
              <FiMenu size={20} />
            </button>
          </div>
        </nav>
      </motion.header>

      <MobileMenuOverlay
        open={open}
        onClose={() => setOpen(false)}
        links={mobileLinks}
        isActive={isActive}
        closeLabel={t('close')}
        socials={socials}
      />
    </>
  );
}

/** Slim, pill-sized "book a call" button reusing BookCallButton's modal-iframe pattern. */
function InlineBookCallButton({ url, label, iconOnly }: { url: string; label: string; iconOnly?: boolean }) {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setModalOpen(true)}
        aria-label={label}
        className={`flex items-center gap-1.5 rounded-full bg-primary text-sm font-semibold text-white transition-all hover:scale-[1.02] hover:brightness-110 hover:shadow-[0_4px_20px_rgba(108,99,255,0.4)] ${
          iconOnly ? 'h-10 w-10 justify-center' : 'px-5 py-2.5'
        }`}
      >
        <FiCalendar /> {!iconOnly && label}
      </button>
      {modalOpen && <BookCallModal url={url} label={label} onClose={() => setModalOpen(false)} />}
    </>
  );
}

function BookCallModal({ url, label, onClose }: { url: string; label: string; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative h-[80vh] w-full max-w-2xl overflow-hidden rounded-2xl bg-surface shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-bg/80 text-body hover:text-primary"
        >
          ×
        </button>
        <iframe src={url} title={label} className="h-full w-full border-0" />
      </div>
    </div>
  );
}
