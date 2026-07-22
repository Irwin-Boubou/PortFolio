import { Request, Response } from 'express';
import { prisma } from '../config/prisma';
import { localize, pickLang, resolveLang } from '../utils/i18n';
import { sendContactEmail } from '../services/mailer';
import { slugify } from '../utils/slugify';

// ---------------- Skills ----------------
export async function listSkills(req: Request, res: Response) {
  const lang = resolveLang(req.query.lang);
  const raw = await prisma.skill.findMany({ orderBy: [{ category: 'asc' }, { order: 'asc' }] });
  const skills = raw.map((s) => localize(s, ['description'], lang));
  // Group by category for the 3D orb's filter chips.
  const grouped = skills.reduce((acc: Record<string, typeof skills>, s: (typeof skills)[number]) => {
    (acc[s.category] ??= []).push(s); return acc;
  }, {} as Record<string, typeof skills>);
  res.json({ skills, grouped });
}
export async function createSkill(req: Request, res: Response) {
  res.status(201).json({ skill: await prisma.skill.create({ data: req.body }) });
}
export async function updateSkill(req: Request, res: Response) {
  res.json({ skill: await prisma.skill.update({ where: { id: req.params.id }, data: req.body }) });
}
export async function deleteSkill(req: Request, res: Response) {
  await prisma.skill.delete({ where: { id: req.params.id } });
  res.json({ ok: true });
}

// ---------------- Site content ----------------
/** GET /site-content?keys=hero.name,hero.taglines&lang=fr */
export async function getSiteContent(req: Request, res: Response) {
  const lang = resolveLang(req.query.lang);
  const keys = req.query.keys ? String(req.query.keys).split(',') : undefined;
  const rows = await prisma.siteContent.findMany({ where: keys ? { key: { in: keys } } : {} });
  const content: Record<string, unknown> = {};
  for (const r of rows) content[r.key] = pickLang(r.value, lang);
  res.json({ content });
}
export async function upsertSiteContent(req: Request, res: Response) {
  const { value, type } = req.body;
  const row = await prisma.siteContent.upsert({
    where: { key: req.params.key },
    update: { value, ...(type ? { type } : {}) },
    create: { key: req.params.key, value, type: type ?? 'TEXT' },
  });
  res.json({ content: row });
}

// ---------------- Tags ----------------
export async function listTags(req: Request, res: Response) {
  const lang = resolveLang(req.query.lang);
  const category = req.query.category ? String(req.query.category).toUpperCase() : undefined;
  const tags = await prisma.tag.findMany({
    where: category ? { projects: { some: { category: category as never } } } : {},
    orderBy: { slug: 'asc' },
  });
  res.json({ tags: tags.map((t: (typeof tags)[number]) => localize(t as never, ['name'], lang)) });
}
export async function createTag(req: Request, res: Response) {
  const { name, slug } = req.body;
  res.status(201).json({ tag: await prisma.tag.create({ data: { name, slug: slug || slugify(name.en) } }) });
}
export async function deleteTag(req: Request, res: Response) {
  await prisma.tag.delete({ where: { id: req.params.id } });
  res.json({ ok: true });
}

// ---------------- Contact ----------------
export async function submitContact(req: Request, res: Response) {
  const data = req.body;
  const message = await prisma.contactMessage.create({ data });
  await sendContactEmail(data).catch((e) => console.error('[mailer]', e)); // email failure must not lose the message
  res.status(201).json({ ok: true, id: message.id });
}
export async function listMessages(_req: Request, res: Response) {
  res.json({ messages: await prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } }) });
}
export async function markRead(req: Request, res: Response) {
  res.json({ message: await prisma.contactMessage.update({ where: { id: req.params.id }, data: { read: true } }) });
}
export async function deleteMessage(req: Request, res: Response) {
  await prisma.contactMessage.delete({ where: { id: req.params.id } });
  res.json({ ok: true });
}

// ---------------- Dashboard stats ----------------
export async function dashboardStats(_req: Request, res: Response) {
  const [projects, posts, messages, unread, testimonials] = await Promise.all([
    prisma.project.count(), prisma.blogPost.count(),
    prisma.contactMessage.count(), prisma.contactMessage.count({ where: { read: false } }),
    prisma.testimonial.count(),
  ]);
  res.json({ stats: { projects, posts, messages, unread, testimonials } });
}

export async function recentMessages(_req: Request, res: Response) {
  const messages = await prisma.contactMessage.findMany({
    where: { read: false }, orderBy: { createdAt: 'desc' }, take: 3,
  });
  res.json({ messages });
}

export async function recentActivity(_req: Request, res: Response) {
  const activity = await prisma.activityLog.findMany({ orderBy: { createdAt: 'desc' }, take: 10 });
  res.json({ activity });
}
