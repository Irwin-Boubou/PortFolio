// Fill this in with your real FAQ. See SETUP.md / CONTENT.md for the shape.
import type { RawFaqItem } from '@/types/content';
export const faqItems: RawFaqItem[] = [
  {
    id: 'faq-services',
    question: {
      en: 'What services do you offer?',
      fr: 'Quels services proposez-vous ?',
    },
    answer: {
      en: 'Full-stack web and mobile development, e-commerce and local payment integration, ERP/Odoo deployment, AI/LLM integration, and design work spanning brand identity, UI/UX, print, and social media. See the Services page for the full list.',
      fr: 'Développement web et mobile full-stack, e-commerce et intégration de paiements locaux, déploiement ERP/Odoo, intégration IA/LLM, ainsi que du design allant de l’identité de marque à l’UI/UX, en passant par le print et les réseaux sociaux. Voir la page Services pour la liste complète.',
    },
    category: 'general',
    order: 0,
    published: true,
  },
  {
    id: 'faq-remote',
    question: {
      en: 'Do you work with international or remote clients?',
      fr: 'Travaillez-vous avec des clients internationaux ou à distance ?',
    },
    answer: {
      en: 'Yes, I work remote-first as a freelancer, currently based in Douala, Cameroon, and deliver bilingual (French/English) work for clients anywhere.',
      fr: 'Oui, je travaille à distance en freelance, actuellement basé à Douala, Cameroun, et je livre des projets bilingues (français/anglais) pour des clients partout dans le monde.',
    },
    category: 'general',
    order: 1,
    published: true,
  },
  {
    id: 'faq-process',
    question: {
      en: 'What does your process look like?',
      fr: 'À quoi ressemble votre processus ?',
    },
    answer: {
      en: 'Discovery, Design, Build, then Launch & Handoff, see the Process page for details. Since I handle both design and development myself, there\'s no handoff gap between the two.',
      fr: 'Découverte, Design, Développement, puis Lancement & Transmission, voir la page Processus pour le détail. Comme je gère à la fois le design et le développement, il n’y a aucune perte d’information entre les deux.',
    },
    category: 'process',
    order: 2,
    published: true,
  },
  {
    id: 'faq-timeline',
    question: {
      en: 'How long does a project take?',
      fr: 'Combien de temps dure un projet ?',
    },
    answer: {
      en: 'It depends on scope: a landing page typically takes 20-30 business days, a brand + website project 2-3 months, and a full web application 6-8 months. Exact timelines are confirmed after the discovery call.',
      fr: 'Cela dépend du périmètre : une landing page prend généralement 20 à 30 jours ouvrés, un projet marque + site web 2 à 3 mois, et une application web complète 6 à 8 mois. Les délais exacts sont confirmés après l’appel de découverte.',
    },
    category: 'process',
    order: 3,
    published: true,
  },
  {
    id: 'faq-cost',
    question: {
      en: 'How much does a project cost?',
      fr: 'Combien coûte un projet ?',
    },
    answer: {
      en: 'Web projects range from €350 (landing page) to €5,000 (full web application); design services range from €60 (a single flyer) to €500 (full brand identity). See the Pricing page for the full breakdown, or request a custom quote for ERP/SaaS work.',
      fr: 'Les projets web vont de 350€ (landing page) à 5 000€ (application web complète) ; les services de design vont de 60€ (un flyer) à 500€ (identité de marque complète). Voir la page Tarifs pour le détail, ou demandez un devis sur mesure pour un projet ERP/SaaS.',
    },
    category: 'pricing',
    order: 4,
    published: true,
  },
  {
    id: 'faq-payment',
    question: {
      en: 'How does payment work?',
      fr: 'Comment fonctionne le paiement ?',
    },
    answer: {
      en: 'Every project starts with an upfront deposit (usually 30-50%), with the remainder split across milestones like design approval, staging handoff, or delivery. Exact terms are listed per package on the Pricing page.',
      fr: 'Chaque projet démarre avec un acompte (généralement 30 à 50%), le reste étant réparti sur des jalons comme l’approbation du design, la livraison de la version de test, ou la livraison finale. Les modalités exactes sont indiquées pour chaque offre sur la page Tarifs.',
    },
    category: 'pricing',
    order: 5,
    published: true,
  },
  {
    id: 'faq-tech-stack',
    question: {
      en: 'What tech stack do you use?',
      fr: 'Quelle stack technique utilisez-vous ?',
    },
    answer: {
      en: 'Mainly Next.js, React, and TypeScript on the frontend, Laravel and Node.js on the backend, with PostgreSQL, Supabase, or MySQL for data, deployed on Vercel and Railway. The exact stack depends on the project.',
      fr: 'Principalement Next.js, React et TypeScript en frontend, Laravel et Node.js en backend, avec PostgreSQL, Supabase ou MySQL pour les données, déployés sur Vercel et Railway. La stack exacte dépend du projet.',
    },
    category: 'technical',
    order: 6,
    published: true,
  },
  {
    id: 'faq-ai',
    question: {
      en: 'Can you add AI features to my product?',
      fr: 'Pouvez-vous intégrer des fonctionnalités IA à mon produit ?',
    },
    answer: {
      en: 'Yes, chatbots, content generation, and workflow automation using Claude, ChatGPT, Gemini, or DeepSeek APIs. See the AI & LLM Integration service for details.',
      fr: 'Oui, chatbots, génération de contenu et automatisation de tâches avec les API Claude, ChatGPT, Gemini ou DeepSeek. Voir le service Intégration IA & LLM pour plus de détails.',
    },
    category: 'technical',
    order: 7,
    published: true,
  },
];
