# Harbor Smile Studio - Next.js + Decap CMS

A multi-page dental clinic website built with **Next.js 16 App Router** using static export for easy Cloudflare Pages deployment.

## Tech Stack

- Next.js 16 (App Router)
- Static build output (`output: 'export'`)
- Decap CMS for blog content management
- Markdown blog posts in `content/posts`

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Decap CMS Setup

1. Open `http://localhost:3000/private/admin`.
2. Update `public/private/admin/config.yml`:
   - `backend.repo` to your GitHub repository.
   - `backend.branch` if not `main`.
3. Commit and push.

Note: moving CMS to `/private/admin` hides it from normal site navigation, but it is still a public URL. For true access control, protect `/private/*` using Cloudflare Access.

### Local CMS authoring

For local CMS testing, run a local backend proxy:

```bash
npx decap-server
```

Then use CMS with `local_backend: true` (already enabled).

## Cloudflare Pages Deployment

Use Cloudflare Pages with framework preset: **Next.js (Static HTML Export)**.

- Build command: `npx next build`
- Build output directory: `out`

This project already outputs a static site in `out/`.

## Content Editing Workflow

- Blog posts are stored in `content/posts/*.md`.
- Decap CMS writes markdown files directly to that folder.
- The blog index and post pages are generated statically from those markdown files.
