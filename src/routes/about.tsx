import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/site/PageShell";
import founder from "@/assets/founder-onkar.jpg";
import cofounder from "@/assets/cofounder-akash.png";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About OAKsphere | India's 360° Recruitment Partner" },
      { name: "description", content: "OAKsphere is built on strength, stability and trust. We connect Indian businesses with verified talent across IT, BPO, BFSI, healthcare and more." },
      { property: "og:title", content: "About OAKsphere" },
      { property: "og:description", content: "Strength of OAK. Reach of a sphere. India's trusted recruitment partner." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <PageShell>
      <PageHero
        eyebrow="About Us"
        title="Strength of an OAK. Reach of a sphere."
        subtitle="OAKsphere is India's modern recruitment partner — built to help businesses hire faster, smarter and with confidence."
      />
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-10 items-start">
          <div className="lg:col-span-1 space-y-6">
            <div>
              <img src={founder} alt="Onkar Khillare, Founder & CEO" className="rounded-2xl shadow-elegant w-full"/>
              <div className="mt-3">
                <div className="font-display font-bold text-xl">Onkar Khillare</div>
                <div className="text-sm text-cta">Founder & CEO</div>
                <div className="text-xs text-muted-foreground mt-1">+91 74998 15246 · onkar@oaksphere.in</div>
              </div>
            </div>
            <div>
              <img src={cofounder} alt="Akash Nadar, Co-Founder & MD" className="rounded-2xl shadow-elegant w-full"/>
              <div className="mt-3">
                <div className="font-display font-bold text-xl">Akash Nadar</div>
                <div className="text-sm text-cta">Co-Founder & MD</div>
                <div className="text-xs text-muted-foreground mt-1">+91 70216 86550 · akash@oaksphere.in</div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 space-y-5 text-lg text-foreground/85 leading-relaxed">
            <p>OAKsphere was founded with a single belief — Indian businesses deserve a recruitment partner that is fast, transparent and built on trust.</p>
            <p>The brand name combines two ideas: the <strong>OAK</strong> represents stability and long-term growth, and the <strong>sphere</strong> represents a complete, connected hiring ecosystem. Together, they describe how we work — strong fundamentals, broad reach.</p>
            <p>Today, we recruit across 50+ industries and 25+ Indian cities. We blend experienced human recruiters with technology-enabled processes to deliver verified candidates faster than the industry average.</p>
            <p>Our mission is simple: connect talent, build teams, and power the growth of India's most ambitious companies.</p>
          </div>
        </div>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mt-16 grid sm:grid-cols-3 gap-5">
          {[["Trust", "Transparency in every interaction."], ["Speed", "Shortlists in 48 hours."], ["Quality", "Verified, skill-tested candidates."]].map(([t, d]) => (
            <Card key={t} className="p-7">
              <div className="font-display font-bold text-xl text-cta">{t}</div>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </Card>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
