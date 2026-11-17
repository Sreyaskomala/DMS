# Insulin Inside — Phase 1 Next.js foundation

This branch preserves the original Next.js app and its navy/cyan palette, while introducing protected server-backed endpoints and removing access to legacy demo purchase flows through redirects.

## Routes
- `/devices`: eligible, manually verified device-only offers; public API strips merchant identifying data.
- `/tracker`: signed-in, user-isolated health log entries (recording only; no insulin dosing recommendations).
- `/partner-portal`: signed-in partner application, pending review state; no instant activation.
- `/admin/partners`: database role restricted manual review (not automatic license verification).
- `/api/platform/*`: server-only Supabase access; validation with Zod.

## Setup
1. Provision a Supabase project. Run `supabase/migrations/0001_phase1.sql` using its SQL editor.
2. Set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in server-side Vercel project settings (never use `NEXT_PUBLIC_` for the key).
3. Keep existing `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` configured for Google sign-in.
4. Add one admin manually: `insert into public.members(email,role) values ('<admin-email>','admin');` Only a trusted operator should do this.
5. Run `pnpm install && pnpm build` in a machine with network access. Build and tests have not been executed in this environment.
6. Initially, `/devices` is intentionally empty. No invented retailers or live stock are seeded.

## Release boundaries
- **NO real checkout**, medical sales, prescription medicines or claimed cold-chain compliance. Legacy catalog pages and their simulated order actions must remain redirected off the public path.
- Application review does not establish a legally verified license. Merchant document capture, separate verification, risk review, GST checks and contractual approval are required.
- Care entries are personal health data. Before real-world use: privacy/legal review, consent, encryption/key management, MFA for privileged staff, retention/export/deletion, audit trail, rate limits, abuse controls and independent security testing.
- The prototype uses the current Google sign-in infrastructure. A production launch should use stable provider subject IDs as user keys, rather than email strings, and verify identity/session revocation behavior.
- The original AI, Sheets and other legacy code remains in the repo pending a dedicated security audit; do not treat this branch as production-certified.
