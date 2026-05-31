# Insurance Activation — Delivery SOP & Client Checklist

*The repeatable system for delivering the done-for-you "Insurance Activation" (credentialing) service. Hand this to a VA, subcontractor, or new ops hire and they can run it. Companion to `therapist-insurance-playbook.md`.*

**What this service delivers to the client:** in-network status with 5–7 insurance payers in ~90 days (target), fully done for them — CAQH build, document collection, per-payer applications, follow-up, and handoff to the $99/mo maintenance plan.

**What it does NOT promise:** guaranteed acceptance on every panel. Some panels are *closed* by geography (UnitedHealthcare especially) and reject regardless of qualifications. **We guarantee the work — complete, correct, tracked submissions — not the payer's yes.** Say this out loud during the sale.

---

## 0. Before you sell a single one — set up these tools (one time)

| Need | Tool (any equivalent works) |
|---|---|
| Client tracker / pipeline | Airtable, Notion, or a CRM (one row per client × per payer) |
| Secure document vault | Google Drive (restricted) / Dropbox + access controls; encrypt at rest |
| Reminder/task system | Calendar + recurring tasks for 120-day CAQH re-attestation |
| E-sign + intake forms | DocuSign / Jotform for the authorization + data-collection form |
| Shared inbox / phone | A dedicated email + a number for payer follow-up calls |

**Data note (read once):** Credentialing handles the *therapist's* own data (license, SSN, malpractice, banking) — that's **provider PII, not patient PHI**, so the heavy HIPAA/BAA machinery isn't triggered yet. Still: signed service agreement + provider authorization to act on their behalf, restricted file access, encryption, and no data sharing. HIPAA/BAA obligations begin only when you add billing later.

---

## 1. The pipeline at a glance (6 phases)

```
INTAKE → AUTHORIZE → BUILD (NPI/CAQH) → SUBMIT (per payer) → FOLLOW-UP → CLOSE-OUT → handoff to $99/mo
 Day 0     Day 0-3      Day 3-10           Day 7-14            Week 2-12      on approval
```

Most time is *waiting* in FOLLOW-UP. One operator can run dozens of clients at once because they're all in different waiting stages.

---

## 2. Phase-by-phase SOP

### Phase 1 — Intake (Day 0)
- [ ] Send welcome email + intake form + service agreement (collect fee here: full upfront or 50/50).
- [ ] Set expectations in writing: **3–6 month timeline**, closed-panel caveat, what we need from them, response-time expectation (they reply to doc requests within 48h or the clock pauses).
- [ ] Create their record in the tracker. Pick the **target payer list** with them (start with the 3 most common local payers + 2–4 more; 5–7 total).

### Phase 2 — Authorize & collect documents (Day 0–3)
Send the **Client Document Checklist** (Section 4). You cannot proceed without:
- [ ] Signed authorization to act on their behalf (CAQH + payer portals)
- [ ] NPI number (or authority to register one)
- [ ] State license(s) — active, not expiring within 90 days
- [ ] Malpractice insurance certificate (commonly $1M/$3M)
- [ ] CV with **all gaps explained** (payers reject unexplained gaps)
- [ ] W-9 / EIN (or SSN if sole proprietor), practice address, bank info for EFT
- [ ] Government ID, diploma/degree, any board certifications

**Critical:** Capture the practice name, address, and provider name **exactly** as they appear on the license. The #1 stall is a mismatch (middle initial, suite number) across CAQH/application/license. Standardize it now and reuse the exact string everywhere.

### Phase 3 — Build NPI + CAQH (Day 3–10)
- [ ] Confirm/register **NPI Type 1** (free, NPPES, issued in days). Type 2 only if they bill as a group entity.
- [ ] Create or update **CAQH ProView** profile; upload all docs.
- [ ] **Attest** the profile (and diary the re-attestation for +120 days — this recurs forever).
- [ ] Authorize each target payer to access the CAQH profile.
- [ ] QA pass: name/address/dates consistent across NPI, CAQH, license, and W-9.

### Phase 4 — Submit applications (Day 7–14)
For **each** target payer (run the Payer Tracker, Section 5):
- [ ] Locate the correct application/contract path (some payers: online portal; some: PDF + email; some: provider rep).
- [ ] Submit application + link CAQH.
- [ ] Record submission date, confirmation/reference number, and contact.
- [ ] Set first follow-up reminder for **+14 days**.

### Phase 5 — Follow-up (Week 2–12, the long game)
This is where deals are won or lost. Run a **cadence**:
- [ ] Every **14 days** per payer: check status (portal or phone), log it, re-set the next reminder.
- [ ] If "pending verification" → confirm nothing is missing; fix immediately.
- [ ] If "additional info requested" → turn it around within 48h.
- [ ] If **closed panel** → log it, request waitlist/exception, note "reapply in ~90 days," and tell the client (set expectation, don't hide it).
- [ ] Send the client a **status update every 2 weeks** even when nothing changed (silence reads as failure — see template in Section 6).

### Phase 6 — Close-out & handoff (on approval)
Per approved payer:
- [ ] Record **effective date** and contracted rates; save the executed contract to the vault.
- [ ] Confirm EDI/ERA enrollment for that payer (needed before clean claims flow).
- [ ] When the agreed number of panels is live (or all attempted), send the **completion summary**: panels approved, effective dates, panels closed/pending, next steps.
- [ ] **Transition to $99/mo:** turn on CAQH re-attestation monitoring, license/malpractice expiry tracking, and (if they bought it) eligibility/claims tooling. This is the recurring revenue moment — make the handoff feel like a graduation, not an ending.

---

## 3. SLAs & timeline (what to put in the agreement)

| Milestone | Target |
|---|---|
| CAQH built + attested | Within 10 business days of receiving complete docs |
| All applications submitted | Within 14 business days of complete docs |
| Follow-up cadence | Every 14 days per payer until resolved |
| Client status updates | Every 2 weeks |
| Typical first approvals | 60–120 days (payer-dependent) |
| CAQH re-attestation | Every 120 days (ongoing, under $99/mo) |
| Re-credentialing | Every 2–3 years (ongoing) |

**Clock-pause clause:** timeline pauses whenever we're waiting on the client for documents/signatures beyond 48h.

---

## 4. CLIENT-FACING — Document Checklist

> *Send this to the therapist on Day 0. "Reply with these and we handle the rest."*

**Identity & credentials**
- [ ] NPI number (we'll register one if you don't have it)
- [ ] Active state license(s) — copy
- [ ] Government-issued photo ID
- [ ] Degree/diploma + any board certifications
- [ ] Current CV/resume — **please explain any employment gaps**

**Insurance & business**
- [ ] Malpractice (professional liability) insurance certificate
- [ ] W-9 and EIN (or SSN if you're a sole proprietor)
- [ ] Practice name + address (exactly as on your license)
- [ ] Bank account info for electronic payments (EFT)

**Access (we'll send forms to e-sign)**
- [ ] Authorization for us to manage your CAQH profile
- [ ] Authorization to submit applications on your behalf
- [ ] CAQH login (if you already have one) — or we create it

**Your target payers**
- [ ] Tell us which insurers your ideal clients use (or let us recommend the top local ones)

*Turnaround tip: clients who return everything in week 1 get credentialed weeks faster. The wait is the payers, not us — so the sooner we submit, the sooner you're earning.*

---

## 5. Payer Application Tracker (template)

One row **per client per payer**:

| Field | Example |
|---|---|
| Client | Jane Smith, LCSW |
| Payer | Aetna |
| Submission method | Provider portal |
| Date submitted | 2026-06-03 |
| Confirmation # | AET-558213 |
| Status | Pending verification |
| Last contact | 2026-06-17 (phone, rep "Dana") |
| Next follow-up | 2026-07-01 |
| Outcome | Approved / Closed panel / Pending |
| Effective date | 2026-08-15 |
| Contracted rate (90834) | $128 |
| Notes | Requested updated COI; sent 6/18 |

**Status values:** Not started · Docs pending · Submitted · Pending verification · Info requested · Approved · Closed panel · Denied · Reapply later

---

## 6. Email templates

**A) Welcome / expectations (Day 0)**
> Welcome aboard! Here's how Insurance Activation works. We're getting you in-network with [N] payers so you stop turning away insured clients. **Step 1 (you):** reply with the attached checklist within the next few days — the faster we have your docs, the faster we submit. **Step 2 (us):** we build your CAQH, submit every application, and chase the payers for you. **Timeline:** approvals typically land in 60–120 days — that's the insurers' pace, not ours, and we'll update you every two weeks. **Heads-up:** occasionally a payer's panel is "closed" in your area and they decline regardless of qualifications — if that happens we'll tell you and pursue alternatives. Questions anytime.

**B) Bi-weekly status update**
> Quick update on your credentialing: [Aetna — submitted, in verification, next check 7/1] · [Cigna — additional doc requested, we've sent it] · [UHC — panel currently closed in your area, we've requested an exception]. Nothing needed from you right now. Next update in two weeks.

**C) Info-request to client (turn around fast)**
> [Payer] needs one more item to proceed: [X]. Can you reply with it in the next 48 hours? This is on the critical path — every day here delays your effective date.

**D) Completion summary**
> 🎉 You're in-network. **Approved:** Aetna (effective 8/15, 90834 @ $128), Cigna (effective 8/20). **Still pending:** Optum. **Closed for now:** UHC — we'll reattempt in ~90 days. From here, your $99/mo plan keeps your CAQH attested every 120 days, tracks your license/malpractice expirations, and runs eligibility checks so claims stay clean. Nothing for you to manage — that's the point.

---

## 7. Common stalls & instant fixes

| Symptom | Cause | Fix |
|---|---|---|
| Application stuck "pending" for weeks | Name/address mismatch across CAQH/license/app | Standardize to the exact license string; resubmit corrected |
| Everything silently froze | CAQH attestation lapsed (>120 days) | Re-attest immediately; payers can't see the profile until you do |
| "Provider not accepting new applications" | Closed panel (geographic cap) | Request waitlist/exception; diary reapply +90 days; tell client |
| Approval but no payments | EDI/ERA not enrolled for that payer | Complete per-payer EDI/ERA enrollment |
| Application returned incomplete | Unexplained CV gap or expired doc | Add gap explanation / refresh the expiring doc; resubmit |

---

## 8. Delivery model — how to staff it (cheapest → most built-out)

1. **Subcontract / white-label (start here):** freelance credentialing specialists do the work at ~$100–300/panel. You sell at ~$2,997, own the client + brand, pocket the margin, build the SOP from what you learn. Near-zero difficulty; validates demand before you hire.
2. **VA + this SOP:** once volume is steady, train one ops person on this document. Margins jump.
3. **In-house + software:** automate CAQH reminders, doc collection, and the tracker; integrate clearinghouses. Phase 2/3 — only at scale.

**Metric to watch:** time-from-complete-docs → first approval, and # active clients per operator. Those two numbers tell you when to move from step 1 → 2 → 3.

---

*Caveat carried from research: payer-specific timelines, closed-panel behavior, and per-panel subcontractor costs vary by state and payer; verify current specifics for your clients' markets before quoting hard guarantees.*
