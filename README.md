# ForgeNet

ForgeNet is a polished MVP for an industrial capacity exchange: a marketplace for underutilized production, processing, storage, and logistics capacity. It is built as a demo-ready concept product that feels operationally credible without pretending to run regulated payments, legal certification, or live verification.

## Why ForgeNet exists

Industrial supply is often under-monetized while SMEs still source capacity through calls, referrals, and fragmented spreadsheets. ForgeNet reframes the market around bookable capacity, not generic supplier discovery.

The MVP moat is communicated through:

- Verified supply-side industrial providers
- Structured capacity discovery and ranked matching
- Trust and compliance workflow rails
- Milestone-based booking visibility
- Audit-friendly operating records

## MVP scope

This repository implements one believable end-to-end flow:

1. Buyer submits a requirement
2. ForgeNet ranks marketplace matches
3. Buyer requests and reviews a quote
4. Buyer accepts a quote and confirms a booking
5. Milestone tracking continues through completion

It also includes:

- Premium landing page
- Searchable marketplace explorer
- Buyer request form with validation
- Match results with scoring explanations
- Quote review and downloadable summary
- Provider dashboard
- Admin / operations dashboard
- Trust and compliance page
- Demo role switching
- English, Shona, Ndebele, and Venda UI support

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn-style UI primitives
- Prisma
- SQLite
- Zod
- React Hook Form
- Framer Motion
- Recharts
- Lucide icons

## Project structure

- `src/app` App Router pages, layouts, route handlers, and server actions
- `src/components` UI components, charts, motion, and forms
- `src/lib` demo data, matching logic, session helpers, validation, and utilities
- `prisma/schema.prisma` data model
- `prisma/seed.ts` seed script for local demo data

## Environment variables

Create `.env` from `.env.example`.

```bash
DATABASE_URL="file:./dev.db"
```

## Setup

```bash
npm install
npm run db:push
npm run db:seed
npm run dev
```

Open `http://localhost:3000`.

## Local development

- `npm run dev` starts the app locally
- `npm run lint` runs ESLint
- `npm run typecheck` runs TypeScript checks
- `npm run build` verifies the production build

## Prisma commands

```bash
npm run db:generate
npm run db:push
npm run db:seed
```

## Demo accounts

Authentication is intentionally mocked for presentation speed. The login screen lets you switch roles instantly.

- Buyer: `buyer@forgenet.demo` / `ForgeNet123!`
- Provider: `provider@forgenet.demo` / `ForgeNet123!`
- Admin: `admin@forgenet.demo` / `ForgeNet123!`

## Key screens

- Landing page: product story, moat, trust rails, and CTAs
- Marketplace: capacity listings with filters for category, location, verification, turnaround, and price
- Buyer request flow: validated requirement intake
- Match results: ranked provider matches with score reasoning
- Quote flow: quote review and booking confirmation
- Booking flow: milestone progression and governance trail
- Provider dashboard: open requests, utilization, mix, and activity
- Admin dashboard: verification queue, moderation, bookings, and trust overview
- Trust page: realistic governance posture and verification rails

## Deployment to Vercel

1. Push the repository to GitHub.
2. Import the repo into Vercel.
3. Set the environment variable `DATABASE_URL`.
4. Deploy the app.

Recommended for demo use:

- Keep SQLite for local development only.
- For hosted persistence, move Prisma to a Vercel-compatible database before treating the app as anything beyond a demo.

## Mocked subsystems and tradeoffs

- Authentication is mocked with role cookies for demo speed.
- Provider verification is represented as workflow state, not real-world certification.
- Payments, escrow, milestone release, and disputes are placeholders.
- Matching is rule-based, designed to feel credible rather than algorithmically advanced.
- Session-backed live request / quote / booking state is cookie-based for a friction-light demo flow.
- SQLite is used locally for speed and simplicity.

## Future roadmap

- Saved searches and provider comparison
- Persistent auth with real role management
- File uploads for provider verification packs
- Notification center with read states
- Real provider onboarding workflows
- Multi-tenant admin controls
- Hosted relational database for production-style persistence
- Search and ranking enhancements based on utilization and historical performance

## Vercel deployment notes

- The frontend is ready for Vercel deployment as a Next.js app.
- Route handlers and server actions are contained inside the same application for simplicity.
- If you want seeded hosted data, replace SQLite with a managed Postgres-compatible datasource and run Prisma migrations against that target.

## Git commands

If Git is not initialized locally, run:

```bash
git init
git branch -M main
git remote add origin https://github.com/dondonMD/forgnet.git
git add .
git commit -m "Build ForgeNet MVP"
git push -u origin main
```

If the repo is already initialized:

```bash
git add .
git commit -m "Polish ForgeNet MVP"
git push origin main
```
