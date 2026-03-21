# Studio CMS Platform

Production-ready starter for studio websites using Next.js + Payload CMS.

## Tech Stack

- Next.js (App Router), React, TypeScript
- Payload CMS v3
- PostgreSQL
- Tailwind CSS
- Remote MDX via `@mdx-js/mdx`
- S3-compatible media storage
- Resend email integration

## What it includes

- CMS-managed pages and sections
- Dynamic services and blog routes
- Centralized SEO metadata and JSON-LD
- Database-backed blog content rendered from MDX
- Migration and seed workflow for content initialization

## Local setup

```bash
pnpm install
pnpm db:up
pnpm db:migrate
pnpm db:seed
pnpm dev
```

## CI workflows

- `.github/workflows/migrate.yml` - runs Payload migrations
- `.github/workflows/backup.yml` - creates nightly PostgreSQL backups

## Key paths

- `src/collections` - Payload collection and global schemas
- `src/server/queries.ts` - cached server-side data access
- `src/lib/metadata.ts` - shared metadata builders
- `src/lib/json-ld.ts` - structured data helpers
