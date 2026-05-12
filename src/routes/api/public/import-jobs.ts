// Public job-import endpoint.
// - Fetches jobs from FREE sources (Remotive + Arbeitnow). No API key needed.
// - Upserts into the `jobs` table using `external_job_id` to prevent duplicates.
// - Protected by a simple shared secret in the `x-import-secret` header so
//   that only your manual run / scheduled cron can trigger it.
// Trigger manually:
//   curl -X POST -H "x-import-secret: $JOBS_IMPORT_SECRET" \
//     https://oaksphere.in/api/public/import-jobs
import { createFileRoute } from "@tanstack/react-router";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

type Job = {
  title: string;
  company: string | null;
  location: string | null;
  job_type: string | null;
  salary: string | null;
  description: string | null;
  apply_url: string;
  source: string;
  external_job_id: string;
  posted_at: string | null;
};

function stripHtml(s: string | null | undefined, max = 1200) {
  if (!s) return null;
  const t = s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return t.length > max ? t.slice(0, max) + "…" : t;
}

async function fetchRemotive(): Promise<Job[]> {
  const res = await fetch("https://remotive.com/api/remote-jobs?limit=50");
  if (!res.ok) throw new Error(`Remotive ${res.status}`);
  const json = (await res.json()) as { jobs: any[] };
  return (json.jobs || []).map((j) => ({
    title: String(j.title),
    company: j.company_name ?? null,
    location: j.candidate_required_location ?? "Remote",
    job_type: j.job_type ?? null,
    salary: j.salary ?? null,
    description: stripHtml(j.description),
    apply_url: j.url,
    source: "Remotive",
    external_job_id: `remotive-${j.id}`,
    posted_at: j.publication_date ?? null,
  }));
}

async function fetchArbeitnow(): Promise<Job[]> {
  const res = await fetch("https://www.arbeitnow.com/api/job-board-api");
  if (!res.ok) throw new Error(`Arbeitnow ${res.status}`);
  const json = (await res.json()) as { data: any[] };
  return (json.data || []).map((j) => ({
    title: String(j.title),
    company: j.company_name ?? null,
    location: j.location ?? (Array.isArray(j.tags) && j.tags.includes("remote") ? "Remote" : null),
    job_type: Array.isArray(j.job_types) ? j.job_types.join(", ") : null,
    salary: null,
    description: stripHtml(j.description),
    apply_url: j.url,
    source: "Arbeitnow",
    external_job_id: `arbeitnow-${j.slug}`,
    posted_at: j.created_at ? new Date(Number(j.created_at) * 1000).toISOString() : null,
  }));
}

async function runImport() {
  const results = await Promise.allSettled([fetchRemotive(), fetchArbeitnow()]);
  const all: Job[] = [];
  const errors: string[] = [];
  for (const r of results) {
    if (r.status === "fulfilled") all.push(...r.value);
    else errors.push(String(r.reason?.message || r.reason));
  }
  if (all.length === 0) {
    return { ok: false, inserted: 0, errors };
  }
  // Upsert in chunks to stay under PostgREST limits.
  let upserted = 0;
  for (let i = 0; i < all.length; i += 200) {
    const chunk = all.slice(i, i + 200);
    const { error, count } = await supabaseAdmin
      .from("jobs")
      .upsert(chunk, { onConflict: "external_job_id", count: "exact" });
    if (error) errors.push(error.message);
    else upserted += count ?? chunk.length;
  }
  return { ok: errors.length === 0, inserted: upserted, total_fetched: all.length, errors };
}

export const Route = createFileRoute("/api/public/import-jobs")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secret = process.env.JOBS_IMPORT_SECRET;
        if (secret) {
          const provided = request.headers.get("x-import-secret");
          if (provided !== secret) {
            return new Response("Unauthorized", { status: 401 });
          }
        }
        try {
          const result = await runImport();
          return Response.json(result, { status: result.ok ? 200 : 500 });
        } catch (e: any) {
          console.error("import-jobs failed:", e);
          return Response.json({ ok: false, error: e.message }, { status: 500 });
        }
      },
      // Allow GET for easy manual testing in a browser when no secret is set.
      GET: async ({ request }) => {
        const secret = process.env.JOBS_IMPORT_SECRET;
        if (secret) {
          const provided = request.headers.get("x-import-secret") || new URL(request.url).searchParams.get("secret");
          if (provided !== secret) return new Response("Unauthorized", { status: 401 });
        }
        const result = await runImport();
        return Response.json(result, { status: result.ok ? 200 : 500 });
      },
    },
  },
});
