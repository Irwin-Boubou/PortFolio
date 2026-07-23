import { Request, Response } from 'express';
import { Prisma, ProjectCategory } from '@prisma/client';
import { prisma } from '../config/prisma';
import { localize, resolveLang } from '../utils/i18n';
import { slugify } from '../utils/slugify';
import { HttpError } from '../utils/httpError';
import { logActivity } from '../utils/activityLog';

const LOCALIZED = ['title', 'subtitle', 'description', 'role', 'designProcess', 'challenge', 'solution', 'results'] as const;

function localizeProject<T extends Record<string, unknown>>(p: T, lang: ReturnType<typeof resolveLang>) {
  const out = localize(p, [...LOCALIZED], lang) as Record<string, unknown>;
  if (Array.isArray(out.images)) {
    out.images = (out.images as Record<string, unknown>[]).map((img) => localize(img, ['alt'], lang));
  }
  if (Array.isArray(out.tags)) {
    out.tags = (out.tags as Record<string, unknown>[]).map((t) => localize(t, ['name'], lang));
  }
  return out;
}

/** GET /projects?category=&featured=&tags=a,b&published=&limit=&page=&lang= */
export async function listProjects(req: Request, res: Response) {
  const lang = resolveLang(req.query.lang);
  const { category, featured, tags, exclude } = req.query;
  const limit = Math.min(Number(req.query.limit ?? 50), 100);
  const page = Math.max(Number(req.query.page ?? 1), 1);

  // Public callers only ever see published projects; the admin panel passes lang=all + a token.
  const isAdmin = Boolean(req.admin);
  const where: Prisma.ProjectWhereInput = {
    ...(isAdmin ? {} : { published: true }),
    ...(category ? { category: String(category).toUpperCase() as ProjectCategory } : {}),
    ...(featured !== undefined ? { featured: featured === 'true' } : {}),
    ...(exclude ? { id: { not: String(exclude) } } : {}),
    ...(tags ? { tags: { some: { slug: { in: String(tags).split(',') } } } } : {}),
  };

  const [items, total] = await Promise.all([
    prisma.project.findMany({
      where,
      include: { images: { orderBy: { order: 'asc' } }, tags: true },
      orderBy: [{ featured: 'desc' }, { order: 'asc' }, { createdAt: 'desc' }],
      take: limit,
      skip: (page - 1) * limit,
    }),
    prisma.project.count({ where }),
  ]);
  res.json({ items: items.map((p) => localizeProject(p, lang)), total, page, limit });
}

/** GET /projects/:slug */
export async function getProject(req: Request, res: Response) {
  const lang = resolveLang(req.query.lang);
  const project = await prisma.project.findUnique({
    where: { slug: req.params.slug },
    include: { images: { orderBy: { order: 'asc' } }, tags: true },
  });
  if (!project || (!project.published && !req.admin)) throw new HttpError(404, 'Project not found');
  res.json({ project: localizeProject(project, lang) });
}

/** POST /projects [admin] */
export async function createProject(req: Request, res: Response) {
  const { images, tagSlugs, ...data } = req.body;
  const slug = data.slug || slugify(data.title.en);
  const project = await prisma.project.create({
    data: {
      ...data,
      slug,
      publishedAt: data.published ? new Date() : null,
      images: { create: images },
      tags: { connect: (tagSlugs as string[]).map((s) => ({ slug: s })) },
    },
    include: { images: true, tags: true },
  });
  logActivity('project.created', `Project '${project.slug}' created`);
  res.status(201).json({ project });
}

/** PUT /projects/:id [admin], replaces images/tags atomically. */
export async function updateProject(req: Request, res: Response) {
  const { images, tagSlugs, ...data } = req.body;
  const project = await prisma.project.update({
    where: { id: req.params.id },
    data: {
      ...data,
      ...(images ? { images: { deleteMany: {}, create: images } } : {}),
      ...(tagSlugs ? { tags: { set: (tagSlugs as string[]).map((s) => ({ slug: s })) } } : {}),
    },
    include: { images: true, tags: true },
  });
  logActivity('project.updated', `Project '${project.slug}' updated`);
  res.json({ project });
}

/** DELETE /projects/:id [admin], images cascade via schema. */
export async function deleteProject(req: Request, res: Response) {
  const project = await prisma.project.delete({ where: { id: req.params.id } });
  logActivity('project.deleted', `Project '${project.slug}' deleted`);
  res.json({ ok: true });
}

/** PATCH /projects/:id/featured [admin] */
export async function toggleFeatured(req: Request, res: Response) {
  const p = await prisma.project.findUniqueOrThrow({ where: { id: req.params.id } });
  const project = await prisma.project.update({
    where: { id: p.id }, data: { featured: !p.featured },
  });
  res.json({ project });
}

/** PATCH /projects/reorder [admin], body: { order: [{id, order}] } */
export async function reorderProjects(req: Request, res: Response) {
  const updates = (req.body.order ?? []) as { id: string; order: number }[];
  await prisma.$transaction(
    updates.map((u) => prisma.project.update({ where: { id: u.id }, data: { order: u.order } })),
  );
  res.json({ ok: true });
}
