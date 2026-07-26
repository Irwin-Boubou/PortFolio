// AUTO-GENERATED from the previous database. Edit freely; this is now the source of truth.
import type { RawBlogPost } from '@/types/content';
export const blogPosts: RawBlogPost[] = [
  {
    "id": "cmrv7jx7o000vyzw05bbpp7fv",
    "slug": "prisma-json-fields-for-multilingual-content",
    "title": {
      "en": "Using Prisma JSON Fields for Multilingual Content",
      "fr": "Utiliser les champs JSON de Prisma pour du contenu multilingue"
    },
    "excerpt": {
      "en": "Why storing { en, fr } locale maps in Postgres JSON columns beats a separate translations table for a small bilingual site.",
      "fr": "Pourquoi stocker des cartes de locale { en, fr } dans des colonnes JSON Postgres bat une table de traductions séparée pour un petit site bilingue."
    },
    "content": {
      "en": "# Prisma JSON Fields\n\nFor a two-language site, a `Json` column shaped `{ en, fr }` is simpler to query and update atomically than a normalized translations table, at the cost of some type safety you can recover with Zod.",
      "fr": "# Champs JSON Prisma\n\nPour un site à deux langues, une colonne `Json` de forme `{ en, fr }` est plus simple à interroger et à mettre à jour de façon atomique qu’une table de traductions normalisée, au prix d’une certaine sécurité de type que l’on peut récupérer avec Zod."
    },
    "coverUrl": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200",
    "readingTime": 1,
    "published": true,
    "publishedAt": "2026-07-23T10:31:29.253Z",
    "tags": [
      {
        "id": "cmrv7jx5k000fyzw04ku1re7q",
        "name": {
          "en": "TypeScript",
          "fr": "TypeScript"
        },
        "slug": "typescript"
      }
    ]
  },
  {
    "id": "cmrv7jx7k000uyzw00da73s9b",
    "slug": "designing-bilingual-interfaces-that-dont-break",
    "title": {
      "en": "Designing Bilingual Interfaces That Don't Break",
      "fr": "Concevoir des interfaces bilingues qui ne se cassent pas"
    },
    "excerpt": {
      "en": "French strings run 15-20% longer than English. Here’s how to design layouts that survive the swap.",
      "fr": "Les chaînes françaises sont 15 à 20% plus longues que l’anglais. Voici comment concevoir des mises en page qui survivent au changement."
    },
    "content": {
      "en": "# Bilingual UI\n\nWhen designing for EN/FR, avoid fixed-width buttons and single-line truncation for critical actions. Test every layout in your longest language first.",
      "fr": "# UI bilingue\n\nLors de la conception pour EN/FR, évitez les boutons à largeur fixe et la troncature sur une seule ligne pour les actions critiques. Testez chaque mise en page d’abord dans votre langue la plus longue."
    },
    "coverUrl": "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=1200",
    "readingTime": 1,
    "published": true,
    "publishedAt": "2026-07-23T10:31:29.177Z",
    "tags": [
      {
        "id": "cmrv7jx5r000iyzw0u09kx9n4",
        "name": {
          "en": "UI/UX",
          "fr": "UI/UX"
        },
        "slug": "ui-ux"
      }
    ]
  },
  {
    "id": "cmrv7jx7b000tyzw0ub45l9mr",
    "slug": "building-a-3d-portfolio-with-react-three-fiber",
    "title": {
      "en": "Building a 3D Portfolio with React Three Fiber",
      "fr": "Construire un portfolio 3D avec React Three Fiber"
    },
    "excerpt": {
      "en": "A walkthrough of the WebGL techniques, performance tradeoffs, and fallback strategies behind this site’s hero scene.",
      "fr": "Un tour d’horizon des techniques WebGL, des compromis de performance et des stratégies de repli derrière la scène héro de ce site."
    },
    "content": {
      "en": "# Building a 3D Portfolio\n\nReact Three Fiber lets you describe a WebGL scene declaratively as React components. In this post I cover instanced particles, camera easing, and graceful degradation when WebGL context is lost.\n\n## Performance\n\nKeep draw calls low with instancing and dispose of geometries on unmount.\n\n## Fallback\n\nAlways provide a static image fallback for devices without WebGL support.",
      "fr": "# Construire un portfolio 3D\n\nReact Three Fiber permet de décrire une scène WebGL de manière déclarative avec des composants React. Dans cet article, je couvre les particules instanciées, l’adoucissement de caméra et la dégradation progressive en cas de perte de contexte WebGL.\n\n## Performance\n\nGardez peu d’appels de rendu grâce à l’instanciation et libérez les géométries au démontage.\n\n## Repli\n\nProposez toujours une image statique de secours pour les appareils sans support WebGL."
    },
    "coverUrl": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200",
    "readingTime": 1,
    "published": true,
    "publishedAt": "2026-07-23T10:31:29.078Z",
    "tags": [
      {
        "id": "cmrv7jx5i000eyzw0wyy9m1vx",
        "name": {
          "en": "React",
          "fr": "React"
        },
        "slug": "react"
      },
      {
        "id": "cmrv7jx5n000gyzw0fo03jad0",
        "name": {
          "en": "Three.js",
          "fr": "Three.js"
        },
        "slug": "threejs"
      }
    ]
  }
];
