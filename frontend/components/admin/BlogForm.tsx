'use client';
/** Bilingual blog post form, same EN/FR tab pattern as ProjectForm. */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useRouter } from '@/navigation';
import { api } from '@/lib/api';

export interface BlogFormValues {
  slug: string;
  title: { en: string; fr: string };
  excerpt: { en: string; fr: string };
  content: { en: string; fr: string };
  coverUrl: string;
  tags: string;          // comma-separated
  published: boolean;
}

const empty: BlogFormValues = {
  slug: '', title: { en: '', fr: '' }, excerpt: { en: '', fr: '' },
  content: { en: '', fr: '' }, coverUrl: '', tags: '', published: false,
};
const input = 'w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:border-[#6C63FF] focus:outline-none';
const label = 'mb-1 block text-sm font-medium text-gray-700';

export function BlogForm({ initial, postId }: { initial?: Partial<BlogFormValues>; postId?: string }) {
  const router = useRouter();
  const [lang, setLang] = useState<'en' | 'fr'>('en');
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<BlogFormValues>({
    defaultValues: { ...empty, ...initial },
  });

  const onSubmit = async (v: BlogFormValues) => {
    const payload = {
      slug: v.slug || undefined,
      title: { en: v.title.en, fr: v.title.fr || undefined },
      excerpt: { en: v.excerpt.en, fr: v.excerpt.fr || undefined },
      content: { en: v.content.en, fr: v.content.fr || undefined },
      coverUrl: v.coverUrl.trim() || null,
      tags: v.tags.split(',').map((s) => s.trim()).filter(Boolean),
      published: v.published,
    };
    try {
      if (postId) await api.put(`/blog/${postId}`, payload);
      else await api.post('/blog', payload);
      toast.success('Saved');
      router.push('/admin/blog');
    } catch (e) { toast.error('Save failed'); console.error(e); }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl space-y-6">
      <div className="flex overflow-hidden rounded-lg border border-gray-300 self-start w-fit">
        {(['en', 'fr'] as const).map((l) => (
          <button key={l} type="button" onClick={() => setLang(l)}
                  className={`px-4 py-2 text-sm font-semibold uppercase ${lang === l ? 'bg-[#6C63FF] text-white' : 'bg-white text-gray-500'}`}>
            {l}
          </button>
        ))}
      </div>
      {(['en', 'fr'] as const).map((l) => (
        <div key={l} className={lang === l ? 'space-y-5' : 'hidden'}>
          <div><label className={label}>Title ({l.toUpperCase()}) {l === 'en' && '*'}</label>
            <input {...register(`title.${l}`, { required: l === 'en' })} className={input} /></div>
          <div><label className={label}>Excerpt ({l.toUpperCase()}) {l === 'en' && '*'}</label>
            <textarea rows={2} {...register(`excerpt.${l}`, { required: l === 'en' })} className={input} /></div>
          <div><label className={label}>Content ({l.toUpperCase()}), Markdown {l === 'en' && '*'}</label>
            <textarea rows={14} {...register(`content.${l}`, { required: l === 'en' })} className={`${input} font-mono text-sm`} /></div>
        </div>
      ))}
      <div className="grid gap-5 sm:grid-cols-2">
        <div><label className={label}>Slug (auto if empty)</label><input {...register('slug')} className={input} /></div>
        <div><label className={label}>Cover image URL</label><input {...register('coverUrl')} className={input} /></div>
        <div><label className={label}>Tags (comma-separated)</label><input {...register('tags')} className={input} placeholder="react, 3d" /></div>
      </div>
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" {...register('published')} /> Published</label>
      <button type="submit" disabled={isSubmitting}
              className="rounded-lg bg-[#6C63FF] px-6 py-2.5 font-medium text-white hover:bg-[#5a51f0] disabled:opacity-50">
        {isSubmitting ? 'Saving…' : 'Save post'}
      </button>
    </form>
  );
}
