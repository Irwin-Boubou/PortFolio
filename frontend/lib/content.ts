/**
 * Frontend-only content layer. Replaces the old Express/Prisma API.
 * Reads the bilingual data/*.ts files and localizes them into the flat shapes
 * the components consume (same interfaces the API used to return).
 */
import type {
  Project, Tag, BlogPost, Skill, Testimonial, TrustCompany, ProcessStep,
  PricingPackage, Award, FaqItem, Experience, Education, Certification, Value, GalleryPhoto,
} from '@/lib/serverApi';
import type {
  RawProject, RawTag, RawBlogPost, RawSkill, RawTestimonial, RawTrustCompany, RawProcessStep,
  RawPricingPackage, RawAward, RawFaqItem, RawExperience, RawEducation, RawCertification,
  RawValue, RawGalleryPhoto, LocaleMap, LocaleListMap,
} from '@/types/content';

import { projects as rawProjects } from '@/data/projects';
import { blogPosts as rawBlog } from '@/data/blog';
import { skills as rawSkills } from '@/data/skills';
import { testimonials as rawTestimonials } from '@/data/testimonials';
import { trustCompanies as rawTrust } from '@/data/trust-companies';
import { processSteps as rawProcess } from '@/data/process';
import { pricingPackages as rawPricing } from '@/data/pricing';
import { awards as rawAwards } from '@/data/awards';
import { faqItems as rawFaq } from '@/data/faq';
import { experience as rawExperience } from '@/data/experience';
import { education as rawEducation } from '@/data/education';
import { certifications as rawCertifications } from '@/data/certifications';
import { values as rawValues } from '@/data/values';
import { galleryPhotos as rawGallery } from '@/data/gallery';
import { siteContent as rawSiteContent } from '@/data/site-content';

export type Locale = 'en' | 'fr';

const pick = (v: LocaleMap, l: Locale): string | null => (v ? v[l] ?? v.en ?? v.fr ?? null : null);
const pickList = (v: LocaleListMap, l: Locale): string[] => (v ? v[l] ?? v.en ?? v.fr ?? [] : []);
/** Localize any site-content value (string / array / boolean / object shaped { en, fr }). */
const pickAny = (v: unknown, l: Locale): unknown => {
  if (v && typeof v === 'object' && !Array.isArray(v) && ('en' in v || 'fr' in v)) {
    const m = v as Record<string, unknown>;
    return m[l] ?? m.en ?? m.fr ?? null;
  }
  return v;
};

const tag = (t: RawTag, l: Locale): Tag => ({ id: t.id, slug: t.slug, name: pick(t.name, l) ?? t.slug });

// ---------------- Site content ----------------
export function getSiteContent(locale: Locale, keys?: string[]): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  const entries = keys
    ? keys.map((k) => [k, (rawSiteContent as Record<string, unknown>)[k]] as const)
    : Object.entries(rawSiteContent as Record<string, unknown>);
  for (const [k, v] of entries) if (v !== undefined) out[k] = pickAny(v, locale);
  return out;
}
export const getSiteValue = (key: string, locale: Locale): unknown =>
  pickAny((rawSiteContent as Record<string, unknown>)[key], locale);

// ---------------- Projects ----------------
function localizeProject(p: RawProject, l: Locale): Project {
  return {
    id: p.id, slug: p.slug, category: p.category,
    title: pick(p.title, l) ?? '', subtitle: pick(p.subtitle, l), description: pick(p.description, l) ?? '',
    role: pick(p.role, l), designProcess: pick(p.designProcess, l),
    challenge: pick(p.challenge, l), solution: pick(p.solution, l), results: pick(p.results, l),
    tools: p.tools ?? [], techStack: p.techStack ?? [], gallery: p.gallery ?? [],
    featured: p.featured, published: p.published, order: p.order,
    thumbnailUrl: p.thumbnailUrl, liveUrl: p.liveUrl, githubUrl: p.githubUrl, behanceUrl: p.behanceUrl,
    codeSnippet: p.codeSnippet,
    images: (p.images ?? []).map((img) => ({ id: img.id, url: img.url, alt: pick(img.alt, l), order: img.order })),
    tags: (p.tags ?? []).map((t) => tag(t, l)),
    publishedAt: p.publishedAt,
  };
}

export function getProjects(
  locale: Locale,
  opts: { category?: 'DEVELOPMENT' | 'DESIGN'; featured?: boolean; limit?: number; exclude?: string; tags?: string[] } = {},
): Project[] {
  let list = (rawProjects as RawProject[]).filter((p) => p.published);
  if (opts.category) list = list.filter((p) => p.category === opts.category);
  if (opts.featured !== undefined) list = list.filter((p) => p.featured === opts.featured);
  if (opts.exclude) list = list.filter((p) => p.id !== opts.exclude);
  if (opts.tags?.length) list = list.filter((p) => p.tags.some((t) => opts.tags!.includes(t.slug)));
  list = list.slice().sort((a, b) => Number(b.featured) - Number(a.featured) || a.order - b.order);
  if (opts.limit) list = list.slice(0, opts.limit);
  return list.map((p) => localizeProject(p, locale));
}

export function getProjectBySlug(slug: string, locale: Locale): Project | null {
  const p = (rawProjects as RawProject[]).find((x) => x.slug === slug && x.published);
  return p ? localizeProject(p, locale) : null;
}

export const getAllProjectSlugs = (): { slug: string; category: 'DEVELOPMENT' | 'DESIGN' }[] =>
  (rawProjects as RawProject[]).filter((p) => p.published).map((p) => ({ slug: p.slug, category: p.category }));

/** Unique tags appearing across a set of (already-localized) projects. */
export function tagsFromProjects(projects: Project[]): Tag[] {
  const seen = new Map<string, Tag>();
  for (const p of projects) for (const t of p.tags) if (!seen.has(t.slug)) seen.set(t.slug, t);
  return [...seen.values()];
}

// ---------------- Blog ----------------
function localizeBlog(p: RawBlogPost, l: Locale): BlogPost {
  return {
    id: p.id, slug: p.slug, title: pick(p.title, l) ?? '', excerpt: pick(p.excerpt, l) ?? '',
    content: pick(p.content, l) ?? '', coverUrl: p.coverUrl, tags: (p.tags ?? []).map((t) => tag(t, l)),
    readingTime: p.readingTime, published: p.published, publishedAt: p.publishedAt,
  };
}
export const getBlogPosts = (locale: Locale): BlogPost[] =>
  (rawBlog as RawBlogPost[]).filter((p) => p.published).map((p) => localizeBlog(p, locale));
export function getBlogPostBySlug(slug: string, locale: Locale): BlogPost | null {
  const p = (rawBlog as RawBlogPost[]).find((x) => x.slug === slug && x.published);
  return p ? localizeBlog(p, locale) : null;
}
export const getAllBlogSlugs = (): string[] => (rawBlog as RawBlogPost[]).filter((p) => p.published).map((p) => p.slug);

// ---------------- Skills ----------------
export function getSkills(locale: Locale): { skills: Skill[]; grouped: Record<string, Skill[]> } {
  const skills = (rawSkills as RawSkill[]).map((s) => ({
    id: s.id, name: s.name, iconUrl: s.iconUrl, category: s.category, level: s.level, order: s.order,
    description: pick(s.description, locale), brandColor: s.brandColor, featured: s.featured,
  }));
  const grouped = skills.reduce((acc: Record<string, Skill[]>, s) => {
    (acc[s.category] ??= []).push(s);
    return acc;
  }, {});
  return { skills, grouped };
}

// ---------------- Testimonials ----------------
export function getTestimonials(locale: Locale, opts: { featured?: boolean } = {}): Testimonial[] {
  let list = (rawTestimonials as RawTestimonial[]).filter((t) => t.published);
  if (opts.featured !== undefined) list = list.filter((t) => t.featured === opts.featured);
  return list.map((t) => ({
    id: t.id, name: pick(t.name, locale) ?? '', role: pick(t.role, locale) ?? '', company: t.company,
    content: pick(t.content, locale) ?? '', avatarUrl: t.avatarUrl, rating: t.rating,
    featured: t.featured, order: t.order, published: t.published,
  }));
}

// ---------------- Trust companies ----------------
export function getTrustCompanies(locale: Locale, opts: { category?: string } = {}): TrustCompany[] {
  let list = (rawTrust as RawTrustCompany[]).filter((c) => c.published);
  if (opts.category) list = list.filter((c) => c.category === opts.category);
  return list.map((c) => ({
    id: c.id, name: c.name, logoUrl: c.logoUrl, websiteUrl: c.websiteUrl,
    description: pick(c.description, locale), category: c.category, order: c.order, published: c.published,
  }));
}

// ---------------- Process ----------------
export const getProcessSteps = (locale: Locale): ProcessStep[] =>
  (rawProcess as RawProcessStep[]).map((s) => ({
    id: s.id, stepNumber: s.stepNumber, title: pick(s.title, locale) ?? '',
    description: pick(s.description, locale) ?? '', icon: s.icon, order: s.order,
  }));

// ---------------- Pricing ----------------
export const getPricing = (locale: Locale): PricingPackage[] =>
  (rawPricing as RawPricingPackage[]).filter((p) => p.published).map((p) => ({
    id: p.id, name: pick(p.name, locale) ?? '', tagline: pick(p.tagline, locale) ?? '', price: p.price,
    currency: p.currency, period: p.period, features: pickList(p.features, locale),
    highlighted: p.highlighted, order: p.order, published: p.published,
    ctaLabel: pick(p.ctaLabel, locale), ctaUrl: p.ctaUrl,
  }));

// ---------------- Awards ----------------
export const getAwards = (locale: Locale): Award[] =>
  (rawAwards as RawAward[]).filter((a) => a.published).map((a) => ({
    id: a.id, title: pick(a.title, locale) ?? '', issuer: pick(a.issuer, locale) ?? '',
    category: pick(a.category, locale), date: a.date, badgeUrl: a.badgeUrl, url: a.url,
    order: a.order, published: a.published,
  }));

// ---------------- FAQ ----------------
export function getFaq(locale: Locale, opts: { category?: string } = {}): FaqItem[] {
  let list = (rawFaq as RawFaqItem[]).filter((f) => f.published);
  if (opts.category) list = list.filter((f) => f.category === opts.category);
  return list.map((f) => ({
    id: f.id, question: pick(f.question, locale) ?? '', answer: pick(f.answer, locale) ?? '',
    category: f.category, order: f.order, published: f.published,
  }));
}

// ---------------- Resume ----------------
export const getExperience = (locale: Locale): Experience[] =>
  (rawExperience as RawExperience[]).map((e) => ({
    id: e.id, company: pick(e.company, locale) ?? '', role: pick(e.role, locale) ?? '', period: e.period,
    description: pick(e.description, locale) ?? '', location: pick(e.location, locale),
    logoUrl: e.logoUrl, tags: e.tags ?? [], images: e.images ?? [], current: e.current, order: e.order,
  }));
export const getEducation = (locale: Locale): Education[] =>
  (rawEducation as RawEducation[]).map((e) => ({
    id: e.id, institution: pick(e.institution, locale) ?? '', degree: pick(e.degree, locale) ?? '',
    period: e.period, description: pick(e.description, locale), logoUrl: e.logoUrl, images: e.images ?? [], order: e.order,
  }));
export const getCertifications = (locale: Locale): Certification[] =>
  (rawCertifications as RawCertification[]).map((c) => ({
    id: c.id, name: pick(c.name, locale) ?? '', issuer: c.issuer, date: c.date, url: c.url,
    badgeUrl: c.badgeUrl, images: c.images ?? [], order: c.order,
  }));

// ---------------- Values ----------------
export const getValues = (locale: Locale): Value[] =>
  (rawValues as RawValue[]).filter((v) => v.published).map((v) => ({
    id: v.id, icon: v.icon, title: pick(v.title, locale) ?? '', description: pick(v.description, locale) ?? '',
    order: v.order, published: v.published,
  }));

// ---------------- Gallery ----------------
export const getGallery = (locale: Locale): GalleryPhoto[] =>
  (rawGallery as RawGalleryPhoto[]).map((g) => ({ id: g.id, url: g.url, caption: pick(g.caption, locale), order: g.order }));
