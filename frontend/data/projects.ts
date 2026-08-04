// Fill this in with your real projects. See SETUP.md / CONTENT.md for the shape.
// The Rhema Analytics entries below are published: false because thumbnailUrl is a required
// field and there's no image yet. Drop images in public/images/projects/rhema-analytics/ and
// set thumbnailUrl (+ gallery/images) to flip published to true.
import type { RawProject } from '@/types/content';
export const projects: RawProject[] = [
  {
    id: 'crown-croft-dev',
    slug: 'crown-croft',
    category: 'DEVELOPMENT',
    subcategory: 'web-app',
    title: {
      en: 'Crown Croft',
      fr: 'Crown Croft',
    },
    subtitle: {
      en: 'Luxury e-commerce platform for Cameroon’s affluent market',
      fr: 'Plateforme e-commerce de luxe pour la clientèle aisée du Cameroun',
    },
    description: {
      en: 'Crown Croft is a luxury e-commerce platform built for affluent consumers in Douala and Yaoundé. It sources authenticated luxury goods, perfumes first, with skincare and footwear to follow, from suppliers in the UK, France, Japan, and beyond through a UK-based partner, and sells them to a local market with money to spend but no trusted access to genuine luxury products. Motto: "Sought. Sourced. Shipped." Tagline: "Where Royalty Meets Refinement."',
      fr: 'Crown Croft est une plateforme e-commerce de luxe conçue pour les consommateurs aisés de Douala et Yaoundé. Elle propose des produits de luxe authentifiés, parfums dans un premier temps, puis soins de la peau et chaussures, provenant de fournisseurs au Royaume-Uni, en France, au Japon et ailleurs via un partenaire basé au Royaume-Uni, à destination d’un marché local qui a les moyens mais pas d’accès de confiance à des produits de luxe authentiques. Devise : « Sought. Sourced. Shipped. » Slogan : « Where Royalty Meets Refinement ».',
    },
    role: {
      en: 'Full-stack developer (solo build)',
      fr: 'Développeur full-stack (développement en solo)',
    },
    designProcess: null,
    challenge: {
      en: 'Affluent consumers in Douala and Yaoundé had the means to buy luxury goods but no trusted local channel to purchase authenticated products.',
      fr: 'Les consommateurs aisés de Douala et Yaoundé avaient les moyens d’acheter des produits de luxe, mais aucun canal local de confiance pour acquérir des produits authentiques.',
    },
    solution: {
      en: 'Built a full-stack Next.js 15 application, production-deployed on Vercel, with a PostgreSQL database on Supabase, bilingual FR/EN content, a full admin dashboard, and authenticated local payments via NotchPay (MTN Mobile Money + Orange Money). 25 complete feature sprints shipped to production.',
      fr: 'Application full-stack Next.js 15, déployée en production sur Vercel, avec une base de données PostgreSQL sur Supabase, un contenu bilingue FR/EN, un tableau de bord admin complet, et des paiements locaux authentifiés via NotchPay (MTN Mobile Money + Orange Money). 25 sprints de fonctionnalités livrés en production.',
    },
    results: null,
    tools: [],
    techStack: ['Next.js 15', 'PostgreSQL', 'Supabase', 'NotchPay', 'Vercel'],
    gallery: [
      '/images/projects/crown-croft/logo-light-vertical.jpg',
      '/images/projects/crown-croft/logo-dark-vertical.png',
      '/images/projects/crown-croft/logo-light-diamond.jpg',
      '/images/projects/crown-croft/logo-dark-dark.jpg',
    ],
    featured: true,
    published: true,
    order: 0,
    thumbnailUrl: '/images/projects/crown-croft/logo-light-vertical.jpg',
    liveUrl: 'https://www.crowncroft.com/',
    githubUrl: null,
    behanceUrl: null,
    codeSnippet: null,
    images: [],
    tags: [
      { id: 'tag-nextjs', name: { en: 'Next.js', fr: 'Next.js' }, slug: 'nextjs' },
      { id: 'tag-ecommerce', name: { en: 'E-commerce', fr: 'E-commerce' }, slug: 'e-commerce' },
    ],
    publishedAt: null,
  },
  {
    id: 'crown-croft-brand',
    slug: 'crown-croft-brand',
    category: 'DESIGN',
    subcategory: 'brand-design',
    title: {
      en: 'Crown Croft — Brand Identity',
      fr: 'Crown Croft — Identité de marque',
    },
    subtitle: {
      en: 'Logo, color system, and typography for a luxury e-commerce brand',
      fr: 'Logo, système de couleurs et typographie pour une marque e-commerce de luxe',
    },
    description: {
      en: 'Visual identity for Crown Croft: the logo, brand color palette, and typography system, later extended into marketing flyers.',
      fr: 'Identité visuelle de Crown Croft : logo, palette de couleurs et système typographique, plus tard étendus à des flyers marketing.',
    },
    role: {
      en: 'Brand & visual identity designer',
      fr: 'Designer d’identité visuelle et de marque',
    },
    designProcess: {
      en: 'Developed the logo, brand color palette, and typography system to match the tagline "Where Royalty Meets Refinement", then extended the identity into marketing flyers.',
      fr: 'Développement du logo, de la palette de couleurs et du système typographique en cohérence avec le slogan « Where Royalty Meets Refinement », puis extension de l’identité à des flyers marketing.',
    },
    challenge: {
      en: 'Needed a visual identity that felt genuinely luxurious and trustworthy to an affluent local audience, and distinct from typical local e-commerce branding.',
      fr: 'Besoin d’une identité visuelle perçue comme réellement luxueuse et digne de confiance par une clientèle locale aisée, et distincte des codes habituels de l’e-commerce local.',
    },
    solution: {
      en: 'A refined logo, color system, and typography built around the "Where Royalty Meets Refinement" positioning, later extended into marketing flyers.',
      fr: 'Un logo, un système de couleurs et une typographie soignés, construits autour du positionnement « Where Royalty Meets Refinement », puis déclinés en flyers marketing.',
    },
    results: null,
    tools: [],
    techStack: [],
    gallery: [
      '/images/projects/crown-croft/logo-light-vertical.jpg',
      '/images/projects/crown-croft/logo-dark-vertical.png',
      '/images/projects/crown-croft/logo-light-diamond.jpg',
      '/images/projects/crown-croft/logo-dark-dark.jpg',
    ],
    featured: true,
    published: true,
    order: 0,
    thumbnailUrl: '/images/projects/crown-croft/logo-light-vertical.jpg',
    liveUrl: 'https://www.crowncroft.com/',
    githubUrl: null,
    behanceUrl: null,
    codeSnippet: null,
    images: [],
    tags: [
      { id: 'tag-branding', name: { en: 'Branding', fr: 'Identité de marque' }, slug: 'branding' },
    ],
    publishedAt: null,
  },
  {
    id: 'rhema-analytics-dev',
    slug: 'rhema-analytics',
    category: 'DEVELOPMENT',
    subcategory: 'web-app',
    title: {
      en: 'Rhema Analytics',
      fr: 'Rhema Analytics',
    },
    subtitle: {
      en: 'Bilingual data collection and research platform',
      fr: 'Plateforme bilingue de collecte de données et de recherche',
    },
    description: {
      en: 'Rhema Analytics is a bilingual (FR/EN) data collection and research platform built for Dr. Nkombou Meheloune Bob William, PhD, a senior data scientist with a demonstrated history in statistical analysis, business analytics, and econometrics. It serves four audiences: survey respondents can access questionnaires via a unique public link and submit answers with no account needed; researchers and analysts can browse and download datasets and read weekly research posts; clients and businesses can browse and apply for services such as market research and training; and the admin can create and manage questionnaires, view submitted responses in a dashboard, export them as Excel files, publish weekly messages, and manage services, pricing, and datasets from a secure admin panel.',
      fr: 'Rhema Analytics est une plateforme bilingue (FR/EN) de collecte de données et de recherche conçue pour le Dr Nkombou Meheloune Bob William, PhD, data scientist senior avec un historique démontré en analyse statistique, business analytics et économétrie. Elle sert quatre publics : les répondants peuvent accéder aux questionnaires via un lien public unique et soumettre leurs réponses sans compte ; les chercheurs et analystes peuvent parcourir et télécharger des jeux de données et lire des publications hebdomadaires ; les clients et entreprises peuvent consulter et solliciter des services comme des études de marché ou des formations ; et l’administrateur peut créer et gérer les questionnaires, consulter les réponses soumises dans un tableau de bord, les exporter en Excel, publier des messages hebdomadaires, et gérer les services, tarifs et jeux de données depuis un panneau d’administration sécurisé.',
    },
    role: {
      en: 'Full-stack developer (solo build)',
      fr: 'Développeur full-stack (développement en solo)',
    },
    designProcess: null,
    challenge: {
      en: 'Dr. Nkombou needed a single bilingual platform to collect survey data from the public, distribute research datasets and insights, sell services to clients, and manage all of it, without relying on separate, disconnected tools.',
      fr: 'Le Dr Nkombou avait besoin d’une seule plateforme bilingue pour collecter des données d’enquête auprès du public, diffuser des jeux de données et analyses, vendre des services à des clients, et gérer le tout, sans dépendre d’outils séparés et déconnectés.',
    },
    solution: {
      en: 'Built a full-stack platform with a React 19 + TypeScript + Vite frontend (Tailwind CSS, Framer Motion, GSAP) deployed on Vercel, and a Laravel 12 backend (Sanctum auth, MySQL, Laravel Excel exports, NotchPay payments) deployed on Railway with persistent volume storage.',
      fr: 'Plateforme full-stack avec un frontend React 19 + TypeScript + Vite (Tailwind CSS, Framer Motion, GSAP) déployé sur Vercel, et un backend Laravel 12 (auth Sanctum, MySQL, exports Laravel Excel, paiements NotchPay) déployé sur Railway avec stockage persistant sur volume.',
    },
    results: null,
    tools: [],
    techStack: [
      'React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion', 'GSAP',
      'Laravel 12', 'Laravel Sanctum', 'MySQL', 'Laravel Excel', 'NotchPay', 'Railway', 'Vercel',
    ],
    gallery: [
      '/images/projects/rhema-analytics/rhema-logo-new.png',
      '/images/projects/rhema-analytics/chart-mark.png',
      '/images/projects/rhema-analytics/chart-mark-100.jpg',
      '/images/projects/rhema-analytics/pomelli-creative-9-16-0428-3.png',
      '/images/projects/rhema-analytics/pomelli-photoshoot-9-16-0429-1.png',
    ],
    featured: true,
    published: true,
    order: 1,
    thumbnailUrl: '/images/projects/rhema-analytics/rhema-logo-new-thumbnail.jpg',
    liveUrl: 'https://rhema-analytics.vercel.app/',
    githubUrl: null,
    behanceUrl: null,
    codeSnippet: null,
    images: [],
    tags: [
      { id: 'tag-react', name: { en: 'React', fr: 'React' }, slug: 'react' },
      { id: 'tag-laravel', name: { en: 'Laravel', fr: 'Laravel' }, slug: 'laravel' },
      { id: 'tag-data-research', name: { en: 'Data & Research', fr: 'Données & Recherche' }, slug: 'data-research' },
    ],
    publishedAt: null,
  },
  {
    id: 'rhema-analytics-brand',
    slug: 'rhema-analytics-brand',
    category: 'DESIGN',
    subcategory: 'brand-design',
    title: {
      en: 'Rhema Analytics — Brand Identity',
      fr: 'Rhema Analytics — Identité de marque',
    },
    subtitle: {
      en: 'Logo, color system, and typography for a data & research platform',
      fr: 'Logo, système de couleurs et typographie pour une plateforme de données et de recherche',
    },
    description: {
      en: 'Visual identity for Rhema Analytics: the logo, brand color palette, and typography system, later extended into marketing flyers.',
      fr: 'Identité visuelle de Rhema Analytics : logo, palette de couleurs et système typographique, plus tard étendus à des flyers marketing.',
    },
    role: {
      en: 'Brand & visual identity designer',
      fr: 'Designer d’identité visuelle et de marque',
    },
    designProcess: {
      en: 'Developed the logo, brand color palette, and typography system for a data science and research platform, then extended the identity into marketing flyers.',
      fr: 'Développement du logo, de la palette de couleurs et du système typographique pour une plateforme de data science et de recherche, puis extension de l’identité à des flyers marketing.',
    },
    challenge: {
      en: 'Needed a visual identity that felt credible and professional for a data science and research business, distinct from typical local branding.',
      fr: 'Besoin d’une identité visuelle perçue comme crédible et professionnelle pour une entreprise de data science et de recherche, distincte des codes habituels du marché local.',
    },
    solution: {
      en: 'A clean, professional logo, color system, and typography built for Rhema Analytics, later extended into marketing flyers.',
      fr: 'Un logo, un système de couleurs et une typographie sobres et professionnels conçus pour Rhema Analytics, puis déclinés en flyers marketing.',
    },
    results: null,
    tools: [],
    techStack: [],
    gallery: [
      '/images/projects/rhema-analytics/rhema-logo-new.png',
      '/images/projects/rhema-analytics/chart-mark.png',
      '/images/projects/rhema-analytics/chart-mark-100.jpg',
      '/images/projects/rhema-analytics/pomelli-creative-9-16-0428-3.png',
      '/images/projects/rhema-analytics/pomelli-photoshoot-9-16-0429-1.png',
    ],
    featured: true,
    published: true,
    order: 1,
    thumbnailUrl: '/images/projects/rhema-analytics/rhema-logo-new-thumbnail.jpg',
    liveUrl: 'https://rhema-analytics.vercel.app/',
    githubUrl: null,
    behanceUrl: null,
    codeSnippet: null,
    images: [],
    tags: [
      { id: 'tag-branding', name: { en: 'Branding', fr: 'Identité de marque' }, slug: 'branding' },
    ],
    publishedAt: null,
  },
];
