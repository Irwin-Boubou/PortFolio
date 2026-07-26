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
There is no admin dashboard anymore. To change any content, edit the data file and push to GitHub — Vercel redeploys automatically.

| To change… | Edit |
|---|---|
| Hero text, section headings, social links, booking URL, availability | `frontend/data/site-content.ts` |
| Projects (dev + design) | `frontend/data/projects.ts` |
| Skills / tools | `frontend/data/skills.ts` |
| Testimonials | `frontend/data/testimonials.ts` |
| Clients & partners | `frontend/data/trust-companies.ts` |
| Pricing packages | `frontend/data/pricing.ts` |
| Process steps | `frontend/data/process.ts` |
| FAQ | `frontend/data/faq.ts` |
| Awards | `frontend/data/awards.ts` |
| Resume (experience / education / certifications) | `frontend/data/{experience,education,certifications}.ts` |
| About values | `frontend/data/values.ts` |
| About gallery photos | `frontend/data/gallery.ts` |
| Blog posts | `frontend/data/blog.ts` |

Every text field is bilingual: `{ en: "...", fr: "..." }`.

Images: upload to Cloudinary (or any host) and paste the URL into the relevant field.
The CV is a static file — replace `frontend/public/benison-cv.pdf` (or point `cv.url` in
`site-content.ts` at any URL).

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
