import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { createClientRecord } from "@/app/actions";
import type { Client } from "@/lib/types";
import { SetupNotice } from "@/components/SetupNotice";

export const dynamic = "force-dynamic";

export default async function ClientsPage() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return <SetupNotice />;

  const supabase = createClient();
  const { data } = await supabase
    .from("clients")
    .select("*")
    .order("created_at", { ascending: false });
  const clients = (data ?? []) as Client[];

  return (
    <div className="grid gap-8 md:grid-cols-3">
      <div className="md:col-span-2 space-y-4">
        <h1 className="text-2xl font-bold">Clients</h1>
        <div className="overflow-hidden rounded-lg border bg-white">
          {clients.length === 0 ? (
            <p className="px-5 py-8 text-sm text-gray-500">
              No clients yet. Add your first therapist on the right.
            </p>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-5 py-3">Name</th>
                  <th className="px-5 py-3">Credential</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Target panels</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {clients.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50">
                    <td className="px-5 py-3">
                      <Link href={`/clients/${c.id}`} className="font-medium text-brand">
                        {c.full_name}
                      </Link>
                    </td>
                    <td className="px-5 py-3 text-gray-600">{c.credential ?? "—"}</td>
                    <td className="px-5 py-3 capitalize text-gray-600">{c.status}</td>
                    <td className="px-5 py-3 text-gray-600">{c.panel_target}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-semibold">Add client</h2>
        <form action={createClientRecord} className="space-y-3 rounded-lg border bg-white p-5">
          <Field name="full_name" label="Full name" required />
          <Field name="credential" label="Credential (LCSW, LPC…)" />
          <Field name="email" label="Email" type="email" />
          <Field name="phone" label="Phone" />
          <Field name="practice_name" label="Practice name" />
          <Field name="panel_target" label="Target panels" type="number" defaultValue="5" />
          <button
            type="submit"
            className="w-full rounded-md bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark"
          >
            Create & seed checklist
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  defaultValue,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-gray-600">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        className="w-full rounded-md border px-3 py-2 outline-none focus:border-brand"
      />
    </label>
  );
}
