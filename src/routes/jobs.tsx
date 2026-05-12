import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Briefcase, Banknote, Clock, Search, MessageCircle, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type JobRow = {
  id: string;
  title: string;
  company: string | null;
  location: string | null;
  job_type: string | null;
  salary: string | null;
  description: string | null;
  apply_url: string;
  source: string | null;
  posted_at: string | null;
};

export const Route = createFileRoute("/jobs")({
  head: () => ({
    meta: [
      { title: "Latest Jobs in India & Remote | OAKsphere" },
      { name: "description", content: "Browse verified live job openings from free job sources. Filter by keyword, location, type and source. Apply directly on the original site." },
      { property: "og:title", content: "Latest Jobs — OAKsphere" },
      { property: "og:description", content: "Verified job openings imported from free public job APIs." },
    ],
  }),
  component: Jobs,
});

function Jobs() {
  const [jobs, setJobs] = useState<JobRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [jobType, setJobType] = useState("");
  const [source, setSource] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from("jobs")
        .select("id,title,company,location,job_type,salary,description,apply_url,source,posted_at")
        .order("posted_at", { ascending: false, nullsFirst: false })
        .limit(200);
      if (cancelled) return;
      if (error) setError(error.message);
      else setJobs((data as JobRow[]) || []);
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, []);

  const sources = useMemo(() => Array.from(new Set(jobs.map((j) => j.source).filter(Boolean))) as string[], [jobs]);
  const types = useMemo(() => Array.from(new Set(jobs.map((j) => j.job_type).filter(Boolean))) as string[], [jobs]);

  const filtered = useMemo(() => {
    const needle = q.toLowerCase().trim();
    return jobs.filter((j) => {
      if (jobType && j.job_type !== jobType) return false;
      if (source && j.source !== source) return false;
      if (!needle) return true;
      return [j.title, j.company, j.location, j.job_type, j.source]
        .filter(Boolean).join(" ").toLowerCase().includes(needle);
    });
  }, [jobs, q, jobType, source]);

  return (
    <PageShell>
      <PageHero eyebrow="Job Portal" title="Live job openings." subtitle="Verified roles imported from free public job sources. Apply directly with one click." />
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Card className="p-4 md:p-5 -mt-16 md:-mt-20 relative z-10 shadow-elegant flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by title, company, location, source…" className="pl-9 h-12"/>
            </div>
            <select value={jobType} onChange={(e) => setJobType(e.target.value)} className="h-12 rounded-md border bg-background px-3 text-sm">
              <option value="">All types</option>
              {types.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            <select value={source} onChange={(e) => setSource(e.target.value)} className="h-12 rounded-md border bg-background px-3 text-sm">
              <option value="">All sources</option>
              {sources.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </Card>
        </div>
      </section>
      <section id="jobs-results" className="pb-20 scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {loading && (
            <p className="text-muted-foreground text-center py-12">Loading latest jobs…</p>
          )}
          {!loading && error && (
            <p className="text-destructive text-center py-12">Couldn't load jobs: {error}</p>
          )}
          {!loading && !error && filtered.length === 0 && (
            <p className="text-muted-foreground text-center py-12">No jobs match your search. Try different keywords or clear filters.</p>
          )}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((j) => (
              <Card key={j.id} className="p-6 hover:shadow-elegant hover:-translate-y-1 transition-all flex flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display font-semibold text-lg leading-tight">{j.title}</h3>
                    {j.company && <p className="text-sm text-muted-foreground mt-1">{j.company}</p>}
                  </div>
                  {j.source && <Badge variant="secondary">{j.source}</Badge>}
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                  {j.location && <div className="flex items-center gap-1.5 text-muted-foreground"><MapPin className="h-3.5 w-3.5"/>{j.location}</div>}
                  {j.job_type && <div className="flex items-center gap-1.5 text-muted-foreground"><Briefcase className="h-3.5 w-3.5"/>{j.job_type}</div>}
                  {j.salary && <div className="flex items-center gap-1.5 text-muted-foreground"><Banknote className="h-3.5 w-3.5"/>{j.salary}</div>}
                  {j.posted_at && <div className="flex items-center gap-1.5 text-muted-foreground"><Clock className="h-3.5 w-3.5"/>{new Date(j.posted_at).toLocaleDateString()}</div>}
                </div>
                {j.description && (
                  <p className="mt-4 text-sm text-muted-foreground line-clamp-3">{j.description}</p>
                )}
                <div className="mt-6 flex gap-2">
                  <Button asChild className="flex-1" variant="cta">
                    <a href={j.apply_url} target="_blank" rel="noopener noreferrer">
                      Apply on original site <ExternalLink className="ml-1.5 h-3.5 w-3.5"/>
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="icon">
                    <a href="https://wa.me/917499815246" aria-label="WhatsApp"><MessageCircle className="h-4 w-4"/></a>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
