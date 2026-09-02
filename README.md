# Harvest & Ember — "Menu Truth Engine"

A complete, production-ready restaurant website built on **Next.js (React)** and deployed free on **Netlify**. This is the finished, sellable demo of the **Menu Truth Engine** concept: a website where guests can filter the menu by what they can safely eat, see the real ingredients and portion, and book a table in the same tap.

Built to be **owned by the buyer** — no monthly platform fee, no lock-in. The code, the content and the domain all belong to the client.

---

## What this site does (for the non-technical reader)

Most restaurant websites show a menu that nobody can filter and a booking page that doesn't really work. This one is different:

- **Filterable menu** — a guest toggles what they can't eat (gluten, dairy, nuts…) or a diet (vegan, keto…), and instantly sees only the dishes that match.
- **Honest dish details** — every dish lists ingredients, true portion, sourcing and an all-in price. No hidden fees.
- **Booking hand-off** — a "Book a table" button that sends the guest to a reservation flow.
- **Eat Real Story** — a page that shows where the food comes from, which is what justifies the price.
- **Working forms** — contact, dietary enquiry and newsletter all save their submissions to a database.

Everything is mobile-first, fast, and set up to rank in local search (metadata, structured data, sitemap, robots).

---

## Tech stack

| Piece | What it is |
|---|---|
| **Next.js 15 (React 19)** | Framework — pages, routing, static generation |
| **TypeScript** | Typed, predictable code |
| **Tailwind CSS 4** | Styling |
| **Turso** (free tier) | Edge SQLite database for form submissions |
| **Netlify** (free tier) | Hosting + automatic deploys from GitHub |

Total cost to run: **$0**. (See `SECURITY_NOTES` in the API routes if you want to lock the database down further.)

---

## Run it on your machine

```bash
# 1. clone your repo
git clone https://github.com/Obed-Cudjoe/leasesentry.git
cd leasesentry

# 2. install dependencies
npm install

# 3. add your Turso credentials (optional for local demo — see below)
cp .env.example .env.local
#   then open .env.local and paste your TURSO_DATABASE_URL + TURSO_AUTH_TOKEN

# 4. start the dev server
npm run dev
```

Open **http://localhost:3000** in your browser.

> **No Turso credentials yet?** The site runs fine without them. In local/demo mode the three forms save to a local file (`data/submissions.json`) so you can see submissions genuinely recorded. Add Turso credentials and the same forms write to your real edge database instead. (See the **Database** section.)

---

## Deploy to a live URL (free, 5 minutes)

This deploys automatically whenever you push to your `main` branch.

1. Push the project to a new **GitHub** repository.
2. Go to **Netlify → Add new site → Import an existing project → GitHub** and pick your repo. Netlify auto-detects Next.js (it reads the committed `netlify.toml`).
3. Under **Site settings → Environment variables**, add:
   - `TURSO_DATABASE_URL`
   - `TURSO_AUTH_TOKEN`
   - (In local/dev only.) You already copied these into `.env.local`.
4. Click **Deploy**. Netlify builds from the repo and gives you a live `https://your-site.netlify.app` URL.
5. Every future `git push` to `main` redeploys automatically. Each pull request also gets its own preview URL — all free.

---

## Database — Turso (free, edge SQLite)

Form submissions (contact, dietary enquiry, newsletter) are stored in a **Turso** database. Turso is serverless SQLite served over HTTP — perfect for Netlify functions, and its free tier (≈5 GB, hundreds of millions of row reads a month) is far more than a restaurant site will ever use.

**Setup in ~2 minutes:**
1. Go to **https://console.turso.tech** → sign up (free, no card).
2. **Create a database** — name it `menu-truth` (nearest region is fine).
3. Copy the connection: **Hosted** URL → `TURSO_DATABASE_URL` (starts with `libsql://`).
4. Under **Settings → Auth tokens → Create token** → copy it → `TURSO_AUTH_TOKEN`.

> **You do NOT need to create the tables by hand.** The site creates its three tables automatically on first submission (idempotent `CREATE TABLE IF NOT EXISTS`). The SQL below is shown for reference / if you want to inspect the schema in the dashboard:

```sql
create table if not exists contact_messages (
  id integer primary key autoincrement,
  name text not null,
  email text not null,
  message text not null,
  created_at text not null default (datetime('now')),
  status text not null default 'new'
);

create table if not exists dietary_enquiries (
  id integer primary key autoincrement,
  name text not null,
  email text not null,
  allergens text not null default '[]',
  question text not null,
  created_at text not null default (datetime('now')),
  status text not null default 'new'
);

create table if not exists newsletter_subscribers (
  id integer primary key autoincrement,
  email text not null unique,
  created_at text not null default (datetime('now'))
);
```

> Want the menu in the database too? A `menu_dishes` table is described in the architecture notes. For this demo the menu lives in `src/lib/menu-data.ts` so the SEO-critical menu pages stay ultra-fast static pages.

---

## Project structure

```
menu-truth-engine/
├── src/
│   ├── app/                 # pages + API routes (App Router)
│   │   ├── page.tsx         # Home
│   │   ├── menu/            # filterable menu + per-dish detail
│   │   ├── book/            # booking hand-off
│   │   ├── about/           # About
│   │   ├── visit/           # Contact + dietary enquiry
│   │   ├── story/           # Eat Real Story
│   │   ├── api/             # serverless functions (contact, dietary, newsletter)
│   │   ├── sitemap.ts       # auto sitemap
│   │   ├── robots.ts        # robots.txt
│   │   └── icon.svg         # favicon
│   ├── components/          # reusable UI (built once, reused everywhere)
│   ├── lib/                 # data, validation, supabase, seo helpers
│   └── types/               # TypeScript types
├── public/                  # static assets
├── netlify.toml             # deploy config
├── .env.example             # env variable template
└── package.json
```

---

## Custom domain (when the site is sold)

Netlify free tier supports **unlimited custom domains + free SSL**.

1. Netlify → **Domain management → Add a domain** → enter the buyer's domain.
2. Namecheap: **Advanced DNS** → add an `A` record → `75.2.60.5`, and a `CNAME` for `www` → `your-site.netlify.app`.
3. Cloudflare: add a `CNAME` for `www` → `your-site.netlify.app`, set it to **DNS only (grey cloud)**, and set **SSL/TLS → Full (strict)**.
4. Netlify auto-issues the SSL certificate and sets the canonical domain. Done.

---

## Editing content

All copy lives in the page files under `src/app/` and in `src/lib/menu-data.ts`. Change the menu items, hours, testimonials and story there — each is plain, readable data. A developer (or you, with minor edits) can update it without touching anything else.

---

## License & ownership

This is a demo site for sale to a client. On handoff, the client receives full ownership of the code, content and domain. No paid dependencies or services are required to run it.
