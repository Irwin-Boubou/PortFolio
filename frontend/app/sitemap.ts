import type { MetadataRoute } from 'next';
import { getAllProjectSlugs, getAllBlogSlugs } from '@/lib/content';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

/** Static + dynamic (project/blog slug) routes for both locales, from the local data files. */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '', '/about', '/work', '/work/development', '/work/design', '/blog', '/contact',
    '/skills', '/testimonials', '/clients', '/process', '/pricing', '/faq', '/resume', '/tools',
  ];

  const slugs = getAllProjectSlugs();
  const dynamicRoutes = [
    ...slugs.filter((p) => p.category === 'DEVELOPMENT').map((p) => `/work/dev/${p.slug}`),
    ...slugs.filter((p) => p.category === 'DESIGN').map((p) => `/work/design-project/${p.slug}`),
    ...getAllBlogSlugs().map((s) => `/blog/${s}`),
  ];

  return ['en', 'fr'].flatMap((l) =>
    [...staticRoutes, ...dynamicRoutes].map((r) => ({
      url: `${BASE}/${l}${r}`,
      changeFrequency: 'weekly' as const,
      priority: r === '' ? 1 : dynamicRoutes.includes(r) ? 0.6 : 0.7,
    })),
  );
}
