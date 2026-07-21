import { useTranslations } from 'next-intl';
import { FiGithub, FiLinkedin, FiInstagram } from 'react-icons/fi';
import { FaBehance, FaDribbble, FaWhatsapp } from 'react-icons/fa';

export function Footer() {
  const t = useTranslations('footer');
  const socials = [
    { icon: FiGithub, href: 'https://github.com', label: 'GitHub' },
    { icon: FiLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: FaBehance, href: 'https://behance.net', label: 'Behance' },
    { icon: FaDribbble, href: 'https://dribbble.com', label: 'Dribbble' },
    { icon: FiInstagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: FaWhatsapp, href: 'https://wa.me/', label: 'WhatsApp' },
  ];
  return (
    <footer className="border-t border-muted/10 py-10">
      <div className="mx-auto flex max-w-content flex-col items-center gap-4 px-6 text-center">
        <div className="flex gap-4">
          {socials.map(({ icon: Icon, href, label }) => (
            <a key={label} href={href} aria-label={label} target="_blank" rel="noreferrer"
               className="text-muted transition-all hover:scale-110 hover:text-secondary">
              <Icon size={18} />
            </a>
          ))}
        </div>
        <p className="text-xs text-muted">© {new Date().getFullYear()} — {t('rights')} {t('builtWith')}</p>
      </div>
    </footer>
  );
}
