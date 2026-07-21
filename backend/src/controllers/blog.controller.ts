import { Request, Response } from 'express';
import { prisma } from '../config/prisma';
import { localize, resolveLang } from '../utils/i18n';
import { slugify } from '../utils/slugify';
import { HttpError } from '../utils/httpError';

const LOCALIZED = ['title', 'excerpt', 'content'];

/** Reading time ≈ words / 200wpm, computed from the EN content. */
const estimateReadingTime = (content: { en?: string }) =>
  Math.max(1, Math.round((content.en ?? '').split(/\s+/).length / 200));

export async function listPosts(req: Request, res: Response) {
  const lang = resolveLang(req.query.lang);
  const limit = Math.min(Number(req.query.limit ?? 12), 50);
  const page = Math.max(Number(req.query.page ?? 1), 1);
  const where = req.admin ? {} : { published: true };
  const [items, total] = await Promise.all([
    prisma.blogPost.findMany({
      where, include: { tags: true },
      orderBy: { publishedAt: 'desc' }, take: limit, skip: (page - 1) * limit,
    }),
    prisma.blogPost.count({ where }),
  ]);
  res.json({
    items: items.map((p: (typeof items)[number]) => localize(p as never, LOCALIZED, lang)),
    total, page, limit, pages: Math.ceil(total / limit),
  });
}

export async function getPost(req: Request, res: Response) {
  const lang = resolveLang(req.query.lang);
  const post = await prisma.blogPost.findUnique({
    where: { slug: req.params.slug }, include: { tags: true },
  });
  if (!post || (!post.published && !req.admin)) throw new HttpError(404, 'Post not found');
  res.json({ post: localize(post as never, LOCALIZED, lang) });
}

export async function createPost(req: Request, res: Response) {
  const { tagSlugs, ...data } = req.body;
  const post = await prisma.blogPost.create({
    data: {
      ...data,
      slug: data.slug || slugify(data.title.en),
      readingTime: data.readingTime ?? estimateReadingTime(data.content),
      publishedAt: data.published ? new Date() : null,
      tags: { connect: (tagSlugs as string[]).map((s) => ({ slug: s })) },
    },
  });
  res.status(201).json({ post });
}

export async function updatePost(req: Request, res: Response) {
  const { tagSlugs, ...data } = req.body;
  const post = await prisma.blogPost.update({
    where: { id: req.params.id },
    data: { ...data, ...(tagSlugs ? { tags: { set: (tagSlugs as string[]).map((s) => ({ slug: s })) } } : {}) },
  });
  res.json({ post });
}

export async function deletePost(req: Request, res: Response) {
  await prisma.blogPost.delete({ where: { id: req.params.id } });
  res.json({ ok: true });
}

export async function togglePublish(req: Request, res: Response) {
  const p = await prisma.blogPost.findUniqueOrThrow({ where: { id: req.params.id } });
  const post = await prisma.blogPost.update({
    where: { id: p.id },
    data: { published: !p.published, publishedAt: !p.published ? new Date() : p.publishedAt },
  });
  res.json({ post });
}
