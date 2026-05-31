# Insurance Activation Platform

Internal tool that runs the **done-for-you credentialing service** (the "Insurance Activation" offer) for therapist clients. Phase 0 of the system described in `therapist-insurance-playbook.md`; it operationalizes `insurance-activation-sop.md`.

## What it does (Phase 0)

- **Clients** — add a therapist, auto-seed their document checklist from the SOP.
- **Document checklist** — track which onboarding docs are in.
- **Payer applications** — one row per client × payer, with the full SOP status flow
  (not started → submitted → pending verification → approved / closed panel …),
  follow-up dates, and contact notes.
- **Dashboard** — applications in flight, panels approved, **follow-ups due today**, and
  **CAQH re-attestations** coming due (120-day cycle).

## Stack

- Next.js 14 (App Router) + TypeScript + Tailwind
- Supabase (Postgres) via `@supabase/ssr`

## Run locally

```bash
npm install
cp .env.example .env.local   # fill in Supabase URL + anon key
# apply supabase/migrations/0001_init.sql to your Supabase project
npm run dev
```

Visit http://localhost:3000. Without env vars set, pages show a setup notice instead of crashing.

## ⚠️ Before production

This MVP has **no authentication and no row-level security yet**. It stores therapist PII
(license, NPI, practice info), so before any real client data goes in:

1. Add Supabase Auth (login) + middleware session refresh.
2. Enable **RLS** on all tables.
3. Sign BAAs only become necessary once patient PHI (billing) is added — credentialing data
   is provider PII, but still lock it down.

## Roadmap (from the playbook)

- **Phase 1:** eligibility/VOB automation (Nirvana/Stedi), superbill/OON module.
- **Phase 2:** full claims + ERA posting + denial/appeal queue.
- **Phase 3:** EHR integrations (Tebra API first), self-serve onboarding.
