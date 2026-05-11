import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { Card } from "@/components/ui/card";
import { Users, Zap, Briefcase, ShieldCheck, Award, GraduationCap, MapPin, Cpu, Headphones, Banknote, Stethoscope, Truck, ShoppingBag, Factory, Plane, UtensilsCrossed, TrendingUp } from "lucide-react";

const services = [
  { icon: Users, t: "Permanent Staffing", d: "Full-time hiring across functions and seniority levels." },
  { icon: Briefcase, t: "Contract Staffing", d: "Flexible workforce with compliant payroll." },
  { icon: Zap, t: "Bulk Hiring", d: "100+ roles closed in weeks via volume drives." },
  { icon: GraduationCap, t: "Campus Recruitment", d: "Tier-1, 2, 3 institute pipelines." },
  { icon: Award, t: "Executive Search", d: "Confidential CXO and senior leadership search." },
  { icon: ShieldCheck, t: "Payroll Staffing", d: "End-to-end statutory compliance & payroll." },
  { icon: MapPin, t: "Remote Hiring", d: "Pan-India and global remote talent sourcing." },
  { icon: Users, t: "Gig Workforce", d: "On-demand specialists for short engagements." },
  { icon: Briefcase, t: "Walk-in Drive Management", d: "End-to-end large-scale hiring drives." },
];

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Recruitment Services | Permanent, Contract, Bulk Hiring — OAKsphere" },
      { name: "description", content: "Full-spectrum recruitment services: permanent staffing, contract hiring, bulk recruitment, executive search, campus hiring and payroll services across India." },
      { property: "og:title", content: "Recruitment Services — OAKsphere" },
      { property: "og:description", content: "Permanent, contract, bulk and executive hiring across India." },
    ],
  }),
  component: Services,
});

function Services() {
  return (
    <PageShell>
      <PageHero eyebrow="Services" title="End-to-end recruitment services for every hiring need." subtitle="From single specialist hires to volume staffing — one partner, one process, predictable outcomes." />
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s) => (
            <Card key={s.t} className="p-6 hover:shadow-elegant hover:-translate-y-1 transition-all">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-hero text-white"><s.icon className="h-5 w-5"/></div>
              <h3 className="mt-5 font-display font-semibold text-xl">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </Card>
          ))}
        </div>
      </section>
    </PageShell>
  );
}

export const industries = [
  { icon: Cpu, name: "IT & Technology" }, { icon: Headphones, name: "BPO / KPO" },
  { icon: Banknote, name: "Banking & BFSI" }, { icon: Stethoscope, name: "Healthcare & Pharma" },
  { icon: Truck, name: "Logistics & Supply Chain" }, { icon: ShoppingBag, name: "Retail & E-commerce" },
  { icon: Factory, name: "Manufacturing" }, { icon: Plane, name: "Aviation" },
  { icon: UtensilsCrossed, name: "Hospitality" }, { icon: TrendingUp, name: "Sales & Marketing" },
];
