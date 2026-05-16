import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, IndianRupee, ShieldCheck, Sparkles, Users } from "lucide-react";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Recruitment Pricing & Commission Model — OAKsphere" },
      {
        name: "description",
        content:
          "Transparent AI-first recruitment pricing for India: success-fee hiring, RPO-lite retainers, bulk hiring, staffing and executive search.",
      },
      { property: "og:title", content: "OAKsphere Recruitment Pricing" },
      {
        property: "og:description",
        content:
          "Pay after successful joining or build a dedicated hiring pod with OAKsphere's AI-assisted recruiters.",
      },
    ],
  }),
  component: Pricing,
});

const plans = [
  {
    name: "Success-Fee Hiring",
    price: "8.33%–12%",
    unit: "of annual CTC",
    description:
      "For startups, SMEs and growth teams that want verified shortlists without upfront commitment.",
    features: [
      "Pay only after successful joining",
      "AI-assisted sourcing and fit scoring",
      "Recruiter-validated shortlist reports",
      "30–90 day replacement support",
      "Ideal for ₹4 LPA–₹30 LPA roles",
    ],
  },
  {
    name: "RPO-lite Hiring Pod",
    price: "₹75k–₹3L",
    unit: "per month",
    description:
      "For companies hiring 5+ roles per month and needing a dedicated recruitment engine.",
    features: [
      "Dedicated recruiter capacity",
      "Weekly funnel and SLA reporting",
      "Reduced success-fee options",
      "Interview coordination and offer follow-up",
      "Best for startup scale-up and GCC hiring",
    ],
    highlighted: true,
  },
  {
    name: "Bulk + Contract Staffing",
    price: "Custom",
    unit: "per joiner or markup",
    description:
      "For sales, support, operations, retail, logistics and frontline teams where volume and retention matter.",
    features: [
      "Fixed fee per joiner or monthly markup",
      "WhatsApp screening and joining workflows",
      "Document collection and onboarding tracker",
      "Dropout-risk monitoring",
      "City-wise talent pool activation",
    ],
  },
];

const commissionBands = [
  ["Entry-level / high-volume", "5%–8.33% of annual CTC"],
  ["Junior to mid-level", "8.33%–10% of annual CTC"],
  ["Senior specialist", "10%–12% of annual CTC"],
  ["Leadership / executive search", "12%–25% of annual CTC or retained search"],
];

function Pricing() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Pricing & Commercials"
        title="Transparent recruitment pricing for AI-era hiring."
        subtitle="Start success-based, move to priority hiring pods as volume increases, and add staffing or SaaS workflows when your hiring engine matures."
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-3">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`relative h-full p-7 border-border/60 ${plan.highlighted ? "shadow-elegant ring-2 ring-cta/40" : ""}`}
              >
                {plan.highlighted && (
                  <Badge className="absolute right-6 top-6 bg-cta text-cta-foreground hover:bg-cta">
                    Recommended
                  </Badge>
                )}
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-hero text-white">
                  {plan.highlighted ? (
                    <Sparkles className="h-5 w-5" />
                  ) : (
                    <IndianRupee className="h-5 w-5" />
                  )}
                </div>
                <h2 className="mt-5 font-display text-2xl font-bold">{plan.name}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {plan.description}
                </p>
                <div className="mt-6 flex items-end gap-2">
                  <span className="font-display text-4xl font-bold text-primary">{plan.price}</span>
                  <span className="pb-1 text-sm text-muted-foreground">{plan.unit}</span>
                </div>
                <ul className="mt-7 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-2 text-sm">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <Badge className="bg-primary/10 text-primary hover:bg-primary/10">
              Commission Model
            </Badge>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold">
              Simple fee bands by role complexity.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Fees are finalized after role calibration, salary range, hiring urgency, location
              complexity, replacement period, and expected volume.
            </p>
          </div>
          <Card className="overflow-hidden border-border/60 shadow-elegant">
            <div className="divide-y divide-border">
              {commissionBands.map(([level, fee]) => (
                <div key={level} className="grid gap-2 p-5 sm:grid-cols-2 sm:items-center">
                  <div className="font-medium">{level}</div>
                  <div className="text-sm font-semibold text-primary">{fee}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                icon: ShieldCheck,
                title: "Replacement protection",
                text: "Typical 30–90 day support depending on role level and commercial plan.",
              },
              {
                icon: Users,
                title: "Candidate ownership",
                text: "Candidate ownership terms are agreed before profile submission to prevent duplicate disputes.",
              },
              {
                icon: Sparkles,
                title: "AI + human validation",
                text: "Automation improves speed, while recruiters validate interest, salary fit, communication and joining probability.",
              },
            ].map((item) => (
              <Card key={item.title} className="p-6 border-border/60">
                <item.icon className="h-7 w-7 text-cta" />
                <h3 className="mt-4 font-display text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
              </Card>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" variant="cta">
              <Link to="/employers">Submit Hiring Requirement</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/contact">Discuss Custom Pricing</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
