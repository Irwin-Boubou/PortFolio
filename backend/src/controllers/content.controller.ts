import { Request, Response } from 'express';
import { prisma } from '../config/prisma';
import { localize, resolveLang } from '../utils/i18n';
import { HttpError } from '../utils/httpError';
import { logActivity } from '../utils/activityLog';

// ---------------- Testimonials ----------------
const TESTIMONIAL_FIELDS = ['name', 'role', 'content'];

/** GET /testimonials?featured=true — public: published only, admin: all */
export async function listTestimonials(req: Request, res: Response) {
  const lang = resolveLang(req.query.lang);
  const isAdmin = Boolean(req.admin);
  const { featured } = req.query;
  const items = await prisma.testimonial.findMany({
    where: {
      ...(isAdmin ? {} : { published: true }),
      ...(featured !== undefined ? { featured: featured === 'true' } : {}),
    },
    orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
  });
  res.json({ testimonials: items.map((t) => localize(t, TESTIMONIAL_FIELDS, lang)) });
}

export async function createTestimonial(req: Request, res: Response) {
  const testimonial = await prisma.testimonial.create({ data: req.body });
  logActivity('testimonial.created', `Testimonial from '${testimonial.company}' created`);
  res.status(201).json({ testimonial });
}

export async function updateTestimonial(req: Request, res: Response) {
  const testimonial = await prisma.testimonial.update({ where: { id: req.params.id }, data: req.body });
  logActivity('testimonial.updated', `Testimonial from '${testimonial.company}' updated`);
  res.json({ testimonial });
}

export async function deleteTestimonial(req: Request, res: Response) {
  await prisma.testimonial.delete({ where: { id: req.params.id } });
  logActivity('testimonial.deleted', 'Testimonial deleted');
  res.json({ ok: true });
}

export async function toggleTestimonialFeatured(req: Request, res: Response) {
  const t = await prisma.testimonial.findUniqueOrThrow({ where: { id: req.params.id } });
  const testimonial = await prisma.testimonial.update({ where: { id: t.id }, data: { featured: !t.featured } });
  res.json({ testimonial });
}

// ---------------- Trust companies ----------------
export async function listTrustCompanies(req: Request, res: Response) {
  const lang = resolveLang(req.query.lang);
  const isAdmin = Boolean(req.admin);
  const { category } = req.query;
  const items = await prisma.trustCompany.findMany({
    where: {
      ...(isAdmin ? {} : { published: true }),
      ...(category ? { category: String(category) } : {}),
    },
    orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
  });
  res.json({ companies: items.map((c) => localize(c, ['description'], lang)) });
}

export async function createTrustCompany(req: Request, res: Response) {
  const company = await prisma.trustCompany.create({ data: req.body });
  logActivity('client.created', `Client/partner '${company.name}' created`);
  res.status(201).json({ company });
}

export async function updateTrustCompany(req: Request, res: Response) {
  const company = await prisma.trustCompany.update({ where: { id: req.params.id }, data: req.body });
  logActivity('client.updated', `Client/partner '${company.name}' updated`);
  res.json({ company });
}

export async function deleteTrustCompany(req: Request, res: Response) {
  await prisma.trustCompany.delete({ where: { id: req.params.id } });
  logActivity('client.deleted', 'Client/partner deleted');
  res.json({ ok: true });
}

// ---------------- Process steps ----------------
export async function listProcessSteps(req: Request, res: Response) {
  const lang = resolveLang(req.query.lang);
  const items = await prisma.processStep.findMany({ orderBy: { order: 'asc' } });
  res.json({ steps: items.map((s) => localize(s, ['title', 'description'], lang)) });
}

export async function createProcessStep(req: Request, res: Response) {
  const step = await prisma.processStep.create({ data: req.body });
  logActivity('process.created', `Process step '${step.stepNumber}' created`);
  res.status(201).json({ step });
}

export async function updateProcessStep(req: Request, res: Response) {
  const step = await prisma.processStep.update({ where: { id: req.params.id }, data: req.body });
  logActivity('process.updated', `Process step '${step.stepNumber}' updated`);
  res.json({ step });
}

export async function deleteProcessStep(req: Request, res: Response) {
  await prisma.processStep.delete({ where: { id: req.params.id } });
  logActivity('process.deleted', 'Process step deleted');
  res.json({ ok: true });
}

// ---------------- Pricing packages ----------------
const PRICING_FIELDS = ['name', 'tagline', 'features', 'ctaLabel'];

export async function listPricingPackages(req: Request, res: Response) {
  const lang = resolveLang(req.query.lang);
  const isAdmin = Boolean(req.admin);
  const items = await prisma.pricingPackage.findMany({
    where: isAdmin ? {} : { published: true },
    orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
  });
  res.json({ packages: items.map((p) => localize(p, PRICING_FIELDS, lang)) });
}

export async function createPricingPackage(req: Request, res: Response) {
  const pkg = await prisma.pricingPackage.create({ data: req.body });
  logActivity('pricing.created', 'Pricing package created');
  res.status(201).json({ package: pkg });
}

export async function updatePricingPackage(req: Request, res: Response) {
  const pkg = await prisma.pricingPackage.update({ where: { id: req.params.id }, data: req.body });
  logActivity('pricing.updated', 'Pricing package updated');
  res.json({ package: pkg });
}

export async function deletePricingPackage(req: Request, res: Response) {
  await prisma.pricingPackage.delete({ where: { id: req.params.id } });
  logActivity('pricing.deleted', 'Pricing package deleted');
  res.json({ ok: true });
}

// ---------------- Awards ----------------
const AWARD_FIELDS = ['title', 'issuer', 'category'];

export async function listAwards(req: Request, res: Response) {
  const lang = resolveLang(req.query.lang);
  const isAdmin = Boolean(req.admin);
  const items = await prisma.award.findMany({
    where: isAdmin ? {} : { published: true },
    orderBy: [{ order: 'asc' }, { date: 'desc' }],
  });
  res.json({ awards: items.map((a) => localize(a, AWARD_FIELDS, lang)) });
}

export async function createAward(req: Request, res: Response) {
  const award = await prisma.award.create({ data: req.body });
  logActivity('award.created', 'Award created');
  res.status(201).json({ award });
}

export async function updateAward(req: Request, res: Response) {
  const award = await prisma.award.update({ where: { id: req.params.id }, data: req.body });
  logActivity('award.updated', 'Award updated');
  res.json({ award });
}

export async function deleteAward(req: Request, res: Response) {
  await prisma.award.delete({ where: { id: req.params.id } });
  logActivity('award.deleted', 'Award deleted');
  res.json({ ok: true });
}

// ---------------- FAQ ----------------
export async function listFaqItems(req: Request, res: Response) {
  const lang = resolveLang(req.query.lang);
  const isAdmin = Boolean(req.admin);
  const { category } = req.query;
  const items = await prisma.faqItem.findMany({
    where: {
      ...(isAdmin ? {} : { published: true }),
      ...(category ? { category: String(category) } : {}),
    },
    orderBy: [{ order: 'asc' }],
  });
  res.json({ faqs: items.map((f) => localize(f, ['question', 'answer'], lang)) });
}

export async function createFaqItem(req: Request, res: Response) {
  const faq = await prisma.faqItem.create({ data: req.body });
  logActivity('faq.created', 'FAQ item created');
  res.status(201).json({ faq });
}

export async function updateFaqItem(req: Request, res: Response) {
  const faq = await prisma.faqItem.update({ where: { id: req.params.id }, data: req.body });
  logActivity('faq.updated', 'FAQ item updated');
  res.json({ faq });
}

export async function deleteFaqItem(req: Request, res: Response) {
  await prisma.faqItem.delete({ where: { id: req.params.id } });
  logActivity('faq.deleted', 'FAQ item deleted');
  res.json({ ok: true });
}

// ---------------- Reorder ----------------
type OrderUpdate = { id: string; order: number };
const parseOrder = (req: Request): OrderUpdate[] => {
  const updates = (req.body.order ?? []) as OrderUpdate[];
  if (!updates.length) throw new HttpError(400, 'order array is required');
  return updates;
};

export async function reorderTestimonials(req: Request, res: Response) {
  const updates = parseOrder(req);
  await prisma.$transaction(updates.map((u) => prisma.testimonial.update({ where: { id: u.id }, data: { order: u.order } })));
  res.json({ ok: true });
}
export async function reorderTrustCompanies(req: Request, res: Response) {
  const updates = parseOrder(req);
  await prisma.$transaction(updates.map((u) => prisma.trustCompany.update({ where: { id: u.id }, data: { order: u.order } })));
  res.json({ ok: true });
}
export async function reorderProcessSteps(req: Request, res: Response) {
  const updates = parseOrder(req);
  await prisma.$transaction(updates.map((u) => prisma.processStep.update({ where: { id: u.id }, data: { order: u.order } })));
  res.json({ ok: true });
}
export async function reorderPricingPackages(req: Request, res: Response) {
  const updates = parseOrder(req);
  await prisma.$transaction(updates.map((u) => prisma.pricingPackage.update({ where: { id: u.id }, data: { order: u.order } })));
  res.json({ ok: true });
}
export async function reorderAwards(req: Request, res: Response) {
  const updates = parseOrder(req);
  await prisma.$transaction(updates.map((u) => prisma.award.update({ where: { id: u.id }, data: { order: u.order } })));
  res.json({ ok: true });
}
export async function reorderFaqItems(req: Request, res: Response) {
  const updates = parseOrder(req);
  await prisma.$transaction(updates.map((u) => prisma.faqItem.update({ where: { id: u.id }, data: { order: u.order } })));
  res.json({ ok: true });
}
