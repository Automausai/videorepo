# Execution Plan — Insurance Activation

*Master plan for launching the done-for-you insurance-credentialing service for solo therapists, with a software platform (internal ops console + client portal) as the core. Approve/edit this before we build further.*

**Decisions locked (2026-05-31):** Build the software first → then sell. Deliver credentialing **in-house** ourselves at first (to learn it). Software v1 = **internal ops tool + client-facing portal**. Claude builds across sessions; you direct and review.

---

## 1. Strategy & sequence

The plan is **build → learn on real cases → soft launch → scale**:

1. **Build the platform** to production-ready with auth, security, and a client portal.
2. **Learn delivery in parallel** by running 1–2 real credentialing cases by hand, feeding what we learn back into the software.
3. **Soft launch** to existing SEO clients using the portal as the demo.
4. **Scale** once the SOP + software are proven (then optionally hire a VA / subcontract overflow).

Why this order: doing credentialing ourselves first means the software gets built around how the work *actually* flows, not a guess — and the client portal becomes the thing that makes the offer feel premium and worth $2,997.

---

## 2. Where we are today (already done)

- **Strategy docs:** `therapist-insurance-playbook.md`, `insurance-activation-sop.md`.
- **Stripe (live, Automaus.ai):** Insurance Activation $2,997 one-time + Insurance Maintenance $99/mo, both with working payment links.
- **Software Phase 0 (built, compiles clean):** Next.js 14 + Supabase + Tailwind app with clients, auto-seeded document checklist, per-payer application tracker (full SOP status flow), and a dashboard (follow-ups due, CAQH re-attestation alerts). Runs without a DB (shows setup notice).
- **Not yet:** no database connected, no auth, no RLS, no client portal, no file uploads, no email.

---

## 3. Target architecture

**One Next.js app, three surfaces:**

| Surface | Who | What |
|---|---|---|
| `(staff)` ops console | Your team | Manage all clients, applications, documents, follow-ups (today's dashboard + more) |
| `(portal)` client portal | The therapist | Log in, upload documents, watch their credentialing status live, see status updates |
| `(auth)` | Both | Login (magic link), invite acceptance |

**Backend: Supabase** — Postgres (data) + Auth (logins) + Storage (uploaded documents) + Row-Level Security (each therapist sees only their own record; staff see all).

**Roles:** `staff` (full access) and `client` (their own record only), enforced by RLS via a `profiles` table that links each auth user to a client.

**Hosting:** Vercel (fastest path for Next.js; recommended) — or Cloudflare if you prefer (you have it connected, but it needs extra adapter work for Next.js).

**Email:** Resend for transactional/reminders (recommended) — or Supabase's built-in auth emails to start.

---

## 4. Data model (additions to what exists)

Existing: `clients`, `applications`, `documents`. Add:

- **`profiles`** — `id` (= auth user id), `role` (`staff`/`client`), `full_name`, `client_id` (nullable; links a portal user to their therapist record).
- **Document files** — a Supabase Storage bucket `client-docs`; store the file path + uploaded-by on each `documents` row (clients upload, staff verify).
- **`activity_log`** — `client_id`, actor, action, detail, timestamp. Powers the portal status timeline and an audit trail.
- **`payers`** (reference) — standardized payer names + per-state application notes, so payer data isn't free-text-only.

All tables get **RLS enabled** with explicit staff/client policies.

---

## 5. Build milestones (each one shippable on its own)

> Sizing is relative effort, not calendar dates. We ship and review at each milestone.

### M0 — Foundation & deploy *(small)*
- Create a **dedicated Supabase project** for this (keeps it clean from your other 3 projects).
- Apply `0001_init.sql`; wire env vars; deploy to Vercel at a real URL.
- **Outcome:** the current app runs on a live database at a shareable URL.

### M1 — Auth, roles & security *(medium)* ← gate before any real PII
- Supabase Auth + login page + middleware session refresh.
- `profiles` table + role; seed the first staff user (you).
- **Enable RLS** on every table with staff/client policies.
- **Outcome:** login-gated, data locked down — safe to put real therapist info in.

### M2 — Client portal *(large — the differentiator)*
- `/portal`: therapist logs in, sees their credentialing status (read-only application tracker), their document checklist, and status updates.
- **Document upload** via Supabase Storage (drag-drop; staff get notified, mark verified).
- Staff "invite client" flow: creates the auth user + profile, links to the client record, sends the invite email.
- **Outcome:** therapists upload docs and watch progress live. This is the premium sales story.

### M3 — Notifications & workflow automation *(medium)*
- Email reminders: follow-ups due (14-day cadence), CAQH re-attestation (120-day), document requests to clients.
- Scheduled job (Supabase cron / Vercel cron) for daily digests.
- Activity log surfaced as a portal timeline.
- **Outcome:** the system nudges; nothing relies on memory.

### M4 — Billing in-app *(small–medium)*
- Connect Stripe to the client record: "Activate" → Checkout (reuse existing products), webhook marks paid, tracks the $99/mo subscription status per client.
- **Outcome:** payment is tied to the client record, not a loose link.

### M5 — Hardening & launch readiness *(medium)*
- Audit logging, data retention/deletion policy, backups, error monitoring, a security pass, payer reference seed data, UI polish + empty states.
- **Outcome:** production-ready for the first real paying clients.

---

## 6. Delivery operations (in-house — runs in parallel with the build)

Because we're doing credentialing ourselves first:
1. **Pick a beachhead market/state** (wherever your SEO clients cluster) and learn its top 3 payers' application paths.
2. **Run one real case by hand** using the SOP — ideally a friendly existing client — to learn CAQH, payer portals, and the real stalls. Feed every friction point into the software backlog.
3. **Document the per-payer specifics** into the `payers` reference table as we learn them (this becomes a moat).
4. Decide later (post-proof) whether to keep in-house, hire a VA, or subcontract overflow.

---

## 7. Go-to-market (after M2 is live)

- **Soft launch** to existing SEO clients with the portal as the live demo.
- Pricing already set: **$2,997 Activation + $99/mo**. Add a **50% deposit** option ($1,498.50) to lower the close friction.
- Assets to produce (I can draft): sales one-pager, warm-outreach email, 15-min "insurance fit" call script.
- Target: **3–5 paid pilots** from your warmest clients.

---

## 8. Compliance & security

- **Now (credentialing):** data is the therapist's own PII (license, NPI, SSN, banking) — **not patient PHI**, so no HIPAA/BAA obligation yet. Still: RLS, encryption (Supabase default), least-privilege access, audit log.
- **Later (if we add billing/claims):** that introduces **patient PHI** → triggers HIPAA. Sign BAAs (Supabase, Vercel, clearinghouse) and add the Security Rule safeguards *before* that phase. The architecture is built so this is an add-on, not a rebuild.
- Data retention + deletion-on-offboarding policy in M5.

---

## 9. Risks & mitigations

| Risk | Mitigation |
|---|---|
| Real PII entered before security is ready | M1 (auth + RLS) ships before any real client data |
| Portal scope creep delays launch | Ship M1 before M2; portal is read-only status + upload in v1, nothing fancy |
| Credentialing learning curve | Run one real case by hand early; capture specifics in `payers` table |
| Closed panels / payer delays disappoint clients | SOP already guarantees the *work*, not the payer's yes; portal status keeps clients informed |
| Dependency security advisories (e.g. Next.js) | Keep deps patched; already on patched 14.2.35 |
| "Build first" delays revenue | Soft-launch the moment M2 is demoable — don't wait for M5 |

---

## 10. Decisions needed from you (to start M0)

1. **Supabase project:** new dedicated project (recommended) vs. one of your existing three?
2. **Hosting:** Vercel (recommended) vs. Cloudflare?
3. **Custom domain** for the app/portal (e.g. `app.automaus.ai`) — or use the default deploy URL for now?
4. **Email provider:** Resend (recommended) vs. Supabase built-in to start?
5. **Auth method:** magic-link email (recommended, simplest + secure) vs. password?

Sensible defaults if you'd rather I just proceed: **new Supabase project · Vercel · default URL for now · Supabase auth emails to start · magic link.**

---

## 11. Immediate next steps (once approved)

1. Confirm the section-10 decisions (or take the defaults).
2. **M0:** create the Supabase project, apply the migration, deploy — get a live URL you can click.
3. **M1:** auth + RLS so it's safe for real data.
4. Then **M2** (portal), reviewing with you at each milestone.

*Nothing in M0+ executes until you approve this plan.*
