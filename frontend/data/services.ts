// Fill this in with your real service offerings. See SETUP.md / CONTENT.md for the shape.
import type { RawService } from '@/types/content';
export const services: RawService[] = [
  {
    id: 'service-fullstack',
    icon: 'fullstack',
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
];
