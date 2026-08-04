'use client';
import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Section } from '@/components/layout/Section';
import { Link } from '@/navigation';
import { BrandIcon, type BrandIconName } from '@/components/ui/BrandIcon';
import type { Service } from '@/lib/serverApi';

/** Services grid with a CSS 3D tilt micro-interaction (spec §7.1.3). */
function TiltCard({ icon, title, desc }: { icon: BrandIconName; title: string; desc: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const rx = ((e.clientY - r.top) / r.height - 0.5) * -8;
    const ry = ((e.clientX - r.left) / r.width - 0.5) * 8;
    el.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = ''; };
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="rounded-2xl border border-muted/15 bg-surface p-8 transition-transform duration-200 will-change-transform"
    >
      <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/15">
        <BrandIcon name={icon} size={26} />
      </div>
      <h3 className="mt-5 font-display text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{desc}</p>
    </div>
  );
}

export function Services({ services, title }: { services: Service[]; title?: string }) {
  const t = useTranslations('services');
  if (services.length === 0) return null;
  return (
    <Section>
      <h2 className="mb-10 font-display text-4xl font-semibold md:text-5xl">{title || t('title')}</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {services.map((s) => (
          <TiltCard key={s.id} icon={s.icon as BrandIconName} title={s.title} desc={s.description} />
        ))}
      </div>
      <div className="mt-8">
        <Link href="/services" className="text-sm font-medium text-secondary underline-offset-4 hover:underline">
          {t('viewAll')} →
        </Link>
      </div>
    </Section>
  );
}
