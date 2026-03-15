# Studio CMS

Production-ready starter for studio websites using Next.js + Payload CMS.

## Tech Stack

- Next.js (App Router), React, TypeScript
- Payload CMS v3
- PostgreSQL
- Tailwind CSS
- S3-compatible media storage

## Prerequisites

- Node.js 20+
- `pnpm`
- Docker (for local PostgreSQL via `docker compose`)

## Quick Start

1. Install dependencies

```bash
pnpm install
```

2. Create env file

```bash
cp .env.example .env
```

3. Start database

```bash
pnpm db:up
```

4. Run migrations

```bash
pnpm db:migrate
```

5. Seed starter content (includes media)

```bash
pnpm db:seed
```

6. Start development server

```bash
pnpm dev
```

## Seed Data

- Public starter seed is in `seed/`.
- Main script: `seed/index.ts`.
- Structured seed data: `seed/data/`.
- Starter images: `seed/assets/images/`.

`pnpm db:seed` is designed to be repeatable and fails fast if required media files or mappings are missing.

## Project Structure

- `src/collections` - Payload collections and globals
- `src/server/queries.ts` - server-side cached queries
- `src/lib/metadata.ts` - metadata helpers
- `src/lib/json-ld.ts` - JSON-LD helpers
- `seed` - public seed script, data, and starter media
