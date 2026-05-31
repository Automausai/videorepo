export function SetupNotice() {
  return (
    <div className="rounded-lg border border-amber-300 bg-amber-50 p-6">
      <h1 className="text-lg font-semibold text-amber-900">Connect Supabase to finish setup</h1>
      <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-amber-900">
        <li>
          Copy <code>.env.example</code> to <code>.env.local</code> and fill in your Supabase URL and
          anon key.
        </li>
        <li>
          Apply the migration in <code>supabase/migrations/0001_init.sql</code> to your project.
        </li>
        <li>
          Restart <code>npm run dev</code> — this dashboard will then load live data.
        </li>
      </ol>
    </div>
  );
}
