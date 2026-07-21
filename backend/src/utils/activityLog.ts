import { prisma } from '../config/prisma';

/** Fire-and-forget admin activity log entry; never throws into the caller. */
export function logActivity(action: string, label: string): void {
  prisma.activityLog.create({ data: { action, label } }).catch((e) => console.error('[activityLog]', e));
}
