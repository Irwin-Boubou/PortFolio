'use client';
/**
 * Bilingual project form — the core of the multi-language admin (spec + FR/EN requirement).
 * EN/FR tab switcher edits both language versions of every localized field;
 * both are saved together as { en, fr } locale maps.
 */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import toast from 'react-hot-toast';
import { useRouter } from '@/navigation';
import { api } from '@/lib/api';

export interface ProjectFormValues {
  slug: string;
  category: 'DEVELOPMENT' | 'DESIGN';
  title: { en: string; fr: string };
  subtitle: { en: string; fr: string };
  description: { en: string; fr: string };
  role: { en: string; fr: string };
  thumbnailUrl: string;
  liveUrl: string;
  githubUrl: string;
  behanceUrl: string;
  techStack: string;   // comma-separated in the UI
  tools: string;
  codeSnippet: string;
  featured: boolean;
  published: boolean;
}

const empty: ProjectFormValues = {
  slug: '', category: 'DEVELOPMENT',
  title: { en: '', fr: '' }, subtitle: { en: '', fr: '' },
  description: { en: '', fr: '' }, role: { en: '', fr: '' },
  thumbnailUrl: '', liveUrl: '', githubUrl: '', behanceUrl: '',
  techStack: '', tools: '', codeSnippet: '', featured: false, published: false,
};

const input = 'w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:border-[#6C63FF] focus:outline-none';
const label = 'mb-1 block text-sm font-medium text-gray-700';
const csv = (s: string) => s.split(',').map((x) => x.trim()).filter(Boolean);
const orNull = (s: string) => (s.trim() ? s.trim() : null);

export function ProjectForm({ initial, projectId }: { initial?: Partial<ProjectFormValues>; projectId?: string }) {
  const t = useTranslations('admin.form');
  const router = useRouter();
  const [lang, setLang] = useState<'en' | 'fr'>('en');
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<ProjectFormValues>({
    defaultValues: { ...empty, ...initial },
  });

  const onSubmit = async (v: ProjectFormValues) => {
    const payload = {
      slug: v.slug || undefined,
      category: v.category,
      title: { en: v.title.en, fr: v.title.fr || undefined },
      subtitle: v.subtitle.en ? { en: v.subtitle.en, fr: v.subtitle.fr || undefined } : null,
      description: { en: v.description.en, fr: v.description.fr || undefined },
      role: v.role.en ? { en: v.role.en, fr: v.role.fr || undefined } : null,
      thumbnailUrl: v.thumbnailUrl,
      liveUrl: orNull(v.liveUrl), githubUrl: orNull(v.githubUrl), behanceUrl: orNull(v.behanceUrl),
      techStack: csv(v.techStack), tools: csv(v.tools),
      codeSnippet: orNull(v.codeSnippet),
      featured: v.featured, published: v.published,
    };
    try {
      if (projectId) await api.put(`/projects/${projectId}`, payload);
      else await api.post('/projects', payload);
      toast.success('Saved');
      router.push('/admin/projects');
    } catch (e) {
      toast.error('Save failed — check required fields');
      console.error(e);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl space-y-6">
      {/* language tabs */}
      <div className="flex items-center gap-3">
        <div className="flex overflow-hidden rounded-lg border border-gray-300">
          {(['en', 'fr'] as const).map((l) => (
            <button key={l} type="button" onClick={() => setLang(l)}
                    className={`px-4 py-2 text-sm font-semibold uppercase ${lang === l ? 'bg-[#6C63FF] text-white' : 'bg-white text-gray-500'}`}>
              {l}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-400">{t('langHint')}</p>
      </div>

      {/* localized fields — both languages mounted, only the active tab visible */}
      {(['en', 'fr'] as const).map((l) => (
        <div key={l} className={lang === l ? 'space-y-5' : 'hidden'}>
          <div>
            <label className={label}>{l === 'en' ? t('titleEn') : t('titleFr')} {l === 'en' && '*'}</label>
            <input {...register(`title.${l}`, { required: l === 'en' })} className={input} />
          </div>
          <div>
            <label className={label}>Subtitle ({l.toUpperCase()})</label>
            <input {...register(`subtitle.${l}`)} className={input} />
          </div>
          <div>
            <label className={label}>{l === 'en' ? t('descEn') : t('descFr')} {l === 'en' && '*'} — Markdown</label>
            <textarea rows={8} {...register(`description.${l}`, { required: l === 'en' })} className={`${input} font-mono text-sm`} />
          </div>
          <div>
            <label className={label}>Role ({l.toUpperCase()})</label>
            <input {...register(`role.${l}`)} className={input} />
          </div>
        </div>
      ))}

      {/* language-neutral fields */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label}>{t('category')}</label>
          <select {...register('category')} className={input}>
            <option value="DEVELOPMENT">Development</option>
            <option value="DESIGN">Design</option>
          </select>
        </div>
        <div>
          <label className={label}>{t('slug')}</label>
          <input {...register('slug')} className={input} placeholder="my-project" />
        </div>
        <div className="sm:col-span-2">
          <label className={label}>{t('thumbnail')} *</label>
          <input {...register('thumbnailUrl', { required: true })} className={input} placeholder="https://res.cloudinary.com/…" />
        </div>
        <div><label className={label}>Live URL</label><input {...register('liveUrl')} className={input} /></div>
        <div><label className={label}>GitHub URL</label><input {...register('githubUrl')} className={input} /></div>
        <div><label className={label}>Behance URL</label><input {...register('behanceUrl')} className={input} /></div>
        <div><label className={label}>Tech stack (comma-separated)</label><input {...register('techStack')} className={input} placeholder="Next.js, Prisma" /></div>
        <div><label className={label}>Tools (comma-separated)</label><input {...register('tools')} className={input} placeholder="Figma, Photoshop" /></div>
      </div>
      <div>
        <label className={label}>Code snippet (dev projects)</label>
        <textarea rows={6} {...register('codeSnippet')} className={`${input} font-mono text-sm`} />
      </div>
      <div className="flex gap-8">
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" {...register('featured')} /> Featured</label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" {...register('published')} /> Published</label>
      </div>
      <button type="submit" disabled={isSubmitting}
              className="rounded-lg bg-[#6C63FF] px-6 py-2.5 font-medium text-white hover:bg-[#5a51f0] disabled:opacity-50">
        {isSubmitting ? t('saving') : t('save')}
      </button>
    </form>
  );
}
