// Fill this in with your real clients/partners/past employers. See SETUP.md / CONTENT.md for the shape.
// The 3 "worked-at" entries below are set to published: false because logoUrl/websiteUrl
// are required fields and left blank for now — flip published to true once you add a real
// logo (drop a file in public/images/ and point logoUrl at it) and website URL.
import type { RawTrustCompany } from '@/types/content';
export const trustCompanies: RawTrustCompany[] = [
  {
    id: 'trust-besttechnology',
    name: 'BestTechnology',
    logoUrl: '',
    websiteUrl: '',
    description: null,
    category: 'worked-at',
    order: 0,
    published: false,
  },
  {
    id: 'trust-migec-finance',
    name: 'Migec Finance',
    logoUrl: '',
    websiteUrl: '',
    description: null,
    category: 'worked-at',
    order: 1,
    published: false,
  },
  {
    id: 'trust-wwt',
    name: 'World Wide Technology',
    logoUrl: '',
    websiteUrl: '',
    description: null,
    category: 'worked-at',
    order: 2,
    published: false,
  },
  {
    id: 'trust-crown-croft',
    name: 'Crown Croft',
    logoUrl: '/images/projects/crown-croft/logo-light-vertical.jpg',
    websiteUrl: 'https://www.crowncroft.com/',
    description: {
      en: 'Luxury e-commerce platform for authenticated designer goods',
      fr: 'Plateforme e-commerce de luxe pour produits de designer authentifiés',
    },
    category: 'client',
    order: 0,
    published: true,
  },
];
