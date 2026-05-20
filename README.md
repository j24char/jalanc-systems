# Jalanc Systems LLC — Website

A Next.js 14 portfolio site for Jalanc Systems LLC.

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **CSS Modules** (no Tailwind — full custom design system)

## Getting Started

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout (metadata, global CSS)
│   ├── page.tsx            # Home page (hero, capabilities, work, reviews, process, contact)
│   ├── page.module.css
│   └── work/
│       └── [slug]/
│           ├── page.tsx    # Dynamic project detail page
│           └── page.module.css
├── components/
│   ├── Nav.tsx / .module.css
│   ├── Footer.tsx / .module.css
│   ├── FadeUp.tsx          # Scroll animation wrapper
│   ├── Marquee.tsx / .module.css
│   └── ContactForm.tsx / .module.css
├── data/
│   ├── projects.ts         # ← ADD YOUR PROJECTS HERE
│   └── reviews.ts          # ← ADD YOUR REVIEWS HERE
└── styles/
    └── globals.css         # Design tokens (CSS variables), shared utilities
```

## Adding a New Project

Edit `src/data/projects.ts` and add a new object to the `projects` array:

```ts
{
  slug: 'my-project',       // URL: /work/my-project
  num: '005',
  name: 'My Project',
  type: 'Web App — SaaS',
  tagline: 'One-line description.',
  description: 'Full paragraph overview.',
  challenge: 'What problem did the client have?',
  solution: 'How did you solve it?',
  outcome: 'What were the measurable results?',
  stack: ['React', 'Node.js', 'Postgres'],
  status: 'Live',           // 'Live' | 'Private' | 'App Store' | 'Case Study'
  year: '2025',
  duration: '12 weeks',
  role: 'Sole Developer',
}
```

The page at `/work/my-project` is automatically created — no other changes needed.

## Deploying to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repo at [vercel.com](https://vercel.com) for automatic deploys on every push.
