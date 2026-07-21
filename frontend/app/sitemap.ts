import type { MetadataRoute } from 'next';

/** Static routes for both locales; project/blog slugs are added by ISR crawling. */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const routes = ['', '/work/development', '/work/design', '/blog', '/contact'];
  return ['en', 'fr'].flatMap((l) =>
    routes.map((r) => ({ url: `${base}/${l}${r}`, changeFrequency: 'weekly' as const, priority: r === '' ? 1 : 0.7 })),
  );
}
