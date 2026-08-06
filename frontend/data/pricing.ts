// DRAFT pricing — you asked me to propose numbers for you to review later.
// These are placeholder estimates, not confirmed rates. Adjust price/currency/features
// freely, or set published: false on any package you're not ready to show yet.
import type { RawPricingPackage } from '@/types/content';
export const pricingPackages: RawPricingPackage[] = [
  {
    id: 'pricing-starter',
    name: {
      en: 'Starter — Landing Page',
      fr: 'Starter — Landing Page',
    },
    tagline: {
      en: 'For small businesses and personal brands',
      fr: 'Pour petites entreprises et marques personnelles',
    },
    price: '250',
    currency: 'USD',
    period: 'per project',
    features: {
      en: ['Single-page responsive site', 'Contact form', 'SEO basics', '2 revision rounds', 'Delivery: 5-7 days'],
      fr: ['Site responsive une page', 'Formulaire de contact', 'SEO de base', '2 tours de révisions', 'Livraison : 5 à 7 jours'],
    },
    highlighted: false,
    order: 0,
    published: true,
    ctaLabel: {
      en: 'Get started',
      fr: 'Commencer',
    },
    ctaUrl: '/contact',
  },
  {
    id: 'pricing-launch',
    name: {
      en: 'Launch — Brand + Website',
      fr: 'Launch — Marque + Site Web',
    },
    tagline: {
      en: 'For businesses that need a full identity and web presence',
      fr: 'Pour entreprises ayant besoin d’une identité complète et d’une présence web',
    },
    price: '700',
    currency: 'USD',
    period: 'per project',
    features: {
      en: ['Logo, color system & typography', 'Multi-page responsive website', 'Bilingual (FR/EN) content', 'Marketing flyer included', 'Delivery: 2-3 weeks'],
      fr: ['Logo, système de couleurs & typographie', 'Site web multi-pages responsive', 'Contenu bilingue (FR/EN)', 'Un flyer marketing inclus', 'Livraison : 2 à 3 semaines'],
    },
    highlighted: false,
    order: 1,
    published: true,
    ctaLabel: {
      en: 'Start a project',
      fr: 'Démarrer un projet',
    },
    ctaUrl: '/contact',
  },
  {
    id: 'pricing-pro',
    name: {
      en: 'Pro — Full Web Application',
      fr: 'Pro — Application Web Complète',
    },
    tagline: {
      en: 'For startups and SMEs that need a real product',
      fr: 'Pour startups et PME ayant besoin d’un vrai produit',
    },
    price: '1500',
    currency: 'USD',
    period: 'per project',
    features: {
      en: ['Full-stack app, database & admin dashboard', 'Local payments (Mobile Money, Orange Money)', 'Bilingual FR/EN', 'Cloud deployment & hosting setup', 'Delivery: 4-8 weeks'],
      fr: ['Application full-stack, base de données & admin', 'Paiements locaux (Mobile Money, Orange Money)', 'Bilingue FR/EN', 'Déploiement & hébergement cloud', 'Livraison : 4 à 8 semaines'],
    },
    highlighted: true,
    order: 2,
    published: true,
    ctaLabel: {
      en: 'Book a call',
      fr: 'Réserver un appel',
    },
    ctaUrl: '/contact',
  },
  {
    id: 'pricing-enterprise',
    name: {
      en: 'Enterprise — Custom & ERP',
      fr: 'Enterprise — Sur mesure & ERP',
    },
    tagline: {
      en: 'For companies needing an ERP, SaaS, or ongoing partnership',
      fr: 'Pour entreprises ayant besoin d’un ERP, d’un SaaS ou d’un partenariat continu',
    },
    price: 'On quote',
    currency: 'USD',
    period: null,
    features: {
      en: ['Odoo ERP deployment & customization', 'Custom SaaS platform', 'AI/LLM feature integration', 'Ongoing maintenance & support'],
      fr: ['Déploiement & personnalisation ERP Odoo', 'Plateforme SaaS sur mesure', 'Intégration de fonctionnalités IA/LLM', 'Maintenance & support continus'],
    },
    highlighted: false,
    order: 3,
    published: true,
    ctaLabel: {
      en: 'Request a quote',
      fr: 'Demander un devis',
    },
    ctaUrl: '/contact',
  },
];
