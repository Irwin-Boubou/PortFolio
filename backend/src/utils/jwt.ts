import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export interface AccessPayload { adminId: string; email: string; }

export const signAccessToken = (payload: AccessPayload) =>
  jwt.sign(payload, env.jwt.accessSecret, { expiresIn: env.jwt.accessExpires } as jwt.SignOptions);

export const signRefreshToken = (payload: AccessPayload) =>
  jwt.sign(payload, env.jwt.refreshSecret, { expiresIn: env.jwt.refreshExpires } as jwt.SignOptions);

export const verifyAccessToken = (token: string) =>
  jwt.verify(token, env.jwt.accessSecret) as AccessPayload;

export const verifyRefreshToken = (token: string) =>
  jwt.verify(token, env.jwt.refreshSecret) as AccessPayload;
