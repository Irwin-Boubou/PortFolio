// Fill this in with your real service offerings. See SETUP.md / CONTENT.md for the shape.
import type { RawService } from '@/types/content';
export const services: RawService[] = [
  {
    id: 'service-fullstack',
    icon: 'fullstack',
    pillar: 'development',
    title: {
      en: 'Full-Stack Web Development',
      fr: 'Développement Web Full-Stack',
    },
    description: {
      en: 'Complete production platforms, database, backend, admin dashboards, and frontend, built end to end and deployed live, not prototypes.',
      fr: 'Des plateformes complètes en production, base de données, backend, tableaux de bord admin et frontend, construites de bout en bout et déployées en ligne, pas de simples prototypes.',
    },
    highlights: {
      en: ['Database & backend architecture', 'Admin dashboards', 'Deployment & hosting setup', 'Bilingual (FR/EN) support'],
      fr: ['Architecture base de données & backend', 'Tableaux de bord admin', 'Déploiement & hébergement', 'Support bilingue (FR/EN)'],
    },
    proof: ['Crown Croft', 'Rhema Analytics'],
    order: 0,
    published: true,
  },
  {
    id: 'service-mobile',
    icon: 'mobile',
    pillar: 'development',
    title: {
      en: 'Mobile App Development',
      fr: 'Développement d’Applications Mobiles',
    },
    description: {
      en: 'Cross-platform mobile apps built with React Native, sharing logic with the web codebase where it makes sense, so features ship consistently everywhere.',
      fr: 'Applications mobiles multiplateformes construites avec React Native, partageant la logique avec le code web quand c’est pertinent, pour des fonctionnalités livrées de façon cohérente partout.',
    },
    highlights: {
      en: ['Cross-platform builds (iOS & Android)', 'Native-feeling navigation & UI', 'API integration', 'App store-ready delivery'],
      fr: ['Builds multiplateformes (iOS & Android)', 'Navigation & UI proches du natif', 'Intégration API', 'Livraison prête pour les stores'],
    },
    proof: [],
    order: 1,
    published: true,
  },
  {
    id: 'service-ecommerce-payments',
    icon: 'payments',
    pillar: 'development',
    title: {
      en: 'E-Commerce & Local Payments',
      fr: 'E-Commerce & Paiements Locaux',
    },
    description: {
      en: 'Online stores and checkout flows wired to real regional payment gateways, MTN Mobile Money and Orange Money via NotchPay, so customers can actually pay.',
      fr: 'Boutiques en ligne et parcours de paiement connectés à de vraies passerelles régionales, MTN Mobile Money et Orange Money via NotchPay, pour que les clients puissent réellement payer.',
    },
    highlights: {
      en: ['Product catalog & checkout flows', 'MTN Mobile Money & Orange Money', 'Order & inventory management', 'Production-grade payment handling'],
      fr: ['Catalogue produits & parcours de paiement', 'MTN Mobile Money & Orange Money', 'Gestion des commandes & stocks', 'Paiements de niveau production'],
    },
    proof: ['Crown Croft'],
    order: 2,
    published: true,
  },
  {
    id: 'service-brand-identity',
    icon: 'brand',
    pillar: 'design',
    title: {
      en: 'Brand & Visual Identity',
      fr: 'Identité de Marque & Visuelle',
    },
    description: {
      en: 'Logo, color system, and typography designed together, then extended into marketing flyers and collateral that stay consistent everywhere they appear.',
      fr: 'Logo, système de couleurs et typographie conçus ensemble, puis déclinés en flyers marketing et supports qui restent cohérents partout où ils apparaissent.',
    },
    highlights: {
      en: ['Logo design', 'Color system & typography', 'Marketing flyers & collateral', 'Brand guidelines'],
      fr: ['Création de logo', 'Système de couleurs & typographie', 'Flyers & supports marketing', 'Charte graphique'],
    },
    proof: ['Crown Croft', 'Rhema Analytics'],
    order: 3,
    published: true,
  },
  {
    id: 'service-ui-ux',
    icon: 'uiux',
    pillar: 'design',
    title: {
      en: 'UI/UX & Product Design',
      fr: 'UI/UX & Design de Produit',
    },
    description: {
      en: 'Interfaces and design systems for web and mobile products, built with the same engineering rigor I bring to the code that ships them.',
      fr: 'Interfaces et design systems pour produits web et mobile, conçus avec la même rigueur technique que le code qui les fait fonctionner.',
    },
    highlights: {
      en: ['Wireframes & prototypes', 'Design systems', 'Web & mobile interfaces', 'Usability-first decisions'],
      fr: ['Wireframes & prototypes', 'Design systems', 'Interfaces web & mobile', 'Décisions centrées sur l’utilisabilité'],
    },
    proof: [],
    order: 4,
    published: true,
  },
  {
    id: 'service-erp',
    icon: 'erp',
    pillar: 'development',
    title: {
      en: 'ERP & Business Systems (Odoo)',
      fr: 'ERP & Systèmes d’Entreprise (Odoo)',
    },
    description: {
      en: 'Odoo deployment and customization to digitize day-to-day operations, inventory, sales, HR, and the workflows in between, instead of running them on spreadsheets.',
      fr: 'Déploiement et personnalisation d’Odoo pour digitaliser les opérations quotidiennes, stocks, ventes, RH, et les processus entre les deux, au lieu de les gérer sur des tableurs.',
    },
    highlights: {
      en: ['Odoo deployment & configuration', 'Custom modules & workflows', 'Business process automation', 'Staff onboarding & handoff'],
      fr: ['Déploiement & configuration Odoo', 'Modules & workflows sur mesure', 'Automatisation des processus métier', 'Formation & transmission aux équipes'],
    },
    proof: [],
    order: 5,
    published: true,
  },
  {
    id: 'service-ai-integration',
    icon: 'ai-integration',
    pillar: 'development',
    title: {
      en: 'AI & LLM Integration',
      fr: 'Intégration IA & LLM',
    },
    description: {
      en: 'AI-powered features built into real products, chatbots, content generation, and workflow automation, using Claude, ChatGPT, Gemini, and DeepSeek APIs.',
      fr: 'Fonctionnalités IA intégrées à de vrais produits, chatbots, génération de contenu, automatisation de tâches, avec les API Claude, ChatGPT, Gemini et DeepSeek.',
    },
    highlights: {
      en: ['Chatbots & assistants', 'Content generation features', 'Workflow automation', 'API integration (Claude, OpenAI, DeepSeek)'],
      fr: ['Chatbots & assistants', 'Fonctionnalités de génération de contenu', 'Automatisation de tâches', 'Intégration API (Claude, OpenAI, DeepSeek)'],
    },
    proof: [],
    order: 6,
    published: true,
  },
  {
    id: 'service-print-marketing',
    icon: 'print',
    pillar: 'design',
    title: {
      en: 'Print & Marketing Design',
      fr: 'Design Print & Marketing',
    },
    description: {
      en: 'Flyers, brochures, and marketing collateral that carry a brand\'s identity consistently from screen to print.',
      fr: 'Flyers, brochures et supports marketing qui portent l’identité d’une marque de façon cohérente, de l’écran à l’impression.',
    },
    highlights: {
      en: ['Flyers & brochures', 'Posters & banners', 'Business cards & stationery', 'Print-ready files'],
      fr: ['Flyers & brochures', 'Affiches & bannières', 'Cartes de visite & papeterie', 'Fichiers prêts pour l’impression'],
    },
    proof: ['Crown Croft', 'Rhema Analytics'],
    order: 7,
    published: true,
  },
  {
    id: 'service-social-content',
    icon: 'social',
    pillar: 'design',
    title: {
      en: 'Social Media & Content Design',
      fr: 'Design Réseaux Sociaux & Contenu',
    },
    description: {
      en: 'Post templates and visual systems so a brand can keep publishing consistent content without redesigning from scratch every time.',
      fr: 'Modèles de publications et systèmes visuels pour qu’une marque puisse continuer à publier du contenu cohérent sans tout redessiner à chaque fois.',
    },
    highlights: {
      en: ['Post & story templates', 'Carousel & grid layouts', 'Brand-consistent visual system', 'Editable, reusable files'],
      fr: ['Modèles de posts & stories', 'Mises en page carrousel & grille', 'Système visuel cohérent avec la marque', 'Fichiers modifiables et réutilisables'],
    },
    proof: [],
    order: 8,
    published: true,
  },
];
