import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Sparkles, CheckCircle2, AlertTriangle, Gauge, Zap } from "lucide-react";

type MatchResult = {
  score: number;
  strengths: string[];
  gaps: string[];
  recommendation: string;
  priority: "High" | "Medium" | "Low";
};

export const Route = createFileRoute("/ai-match")({
  head: () => ({
    meta: [
      { title: "AI Resume Matching — OAKsphere Platform" },
      {
        name: "description",
        content:
          "Instantly score any resume against a job description using OAKsphere's AI matching engine. Get strengths, gaps, recommendation and interview priority.",
      },
      { property: "og:title", content: "AI Resume Matching — OAKsphere" },
      {
        property: "og:description",
        content: "AI-powered resume screening with match score, strengths, gaps and interview priority.",
      },
    ],
  }),
  component: AIMatchPage,
});

const SAMPLE_JD = `Senior React Developer — 4+ yrs. Strong in React, TypeScript, REST APIs, state management (Redux/Zustand), unit testing. Bonus: Next.js, Tailwind, AWS.`;
const SAMPLE_RESUME = `Frontend engineer with 5 years building React + TypeScript SaaS dashboards. Led migration to Next.js 14, integrated Stripe, wrote Jest/RTL tests. Familiar with AWS Amplify and Tailwind. Mentored 3 juniors.`;

function AIMatchPage() {
  const [resume, setResume] = useState("");
  const [jd, setJd] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MatchResult | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (resume.trim().length < 50 || jd.trim().length < 30) {
      toast.error("Add more detail to both fields.");
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/match-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume, jobDescription: jd }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");
      setResult(data);
      toast.success("Analysis complete");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const priorityColor =
    result?.priority === "High"
      ? "bg-success text-success-foreground"
      : result?.priority === "Medium"
        ? "bg-cta text-cta-foreground"
        : "bg-muted text-muted-foreground";

  return (
    <PageShell>
      <PageHero
        eyebrow="OAKsphere AI · Beta"
        title="AI Resume Matching"
        subtitle="Paste a resume and a job description. Get an instant match score, strengths, gaps and recruiter recommendation — powered by Gemini."
      />
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8">
          <Card className="p-6 md:p-8 shadow-elegant">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-cta" />
                <h2 className="font-display text-xl font-bold">Inputs</h2>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Label>Job Description</Label>
                  <button
                    type="button"
                    className="text-xs text-cta hover:underline"
                    onClick={() => setJd(SAMPLE_JD)}
                  >
                    Use sample
                  </button>
                </div>
                <Textarea
                  className="mt-1.5 min-h-[140px]"
                  placeholder="Paste the job description here…"
                  value={jd}
                  onChange={(e) => setJd(e.target.value)}
                  maxLength={15000}
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Label>Candidate Resume</Label>
                  <button
                    type="button"
                    className="text-xs text-cta hover:underline"
                    onClick={() => setResume(SAMPLE_RESUME)}
                  >
                    Use sample
                  </button>
                </div>
                <Textarea
                  className="mt-1.5 min-h-[220px]"
                  placeholder="Paste the resume text here…"
                  value={resume}
                  onChange={(e) => setResume(e.target.value)}
                  maxLength={25000}
                />
              </div>

              <Button type="submit" variant="cta" size="lg" disabled={loading} className="w-full">
                {loading ? "Analyzing with Gemini…" : "Run AI Match"}
              </Button>
              <p className="text-xs text-muted-foreground">
                Your data is processed via OAKsphere's secure backend. We never expose API keys to the browser.
              </p>
            </form>
          </Card>

          <Card className="p-6 md:p-8 shadow-elegant">
            <div className="flex items-center gap-2">
              <Gauge className="h-5 w-5 text-primary" />
              <h2 className="font-display text-xl font-bold">Result</h2>
            </div>

            {!result && !loading && (
              <div className="mt-10 text-center text-muted-foreground">
                <Zap className="mx-auto h-10 w-10 opacity-30" />
                <p className="mt-3 text-sm">Run a match to see the AI-powered breakdown.</p>
              </div>
            )}

            {loading && (
              <div className="mt-10 space-y-3 animate-pulse">
                <div className="h-24 rounded-lg bg-muted" />
                <div className="h-20 rounded-lg bg-muted" />
                <div className="h-20 rounded-lg bg-muted" />
              </div>
            )}

            {result && (
              <div className="mt-6 space-y-5">
                <div className="flex items-center justify-between rounded-xl border bg-gradient-to-br from-primary/5 to-cta/5 p-5">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">Match Score</div>
                    <div className="font-display text-5xl font-bold text-primary">
                      {result.score}
                      <span className="text-2xl text-muted-foreground">/100</span>
                    </div>
                  </div>
                  <Badge className={priorityColor + " text-sm px-3 py-1.5"}>
                    {result.priority} Priority
                  </Badge>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    <h3 className="font-semibold">Strengths</h3>
                  </div>
                  <ul className="space-y-1.5 text-sm">
                    {result.strengths.map((s, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-success mt-1">•</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-cta" />
                    <h3 className="font-semibold">Gaps</h3>
                  </div>
                  <ul className="space-y-1.5 text-sm">
                    {result.gaps.map((g, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-cta mt-1">•</span>
                        <span>{g}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-lg border bg-muted/30 p-4">
                  <h3 className="font-semibold text-sm mb-1">Recruiter Recommendation</h3>
                  <p className="text-sm text-muted-foreground">{result.recommendation}</p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </section>
    </PageShell>
  );
}
