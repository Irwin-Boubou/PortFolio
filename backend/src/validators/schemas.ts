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
  category: z.enum(['frontend', 'backend', 'design', 'tools']),
  level: z.number().int().min(0).max(100).default(80),
  order: z.number().int().default(0),
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
