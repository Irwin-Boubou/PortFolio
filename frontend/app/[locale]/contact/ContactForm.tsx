'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLocale, useTranslations } from 'next-intl';
import toast from 'react-hot-toast';
import { FiGithub, FiInstagram, FiLinkedin } from 'react-icons/fi';
import { FaBehance, FaDribbble, FaWhatsapp, FaFacebook } from 'react-icons/fa';
import { Button } from '@/components/ui/Button';
import { ParallaxPhotoCard } from '@/components/ui/ParallaxPhotoCard';
import { api } from '@/lib/api';

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string().optional(),
  message: z.string().min(10),
});
type FormData = z.infer<typeof schema>;

const inputCls =
  'w-full rounded-xl border border-muted/25 bg-surface px-4 py-3 text-body placeholder:text-muted/60 focus:border-primary focus:outline-none transition-colors';

interface ContactFormProps {
  photoUrl?: string;
  name?: string;
}

export function ContactForm({ photoUrl, name }: ContactFormProps) {
  const t = useTranslations('contact');
  const locale = useLocale();
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await api.post('/contact', { ...data, locale });
      toast.success(t('success'));
      setSent(true);
      reset();
    } catch {
      toast.error(t('error'));
    }
  };

  const socials = [
    { icon: FaWhatsapp, label: 'WhatsApp', href: 'https://wa.me/' },
    { icon: FiInstagram, label: 'Instagram', href: 'https://instagram.com' },
    { icon: FaFacebook, label: 'Facebook', href: 'https://facebook.com' },
    { icon: FiLinkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
    { icon: FiGithub, label: 'GitHub', href: 'https://github.com' },
    { icon: FaDribbble, label: 'Dribbble', href: 'https://dribbble.com' },
    { icon: FaBehance, label: 'Behance', href: 'https://behance.net' },
  ];

  return (
    <div className="mx-auto grid max-w-content gap-14 px-6 pb-24 md:grid-cols-2">
      <div>
        <h1 className="mb-8 font-display text-4xl font-semibold md:text-6xl">{t('title')}</h1>
        {sent ? (
          <div className="rounded-2xl border border-success/40 bg-success/10 p-8 text-center">
            <p className="text-3xl">✨</p>
            <p className="mt-3 font-display text-lg text-success">{t('success')}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm text-muted">{t('name')} *</label>
              <input id="name" {...register('name')} className={inputCls} aria-invalid={!!errors.name} />
              {errors.name && <p className="mt-1 text-xs text-error" role="alert">{errors.name.message}</p>}
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm text-muted">{t('email')} *</label>
              <input id="email" type="email" {...register('email')} className={inputCls} aria-invalid={!!errors.email} />
              {errors.email && <p className="mt-1 text-xs text-error" role="alert">{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="subject" className="mb-1.5 block text-sm text-muted">{t('subject')}</label>
              <input id="subject" {...register('subject')} className={inputCls} />
            </div>
            <div>
              <label htmlFor="message" className="mb-1.5 block text-sm text-muted">{t('message')} *</label>
              <textarea id="message" rows={6} {...register('message')} className={inputCls} aria-invalid={!!errors.message} />
              {errors.message && <p className="mt-1 text-xs text-error" role="alert">{errors.message.message}</p>}
            </div>
            <Button type="submit" disabled={isSubmitting}>{isSubmitting ? t('sending') : t('send')}</Button>
          </form>
        )}
      </div>
      <aside className="md:pt-24">
        {photoUrl && (
          <div className="mb-8 hidden sm:block">
            <ParallaxPhotoCard src={photoUrl} alt={name || 'Portrait'} size="sm" />
          </div>
        )}
        <h2 className="mb-6 font-display text-xl font-semibold">{t('direct')}</h2>
        <ul className="grid grid-cols-2 gap-3">
          {socials.map(({ icon: Icon, label, href }) => (
            <li key={label}>
              <a href={href} target="_blank" rel="noreferrer"
                 className="flex items-center gap-3 rounded-xl border border-muted/15 bg-surface px-4 py-3 transition-all hover:scale-[1.03] hover:border-secondary hover:text-secondary">
                <Icon /> <span className="text-sm">{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
