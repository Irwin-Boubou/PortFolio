import { getLocale, getTranslations } from 'next-intl/server';
import { FiGithub, FiLinkedin, FiInstagram, FiYoutube } from 'react-icons/fi';
import { FaBehance, FaDribbble, FaXTwitter } from 'react-icons/fa6';
import { apiGet } from '@/lib/serverApi';

const SOCIAL_KEYS = [
  { key: 'social.github', icon: FiGithub, label: 'GitHub' },
  { key: 'social.linkedin', icon: FiLinkedin, label: 'LinkedIn' },
  { key: 'social.behance', icon: FaBehance, label: 'Behance' },
  { key: 'social.dribbble', icon: FaDribbble, label: 'Dribbble' },
  { key: 'social.instagram', icon: FiInstagram, label: 'Instagram' },
  { key: 'social.twitter', icon: FaXTwitter, label: 'X (Twitter)' },
  { key: 'social.youtube', icon: FiYoutube, label: 'YouTube' },
];

/** Footer text and every social link are editable from /admin/site-content, no code changes needed to update them. */
export async function Footer() {
  const locale = await getLocale();
  const t = await getTranslations('footer');
  const content = await apiGet<{ content: Record<string, unknown> }>(
    `/site-content?keys=${SOCIAL_KEYS.map((s) => s.key).join(',')}&lang=${locale}`,
  );
  const c = content?.content ?? {};
  const socials = SOCIAL_KEYS.map((s) => ({ ...s, href: c[s.key] as string | undefined })).filter((s) => s.href);

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
