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

const SITE_CONTENT_KEYS = [
  'hero.name', 'hero.taglines', 'hero.location', 'hero.timezone',
  'availability.status', 'availability.label',
  'about.bio', 'about.stats',
  'booking.url', 'booking.label', 'booking.enabled',
  'marquee.text',
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
  const name = (c['hero.name'] as string) ?? 'Your Name';
  const taglines = (c['hero.taglines'] as string[]) ?? ['Engineer × Designer'];
  const bio = (c['about.bio'] as string) ?? '';
  const stats = (c['about.stats'] as { label: string; value: number }[]) ?? [];
  const location = c['hero.location'] as string | undefined;
  const timezone = c['hero.timezone'] as string | undefined;
  const availabilityStatus = c['availability.status'] as 'available' | 'busy' | 'open' | undefined;
  const availabilityLabel = c['availability.label'] as string | undefined;
  const bookingUrl = c['booking.url'] as string | undefined;
  const bookingLabel = c['booking.label'] as string | undefined;
  const bookingEnabled = Boolean(c['booking.enabled']);
  const marqueeText = c['marquee.text'] as string | undefined;
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
        />
        <TrustSection companies={trustRes?.companies ?? []} />
        <About bio={bio} stats={stats} />
        <Services />
        <FeaturedWork projects={featured?.items ?? []} />
        <Skills skills={skillsRes?.skills ?? []} />
        <TestimonialsSection testimonials={testimonialsRes?.testimonials ?? []} />
        <ProcessSection steps={processRes?.steps ?? []} />
        <PricingSection packages={pricingRes?.packages ?? []} />
        <AwardsSection awards={awardsRes?.awards ?? []} locale={locale} />
        <FaqSection faqs={faqRes?.faqs ?? []} showAll={false} />
        <ContactCTA />
      </main>
      {marqueeText && <MarqueeStrip text={marqueeText} />}
      <Footer />
    </>
  );
}
