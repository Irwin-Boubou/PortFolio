/**
 * Seed script — creates the single admin user (from .env) and bilingual
 * starter content so the public site renders on first run.
 * Run: npm run prisma:seed
 */
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL ?? 'admin@example.com';
  const password = process.env.ADMIN_PASSWORD ?? 'ChangeMe!Strong#2026';
  const name = process.env.ADMIN_NAME ?? 'Admin';

  await prisma.admin.upsert({
    where: { email },
    update: {},
    create: { email, name, passwordHash: await bcrypt.hash(password, 12) },
  });
  console.log(`✔ Admin ready: ${email}`);

  // ---- bilingual homepage content ----
  const content: Array<{ key: string; value: unknown; type?: 'TEXT' | 'MARKDOWN' | 'JSON' | 'URL' }> = [
    {
      key: 'hero.name',
      value: { en: 'Your Name', fr: 'Votre Nom' },
    },
    {
      key: 'hero.taglines',
      type: 'JSON',
      value: {
        en: ['I engineer software.', 'I design experiences.', 'I build the web in 3D.'],
        fr: ["J'ingénie des logiciels.", 'Je conçois des expériences.', 'Je construis le web en 3D.'],
      },
    },
    {
      key: 'about.bio',
      type: 'MARKDOWN',
      value: {
        en: 'Computer engineer specializing in software engineering, full-stack development and graphic design. I build products where technical rigor meets visual ambition.',
        fr: "Ingénieur informatique spécialisé en génie logiciel, développement full-stack et design graphique. Je crée des produits où la rigueur technique rencontre l'ambition visuelle.",
      },
    },
    {
      key: 'about.stats',
      type: 'JSON',
      value: {
        en: [
          { label: 'Years of experience', value: 5 },
          { label: 'Projects shipped', value: 30 },
          { label: 'Technologies mastered', value: 20 },
        ],
        fr: [
          { label: "Années d'expérience", value: 5 },
          { label: 'Projets livrés', value: 30 },
          { label: 'Technologies maîtrisées', value: 20 },
        ],
      },
    },
  ];
  for (const c of content) {
    await prisma.siteContent.upsert({
      where: { key: c.key },
      update: { value: c.value as object },
      create: { key: c.key, value: c.value as object, type: (c.type ?? 'TEXT') as never },
    });
  }
  console.log('✔ Site content seeded');

  // ---- starter skills ----
  const skills = [
    { name: 'React', category: 'frontend', level: 92, order: 0 },
    { name: 'Next.js', category: 'frontend', level: 90, order: 1 },
    { name: 'TypeScript', category: 'frontend', level: 88, order: 2 },
    { name: 'Three.js / R3F', category: 'frontend', level: 80, order: 3 },
    { name: 'Node.js', category: 'backend', level: 88, order: 0 },
    { name: 'PostgreSQL', category: 'backend', level: 82, order: 1 },
    { name: 'Prisma', category: 'backend', level: 85, order: 2 },
    { name: 'Figma', category: 'design', level: 90, order: 0 },
    { name: 'Photoshop', category: 'design', level: 85, order: 1 },
    { name: 'Illustrator', category: 'design', level: 83, order: 2 },
    { name: 'Docker', category: 'tools', level: 75, order: 0 },
    { name: 'Git', category: 'tools', level: 90, order: 1 },
  ];
  if ((await prisma.skill.count()) === 0) {
    await prisma.skill.createMany({ data: skills });
    console.log('✔ Skills seeded');
  }
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
