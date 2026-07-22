import Image from 'next/image';
import { unstable_setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { apiGet, type BlogPost } from '@/lib/serverApi';

export const revalidate = 300; // spec §2.2.2

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  return {
    title: locale === 'fr' ? 'Blog' : 'Blog',
    description: locale === 'fr' ? 'Articles et réflexions sur le développement et le design.' : 'Articles and thoughts on development and design.',
  };
}

export default async function BlogPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations('blog');
  const data = await apiGet<{ items: BlogPost[] }>('/blog?limit=12', { lang: locale });
  const posts = data?.items ?? [];
  const [featured, ...rest] = posts;

  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen pt-28">
        <div className="mx-auto max-w-content px-6 pb-24">
          <h1 className="mb-12 font-display text-4xl font-semibold md:text-6xl">{t('title')}</h1>
          {!featured && <p className="text-muted">{t('empty')}</p>}
          {featured && (
            <Link href={`/blog/${featured.slug}`} className="group mb-12 grid gap-6 overflow-hidden rounded-2xl border border-muted/15 bg-surface md:grid-cols-2">
              {featured.coverUrl && (
                <div className="relative aspect-video md:aspect-auto">
                  <Image src={featured.coverUrl} alt="" fill sizes="50vw" className="object-cover transition-transform group-hover:scale-105" />
                </div>
              )}
              <div className="p-8">
                <h2 className="font-display text-2xl font-semibold md:text-3xl">{featured.title}</h2>
                <p className="mt-3 text-muted">{featured.excerpt}</p>
                {featured.readingTime && <p className="mt-4 font-mono text-xs text-secondary">{t('readTime', { min: featured.readingTime })}</p>}
              </div>
            </Link>
          )}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <Link key={p.id} href={`/blog/${p.slug}`} className="group overflow-hidden rounded-xl border border-muted/15 bg-surface transition-colors hover:border-primary/50">
                {p.coverUrl && (
                  <div className="relative aspect-video">
                    <Image src={p.coverUrl} alt="" fill sizes="33vw" className="object-cover transition-transform group-hover:scale-105" />
                  </div>
                )}
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold">{p.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted">{p.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
