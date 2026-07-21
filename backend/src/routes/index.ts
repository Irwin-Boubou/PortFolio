import { Router } from 'express';
import multer from 'multer';
import { requireAuth } from '../middleware/auth';
import { loginLimiter, contactLimiter } from '../middleware/rateLimit';
import { validateBody } from '../middleware/validate';
import { asyncHandler as h } from '../utils/asyncHandler';
import * as auth from '../controllers/auth.controller';
import * as projects from '../controllers/projects.controller';
import * as blog from '../controllers/blog.controller';
import * as misc from '../controllers/misc.controller';
import * as media from '../controllers/media.controller';
import {
  loginSchema, projectSchema, projectUpdateSchema, blogSchema, blogUpdateSchema,
  skillSchema, siteContentSchema, contactSchema, tagSchema,
} from '../validators/schemas';

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });
export const api = Router();

/** Lets GET handlers know an admin is calling (to include drafts / lang=all). */
import { verifyAccessToken } from '../utils/jwt';
api.use((req, _res, next) => {
  const header = req.headers.authorization;
  if (header?.startsWith('Bearer ')) {
    try { req.admin = verifyAccessToken(header.slice(7)); } catch { /* treated as public */ }
  }
  next();
});

// ---- Auth ----
api.post('/auth/login', loginLimiter, validateBody(loginSchema), h(auth.login));
api.post('/auth/refresh', h(auth.refresh));
api.delete('/auth/logout', h(auth.logout));
api.get('/auth/me', requireAuth, h(auth.me));

// ---- Projects ----
api.get('/projects', h(projects.listProjects));
api.patch('/projects/reorder', requireAuth, h(projects.reorderProjects)); // before /:slug!
api.get('/projects/:slug', h(projects.getProject));
api.post('/projects', requireAuth, validateBody(projectSchema), h(projects.createProject));
api.put('/projects/:id', requireAuth, validateBody(projectUpdateSchema), h(projects.updateProject));
api.delete('/projects/:id', requireAuth, h(projects.deleteProject));
api.patch('/projects/:id/featured', requireAuth, h(projects.toggleFeatured));

// ---- Blog ----
api.get('/blog', h(blog.listPosts));
api.get('/blog/:slug', h(blog.getPost));
api.post('/blog', requireAuth, validateBody(blogSchema), h(blog.createPost));
api.put('/blog/:id', requireAuth, validateBody(blogUpdateSchema), h(blog.updatePost));
api.delete('/blog/:id', requireAuth, h(blog.deletePost));
api.patch('/blog/:id/publish', requireAuth, h(blog.togglePublish));

// ---- Skills ----
api.get('/skills', h(misc.listSkills));
api.post('/skills', requireAuth, validateBody(skillSchema), h(misc.createSkill));
api.put('/skills/:id', requireAuth, validateBody(skillSchema.partial()), h(misc.updateSkill));
api.delete('/skills/:id', requireAuth, h(misc.deleteSkill));

// ---- Site content ----
api.get('/site-content', h(misc.getSiteContent));
api.put('/site-content/:key', requireAuth, validateBody(siteContentSchema), h(misc.upsertSiteContent));

// ---- Tags ----
api.get('/tags', h(misc.listTags));
api.post('/tags', requireAuth, validateBody(tagSchema), h(misc.createTag));
api.delete('/tags/:id', requireAuth, h(misc.deleteTag));

// ---- Contact ----
api.post('/contact', contactLimiter, validateBody(contactSchema), h(misc.submitContact));
api.get('/contact/messages', requireAuth, h(misc.listMessages));
api.patch('/contact/:id/read', requireAuth, h(misc.markRead));
api.delete('/contact/:id', requireAuth, h(misc.deleteMessage));

// ---- Media ----
api.post('/media/upload', requireAuth, upload.single('file'), h(media.uploadImage));
api.get('/media', requireAuth, h(media.listAssets));
api.delete('/media/:publicId', requireAuth, h(media.deleteAsset));

// ---- Dashboard ----
api.get('/dashboard/stats', requireAuth, h(misc.dashboardStats));
