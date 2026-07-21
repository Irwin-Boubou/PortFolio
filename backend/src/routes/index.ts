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
import * as content from '../controllers/content.controller';
import * as resume from '../controllers/resume.controller';
import {
  loginSchema, projectSchema, projectUpdateSchema, blogSchema, blogUpdateSchema,
  skillSchema, siteContentSchema, contactSchema, tagSchema,
  testimonialSchema, testimonialUpdateSchema, trustCompanySchema, trustCompanyUpdateSchema,
  processStepSchema, processStepUpdateSchema, pricingPackageSchema, pricingPackageUpdateSchema,
  awardSchema, awardUpdateSchema, faqItemSchema, faqItemUpdateSchema,
  experienceSchema, experienceUpdateSchema, educationSchema, educationUpdateSchema,
  certificationSchema, certificationUpdateSchema,
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
api.get('/dashboard/recent-messages', requireAuth, h(misc.recentMessages));
api.get('/dashboard/recent-activity', requireAuth, h(misc.recentActivity));

// ---- Testimonials ----
api.get('/testimonials', h(content.listTestimonials));
api.post('/testimonials', requireAuth, validateBody(testimonialSchema), h(content.createTestimonial));
api.patch('/testimonials/reorder', requireAuth, h(content.reorderTestimonials));
api.put('/testimonials/:id', requireAuth, validateBody(testimonialUpdateSchema), h(content.updateTestimonial));
api.delete('/testimonials/:id', requireAuth, h(content.deleteTestimonial));
api.patch('/testimonials/:id/featured', requireAuth, h(content.toggleTestimonialFeatured));

// ---- Trust companies / clients ----
api.get('/trust-companies', h(content.listTrustCompanies));
api.post('/trust-companies', requireAuth, validateBody(trustCompanySchema), h(content.createTrustCompany));
api.patch('/trust-companies/reorder', requireAuth, h(content.reorderTrustCompanies));
api.put('/trust-companies/:id', requireAuth, validateBody(trustCompanyUpdateSchema), h(content.updateTrustCompany));
api.delete('/trust-companies/:id', requireAuth, h(content.deleteTrustCompany));

// ---- Process steps ----
api.get('/process-steps', h(content.listProcessSteps));
api.post('/process-steps', requireAuth, validateBody(processStepSchema), h(content.createProcessStep));
api.patch('/process-steps/reorder', requireAuth, h(content.reorderProcessSteps));
api.put('/process-steps/:id', requireAuth, validateBody(processStepUpdateSchema), h(content.updateProcessStep));
api.delete('/process-steps/:id', requireAuth, h(content.deleteProcessStep));

// ---- Pricing packages ----
api.get('/pricing', h(content.listPricingPackages));
api.post('/pricing', requireAuth, validateBody(pricingPackageSchema), h(content.createPricingPackage));
api.patch('/pricing/reorder', requireAuth, h(content.reorderPricingPackages));
api.put('/pricing/:id', requireAuth, validateBody(pricingPackageUpdateSchema), h(content.updatePricingPackage));
api.delete('/pricing/:id', requireAuth, h(content.deletePricingPackage));

// ---- Awards ----
api.get('/awards', h(content.listAwards));
api.post('/awards', requireAuth, validateBody(awardSchema), h(content.createAward));
api.patch('/awards/reorder', requireAuth, h(content.reorderAwards));
api.put('/awards/:id', requireAuth, validateBody(awardUpdateSchema), h(content.updateAward));
api.delete('/awards/:id', requireAuth, h(content.deleteAward));

// ---- FAQ ----
api.get('/faq', h(content.listFaqItems));
api.post('/faq', requireAuth, validateBody(faqItemSchema), h(content.createFaqItem));
api.patch('/faq/reorder', requireAuth, h(content.reorderFaqItems));
api.put('/faq/:id', requireAuth, validateBody(faqItemUpdateSchema), h(content.updateFaqItem));
api.delete('/faq/:id', requireAuth, h(content.deleteFaqItem));

// ---- Resume: experience / education / certifications ----
api.get('/experience', h(resume.listExperience));
api.post('/experience', requireAuth, validateBody(experienceSchema), h(resume.createExperience));
api.put('/experience/:id', requireAuth, validateBody(experienceUpdateSchema), h(resume.updateExperience));
api.delete('/experience/:id', requireAuth, h(resume.deleteExperience));

api.get('/education', h(resume.listEducation));
api.post('/education', requireAuth, validateBody(educationSchema), h(resume.createEducation));
api.put('/education/:id', requireAuth, validateBody(educationUpdateSchema), h(resume.updateEducation));
api.delete('/education/:id', requireAuth, h(resume.deleteEducation));

api.get('/certifications', h(resume.listCertifications));
api.post('/certifications', requireAuth, validateBody(certificationSchema), h(resume.createCertification));
api.put('/certifications/:id', requireAuth, validateBody(certificationUpdateSchema), h(resume.updateCertification));
api.delete('/certifications/:id', requireAuth, h(resume.deleteCertification));
