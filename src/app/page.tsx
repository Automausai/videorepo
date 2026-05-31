import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { STATUS_LABELS, STATUS_STYLES, CAQH_REATTEST_DAYS } from "@/lib/constants";
import type { Application, Client } from "@/lib/types";
import { SetupNotice } from "@/components/SetupNotice";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return <SetupNotice />;

  const supabase = createClient();
  const [{ data: clients }, { data: apps }] = await Promise.all([
    supabase.from("clients").select("*"),
    supabase.from("applications").select("*"),
  ]);

  const clientList = (clients ?? []) as Client[];
  const appList = (apps ?? []) as Application[];

  const activeClients = clientList.filter((c) => c.status !== "completed").length;
  const approved = appList.filter((a) => a.status === "approved").length;
  const inFlight = appList.filter((a) =>
    ["submitted", "pending_verification", "info_requested"].includes(a.status)
  ).length;

  const today = new Date().toISOString().slice(0, 10);
  const dueFollowups = appList
    .filter((a) => a.next_followup_at && a.next_followup_at <= today && a.status !== "approved")
    .sort((a, b) => (a.next_followup_at! < b.next_followup_at! ? -1 : 1));

  // CAQH re-attestations coming due within 21 days.
  const caqhDue = clientList.filter((c) => {
    if (!c.caqh_attested_at) return false;
    const due = new Date(c.caqh_attested_at);
    due.setDate(due.getDate() + CAQH_REATTEST_DAYS);
    const days = (due.getTime() - Date.now()) / 86_400_000;
    return days <= 21;
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Link
          href="/clients"
          className="rounded-md bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark"
        >
          View clients
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Stat label="Active clients" value={activeClients} />
        <Stat label="Applications in flight" value={inFlight} />
        <Stat label="Panels approved" value={approved} />
        <Stat label="Follow-ups due" value={dueFollowups.length} accent />
      </div>

      <section className="rounded-lg border bg-white">
        <h2 className="border-b px-5 py-3 font-semibold">Follow-ups due</h2>
        {dueFollowups.length === 0 ? (
          <p className="px-5 py-6 text-sm text-gray-500">Nothing due. 🎉</p>
        ) : (
          <ul className="divide-y">
            {dueFollowups.map((a) => {
              const client = clientList.find((c) => c.id === a.client_id);
              return (
                <li key={a.id} className="flex items-center justify-between px-5 py-3 text-sm">
                  <div>
                    <Link href={`/clients/${a.client_id}`} className="font-medium text-brand">
                      {client?.full_name ?? "Client"}
                    </Link>
                    <span className="text-gray-500"> — {a.payer_name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs ${STATUS_STYLES[a.status]}`}>
                      {STATUS_LABELS[a.status]}
                    </span>
                    <span className="text-gray-400">due {a.next_followup_at}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {caqhDue.length > 0 && (
        <section className="rounded-lg border border-amber-200 bg-amber-50">
          <h2 className="border-b border-amber-200 px-5 py-3 font-semibold text-amber-900">
            CAQH re-attestation due soon ({CAQH_REATTEST_DAYS}-day cycle)
          </h2>
          <ul className="divide-y divide-amber-200">
            {caqhDue.map((c) => (
              <li key={c.id} className="px-5 py-3 text-sm">
                <Link href={`/clients/${c.id}`} className="font-medium text-brand">
                  {c.full_name}
                </Link>
                <span className="text-amber-800"> — last attested {c.caqh_attested_at}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div className={`rounded-lg border bg-white p-5 ${accent && value > 0 ? "border-orange-300" : ""}`}>
      <div className={`text-3xl font-bold ${accent && value > 0 ? "text-orange-600" : "text-gray-900"}`}>
        {value}
      </div>
      <div className="mt-1 text-sm text-gray-500">{label}</div>
    </div>
  );
}
