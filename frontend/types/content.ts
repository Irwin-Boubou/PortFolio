// Raw bilingual shapes as stored in the data/*.ts files (the former database rows).
// The lib/content.ts getters localize these into the flat shapes components consume.

export type LocaleMap = { en?: string; fr?: string } | null;
export type LocaleListMap = { en?: string[]; fr?: string[] } | null;

export interface RawTag { id: string; name: LocaleMap; slug: string }
export interface RawProjectImage { id: string; url: string; alt: LocaleMap; order: number }

export interface RawProject {
  id: string; slug: string; category: 'DEVELOPMENT' | 'DESIGN';
  title: LocaleMap; subtitle: LocaleMap; description: LocaleMap;
  role: LocaleMap; designProcess: LocaleMap;
  challenge: LocaleMap; solution: LocaleMap; results: LocaleMap;
  tools: string[]; techStack: string[]; gallery?: string[];
  featured: boolean; published: boolean; order: number;
  thumbnailUrl: string; liveUrl: string | null; githubUrl: string | null; behanceUrl: string | null;
  codeSnippet: string | null; images: RawProjectImage[]; tags: RawTag[];
  publishedAt: string | null;
}

export interface RawBlogPost {
  id: string; slug: string; title: LocaleMap; excerpt: LocaleMap; content: LocaleMap;
  coverUrl: string | null; tags: RawTag[]; readingTime: number | null;
  published: boolean; publishedAt: string | null;
}

export interface RawSkill {
  id: string; name: string; iconUrl: string | null; category: string; level: number; order: number;
  description: LocaleMap; brandColor: string | null; featured: boolean;
}

export interface RawTestimonial {
  id: string; name: LocaleMap; role: LocaleMap; company: string; content: LocaleMap;
  avatarUrl: string | null; rating: number; featured: boolean; order: number; published: boolean;
}

export interface RawTrustCompany {
  id: string; name: string; logoUrl: string; websiteUrl: string; description: LocaleMap;
  category: 'client' | 'partner' | 'worked-at'; order: number; published: boolean;
}

export interface RawProcessStep {
  id: string; stepNumber: number; title: LocaleMap; description: LocaleMap; icon: string; order: number;
}

export interface RawPricingPackage {
  id: string; name: LocaleMap; tagline: LocaleMap; price: string; currency: string; period: string | null;
  features: LocaleListMap; highlighted: boolean; order: number; published: boolean;
  ctaLabel: LocaleMap; ctaUrl: string | null;
}

export interface RawAward {
  id: string; title: LocaleMap; issuer: LocaleMap; category: LocaleMap; date: string;
  badgeUrl: string | null; url: string | null; order: number; published: boolean;
}

export interface RawFaqItem {
  id: string; question: LocaleMap; answer: LocaleMap; category: string; order: number; published: boolean;
}

export interface RawExperience {
  id: string; company: LocaleMap; role: LocaleMap; period: string; description: LocaleMap;
  location: LocaleMap; logoUrl: string | null; tags?: string[]; images?: string[]; current: boolean; order: number;
}

export interface RawEducation {
  id: string; institution: LocaleMap; degree: LocaleMap; period: string; description: LocaleMap;
  logoUrl: string | null; images?: string[]; order: number;
}

export interface RawCertification {
  id: string; name: LocaleMap; issuer: string; date: string; url: string | null; badgeUrl: string | null;
  images?: string[]; order: number;
}

export interface RawValue {
  id: string; icon: string; title: LocaleMap; description: LocaleMap; order: number; published: boolean;
}

export interface RawGalleryPhoto { id: string; url: string; caption: LocaleMap; order: number }
