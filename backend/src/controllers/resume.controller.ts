import { Request, Response } from 'express';
import { prisma } from '../config/prisma';
import { localize, resolveLang } from '../utils/i18n';
import { logActivity } from '../utils/activityLog';

// ---------------- Experience ----------------
const EXPERIENCE_FIELDS = ['company', 'role', 'description', 'location'];

export async function listExperience(req: Request, res: Response) {
  const lang = resolveLang(req.query.lang);
  const items = await prisma.experience.findMany({ orderBy: { order: 'asc' } });
  res.json({ experience: items.map((e) => localize(e, EXPERIENCE_FIELDS, lang)) });
}
export async function createExperience(req: Request, res: Response) {
  const experience = await prisma.experience.create({ data: req.body });
  logActivity('experience.created', 'Experience entry created');
  res.status(201).json({ experience });
}
export async function updateExperience(req: Request, res: Response) {
  const experience = await prisma.experience.update({ where: { id: req.params.id }, data: req.body });
  logActivity('experience.updated', 'Experience entry updated');
  res.json({ experience });
}
export async function deleteExperience(req: Request, res: Response) {
  await prisma.experience.delete({ where: { id: req.params.id } });
  logActivity('experience.deleted', 'Experience entry deleted');
  res.json({ ok: true });
}

// ---------------- Education ----------------
const EDUCATION_FIELDS = ['institution', 'degree', 'description'];

export async function listEducation(req: Request, res: Response) {
  const lang = resolveLang(req.query.lang);
  const items = await prisma.education.findMany({ orderBy: { order: 'asc' } });
  res.json({ education: items.map((e) => localize(e, EDUCATION_FIELDS, lang)) });
}
export async function createEducation(req: Request, res: Response) {
  const education = await prisma.education.create({ data: req.body });
  logActivity('education.created', 'Education entry created');
  res.status(201).json({ education });
}
export async function updateEducation(req: Request, res: Response) {
  const education = await prisma.education.update({ where: { id: req.params.id }, data: req.body });
  logActivity('education.updated', 'Education entry updated');
  res.json({ education });
}
export async function deleteEducation(req: Request, res: Response) {
  await prisma.education.delete({ where: { id: req.params.id } });
  logActivity('education.deleted', 'Education entry deleted');
  res.json({ ok: true });
}

// ---------------- Certifications ----------------
export async function listCertifications(req: Request, res: Response) {
  const lang = resolveLang(req.query.lang);
  const items = await prisma.certification.findMany({ orderBy: { order: 'asc' } });
  res.json({ certifications: items.map((c) => localize(c, ['name'], lang)) });
}
export async function createCertification(req: Request, res: Response) {
  const certification = await prisma.certification.create({ data: req.body });
  logActivity('certification.created', 'Certification created');
  res.status(201).json({ certification });
}
export async function updateCertification(req: Request, res: Response) {
  const certification = await prisma.certification.update({ where: { id: req.params.id }, data: req.body });
  logActivity('certification.updated', 'Certification updated');
  res.json({ certification });
}
export async function deleteCertification(req: Request, res: Response) {
  await prisma.certification.delete({ where: { id: req.params.id } });
  logActivity('certification.deleted', 'Certification deleted');
  res.json({ ok: true });
}
