import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Phone, Mail, MapPin, MessageCircle, Linkedin, Instagram, Youtube, Facebook, Twitter } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { emailSchema, nameSchema } from "@/lib/submit";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact OAKsphere | Talk to a Recruitment Expert" },
      { name: "description", content: "Talk to OAKsphere about your hiring needs. Phone, email and WhatsApp support across India. Typical response under 1 business hour." },
      { property: "og:title", content: "Contact OAKsphere" },
      { property: "og:description", content: "Talk to a recruitment expert. Phone, email and WhatsApp." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      company: String(fd.get("company") || "") || null,
      subject: String(fd.get("subject") || "") || null,
      message: String(fd.get("message") || ""),
    };
    try {
      nameSchema.parse(payload.name);
      emailSchema.parse(payload.email);
      if (!payload.message.trim()) throw new Error("Message is required");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Please check your input");
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("contact_messages").insert(payload);
    setLoading(false);
    if (error) {
      toast.error("Could not send message. Please try again.");
      return;
    }
    toast.success("Message sent!", { description: "We'll reach out shortly." });
    (e.target as HTMLFormElement).reset();
  }

  return (
    <PageShell>
      <PageHero eyebrow="Contact" title="Talk to a recruitment expert." subtitle="We respond within 1 business hour. WhatsApp for fastest reply." />
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10">
          <div className="space-y-5">
            {[
              { icon: Phone, t: "Phone", v: "+91 74998 15246", href: "tel:+917499815246" },
              { icon: Mail, t: "Email", v: "onkar@oaksphere.in", href: "mailto:onkar@oaksphere.in" },
              { icon: MessageCircle, t: "WhatsApp", v: "Chat with our team", href: "https://wa.me/917499815246" },
              { icon: MapPin, t: "Coverage", v: "Pan-India · 25+ cities", href: "#coverage" },
            ].map((c) => (
              <a key={c.t} href={c.href} className="flex items-center gap-4 p-5 rounded-2xl border border-border hover:border-cta hover:shadow-elegant transition-all bg-card">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-hero text-white"><c.icon className="h-5 w-5"/></div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{c.t}</div>
                  <div className="font-display font-semibold">{c.v}</div>
                </div>
              </a>
            ))}
          </div>
          <Card className="p-7 md:p-9 shadow-elegant">
            <h3 className="font-display text-2xl font-bold">Send us a message</h3>
            <form className="mt-5 grid gap-4" onSubmit={onSubmit}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><Label>Name</Label><Input name="name" required className="mt-1.5"/></div>
                <div><Label>Phone</Label><Input name="phone" required type="tel" className="mt-1.5"/></div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><Label>Email</Label><Input name="email" required type="email" className="mt-1.5"/></div>
                <div><Label>Company</Label><Input name="company" className="mt-1.5"/></div>
              </div>
              <div><Label>Subject</Label><Input name="subject" className="mt-1.5"/></div>
              <div><Label>Message</Label><Textarea name="message" required rows={5} className="mt-1.5"/></div>
              <Button type="submit" variant="cta" size="lg" disabled={loading}>{loading ? "Sending…" : "Send Message"}</Button>
            </form>
          </Card>
        </div>
      </section>
      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Card className="p-8 md:p-12 bg-gradient-hero text-white shadow-elegant">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-bold">Connect with OAKsphere</h2>
                <p className="mt-4 text-white/80 max-w-lg">
                  Follow us for hiring insights, job openings, candidate success stories, and workforce updates across India.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {[
                    { icon: Linkedin, href: "https://www.linkedin.com/company/oaksphere", label: "LinkedIn" },
                    { icon: Instagram, href: "https://www.instagram.com/oaksphere.in", label: "Instagram" },
                    { icon: Facebook, href: "https://www.facebook.com/oaksphere.in", label: "Facebook" },
                    { icon: Twitter, href: "https://x.com/oakspherein", label: "X" },
                    { icon: Youtube, href: "https://www.youtube.com/@oaksphere", label: "YouTube" },
                    { icon: MessageCircle, href: "https://wa.me/917499815246", label: "WhatsApp" },
                  ].map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:text-[#EF9F27] hover:bg-white transition-colors">
                      <s.icon className="h-5 w-5" strokeWidth={1.75}/>
                    </a>
                  ))}
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <Button asChild variant="secondary" size="lg" className="justify-start"><a href="https://www.linkedin.com/company/oaksphere" target="_blank" rel="noreferrer"><Linkedin className="h-4 w-4 mr-2"/>Follow on LinkedIn</a></Button>
                <Button asChild variant="secondary" size="lg" className="justify-start"><a href="https://www.instagram.com/oaksphere.in" target="_blank" rel="noreferrer"><Instagram className="h-4 w-4 mr-2"/>Follow on Instagram</a></Button>
                <Button asChild size="lg" className="justify-start bg-[#25D366] hover:bg-[#25D366]/90 text-white"><a href="https://wa.me/917499815246" target="_blank" rel="noreferrer"><MessageCircle className="h-4 w-4 mr-2"/>Message on WhatsApp</a></Button>
                <Button asChild variant="cta" size="lg" className="justify-start"><a href="https://www.youtube.com/@oaksphere" target="_blank" rel="noreferrer"><Youtube className="h-4 w-4 mr-2"/>Subscribe on YouTube</a></Button>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </PageShell>
  );
}
