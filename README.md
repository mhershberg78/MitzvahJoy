# MitzvahJoy (MVP)

Gift money for bar/bat mitzvahs: **90% to the child, 10% to a pre-vetted Canadian charity**.

## Stack
- Next.js (App Router) + API routes
- Stripe Checkout + Connect (split via Transfers)
- Prisma + PostgreSQL (Supabase)
- NextAuth (magic-link email)
- Resend/Postmark for charity receipt requests

## Quick start (dev)
1. `cp .env.example .env.local` and fill values
2. `npm i`
3. `npx prisma migrate dev`
4. `npm run dev` → http://localhost:3000
