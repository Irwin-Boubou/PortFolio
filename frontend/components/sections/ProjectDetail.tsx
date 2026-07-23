import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import ReactMarkdown from 'react-markdown';
import { Link } from '@/navigation';
import type { Project } from '@/lib/serverApi';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { CaseStudyEnterButton } from '@/components/ui/CaseStudyToggle';
import { ProjectGallery } from '@/components/sections/ProjectGallery';

/** Shared single-project layout for dev + design projects (spec §7.4). */
export async function ProjectDetail({ project, related }: { project: Project; related: Project[] }) {
  const t = await getTranslations('work');
  const relatedBase = project.category === 'DEVELOPMENT' ? '/work/dev/' : '/work/design-project/';
  return (
    <article className="pt-16">
      {/* hero */}
      <header className="relative flex min-h-[50vh] items-end overflow-hidden">
        <Image src={project.thumbnailUrl} alt="" fill priority className="object-cover opacity-25 blur-sm" aria-hidden="true" />
        <div className="relative z-10 mx-auto w-full max-w-content px-6 pb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-secondary">{project.category}</span>
          <h1 className="mt-2 font-display text-4xl font-bold md:text-6xl">{project.title}</h1>
          {project.subtitle && <p className="mt-3 max-w-2xl text-lg text-muted">{project.subtitle}</p>}
        </div>
      </header>

      {/* meta bar */}
      <div className="border-y border-muted/15 bg-surface/60">
        <div className="mx-auto flex max-w-content flex-wrap items-center gap-x-10 gap-y-3 px-6 py-5 text-sm">
          {project.role && <span><strong className="text-muted">{t('role')}: </strong>{project.role}</span>}
          {(project.techStack.length > 0 || project.tools.length > 0) && (
            <span><strong className="text-muted">{t('tools')}: </strong>{[...project.techStack, ...project.tools].join(', ')}</span>
          )}
          <span className="ml-auto flex items-center gap-5">
            {project.liveUrl && <a className="text-secondary hover:underline" href={project.liveUrl} target="_blank" rel="noreferrer">{t('live')} ↗</a>}
            {project.githubUrl && <a className="text-secondary hover:underline" href={project.githubUrl} target="_blank" rel="noreferrer">{t('code')} ↗</a>}
            {project.behanceUrl && <a className="text-secondary hover:underline" href={project.behanceUrl} target="_blank" rel="noreferrer">Behance ↗</a>}
            <CaseStudyEnterButton />
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-content px-6 py-16">
        {/* Overview */}
        <section className="max-w-3xl">
          <h2 className="mb-3 font-display text-2xl font-semibold">{t('overview')}</h2>
          <div className="prose prose-lg leading-relaxed text-body [&_p]:mb-4 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mt-8 [&_h2]:mb-3">
            <ReactMarkdown>{project.description}</ReactMarkdown>
          </div>
        </section>

        {/* Challenge / Solution / Results */}
        {[
          { key: 'challenge', label: t('challenge'), value: project.challenge },
          { key: 'solution', label: t('solution'), value: project.solution },
          { key: 'results', label: t('results'), value: project.results },
        ]
          .filter((s) => s.value)
          .map((s) => (
            <section key={s.key} className="mt-12 max-w-3xl border-l-2 border-primary/40 pl-6">
              <h2 className="mb-3 font-display text-2xl font-semibold">{s.label}</h2>
              <div className="prose text-muted [&_p]:mb-4"><ReactMarkdown>{s.value as string}</ReactMarkdown></div>
            </section>
          ))}

        {/* Tech Stack */}
        {project.techStack.length > 0 && (
          <section className="mt-12 max-w-3xl">
            <h2 className="mb-4 font-display text-2xl font-semibold">{t('techStackTitle')}</h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span key={tech} className="rounded-full border border-muted/20 bg-surface px-3 py-1.5 text-sm text-body">{tech}</span>
              ))}
            </div>
          </section>
        )}

        {/* gallery */}
        {(project.gallery.length > 0 || project.images.length > 0) && (
          <section className="mt-16">
            <h2 className="mb-6 font-display text-2xl font-semibold">{t('gallery')}</h2>
            <ProjectGallery
              images={project.gallery.length > 0 ? project.gallery : project.images.map((i) => i.url)}
              title={project.title}
            />
          </section>
        )}

        {/* dev exclusive: code snippet */}
        {project.codeSnippet && (
          <div className="mt-16">
            <h2 className="mb-4 font-display text-2xl font-semibold">{t('snippet')}</h2>
            <CodeBlock code={project.codeSnippet} />
          </div>
        )}

        {/* design exclusive: process */}
        {project.designProcess && (
          <div className="mt-16 max-w-3xl">
            <h2 className="mb-4 font-display text-2xl font-semibold">{t('process')}</h2>
            <div className="prose text-muted [&_p]:mb-4"><ReactMarkdown>{project.designProcess}</ReactMarkdown></div>
          </div>
        )}

        {/* related */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="mb-6 font-display text-2xl font-semibold">{t('related')}</h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {related.map((r) => (
                <Link key={r.id} href={`${relatedBase}${r.slug}`} className="group block overflow-hidden rounded-xl border border-muted/15">
                  <div className="relative aspect-video">
                    <Image src={r.thumbnailUrl} alt={r.title} fill sizes="33vw" className="object-cover transition-transform group-hover:scale-105" />
                  </div>
                  <p className="p-4 font-display font-medium">{r.title}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
