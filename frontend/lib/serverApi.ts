/**
 * Server-side data fetching for RSC / ISR pages.
 * Uses fetch() so Next.js can cache & revalidate per the spec's ISR table (§2.2.2).
 */
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api/v1';

export async function apiGet<T>(
  path: string,
  { revalidate = 60, lang }: { revalidate?: number | false; lang?: string } = {},
): Promise<T | null> {
  const sep = path.includes('?') ? '&' : '?';
  const url = `${API_URL}${path}${lang ? `${sep}lang=${lang}` : ''}`;
  try {
    const res = await fetch(url, { next: { revalidate } });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null; // API down → pages render with graceful fallbacks
  }
}

// ---- shared API types ----
export interface ProjectImage { id: string; url: string; alt: string | null; order: number }
export interface Tag { id: string; name: string; slug: string }
export interface Project {
  id: string; slug: string; category: 'DEVELOPMENT' | 'DESIGN';
  title: string; subtitle: string | null; description: string;
  role: string | null; designProcess: string | null;
  tools: string[]; techStack: string[];
  featured: boolean; published: boolean; order: number;
  thumbnailUrl: string; liveUrl: string | null; githubUrl: string | null; behanceUrl: string | null;
  codeSnippet: string | null; images: ProjectImage[]; tags: Tag[];
  publishedAt: string | null;
}
export interface BlogPost {
  id: string; slug: string; title: string; excerpt: string; content: string;
  coverUrl: string | null; tags: Tag[]; readingTime: number | null;
  published: boolean; publishedAt: string | null;
}
export interface Skill { id: string; name: string; iconUrl: string | null; category: string; level: number; order: number }

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
  location: string | null; logoUrl: string | null; current: boolean; order: number;
}
export interface Education {
  id: string; institution: string; degree: string; period: string; description: string | null;
  logoUrl: string | null; order: number;
}
export interface Certification {
  id: string; name: string; issuer: string; date: string; url: string | null; badgeUrl: string | null; order: number;
}
