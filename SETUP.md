# Benison Portfolio — Setup Guide

A bilingual (EN/FR) Next.js 14 portfolio. **Frontend-only** — no backend, no database.
All content lives in `frontend/data/*.ts`. The contact form emails you via Gmail.

## Prerequisites
- Node.js 20+
- Git
- A Gmail account with 2-Step Verification enabled (for the contact form)

## Installation
1. Clone the repo
2. `npm install`
3. `cp frontend/.env.local.example frontend/.env.local`
4. Fill in your Gmail credentials (see below)

## Gmail App Password
1. Go to myaccount.google.com → **Security**
2. Enable **2-Step Verification** (if not already)
3. **Security → App passwords → Mail → Generate**
4. Copy the 16-character password into `GMAIL_PASS` in `frontend/.env.local`, and set `GMAIL_USER` to your Gmail address

## Local development
```
npm run dev        # http://localhost:3000
```

## Editing content (no admin panel)
There is no admin dashboard anymore. All content data files start **empty** (`[]`, or blank
strings in `site-content.ts`) — fill them in, then push to GitHub and Vercel redeploys
automatically. Every text field is bilingual: `{ en: "...", fr: "..." }`. Every list file
follows the same pattern: an empty array typed as `Raw<Thing>[]` — push plain objects
matching the shape below into it.

Images: upload anywhere (Cloudinary, or drop a file in `frontend/public/images/` and
reference it as `/images/yourfile.jpg`) and paste the URL/path into the relevant field.

| Section | Data file | Shape (fields) | Rendered on |
|---|---|---|---|
| Identity, bio, stats, interests, languages, social links, booking, CV, UI copy | `data/site-content.ts` | flat `"key.name": { en, fr }` map — see `types/content.ts` for which keys are strings vs arrays vs booleans | Home, About, Contact, Resume, Footer |
| Projects (dev + design) | `data/projects.ts` | `RawProject`: slug, category (`DEVELOPMENT`\|`DESIGN`), title/subtitle/description/role/challenge/solution/results (bilingual), tools[], techStack[], gallery[] (image URLs), thumbnailUrl, liveUrl, githubUrl, behanceUrl, images[], tags[], featured, published, order | Home, Work, Work/Development, Work/Design, project detail pages |
| Skills / tools | `data/skills.ts` | `RawSkill`: name, iconUrl, category, level (0-100), description (bilingual), brandColor, featured | Home, About, Skills, Tools, Resume |
| Testimonials | `data/testimonials.ts` | `RawTestimonial`: name/role (bilingual), company, content (bilingual), avatarUrl, rating (1-5), featured, published | Home, Testimonials |
| Clients & partners | `data/trust-companies.ts` | `RawTrustCompany`: name, logoUrl, websiteUrl, description (bilingual), category (`client`\|`partner`\|`worked-at`), published | Home, Clients |
| Pricing packages | `data/pricing.ts` | `RawPricingPackage`: name/tagline (bilingual), price, currency, period, features (bilingual string[]), highlighted, ctaLabel (bilingual), ctaUrl, published | Home, Pricing |
| Process steps | `data/process.ts` | `RawProcessStep`: stepNumber, title/description (bilingual), icon (emoji) | Home, Process |
| FAQ | `data/faq.ts` | `RawFaqItem`: question/answer (bilingual), category, published | Home, FAQ |
| Awards | `data/awards.ts` | `RawAward`: title/issuer/category (bilingual), date, badgeUrl, url, published | Home, Awards |
| Work experience | `data/experience.ts` | `RawExperience`: company/role/description/location (bilingual), period, logoUrl, tags[], images[], current | About, Resume |
| Education | `data/education.ts` | `RawEducation`: institution/degree/description (bilingual), period, logoUrl, images[] | About, Resume |
| Certifications | `data/certifications.ts` | `RawCertification`: name (bilingual), issuer, date, url, badgeUrl, images[] | About, Resume |
| About "values" tiles | `data/values.ts` | `RawValue`: icon (emoji), title/description (bilingual), published | About |
| About gallery photos | `data/gallery.ts` | `RawGalleryPhoto`: url, caption (bilingual) | About |
| Blog posts | `data/blog.ts` | `RawBlogPost`: slug, title/excerpt/content (bilingual, content is Markdown), coverUrl, tags[], readingTime, publishedAt, published | Blog, blog detail pages |
| Tags (currently unused) | `data/tags.ts` | `RawTag`: name (bilingual), slug — not read anywhere; projects/blog posts embed their own `tags` array instead | — |

Full field types live in `frontend/types/content.ts` (the `Raw*` interfaces); the
localization/read layer that turns them into what each page uses is
`frontend/lib/content.ts`.

The CV is a static file — replace `frontend/public/benison-cv.pdf` (or point `cv.url` in
`site-content.ts` at any URL). Your profile photo lives at
`frontend/public/images/profile.jpeg`, referenced from `hero.photoUrl` / `about.photoUrl` /
`contact.photoUrl` in `site-content.ts`.

## Deploy to Vercel
1. Push the repo to GitHub
2. Vercel → **Import project** → select this repo
3. Set the **Root Directory** to `frontend`
4. Add environment variables:
   - `GMAIL_USER`
   - `GMAIL_PASS`
   - `OWNER_EMAIL` (optional — defaults to `GMAIL_USER`)
   - `NEXT_PUBLIC_SITE_URL`
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` (optional)
5. Deploy

## Checks
```
npm run typecheck   # zero errors
npm run build       # succeeds
npm run lint
```

## Restoring the old full-stack version
The previous Express + Prisma + Postgres + admin-panel version is preserved:
- Git: `git checkout pre-restructure-backup` (tag) or `backup/full-stack-admin` (branch)
- Zip: `benison-fullstack-backup.zip` (kept next to the project folder)
