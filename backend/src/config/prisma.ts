import { PrismaClient } from '@prisma/client';
/** Single shared Prisma client (avoids connection storms in dev hot-reload). */
export const prisma = new PrismaClient();
