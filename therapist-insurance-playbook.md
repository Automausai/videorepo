# Streamlining Insurance for Therapists — Product & Go-to-Market Playbook

*Prepared 2026-05-30. Focus: solo private-practice mental-health therapists (LCSW, LPC, LMFT, psychologists) in the US. Goal: a sellable, implementable system that takes the insurance pain off a therapist's plate.*

> **How to read this:** Part 1 maps the insurance workflow and exactly where solo therapists get stuck (the playbook you asked for). Part 2 is the system to build and sell. Part 3 covers the market, pricing, and the recommended delivery model. Benchmarks are sourced; vendor-blog figures are flagged as "directional" — see the Caveats at the end.

---

## TL;DR — the opportunity in five lines

1. **Insurance is the #1 operational headache for solo therapists.** It's a chain of ~6 steps (credentialing → eligibility → coding → claim → remittance → denial/appeal), and a solo clinician with no billing staff loses money at every link.
2. **The two existing options are bad trades.** Marketplaces (Headway/Alma/Grow/SonderMind) make it easy but the therapist gives up their own payer contracts, rates, and client ownership. Traditional billers (TheraThink) let them keep autonomy but leave them to navigate credentialing alone.
3. **The gap = a "done-with-you" hybrid** for therapists who want their **own** Tax ID, panels, and brand, but want hand-holding + software so insurance stops hurting.
4. **Recommended model: hybrid** — one-time credentialing package + modest monthly SaaS + small % of collections. Sells easily (low fixed cost), builds recurring revenue (investor-friendly), and aligns incentives.
5. **The fear hook that sells:** the 2024–25 Optum rate cut, where platforms slashed therapist pay ~30% overnight and clinicians had no say. "Own your contracts so that can't happen to you."

---

# Part 1 — The Insurance Playbook (the workflow + where therapists get stuck)

There are six links in the chain. A solo therapist is the bottleneck on all of them.

### Step 1 — Credentialing & enrollment (getting on panels)
**Process:** Get an individual **NPI Type 1** (free, issued in days via NPPES) → build a **CAQH ProView** profile (the central database payers pull from) → gather docs (license, CV with gap explanations, malpractice insurance ~$1M/$3M, W-9/EIN, bank info) → submit a **separate application/contract to each payer** → get verified → sign contract → receive an effective date → **re-credential every 2–3 years** and **re-attest CAQH every 120 days**.

**Benchmarks:** 90–180 days (3–6 months) per panel from submission to first in-network claim. Therapists typically join 4–7 panels; advice is to start with 2–3 locally-common payers. DIY cost is just time; credentialing services charge ~$100–$325 per payer.

**Where solo therapists get stuck:**
- **Data mismatches** — a middle initial, suite number, or address differing across CAQH/application/license triggers verification loops that add weeks.
- **CAQH lapse** — missing the 120-day re-attestation silently halts *all* pending applications. Most common stall.
- **Closed panels** — payers (notably UnitedHealthcare) cap providers by geography and reject regardless of qualifications. No reliable appeal.
- **Expired docs mid-process** (license, malpractice cert) pause everything.
- **No status visibility** — slow, unresponsive payer departments; juggling multiple portals and state rules.
- **3–6 month revenue gap** with no in-network billing until the effective date.

### Step 2 — Eligibility & benefits verification (VOB)
**Process:** Before sessions, verify per patient/plan-year: active coverage + dates, **deductible remaining** (biggest variable), copay vs coinsurance for *behavioral health* (often differs from medical), **visit limits**, **prior authorization** (in BH, auth can be required before session one), telehealth coverage/modifiers, in-network status, and whether BH is "carved out" to a separate vendor (Carelon/Optum). Done via **270/271 EDI** (real-time), payer portals, or phone.

**Where they get stuck:** 271 EDI responses are frequently incomplete for BH — they often *don't* confirm prior-auth requirements or session limits, forcing portal/phone follow-up. Skipping or botching VOB is the single biggest upstream cause of downstream denials (>20% of denials trace to eligibility errors).

### Step 3 — Coding & charge entry
**Common therapy CPT codes:**

| Code | Use |
|---|---|
| 90791 | Diagnostic intake (no medical), once per ~6 mo/episode |
| 90832 / 90834 / 90837 | Individual psychotherapy 30 / 45 / 60 min (90834 most common; 90837 draws extra payer scrutiny) |
| 90846 / 90847 | Family therapy without / with patient present |
| 90853 | Group psychotherapy |
| 90839 / 90840 | Crisis psychotherapy |
| 90833 / 90836 / 90838 | Psychotherapy add-ons billed with E/M (med management) |
| 96130–96133 | Psychological testing |

Each code must match documented face-to-face time (AMA midpoint rule) plus an ICD-10 diagnosis. **Where they get stuck:** wrong time/CPT, missing modifiers, wrong place-of-service; 90837 is frequently downcoded by payers.

### Step 4 — Claim submission
**Process:** Build claim as **CMS-1500** (paper) / **837P** (electronic, HIPAA-mandated, 33 fields) → route through a **clearinghouse** (Availity, Office Ally, Change Healthcare) that scrubs and forwards to the payer. **Where they get stuck:** no clearinghouse setup, per-payer EDI enrollment friction, and timely-filing deadlines missed because life got in the way. (Context: the **Feb 2024 Change Healthcare ransomware outage** — CHC handles ~50% of US medical claims — froze submissions for ~2 months and exposed how fragile single-clearinghouse dependence is.)

### Step 5 — Remittance & payment posting
**Process:** Payer adjudicates → sends **ERA (835)** electronic / **EOB** paper with reason codes → therapist reconciles payments to claims, routes denials to rework, and bills patient responsibility. **Where they get stuck:** no time to reconcile; ERAs pile up; patient balances (copay/coinsurance/deductible) go uncollected — best practice is collecting at time of service, because for one-time clients "it's likely you'll never receive it."

### Step 6 — Denials & appeals
**Where they get stuck:** **~50–65% of denied claims are never reworked** — pure lost revenue — because a solo therapist has no one to chase them. Top denial reasons: eligibility errors (~24%), missing prior auth/referral (~9% of 2024 in-network denials per KFF), medical-necessity challenges (acute in BH, where each session must justify necessity), coding errors, and timely-filing lapses.

### Key benchmarks (the numbers that justify the product)

| Metric | Value | Source |
|---|---|---|
| ACA in-network claim denial rate | **19%** (2024) | KFF (government-grade) |
| All-payer initial denial rate | **11.8%** (2024) | RCM industry |
| Behavioral-health denial rate | **~12–20%**, ~2× med/surg | Vendor RCM *(directional)* |
| First-pass clean-claim target | **92–95%+** | BH RCM benchmarks |
| Days in A/R (healthy) | **<30–40 days** | MGMA DataDive |
| Denied claims never reworked | **~50–65%** | RCM industry *(directional)* |
| Cost to rework one denial | **~$25 (practice) to $118+** | MGMA / AHIMA |
| Denied claims actually appealed | **<1%**; 66% of appeals upheld | KFF |
| Mental-health claims denied more often than other claims | **~30% vs 19%** (2023) | Vendor *(directional)* |
| Patients ~5.2× more likely to go out-of-network for BH than medical | 2017 (up from 2.8× in 2013) | Milliman |
| Typical billing-service fee | **5–8% of collections** (range 4–10%) | Industry consensus |
| Credentialing service fee | **$100–$325 per payer** | Industry |

### In-network vs out-of-network economics (why this matters for positioning)
- **In-network** typical reimbursement: 90834 ~$100–160, 90837 ~$100–220 (master's-level lower, psychologist higher). Slow pay, stagnant rates — **82% of psychologists** (APA 2024) cite insufficient reimbursement as why they avoid going in-network.
- **Out-of-network / private pay:** therapist sets and collects the full fee upfront; client recovers **40–80%** (one cited average ~70%) via a **superbill** after meeting their OON deductible.
- **OON reimbursement vendors:** Mentaya (~5%/claim), Thrizer (instant pay; ~1–5% client fees), Reimbursify (~$3.99/claim), Advekit.

> **Strategic read:** A meaningful slice of solo therapists are OON precisely *because* in-network insurance is so painful. That means your system has **two sellable jobs**: (a) make in-network actually workable, and (b) make OON reimbursement effortless for clients (which helps therapists keep cash-pay clients without scaring them off on cost). You can serve both.

---

# Part 2 — The System to Build & Sell

### Design principle: keep the therapist's autonomy
Build everything **under the therapist's own Tax ID / NPI** — their panels, their contracts, their clients. This is the deliberate wedge against the marketplaces (see Part 3).

### Core components
1. **Credentialing engine (the highest-value, most painful job)** — guided CAQH setup, document vault with expiry tracking, **automated 120-day re-attestation reminders**, per-payer application tracking with status visibility, and a human concierge for the parts that require phone calls. This is your strongest paid wedge.
2. **Eligibility/VOB automation** — real-time benefits checks at booking, surfacing deductible remaining, copay/coinsurance, visit limits, prior-auth flags, and telehealth coverage in plain language.
3. **Claims + RCM** — coding assist, 837P generation, clearinghouse submission, ERA/835 auto-posting, denial detection, and a **rework/appeal queue** (this recovers the 50–65% of denials that solo therapists abandon).
4. **Patient billing** — card-on-file, collect-at-time-of-service, automated balance follow-up.
5. **OON module** — auto-generated superbills + integration with a reimbursement rail (Mentaya/Thrizer-style) so cash-pay clients get reimbursed effortlessly.
6. **Dashboard** — one screen showing credentialing status, claims in flight, denials to fix, and money collected. Visibility is itself a selling point because therapists have none today.

### Build vs. buy — leverage APIs, don't reinvent
The therapist-favorite EHRs are largely **closed** (SimplePractice and TherapyNotes have no public API; Jane is partner-gated; **Tebra is the most API-friendly**). So integrate where you can, and build your insurance layer on **API-first infrastructure** rather than raw EDI:

| Need | Best leverage option |
|---|---|
| Clearinghouse (eligibility/claims/ERA in JSON) | **Stedi** (API-first; free tier: 100 eligibility + 100 claims/mo, ~$0.15/claim after) or **Office Ally** (cheapest plain submission) |
| BH-specific eligibility | **Nirvana Health** Coverage API (behavioral-health benefits, "typo-proof") |
| Full revenue-cycle automation | **Candid Health** ("Stripe for insurance billing" — 837/ERA/denials) |
| Eligibility alternatives | Eligible, pVerify (note: **Opkit** was acquired by 11x in Nov 2024 — verify availability) |

**What to automate vs. keep human-in-the-loop:**
- *Automate:* eligibility checks, CAQH re-attestation reminders, claim generation/scrubbing, ERA posting, superbill generation, patient balance reminders.
- *Keep human:* payer phone calls (closed-panel pushback, prior auth, carve-out specifics), denial appeals requiring narrative, and onboarding/credentialing white-glove. This human layer is what makes it "done-with-you" and justifies premium pricing.

### Compliance (non-negotiable, gates everything)
You'll be a **HIPAA Business Associate**. Required before touching any PHI:
- **Sign a BAA** with every therapist/practice *before* receiving PHI, and **downstream BAAs** with every subcontractor (hosting, clearinghouse, support tools).
- Implement Security Rule safeguards: administrative (access controls, training, risk analysis), physical, and technical (**encryption in transit and at rest**, audit logging, authentication). Encryption alone is not sufficient.
- Breach-notification process and data-deletion-at-termination. Penalties run ~$141 to >$71,000 per violation.
- Use BAA-signing infrastructure (AWS/GCP/Azure and clearinghouses like Stedi/Availity all sign BAAs).

### Phased build path
- **Phase 0 (MVP, fastest to revenue):** Credentialing-as-a-service, mostly concierge + a tracking dashboard + document vault. Sells immediately, validates demand, requires the least tech. *Bonus: lowest PHI exposure, so lighter compliance to start.*
- **Phase 1:** Add eligibility/VOB automation (Nirvana/Stedi) and the superbill/OON module.
- **Phase 2:** Add full claims + ERA posting + denial/appeal queue (Stedi/Candid). Now you're a complete RCM + credentialing platform.
- **Phase 3:** Direct EHR integrations (start with Tebra's API; pursue SimplePractice/TherapyNotes partnerships) and self-serve onboarding to scale beyond concierge.

---

# Part 3 — Go-to-Market & Recommended Delivery Model

### Competitive landscape

| Company | Model | Therapist pays | Owns contracts? | Key weakness to exploit |
|---|---|---|---|---|
| **Headway** | Marketplace + billing | "Free" (keeps undisclosed spread; ~$107/hr avg payout) | **No — Headway's contracts** | Oct 2024 Optum cut: 90834 $144→$103 (~30%), no say; client/credentialing locked to platform |
| **Alma** | Membership + insurance | **$125/mo or $1,140/yr** | **No — Alma's Tax ID** | Same Optum cut; leaving can mean losing panel access; pay monthly regardless of volume |
| **Grow Therapy** | Marketplace + billing | Free (takes admin margin) | **No** | Opaque middleman margin; platform dependency |
| **SonderMind** | Marketplace, 1099 | Free (keeps margin; 2% same-day pay) | **No** | BBB 1-star; 30+ day support; rare rate raises |
| **TheraThink** | Traditional biller | **~6% of paid claims + ~$10/new client** | **Yes — therapist keeps own** | Doesn't credential you; no software, no eligibility tooling, no guidance |

### The gap you fill
Two poles, a hole between them: marketplaces are **easy but you lose your contracts/rates/clients**; traditional billers **keep you independent but leave you alone on credentialing with no software**. **Nobody owns "keep your autonomy AND get hand-holding + software."** That's your product.

### Recommended delivery model: **Hybrid (done-with-you service + software)**
You were undecided here — this is the recommendation, and why it beats the alternatives:
- **Pure done-for-you service** (billing agency): easy to sell but commoditized (competes head-on with TheraThink on price) and doesn't scale — margins capped by labor.
- **Pure SaaS:** high margin and investor-friendly, but hard to sell to non-technical solo therapists before value is proven, and it doesn't solve the human-heavy parts (payer phone calls, appeals) that *are the actual pain*.
- **Hybrid wins:** software does the repeatable work (eligibility, claims, posting, reminders) while a human concierge handles credentialing and appeals. It's defensible (software moat + service stickiness), scalable (automation lifts margin over time), and matches what therapists actually want — to *not think about insurance* while *keeping their practice their own*.

### Pricing (most sellable + profitable)
**Three-part hybrid:**
1. **One-time credentialing package** — the painful, high-value job; charge a setup fee (benchmark: services charge $100–325/payer, so a 3-panel "get me in-network" bundle is an easy, justifiable few-hundred-to-low-thousand dollar offer).
2. **Modest monthly SaaS** — ~**$49–99/mo**, undercutting Alma's $125. Predictable MRR, the investor-friendly part.
3. **Small % of collections** — **3–5%**, undercutting TheraThink's ~6% while adding aligned upside (you only win when they get paid).

This blends low buyer friction (only the SaaS is fixed; the % only bites when they're paid) with recurring + scaling revenue.

### Positioning & sales angle
**"Your panels. Your Tax ID. Your clients. We just make insurance painless."**
- Lead with the **2024–25 Optum rate-cut** fear hook: platforms cut therapists ~30% overnight and they had no say. Owning your own contracts means you can negotiate or walk — and if you leave us, you keep everything.
- Target the resentment of marketplace dependency among therapists who are nonetheless overwhelmed by DIY credentialing.

### Beachhead segment
Per your focus on **solo therapists**, the sharpest entry wedge is: **solo therapists who are currently cash-pay/OON and want to (re)enter insurance but are intimidated by credentialing**, plus **therapists souring on Headway/Alma after the rate cuts who want their independence back.** Both feel acute pain *right now* and have no good option. Land them with the credentialing package (Phase 0), then expand into full RCM.

---

## Caveats on the data
- **Government-grade figures:** KFF (19% ACA denial rate, appeal rates), Milliman (OON disparity), MGMA (A/R, rework cost), CMS (coding/forms). Treat as solid.
- **Directional / vendor-blog figures (verify before quoting in marketing):** behavioral-health-specific denial rates (~30%, "2× med/surg"), "50–65% never reworked," "85% of denials eligibility-related," and the "$5,000–$15,000 fully-loaded credentialing cost." These come from billing-vendor blogs, not primary data.
- **Conflicting/undisclosed:** Headway's exact retained percentage is not public (sources disagree). SonderMind per-session dollar figures are dated (2022) and vary by state. TheraThink's 6% and several EHR prices are from search snippets (direct pages were access-blocked during research).
- **Watch item:** Opkit's standalone availability post-acquisition (11x, Nov 2024).

## Key sources
- KFF — Claims Denials & Appeals in ACA Marketplace Plans (2024)
- Milliman — Behavioral vs physical health network/reimbursement disparities
- MGMA DataDive — A/R and denial-rework benchmarks
- CMS — Medicare Billing: 837P & CMS-1500 (MLN006976); APA Services CPT coding guidance
- ClearHealthCosts — 2024–25 platform rate-cut reporting (Headway/Alma/Optum)
- Vendor/industry: CAQH, Stedi, Nirvana Health, Candid Health, TheraThink, Alma, Headway, Grow Therapy, SonderMind, SimplePractice, TherapyNotes, Mentaya, Thrizer, Reimbursify
