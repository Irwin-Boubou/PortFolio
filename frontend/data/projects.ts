// Fill this in with your real projects. See SETUP.md / CONTENT.md for the shape.
// Both Crown Croft entries below are published: false because thumbnailUrl is a required
// field and there's no image yet. Drop images in public/images/projects/crown-croft/ and
// set thumbnailUrl (+ gallery/images) to flip published to true.
import type { RawProject } from '@/types/content';
export const projects: RawProject[] = [
  {
    id: 'crown-croft-dev',
    slug: 'crown-croft',
    category: 'DEVELOPMENT',
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
    gallery: [],
    featured: true,
    published: false,
    order: 0,
    thumbnailUrl: '',
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
    gallery: [],
    featured: true,
    published: false,
    order: 0,
    thumbnailUrl: '',
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
];
