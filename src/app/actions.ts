"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DOCUMENT_CHECKLIST } from "@/lib/constants";

export async function createClientRecord(formData: FormData) {
  const supabase = createClient();
  const full_name = String(formData.get("full_name") || "").trim();
  if (!full_name) return;

  const panel_target = Number(formData.get("panel_target") || 5);

  const { data, error } = await supabase
    .from("clients")
    .insert({
      full_name,
      credential: str(formData.get("credential")),
      email: str(formData.get("email")),
      phone: str(formData.get("phone")),
      practice_name: str(formData.get("practice_name")),
      panel_target: Number.isFinite(panel_target) ? panel_target : 5,
      status: "intake",
    })
    .select("id")
    .single();

  if (error || !data) throw new Error(error?.message || "Failed to create client");

  // Seed the document checklist from the SOP.
  await supabase.from("documents").insert(
    DOCUMENT_CHECKLIST.map((doc_type) => ({ client_id: data.id, doc_type }))
  );

  revalidatePath("/clients");
  redirect(`/clients/${data.id}`);
}

export async function addApplication(formData: FormData) {
  const supabase = createClient();
  const client_id = String(formData.get("client_id"));
  const payer_name = String(formData.get("payer_name") || "").trim();
  if (!client_id || !payer_name) return;

  await supabase.from("applications").insert({ client_id, payer_name });
  revalidatePath(`/clients/${client_id}`);
}

export async function updateApplicationStatus(formData: FormData) {
  const supabase = createClient();
  const id = String(formData.get("id"));
  const client_id = String(formData.get("client_id"));
  const status = String(formData.get("status"));

  const patch: Record<string, unknown> = { status };
  const next_followup_at = str(formData.get("next_followup_at"));
  const last_contact_note = str(formData.get("last_contact_note"));
  if (next_followup_at) patch.next_followup_at = next_followup_at;
  if (last_contact_note) {
    patch.last_contact_note = last_contact_note;
    patch.last_contact_at = new Date().toISOString().slice(0, 10);
  }
  if (str(formData.get("effective_date"))) patch.effective_date = str(formData.get("effective_date"));

  await supabase.from("applications").update(patch).eq("id", id);
  revalidatePath(`/clients/${client_id}`);
}

export async function toggleDocument(formData: FormData) {
  const supabase = createClient();
  const id = String(formData.get("id"));
  const client_id = String(formData.get("client_id"));
  const status = String(formData.get("status")); // target status

  await supabase
    .from("documents")
    .update({
      status,
      received_at: status === "received" ? new Date().toISOString().slice(0, 10) : null,
    })
    .eq("id", id);
  revalidatePath(`/clients/${client_id}`);
}

function str(v: FormDataEntryValue | null): string | null {
  const s = String(v ?? "").trim();
  return s.length ? s : null;
}
