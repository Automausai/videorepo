// Shared domain constants — mirror the SOP.

export const APPLICATION_STATUSES = [
  "not_started",
  "docs_pending",
  "submitted",
  "pending_verification",
  "info_requested",
  "approved",
  "closed_panel",
  "denied",
  "reapply_later",
] as const;

export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

export const STATUS_LABELS: Record<ApplicationStatus, string> = {
  not_started: "Not started",
  docs_pending: "Docs pending",
  submitted: "Submitted",
  pending_verification: "Pending verification",
  info_requested: "Info requested",
  approved: "Approved",
  closed_panel: "Closed panel",
  denied: "Denied",
  reapply_later: "Reapply later",
};

// Tailwind classes for status pills.
export const STATUS_STYLES: Record<ApplicationStatus, string> = {
  not_started: "bg-gray-100 text-gray-700",
  docs_pending: "bg-amber-100 text-amber-800",
  submitted: "bg-blue-100 text-blue-800",
  pending_verification: "bg-indigo-100 text-indigo-800",
  info_requested: "bg-orange-100 text-orange-800",
  approved: "bg-green-100 text-green-800",
  closed_panel: "bg-red-100 text-red-800",
  denied: "bg-red-100 text-red-800",
  reapply_later: "bg-purple-100 text-purple-800",
};

export const CLIENT_STATUSES = ["intake", "active", "completed", "paused"] as const;

// The client-facing document checklist from the SOP.
export const DOCUMENT_CHECKLIST = [
  "NPI number",
  "State license(s)",
  "Government photo ID",
  "Degree / diploma",
  "CV (gaps explained)",
  "Malpractice insurance certificate",
  "W-9 / EIN (or SSN)",
  "Practice name & address",
  "Bank info (EFT)",
  "CAQH authorization signed",
  "Application authorization signed",
] as const;

// Common starter payers to suggest when setting up a client.
export const SUGGESTED_PAYERS = [
  "Aetna",
  "Cigna",
  "UnitedHealthcare / Optum",
  "Blue Cross Blue Shield",
  "Carelon (Beacon)",
  "Humana",
  "Medicare",
  "Medicaid",
] as const;

export const CAQH_REATTEST_DAYS = 120;
