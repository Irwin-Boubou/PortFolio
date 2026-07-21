'use client';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { api } from '@/lib/api';
import { ProjectForm, type ProjectFormValues } from '@/components/admin/ProjectForm';

export default function EditProjectPage() {
  const { id } = useParams<{ id: string }>();
  const { data } = useQuery({
    queryKey: ['admin-project', id],
    queryFn: async () => {
      // fetch full bilingual object (lang=all), find by id from the list endpoint
      const items = (await api.get('/projects?lang=all&limit=100')).data.items as Array<Record<string, unknown>>;
      return items.find((p) => p.id === id) ?? null;
    },
  });
  if (!data) return <p className="text-gray-400">Loading…</p>;

  const lm = (v: unknown) => {
    const m = (v ?? {}) as { en?: string; fr?: string };
    return { en: m.en ?? '', fr: m.fr ?? '' };
  };
  const p = data as Record<string, unknown>;
  const initial: Partial<ProjectFormValues> = {
    slug: p.slug as string,
    category: p.category as 'DEVELOPMENT',
    title: lm(p.title), subtitle: lm(p.subtitle), description: lm(p.description), role: lm(p.role),
    thumbnailUrl: (p.thumbnailUrl as string) ?? '',
    liveUrl: (p.liveUrl as string) ?? '', githubUrl: (p.githubUrl as string) ?? '', behanceUrl: (p.behanceUrl as string) ?? '',
    techStack: ((p.techStack as string[]) ?? []).join(', '),
    tools: ((p.tools as string[]) ?? []).join(', '),
    codeSnippet: (p.codeSnippet as string) ?? '',
    featured: Boolean(p.featured), published: Boolean(p.published),
  };
  return (
    <div>
      <h1 className="mb-8 font-display text-2xl font-bold">Edit project</h1>
      <ProjectForm initial={initial} projectId={id} />
    </div>
  );
}
