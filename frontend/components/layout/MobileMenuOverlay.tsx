'use client';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { FiX, FiGithub, FiLinkedin, FiInstagram } from 'react-icons/fi';
import { FaBehance, FaDribbble, FaWhatsapp } from 'react-icons/fa';
import { Link } from '@/navigation';
import { LocaleSwitcher } from './LocaleSwitcher';
import { ThemeToggle } from './ThemeToggle';

interface NavLink {
  href: string;
  label: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  links: NavLink[];
  isActive: (href: string) => boolean;
  closeLabel: string;
}

const socials = [
  { icon: FiGithub, href: 'https://github.com', label: 'GitHub' },
  { icon: FiLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: FaBehance, href: 'https://behance.net', label: 'Behance' },
  { icon: FaDribbble, href: 'https://dribbble.com', label: 'Dribbble' },
  { icon: FiInstagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: FaWhatsapp, href: 'https://wa.me/', label: 'WhatsApp' },
];

/** Full-screen mobile nav overlay revealed from the floating pill's hamburger. */
export function MobileMenuOverlay({ open, onClose, links, isActive, closeLabel }: Props) {
  const reduce = useReducedMotion();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex flex-col bg-[rgba(13,13,26,0.97)] backdrop-blur-xl lg:hidden"
          initial={reduce ? undefined : { opacity: 0 }}
          animate={reduce ? undefined : { opacity: 1 }}
          exit={reduce ? undefined : { opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white"
          >
            <FiX size={22} />
          </button>

          <nav className="flex flex-1 flex-col items-center justify-center gap-6" aria-label="Mobile">
            {links.map((l, i) => (
              <motion.div
                key={l.href}
                initial={reduce ? undefined : { opacity: 0, y: 20 }}
                animate={reduce ? undefined : { opacity: 1, y: 0 }}
                transition={{ delay: reduce ? 0 : i * 0.05 }}
              >
                <Link
                  href={l.href}
                  onClick={onClose}
                  className={`font-display text-3xl font-bold lg:text-4xl ${
                    isActive(l.href) ? 'text-primary' : 'text-white'
                  }`}
                >
                  {l.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="flex flex-col items-center gap-6 pb-10">
            <div className="flex items-center gap-4">
              <LocaleSwitcher />
              <ThemeToggle />
            </div>
            <div className="flex gap-4">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/70 transition-all hover:scale-110 hover:text-secondary"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
