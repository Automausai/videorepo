import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { addApplication, updateApplicationStatus, toggleDocument } from "@/app/actions";
import {
  APPLICATION_STATUSES,
  STATUS_LABELS,
  STATUS_STYLES,
  SUGGESTED_PAYERS,
} from "@/lib/constants";
import type { Application, Client, DocumentItem } from "@/lib/types";
import { SetupNotice } from "@/components/SetupNotice";

export const dynamic = "force-dynamic";

export default async function ClientDetail({ params }: { params: { id: string } }) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return <SetupNotice />;

  const supabase = createClient();
  const [{ data: client }, { data: apps }, { data: docs }] = await Promise.all([
    supabase.from("clients").select("*").eq("id", params.id).single(),
    supabase.from("applications").select("*").eq("client_id", params.id).order("created_at"),
    supabase.from("documents").select("*").eq("client_id", params.id).order("created_at"),
  ]);

  if (!client) notFound();
  const c = client as Client;
  const applications = (apps ?? []) as Application[];
  const documents = (docs ?? []) as DocumentItem[];

  const docsReceived = documents.filter((d) => d.status === "received").length;
  const approvedCount = applications.filter((a) => a.status === "approved").length;

  return (
    <div className="space-y-8">
      <div>
        <Link href="/clients" className="text-sm text-brand">
          ← All clients
        </Link>
        <div className="mt-2 flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-bold">{c.full_name}</h1>
            <p className="text-sm text-gray-500">
              {c.credential ?? "—"} · {c.practice_name ?? "—"} · target {c.panel_target} panels
            </p>
          </div>
          <div className="text-right text-sm text-gray-500">
            <div>{approvedCount} approved</div>
            <div>
              {docsReceived}/{documents.length} docs in
            </div>
          </div>
        </div>
      </div>

      {/* Document checklist */}
      <section className="rounded-lg border bg-white">
        <h2 className="border-b px-5 py-3 font-semibold">Document checklist</h2>
        <ul className="divide-y">
          {documents.map((d) => (
            <li key={d.id} className="flex items-center justify-between px-5 py-2 text-sm">
              <span className={d.status === "received" ? "text-gray-900" : "text-gray-500"}>
                {d.doc_type}
              </span>
              <form action={toggleDocument}>
                <input type="hidden" name="id" value={d.id} />
                <input type="hidden" name="client_id" value={c.id} />
                <input
                  type="hidden"
                  name="status"
                  value={d.status === "received" ? "pending" : "received"}
                />
                <button
                  className={`rounded-full px-3 py-0.5 text-xs ${
                    d.status === "received"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {d.status === "received" ? "✓ Received" : "Mark received"}
                </button>
              </form>
            </li>
          ))}
        </ul>
      </section>

      {/* Payer applications */}
      <section className="rounded-lg border bg-white">
        <h2 className="border-b px-5 py-3 font-semibold">Payer applications</h2>
        <div className="divide-y">
          {applications.length === 0 && (
            <p className="px-5 py-6 text-sm text-gray-500">No applications yet — add one below.</p>
          )}
          {applications.map((a) => (
            <div key={a.id} className="px-5 py-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">{a.payer_name}</span>
                <span className={`rounded-full px-2 py-0.5 text-xs ${STATUS_STYLES[a.status]}`}>
                  {STATUS_LABELS[a.status]}
                </span>
              </div>
              <div className="mt-1 text-xs text-gray-500">
                {a.next_followup_at && <>Next follow-up: {a.next_followup_at} · </>}
                {a.last_contact_at && <>Last contact: {a.last_contact_at} · </>}
                {a.effective_date && <>Effective: {a.effective_date}</>}
              </div>
              {a.last_contact_note && (
                <p className="mt-1 text-xs italic text-gray-500">“{a.last_contact_note}”</p>
              )}
              <form action={updateApplicationStatus} className="mt-3 flex flex-wrap items-end gap-2">
                <input type="hidden" name="id" value={a.id} />
                <input type="hidden" name="client_id" value={c.id} />
                <select
                  name="status"
                  defaultValue={a.status}
                  className="rounded-md border px-2 py-1 text-sm"
                >
                  {APPLICATION_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {STATUS_LABELS[s]}
                    </option>
                  ))}
                </select>
                <input
                  type="date"
                  name="next_followup_at"
                  defaultValue={a.next_followup_at ?? ""}
                  className="rounded-md border px-2 py-1 text-sm"
                  title="Next follow-up"
                />
                <input
                  type="text"
                  name="last_contact_note"
                  placeholder="Contact note…"
                  className="flex-1 rounded-md border px-2 py-1 text-sm"
                />
                <button className="rounded-md bg-brand px-3 py-1 text-sm font-medium text-white hover:bg-brand-dark">
                  Update
                </button>
              </form>
            </div>
          ))}
        </div>

        <form action={addApplication} className="flex items-end gap-2 border-t px-5 py-4">
          <input type="hidden" name="client_id" value={c.id} />
          <label className="flex-1 text-sm">
            <span className="mb-1 block text-gray-600">Add payer</span>
            <input
              name="payer_name"
              list="payers"
              required
              placeholder="e.g. Aetna"
              className="w-full rounded-md border px-3 py-2"
            />
            <datalist id="payers">
              {SUGGESTED_PAYERS.map((p) => (
                <option key={p} value={p} />
              ))}
            </datalist>
          </label>
          <button className="rounded-md bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark">
            Add
          </button>
        </form>
      </section>
    </div>
  );
}
