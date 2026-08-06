// Design service bundles. See SETUP.md / CONTENT.md for the shape.
import type { RawPricingBundle } from '@/types/content';
export const pricingBundles: RawPricingBundle[] = [
  {
    id: 'bundle-logo-flyer',
    name: {
      en: 'Logo + 1 Flyer',
      fr: 'Logo + 1 Flyer',
    },
    priceMin: 160,
    priceMax: 350,
    order: 0,
    published: true,
  },
  {
    id: 'bundle-brand-2flyers',
    name: {
      en: 'Brand Identity + 2 Flyers',
      fr: 'Identité de Marque + 2 Flyers',
    },
    priceMin: 320,
    priceMax: 600,
    order: 1,
    published: true,
  },
  {
    id: 'bundle-brand-flyer-poster',
    name: {
      en: 'Brand Identity + Flyer + Poster',
      fr: 'Identité de Marque + Flyer + Affiche',
    },
    priceMin: 380,
    priceMax: 680,
    order: 2,
    published: true,
  },
];
