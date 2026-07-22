import { CookieOptions, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../config/prisma';
import { env } from '../config/env';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/jwt';
import { HttpError } from '../utils/httpError';

const RT_COOKIE = 'rt';
const rtCookieOpts: CookieOptions = {
  httpOnly: true,
  secure: env.isProd,
  sameSite: env.isProd ? 'none' : 'lax', // cross-site cookie in prod (Vercel ↔ Railway)
  path: '/api/v1/auth',
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

/** POST /auth/login — verifies credentials, sets RT cookie, returns AT. */
export async function login(req: Request, res: Response) {
  const { email, password } = req.body as { email: string; password: string };
  const admin = await prisma.admin.findUnique({ where: { email } });
  if (!admin || !(await bcrypt.compare(password, admin.passwordHash))) {
    throw new HttpError(401, 'Invalid email or password');
  }
  const payload = { adminId: admin.id, email: admin.email };
  res.cookie(RT_COOKIE, signRefreshToken(payload), rtCookieOpts);
  res.json({
    accessToken: signAccessToken(payload),
    admin: { id: admin.id, email: admin.email, name: admin.name, avatarUrl: admin.avatarUrl },
  });
}

/** POST /auth/refresh — reads RT cookie, issues a fresh AT. */
export async function refresh(req: Request, res: Response) {
  const token = req.cookies?.[RT_COOKIE];
  if (!token) throw new HttpError(401, 'No refresh token');
  try {
    const { adminId, email } = verifyRefreshToken(token);
    res.json({ accessToken: signAccessToken({ adminId, email }) });
  } catch {
    throw new HttpError(401, 'Refresh token expired — please log in again');
  }
}

/** DELETE /auth/logout — clears the RT cookie. */
export async function logout(_req: Request, res: Response) {
  res.clearCookie(RT_COOKIE, { ...rtCookieOpts, maxAge: 0 });
  res.json({ ok: true });
}

/** GET /auth/me */
export async function me(req: Request, res: Response) {
  const admin = await prisma.admin.findUnique({
    where: { id: req.admin!.adminId },
    select: { id: true, email: true, name: true, avatarUrl: true },
  });
  res.json({ admin });
}

/** PUT /auth/me — update the admin's own name/avatar (email intentionally not editable here). */
export async function updateProfile(req: Request, res: Response) {
  const { name, avatarUrl } = req.body as { name: string; avatarUrl?: string | null };
  const admin = await prisma.admin.update({
    where: { id: req.admin!.adminId },
    data: { name, avatarUrl },
    select: { id: true, email: true, name: true, avatarUrl: true },
  });
  res.json({ admin });
}

/** PUT /auth/password — change password, requires the current password. */
export async function changePassword(req: Request, res: Response) {
  const { currentPassword, newPassword } = req.body as { currentPassword: string; newPassword: string };
  const admin = await prisma.admin.findUniqueOrThrow({ where: { id: req.admin!.adminId } });
  if (!(await bcrypt.compare(currentPassword, admin.passwordHash))) {
    throw new HttpError(401, 'Current password is incorrect');
  }
  await prisma.admin.update({
    where: { id: admin.id },
    data: { passwordHash: await bcrypt.hash(newPassword, 12) },
  });
  res.json({ ok: true });
}
