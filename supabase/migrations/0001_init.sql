-- Insurance Activation platform — Phase 0 schema (credentialing tracker)
-- Runs the SOP: clients, their target payers/applications, and a document checklist.

create extension if not exists "pgcrypto";

-- ── Clients (therapists being credentialed) ─────────────────────────────
create table if not exists clients (
  id              uuid primary key default gen_random_uuid(),
  full_name       text not null,
  credential      text,                       -- LCSW, LPC, LMFT, PhD/PsyD, etc.
  email           text,
  phone           text,
  npi             text,                        -- Type 1 individual NPI
  practice_name   text,
  practice_address text,
  status          text not null default 'intake'
                    check (status in ('intake','active','completed','paused')),
  panel_target    int not null default 5,
  -- maintenance / $99-mo tracking
  caqh_attested_at date,                       -- re-attest every 120 days
  license_expiry   date,
  malpractice_expiry date,
  notes           text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- ── Payer applications (one row per client × payer) ─────────────────────
create table if not exists applications (
  id                 uuid primary key default gen_random_uuid(),
  client_id          uuid not null references clients(id) on delete cascade,
  payer_name         text not null,
  submission_method  text,                     -- portal / PDF+email / provider rep
  submitted_at       date,
  confirmation_number text,
  status             text not null default 'not_started'
                       check (status in (
                         'not_started','docs_pending','submitted','pending_verification',
                         'info_requested','approved','closed_panel','denied','reapply_later')),
  last_contact_at    date,
  last_contact_note  text,
  next_followup_at   date,                      -- drives the 14-day cadence
  effective_date     date,
  contracted_rate_90834 numeric(10,2),
  notes              text,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

-- ── Document checklist (per client) ─────────────────────────────────────
create table if not exists documents (
  id          uuid primary key default gen_random_uuid(),
  client_id   uuid not null references clients(id) on delete cascade,
  doc_type    text not null,                   -- see DOCUMENT_CHECKLIST in app constants
  status      text not null default 'pending'
                check (status in ('pending','requested','received','na')),
  received_at date,
  notes       text,
  created_at  timestamptz not null default now()
);

create index if not exists applications_client_idx on applications(client_id);
create index if not exists applications_followup_idx on applications(next_followup_at);
create index if not exists documents_client_idx on documents(client_id);

-- keep updated_at fresh
create or replace function set_updated_at() returns trigger as $$
begin new.updated_at = now(); return new; end;
$$ language plpgsql;

drop trigger if exists clients_updated on clients;
create trigger clients_updated before update on clients
  for each row execute function set_updated_at();

drop trigger if exists applications_updated on applications;
create trigger applications_updated before update on applications
  for each row execute function set_updated_at();
