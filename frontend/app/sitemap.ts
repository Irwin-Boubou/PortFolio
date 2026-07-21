import type { MetadataRoute } from 'next';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api/v1';
const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

async function fetchSlugs(path: string, key: string): Promise<string[]> {
  try {
    const res = await fetch(`${API_URL}${path}`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data = await res.json();
    const items = (data?.[key] ?? data?.items ?? []) as { slug: string }[];
    return items.map((i) => i.slug);
  } catch {
    return [];
  }
}

/** Static + dynamic (project/blog slug) routes for both locales. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    '', '/about', '/work/development', '/work/design', '/blog', '/contact',
    '/testimonials', '/clients', '/process', '/pricing', '/faq', '/resume',
  ];

  const [devSlugs, designSlugs, blogSlugs] = await Promise.all([
    fetchSlugs('/projects?category=development&limit=100', 'items'),
    fetchSlugs('/projects?category=design&limit=100', 'items'),
    fetchSlugs('/blog?limit=100', 'items'),
  ]);

  const dynamicRoutes = [
    ...devSlugs.map((s) => `/work/dev/${s}`),
    ...designSlugs.map((s) => `/work/design-project/${s}`),
    ...blogSlugs.map((s) => `/blog/${s}`),
  ];

  return ['en', 'fr'].flatMap((l) =>
    [...staticRoutes, ...dynamicRoutes].map((r) => ({
      url: `${BASE}/${l}${r}`,
      changeFrequency: 'weekly' as const,
      priority: r === '' ? 1 : dynamicRoutes.includes(r) ? 0.6 : 0.7,
    })),
  );
}
