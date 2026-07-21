import { notFound } from 'next/navigation';
import Image from 'next/image';
import { unstable_setRequestLocale } from 'next-intl/server';
import ReactMarkdown from 'react-markdown';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { apiGet, type BlogPost } from '@/lib/serverApi';

export const revalidate = 300;
export const dynamicParams = true;

export default async function BlogPostPage({ params }: { params: { locale: string; slug: string } }) {
  unstable_setRequestLocale(params.locale);
  const data = await apiGet<{ post: BlogPost }>(`/blog/${params.slug}`, { lang: params.locale });
  if (!data?.post) notFound();
  const post = data.post;
  return (
    <>
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
          <div className="prose prose-lg mt-10 leading-relaxed [&_p]:mb-4 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mt-10 [&_h2]:mb-3 [&_pre]:rounded-xl [&_pre]:bg-surface [&_pre]:p-4 [&_code]:font-mono">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
