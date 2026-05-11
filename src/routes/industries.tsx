import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { Card } from "@/components/ui/card";
import { Cpu, Headphones, Banknote, Stethoscope, Truck, ShoppingBag, Factory, Plane, UtensilsCrossed, TrendingUp, GraduationCap, Building2 } from "lucide-react";

const list = [
  { icon: Cpu, name: "IT Staffing", d: "Engineers, data, cloud, security, product." },
  { icon: Headphones, name: "BPO / Call Center", d: "Voice, non-voice, chat, tech support." },
  { icon: Banknote, name: "Banking & BFSI", d: "Sales, operations, branch banking, RMs." },
  { icon: Stethoscope, name: "Healthcare", d: "Doctors, nurses, allied & hospital ops." },
  { icon: Building2, name: "Pharma", d: "MR, QA/QC, R&D, plant operations." },
  { icon: Truck, name: "Logistics", d: "Drivers, warehouse, last-mile, supply chain." },
  { icon: ShoppingBag, name: "Retail & E-commerce", d: "Store, field, supply, category." },
  { icon: Factory, name: "Manufacturing", d: "Plant, QA, engineering, production." },
  { icon: Plane, name: "Aviation", d: "Cabin crew, ground staff, MRO." },
  { icon: UtensilsCrossed, name: "Hospitality", d: "F&B, front office, housekeeping." },
  { icon: TrendingUp, name: "Sales & Marketing", d: "BD, field sales, digital marketing." },
  { icon: GraduationCap, name: "EdTech & Education", d: "Faculty, counsellors, ops." },
];

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title: "Industries We Hire For | IT, BPO, BFSI, Healthcare — OAKsphere" },
      { name: "description", content: "OAKsphere recruits across 50+ industries in India: IT, BPO, BFSI, healthcare, manufacturing, logistics, retail, hospitality and more." },
      { property: "og:title", content: "Industries — OAKsphere Recruitment" },
      { property: "og:description", content: "Domain-specialized recruiters across India's fastest-growing sectors." },
    ],
  }),
  component: Industries,
});

function Industries() {
  return (
    <PageShell>
      <PageHero eyebrow="Industries" title="Specialized recruiters. 50+ industries." subtitle="Deep domain expertise across India's most active hiring sectors." />
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {list.map((s) => (
            <Card key={s.name} className="p-6 hover:shadow-elegant hover:-translate-y-1 transition-all">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-success/10 text-success"><s.icon className="h-5 w-5"/></div>
              <h3 className="mt-5 font-display font-semibold text-xl">{s.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </Card>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
