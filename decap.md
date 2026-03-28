# Decap CMS + Next.js Blog Guide

This guide explains how to create and maintain a Decap CMS blog in a Next.js App Router project, including local authoring and Cloudflare static deployment.

## 1. What You Are Building

- Next.js website with static output (`out/`)
- Blog posts stored as markdown files in `content/posts`
- Decap CMS UI mounted at `/private/admin`
- Editors publish posts without touching code

## 2. Prerequisites

- Node.js 20+
- npm
- GitHub repo with push access
- Next.js project (App Router)

## 3. Required Dependencies

Install the markdown parsing stack:

```bash
npm install gray-matter remark remark-html
```

Decap CMS script can be loaded from CDN (used in this project), so no npm package is required for the admin UI itself.

## 4. Recommended Project Structure

```txt
content/
  posts/
public/
  private/
    admin/
      config.yml
  uploads/
src/
  app/
    private/
      admin/
        page.tsx
  lib/
    posts.ts
    date.ts
```

## 5. Create the Decap CMS Config

Create `/public/private/admin/config.yml`:

```yml
backend:
  name: github
  repo: samjsdev/decap
  branch: main

local_backend: true

media_folder: "public/uploads"
public_folder: "/uploads"

publish_mode: editorial_workflow

collections:
  - name: "posts"
    label: "Blog Posts"
    folder: "content/posts"
    create: true
    slug: "{{slug}}"
    extension: "md"
    format: "frontmatter"
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Date", name: "date", widget: "date", format: "YYYY-MM-DD" }
      - { label: "Excerpt", name: "excerpt", widget: "text" }
      - { label: "Author", name: "author", widget: "string", default: "Harbor Smile Team" }
      - { label: "Body", name: "body", widget: "markdown" }
```

Important:
- `repo` must be your real `owner/repo`.
- If this value is wrong, CMS shows "Repo not found".

## 6. Create a Private Admin Route in Next.js

Create `/src/app/private/admin/page.tsx`:

```tsx
import Script from 'next/script';

export default function PrivateAdminPage() {
  return (
    <section aria-label="Private CMS dashboard">
      <Script id="decap-manual-init" strategy="beforeInteractive">
        {`window.CMS_MANUAL_INIT = true;`}
      </Script>

      <Script
        src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"
        strategy="afterInteractive"
      />

      <Script id="decap-bootstrap" strategy="afterInteractive">
        {`
          (function initDecap(retries) {
            if (window.CMS && typeof window.CMS.init === 'function') {
              window.CMS.init({ config: '/private/admin/config.yml' });
              return;
            }
            if (retries > 0) {
              setTimeout(function retry() {
                initDecap(retries - 1);
              }, 120);
            }
          })(80);
        `}
      </Script>

      <div id="nc-root" />
    </section>
  );
}
```

Why this route is recommended:
- `/private/admin` works as a normal app route.
- No conflict with App Router 404 behavior.
- Config still stays static in `public/private/admin/config.yml`.

## 7. Build a Markdown Data Layer

Create `/src/lib/posts.ts` that:
- reads markdown files from `content/posts`
- parses frontmatter via `gray-matter`
- converts markdown body to HTML via `remark`
- returns metadata list and single post data

Key requirement:
- Handle both string dates and YAML `Date` values to avoid fallback to 1970.

Example behavior:
- `date: "2026-02-07"` (string) works
- `date: 2026-02-07` (YAML date object) also works

## 8. Prevent Date Timezone Bugs

If you display `YYYY-MM-DD` with `new Date(dateString)`, US timezones can show one day earlier.

Use a helper like `/src/lib/date.ts` to format date-only values using UTC calendar logic.

## 9. Blog Routes (Static Generation)

For blog detail route:
- use `generateStaticParams()` from post slugs
- set `export const dynamicParams = false`

This ensures all post pages are pre-rendered in static export.

## 10. Sample Blog Frontmatter

```md
---
title: "Root Canal Treatment: What to Expect"
date: "2026-02-07"
excerpt: "What root canal treatment is, when needed, and recovery tips."
author: "Harbor Smile Team"
---

Post body markdown here.
```

## 11. Local Authoring Workflow

Start website:

```bash
npm run dev
```

Start local Decap proxy:

```bash
npx decap-server
```

Open:
- Site: `http://localhost:3000`
- CMS: `http://localhost:3000/private/admin`

## 12. Cloudflare Pages Deployment (Static)

Use static export config in Next:

```js
// next.config.mjs
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
```

Cloudflare Pages settings:
- Framework preset: Next.js (Static HTML Export)
- Build command: `npx next build`
- Output directory: `out`

## 13. Security and Privacy

`/private/admin` is hidden from nav, but still a public URL unless protected.

Recommended:
- Protect `/private/*` with Cloudflare Access.
- Keep admin route out of public UI links.
- Add no-index headers for private paths.

Example `/public/_headers`:

```txt
/private/*
  X-Robots-Tag: noindex, nofollow, noarchive, nosnippet
```

## 14. Common Errors and Fixes

### Error: `Repo "your-github-username/your-repo-name" not found`
Cause:
- Placeholder repo still in `config.yml`

Fix:
- Set `backend.repo` to real `owner/repo`

### Error: Blog date shows `January 1, 1970`
Cause:
- Frontmatter date parsed as non-string and code fallback used

Fix:
- Normalize `Date` objects in your post parser

### Error: `/private/admin` shows app header/footer instead of CMS
Cause:
- Admin page sharing site layout

Fix:
- Use separate layout segment for public pages and isolated admin route

## 15. Go-Live Checklist

- `backend.repo` points to correct repository
- `backend.branch` is correct
- `/private/admin` loads CMS UI
- New post created from CMS appears in `content/posts`
- Blog index and detail pages show correct dates
- `npm run build` passes
- Cloudflare deploy serves `/private/admin` and blog pages correctly
