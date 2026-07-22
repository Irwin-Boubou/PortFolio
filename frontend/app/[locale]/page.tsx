import { unstable_setRequestLocale } from 'next-intl/server';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MarqueeStrip } from '@/components/layout/MarqueeStrip';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Services } from '@/components/sections/Services';
import { FeaturedWork } from '@/components/sections/FeaturedWork';
import { Skills } from '@/components/sections/Skills';
import { TrustSection } from '@/components/sections/TrustSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { PricingSection } from '@/components/sections/PricingSection';
import { AwardsSection } from '@/components/sections/AwardsSection';
import { FaqSection } from '@/components/sections/FaqSection';
import { ContactCTA } from '@/components/sections/ContactCTA';
import { PersonJsonLd } from '@/components/seo/PersonJsonLd';
import {
  apiGet, type Project, type Skill, type Testimonial, type TrustCompany,
  type ProcessStep, type PricingPackage, type Award, type FaqItem,
} from '@/lib/serverApi';

// ISR: homepage revalidates every 60s (spec §2.2.2)
export const revalidate = 60;

// Admin-first rule: every heading/subtitle/CTA label below is an optional site-content
// override, editable from /admin/site-content with no deploy, components fall back to
// their static i18n translation if a key hasn't been set.
const SITE_CONTENT_KEYS = [
  'hero.name', 'hero.taglines', 'hero.location', 'hero.timezone', 'hero.photoUrl', 'hero.ctaLabel',
  'availability.status', 'availability.label',
  'about.bio', 'about.stats', 'about.photoUrl', 'about.sectionTitle',
  'booking.url', 'booking.label', 'booking.enabled',
  'marquee.text',
  'services.title',
  'work.featuredTitle',
  'skills.title', 'skills.subtitle',
  'clients.title', 'clients.subtitle',
  'testimonials.title', 'testimonials.subtitle',
  'process.title', 'process.subtitle',
  'pricing.title', 'pricing.subtitle',
  'awards.title', 'awards.subtitle',
  'faq.title', 'faq.subtitle',
  'contactCta.title', 'contactCta.subtitle', 'contactCta.primary', 'contactCta.secondary',
].join(',');

export default async function HomePage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);

  // fetch homepage data server-side, localized by the API
  const [content, featured, skillsRes, testimonialsRes, trustRes, processRes, pricingRes, awardsRes, faqRes] =
    await Promise.all([
      apiGet<{ content: Record<string, unknown> }>(`/site-content?keys=${SITE_CONTENT_KEYS}`, { lang: locale }),
      apiGet<{ items: Project[] }>('/projects?featured=true&limit=6', { lang: locale }),
      apiGet<{ skills: Skill[] }>('/skills'),
      apiGet<{ testimonials: Testimonial[] }>('/testimonials?featured=true', { lang: locale }),
      apiGet<{ companies: TrustCompany[] }>('/trust-companies', { lang: locale }),
      apiGet<{ steps: ProcessStep[] }>('/process-steps', { lang: locale }),
      apiGet<{ packages: PricingPackage[] }>('/pricing', { lang: locale }),
      apiGet<{ awards: Award[] }>('/awards', { lang: locale }),
      apiGet<{ faqs: FaqItem[] }>('/faq', { lang: locale }),
    ]);

  const c = content?.content ?? {};
  const str = (key: string) => c[key] as string | undefined;

  const name = str('hero.name') ?? 'Your Name';
  const taglines = (c['hero.taglines'] as string[]) ?? ['Engineer × Designer'];
  const bio = str('about.bio') ?? '';
  const stats = (c['about.stats'] as { label: string; value: number }[]) ?? [];
  const location = str('hero.location');
  const timezone = str('hero.timezone');
  const availabilityStatus = c['availability.status'] as 'available' | 'busy' | 'open' | undefined;
  const availabilityLabel = str('availability.label');
  const bookingUrl = str('booking.url');
  const bookingLabel = str('booking.label');
  const bookingEnabled = Boolean(c['booking.enabled']);
  const marqueeText = str('marquee.text');
  const photoUrl = str('hero.photoUrl') ?? str('about.photoUrl');
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

  return (
    <>
      <PersonJsonLd name={name} url={`${siteUrl}/${locale}`} />
      <Navbar />
      <main id="main">
        <Hero
          name={name}
          taglines={taglines}
          location={location}
          timezone={timezone}
          availabilityStatus={availabilityStatus}
          availabilityLabel={availabilityLabel}
          bookingUrl={bookingUrl}
          bookingLabel={bookingLabel}
          bookingEnabled={bookingEnabled}
          photoUrl={photoUrl}
          ctaLabel={str('hero.ctaLabel')}
        />
        <TrustSection companies={trustRes?.companies ?? []} title={str('clients.title')} subtitle={str('clients.subtitle')} />
        <About bio={bio} stats={stats} title={str('about.sectionTitle')} />
        <Services title={str('services.title')} />
        <FeaturedWork projects={featured?.items ?? []} title={str('work.featuredTitle')} />
        <Skills skills={skillsRes?.skills ?? []} title={str('skills.title')} subtitle={str('skills.subtitle')} />
        <TestimonialsSection
          testimonials={testimonialsRes?.testimonials ?? []}
          title={str('testimonials.title')}
          subtitle={str('testimonials.subtitle')}
        />
        <ProcessSection steps={processRes?.steps ?? []} title={str('process.title')} subtitle={str('process.subtitle')} />
        <PricingSection packages={pricingRes?.packages ?? []} title={str('pricing.title')} subtitle={str('pricing.subtitle')} />
        <AwardsSection
          awards={awardsRes?.awards ?? []}
          locale={locale}
          title={str('awards.title')}
          subtitle={str('awards.subtitle')}
        />
        <FaqSection faqs={faqRes?.faqs ?? []} showAll={false} title={str('faq.title')} subtitle={str('faq.subtitle')} />
        <ContactCTA
          title={str('contactCta.title')}
          subtitle={str('contactCta.subtitle')}
          primary={str('contactCta.primary')}
          secondary={str('contactCta.secondary')}
        />
      </main>
      {marqueeText && <MarqueeStrip text={marqueeText} />}
      <Footer />
    </>
  );
}
