const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const p = new PrismaClient();

(async () => {
  const dump = {};
  dump.projects = await p.project.findMany({ include: { images: { orderBy: { order: 'asc' } }, tags: true }, orderBy: [{ order: 'asc' }] });
  dump.tags = await p.tag.findMany();
  dump.blogPosts = await p.blogPost.findMany({ include: { tags: true }, orderBy: { publishedAt: 'desc' } });
  dump.skills = await p.skill.findMany({ orderBy: [{ category: 'asc' }, { order: 'asc' }] });
  dump.testimonials = await p.testimonial.findMany({ orderBy: [{ order: 'asc' }] });
  dump.trustCompanies = await p.trustCompany.findMany({ orderBy: [{ order: 'asc' }] });
  dump.processSteps = await p.processStep.findMany({ orderBy: [{ order: 'asc' }] });
  dump.pricingPackages = await p.pricingPackage.findMany({ orderBy: [{ order: 'asc' }] });
  dump.awards = await p.award.findMany({ orderBy: [{ order: 'asc' }] });
  dump.faqItems = await p.faqItem.findMany({ orderBy: [{ order: 'asc' }] });
  dump.experience = await p.experience.findMany({ orderBy: [{ order: 'asc' }] });
  dump.education = await p.education.findMany({ orderBy: [{ order: 'asc' }] });
  dump.certifications = await p.certification.findMany({ orderBy: [{ order: 'asc' }] });
  dump.values = await p.value.findMany({ orderBy: [{ order: 'asc' }] });
  dump.galleryPhotos = await p.galleryPhoto.findMany({ orderBy: [{ order: 'asc' }] });
  const sc = await p.siteContent.findMany();
  dump.siteContent = Object.fromEntries(sc.map((r) => [r.key, r.value]));

  fs.writeFileSync('_dump.json', JSON.stringify(dump, null, 2));
  const counts = Object.fromEntries(Object.entries(dump).map(([k, v]) => [k, Array.isArray(v) ? v.length : Object.keys(v).length]));
  console.log('dumped:', JSON.stringify(counts));
  await p.$disconnect();
})();
