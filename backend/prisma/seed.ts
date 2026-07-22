/**
 * Seed script — creates the single admin user (from .env) and bilingual
 * demo content so the public site renders fully on first run.
 * Run: npm run prisma:seed
 */
import { PrismaClient, ProjectCategory } from '@prisma/client';
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

  // ---- bilingual site content ----
  const content: Array<{ key: string; value: unknown; type?: 'TEXT' | 'MARKDOWN' | 'JSON' | 'URL' }> = [
    { key: 'hero.name', value: { en: 'Your Name', fr: 'Votre Nom' } },
    {
      key: 'hero.taglines',
      type: 'JSON',
      value: {
        en: ['I engineer software.', 'I design experiences.', 'I build the web in 3D.'],
        fr: ["J'ingénie des logiciels.", 'Je conçois des expériences.', 'Je construis le web en 3D.'],
      },
    },
    {
      key: 'hero.location',
      value: { en: 'Douala, Cameroon', fr: 'Douala, Cameroun' },
    },
    { key: 'hero.timezone', value: { en: 'Africa/Douala', fr: 'Africa/Douala' } },
    { key: 'availability.status', value: { en: 'available', fr: 'available' } },
    {
      key: 'availability.label',
      value: { en: 'Available for work', fr: 'Disponible pour travailler' },
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
          { value: 3, suffix: '+', label: 'Years of Experience' },
          { value: 40, suffix: '+', label: 'Projects Completed' },
          { value: 20, suffix: '+', label: 'Happy Clients' },
          { value: 10, suffix: '+', label: 'Technologies Mastered' },
        ],
        fr: [
          { value: 3, suffix: '+', label: "Années d'expérience" },
          { value: 40, suffix: '+', label: 'Projets réalisés' },
          { value: 20, suffix: '+', label: 'Clients satisfaits' },
          { value: 10, suffix: '+', label: 'Technologies maîtrisées' },
        ],
      },
    },
    {
      key: 'about.photoUrl',
      value: {
        en: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=800',
        fr: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=800',
      },
    },
    {
      key: 'hero.photoUrl',
      value: {
        en: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=800',
        fr: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=800',
      },
    },
    {
      key: 'contact.photoUrl',
      value: {
        en: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=800',
        fr: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=800',
      },
    },
    {
      key: 'about.intro',
      value: {
        en: "I'm a computer engineer who builds full-stack products and designs the interfaces that make them feel effortless. I care about clean code as much as clean typography.",
        fr: "Je suis ingénieur informatique, je construis des produits full-stack et je conçois les interfaces qui les rendent agréables à utiliser. J'accorde autant d'importance à un code propre qu'à une typographie soignée.",
      },
    },
    {
      key: 'about.bio.full',
      type: 'MARKDOWN',
      value: {
        en: "I grew up curious about how things work, which eventually turned into a decade-spanning obsession with computers, design, and the space where the two meet.\n\n## Where it started\n\nI studied computer engineering, but the real education happened outside the classroom — late nights breaking things, freelance projects that taught me more than any course, and a slow realization that I loved both sides of product building: the logic of the backend and the feel of the interface.\n\n## How I work today\n\nToday I split my time between full-stack development and product design, usually on the same project. I believe the best digital products come from people who understand both — where a technical constraint should shape a design decision, and where a design ambition should push an engineer to find a better way.\n\n## What matters to me\n\nI'm drawn to teams and clients who care about craft. Not perfection for its own sake, but the kind of attention to detail that users feel even if they can't name it.",
        fr: "J'ai grandi curieux de comprendre comment les choses fonctionnent, ce qui s'est transformé en une obsession de plus d'une décennie pour l'informatique, le design, et l'endroit où les deux se rencontrent.\n\n## Les débuts\n\nJ'ai étudié le génie informatique, mais la vraie formation s'est faite en dehors des salles de classe — des nuits à tout casser pour comprendre, des projets freelance qui m'ont appris plus qu'aucun cours, et une prise de conscience progressive : j'aimais les deux faces de la construction produit, la logique du backend et le ressenti de l'interface.\n\n## Comment je travaille aujourd'hui\n\nAujourd'hui, je partage mon temps entre développement full-stack et design produit, souvent sur le même projet. Je crois que les meilleurs produits numériques viennent de personnes qui comprennent les deux : là où une contrainte technique doit influencer une décision de design, et là où une ambition de design doit pousser un ingénieur à trouver une meilleure solution.\n\n## Ce qui compte pour moi\n\nJe suis attiré par les équipes et les clients qui accordent de l'importance au soin apporté au travail. Pas la perfection pour elle-même, mais ce niveau d'attention aux détails que les utilisateurs ressentent même sans pouvoir le nommer.",
      },
    },
    {
      key: 'about.interests',
      type: 'JSON',
      value: {
        en: [
          { icon: '🎵', label: 'Music production' },
          { icon: '📷', label: 'Photography' },
          { icon: '♟️', label: 'Chess' },
          { icon: '🏀', label: 'Basketball' },
        ],
        fr: [
          { icon: '🎵', label: 'Production musicale' },
          { icon: '📷', label: 'Photographie' },
          { icon: '♟️', label: 'Échecs' },
          { icon: '🏀', label: 'Basketball' },
        ],
      },
    },
    {
      key: 'about.currentlyLearning',
      value: {
        en: 'Deepening my knowledge of distributed systems and exploring generative 3D art with shaders.',
        fr: "J'approfondis mes connaissances en systèmes distribués et j'explore l'art génératif 3D avec des shaders.",
      },
    },
    {
      key: 'about.funFact',
      value: {
        en: "I once redesigned an entire app's UI overnight because I couldn't sleep until the spacing was right.",
        fr: "Une fois, j'ai refait toute l'UI d'une application en une nuit parce que je n'arrivais pas à dormir tant que les espacements n'étaient pas parfaits.",
      },
    },
    {
      key: 'about.languages',
      type: 'JSON',
      value: {
        en: [
          { name: 'French', level: 'Native' },
          { name: 'English', level: 'Fluent' },
        ],
        fr: [
          { name: 'Français', level: 'Langue maternelle' },
          { name: 'Anglais', level: 'Courant' },
        ],
      },
    },
    {
      key: 'about.cta.subtitle',
      value: {
        en: "Let's turn your idea into something people love using.",
        fr: 'Transformons votre idée en quelque chose que les gens adoreront utiliser.',
      },
    },
    {
      key: 'cv.url',
      type: 'URL',
      value: { en: 'https://example.com/cv-en.pdf', fr: 'https://example.com/cv-fr.pdf' },
    },
    {
      key: 'social.github',
      type: 'URL',
      value: { en: 'https://github.com/yourname', fr: 'https://github.com/yourname' },
    },
    {
      key: 'social.linkedin',
      type: 'URL',
      value: { en: 'https://linkedin.com/in/yourname', fr: 'https://linkedin.com/in/yourname' },
    },
    {
      key: 'social.dribbble',
      type: 'URL',
      value: { en: 'https://dribbble.com/yourname', fr: 'https://dribbble.com/yourname' },
    },
    {
      key: 'social.behance',
      type: 'URL',
      value: { en: 'https://behance.net/yourname', fr: 'https://behance.net/yourname' },
    },
    {
      key: 'social.instagram',
      type: 'URL',
      value: { en: 'https://instagram.com/yourname', fr: 'https://instagram.com/yourname' },
    },
    {
      key: 'social.twitter',
      type: 'URL',
      value: { en: 'https://x.com/yourname', fr: 'https://x.com/yourname' },
    },
    {
      key: 'social.youtube',
      type: 'URL',
      value: { en: 'https://youtube.com/@yourname', fr: 'https://youtube.com/@yourname' },
    },
    {
      key: 'booking.url',
      type: 'URL',
      value: { en: 'https://cal.com/yourname/30min', fr: 'https://cal.com/yourname/30min' },
    },
    { key: 'booking.label', value: { en: 'Book a call', fr: 'Réserver un appel' } },
    { key: 'booking.enabled', type: 'JSON', value: { en: true, fr: true } },
    {
      key: 'marquee.text',
      value: { en: "Let's work together", fr: 'Travaillons ensemble' },
    },
    // ---- homepage section headings/subtitles/CTA labels (admin-first rule: every
    // piece of visible copy must be editable from /admin/site-content without a deploy) ----
    { key: 'about.sectionTitle', value: { en: 'About me', fr: 'À propos' } },
    { key: 'services.title', value: { en: 'What I do', fr: 'Ce que je fais' } },
    { key: 'work.featuredTitle', value: { en: 'Selected work', fr: 'Projets sélectionnés' } },
    { key: 'skills.title', value: { en: 'My expertise', fr: 'Mon expertise' } },
    { key: 'skills.subtitle', value: { en: 'The tools I wield', fr: 'Les outils que je maîtrise' } },
    { key: 'testimonials.title', value: { en: 'What People Say', fr: "Ce qu'ils disent" } },
    { key: 'testimonials.subtitle', value: { en: "Feedback from people I've worked with", fr: "Retours des personnes avec qui j'ai travaillé" } },
    { key: 'clients.title', value: { en: 'Trusted By', fr: 'Ils me font confiance' } },
    { key: 'clients.subtitle', value: { en: 'Companies and partners I have worked with', fr: "Entreprises et partenaires avec qui j'ai collaboré" } },
    { key: 'process.title', value: { en: 'How I Work', fr: 'Ma façon de travailler' } },
    { key: 'process.subtitle', value: { en: 'A clear, collaborative process from idea to launch', fr: "Un processus clair et collaboratif, de l'idée au lancement" } },
    { key: 'pricing.title', value: { en: 'Packages & Pricing', fr: 'Offres & Tarifs' } },
    { key: 'pricing.subtitle', value: { en: 'Straightforward pricing for every stage', fr: 'Des tarifs simples à chaque étape' } },
    { key: 'awards.title', value: { en: 'Awards & Recognition', fr: 'Récompenses & Distinctions' } },
    { key: 'awards.subtitle', value: { en: 'Recognition from the design & dev community', fr: 'Reconnaissance de la communauté design & dev' } },
    { key: 'faq.title', value: { en: 'Frequently Asked Questions', fr: 'Questions Fréquentes' } },
    { key: 'faq.subtitle', value: { en: 'Answers to common questions', fr: 'Réponses aux questions courantes' } },
    { key: 'contactCta.title', value: { en: 'Have a project in mind?', fr: 'Un projet en tête ?' } },
    { key: 'contactCta.subtitle', value: { en: "Let's build something people will remember.", fr: 'Construisons quelque chose de mémorable.' } },
    { key: 'contactCta.primary', value: { en: 'Get in touch', fr: 'Me contacter' } },
    { key: 'contactCta.secondary', value: { en: 'View my work', fr: 'Voir mes projets' } },
    { key: 'hero.ctaLabel', value: { en: 'Explore my work', fr: 'Découvrir mes projets' } },
  ];
  for (const c of content) {
    await prisma.siteContent.upsert({
      where: { key: c.key },
      update: { value: c.value as object },
      create: { key: c.key, value: c.value as object, type: c.type ?? 'TEXT' },
    });
  }
  console.log('✔ Site content seeded');

  // ---- skills / tools ----
  const icon = (slug: string) => `https://cdn.simpleicons.org/${slug}`;
  const skills: Array<{
    name: string; category: string; level: number; order: number;
    iconUrl?: string; brandColor?: string; featured?: boolean;
    description?: { en: string; fr: string };
  }> = [
    // Frontend
    { name: 'React', category: 'frontend', level: 92, order: 0, iconUrl: icon('react'), brandColor: '#61DAFB', featured: true, description: { en: 'My default UI library for building fast, component-driven interfaces.', fr: 'Ma bibliothèque UI par défaut pour construire des interfaces rapides et basées sur des composants.' } },
    { name: 'Next.js', category: 'frontend', level: 90, order: 1, iconUrl: icon('nextdotjs'), brandColor: '#000000', featured: true, description: { en: 'The App Router, ISR, and server components power every production site I ship.', fr: "L'App Router, l'ISR et les server components propulsent chaque site que je livre en production." } },
    { name: 'React Native', category: 'frontend', level: 78, order: 2, iconUrl: icon('react'), brandColor: '#61DAFB', description: { en: 'Used for cross-platform mobile apps sharing logic with the web codebase.', fr: 'Utilisé pour des applications mobiles multiplateformes partageant la logique avec le code web.' } },
    { name: 'HTML5', category: 'frontend', level: 96, order: 3, iconUrl: icon('html5'), brandColor: '#E34F26', description: { en: 'Semantic, accessible markup is the foundation of every page I build.', fr: 'Un balisage sémantique et accessible est la base de chaque page que je construis.' } },
    { name: 'CSS3', category: 'frontend', level: 94, order: 4, iconUrl: icon('css3'), brandColor: '#1572B6', description: { en: 'Modern layout (Grid, Flexbox) and animation without reaching for a framework.', fr: 'Mise en page moderne (Grid, Flexbox) et animation sans nécessairement recourir à un framework.' } },
    { name: 'JavaScript', category: 'frontend', level: 93, order: 5, iconUrl: icon('javascript'), brandColor: '#F7DF1E', description: { en: 'A decade of daily use — the language every other frontend tool sits on top of.', fr: "Une décennie d'usage quotidien — le langage sur lequel repose chaque autre outil frontend." } },
    { name: 'TypeScript', category: 'frontend', level: 88, order: 6, iconUrl: icon('typescript'), brandColor: '#3178C6', featured: true, description: { en: 'Strict typing across the whole stack catches bugs before they ship.', fr: 'Un typage strict sur toute la stack attrape les bugs avant qu\'ils ne partent en production.' } },
    { name: 'Tailwind CSS', category: 'frontend', level: 91, order: 7, iconUrl: icon('tailwindcss'), brandColor: '#06B6D4', description: { en: 'My design-system-in-CSS of choice for every project, including this one.', fr: "Mon design system en CSS de choix pour chaque projet, y compris celui-ci." } },
    { name: 'Framer Motion', category: 'frontend', level: 84, order: 8, iconUrl: icon('framer'), brandColor: '#0055FF', description: { en: 'Scroll-triggered reveals and micro-interactions across this entire site.', fr: "Des animations au scroll et des micro-interactions sur tout ce site." } },
    { name: 'Three.js / R3F', category: 'frontend', level: 80, order: 9, description: { en: 'Powers the 3D hero scene and skills orb on this portfolio.', fr: 'Alimente la scène héro 3D et l\'orbe de compétences de ce portfolio.' } },

    // Backend
    { name: 'Node.js', category: 'backend', level: 88, order: 0, iconUrl: icon('nodedotjs'), brandColor: '#339933', featured: true, description: { en: 'Runtime of choice for every API I build — fast to iterate, huge ecosystem.', fr: "Runtime de choix pour chaque API que je construis — rapide à itérer, écosystème immense." } },
    { name: 'Express.js', category: 'backend', level: 87, order: 1, iconUrl: icon('express'), brandColor: '#000000', description: { en: 'Minimal, unopinionated — exactly what a REST API needs.', fr: 'Minimaliste et non-dogmatique — exactement ce dont une API REST a besoin.' } },
    { name: 'Laravel', category: 'backend', level: 74, order: 2, iconUrl: icon('laravel'), brandColor: '#FF2D20', description: { en: 'My go-to for PHP projects needing rapid, convention-driven scaffolding.', fr: 'Mon choix pour les projets PHP nécessitant un scaffolding rapide et conventionnel.' } },
    { name: 'Prisma ORM', category: 'backend', level: 85, order: 3, iconUrl: icon('prisma'), brandColor: '#2D3748', description: { en: 'Type-safe database access — this entire site\'s backend runs on it.', fr: 'Accès base de données typé — le backend de ce site entier tourne dessus.' } },
    { name: 'PostgreSQL', category: 'backend', level: 82, order: 4, iconUrl: icon('postgresql'), brandColor: '#4169E1', description: { en: 'My default relational database for anything beyond a prototype.', fr: 'Ma base de données relationnelle par défaut au-delà du simple prototype.' } },
    { name: 'REST API design', category: 'backend', level: 89, order: 5, brandColor: '#6C63FF', description: { en: 'Resource-oriented, versioned, predictable — the API style behind every project.', fr: 'Orientée ressources, versionnée, prévisible — le style d\'API derrière chaque projet.' } },

    // Design
    { name: 'Figma', category: 'design', level: 90, order: 0, iconUrl: icon('figma'), brandColor: '#F24E1E', featured: true, description: { en: 'Where every interface starts — wireframes, prototypes, and full design systems.', fr: 'Là où chaque interface commence — wireframes, prototypes et design systems complets.' } },
    { name: 'Adobe Photoshop', category: 'design', level: 85, order: 1, iconUrl: icon('adobephotoshop'), brandColor: '#31A8FF', description: { en: 'Photo retouching and raster compositing for brand and marketing assets.', fr: 'Retouche photo et compositing raster pour les assets de marque et marketing.' } },
    { name: 'Adobe Illustrator', category: 'design', level: 83, order: 2, iconUrl: icon('adobeillustrator'), brandColor: '#FF9A00', description: { en: 'Vector logos, icon sets, and print-ready illustration work.', fr: 'Logos vectoriels, jeux d\'icônes et illustrations prêtes pour l\'impression.' } },
    { name: 'Adobe XD', category: 'design', level: 76, order: 3, iconUrl: icon('adobexd'), brandColor: '#FF61F6', description: { en: 'Occasional use for quick clickable prototypes shared with clients.', fr: 'Usage occasionnel pour des prototypes cliquables rapides partagés avec les clients.' } },

    // AI
    { name: 'Claude', category: 'ai', level: 93, order: 0, iconUrl: icon('anthropic'), brandColor: '#D97757', featured: true, description: { en: 'My daily pair-programmer for architecture, refactors, and writing.', fr: 'Mon binôme de programmation quotidien pour l\'architecture, les refactors et la rédaction.' } },
    { name: 'ChatGPT', category: 'ai', level: 85, order: 1, iconUrl: icon('openai'), brandColor: '#412991', description: { en: 'Quick research, brainstorming, and second opinions on tricky problems.', fr: 'Recherche rapide, brainstorming et second avis sur des problèmes complexes.' } },
    { name: 'GitHub Copilot', category: 'ai', level: 82, order: 2, iconUrl: icon('githubcopilot'), brandColor: '#000000', description: { en: 'In-editor autocomplete for boilerplate so I focus on the interesting parts.', fr: 'Autocomplétion dans l\'éditeur pour le code répétitif afin de me concentrer sur l\'essentiel.' } },
    { name: 'Gemini', category: 'ai', level: 74, order: 3, iconUrl: icon('googlegemini'), brandColor: '#8E75B2', description: { en: 'Occasional use for multimodal tasks and quick Google-ecosystem integrations.', fr: 'Usage occasionnel pour les tâches multimodales et les intégrations rapides à l\'écosystème Google.' } },

    // Other tools
    { name: 'Git & GitHub', category: 'tools', level: 90, order: 0, iconUrl: icon('github'), brandColor: '#181717', featured: true, description: { en: 'Version control and collaboration for every single project I touch.', fr: 'Contrôle de version et collaboration pour chaque projet que je touche.' } },
    { name: 'VS Code', category: 'tools', level: 95, order: 1, iconUrl: icon('visualstudiocode'), brandColor: '#007ACC', description: { en: 'My editor of choice, tuned with a decade of extensions and shortcuts.', fr: "Mon éditeur de choix, ajusté avec une décennie d'extensions et de raccourcis." } },
    { name: 'Docker', category: 'tools', level: 75, order: 2, iconUrl: icon('docker'), brandColor: '#2496ED', description: { en: 'Consistent dev/prod environments for the backend services I ship.', fr: 'Environnements dev/prod cohérents pour les services backend que je livre.' } },
    { name: 'Postman', category: 'tools', level: 88, order: 3, iconUrl: icon('postman'), brandColor: '#FF6C37', description: { en: 'API testing and documentation while building every REST endpoint.', fr: 'Test et documentation d\'API lors de la construction de chaque endpoint REST.' } },
    { name: 'Cloudinary', category: 'tools', level: 80, order: 4, iconUrl: icon('cloudinary'), brandColor: '#3448C5', description: { en: 'Image hosting, transforms, and optimization for every media asset here.', fr: 'Hébergement, transformations et optimisation d\'images pour chaque média ici.' } },
  ];
  if ((await prisma.skill.count()) === 0) {
    await prisma.skill.createMany({ data: skills });
    console.log('✔ Skills seeded');
  }

  // ---- tags ----
  const tagDefs = [
    { slug: 'nextjs', name: { en: 'Next.js', fr: 'Next.js' } },
    { slug: 'react', name: { en: 'React', fr: 'React' } },
    { slug: 'typescript', name: { en: 'TypeScript', fr: 'TypeScript' } },
    { slug: 'threejs', name: { en: 'Three.js', fr: 'Three.js' } },
    { slug: 'branding', name: { en: 'Branding', fr: 'Identité de marque' } },
    { slug: 'ui-ux', name: { en: 'UI/UX', fr: 'UI/UX' } },
    { slug: 'mobile', name: { en: 'Mobile', fr: 'Mobile' } },
    { slug: 'e-commerce', name: { en: 'E-commerce', fr: 'E-commerce' } },
  ];
  const tags: Record<string, { id: string }> = {};
  for (const t of tagDefs) {
    tags[t.slug] = await prisma.tag.upsert({
      where: { slug: t.slug },
      update: { name: t.name },
      create: { slug: t.slug, name: t.name },
    });
  }
  console.log('✔ Tags seeded');

  // ---- projects: 4 development + 4 design ----
  type ProjectSeed = {
    slug: string;
    category: ProjectCategory;
    title: { en: string; fr: string };
    subtitle: { en: string; fr: string };
    description: { en: string; fr: string };
    role: { en: string; fr: string };
    designProcess?: { en: string; fr: string };
    tools: string[];
    techStack: string[];
    thumbnailUrl: string;
    liveUrl?: string;
    githubUrl?: string;
    behanceUrl?: string;
    tagSlugs: string[];
    featured: boolean;
    order: number;
  };

  const devProjects: ProjectSeed[] = [
    {
      slug: 'nova-commerce',
      category: 'DEVELOPMENT',
      title: { en: 'Nova Commerce', fr: 'Nova Commerce' },
      subtitle: { en: 'Headless e-commerce platform', fr: 'Plateforme e-commerce headless' },
      description: {
        en: 'A headless e-commerce storefront built with Next.js and Stripe, featuring server-rendered product pages, an animated cart, and a custom admin dashboard for inventory management.',
        fr: "Une boutique e-commerce headless construite avec Next.js et Stripe, avec des pages produits rendues côté serveur, un panier animé et un tableau de bord admin sur mesure pour la gestion des stocks.",
      },
      role: { en: 'Full-stack developer', fr: 'Développeur full-stack' },
      tools: ['VS Code', 'Figma', 'Postman'],
      techStack: ['Next.js', 'TypeScript', 'Prisma', 'Stripe', 'PostgreSQL'],
      thumbnailUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200',
      liveUrl: 'https://example.com/nova-commerce',
      githubUrl: 'https://github.com/example/nova-commerce',
      tagSlugs: ['nextjs', 'typescript', 'e-commerce'],
      featured: true,
      order: 0,
    },
    {
      slug: 'orbit-analytics',
      category: 'DEVELOPMENT',
      title: { en: 'Orbit Analytics', fr: 'Orbit Analytics' },
      subtitle: { en: 'Real-time SaaS dashboard', fr: 'Tableau de bord SaaS en temps réel' },
      description: {
        en: 'A multi-tenant analytics dashboard streaming live metrics over WebSockets, with customizable charts, role-based access, and a dark-mode-first design system.',
        fr: "Un tableau de bord analytique multi-tenant diffusant des métriques en direct via WebSockets, avec des graphiques personnalisables, un contrôle d'accès par rôle et un design system pensé pour le mode sombre.",
      },
      role: { en: 'Lead developer', fr: 'Développeur principal' },
      tools: ['VS Code', 'Linear', 'Figma'],
      techStack: ['React', 'Node.js', 'Socket.io', 'Redis', 'PostgreSQL'],
      thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200',
      liveUrl: 'https://example.com/orbit-analytics',
      githubUrl: 'https://github.com/example/orbit-analytics',
      tagSlugs: ['react', 'typescript'],
      featured: true,
      order: 1,
    },
    {
      slug: 'pulse-fitness-app',
      category: 'DEVELOPMENT',
      title: { en: 'Pulse Fitness', fr: 'Pulse Fitness' },
      subtitle: { en: 'Cross-platform workout tracker', fr: 'Suivi sportif multiplateforme' },
      description: {
        en: 'A React Native fitness tracking app with offline-first sync, workout plan builder, and social progress sharing, backed by a Node.js API.',
        fr: "Une application de suivi sportif en React Native avec synchronisation offline-first, générateur de plans d'entraînement et partage social des progrès, alimentée par une API Node.js.",
      },
      role: { en: 'Mobile developer', fr: 'Développeur mobile' },
      tools: ['Expo', 'Figma'],
      techStack: ['React Native', 'TypeScript', 'Node.js', 'SQLite'],
      thumbnailUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200',
      githubUrl: 'https://github.com/example/pulse-fitness',
      tagSlugs: ['react', 'mobile', 'typescript'],
      featured: false,
      order: 2,
    },
    {
      slug: 'aether-3d-portfolio',
      category: 'DEVELOPMENT',
      title: { en: 'Aether 3D Engine', fr: 'Aether 3D Engine' },
      subtitle: { en: 'Interactive WebGL experience', fr: 'Expérience WebGL interactive' },
      description: {
        en: 'An interactive 3D particle system and scene composer built with React Three Fiber, used as the visual engine behind several client portfolio sites.',
        fr: "Un système de particules 3D interactif et un compositeur de scènes construit avec React Three Fiber, utilisé comme moteur visuel pour plusieurs portfolios clients.",
      },
      role: { en: 'Creative developer', fr: 'Développeur créatif' },
      tools: ['Blender', 'VS Code'],
      techStack: ['Three.js', 'React Three Fiber', 'TypeScript', 'GLSL'],
      thumbnailUrl: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=1200',
      githubUrl: 'https://github.com/example/aether-3d',
      tagSlugs: ['threejs', 'react', 'typescript'],
      featured: false,
      order: 3,
    },
  ];

  const designProjects: ProjectSeed[] = [
    {
      slug: 'solace-brand-identity',
      category: 'DESIGN',
      title: { en: 'Solace Brand Identity', fr: 'Identité de marque Solace' },
      subtitle: { en: 'Wellness brand system', fr: 'Système de marque bien-être' },
      description: {
        en: 'A complete brand identity for a meditation and wellness startup: logo system, typography, color palette, and packaging design rooted in calm minimalism.',
        fr: "Une identité de marque complète pour une startup de méditation et bien-être : système de logo, typographie, palette de couleurs et packaging ancrés dans un minimalisme apaisant.",
      },
      role: { en: 'Brand designer', fr: 'Designer de marque' },
      designProcess: {
        en: 'Started with mood boards and competitor audits, iterated on 12 logo concepts, then built a full system of guidelines covering print, digital, and packaging applications.',
        fr: "Démarré avec des planches d'ambiance et un audit concurrentiel, itéré sur 12 concepts de logo, puis construit un système complet de guidelines couvrant le print, le digital et le packaging.",
      },
      tools: ['Figma', 'Illustrator', 'Photoshop'],
      techStack: [],
      thumbnailUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1200',
      behanceUrl: 'https://behance.net/example/solace',
      tagSlugs: ['branding', 'ui-ux'],
      featured: true,
      order: 0,
    },
    {
      slug: 'meridian-banking-app',
      category: 'DESIGN',
      title: { en: 'Meridian Banking App', fr: 'Application bancaire Meridian' },
      subtitle: { en: 'Mobile banking UX redesign', fr: 'Refonte UX bancaire mobile' },
      description: {
        en: 'A full UX/UI redesign of a mobile banking app, focused on simplifying transfers and improving accessibility for users with low vision.',
        fr: "Une refonte complète UX/UI d'une application bancaire mobile, axée sur la simplification des virements et l'amélioration de l'accessibilité pour les utilisateurs malvoyants.",
      },
      role: { en: 'Product designer', fr: 'Designer produit' },
      designProcess: {
        en: 'Conducted user interviews, mapped the existing flow, ran two rounds of usability testing on Figma prototypes, and delivered a full component library in Figma.',
        fr: "Mené des entretiens utilisateurs, cartographié le flux existant, effectué deux rounds de tests d'utilisabilité sur des prototypes Figma, et livré une bibliothèque de composants complète.",
      },
      tools: ['Figma', 'Maze', 'Notion'],
      techStack: [],
      thumbnailUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200',
      behanceUrl: 'https://behance.net/example/meridian',
      tagSlugs: ['ui-ux', 'mobile'],
      featured: true,
      order: 1,
    },
    {
      slug: 'lumen-editorial-layout',
      category: 'DESIGN',
      title: { en: 'Lumen Editorial', fr: 'Lumen Éditorial' },
      subtitle: { en: 'Digital magazine layout system', fr: 'Système de mise en page magazine' },
      description: {
        en: 'An editorial layout and typography system for a digital design magazine, balancing dense long-form content with striking full-bleed imagery.',
        fr: "Un système de mise en page éditoriale et de typographie pour un magazine de design numérique, équilibrant du contenu long format avec des visuels pleine page percutants.",
      },
      role: { en: 'Editorial designer', fr: 'Designer éditorial' },
      tools: ['Figma', 'InDesign'],
      techStack: [],
      thumbnailUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200',
      behanceUrl: 'https://behance.net/example/lumen',
      tagSlugs: ['ui-ux', 'branding'],
      featured: false,
      order: 2,
    },
    {
      slug: 'atlas-travel-app-concept',
      category: 'DESIGN',
      title: { en: 'Atlas Travel Concept', fr: 'Concept Atlas Voyage' },
      subtitle: { en: 'Travel planning app concept', fr: "Concept d'application de voyage" },
      description: {
        en: 'A speculative concept app for collaborative trip planning, exploring bold gradients, illustrated iconography, and a playful onboarding flow.',
        fr: "Une application concept spéculative pour la planification collaborative de voyages, explorant des dégradés audacieux, une iconographie illustrée et un onboarding ludique.",
      },
      role: { en: 'UI designer', fr: 'Designer UI' },
      tools: ['Figma', 'Procreate'],
      techStack: [],
      thumbnailUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200',
      behanceUrl: 'https://behance.net/example/atlas',
      tagSlugs: ['ui-ux', 'mobile'],
      featured: false,
      order: 3,
    },
  ];

  for (const p of [...devProjects, ...designProjects]) {
    const { tagSlugs, ...rest } = p;
    await prisma.project.upsert({
      where: { slug: p.slug },
      update: {
        ...rest,
        published: true,
        publishedAt: new Date(),
        tags: { set: tagSlugs.map((s) => ({ id: tags[s].id })) },
      },
      create: {
        ...rest,
        published: true,
        publishedAt: new Date(),
        tags: { connect: tagSlugs.map((s) => ({ id: tags[s].id })) },
      },
    });
  }
  console.log('✔ Projects seeded (4 development + 4 design)');

  // ---- blog posts ----
  const posts = [
    {
      slug: 'building-a-3d-portfolio-with-react-three-fiber',
      title: {
        en: 'Building a 3D Portfolio with React Three Fiber',
        fr: 'Construire un portfolio 3D avec React Three Fiber',
      },
      excerpt: {
        en: 'A walkthrough of the WebGL techniques, performance tradeoffs, and fallback strategies behind this site’s hero scene.',
        fr: 'Un tour d’horizon des techniques WebGL, des compromis de performance et des stratégies de repli derrière la scène héro de ce site.',
      },
      content: {
        en: '# Building a 3D Portfolio\n\nReact Three Fiber lets you describe a WebGL scene declaratively as React components. In this post I cover instanced particles, camera easing, and graceful degradation when WebGL context is lost.\n\n## Performance\n\nKeep draw calls low with instancing and dispose of geometries on unmount.\n\n## Fallback\n\nAlways provide a static image fallback for devices without WebGL support.',
        fr: '# Construire un portfolio 3D\n\nReact Three Fiber permet de décrire une scène WebGL de manière déclarative avec des composants React. Dans cet article, je couvre les particules instanciées, l’adoucissement de caméra et la dégradation progressive en cas de perte de contexte WebGL.\n\n## Performance\n\nGardez peu d’appels de rendu grâce à l’instanciation et libérez les géométries au démontage.\n\n## Repli\n\nProposez toujours une image statique de secours pour les appareils sans support WebGL.',
      },
      coverUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200',
      tagSlugs: ['threejs', 'react'],
    },
    {
      slug: 'designing-bilingual-interfaces-that-dont-break',
      title: {
        en: "Designing Bilingual Interfaces That Don't Break",
        fr: 'Concevoir des interfaces bilingues qui ne se cassent pas',
      },
      excerpt: {
        en: 'French strings run 15-20% longer than English. Here’s how to design layouts that survive the swap.',
        fr: 'Les chaînes françaises sont 15 à 20% plus longues que l’anglais. Voici comment concevoir des mises en page qui survivent au changement.',
      },
      content: {
        en: '# Bilingual UI\n\nWhen designing for EN/FR, avoid fixed-width buttons and single-line truncation for critical actions. Test every layout in your longest language first.',
        fr: '# UI bilingue\n\nLors de la conception pour EN/FR, évitez les boutons à largeur fixe et la troncature sur une seule ligne pour les actions critiques. Testez chaque mise en page d’abord dans votre langue la plus longue.',
      },
      coverUrl: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=1200',
      tagSlugs: ['ui-ux'],
    },
    {
      slug: 'prisma-json-fields-for-multilingual-content',
      title: {
        en: 'Using Prisma JSON Fields for Multilingual Content',
        fr: 'Utiliser les champs JSON de Prisma pour du contenu multilingue',
      },
      excerpt: {
        en: 'Why storing { en, fr } locale maps in Postgres JSON columns beats a separate translations table for a small bilingual site.',
        fr: 'Pourquoi stocker des cartes de locale { en, fr } dans des colonnes JSON Postgres bat une table de traductions séparée pour un petit site bilingue.',
      },
      content: {
        en: '# Prisma JSON Fields\n\nFor a two-language site, a `Json` column shaped `{ en, fr }` is simpler to query and update atomically than a normalized translations table, at the cost of some type safety you can recover with Zod.',
        fr: '# Champs JSON Prisma\n\nPour un site à deux langues, une colonne `Json` de forme `{ en, fr }` est plus simple à interroger et à mettre à jour de façon atomique qu’une table de traductions normalisée, au prix d’une certaine sécurité de type que l’on peut récupérer avec Zod.',
      },
      coverUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200',
      tagSlugs: ['typescript'],
    },
  ];

  for (const post of posts) {
    const { tagSlugs, ...rest } = post;
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {
        ...rest,
        published: true,
        publishedAt: new Date(),
        readingTime: Math.max(1, Math.round(rest.content.en.split(/\s+/).length / 200)),
        tags: { set: tagSlugs.map((s) => ({ id: tags[s].id })) },
      },
      create: {
        ...rest,
        published: true,
        publishedAt: new Date(),
        readingTime: Math.max(1, Math.round(rest.content.en.split(/\s+/).length / 200)),
        tags: { connect: tagSlugs.map((s) => ({ id: tags[s].id })) },
      },
    });
  }
  console.log('✔ Blog posts seeded (3)');

  // ---- testimonials ----
  if ((await prisma.testimonial.count()) === 0) {
    await prisma.testimonial.createMany({
      data: [
        {
          name: { en: 'Sarah Chen', fr: 'Sarah Chen' },
          role: { en: 'Product Manager', fr: 'Cheffe de produit' },
          company: 'Nova Labs',
          content: {
            en: 'Working together was a revelation — technical precision paired with real design taste. Our launch metrics beat every projection.',
            fr: "Travailler ensemble a été une révélation — précision technique alliée à un vrai goût du design. Nos indicateurs de lancement ont dépassé toutes les projections.",
          },
          rating: 5, featured: true, published: true, order: 0,
        },
        {
          name: { en: 'Marc Dubois', fr: 'Marc Dubois' },
          role: { en: 'CTO', fr: 'CTO' },
          company: 'Orbit Analytics',
          content: {
            en: 'Rare to find someone equally comfortable in Figma and in a Postgres migration. Delivered ahead of schedule, no shortcuts.',
            fr: "Rare de trouver quelqu'un aussi à l'aise dans Figma que dans une migration Postgres. Livré en avance, sans raccourcis.",
          },
          rating: 5, featured: true, published: true, order: 1,
        },
        {
          name: { en: 'Amara Okafor', fr: 'Amara Okafor' },
          role: { en: 'Founder', fr: 'Fondatrice' },
          company: 'Pulse Fitness',
          content: {
            en: 'Turned a vague idea into a polished cross-platform app. Communication was excellent throughout.',
            fr: "A transformé une idée vague en une application multiplateforme soignée. Communication excellente du début à la fin.",
          },
          rating: 4, featured: false, published: true, order: 2,
        },
        {
          name: { en: 'Julien Marchand', fr: 'Julien Marchand' },
          role: { en: 'Creative Director', fr: 'Directeur créatif' },
          company: 'Lumen Studio',
          content: {
            en: 'The editorial system shipped is still the backbone of our publication two years later.',
            fr: "Le système éditorial livré est toujours l'ossature de notre publication deux ans plus tard.",
          },
          rating: 5, featured: false, published: true, order: 3,
        },
      ],
    });
    console.log('✔ Testimonials seeded');
  }

  // ---- trust companies ----
  if ((await prisma.trustCompany.count()) === 0) {
    await prisma.trustCompany.createMany({
      data: [
        { name: 'Nova Labs', logoUrl: 'https://placehold.co/240x80/transparent/8888aa?text=Nova+Labs&font=montserrat', websiteUrl: 'https://example.com/nova', category: 'client', published: true, order: 0 },
        { name: 'Orbit Analytics', logoUrl: 'https://placehold.co/240x80/transparent/8888aa?text=Orbit+Analytics&font=montserrat', websiteUrl: 'https://example.com/orbit', category: 'client', published: true, order: 1 },
        { name: 'Pulse Fitness', logoUrl: 'https://placehold.co/240x80/transparent/8888aa?text=Pulse+Fitness&font=montserrat', websiteUrl: 'https://example.com/pulse', category: 'client', published: true, order: 2 },
        { name: 'Lumen Studio', logoUrl: 'https://placehold.co/240x80/transparent/8888aa?text=Lumen+Studio&font=montserrat', websiteUrl: 'https://example.com/lumen', category: 'partner', published: true, order: 3 },
        { name: 'Meridian Bank', logoUrl: 'https://placehold.co/240x80/transparent/8888aa?text=Meridian+Bank&font=montserrat', websiteUrl: 'https://example.com/meridian', category: 'client', published: true, order: 4 },
        { name: 'Aether Studio', logoUrl: 'https://placehold.co/240x80/transparent/8888aa?text=Aether+Studio&font=montserrat', websiteUrl: 'https://example.com/aether', category: 'partner', published: true, order: 5 },
        { name: 'Prevtech Inc.', logoUrl: 'https://placehold.co/240x80/transparent/8888aa?text=Prevtech+Inc.&font=montserrat', websiteUrl: 'https://example.com/prevtech', category: 'worked-at', published: true, order: 6 },
      ],
    });
    console.log('✔ Trust companies seeded');
  }

  // ---- process steps ----
  if ((await prisma.processStep.count()) === 0) {
    await prisma.processStep.createMany({
      data: [
        { stepNumber: 1, icon: '🔍', order: 0, title: { en: 'Discovery', fr: 'Découverte' }, description: { en: 'Understand goals, users, and constraints before writing a line of code.', fr: 'Comprendre les objectifs, les utilisateurs et les contraintes avant la moindre ligne de code.' } },
        { stepNumber: 2, icon: '🧭', order: 1, title: { en: 'Strategy', fr: 'Stratégie' }, description: { en: 'Define scope, architecture, and success metrics.', fr: 'Définir le périmètre, l’architecture et les indicateurs de succès.' } },
        { stepNumber: 3, icon: '✏️', order: 2, title: { en: 'Design', fr: 'Design' }, description: { en: 'Wireframes and high-fidelity prototypes tested with real users.', fr: 'Wireframes et prototypes haute-fidélité testés avec de vrais utilisateurs.' } },
        { stepNumber: 4, icon: '💻', order: 3, title: { en: 'Development', fr: 'Développement' }, description: { en: 'Clean, typed, tested code shipped in small increments.', fr: 'Code propre, typé et testé, livré par petits incréments.' } },
        { stepNumber: 5, icon: '🧪', order: 4, title: { en: 'QA & Launch', fr: 'QA & Lancement' }, description: { en: 'Cross-browser testing, performance audits, and a smooth go-live.', fr: 'Tests cross-navigateurs, audits de performance et mise en ligne en douceur.' } },
        { stepNumber: 6, icon: '📈', order: 5, title: { en: 'Support & Grow', fr: 'Support & Croissance' }, description: { en: 'Post-launch monitoring, iteration, and long-term partnership.', fr: 'Suivi post-lancement, itération et partenariat sur le long terme.' } },
      ],
    });
    console.log('✔ Process steps seeded');
  }

  // ---- pricing packages ----
  if ((await prisma.pricingPackage.count()) === 0) {
    await prisma.pricingPackage.createMany({
      data: [
        {
          name: { en: 'Starter', fr: 'Starter' },
          tagline: { en: 'For small landing pages and MVPs', fr: 'Pour petites landing pages et MVP' },
          price: '800', currency: 'USD', period: 'per project',
          features: {
            en: ['Up to 3 pages', 'Responsive design', 'Basic SEO setup', '2 rounds of revisions'],
            fr: ['Jusqu’à 3 pages', 'Design responsive', 'Configuration SEO de base', '2 tours de révisions'],
          },
          highlighted: false, published: true, order: 0,
          ctaLabel: { en: 'Get started', fr: 'Commencer' }, ctaUrl: '/contact',
        },
        {
          name: { en: 'Growth', fr: 'Croissance' },
          tagline: { en: 'For full product builds', fr: 'Pour des produits complets' },
          price: '2500', currency: 'USD', period: 'per project',
          features: {
            en: ['Up to 10 pages', 'Custom admin dashboard', 'CMS integration', 'Advanced SEO & analytics', 'Unlimited revisions'],
            fr: ['Jusqu’à 10 pages', 'Tableau de bord admin sur mesure', 'Intégration CMS', 'SEO & analytics avancés', 'Révisions illimitées'],
          },
          highlighted: true, published: true, order: 1,
          ctaLabel: { en: 'Book a call', fr: 'Réserver un appel' }, ctaUrl: 'https://cal.com/yourname/30min',
        },
        {
          name: { en: 'Enterprise', fr: 'Entreprise' },
          tagline: { en: 'Ongoing product partnership', fr: 'Partenariat produit continu' },
          price: 'On request', currency: 'USD', period: 'monthly retainer',
          features: {
            en: ['Dedicated engineering hours', 'Architecture & scaling guidance', 'Priority support', 'Quarterly strategy reviews'],
            fr: ['Heures d’ingénierie dédiées', 'Conseils d’architecture et de scalabilité', 'Support prioritaire', 'Revues stratégiques trimestrielles'],
          },
          highlighted: false, published: true, order: 2,
          ctaLabel: { en: 'Contact us', fr: 'Nous contacter' }, ctaUrl: '/contact',
        },
      ],
    });
    console.log('✔ Pricing packages seeded');
  }

  // ---- awards ----
  if ((await prisma.award.count()) === 0) {
    await prisma.award.createMany({
      data: [
        { title: { en: 'Site of the Day', fr: 'Site du jour' }, issuer: { en: 'Awwwards', fr: 'Awwwards' }, category: { en: 'Site of the Day', fr: 'Site du jour' }, date: new Date('2025-03-14'), url: 'https://awwwards.com', published: true, order: 0 },
        { title: { en: 'Honorable Mention', fr: 'Mention honorable' }, issuer: { en: 'CSS Design Awards', fr: 'CSS Design Awards' }, category: { en: 'UI Design', fr: 'Design UI' }, date: new Date('2024-11-02'), url: 'https://cssdesignawards.com', published: true, order: 1 },
        { title: { en: 'Top 10 Portfolio', fr: 'Top 10 Portfolio' }, issuer: { en: 'FWA', fr: 'FWA' }, category: { en: 'Portfolio', fr: 'Portfolio' }, date: new Date('2024-06-20'), url: 'https://thefwa.com', published: true, order: 2 },
      ],
    });
    console.log('✔ Awards seeded');
  }

  // ---- FAQ ----
  if ((await prisma.faqItem.count()) === 0) {
    await prisma.faqItem.createMany({
      data: [
        { category: 'general', order: 0, published: true, question: { en: 'What services do you offer?', fr: 'Quels services proposez-vous ?' }, answer: { en: 'Full-stack development, product design, and brand identity work.', fr: 'Développement full-stack, design produit et identité de marque.' } },
        { category: 'process', order: 1, published: true, question: { en: 'What does your process look like?', fr: 'À quoi ressemble votre processus ?' }, answer: { en: 'Discovery, strategy, design, development, QA, then launch and ongoing support — see the Process page for details.', fr: 'Découverte, stratégie, design, développement, QA, puis lancement et support continu — voir la page Processus pour le détail.' } },
        { category: 'pricing', order: 2, published: true, question: { en: 'How much does a project cost?', fr: 'Combien coûte un projet ?' }, answer: { en: 'Projects start around $800 for landing pages, scaling up based on scope — see the Pricing page.', fr: 'Les projets démarrent autour de 800$ pour une landing page, et augmentent selon le périmètre — voir la page Tarifs.' } },
        { category: 'technical', order: 3, published: true, question: { en: 'What tech stack do you use?', fr: 'Quelle stack technique utilisez-vous ?' }, answer: { en: 'Next.js, TypeScript, Node.js, PostgreSQL/Prisma on the web side, with Figma and Adobe CC for design.', fr: 'Next.js, TypeScript, Node.js, PostgreSQL/Prisma côté web, avec Figma et Adobe CC pour le design.' } },
        { category: 'general', order: 4, published: true, question: { en: 'Do you work with international clients?', fr: 'Travaillez-vous avec des clients internationaux ?' }, answer: { en: 'Yes — remote-first, bilingual EN/FR, and comfortable across time zones.', fr: 'Oui — full remote, bilingue EN/FR, et à l’aise avec les décalages horaires.' } },
        { category: 'process', order: 5, published: true, question: { en: 'How long does a typical project take?', fr: 'Combien de temps dure un projet type ?' }, answer: { en: '2-4 weeks for a landing page, 6-12 weeks for a full product build.', fr: '2 à 4 semaines pour une landing page, 6 à 12 semaines pour un produit complet.' } },
      ],
    });
    console.log('✔ FAQ items seeded');
  }

  // ---- resume: experience / education / certifications ----
  if ((await prisma.experience.count()) === 0) {
    await prisma.experience.createMany({
      data: [
        {
          company: { en: 'Nova Labs', fr: 'Nova Labs' }, role: { en: 'Lead Full-Stack Developer', fr: 'Développeur Full-Stack Principal' },
          period: '2023 – Present', current: true, order: 0,
          location: { en: 'Remote', fr: 'Télétravail' },
          tags: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
          description: { en: '- Led development of a headless commerce platform used by 5 client brands\n- Mentored two junior developers\n- Reduced API latency by 40% through query optimization', fr: '- Dirigé le développement d’une plateforme e-commerce headless utilisée par 5 marques clientes\n- Encadré deux développeurs juniors\n- Réduit la latence API de 40% via l’optimisation des requêtes' },
        },
        {
          company: { en: 'Prevtech Inc.', fr: 'Prevtech Inc.' }, role: { en: 'Full-Stack Developer', fr: 'Développeur Full-Stack' },
          period: '2021 – 2023', current: false, order: 1,
          location: { en: 'Douala, Cameroon', fr: 'Douala, Cameroun' },
          tags: ['React', 'Node.js', 'TypeScript'],
          description: { en: '- Built and shipped 8 client web applications\n- Introduced TypeScript across the team’s codebase', fr: '- Conçu et livré 8 applications web clientes\n- Introduit TypeScript dans la base de code de l’équipe' },
        },
        {
          company: { en: 'Freelance', fr: 'Freelance' }, role: { en: 'Product Designer', fr: 'Designer Produit' },
          period: '2019 – 2021', current: false, order: 2,
          location: { en: 'Remote', fr: 'Télétravail' },
          tags: ['Figma', 'Illustrator', 'Branding'],
          description: { en: '- Delivered brand identities and UI systems for 15+ startups', fr: '- Livré des identités de marque et systèmes UI pour plus de 15 startups' },
        },
      ],
    });
    console.log('✔ Experience seeded');
  }

  if ((await prisma.education.count()) === 0) {
    await prisma.education.createMany({
      data: [
        { institution: { en: 'University of Douala', fr: 'Université de Douala' }, degree: { en: 'M.Eng. Computer Engineering', fr: 'Ingénieur en Génie Informatique' }, period: '2016 – 2021', order: 0, description: { en: 'Specialized in software engineering and distributed systems.', fr: 'Spécialisation en génie logiciel et systèmes distribués.' } },
        { institution: { en: 'Online — Interaction Design Foundation', fr: 'En ligne — Interaction Design Foundation' }, degree: { en: 'UX/UI Design Certificate Program', fr: 'Programme certifiant UX/UI Design' }, period: '2020 – 2021', order: 1, description: { en: 'Self-directed study in interaction design, usability testing, and design systems.', fr: "Étude autodidacte en design d'interaction, tests d'utilisabilité et design systems." } },
      ],
    });
    console.log('✔ Education seeded');
  }

  // ---- values (About page) ----
  if ((await prisma.value.count()) === 0) {
    await prisma.value.createMany({
      data: [
        {
          icon: '🎯', order: 0, published: true,
          title: { en: 'Craft & Precision', fr: 'Savoir-faire & Précision' },
          description: { en: 'Every detail matters — from a pixel-perfect layout to a well-named function. I don\'t ship what I wouldn\'t be proud to revisit a year later.', fr: "Chaque détail compte — d'une mise en page au pixel près à une fonction bien nommée. Je ne livre rien que je ne serais pas fier de retrouver un an plus tard." },
        },
        {
          icon: '🧭', order: 1, published: true,
          title: { en: 'User-First Thinking', fr: "Penser d'abord à l'utilisateur" },
          description: { en: 'Technology is only as good as the experience it creates. I design and build with the person on the other end of the screen always in mind.', fr: "La technologie ne vaut que par l'expérience qu'elle crée. Je conçois et développe en pensant toujours à la personne de l'autre côté de l'écran." },
        },
        {
          icon: '🌱', order: 2, published: true,
          title: { en: 'Continuous Growth', fr: 'Croissance continue' },
          description: { en: 'The field moves fast, and so do I — always learning a new tool, pattern, or perspective to bring back into my work.', fr: 'Le domaine évolue vite, et moi aussi — toujours en train d\'apprendre un nouvel outil, un nouveau pattern ou une nouvelle perspective à ramener dans mon travail.' },
        },
      ],
    });
    console.log('✔ Values seeded');
  }

  if ((await prisma.certification.count()) === 0) {
    await prisma.certification.createMany({
      data: [
        { name: { en: 'AWS Certified Developer', fr: 'AWS Certified Developer' }, issuer: 'Amazon Web Services', date: new Date('2023-05-01'), order: 0 },
        { name: { en: 'Professional Scrum Master I', fr: 'Professional Scrum Master I' }, issuer: 'Scrum.org', date: new Date('2022-09-15'), order: 1 },
      ],
    });
    console.log('✔ Certifications seeded');
  }
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
