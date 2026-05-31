import type { ApplicationStatus } from "./constants";

export type Client = {
  id: string;
  full_name: string;
  credential: string | null;
  email: string | null;
  phone: string | null;
  npi: string | null;
  practice_name: string | null;
  practice_address: string | null;
  status: "intake" | "active" | "completed" | "paused";
  panel_target: number;
  caqh_attested_at: string | null;
  license_expiry: string | null;
  malpractice_expiry: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type Application = {
  id: string;
  client_id: string;
  payer_name: string;
  submission_method: string | null;
  submitted_at: string | null;
  confirmation_number: string | null;
  status: ApplicationStatus;
  last_contact_at: string | null;
  last_contact_note: string | null;
  next_followup_at: string | null;
  effective_date: string | null;
  contracted_rate_90834: number | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type DocumentItem = {
  id: string;
  client_id: string;
  doc_type: string;
  status: "pending" | "requested" | "received" | "na";
  received_at: string | null;
  notes: string | null;
  created_at: string;
};
