import { notFound } from 'next/navigation';
import Image from 'next/image';
import { unstable_setRequestLocale } from 'next-intl/server';
import ReactMarkdown from 'react-markdown';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { getBlogPostBySlug, getAllBlogSlugs, type Locale } from '@/lib/content';
import { locales } from '@/i18n';

export const revalidate = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => getAllBlogSlugs().map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: { params: { locale: string; slug: string } }) {
  unstable_setRequestLocale(params.locale);
  const post = getBlogPostBySlug(params.slug, params.locale as Locale);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverUrl ? [post.coverUrl] : undefined,
      type: 'article',
    },
  };
}

export default async function BlogPostPage({ params }: { params: { locale: string; slug: string } }) {
  unstable_setRequestLocale(params.locale);
  const post = getBlogPostBySlug(params.slug, params.locale as Locale);
  if (!post) notFound();
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt ?? undefined,
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main id="main" className="pt-28">
        <article className="mx-auto max-w-3xl px-6 pb-24">
          <h1 className="font-display text-4xl font-bold md:text-5xl">{post.title}</h1>
          <p className="mt-4 text-lg text-muted">{post.excerpt}</p>
          {post.coverUrl && (
            <div className="relative mt-8 aspect-video overflow-hidden rounded-2xl">
              <Image src={post.coverUrl} alt="" fill priority sizes="768px" className="object-cover" />
            </div>
          )}
          <div className="prose prose-lg mt-10 leading-relaxed [&_p]:mb-4 [&_p]:text-justify [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mt-10 [&_h2]:mb-3 [&_pre]:rounded-xl [&_pre]:bg-surface [&_pre]:p-4 [&_code]:font-mono">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
