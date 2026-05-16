import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";
import { MobileStickyCTA } from "@/components/site/MobileStickyCTA";
import {
  Hero, Stats, TrustBar, EmployerSolutions, CandidateSolutions, Industries, Process,
  WhyChoose, FeaturedJobs, QuickInquiry, Testimonials, CaseStudy, WhatsAppCTA,
  Founder, Insights, Platform, FAQ, FinalCTA, AIRecruitmentOS, PricingPreview, OperatingModel
} from "@/components/site/sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "OAKsphere — AI-Powered Recruitment Agency & Hiring Platform India" },
      { name: "description", content: "OAKsphere is an AI-first recruitment partner for Indian startups, SMEs and GCCs — success-fee hiring, RPO-lite pods, staffing, shortlist reports and recruiter-led candidate validation." },
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
        <TrustBar />
        <EmployerSolutions />
        <AIRecruitmentOS />
        <CandidateSolutions />
        <Industries />
        <Process />
        <OperatingModel />
        <WhyChoose />
        <PricingPreview />
        <FeaturedJobs />
        <QuickInquiry />
        <Testimonials />
        <CaseStudy />
        <Platform />
        <Founder />
        <FAQ />
        <WhatsAppCTA />
        <Insights />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppFab />
      <MobileStickyCTA />
    </div>
  );
}
