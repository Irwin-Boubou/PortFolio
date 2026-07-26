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
  getSiteContent, getProjects, getSkills, getTestimonials, getTrustCompanies,
  getProcessSteps, getPricing, getAwards, getFaq, type Locale,
} from '@/lib/content';

export const revalidate = false;

// Section headings/subtitles/CTA labels are optional site-content overrides
// (editable in data/site-content.ts); components fall back to their i18n translation.
export default async function HomePage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const l = locale as Locale;

  const featured = { items: getProjects(l, { featured: true, limit: 6 }) };
  const skillsRes = getSkills(l);
  const testimonialsRes = { testimonials: getTestimonials(l, { featured: true }) };
  const trustRes = { companies: getTrustCompanies(l) };
  const processRes = { steps: getProcessSteps(l) };
  const pricingRes = { packages: getPricing(l) };
  const awardsRes = { awards: getAwards(l) };
  const faqRes = { faqs: getFaq(l) };

  const c = getSiteContent(l);
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
        <Skills skills={skillsRes?.skills ?? []} title={str('skills.title')} subtitle={str('skills.subtitle')} moreHref="/skills" />
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
