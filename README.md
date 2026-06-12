# Tweet Card Studio

Create clean tweet-style images directly in the browser, then download them as crisp PNGs.

Tweet Card Studio is a minimal Next.js app for composing social-post cards without a backend, login, Twitter/X API, database, or AI. Edit the preview inline, upload local images, switch between horizontal and vertical formats, and export only the card.

## Demo

Suggested Vercel project/domain:

```text
tweet-card-studio.vercel.app
```

Vercel domains are first-come, first-served, so use that if available. Good backups:

- `post-card-maker.vercel.app`
- `clean-tweet-card.vercel.app`

## Features

- Inline editing for name, handle, post text, time, and date.
- Avatar upload with circular crop.
- Main image upload with `object-fit: cover`.
- Optional image block removal and restore.
- Horizontal tweet-style format.
- Vertical 9:16 story/reel-style format.
- Minimal menu hidden behind the three-dot button.
- Client-side PNG export with `html-to-image`.
- No backend and no external APIs.

## Tech Stack

- **Framework**: Next.js + React + TypeScript
- **Styling**: Tailwind CSS
- **Export**: `html-to-image`
- **Icons**: Lucide React
- **Package manager**: pnpm

## Getting Started

```bash
pnpm install
pnpm dev
```

Open:

```text
http://127.0.0.1:3000
```

## Useful Scripts

```bash
pnpm dev      # Start local development server
pnpm lint     # Run Next.js lint checks
pnpm build    # Create a production build
pnpm start    # Start the production server
```

## How It Works

The app keeps all post data in React state. The card preview is the source of truth for editing: text fields are `contentEditable`, images are read as data URLs for reliable client-side export, and the export button renders only the card node to PNG at high pixel ratio.

Controls such as upload buttons, remove buttons, menus, focus rings, and editor states are hidden during export so the downloaded file matches the clean preview.

## Deploying to Vercel

The easiest path is to import the public GitHub repo in Vercel and select the default Next.js settings.

For GitHub Actions CI/CD, this repo includes `.github/workflows/vercel.yml`. Add these GitHub repository secrets:

```text
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID
```

You can get the IDs locally after linking the project:

```bash
pnpm dlx vercel link
pnpm dlx vercel env pull .env.local
```

Then copy the values from `.vercel/project.json` into GitHub secrets:

```text
orgId     -> VERCEL_ORG_ID
projectId -> VERCEL_PROJECT_ID
```

## Publishing

The project is currently local. Suggested commands:

```bash
git status
git add .
git commit -m "feat: add tweet image generator"
```

Then create a public GitHub repo and push:

```bash
gh repo create tweet-card-studio --public --source=. --remote=origin
git branch -M main
git push -u origin main
```

If you prefer a different memorable name, replace `tweet-card-studio`.

## License

Personal project by Carlos Ferreras.
