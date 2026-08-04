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
    proof: ['Crown Croft', 'Rhema Analytics'],
    order: 0,
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
    proof: ['Crown Croft'],
    order: 1,
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
    proof: ['Crown Croft', 'Rhema Analytics'],
    order: 2,
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
    proof: [],
    order: 3,
    published: true,
  },
];
