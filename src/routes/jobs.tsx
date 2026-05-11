import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Briefcase, Banknote, Clock, Search, MessageCircle } from "lucide-react";

const jobs = [
  { title: "Senior React Developer", company: "Leading Fintech", loc: "Bengaluru", exp: "4–7 yrs", sal: "₹18–28 LPA", type: "IT", urgent: true },
  { title: "Customer Support Executive", company: "Global BPO", loc: "Pune", exp: "0–3 yrs", sal: "₹2.4–4.5 LPA", type: "BPO", urgent: true },
  { title: "Branch Manager", company: "Private Bank", loc: "Mumbai", exp: "6–10 yrs", sal: "₹12–18 LPA", type: "BFSI", urgent: false },
  { title: "Warehouse Supervisor", company: "E-commerce", loc: "Hyderabad", exp: "2–5 yrs", sal: "₹3–5 LPA", type: "Logistics", urgent: true },
  { title: "Staff Nurse", company: "Multi-Speciality Hospital", loc: "Delhi NCR", exp: "1–4 yrs", sal: "₹2.8–4.2 LPA", type: "Healthcare", urgent: false },
  { title: "Field Sales Manager", company: "FMCG Brand", loc: "Chennai", exp: "3–6 yrs", sal: "₹5–8 LPA", type: "Sales", urgent: false },
  { title: "DevOps Engineer", company: "SaaS Startup", loc: "Remote", exp: "3–6 yrs", sal: "₹16–24 LPA", type: "IT", urgent: false },
  { title: "Pharmacist", company: "Hospital Chain", loc: "Pune", exp: "1–3 yrs", sal: "₹2.4–3.6 LPA", type: "Healthcare", urgent: true },
  { title: "Production Supervisor", company: "Auto OEM", loc: "Pune", exp: "4–8 yrs", sal: "₹4.5–7 LPA", type: "Manufacturing", urgent: false },
];

export const Route = createFileRoute("/jobs")({
  head: () => ({
    meta: [
      { title: "Latest Jobs in India | IT, BPO, BFSI, Healthcare — OAKsphere" },
      { name: "description", content: "Browse the latest verified jobs across India. Filter by city, industry, experience and salary. Apply on WhatsApp or upload your resume." },
      { property: "og:title", content: "Latest Jobs in India — OAKsphere" },
      { property: "og:description", content: "Verified job openings across IT, BPO, BFSI, healthcare and more." },
    ],
  }),
  component: Jobs,
});

function Jobs() {
  const [q, setQ] = useState("");
  const filtered = jobs.filter((j) =>
    [j.title, j.loc, j.company, j.type].join(" ").toLowerCase().includes(q.toLowerCase())
  );
  return (
    <PageShell>
      <PageHero eyebrow="Job Portal" title="Live job openings across India." subtitle="Verified roles. Direct recruiter contact. Apply in under 60 seconds." />
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Card className="p-4 md:p-5 -mt-16 md:-mt-20 relative z-10 shadow-elegant flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by role, city, company or industry…" className="pl-9 h-12"/>
            </div>
            <Button variant="cta" size="lg">Search Jobs</Button>
          </Card>
        </div>
      </section>
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((j) => (
            <Card key={j.title} className="p-6 hover:shadow-elegant hover:-translate-y-1 transition-all">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display font-semibold text-lg leading-tight">{j.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{j.company}</p>
                </div>
                {j.urgent && <Badge className="bg-cta text-cta-foreground hover:bg-cta">Urgent</Badge>}
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-1.5 text-muted-foreground"><MapPin className="h-3.5 w-3.5"/>{j.loc}</div>
                <div className="flex items-center gap-1.5 text-muted-foreground"><Briefcase className="h-3.5 w-3.5"/>{j.exp}</div>
                <div className="flex items-center gap-1.5 text-muted-foreground"><Banknote className="h-3.5 w-3.5"/>{j.sal}</div>
                <div className="flex items-center gap-1.5 text-muted-foreground"><Clock className="h-3.5 w-3.5"/>{j.type}</div>
              </div>
              <div className="mt-6 flex gap-2">
                <Button asChild className="flex-1" variant="cta"><a href="/candidates">Apply Now</a></Button>
                <Button asChild variant="outline" size="icon"><a href="https://wa.me/917499815246" aria-label="WhatsApp"><MessageCircle className="h-4 w-4"/></a></Button>
              </div>
            </Card>
          ))}
          {filtered.length === 0 && <p className="text-muted-foreground col-span-full text-center py-12">No jobs match your search. Try different keywords.</p>}
        </div>
      </section>
    </PageShell>
  );
}
