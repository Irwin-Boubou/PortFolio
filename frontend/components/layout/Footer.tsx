import { getLocale, getTranslations } from 'next-intl/server';
import { FiGithub, FiLinkedin, FiInstagram, FiYoutube } from 'react-icons/fi';
import { FaBehance, FaDribbble, FaXTwitter } from 'react-icons/fa6';
import { getSiteContent, type Locale } from '@/lib/content';

const SOCIAL_KEYS = [
  { key: 'social.github', icon: FiGithub, label: 'GitHub' },
  { key: 'social.linkedin', icon: FiLinkedin, label: 'LinkedIn' },
  { key: 'social.behance', icon: FaBehance, label: 'Behance' },
  { key: 'social.dribbble', icon: FaDribbble, label: 'Dribbble' },
  { key: 'social.instagram', icon: FiInstagram, label: 'Instagram' },
  { key: 'social.twitter', icon: FaXTwitter, label: 'X (Twitter)' },
  { key: 'social.youtube', icon: FiYoutube, label: 'YouTube' },
];

/** Footer social links are read from data/site-content.ts (social.* keys); a link only renders once its URL is set. */
export async function Footer() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations('footer');
  const c = getSiteContent(locale, SOCIAL_KEYS.flatMap((s) => [s.key, `${s.key}.visible`]));
  // a link shows only when it has a URL and its `.visible` flag is not explicitly false
  const socials = SOCIAL_KEYS
    .map((s) => ({ ...s, href: c[s.key] as string | undefined, visible: c[`${s.key}.visible`] !== false }))
    .filter((s) => s.href && s.visible);

  return (
    <footer className="border-t border-muted/10 py-10">
      <div className="mx-auto flex max-w-content flex-col items-center gap-4 px-6 text-center">
        {socials.length > 0 && (
          <div className="flex gap-4">
            {socials.map(({ icon: Icon, href, label }) => (
              <a key={label} href={href} aria-label={label} target="_blank" rel="noreferrer"
                 className="text-muted transition-all hover:scale-110 hover:text-secondary">
                <Icon size={18} />
              </a>
            ))}
          </div>
        )}
        <p className="text-xs text-muted">© {new Date().getFullYear()}, {t('rights')} {t('builtWith')}</p>
      </div>
    </footer>
  );
}
