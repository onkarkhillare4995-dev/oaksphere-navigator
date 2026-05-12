import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { FileUp, Search, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { emailSchema, nameSchema, uploadResume, validateResumeFile } from "@/lib/submit";

export const Route = createFileRoute("/candidates")({
  head: () => ({
    meta: [
      { title: "Find Jobs in India | Upload Resume — OAKsphere Careers" },
      { name: "description", content: "Find jobs across India in IT, BPO, BFSI, healthcare, retail and more. Upload your resume and get matched with verified employers." },
      { property: "og:title", content: "Find Jobs — OAKsphere for Candidates" },
      { property: "og:description", content: "Upload your resume. Get matched with verified employers across India." },
    ],
  }),
  component: Candidates,
});

function Candidates() {
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;
    const form = e.currentTarget;
    const fd = new FormData(form);
    const file = fd.get("resume") as File | null;

    const payload = {
      full_name: String(fd.get("full_name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      job_title: String(fd.get("job_title") || "") || null,
      experience: String(fd.get("experience") || "") || null,
      skills: String(fd.get("skills") || "") || null,
      message: String(fd.get("message") || "") || null,
      resume_url: null as string | null,
    };

    try {
      nameSchema.parse(payload.full_name);
      emailSchema.parse(payload.email);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Please check your input");
      return;
    }

    if (file && file.size > 0) {
      const err = validateResumeFile(file);
      if (err) { toast.error(err); return; }
    }

    setLoading(true);
    try {
      if (file && file.size > 0) {
        payload.resume_url = await uploadResume(file);
      }
      const { error } = await supabase.from("candidate_applications").insert(payload);
      if (error) throw error;
      toast.success("Resume submitted!", { description: "Our recruiters will reach out with matching opportunities." });
      form.reset();
    } catch (err) {
      console.error(err);
      toast.error("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageShell>
      <PageHero
        eyebrow="For Candidates"
        title="Find the right job, faster."
        subtitle="Upload your resume once and get matched with verified employers across IT, BPO, BFSI, healthcare and more."
      />
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Card className="p-7 md:p-10 shadow-elegant border-border/60">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-cta text-cta-foreground"><FileUp className="h-5 w-5"/></div>
              <div>
                <h3 className="font-display text-2xl font-bold">Upload your resume</h3>
                <p className="text-sm text-muted-foreground">Free · Confidential · WhatsApp job alerts included.</p>
              </div>
            </div>
            <form className="mt-7 grid gap-4" onSubmit={onSubmit}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><Label>Full Name</Label><Input name="full_name" required className="mt-1.5"/></div>
                <div><Label>Phone</Label><Input name="phone" required type="tel" className="mt-1.5"/></div>
                <div><Label>Email</Label><Input name="email" required type="email" className="mt-1.5"/></div>
                <div><Label>Preferred Role</Label><Input name="job_title" className="mt-1.5"/></div>
                <div><Label>Total Experience</Label><Input name="experience" className="mt-1.5" placeholder="e.g. 3 years"/></div>
                <div><Label>Key Skills</Label><Input name="skills" className="mt-1.5" placeholder="e.g. React, Sales, Java"/></div>
              </div>
              <div><Label>Message</Label><Textarea name="message" rows={3} className="mt-1.5" placeholder="Anything else we should know?"/></div>
              <div>
                <Label>Upload Resume (PDF/DOC, max 5 MB)</Label>
                <Input name="resume" type="file" accept=".pdf,.doc,.docx" className="mt-1.5"/>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button type="submit" variant="cta" size="lg" disabled={loading}>{loading ? "Uploading…" : "Upload Resume"}</Button>
                <Button asChild variant="outline" size="lg"><a href="https://wa.me/917499815246"><MessageCircle className="h-4 w-4"/> WhatsApp Resume</a></Button>
                <Button asChild variant="ghost" size="lg"><a href="/jobs"><Search className="h-4 w-4"/> Browse Jobs</a></Button>
              </div>
            </form>
          </Card>
        </div>
      </section>
    </PageShell>
  );
}
