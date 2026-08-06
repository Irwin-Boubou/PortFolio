/**
 * Shared content types. Data now comes from the local data/*.ts files via
 * lib/content.ts (frontend-only architecture — no backend API).
 * These interfaces describe the localized shapes the components consume.
 */

// ---- shared content types ----
export interface ProjectImage { id: string; url: string; alt: string | null; order: number }
export interface Tag { id: string; name: string; slug: string }
export interface Project {
  id: string; slug: string; category: 'DEVELOPMENT' | 'DESIGN';
  subcategory: 'web-app' | 'website' | 'mobile-app' | 'pwa' | 'flyers-posters' | 'ui-ux' | 'brand-design' | null;
  title: string; subtitle: string | null; description: string;
  role: string | null; designProcess: string | null;
  challenge: string | null; solution: string | null; results: string | null;
  tools: string[]; techStack: string[]; gallery: string[];
  featured: boolean; published: boolean; order: number;
  thumbnailUrl: string; liveUrl: string | null; githubUrl: string | null; behanceUrl: string | null;
  codeSnippet: string | null; images: ProjectImage[]; tags: Tag[];
  publishedAt: string | null;
}
export interface GalleryPhoto {
  id: string; url: string; caption: string | null; order: number;
}
export interface BlogPost {
  id: string; slug: string; title: string; excerpt: string; content: string;
  coverUrl: string | null; tags: Tag[]; readingTime: number | null;
  published: boolean; publishedAt: string | null;
}
export interface Skill {
  id: string; name: string; iconUrl: string | null; category: string; level: number; order: number;
  description: string | null; brandColor: string | null; featured: boolean;
}

export interface Testimonial {
  id: string; name: string; role: string; company: string; content: string;
  avatarUrl: string | null; rating: number; featured: boolean; order: number; published: boolean;
}
export interface TrustCompany {
  id: string; name: string; logoUrl: string; websiteUrl: string; description: string | null;
  category: 'client' | 'partner' | 'worked-at'; order: number; published: boolean;
}
export interface ProcessStep {
  id: string; stepNumber: number; title: string; description: string; icon: string; order: number;
}
export interface PricingPackage {
  id: string; name: string; tagline: string; price: string; currency: string; period: string | null;
  features: string[]; highlighted: boolean; order: number; published: boolean;
  ctaLabel: string | null; ctaUrl: string | null;
}
export interface Award {
  id: string; title: string; issuer: string; category: string | null; date: string;
  badgeUrl: string | null; url: string | null; order: number; published: boolean;
}
export interface FaqItem {
  id: string; question: string; answer: string; category: string; order: number; published: boolean;
}
export interface Experience {
  id: string; company: string; role: string; period: string; description: string;
  location: string | null; logoUrl: string | null; tags: string[]; images: string[]; current: boolean; order: number;
}
export interface Value {
  id: string; icon: string; title: string; description: string; order: number; published: boolean;
}
export interface Service {
  id: string; icon: string; pillar: 'development' | 'design'; title: string; description: string;
  highlights: string[]; proof: string[]; order: number; published: boolean;
}
export interface Education {
  id: string; institution: string; degree: string; period: string; description: string | null;
  logoUrl: string | null; images: string[]; order: number;
}
export interface Certification {
  id: string; name: string; issuer: string; date: string; url: string | null; badgeUrl: string | null;
  images: string[]; order: number;
}
