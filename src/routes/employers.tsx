import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { CheckCircle2, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/employers")({
  head: () => ({
    meta: [
      { title: "Hire Talent in India | Employer Recruitment Solutions — OAKsphere" },
      { name: "description", content: "Hire verified talent across India. Permanent, contract, bulk and executive recruitment for IT, BPO, BFSI, healthcare, manufacturing and more." },
      { property: "og:title", content: "Hire Talent — OAKsphere for Employers" },
      { property: "og:description", content: "Submit your hiring requirement. Get shortlisted candidates within 48 hours." },
    ],
  }),
  component: Employers,
});

function Employers() {
  const [loading, setLoading] = useState(false);
  const benefits = [
    "Shortlists in 48 hours",
    "100% verified candidates",
    "Pan-India recruitment network",
    "Dedicated account manager",
    "Transparent weekly reporting",
    "Replacement guarantee",
  ];
  return (
    <PageShell>
      <PageHero
        eyebrow="For Employers"
        title="Hire verified talent across India — faster."
        subtitle="From a single specialist to 1,000+ frontline hires, OAKsphere delivers screened candidates with end-to-end recruitment support."
      />
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold">Why HR teams choose OAKsphere</h2>
            <ul className="mt-8 space-y-4">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-success mt-0.5 shrink-0"/>
                  <span className="text-foreground/90">{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10 rounded-2xl border border-border p-6 bg-secondary/40">
              <div className="font-display font-semibold">Need urgent hiring support?</div>
              <p className="text-sm text-muted-foreground mt-1">Talk to a recruitment expert directly.</p>
              <div className="mt-4 flex gap-3">
                <Button asChild variant="whatsapp"><a href="https://wa.me/917499815246"><MessageCircle className="h-4 w-4"/> WhatsApp</a></Button>
                <Button asChild variant="outline"><a href="tel:+917499815246">Call +91 74998 15246</a></Button>
              </div>
            </div>
          </div>
          <Card className="p-7 md:p-9 shadow-elegant border-border/60">
            <h3 className="font-display text-2xl font-bold">Submit your hiring requirement</h3>
            <p className="text-sm text-muted-foreground mt-1">We'll get back to you within 1 business hour.</p>
            <form
              className="mt-6 grid gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                  toast.success("Requirement received!", { description: "Our team will reach out within 1 business hour." });
                  (e.target as HTMLFormElement).reset();
                }, 800);
              }}
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div><Label>Company Name</Label><Input required className="mt-1.5"/></div>
                <div><Label>Contact Person</Label><Input required className="mt-1.5"/></div>
                <div><Label>Phone</Label><Input required type="tel" className="mt-1.5"/></div>
                <div><Label>Email</Label><Input required type="email" className="mt-1.5"/></div>
                <div><Label>Hiring Location</Label><Input className="mt-1.5" placeholder="Mumbai, Pune, …"/></div>
                <div><Label>Job Role</Label><Input className="mt-1.5"/></div>
                <div><Label>Number of Openings</Label><Input type="number" className="mt-1.5" defaultValue={1}/></div>
                <div><Label>Hiring Type</Label><Input className="mt-1.5" placeholder="Permanent / Contract / Bulk"/></div>
              </div>
              <div><Label>Message</Label><Textarea rows={4} className="mt-1.5" placeholder="Tell us about your hiring needs"/></div>
              <Button type="submit" variant="cta" size="lg" disabled={loading}>{loading ? "Sending…" : "Submit Hiring Requirement"}</Button>
              <p className="text-xs text-muted-foreground text-center">No obligation consultation · Your details are kept confidential.</p>
            </form>
          </Card>
        </div>
      </section>
    </PageShell>
  );
}
