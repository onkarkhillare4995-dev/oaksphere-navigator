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
              { icon: MapPin, t: "Coverage", v: "Pan-India · 25+ cities", href: "#" },
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
            <form
              className="mt-5 grid gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                  toast.success("Message sent!", { description: "We'll reach out shortly." });
                  (e.target as HTMLFormElement).reset();
                }, 700);
              }}
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div><Label>Name</Label><Input required className="mt-1.5"/></div>
                <div><Label>Phone</Label><Input required type="tel" className="mt-1.5"/></div>
              </div>
              <div><Label>Email</Label><Input required type="email" className="mt-1.5"/></div>
              <div><Label>Message</Label><Textarea required rows={5} className="mt-1.5"/></div>
              <Button type="submit" variant="cta" size="lg" disabled={loading}>{loading ? "Sending…" : "Send Message"}</Button>
            </form>
          </Card>
        </div>
      </section>
    </PageShell>
  );
}
