import { z } from 'zod';

/** A bilingual text field: EN required, FR optional (falls back to EN). */
export const localeText = z.object({ en: z.string().min(1), fr: z.string().optional() });
export const localeTextOptional = localeText.partial({ en: true }).optional().nullable();
/** Locale map whose values can be anything (tag lists, stat arrays…). */
export const localeAny = z.object({ en: z.unknown(), fr: z.unknown().optional() });

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const projectSchema = z.object({
  slug: z.string().min(1).optional(),
  category: z.enum(['DEVELOPMENT', 'DESIGN']),
  title: localeText,
  subtitle: localeText.optional().nullable(),
  description: localeText,
  role: localeText.optional().nullable(),
  designProcess: localeText.optional().nullable(),
  tools: z.array(z.string()).default([]),
  techStack: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  published: z.boolean().default(false),
  order: z.number().int().default(0),
  thumbnailUrl: z.string().url(),
  liveUrl: z.string().url().optional().nullable(),
  githubUrl: z.string().url().optional().nullable(),
  behanceUrl: z.string().url().optional().nullable(),
  codeSnippet: z.string().optional().nullable(),
  images: z
    .array(z.object({ url: z.string().url(), alt: localeText.optional().nullable(), order: z.number().int().default(0) }))
    .default([]),
  tagSlugs: z.array(z.string()).default([]),
});
export const projectUpdateSchema = projectSchema.partial();

export const blogSchema = z.object({
  slug: z.string().min(1).optional(),
  title: localeText,
  excerpt: localeText,
  content: localeText,
  coverUrl: z.string().url().optional().nullable(),
  readingTime: z.number().int().positive().optional().nullable(),
  published: z.boolean().default(false),
  tagSlugs: z.array(z.string()).default([]),
});
export const blogUpdateSchema = blogSchema.partial();

export const skillSchema = z.object({
  name: z.string().min(1),
  iconUrl: z.string().url().optional().nullable(),
  category: z.enum(['frontend', 'backend', 'design', 'tools', 'ai']),
  level: z.number().int().min(0).max(100).default(80),
  order: z.number().int().default(0),
  description: localeTextOptional,
  brandColor: z.string().optional().nullable(),
  featured: z.boolean().default(false),
});

export const siteContentSchema = z.object({
  value: localeAny,
  type: z.enum(['TEXT', 'MARKDOWN', 'JSON', 'URL']).optional(),
});

export const contactSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email(),
  subject: z.string().max(200).optional(),
  message: z.string().min(10).max(5000),
  locale: z.enum(['en', 'fr']).default('en'),
});

export const tagSchema = z.object({
  name: localeText,
  slug: z.string().min(1).optional(),
});

export const testimonialSchema = z.object({
  name: localeText,
  role: localeText,
  company: z.string().min(1),
  content: localeText,
  avatarUrl: z.string().url().optional().nullable(),
  rating: z.number().int().min(1).max(5).default(5),
  featured: z.boolean().default(false),
  order: z.number().int().default(0),
  published: z.boolean().default(false),
});
export const testimonialUpdateSchema = testimonialSchema.partial();

export const trustCompanySchema = z.object({
  name: z.string().min(1),
  logoUrl: z.string().url(),
  websiteUrl: z.string().url(),
  description: localeTextOptional,
  category: z.enum(['client', 'partner', 'worked-at']).default('client'),
  order: z.number().int().default(0),
  published: z.boolean().default(false),
});
export const trustCompanyUpdateSchema = trustCompanySchema.partial();

export const processStepSchema = z.object({
  stepNumber: z.number().int(),
  title: localeText,
  description: localeText,
  icon: z.string().min(1),
  order: z.number().int().default(0),
});
export const processStepUpdateSchema = processStepSchema.partial();

export const pricingPackageSchema = z.object({
  name: localeText,
  tagline: localeText,
  price: z.string().min(1),
  currency: z.string().default('USD'),
  period: z.string().optional().nullable(),
  features: z.object({ en: z.array(z.string()), fr: z.array(z.string()).optional() }),
  highlighted: z.boolean().default(false),
  order: z.number().int().default(0),
  published: z.boolean().default(false),
  ctaLabel: localeTextOptional,
  ctaUrl: z.string().url().optional().nullable(),
});
export const pricingPackageUpdateSchema = pricingPackageSchema.partial();

export const awardSchema = z.object({
  title: localeText,
  issuer: localeText,
  category: localeTextOptional,
  date: z.coerce.date(),
  badgeUrl: z.string().url().optional().nullable(),
  url: z.string().url().optional().nullable(),
  order: z.number().int().default(0),
  published: z.boolean().default(false),
});
export const awardUpdateSchema = awardSchema.partial();

export const faqItemSchema = z.object({
  question: localeText,
  answer: localeText,
  category: z.string().default('general'),
  order: z.number().int().default(0),
  published: z.boolean().default(false),
});
export const faqItemUpdateSchema = faqItemSchema.partial();

export const experienceSchema = z.object({
  company: localeText,
  role: localeText,
  period: z.string().min(1),
  description: localeText,
  location: localeTextOptional,
  logoUrl: z.string().url().optional().nullable(),
  tags: z.array(z.string()).default([]),
  current: z.boolean().default(false),
  order: z.number().int().default(0),
});
export const experienceUpdateSchema = experienceSchema.partial();

export const educationSchema = z.object({
  institution: localeText,
  degree: localeText,
  period: z.string().min(1),
  description: localeTextOptional,
  logoUrl: z.string().url().optional().nullable(),
  order: z.number().int().default(0),
});
export const educationUpdateSchema = educationSchema.partial();

export const valueSchema = z.object({
  icon: z.string().min(1),
  title: localeText,
  description: localeText,
  order: z.number().int().default(0),
  published: z.boolean().default(true),
});
export const valueUpdateSchema = valueSchema.partial();

export const certificationSchema = z.object({
  name: localeText,
  issuer: z.string().min(1),
  date: z.coerce.date(),
  url: z.string().url().optional().nullable(),
  badgeUrl: z.string().url().optional().nullable(),
  order: z.number().int().default(0),
});
export const certificationUpdateSchema = certificationSchema.partial();
