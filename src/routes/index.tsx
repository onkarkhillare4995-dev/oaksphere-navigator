import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";
import { MobileStickyCTA } from "@/components/site/MobileStickyCTA";
import {
  Hero, Stats, EmployerSolutions, CandidateSolutions, Industries, Process,
  WhyChoose, FeaturedJobs, Testimonials, CaseStudy, WhatsAppCTA, Founder, Insights
} from "@/components/site/sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "OAKsphere — India's Trusted Recruitment Partner | Staffing & Hiring Solutions" },
      { name: "description", content: "OAKsphere is India's 360° recruitment partner — IT staffing, BPO hiring, BFSI, healthcare, bulk hiring, executive search & contract staffing across 25+ cities." },
      { property: "og:title", content: "OAKsphere — India's Trusted Recruitment Partner" },
      { property: "og:description", content: "Connecting talent. Building teams. Powering growth. Permanent, contract, bulk and executive hiring across India." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pb-16 md:pb-0">
        <Hero />
        <Stats />
        <EmployerSolutions />
        <CandidateSolutions />
        <Industries />
        <Process />
        <WhyChoose />
        <FeaturedJobs />
        <Testimonials />
        <CaseStudy />
        <Founder />
        <WhatsAppCTA />
        <Insights />
      </main>
      <Footer />
      <WhatsAppFab />
      <MobileStickyCTA />
    </div>
  );
}
