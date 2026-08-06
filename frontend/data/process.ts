// Fill this in with your real working process/methodology. See SETUP.md / CONTENT.md for the shape.
import type { RawProcessStep } from '@/types/content';
export const processSteps: RawProcessStep[] = [
  {
    id: 'process-discovery',
    stepNumber: 1,
    title: {
      en: 'Discovery',
      fr: 'Découverte',
    },
    description: {
      en: 'We define goals, audience, and scope, so the project starts with a clear target instead of a vague idea.',
      fr: 'Nous définissons les objectifs, le public et le périmètre, pour démarrer le projet avec une cible claire plutôt qu’une idée vague.',
    },
    icon: '🔍',
    order: 0,
  },
  {
    id: 'process-design',
    stepNumber: 2,
    title: {
      en: 'Design',
      fr: 'Design',
    },
    description: {
      en: 'Wireframes, mockups, and brand visuals, designed with the build already in mind, not handed off blind.',
      fr: 'Wireframes, maquettes et visuels de marque, conçus en ayant déjà le développement en tête, pas transmis à l’aveugle.',
    },
    icon: '✏️',
    order: 1,
  },
  {
    id: 'process-build',
    stepNumber: 3,
    title: {
      en: 'Build',
      fr: 'Développement',
    },
    description: {
      en: 'Development, integrations, and testing, by the same person who designed it, so nothing gets lost in translation.',
      fr: 'Développement, intégrations et tests, par la même personne qui a fait le design, pour que rien ne se perde dans la traduction.',
    },
    icon: '💻',
    order: 2,
  },
  {
    id: 'process-launch',
    stepNumber: 4,
    title: {
      en: 'Launch & Handoff',
      fr: 'Lancement & Transmission',
    },
    description: {
      en: 'Deployment, documentation, and support, live in production, with a clear handoff so you\'re never stuck.',
      fr: 'Déploiement, documentation et support, en production, avec une transmission claire pour que vous ne soyez jamais bloqué.',
    },
    icon: '🚀',
    order: 3,
  },
];
