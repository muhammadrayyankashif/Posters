# Poster Generators

A collection of event poster generators built with Next.js, React, and TypeScript. Each event folder is a separate application; the multiple New Year versions are preserved to show their iterations.

## Projects

### 2025

- `2025/Cedar-CODES` — Cedar CODES poster generator.
- `2025/Independence-Day` — Independence Day poster generator.
- `2025/Independence-Day-UOK` — University of Karachi Independence Day variant.
- `2025/World-Heart-Day` — World Heart Day poster generator.
- `2025/World-Mental-Health-Day` — World Mental Health Day poster generator.

### 2026

- `2026/Cedar-CODES` — Cedar CODES poster generator.
- `2026/New-Year`, `2026/New-Year-II`, and `2026/New-Year-III` — New Year generator iterations.

## Run an app

Choose an event folder, install its dependencies, and start its development server:

```sh
cd 2026/Cedar-CODES
npm install
npm run dev
```

Other folders have their own `package.json` and lockfile; use the lockfile in that folder when installing.

## Cloudinary uploads

Some generators include an optional server-side Cloudinary upload endpoint. Configure `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET` in a local `.env.local` file before using that feature. Never commit `.env.local` or real credentials. Poster rendering and download can work independently of server-side upload.

Uploaded posters may contain the photo and text entered by the user. Treat those uploads as public images in the configured Cloudinary account.
