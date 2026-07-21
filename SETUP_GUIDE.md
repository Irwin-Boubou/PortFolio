# Portfolio Website — Setup, Testing & Hosting Guide

A step-by-step guide to run the project locally, test it, and put it online.
The project is a monorepo:

```
portfolio-website/
├── backend/     → Express + TypeScript + Prisma + PostgreSQL (REST API)
├── frontend/    → Next.js 14 + next-intl (EN/FR) + Tailwind + React Three Fiber
└── package.json → workspace scripts (runs both at once)
```

---

## 1. Prerequisites (install these first)

| Tool | Version | Where |
|---|---|---|
| Node.js | 20 LTS or newer | https://nodejs.org (includes npm) |
| PostgreSQL | 16 (or any 13+) | https://www.postgresql.org/download — **or** use Docker below |
| Git | any recent | https://git-scm.com |

Check your installs:

```bash
node -v    # v20.x or higher
npm -v
psql --version   # only if you installed Postgres directly
```

**Option B — Postgres via Docker (easiest, no local install):**

```bash
docker run --name portfolio-db -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=portfolio_db -p 5432:5432 -d postgres:16
```

---

## 2. Install dependencies

From the repo root (`portfolio-website/`):

```bash
npm install
```

This installs both workspaces (backend + frontend) in one go.

---

## 3. Configure environment variables

### 3.1 Backend — create `backend/.env`

```bash
cp backend/.env.example backend/.env
```

Then edit `backend/.env`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/portfolio_db"

# Generate two DIFFERENT random secrets with:
#   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
JWT_ACCESS_SECRET="paste-first-generated-secret"
JWT_REFRESH_SECRET="paste-second-generated-secret"

# The admin account that `db:seed` will create for you:
ADMIN_EMAIL="you@example.com"
ADMIN_PASSWORD="choose-a-strong-password"
ADMIN_NAME="Your Name"

PORT=3001
FRONTEND_URL="http://localhost:3000"

# OPTIONAL — leave empty for now; the app works without them:
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
SMTP_HOST=""
SMTP_PORT="587"
SMTP_USER=""
SMTP_PASS=""
CONTACT_EMAIL_TO=""
```

### 3.2 Frontend — create `frontend/.env.local`

```bash
cp frontend/.env.local.example frontend/.env.local
```

Default values already point to the local API:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## 4. Create the database & seed data

If you installed Postgres directly (skip if using the Docker command above,
which already created the DB):

```bash
createdb portfolio_db
```

Then, from the repo root:

```bash
npm run db:migrate   # creates all tables (Prisma migration)
npm run db:seed      # creates your admin user + bilingual starter content + 12 skills
```

---

## 5. Run the project locally

```bash
npm run dev
```

This starts both servers:

| Service | URL |
|---|---|
| API (Express) | http://localhost:3001 — health check at `/health` |
| Website (English) | http://localhost:3000/en |
| Website (French) | http://localhost:3000/fr |
| Admin panel | http://localhost:3000/en/admin/login |

Sign in to the admin with the `ADMIN_EMAIL` / `ADMIN_PASSWORD` you put in
`backend/.env`.

---

## 6. Testing checklist

Work through this list after first launch:

1. **API alive** — open http://localhost:3001/health → `{"status":"ok"}`.
2. **Language switch** — on the site, use the EN/FR toggle in the navbar; the
   URL should flip between `/en/...` and `/fr/...` and all UI text should change.
3. **Theme toggle** — switch dark/light; reload the page: the choice persists
   with no flash of the wrong theme.
4. **3D hero** — particles and floating shapes render on the homepage and
   follow the mouse subtly. On a machine without WebGL you should see the
   static fallback instead of a crash.
5. **Admin CRUD** — log in → *Projects → New project*:
   - Fill the **EN** tab (required), optionally the **FR** tab.
   - Tick **Published** and **Featured**, save.
   - The project appears on the homepage “Selected Work” and on
     `/en/work/development` (or design). Switch to `/fr/...`: if you filled the
     FR fields you see French; otherwise it gracefully falls back to English.
6. **Blog** — create a post in *Blog → New post* with Markdown content; check
   `/en/blog` and the article page.
7. **Contact form** — submit the form on `/en/contact`; the message appears in
   *Admin → Inbox* (email sending only activates once SMTP is configured).
8. **Skills orb** — add/edit skills in *Admin → Skills*; the 3D orb on the
   homepage updates (after the 60 s ISR revalidation, or restart dev server).

Code quality checks:

```bash
npm run typecheck --workspaces   # TypeScript on both packages
npm run lint -w frontend         # ESLint (Next.js rules)
```

---

## 7. Optional services (recommended before going live)

### Cloudinary (image hosting — free tier 25 GB)
1. Create an account at https://cloudinary.com → Dashboard.
2. Copy **Cloud name**, **API Key**, **API Secret** into `backend/.env`.
3. Images uploaded via the API (`POST /api/v1/upload/image`) return a URL you
   paste into the project/blog “Thumbnail URL” fields. (You can also just paste
   any public image URL — the frontend accepts both.)

### Email for the contact form
- **Resend (easiest)**: https://resend.com → API key, then:
  `SMTP_HOST=smtp.resend.com`, `SMTP_PORT=587`, `SMTP_USER=resend`,
  `SMTP_PASS=<your API key>`, `CONTACT_EMAIL_TO=you@example.com`.
- **Gmail**: use an App Password (Google Account → Security → App passwords),
  `SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=587`.
- If SMTP is left empty, messages are still saved to the database and visible
  in the admin inbox — nothing breaks.

---

## 8. Hosting (free-tier friendly)

Recommended split, matching the spec: **frontend on Vercel**, **API + database
on Railway** (Render works the same way).

### 8.1 Push the code to GitHub

```bash
cd portfolio-website
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<you>/portfolio-website.git
git push -u origin main
```

`.env` files are already git-ignored — never commit them.

### 8.2 Backend + database on Railway

1. https://railway.app → **New Project → Deploy from GitHub repo** → pick your repo.
2. Add a **PostgreSQL** plugin to the project (Railway gives you a `DATABASE_URL`).
3. On the backend service, set:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install && npx prisma generate && npm run build`
   - **Start Command:** `npx prisma migrate deploy && npm start`
4. Add all the environment variables from section 3.1, with two changes:
   - `DATABASE_URL` → use the value Railway generated (reference the plugin variable).
   - `FRONTEND_URL` → your final Vercel URL, e.g. `https://yourname.vercel.app`
     (you can update this after step 8.3).
   - `NODE_ENV=production`
5. Deploy. Note the public URL Railway assigns, e.g.
   `https://portfolio-api-production.up.railway.app`.
6. Seed production once (Railway service → one-off command, or locally with the
   production `DATABASE_URL` in a temporary `.env`): `npm run db:seed`.

### 8.3 Frontend on Vercel

1. https://vercel.com → **Add New → Project** → import the same GitHub repo.
2. **Root Directory:** `frontend` (Framework preset: Next.js — auto-detected).
3. Environment variables:
   - `NEXT_PUBLIC_API_URL` = `https://<your-railway-url>/api/v1`
   - `NEXT_PUBLIC_SITE_URL` = `https://<your-vercel-url>`
4. Deploy. Then go back to Railway and make sure `FRONTEND_URL` exactly matches
   your Vercel URL (needed for CORS **and** for the admin login cookie).

> **Important (cookies/CORS):** the admin refresh-token cookie uses
> `SameSite=None; Secure` in production, so **both** the API and the frontend
> must be served over HTTPS (Railway and Vercel do this automatically).
> If admin login works but you get logged out on refresh, double-check
> `FRONTEND_URL` on Railway matches the Vercel domain with no trailing slash.

### 8.4 Custom domain (optional)

- Add your domain in Vercel → *Domains* and follow the DNS instructions.
- Optionally add a subdomain like `api.yourdomain.com` on Railway, then update
  `NEXT_PUBLIC_API_URL` (Vercel) and redeploy.
- Update `NEXT_PUBLIC_SITE_URL` and `FRONTEND_URL` accordingly.

### 8.5 After launch

- Submit `https://yourdomain.com/sitemap.xml` to Google Search Console
  (`robots.txt` and `sitemap.xml` are generated automatically; `/admin` is
  blocked from indexing).
- GitHub Actions CI (`.github/workflows/ci.yml`) already runs typecheck + lint
  on every push/PR.
- Vercel → Analytics tab: enable Web Analytics & Speed Insights for monitoring.

---

## 9. Common problems & fixes

| Symptom | Fix |
|---|---|
| `P1001: Can't reach database` on migrate | Postgres isn’t running, or `DATABASE_URL` is wrong. Start Postgres / Docker container. |
| Admin login returns 401 | Re-run `npm run db:seed`; check `ADMIN_EMAIL`/`ADMIN_PASSWORD` in `backend/.env`. |
| CORS error in browser console | `FRONTEND_URL` in the backend env must exactly match the site origin. |
| 3D scenes don’t render | Browser/GPU without WebGL — the site falls back to static visuals by design. |
| French page shows English text for a project | That project’s FR fields are empty — this is intentional fallback. Fill the FR tab in the admin. |
| Port 3000/3001 already in use | Stop the other process or change `PORT` in `backend/.env`. |

---

## 10. Everyday content workflow (no code needed)

1. Go to `/en/admin/login` → sign in.
2. **Projects**: create/edit with the EN/FR tabs, toggle *Featured* (homepage)
   and *Published* (visible at all).
3. **Blog**: write in Markdown, publish when ready.
4. **Site content**: edit hero taglines, bio and stats for both languages.
5. **Skills**: manage the 3D orb’s contents and proficiency levels.
6. **Inbox**: read contact-form messages, reply via your email client.

Public pages regenerate automatically (ISR: homepage 60 s, work pages 120 s,
blog 300 s) — no redeploy needed for content changes.
